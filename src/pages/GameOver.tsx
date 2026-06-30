import { motion } from 'framer-motion';
import { useGameStore } from '../store/gameStore';
import { StatBar } from '../components/ui/StatBar';
import { formatFunds } from '../utils/format';
import { EV_TO_WIN } from '../utils/constants';
import { determineEnding } from '../engine/endings';
import { CandidatePortrait, ParliamentSeatsMotif } from '../components/art';

const TONE_COLOR: Record<string, string> = {
  gold: 'text-chaos-gold',
  red: 'text-chaos-red',
  neutral: 'text-chaos-ink',
};

export function GameOver() {
  const { candidate, opponent, stats, electoralVotes, day, goToMainMenu } = useGameStore();
  if (!candidate || !opponent) return null;

  const won = electoralVotes.player >= EV_TO_WIN;
  const ending = determineEnding(won, electoralVotes.player, stats);

  return (
    <div className="screen flex min-h-screen flex-col px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
        <div className="mb-7 border-y border-chaos-gold/35 py-5 text-center">
          <div className="section-label mb-2">Final Edition</div>
          <div className="mb-3 text-4xl">{ending.emoji}</div>
          <h2 className={`display-title mb-2 text-3xl leading-none ${TONE_COLOR[ending.tone]}`}>{ending.label}</h2>
          <p className="serif-note text-sm leading-relaxed text-white/56">{ending.desc}</p>
        </div>

        <div className="broadcast-card mb-4 p-4">
          <div className="flex justify-between items-center mb-4">
            <div className="flex min-w-0 items-center gap-3">
              <CandidatePortrait candidate={candidate} className="h-14 w-14 shrink-0" label={`${candidate.name} portrait`} />
              <div className="min-w-0">
              <div className="text-base font-black text-chaos-ink">{candidate.name}</div>
              <div className="text-xs font-bold uppercase text-white/42">{candidate.party} Party</div>
              </div>
            </div>
            <div className="text-right">
              <div className={`display-title text-3xl leading-none ${won ? 'text-chaos-gold' : 'text-chaos-red'}`}>{electoralVotes.player}</div>
              <div className="text-xs font-bold uppercase text-white/34">seats · day {day}</div>
            </div>
          </div>
          <ParliamentSeatsMotif player={electoralVotes.player} opponent={electoralVotes.opponent} />
          <StatBar label="Final Popularity" value={stats.popularity} />
          <StatBar label="Public Trust" value={stats.trust} color="#13579f" />
          <StatBar label="Momentum" value={stats.momentum} color="#d8ad3d" />
          <StatBar label="Media Approval" value={stats.mediaApproval} color="#7c5fb8" />
          <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-3">
            <span className="text-xs font-bold uppercase text-white/42">Funds Remaining</span>
            <span className="text-sm font-bold text-chaos-gold">{formatFunds(stats.funds)}</span>
          </div>
        </div>

        <button
          onClick={goToMainMenu}
          className="btn-primary w-full py-4 text-lg font-black"
        >
          Play Again
        </button>
      </motion.div>
    </div>
  );
}
