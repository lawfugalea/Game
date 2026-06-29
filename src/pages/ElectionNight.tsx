import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../store/gameStore';
import { usStates } from '../data/states';
import { EV_TO_WIN } from '../utils/constants';

export function ElectionNight() {
  const { candidate, opponent, stats, opponentStats, electoralVotes } = useGameStore();
  const [revealed, setRevealed] = useState(0);
  const [done, setDone] = useState(false);

  const won = electoralVotes.player >= EV_TO_WIN;
  const sortedStates = [...usStates].sort((a) => (a.isSwing ? -1 : 1));

  useEffect(() => {
    if (revealed < sortedStates.length) {
      const t = setTimeout(() => setRevealed((r) => r + 1), 120);
      return () => clearTimeout(t);
    } else {
      setTimeout(() => setDone(true), 800);
    }
  }, [revealed, sortedStates.length]);

  if (!candidate || !opponent) return null;

  const advantage = stats.popularity - opponentStats.popularity;

  return (
    <div className="min-h-screen flex flex-col px-4 py-6" style={{ background: '#050510' }}>
      {/* Header */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span className="text-xs font-black text-white uppercase tracking-widest">ELECTION NIGHT COVERAGE</span>
        </div>
        <h2 className="text-3xl font-black text-white">Election Night</h2>
      </div>

      {/* EV counter */}
      <div className="flex justify-center gap-12 mb-6">
        <motion.div className="text-center" animate={{ scale: done && won ? [1, 1.1, 1] : 1 }} transition={{ repeat: done && won ? 3 : 0, duration: 0.4 }}>
          <div className={`text-5xl font-black ${won ? 'text-chaos-gold' : 'text-chaos-red'}`}>{electoralVotes.player}</div>
          <div className="text-white/50 text-sm">{candidate.name}</div>
          {won && <div className="text-chaos-gold text-xs font-bold mt-1">✓ ELECTED</div>}
        </motion.div>
        <div className="text-center self-end pb-4">
          <div className="text-white/20 text-sm">{EV_TO_WIN} needed</div>
        </div>
        <motion.div className="text-center" animate={{ scale: done && !won ? [1, 1.1, 1] : 1 }} transition={{ repeat: done && !won ? 3 : 0, duration: 0.4 }}>
          <div className={`text-5xl font-black ${!won ? 'text-chaos-gold' : 'text-chaos-blue'}`}>{electoralVotes.opponent}</div>
          <div className="text-white/50 text-sm">{opponent.name}</div>
          {!won && <div className="text-chaos-gold text-xs font-bold mt-1">✓ ELECTED</div>}
        </motion.div>
      </div>

      {/* State by state grid */}
      <div className="flex flex-wrap gap-1.5 justify-center mb-6">
        {sortedStates.slice(0, revealed).map((state, i) => {
          const stateAdj = state.baseLean - advantage * 0.5;
          const playerWins = stateAdj < 0;
          return (
            <motion.div key={state.code}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.02 }}
              className="rounded px-2 py-1 text-xs font-bold text-white text-center"
              style={{
                background: playerWins ? 'rgba(224,33,47,0.3)' : 'rgba(30,111,200,0.3)',
                border: `1px solid ${playerWins ? '#E0212F60' : '#1E6FC860'}`,
                minWidth: 36,
              }}>
              {state.code}
              <div className="text-white/30 text-xs">{state.electoralVotes}</div>
            </motion.div>
          );
        })}
      </div>

      {/* Final result */}
      {done && (
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          className={`rounded-2xl p-6 text-center border ${won ? 'border-chaos-gold/40 bg-chaos-gold/10' : 'border-white/10 bg-white/5'}`}>
          <div className="text-4xl mb-3">{won ? '🎉' : '😔'}</div>
          <h3 className={`text-2xl font-black mb-2 ${won ? 'text-chaos-gold' : 'text-white'}`}>
            {won ? `${candidate.name} wins the Presidency!` : `${opponent.name} wins the election`}
          </h3>
          <p className="text-white/50 text-sm mb-4">
            {won
              ? `${electoralVotes.player} electoral votes. The nation has spoken.`
              : `You finished with ${electoralVotes.player} electoral votes — ${EV_TO_WIN - electoralVotes.player} short of victory.`}
          </p>
          <button
            onClick={() => useGameStore.setState({ phase: 'game-over' })}
            className="w-full py-3 rounded-xl font-bold text-white"
            style={{ background: won ? 'linear-gradient(135deg, #b45309, #F5C518)' : '#333' }}>
            See Final Stats →
          </button>
        </motion.div>
      )}
    </div>
  );
}
