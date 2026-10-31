# SAATHI — 2-minute submission cut

Built from the team's own showcase source (`saran799/SAATHI-OA` @ `0f69260`, rebuilt with
Vite from `showcase/src/`). Deployed copy: **`docs/saathi/`** in this repository.

Open `docs/saathi/index.html` (or the GitHub Pages URL for `/saathi/`), press
**▶ Play film** — it goes **fullscreen automatically** and plays the **1:59 cut with the
female voice-over and no music**. **● Record video** writes the whole cut to a 1080p
WebM/MP4 file with the voice-over mixed in (Chrome/Edge) — that file is the submission video.

## What changed vs the master film (162 s → 119 s)

| Change | Detail |
| --- | --- |
| Runtime cap | master timeline plays at `SPEED = 1.22` plus five dead-segment jumps `[[0,3.5],[5.5,7.5],[21.5,25.5],[105.6,110.8],[138.8,143.2]]` → wall-clock **1:59**. Every module is a pure function of timeline `t`, so nothing desyncs. Clock/readout show wall-clock time via `eff(t)`. |
| Voice-over | 10 narration clips (female, friendly) decoded into the `Score` WebAudio graph on a dedicated `voiceIn` bus → audible **and** captured by `Record video`. Cues are **chained in wall-clock seconds**: line *i+1* starts 0.3 s after line *i* finishes (never before its chapter minimum `VO_MIN = [3.0, 13.7, 23.6, 39.5, 46.9, 56.8, 68.2, 79.1, 93.1, 103.5]`), one source node at a time — so narration flows continuously and two lines can never overlap. |
| Music | **Removed.** `score.start()` (the generative tanpura/bansuri/tabla scheduler) is never called; the `Score` graph survives only as the voice-over bus + recorder tap. The music toggle is hidden. Exported video = film + narration only. |
| Fullscreen | auto on **▶ Play film**; manual `⛶ Fullscreen` toggle in the top bar. |
| Prototype photos | during the strap-pod chapter (`T.strap+0.4 → T.shock−0.6`) a card shows the three build photos: pod strapped below the knee, strap + sensor board, pod in hand. |
| Honesty chip | persistent pill under the top bar: *"Prototype build · simulated sensor & AI · demo data · screening support, not a diagnosis."* |

## Fake-claim removals

- Chapter **"Lab-validated" → "Evidence base"**; overlay header *"Validated against the
  sports-lab method"* → *"The method footwear labs use — published tibial-accelerometer
  research; Saathi adapts it as screening support"*; hotspot *"Sports-lab validation"* →
  *"Sports-lab method"*.
- Novelty pill *"Lab-grade method, no lab"* → *"Published method, no lab needed"*.
- App-flow rail *"On-device AI"* → *"On-device analysis"* (the analysis service is
  simulated in this build, per the project README).
- Pre-existing honest labels kept and relied upon: peak-g values carry *"(illustrative)"*,
  bar chart carries *"illustrative values"*, result screen carries *"Clinical confirmation
  required"*.

## Rebuilding

```bash
# in a clone of saran799/SAATHI-OA with the patches from this repo's git history
npm install --ignore-scripts
npx tsc -p showcase/tsconfig.json --noEmit
npx vite build --config vite.showcase.config.ts   # → dist/showcase
# copy dist/showcase over docs/saathi/ here
```

Narration stems live in `demo/audio3/vo-01..10.mp3` (copied into `showcase/src/vo/` at
build time); prototype photos in `showcase/src/assets/pod-1..3.png`.
