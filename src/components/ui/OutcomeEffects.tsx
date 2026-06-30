import type { Choice } from '../../types/events';
import { statDelta, formatFunds } from '../../utils/format';

// Renders the stat changes a chosen option applied, as green/red chips — shown in the outcome
// banner so the player sees cause → effect at the moment of choosing (the Dashboard bars only
// move later). Funds are formatted as money; everything else as a signed delta.
export function OutcomeEffects({ choice }: { choice: Choice }) {
  const entries = Object.entries(choice.effects).filter(([, v]) => (v as number) !== 0);
  if (entries.length === 0) return null;

  return (
    <div className="mt-2 flex flex-wrap gap-1.5">
      {entries.map(([key, val]) => {
        const v = val as number;
        const positive = key === 'scandalRisk' ? v < 0 : v >= 0; // less scandal risk is good
        const text = key === 'funds'
          ? `Funds ${v >= 0 ? '+' : '−'}${formatFunds(Math.abs(v))}`
          : `${key.replace(/([A-Z])/g, ' $1').trim()} ${statDelta(v)}`;
        return (
          <span
            key={key}
            className="rounded-sm border px-1.5 py-0.5 text-[0.62rem] font-black uppercase"
            style={{
              background: positive ? 'rgba(47,159,107,0.14)' : 'rgba(201,20,36,0.14)',
              borderColor: positive ? 'rgba(47,159,107,0.32)' : 'rgba(201,20,36,0.32)',
              color: positive ? '#61d39b' : '#ff7b86',
            }}
          >
            {text}
          </span>
        );
      })}
    </div>
  );
}
