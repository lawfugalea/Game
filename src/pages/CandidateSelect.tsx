import { useState } from 'react';
import { motion } from 'framer-motion';
import { opponents } from '../data/candidates';
import { backgrounds, ALL_TRAITS, combineStatMods, TRAIT_MODS } from '../data/backgrounds';
import { useGameStore } from '../store/gameStore';
import { CandidatePortrait } from '../components/art';
import type { Candidate, Party, CandidateTrait, Stats } from '../types/game';

const AVATARS = [
  'from-red-900 to-red-700',
  'from-rose-900 to-orange-800',
  'from-blue-900 to-blue-700',
  'from-sky-900 to-blue-700',
  'from-stone-800 to-stone-600',
  'from-violet-900 to-violet-700',
];

function deriveInitials(name: string): string {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (!words.length) return '??';
  const a = words[0][0] ?? '';
  const b = (words[1]?.[0] ?? words[0][1] ?? '').toString();
  return (a + b).toUpperCase();
}

function StatModChips({ mods }: { mods: Partial<Stats> }) {
  const entries = Object.entries(mods).filter(([, v]) => v !== 0);
  if (!entries.length) return null;
  return (
    <div className="mt-2 flex flex-wrap gap-1.5">
      {entries.map(([k, v]) => {
        const pos = (v as number) >= 0;
        const label =
          k === 'funds'
            ? `Funds ${pos ? '+' : '-'}€${Math.abs((v as number) / 1000)}K`
            : `${k.replace(/([A-Z])/g, ' $1').trim()} ${pos ? '+' : ''}${v}`;
        return (
          <span
            key={k}
            className="rounded-sm border px-1.5 py-0.5 text-[0.6rem] font-black uppercase"
            style={{
              background: pos ? 'rgba(47,159,107,0.14)' : 'rgba(201,20,36,0.14)',
              borderColor: pos ? 'rgba(47,159,107,0.32)' : 'rgba(201,20,36,0.32)',
              color: pos ? '#61d39b' : '#ff7b86',
            }}
          >
            {label}
          </span>
        );
      })}
    </div>
  );
}

export function CandidateSelect() {
  const startCustomGame = useGameStore((s) => s.startCustomGame);

  const [name, setName] = useState('');
  const [party, setParty] = useState<Party>('Labour');
  const [backgroundId, setBackgroundId] = useState<string | null>(null);
  const [traits, setTraits] = useState<CandidateTrait[]>([]);
  const [avatarBg, setAvatarBg] = useState(AVATARS[0]);
  const [oppId, setOppId] = useState<string>('');

  const background = backgrounds.find((b) => b.id === backgroundId) ?? null;
  const partyColor = party === 'Labour' ? 'var(--red)' : 'var(--blue)';
  const rivalOpponents = opponents.filter((o) => o.party !== party);
  const effectiveOpp = rivalOpponents.find((o) => o.id === oppId) ?? rivalOpponents[0];
  const previewCandidate = {
    initials: deriveInitials(name),
    party,
    color: party === 'Labour' ? '#c91424' : '#13579f',
    avatarBg,
    traits,
  };

  const ready = name.trim().length >= 2 && !!background && traits.length === 2 && !!effectiveOpp;

  function toggleTrait(t: CandidateTrait) {
    setTraits((cur) => {
      if (cur.includes(t)) return cur.filter((x) => x !== t);
      if (cur.length >= 2) return cur; // cap at two
      return [...cur, t];
    });
  }

  function begin() {
    if (!ready || !background || !effectiveOpp) return;
    const candidate: Candidate = {
      id: 'custom',
      name: name.trim(),
      title: background.title,
      party,
      traits,
      bio: background.blurb,
      color: party === 'Labour' ? '#c91424' : '#13579f',
      avatarBg,
      initials: deriveInitials(name),
    };
    const statMods = combineStatMods(background.statMods, traits);
    startCustomGame(candidate, effectiveOpp.id, statMods);
  }

  return (
    <div className="screen min-h-screen px-4 py-6">
      <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
        <button onClick={() => useGameStore.setState({ phase: 'menu' })} className="btn-ghost mb-5 px-3 py-2 text-xs font-black uppercase">
          Back
        </button>

        <div className="mb-5 border-l-4 border-chaos-gold pl-3">
          <div className="section-label">Candidate Nomination</div>
          <h2 className="display-title text-3xl leading-none text-chaos-ink">Create Your Leader</h2>
          <p className="serif-note mt-2 text-sm leading-relaxed text-white/52">
            Build the face of the machine. Your party, background and traits set your opening
            standing — and shape how every rally, scandal and newsroom ambush lands.
          </p>
        </div>

        {/* Name */}
        <div className="broadcast-card mb-4 p-4">
          <label className="section-label mb-2 block">Leader Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={28}
            placeholder="e.g. Rohan Vella"
            className="w-full rounded-sm border border-white/14 bg-black/25 px-3 py-2.5 text-base font-bold text-chaos-ink outline-none placeholder:text-white/25 focus:border-chaos-gold/60"
          />
          <div className="mt-3 flex items-center gap-3 text-xs text-white/40">
            <CandidatePortrait candidate={previewCandidate} className="h-14 w-14 shrink-0" label="Leader portrait preview" />
            <div>
              <div className="text-sm font-black text-chaos-ink">{name.trim() || 'Your Leader'}</div>
              <div className="font-bold uppercase" style={{ color: partyColor }}>{party} portrait preview</div>
            </div>
          </div>
        </div>

        {/* Party */}
        <div className="broadcast-card mb-4 p-4">
          <div className="section-label mb-3">Party</div>
          <div className="grid grid-cols-2 gap-2">
            {(['Labour', 'Nationalist'] as Party[]).map((p) => {
              const active = party === p;
              const col = p === 'Labour' ? 'var(--red)' : 'var(--blue)';
              return (
                <button
                  key={p}
                  onClick={() => {
                    setParty(p);
                    setOppId('');
                    setAvatarBg(p === 'Labour' ? AVATARS[0] : AVATARS[2]);
                  }}
                  className="rounded-sm border p-3 text-left transition-all"
                  style={{
                    borderColor: active ? col : 'rgba(255,255,255,0.12)',
                    background: active ? `${p === 'Labour' ? 'rgba(201,20,36,0.16)' : 'rgba(19,87,159,0.16)'}` : 'rgba(255,255,255,0.04)',
                  }}
                >
                  <div className="display-title text-lg" style={{ color: active ? col : 'var(--ink)' }}>{p}</div>
                  <div className="text-[0.62rem] font-bold uppercase text-white/40">{p === 'Labour' ? 'Partit Laburista' : 'Partit Nazzjonalista'}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Background */}
        <div className="mb-4">
          <div className="section-label mb-3 pl-1">Background</div>
          <div className="space-y-2.5">
            {backgrounds.map((b) => {
              const active = backgroundId === b.id;
              return (
                <button
                  key={b.id}
                  onClick={() => setBackgroundId(b.id)}
                  className={`w-full rounded-lg border p-3.5 text-left transition-all ${
                    active ? 'border-chaos-gold/70 bg-chaos-gold/12' : 'border-white/10 bg-white/5 hover:border-white/24'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="display-title text-base text-chaos-ink">{b.label}</div>
                    <div className="text-[0.62rem] font-bold uppercase text-white/40">{b.title}</div>
                  </div>
                  <p className="serif-note mt-1 text-xs leading-relaxed text-white/55">{b.blurb}</p>
                  <StatModChips mods={b.statMods} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Traits */}
        <div className="broadcast-card mb-4 p-4">
          <div className="mb-3 flex items-center justify-between">
            <div className="section-label">Traits</div>
            <div className="text-[0.62rem] font-black uppercase text-chaos-gold">{traits.length}/2 picked</div>
          </div>
          <div className="flex flex-wrap gap-2">
            {ALL_TRAITS.map((t) => {
              const active = traits.includes(t);
              const dim = !active && traits.length >= 2;
              return (
                <button
                  key={t}
                  onClick={() => toggleTrait(t)}
                  disabled={dim}
                  title={Object.entries(TRAIT_MODS[t]).map(([k, v]) => `${k} ${(v as number) >= 0 ? '+' : ''}${v}`).join(', ')}
                  className={`rounded-sm border px-2.5 py-1 text-xs font-black uppercase transition-all ${
                    active
                      ? 'border-chaos-gold/70 bg-chaos-gold/15 text-chaos-gold'
                      : dim
                      ? 'border-white/8 bg-black/20 text-white/25'
                      : 'border-white/14 bg-white/5 text-white/70 hover:border-white/30'
                  }`}
                >
                  {t}
                </button>
              );
            })}
          </div>
          {traits.length > 0 && <StatModChips mods={combineStatMods({}, traits)} />}
        </div>

        {/* Avatar accent */}
        <div className="broadcast-card mb-4 p-4">
          <div className="section-label mb-3">Badge Colour</div>
          <div className="flex flex-wrap gap-2">
            {AVATARS.map((a) => (
              <button
                key={a}
                onClick={() => setAvatarBg(a)}
                className={`avatar-tile flex h-11 w-11 items-center justify-center bg-gradient-to-br ${a} ${avatarBg === a ? 'ring-2 ring-chaos-gold' : ''}`}
              >
                {avatarBg === a && <span className="display-title text-xs text-white">{deriveInitials(name)}</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Opponent */}
        <div className="broadcast-card mb-7 p-4">
          <div className="section-label mb-3">Your Rival ({party === 'Labour' ? 'Nationalist' : 'Labour'})</div>
          <div className="space-y-2">
            {rivalOpponents.map((o) => {
              const active = effectiveOpp?.id === o.id;
              const col = o.party === 'Labour' ? 'var(--red)' : 'var(--blue)';
              return (
                <button
                  key={o.id}
                  onClick={() => setOppId(o.id)}
                  className={`flex w-full items-center gap-3 rounded-sm border p-3 text-left transition-all ${
                    active ? 'border-chaos-blue/60 bg-chaos-blue/15' : 'border-white/10 bg-black/12 hover:border-white/24'
                  }`}
                >
                  <CandidatePortrait candidate={o} className="h-10 w-10 shrink-0" label={`${o.name} portrait`} />
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-black text-chaos-ink">{o.name}</div>
                    <div className="text-xs text-white/42">{o.title}</div>
                  </div>
                  <div className="h-7 w-1.5 rounded-full" style={{ background: col }} />
                </button>
              );
            })}
          </div>
        </div>

        <motion.button
          whileTap={{ scale: ready ? 0.98 : 1 }}
          disabled={!ready}
          onClick={begin}
          className="btn-primary w-full py-4 text-lg font-black disabled:cursor-not-allowed disabled:opacity-45"
          style={{ background: ready && party === 'Nationalist' ? 'linear-gradient(135deg, #1c6fc0, #0f4880)' : undefined, boxShadow: ready && party === 'Nationalist' ? '0 12px 28px rgba(19,87,159,0.32)' : undefined }}
        >
          {ready ? `Launch ${name.trim().split(/\s+/).slice(-1)[0]}'s Campaign` : 'Complete Your Leader'}
        </motion.button>
        <div className="mt-2 text-center text-[0.62rem] uppercase text-white/30" style={{ color: partyColor }}>
          {name.trim() ? `${name.trim()} · ${party}` : 'Name · Party · Background · 2 Traits'}
        </div>
      </motion.div>
    </div>
  );
}
