-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. users Table (Extending auth.users)
create table public.users (
  id uuid primary key references auth.users(id) on delete cascade on update cascade,
  full_name text,
  phone_number text unique,
  preferred_language text default 'en',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for users
alter table public.users enable row level security;
create policy "Users can view their own profile." on public.users for select using (auth.uid() = id);
create policy "Users can update their own profile." on public.users for update using (auth.uid() = id);

-- Function to handle user creation on sign-up
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.users (id, full_name, phone_number)
  values (new.id, new.raw_user_meta_data->>'full_name', new.phone);
  return new;
end;
$$;

-- Trigger to automatically add a new public user when auth user is created
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 2. farms Table
create table public.farms (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.users(id) on delete cascade not null,
  name text not null,
  location_lat double precision,
  location_lng double precision,
  size_acres numeric,
  primary_crop text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.farms enable row level security;
create policy "Users can view their own farms." on public.farms for select using (auth.uid() = user_id);
create policy "Users can insert their own farms." on public.farms for insert with check (auth.uid() = user_id);
create policy "Users can update their own farms." on public.farms for update using (auth.uid() = user_id);
create policy "Users can delete their own farms." on public.farms for delete using (auth.uid() = user_id);

-- 3. soil_tests Table
create table public.soil_tests (
  id uuid primary key default uuid_generate_v4(),
  farm_id uuid references public.farms(id) on delete cascade not null,
  test_date date default current_date not null,
  ph_level numeric not null,
  nitrogen numeric not null,
  phosphorus numeric not null,
  potassium numeric not null,
  organic_carbon numeric,
  report_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.soil_tests enable row level security;
create policy "Users can view their farm soil tests." on public.soil_tests for select using (
  farm_id in (select id from public.farms where user_id = auth.uid())
);
create policy "Users can insert farm soil tests." on public.soil_tests for insert with check (
  farm_id in (select id from public.farms where user_id = auth.uid())
);

-- 4. crop_recommendations Table
create table public.crop_recommendations (
  id uuid primary key default uuid_generate_v4(),
  soil_test_id uuid references public.soil_tests(id) on delete cascade not null,
  recommended_crop text not null,
  confidence_score numeric,
  ai_justification text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.crop_recommendations enable row level security;
create policy "Users can view recommendations for their tests." on public.crop_recommendations for select using (
  soil_test_id in (select id from public.soil_tests where farm_id in (select id from public.farms where user_id = auth.uid()))
);
create policy "Users can insert recommendations for their tests." on public.crop_recommendations for insert with check (
  soil_test_id in (select id from public.soil_tests where farm_id in (select id from public.farms where user_id = auth.uid()))
);

-- 5. crops (Lookup / Seed Table)
create table public.crops (
  id uuid primary key default uuid_generate_v4(),
  name_en text not null,
  name_hi text,
  name_te text,
  name_kn text,
  name_ta text,
  optimal_ph_min numeric,
  optimal_ph_max numeric,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.crops enable row level security;
create policy "Anyone can read crops lookup." on public.crops for select using (true);

-- Seed Initial Crops for India Context
insert into public.crops (name_en, name_hi, name_te, name_kn, name_ta, optimal_ph_min, optimal_ph_max) values
('Wheat', 'गेहूँ', 'గోధుమ', 'ಗோதுಮೆ', 'கோதுமை', 6.0, 7.5),
('Rice', 'चावल', 'బియ్యం', 'ಅಕ್ಕಿ', 'அரிசி', 5.5, 7.0),
('Cotton', 'कपास', 'పత్తి', 'ಹತ್ತಿ', 'பருத்தி', 5.8, 8.0),
('Sugarcane', 'गन्ना', 'చెరకు', 'ಕಬ್ಬು', 'கரும்பு', 6.5, 7.5),
('Maize', 'मक्का', 'మొక్కజొన్న', 'ಮೆಕ್ಕೆಜೋಳ', 'மக்காச்சோளம்', 5.8, 7.0);

-- 6. weather_alerts Table
create table public.weather_alerts (
  id uuid primary key default uuid_generate_v4(),
  farm_id uuid references public.farms(id) on delete cascade not null,
  alert_type text not null, -- e.g., 'DROUGHT', 'FLOOD', 'HEAVY_RAIN'
  description text not null,
  severity text not null, -- e.g., 'WARNING', 'CRITICAL'
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.weather_alerts enable row level security;
create policy "Users can view alerts for their farms." on public.weather_alerts for select using (
  farm_id in (select id from public.farms where user_id = auth.uid())
);
create policy "Users can insert alerts for their farms." on public.weather_alerts for insert with check (
  farm_id in (select id from public.farms where user_id = auth.uid())
);

-- 7. Setup Storage Bucket for lab-reports
insert into storage.buckets (id, name, public) values ('lab-reports', 'lab-reports', false) on conflict do nothing;

create policy "Users can upload their own reports" on storage.objects for insert with check ( 
  bucket_id = 'lab-reports' and (storage.foldername(name))[1] = auth.uid()::text 
);
create policy "Users can view their own reports" on storage.objects for select using ( 
  bucket_id = 'lab-reports' and (storage.foldername(name))[1] = auth.uid()::text 
);
