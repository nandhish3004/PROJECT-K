import * as THREE from 'three'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'
import markUrl from '../../src/assets/saathi-mark.png'
import { T } from './timeline'
import { FONT, clamp, easeInOut, easeOut, roundRect, seg, smooth } from './util'

/**
 * SAATHI PHC dashboard (the medical officer's web app): Overview · Patient Registry · Analytics.
 * Layout and numbers follow the deployed PHC dashboard; patient names are story names for the film.
 */
const W = 1440, H = 900
const SIDE = 260
const C = {
  bg: '#F6F8FB', card: '#FFFFFF', line: '#E6EBF1', ink: '#0F172A', sub: '#64748B', faint: '#94A3B8',
  teal: '#0F766E', tealSoft: '#CCFBF1', tealInk: '#115E59', blue: '#2563EB', blueSoft: '#DBEAFE',
  amber: '#B45309', amberSoft: '#FEF3C7', red: '#B91C1C', redSoft: '#FEE2E2', purple: '#7C3AED', purpleSoft: '#EDE9FE',
  slate: '#475569', slateSoft: '#F1F5F9', sky: '#38BDF8', green: '#16A34A',
}
const mark = new Image(); mark.src = markUrl

/* ---------------- story data ---------------- */
const RECENT: [string, string, string, Band][] = [
  ['Tashi Bhutia', '14 Oct 2026', 'Right knee', 'Moderate'],
  ['Pema Lhamo', '13 Oct 2026', 'Left knee', 'Low'],
  ['Karma Tshering', '12 Oct 2026', 'Right knee', 'Higher'],
  ['Dawa Doma', '12 Oct 2026', 'Both knees', 'Moderate'],
  ['Nima Sherpa', '11 Oct 2026', 'Left knee', 'Low'],
  ['Phurba Lama', '10 Oct 2026', 'Right knee', 'Low'],
]
const REGISTRY: [string, string, string, string][] = [
  ['Tashi Bhutia', '+91 97••• ••218', '68 / M', 'Lingdok'],
  ['Pema Lhamo', '+91 94••• ••671', '54 / F', 'Tumlong'],
  ['Karma Tshering', '+91 70••• ••905', '61 / M', 'Rongli'],
  ['Dawa Doma', '+91 98••• ••342', '47 / F', 'Lingdok'],
  ['Nima Sherpa', '+91 96••• ••127', '58 / M', 'Sakyong'],
  ['Phurba Lama', '+91 81••• ••560', '66 / M', 'Tumlong'],
  ['Sonam Choden', '+91 99••• ••083', '49 / F', 'Phamtam'],
  ['Ang Dorjee', '+91 77••• ••414', '72 / M', 'Rongli'],
]
type Band = 'Higher' | 'Moderate' | 'Low'
const BAND: Record<Band, [string, string]> = { Higher: [C.redSoft, C.red], Moderate: [C.amberSoft, C.amber], Low: [C.tealSoft, C.tealInk] }
const ACTIVITY_D = ['09-16', '09-19', '09-22', '09-25', '09-28', '10-01', '10-04', '10-07', '10-10', '10-14']
const ACTIVITY_V = [1, 2, 4, 2, 2, 3, 2, 2, 1, 1]
const AGES: [string, number][] = [['18-29', 11], ['30-44', 2], ['45-59', 4], ['60+', 1]]
const WORKERS: [string, string, string, number][] = [['SR', 'Sunita Rai', 'ASHA-2041', 11], ['PD', 'Pema Doma', 'ASHA-2017', 5], ['KT', 'Karma Tamang', 'ASHA-2033', 3], ['NL', 'Nima Lepcha', 'ASHA-2050', 1]]
const VILLAGES: [string, number][] = [['Lingdok', 6], ['Tumlong', 5], ['Rongli', 4], ['Sakyong', 3], ['Phamtam', 2]]

/* ---------------- choreography (seconds from T.phc) ---------------- */
export const DASH = { in: 0.9, arrive: 2.3, toPatients: 5.0, toAnalytics: 7.6, scroll: 9.7, out: 11.3 }
type Page = 0 | 1 | 2
interface State { page: Page; arrive: number; pageK: number; scroll: number; cursor: [number, number]; click: number; now: number }
function stateAt(t: number): State {
  const r = t - T.phc
  const page: Page = r < DASH.toPatients ? 0 : r < DASH.toAnalytics ? 1 : 2
  const pageStart = page === 0 ? 0 : page === 1 ? DASH.toPatients : DASH.toAnalytics
  const arrive = smooth(seg(r, DASH.arrive, DASH.arrive + 0.8))
  // cursor path: rests on the table, travels to "Patients", then to "Analytics"
  const P0: [number, number] = [1010, 640], P1: [number, number] = [118, 188], P2: [number, number] = [118, 280], P3: [number, number] = [980, 520]
  let cursor: [number, number]
  const mv = (a: [number, number], b: [number, number], k: number): [number, number] => { const e = easeInOut(k); return [a[0] + (b[0] - a[0]) * e, a[1] + (b[1] - a[1]) * e] }
  if (r < DASH.toPatients - 0.9) cursor = P0
  else if (r < DASH.toPatients) cursor = mv(P0, P1, seg(r, DASH.toPatients - 0.9, DASH.toPatients - 0.1))
  else if (r < DASH.toAnalytics - 0.9) cursor = P1
  else if (r < DASH.toAnalytics) cursor = mv(P1, P2, seg(r, DASH.toAnalytics - 0.9, DASH.toAnalytics - 0.1))
  else cursor = mv(P2, P3, seg(r, DASH.toAnalytics + 0.6, DASH.toAnalytics + 1.6))
  const clickAt = [DASH.toPatients - 0.05, DASH.toAnalytics - 0.05]
  let click = 0
  for (const c of clickAt) { const d = r - c; if (d > 0 && d < 0.35) click = 1 - d / 0.35 }
  return { page, arrive, pageK: smooth(seg(r, pageStart, pageStart + 0.45)), scroll: easeInOut(seg(r, DASH.scroll, DASH.scroll + 1.1)), cursor, click, now: r }
}

/* ---------------- drawing helpers ---------------- */
type Ctx = CanvasRenderingContext2D
function text(ctx: Ctx, s: string, x: number, y: number, size: number, weight: number, color: string, align: CanvasTextAlign = 'left') {
  ctx.font = `${weight} ${size}px ${FONT}`; ctx.fillStyle = color; ctx.textAlign = align; ctx.textBaseline = 'middle'; ctx.fillText(s, x, y)
}
function box(ctx: Ctx, x: number, y: number, w: number, h: number, r: number, fill: string, stroke?: string) {
  roundRect(ctx, x, y, w, h, r); ctx.fillStyle = fill; ctx.fill()
  if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = 1.5; ctx.stroke() }
}
function card(ctx: Ctx, x: number, y: number, w: number, h: number) {
  ctx.save(); ctx.shadowColor = 'rgba(15,23,42,0.06)'; ctx.shadowBlur = 14; ctx.shadowOffsetY = 3
  box(ctx, x, y, w, h, 16, C.card); ctx.restore()
  roundRect(ctx, x, y, w, h, 16); ctx.strokeStyle = C.line; ctx.lineWidth = 1.2; ctx.stroke()
}
function badge(ctx: Ctx, s: string, x: number, y: number, bg: string, fg: string, size = 13) {
  ctx.font = `700 ${size}px ${FONT}`; const w = ctx.measureText(s).width + size * 1.6
  box(ctx, x, y - size * 0.95, w, size * 1.9, size * 0.95, bg); text(ctx, s, x + w / 2, y + 0.5, size, 700, fg, 'center')
  return w
}
/** tiny line icons for the sidebar + stat cards */
function icon(ctx: Ctx, kind: string, x: number, y: number, color: string, s = 1) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s)
  ctx.strokeStyle = color; ctx.fillStyle = color; ctx.lineWidth = 2; ctx.lineCap = 'round'; ctx.lineJoin = 'round'
  ctx.beginPath()
  switch (kind) {
    case 'grid': for (const [a, b] of [[-7, -7], [1, -7], [-7, 1], [1, 1]]) { roundRect(ctx, a, b, 6, 6, 1.5); ctx.stroke() } break
    case 'users': ctx.arc(-3, -3, 3.5, 0, Math.PI * 2); ctx.moveTo(-10, 8); ctx.quadraticCurveTo(-3, -2, 4, 8); ctx.moveTo(5, -6); ctx.arc(5, -3, 3, -Math.PI / 2, Math.PI / 2); ctx.moveTo(6, 2); ctx.quadraticCurveTo(10, 4, 10, 8); ctx.stroke(); break
    case 'clip': roundRect(ctx, -6, -7, 12, 15, 2); ctx.moveTo(-3, -2); ctx.lineTo(3, -2); ctx.moveTo(-3, 2); ctx.lineTo(3, 2); ctx.stroke(); break
    case 'chart': ctx.moveTo(-8, 8); ctx.lineTo(-8, -8); ctx.moveTo(-8, 8); ctx.lineTo(8, 8); ctx.moveTo(-4, 4); ctx.lineTo(-4, 0); ctx.moveTo(0, 4); ctx.lineTo(0, -5); ctx.moveTo(4, 4); ctx.lineTo(4, -2); ctx.stroke(); break
    case 'cal': roundRect(ctx, -7, -6, 14, 13, 2); ctx.moveTo(-7, -1); ctx.lineTo(7, -1); ctx.moveTo(-3, -9); ctx.lineTo(-3, -4); ctx.moveTo(3, -9); ctx.lineTo(3, -4); ctx.stroke(); break
    case 'doc': ctx.moveTo(-6, -8); ctx.lineTo(3, -8); ctx.lineTo(6, -5); ctx.lineTo(6, 8); ctx.lineTo(-6, 8); ctx.closePath(); ctx.moveTo(-3, 0); ctx.lineTo(3, 0); ctx.moveTo(-3, 4); ctx.lineTo(3, 4); ctx.stroke(); break
    case 'home': ctx.moveTo(-8, 0); ctx.lineTo(0, -7); ctx.lineTo(8, 0); ctx.moveTo(-6, -1); ctx.lineTo(-6, 8); ctx.lineTo(6, 8); ctx.lineTo(6, -1); ctx.stroke(); break
    case 'badge': ctx.arc(0, -2, 5, 0, Math.PI * 2); ctx.moveTo(-4, 2); ctx.lineTo(-5, 9); ctx.lineTo(0, 6); ctx.lineTo(5, 9); ctx.lineTo(4, 2); ctx.stroke(); break
    case 'sync': ctx.arc(0, 0, 7, -2.6, 0.4); ctx.moveTo(7, -4); ctx.lineTo(7, 1); ctx.lineTo(2, 1); ctx.moveTo(0, 0); ctx.arc(0, 0, 7, 0.6, 3.6); ctx.stroke(); break
    case 'gear': ctx.arc(0, 0, 3, 0, Math.PI * 2); for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4; ctx.moveTo(Math.cos(a) * 5.5, Math.sin(a) * 5.5); ctx.lineTo(Math.cos(a) * 8, Math.sin(a) * 8) } ctx.stroke(); break
    case 'pulse': ctx.moveTo(-9, 0); ctx.lineTo(-4, 0); ctx.lineTo(-2, -6); ctx.lineTo(2, 6); ctx.lineTo(4, 0); ctx.lineTo(9, 0); ctx.stroke(); break
    case 'alert': ctx.moveTo(0, -8); ctx.lineTo(8, 7); ctx.lineTo(-8, 7); ctx.closePath(); ctx.moveTo(0, -2); ctx.lineTo(0, 2); ctx.stroke(); ctx.beginPath(); ctx.arc(0, 4.5, 0.8, 0, Math.PI * 2); ctx.fill(); break
    case 'search': ctx.arc(-2, -2, 6, 0, Math.PI * 2); ctx.moveTo(2.5, 2.5); ctx.lineTo(8, 8); ctx.stroke(); break
    case 'filter': ctx.moveTo(-8, -6); ctx.lineTo(8, -6); ctx.lineTo(2, 1); ctx.lineTo(2, 7); ctx.lineTo(-2, 5); ctx.lineTo(-2, 1); ctx.closePath(); ctx.stroke(); break
    case 'check': ctx.moveTo(-6, 0); ctx.lineTo(-2, 4); ctx.lineTo(6, -5); ctx.stroke(); break
  }
  ctx.restore()
}
const MENU: [string, string][] = [['Overview', 'grid'], ['Patients', 'users'], ['Screenings', 'clip'], ['Analytics', 'chart'], ['Follow-ups', 'cal'], ['Reports', 'doc'], ['Community', 'home'], ['Workers', 'badge']]
const SYS: [string, string][] = [['Sync & Field Status', 'sync'], ['Settings', 'gear']]
const ACTIVE_MENU = [0, 1, 3]

function sidebar(ctx: Ctx, page: Page) {
  ctx.fillStyle = C.card; ctx.fillRect(0, 0, SIDE, H)
  ctx.fillStyle = C.line; ctx.fillRect(SIDE - 1, 0, 1, H)
  if (mark.complete && mark.naturalWidth) ctx.drawImage(mark, 26, 24, 46, 37)
  text(ctx, 'SAATHI PHC', 84, 38, 21, 800, C.ink)
  text(ctx, 'Primary Health Centre', 84, 58, 12.5, 600, C.sub)
  text(ctx, 'MAIN MENU', 28, 108, 11.5, 800, C.faint)
  MENU.forEach(([n, ic], i) => {
    const y = 140 + i * 46
    const on = ACTIVE_MENU[page] === i
    if (on) box(ctx, 16, y - 20, SIDE - 32, 40, 11, C.teal)
    icon(ctx, ic, 42, y, on ? '#FFFFFF' : C.slate)
    text(ctx, n, 64, y + 1, 15, on ? 700 : 600, on ? '#FFFFFF' : C.slate)
  })
  text(ctx, 'SYSTEM', 28, 532, 11.5, 800, C.faint)
  SYS.forEach(([n, ic], i) => { const y = 564 + i * 46; icon(ctx, ic, 42, y, C.slate); text(ctx, n, 64, y + 1, 15, 600, C.slate) })
  box(ctx, 16, H - 92, SIDE - 32, 68, 14, C.slateSoft)
  ctx.beginPath(); ctx.arc(52, H - 58, 18, 0, Math.PI * 2); ctx.fillStyle = C.teal; ctx.fill()
  text(ctx, 'PL', 52, H - 57, 13, 800, '#FFFFFF', 'center')
  text(ctx, 'Dr. P. Lepcha', 80, H - 66, 14, 700, C.ink)
  text(ctx, 'Medical Officer', 80, H - 47, 12, 600, C.sub)
}
function topbar(ctx: Ctx) {
  ctx.fillStyle = C.card; ctx.fillRect(SIDE, 0, W - SIDE, 68)
  ctx.fillStyle = C.line; ctx.fillRect(SIDE, 67, W - SIDE, 1)
  text(ctx, 'PHC Rongli', SIDE + 32, 34, 15, 700, C.ink)
  text(ctx, '·  East district hill block', SIDE + 120, 34, 14, 500, C.sub)
  box(ctx, W - 330, 18, 210, 34, 17, '#ECFDF5', '#A7F3D0')
  ctx.beginPath(); ctx.arc(W - 310, 35, 5, 0, Math.PI * 2); ctx.fillStyle = C.green; ctx.fill()
  text(ctx, 'Connected to SAATHI', W - 296, 35.5, 14, 700, '#166534')
  ctx.beginPath(); ctx.arc(W - 80, 35, 17, 0, Math.PI * 2); ctx.fillStyle = C.slateSoft; ctx.fill()
  icon(ctx, 'alert', W - 80, 35, C.slate, 0.85)
  ctx.beginPath(); ctx.arc(W - 40, 35, 17, 0, Math.PI * 2); ctx.fillStyle = C.teal; ctx.fill()
  text(ctx, 'PL', W - 40, 36, 12.5, 800, '#FFFFFF', 'center')
}
function pageTitle(ctx: Ctx, y: number, title: string, sub: string) {
  text(ctx, title, SIDE + 32, y, 30, 800, C.ink)
  text(ctx, sub, SIDE + 32, y + 32, 15, 500, C.sub)
}
function tick(from: number, to: number, k: number) { return k >= 1 ? to : k <= 0 ? from : Math.round(from + (to - from) * k) }
function statCards(ctx: Ctx, y: number, items: [string, number, number, string, string, string][], arrive: number, now: number) {
  const x0 = SIDE + 32, gap = 20, cw = (W - SIDE - 64 - gap * 3) / 4
  items.forEach(([label, a, b, ic, fg, bg], i) => {
    const x = x0 + i * (cw + gap)
    card(ctx, x, y, cw, 118)
    box(ctx, x + 20, y + 20, 46, 46, 12, bg); icon(ctx, ic, x + 43, y + 43, fg, 1.1)
    text(ctx, label, x + 80, y + 36, 14, 600, C.sub)
    const v = tick(a, b, arrive)
    text(ctx, String(v), x + 80, y + 78, 34, 800, C.ink)
    if (b !== a && arrive > 0) {
      const f = 1 - smooth(seg(now, DASH.arrive + 2.2, DASH.arrive + 3.2))
      if (f > 0) { ctx.globalAlpha = f; badge(ctx, '+1 today', x + cw - 104, y + 80, '#DCFCE7', '#166534', 12.5); ctx.globalAlpha = 1 }
    }
  })
}

/* ---------------- pages ---------------- */
function overview(ctx: Ctx, s: State) {
  pageTitle(ctx, 112, 'PHC Overview', 'Welcome back, PHC')
  badge(ctx, '14 Oct 2026', W - 160, 118, C.slateSoft, C.slate, 13.5)
  statCards(ctx, 172, [
    ['Total Patients', 18, 19, 'users', C.teal, C.tealSoft],
    ['Total Screenings', 20, 21, 'clip', C.blue, C.blueSoft],
    ['Follow-ups Due', 4, 5, 'cal', C.amber, C.amberSoft],
    ['Active Field Workers', 7, 7, 'badge', C.purple, C.purpleSoft],
  ], s.arrive, s.now)
  // indications
  const x0 = SIDE + 32, y1 = 312
  card(ctx, x0, y1, 744, 214)
  text(ctx, 'Screening Indications', x0 + 24, y1 + 34, 18, 800, C.ink)
  text(ctx, 'All screenings to date', x0 + 720, y1 + 34, 13, 600, C.faint, 'right')
  const tiles: [string, number, number, string, string][] = [['HIGHER RISK', 6, 6, C.redSoft, C.red], ['MODERATE', 6, 7, C.amberSoft, C.amber], ['LOW RISK', 8, 8, C.tealSoft, C.tealInk], ['INSUFFICIENT', 0, 0, C.slateSoft, C.slate]]
  tiles.forEach(([n, a, b, bg, fg], i) => {
    const tx = x0 + 24 + i * 176, ty = y1 + 64
    box(ctx, tx, ty, 160, 124, 14, bg)
    if (a !== b && s.arrive > 0 && s.arrive < 1) { roundRect(ctx, tx, ty, 160, 124, 14); ctx.strokeStyle = fg; ctx.lineWidth = 3; ctx.stroke() }
    text(ctx, n, tx + 18, ty + 30, 12.5, 800, fg)
    text(ctx, String(tick(a, b, s.arrive)), tx + 18, ty + 80, 44, 800, fg)
  })
  // system status
  const sx = x0 + 764, sw = W - 32 - sx
  card(ctx, sx, y1, sw, 214)
  text(ctx, 'System Status', sx + 24, y1 + 34, 18, 800, C.ink)
  ctx.beginPath(); ctx.arc(sx + 50, y1 + 98, 24, 0, Math.PI * 2); ctx.fillStyle = '#DCFCE7'; ctx.fill()
  icon(ctx, 'check', sx + 50, y1 + 98, C.green, 1.6)
  text(ctx, 'Online & Synchronized', sx + 88, y1 + 90, 17, 800, '#166534')
  text(ctx, s.arrive > 0 ? 'Last sync: just now · ASHA-2041' : 'Last sync: 2 h ago', sx + 88, y1 + 114, 13.5, 600, C.sub)
  box(ctx, sx + 24, y1 + 148, sw - 48, 42, 11, C.card, '#CBD5E1')
  text(ctx, 'Manage Connections', sx + sw / 2, y1 + 169.5, 14.5, 700, C.ink, 'center')
  // recent screenings
  const y2 = 546
  card(ctx, x0, y2, W - 64 - SIDE, 322)
  text(ctx, 'Recent Screenings', x0 + 24, y2 + 34, 18, 800, C.ink)
  text(ctx, 'View all  →', W - 56, y2 + 34, 14, 700, C.teal, 'right')
  const cols = [x0 + 24, x0 + 360, x0 + 560, x0 + 760, x0 + 960]
  ;['PATIENT', 'DATE', 'JOINT', 'INDICATION', 'ACTION'].forEach((h, i) => text(ctx, h, cols[i], y2 + 72, 12, 800, C.faint))
  ctx.fillStyle = C.line; ctx.fillRect(x0 + 16, y2 + 88, W - 96 - SIDE, 1)
  // the new record slides in at the top
  const k = s.arrive
  const rows = RECENT
  const rowH = 44
  ctx.save(); ctx.beginPath(); ctx.rect(x0, y2 + 90, W - 64 - SIDE, 226); ctx.clip()
  rows.forEach((r, i) => {
    const isNew = i === 0
    const y = y2 + 114 + (isNew ? 0 : (i - 1 + k) * rowH)
    if (isNew) {
      if (k <= 0) return
      ctx.globalAlpha = k
      const glow = 1 - smooth(seg(s.now, DASH.arrive + 2.6, DASH.arrive + 4))
      if (glow > 0) box(ctx, x0 + 12, y - 20, W - 88 - SIDE, 40, 10, `rgba(204,251,241,${0.9 * glow})`)
    }
    text(ctx, r[0], cols[0], y, 15, 700, C.ink)
    if (isNew) badge(ctx, 'NEW', cols[0] + 132, y, C.teal, '#FFFFFF', 11)
    text(ctx, r[1], cols[1], y, 14, 500, C.sub)
    text(ctx, r[2], cols[2], y, 14, 500, C.sub)
    const [bg, fg] = BAND[r[3]]
    badge(ctx, r[3], cols[3], y, bg, fg, 12.5)
    text(ctx, 'View  →', cols[4], y, 14, 700, C.teal)
    ctx.globalAlpha = 1
  })
  ctx.restore()
  // toast
  const ta = Math.min(smooth(seg(s.now, DASH.arrive - 0.2, DASH.arrive + 0.3)), 1 - smooth(seg(s.now, DASH.arrive + 2.4, DASH.arrive + 2.9)))
  if (ta > 0) {
    ctx.globalAlpha = ta
    const tx = W - 452, ty = 84 + (1 - ta) * -16
    ctx.save(); ctx.shadowColor = 'rgba(15,23,42,0.25)'; ctx.shadowBlur = 24; box(ctx, tx, ty, 420, 70, 14, C.ink); ctx.restore()
    ctx.beginPath(); ctx.arc(tx + 36, ty + 35, 16, 0, Math.PI * 2); ctx.fillStyle = C.teal; ctx.fill()
    icon(ctx, 'sync', tx + 36, ty + 35, '#FFFFFF', 0.9)
    text(ctx, 'New screening synced', tx + 64, ty + 26, 15.5, 800, '#FFFFFF')
    text(ctx, 'Tashi Bhutia · Right knee · from ASHA Sunita', tx + 64, ty + 48, 13, 600, '#99EFE5')
    ctx.globalAlpha = 1
  }
}
function patients(ctx: Ctx, s: State) {
  pageTitle(ctx, 112, 'Patient Registry', 'Total registered patients: 19')
  box(ctx, W - 232, 100, 200, 44, 12, C.teal)
  text(ctx, '+  Register Patient', W - 132, 122.5, 15, 700, '#FFFFFF', 'center')
  const x0 = SIDE + 32, cw = W - 64 - SIDE
  box(ctx, x0, 176, 560, 48, 12, C.card, C.line)
  icon(ctx, 'search', x0 + 26, 200, C.faint)
  text(ctx, 'Search by name, phone or village...', x0 + 48, 200.5, 15, 500, C.faint)
  box(ctx, x0 + 576, 176, 120, 48, 12, C.card, C.line)
  icon(ctx, 'filter', x0 + 602, 200, C.slate); text(ctx, 'Filters', x0 + 622, 200.5, 15, 700, C.slate)
  card(ctx, x0, 244, cw, 624)
  const cols = [x0 + 24, x0 + 400, x0 + 540, x0 + 720, x0 + 930]
  ;['PATIENT DETAILS', 'AGE / SEX', 'VILLAGE', 'SCREENING STATUS', 'ACTION'].forEach((h, i) => text(ctx, h, cols[i], 282, 12, 800, C.faint))
  ctx.fillStyle = C.line; ctx.fillRect(x0 + 16, 300, cw - 32, 1)
  REGISTRY.forEach((r, i) => {
    const y = 338 + i * 66
    const k = smooth(seg(s.now, DASH.toPatients + 0.1 + i * 0.06, DASH.toPatients + 0.5 + i * 0.06))
    ctx.globalAlpha = k
    if (i === 0) box(ctx, x0 + 12, y - 28, cw - 24, 56, 12, 'rgba(204,251,241,0.65)')
    const ini = r[0].split(' ').map(w => w[0]).join('')
    ctx.beginPath(); ctx.arc(cols[0] + 20, y, 20, 0, Math.PI * 2); ctx.fillStyle = ['#CCFBF1', '#DBEAFE', '#FEF3C7', '#EDE9FE'][i % 4]; ctx.fill()
    text(ctx, ini, cols[0] + 20, y + 1, 13, 800, [C.tealInk, C.blue, C.amber, C.purple][i % 4], 'center')
    text(ctx, r[0], cols[0] + 54, y - 9, 15.5, 700, C.ink)
    text(ctx, r[1], cols[0] + 54, y + 12, 13, 500, C.sub)
    if (i === 0) badge(ctx, 'NEW', cols[0] + 190, y - 9, C.teal, '#FFFFFF', 10.5)
    text(ctx, r[2], cols[1], y, 14.5, 600, C.slate)
    text(ctx, r[3], cols[2], y, 14.5, 600, C.slate)
    badge(ctx, '1 Screenings', cols[3], y, C.tealSoft, C.tealInk, 12.5)
    box(ctx, cols[4], y - 18, 120, 36, 10, C.card, '#99D5CF')
    text(ctx, 'View Profile', cols[4] + 60, y + 0.5, 13.5, 700, C.teal, 'center')
    if (i < REGISTRY.length - 1) { ctx.fillStyle = C.line; ctx.fillRect(x0 + 24, y + 33, cw - 48, 1) }
    ctx.globalAlpha = 1
  })
}
function analytics(ctx: Ctx, s: State) {
  const scroll = s.scroll * 470
  ctx.save(); ctx.beginPath(); ctx.rect(SIDE, 68, W - SIDE, H - 68); ctx.clip(); ctx.translate(0, -scroll)
  pageTitle(ctx, 112, 'Analytics', 'Screening and community health activity across your PHC')
  box(ctx, W - 212, 100, 180, 44, 12, C.card, C.line)
  icon(ctx, 'cal', W - 188, 122, C.slate, 0.9); text(ctx, 'Last 30 days', W - 168, 122.5, 14.5, 700, C.slate)
  ctx.strokeStyle = C.slate; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(W - 58, 119); ctx.lineTo(W - 53, 125); ctx.lineTo(W - 48, 119); ctx.stroke()
  const k = smooth(seg(s.now, DASH.toAnalytics + 0.1, DASH.toAnalytics + 1.3))
  statCards(ctx, 172, [
    ['Total Patients', 19, 19, 'users', C.teal, C.tealSoft],
    ['Screenings in Period', 21, 21, 'clip', C.blue, C.blueSoft],
    ['Higher Risk Indications', 6, 6, 'alert', C.red, C.redSoft],
    ['Follow-ups Due', 5, 5, 'cal', C.amber, C.amberSoft],
  ], 1, 99)
  const x0 = SIDE + 32
  // screening activity (line)
  const y1 = 312, lw = 744, lh = 330
  card(ctx, x0, y1, lw, lh)
  text(ctx, 'Screening Activity', x0 + 24, y1 + 34, 18, 800, C.ink)
  text(ctx, 'Screenings per day', x0 + 24, y1 + 58, 13, 500, C.sub)
  const gx = x0 + 60, gy = y1 + 86, gw = lw - 96, gh = lh - 140
  ctx.strokeStyle = C.line; ctx.lineWidth = 1
  for (let v = 0; v <= 4; v++) { const yy = gy + gh - (v / 4) * gh; ctx.beginPath(); ctx.moveTo(gx, yy); ctx.lineTo(gx + gw, yy); ctx.stroke(); text(ctx, String(v), gx - 14, yy, 12, 600, C.faint, 'right') }
  const vals = ACTIVITY_V.map((v, i) => i === ACTIVITY_V.length - 1 ? v + 1 : v) // today's new screening
  const pts = vals.map((v, i) => [gx + (i / (vals.length - 1)) * gw, gy + gh - (v / 4) * gh] as [number, number])
  ACTIVITY_D.forEach((d, i) => text(ctx, d, pts[i][0], gy + gh + 22, 12, 600, C.faint, 'center'))
  ctx.save(); ctx.beginPath(); ctx.rect(gx - 10, gy - 20, (gw + 20) * k, gh + 40); ctx.clip()
  const curve = () => { ctx.moveTo(pts[0][0], pts[0][1]); for (let i = 1; i < pts.length; i++) { const [x1, y1_] = pts[i - 1], [x2, y2] = pts[i]; const mx = (x1 + x2) / 2; ctx.bezierCurveTo(mx, y1_, mx, y2, x2, y2) } }
  ctx.beginPath(); curve(); ctx.lineTo(gx + gw, gy + gh); ctx.lineTo(gx, gy + gh); ctx.closePath()
  const fill = ctx.createLinearGradient(0, gy, 0, gy + gh); fill.addColorStop(0, 'rgba(15,118,110,0.22)'); fill.addColorStop(1, 'rgba(15,118,110,0)')
  ctx.fillStyle = fill; ctx.fill()
  ctx.beginPath(); curve(); ctx.strokeStyle = C.teal; ctx.lineWidth = 3.5; ctx.stroke()
  pts.forEach(([x, y], i) => { ctx.beginPath(); ctx.arc(x, y, i === pts.length - 1 ? 6 : 4, 0, Math.PI * 2); ctx.fillStyle = '#FFFFFF'; ctx.fill(); ctx.strokeStyle = C.teal; ctx.lineWidth = 2.5; ctx.stroke() })
  ctx.restore()
  // indication donut
  const dx = x0 + lw + 20, dw = W - 32 - dx
  card(ctx, dx, y1, dw, lh)
  text(ctx, 'Screening Indication', dx + 24, y1 + 34, 18, 800, C.ink)
  const segs: [string, number, string][] = [['Higher', 6, '#EF4444'], ['Moderate', 7, '#F59E0B'], ['Low', 8, '#14B8A6']]
  const cx = dx + 100, cy = y1 + 184, R = 68
  let a0 = -Math.PI / 2
  const tot = 21
  segs.forEach(([, v, c]) => { const a1 = a0 + (v / tot) * Math.PI * 2 * k; ctx.beginPath(); ctx.arc(cx, cy, R, a0, a1); ctx.strokeStyle = c; ctx.lineWidth = 26; ctx.lineCap = 'butt'; ctx.stroke(); a0 = a1 + 0.0 })
  text(ctx, '21', cx, cy - 6, 30, 800, C.ink, 'center'); text(ctx, 'screenings', cx, cy + 20, 12.5, 600, C.sub, 'center')
  segs.forEach(([n, v, c], i) => { const ly = y1 + 128 + i * 40; box(ctx, dx + 196, ly - 7, 14, 14, 4, c); text(ctx, n, dx + 218, ly, 14.5, 600, C.slate); text(ctx, String(v), dx + dw - 24, ly, 15, 800, C.ink, 'right') })
  // age distribution
  const y2 = 662, hw = (W - 64 - SIDE - 20) / 2, hh = 320
  card(ctx, x0, y2, hw, hh)
  text(ctx, 'Patient Age Distribution', x0 + 24, y2 + 34, 18, 800, C.ink)
  const bx = x0 + 56, by = y2 + 80, bw = hw - 90, bh = 180
  for (let v = 0; v <= 12; v += 4) { const yy = by + bh - (v / 12) * bh; ctx.fillStyle = C.line; ctx.fillRect(bx, yy, bw, 1); text(ctx, String(v), bx - 12, yy, 12, 600, C.faint, 'right') }
  const kb = smooth(seg(s.now, DASH.scroll + 0.5, DASH.scroll + 1.5))
  AGES.forEach(([n, v], i) => {
    const slot = bw / AGES.length, w = slot * 0.5, x = bx + i * slot + (slot - w) / 2
    const val = n === '60+' ? v + 1 : v
    const hgt = (val / 12) * bh * kb
    box(ctx, x, by + bh - hgt, w, hgt, 8, n === '60+' ? '#14B8A6' : C.teal)
    text(ctx, n, x + w / 2, by + bh + 22, 13, 700, C.slate, 'center')
    if (kb > 0.6) text(ctx, String(val), x + w / 2, by + bh - hgt - 14, 13, 800, C.ink, 'center')
  })
  // field worker activity
  const fx = x0 + hw + 20
  card(ctx, fx, y2, hw, hh)
  text(ctx, 'Field Worker Activity', fx + 24, y2 + 34, 18, 800, C.ink)
  WORKERS.forEach(([ini, n, id, v], i) => {
    const y = y2 + 90 + i * 56
    const val = i === 0 ? v + 1 : v
    ctx.beginPath(); ctx.arc(fx + 46, y, 20, 0, Math.PI * 2); ctx.fillStyle = ['#CCFBF1', '#DBEAFE', '#FEF3C7', '#EDE9FE'][i]; ctx.fill()
    text(ctx, ini, fx + 46, y + 1, 13, 800, [C.tealInk, C.blue, C.amber, C.purple][i], 'center')
    text(ctx, n, fx + 80, y - 8, 15, 700, C.ink); text(ctx, id, fx + 80, y + 12, 12.5, 500, C.sub)
    box(ctx, fx + 260, y - 5, (hw - 380) * kb, 10, 5, C.slateSoft)
    box(ctx, fx + 260, y - 5, (hw - 380) * (val / 12) * kb, 10, 5, C.teal)
    text(ctx, `${val} screenings`, fx + hw - 24, y, 13.5, 700, C.slate, 'right')
  })
  // community activity
  const y3 = 1002, ch = 300
  card(ctx, x0, y3, W - 64 - SIDE, ch)
  text(ctx, 'Community Screening Activity', x0 + 24, y3 + 34, 18, 800, C.ink)
  text(ctx, 'Screenings by village', x0 + 24, y3 + 58, 13, 500, C.sub)
  const vx = x0 + 150, vw = W - 64 - SIDE - 220
  VILLAGES.forEach(([n, v], i) => {
    const y = y3 + 100 + i * 38
    const val = i === 0 ? v + 1 : v
    text(ctx, n, vx - 20, y, 14.5, 600, C.slate, 'right')
    box(ctx, vx, y - 12, vw * (val / 8) * kb, 24, 6, C.sky)
    if (i === 0 && kb > 0.9) {
      const tx = vx + vw * (val / 8) + 18
      ctx.save(); ctx.shadowColor = 'rgba(15,23,42,0.2)'; ctx.shadowBlur = 12; box(ctx, tx, y - 22, 190, 44, 10, C.card); ctx.restore()
      text(ctx, `${n}`, tx + 14, y - 7, 13, 800, C.ink); text(ctx, `Screenings: ${val}`, tx + 14, y + 11, 12.5, 600, C.sub)
    }
  })
  ctx.restore()
}
function cursorArrow(ctx: Ctx, x: number, y: number, click: number) {
  if (click > 0) { ctx.beginPath(); ctx.arc(x, y, 10 + (1 - click) * 22, 0, Math.PI * 2); ctx.fillStyle = `rgba(15,118,110,${0.35 * click})`; ctx.fill() }
  ctx.save(); ctx.translate(x, y)
  ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, 26); ctx.lineTo(7, 20); ctx.lineTo(12, 31); ctx.lineTo(17, 29); ctx.lineTo(12, 18); ctx.lineTo(21, 18); ctx.closePath()
  ctx.fillStyle = '#111827'; ctx.fill(); ctx.strokeStyle = '#FFFFFF'; ctx.lineWidth = 2; ctx.stroke()
  ctx.restore()
}

export function drawDashboard(ctx: Ctx, t: number, withCursor = true) {
  const s = stateAt(t)
  ctx.fillStyle = C.bg; ctx.fillRect(0, 0, W, H)
  ctx.save()
  ctx.globalAlpha = 1
  ctx.save(); ctx.beginPath(); ctx.rect(SIDE, 68, W - SIDE, H - 68); ctx.clip()
  ctx.translate(0, (1 - s.pageK) * 14); ctx.globalAlpha = s.pageK
  if (s.page === 0) overview(ctx, s)
  else if (s.page === 1) patients(ctx, s)
  else analytics(ctx, s)
  ctx.restore()
  ctx.globalAlpha = 1
  topbar(ctx)
  sidebar(ctx, s.page)
  if (withCursor) cursorArrow(ctx, s.cursor[0], s.cursor[1], s.click)
  ctx.restore()
}

/** hero monitor shown in front of the camera during the PHC chapter */
export function createDashboardMonitor() {
  const canvas = document.createElement('canvas'); canvas.width = W; canvas.height = H
  const ctx = canvas.getContext('2d')!
  const tex = new THREE.CanvasTexture(canvas); tex.colorSpace = THREE.SRGBColorSpace; tex.anisotropy = 8
  tex.minFilter = THREE.LinearMipmapLinearFilter
  const group = new THREE.Group()
  const SW = 2.5, SH = SW * H / W
  const bezel = new THREE.Mesh(new RoundedBoxGeometry(SW + 0.1, SH + 0.1, 0.07, 3, 0.03), new THREE.MeshStandardMaterial({ color: '#16191F', roughness: 0.35, metalness: 0.3 }))
  group.add(bezel)
  const screen = new THREE.Mesh(new THREE.PlaneGeometry(SW, SH), new THREE.MeshBasicMaterial({ map: tex, toneMapped: false, polygonOffset: true, polygonOffsetFactor: -4, polygonOffsetUnits: -4 }))
  screen.position.z = 0.06; group.add(screen)
  const neck = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.34, 0.05), new THREE.MeshStandardMaterial({ color: '#2A2F38', roughness: 0.4, metalness: 0.5 }))
  neck.position.set(0, -SH / 2 - 0.2, -0.06); group.add(neck)
  let lastDraw = -1
  return {
    group, size: { w: SW + 0.1, h: SH + 0.1 },
    render(t: number) {
      const q = Math.round(t * 30) / 30
      if (q === lastDraw) return
      lastDraw = q
      drawDashboard(ctx, t)
      tex.needsUpdate = true
    },
  }
}

/** still frame (end state of the Overview page) for the architecture diorama */
export function paintDashboardStill(target: HTMLCanvasElement, onReady?: () => void) {
  const full = document.createElement('canvas'); full.width = W; full.height = H
  const draw = () => {
    drawDashboard(full.getContext('2d')!, T.phc + DASH.toPatients - 1.2, false)
    const c = target.getContext('2d')!
    c.drawImage(full, 0, 0, target.width, target.height)
    onReady?.()
  }
  draw()
  if (!mark.complete) mark.addEventListener('load', draw, { once: true })
}

/** 0..1 visibility of the hero monitor */
export function monitorK(t: number) {
  const r = t - T.phc
  return Math.min(easeOut(clamp((r - DASH.in) / 0.8)), 1 - smooth(seg(r, DASH.out, DASH.out + 0.6)))
}
