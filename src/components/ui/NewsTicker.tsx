interface NewsTickerProps {
  headlines: string[];
}

export function NewsTicker({ headlines }: NewsTickerProps) {
  if (!headlines.length) return null;
  const text = headlines.slice(0, 5).join('  /  ');
  return (
    <div className="flex h-8 items-center overflow-hidden border-b border-chaos-gold/30 bg-chaos-red shadow-[0_8px_18px_rgba(0,0,0,0.2)]">
      <div className="flex h-full shrink-0 items-center bg-chaos-ink px-3 text-xs font-black uppercase text-chaos-red">LIVE</div>
      <div className="overflow-hidden flex-1">
        <div className="ticker-scroll px-4 py-1 text-xs font-black uppercase text-white">{text}</div>
      </div>
    </div>
  );
}
