import { Heart, ListPlus, Pause, Play } from "lucide-react";
import { toast } from "sonner";
import { CoverArt } from "@/components/cover-art";
import { Visualizer } from "@/components/visualizer";
import { Waveform } from "@/components/waveform";
import { Button } from "@/components/ui/button";
import { formatTime } from "@/lib/utils";
import { selectCurrentTrack, usePlayerStore } from "@/store/player-store";
import { useVisibleTracks } from "@/components/library-views";

export function NowPlayingHero() {
  const track = usePlayerStore(selectCurrentTrack);
  const isPlaying = usePlayerStore((s) => s.isPlaying);
  const currentTime = usePlayerStore((s) => s.currentTime);
  const duration = usePlayerStore((s) => s.duration);
  const favorites = usePlayerStore((s) => s.favorites);
  const togglePlay = usePlayerStore((s) => s.togglePlay);
  const seek = usePlayerStore((s) => s.seek);
  const addToQueue = usePlayerStore((s) => s.addToQueue);
  const toggleFavorite = usePlayerStore((s) => s.toggleFavorite);
  const playTrack = usePlayerStore((s) => s.playTrack);
  const visible = useVisibleTracks();
  const search = usePlayerStore((s) => s.search);

  if (search.trim()) return null;
  const featured = track ?? visible[0];
  if (!featured) return null;
  const liked = favorites.includes(featured.id);
  const dur = (track && (duration || track.duration)) || featured.duration;
  const progress = track && dur > 0 ? currentTime / dur : 0;

  return (
    <section className="mb-8 grid gap-6 rounded-2xl border border-border bg-surface p-4 sm:grid-cols-[auto_minmax(0,1fr)] sm:p-6">
      <CoverArt track={featured} size="xl" className="mx-auto size-48 rounded-xl sm:mx-0 sm:size-56" />
      <div className="flex min-w-0 flex-col justify-end">
        <p className="text-xs font-medium tracking-widest text-accent uppercase">
          {track ? "Now playing" : "Up next"}
        </p>
        <h2 className="mt-1 font-display text-3xl font-semibold tracking-tight sm:text-4xl">{featured.title}</h2>
        <p className="mt-1 text-fg-muted">
          {featured.artist}
          <span className="text-fg-subtle">
            {" "}
            · {featured.album}
            {featured.year ? ` · ${featured.year}` : ""} · {formatTime(featured.duration)}
          </span>
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <Button
            onClick={() => {
              if (track) togglePlay();
              else playTrack(featured, visible);
            }}
            className="rounded-full px-5"
          >
            {track && isPlaying ? <Pause className="size-4 fill-current" /> : <Play className="size-4 fill-current" />}
            {track && isPlaying ? "Pause" : "Play"}
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              addToQueue(featured);
              toast.success("Added to queue", { description: featured.title });
            }}
          >
            <ListPlus className="size-4" /> Queue
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => toggleFavorite(featured.id)}
            aria-label="Favorite"
            className={liked ? "text-accent" : ""}
          >
            <Heart className={`size-4 ${liked ? "fill-current" : ""}`} />
          </Button>
        </div>
        <Waveform
          peaks={featured.peaks}
          progress={track ? progress : 0}
          onSeek={track ? (r) => seek(r * dur) : undefined}
          className="mt-5 h-14"
        />
        <Visualizer active={Boolean(track && isPlaying)} className="mt-2 h-12" />
      </div>
    </section>
  );
}
