import { ChevronLeft } from "lucide-react";
import { CoverArt } from "@/components/cover-art";
import { TrackList } from "@/components/track-list";
import { Button } from "@/components/ui/button";
import type { Track } from "@/lib/music/types";
import { cn } from "@/lib/utils";
import { usePlayerStore } from "@/store/player-store";

const TABS = [
  { id: "all", label: "All Tracks" },
  { id: "recent", label: "Recently Played" },
  { id: "favorites", label: "Favorites" },
  { id: "albums", label: "Albums" },
  { id: "artists", label: "Artists" },
] as const;

function matchesQuery(track: Track, q: string) {
  if (!q) return true;
  const s = q.toLowerCase();
  return (
    track.title.toLowerCase().includes(s) ||
    track.artist.toLowerCase().includes(s) ||
    track.album.toLowerCase().includes(s) ||
    track.filename.toLowerCase().includes(s)
  );
}

export function useVisibleTracks(): Track[] {
  const tracks = usePlayerStore((s) => s.tracks);
  const search = usePlayerStore((s) => s.search);
  const view = usePlayerStore((s) => s.view);
  const libraryTab = usePlayerStore((s) => s.libraryTab);
  const favorites = usePlayerStore((s) => s.favorites);
  const recentlyPlayed = usePlayerStore((s) => s.recentlyPlayed);
  const selectedAlbum = usePlayerStore((s) => s.selectedAlbum);
  const selectedArtist = usePlayerStore((s) => s.selectedArtist);

  const filtered = tracks.filter((t) => matchesQuery(t, search));
  if (search.trim()) return filtered;
  if (view === "home") return filtered;
  if (selectedAlbum) return filtered.filter((t) => t.album === selectedAlbum);
  if (selectedArtist) return filtered.filter((t) => t.artist === selectedArtist);
  if (libraryTab === "favorites") return filtered.filter((t) => favorites.includes(t.id));
  if (libraryTab === "recent") {
    const map = new Map(filtered.map((t) => [t.id, t]));
    return recentlyPlayed.map((e) => map.get(e.id)).filter((t): t is Track => Boolean(t));
  }
  return filtered;
}

export function LibraryHeader() {
  const view = usePlayerStore((s) => s.view);
  const libraryTab = usePlayerStore((s) => s.libraryTab);
  const setLibraryTab = usePlayerStore((s) => s.setLibraryTab);
  const selectedAlbum = usePlayerStore((s) => s.selectedAlbum);
  const selectedArtist = usePlayerStore((s) => s.selectedArtist);
  const setSelectedAlbum = usePlayerStore((s) => s.setSelectedAlbum);
  const setSelectedArtist = usePlayerStore((s) => s.setSelectedArtist);
  const search = usePlayerStore((s) => s.search);
  const tracks = useVisibleTracks();

  if (search.trim()) {
    return (
      <div className="mb-5">
        <h1 className="font-display text-2xl font-semibold">Search</h1>
        <p className="text-sm text-fg-muted">
          {tracks.length} result{tracks.length === 1 ? "" : "s"} for “{search}”
        </p>
      </div>
    );
  }

  if (view === "home") {
    return (
      <div className="mb-5">
        <p className="text-xs font-medium tracking-widest text-accent uppercase">Library</p>
        <h1 className="font-display text-3xl font-semibold">All tracks</h1>
        <p className="text-sm text-fg-muted">{tracks.length} files in your collection</p>
      </div>
    );
  }

  if (selectedAlbum || selectedArtist) {
    return (
      <div className="mb-5">
        <Button
          variant="ghost"
          size="sm"
          className="mb-2 -ml-2"
          onClick={() => {
            setSelectedAlbum(null);
            setSelectedArtist(null);
          }}
        >
          <ChevronLeft className="size-4" /> Back
        </Button>
        <h1 className="font-display text-3xl font-semibold">{selectedAlbum || selectedArtist}</h1>
        <p className="text-sm text-fg-muted">{tracks.length} tracks</p>
      </div>
    );
  }

  return (
    <div className="mb-5">
      <h1 className="font-display text-3xl font-semibold">Library</h1>
      <div className="mt-3 flex flex-wrap gap-1">
        {TABS.map((tab) => (
          <Button
            key={tab.id}
            size="sm"
            variant={libraryTab === tab.id ? "default" : "ghost"}
            onClick={() => setLibraryTab(tab.id)}
            className={cn("rounded-full", libraryTab === tab.id && "text-accent-fg")}
          >
            {tab.label}
          </Button>
        ))}
      </div>
    </div>
  );
}

export function AlbumGrid({ tracks }: { tracks: Track[] }) {
  const setSelectedAlbum = usePlayerStore((s) => s.setSelectedAlbum);
  const albums = new Map<string, Track[]>();
  for (const t of tracks) {
    const list = albums.get(t.album) ?? [];
    list.push(t);
    albums.set(t.album, list);
  }
  const entries = [...albums.entries()].sort((a, b) => a[0].localeCompare(b[0]));
  if (!entries.length) {
    return <TrackList tracks={[]} emptyTitle="No albums" emptyHint="Import music to build your album shelf." />;
  }
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {entries.map(([album, list]) => {
        const cover = list[0]!;
        return (
          <button
            key={album}
            type="button"
            onClick={() => setSelectedAlbum(album)}
            className="rounded-xl bg-surface p-3 text-left transition-colors duration-150 hover:bg-surface-hover"
          >
            <CoverArt track={cover} className="mb-3 aspect-square size-full rounded-lg" />
            <p className="truncate text-sm font-medium">{album}</p>
            <p className="truncate text-xs text-fg-muted">
              {cover.artist} · {list.length} tracks
            </p>
          </button>
        );
      })}
    </div>
  );
}

export function ArtistList({ tracks }: { tracks: Track[] }) {
  const setSelectedArtist = usePlayerStore((s) => s.setSelectedArtist);
  const artists = new Map<string, Track[]>();
  for (const t of tracks) {
    const list = artists.get(t.artist) ?? [];
    list.push(t);
    artists.set(t.artist, list);
  }
  const entries = [...artists.entries()].sort((a, b) => a[0].localeCompare(b[0]));
  if (!entries.length) {
    return <TrackList tracks={[]} emptyTitle="No artists" emptyHint="Import music to see artists here." />;
  }
  return (
    <div className="flex flex-col">
      {entries.map(([artist, list]) => (
        <button
          key={artist}
          type="button"
          onClick={() => setSelectedArtist(artist)}
          className="flex items-center gap-3 rounded-lg px-2 py-2 text-left transition-colors hover:bg-surface-hover"
        >
          <CoverArt track={list[0]!} size="md" className="rounded-full" />
          <div className="min-w-0">
            <p className="truncate text-sm font-medium">{artist}</p>
            <p className="text-xs text-fg-muted">{list.length} tracks</p>
          </div>
        </button>
      ))}
    </div>
  );
}

export function MainLibrary() {
  const view = usePlayerStore((s) => s.view);
  const libraryTab = usePlayerStore((s) => s.libraryTab);
  const search = usePlayerStore((s) => s.search);
  const selectedAlbum = usePlayerStore((s) => s.selectedAlbum);
  const selectedArtist = usePlayerStore((s) => s.selectedArtist);
  const tracks = useVisibleTracks();

  const searching = Boolean(search.trim());
  const showAlbums = !searching && view === "library" && libraryTab === "albums" && !selectedAlbum && !selectedArtist;
  const showArtists = !searching && view === "library" && libraryTab === "artists" && !selectedAlbum && !selectedArtist;

  return (
    <div>
      <LibraryHeader />
      {showAlbums ? (
        <AlbumGrid tracks={tracks} />
      ) : showArtists ? (
        <ArtistList tracks={tracks} />
      ) : (
        <TrackList
          tracks={tracks}
          emptyTitle={searching ? "No matching tracks" : libraryTab === "favorites" ? "No favorites yet" : libraryTab === "recent" ? "Nothing played yet" : "Library is empty"}
          emptyHint={
            searching
              ? "Try a different title, artist, album, or file name."
              : libraryTab === "favorites"
                ? "Tap the heart on a track to save it here."
                : libraryTab === "recent"
                  ? "Play something and it will show up in this list."
                  : "Drop audio files onto the page or import a folder in Settings."
          }
        />
      )}
    </div>
  );
}
