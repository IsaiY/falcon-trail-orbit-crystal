import type { ReactNode } from "react";
import { Home, LayoutGrid, List, ListMusic, Search, Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { usePlayerStore } from "@/store/player-store";

export function LogoMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "flex size-8 items-center justify-center rounded-md bg-accent text-accent-fg",
        className,
      )}
      aria-hidden
    >
      <svg viewBox="0 0 24 24" className="size-4" fill="currentColor">
        <rect x="3" y="10" width="3" height="10" rx="1" />
        <rect x="9" y="4" width="3" height="16" rx="1" />
        <rect x="15" y="7" width="3" height="13" rx="1" />
      </svg>
    </span>
  );
}

export function Navbar({ onOpenSettings }: { onOpenSettings: () => void }) {
  const view = usePlayerStore((s) => s.view);
  const setView = usePlayerStore((s) => s.setView);
  const queueOpen = usePlayerStore((s) => s.queueOpen);
  const setQueueOpen = usePlayerStore((s) => s.setQueueOpen);
  const search = usePlayerStore((s) => s.search);
  const setSearch = usePlayerStore((s) => s.setSearch);
  const displayMode = usePlayerStore((s) => s.displayMode);
  const setDisplayMode = usePlayerStore((s) => s.setDisplayMode);

  const navBtn = (id: "home" | "library", label: string, icon: ReactNode) => (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setView(id)}
      className={cn(
        "h-9 gap-2 px-3",
        view === id && "bg-surface-hover text-fg",
      )}
    >
      {icon}
      <span className="hidden sm:inline">{label}</span>
    </Button>
  );

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/90 backdrop-blur-md">
      <div className="flex h-14 items-center gap-2 px-3 sm:px-5">
        <button
          type="button"
          className="flex items-center gap-2 pr-2"
          onClick={() => setView("home")}
          aria-label="Ember home"
        >
          <LogoMark />
          <span className="font-display text-base font-bold tracking-tight">EMBER</span>
        </button>
        <nav className="flex items-center gap-0.5">
          {navBtn("home", "Home", <Home className="size-4" />)}
          {navBtn("library", "Library", <ListMusic className="size-4" />)}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setQueueOpen(!queueOpen)}
            className={cn("h-9 gap-2 px-3", queueOpen && "bg-surface-hover text-fg")}
          >
            <List className="size-4" />
            <span className="hidden sm:inline">Queue</span>
          </Button>
        </nav>
        <div className="relative mx-1 min-w-0 flex-1 sm:mx-4">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-fg-subtle" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search title, artist, album…"
            className="h-9 border-transparent bg-surface pl-9"
            aria-label="Search tracks"
          />
        </div>
        <Button
          variant="ghost"
          size="icon-sm"
          aria-label={displayMode === "list" ? "Grid view" : "List view"}
          onClick={() => setDisplayMode(displayMode === "list" ? "grid" : "list")}
          className="hidden sm:inline-flex"
        >
          {displayMode === "list" ? <LayoutGrid className="size-4" /> : <List className="size-4" />}
        </Button>
        <Button variant="ghost" size="icon-sm" aria-label="Settings" onClick={onOpenSettings}>
          <Settings2 className="size-4" />
        </Button>
      </div>
    </header>
  );
}
