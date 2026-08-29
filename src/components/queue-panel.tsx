import type { ReactNode } from "react";
import {
  closestCenter,
  DndContext,
  type DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Trash2, X } from "lucide-react";
import { TrackRow } from "@/components/track-row";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { usePlayerStore } from "@/store/player-store";

function SortableItem({
  id,
  children,
}: {
  id: string;
  children: ReactNode;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={cn("flex items-center gap-1", isDragging && "z-10 opacity-80")}
    >
      <button
        type="button"
        className="touch-none p-1 text-fg-subtle hover:text-fg"
        aria-label="Reorder"
        {...attributes}
        {...listeners}
      >
        <GripVertical className="size-4" />
      </button>
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}

export function QueuePanel() {
  const queue = usePlayerStore((s) => s.queue);
  const tracks = usePlayerStore((s) => s.tracks);
  const currentUid = usePlayerStore((s) => s.currentUid);
  const jumpToQueueItem = usePlayerStore((s) => s.jumpToQueueItem);
  const moveQueueItem = usePlayerStore((s) => s.moveQueueItem);
  const clearQueue = usePlayerStore((s) => s.clearQueue);
  const setQueueOpen = usePlayerStore((s) => s.setQueueOpen);
  const queueOpen = usePlayerStore((s) => s.queueOpen);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const from = queue.findIndex((q) => q.uid === active.id);
    const to = queue.findIndex((q) => q.uid === over.id);
    if (from >= 0 && to >= 0) moveQueueItem(from, to);
  };

  const items = queue
    .map((item) => {
      const track = tracks.find((t) => t.id === item.trackId);
      return track ? { item, track } : null;
    })
    .filter((x): x is { item: (typeof queue)[number]; track: (typeof tracks)[number] } => x !== null);

  return (
    <aside
      className={cn(
        "flex h-full w-full flex-col border-l border-border bg-surface",
        "max-lg:fixed max-lg:top-14 max-lg:right-0 max-lg:bottom-28 max-lg:z-50 max-lg:w-full max-lg:max-w-sm max-lg:shadow-panel",
        "max-lg:transition-transform max-lg:duration-300 max-lg:ease-[cubic-bezier(0.22,1,0.36,1)]",
        queueOpen ? "max-lg:translate-x-0" : "max-lg:translate-x-full",
        !queueOpen && "lg:hidden",
      )}
    >
      <div className="flex h-14 items-center justify-between border-b border-border px-3">
        <div>
          <p className="font-display text-sm font-semibold">Queue</p>
          <p className="text-xs text-fg-muted">{queue.length} tracks</p>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" onClick={clearQueue} disabled={!queue.length}>
            <Trash2 className="size-3.5" />
            Clear
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            className="lg:hidden"
            onClick={() => setQueueOpen(false)}
            aria-label="Close queue"
          >
            <X className="size-4" />
          </Button>
        </div>
      </div>
      {items.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-2 px-6 text-center">
          <p className="font-display font-semibold">Queue is empty</p>
          <p className="text-sm text-fg-muted">Add tracks from your library. You can drop the same track more than once.</p>
        </div>
      ) : (
        <ScrollArea className="flex-1">
          <div className="p-2 pb-28">
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
              <SortableContext items={queue.map((q) => q.uid)} strategy={verticalListSortingStrategy}>
                {items.map(({ item, track }) => (
                  <SortableItem key={item.uid} id={item.uid}>
                    <div onDoubleClick={() => jumpToQueueItem(item.uid)}>
                      <TrackRow
                        track={track}
                        context={items.map((x) => x.track)}
                        inQueue
                        queueUid={item.uid}
                      />
                    </div>
                  </SortableItem>
                ))}
              </SortableContext>
            </DndContext>
            <p className="px-3 pt-2 text-xs text-fg-subtle">Drag to reorder. Double-click to play.</p>
          </div>
        </ScrollArea>
      )}
    </aside>
  );
}
