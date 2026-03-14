import { NextResponse } from "next/server";
import { getWeatherData } from "@/lib/weather";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const latStr = searchParams.get("lat");
  const lonStr = searchParams.get("lon");

  if (!latStr || !lonStr) {
    return NextResponse.json({ error: "Missing coordinates" }, { status: 400 });
  }

  const lat = parseFloat(latStr);
  const lon = parseFloat(lonStr);

  const weather = await getWeatherData(lat, lon);
  
  if (!weather) {
     return NextResponse.json({ error: "Weather fetch failed" }, { status: 500 });
  }

  return NextResponse.json(weather);
}
