interface NewsTickerProps {
  headlines: string[];
}

export function NewsTicker({ headlines }: NewsTickerProps) {
  if (!headlines.length) return null;
  const text = headlines.slice(0, 5).join('  •  ');
  return (
    <div className="bg-chaos-red/90 overflow-hidden flex items-center" style={{ height: 28 }}>
      <div className="bg-white text-chaos-red text-xs font-black uppercase px-3 h-full flex items-center shrink-0 tracking-widest">LIVE</div>
      <div className="overflow-hidden flex-1">
        <div className="ticker-scroll text-white text-xs font-semibold px-4 py-1">{text}</div>
      </div>
    </div>
  );
}
