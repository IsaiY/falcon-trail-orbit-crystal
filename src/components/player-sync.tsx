import { useEffect } from "react";
import { toast } from "sonner";
import { engine } from "@/lib/music/engine";
import { usePlayerStore } from "@/store/player-store";

export function PlayerSync() {
  const hydrate = usePlayerStore((s) => s.hydrate);
  const setTime = usePlayerStore((s) => s.setTime);
  const handleEnded = usePlayerStore((s) => s.handleEnded);
  const handleError = usePlayerStore((s) => s.handleError);
  const persist = usePlayerStore((s) => s.persist);
  const isPlaying = usePlayerStore((s) => s.isPlaying);

  useEffect(() => {
    void hydrate();
  }, [hydrate]);

  useEffect(() => engine.onTime(setTime), [setTime]);
  useEffect(() => engine.onEnded(handleEnded), [handleEnded]);
  useEffect(
    () =>
      engine.onError((message) => {
        toast.error("Could not play this file", { description: message });
        handleError(message);
      }),
    [handleError],
  );

  useEffect(() => {
    if (!isPlaying) return;
    const id = window.setInterval(() => persist(), 4000);
    return () => window.clearInterval(id);
  }, [isPlaying, persist]);

  useEffect(() => {
    const onHide = () => persist();
    window.addEventListener("pagehide", onHide);
    document.addEventListener("visibilitychange", onHide);
    return () => {
      window.removeEventListener("pagehide", onHide);
      document.removeEventListener("visibilitychange", onHide);
    };
  }, [persist]);

  return null;
}
