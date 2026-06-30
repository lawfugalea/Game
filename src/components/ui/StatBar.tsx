import { useState } from 'react';

interface StatBarProps {
  label: string;
  value: number;
  color?: string;
  compact?: boolean;
  showValue?: boolean;
  /** Change since the start of the day; renders a small ▲/▼ next to the value. */
  delta?: number;
  /** Plain-language explanation; when set, the label becomes tappable to reveal it. */
  info?: string;
}

export function StatBar({ label, value, color = '#E0212F', compact = false, showValue = true, delta, info }: StatBarProps) {
  const h = compact ? 'h-1.5' : 'h-2.5';
  const safeValue = Math.min(100, Math.max(0, value));
  const [showInfo, setShowInfo] = useState(false);

  const roundedDelta = delta === undefined ? 0 : Math.round(delta);
  const showDelta = Math.abs(roundedDelta) >= 1;
  const up = roundedDelta > 0;

  return (
    <div className={compact ? 'mb-2' : 'mb-3'}>
      <div className="flex justify-between items-center mb-1">
        {info ? (
          <button
            type="button"
            onClick={() => setShowInfo((v) => !v)}
            className="flex items-center gap-1 text-[0.68rem] font-black uppercase text-white/52 transition-colors hover:text-white/80"
            aria-label={`${label} — what is this?`}
          >
            {label}
            <span className="flex h-3 w-3 items-center justify-center rounded-full border border-white/24 text-[0.5rem] leading-none text-white/40">?</span>
          </button>
        ) : (
          <span className="text-[0.68rem] font-black uppercase text-white/52">{label}</span>
        )}
        <div className="flex items-center gap-1">
          {showDelta && (
            <span className="text-[0.62rem] font-black tabular-nums" style={{ color: up ? '#61d39b' : '#ff7b86' }}>
              {up ? '▲' : '▼'}{Math.abs(roundedDelta)}
            </span>
          )}
          {showValue && <span className="text-xs font-black text-chaos-ink">{Math.round(value)}</span>}
        </div>
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
      {info && showInfo && (
        <div className="serif-note mt-1 text-[0.7rem] leading-snug text-white/55">{info}</div>
      )}
    </div>
  );
}
