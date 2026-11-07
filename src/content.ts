// Factual content for the learning side of the site. No lyrics, no official audio.

export type TrackDetail = {
  length: string;
  seconds: number;
  writers: string;
  facts: string[];
  listenFor: string;
};

// Same order as the `tracks` array in main.tsx.
export const trackDetails: TrackDetail[] = [
  {
    length: "1:07",
    seconds: 67,
    writers: "Nick Mason",
    facts: [
      "The spoken voices were Abbey Road staff and the band's circle, each asked the same cue-card questions about things like madness and death.",
      "The heartbeat is built from a processed bass drum, and it returns to close the album, so the record loops.",
      "The scream at the end is borrowed from Clare Torry's performance on a later track.",
    ],
    listenFor: "Sounds you haven't met yet: clocks, a cash register, laughter. This is a trailer for the whole album.",
  },
  {
    length: "2:43",
    seconds: 163,
    writers: "Waters, Gilmour, Wright",
    facts: [
      "It's the first track with a vocal, and it sets the album's tone: life is short, so keep moving.",
      "Gilmour plays pedal steel here, which gives the song its floating, horizon-wide sound.",
      "A quieter reprise returns after Time, like the same thought a few hours older.",
    ],
    listenFor: "Wright's electric piano chords sliding underneath the vocal like a tide.",
  },
  {
    length: "3:45",
    seconds: 225,
    writers: "Gilmour, Waters",
    facts: [
      "It was built on an EMS Synthi AKS, a suitcase synthesizer with a built-in step sequencer.",
      "On stage it began life as 'The Travel Sequence', a more guitar-driven piece.",
      "Footsteps race across the stereo field, then a crash and fireball close it out.",
    ],
    listenFor: "The footsteps. Headphones make them run from one ear to the other.",
  },
  {
    length: "6:53",
    seconds: 413,
    writers: "Mason, Waters, Wright, Gilmour",
    facts: [
      "The opening clocks were recorded by engineer Alan Parsons in an antiques shop, one clock at a time, then layered. He'd first done it as a quadraphonic demo.",
      "It's the only song on the album with all four band members credited as writers.",
      "Mason's tuned rototoms answer the alarm bells, which is why the intro hits like a heartbeat in a hallway.",
    ],
    listenFor: "The moment the clocks stop and the toms walk in. It's the most dramatic entrance on the record.",
  },
  {
    length: "4:44",
    seconds: 284,
    writers: "Wright, Torry",
    facts: [
      "Wright wrote the chords as 'The Mortality Sequence'. It had no singer until session vocalist Clare Torry was invited in.",
      "Torry improvised wordlessly in a couple of takes. The reported session fee was £30.",
      "She sued in 2004 and settled in 2005. She is now credited as co-writer.",
    ],
    listenFor: "How she starts like a whisper and pushes the whole track toward breaking.",
  },
  {
    length: "6:23",
    seconds: 383,
    writers: "Roger Waters",
    facts: [
      "It's in 7/4: seven beats a bar, which is why it feels pleasantly off-balance. The guitar solo flips into plain 4/4.",
      "The cash-register intro is a hand-spliced tape loop of coins, registers and tearing paper.",
      "Dick Parry's saxophone solo and Gilmour's guitar solo carry the song through its gear changes.",
      "It reached No. 13 on the US Billboard Hot 100 and became the band's first US Top 20 single.",
    ],
    listenFor: "Count it out: 1-2-3-4-5-6-7. Then try the Pulse Lab above.",
  },
  {
    length: "7:49",
    seconds: 469,
    writers: "Wright, Waters",
    facts: [
      "Wright's piano theme began as 'The Violent Sequence', written for Antonioni's film Zabriskie Point. It was rejected.",
      "Parry's saxophone slides between hush and a full roar, giving the song the shape of a breath.",
      "The words are about the distance between people, from the street to the battlefield.",
    ],
    listenFor: "The dynamic swings: it drops to a whisper, then the choir and sax erupt.",
  },
  {
    length: "3:25",
    seconds: 205,
    writers: "Gilmour, Mason, Wright",
    facts: [
      "It's an instrumental credited to Gilmour, Mason and Wright, with no Waters credit.",
      "Guitar and synth lines chase each other over a loose, funky groove.",
      "It's the album's only real exhale between the big statements.",
    ],
    listenFor: "The synth and guitar answering each other. It sounds like a conversation without words.",
  },
  {
    length: "3:50",
    seconds: 230,
    writers: "Roger Waters",
    facts: [
      "It is widely read as a tribute to Syd Barrett, the band's original frontman, who left in 1968.",
      "Waters sings lead. The manic laughter threaded through the track is a deliberate unsettling effect.",
      "Its tenderness is the point: the fracture it describes is human, not spectacle.",
    ],
    listenFor: "The warm acoustic guitar under a deeply uneasy lyric.",
  },
  {
    length: "2:03",
    seconds: 123,
    writers: "Roger Waters",
    facts: [
      "The vocal is a single long list of everything alive, then one flat sentence that cancels it.",
      "The last spoken line belongs to Gerry O'Driscoll, Abbey Road's doorman.",
      "After the final words, the heartbeat from Speak to Me returns and fades. The loop is closed.",
    ],
    listenFor: "The heartbeat in the last seconds. Play the album on repeat and it never stops.",
  },
];

export const stats = [
  { value: "1973", label: "released", note: "1 March in the US, 16 March in the UK" },
  { value: "≈43 min", label: "one unbroken suite", note: "tracks run into each other with no gaps" },
  { value: "741", label: "weeks on the Billboard 200", note: "consecutive weeks, 1973 to 1988" },
  { value: "45M+", label: "copies sold", note: "one of the best-selling albums ever" },
];

export type FunFact = { title: string; body: string };

export const funFacts: FunFact[] = [
  {
    title: "The Wizard of Oz coincidence",
    body: "Fans claim the album syncs eerily with The Wizard of Oz if you start it on the third MGM lion roar. The band says it's chance. Try it and judge for yourself.",
  },
  {
    title: "A cover with no words",
    body: "The sleeve shows no band name and no album title. Just a prism and a beam, and it became one of the most recognisable images in music.",
  },
  {
    title: "A name clash",
    body: "A band called Medicine Head released an album called Dark Side of the Moon in 1972. Floyd briefly renamed theirs Eclipse, then took the title back after the other record flopped.",
  },
  {
    title: "A very young engineer",
    body: "Alan Parsons was in his early twenties when he engineered the album at Abbey Road. He went on to front the Alan Parsons Project.",
  },
  {
    title: "The album that loops",
    body: "It opens on a heartbeat and closes on a heartbeat. Put it on repeat and you hear no seam, just a continuous pulse.",
  },
  {
    title: "Road-tested before recording",
    body: "The band performed the suite live through 1972, before the album was recorded. It was reshaped night after night in front of crowds.",
  },
  {
    title: "Strangers answering questions",
    body: "Roger Waters wrote questions on cards and asked people around Abbey Road to answer them in front of a microphone. Their answers became the album's ghostly voices.",
  },
  {
    title: "A heartbeat you can feel",
    body: "The album opens and closes on a heartbeat. Try it in the Pulse Lab, drag the tempo, and see how fast a simple thump starts to feel alive or alarming.",
  },
];

export type QuizQuestion = { q: string; options: string[]; answer: number; why: string };

export const quiz: QuizQuestion[] = [
  {
    q: "What time signature is the main riff of Money in?",
    options: ["4/4", "7/4", "3/4", "5/4"],
    answer: 1,
    why: "Seven beats per bar. The solo then switches into regular 4/4.",
  },
  {
    q: "Where were the sounds that open Time recorded?",
    options: ["A cathedral", "An antiques shop", "A clock factory", "A railway station"],
    answer: 1,
    why: "Alan Parsons recorded many clocks one at a time in an antiques shop and layered them.",
  },
  {
    q: "Which singer improvised the wordless vocal on The Great Gig in the Sky?",
    options: ["Clare Torry", "Dusty Springfield", "Linda McCartney", "Kate Bush"],
    answer: 0,
    why: "Clare Torry. She sued in 2004, settled in 2005, and is now credited as co-writer.",
  },
  {
    q: "Which song's melody started as music for the film Zabriskie Point?",
    options: ["Breathe", "On the Run", "Us and Them", "Eclipse"],
    answer: 2,
    why: "Wright's theme was written as 'The Violent Sequence' for Antonioni's film, which didn't use it.",
  },
  {
    q: "What synthesizer powers On the Run?",
    options: ["Moog Modular", "Minimoog", "Mellotron", "EMS Synthi AKS"],
    answer: 3,
    why: "Its built-in sequencer makes the album's famous running pulse.",
  },
  {
    q: "What sound both opens and closes the album?",
    options: ["A cash register", "A heartbeat", "A choir", "A church bell"],
    answer: 1,
    why: "The heartbeat bookends the album, so it loops without a seam.",
  },
];

export const timeline: [string, string][] = [
  ["Jan 1972", "The band premieres the suite live at Brighton Dome, billed as 'A Piece for Assorted Lunatics'."],
  ["1972", "They tour the work for months before recording, rewriting it as they go."],
  ["May 1972 – Jan 1973", "Studio sessions at Abbey Road, with Alan Parsons engineering."],
  ["Mar 1973", "Released: 1 March in the US, 16 March in the UK."],
  ["Apr 1973", "Reaches No. 1 on the US Billboard 200."],
  ["1973 – 1988", "741 consecutive weeks on the Billboard 200. For 15 years it never left."],
  ["2003", "A 30th-anniversary surround-sound edition arrives with a 5.1 mix by Parsons."],
  ["2023", "50th-anniversary reissue; Waters also releases a reimagined version, The Dark Side of the Moon Redux."],
];
