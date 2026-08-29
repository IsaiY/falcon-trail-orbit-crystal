import type { Track } from "./types";

const DB_NAME = "ember-player";
const DB_VERSION = 1;
const STORE = "tracks";

export type StoredTrack = {
  id: string;
  title: string;
  artist: string;
  album: string;
  year?: number;
  duration: number;
  filename: string;
  peaks: number[];
  audioBlob: Blob;
  coverBlob?: Blob;
};

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE)) db.createObjectStore(STORE, { keyPath: "id" });
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

function reqToPromise<T>(req: IDBRequest<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

export async function idbPut(track: StoredTrack): Promise<void> {
  const db = await openDb();
  try {
    await reqToPromise(db.transaction(STORE, "readwrite").objectStore(STORE).put(track));
  } finally {
    db.close();
  }
}

export async function idbDelete(id: string): Promise<void> {
  const db = await openDb();
  try {
    await reqToPromise(db.transaction(STORE, "readwrite").objectStore(STORE).delete(id));
  } finally {
    db.close();
  }
}

export async function idbClear(): Promise<void> {
  const db = await openDb();
  try {
    await reqToPromise(db.transaction(STORE, "readwrite").objectStore(STORE).clear());
  } finally {
    db.close();
  }
}

export async function idbGetAll(): Promise<StoredTrack[]> {
  const db = await openDb();
  try {
    return await reqToPromise(db.transaction(STORE, "readonly").objectStore(STORE).getAll());
  } finally {
    db.close();
  }
}

export function storedToTrack(row: StoredTrack, urls: { audio: string; cover?: string }): Track {
  return {
    id: row.id,
    title: row.title,
    artist: row.artist,
    album: row.album,
    year: row.year,
    duration: row.duration,
    filename: row.filename,
    url: urls.audio,
    coverUrl: urls.cover,
    peaks: row.peaks,
    source: "import",
  };
}
