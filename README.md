# Enter The Prism

[Live site](https://darkside-prism-tribute.netlify.app) | [Planning notes](./PLAN.md)

An interactive tribute to Pink Floyd's *The Dark Side of the Moon*: not a fan wiki, not a playlist wrapper, but a small listening observatory built around pulse, breath, time, money, fracture, and eclipse.

The site treats the album as one continuous orbit. White light enters the prism as ordinary life, then splits into chambers of pressure, motion, grief, satire, empathy, and totality.

## The Vibe

Black space. Moon dust. A distant prism installation. Spectral light behaving like memory. Interface elements that feel closer to a control room than a landing page.

This project is about the feeling of the record: the profound lyrics, the musicianship, the studio craft, the sleeve's visual mythology, and the strange calm that sits inside all that existential pressure.

## What Is Inside

- **The Heartbeat**: a cinematic lunar-prism hero with ambient motion.
- **The Orbit**: ten interactive track chambers, each with its own theme, color, signal, and interpretation.
- **The Studio Room**: tactile production objects for tape, synth, clocks, cash loop, voice, and mix architecture.
- **The Themes**: a constellation of mortality, time, capital, motion, empathy, identity, and totality.
- **The System**: a personnel section that frames musicians, engineers, vocalists, and designers as one atmosphere.
- **The Legacy**: a compact timeline of the album's continuing orbit.

## Live Deployment

Production is deployed on Netlify:

```text
https://darkside-prism-tribute.netlify.app
```

Netlify builds with:

```toml
[build]
  command = "npm run build"
  publish = "dist"
```

## Run Locally

```bash
npm install
npm run dev
```

Build the production bundle:

```bash
npm run build
```

## Stack

- Vite
- React
- TypeScript
- Lucide icons
- Netlify

## Rights And Respect

This is an unofficial tribute concept. It does not include official audio, band logos, or full lyrics. The visual direction is inspired by prism optics and the album's themes without recreating the original sleeve art exactly.

The generated hero image is an original project asset stored in `public/assets/hero-lunar-prism.png`.

