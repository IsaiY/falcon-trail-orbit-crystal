#!/usr/bin/env node
/**
 * Generates original instrumental WAV tracks + catalog.json for Ember.
 * Additive / subtractive synth — no copyrighted material.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const SR = 22050;
const OUT = "/workspace/public/music";
mkdirSync(OUT, { recursive: true });

const TAU = Math.PI * 2;
const midi = (n) => 440 * 2 ** ((n - 69) / 12);
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const lerp = (a, b, t) => a + (b - a) * t;
const fract = (x) => x - Math.floor(x);
const hash = (s) => {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return h >>> 0;
};

function env(t, a, d, s, r, dur) {
  if (t < 0 || t > dur) return 0;
  if (t < a) return a <= 0 ? 1 : t / a;
  if (t < a + d) return lerp(1, s, (t - a) / Math.max(d, 1e-6));
  if (t < dur - r) return s;
  if (r <= 0) return 0;
  return s * Math.max(0, 1 - (t - (dur - r)) / r);
}

function onePole() {
  let y = 0;
  return (x, cutoff) => {
    const a = 1 - Math.exp((-TAU * cutoff) / SR);
    y += a * (x - y);
    return y;
  };
}

function writeWav(samples) {
  const n = samples.length;
  const buf = Buffer.alloc(44 + n * 2);
  buf.write("RIFF", 0);
  buf.writeUInt32LE(36 + n * 2, 4);
  buf.write("WAVE", 8);
  buf.write("fmt ", 12);
  buf.writeUInt32LE(16, 16);
  buf.writeUInt16LE(1, 20);
  buf.writeUInt16LE(1, 22);
  buf.writeUInt32LE(SR, 24);
  buf.writeUInt32LE(SR * 2, 28);
  buf.writeUInt16LE(2, 32);
  buf.writeUInt16LE(16, 34);
  buf.write("data", 36);
  buf.writeUInt32LE(n * 2, 40);
  let peak = 1e-6;
  for (let i = 0; i < n; i++) peak = Math.max(peak, Math.abs(samples[i]));
  const g = 0.89 / peak;
  for (let i = 0; i < n; i++) {
    const v = clamp(samples[i] * g, -1, 1);
    buf.writeInt16LE((v * 32767) | 0, 44 + i * 2);
  }
  return buf;
}

function peaksOf(samples, buckets = 180) {
  const out = [];
  const size = Math.floor(samples.length / buckets);
  for (let b = 0; b < buckets; b++) {
    let m = 0;
    const start = b * size;
    for (let i = 0; i < size; i++) m = Math.max(m, Math.abs(samples[start + i] || 0));
    out.push(Number(m.toFixed(4)));
  }
  const mx = Math.max(...out, 1e-6);
  return out.map((v) => Number((v / mx).toFixed(4)));
}

function kick(t) {
  if (t < 0 || t > 0.22) return 0;
  const e = Math.exp(-t * 18);
  const f = 118 * Math.exp(-t * 12);
  return Math.sin(TAU * f * t) * e * 1.35 + (Math.random() * 2 - 1) * Math.exp(-t * 60) * 0.08;
}

function snare(t) {
  if (t < 0 || t > 0.2) return 0;
  const n = (Math.random() * 2 - 1) * Math.exp(-t * 16);
  const tone = Math.sin(TAU * 186 * t) * Math.exp(-t * 22);
  return n * 0.7 + tone * 0.35;
}

function hat(t, open = false) {
  const d = open ? 0.14 : 0.045;
  if (t < 0 || t > d) return 0;
  return (Math.random() * 2 - 1) * Math.exp(-t * (open ? 18 : 55));
}

function renderTrack(spec) {
  const { bpm, bars, root, scale, style, swing = 0 } = spec;
  const spb = 60 / bpm;
  const steps = bars * 16;
  const dur = steps * (spb / 4);
  const n = Math.floor(dur * SR);
  const out = new Float32Array(n);
  const lpBass = onePole();
  const lpPad = onePole();
  const lpLead = onePole();
  const hpHat = onePole();

  const scaleNotes = scale.map((i) => root + i);
  const chordDeg = spec.chords;
  const bassPat = spec.bass;
  const leadPat = spec.lead;
  const drum = spec.drum;

  for (let step = 0; step < steps; step++) {
    const beat = step / 4;
    const sw = step % 2 === 1 ? swing * spb * 0.25 : 0;
    const t0 = beat * spb + sw;
    const bar = Math.floor(step / 16);
    const chord = chordDeg[bar % chordDeg.length];
    const chordNotes = [0, 2, 4].map((d) => {
      const idx = (chord + d) % scale.length;
      const oct = 12 * Math.floor((chord + d) / scale.length);
      return root + scale[idx] + oct;
    });

    // drums
    const ds = drum[step % drum.length];
    const kickA = ds.includes("k") ? 1 : 0;
    const snA = ds.includes("s") ? 1 : 0;
    const hA = ds.includes("h") ? 0.55 : ds.includes("o") ? 0.4 : 0;
    const open = ds.includes("o");

    // bass
    const bNote = bassPat[step % bassPat.length];
    const bassMidi =
      bNote === "."
        ? null
        : root + scale[(chord + Number(bNote)) % scale.length] - 12;

    // lead
    const lSym = leadPat[step % leadPat.length];
    const leadMidi =
      lSym === "."
        ? null
        : scaleNotes[Number(lSym) % scaleNotes.length] + (spec.leadOct || 12);

    const slice = Math.floor((spb / 4) * SR) + 200;
    const start = Math.floor(t0 * SR);
    for (let i = 0; i < slice && start + i < n; i++) {
      const t = i / SR;
      let s = 0;
      if (kickA) s += kick(t) * 0.95;
      if (snA) s += snare(t) * 0.55;
      if (hA) {
        const raw = hat(t, open) * hA;
        s += (raw - hpHat(raw, 6000)) * 0.5;
      }
      if (bassMidi != null) {
        const f = midi(bassMidi);
        const ph = f * t;
        const wave =
          style === "ambient"
            ? Math.sin(TAU * ph)
            : 2 * fract(ph) - 1;
        const e = env(t, 0.01, 0.08, 0.55, 0.08, spb / 4 + 0.05);
        s += lpBass(wave * e, style === "ambient" ? 420 : 280) * 0.42;
      }
      out[start + i] += s;
    }

    // pads — hold a bar
    if (step % 16 === 0) {
      const padDur = spb * 4 * 0.98;
      const pStart = start;
      const pN = Math.floor(padDur * SR);
      for (let i = 0; i < pN && pStart + i < n; i++) {
        const t = i / SR;
        let s = 0;
        for (let c = 0; c < chordNotes.length; c++) {
          const f = midi(chordNotes[c] + (style === "lofi" ? 0 : 12));
          const det = 1 + (c - 1) * 0.003;
          s += Math.sin(TAU * f * det * t) * (c === 0 ? 0.45 : 0.32);
          if (style !== "drive") {
            s += Math.sin(TAU * f * 2 * t) * 0.08;
          }
        }
        const e = env(t, 0.18, 0.3, 0.7, 0.45, padDur);
        out[pStart + i] += lpPad(s * e, style === "ambient" ? 1400 : 900) * 0.28;
      }
    }

    if (leadMidi != null) {
      const gate = spec.leadGate || spb / 4 * 0.92;
      const lN = Math.floor(gate * SR);
      for (let i = 0; i < lN && start + i < n; i++) {
        const t = i / SR;
        const f = midi(leadMidi);
        const vib = 1 + Math.sin(TAU * 5.2 * t) * 0.003;
        let wave;
        if (style === "arp") wave = 2 * fract(f * vib * t) - 1;
        else if (style === "lofi") wave = Math.sin(TAU * f * vib * t) + 0.2 * Math.sin(TAU * f * 2 * t);
        else wave = Math.sin(TAU * f * vib * t);
        const e = env(t, 0.008, 0.05, 0.6, 0.06, gate);
        out[start + i] += lpLead(wave * e, style === "arp" ? 2200 : 1800) * (spec.leadGain || 0.22);
      }
    }
  }

  // texture
  if (style === "lofi" || style === "ambient") {
    for (let i = 0; i < n; i++) {
      const t = i / SR;
      const crackle = Math.random() > 0.997 ? (Math.random() * 2 - 1) * 0.08 : 0;
      const hiss = (Math.random() * 2 - 1) * (style === "lofi" ? 0.012 : 0.006);
      const wow = 1 + Math.sin(TAU * 0.35 * t) * 0.004;
      out[i] = out[i] * wow + crackle + hiss;
    }
  }

  // fade
  const fade = Math.floor(0.04 * SR);
  for (let i = 0; i < fade; i++) {
    out[i] *= i / fade;
    out[n - 1 - i] *= i / fade;
  }
  return out;
}

const MINOR = [0, 2, 3, 5, 7, 8, 10];
const DORIAN = [0, 2, 3, 5, 7, 9, 10];
const MAJOR = [0, 2, 4, 5, 7, 9, 11];
const PENTA = [0, 3, 5, 7, 10];

const fourFour = [
  "k h", "h", "s h", "h",
  "k h", "h", "s h", "o",
  "k h", "h", "s h", "h",
  "k h", "k", "s h", "h",
];
const halfTime = [
  "k h", ".", "h", ".",
  "s h", ".", "h", "o",
  "k h", ".", "h", ".",
  "s h", "k", "h", ".",
];
const drive = [
  "k h", "h", "k h", "h",
  "s h", "h", "k h", "o",
  "k h", "h", "k h", "h",
  "s h", "k", "h", "h",
];
const sparse = [
  "k", ".", "h", ".",
  "s", ".", "h", ".",
  "k", ".", "o", ".",
  "s", ".", "h", "k",
];

const tracks = [
  {
    id: "night-drive",
    title: "Night Drive",
    artist: "Lumen Circuit",
    album: "Night Circuits",
    year: 2024,
    filename: "Lumen Circuit - Night Drive.wav",
    bpm: 118,
    bars: 8,
    root: 57,
    scale: MINOR,
    style: "drive",
    swing: 0.04,
    chords: [0, 5, 3, 4],
    bass: ["0", ".", "0", "4", "0", ".", "2", "."],
    lead: [".", "4", ".", "6", "4", ".", "2", "0", ".", "4", "6", ".", "5", "4", ".", "2"],
    drum: fourFour,
    leadGain: 0.18,
  },
  {
    id: "signal-bloom",
    title: "Signal Bloom",
    artist: "Lumen Circuit",
    album: "Night Circuits",
    year: 2024,
    filename: "Lumen Circuit - Signal Bloom.wav",
    bpm: 128,
    bars: 8,
    root: 64,
    scale: DORIAN,
    style: "arp",
    swing: 0,
    chords: [0, 3, 4, 0],
    bass: ["0", "0", "4", ".", "0", "2", "0", "."],
    lead: ["0", "2", "4", "6", "4", "2", "0", "4", "6", "4", "2", "0", "4", "2", "6", "4"],
    drum: drive,
    leadGain: 0.16,
    leadOct: 12,
  },
  {
    id: "ember-sky",
    title: "Ember Sky",
    artist: "Atlas Vale",
    album: "Ember Sky",
    year: 2023,
    filename: "Atlas Vale - Ember Sky.wav",
    bpm: 78,
    bars: 6,
    root: 55,
    scale: MINOR,
    style: "ambient",
    swing: 0.08,
    chords: [0, 3, 5, 4],
    bass: ["0", ".", ".", ".", "0", ".", "4", "."],
    lead: [".", ".", "4", ".", ".", "6", ".", ".", "4", ".", "2", ".", ".", "0", ".", "."],
    drum: sparse,
    leadGain: 0.2,
    leadOct: 24,
  },
  {
    id: "soft-static",
    title: "Soft Static",
    artist: "Mira Kite",
    album: "Tape Loops",
    year: 2024,
    filename: "Mira Kite - Soft Static.wav",
    bpm: 84,
    bars: 8,
    root: 60,
    scale: MAJOR,
    style: "lofi",
    swing: 0.14,
    chords: [0, 4, 5, 3],
    bass: ["0", ".", "0", ".", "4", ".", "2", "."],
    lead: ["4", ".", "2", ".", "0", ".", "5", ".", "4", ".", "6", ".", "4", ".", "2", "."],
    drum: halfTime,
    leadGain: 0.17,
  },
  {
    id: "low-tide",
    title: "Low Tide",
    artist: "Mira Kite",
    album: "Tape Loops",
    year: 2024,
    filename: "Mira Kite - Low Tide.wav",
    bpm: 90,
    bars: 8,
    root: 62,
    scale: DORIAN,
    style: "lofi",
    swing: 0.1,
    chords: [0, 3, 0, 4],
    bass: ["0", ".", ".", "0", "2", ".", "0", "."],
    lead: [".", "0", ".", "2", "4", ".", "2", ".", ".", "4", ".", "2", "0", ".", "5", "."],
    drum: halfTime,
    leadGain: 0.16,
  },
  {
    id: "copper-hours",
    title: "Copper Hours",
    artist: "Redline Duo",
    album: "Copper Hours",
    year: 2025,
    filename: "Redline Duo - Copper Hours.wav",
    bpm: 102,
    bars: 8,
    root: 57,
    scale: PENTA,
    style: "drive",
    swing: 0.06,
    chords: [0, 3, 1, 4],
    bass: ["0", "0", ".", "3", "0", ".", "1", "."],
    lead: ["4", ".", "3", "1", ".", "4", "0", ".", "3", ".", "4", "1", ".", "0", "3", "."],
    drum: fourFour,
    leadGain: 0.2,
  },
  {
    id: "afterglow",
    title: "Afterglow",
    artist: "Solenne",
    album: "Afterglow",
    year: 2024,
    filename: "Solenne - Afterglow.wav",
    bpm: 96,
    bars: 8,
    root: 53,
    scale: MAJOR,
    style: "ambient",
    swing: 0.05,
    chords: [0, 5, 3, 4],
    bass: ["0", ".", "4", ".", "0", ".", "5", "."],
    lead: [".", "4", "5", ".", "2", ".", "0", ".", "5", ".", "4", ".", "7", "5", ".", "4"],
    drum: sparse,
    leadGain: 0.19,
    leadOct: 24,
  },
  {
    id: "glass-harbor",
    title: "Glass Harbor",
    artist: "North Window",
    album: "Harbor Sessions",
    year: 2023,
    filename: "North Window - Glass Harbor.wav",
    bpm: 110,
    bars: 8,
    root: 58,
    scale: DORIAN,
    style: "arp",
    swing: 0.02,
    chords: [0, 4, 3, 5],
    bass: ["0", ".", "0", "2", "0", ".", "4", "."],
    lead: ["0", "2", "4", "2", "5", "4", "2", "0", "4", "2", "0", "5", "4", "2", "4", "0"],
    drum: fourFour,
    leadGain: 0.15,
  },
  {
    id: "dustlight",
    title: "Dustlight",
    artist: "Kite & Ash",
    album: "Dustlight",
    year: 2025,
    filename: "Kite & Ash - Dustlight.wav",
    bpm: 88,
    bars: 8,
    root: 55,
    scale: MAJOR,
    style: "lofi",
    swing: 0.12,
    chords: [0, 3, 4, 0],
    bass: ["0", ".", "3", ".", "0", ".", "4", "."],
    lead: ["4", ".", ".", "2", "0", ".", "4", ".", "5", ".", "4", ".", "2", ".", "0", "."],
    drum: halfTime,
    leadGain: 0.18,
    leadOct: 12,
  },
  {
    id: "red-hour",
    title: "Red Hour",
    artist: "Vesper Unit",
    album: "Red Hour",
    year: 2024,
    filename: "Vesper Unit - Red Hour.wav",
    bpm: 132,
    bars: 8,
    root: 64,
    scale: MINOR,
    style: "drive",
    swing: 0,
    chords: [0, 5, 3, 4],
    bass: ["0", "0", "4", "0", "0", "2", "0", "4"],
    lead: ["4", "6", "4", ".", "7", "6", "4", "2", "4", ".", "6", "4", "2", "0", "4", "."],
    drum: drive,
    leadGain: 0.17,
    leadOct: 12,
  },
];

const catalog = [];
for (const t of tracks) {
  const samples = renderTrack(t);
  const wav = writeWav(samples);
  writeFileSync(join(OUT, t.filename), wav);
  const duration = samples.length / SR;
  catalog.push({
    id: `catalog:${t.id}`,
    title: t.title,
    artist: t.artist,
    album: t.album,
    year: t.year,
    duration: Number(duration.toFixed(3)),
    filename: t.filename,
    url: `/music/${encodeURIComponent(t.filename)}`,
    coverUrl: `/music/covers/${t.album.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.jpg`,
    peaks: peaksOf(samples),
    source: "catalog",
  });
  console.log(`wrote ${t.filename}  ${duration.toFixed(1)}s  ${(wav.length / 1024).toFixed(0)} KB`);
}

writeFileSync(join(OUT, "catalog.json"), JSON.stringify(catalog, null, 2));
console.log(`catalog: ${catalog.length} tracks`);
void hash;
