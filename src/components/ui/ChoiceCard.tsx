import type { Choice } from '../../types/events';
import { statDelta } from '../../utils/format';

interface ChoiceCardProps {
  choice: Choice;
  index: number;
  onSelect: () => void;
  disabled?: boolean;
  locked?: boolean;
  lockReason?: string;
}

export function ChoiceCard({ choice, index, onSelect, disabled, locked, lockReason }: ChoiceCardProps) {
  const letters = ['A', 'B', 'C', 'D', 'E'];
  const previewEffects = Object.entries(choice.effects)
    .filter(([k]) => !['funds'].includes(k))
    .slice(0, 3);

  return (
    <button
      onClick={onSelect}
      disabled={disabled || locked}
      className="card-in paper-card w-full p-4 text-left transition-all duration-200 hover:border-chaos-gold/55 hover:bg-white/10 active:scale-[0.985] disabled:cursor-not-allowed disabled:opacity-45"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="flex gap-3 items-start">
        <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-sm border ${locked ? 'border-white/10 bg-black/20' : 'border-chaos-red/45 bg-chaos-red/18'}`}>
          <span className={`display-title text-sm ${locked ? 'text-white/38' : 'text-chaos-red'}`}>{locked ? '!' : letters[index]}</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-black leading-snug text-chaos-ink">{choice.label}</div>
          {choice.tooltip && (
            <div className="serif-note mt-1 text-xs leading-relaxed text-white/50">{choice.tooltip}</div>
          )}
          {locked && lockReason && (
            <div className="mb-1 mt-2 inline-block rounded-sm border border-chaos-gold/28 bg-chaos-gold/12 px-2 py-0.5 text-[0.65rem] font-black uppercase text-chaos-gold">
              {lockReason}
            </div>
          )}
          {!locked && previewEffects.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {previewEffects.map(([key, val]) => (
                <span
                  key={key}
                  className="rounded-sm border px-1.5 py-0.5 text-[0.62rem] font-black uppercase"
                  style={{
                    background: (val as number) >= 0 ? 'rgba(47,159,107,0.14)' : 'rgba(201,20,36,0.14)',
                    borderColor: (val as number) >= 0 ? 'rgba(47,159,107,0.32)' : 'rgba(201,20,36,0.32)',
                    color: (val as number) >= 0 ? '#61d39b' : '#ff7b86',
                  }}
                >
                  {key.replace(/([A-Z])/g, ' $1').trim()} {statDelta(val as number)}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </button>
  );
}
