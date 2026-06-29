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
