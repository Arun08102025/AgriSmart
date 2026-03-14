"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Sprout, CloudRain, LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Home", href: "/dashboard", icon: Home },
  { name: "Soil", href: "/dashboard/soil", icon: LayoutDashboard },
  { name: "Crops", href: "/dashboard/recommendations", icon: Sprout },
  { name: "Weather", href: "/dashboard/weather", icon: CloudRain },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 h-16 bg-white dark:bg-zinc-900 border-t dark:border-zinc-800 flex items-center justify-around px-2 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] md:hidden">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors",
              isActive
                ? "text-green-600 dark:text-green-500"
                : "text-zinc-500 dark:text-zinc-400 hover:text-green-600 dark:hover:text-green-400"
            )}
          >
            <item.icon className={cn("w-6 h-6", isActive && "fill-current/20")} />
            <span className="text-[10px] font-medium">{item.name}</span>
          </Link>
        );
      })}
    </div>
  );
}
