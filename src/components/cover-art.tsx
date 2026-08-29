import { Pause, Play } from "lucide-react";
import { placeholderCover } from "@/lib/music/covers";
import type { Track } from "@/lib/music/types";
import { cn } from "@/lib/utils";

type CoverArtProps = {
  track: Track;
  size?: "sm" | "md" | "lg" | "xl";
  playing?: boolean;
  showPlay?: boolean;
  className?: string;
};

const sizes = {
  sm: "size-10 rounded-sm",
  md: "size-12 rounded-md",
  lg: "size-16 rounded-md",
  xl: "size-56 rounded-xl sm:size-64",
};

export function CoverArt({ track, size = "md", playing, showPlay, className }: CoverArtProps) {
  const src = track.coverUrl || placeholderCover(track.id, track.title, track.artist);
  return (
    <div
      className={cn(
        "relative shrink-0 overflow-hidden bg-surface-elevated",
        sizes[size],
        className,
      )}
    >
      <img
        src={src}
        alt=""
        draggable={false}
        className="size-full object-cover"
      />
      {showPlay ? (
        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center bg-bg/40 transition-opacity duration-150",
            playing ? "opacity-100" : "opacity-0 group-hover:opacity-100",
          )}
        >
          <span className="flex size-8 items-center justify-center rounded-full bg-accent text-accent-fg shadow-panel">
            {playing ? <Pause className="size-3.5 fill-current" /> : <Play className="size-3.5 fill-current" />}
          </span>
        </div>
      ) : null}
    </div>
  );
}

export function PlayingBars({ className }: { className?: string }) {
  return (
    <span className={cn("flex h-3 items-end gap-0.5", className)} aria-hidden>
      <span className="eq-bar w-0.5 rounded-full bg-accent" style={{ height: "100%" }} />
      <span className="eq-bar w-0.5 rounded-full bg-accent" style={{ height: "70%" }} />
      <span className="eq-bar w-0.5 rounded-full bg-accent" style={{ height: "90%" }} />
    </span>
  );
}
