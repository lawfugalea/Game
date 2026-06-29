import { motion } from 'framer-motion';
import { useGameStore } from '../store/gameStore';
import { StatBar } from '../components/ui/StatBar';
import { PollGauge } from '../components/ui/PollGauge';
import { ElectoralCounter } from '../components/ui/ElectoralCounter';
import { SwingStateMap } from '../components/ui/SwingStateMap';
import { NewsTicker } from '../components/ui/NewsTicker';
import { formatFunds, formatDay } from '../utils/format';
import { SCANDAL_LABELS } from '../engine/scandalSystem';

export function Dashboard() {
  const {
    day, totalDays, candidate, opponent, stats, opponentStats,
    polls, electoralVotes, eventLog, scandalStage, advanceDay,
  } = useGameStore();

  if (!candidate || !opponent) return null;

  const headlines = eventLog.map((e) => e.headline);
  const daysLeft = totalDays - day;
  const urgencyColor = daysLeft <= 14 ? '#E0212F' : daysLeft <= 30 ? '#F5C518' : '#22c55e';

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#080810' }}>
      <NewsTicker headlines={headlines} />

      {/* Header */}
      <div className="px-4 pt-4 pb-2">
        <div className="flex items-center justify-between mb-1">
          <div className="text-xs text-white/30 uppercase tracking-widest">Campaign HQ</div>
          <div className="text-xs font-bold" style={{ color: urgencyColor }}>
            Day {day} · {formatDay(day, totalDays)}
          </div>
        </div>

        {/* Candidate vs Opponent bar */}
        <div className="flex items-center gap-3 py-3 border-b border-white/8">
          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${candidate.avatarBg} flex items-center justify-center`}>
            <span className="text-white font-black text-sm">{candidate.initials}</span>
          </div>
          <div className="flex-1">
            <div className="text-white font-bold text-sm">{candidate.name}</div>
            <div className="text-white/30 text-xs">{candidate.party} Party</div>
          </div>
          <div className="text-white/30 text-sm font-black">VS</div>
          <div className="flex-1 text-right">
            <div className="text-white font-bold text-sm">{opponent.name}</div>
            <div className="text-white/30 text-xs">{opponent.party} Party</div>
          </div>
          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${opponent.avatarBg} flex items-center justify-center`}>
            <span className="text-white font-black text-sm">{opponent.initials}</span>
          </div>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-4 py-3 space-y-4">
        <PollGauge polls={polls} playerName={candidate.name.split(' ')[1]} opponentName={opponent.name.split(' ')[1]} />
        <ElectoralCounter ev={electoralVotes} playerName={candidate.name.split(' ')[1]} opponentName={opponent.name.split(' ')[1]} />
        <SwingStateMap playerStats={stats} opponentStats={opponentStats} />

        {/* Key stats */}
        <div className="bg-white/5 border border-white/8 rounded-xl p-4">
          <div className="text-xs text-white/40 uppercase tracking-widest mb-3">Campaign Status</div>
          <div className="grid grid-cols-2 gap-x-4">
            <StatBar label="Popularity" value={stats.popularity} />
            <StatBar label="Trust" value={stats.trust} color="#1E6FC8" />
            <StatBar label="Momentum" value={stats.momentum} color="#F5C518" />
            <StatBar label="Media" value={stats.mediaApproval} color="#a855f7" />
            <StatBar label="Party Support" value={stats.partySupport} color="#E0212F" />
            <StatBar label="Stamina" value={stats.stamina} color="#22c55e" />
          </div>
        </div>

        {/* Demographics */}
        <div className="bg-white/5 border border-white/8 rounded-xl p-4">
          <div className="text-xs text-white/40 uppercase tracking-widest mb-3">Demographics</div>
          <div className="grid grid-cols-2 gap-x-4">
            <StatBar label="Youth Vote" value={stats.youthVote} compact />
            <StatBar label="Working Class" value={stats.workingClass} compact color="#F5C518" />
            <StatBar label="Urban" value={stats.urban} compact color="#1E6FC8" />
            <StatBar label="Rural" value={stats.rural} compact color="#a855f7" />
            <StatBar label="Independents" value={stats.independents} compact color="#22c55e" />
          </div>
        </div>

        {/* Resources */}
        <div className="bg-white/5 border border-white/8 rounded-xl p-4">
          <div className="text-xs text-white/40 uppercase tracking-widest mb-3">Resources</div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-white/50">Campaign Funds</span>
            <span className="text-sm font-bold text-chaos-gold">{formatFunds(stats.funds)}</span>
          </div>
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs text-white/50">Scandal Status</span>
            <span className={`text-xs font-bold px-2 py-1 rounded ${scandalStage === 0 ? 'bg-green-900/50 text-green-400' : scandalStage <= 2 ? 'bg-yellow-900/50 text-yellow-400' : 'bg-red-900/50 text-red-400'}`}>
              {SCANDAL_LABELS[scandalStage]}
            </span>
          </div>
          <StatBar label="Scandal Risk" value={stats.scandalRisk}
            color={stats.scandalRisk > 60 ? '#E0212F' : stats.scandalRisk > 30 ? '#F5C518' : '#22c55e'} compact />
          <StatBar label="Donor Support" value={stats.donorSupport} color="#F5C518" compact />
        </div>

        {/* Recent news */}
        {headlines.length > 0 && (
          <div className="bg-white/5 border border-white/8 rounded-xl p-4">
            <div className="text-xs text-white/40 uppercase tracking-widest mb-3">Recent Headlines</div>
            <div className="space-y-2">
              {headlines.slice(0, 4).map((h, i) => (
                <div key={i} className="text-xs text-white/60 border-l-2 border-chaos-red/40 pl-2">{h}</div>
              ))}
            </div>
          </div>
        )}

        <div className="h-4" />
      </div>

      {/* Advance Day button */}
      <div className="px-4 py-4 border-t border-white/8">
        <motion.button
          onClick={advanceDay}
          whileTap={{ scale: 0.97 }}
          className="w-full py-4 rounded-xl font-black text-lg text-white tracking-wide"
          style={{ background: 'linear-gradient(135deg, #E0212F, #c01828)' }}>
          {daysLeft <= 0 ? 'GO TO ELECTION NIGHT →' : `ADVANCE TO DAY ${day + 1} →`}
        </motion.button>
      </div>
    </div>
  );
}
