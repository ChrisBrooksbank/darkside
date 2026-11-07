import { useState } from "react";

const movements = [
  {
    name: "The alarm",
    text: "A wall of clocks and chimes. Parsons recorded them one at a time in an antiques shop, so the intro is really a collage of separate rooms of time going off at once.",
  },
  {
    name: "The toms",
    text: "Mason's tuned rototoms walk in under the last chime. The alarm becomes a heartbeat you can dance to, and the song starts moving.",
  },
  {
    name: "The long wait",
    text: "A slow, patient groove, with a bass and guitar figure that never hurries. Notice how little actually happens: that stillness is the idea. A day can feel like nothing until it is gone.",
  },
  {
    name: "The solo",
    text: "Gilmour's guitar solo is the emotional release, built from long bent notes that hang in the air and refuse to resolve quickly.",
  },
  {
    name: "The reprise",
    text: "The song folds back into a quieter return of Breathe. The thought that started the album comes round again, a little older.",
  },
];

const themes = [
  ["Ageing", "The song's central shock: one day you notice the years went ahead without you."],
  ["Procrastination", "Time passes in small, comfortable delays. The danger is how pleasant they feel."],
  ["Routine", "Ten years of days that blur together, with nothing marking them apart."],
  ["Urgency", "The alarms say now. The groove says there's still time. The song holds both."],
  ["Mortality", "The same fear that runs through the whole album, here in its most everyday form."],
];

export function TimeDive() {
  const [step, setStep] = useState(0);
  const [theme, setTheme] = useState(0);
  const move = movements[step];

  return (
    <section className="section section--time" id="time" aria-labelledby="time-title">
      <div className="section__heading">
        <p className="kicker">Deep dive</p>
        <h2 id="time-title">Time, movement by movement</h2>
        <p className="section__lede">
          It is the album's most quoted song, and one of its most carefully built. Step through it
          and then pull on the ideas it opens up.
        </p>
      </div>
      <div className="timeDive">
        <div className="timeDive__steps" role="tablist" aria-label="Movements of Time">
          {movements.map((m, index) => (
            <button
              key={m.name}
              type="button"
              role="tab"
              aria-selected={index === step}
              className={index === step ? "isActive" : ""}
              onClick={() => setStep(index)}
            >
              <span>{index + 1}</span> {m.name}
            </button>
          ))}
        </div>
        <article className="timeDive__panel" role="tabpanel">
          <h3>{move.name}</h3>
          <p>{move.text}</p>
        </article>
        <div className="timeDive__themes">
          <p className="timeDive__label">Ideas inside the song</p>
          <div className="chips" role="group" aria-label="Themes in Time">
            {themes.map(([name], index) => (
              <button
                key={name}
                type="button"
                aria-pressed={index === theme}
                onClick={() => setTheme(index)}
              >
                {name}
              </button>
            ))}
          </div>
          <p className="timeDive__theme" aria-live="polite">
            {themes[theme][1]}
          </p>
        </div>
      </div>
    </section>
  );
}
