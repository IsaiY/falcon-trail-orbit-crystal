import type { ReactNode } from "react";
import {
  Pause,
  Play,
  Repeat,
  Repeat1,
  Shuffle,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
} from "lucide-react";
import { CoverArt } from "@/components/cover-art";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Waveform } from "@/components/waveform";
import { hashPeaks } from "@/lib/music/covers";
import { cn, formatTime } from "@/lib/utils";
import { selectCurrentTrack, usePlayerStore } from "@/store/player-store";

function Tip({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  );
}

export function PlayerBar() {
  const track = usePlayerStore(selectCurrentTrack);
  const isPlaying = usePlayerStore((s) => s.isPlaying);
  const currentTime = usePlayerStore((s) => s.currentTime);
  const duration = usePlayerStore((s) => s.duration);
  const volume = usePlayerStore((s) => s.volume);
  const muted = usePlayerStore((s) => s.muted);
  const shuffle = usePlayerStore((s) => s.shuffle);
  const repeat = usePlayerStore((s) => s.repeat);
  const togglePlay = usePlayerStore((s) => s.togglePlay);
  const next = usePlayerStore((s) => s.next);
  const prev = usePlayerStore((s) => s.prev);
  const seek = usePlayerStore((s) => s.seek);
  const setVolume = usePlayerStore((s) => s.setVolume);
  const toggleMute = usePlayerStore((s) => s.toggleMute);
  const toggleShuffle = usePlayerStore((s) => s.toggleShuffle);
  const cycleRepeat = usePlayerStore((s) => s.cycleRepeat);

  const dur = duration || track?.duration || 0;
  const progress = dur > 0 ? currentTime / dur : 0;
  const peaks = track?.peaks?.length ? track.peaks : hashPeaks(track?.id || "empty");
  const RepeatIcon = repeat === "one" ? Repeat1 : Repeat;

  return (
    <footer className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-surface/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md">
      <div className="grid grid-cols-1 items-center gap-2 px-3 py-2 sm:grid-cols-[minmax(0,1.1fr)_minmax(0,1.6fr)_minmax(0,1fr)] sm:px-4 sm:py-3">
        <div className="flex min-w-0 items-center gap-3">
          {track ? (
            <CoverArt track={track} size="md" className="size-12 rounded-md sm:size-14" />
          ) : (
            <div className="size-12 rounded-md bg-surface-elevated sm:size-14" />
          )}
          <div className="min-w-0">
            <p className="truncate text-sm font-medium">{track?.title ?? "Nothing playing"}</p>
            <p className="truncate text-xs text-fg-muted">{track?.artist ?? "Choose a track"}</p>
          </div>
          <div className="ml-auto flex items-center gap-1 sm:hidden">
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={toggleShuffle}
              aria-label="Shuffle"
              className={cn(shuffle && "text-accent")}
            >
              <Shuffle className="size-4" />
            </Button>
            <Button variant="ghost" size="icon-sm" onClick={prev} aria-label="Previous">
              <SkipBack className="size-4 fill-current" />
            </Button>
            <Button
              size="icon"
              className="size-10 rounded-full"
              onClick={togglePlay}
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause className="size-4 fill-current" /> : <Play className="size-4 fill-current" />}
            </Button>
            <Button variant="ghost" size="icon-sm" onClick={next} aria-label="Next">
              <SkipForward className="size-4 fill-current" />
            </Button>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={cycleRepeat}
              aria-label="Repeat"
              className={cn(repeat !== "off" && "text-accent")}
            >
              <RepeatIcon className="size-4" />
            </Button>
          </div>
        </div>

        <div className="flex min-w-0 flex-col gap-1">
          <div className="hidden items-center justify-center gap-1 sm:flex">
            <Tip label="Shuffle">
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={toggleShuffle}
                aria-label="Shuffle"
                className={cn(shuffle && "text-accent")}
              >
                <Shuffle className="size-4" />
              </Button>
            </Tip>
            <Tip label="Previous">
              <Button variant="ghost" size="icon-sm" onClick={prev} aria-label="Previous">
                <SkipBack className="size-4 fill-current" />
              </Button>
            </Tip>
            <Button
              size="icon"
              className="size-11 rounded-full"
              onClick={togglePlay}
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause className="size-5 fill-current" /> : <Play className="size-5 fill-current" />}
            </Button>
            <Tip label="Next">
              <Button variant="ghost" size="icon-sm" onClick={next} aria-label="Next">
                <SkipForward className="size-4 fill-current" />
              </Button>
            </Tip>
            <Tip label={repeat === "off" ? "Repeat off" : repeat === "queue" ? "Repeat queue" : "Repeat track"}>
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={cycleRepeat}
                aria-label="Repeat"
                className={cn(repeat !== "off" && "text-accent")}
              >
                <RepeatIcon className="size-4" />
              </Button>
            </Tip>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-9 text-right text-xs text-fg-subtle tabular">{formatTime(currentTime)}</span>
            <Waveform
              peaks={peaks}
              progress={progress}
              onSeek={(r) => seek(r * dur)}
              className="h-8 flex-1 sm:h-10"
            />
            <span className="w-9 text-xs text-fg-subtle tabular">{formatTime(dur)}</span>
          </div>
        </div>

        <div className="hidden items-center justify-end gap-2 sm:flex">
          <Button variant="ghost" size="icon-sm" onClick={toggleMute} aria-label={muted ? "Unmute" : "Mute"}>
            {muted || volume === 0 ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
          </Button>
          <Slider
            value={[muted ? 0 : volume]}
            min={0}
            max={1}
            step={0.01}
            onValueChange={(v) => setVolume(v[0] ?? 0)}
            className="w-28"
            aria-label="Volume"
          />
        </div>
      </div>
    </footer>
  );
}
