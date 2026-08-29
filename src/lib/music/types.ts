export type RepeatMode = "off" | "queue" | "one";
export type AppView = "home" | "library" | "queue";
export type LibraryTab = "all" | "recent" | "favorites" | "albums" | "artists";
export type DisplayMode = "list" | "grid";
export type TrackSource = "catalog" | "import";

export type Track = {
  id: string;
  title: string;
  artist: string;
  album: string;
  year?: number;
  duration: number;
  filename: string;
  url: string;
  coverUrl?: string;
  peaks: number[];
  source: TrackSource;
};

export type QueueItem = {
  uid: string;
  trackId: string;
};

export type RecentEntry = {
  id: string;
  at: number;
};
