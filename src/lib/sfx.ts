// Lightweight SFX layer. Uses WebAudio synthesis so it works with zero assets.
// Howler is installed and can be swapped in by replacing each `play*` body
// with `new Howl({ src: [...] }).play()` once real audio files exist.

let muted = false;
const listeners = new Set<(m: boolean) => void>();
let ctx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const Ctor =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    if (!Ctor) return null;
    ctx = new Ctor();
  }
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

export function isMuted() {
  return muted;
}
export function setMuted(v: boolean) {
  muted = v;
  listeners.forEach((l) => l(v));
}
export function subscribeMuted(cb: (m: boolean) => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

const MASTER = 0.4; // 40% per spec

type ToneOpts = {
  freq: number;
  type?: OscillatorType;
  dur?: number;
  vol?: number;
  slideTo?: number;
  delay?: number;
};

function tone({
  freq,
  type = "sine",
  dur = 0.2,
  vol = 0.5,
  slideTo,
  delay = 0,
}: ToneOpts) {
  if (muted) return;
  const c = getCtx();
  if (!c) return;
  const t0 = c.currentTime + delay;
  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t0);
  if (slideTo) osc.frequency.exponentialRampToValueAtTime(slideTo, t0 + dur);
  gain.gain.setValueAtTime(0, t0);
  gain.gain.linearRampToValueAtTime(vol * MASTER, t0 + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  osc.connect(gain).connect(c.destination);
  osc.start(t0);
  osc.stop(t0 + dur + 0.05);
}

function noise(dur = 0.3, vol = 0.3, filterFreq = 1200) {
  if (muted) return;
  const c = getCtx();
  if (!c) return;
  const t0 = c.currentTime;
  const buf = c.createBuffer(1, c.sampleRate * dur, c.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
  const src = c.createBufferSource();
  src.buffer = buf;
  const filter = c.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.value = filterFreq;
  const gain = c.createGain();
  gain.gain.setValueAtTime(vol * MASTER, t0);
  gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  src.connect(filter).connect(gain).connect(c.destination);
  src.start(t0);
  src.stop(t0 + dur);
}

export const sfx = {
  whoosh: () => noise(0.45, 0.35, 800),
  pop: () => tone({ freq: 480, type: "triangle", dur: 0.12, vol: 0.6, slideTo: 900 }),
  click: () => tone({ freq: 700, type: "square", dur: 0.05, vol: 0.25 }),
  typing: () => tone({ freq: 1800 + Math.random() * 300, type: "square", dur: 0.02, vol: 0.08 }),
  paper: () => noise(0.5, 0.25, 2400),
  blow: () => noise(0.7, 0.4, 600),
  sparkle: () => {
    tone({ freq: 880, type: "sine", dur: 0.18, vol: 0.3 });
    tone({ freq: 1320, type: "sine", dur: 0.22, vol: 0.25, delay: 0.06 });
    tone({ freq: 1760, type: "sine", dur: 0.26, vol: 0.2, delay: 0.12 });
  },
};

// Mic blow detection — returns cleanup. Calls onBlow when sustained loud sound detected.
export async function startMicBlowDetector(
  onBlow: () => void,
  threshold = 0.18,
): Promise<() => void> {
  if (typeof navigator === "undefined" || !navigator.mediaDevices?.getUserMedia) {
    throw new Error("no-mic");
  }
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  const c = getCtx();
  if (!c) {
    stream.getTracks().forEach((t) => t.stop());
    throw new Error("no-audio-ctx");
  }
  const src = c.createMediaStreamSource(stream);
  const analyser = c.createAnalyser();
  analyser.fftSize = 1024;
  src.connect(analyser);
  const data = new Uint8Array(analyser.fftSize);
  let raf = 0;
  let triggered = false;
  let loudFrames = 0;
  const tick = () => {
    analyser.getByteTimeDomainData(data);
    let sum = 0;
    for (let i = 0; i < data.length; i++) {
      const v = (data[i] - 128) / 128;
      sum += v * v;
    }
    const rms = Math.sqrt(sum / data.length);
    if (rms > threshold) loudFrames++;
    else loudFrames = Math.max(0, loudFrames - 1);
    if (loudFrames > 6 && !triggered) {
      triggered = true;
      onBlow();
      cleanup();
      return;
    }
    raf = requestAnimationFrame(tick);
  };
  raf = requestAnimationFrame(tick);
  const cleanup = () => {
    cancelAnimationFrame(raf);
    stream.getTracks().forEach((t) => t.stop());
  };
  return cleanup;
}