interface StatBarProps {
  label: string;
  value: number;
  color?: string;
  compact?: boolean;
  showValue?: boolean;
}

export function StatBar({ label, value, color = '#E0212F', compact = false, showValue = true }: StatBarProps) {
  const h = compact ? 'h-1.5' : 'h-2.5';
  const safeValue = Math.min(100, Math.max(0, value));

  return (
    <div className={compact ? 'mb-2' : 'mb-3'}>
      <div className="flex justify-between items-center mb-1">
        <span className="text-[0.68rem] font-black uppercase text-white/52">{label}</span>
        {showValue && <span className="text-xs font-black text-chaos-ink">{Math.round(value)}</span>}
      </div>
      <div className={`w-full ${h} overflow-hidden rounded-sm bg-black/32 ring-1 ring-white/10`}>
        <div
          className={`${h} rounded-sm transition-all duration-700`}
          style={{
            width: `${safeValue}%`,
            background: `linear-gradient(90deg, ${color}, color-mix(in srgb, ${color} 72%, white))`,
            boxShadow: `0 0 16px color-mix(in srgb, ${color} 32%, transparent)`,
          }}
        />
      </div>
    </div>
  );
}
