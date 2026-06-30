import { useEffect, useState } from 'react';

export function MainMenuHeroArt() {
  const [imageFailed, setImageFailed] = useState(false);
  const imageSrc = '/img/situations/menu-hero.webp';

  useEffect(() => {
    setImageFailed(false);
  }, [imageSrc]);

  if (!imageFailed) {
    return (
      <img
        src={imageSrc}
        className="block w-full rounded-lg object-cover"
        role="img"
        aria-label="Valletta election skyline"
        alt="Valletta election skyline"
        onError={() => setImageFailed(true)}
      />
    );
  }

  return (
    <svg className="block w-full" viewBox="0 0 360 190" role="img" aria-label="Valletta election skyline">
      <defs>
        <linearGradient id="menu-sky" x1="0" x2="360" y1="0" y2="190" gradientUnits="userSpaceOnUse">
          <stop stopColor="#13579f" stopOpacity=".34" />
          <stop offset=".52" stopColor="#2c211b" />
          <stop offset="1" stopColor="#17110d" />
        </linearGradient>
      </defs>
      <rect width="360" height="190" rx="8" fill="url(#menu-sky)" />
      <circle cx="282" cy="48" r="24" fill="#d8ad3d" opacity=".92" />
      <path d="M0 143c38-23 68 12 106-4s65-36 120-19 84-4 134-13v83H0Z" fill="#13579f" opacity=".38" />
      <path d="M25 133h310v45H25Z" fill="#d9c7a6" opacity=".92" />
      <path d="M42 133V94h28v39M82 133V76h22v57M116 133v-31h35v31M164 133V86h26v47M202 133V70h31v63M246 133V92h27v41M286 133V82h32v51" fill="#bfa77e" />
      <path d="M80 76 93 58l13 18M202 70l16-22 17 22M286 82l16-18 17 18" fill="#d8ad3d" />
      <path d="M0 162c38-11 67 10 102 0s60-11 97 0 84 11 161-2v30H0Z" fill="#17110d" />
      <path d="M48 158h68l-13 18H61Z" fill="#d8ad3d" />
      <path d="M64 158l10-24 25 24" fill="#f7efe2" opacity=".9" />
      <circle cx="51" cy="148" r="5" fill="#c91424" /><circle cx="60" cy="146" r="5" fill="#13579f" /><circle cx="69" cy="148" r="5" fill="#d8ad3d" />
      <path d="M173 31h14v14h14v14h-14v14h-14V59h-14V45h14Z" fill="#f7efe2" opacity=".9" />
      <path d="M24 24h64" stroke="#c91424" strokeWidth="6" /><path d="M24 34h64" stroke="#fff" strokeWidth="6" /><path d="M24 44h64" stroke="#13579f" strokeWidth="6" />
    </svg>
  );
}

export function ParliamentSeatsMotif({ player = 33, opponent = 32 }: { player?: number; opponent?: number }) {
  const seats = Array.from({ length: 65 }, (_, i) => i);
  return (
    <svg className="block w-full" viewBox="0 0 180 68" role="img" aria-label="Parliament seat motif">
      <path d="M19 62c5-36 33-56 71-56s66 20 71 56" fill="none" stroke="rgba(216,173,61,.35)" strokeWidth="7" />
      {seats.map((seat) => {
        const angle = Math.PI + (Math.PI * seat) / 64;
        const row = seat % 2;
        const radius = row ? 51 : 39;
        const x = 90 + Math.cos(angle) * radius;
        const y = 63 + Math.sin(angle) * radius;
        const fill = seat < player ? '#c91424' : seat < player + opponent ? '#13579f' : '#d8ad3d';
        return <circle key={seat} cx={x} cy={y} r={row ? 2.7 : 2.4} fill={fill} opacity=".94" />;
      })}
      <path d="M78 55h24v8H78Z" fill="#d8ad3d" />
    </svg>
  );
}

export function ElectionNightBackdrop() {
  const [imageFailed, setImageFailed] = useState(false);
  const imageSrc = '/img/situations/election-night.webp';

  useEffect(() => {
    setImageFailed(false);
  }, [imageSrc]);

  if (!imageFailed) {
    return (
      <img
        src={imageSrc}
        className="pointer-events-none absolute inset-x-0 top-0 -z-0 h-72 w-full object-cover opacity-85"
        aria-hidden="true"
        alt=""
        onError={() => setImageFailed(true)}
      />
    );
  }

  return (
    <svg className="pointer-events-none absolute inset-x-0 top-0 -z-0 h-72 w-full opacity-85" viewBox="0 0 360 260" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <radialGradient id="night-burst" cx="50%" cy="12%" r="70%">
          <stop stopColor="#d8ad3d" stopOpacity=".34" />
          <stop offset=".42" stopColor="#13579f" stopOpacity=".18" />
          <stop offset="1" stopColor="#17110d" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="360" height="260" fill="url(#night-burst)" />
      <path d="M0 178c48-22 82 8 132-11s78-38 133-17 68 4 95-5v115H0Z" fill="#0e0b09" opacity=".62" />
      <path d="M36 166V113h32v53M84 166V95h24v71M122 166v-44h42v44M182 166V105h30v61M228 166V86h35v80M282 166v-50h31v50" fill="#d9c7a6" opacity=".22" />
      <path d="M62 70 44 42M62 70l30-13M62 70l-3 33M270 57l-24-24M270 57l31-18M270 57l18 29" stroke="#d8ad3d" strokeWidth="2" opacity=".76" />
      <path d="M180 28h10v10h10v10h-10v10h-10V48h-10V38h10Z" fill="#f7efe2" opacity=".46" />
    </svg>
  );
}
