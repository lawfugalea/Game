import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../store/gameStore';
import { StatBar } from '../components/ui/StatBar';
import { PollGauge } from '../components/ui/PollGauge';
import { ElectoralCounter } from '../components/ui/ElectoralCounter';
import { SwingStateMap } from '../components/ui/SwingStateMap';
import { HQActions } from '../components/ui/HQActions';
import { NewsTicker } from '../components/ui/NewsTicker';
import { SaveModal } from '../components/ui/SaveModal';
import { CandidatePortrait, ParliamentSeatsMotif } from '../components/art';
import { formatFunds, formatDay } from '../utils/format';
import { SCANDAL_LABELS } from '../engine/scandalSystem';
import { STAT_INFO } from '../utils/statInfo';
import { playAdvance, isMuted, toggleMuted } from '../engine/audioSystem';
import type { Stats } from '../types/game';

const COACH_KEY = 'cc-coach-seen';

export function Dashboard() {
  const {
    day, totalDays, candidate, opponent, stats, opponentStats, prevStats,
    polls, electoralVotes, eventLog, scandalStage, districtPushes, advanceDay,
  } = useGameStore();

  const [showSave, setShowSave] = useState(false);
  const [muted, setMuted] = useState(isMuted());
  const [showCoach, setShowCoach] = useState(() => {
    try { return localStorage.getItem(COACH_KEY) !== '1'; } catch { return false; }
  });

  if (!candidate || !opponent) return null;

  const headlines = eventLog.map((e) => e.headline);
  const daysLeft = totalDays - day;
  const urgencyColor = daysLeft <= 14 ? '#c91424' : daysLeft <= 30 ? '#d8ad3d' : '#2f9f6b';

  // Net change in a stat over the day just resolved (undefined on the opening day → no arrow).
  const d = (k: keyof Stats) => (prevStats ? stats[k] - prevStats[k] : undefined);

  function dismissCoach() {
    setShowCoach(false);
    try { localStorage.setItem(COACH_KEY, '1'); } catch { /* ignore */ }
  }

  function handleAdvance() {
    playAdvance();
    advanceDay();
  }

  return (
    <div className="screen flex min-h-screen flex-col">
      <NewsTicker headlines={headlines} />

      <div className="px-4 pb-2 pt-4">
        <div className="flex items-center justify-between mb-1">
          <div className="section-label">Campaign HQ</div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMuted(toggleMuted())}
              className="btn-ghost px-2 py-1 text-sm transition-all hover:text-white"
              aria-label={muted ? 'Unmute sound' : 'Mute sound'}
              title={muted ? 'Unmute' : 'Mute'}
            >
              {muted ? '🔇' : '🔊'}
            </button>
            <button
              onClick={() => setShowSave(true)}
              className="btn-ghost px-2.5 py-1 text-xs font-black uppercase transition-all hover:text-white"
            >
              Save
            </button>
            <div className="rounded-sm border px-2 py-1 text-xs font-black uppercase" style={{ color: urgencyColor, borderColor: `${urgencyColor}80`, background: `${urgencyColor}18` }}>
              Day {day}
            </div>
          </div>
        </div>

        <div className="broadcast-card mt-3 flex items-center gap-3 p-3">
          <CandidatePortrait candidate={candidate} className="h-12 w-12 shrink-0" label={`${candidate.name} portrait`} />
          <div className="flex-1">
            <div className="text-sm font-black text-chaos-ink">{candidate.name}</div>
            <div className="text-xs font-bold uppercase text-chaos-red">{candidate.party} Party</div>
          </div>
          <div className="rounded-sm border border-white/12 bg-black/20 px-2 py-1 text-xs font-black text-white/38">VS</div>
          <div className="flex-1 text-right">
            <div className="text-sm font-black text-chaos-ink">{opponent.name}</div>
            <div className="text-xs font-bold uppercase text-chaos-blue">{opponent.party} Party</div>
          </div>
          <CandidatePortrait candidate={opponent} className="h-12 w-12 shrink-0" label={`${opponent.name} portrait`} />
        </div>
        <div className="mt-2 text-center text-xs font-bold uppercase text-white/34">{formatDay(day, totalDays)}</div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar px-4 py-3 space-y-4">
        <PollGauge polls={polls} playerName={candidate.name.split(' ')[1] ?? candidate.name} opponentName={opponent.name.split(' ')[1]} />
        <ElectoralCounter ev={electoralVotes} playerName={candidate.name.split(' ')[1] ?? candidate.name} opponentName={opponent.name.split(' ')[1]} />
        <div className="paper-card px-4 py-3">
          <div className="section-label mb-1">Parliament Projection</div>
          <ParliamentSeatsMotif player={electoralVotes.player} opponent={electoralVotes.opponent} />
        </div>
        <SwingStateMap playerStats={stats} opponentStats={opponentStats} pushes={districtPushes} />

        <HQActions />

        <div className="broadcast-card p-4">
          <div className="section-label mb-3">Campaign Status</div>
          <div className="grid grid-cols-2 gap-x-4">
            <StatBar label="Popularity" value={stats.popularity} delta={d('popularity')} info={STAT_INFO.popularity} />
            <StatBar label="Trust" value={stats.trust} color="#13579f" delta={d('trust')} info={STAT_INFO.trust} />
            <StatBar label="Momentum" value={stats.momentum} color="#d8ad3d" delta={d('momentum')} info={STAT_INFO.momentum} />
            <StatBar label="Media" value={stats.mediaApproval} color="#7c5fb8" delta={d('mediaApproval')} info={STAT_INFO.mediaApproval} />
            <StatBar label="EU Standing" value={stats.foreignPolicy} color="#13579f" delta={d('foreignPolicy')} info={STAT_INFO.foreignPolicy} />
            <StatBar label="Stamina" value={stats.stamina} color="#2f9f6b" delta={d('stamina')} info={STAT_INFO.stamina} />
          </div>
        </div>

        <div className="broadcast-card p-4">
          <div className="section-label mb-3">Demographics</div>
          <div className="grid grid-cols-2 gap-x-4">
            <StatBar label="Youth" value={stats.youthVote} compact delta={d('youthVote')} info={STAT_INFO.youthVote} />
            <StatBar label="Working Class" value={stats.workingClass} compact color="#d8ad3d" delta={d('workingClass')} info={STAT_INFO.workingClass} />
            <StatBar label="Harbour / Urban" value={stats.urban} compact color="#13579f" delta={d('urban')} info={STAT_INFO.urban} />
            <StatBar label="Gozo & Villages" value={stats.rural} compact color="#7c5fb8" delta={d('rural')} info={STAT_INFO.rural} />
            <StatBar label="Switchers" value={stats.independents} compact color="#2f9f6b" delta={d('independents')} info={STAT_INFO.independents} />
          </div>
        </div>

        <div className="broadcast-card p-4">
          <div className="section-label mb-3">Resources</div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-bold uppercase text-white/50">Campaign Funds</span>
            <span className="text-sm font-bold text-chaos-gold">{formatFunds(stats.funds)}</span>
          </div>
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-bold uppercase text-white/50">Scandal Status</span>
            <span className={`rounded-sm border px-2 py-1 text-xs font-black uppercase ${scandalStage === 0 ? 'border-chaos-green/40 bg-chaos-green/12 text-chaos-green' : scandalStage <= 2 ? 'border-chaos-gold/40 bg-chaos-gold/12 text-chaos-gold' : 'border-chaos-red/50 bg-chaos-red/14 text-chaos-red'}`}>
              {SCANDAL_LABELS[scandalStage]}
            </span>
          </div>
          <StatBar label="Scandal Risk" value={stats.scandalRisk}
            color={stats.scandalRisk > 60 ? '#c91424' : stats.scandalRisk > 30 ? '#d8ad3d' : '#2f9f6b'} compact
            delta={d('scandalRisk')} info={STAT_INFO.scandalRisk} />
          <StatBar label="Developer Lobby" value={stats.donorSupport} color="#d8ad3d" compact
            delta={d('donorSupport')} info={STAT_INFO.donorSupport} />
        </div>

        {headlines.length > 0 && (
          <div className="paper-card p-4">
            <div className="section-label mb-3">Recent Headlines</div>
            <div className="space-y-2">
              {headlines.slice(0, 4).map((h, i) => (
                <div key={i} className="serif-note border-l-2 border-chaos-red/55 pl-2 text-xs leading-relaxed text-white/62">{h}</div>
              ))}
            </div>
          </div>
        )}

        <div className="h-4" />
      </div>

      <div className="border-t border-chaos-gold/18 bg-black/18 px-4 py-4 backdrop-blur-sm">
        <motion.button
          onClick={handleAdvance}
          whileTap={{ scale: 0.97 }}
          className="btn-primary w-full py-4 text-lg font-black"
        >
          {daysLeft <= 0 ? 'Go To Election Night' : `Advance To Day ${day + 1}`}
        </motion.button>
      </div>

      <AnimatePresence>
        {showSave && <SaveModal onClose={() => setShowSave(false)} />}
      </AnimatePresence>

      <AnimatePresence>
        {showCoach && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-4 backdrop-blur-sm"
            onClick={dismissCoach}
          >
            <motion.div
              initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 40, opacity: 0 }}
              className="broadcast-card w-full max-w-md p-5"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="section-label mb-2 text-chaos-gold">Welcome to Campaign HQ</div>
              <ul className="serif-note space-y-2 text-sm leading-relaxed text-white/72">
                <li>• You have <strong className="text-chaos-ink">{totalDays} days</strong> to win a majority — <strong className="text-chaos-ink">33 of 65 seats</strong>.</li>
                <li>• Press <strong className="text-chaos-ink">Advance</strong> to play out a day. Each day throws scenarios at you; your choices move the stats below.</li>
                <li>• Watch the <strong className="text-chaos-ink">▲▼ arrows</strong> to see what's rising or slipping, and <strong className="text-chaos-ink">tap any stat's “?”</strong> to learn what it does.</li>
                <li>• The published <strong className="text-chaos-ink">poll</strong> isn't the whole story — seats are won district by district.</li>
              </ul>
              <button onClick={dismissCoach} className="btn-primary mt-5 w-full py-3 text-sm font-black">
                Got it — let's campaign
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
