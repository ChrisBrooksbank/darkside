// A small generative "mixing desk". Every sound is synthesized live; no samples,
// no recordings, nothing from the album itself.

export type LayerId = "heart" | "clocks" | "cash" | "pulse" | "steps" | "air";

export const layerIds: LayerId[] = ["heart", "clocks", "cash", "pulse", "steps", "air"];

const BEAT_MS = 60000 / 123;

const midi = (n: number) => 440 * Math.pow(2, (n - 69) / 12);

const chords = [
  [52, 55, 59, 62, 66],
  [48, 52, 55, 59, 64],
  [45, 52, 55, 60, 64],
  [50, 57, 62, 66, 71],
];

export class Mixer {
  readonly ctx: AudioContext;
  readonly analyser: AnalyserNode;
  private master: GainNode;
  private layers = {} as Record<LayerId, GainNode>;
  private timers: number[] = [];
  private noise: AudioBuffer;
  running = false;

  constructor() {
    this.ctx = new AudioContext();
    const compressor = this.ctx.createDynamicsCompressor();
    this.master = this.ctx.createGain();
    this.master.gain.value = 0;
    this.analyser = this.ctx.createAnalyser();
    this.analyser.fftSize = 1024;
    this.analyser.smoothingTimeConstant = 0.82;
    this.master.connect(compressor);
    compressor.connect(this.analyser);
    compressor.connect(this.ctx.destination);
    for (const id of layerIds) {
      const gain = this.ctx.createGain();
      gain.gain.value = 0;
      gain.connect(this.master);
      this.layers[id] = gain;
    }
    const length = this.ctx.sampleRate;
    this.noise = this.ctx.createBuffer(1, length, this.ctx.sampleRate);
    const data = this.noise.getChannelData(0);
    for (let i = 0; i < length; i++) data[i] = Math.random() * 2 - 1;
  }

  setLevel(id: LayerId, value: number) {
    this.layers[id].gain.setTargetAtTime(value * value, this.ctx.currentTime, 0.05);
  }

  start() {
    if (this.running) return;
    void this.ctx.resume();
    this.running = true;
    this.master.gain.setTargetAtTime(0.9, this.ctx.currentTime, 0.1);

    this.every(60000 / 68, () => {
      this.thump(0, 1);
      this.thump(0.24, 0.65);
    });

    let tock = 0;
    this.every(500, () => {
      this.burst("clocks", tock % 2 ? 1300 : 1900, 0.035, 0.7);
      this.tone("clocks", tock % 2 ? 620 : 880, 0.05, 0.12, "sine");
      tock++;
    });

    let cash = 0;
    this.every(BEAT_MS, () => {
      const step = cash % 7;
      if (step === 0) {
        this.burst("cash", 6000, 0.18, 0.35, "highpass");
        for (const f of [2093, 3136, 4186]) this.tone("cash", f, 0.9, 0.07, "sine");
      }
      if ([2, 3, 5].includes(step)) {
        const f = [2093, 2637, 3136, 3951][Math.floor(Math.random() * 4)];
        this.tone("cash", f, 0.35, 0.09, "sine");
      }
      cash++;
    });

    const bass = [0, -1, 0, -1, 7, -1, 5];
    let pulse = 0;
    this.every(BEAT_MS, () => {
      const note = bass[pulse % 7];
      if (note >= 0) this.bass(midi(34 + note));
      pulse++;
    });

    let foot = 0;
    this.every(60000 / 150, () => {
      this.burst("steps", 750, 0.06, 0.8, "bandpass", foot % 2 ? 0.7 : -0.7);
      foot++;
    });

    let chord = 0;
    const pad = () => {
      for (const n of chords[chord % chords.length]) this.padNote(midi(n + 12));
      chord++;
    };
    pad();
    this.timers.push(window.setInterval(pad, 8000));
  }

  stop() {
    this.running = false;
    this.timers.forEach((t) => window.clearInterval(t));
    this.timers = [];
    this.master.gain.setTargetAtTime(0, this.ctx.currentTime, 0.1);
  }

  dispose() {
    this.stop();
    void this.ctx.close();
  }

  private every(ms: number, fn: () => void) {
    fn();
    this.timers.push(window.setInterval(fn, ms));
  }

  private env(node: AudioNode, id: LayerId, peak: number, decay: number, attack = 0.005, pan = 0) {
    const at = this.ctx.currentTime;
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0.0001, at);
    g.gain.exponentialRampToValueAtTime(peak, at + attack);
    g.gain.exponentialRampToValueAtTime(0.0001, at + attack + decay);
    node.connect(g);
    if (pan) {
      const p = this.ctx.createStereoPanner();
      p.pan.value = pan;
      g.connect(p).connect(this.layers[id]);
    } else {
      g.connect(this.layers[id]);
    }
  }

  private thump(delay: number, strength: number) {
    const at = this.ctx.currentTime + delay;
    const osc = this.ctx.createOscillator();
    osc.frequency.setValueAtTime(95, at);
    osc.frequency.exponentialRampToValueAtTime(42, at + 0.18);
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0.0001, at);
    g.gain.exponentialRampToValueAtTime(0.9 * strength, at + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, at + 0.3);
    osc.connect(g).connect(this.layers.heart);
    osc.start(at);
    osc.stop(at + 0.35);
  }

  private tone(id: LayerId, freq: number, decay: number, peak: number, type: OscillatorType) {
    const osc = this.ctx.createOscillator();
    osc.type = type;
    osc.frequency.value = freq;
    this.env(osc, id, peak, decay);
    osc.start();
    osc.stop(this.ctx.currentTime + decay + 0.05);
  }

  private burst(
    id: LayerId,
    freq: number,
    decay: number,
    peak: number,
    type: BiquadFilterType = "bandpass",
    pan = 0,
  ) {
    const src = this.ctx.createBufferSource();
    src.buffer = this.noise;
    const filter = this.ctx.createBiquadFilter();
    filter.type = type;
    filter.frequency.value = freq;
    filter.Q.value = 1.2;
    src.connect(filter);
    this.env(filter, id, peak, decay, 0.003, pan);
    src.start(this.ctx.currentTime, Math.random() * 0.5);
    src.stop(this.ctx.currentTime + decay + 0.05);
  }

  private bass(freq: number) {
    const osc = this.ctx.createOscillator();
    osc.type = "sawtooth";
    osc.frequency.value = freq;
    const filter = this.ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 420;
    osc.connect(filter);
    this.env(filter, "pulse", 0.5, 0.32, 0.01);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.4);
  }

  private padNote(freq: number) {
    const at = this.ctx.currentTime;
    const filter = this.ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 1100;
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0.0001, at);
    g.gain.exponentialRampToValueAtTime(0.07, at + 2.2);
    g.gain.exponentialRampToValueAtTime(0.0001, at + 8.5);
    filter.connect(g).connect(this.layers.air);
    for (const detune of [-7, 7]) {
      const osc = this.ctx.createOscillator();
      osc.type = "sawtooth";
      osc.frequency.value = freq;
      osc.detune.value = detune;
      osc.connect(filter);
      osc.start(at);
      osc.stop(at + 8.6);
    }
  }
}
