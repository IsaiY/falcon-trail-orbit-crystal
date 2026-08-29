import { create } from "zustand";
import { catalogTracks } from "@/lib/music/catalog";
import { engine } from "@/lib/music/engine";
import { idbClear, idbDelete, idbGetAll, storedToTrack } from "@/lib/music/idb";
import { placeholderCover } from "@/lib/music/covers";
import type {
  AppView,
  DisplayMode,
  LibraryTab,
  QueueItem,
  RecentEntry,
  RepeatMode,
  Track,
} from "@/lib/music/types";
import { uid } from "@/lib/utils";

const STORAGE_KEY = "ember-player-v1";

type Persisted = {
  volume: number;
  muted: boolean;
  shuffle: boolean;
  repeat: RepeatMode;
  favorites: string[];
  recentlyPlayed: RecentEntry[];
  queue: QueueItem[];
  currentUid: string | null;
  currentTime: number;
  view: AppView;
  libraryTab: LibraryTab;
  displayMode: DisplayMode;
  queueOpen: boolean;
};

function loadPersisted(): Partial<Persisted> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as Persisted;
  } catch {
    return {};
  }
}

function shuffleInPlace<T>(arr: T[]): T[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j]!, arr[i]!];
  }
  return arr;
}

type PlayerState = {
  tracks: Track[];
  queue: QueueItem[];
  currentUid: string | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  muted: boolean;
  shuffle: boolean;
  shufflePending: string[];
  repeat: RepeatMode;
  favorites: string[];
  recentlyPlayed: RecentEntry[];
  view: AppView;
  libraryTab: LibraryTab;
  displayMode: DisplayMode;
  queueOpen: boolean;
  search: string;
  hydrated: boolean;
  selectedAlbum: string | null;
  selectedArtist: string | null;
  errorTrackId: string | null;

  hydrate: () => Promise<void>;
  persist: () => void;
  addTracks: (tracks: Track[]) => void;
  removeImported: (id: string) => Promise<void>;
  clearImported: () => Promise<void>;

  setView: (view: AppView) => void;
  setLibraryTab: (tab: LibraryTab) => void;
  setDisplayMode: (mode: DisplayMode) => void;
  setSearch: (q: string) => void;
  setQueueOpen: (open: boolean) => void;
  setSelectedAlbum: (album: string | null) => void;
  setSelectedArtist: (artist: string | null) => void;

  playTrack: (track: Track, context?: Track[]) => void;
  togglePlay: () => void;
  next: () => void;
  prev: () => void;
  seek: (t: number) => void;
  setVolume: (v: number) => void;
  toggleMute: () => void;
  toggleShuffle: () => void;
  cycleRepeat: () => void;
  toggleFavorite: (id: string) => void;

  addToQueue: (track: Track) => void;
  playNext: (track: Track) => void;
  removeFromQueue: (uid: string) => void;
  clearQueue: () => void;
  moveQueueItem: (from: number, to: number) => void;
  jumpToQueueItem: (uid: string) => void;

  setTime: (current: number, duration: number) => void;
  handleEnded: () => void;
  handleError: (message: string) => void;
};

function currentIndex(queue: QueueItem[], currentUid: string | null) {
  if (!currentUid) return -1;
  return queue.findIndex((q) => q.uid === currentUid);
}

function rebuildBag(queue: QueueItem[], currentUid: string | null) {
  const rest = queue.filter((q) => q.uid !== currentUid).map((q) => q.uid);
  return shuffleInPlace(rest);
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
  tracks: catalogTracks,
  queue: [],
  currentUid: null,
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  volume: 0.85,
  muted: false,
  shuffle: false,
  shufflePending: [],
  repeat: "off",
  favorites: [],
  recentlyPlayed: [],
  view: "home",
  libraryTab: "all",
  displayMode: "list",
  queueOpen: false,
  search: "",
  hydrated: false,
  selectedAlbum: null,
  selectedArtist: null,
  errorTrackId: null,

  persist: () => {
    if (typeof window === "undefined") return;
    const s = get();
    const data: Persisted = {
      volume: s.volume,
      muted: s.muted,
      shuffle: s.shuffle,
      repeat: s.repeat,
      favorites: s.favorites,
      recentlyPlayed: s.recentlyPlayed,
      queue: s.queue,
      currentUid: s.currentUid,
      currentTime: s.currentTime,
      view: s.view,
      libraryTab: s.libraryTab,
      displayMode: s.displayMode,
      queueOpen: s.queueOpen,
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      /* quota */
    }
  },

  hydrate: async () => {
    const saved = loadPersisted();
    const objectUrls: Track[] = [];
    if (typeof indexedDB !== "undefined") {
      try {
        const rows = await idbGetAll();
        for (const row of rows) {
          const audio = URL.createObjectURL(row.audioBlob);
          const cover = row.coverBlob
            ? URL.createObjectURL(row.coverBlob)
            : placeholderCover(row.id, row.title, row.artist);
          objectUrls.push(storedToTrack(row, { audio, cover }));
        }
      } catch {
        /* private mode */
      }
    }
    const tracks = [...catalogTracks, ...objectUrls];
    const known = new Set(tracks.map((t) => t.id));
    const queue = (saved.queue ?? []).filter((q) => known.has(q.trackId));
    let currentUid = saved.currentUid ?? null;
    if (currentUid && !queue.some((q) => q.uid === currentUid)) currentUid = queue[0]?.uid ?? null;
    const shuffle = saved.shuffle ?? false;
    set({
      tracks,
      volume: saved.volume ?? 0.85,
      muted: saved.muted ?? false,
      shuffle,
      repeat: saved.repeat ?? "off",
      favorites: (saved.favorites ?? []).filter((id) => known.has(id)),
      recentlyPlayed: (saved.recentlyPlayed ?? []).filter((e) => known.has(e.id)),
      queue,
      currentUid,
      currentTime: saved.currentTime ?? 0,
      view: saved.view ?? "home",
      libraryTab: saved.libraryTab ?? "all",
      displayMode: saved.displayMode ?? "list",
      queueOpen: saved.queueOpen ?? (typeof window !== "undefined" && window.innerWidth >= 1024),
      shufflePending: shuffle ? rebuildBag(queue, currentUid) : [],
      hydrated: true,
    });
    engine.setVolume(saved.volume ?? 0.85, saved.muted ?? false);
    const current = tracks.find((t) => t.id === queue.find((q) => q.uid === currentUid)?.trackId);
    if (current) {
      await engine.load(current.url, saved.currentTime ?? 0);
      set({ duration: current.duration });
    }
  },

  addTracks: (incoming) => {
    set((s) => {
      const existing = new Set(s.tracks.map((t) => t.filename + t.duration));
      const extra = incoming.filter((t) => !existing.has(t.filename + t.duration) || t.source === "import");
      return { tracks: [...s.tracks, ...extra] };
    });
    get().persist();
  },

  removeImported: async (id) => {
    await idbDelete(id);
    set((s) => {
      const tracks = s.tracks.filter((t) => t.id !== id);
      const queue = s.queue.filter((q) => q.trackId !== id);
      const currentUid = queue.some((q) => q.uid === s.currentUid) ? s.currentUid : queue[0]?.uid ?? null;
      return {
        tracks,
        queue,
        currentUid,
        favorites: s.favorites.filter((f) => f !== id),
      };
    });
    get().persist();
  },

  clearImported: async () => {
    await idbClear();
    set((s) => {
      const tracks = s.tracks.filter((t) => t.source === "catalog");
      const known = new Set(tracks.map((t) => t.id));
      const queue = s.queue.filter((q) => known.has(q.trackId));
      return {
        tracks,
        queue,
        currentUid: queue.some((q) => q.uid === s.currentUid) ? s.currentUid : queue[0]?.uid ?? null,
        favorites: s.favorites.filter((id) => known.has(id)),
      };
    });
    get().persist();
  },

  setView: (view) => {
    set({ view, selectedAlbum: null, selectedArtist: null });
    get().persist();
  },
  setLibraryTab: (libraryTab) => {
    set({ libraryTab, selectedAlbum: null, selectedArtist: null });
    get().persist();
  },
  setDisplayMode: (displayMode) => {
    set({ displayMode });
    get().persist();
  },
  setSearch: (search) => set({ search }),
  setQueueOpen: (queueOpen) => {
    set({ queueOpen });
    get().persist();
  },
  setSelectedAlbum: (selectedAlbum) => set({ selectedAlbum, selectedArtist: null }),
  setSelectedArtist: (selectedArtist) => set({ selectedArtist, selectedAlbum: null }),

  playTrack: (track, context) => {
    const s = get();
    const list = context && context.length ? context : [track];
    const queue: QueueItem[] = list.map((t) => ({ uid: uid(), trackId: t.id }));
    const match = queue.find((q) => q.trackId === track.id) ?? queue[0]!;
    const recentlyPlayed = [{ id: track.id, at: Date.now() }, ...s.recentlyPlayed.filter((e) => e.id !== track.id)].slice(0, 40);
    set({
      queue,
      currentUid: match.uid,
      isPlaying: true,
      currentTime: 0,
      duration: track.duration,
      errorTrackId: null,
      recentlyPlayed,
      shufflePending: s.shuffle ? rebuildBag(queue, match.uid) : [],
    });
    engine.setVolume(s.volume, s.muted);
    void engine.load(track.url, 0).then(() => engine.play());
    get().persist();
  },

  togglePlay: () => {
    const s = get();
    if (!s.currentUid) {
      const first = s.tracks[0];
      if (first) get().playTrack(first, s.tracks);
      return;
    }
    if (s.isPlaying) {
      engine.pause();
      set({ isPlaying: false });
    } else {
      const item = s.queue.find((q) => q.uid === s.currentUid);
      const track = s.tracks.find((t) => t.id === item?.trackId);
      if (track) {
        engine.setVolume(s.volume, s.muted);
        void engine.load(track.url, s.currentTime).then(() => engine.play());
        set({ isPlaying: true });
      }
    }
    get().persist();
  },

  next: () => {
    const s = get();
    if (!s.queue.length) return;
    if (s.repeat === "one" && s.currentUid) {
      engine.seek(0);
      void engine.play();
      set({ currentTime: 0, isPlaying: true });
      return;
    }
    const idx = currentIndex(s.queue, s.currentUid);
    let nextItem: QueueItem | undefined;
    let pending = s.shufflePending;
    if (s.shuffle) {
      if (pending.length === 0) {
        if (s.repeat === "queue") pending = rebuildBag(s.queue, s.currentUid);
        else {
          engine.pause();
          set({ isPlaying: false });
          get().persist();
          return;
        }
      }
      if (pending.length === 0) {
        nextItem = s.queue[idx] ?? s.queue[0];
      } else {
        const uidNext = pending[0]!;
        pending = pending.slice(1);
        nextItem = s.queue.find((q) => q.uid === uidNext);
      }
    } else {
      if (idx >= 0 && idx + 1 < s.queue.length) nextItem = s.queue[idx + 1];
      else if (s.repeat === "queue") nextItem = s.queue[0];
      else {
        engine.pause();
        set({ isPlaying: false });
        get().persist();
        return;
      }
    }
    if (!nextItem) return;
    const track = s.tracks.find((t) => t.id === nextItem.trackId);
    if (!track) return;
    const recentlyPlayed = [{ id: track.id, at: Date.now() }, ...s.recentlyPlayed.filter((e) => e.id !== track.id)].slice(0, 40);
    set({
      currentUid: nextItem.uid,
      isPlaying: true,
      currentTime: 0,
      duration: track.duration,
      shufflePending: pending,
      recentlyPlayed,
      errorTrackId: null,
    });
    engine.setVolume(s.volume, s.muted);
    void engine.load(track.url, 0).then(() => engine.play());
    get().persist();
  },

  prev: () => {
    const s = get();
    if (s.currentTime > 3) {
      engine.seek(0);
      set({ currentTime: 0 });
      get().persist();
      return;
    }
    const idx = currentIndex(s.queue, s.currentUid);
    if (idx <= 0) {
      engine.seek(0);
      set({ currentTime: 0 });
      return;
    }
    const prevItem = s.queue[idx - 1]!;
    const track = s.tracks.find((t) => t.id === prevItem.trackId);
    if (!track) return;
    set({
      currentUid: prevItem.uid,
      currentTime: 0,
      duration: track.duration,
      isPlaying: true,
      errorTrackId: null,
    });
    engine.setVolume(s.volume, s.muted);
    void engine.load(track.url, 0).then(() => engine.play());
    get().persist();
  },

  seek: (t) => {
    engine.seek(t);
    set({ currentTime: t });
    get().persist();
  },

  setVolume: (v) => {
    const volume = Math.min(1, Math.max(0, v));
    const muted = volume === 0 ? true : get().muted && volume > 0 ? false : get().muted;
    engine.setVolume(volume, muted);
    set({ volume, muted });
    get().persist();
  },

  toggleMute: () => {
    const s = get();
    const muted = !s.muted;
    engine.setVolume(s.volume, muted);
    set({ muted });
    get().persist();
  },

  toggleShuffle: () => {
    const s = get();
    const shuffle = !s.shuffle;
    set({
      shuffle,
      shufflePending: shuffle ? rebuildBag(s.queue, s.currentUid) : [],
    });
    get().persist();
  },

  cycleRepeat: () => {
    const order: RepeatMode[] = ["off", "queue", "one"];
    const next = order[(order.indexOf(get().repeat) + 1) % order.length]!;
    set({ repeat: next });
    get().persist();
  },

  toggleFavorite: (id) => {
    set((s) => ({
      favorites: s.favorites.includes(id) ? s.favorites.filter((f) => f !== id) : [...s.favorites, id],
    }));
    get().persist();
  },

  addToQueue: (track) => {
    const item: QueueItem = { uid: uid(), trackId: track.id };
    set((s) => {
      const queue = [...s.queue, item];
      const currentUid = s.currentUid ?? item.uid;
      const shufflePending = s.shuffle ? [...s.shufflePending, item.uid] : s.shufflePending;
      return { queue, currentUid, shufflePending };
    });
    get().persist();
  },

  playNext: (track) => {
    const item: QueueItem = { uid: uid(), trackId: track.id };
    set((s) => {
      const idx = currentIndex(s.queue, s.currentUid);
      const queue = [...s.queue];
      queue.splice(idx + 1, 0, item);
      const currentUid = s.currentUid ?? item.uid;
      const shufflePending = s.shuffle ? [item.uid, ...s.shufflePending] : s.shufflePending;
      return { queue, currentUid, shufflePending };
    });
    get().persist();
  },

  removeFromQueue: (itemUid) => {
    const s = get();
    const wasCurrent = s.currentUid === itemUid;
    const idx = currentIndex(s.queue, itemUid);
    const queue = s.queue.filter((q) => q.uid !== itemUid);
    const shufflePending = s.shufflePending.filter((id) => id !== itemUid);
    if (!wasCurrent) {
      set({ queue, shufflePending });
      get().persist();
      return;
    }
    if (!queue.length) {
      engine.pause();
      set({ queue, currentUid: null, isPlaying: false, currentTime: 0, shufflePending: [] });
      get().persist();
      return;
    }
    const nextItem = queue[Math.min(Math.max(idx, 0), queue.length - 1)]!;
    const track = s.tracks.find((t) => t.id === nextItem.trackId);
    set({
      queue,
      currentUid: nextItem.uid,
      shufflePending,
      currentTime: 0,
      duration: track?.duration ?? 0,
    });
    if (track && s.isPlaying) {
      void engine.load(track.url, 0).then(() => engine.play());
    }
    get().persist();
  },

  clearQueue: () => {
    engine.pause();
    set({ queue: [], currentUid: null, isPlaying: false, currentTime: 0, shufflePending: [] });
    get().persist();
  },

  moveQueueItem: (from, to) => {
    set((s) => {
      if (from === to || from < 0 || to < 0 || from >= s.queue.length || to >= s.queue.length) return s;
      const queue = [...s.queue];
      const [item] = queue.splice(from, 1);
      if (!item) return s;
      queue.splice(to, 0, item);
      return { queue };
    });
    get().persist();
  },

  jumpToQueueItem: (itemUid) => {
    const s = get();
    const item = s.queue.find((q) => q.uid === itemUid);
    if (!item) return;
    const track = s.tracks.find((t) => t.id === item.trackId);
    if (!track) return;
    const recentlyPlayed = [{ id: track.id, at: Date.now() }, ...s.recentlyPlayed.filter((e) => e.id !== track.id)].slice(0, 40);
    set({
      currentUid: itemUid,
      isPlaying: true,
      currentTime: 0,
      duration: track.duration,
      recentlyPlayed,
      errorTrackId: null,
      shufflePending: s.shuffle ? rebuildBag(s.queue, itemUid) : s.shufflePending,
    });
    engine.setVolume(s.volume, s.muted);
    void engine.load(track.url, 0).then(() => engine.play());
    get().persist();
  },

  setTime: (currentTime, duration) => {
    set((s) => ({
      currentTime,
      duration: duration > 0 ? duration : s.duration,
    }));
  },

  handleEnded: () => {
    const s = get();
    if (s.repeat === "one") {
      engine.seek(0);
      void engine.play();
      set({ currentTime: 0, isPlaying: true });
      return;
    }
    get().next();
  },

  handleError: () => {
    const s = get();
    const item = s.queue.find((q) => q.uid === s.currentUid);
    set({ errorTrackId: item?.trackId ?? null, isPlaying: false });
    window.setTimeout(() => get().next(), 600);
  },
}));

export function selectCurrentTrack(s: PlayerState): Track | undefined {
  const item = s.queue.find((q) => q.uid === s.currentUid);
  if (!item) return undefined;
  return s.tracks.find((t) => t.id === item.trackId);
}
