import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type WaveformProps = {
  peaks: number[];
  progress: number;
  onSeek?: (ratio: number) => void;
  className?: string;
  barColor?: string;
};

export function Waveform({ peaks, progress, onSeek, className }: WaveformProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const hoverRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const draw = () => {
      const w = wrap.clientWidth;
      const h = wrap.clientHeight;
      if (w <= 0 || h <= 0) return;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      const n = Math.max(peaks.length, 1);
      const gap = 1;
      const barW = Math.max(1.5, (w - gap * (n - 1)) / n);
      const hover = hoverRef.current;
      for (let i = 0; i < n; i++) {
        const amp = Math.max(0.08, peaks[i] ?? 0.2);
        const bh = amp * h;
        const x = i * (barW + gap);
        const y = (h - bh) / 2;
        const ratio = i / n;
        const played = ratio <= progress;
        const hovered = hover != null && ratio <= hover;
        if (hovered && !played) ctx.fillStyle = "rgba(232, 93, 44, 0.55)";
        else if (played) ctx.fillStyle = "#e85d2c";
        else ctx.fillStyle = "rgba(163, 154, 144, 0.38)";
        ctx.fillRect(x, y, barW, bh);
      }
    };
    draw();
    const ro = new ResizeObserver(draw);
    ro.observe(wrap);
    return () => ro.disconnect();
  }, [peaks, progress]);

  const ratioFromEvent = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    return Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
  };

  return (
    <div
      ref={wrapRef}
      className={cn("relative h-12 w-full cursor-pointer", className)}
      onPointerDown={(e) => onSeek?.(ratioFromEvent(e))}
      onPointerMove={(e) => {
        hoverRef.current = ratioFromEvent(e);
        const canvas = canvasRef.current;
        const wrap = wrapRef.current;
        if (!canvas || !wrap) return;
        canvas.dispatchEvent(new Event("redraw"));
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const w = wrap.clientWidth;
        const h = wrap.clientHeight;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, w, h);
        const n = Math.max(peaks.length, 1);
        const gap = 1;
        const barW = Math.max(1.5, (w - gap * (n - 1)) / n);
        const hover = hoverRef.current;
        for (let i = 0; i < n; i++) {
          const amp = Math.max(0.08, peaks[i] ?? 0.2);
          const bh = amp * h;
          const x = i * (barW + gap);
          const y = (h - bh) / 2;
          const ratio = i / n;
          const played = ratio <= progress;
          const hovered = hover != null && ratio <= hover;
          if (hovered && !played) ctx.fillStyle = "rgba(232, 93, 44, 0.55)";
          else if (played) ctx.fillStyle = "#e85d2c";
          else ctx.fillStyle = "rgba(163, 154, 144, 0.38)";
          ctx.fillRect(x, y, barW, bh);
        }
      }}
      onPointerLeave={() => {
        hoverRef.current = null;
      }}
      role="slider"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(progress * 100)}
      aria-label="Seek"
      tabIndex={0}
    >
      <canvas ref={canvasRef} className="block size-full" />
    </div>
  );
}
