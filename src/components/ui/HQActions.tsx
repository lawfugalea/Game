import { useState } from 'react';
import { useGameStore } from '../../store/gameStore';
import { CAMPAIGN_ACTIONS, type CampaignAction } from '../../data/campaignActions';
import { swingDistricts } from '../../data/states';
import { formatFunds, statDelta } from '../../utils/format';
import { playTap, buzz } from '../../engine/audioSystem';
import { MAX_DISTRICT_PUSH } from '../../utils/constants';

function EffectChips({ action }: { action: CampaignAction }) {
  const chips: { text: string; good: boolean }[] = [];
  for (const [k, v] of Object.entries(action.effects ?? {})) {
    chips.push({ text: `${k.replace(/([A-Z])/g, ' $1').trim()} ${statDelta(v as number)}`, good: (v as number) >= 0 });
  }
  for (const [k, v] of Object.entries(action.opponentEffects ?? {})) {
    // A rise in the rival's scandal risk / a drop in their stats is good for the player.
    const good = k === 'scandalRisk' ? (v as number) >= 0 : (v as number) <= 0;
    chips.push({ text: `Rival ${k.replace(/([A-Z])/g, ' $1').trim()} ${statDelta(v as number)}`, good });
  }
  if (action.targetsDistrict) chips.push({ text: 'District lean ▲', good: true });
  return (
    <div className="mt-2 flex flex-wrap gap-1.5">
      {chips.map((c, i) => (
        <span key={i} className="rounded-sm border px-1.5 py-0.5 text-[0.6rem] font-black uppercase"
          style={{
            background: c.good ? 'rgba(47,159,107,0.14)' : 'rgba(201,20,36,0.14)',
            borderColor: c.good ? 'rgba(47,159,107,0.32)' : 'rgba(201,20,36,0.32)',
            color: c.good ? '#61d39b' : '#ff7b86',
          }}>
          {c.text}
        </span>
      ))}
    </div>
  );
}

export function HQActions() {
  const { stats, actionsRemaining, districtPushes, runCampaignAction } = useGameStore();
  const [pickFor, setPickFor] = useState<string | null>(null);

  const noActions = actionsRemaining <= 0;

  function affordable(a: CampaignAction): boolean {
    if (stats.funds < a.cost) return false;
    if (a.staminaCost && stats.stamina < a.staminaCost) return false;
    return true;
  }

  function run(actionId: string, districtCode?: string) {
    playTap();
    buzz(10);
    runCampaignAction(actionId, districtCode);
    setPickFor(null);
  }

  function onActionClick(a: CampaignAction) {
    if (noActions || !affordable(a)) return;
    if (a.targetsDistrict) {
      setPickFor((cur) => (cur === a.id ? null : a.id));
    } else {
      run(a.id);
    }
  }

  return (
    <div className="broadcast-card p-4">
      <div className="mb-3 flex items-center justify-between">
        <div className="section-label">War Room</div>
        <div className="flex items-center gap-2">
          <span className="text-[0.65rem] font-bold uppercase text-white/40">{formatFunds(stats.funds)}</span>
          <span className={`rounded-sm border px-2 py-0.5 text-[0.62rem] font-black uppercase ${noActions ? 'border-white/12 bg-black/20 text-white/35' : 'border-chaos-gold/40 bg-chaos-gold/12 text-chaos-gold'}`}>
            {actionsRemaining} {actionsRemaining === 1 ? 'action' : 'actions'}
          </span>
        </div>
      </div>

      {noActions && (
        <div className="serif-note mb-3 text-xs italic text-white/45">No actions left today — advance the day to refresh.</div>
      )}

      <div className="space-y-2">
        {CAMPAIGN_ACTIONS.map((a) => {
          const can = !noActions && affordable(a);
          const expanded = pickFor === a.id;
          return (
            <div key={a.id}>
              <button
                onClick={() => onActionClick(a)}
                disabled={!can}
                className="paper-card w-full p-3 text-left transition-all hover:border-chaos-gold/45 disabled:cursor-not-allowed disabled:opacity-45"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-black text-chaos-ink">{a.label}</span>
                  <span className="shrink-0 text-xs font-black text-chaos-gold">
                    {formatFunds(a.cost)}{a.staminaCost ? ` · ${a.staminaCost}⚡` : ''}
                  </span>
                </div>
                <div className="serif-note mt-0.5 text-xs leading-snug text-white/50">{a.desc}</div>
                <EffectChips action={a} />
              </button>

              {expanded && (
                <div className="mt-2 rounded-sm border border-chaos-gold/25 bg-black/20 p-2">
                  <div className="section-label mb-2">Pick a battleground</div>
                  <div className="grid grid-cols-3 gap-1.5">
                    {swingDistricts.map((dist) => {
                      const maxed = (districtPushes[dist.code] ?? 0) >= MAX_DISTRICT_PUSH - 1e-6;
                      return (
                        <button
                          key={dist.code}
                          onClick={() => !maxed && run(a.id, dist.code)}
                          disabled={maxed}
                          title={dist.name}
                          className="rounded-sm border border-white/12 bg-white/5 px-1 py-1.5 text-center transition-all hover:border-chaos-gold/50 disabled:opacity-35"
                        >
                          <div className="display-title text-xs text-chaos-ink">{dist.code}</div>
                          {districtPushes[dist.code] ? <div className="text-[0.55rem] text-chaos-gold">pushed</div> : null}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
