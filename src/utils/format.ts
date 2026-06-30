export function formatFunds(n: number): string {
  if (n >= 1_000_000) return `€${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `€${(n / 1_000).toFixed(0)}K`;
  return `€${n}`;
}

export function formatPct(n: number): string {
  return `${Math.round(n)}%`;
}

export function formatDay(day: number, total: number): string {
  const left = total - day;
  if (left <= 0) return 'Election Day';
  if (left === 1) return '1 day left';
  return `${left} days left`;
}

export function statDelta(n: number): string {
  return n >= 0 ? `+${n}` : `${n}`;
}
