import { useEffect, useState } from 'react';
import type { Candidate } from '../../types/game';

type CandidatePortraitProps = {
  candidate: Pick<Candidate, 'initials' | 'party' | 'color' | 'traits'> & Partial<Pick<Candidate, 'id'>>;
  className?: string;
  label?: string;
};

const GOLD = '#d8ad3d';
const INK = '#f7efe2';

function hasTrait(candidate: CandidatePortraitProps['candidate'], trait: string) {
  return candidate.traits.includes(trait as Candidate['traits'][number]);
}

export function CandidatePortrait({ candidate, className = '', label }: CandidatePortraitProps) {
  const imageSrc = candidate.id && candidate.id !== 'custom' ? `/img/leaders/${candidate.id}.webp` : null;
  const [imageFailed, setImageFailed] = useState(false);
  const color = candidate.color || (candidate.party === 'Labour' ? '#c91424' : '#13579f');
  const rival = candidate.party === 'Labour' ? '#13579f' : '#c91424';
  const initials = candidate.initials || '??';
  const id = `portrait-${initials.replace(/[^a-z0-9]/gi, '')}-${candidate.party}`;
  const reformer = hasTrait(candidate, 'Reformer');
  const technocrat = hasTrait(candidate, 'Technocrat');
  const populist = hasTrait(candidate, 'Populist');
  const traditionalist = hasTrait(candidate, 'Traditionalist');
  const eu = hasTrait(candidate, 'EU-Federalist');
  const green = hasTrait(candidate, 'Environmentalist');
  const unionist = hasTrait(candidate, 'Unionist');

  useEffect(() => {
    setImageFailed(false);
  }, [imageSrc]);

  if (imageSrc && !imageFailed) {
    return (
      <img
        src={imageSrc}
        className={`avatar-tile block object-cover ${className}`}
        role={label ? 'img' : undefined}
        aria-label={label}
        alt={label ?? ''}
        onError={() => setImageFailed(true)}
      />
    );
  }

  return (
    <svg
      className={`avatar-tile block ${className}`}
      viewBox="0 0 96 96"
      role={label ? 'img' : 'presentation'}
      aria-label={label}
    >
      <defs>
        <linearGradient id={`${id}-bg`} x1="12" x2="86" y1="7" y2="91" gradientUnits="userSpaceOnUse">
          <stop stopColor={color} />
          <stop offset="0.58" stopColor="#2c211b" />
          <stop offset="1" stopColor={rival} />
        </linearGradient>
        <linearGradient id={`${id}-face`} x1="35" x2="64" y1="27" y2="74" gradientUnits="userSpaceOnUse">
          <stop stopColor="#f0d7aa" />
          <stop offset="1" stopColor="#b97951" />
        </linearGradient>
      </defs>
      <rect width="96" height="96" rx="8" fill={`url(#${id}-bg)`} />
      <path d="M6 74C22 66 31 71 45 62c17-11 28-35 45-33v67H6Z" fill="rgba(0,0,0,0.2)" />
      <path d="M8 14h80v9H8Z" fill="rgba(247,239,226,0.1)" />
      <path d="M14 18h68" stroke={GOLD} strokeWidth="2" strokeDasharray="7 5" opacity="0.65" />
      <circle cx="75" cy="22" r="8" fill="rgba(0,0,0,0.22)" stroke={GOLD} strokeWidth="1.5" />
      <path d="m75 14 2.1 5.8 6.1-1.1-4.6 4.2 3.2 5.4-5.4-3-4.1 4.7 1.2-6.1-5.7-2.4 6.1-.7Z" fill={eu ? '#f7efe2' : GOLD} opacity={eu ? 0.95 : 0.55} />

      <path d="M24 85c3-16 12-24 24-24s21 8 24 24Z" fill="#17110d" />
      <path d="M27 84c4-13 11-19 21-19s17 6 21 19Z" fill={color} opacity="0.92" />
      <path d="M36 68h24l-12 12Z" fill={INK} opacity="0.88" />
      <path d="M43 72h10l-5 12Z" fill={GOLD} />

      {populist && <path d="M27 59c4 8 13 12 21 12s17-4 21-12" fill="none" stroke={GOLD} strokeWidth="3" strokeLinecap="round" />}
      <path d="M28 43c0-14 8-24 20-24s20 10 20 24v7c0 15-9 25-20 25S28 65 28 50Z" fill={`url(#${id}-face)`} />
      <path d="M28 43c2-15 11-25 23-25 10 0 17 7 17 20-8-7-20-4-25-12-2 7-8 10-15 17Z" fill="#2a1e16" />
      {traditionalist && <path d="M31 37c7-11 25-15 35 0-6-2-11-3-18-3s-12 1-17 3Z" fill={GOLD} opacity="0.78" />}
      <path d="M37 48h5M54 48h5" stroke="#17110d" strokeWidth="3" strokeLinecap="round" />
      {technocrat && (
        <g fill="none" stroke={INK} strokeWidth="1.8" opacity="0.82">
          <rect x="33" y="44" width="13" height="8" rx="3" />
          <rect x="50" y="44" width="13" height="8" rx="3" />
          <path d="M46 48h4" />
        </g>
      )}
      <path d="M39 59c4 3 13 3 18 0" stroke="#6d2a22" strokeWidth="2.2" strokeLinecap="round" fill="none" />
      {reformer && <path d="M66 36 75 25M70 38l8-8" stroke={INK} strokeWidth="2" strokeLinecap="round" opacity="0.78" />}
      {green && <path d="M23 70c-1-9 5-15 14-14-2 8-7 13-14 14Z" fill="#2f9f6b" stroke={INK} strokeWidth="1" />}
      {unionist && <path d="M19 78h18" stroke={GOLD} strokeWidth="5" strokeLinecap="round" />}

      <rect x="8" y="74" width="30" height="14" rx="3" fill="rgba(0,0,0,0.48)" stroke="rgba(247,239,226,0.18)" />
      <text x="23" y="84" textAnchor="middle" fontFamily="Arial Narrow, Arial, sans-serif" fontSize="11" fontWeight="900" fill={INK}>
        {initials.slice(0, 3)}
      </text>
    </svg>
  );
}
