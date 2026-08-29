import { useEffect, useRef } from "react";
import { engine } from "@/lib/music/engine";
import { cn } from "@/lib/utils";

export function Visualizer({ active, className }: { active: boolean; className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let raf = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const data = new Uint8Array(128);

    const loop = () => {
      const analyser = engine.getAnalyser();
      const parent = canvas.parentElement;
      if (!parent) return;
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      if (analyser && active) analyser.getByteFrequencyData(data);
      const bars = 32;
      const gap = 3;
      const barW = (w - gap * (bars - 1)) / bars;
      for (let i = 0; i < bars; i++) {
        const v = active ? (data[i + 2] ?? 0) / 255 : 0.08;
        const bh = Math.max(4, v * h);
        ctx.fillStyle = i < bars * 0.35 ? "#e85d2c" : "rgba(244,239,232,0.28)";
        ctx.fillRect(i * (barW + gap), h - bh, barW, bh);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [active]);

  return (
    <div className={cn("h-16 w-full", className)}>
      <canvas ref={canvasRef} className="block size-full" />
    </div>
  );
}
