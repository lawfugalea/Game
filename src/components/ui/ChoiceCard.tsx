import type { Choice } from '../../types/events';
import { statDelta } from '../../utils/format';

interface ChoiceCardProps {
  choice: Choice;
  index: number;
  onSelect: () => void;
  disabled?: boolean;
}

export function ChoiceCard({ choice, index, onSelect, disabled }: ChoiceCardProps) {
  const letters = ['A', 'B', 'C', 'D', 'E'];
  const previewEffects = Object.entries(choice.effects)
    .filter(([k]) => !['funds'].includes(k))
    .slice(0, 3);

  return (
    <button
      onClick={onSelect}
      disabled={disabled}
      className="card-in w-full text-left border border-white/10 bg-white/4 hover:border-chaos-red/60 hover:bg-white/8 active:scale-98 transition-all duration-200 rounded-xl p-4 disabled:opacity-40 disabled:cursor-not-allowed"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="flex gap-3 items-start">
        <div className="shrink-0 w-8 h-8 rounded-lg bg-chaos-red/20 border border-chaos-red/30 flex items-center justify-center">
          <span className="text-chaos-red font-black text-sm">{letters[index]}</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-white font-semibold text-sm leading-snug mb-1">{choice.label}</div>
          {choice.tooltip && (
            <div className="text-white/40 text-xs leading-relaxed mb-2">{choice.tooltip}</div>
          )}
          {previewEffects.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {previewEffects.map(([key, val]) => (
                <span
                  key={key}
                  className="text-xs px-1.5 py-0.5 rounded font-semibold"
                  style={{
                    background: (val as number) >= 0 ? 'rgba(34,197,94,0.15)' : 'rgba(224,33,47,0.15)',
                    color: (val as number) >= 0 ? '#4ade80' : '#f87171',
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
