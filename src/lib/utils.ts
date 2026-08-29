import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const s = Math.floor(seconds);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  if (h > 0) return `${h}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  return `${m}:${String(sec).padStart(2, "0")}`;
}

export function uid(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  return `q_${Math.random().toString(36).slice(2)}_${Date.now().toString(36)}`;
}

export function parseFilename(name: string): { title: string; artist: string } {
  const base = name.replace(/\.[^.]+$/, "").replace(/[_]+/g, " ").trim();
  const cleaned = base.replace(/^\d{1,3}[.\-)\s]+/, "").trim();
  const parts = cleaned.split(/\s+[-–—]\s+/);
  if (parts.length >= 2) {
    return { artist: parts[0]!.trim(), title: parts.slice(1).join(" - ").trim() };
  }
  return { title: cleaned || name, artist: "Unknown Artist" };
}

export function isAudioFile(name: string): boolean {
  return /\.(mp3|wav|flac|ogg|m4a|aac|opus|webm)$/i.test(name);
}
