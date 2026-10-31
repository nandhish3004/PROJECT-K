# PropCare NW — Hackathon Readiness Notes

Companion to `procare-hackathon-fixes.patch`. Apply it inside a clone of
`192424403Prithika/procare`:

```bash
git apply --binary procare-hackathon-fixes.patch
```

Everything below was verified against a live run of the full stack
(Next.js frontend + FastAPI backend), not read off the source.

---

## 1. What was actually broken (and now fixed)

### Deployment blockers — the app would not boot or deploy as shipped

| Bug | Symptom | Fix |
|---|---|---|
| `email-validator` missing from `backend/requirements.txt` | Fresh clone crashes on import (`app/schemas/auth.py` uses Pydantic `EmailStr`); backend never starts | Added to `requirements.txt` |
| `ultralytics` pulls non-headless `opencv-python` | `ImportError: libGL.so.1` on any headless server (incl. Render) | `render.yaml` buildCommand now force-reinstalls `opencv-python-headless` |
| `next/font/google` fetches Inter at **build** time | `next build` hard-fails whenever `fonts.googleapis.com` is unreachable (offline CI, restricted egress) | Inter now loads at **runtime** via `<link>`; build is network-independent and degrades to the system stack offline |

### Demo blocker — the dashboard rendered all zeros

`backend/app/core/seed_data.py` seeded data that the API filters then discarded:

- Contractors used `verification_status: "verified"`, but the list endpoint
  filters `== "Approved"` → `/api/v1/contractors` returned `[]`.
- Properties had **no `organization` field**, while the manager-scoped query
  filters on `organization == <user's org>` → 0 properties for every non-admin.
- **No inspections and no work orders were seeded at all**, so those screens
  and every derived KPI / SLA countdown were empty.

Rewritten seed now produces, per role:

| Role | properties | inspections | work-orders | contractors | notifications |
|---|---|---|---|---|---|
| manager / admin / inspector | 8 | 8 | 8 | 3 | 5 |
| contractor (correctly scoped) | 8 | 8 | 4 | 3 | 5 |

Dashboard KPIs as manager: Portfolio **8**, Pending Surveys **3**, High/Critical **4**,
Open Work Orders **6**, Active Contractors **3**; risk pie splits 2/2/2/2 across
critical/high/moderate/low. Two `Emergency 24h` orders carry live forward-dated
Awaab deadlines so the statutory countdowns tick during the demo.

---

## 2. The "mobile app" — what it is now

There was **no** mobile app in the repo: 0 Swift/Kotlin/Java/Dart files, 0
React Native / Expo / Flutter / Capacitor dependencies, 0 mobile project dirs,
and no PWA artifacts (no manifest, no service worker, no icons).

The patch makes the existing responsive web app a genuine **installable PWA**:

- `app/manifest.ts` — name, `start_url: /app/dashboard`, `display: standalone`,
  brand theme `#79566F`, and three home-screen **shortcuts** (Start Inspection,
  Risk & Triage, Moisture AI).
- `public/icons/*` — 192/512/maskable/apple-touch PNGs drawn from the real
  `BuildingShieldIcon` glyph on the brand plum.
- `public/sw.js` — offline shell; network-first navigations with `/offline`
  fallback; **network-first with cache fallback for `/api/v1/*`**, so an
  inspector in a signal-dead basement still sees the last loaded dataset.
  Never intercepts non-GET or cross-origin requests.
- `app/offline/page.tsx` — branded offline screen.
- `components/app/ServiceWorkerRegistrar.tsx` — registers the SW (production
  only, so dev iteration never serves stale chunks) and surfaces an
  **in-app Install prompt** via `beforeinstallprompt`.
- Root layout gains `theme-color`, `mobile-web-app-capable`,
  `apple-touch-icon`, and `viewport-fit=cover`.

**Demo it:** serve the production build over HTTPS, open on a phone, and use
*Add to Home Screen* / the in-app Install banner. It launches fullscreen with
its own icon and splash. Be precise with judges: this is an installable PWA,
**not** an App Store / Play Store binary. If a store listing is genuinely
required, wrap this same build with Capacitor — the UI needs no changes.

---

## 3. Running it

```bash
# backend (uses the built-in in-memory store if MongoDB is absent)
cd backend && pip install -r requirements.txt
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000

# frontend — use the PRODUCTION build so the PWA is active
cd frontend && npm install && npm run build && npm run start
```

Then open `http://localhost:3000`.

## 4. Demo credentials (seeded)

| Role | Email | Password |
|---|---|---|
| Platform Admin | `admin@propcare.gov.uk` | `admin123` |
| Property Manager | `manager@propcare.gov.uk` | `manager123` |
| Field Inspector | `inspector@propcare.gov.uk` | `inspector123` |
| Contractor | `contractor@propcare.gov.uk` | `contractor123` |

Log in as **admin** to get the "view as role" switcher and all 25 screens.

## 5. Suggested 3-minute demo order

1. **Landing → Start Inspection modal** (shows the Awaab's Law trigger copy).
2. **Login as manager → Dashboard** — KPIs, live risk pie, two ticking 24h SLA countdowns.
3. **Risk & Triage / Deadlines** — the statutory-compliance story (their differentiator).
4. **Moisture AI (YOLO)** — run detection on a sample photo; mention YOLOv8 + OpenCV.
5. **Switch to contractor** (via admin) — scoped work orders, submit completion evidence.
6. **Phone:** install to home screen, relaunch standalone, toggle airplane mode to show offline.

## 6. Still open (be ready for judge questions)

- No OS **push** notifications — the notifications screen polls in-app only.
- No **geolocation capture**, though the property model has lat/long fields.
- Contrast: white-on-`#B995AD` primary CTA is 2.64:1 (below WCAG AA 4.5:1).
- Design tokens in `globals.css` are defined but unused — 41 files hardcode hex.
- `middleware.ts` is deprecated in Next 16 (rename to `proxy.ts` when convenient).
