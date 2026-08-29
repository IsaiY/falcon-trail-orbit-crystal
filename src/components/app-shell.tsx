import { useState } from "react";
import { Toaster } from "sonner";
import { DropOverlay } from "@/components/drop-overlay";
import { KeyboardShortcuts } from "@/components/keyboard-shortcuts";
import { MainLibrary } from "@/components/library-views";
import { Navbar } from "@/components/navbar";
import { NowPlayingHero } from "@/components/now-playing";
import { PlayerBar } from "@/components/player-bar";
import { PlayerSync } from "@/components/player-sync";
import { QueuePanel } from "@/components/queue-panel";
import { SettingsDialog } from "@/components/settings-dialog";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { usePlayerStore } from "@/store/player-store";

export function AppShell() {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const view = usePlayerStore((s) => s.view);
  const queueOpen = usePlayerStore((s) => s.queueOpen);
  const setQueueOpen = usePlayerStore((s) => s.setQueueOpen);
  const search = usePlayerStore((s) => s.search);

  return (
    <TooltipProvider delayDuration={250}>
      <PlayerSync />
      <KeyboardShortcuts />
      <DropOverlay />
      <SettingsDialog open={settingsOpen} onOpenChange={setSettingsOpen} />
      <Toaster
        theme="dark"
        position="bottom-right"
        offset={{ bottom: 108, right: 16 }}
        toastOptions={{
          className: "border-border bg-surface-elevated text-fg shadow-panel font-sans",
        }}
      />
      <div className="flex min-h-dvh flex-col bg-bg text-fg">
        <Navbar onOpenSettings={() => setSettingsOpen(true)} />
        <div className="flex min-h-0 flex-1">
          <main
            className={cn(
              "min-w-0 flex-1 overflow-y-auto px-4 pt-6 pb-32 sm:px-8",
              queueOpen && "lg:mr-80",
            )}
          >
            <div className="mx-auto max-w-5xl">
              {view === "home" && !search.trim() ? <NowPlayingHero /> : null}
              <MainLibrary />
            </div>
          </main>
          <div className="hidden lg:block">
            <div className="fixed top-14 right-0 bottom-28 w-80">
              <QueuePanel />
            </div>
          </div>
        </div>
        {queueOpen ? (
          <button
            type="button"
            className="fixed inset-0 z-40 bg-bg/50 lg:hidden"
            aria-label="Close queue"
            onClick={() => setQueueOpen(false)}
          />
        ) : null}
        <div className="lg:hidden">
          <QueuePanel />
        </div>
        <PlayerBar />
      </div>
    </TooltipProvider>
  );
}
