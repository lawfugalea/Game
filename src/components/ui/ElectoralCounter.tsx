import type { EVProjection } from '../../types/game';
import { EV_TO_WIN } from '../../utils/constants';

interface ElectoralCounterProps {
  ev: EVProjection;
  playerName: string;
  opponentName: string;
}

export function ElectoralCounter({ ev, playerName, opponentName }: ElectoralCounterProps) {
  const total = ev.player + ev.opponent + ev.tossup;
  const playerPct = (ev.player / total) * 100;
  const tossupPct = (ev.tossup / total) * 100;
  const seats = Array.from({ length: total }, (_, i) => {
    if (i < ev.player) return 'player';
    if (i < ev.player + ev.tossup) return 'tossup';
    return 'opponent';
  });

  return (
    <div className="broadcast-card p-4">
      <div className="mb-3 flex items-center justify-between">
        <div className="section-label">Parliament</div>
        <div className="text-[0.65rem] font-black uppercase text-white/42">65 seats · {EV_TO_WIN} governs</div>
      </div>
      <div className="mb-3 flex items-end justify-between">
        <div className="text-center">
          <div className={`display-title text-4xl leading-none ${ev.player >= EV_TO_WIN ? 'text-chaos-gold result-flash' : 'text-chaos-red'}`}>{ev.player}</div>
          <div className="text-[0.68rem] font-bold uppercase text-white/45">{playerName}</div>
        </div>
        <div className="pb-1 text-center">
          <div className="rounded-sm border border-chaos-gold/35 bg-chaos-gold/10 px-2 py-1 text-xs font-black text-chaos-gold">{EV_TO_WIN}</div>
          <div className="mt-1 text-[0.62rem] uppercase text-white/28">majority</div>
        </div>
        <div className="text-center">
          <div className={`display-title text-4xl leading-none ${ev.opponent >= EV_TO_WIN ? 'text-chaos-gold result-flash' : 'text-chaos-blue'}`}>{ev.opponent}</div>
          <div className="text-[0.68rem] font-bold uppercase text-white/45">{opponentName}</div>
        </div>
      </div>
      <div className="mb-3 grid gap-0.5" style={{ gridTemplateColumns: 'repeat(13, minmax(0, 1fr))' }}>
        {seats.map((seat, i) => (
          <div
            key={i}
            className={`h-2 rounded-[1px] ${seat === 'player' ? 'bg-chaos-red' : seat === 'opponent' ? 'bg-chaos-blue' : 'bg-chaos-gold/45'}`}
          />
        ))}
      </div>
      <div className="flex h-2.5 overflow-hidden rounded-sm bg-black/30 ring-1 ring-white/10">
        <div className="bg-chaos-red transition-all duration-700" style={{ width: `${playerPct}%` }} />
        <div className="bg-chaos-gold/55 transition-all duration-700" style={{ width: `${tossupPct}%` }} />
        <div className="bg-chaos-blue flex-1 transition-all duration-700" />
      </div>
      <div className="mt-1 flex justify-between text-[0.65rem] uppercase text-white/32">
        <span>{ev.player} projected</span>
        <span>{ev.opponent} projected</span>
      </div>
    </div>
  );
}
