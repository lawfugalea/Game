import { motion } from 'framer-motion';
import { useGameStore } from '../store/gameStore';
import { StatBar } from '../components/ui/StatBar';
import { formatFunds } from '../utils/format';
import { EV_TO_WIN } from '../utils/constants';

export function GameOver() {
  const { candidate, opponent, stats, electoralVotes, day, goToMainMenu } = useGameStore();
  if (!candidate || !opponent) return null;

  const won = electoralVotes.player >= EV_TO_WIN;

  const ending = (() => {
    if (!won && stats.scandalRisk > 70) return { label: 'Scandal Destroyed Your Campaign', desc: 'The headlines never stopped. Your campaign became a case study in what not to do.' };
    if (!won && stats.funds < 500000) return { label: 'Outspent and Outgunned', desc: 'Without the funds to compete, your message never broke through.' };
    if (!won) return { label: 'A Close Race', desc: 'You fought hard but the numbers didn\'t fall your way. History will remember the effort.' };
    if (won && electoralVotes.player > 350) return { label: 'Landslide Victory', desc: 'A historic mandate. The nation didn\'t just choose you — it chose your vision.' };
    if (won && stats.trust > 70) return { label: 'A President the People Trust', desc: 'You won, and you did it with integrity intact. That matters.' };
    return { label: 'President-Elect', desc: 'A hard-fought victory. Now the real work begins.' };
  })();

  return (
    <div className="min-h-screen flex flex-col px-4 py-8 max-w-lg mx-auto">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">{won ? '🏛️' : '📰'}</div>
          <h2 className="text-2xl font-black text-white mb-2">{ending.label}</h2>
          <p className="text-white/50 text-sm leading-relaxed">{ending.desc}</p>
        </div>

        <div className="bg-white/5 border border-white/8 rounded-xl p-4 mb-4">
          <div className="flex justify-between items-center mb-4">
            <div>
              <div className="text-white font-bold">{candidate.name}</div>
              <div className="text-white/40 text-sm">{candidate.party} Party</div>
            </div>
            <div className="text-right">
              <div className={`text-2xl font-black ${won ? 'text-chaos-gold' : 'text-chaos-red'}`}>{electoralVotes.player} EV</div>
              <div className="text-white/30 text-xs">Day {day} campaign</div>
            </div>
          </div>
          <StatBar label="Final Popularity" value={stats.popularity} />
          <StatBar label="Public Trust" value={stats.trust} color="#1E6FC8" />
          <StatBar label="Momentum" value={stats.momentum} color="#F5C518" />
          <StatBar label="Media Approval" value={stats.mediaApproval} color="#a855f7" />
          <div className="flex justify-between items-center mt-3 pt-3 border-t border-white/8">
            <span className="text-xs text-white/40">Campaign Funds Remaining</span>
            <span className="text-sm font-bold text-chaos-gold">{formatFunds(stats.funds)}</span>
          </div>
        </div>

        <button
          onClick={goToMainMenu}
          className="w-full py-4 rounded-xl font-black text-lg text-white"
          style={{ background: 'linear-gradient(135deg, #E0212F, #c01828)' }}>
          Play Again
        </button>
      </motion.div>
    </div>
  );
}
