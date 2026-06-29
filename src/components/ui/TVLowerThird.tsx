interface TVLowerThirdProps {
  network?: string;
  headline: string;
  sub?: string;
}

export function TVLowerThird({ network = 'NNN BREAKING', headline, sub }: TVLowerThirdProps) {
  return (
    <div className="tv-lower absolute bottom-0 left-0 right-0 pointer-events-none">
      <div className="flex items-stretch" style={{ height: 40 }}>
        <div className="bg-chaos-red flex items-center px-3">
          <span className="text-white text-xs font-black uppercase tracking-widest whitespace-nowrap">{network}</span>
        </div>
        <div className="bg-[#0a0a18]/95 flex-1 flex flex-col justify-center px-3">
          <div className="text-white text-sm font-bold leading-tight truncate">{headline}</div>
          {sub && <div className="text-white/50 text-xs leading-tight truncate">{sub}</div>}
        </div>
      </div>
    </div>
  );
}
