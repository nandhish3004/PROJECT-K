# PROJECT-K — Team Zypher demo films

Two real-time WebGL films, each shipped as **one self-contained HTML file** with vendored
three.js and base64 audio inlined: no build step at runtime, no server, no CDN, opens
straight off disk and records cleanly.

1. **Chennai Mobility AI** — a 2½-minute *autonomous* cinematic for a telephony transit
   assistant serving button-phone commuters in Chennai, engineered around the real MTC,
   Chennai Metro, Southern Railway and MRTS networks.
2. **HygroScope** — finds hidden damp and water leaks in apartment walls using a phone:
   one ambient photo, one torch-lit photo, one 30-second contact microphone recording,
   fused into a single risk score with the physics shown on screen.

Team **Zypher** · National hackathon submission · 2026

---

## ▶ Chennai Mobility AI — 2½-minute autonomous 3D film

**https://nandhish3004.github.io/project-k/chennai/**

A cinematic, photorealistic real-time WebGL film for **Chennai Mobility AI**, an intelligent
*telephony* transit assistant for button-phone commuters. Five acts of thirty seconds, **thirty-four
shots on one continuous camera move**, and **zero buttons**: the picture starts on the first frame,
runs to `02:30:00` on its own, holds on the title card and loops.

| Act | Time | What happens |
| --- | --- | --- |
| I · The digital divide at street level | `0:00–0:30` | Evening rain on Poonamallee High Road. A low dolly across puddles mirroring sodium lamps into an MTC bus shelter, where an elderly commuter holds a keypad phone while smartphone commuters are ringed by red-glitch failure banners citing 5,400+ real CUMTA grievances. |
| II · Cellular ingestion & 8 kHz streaming | `0:30–1:00` | Macro on the rubber keypad: the green call key depresses, eleven DTMF digits dial `044 2479 4705`, amber acoustic ripples pulse off the microphone, and the camera climbs out through the shelter mouth, up a lattice mast to a **FastAPI Telephony Gateway (8 kHz PCM Stream)** node. |
| III · Dual-lane 3D routing & grievance brain | `1:00–1:30` | Bird's-eye of Chennai. An amber GTFS spline wipes on from Thandalam to Porur Roundtana, MTC Route 54 runs it, a floating badge reads `GTFS SCHEDULED TIMETABLE | Bus 54/54E | ~35 mins | Headway: 8-10 mins (Zero Hallucination)`, and a second lane branches grievances to the Porur depot queue. |
| IV · DTMF keypad "1" press & 148-char SMS | `1:30–2:00` | The camera dives 260 m back into the commuter's hands. Key `1` glows amber and mechanically depresses — in-band DTMF, 697 + 1209 Hz — the call drops, the handset vibrates, and the monochrome green LCD reveals the **148-character** SMS. |
| V · Real-world impact & CUMTA telemetry | `2:00–2:30` | Route 54 berths at the kerb, air brakes, the commuter walks bench → kerb → doorway and steps aboard. The storm breaks into a golden-hour panorama over Napier Bridge and Chennai Central while glass telemetry renders **12,480** inbound calls, **58% Tanglish / 30% Madras Bashai / 12% Formal Tamil**, **99.2%** SMS delivered. |

**Engineered from the real city, not a generic set piece.** Every transit system is a working,
moving model of something that actually exists:

- **MTC buses** — chrome-oxide red over a cream skirt, amber route boards in Tamil and English
  (`54 / 54E` → `போரூர் ரவுண்டானா / PORUR ROUNDTANA`), two bi-folding kerb-side doors, conductor's
  fare box, depot stencilling, 46 vehicles of live traffic across six lanes with wet-road light streaks.
- **Chennai Metro Green Line (Corridor 2)** — the operational Central ↔ St. Thomas Mount line, elevated
  along Jawaharlal Nehru Salai where it really crosses Poonamallee High Road at Koyambedu. U-girder
  viaduct, platform screen doors, CMRL roundels, and three-car stainless sets on **750 V DC third rail —
  so no pantographs**. The under-construction Corridor 4 is deliberately *not* used.
- **Southern Railway Chennai suburban (Beach ↔ Tambaram)** — four tracks at 1.676 m gauge on concrete
  sleepers, **25 kV AC overhead with pantographs**, droppers and catenary, colour-light signals cycling
  their aspects, high-level island platforms with yellow tactile strips, ICF stainless EMUs plus a
  sixteen-car express.
- **MRTS (Beach ↔ Velachery)** — twin circular piers beside the Buckingham Canal, CHEPAUK station, two rakes.
- **CUMTA** — the Chennai Unified Metropolitan Transport Authority is why all four modes share one frame.
- The corridor is the real fourteen-stop Poonamallee High Road (NH 48) sequence, Thandalam → Poonamallee →
  Mangadu → Ramapuram → SIMATS Highway → Porur Bypass → Porur Roundtana → MGR Nagar → Alapakkam →
  Koyambedu → Aminjikarai → Kilpauk → Chennai Central, with the Cooum, Napier Bridge and the Coromandel surf.

**Audio** is embedded and entirely generated or voiced in-browser: thirteen Indian-English narration
stems, two spoken **Tamil** call turns (burned-in Tamil subtitles + transliteration + translation), and
procedural foley — rain, distant bus diesel whose RPM tracks the vehicle, rubber key clicks, all sixteen
DTMF symbols, an SMS alert beep, air brakes, horns and thunder. The Tamil turns are band-limited through
a 320 Hz–3.3 kHz telephone chain so they sound like a real call.

**The thin amber progress line** sits at the very top of the viewport and tracks the 150-second timeline,
with act segment ticks, roman numerals and a `MM:SS:FF / 02:30:00` readout. It has no click targets.

| Control | Action |
| --- | --- |
| *(none)* | The film plays itself. Nothing needs clicking. |
| tap anywhere | Unlocks browser audio and enters fullscreen. The picture never waits for it. |
| `R` / `● Record` | Exports the full 150 s as a 1080p WebM with soundtrack (frame-locked to 1/60). |
| `M` | Mute |

OrbitControls are **never constructed** — the camera is a Catmull-Rom track driven entirely by the
master clock. Rendered with volumetric fog, PBR wet-road shaders and a planar reflector for the puddles.

### Building the Chennai film

```bash
python3 demo/chennai/build_film.py
```

Concatenates `demo/chennai/src/*.js` in filename order, inlines vendored three.js r160 and base64s the
fifteen audio stems, and writes both `demo/chennai/chennai-mobility-film.html` and
`docs/chennai/index.html` — one **1.8 MB** self-contained file, offline-openable.

### Verifying it without a browser

There is no browser in CI, so two headless harnesses assert everything that would otherwise fail
silently at runtime:

```bash
node .harness/verify.js         # 36 checks: scene graph, camera path, timeline, choreography
node .harness/verify-audio.js   # 14 checks: the whole Web Audio graph against a strict mock
```

`verify.js` builds the entire world under three.js in Node (5,850 scene nodes), then samples the camera
at 60 fps for all 9,000 frames and asserts it is finite, in bounds, never underground, never clips the
shelter roof / back panel / columns, never overshoots a spline segment, and never lurches in speed. It
runs `drive(t)` across the full 150 s checking for NaN, confirms it is **idempotent on re-seek** (the
auto-loop depends on that), and checks the cue sheet against the *measured* MP3 durations so no two
spoken stems overlap. `verify-audio.js` mocks Web Audio strictly enough to catch the faults that only
browsers report — `exponentialRampToValueAtTime(0)`, negative or NaN scheduling times, a source started
twice or stopped before it starts — and fires all 71 cues plus all 16 DTMF symbols.

---

## ▶ HygroScope — live demo (3D film, runs in the browser)

**https://nandhish3004.github.io/project-k/**

One self-contained HTML file — no build step, no server, no CDN, no assets to fetch.
Vendored three.js, base64 voice-over and a generative score are all inlined, so it works
offline and records cleanly with any screen recorder.

| Control | Action |
| --- | --- |
| `Start` | Enter fullscreen and play |
| `Space` | Play / pause |
| `←` `→` | Previous / next chapter |
| `Esc` | Exit fullscreen |

Headphones recommended. Total runtime ≈ 6 minutes across 16 chapters.

<details>
<summary><strong>Chapter list</strong></summary>

1. Cold open — the estate at dusk
2. The problem — damp, mould, Awaab's Law 24-hour clock
3. Sign-in — role-based access for inspector / manager / contractor
4. The wall — how an inspector is guided to stand and aim
5. Optical pass — ambient vs torch-lit pair (specular separation)
6. Acoustic pass — phone on the wall, 30 s contact recording
7. OpenCV pipeline — SIFT → RANSAC → LAB L\* → difference map
8. Thermal view — anomaly JET overlay
9. Spectrum — Welch PSD of the acoustic window
10. Physics — refractive index and dielectric permittivity of water
11. Psychrometrics — Magnus–Tetens dew point and condensation margin
12. Fusion — weighted risk score 86, with confidence and provenance
13. Dashboard — the housing officer's live estate view
14. Work order — 24 h emergency clock, contractor assignment, audit trail
15. Architecture — phone → FastAPI → MongoDB Atlas → dashboard
16. Impact + references — what it changes, and every source cited

</details>

---

## What's in this repository

| Path | Contents |
| --- | --- |
| `docs/index.html` | Landing page for both films (GitHub Pages source, `/docs`) |
| `docs/chennai/index.html` | **The deployed Chennai Mobility AI film** |
| `demo/chennai/index.src.html` | Chennai film shell + CSS — edit this, then rebuild |
| `demo/chennai/src/*.js` | Chennai film source, eleven modules concatenated in filename order |
| `demo/chennai/build_film.py` | Chennai film build script |
| `demo/chennai/audio/*.mp3` | 13 narration stems + 2 Tamil call turns (inlined as base64) |
| `.harness/verify.js`, `.harness/verify-audio.js` | Headless verification harnesses (see above) |
| `demo/film3/hygroscope-film.src.html` | Readable source of the film — edit this, then rebuild |
| `demo/film3/hygroscope-film.html` | Built copy of the film |
| `demo/film3/vendor/three.min.js` | three.js r160 UMD build, vendored from npm (inlined at build time) |
| `demo/propcare-film-v2.html` | Previous generation (CSS-3D), kept for reference |
| `demo/propcare-demo-film.html` | First generation film, kept for reference |
| `demo/audio/scene-*.mp3` | Voice-over stems (also inlined as base64) |
| `demo/assets/zypher-logo.png` | Team Zypher crest used for branding in the film |
| `HACKATHON-NOTES.md` | Full UI/UX + frontend + backend audit of the production app |
| `procare-hackathon-fixes.patch` | PWA / seed-data / deploy-config patch for the production repo |

### Rebuilding the HygroScope film

```bash
python3 - <<'PY'
import base64, json, pathlib
root = pathlib.Path("demo")
src   = (root / "film3/hygroscope-film.src.html").read_text()
three = (root / "film3/vendor/three.min.js").read_text()
audio = sorted((root / "audio").glob("scene-*.mp3"))
manifest = [base64.b64encode(p.read_bytes()).decode() for p in audio]
logo = base64.b64encode((root / "assets/zypher-logo.png").read_bytes()).decode()
out = (src.replace("/*__THREE__*/", three)
          .replace("__AUDIO_MANIFEST__", json.dumps(manifest))
          .replace("__LOGO_B64__", "data:image/png;base64," + logo))
(root / "film3/hygroscope-film.html").write_text(out)
pathlib.Path("docs/index.html").write_text(out)
print("built", len(out), "bytes")
PY
```

---

## The production app

The film presents a working product: a mobile-first inspection app and a housing-officer
dashboard. The production codebase it is based on is audited in
[`HACKATHON-NOTES.md`](HACKATHON-NOTES.md) — Next.js 16 / React 19 / Tailwind v4 front end,
FastAPI + Motor (MongoDB Atlas) back end with JWT + Argon2id, OpenCV SIFT/FFT/Welch
imaging, Open-Meteo weather, ReportLab PDFs and YOLOv8.

`procare-hackathon-fixes.patch` makes that codebase deployable: installable PWA
(manifest, service worker, offline route, 5 icons), corrected seed data so the dashboard
shows real numbers, and render/requirements fixes (`opencv-python-headless` for missing
`libGL.so.1`, `email-validator`).

### Science and provenance

Everything quantitative in the film is cited on screen in chapter 16. Highlights:

- **Acoustic leak detection by spectral analysis** — AIDIC CET 2013: FFT of a microphone
  signal yields characteristic peaks present with a leak and absent without; larger leaks
  shift energy to lower frequency.
- **Cross-correlation localisation** — two-sensor time-delay correlation for water
  pipelines; STFT/wavelet sharpening (ResearchGate, leak acoustic signal correlator).
- **Resonance modelling in buried plastic pipe** — Gao Yan et al., Institute of Acoustics,
  Chinese Academy of Sciences (2017).
- **Specular reflection reduction with multi-flash imaging** — Feris et al. (2004), the
  basis for the ambient-vs-torch image pair.
- **Adaptive specular reflection detection and inpainting** — arXiv 1802.08402.
- **Pinless moisture meters** — low-energy EM/RF field reading dielectric permittivity;
  realistic scan depth 12–25 mm, which is why the film says "several centimetres"
  rather than a marketing figure.
- **Magnus–Tetens** (Alduchov & Eskridge 1996) coefficients b = 17.62, c = 243.12 °C for
  the dew-point and condensation-margin calculation.
- Classic references: Lowe 2004 (SIFT), Fischler & Bolles 1981 (RANSAC), Welch 1967 (PSD),
  Bradski 2000 (OpenCV), Jocher et al. 2023 (YOLOv8), Awaab's Law / Housing Act 2023.

The film also states its own limits honestly: gloss and specular reflection can imitate a
defect, and optical intensity alone is not proof of moisture — which is exactly why the
optical, acoustic and psychrometric channels are fused instead of trusted individually.

---

## Deployment

GitHub Pages serves this repository from `/docs` on `main`:

```
Settings → Pages → Build and deployment → Source: Deploy from a branch
Branch: main    Folder: /docs    → Save
url: https://nandhish3004.github.io/project-k/
```

`.nojekyll` is present so Pages serves the file byte-for-byte with no Jekyll processing,
and `docs/404.html` redirects any bad path back to the film. There is no build step and no
external dependency — `docs/index.html` is the entire deployment.
