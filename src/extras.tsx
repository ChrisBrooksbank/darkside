import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { Check, Coins, Heart, Lightbulb, RotateCcw, Shuffle, X } from "lucide-react";
import { ching, heartbeat, tick } from "./audio";
import { funFacts, quiz, stats } from "./content";

export function StatsStrip() {
  return (
    <section className="statsStrip" aria-label="The album in numbers">
      {stats.map((stat) => (
        <div className="stat" key={stat.label}>
          <strong>{stat.value}</strong>
          <span>{stat.label}</span>
          <small>{stat.note}</small>
        </div>
      ))}
    </section>
  );
}

type JourneyTrack = { title: string; color: string; seconds: number; length: string };

export function Journey({
  items,
  active,
  onSelect,
}: {
  items: JourneyTrack[];
  active: number;
  onSelect: (index: number) => void;
}) {
  const total = items.reduce((sum, item) => sum + item.seconds, 0);
  return (
    <div className="journey">
      <div className="journey__bar" role="group" aria-label="Album timeline, each segment sized to the track's length">
        {items.map((item, index) => (
          <button
            key={item.title}
            type="button"
            className={index === active ? "journey__seg isActive" : "journey__seg"}
            style={{ flexGrow: item.seconds, "--seg-color": item.color } as CSSProperties}
            onClick={() => onSelect(index)}
            title={`${item.title} (${item.length})`}
            aria-label={`${index + 1}. ${item.title}, ${item.length}`}
          />
        ))}
      </div>
      <p className="journey__caption">
        {items[active].title} · {items[active].length} · track {active + 1} of {items.length} ·
        album runs about {Math.round(total / 60)} minutes
      </p>
    </div>
  );
}

export function PulseLab() {
  const [beating, setBeating] = useState(false);
  const [bpm, setBpm] = useState(70);
  const [pulse, setPulse] = useState(0);
  const bpmRef = useRef(bpm);
  bpmRef.current = bpm;

  const [money, setMoney] = useState(false);
  const [meter, setMeter] = useState<7 | 4>(7);
  const [step, setStep] = useState(-1);

  useEffect(() => {
    if (!beating) return;
    let timer = 0;
    const loop = () => {
      heartbeat();
      setPulse((value) => value + 1);
      timer = window.setTimeout(loop, 60000 / bpmRef.current);
    };
    loop();
    return () => window.clearTimeout(timer);
  }, [beating]);

  useEffect(() => {
    if (!money) {
      setStep(-1);
      return;
    }
    let current = 0;
    const play = () => {
      tick(current === 0);
      setStep(current);
      current = (current + 1) % meter;
    };
    play();
    const timer = window.setInterval(play, 60000 / 123);
    return () => window.clearInterval(timer);
  }, [money, meter]);

  return (
    <section className="section section--lab" id="lab" aria-labelledby="lab-title">
      <div className="section__heading">
        <p className="kicker">Pulse lab</p>
        <h2 id="lab-title">Hear what the album is made of</h2>
        <p className="section__lede">
          Two sounds do most of the album's work: a heartbeat and a rhythm that won't sit still.
          These are tiny synthesized stand-ins, so there is no official audio here. Turn your
          volume up a little.
        </p>
      </div>
      <div className="labGrid">
        <article className="labCard">
          <h3>The heartbeat</h3>
          <p>
            It opens the album and closes it. Start it, then drag the tempo to see how a simple
            pulse feels calm at one speed and urgent at another.
          </p>
          <div key={pulse} className={beating ? "heart isBeating" : "heart"} aria-hidden="true">
            <Heart />
          </div>
          <div className="labControls">
            <button
              type="button"
              className="labButton"
              aria-pressed={beating}
              onClick={() => setBeating((value) => !value)}
            >
              {beating ? "Stop" : "Start heartbeat"}
            </button>
            <label className="slider">
              <span>{bpm} bpm</span>
              <input
                type="range"
                min={40}
                max={140}
                value={bpm}
                onChange={(event) => setBpm(Number(event.target.value))}
              />
            </label>
          </div>
        </article>

        <article className="labCard">
          <h3>Money in seven</h3>
          <p>
            Most pop is counted in fours. Money is counted in sevens, so the groove keeps tipping
            forward before it can settle. Switch to four to feel the difference.
          </p>
          <div className="beats" aria-hidden="true">
            {Array.from({ length: meter }, (_, index) => (
              <i
                key={`${meter}-${index}`}
                className={[index === 0 ? "isDown" : "", index === step ? "isOn" : ""].join(" ")}
              >
                {index + 1}
              </i>
            ))}
          </div>
          <div className="labControls">
            <button
              type="button"
              className="labButton"
              aria-pressed={money}
              onClick={() => setMoney((value) => !value)}
            >
              {money ? "Stop" : "Play the pulse"}
            </button>
            <div className="segmented" role="group" aria-label="Time signature">
              {([7, 4] as const).map((value) => (
                <button
                  key={value}
                  type="button"
                  aria-pressed={meter === value}
                  onClick={() => setMeter(value)}
                >
                  {value}/4
                </button>
              ))}
            </div>
            <button type="button" className="labButton labButton--ghost" onClick={ching}>
              <Coins aria-hidden="true" /> Ka-ching
            </button>
          </div>
        </article>
      </div>
    </section>
  );
}

const rainbow = ["#e0342f", "#f58a26", "#f6e043", "#3ebc54", "#2f7de0", "#8b47d6"];

export function Sleeve() {
  return (
    <section className="section section--sleeve" id="sleeve" aria-labelledby="sleeve-title">
      <div className="section__heading">
        <p className="kicker">The sleeve</p>
        <h2 id="sleeve-title">The most famous triangle in rock</h2>
      </div>
      <div className="sleeveLayout">
        <svg
          className="sleeveArt"
          viewBox="0 0 320 200"
          role="img"
          aria-label="A white beam enters a prism and fans out into six colours."
        >
          <rect width="320" height="200" rx="8" fill="#0b0b0e" />
          <line x1="0" y1="112" x2="120" y2="104" stroke="#fff" strokeWidth="3" />
          <polygon
            points="160,48 110,140 210,140"
            fill="rgba(255,255,255,0.07)"
            stroke="#fff"
            strokeOpacity="0.8"
            strokeWidth="2"
          />
          {rainbow.map((color, index) => (
            <line
              key={color}
              x1="196"
              y1="108"
              x2="320"
              y2={70 + index * 15}
              stroke={color}
              strokeWidth="5"
              strokeLinecap="round"
              opacity="0.92"
            />
          ))}
        </svg>
        <div className="sleeveCopy">
          <p>
            The design came from Hipgnosis, the London studio run by Storm Thorgerson and Aubrey
            Powell, with illustration by George Hardie. The band wanted something cleaner and
            bolder than their earlier covers.
          </p>
          <ul>
            <li>It carries no title and no band name on the front, only the prism and the beam.</li>
            <li>The rainbow on the sleeve has six colours. Indigo is skipped.</li>
            <li>A pulse line runs across the gatefold, tying the art back to the heartbeat.</li>
            <li>Original vinyl copies shipped with posters and stickers inside.</li>
          </ul>
          <p className="sleeveCopy__note">
            This drawing is an original sketch of the idea, not a copy of the cover.
          </p>
        </div>
      </div>
    </section>
  );
}

export function FunFacts() {
  const [index, setIndex] = useState(0);
  const fact = funFacts[index];
  const shuffle = () => {
    setIndex((current) => {
      let next = current;
      while (next === current) next = Math.floor(Math.random() * funFacts.length);
      return next;
    });
  };
  return (
    <section className="section section--facts" id="facts" aria-labelledby="facts-title">
      <div className="section__heading">
        <p className="kicker">Strange but true</p>
        <h2 id="facts-title">Things you can tell people at parties</h2>
      </div>
      <article className="factCard" aria-live="polite">
        <Lightbulb aria-hidden="true" />
        <p className="factCard__count">
          {index + 1} / {funFacts.length}
        </p>
        <h3>{fact.title}</h3>
        <p>{fact.body}</p>
        <button type="button" className="labButton" onClick={shuffle}>
          <Shuffle aria-hidden="true" /> Another one
        </button>
      </article>
    </section>
  );
}

export function Quiz() {
  const [current, setCurrent] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const finished = current >= quiz.length;
  const question = quiz[Math.min(current, quiz.length - 1)];

  const choose = (option: number) => {
    if (picked !== null) return;
    setPicked(option);
    if (option === question.answer) setScore((value) => value + 1);
  };
  const next = () => {
    setPicked(null);
    setCurrent((value) => value + 1);
  };
  const reset = () => {
    setPicked(null);
    setCurrent(0);
    setScore(0);
  };
  const verdict =
    score === quiz.length
      ? "Perfect. You're on the dark side of the moon."
      : score >= quiz.length - 2
        ? "Nicely done. You've clearly been listening."
        : "Time to put the record on again.";

  return (
    <section className="section section--quiz" id="quiz" aria-labelledby="quiz-title">
      <div className="section__heading">
        <p className="kicker">Test your ears</p>
        <h2 id="quiz-title">Six questions, no lyrics needed</h2>
      </div>
      <div className="quizCard">
        {finished ? (
          <div className="quizResult">
            <p className="quizResult__score">
              {score} / {quiz.length}
            </p>
            <p>{verdict}</p>
            <button type="button" className="labButton" onClick={reset}>
              <RotateCcw aria-hidden="true" /> Play again
            </button>
          </div>
        ) : (
          <>
            <p className="quizCard__count">
              Question {current + 1} of {quiz.length}
            </p>
            <h3>{question.q}</h3>
            <div className="quizOptions">
              {question.options.map((option, index) => {
                const state =
                  picked === null
                    ? ""
                    : index === question.answer
                      ? "isRight"
                      : index === picked
                        ? "isWrong"
                        : "isDim";
                return (
                  <button
                    key={option}
                    type="button"
                    className={`quizOption ${state}`}
                    onClick={() => choose(index)}
                    disabled={picked !== null}
                  >
                    <span>{option}</span>
                    {state === "isRight" && <Check aria-hidden="true" />}
                    {state === "isWrong" && <X aria-hidden="true" />}
                  </button>
                );
              })}
            </div>
            {picked !== null && (
              <div className="quizWhy" aria-live="polite">
                <p>{question.why}</p>
                <button type="button" className="labButton" onClick={next}>
                  {current === quiz.length - 1 ? "See result" : "Next question"}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
