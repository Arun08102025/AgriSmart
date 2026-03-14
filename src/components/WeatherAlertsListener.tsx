"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, Info, BellRing } from "lucide-react";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";

export function WeatherAlertsListener() {
  const [alerts, setAlerts] = useState<any[]>([]);
  const supabase = createClient();
  const { toast } = useToast();

  useEffect(() => {
    let subscription: any;

    const setupRealtime = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Initial Fetch
      const { data: initialAlerts } = await supabase
        .from("weather_alerts")
        .select("*")
        .eq("status", "active")
        .order("created_at", { ascending: false });

      if (initialAlerts) setAlerts(initialAlerts);

      // Subscribe to inserts
      subscription = supabase
        .channel('weather_alerts_changes')
        .on('postgres_changes', 
          { event: 'INSERT', schema: 'public', table: 'weather_alerts' }, 
          (payload) => {
            console.log('New Weather Alert!', payload);
            setAlerts((prev) => [payload.new, ...prev]);
            
            toast({
              variant: payload.new.severity === 'critical' ? 'destructive' : 'default',
              title: `New Weather Alert: ${payload.new.alert_type}`,
              description: payload.new.message,
              action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
            });
          }
        )
        .subscribe();
    }

    setupRealtime();

    return () => {
      if (subscription) {
        supabase.removeChannel(subscription);
      }
    };
  }, [supabase, toast]);

  if (alerts.length === 0) return null;

  return (
    <div className="space-y-2 mb-4">
      {alerts.map((alert) => (
        <Alert 
          key={alert.id as string} 
          variant={alert.severity as string === 'critical' ? 'destructive' : 'default'}
          className={
            alert.severity as string === "warning" 
            ? "bg-amber-50 text-amber-900 border-amber-200 dark:bg-amber-900/20 dark:text-amber-200 dark:border-amber-900/50" 
            : ""
          }
        >
          {alert.severity as string === 'critical' ? (
             <AlertTriangle className="h-4 w-4" />
          ) : alert.severity as string === 'warning' ? (
             <BellRing className="h-4 w-4 text-amber-600 dark:text-amber-500" />
          ) : (
             <Info className="h-4 w-4" />
          )}
          <AlertTitle className="uppercase text-xs tracking-wider opacity-80 mb-1">
             {alert.alert_type as string} Alert
          </AlertTitle>
          <AlertDescription className="text-sm font-medium">
            {alert.message as string}
          </AlertDescription>
        </Alert>
      ))}
    </div>
  );
}
