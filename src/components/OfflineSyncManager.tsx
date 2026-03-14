"use client";

import { useEffect, useState } from "react";
import { getOfflineRequests, removeOfflineRequest } from "@/lib/offlineSync";

export function OfflineSyncManager() {
  const [isOnline, setIsOnline] = useState(
    typeof window !== 'undefined' ? navigator.onLine : true
  );

  useEffect(() => {
    const processOfflineQueue = async () => {
      try {
        const requests = await getOfflineRequests();
        if (requests.length === 0) return;

        console.log(`Processing ${requests.length} offline requests...`);

        for (const req of requests) {
          try {
            const response = await fetch(req.url, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(req.payload),
            });

            if (response.ok) {
               // Successfully synced
               await removeOfflineRequest(req.id);
            } else {
               console.error("Failed to sync request:", req);
            }
          } catch {
            console.error("Network error during sync, will retry later.");
            break; // Stop processing and wait for next online event
          }
        }
      } catch (e) {
        console.error("Error accessing offline queue:", e);
      }
    };

    const handleOnline = async () => {
      setIsOnline(true);
      await processOfflineQueue();
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Initial check on mount
    if (navigator.onLine) {
      processOfflineQueue();
    }

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (!isOnline) {
    return (
      <div className="bg-yellow-500 text-black text-center text-xs py-1 font-medium shadow-sm z-50 fixed top-0 w-full">
        ⚠️ You are offline. Data is being saved locally.
      </div>
    );
  }

  return null;
}
