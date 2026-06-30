export function clamp(v: number, min = 0, max = 100) {
  return Math.max(min, Math.min(max, v));
}

export function roll(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function weightedRandom<T>(items: { item: T; weight: number }[]): T {
  const total = items.reduce((s, i) => s + i.weight, 0);
  let r = Math.random() * total;
  for (const { item, weight } of items) {
    r -= weight;
    if (r <= 0) return item;
  }
  return items[items.length - 1].item;
}

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function chance(pct: number) {
  return Math.random() * 100 < pct;
}

// Deterministic pseudo-random in [0,1) from an integer seed. Used for polling "house effects"
// so a given day's published poll is stable across re-computes within that day, but each day's
// poll carries its own sampling bias — like real tracking polls that jitter day to day.
export function seededUnit(seed: number) {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}
