# Dark Side Of The Moon Tribute Site Plan

## Vision

Build an interactive tribute to Pink Floyd's *The Dark Side of the Moon* that feels like entering a listening observatory. The site should not behave like a fan wiki or a marketing page. It should feel like the album's inner weather: heartbeat, breath, money, time, pressure, empathy, madness, and eclipse.

The guiding metaphor is a prism. White light enters as ordinary life, then splits into the album's themes as the visitor scrolls, listens, and explores.

## Inspiration Notes

- Pink Floyd's official album presence treats the record as a complete conceptual journey rather than a loose collection of songs.
- The *KID A MNESIA* experience is a useful reference for treating music as a navigable audiovisual installation.
- Anniversary microsites and interactive studio pages show how production stories can become tactile, object-based interfaces.
- Planetarium screenings reinforce that this album works as a dome-scale, cosmic experience.

## Creative Principles

- Lead with atmosphere, not exposition.
- Make the visitor feel the album's structure before asking them to read about it.
- Use visual rhythm: pulse, orbit, refraction, oscillation, and eclipse.
- Keep copy interpretive and concise.
- Avoid publishing full lyrics unless licensed. Use themes, analysis, track titles, and production context instead.
- Avoid recreating the original cover exactly. Use an original lunar-prism visual language.

## Information Architecture

### 1. The Heartbeat

The first viewport opens on a dark lunar horizon with a spectral prism installation. A low pulse and drifting light introduce the album as an experience of pressure, time, and human fragility.

Key elements:
- Large album title.
- Minimal supporting copy.
- Ambient prism canvas.
- A listening-state control that changes motion intensity.

### 2. The Orbit

An interactive track map presents the album as one continuous orbit. Selecting a track changes the mood, theme copy, accent color, and chamber artwork.

Track chambers:
- "Speak to Me" - fragments, pulse, anticipation.
- "Breathe" - calm, air, surrender.
- "On the Run" - travel anxiety, machines, acceleration.
- "Time" - aging, repetition, memory.
- "The Great Gig in the Sky" - grief, release, wordless emotion.
- "Money" - satire, appetite, mechanical groove.
- "Us and Them" - distance, conflict, empathy.
- "Any Colour You Like" - spectrum, improvisation, open color.
- "Brain Damage" - fracture, identity, pressure.
- "Eclipse" - convergence, final totality.

### 3. The Studio Room

A tactile Abbey Road-inspired control room section. Visitors inspect key objects that shaped the record's sound.

Objects:
- Tape machine.
- EMS-style synth.
- Clock cluster.
- Cash register loop.
- Vocal microphone.
- Mixing desk.

Each object reveals a short note about the musical or production idea rather than a long technical essay.

### 4. The Musicians

Profiles of Roger Waters, David Gilmour, Richard Wright, Nick Mason, Clare Torry, Alan Parsons, Hipgnosis, and George Hardie. Present them as contributors to one system: concept, lyric, tone, pulse, engineering, voice, and visual identity.

### 5. The Themes

A constellation-style section connecting the album's recurring ideas:
- Mortality.
- Time.
- Capitalism.
- Mental strain.
- Motion and modern anxiety.
- Empathy.
- Cosmic scale versus ordinary life.

### 6. The Legacy

A concise timeline covering live development, the 1973 release, engineering legacy, sleeve design, chart life, surround mixes, 50th anniversary activity, and continued tribute culture.

## Visual Direction

- Dominant background: black as space, not flat UI.
- Palette: bone white, moon gray, spectral red/yellow/green/cyan/blue, small flashes of magenta.
- Typography: modern grotesk for interface and headings, restrained serif only for reflective text if needed.
- Layout: cinematic full-width bands, dense enough to feel like an instrument panel, never like a generic landing page.
- Motion: slow drift, pulse, orbit, refraction, waveform shimmer.

## Interaction Ideas

- Scroll-reactive prism field.
- Track selection changes color, copy, visual chamber, and waveform.
- Studio hotspots with icon buttons and short notes.
- Theme constellation nodes that highlight their connected tracks.
- Eclipse control that darkens or reveals the spectrum.
- Reduced-motion support through CSS media queries.

## Technical Plan

- Use Vite, React, and TypeScript.
- Keep the core experience client-side and deployable as static assets.
- Use a generated bitmap hero asset saved in `public/assets/`.
- Use canvas for the moving prism/starfield layer.
- Use CSS custom properties for track-driven color changes.
- Use semantic HTML, accessible buttons, and responsive layouts.
- Avoid external audio unless a licensed source is added later.

## Delivery Goals

- A polished local site with a real first-screen experience.
- A Markdown plan preserved in the repository.
- A clean git history with an initial commit.
- A GitHub remote repository under the user's account.

