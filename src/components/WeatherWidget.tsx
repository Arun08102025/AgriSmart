"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Cloud, Droplets, MapPin, Wind, Sun, CloudRain, CloudLightning, Loader2 } from "lucide-react";

interface WeatherProps {
  lat: number;
  lng: number;
  locationName?: string;
}

export function WeatherWidget({ lat, lng, locationName }: WeatherProps) {
  const [weather, setWeather] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWeather() {
      try {
        const res = await fetch(`/api/weather?lat=${lat}&lon=${lng}`);
        if (res.ok) {
          const data = await res.json();
          setWeather(data);
        }
      } catch (error) {
        console.error("Failed to fetch weather widget data", error);
      } finally {
        setLoading(false);
      }
    }
    fetchWeather();
  }, [lat, lng]);

  const getWeatherIcon = (condition: string) => {
    switch (condition?.toLowerCase()) {
      case "rain": return <CloudRain className="w-8 h-8 text-blue-400" />;
      case "clouds": return <Cloud className="w-8 h-8 text-gray-400" />;
      case "thunderstorm": return <CloudLightning className="w-8 h-8 text-yellow-500" />;
      case "clear":
      default: return <Sun className="w-8 h-8 text-orange-400" />;
    }
  };

  if (loading) {
    return (
      <Card className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-none animate-pulse">
        <CardContent className="p-6 h-[140px] flex items-center justify-center">
            <Loader2 className="w-6 h-6 animate-spin" />
        </CardContent>
      </Card>
    );
  }

  if (!weather) return null;

  return (
    <Card className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-none shadow-md overflow-hidden relative">
      <div className="absolute -top-10 -right-10 opacity-10">
         <Sun className="w-40 h-40" />
      </div>
      <CardContent className="p-5 flex flex-col justify-between h-full relative z-10">
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="flex items-center gap-1 text-blue-100 text-sm mb-1">
              <MapPin className="w-3 h-3" /> {locationName || "Farm Location"}
            </div>
            <div className="text-3xl font-bold tracking-tight">
              {weather.temp as number}°C
            </div>
            <div className="text-blue-100 capitalize text-sm">
               {weather.condition as string}
            </div>
          </div>
          <div>
            {getWeatherIcon(weather.condition as string)}
          </div>
        </div>
        
        <div className="flex items-center gap-4 text-xs bg-white/10 p-2 rounded-lg backdrop-blur-sm mt-2">
          <div className="flex items-center gap-1.5 flex-1 justify-center">
            <Droplets className="w-3.5 h-3.5 text-blue-200" />
            <span>{weather.humidity as number}%</span>
          </div>
          <div className="w-px h-6 bg-white/20"></div>
          <div className="flex items-center gap-1.5 flex-1 justify-center">
            <Wind className="w-3.5 h-3.5 text-blue-200" />
            <span>{weather.windSpeed as number} km/h</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
