# PROJECT-K — HygroScope

**HygroScope** finds hidden damp and water leaks in apartment walls using a phone:
one ambient photo, one torch-lit photo, one 30-second contact microphone recording —
fused into a single risk score with the physics shown on screen.

Team **Zypher** · National hackathon submission · 2026

---

## ▶ Live demo (3D film, runs in the browser)

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
| `docs/index.html` | **The deployed film** (GitHub Pages source, `/docs`) |
| `demo/film3/hygroscope-film.src.html` | Readable source of the film — edit this, then rebuild |
| `demo/film3/hygroscope-film.html` | Built copy of the film |
| `demo/film3/vendor/three.min.js` | three.js r160 UMD build, vendored from npm (inlined at build time) |
| `demo/propcare-film-v2.html` | Previous generation (CSS-3D), kept for reference |
| `demo/propcare-demo-film.html` | First generation film, kept for reference |
| `demo/audio/scene-*.mp3` | Voice-over stems (also inlined as base64) |
| `demo/assets/zypher-logo.png` | Team Zypher crest used for branding in the film |
| `HACKATHON-NOTES.md` | Full UI/UX + frontend + backend audit of the production app |
| `procare-hackathon-fixes.patch` | PWA / seed-data / deploy-config patch for the production repo |

### Rebuilding the film

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

GitHub Pages serves this branch from `/docs`:

```
source: branch arena/4413ce8c-project-k, path /docs
url:    https://nandhish3004.github.io/project-k/
```

`.nojekyll` is present so Pages serves the file byte-for-byte with no Jekyll processing.
