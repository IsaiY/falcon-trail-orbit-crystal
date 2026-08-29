import { ListMusic } from "lucide-react";
import { TrackRow } from "@/components/track-row";
import { CoverArt } from "@/components/cover-art";
import { Skeleton } from "@/components/ui/skeleton";
import type { Track } from "@/lib/music/types";
import { cn, formatTime } from "@/lib/utils";
import { usePlayerStore } from "@/store/player-store";

export function TrackList({
  tracks,
  emptyTitle,
  emptyHint,
}: {
  tracks: Track[];
  emptyTitle: string;
  emptyHint: string;
}) {
  const hydrated = usePlayerStore((s) => s.hydrated);
  const displayMode = usePlayerStore((s) => s.displayMode);
  const playTrack = usePlayerStore((s) => s.playTrack);

  if (!hydrated) {
    return (
      <div className="flex flex-col gap-2">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3 px-2 py-2">
            <Skeleton className="size-12 rounded-md" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-3 w-1/3" />
              <Skeleton className="h-3 w-1/4" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!tracks.length) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border px-6 py-16 text-center">
        <ListMusic className="size-8 text-fg-subtle" />
        <p className="font-display text-lg font-semibold">{emptyTitle}</p>
        <p className="max-w-sm text-sm text-fg-muted">{emptyHint}</p>
      </div>
    );
  }

  if (displayMode === "grid") {
    return (
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {tracks.map((track) => (
          <button
            key={track.id}
            type="button"
            onClick={() => playTrack(track, tracks)}
            className="group rounded-xl bg-surface p-3 text-left transition-colors duration-150 hover:bg-surface-hover"
          >
            <CoverArt track={track} className="mb-3 aspect-square size-full rounded-lg" showPlay />
            <p className="truncate text-sm font-medium">{track.title}</p>
            <p className="truncate text-xs text-fg-muted">{track.artist}</p>
            <p className="mt-1 text-xs text-fg-subtle tabular">{formatTime(track.duration)}</p>
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col")}>
      {tracks.map((track, i) => (
        <TrackRow key={track.id} track={track} context={tracks} index={i} />
      ))}
    </div>
  );
}
