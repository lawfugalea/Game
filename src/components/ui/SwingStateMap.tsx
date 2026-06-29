import type { Stats } from '../../types/game';
import { swingStates } from '../../data/states';

interface SwingStateMapProps {
  playerStats: Stats;
  opponentStats: Stats;
}

export function SwingStateMap({ playerStats, opponentStats }: SwingStateMapProps) {
  const advantage = playerStats.popularity - opponentStats.popularity;

  return (
    <div className="bg-white/5 border border-white/8 rounded-xl p-4">
      <div className="text-xs text-white/40 uppercase tracking-widest mb-3">Swing States</div>
      <div className="flex flex-wrap gap-2">
        {swingStates.map((state) => {
          const stateAdj = state.baseLean - advantage * 0.5;
          const isLeaning = stateAdj < -3;
          const isOpponent = stateAdj > 3;
          const isTossup = !isLeaning && !isOpponent;
          return (
            <div
              key={state.code}
              className="rounded px-2 py-1 text-xs font-bold text-white"
              style={{
                background: isLeaning
                  ? 'rgba(224,33,47,0.3)'
                  : isOpponent
                  ? 'rgba(30,111,200,0.3)'
                  : 'rgba(245,197,24,0.2)',
                border: `1px solid ${isLeaning ? '#E0212F55' : isOpponent ? '#1E6FC855' : '#F5C51855'}`,
              }}
              title={`${state.name} (${state.electoralVotes} EV)`}
            >
              {state.code}
              <span className="text-white/40 ml-1">{state.electoralVotes}</span>
              {isTossup && <span className="ml-1 text-chaos-gold">~</span>}
            </div>
          );
        })}
      </div>
      <div className="flex gap-4 mt-3 text-xs text-white/30">
        <span><span className="text-chaos-red">■</span> Leaning You</span>
        <span><span className="text-chaos-gold">■</span> Tossup</span>
        <span><span className="text-chaos-blue">■</span> Leaning Opponent</span>
      </div>
    </div>
  );
}
