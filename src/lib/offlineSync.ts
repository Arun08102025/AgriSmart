import { openDB } from "idb";

const DB_NAME = "AgriSmartDB";
const DB_VERSION = 1;
const STORE_NAME = "offlineQueue";

if (typeof window !== "undefined") {
  openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id", autoIncrement: true });
      }
    },
  });
}

export async function saveOfflineRequest(url: string, payload: Record<string, unknown>) {
  const db = await openDB(DB_NAME, DB_VERSION);
  await db.add(STORE_NAME, {
    url,
    payload,
    timestamp: new Date().getTime(),
  });
}

export async function getOfflineRequests() {
  const db = await openDB(DB_NAME, DB_VERSION);
  return db.getAll(STORE_NAME);
}

export async function removeOfflineRequest(id: number) {
  const db = await openDB(DB_NAME, DB_VERSION);
  await db.delete(STORE_NAME, id);
}

const CACHE_STORE_NAME = "apiCache";

if (typeof window !== "undefined") {
  openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
         db.createObjectStore(STORE_NAME, { keyPath: "id", autoIncrement: true });
      }
      if (!db.objectStoreNames.contains(CACHE_STORE_NAME)) {
         db.createObjectStore(CACHE_STORE_NAME, { keyPath: "url" });
      }
    },
  });
}

export async function setCachedData(url: string, data: any) {
  const db = await openDB(DB_NAME, DB_VERSION);
  await db.put(CACHE_STORE_NAME, {
    url,
    data,
    timestamp: new Date().getTime(),
  });
}

export async function getCachedData(url: string) {
  try {
    const db = await openDB(DB_NAME, DB_VERSION);
    const result = await db.get(CACHE_STORE_NAME, url);
    return result ? result.data : null;
  } catch (e) {
    return null;
  }
}
