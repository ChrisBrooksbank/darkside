// Tiny Web Audio synth. Everything is generated in the browser; no samples.
let ctx: AudioContext | null = null;

function audio(): AudioContext | null {
  try {
    ctx ??= new AudioContext();
    if (ctx.state === "suspended") void ctx.resume();
    return ctx;
  } catch {
    return null;
  }
}

function envelope(c: AudioContext, node: AudioNode, peak: number, decay: number, at: number) {
  const g = c.createGain();
  g.gain.setValueAtTime(0.0001, at);
  g.gain.exponentialRampToValueAtTime(peak, at + 0.01);
  g.gain.exponentialRampToValueAtTime(0.0001, at + decay);
  node.connect(g).connect(c.destination);
}

export function thump(strength = 1, delay = 0) {
  const c = audio();
  if (!c) return;
  const at = c.currentTime + delay;
  const osc = c.createOscillator();
  osc.type = "sine";
  osc.frequency.setValueAtTime(95, at);
  osc.frequency.exponentialRampToValueAtTime(42, at + 0.18);
  envelope(c, osc, 0.85 * strength, 0.28, at);
  osc.start(at);
  osc.stop(at + 0.32);
}

export function heartbeat() {
  thump(1, 0);
  thump(0.7, 0.24);
}

export function tick(accent: boolean) {
  const c = audio();
  if (!c) return;
  const at = c.currentTime;
  const osc = c.createOscillator();
  osc.type = "triangle";
  osc.frequency.value = accent ? 220 : 520;
  envelope(c, osc, accent ? 0.5 : 0.22, accent ? 0.22 : 0.09, at);
  osc.start(at);
  osc.stop(at + 0.25);
}

export function ching() {
  const c = audio();
  if (!c) return;
  const at = c.currentTime;
  for (const f of [2093, 3136, 4186]) {
    const osc = c.createOscillator();
    osc.type = "sine";
    osc.frequency.value = f;
    envelope(c, osc, 0.1, 0.9, at);
    osc.start(at);
    osc.stop(at + 1);
  }
}
