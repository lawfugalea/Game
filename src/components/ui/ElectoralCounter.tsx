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

  return (
    <div className="bg-white/5 border border-white/8 rounded-xl p-4">
      <div className="text-xs text-white/40 uppercase tracking-widest mb-3 text-center">Electoral College</div>
      <div className="flex justify-between items-center mb-3">
        <div className="text-center">
          <div className={`text-2xl font-black ${ev.player >= EV_TO_WIN ? 'text-chaos-gold' : 'text-chaos-red'}`}>{ev.player}</div>
          <div className="text-xs text-white/40">{playerName}</div>
        </div>
        <div className="text-center">
          <div className="text-sm text-white/30 font-bold">{EV_TO_WIN} to win</div>
          <div className="text-xs text-white/20">270 needed</div>
        </div>
        <div className="text-center">
          <div className={`text-2xl font-black ${ev.opponent >= EV_TO_WIN ? 'text-chaos-gold' : 'text-chaos-blue'}`}>{ev.opponent}</div>
          <div className="text-xs text-white/40">{opponentName}</div>
        </div>
      </div>
      <div className="h-3 rounded-full overflow-hidden flex bg-white/8">
        <div className="bg-chaos-red transition-all duration-700" style={{ width: `${playerPct}%` }} />
        <div className="bg-white/20 transition-all duration-700" style={{ width: `${tossupPct}%` }} />
        <div className="bg-chaos-blue flex-1 transition-all duration-700" />
      </div>
      <div className="flex justify-between mt-1">
        <span className="text-xs text-white/30">{ev.player} EV</span>
        <span className="text-xs text-white/20">{ev.tossup} tossup</span>
        <span className="text-xs text-white/30">{ev.opponent} EV</span>
      </div>
    </div>
  );
}
