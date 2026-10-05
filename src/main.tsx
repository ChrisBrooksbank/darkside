import { StrictMode, useRef, useState } from "react";
import type { CSSProperties, KeyboardEvent, ReactNode } from "react";
import { createRoot } from "react-dom/client";
import {
  AudioLines,
  CircleDot,
  Disc3,
  FastForward,
  Gauge,
  HandCoins,
  Headphones,
  Moon,
  Pause,
  Play,
  Radio,
  Sparkles,
  Timer,
  Waves,
} from "lucide-react";
import "./styles.css";

type Track = {
  title: string;
  theme: string;
  color: string;
  accent: string;
  signal: string;
  note: string;
};

type StudioObject = {
  title: string;
  icon: ReactNode;
  note: string;
};

const tracks: Track[] = [
  {
    title: "Speak to Me",
    theme: "pulse",
    color: "#f45d5d",
    accent: "Fragments gather before the record fully opens its eye.",
    signal: "heartbeat / voices / pressure",
    note: "A collage of motifs primes the whole journey: machinery, laughter, money, fear, and breath.",
  },
  {
    title: "Breathe",
    theme: "air",
    color: "#7cc7ff",
    accent: "The first release of oxygen after the opening pressure.",
    signal: "slide guitar / drifting organ",
    note: "Gilmour's vocal and Wright's harmonic bed make resignation feel weightless.",
  },
  {
    title: "On the Run",
    theme: "flight",
    color: "#ffb23e",
    accent: "A machine panic attack with boarding lights flashing in the dark.",
    signal: "sequencer / airport anxiety",
    note: "The EMS Synthi becomes a nervous system, turning travel into velocity and dread.",
  },
  {
    title: "Time",
    theme: "age",
    color: "#f6e56d",
    accent: "Clockwork as a moral shock: one day you notice the years moved first.",
    signal: "clocks / toms / guitar solo",
    note: "Mason's entrance turns alarm into body; the track lands like a remembered deadline.",
  },
  {
    title: "The Great Gig in the Sky",
    theme: "release",
    color: "#d89cff",
    accent: "A wordless ascent through grief, terror, and surrender.",
    signal: "voice / piano / space",
    note: "Clare Torry's performance gives mortality a human voltage that words could flatten.",
  },
  {
    title: "Money",
    theme: "greed",
    color: "#70d66f",
    accent: "Satire in seven-beat machinery, all appetite and chrome.",
    signal: "cash loop / bass / sax",
    note: "Waters' riff and the register loop make capitalism sound catchy, funny, and ugly.",
  },
  {
    title: "Us and Them",
    theme: "distance",
    color: "#8aa8ff",
    accent: "A slow pan across conflict, class, and the ache of separation.",
    signal: "saxophone / choir / dynamics",
    note: "The song expands and collapses like a lens, moving between intimacy and battlefield scale.",
  },
  {
    title: "Any Colour You Like",
    theme: "spectrum",
    color: "#19d6c3",
    accent: "The prism loosens: no thesis, just electricity deciding where to go.",
    signal: "synth / guitar / improvisation",
    note: "A band-as-instrument moment where color becomes groove, not decoration.",
  },
  {
    title: "Brain Damage",
    theme: "fracture",
    color: "#ff7aa8",
    accent: "The moon turns inward, and the pressure finally speaks in first person.",
    signal: "choir / acoustic guitar / rupture",
    note: "Its tenderness keeps the subject from becoming spectacle; the fracture remains human.",
  },
  {
    title: "Eclipse",
    theme: "totality",
    color: "#ffffff",
    accent: "Everything under the sun aligns, then vanishes behind the moon.",
    signal: "crescendo / heartbeat / closure",
    note: "The ending feels both universal and tiny: a complete orbit returning to a pulse.",
  },
];

const studioObjects: StudioObject[] = [
  {
    title: "Tape Machine",
    icon: <Disc3 aria-hidden="true" />,
    note: "The record's transitions feel physical because the edits behave like tape, not tabs.",
  },
  {
    title: "EMS Synth",
    icon: <Gauge aria-hidden="true" />,
    note: "Sequenced electronics turn anxiety into motion, especially in the album's travel passages.",
  },
  {
    title: "Clock Cluster",
    icon: <Timer aria-hidden="true" />,
    note: "The alarms are theatrical, but the emotional hit comes from the drums that answer them.",
  },
  {
    title: "Cash Loop",
    icon: <HandCoins aria-hidden="true" />,
    note: "A found-sound groove makes the joke land before the critique arrives.",
  },
  {
    title: "Vocal Mic",
    icon: <AudioLines aria-hidden="true" />,
    note: "Voices throughout the record blur confession, interview, performance, and haunting.",
  },
  {
    title: "Mix Desk",
    icon: <Radio aria-hidden="true" />,
    note: "The engineering turns separate songs into one long change of pressure.",
  },
];

const people = [
  "Roger Waters / concept, words, bass, gravity",
  "David Gilmour / voice, guitar, air, fire",
  "Richard Wright / harmony, keys, dusk, release",
  "Nick Mason / pulse, impact, patience, machinery",
  "Clare Torry / wordless ascent",
  "Alan Parsons / engineering architecture",
  "Hipgnosis + George Hardie / image as instant myth",
];

const legacy = [
  ["1972", "The suite takes shape live before the studio version hardens into orbit."],
  ["1973", "The album is released and quickly becomes a shared cultural object."],
  ["1970s", "The sleeve's prism becomes one of rock's most durable visual symbols."],
  ["Surround", "Quadraphonic and later surround mixes underline the record's spatial imagination."],
  ["50th", "Anniversary editions, screenings, and visual tributes renew the planetarium scale."],
  ["Now", "The album remains a rite of passage because its fears still sound current."],
];

function App() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const selected = tracks[active];

  return (
    <main style={{ "--track-color": selected.color } as CSSProperties}>
      <Hero playing={playing} setPlaying={setPlaying} />
      <TrackOrbit active={active} setActive={setActive} selected={selected} />
      <StudioRoom />
      <ThemeConstellation activeTrack={selected} />
      <PeopleSystem />
      <Legacy />
    </main>
  );
}

function Hero({
  playing,
  setPlaying,
}: {
  playing: boolean;
  setPlaying: (value: boolean) => void;
}) {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <img
        className="hero__image"
        src="/assets/hero-lunar-prism.png"
        alt="A dark lunar horizon with a distant glass prism refracting spectral light."
      />
      <div className="hero__shade" />
      <PrismField playing={playing} />
      <nav className="topbar" aria-label="Primary">
        <a href="#orbit">Orbit</a>
        <a href="#studio">Studio</a>
        <a href="#themes">Themes</a>
        <a href="#legacy">Legacy</a>
      </nav>
      <div className="hero__content">
        <p className="kicker">An interactive tribute</p>
        <h1 id="hero-title">The Dark Side of the Moon</h1>
        <p className="hero__copy">
          Ten tracks as one orbit: breath, clocks, money, conflict, fracture, and eclipse.
        </p>
        <div className="hero__actions">
          <button
            className="iconButton iconButton--primary"
            type="button"
            onClick={() => setPlaying(!playing)}
            aria-label={playing ? "Pause ambient motion" : "Play ambient motion"}
            title={playing ? "Pause ambient motion" : "Play ambient motion"}
          >
            {playing ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}
          </button>
          <a className="textLink" href="#orbit">
            Enter the prism
          </a>
        </div>
      </div>
      <div className="hero__footer">
        <span>heartbeat</span>
        <span>prism</span>
        <span>eclipse</span>
      </div>
    </section>
  );
}

function PrismField({ playing }: { playing: boolean }) {
  return (
    <div className={playing ? "prismField isPlaying" : "prismField"} aria-hidden="true">
      <span className="beam beam--white" />
      <span className="beam beam--red" />
      <span className="beam beam--yellow" />
      <span className="beam beam--green" />
      <span className="beam beam--blue" />
      <span className="moonArc" />
    </div>
  );
}

function TrackOrbit({
  active,
  setActive,
  selected,
}: {
  active: number;
  setActive: (value: number) => void;
  selected: Track;
}) {
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const last = tracks.length - 1;
    const keyMap: Record<string, number> = {
      ArrowDown: active === last ? 0 : active + 1,
      ArrowRight: active === last ? 0 : active + 1,
      ArrowUp: active === 0 ? last : active - 1,
      ArrowLeft: active === 0 ? last : active - 1,
      Home: 0,
      End: last,
    };
    const next = keyMap[event.key];
    if (next === undefined) return;
    event.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <section className="section section--orbit" id="orbit" aria-labelledby="orbit-title">
      <div className="section__heading">
        <p className="kicker">The orbit</p>
        <h2 id="orbit-title">One continuous pressure change</h2>
      </div>
      <div className="orbitLayout">
        <div
          className="trackDial"
          role="tablist"
          aria-label="Album tracks"
          aria-orientation="vertical"
          onKeyDown={handleKeyDown}
        >
          {tracks.map((track, index) => (
            <button
              key={track.title}
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
              id={`track-tab-${index}`}
              className={index === active ? "trackNode isActive" : "trackNode"}
              type="button"
              role="tab"
              aria-selected={index === active}
              aria-controls="track-chamber"
              tabIndex={index === active ? 0 : -1}
              onClick={() => setActive(index)}
              style={{ "--node-color": track.color } as CSSProperties}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{track.title}</strong>
            </button>
          ))}
        </div>
        <article
          className="chamber"
          id="track-chamber"
          role="tabpanel"
          aria-labelledby={`track-tab-${active}`}
        >
          <div className="chamber__visual">
            <Waveform color={selected.color} active={active} />
            <div className="chamber__moon">
              <Moon aria-hidden="true" />
            </div>
          </div>
          <div className="chamber__copy">
            <p className="kicker">{selected.theme}</p>
            <h3>{selected.title}</h3>
            <p className="chamber__accent">{selected.accent}</p>
            <p>{selected.note}</p>
            <div className="signal">
              <Headphones aria-hidden="true" />
              <span>{selected.signal}</span>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}

function Waveform({ color, active }: { color: string; active: number }) {
  const bars = Array.from({ length: 28 }, (_, index) => {
    const wave = 38 + Math.abs(Math.sin((index + active) * 0.65)) * 76;
    return <i key={index} style={{ height: `${wave}px`, background: color, color }} />;
  });

  return <div className="waveform">{bars}</div>;
}

function StudioRoom() {
  return (
    <section className="section section--studio" id="studio" aria-labelledby="studio-title">
      <div className="section__heading">
        <p className="kicker">The studio room</p>
        <h2 id="studio-title">Sound as architecture</h2>
      </div>
      <div className="studioGrid">
        {studioObjects.map((object) => (
          <article className="studioObject" key={object.title}>
            <div className="studioObject__icon">{object.icon}</div>
            <h3>{object.title}</h3>
            <p>{object.note}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function ThemeConstellation({ activeTrack }: { activeTrack: Track }) {
  const themes = [
    "Mortality",
    "Time",
    "Capital",
    "Motion",
    "Empathy",
    "Identity",
    "Totality",
  ];

  return (
    <section className="section section--themes" id="themes" aria-labelledby="themes-title">
      <div className="section__heading">
        <p className="kicker">The themes</p>
        <h2 id="themes-title">Human scale, cosmic frame</h2>
      </div>
      <div className="constellation">
        <div className="constellation__center">
          <Sparkles aria-hidden="true" />
          <strong>{activeTrack.theme}</strong>
          <span>{activeTrack.title}</span>
        </div>
        {themes.map((theme, index) => (
          <span
            key={theme}
            className="themeNode"
            style={{ "--theme-index": index } as CSSProperties}
          >
            {theme}
          </span>
        ))}
      </div>
    </section>
  );
}

function PeopleSystem() {
  return (
    <section className="section section--people" aria-labelledby="people-title">
      <div className="section__heading">
        <p className="kicker">The system</p>
        <h2 id="people-title">Many hands, one atmosphere</h2>
      </div>
      <div className="peopleGrid">
        {people.map((person) => (
          <article className="personCard" key={person}>
            <CircleDot aria-hidden="true" />
            <p>{person}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Legacy() {
  return (
    <section className="section section--legacy" id="legacy" aria-labelledby="legacy-title">
      <div className="section__heading">
        <p className="kicker">Legacy</p>
        <h2 id="legacy-title">The orbit keeps returning</h2>
      </div>
      <div className="timeline">
        {legacy.map(([year, event]) => (
          <article className="timelineItem" key={year}>
            <time>{year}</time>
            <p>{event}</p>
          </article>
        ))}
      </div>
      <footer className="siteFooter">
        <FastForward aria-hidden="true" />
        <span>Tribute concept. No lyrics or official audio included.</span>
        <Waves aria-hidden="true" />
      </footer>
    </section>
  );
}

export default App;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
