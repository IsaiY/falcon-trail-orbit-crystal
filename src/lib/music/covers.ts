const PALETTES = [
  ["#E85D2C", "#1a1410", "#F4EFE8"],
  ["#c44b24", "#0c0b0a", "#d9cfc4"],
  ["#8a3a22", "#161412", "#e8dcd0"],
  ["#f07a4a", "#12100e", "#c4b8ac"],
  ["#d4552a", "#1e1b18", "#f4efe8"],
];

function hashStr(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return h >>> 0;
}

function escapeXml(s: string): string {
  const map: Record<string, string> = {
    "<": "&" + "lt;",
    ">": "&" + "gt;",
    "&": "&" + "amp;",
    "'": "&" + "apos;",
    '"': "&" + "quot;",
  };
  return s.replace(/[<>&'"]/g, (ch) => map[ch] ?? ch);
}

export function placeholderCover(seed: string, title: string, artist: string): string {
  const h = hashStr(seed);
  const [a, b, c] = PALETTES[h % PALETTES.length]!;
  const variant = h % 4;
  const t = escapeXml(title.slice(0, 22));
  void artist;
  let art = "";
  if (variant === 0) {
    art = `<circle cx="80" cy="90" r="48" fill="${a}"/><circle cx="80" cy="90" r="28" fill="${b}"/>`;
  } else if (variant === 1) {
    art = `<rect x="24" y="28" width="112" height="18" fill="${a}"/><rect x="24" y="56" width="80" height="18" fill="${c}" opacity=".5"/><rect x="24" y="84" width="96" height="18" fill="${a}" opacity=".7"/>`;
  } else if (variant === 2) {
    art = `<polygon points="80,24 132,148 28,148" fill="${a}"/><circle cx="80" cy="100" r="14" fill="${c}"/>`;
  } else {
    art = `<rect x="30" y="30" width="100" height="100" fill="none" stroke="${a}" stroke-width="6"/><rect x="50" y="50" width="60" height="60" fill="${a}"/>`;
  }
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160">
    <rect width="160" height="160" fill="${b}"/>
    ${art}
    <rect x="0" y="0" width="160" height="6" fill="${a}"/>
    <text x="12" y="148" fill="${c}" font-size="9" font-family="ui-sans-serif,system-ui" opacity=".8">${t}</text>
  </svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

export function hashPeaks(seed: string, n = 180): number[] {
  let x = hashStr(seed) || 1;
  const out: number[] = [];
  for (let i = 0; i < n; i++) {
    x = Math.imul(x ^ (x >>> 13), 0x5bd1e995);
    const env = 0.35 + 0.65 * Math.sin((i / n) * Math.PI);
    out.push(0.12 + ((x >>> 0) / 0xffffffff) * 0.88 * env);
  }
  return out;
}
