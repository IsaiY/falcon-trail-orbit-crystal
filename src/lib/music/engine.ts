type TimeHandler = (current: number, duration: number) => void;
type VoidHandler = () => void;
type ErrorHandler = (message: string) => void;

function isBrowser() {
  return typeof window !== "undefined";
}

class AudioEngine {
  private audio: HTMLAudioElement | null = null;
  private ctx: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private source: MediaElementAudioSourceNode | null = null;
  private gain: GainNode | null = null;
  private timeHandlers = new Set<TimeHandler>();
  private endedHandlers = new Set<VoidHandler>();
  private errorHandlers = new Set<ErrorHandler>();
  private loadedUrl: string | null = null;
  private raf = 0;

  get element(): HTMLAudioElement | null {
    if (!isBrowser()) return null;
    if (!this.audio) {
      const a = new Audio();
      a.preload = "auto";
      a.crossOrigin = "anonymous";
      a.addEventListener("timeupdate", this.emitTime);
      a.addEventListener("durationchange", this.emitTime);
      a.addEventListener("ended", () => {
        this.endedHandlers.forEach((h) => h());
      });
      a.addEventListener("error", () => {
        const msg = a.error?.message || "This file could not be played.";
        this.errorHandlers.forEach((h) => h(msg));
      });
      this.audio = a;
    }
    return this.audio;
  }

  private emitTime = () => {
    const a = this.audio;
    if (!a) return;
    const dur = Number.isFinite(a.duration) ? a.duration : 0;
    this.timeHandlers.forEach((h) => h(a.currentTime || 0, dur));
  };

  private tick = () => {
    this.emitTime();
    if (this.audio && !this.audio.paused) {
      this.raf = requestAnimationFrame(this.tick);
    }
  };

  private async ensureGraph() {
    const a = this.element;
    if (!a || this.source) return;
    try {
      const ctx = new AudioContext();
      const source = ctx.createMediaElementSource(a);
      const gain = ctx.createGain();
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 256;
      source.connect(gain);
      gain.connect(analyser);
      analyser.connect(ctx.destination);
      this.ctx = ctx;
      this.source = source;
      this.gain = gain;
      this.analyser = analyser;
    } catch {
      // Element volume still works if the graph cannot be created.
    }
  }

  async load(url: string, startAt = 0) {
    const a = this.element;
    if (!a) return;
    if (this.loadedUrl !== url) {
      a.src = url;
      this.loadedUrl = url;
      try {
        a.load();
      } catch {
        /* ignore */
      }
    }
    if (startAt > 0) {
      const seek = () => {
        try {
          a.currentTime = startAt;
        } catch {
          /* not ready */
        }
      };
      if (a.readyState >= 1) seek();
      else a.addEventListener("loadedmetadata", seek, { once: true });
    }
  }

  async play() {
    const a = this.element;
    if (!a) return;
    await this.ensureGraph();
    if (this.ctx?.state === "suspended") {
      try {
        await this.ctx.resume();
      } catch {
        /* autoplay policies */
      }
    }
    try {
      await a.play();
      cancelAnimationFrame(this.raf);
      this.raf = requestAnimationFrame(this.tick);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Playback failed.";
      this.errorHandlers.forEach((h) => h(message));
    }
  }

  pause() {
    this.audio?.pause();
    cancelAnimationFrame(this.raf);
  }

  seek(seconds: number) {
    const a = this.audio;
    if (!a || !Number.isFinite(seconds)) return;
    try {
      a.currentTime = Math.max(0, seconds);
      this.emitTime();
    } catch {
      /* ignore */
    }
  }

  setVolume(volume: number, muted: boolean) {
    const v = Math.min(1, Math.max(0, volume));
    if (this.gain) this.gain.gain.value = muted ? 0 : v;
    if (this.audio) {
      this.audio.volume = muted ? 0 : v;
      this.audio.muted = muted;
    }
  }

  getAnalyser() {
    return this.analyser;
  }

  getCurrentUrl() {
    return this.loadedUrl;
  }

  onTime(handler: TimeHandler) {
    this.timeHandlers.add(handler);
    return () => {
      this.timeHandlers.delete(handler);
    };
  }

  onEnded(handler: VoidHandler) {
    this.endedHandlers.add(handler);
    return () => {
      this.endedHandlers.delete(handler);
    };
  }

  onError(handler: ErrorHandler) {
    this.errorHandlers.add(handler);
    return () => {
      this.errorHandlers.delete(handler);
    };
  }
}

export const engine = new AudioEngine();
