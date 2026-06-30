import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../store/gameStore';
import { districts } from '../data/states';
import { districtPlayerShare } from '../engine/electoralCollege';
import { EV_TO_WIN } from '../utils/constants';
import { CandidatePortrait, ElectionNightBackdrop } from '../components/art';
import { playSeatTick, playResult, buzz } from '../engine/audioSystem';

export function ElectionNight() {
  const { candidate, opponent, stats, opponentStats, electoralVotes, districtPushes } = useGameStore();
  const [revealed, setRevealed] = useState(0);
  const [done, setDone] = useState(false);

  const won = electoralVotes.player >= EV_TO_WIN;

  useEffect(() => {
    if (revealed < districts.length) {
      const t = setTimeout(() => { setRevealed((r) => r + 1); playSeatTick(); }, 220);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => { setDone(true); playResult(won); buzz(won ? [30, 40, 30] : 60); }, 800);
      return () => clearTimeout(t);
    }
  }, [revealed, won]);

  if (!candidate || !opponent) return null;

  return (
    <div className="screen relative flex min-h-screen flex-col px-4 py-6">
      <ElectionNightBackdrop />
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="h-2 w-2 rounded-full bg-chaos-red alert-pulse" />
          <span className="text-xs font-black uppercase text-white">RIZULTAT · LIVE RESULTS</span>
        </div>
        <h2 className="display-title text-4xl leading-none text-chaos-ink">Election Night</h2>
      </div>

      <div className="broadcast-card relative z-10 mb-6 flex justify-center gap-5 p-4">
        <motion.div className="flex-1 text-center" animate={{ scale: done && won ? [1, 1.1, 1] : 1 }} transition={{ repeat: done && won ? 3 : 0, duration: 0.4 }}>
          <CandidatePortrait candidate={candidate} className="mx-auto mb-2 h-16 w-16" label={`${candidate.name} portrait`} />
          <div className={`display-title text-6xl leading-none ${won ? 'text-chaos-gold result-flash' : 'text-chaos-red'}`}>{electoralVotes.player}</div>
          <div className="text-xs font-bold uppercase text-white/48">{candidate.name}</div>
          {won && <div className="mt-1 text-xs font-black uppercase text-chaos-gold">Governs</div>}
        </motion.div>
        <div className="text-center self-end pb-4">
          <div className="rounded-sm border border-chaos-gold/35 bg-chaos-gold/12 px-2 py-1 text-xs font-black text-chaos-gold">{EV_TO_WIN}</div>
          <div className="mt-1 text-[0.62rem] uppercase text-white/30">to govern</div>
        </div>
        <motion.div className="flex-1 text-center" animate={{ scale: done && !won ? [1, 1.1, 1] : 1 }} transition={{ repeat: done && !won ? 3 : 0, duration: 0.4 }}>
          <CandidatePortrait candidate={opponent} className="mx-auto mb-2 h-16 w-16" label={`${opponent.name} portrait`} />
          <div className={`display-title text-6xl leading-none ${!won ? 'text-chaos-gold result-flash' : 'text-chaos-blue'}`}>{electoralVotes.opponent}</div>
          <div className="text-xs font-bold uppercase text-white/48">{opponent.name}</div>
          {!won && <div className="mt-1 text-xs font-black uppercase text-chaos-gold">Governs</div>}
        </motion.div>
      </div>

      <div className="mb-6 grid grid-cols-4 gap-2">
        {districts.slice(0, revealed).map((d, i) => {
          const share = districtPlayerShare(d, stats, opponentStats, districtPushes);
          const playerSeats = Math.round(share * d.seats);
          const playerWins = playerSeats >= 3;
          return (
            <motion.div key={d.code}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.02 }}
              className="rounded-sm border px-2 py-2 text-center text-xs font-black text-white"
              style={{
                background: playerWins ? 'rgba(201,20,36,0.34)' : 'rgba(19,87,159,0.34)',
                borderColor: playerWins ? '#c9142470' : '#13579f70',
              }}>
              <div className="display-title">{d.code}</div>
              <div className="text-[0.65rem] text-white/52">{playerSeats}-{d.seats - playerSeats}</div>
            </motion.div>
          );
        })}
      </div>

      {done && (
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          className={`broadcast-card p-6 text-center ${won ? 'border-chaos-gold/45 bg-chaos-gold/10' : 'border-white/10 bg-white/5'}`}>
          <div className="section-label mb-2">{won ? 'Majority Confirmed' : 'Opposition Majority'}</div>
          <h3 className={`display-title mb-2 text-2xl leading-tight ${won ? 'text-chaos-gold' : 'text-chaos-ink'}`}>
            {won ? `${candidate.name} becomes Prime Minister!` : `${opponent.name} forms the next government`}
          </h3>
          <p className="serif-note text-sm leading-relaxed text-white/54 mb-4">
            {won
              ? `${electoralVotes.player} of 65 seats. Castille is yours.`
              : `You finished with ${electoralVotes.player} seats, ${EV_TO_WIN - electoralVotes.player} short of a majority.`}
          </p>
          <button
            onClick={() => useGameStore.setState({ phase: 'game-over' })}
            className="btn-primary w-full py-3 text-sm font-black"
            style={{ background: won ? 'linear-gradient(135deg, #8a641a, #d8ad3d)' : undefined }}>
            See Final Stats
          </button>
        </motion.div>
      )}
    </div>
  );
}
