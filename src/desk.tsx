import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { Dices, Power } from "lucide-react";
import { Mixer, layerIds } from "./mixer";
import type { LayerId } from "./mixer";

type Levels = Record<LayerId, number>;

const channels: { id: LayerId; name: string; color: string; from: string }[] = [
  { id: "heart", name: "Heartbeat", color: "#f45d5d", from: "Speak to Me" },
  { id: "clocks", name: "Clocks", color: "#f6e56d", from: "Time" },
  { id: "cash", name: "Cash loop", color: "#70d66f", from: "Money" },
  { id: "pulse", name: "Seven pulse", color: "#ffb23e", from: "Money" },
  { id: "steps", name: "Footsteps", color: "#7cc7ff", from: "On the Run" },
  { id: "air", name: "Air", color: "#d89cff", from: "Breathe" },
];

const none: Levels = { heart: 0, clocks: 0, cash: 0, pulse: 0, steps: 0, air: 0 };

const presets: { name: string; levels: Levels }[] = [
  { name: "Breathe", levels: { ...none, air: 0.85, heart: 0.35 } },
  { name: "Panic", levels: { ...none, steps: 0.85, pulse: 0.6, heart: 0.7, clocks: 0.35 } },
  { name: "Money machine", levels: { ...none, cash: 0.8, pulse: 0.85, clocks: 0.15 } },
  { name: "Running out of time", levels: { ...none, clocks: 0.85, heart: 0.45, air: 0.5 } },
  { name: "Eclipse", levels: { heart: 0.75, clocks: 0.3, cash: 0.25, pulse: 0.35, steps: 0.2, air: 0.9 } },
];

export function MixingDesk() {
  const [on, setOn] = useState(false);
  const [levels, setLevels] = useState<Levels>(presets[0].levels);
  const mixer = useRef<Mixer | null>(null);
  const canvas = useRef<HTMLCanvasElement | null>(null);
  const levelsRef = useRef(levels);
  levelsRef.current = levels;

  const apply = (next: Levels) => {
    setLevels(next);
    if (mixer.current) layerIds.forEach((id) => mixer.current!.setLevel(id, next[id]));
  };

  const toggle = () => {
    if (on) {
      mixer.current?.stop();
      setOn(false);
      return;
    }
    try {
      mixer.current ??= new Mixer();
    } catch {
      return;
    }
    layerIds.forEach((id) => mixer.current!.setLevel(id, levelsRef.current[id]));
    mixer.current.start();
    setOn(true);
  };

  const randomise = () => {
    const next = { ...none };
    layerIds.forEach((id) => {
      next[id] = Math.random() < 0.35 ? 0 : 0.3 + Math.random() * 0.6;
    });
    apply(next);
  };

  useEffect(() => () => mixer.current?.dispose(), []);

  useEffect(() => {
    const el = canvas.current;
    const ctx = el?.getContext("2d");
    if (!el || !ctx) return;
    const bins = new Uint8Array(512);
    const BARS = 64;
    let frame = 0;
    const draw = () => {
      ctx.clearRect(0, 0, el.width, el.height);
      const active = mixer.current?.running;
      if (active) mixer.current!.analyser.getByteFrequencyData(bins);
      const w = el.width / BARS;
      for (let i = 0; i < BARS; i++) {
        // log-ish spread so the low end, where this album lives, fills the stage
        const bin = Math.floor(Math.pow(i / BARS, 1.8) * 200);
        const v = active ? bins[bin] / 255 : 0.03;
        const h = Math.max(4, v * el.height * 0.95);
        ctx.fillStyle = `hsl(${i * (300 / BARS)} 85% 60%)`;
        ctx.globalAlpha = active ? 0.9 : 0.35;
        ctx.fillRect(i * w + 2, el.height - h, w - 4, h);
      }
      frame = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <section className="section section--desk" id="desk" aria-labelledby="desk-title">
      <div className="section__heading">
        <p className="kicker">The mixing desk</p>
        <h2 id="desk-title">Build your own Dark Side</h2>
        <p className="section__lede">
          The album is a mix of a few ideas layered and balanced: a pulse, time, money, motion,
          air. Bring up the faders and make your own. Everything is synthesized live in your
          browser, so it is a sketch of the album's ingredients, not the album.
        </p>
      </div>
      <div className="desk">
        <canvas ref={canvas} className="desk__scope" width={1000} height={240} aria-hidden="true" />
        <div className="desk__top">
          <button
            type="button"
            className="deskPower"
            aria-pressed={on}
            onClick={toggle}
          >
            <Power aria-hidden="true" /> {on ? "Stop" : "Power on"}
          </button>
          <div className="presets" role="group" aria-label="Presets">
            {presets.map((preset) => (
              <button key={preset.name} type="button" onClick={() => apply(preset.levels)}>
                {preset.name}
              </button>
            ))}
            <button type="button" onClick={randomise}>
              <Dices aria-hidden="true" /> Surprise me
            </button>
          </div>
        </div>
        <div className="faders">
          {channels.map((channel) => (
            <label
              className="fader"
              key={channel.id}
              style={{ "--ch": channel.color, "--lvl": levels[channel.id] } as CSSProperties}
            >
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={levels[channel.id]}
                aria-label={`${channel.name} level`}
                onChange={(event) => apply({ ...levels, [channel.id]: Number(event.target.value) })}
              />
              <strong>{channel.name}</strong>
              <small>from {channel.from}</small>
            </label>
          ))}
        </div>
        {!on && <p className="desk__hint">Press Power on, then move the faders. Headphones help.</p>}
      </div>
    </section>
  );
}
