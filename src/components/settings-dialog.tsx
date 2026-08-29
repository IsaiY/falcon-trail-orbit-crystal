import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { filesFromDirectoryHandle, importAudioFiles } from "@/lib/music/import-files";
import { usePlayerStore } from "@/store/player-store";

const SHORTCUTS = [
  ["Space", "Play / Pause"],
  ["←", "Previous track"],
  ["→", "Next track"],
  ["↑", "Volume up"],
  ["↓", "Volume down"],
  ["M", "Mute"],
  ["S", "Shuffle"],
  ["R", "Cycle repeat"],
];

export function SettingsDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const fileRef = useRef<HTMLInputElement>(null);
  const dirRef = useRef<HTMLInputElement>(null);
  const addTracks = usePlayerStore((s) => s.addTracks);
  const clearImported = usePlayerStore((s) => s.clearImported);
  const tracks = usePlayerStore((s) => s.tracks);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    dirRef.current?.setAttribute("webkitdirectory", "");
    dirRef.current?.setAttribute("directory", "");
  }, []);

  const ingest = async (files: File[]) => {
    if (!files.length) {
      toast.message("No audio files found");
      return;
    }
    setBusy(true);
    try {
      const result = await importAudioFiles(files);
      if (result.tracks.length) {
        addTracks(result.tracks);
        toast.success(`Added ${result.tracks.length} track${result.tracks.length === 1 ? "" : "s"}`);
      }
      for (const err of result.errors) {
        toast.error(err.name, { description: err.message });
      }
    } finally {
      setBusy(false);
    }
  };

  const pickFolder = async () => {
    const picker = (window as Window & { showDirectoryPicker?: () => Promise<FileSystemDirectoryHandle> })
      .showDirectoryPicker;
    if (picker) {
      try {
        const dir = await picker();
        const files = await filesFromDirectoryHandle(dir);
        await ingest(files);
        return;
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return;
      }
    }
    dirRef.current?.click();
  };

  const imported = tracks.filter((t) => t.source === "import").length;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>
            Ember plays files from this session’s library. Drop files onto the page or import a folder from your computer.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <section>
            <p className="mb-2 text-xs font-medium tracking-wide text-fg-muted uppercase">Library</p>
            <p className="mb-3 text-sm text-fg-muted">
              {tracks.length} tracks · {imported} imported
            </p>
            <div className="flex flex-wrap gap-2">
              <Button size="sm" disabled={busy} onClick={() => fileRef.current?.click()}>
                Import files
              </Button>
              <Button size="sm" variant="secondary" disabled={busy} onClick={() => void pickFolder()}>
                Import folder
              </Button>
              <Button
                size="sm"
                variant="outline"
                disabled={!imported || busy}
                onClick={() => {
                  void clearImported();
                  toast.message("Imported tracks cleared");
                }}
              >
                Clear imported
              </Button>
            </div>
            <input
              ref={fileRef}
              type="file"
              accept="audio/*,.mp3,.wav,.flac,.ogg,.m4a,.aac"
              multiple
              className="hidden"
              onChange={(e) => {
                const files = [...(e.target.files ?? [])];
                e.target.value = "";
                void ingest(files);
              }}
            />
            <input
              ref={dirRef}
              type="file"
              multiple
              className="hidden"
              onChange={(e) => {
                const files = [...(e.target.files ?? [])];
                e.target.value = "";
                void ingest(files);
              }}
            />
          </section>
          <section>
            <p className="mb-2 text-xs font-medium tracking-wide text-fg-muted uppercase">Keyboard</p>
            <ul className="divide-y divide-border rounded-lg border border-border">
              {SHORTCUTS.map(([key, label]) => (
                <li key={key} className="flex items-center justify-between px-3 py-2 text-sm">
                  <span className="text-fg-muted">{label}</span>
                  <kbd className="rounded-md border border-border bg-surface-elevated px-2 py-0.5 font-mono text-xs">
                    {key}
                  </kbd>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
}
