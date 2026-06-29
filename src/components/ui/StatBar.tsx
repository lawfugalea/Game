interface StatBarProps {
  label: string;
  value: number;
  color?: string;
  compact?: boolean;
  showValue?: boolean;
}

export function StatBar({ label, value, color = '#E0212F', compact = false, showValue = true }: StatBarProps) {
  const h = compact ? 'h-1.5' : 'h-2';
  return (
    <div className={compact ? 'mb-2' : 'mb-3'}>
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs text-white/50 uppercase tracking-wider">{label}</span>
        {showValue && <span className="text-xs font-bold text-white">{Math.round(value)}</span>}
      </div>
      <div className={`w-full bg-white/8 rounded-full ${h} overflow-hidden`}>
        <div
          className={`${h} rounded-full transition-all duration-700`}
          style={{ width: `${Math.min(100, Math.max(0, value))}%`, background: color }}
        />
      </div>
    </div>
  );
}
