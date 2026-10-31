# SAATHI — 2-minute submission cut

Built from the team's own showcase source (`saran799/SAATHI-OA` @ `0f69260`, rebuilt with
Vite from `showcase/src/`). Deployed copy: **`docs/saathi/`** in this repository.

Open `docs/saathi/index.html` (or the GitHub Pages URL for `/saathi/`), press
**▶ Play film** — it goes **fullscreen automatically** and plays the **1:59 cut, fully
silent** (no music, no voice-over — by request, so a voice-over can be added in editing).
**● Record video** writes the whole cut to a 1080p WebM/MP4 file (Chrome/Edge) — that file
is the submission video.

## What changed vs the master film (162 s → 119 s)

| Change | Detail |
| --- | --- |
| Runtime cap | master timeline plays at `SPEED = 1.22` plus five dead-segment jumps `[[0,3.5],[5.5,7.5],[21.5,25.5],[105.6,110.8],[138.8,143.2]]` → wall-clock **1:59**. Every module is a pure function of timeline `t`, so nothing desyncs. Clock/readout show wall-clock time via `eff(t)`. |
| Voice-over | **Removed by request** (final decision: silent cut). Earlier VO experiments live in `demo/audio3/` and in git history; the patched source in `demo/saathi-src/` contains no VO code at all. |
| Music | **Removed.** `score.start()` (the generative tanpura/bansuri/tabla scheduler) is never called; the `Score` graph survives only as a silent recorder tap. The music toggle is hidden. |
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
