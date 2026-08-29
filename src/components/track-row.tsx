import {
  Copy,
  FolderOpen,
  Heart,
  ListPlus,
  ListStart,
  MoreHorizontal,
  Play,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";
import { CoverArt, PlayingBars } from "@/components/cover-art";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Track } from "@/lib/music/types";
import { cn, formatTime } from "@/lib/utils";
import { selectCurrentTrack, usePlayerStore } from "@/store/player-store";

type TrackRowProps = {
  track: Track;
  context: Track[];
  index?: number;
  inQueue?: boolean;
  queueUid?: string;
};

export function TrackRow({ track, context, index, inQueue, queueUid }: TrackRowProps) {
  const current = usePlayerStore(selectCurrentTrack);
  const isPlaying = usePlayerStore((s) => s.isPlaying);
  const favorites = usePlayerStore((s) => s.favorites);
  const playTrack = usePlayerStore((s) => s.playTrack);
  const togglePlay = usePlayerStore((s) => s.togglePlay);
  const addToQueue = usePlayerStore((s) => s.addToQueue);
  const playNext = usePlayerStore((s) => s.playNext);
  const toggleFavorite = usePlayerStore((s) => s.toggleFavorite);
  const removeFromQueue = usePlayerStore((s) => s.removeFromQueue);
  const currentUid = usePlayerStore((s) => s.currentUid);
  const jumpToQueueItem = usePlayerStore((s) => s.jumpToQueueItem);

  const isCurrent = current?.id === track.id && (!queueUid || queueUid === currentUid);
  const liked = favorites.includes(track.id);

  const onPlay = () => {
    if (queueUid) {
      if (queueUid === currentUid) togglePlay();
      else jumpToQueueItem(queueUid);
      return;
    }
    if (isCurrent) togglePlay();
    else playTrack(track, context);
  };

  return (
    <div
      className={cn(
        "group grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-lg px-2 py-2 transition-colors duration-150",
        "hover:bg-surface-hover",
        isCurrent && "bg-accent-soft",
      )}
    >
      <button type="button" onClick={onPlay} className="relative" aria-label={`Play ${track.title}`}>
        <CoverArt track={track} size="md" showPlay playing={isCurrent && isPlaying} />
      </button>
      <button type="button" onClick={onPlay} className="min-w-0 text-left">
        <div className="flex items-center gap-2">
          {typeof index === "number" ? (
            <span className="hidden w-5 text-right text-xs text-fg-subtle tabular sm:inline">
              {isCurrent && isPlaying ? <PlayingBars /> : index + 1}
            </span>
          ) : null}
          <div className="min-w-0">
            <p className={cn("truncate text-sm font-medium", isCurrent && "text-accent")}>
              {track.title}
            </p>
            <p className="truncate text-xs text-fg-muted">
              {track.artist}
              <span className="text-fg-subtle"> · {track.album}</span>
            </p>
          </div>
        </div>
      </button>
      <div className="flex items-center gap-0.5">
        <span className="mr-1 hidden text-xs text-fg-subtle tabular sm:inline">
          {formatTime(track.duration)}
        </span>
        <Button
          variant="ghost"
          size="icon-sm"
          className={cn(
            "text-fg-muted",
            liked ? "text-accent opacity-100" : "opacity-0 group-hover:opacity-100 max-sm:opacity-100",
          )}
          aria-label={liked ? "Remove from favorites" : "Add to favorites"}
          onClick={() => {
            toggleFavorite(track.id);
            toast(liked ? "Removed from favorites" : "Added to favorites");
          }}
        >
          <Heart className={cn("size-4", liked && "fill-current")} />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon-sm"
              className="text-fg-muted opacity-0 group-hover:opacity-100 max-sm:opacity-100"
              aria-label="Track actions"
            >
              <MoreHorizontal className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onSelect={onPlay}>
              <Play className="size-4" /> Play
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={() => {
                playNext(track);
                toast.success("Playing next", { description: track.title });
              }}
            >
              <ListStart className="size-4" /> Play next
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={() => {
                addToQueue(track);
                toast.success("Added to queue", { description: track.title });
              }}
            >
              <ListPlus className="size-4" /> Add to queue
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => toggleFavorite(track.id)}>
              <Heart className={cn("size-4", liked && "fill-current")} />
              {liked ? "Remove from favorites" : "Add to favorites"}
            </DropdownMenuItem>
            {inQueue && queueUid ? (
              <DropdownMenuItem onSelect={() => removeFromQueue(queueUid)}>
                <Trash2 className="size-4" /> Remove from queue
              </DropdownMenuItem>
            ) : null}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onSelect={() => {
                void navigator.clipboard.writeText(track.filename);
                toast.success("Copied file name");
              }}
            >
              <Copy className="size-4" /> Copy file name
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={() => {
                const loc =
                  track.source === "catalog" ? `/music/${track.filename}` : track.filename;
                void navigator.clipboard.writeText(loc);
                toast.message("File location", { description: loc });
              }}
            >
              <FolderOpen className="size-4" /> Show file location
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
