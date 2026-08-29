import { useEffect, useState } from "react";
import { toast } from "sonner";
import { filesFromDataTransfer, importAudioFiles } from "@/lib/music/import-files";
import { usePlayerStore } from "@/store/player-store";

export function DropOverlay() {
  const [active, setActive] = useState(false);
  const addTracks = usePlayerStore((s) => s.addTracks);

  useEffect(() => {
    let depth = 0;
    const onEnter = (e: DragEvent) => {
      if (!e.dataTransfer?.types?.includes("Files")) return;
      e.preventDefault();
      depth += 1;
      setActive(true);
    };
    const onOver = (e: DragEvent) => {
      if (!e.dataTransfer?.types?.includes("Files")) return;
      e.preventDefault();
      e.dataTransfer.dropEffect = "copy";
    };
    const onLeave = (e: DragEvent) => {
      if (!e.dataTransfer?.types?.includes("Files")) return;
      e.preventDefault();
      depth = Math.max(0, depth - 1);
      if (depth === 0) setActive(false);
    };
    const onDrop = (e: DragEvent) => {
      e.preventDefault();
      depth = 0;
      setActive(false);
      const dt = e.dataTransfer;
      if (!dt) return;
      void (async () => {
        const files = await filesFromDataTransfer(dt);
        if (!files.length) {
          toast.message("No audio files in that drop");
          return;
        }
        const result = await importAudioFiles(files);
        if (result.tracks.length) {
          addTracks(result.tracks);
          toast.success(`Added ${result.tracks.length} track${result.tracks.length === 1 ? "" : "s"}`);
        }
        for (const err of result.errors) toast.error(err.name, { description: err.message });
      })();
    };
    window.addEventListener("dragenter", onEnter);
    window.addEventListener("dragover", onOver);
    window.addEventListener("dragleave", onLeave);
    window.addEventListener("drop", onDrop);
    return () => {
      window.removeEventListener("dragenter", onEnter);
      window.removeEventListener("dragover", onOver);
      window.removeEventListener("dragleave", onLeave);
      window.removeEventListener("drop", onDrop);
    };
  }, [addTracks]);

  if (!active) return null;
  return (
    <div className="fixed inset-0 z-overlay flex items-center justify-center bg-bg/80 p-6">
      <div className="w-full max-w-md rounded-2xl border border-dashed border-accent px-8 py-16 text-center">
        <p className="font-display text-2xl font-semibold">Drop to add</p>
        <p className="mt-2 text-sm text-fg-muted">MP3, WAV, FLAC, OGG, and M4A files join your library.</p>
      </div>
    </div>
  );
}
