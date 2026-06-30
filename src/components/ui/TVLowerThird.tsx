interface TVLowerThirdProps {
  network?: string;
  headline: string;
  sub?: string;
}

export function TVLowerThird({ network = 'NNN BREAKING', headline, sub }: TVLowerThirdProps) {
  return (
    <div className="tv-lower absolute bottom-0 left-0 right-0 pointer-events-none">
      <div className="flex h-12 items-stretch border-t border-chaos-gold/40">
        <div className="flex items-center bg-chaos-red px-3">
          <span className="whitespace-nowrap text-xs font-black uppercase text-white">{network}</span>
        </div>
        <div className="flex flex-1 flex-col justify-center bg-[#14100d]/96 px-3">
          <div className="truncate text-sm font-black leading-tight text-chaos-ink">{headline}</div>
          {sub && <div className="truncate text-xs leading-tight text-white/50">{sub}</div>}
        </div>
      </div>
    </div>
  );
}
