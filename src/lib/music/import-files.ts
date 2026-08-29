import { hashPeaks, placeholderCover } from "./covers";
import { idbPut, type StoredTrack } from "./idb";
import type { Track } from "./types";
import { isAudioFile, parseFilename, uid } from "@/lib/utils";

async function computePeaksAndDuration(file: File): Promise<{ peaks: number[]; duration: number } | null> {
  try {
    const ctx = new AudioContext();
    const buf = await ctx.decodeAudioData(await file.arrayBuffer());
    const channel = buf.getChannelData(0);
    const buckets = 180;
    const size = Math.max(1, Math.floor(channel.length / buckets));
    const peaks: number[] = [];
    let max = 1e-6;
    for (let b = 0; b < buckets; b++) {
      let m = 0;
      const start = b * size;
      for (let i = 0; i < size; i++) m = Math.max(m, Math.abs(channel[start + i] || 0));
      peaks.push(m);
      max = Math.max(max, m);
    }
    await ctx.close();
    return { peaks: peaks.map((v) => Number((v / max).toFixed(4))), duration: buf.duration };
  } catch {
    return null;
  }
}

async function readTags(file: File) {
  try {
    const { parseBlob } = await import("music-metadata");
    const meta = await parseBlob(file);
    const pic = meta.common.picture?.[0];
    let coverBlob: Blob | undefined;
    if (pic?.data) {
      const bytes = pic.data instanceof Uint8Array ? pic.data : new Uint8Array(pic.data);
      const copy = new Uint8Array(bytes.byteLength);
      copy.set(bytes);
      coverBlob = new Blob([copy], { type: pic.format || "image/jpeg" });
    }
    return {
      title: meta.common.title,
      artist: meta.common.artist || meta.common.albumartist,
      album: meta.common.album,
      year: meta.common.year,
      duration: meta.format.duration,
      coverBlob,
    };
  } catch {
    return null;
  }
}

export type ImportResult = {
  tracks: Track[];
  errors: { name: string; message: string }[];
};

export async function importAudioFiles(files: File[]): Promise<ImportResult> {
  const tracks: Track[] = [];
  const errors: { name: string; message: string }[] = [];

  for (const file of files) {
    if (!isAudioFile(file.name) && !file.type.startsWith("audio/")) {
      errors.push({ name: file.name, message: "Unsupported format" });
      continue;
    }
    try {
      const parsed = parseFilename(file.name);
      const tags = await readTags(file);
      const decoded = await computePeaksAndDuration(file);
      if (!decoded && !tags) {
        errors.push({ name: file.name, message: "File is unreadable or corrupted" });
        continue;
      }
      const id = `import:${uid()}`;
      const title = tags?.title?.trim() || parsed.title;
      const artist = tags?.artist?.trim() || parsed.artist;
      const album = tags?.album?.trim() || "Unknown Album";
      const duration = decoded?.duration || tags?.duration || 0;
      const peaks = decoded?.peaks || hashPeaks(id);
      const stored: StoredTrack = {
        id,
        title,
        artist,
        album,
        year: tags?.year,
        duration,
        filename: file.name,
        peaks,
        audioBlob: file,
        coverBlob: tags?.coverBlob,
      };
      await idbPut(stored);
      const audioUrl = URL.createObjectURL(file);
      const coverUrl = tags?.coverBlob
        ? URL.createObjectURL(tags.coverBlob)
        : placeholderCover(id, title, artist);
      tracks.push({
        id,
        title,
        artist,
        album,
        year: tags?.year,
        duration,
        filename: file.name,
        url: audioUrl,
        coverUrl,
        peaks,
        source: "import",
      });
    } catch {
      errors.push({ name: file.name, message: "Could not import this file" });
    }
  }

  return { tracks, errors };
}

export async function filesFromDataTransfer(dt: DataTransfer): Promise<File[]> {
  const items = [...dt.items];
  const files: File[] = [];

  const walk = async (entry: FileSystemEntry | null): Promise<void> => {
    if (!entry) return;
    if (entry.isFile) {
      const file = await new Promise<File | null>((resolve) => {
        (entry as FileSystemFileEntry).file(resolve, () => resolve(null));
      });
      if (file && (isAudioFile(file.name) || file.type.startsWith("audio/"))) files.push(file);
    } else if (entry.isDirectory) {
      const reader = (entry as FileSystemDirectoryEntry).createReader();
      const readAll = async (): Promise<FileSystemEntry[]> => {
        const batch = await new Promise<FileSystemEntry[]>((resolve) => {
          reader.readEntries(resolve, () => resolve([]));
        });
        if (batch.length === 0) return [];
        return [...batch, ...(await readAll())];
      };
      for (const child of await readAll()) await walk(child);
    }
  };

  const hasEntries = items.some((it) => typeof it.webkitGetAsEntry === "function" && it.webkitGetAsEntry());
  if (hasEntries) {
    for (const item of items) {
      await walk(item.webkitGetAsEntry?.() ?? null);
    }
    if (files.length) return files;
  }
  return [...dt.files].filter((f) => isAudioFile(f.name) || f.type.startsWith("audio/"));
}

export async function filesFromDirectoryHandle(dir: FileSystemDirectoryHandle): Promise<File[]> {
  const files: File[] = [];
  const walk = async (handle: FileSystemDirectoryHandle) => {
    for await (const entry of handle.values()) {
      if (entry.kind === "file") {
        const file = await (entry as FileSystemFileHandle).getFile();
        if (isAudioFile(file.name) || file.type.startsWith("audio/")) files.push(file);
      } else if (entry.kind === "directory") {
        await walk(entry as FileSystemDirectoryHandle);
      }
    }
  };
  await walk(dir);
  return files;
}
