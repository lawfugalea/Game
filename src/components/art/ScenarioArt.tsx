import { useEffect, useState } from 'react';
import type { EventCategory } from '../../types/events';
import { getCategoryColor } from './categoryColors';

type ScenarioArtProps = {
  category: EventCategory;
  title?: string;
  className?: string;
};

function Stars({ color = '#d8ad3d' }: { color?: string }) {
  return (
    <g fill={color}>
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (Math.PI * 2 * i) / 8;
        const x = 132 + Math.cos(angle) * 23;
        const y = 37 + Math.sin(angle) * 18;
        return <circle key={i} cx={x} cy={y} r="2.2" />;
      })}
    </g>
  );
}

function IconScene({ category, color }: { category: EventCategory; color: string }) {
  switch (category) {
    case 'economy':
      return <g><path d="M20 76h82V64H20Z" fill="#13579f" /><path d="M27 62V35h6v27m30 0V28h6v34" stroke="#d8ad3d" strokeWidth="5" /><path d="M30 35h38l-12 10" stroke="#d8ad3d" strokeWidth="5" fill="none" /><text x="126" y="65" fontSize="42" fontWeight="900" fill={color}>€</text></g>;
    case 'scandal':
      return <g><path d="M35 23h60l14 16v39H35Z" fill="#f3e4c6" opacity=".85" /><path d="M95 23v16h14" fill="none" stroke="#5b3e28" strokeWidth="3" /><path d="M45 43h39M45 54h48M45 65h30" stroke="#5b3e28" strokeWidth="3" /><path d="M110 68h42v18h-42Z" fill="#8a5a2d" /><path d="M110 68l21 11 21-11" fill="none" stroke="#d8ad3d" strokeWidth="2" /><path d="M24 21l9 59M57 16l-4 68M86 20l12 62" stroke="#c91424" strokeWidth="4" strokeDasharray="8 5" /></g>;
    case 'environment':
      return <g><path d="M16 78c20-22 41-22 62 0s43 21 82 0v18H16Z" fill="#2f9f6b" /><path d="M82 78V25h7v53M86 25h46l-15 14" stroke="#d8ad3d" strokeWidth="5" fill="none" /><circle cx="40" cy="48" r="14" fill="#d8ad3d" /><path d="M28 72c6-18 25-25 39-13" fill="none" stroke="#f7efe2" strokeWidth="4" /></g>;
    case 'debate':
      return <g><rect x="23" y="24" width="134" height="58" rx="5" fill="#17110d" stroke="#d8ad3d" strokeWidth="3" /><path d="M49 82V59h31v23M101 82V59h31v23" fill="#2c211b" stroke="#f7efe2" strokeWidth="2" /><circle cx="64" cy="48" r="8" fill="#c91424" /><circle cx="117" cy="48" r="8" fill="#13579f" /><path d="M89 33v43" stroke="#d8ad3d" strokeWidth="2" /></g>;
    case 'press':
      return <g><path d="M76 72 50 91 43 82l28-18Z" fill="#17110d" /><circle cx="86" cy="54" r="23" fill="#d8ad3d" /><circle cx="86" cy="54" r="13" fill="#17110d" /><path d="M112 38h31v38h-31Z" fill="#f3e4c6" opacity=".8" /><path d="M118 50h18M118 60h12" stroke="#5b3e28" strokeWidth="3" /></g>;
    case 'immigration':
      return <g><path d="M0 78c20-9 40 9 60 0s40-9 60 0 40 9 60 0v20H0Z" fill="#13579f" /><path d="M53 65h72l-13 15H66Z" fill="#d8ad3d" /><path d="M72 65l9-24 25 24" fill="#f7efe2" opacity=".85" /><circle cx="31" cy="40" r="10" fill="#c91424" /></g>;
    case 'foreign':
      return <g><rect x="28" y="25" width="124" height="56" rx="6" fill="#13579f" /><Stars /><path d="M44 76V35m92 41V35" stroke="#d8ad3d" strokeWidth="4" /><path d="m60 39 15 13-15 13" fill="none" stroke="#f7efe2" strokeWidth="5" /></g>;
    case 'energy':
      return <g><circle cx="127" cy="38" r="20" fill="#d8ad3d" /><path d="M32 84 52 30l20 54M42 58h20M37 72h30M82 84l18-45 18 45M92 61h16" stroke="#f7efe2" strokeWidth="4" fill="none" /><path d="M52 30h48" stroke="#d8ad3d" strokeWidth="3" /></g>;
    case 'healthcare':
      return <g><rect x="43" y="26" width="94" height="58" rx="8" fill="#f3e4c6" opacity=".88" /><path d="M90 40v30M75 55h30" stroke="#c91424" strokeWidth="10" /><path d="M39 80c10-20 21-20 31 0s21 20 31 0 22-20 36 0" fill="none" stroke="#2f9f6b" strokeWidth="4" /></g>;
    case 'party':
      return <g><path d="M28 75V30m124 45V30" stroke="#d8ad3d" strokeWidth="5" /><path d="M28 34c24-13 48 13 72 0s32-10 52 0v29c-20-10-28-13-52 0s-48-13-72 0Z" fill="#c91424" /><path d="M28 49c24-13 48 13 72 0s32-10 52 0v14c-20-10-28-13-52 0s-48-13-72 0Z" fill="#13579f" opacity=".85" /></g>;
    case 'donor':
    case 'fundraiser':
      return <g><rect x="47" y="40" width="86" height="45" rx="5" fill="#6b3f20" stroke="#d8ad3d" strokeWidth="3" /><path d="M75 40v-8h30v8M47 58h86" stroke="#d8ad3d" strokeWidth="3" /><circle cx="90" cy="64" r="10" fill="#d8ad3d" /><text x="90" y="68" textAnchor="middle" fontSize="13" fontWeight="900" fill="#17110d">€</text></g>;
    case 'rally':
      return <g><path d="M18 81c16-15 27-15 43 0s27 15 43 0 29-15 58 0v16H18Z" fill="#17110d" /><path d="M41 63V25m48 38V21m48 42V27" stroke="#d8ad3d" strokeWidth="4" /><path d="M41 28h29l-7 10 7 10H41ZM89 24h31l-8 10 8 10H89ZM137 30h26l-7 10 7 10h-26Z" fill="#c91424" /><path d="M28 41l8-12M147 22l10-12M111 57l12-10" stroke="#f7efe2" strokeWidth="3" /></g>;
    case 'disaster':
      return <g><path d="M90 51 77 28l19 18 6-30 6 30 19-18-13 23 29-2-28 10 24 17-30-7-7 25-7-25-30 7 24-17-28-10Z" fill="#f97316" /><circle cx="102" cy="55" r="12" fill="#d8ad3d" /><path d="M26 82h128" stroke="#f7efe2" strokeWidth="4" strokeDasharray="8 6" /></g>;
    case 'election-security':
    case 'technology':
      return <g><rect x="28" y="24" width="124" height="61" rx="5" fill="#17110d" stroke="#2f9f6b" strokeWidth="3" /><path d="M40 39h35M84 39h18M110 39h28M40 55h22M70 55h45M123 55h15M40 70h63M113 70h25" stroke="#2f9f6b" strokeWidth="4" /><path d="M54 28v55M119 25v61" stroke="#c91424" strokeWidth="2" opacity=".8" /></g>;
    case 'education':
      return <g><path d="m90 27 59 23-59 23-59-23Z" fill="#d8ad3d" /><path d="M57 59v17c18 12 48 12 66 0V59" fill="#13579f" /><path d="M149 50v26" stroke="#f7efe2" strokeWidth="4" /><circle cx="149" cy="81" r="5" fill="#c91424" /></g>;
    case 'trade':
      return <g><path d="M25 70h112l-15 17H42Z" fill="#13579f" /><rect x="48" y="41" width="24" height="22" fill="#c91424" /><rect x="74" y="41" width="24" height="22" fill="#d8ad3d" /><rect x="100" y="41" width="24" height="22" fill="#2f9f6b" /><path d="M25 87c20-8 40 8 60 0s40-8 70 0" stroke="#f7efe2" strokeWidth="3" fill="none" /></g>;
    case 'rare':
      return <g><path d="M20 86h140L112 22H68Z" fill="#f7efe2" opacity=".12" /><circle cx="90" cy="49" r="22" fill="#d8ad3d" /><path d="M90 27v44M68 49h44" stroke="#17110d" strokeWidth="5" /><path d="M47 86h86" stroke="#d8ad3d" strokeWidth="5" /></g>;
    case 'crime':
      return <g><path d="M42 82h96" stroke="#8b949e" strokeWidth="6" /><path d="M61 82V38h58v44" fill="#17110d" stroke="#f7efe2" strokeWidth="3" /><path d="M75 38c0-20 30-20 30 0" fill="none" stroke="#d8ad3d" strokeWidth="5" /><path d="M74 56h32M74 68h32" stroke="#8b949e" strokeWidth="4" /></g>;
    case 'war':
      return <g><path d="M30 78h120" stroke="#8b949e" strokeWidth="5" /><path d="M42 63h46l20-17h25l-19 17h24c7 0 12 4 14 10H40Z" fill="#6b7280" /><path d="M69 58 54 38h20l16 20Z" fill="#17110d" /><circle cx="54" cy="79" r="7" fill="#17110d" /><circle cx="129" cy="79" r="7" fill="#17110d" /></g>;
    case 'supreme-court':
      return <g><path d="m90 20 61 24H29Z" fill="#d9c7a6" /><path d="M42 47v34M66 47v34M90 47v34M114 47v34M138 47v34" stroke="#f7efe2" strokeWidth="7" /><path d="M31 84h118" stroke="#d8ad3d" strokeWidth="6" /><path d="M90 28v14" stroke="#c91424" strokeWidth="4" /></g>;
  }
}

export function ScenarioArt({ category, title, className = '' }: ScenarioArtProps) {
  const imageSrc = `/img/scenarios/${category}.webp`;
  const [imageFailed, setImageFailed] = useState(false);
  const color = getCategoryColor(category);

  useEffect(() => {
    setImageFailed(false);
  }, [imageSrc]);

  if (!imageFailed) {
    return (
      <img
        src={imageSrc}
        className={`block w-full rounded-lg object-cover ${className}`}
        role={title ? 'img' : undefined}
        aria-label={title}
        alt={title ?? ''}
        onError={() => setImageFailed(true)}
      />
    );
  }

  return (
    <svg className={`block w-full ${className}`} viewBox="0 0 180 104" role={title ? 'img' : 'presentation'} aria-label={title}>
      <defs>
        <linearGradient id={`scene-${category}`} x1="0" x2="180" y1="0" y2="104" gradientUnits="userSpaceOnUse">
          <stop stopColor={color} stopOpacity="0.34" />
          <stop offset="0.58" stopColor="#2c211b" stopOpacity="0.9" />
          <stop offset="1" stopColor="#17110d" />
        </linearGradient>
      </defs>
      <rect width="180" height="104" rx="8" fill={`url(#scene-${category})`} />
      <path d="M0 80c27-15 48 8 76-5s43-30 104-19v48H0Z" fill="rgba(0,0,0,0.18)" />
      <path d="M12 14h156M12 90h156" stroke="rgba(247,239,226,0.16)" strokeWidth="1" />
      <IconScene category={category} color={color} />
    </svg>
  );
}
