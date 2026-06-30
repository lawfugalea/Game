// Tiny zero-asset audio layer: synthesized blips via the Web Audio API, plus a mute toggle
// persisted to localStorage and an optional haptic buzz. No sample files to ship; a richer
// CC0 sample set can be swapped in behind these same call sites later.

const MUTE_KEY = 'cc-muted';

let ctx: AudioContext | null = null;
let muted = readMuted();

function readMuted(): boolean {
  try {
    return localStorage.getItem(MUTE_KEY) === '1';
  } catch {
    return false;
  }
}

// AudioContext must be created/resumed inside a user gesture; every play call routes through here.
function getCtx(): AudioContext | null {
  if (muted) return null;
  try {
    if (!ctx) {
      const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AC) return null;
      ctx = new AC();
    }
    if (ctx.state === 'suspended') void ctx.resume();
    return ctx;
  } catch {
    return null;
  }
}

interface Blip {
  freq: number;
  dur: number;
  type?: OscillatorType;
  gain?: number;
  slideTo?: number;
}

function blip({ freq, dur, type = 'square', gain = 0.06, slideTo }: Blip, startOffset = 0) {
  const ac = getCtx();
  if (!ac) return;
  const t0 = ac.currentTime + startOffset;
  const osc = ac.createOscillator();
  const g = ac.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t0);
  if (slideTo) osc.frequency.exponentialRampToValueAtTime(slideTo, t0 + dur);
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.exponentialRampToValueAtTime(gain, t0 + 0.01);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  osc.connect(g);
  g.connect(ac.destination);
  osc.start(t0);
  osc.stop(t0 + dur + 0.02);
}

// --- public sound effects -------------------------------------------------

export function playTap() {
  blip({ freq: 420, dur: 0.06, type: 'triangle', gain: 0.05 });
}

export function playAdvance() {
  blip({ freq: 330, dur: 0.09, type: 'sawtooth', gain: 0.05 });
  blip({ freq: 494, dur: 0.1, type: 'sawtooth', gain: 0.05 }, 0.07);
}

// Two-tone broadcast "news sting" for a resolved choice.
export function playHeadline() {
  blip({ freq: 587, dur: 0.12, type: 'square', gain: 0.05 });
  blip({ freq: 784, dur: 0.16, type: 'square', gain: 0.05 }, 0.1);
}

// Ominous descending tone when a scandal escalates.
export function playScandal() {
  blip({ freq: 360, dur: 0.45, type: 'sawtooth', gain: 0.07, slideTo: 120 });
}

// A single seat-flip tick on election night; call repeatedly as the grid reveals.
export function playSeatTick() {
  blip({ freq: 660, dur: 0.05, type: 'square', gain: 0.04 });
}

export function playResult(win: boolean) {
  if (win) {
    blip({ freq: 523, dur: 0.16, gain: 0.06 });
    blip({ freq: 659, dur: 0.16, gain: 0.06 }, 0.14);
    blip({ freq: 784, dur: 0.28, gain: 0.06 }, 0.28);
  } else {
    blip({ freq: 392, dur: 0.22, type: 'sawtooth', gain: 0.06, slideTo: 196 });
    blip({ freq: 262, dur: 0.34, type: 'sawtooth', gain: 0.06, slideTo: 131 }, 0.2);
  }
}

// --- haptics ---------------------------------------------------------------

export function buzz(pattern: number | number[] = 12) {
  if (muted) return;
  try {
    navigator.vibrate?.(pattern);
  } catch {
    /* unsupported */
  }
}

// --- mute control ----------------------------------------------------------

export function isMuted(): boolean {
  return muted;
}

export function toggleMuted(): boolean {
  muted = !muted;
  try {
    localStorage.setItem(MUTE_KEY, muted ? '1' : '0');
  } catch {
    /* ignore */
  }
  if (!muted) playTap(); // confirmation blip when unmuting
  return muted;
}
