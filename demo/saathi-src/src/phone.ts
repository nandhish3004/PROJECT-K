import * as THREE from 'three'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'
import logoUrl from '../../src/assets/saathi-logo.png'
import markUrl from '../../src/assets/saathi-mark.png'
import { FONT, clamp, easeOut, roundRect, seg, smooth } from './util'
import { T, STEPS_T, STEP_CLASS } from './timeline'
import { jointAngle, kneeAngle, romSoFar, shockAt, stepsDone, sway, POSTURE, POSTURE_DIFF, postureLive, ROM_T0, ROM_T1, STEP_PEAKS } from './signals'

/* ---------- palette (from the SAATHI Figma exports) ---------- */
const C = {
  primary: '#00685F', primaryDark: '#004F48', primaryMid: '#2F8981', primaryLight: '#D5F8F5', mint: '#99EFE5', mintSoft: '#E1FBF8',
  bg: '#F8F9FF', surface: '#FFFFFF', tint: '#EFF4FF', tint2: '#E4E9F4', ink: '#0E1A1A', secondary: '#5F6B6B', muted: '#8A9494',
  warning: '#B7791F', warningText: '#7A5A17', warningTint: '#FFF1D6', error: '#BA1B1B', errorTint: '#FFDAD6', info: '#2A5DA8', infoTint: '#DCE9FF', success: '#0F7A5A',
}

export const logoImg = new Image(); logoImg.src = logoUrl
export const markImg = new Image(); markImg.src = markUrl

export const SCREENS: [string, number, number][] = [
  ['login', T.app, 27.6], ['language', 27.6, 29], ['dashboard', 29, 31], ['intake', 31, 33.5], ['joint', 33.5, 35.5], ['questions', 35.5, T.camera],
  ['camRom', T.camera, T.posture], ['camPosture', T.posture, T.strap], ['placement', T.strap, 61.6], ['pairing', 61.6, 64.4], ['calibrate', 64.4, T.shock],
  ['assess', T.shock, T.result], ['analysis', T.result, 95.6], ['result', 95.6, T.nutrition], ['guidance', T.nutrition, 104], ['nutrition', 104, T.sync], ['report', T.sync, T.phc + 1.5],
]

const W = 360, H = 780, S = 1.5

/* ---------- drawing helpers ---------- */
type Ctx = CanvasRenderingContext2D
function txt(ctx: Ctx, s: string, x: number, y: number, size: number, weight = 400, color: string = C.ink, align: CanvasTextAlign = 'left') {
  ctx.font = `${weight} ${size}px ${FONT}`; ctx.fillStyle = color; ctx.textAlign = align; ctx.textBaseline = 'alphabetic'
  ctx.fillText(s, x, y)
}
function wrap(ctx: Ctx, s: string, x: number, y: number, maxW: number, size: number, weight: number, color: string, lh = 1.3) {
  ctx.font = `${weight} ${size}px ${FONT}`
  const words = s.split(' '); let line = ''; let yy = y
  for (const w of words) {
    const test = line ? line + ' ' + w : w
    if (ctx.measureText(test).width > maxW && line) { txt(ctx, line, x, yy, size, weight, color); line = w; yy += size * lh }
    else line = test
  }
  if (line) txt(ctx, line, x, yy, size, weight, color)
  return yy
}
function rr(ctx: Ctx, x: number, y: number, w: number, h: number, r: number, fill: string, stroke?: string, lw = 1.5) {
  roundRect(ctx, x, y, w, h, r)
  ctx.fillStyle = fill; ctx.fill()
  if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = lw; ctx.stroke() }
}
function card(ctx: Ctx, x: number, y: number, w: number, h: number, r = 16, fill = C.surface) {
  ctx.save(); ctx.shadowColor = 'rgba(16,30,54,0.10)'; ctx.shadowBlur = 14; ctx.shadowOffsetY = 4
  rr(ctx, x, y, w, h, r, fill); ctx.restore()
}
function button(ctx: Ctx, label: string, y: number, pressed: number, opts: { variant?: 'primary' | 'secondary'; x?: number; w?: number; h?: number } = {}) {
  const x = opts.x ?? 24, w = opts.w ?? 312, h = opts.h ?? 54
  const k = 1 - 0.035 * Math.sin(clamp(pressed) * Math.PI)
  ctx.save(); ctx.translate(x + w / 2, y + h / 2); ctx.scale(k, k); ctx.translate(-(x + w / 2), -(y + h / 2))
  if (opts.variant === 'secondary') rr(ctx, x, y, w, h, 16, C.surface, C.primary)
  else {
    ctx.shadowColor = 'rgba(0,104,95,0.30)'; ctx.shadowBlur = 16; ctx.shadowOffsetY = 6
    rr(ctx, x, y, w, h, 16, pressed > 0 ? C.primaryDark : C.primary)
    ctx.shadowColor = 'transparent'
  }
  txt(ctx, label, x + w / 2, y + h / 2 + 6, 16, 700, opts.variant === 'secondary' ? C.primary : '#FFFFFF', 'center')
  if (pressed > 0 && pressed < 1) { // ripple
    ctx.save(); roundRect(ctx, x, y, w, h, 16); ctx.clip()
    ctx.beginPath(); ctx.arc(x + w / 2, y + h / 2, pressed * w * 0.7, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(255,255,255,${0.35 * (1 - pressed)})`; ctx.fill(); ctx.restore()
  }
  ctx.restore()
}
function tap(ctx: Ctx, x: number, y: number, k: number) {
  if (k <= 0 || k >= 1) return
  ctx.beginPath(); ctx.arc(x, y, 10 + k * 26, 0, Math.PI * 2)
  ctx.fillStyle = `rgba(0,104,95,${0.25 * (1 - k)})`; ctx.fill()
  ctx.beginPath(); ctx.arc(x, y, 12, 0, Math.PI * 2); ctx.fillStyle = `rgba(14,26,26,${0.25 * (1 - k)})`; ctx.fill()
}
function check(ctx: Ctx, x: number, y: number, r: number, bg = C.primary, fg = '#fff') {
  ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fillStyle = bg; ctx.fill()
  ctx.strokeStyle = fg; ctx.lineWidth = r * 0.28; ctx.lineCap = 'round'; ctx.lineJoin = 'round'
  ctx.beginPath(); ctx.moveTo(x - r * 0.45, y); ctx.lineTo(x - r * 0.1, y + r * 0.38); ctx.lineTo(x + r * 0.5, y - r * 0.35); ctx.stroke()
}
function chip(ctx: Ctx, label: string, x: number, y: number, bg: string, fg: string, size = 12, align: 'left' | 'right' = 'left') {
  ctx.font = `700 ${size}px ${FONT}`
  const w = ctx.measureText(label).width + 22
  const xx = align === 'right' ? x - w : x
  rr(ctx, xx, y, w, size + 14, (size + 14) / 2, bg)
  txt(ctx, label, xx + 11, y + size + 6, size, 700, fg)
  return w
}
function progress(ctx: Ctx, x: number, y: number, w: number, p: number, h = 6, bg = C.tint2, fg = C.primary) {
  rr(ctx, x, y, w, h, h / 2, bg)
  if (p > 0) rr(ctx, x, y, Math.max(h, w * clamp(p)), h, h / 2, fg)
}
function field(ctx: Ctx, label: string, value: string, x: number, y: number, w: number, focus: boolean, t: number) {
  txt(ctx, label, x, y, 13, 600, C.secondary)
  rr(ctx, x, y + 8, w, 48, 12, C.surface, focus ? C.primary : C.tint2, focus ? 2 : 1.5)
  txt(ctx, value, x + 14, y + 39, 16, 500, C.ink)
  if (focus && Math.floor(t * 2.5) % 2 === 0) {
    ctx.font = `500 16px ${FONT}`
    const cx = x + 15 + ctx.measureText(value).width
    ctx.fillStyle = C.primary; ctx.fillRect(cx, y + 22, 2, 22)
  }
}
function statusBar(ctx: Ctx, dark = false) {
  const col = dark ? '#FFFFFF' : C.ink
  txt(ctx, '9:41', 28, 26, 14, 700, col)
  ctx.fillStyle = col
  for (let i = 0; i < 4; i++) ctx.fillRect(270 + i * 6, 22 - i * 3, 4, 4 + i * 3)
  roundRect(ctx, 302, 13, 26, 13, 4); ctx.strokeStyle = col; ctx.lineWidth = 1.5; ctx.stroke()
  ctx.fillRect(305, 16, 17, 7); ctx.fillRect(329, 17, 2, 5)
  // camera notch
  rr(ctx, 140, 10, 80, 22, 11, '#0B0B0B')
}

/* ---------- icons ---------- */
function bluetooth(ctx: Ctx, x: number, y: number, s: number, col = '#fff') {
  ctx.strokeStyle = col; ctx.lineWidth = s * 0.12; ctx.lineCap = 'round'; ctx.lineJoin = 'round'
  ctx.beginPath(); ctx.moveTo(x - s * 0.3, y - s * 0.25); ctx.lineTo(x + s * 0.3, y + s * 0.25); ctx.lineTo(x, y + s * 0.5); ctx.lineTo(x, y - s * 0.5); ctx.lineTo(x + s * 0.3, y - s * 0.25); ctx.lineTo(x - s * 0.3, y + s * 0.25); ctx.stroke()
}
function jointIcon(ctx: Ctx, kind: string, x: number, y: number, col: string) {
  ctx.strokeStyle = col; ctx.fillStyle = col; ctx.lineWidth = 4; ctx.lineCap = 'round'; ctx.lineJoin = 'round'
  ctx.beginPath()
  if (kind === 'knee') { ctx.moveTo(x - 6, y - 18); ctx.lineTo(x + 2, y); ctx.lineTo(x - 4, y + 18); ctx.stroke(); ctx.beginPath(); ctx.arc(x + 2, y, 6, 0, Math.PI * 2); ctx.fill() }
  else if (kind === 'hip') { ctx.arc(x, y - 4, 14, Math.PI * 0.1, Math.PI * 0.9); ctx.stroke(); ctx.beginPath(); ctx.arc(x - 9, y + 6, 4.5, 0, Math.PI * 2); ctx.arc(x + 9, y + 6, 4.5, 0, Math.PI * 2); ctx.fill() }
  else if (kind === 'hand') { rr(ctx, x - 9, y - 2, 18, 18, 6, col); for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.moveTo(x - 7 + i * 4.6, y - 2); ctx.lineTo(x - 7 + i * 4.6, y - 14 + Math.abs(i - 1.5) * 2); ctx.lineWidth = 3.4; ctx.stroke() } }
  else { for (let i = 0; i < 5; i++) rr(ctx, x - 7 + (i % 2) * 1.5, y - 20 + i * 8.5, 14, 6.5, 3, col) }
}
function speaker(ctx: Ctx, x: number, y: number, col: string) {
  ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(x, y - 3); ctx.lineTo(x + 4, y - 3); ctx.lineTo(x + 9, y - 7); ctx.lineTo(x + 9, y + 7); ctx.lineTo(x + 4, y + 3); ctx.lineTo(x, y + 3); ctx.fill()
  ctx.strokeStyle = col; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.arc(x + 10, y, 5, -0.9, 0.9); ctx.stroke(); ctx.beginPath(); ctx.arc(x + 10, y, 9, -0.9, 0.9); ctx.stroke()
}

/* ---------- screens (modelled on the deployed SAATHI app, v2.4) ---------- */
type Draw = (ctx: Ctx, p: number, t: number, d: number) => void

/** app top bar: back arrow, SAATHI mark, title, status pill, avatar */
function topBar(ctx: Ctx, title: string, pillText?: string, pillBg: string = C.mint, pillFg: string = C.primaryDark, back = true) {
  ctx.fillStyle = C.surface; ctx.fillRect(0, 0, W, 104)
  let x = 22
  if (back) {
    ctx.strokeStyle = C.ink; ctx.lineWidth = 2.2; ctx.lineCap = 'round'; ctx.lineJoin = 'round'
    ctx.beginPath(); ctx.moveTo(32, 64); ctx.lineTo(24, 72); ctx.lineTo(32, 80); ctx.moveTo(24, 72); ctx.lineTo(40, 72); ctx.stroke()
    x = 50
  }
  if (markImg.complete) ctx.drawImage(markImg, x, 58, 30, 24)
  ctx.font = `800 11px ${FONT}`
  const room = (pillText ? 300 - ctx.measureText(pillText).width - 34 : 304) - (x + 38)
  let fs = 16.5; ctx.font = `800 ${fs}px ${FONT}`
  while (fs > 11 && ctx.measureText(title).width > room) { fs -= 0.5; ctx.font = `800 ${fs}px ${FONT}` }
  txt(ctx, title, x + 38, 78, fs, 800, C.ink)
  if (pillText) chip(ctx, pillText, 300, 59, pillBg, pillFg, 11, 'right')
  ctx.beginPath(); ctx.arc(326, 72, 15, 0, Math.PI * 2); ctx.fillStyle = C.primary; ctx.fill()
  ctx.beginPath(); ctx.arc(326, 68, 4.5, 0, Math.PI * 2); ctx.strokeStyle = '#fff'; ctx.lineWidth = 1.8; ctx.stroke()
  ctx.beginPath(); ctx.arc(326, 81, 7, Math.PI * 1.15, Math.PI * 1.85); ctx.stroke()
  ctx.fillStyle = C.tint2; ctx.fillRect(0, 104, W, 1)
}
function stepHead(ctx: Ctx, step: number, total: number, label: string, y = 130) {
  txt(ctx, `STEP ${step} OF ${total}`, 24, y, 12, 800, C.primary)
  txt(ctx, label, 336, y, 11.5, 500, C.secondary, 'right')
  progress(ctx, 24, y + 10, 312, step / total, 5, C.tint2, C.primary)
}
function bottomNav(ctx: Ctx, active: number) {
  ctx.save(); ctx.shadowColor = 'rgba(16,30,54,0.08)'; ctx.shadowBlur = 12; ctx.fillStyle = '#fff'; ctx.fillRect(0, 712, W, 68); ctx.restore()
  ;['Home', 'Patients', 'Reports', 'Awareness', 'More'].forEach((l, i) => {
    const x = 36 + i * 72
    if (i === active) rr(ctx, x - 30, 718, 60, 52, 12, C.mintSoft)
    rr(ctx, x - 8, 726, 16, 15, 4, i === active ? C.primaryDark : C.muted)
    txt(ctx, l, x, 760, 10.5, 700, i === active ? C.primaryDark : C.secondary, 'center')
  })
}
function rowItem(ctx: Ctx, y: number, title: string, iconCol: string, right?: string) {
  card(ctx, 16, y, 328, 62, 14)
  rr(ctx, 30, y + 13, 36, 36, 10, C.tint)
  rr(ctx, 41, y + 24, 14, 14, 3, iconCol)
  txt(ctx, title, 80, y + 37, 15.5, 800)
  if (right) chip(ctx, right, 312, y + 18, C.tint, C.secondary, 10.5, 'right')
  ctx.strokeStyle = C.secondary; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(322, y + 26); ctx.lineTo(328, y + 31); ctx.lineTo(322, y + 36); ctx.stroke()
}

const login: Draw = (ctx, p, t) => {
  ctx.fillStyle = C.bg; ctx.fillRect(0, 0, W, H)
  const g = ctx.createRadialGradient(180, 170, 10, 180, 170, 220); g.addColorStop(0, 'rgba(153,239,229,0.45)'); g.addColorStop(1, 'rgba(153,239,229,0)')
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, 420)
  rr(ctx, 22, 50, 146, 28, 14, C.surface)
  ctx.beginPath(); ctx.arc(38, 64, 4, 0, Math.PI * 2); ctx.fillStyle = C.success; ctx.fill()
  txt(ctx, 'Field mode active', 48, 69, 11.5, 700, C.ink)
  rr(ctx, 236, 50, 102, 28, 14, C.mintSoft); txt(ctx, 'Offline ready', 287, 69, 11.5, 700, C.primaryDark, 'center')
  card(ctx, 100, 96, 160, 160, 30)
  if (logoImg.complete) ctx.drawImage(logoImg, 106, 102, 148, 148)
  card(ctx, 20, 282, 320, 352, 22)
  txt(ctx, 'Field Worker Sign In', 40, 318, 18, 800)
  txt(ctx, 'Enter credentials to access screening intake', 40, 340, 12, 500, C.secondary)
  chip(ctx, 'OFFLINE AUTH', 322, 300, C.mint, C.primaryDark, 9.5, 'right')
  const id = 'ASHA-2041'.slice(0, Math.floor(seg(p, 0.05, 0.35) * 9))
  field(ctx, 'Worker ID / Username', id, 40, 370, 280, p < 0.38, t)
  txt(ctx, '4-Digit Security PIN', 40, 452, 13, 600, C.secondary)
  const n = Math.floor(seg(p, 0.4, 0.68) * 4.01)
  rr(ctx, 40, 460, 280, 48, 12, C.tint, p >= 0.38 && p < 0.72 ? C.primary : undefined, 2)
  for (let i = 0; i < n; i++) { ctx.beginPath(); ctx.arc(62 + i * 20, 484, 5, 0, Math.PI * 2); ctx.fillStyle = C.ink; ctx.fill() }
  rr(ctx, 40, 524, 18, 18, 5, C.primary); check(ctx, 49, 533, 7, C.primary)
  txt(ctx, 'Remember device', 66, 538, 12.5, 600, C.ink)
  txt(ctx, 'Offline Recovery', 320, 538, 12.5, 700, C.primary, 'right')
  button(ctx, 'Sign In & Enter Field Intake  →', 562, seg(p, 0.78, 0.95), { x: 40, w: 280, h: 50 })
  txt(ctx, 'v2.4 Preview · Screening support only · Offline secure', 180, 668, 11, 500, C.secondary, 'center')
  txt(ctx, 'SAATHI does not diagnose osteoarthritis.', 180, 690, 11, 600, C.muted, 'center')
}

const LANGS = [['English', 'English'], ['हिन्दी', 'Hindi'], ['தமிழ்', 'Tamil'], ['বাংলা', 'Bengali'], ['অসমীয়া', 'Assamese'], ['ꯃꯩꯇꯩꯂꯣꯟ', 'Manipuri']]
const language: Draw = (ctx, p) => {
  ctx.fillStyle = C.bg; ctx.fillRect(0, 0, W, H)
  if (markImg.complete) ctx.drawImage(markImg, 22, 52, 36, 29)
  txt(ctx, 'SAATHI', 66, 66, 17, 800, C.primaryDark)
  txt(ctx, 'CARE COMPANION', 66, 82, 9.5, 800, C.secondary)
  chip(ctx, '● Step 1 of 2', 338, 56, C.tint, C.ink, 11, 'right')
  txt(ctx, 'Select Language', 20, 132, 24, 800)
  txt(ctx, 'Choose your preferred language to continue', 20, 156, 13, 500, C.secondary)
  const sel = 0 // the app is shown in English throughout
  LANGS.forEach(([n, e], i) => {
    const y = 176 + i * 74
    const on = i === sel
    card(ctx, 20, y, 320, 64, 14, on ? C.mintSoft : C.surface)
    if (on) { roundRect(ctx, 20, y, 320, 64, 14); ctx.strokeStyle = C.primary; ctx.lineWidth = 2; ctx.stroke() }
    rr(ctx, 36, y + 14, 36, 36, 10, on ? C.mint : C.tint)
    txt(ctx, n, 86, y + 30, 16, 800, C.ink)
    txt(ctx, e, 86, y + 49, 11.5, 500, C.secondary)
    if (on) check(ctx, 314, y + 32, 12)
    else { ctx.beginPath(); ctx.arc(314, y + 32, 11, 0, Math.PI * 2); ctx.strokeStyle = C.mint; ctx.lineWidth = 2; ctx.stroke() }
  })
  tap(ctx, 250, 208, seg(p, 0.38, 0.6))
  rr(ctx, 20, 630, 320, 40, 12, C.tint)
  speaker(ctx, 36, 650, C.primary)
  txt(ctx, 'Voice guidance in every language', 62, 655, 12, 600, C.ink)
  button(ctx, 'Continue  →', 690, seg(p, 0.82, 0.97), { x: 20, w: 320 })
}

const dashboard: Draw = (ctx, p) => {
  ctx.fillStyle = C.bg; ctx.fillRect(0, 0, W, H)
  if (markImg.complete) ctx.drawImage(markImg, 20, 54, 32, 26)
  txt(ctx, 'SAATHI', 60, 74, 18, 800, C.ink)
  rr(ctx, 210, 56, 82, 30, 15, C.surface)
  ctx.beginPath(); ctx.arc(226, 71, 4, 0, Math.PI * 2); ctx.fillStyle = C.success; ctx.fill()
  txt(ctx, 'Synced', 236, 76, 13, 600, C.ink)
  ctx.beginPath(); ctx.arc(320, 71, 16, 0, Math.PI * 2); ctx.fillStyle = C.primary; ctx.fill()
  txt(ctx, 'S', 320, 77, 15, 800, '#fff', 'center')
  txt(ctx, 'Good morning, Sunita', 16, 128, 24, 800)
  txt(ctx, "Here's what's waiting for you today.", 16, 152, 13.5, 500, C.secondary)
  const press = seg(p, 0.72, 0.9)
  ctx.save()
  const sc = 1 - 0.03 * Math.sin(press * Math.PI)
  ctx.translate(180, 216); ctx.scale(sc, sc); ctx.translate(-180, -216)
  ctx.shadowColor = 'rgba(0,104,95,0.35)'; ctx.shadowBlur = 18; ctx.shadowOffsetY = 8
  rr(ctx, 16, 172, 328, 92, 18, C.primary); ctx.shadowColor = 'transparent'
  rr(ctx, 32, 192, 50, 50, 12, 'rgba(255,255,255,0.16)')
  ctx.strokeStyle = '#fff'; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.arc(54, 211, 7, 0, Math.PI * 2); ctx.moveTo(42, 232); ctx.quadraticCurveTo(54, 218, 66, 232); ctx.moveTo(68, 212); ctx.lineTo(76, 212); ctx.moveTo(72, 208); ctx.lineTo(72, 216); ctx.stroke()
  txt(ctx, 'New Patient', 98, 210, 20, 800, '#fff')
  txt(ctx, 'Start rapid osteoarthritis screening', 98, 232, 12, 500, C.mint)
  ctx.beginPath(); ctx.arc(318, 218, 14, 0, Math.PI * 2); ctx.fillStyle = 'rgba(255,255,255,0.2)'; ctx.fill()
  ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(311, 218); ctx.lineTo(325, 218); ctx.moveTo(320, 213); ctx.lineTo(325, 218); ctx.lineTo(320, 223); ctx.stroke()
  ctx.restore()
  tap(ctx, 200, 218, press)
  const k = easeOut(seg(p, 0, 0.5))
  ;([['Patients', C.primary], ['View Reports', C.info], ['Health Awareness', C.success], ['Analytics Dashboard', C.primaryMid], ['Sync Data', C.primary]] as [string, string][]).forEach(([l, c], i) => {
    ctx.globalAlpha = smooth(seg(k, i * 0.12, i * 0.12 + 0.5))
    rowItem(ctx, 280 + i * 76, l, c, i === 4 ? 'Up to date' : undefined)
  })
  ctx.globalAlpha = 1
  txt(ctx, 'Works fully offline · syncs when network returns', 180, 680, 11, 500, C.muted, 'center')
  bottomNav(ctx, 0)
}

const intake: Draw = (ctx, p, t) => {
  ctx.fillStyle = C.bg; ctx.fillRect(0, 0, W, H)
  topBar(ctx, 'Screening Intake', 'Saved', C.surface, C.ink)
  const s3 = p > 0.52
  stepHead(ctx, s3 ? 3 : 1, 3, s3 ? 'Health background' : 'Demographics & Intake')
  txt(ctx, 'Frontline Triage Intake', 24, 182, 21, 800)
  txt(ctx, 'New patient · will get an ID on save', 24, 202, 12.5, 500, C.secondary)
  chip(ctx, 'Ready', 336, 168, C.mint, C.primaryDark, 10.5, 'right')
  if (!s3) {
    const name = 'Tashi Bhutia'.slice(0, Math.floor(seg(p, 0.03, 0.25) * 12))
    field(ctx, 'Full Name *', name, 24, 230, 312, p < 0.27, t)
    field(ctx, 'Age (Yrs) *', '68'.slice(0, Math.floor(seg(p, 0.28, 0.36) * 2)), 24, 310, 146, p >= 0.27 && p < 0.38, t)
    field(ctx, 'Mobile (optional)', '', 190, 310, 146, false, t)
    txt(ctx, 'Gender *', 24, 392, 13, 600, C.secondary)
    rr(ctx, 24, 400, 312, 48, 14, C.tint)
    ;['Male', 'Female', 'Other'].forEach((s, i) => {
      const on = i === 0 && p > 0.42
      if (on) rr(ctx, 28 + i * 103, 404, 100, 40, 11, C.surface)
      txt(ctx, s, 78 + i * 103, 430, 13.5, on ? 800 : 600, on ? C.primaryDark : C.secondary, 'center')
    })
    tap(ctx, 78, 424, seg(p, 0.38, 0.5))
    rr(ctx, 24, 466, 312, 48, 12, C.mintSoft)
    txt(ctx, 'Village: Lingdok · PHC Rongli', 40, 495, 13, 700, C.primaryDark)
    button(ctx, 'Next: Location  →', 700, seg(p, 0.44, 0.52))
  } else {
    field(ctx, 'Height (cm) *', '162', 24, 230, 146, false, t)
    field(ctx, 'Weight (kg) *', '58', 190, 230, 146, false, t)
    txt(ctx, 'Occupation & Physical Load *', 24, 316, 13, 600, C.secondary)
    const occ = ['Farm work', 'Household work', 'Carrying loads', 'Weaving / craft', 'Retired']
    let x = 24, y = 326
    occ.forEach((o, i) => {
      ctx.font = `700 12px ${FONT}`; const w = ctx.measureText(o).width + 26
      if (x + w > 336) { x = 24; y += 40 }
      const on = i === 0 && p > 0.62
      rr(ctx, x, y, w, 32, 16, on ? C.primary : C.surface, on ? undefined : C.tint2)
      txt(ctx, o, x + w / 2, y + 21, 12, 700, on ? '#fff' : C.ink, 'center')
      x += w + 8
    })
    ;[['Previous Joint Issues', 0], ['Family history of joint problems', 1]].forEach(([l, i]) => {
      const yy = 430 + (i as number) * 74
      card(ctx, 24, yy, 312, 62, 14)
      txt(ctx, l as string, 38, yy + 36, 13, 700)
      ;['Yes', 'No'].forEach((o, j) => { const on = (i === 0 ? j === 0 : j === 1) && p > 0.72; rr(ctx, 236 + j * 48, yy + 16, 42, 30, 10, on ? C.primary : C.tint); txt(ctx, o, 257 + j * 48, yy + 36, 12, 700, on ? '#fff' : C.secondary, 'center') })
    })
    button(ctx, 'Save patient', 700, seg(p, 0.86, 0.98))
  }
  txt(ctx, 'Stored locally on this device', 180, 772, 10.5, 500, C.muted, 'center')
}

const JOINTS: [string, string, string][] = [['knee', 'Knee', 'Knee pain, grinding or morning stiffness'], ['hip', 'Hip', 'Groin or thigh pain, difficulty squatting'], ['hand', 'Hand', 'Finger nodes, thumb base pain'], ['spine', 'Spine', 'Lower back pain on bending']]
const joint: Draw = (ctx, p) => {
  ctx.fillStyle = C.bg; ctx.fillRect(0, 0, W, H)
  topBar(ctx, 'Screening Intake', 'Saved', C.surface, C.ink)
  stepHead(ctx, 1, 7, 'Joint selection')
  txt(ctx, 'Select Joint to Assess', 24, 182, 21, 800)
  txt(ctx, 'Screening for Tashi Bhutia. Choose the joint with the most trouble.', 24, 202, 11.5, 500, C.secondary)
  JOINTS.forEach(([id, l, h], i) => {
    const y = 220 + i * 88
    const on = i === 0 && p > 0.25
    card(ctx, 24, y, 312, 78, 16, on ? C.mintSoft : C.surface)
    if (on) { roundRect(ctx, 24, y, 312, 78, 16); ctx.strokeStyle = C.primary; ctx.lineWidth = 2.2; ctx.stroke() }
    rr(ctx, 38, y + 15, 48, 48, 12, on ? C.mint : C.tint)
    jointIcon(ctx, id, 62, y + 39, on ? C.primaryDark : C.primary)
    txt(ctx, l, 100, y + 32, 16, 800)
    if (i === 0) chip(ctx, on ? 'SELECTED' : 'Most common', 322, y + 12, on ? C.primary : C.mint, on ? '#fff' : C.primaryDark, 9.5, 'right')
    txt(ctx, h, 100, y + 52, 11, 500, C.secondary)
    txt(ctx, '✓ Movement test available', 100, y + 68, 10, 700, C.success)
  })
  tap(ctx, 180, 258, seg(p, 0.18, 0.38))
  txt(ctx, 'Which side?', 24, 590, 13, 700, C.secondary)
  rr(ctx, 24, 600, 312, 46, 14, C.tint)
  ;['Left', 'Right', 'Both'].forEach((s, i) => { const on = i === 1 && p > 0.55; if (on) rr(ctx, 28 + i * 103, 604, 100, 38, 11, C.primary); txt(ctx, s, 78 + i * 103, 629, 13.5, 700, on ? '#fff' : C.secondary, 'center') })
  tap(ctx, 180, 623, seg(p, 0.48, 0.66))
  rr(ctx, 24, 656, 312, 34, 10, C.mintSoft)
  txt(ctx, p > 0.55 ? 'Selected: Right knee' : 'No selection', 40, 678, 12, 700, C.primaryDark)
  button(ctx, 'Next: Clinical Assessment', 702, seg(p, 0.85, 0.98), { h: 50 })
}

const QOPTS = ['No stiffness', 'Less than 30 minutes', 'More than 30 minutes']
const questions: Draw = (ctx, p) => {
  ctx.fillStyle = C.bg; ctx.fillRect(0, 0, W, H)
  topBar(ctx, 'Symptom Assessment', 'Saved', C.surface, C.ink)
  const q = p < 0.3 ? 1 : p < 0.55 ? 2 : 3
  stepHead(ctx, 2, 7, `${Math.round(((q - 1) / 8) * 100)}% done`)
  chip(ctx, 'Triage protocol · Right knee', 24, 160, C.tint, C.ink, 10.5)
  txt(ctx, `Q ${q} / 8`, 336, 178, 12, 800, C.primary, 'right')
  rr(ctx, 276, 196, 60, 30, 15, C.surface, C.tint2); speaker(ctx, 290, 211, C.primary)
  const texts = ['Does the joint hurt during walking, climbing or daily activity?', 'Does the joint hurt at rest or at night?', 'Is the joint stiff in the morning or after sitting for a while?']
  wrap(ctx, `${q}. ${texts[q - 1]}`, 24, 250, 312, 19, 800, C.ink, 1.3)
  if (q === 3) {
    rr(ctx, 24, 318, 312, 50, 12, C.infoTint)
    wrap(ctx, 'Stiffness that eases within 30 minutes of moving is common.', 40, 338, 280, 11.5, 600, C.info, 1.35)
  }
  const opts = q === 3 ? QOPTS : ['Never', 'Sometimes', 'Often', 'Almost every day']
  const sel = q === 3 ? (p > 0.75 ? 1 : -1) : q === 1 ? (p > 0.15 ? 1 : -1) : (p > 0.42 ? 0 : -1)
  opts.forEach((o, i) => {
    const y = 384 + i * 64
    const on = i === sel
    card(ctx, 24, y, 312, 54, 14, on ? C.mintSoft : C.surface)
    if (on) { roundRect(ctx, 24, y, 312, 54, 14); ctx.strokeStyle = C.primary; ctx.lineWidth = 2; ctx.stroke() }
    ctx.beginPath(); ctx.arc(48, y + 27, 9, 0, Math.PI * 2); ctx.strokeStyle = on ? C.primary : C.muted; ctx.lineWidth = 2; ctx.stroke()
    if (on) { ctx.beginPath(); ctx.arc(48, y + 27, 5, 0, Math.PI * 2); ctx.fillStyle = C.primary; ctx.fill() }
    txt(ctx, o, 68, y + 32, 14, 700, on ? C.primaryDark : C.ink)
  })
  card(ctx, 24, 640, 312, 44, 12, C.tint)
  txt(ctx, `${q - 1 + (sel >= 0 ? 1 : 0)} of 8 answered · risk is estimated after the movement tests`, 180, 667, 10.5, 600, C.secondary, 'center')
  button(ctx, 'Back', 704, 0, { x: 24, w: 100, h: 48, variant: 'secondary' })
  button(ctx, q === 3 && p > 0.85 ? 'Next: Movement' : 'Next Question', 704, seg(p, 0.88, 0.98), { x: 134, w: 202, h: 48 })
}

/* ---- camera tests (MediaPipe Pose) — phases follow the app's CameraCheck screen ---- */
type CamPhase = 'setup' | 'ready' | 'intro' | 'rec' | 'result' | 'next'
function camPhase(t: number, test: 1 | 2): { ph: CamPhase; k: number } {
  if (test === 1) {
    if (t < T.camera + 1.3) return { ph: 'setup', k: 0 }
    if (t < T.camera + 1.85) return { ph: 'ready', k: 0 }
    if (t < ROM_T0) return { ph: 'intro', k: 0 }
    if (t < ROM_T1) return { ph: 'rec', k: (t - ROM_T0) / (ROM_T1 - ROM_T0) }
    if (t < T.posture - 0.45) return { ph: 'result', k: 1 }
    return { ph: 'next', k: 1 }
  }
  if (t < T.posture + 0.9) return { ph: 'setup', k: 0 }
  if (t < POSTURE.t0 - 0.5) return { ph: 'ready', k: 0 }
  if (t < POSTURE.t0) return { ph: 'intro', k: 0 }
  if (t < POSTURE.t1) return { ph: 'rec', k: (t - POSTURE.t0) / (POSTURE.t1 - POSTURE.t0) }
  return { ph: 'result', k: 1 }
}
type Pt = readonly [number, number]
function angleMark(ctx: Ctx, hip: Pt, knee: Pt, ank: Pt, label: string, side: -1 | 1) {
  ctx.strokeStyle = '#FFD166'; ctx.lineWidth = 4
  ctx.beginPath(); ctx.moveTo(hip[0], hip[1]); ctx.lineTo(knee[0], knee[1]); ctx.lineTo(ank[0], ank[1]); ctx.stroke()
  for (const pt of [hip, knee, ank]) { ctx.beginPath(); ctx.arc(pt[0], pt[1], 5.5, 0, Math.PI * 2); ctx.fillStyle = '#FFD166'; ctx.fill(); ctx.strokeStyle = '#7A5A17'; ctx.lineWidth = 1.5; ctx.stroke() }
  ctx.font = `800 11px ${FONT}`; const w = ctx.measureText(label).width + 12
  const lx = side < 0 ? knee[0] - 12 - w : knee[0] + 12
  rr(ctx, lx, knee[1] - 10, w, 20, 6, 'rgba(14,26,26,0.82)')
  txt(ctx, label, lx + 6, knee[1] + 4, 11, 800, '#FFD166')
}
/** Test 1 camera image: the patient seated SIDE-ON (his right side to the lens, facing right in the image) */
function camFeedSide(ctx: Ctx, x: number, y: number, w: number, h: number, t: number, tracking: boolean) {
  ctx.save(); roundRect(ctx, x, y, w, h, 18); ctx.clip()
  const g = ctx.createLinearGradient(0, y, 0, y + h); g.addColorStop(0, '#9C8A74'); g.addColorStop(0.66, '#B9A88F'); g.addColorStop(0.67, '#8E8D88'); g.addColorStop(1, '#6E6D69')
  ctx.fillStyle = g; ctx.fillRect(x, y, w, h)
  ctx.fillStyle = 'rgba(80,50,30,0.35)'; for (let i = 0; i < 5; i++) ctx.fillRect(x, y + 40 + i * 50, w, 6)
  rr(ctx, x + w - 70, y + 60, 56, 104, 4, '#2E86DE'); rr(ctx, x + w - 64, y + 66, 44, 92, 3, '#5A341B')
  const cx = x + w * 0.38, base = y + h * 0.95
  ctx.lineCap = 'round'; ctx.lineJoin = 'round'
  // chair in profile: backrest on the left, seat, two visible legs
  ctx.fillStyle = '#8B5A2B'
  ctx.fillRect(cx - 58, base - 262, 9, 262); ctx.fillRect(cx + 40, base - 128, 9, 128)
  rr(ctx, cx - 60, base - 134, 112, 13, 4, '#8B5A2B'); rr(ctx, cx - 62, base - 252, 13, 70, 4, '#3FB8A8')
  rr(ctx, cx - 56, base - 140, 104, 8, 3, '#E84C8B')
  const P = (px: number, py: number) => [cx + px, base + py] as const
  const a = kneeAngle(t) * Math.PI / 180
  const hip = P(-18, -150), knee = P(66, -146)
  const ank = [knee[0] + 80 * Math.sin(a), knee[1] + 80 * Math.cos(a)] as const
  const toe = [ank[0] + 20 * Math.cos(a), ank[1] - 20 * Math.sin(a)] as const
  // far (left) leg, hanging still behind
  const kneeF = P(60, -142), ankF = P(62, -62)
  ctx.strokeStyle = '#2E3A48'; ctx.lineWidth = 24; ctx.beginPath(); ctx.moveTo(hip[0], hip[1]); ctx.lineTo(hip[0] + (kneeF[0] - hip[0]) * 0.72, kneeF[1] - 2); ctx.stroke()
  ctx.strokeStyle = '#A97F5A'; ctx.lineWidth = 14; ctx.beginPath(); ctx.moveTo(hip[0] + (kneeF[0] - hip[0]) * 0.72, kneeF[1] - 2); ctx.lineTo(kneeF[0], kneeF[1]); ctx.lineTo(ankF[0], ankF[1]); ctx.stroke()
  ctx.strokeStyle = '#1E1E1E'; ctx.lineWidth = 10; ctx.beginPath(); ctx.moveTo(ankF[0], ankF[1] + 2); ctx.lineTo(ankF[0] + 20, ankF[1] + 2); ctx.stroke()
  // torso: shirt with the sleeveless jacket over it (front edge of the shirt shows on the right)
  const sho = P(-22, -262), head = P(-14, -302)
  ctx.strokeStyle = '#E9E3D6'; ctx.lineWidth = 46; ctx.beginPath(); ctx.moveTo(sho[0], sho[1] + 6); ctx.lineTo(hip[0], hip[1] - 4); ctx.stroke()
  ctx.strokeStyle = '#2F4A3A'; ctx.lineWidth = 38; ctx.beginPath(); ctx.moveTo(sho[0] - 5, sho[1] + 8); ctx.lineTo(hip[0] - 5, hip[1] - 6); ctx.stroke()
  // near (right) leg: shorts to just above the knee, bare shin
  const mid = [hip[0] + (knee[0] - hip[0]) * 0.72, hip[1] + (knee[1] - hip[1]) * 0.72] as const
  ctx.strokeStyle = '#3E4B5C'; ctx.lineWidth = 26; ctx.beginPath(); ctx.moveTo(hip[0], hip[1]); ctx.lineTo(mid[0], mid[1]); ctx.stroke()
  ctx.strokeStyle = '#C99B70'; ctx.lineWidth = 15; ctx.beginPath(); ctx.moveTo(mid[0], mid[1]); ctx.lineTo(knee[0], knee[1]); ctx.lineTo(ank[0], ank[1]); ctx.stroke()
  ctx.strokeStyle = '#2B2B2B'; ctx.lineWidth = 11; ctx.beginPath(); ctx.moveTo(ank[0], ank[1]); ctx.lineTo(toe[0], toe[1]); ctx.stroke()
  // near arm resting on the thigh
  const elb = P(-8, -196), hand = P(30, -164)
  ctx.strokeStyle = '#E9E3D6'; ctx.lineWidth = 14; ctx.beginPath(); ctx.moveTo(sho[0], sho[1]); ctx.lineTo(elb[0], elb[1]); ctx.stroke()
  ctx.strokeStyle = '#C99B70'; ctx.lineWidth = 12; ctx.beginPath(); ctx.moveTo(elb[0], elb[1]); ctx.lineTo(hand[0], hand[1]); ctx.stroke()
  // head in profile (facing right): cap, nose, white moustache
  ctx.beginPath(); ctx.arc(head[0], head[1], 20, 0, Math.PI * 2); ctx.fillStyle = '#C99B70'; ctx.fill()
  ctx.beginPath(); ctx.moveTo(head[0] + 18, head[1] - 4); ctx.lineTo(head[0] + 25, head[1] + 4); ctx.lineTo(head[0] + 18, head[1] + 6); ctx.fill()
  ctx.fillStyle = '#F2F2F2'; ctx.fillRect(head[0] + 10, head[1] + 8, 12, 4)
  ctx.beginPath(); ctx.arc(head[0], head[1] - 5, 21, Math.PI * 1.02, Math.PI * 1.98); ctx.fillStyle = '#5B3A6B'; ctx.fill()
  ctx.fillStyle = '#3A2747'; ctx.fillRect(head[0] - 21, head[1] - 9, 42, 5)
  if (tracking) {
    const bones: [Pt, Pt][] = [[sho, elb], [elb, hand], [sho, hip], [hip, knee], [knee, ank], [ank, toe]]
    ctx.strokeStyle = 'rgba(255,255,255,0.85)'; ctx.lineWidth = 2.5
    for (const [p0, p1] of bones) { ctx.beginPath(); ctx.moveTo(p0[0], p0[1]); ctx.lineTo(p1[0], p1[1]); ctx.stroke() }
    for (const pt of [sho, elb, hand, head, toe]) { ctx.beginPath(); ctx.arc(pt[0], pt[1], 4, 0, Math.PI * 2); ctx.fillStyle = '#7CFFE9'; ctx.fill() }
    angleMark(ctx, hip, knee, ank, `${Math.round(jointAngle(t))}°`, 1)
  }
  ctx.restore()
}
function camFeed(ctx: Ctx, x: number, y: number, w: number, h: number, t: number, standing: boolean, tracking: boolean) {
  if (!standing) return camFeedSide(ctx, x, y, w, h, t, tracking)
  ctx.save(); roundRect(ctx, x, y, w, h, 18); ctx.clip()
  // camera image: house wall + slate courtyard
  const g = ctx.createLinearGradient(0, y, 0, y + h); g.addColorStop(0, '#9C8A74'); g.addColorStop(0.62, '#B9A88F'); g.addColorStop(0.63, '#8E8D88'); g.addColorStop(1, '#6E6D69')
  ctx.fillStyle = g; ctx.fillRect(x, y, w, h)
  ctx.fillStyle = 'rgba(80,50,30,0.35)'; for (let i = 0; i < 5; i++) ctx.fillRect(x, y + 40 + i * 50, w, 6)
  rr(ctx, x + w * 0.7, y + 40, 60, 110, 4, '#2E86DE'); rr(ctx, x + w * 0.7 + 6, y + 46, 48, 98, 3, '#5A341B')
  // patient, front view (rear camera: the patient's right side appears on the left of the image)
  const cx = x + w * 0.45, base = y + h * 0.92
  const sw = standing ? sway(t) * 900 : 0
  const P = (px: number, py: number) => [cx + px + sw * (-py / 300), base + py] as const
  ctx.lineCap = 'round'; ctx.lineJoin = 'round'
  let hipR: Pt, hipL: Pt, kneeR: Pt, ankR: Pt, kneeL: Pt, ankL: Pt
  const sh = standing ? -272 : -208
  if (standing) {
    hipR = P(-17, -150); hipL = P(17, -150)
    kneeR = P(-21, -81); ankR = P(-20, -10); kneeL = P(18, -80); ankL = P(19, -10)
  } else {
    // seated: thighs come toward the camera (foreshortened); the right shin swings up as the knee straightens
    const a = kneeAngle(t) * Math.PI / 180
    rr(ctx, cx - 54, base - 124, 108, 14, 4, '#8B5A2B'); ctx.fillStyle = '#8B5A2B'; ctx.fillRect(cx - 50, base - 112, 8, 104); ctx.fillRect(cx + 42, base - 112, 8, 104)
    rr(ctx, cx - 46, base - 222, 92, 34, 5, '#8B5A2B')
    hipR = P(-17, -120); hipL = P(17, -120)
    kneeR = P(-24, -96); kneeL = P(24, -96); ankL = P(24, -22)
    ankR = P(-24, -96 + 74 * Math.cos(a))
  }
  const shL = P(32, sh), shR = P(-32, sh), head = P(0, sh - 40)
  // shirt + sleeveless jacket
  ctx.strokeStyle = '#E9E3D6'; ctx.lineWidth = 48; ctx.beginPath(); ctx.moveTo(head[0], head[1] + 44); ctx.lineTo((hipR[0] + hipL[0]) / 2, hipR[1] - 8); ctx.stroke()
  ctx.strokeStyle = '#2F4A3A'; ctx.lineWidth = 17
  for (const sx of [-1, 1]) { ctx.beginPath(); ctx.moveTo(head[0] + sx * 15, head[1] + 46); ctx.lineTo((hipR[0] + hipL[0]) / 2 + sx * 15, hipR[1] - 8); ctx.stroke() }
  // legs: shorts end above the knee, bare shins
  for (const [hp, k, an] of [[hipR, kneeR, ankR], [hipL, kneeL, ankL]] as const) {
    ctx.strokeStyle = '#3E4B5C'; ctx.lineWidth = 24; ctx.beginPath(); ctx.moveTo(hp[0], hp[1]); ctx.lineTo(hp[0] + (k[0] - hp[0]) * 0.72, hp[1] + (k[1] - hp[1]) * 0.72); ctx.stroke()
    ctx.strokeStyle = '#C99B70'; ctx.lineWidth = 15; ctx.beginPath(); ctx.moveTo(hp[0] + (k[0] - hp[0]) * 0.72, hp[1] + (k[1] - hp[1]) * 0.72); ctx.lineTo(k[0], k[1]); ctx.lineTo(an[0], an[1]); ctx.stroke()
    ctx.fillStyle = '#2B2B2B'; ctx.beginPath(); ctx.ellipse(an[0], an[1] + 4, 10, 6, 0, 0, Math.PI * 2); ctx.fill()
  }
  ctx.strokeStyle = '#E9E3D6'; ctx.lineWidth = 13
  const elL = P(44, sh + 70), elR = P(-44, sh + 70), haL = P(36, sh + 130), haR = P(-36, sh + 130)
  for (const [s0, e, hnd] of [[shL, elL, haL], [shR, elR, haR]] as const) { ctx.beginPath(); ctx.moveTo(s0[0], s0[1]); ctx.lineTo(e[0], e[1]); ctx.stroke(); ctx.strokeStyle = '#C99B70'; ctx.beginPath(); ctx.moveTo(e[0], e[1]); ctx.lineTo(hnd[0], hnd[1]); ctx.stroke(); ctx.strokeStyle = '#E9E3D6' }
  ctx.beginPath(); ctx.arc(head[0], head[1], 20, 0, Math.PI * 2); ctx.fillStyle = '#C99B70'; ctx.fill()
  ctx.beginPath(); ctx.arc(head[0], head[1] - 5, 21, Math.PI * 1.05, Math.PI * 1.95); ctx.fillStyle = '#5B3A6B'; ctx.fill()
  ctx.fillStyle = '#3A2747'; ctx.fillRect(head[0] - 20, head[1] - 9, 40, 5)
  if (tracking) {
    // MediaPipe-style skeleton
    const bones: [Pt, Pt][] = [[shL, shR], [shL, elL], [elL, haL], [shR, elR], [elR, haR], [shL, hipL], [shR, hipR], [hipL, hipR], [hipL, kneeL], [kneeL, ankL], [hipR, kneeR], [kneeR, ankR]]
    ctx.strokeStyle = 'rgba(255,255,255,0.85)'; ctx.lineWidth = 2.5
    for (const [a, b] of bones) { ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke() }
    for (const pt of [shL, shR, elL, elR, haL, haR, head]) { ctx.beginPath(); ctx.arc(pt[0], pt[1], 4, 0, Math.PI * 2); ctx.fillStyle = '#7CFFE9'; ctx.fill() }
    if (standing) {
      angleMark(ctx, hipR, kneeR, ankR, `R ${postureLive(t, 'right').toFixed(1)}°`, -1)
      angleMark(ctx, hipL, kneeL, ankL, `L ${postureLive(t, 'left').toFixed(1)}°`, 1)
    } else {
      for (const pt of [hipL, kneeL, ankL]) { ctx.beginPath(); ctx.arc(pt[0], pt[1], 4, 0, Math.PI * 2); ctx.fillStyle = '#7CFFE9'; ctx.fill() }
      angleMark(ctx, hipR, kneeR, ankR, `${Math.round(jointAngle(t))}°`, -1)
    }
  }
  ctx.restore()
}
function cameraScreen(ctx: Ctx, _p: number, t: number, test: 1 | 2) {
  ctx.fillStyle = C.bg; ctx.fillRect(0, 0, W, H)
  const title = test === 1 ? 'Joint Movement' : 'Posture'
  const { ph, k } = camPhase(t, test)
  topBar(ctx, 'Movement Assessment', 'Triage active')
  ctx.fillStyle = C.surface; ctx.fillRect(0, 105, W, 50)
  txt(ctx, title, 16, 136, 15, 800, C.primary)
  txt(ctx, `TEST ${test} OF 2`, 344, 128, 10.5, 600, C.secondary, 'right')
  const tracking = ph !== 'setup'
  txt(ctx, tracking ? 'TRACKING PATIENT' : 'WAITING FOR PATIENT…', 344, 144, 9.5, 800, tracking ? C.success : C.warning, 'right')
  const fx = 16, fy = 166, fw = 328, fh = 420
  camFeed(ctx, fx, fy, fw, fh, t, test === 2, tracking)
  if (ph === 'rec' && test === 1) {
    rr(ctx, fx + 10, fy + 10, 150, 64, 14, 'rgba(14,26,26,0.75)')
    txt(ctx, 'JOINT ANGLE', fx + 22, fy + 30, 9.5, 800, 'rgba(255,255,255,0.7)')
    txt(ctx, `${Math.round(jointAngle(t))}°`, fx + 22, fy + 62, 26, 800, '#fff')
    rr(ctx, fx + 168, fy + 10, 150, 64, 14, 'rgba(0,104,95,0.88)')
    txt(ctx, 'RANGE OF MOTION', fx + 180, fy + 30, 9.5, 800, 'rgba(255,255,255,0.8)')
    const rom = romSoFar(t)
    txt(ctx, `${Math.round(rom)}°`, fx + 180, fy + 58, 24, 800, '#fff')
    progress(ctx, fx + 180, fy + 64, 126, rom / 140, 5, 'rgba(255,255,255,0.25)', C.mint)
  }
  if (ph === 'rec' && test === 2) {
    rr(ctx, fx + 10, fy + 10, 150, 64, 14, 'rgba(14,26,26,0.75)')
    txt(ctx, 'RIGHT KNEE', fx + 22, fy + 30, 9.5, 800, 'rgba(255,255,255,0.7)')
    txt(ctx, `${postureLive(t, 'right').toFixed(1)}°`, fx + 22, fy + 62, 24, 800, '#FFD166')
    rr(ctx, fx + 168, fy + 10, 150, 64, 14, 'rgba(14,26,26,0.75)')
    txt(ctx, 'LEFT KNEE', fx + 180, fy + 30, 9.5, 800, 'rgba(255,255,255,0.7)')
    txt(ctx, `${postureLive(t, 'left').toFixed(1)}°`, fx + 180, fy + 62, 24, 800, '#FFD166')
    rr(ctx, fx + 104, fy + 84, 120, 28, 14, 'rgba(0,104,95,0.9)')
    txt(ctx, `HOLD STILL · ${Math.max(0, 5 - k * 5).toFixed(0)}s`, fx + 164, fy + 103, 11, 800, '#fff', 'center')
  }
  if (ph === 'intro') {
    rr(ctx, fx, fy, fw, fh, 18, 'rgba(0,104,95,0.92)')
    txt(ctx, `TEST ${test}`, 180, fy + fh / 2 - 14, 18, 800, C.mint, 'center')
    txt(ctx, title, 180, fy + fh / 2 + 22, 28, 800, '#fff', 'center')
  }
  if (ph === 'next') {
    rr(ctx, fx, fy, fw, fh, 18, 'rgba(225,251,248,0.95)')
    check(ctx, 180, fy + 150, 26, C.success)
    txt(ctx, 'Complete 1', 180, fy + 210, 22, 800, C.primaryDark, 'center')
    txt(ctx, 'Next · TEST 2 Posture', 180, fy + 240, 14, 700, C.secondary, 'center')
  }
  if (ph === 'setup') {
    wrap(ctx, test === 1 ? 'Seat the patient side-on to the camera, the knee being tested nearest to it.' : 'Please ask the patient to stand naturally facing the camera.', 30, 622, 300, 16, 800, C.ink, 1.35)
    txt(ctx, test === 1 ? 'Side view: hip, knee and ankle in the frame' : 'Front view: hips, knees and ankles in the frame', 30, 690, 12, 600, C.secondary)
  } else if (ph === 'ready' || ph === 'intro') {
    wrap(ctx, 'Patient detected. The patient is ready. Please tap Start Assessment.', 30, 622, 300, 14, 700, C.ink, 1.35)
    button(ctx, 'START ASSESSMENT', 700, ph === 'ready' ? seg(t, test === 1 ? T.camera + 1.5 : POSTURE.t0 - 0.8, test === 1 ? T.camera + 1.85 : POSTURE.t0 - 0.5) : 1, { h: 50 })
  } else if (ph === 'rec') {
    ctx.beginPath(); ctx.arc(150, 614, 6, 0, Math.PI * 2); ctx.fillStyle = Math.floor(t * 2) % 2 ? C.error : '#F28B82'; ctx.fill()
    txt(ctx, 'LIVE', 164, 619, 14, 800, C.error)
    txt(ctx, test === 1 ? `Test progress: ${(k * 8).toFixed(1)}s / 30s` : `Hold still: ${(k * 5).toFixed(1)}s / 5s`, 180, 648, 13, 600, C.secondary, 'center')
    rr(ctx, 24, 668, 312, 44, 14, 'rgba(14,26,26,0.9)')
    txt(ctx, test === 1 ? 'Slowly bend the knee, then straighten it' : 'Please stand still for 5 seconds', 180, 696, 13.5, 700, '#fff', 'center')
  } else {
    card(ctx, 16, 596, 328, 124, 16)
    txt(ctx, `TEST ${test} — ${title}`, 30, 620, 13.5, 800)
    check(ctx, 254, 615, 8, C.success); txt(ctx, 'Completed', 330, 620, 11.5, 800, C.success, 'right')
    const rows: [string, string][] = test === 1
      ? [['Range of motion', '74°'], ['Joint angle range', '92° – 166°'], ['Smoothness · Quality', '71% · Good']]
      : [['Left knee angle', `${POSTURE.left}°`], ['Right knee angle', `${POSTURE.right}°`], ['Symmetry difference', `${POSTURE_DIFF}°`]]
    rows.forEach(([a, b], i) => { txt(ctx, a, 30, 648 + i * 22, 12.5, 600, C.secondary); txt(ctx, b, 330, 648 + i * 22, 12.5, 800, i === 2 && test === 2 ? C.warningText : C.ink, 'right') })
    button(ctx, test === 1 ? 'NEXT' : 'CONTINUE', 728, seg(t, test === 1 ? T.posture - 0.9 : T.strap - 0.6, test === 1 ? T.posture - 0.5 : T.strap - 0.2), { h: 44 })
  }
}
const camRom: Draw = (ctx, p, t) => cameraScreen(ctx, p, t, 1)
const camPosture: Draw = (ctx, p, t) => cameraScreen(ctx, p, t, 2)

/* ---- sensor pod ---- */
function legArt(ctx: Ctx, x: number, y: number, t: number, s = 1) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s)
  ctx.lineCap = 'round'; ctx.lineJoin = 'round'
  // seated leg, side view: thigh horizontal, shin vertical
  ctx.strokeStyle = '#C9B7A6'; ctx.lineWidth = 34
  ctx.beginPath(); ctx.moveTo(-90, -40); ctx.lineTo(10, -40); ctx.lineTo(16, 70); ctx.stroke()
  ctx.strokeStyle = '#B9A696'; ctx.lineWidth = 16; ctx.beginPath(); ctx.moveTo(16, 74); ctx.lineTo(46, 80); ctx.stroke()
  // tibia (shin bone) hint
  ctx.strokeStyle = 'rgba(255,255,255,0.8)'; ctx.lineWidth = 3; ctx.setLineDash([4, 4]); ctx.beginPath(); ctx.moveTo(24, -12); ctx.lineTo(28, 66); ctx.stroke(); ctx.setLineDash([])
  // strap + pod just below the knee
  rr(ctx, -6, -6, 44, 14, 5, '#2B2F36')
  rr(ctx, 22, -10, 22, 22, 6, C.primary)
  ctx.beginPath(); ctx.arc(37, -3, 2.5, 0, Math.PI * 2); ctx.fillStyle = Math.floor(t * 3) % 2 ? '#7CFFB2' : '#2BD47A'; ctx.fill()
  ctx.restore()
}
const placement: Draw = (ctx, p, t) => {
  ctx.fillStyle = C.bg; ctx.fillRect(0, 0, W, H)
  topBar(ctx, 'Movement Assessment', 'Triage active')
  stepHead(ctx, 3, 7, 'Placement guide')
  txt(ctx, 'Knee Assessment', 24, 186, 20, 800); txt(ctx, 'Instructions', 24, 210, 20, 800)
  chip(ctx, '● Pair ready', 336, 204, C.mint, C.primaryDark, 10.5, 'right')
  ;[['1. Wear', 'Strap'], ['2. Calib', 'Stand'], ['3. Test', 'Walk'], ['4. Done', 'Report']].forEach(([a, b], i) => {
    const on = i === 0
    rr(ctx, 24 + i * 79, 228, 72, 48, 10, on ? C.primary : C.tint)
    txt(ctx, a, 60 + i * 79, 248, 11.5, 800, on ? '#fff' : C.secondary, 'center'); txt(ctx, b, 60 + i * 79, 265, 10, 600, on ? C.mint : C.muted, 'center')
  })
  card(ctx, 24, 288, 312, 268, 18)
  chip(ctx, 'Placement guide', 38, 300, C.mintSoft, C.primaryDark, 10)
  chip(ctx, 'Sensor: Right', 150, 300, C.mint, C.primaryDark, 10)
  rr(ctx, 38, 336, 284, 140, 14, C.tint)
  legArt(ctx, 178, 412, t, 1)
  const pk = 0.5 + 0.5 * Math.sin(t * 5)
  ctx.beginPath(); ctx.arc(215, 409, 16 + pk * 6, 0, Math.PI * 2); ctx.strokeStyle = `rgba(0,104,95,${0.6 - pk * 0.4})`; ctx.lineWidth = 2.5; ctx.stroke()
  txt(ctx, 'on the tibia', 238, 372, 10.5, 800, C.primary)
  txt(ctx, 'Attach the strap as shown', 180, 502, 14, 800, C.ink, 'center')
  wrap(ctx, 'Strap the small sensor just below the knee on the Right side, light facing forward.', 50, 524, 270, 11.5, 500, C.secondary, 1.35)
  card(ctx, 24, 568, 312, 104, 16)
  ;['Seat the patient on a firm chair', 'Explain the walk: 5 normal steps'].forEach((s, i) => {
    ctx.beginPath(); ctx.arc(46, 596 + i * 44, 12, 0, Math.PI * 2); ctx.fillStyle = C.mintSoft; ctx.fill()
    txt(ctx, String(i + 2), 46, 601 + i * 44, 12, 800, C.primary, 'center')
    txt(ctx, s, 68, 601 + i * 44, 13, 700)
  })
  button(ctx, 'Start Assessment  →', 690, seg(p, 0.86, 0.98), { h: 50 })
  txt(ctx, 'Patient cannot do the movement — skip this step', 180, 762, 11, 600, C.secondary, 'center')
}

const pairing: Draw = (ctx, p, t) => {
  ctx.fillStyle = C.bg; ctx.fillRect(0, 0, W, H)
  topBar(ctx, 'Screening Intake', 'Saved', C.surface, C.ink)
  const found = p > 0.35
  stepHead(ctx, 4, 7, found ? 'Paired' : 'Pairing…')
  txt(ctx, 'Sensor Pairing', 24, 186, 21, 800)
  chip(ctx, 'Bluetooth LE', 336, 168, C.mint, C.primaryDark, 10.5, 'right')
  card(ctx, 24, 204, 312, 220, 18)
  const cx = 180, cy = 300
  for (let i = 0; i < 3; i++) { const k = ((t * 0.7 + i / 3) % 1); ctx.beginPath(); ctx.arc(cx, cy, 40 + k * 70, 0, Math.PI * 2); ctx.strokeStyle = `rgba(0,104,95,${(1 - k) * 0.3})`; ctx.lineWidth = 2; ctx.stroke() }
  ctx.beginPath(); ctx.arc(cx, cy, 78, 0, Math.PI * 2); ctx.fillStyle = 'rgba(153,239,229,0.3)'; ctx.fill()
  ctx.beginPath(); ctx.arc(cx, cy, 44, 0, Math.PI * 2); ctx.fillStyle = C.primaryDark; ctx.fill()
  bluetooth(ctx, cx, cy, 38)
  txt(ctx, found ? 'Sensor is ready. Continue to setup.' : 'Searching for SAATHI sensor…', 180, 404, 12.5, 600, C.secondary, 'center')
  const k = easeOut(seg(p, 0.35, 0.5))
  ctx.globalAlpha = k
  card(ctx, 24, 436, 312, 188, 18)
  rr(ctx, 40, 452, 44, 44, 12, C.mint); rr(ctx, 52, 466, 20, 16, 4, C.primary)
  txt(ctx, 'SAATHI Sensor', 96, 472, 16, 800); txt(ctx, 'ID: SP-8842 · Found', 96, 490, 11.5, 500, C.secondary)
  rr(ctx, 40, 508, 136, 52, 12, C.tint); txt(ctx, 'Signal Strength', 52, 528, 11, 700, C.ink); txt(ctx, 'Strong', 52, 550, 16, 800)
  rr(ctx, 184, 508, 136, 52, 12, C.tint); txt(ctx, 'Battery', 196, 528, 11, 700, C.ink); txt(ctx, '88%', 196, 550, 16, 800)
  ;['Sensor found', 'Ready to use'].forEach((s, i) => { const on = p > 0.5 + i * 0.12; rr(ctx, 40, 570 + i * 26, 280, 22, 8, on ? C.mintSoft : C.tint); if (on) check(ctx, 54, 581 + i * 26, 7); txt(ctx, s, 68, 586 + i * 26, 11.5, 700, on ? C.primaryDark : C.muted) })
  ctx.globalAlpha = 1
  button(ctx, 'Next: Sensor Setup  →', 700, seg(p, 0.86, 0.98))
}

const calibrate: Draw = (ctx, p) => {
  ctx.fillStyle = C.bg; ctx.fillRect(0, 0, W, H)
  topBar(ctx, 'Movement Assessment', 'Triage active')
  stepHead(ctx, 5, 7, 'Sensor Setup')
  txt(ctx, 'Sensor Setup', 24, 186, 21, 800)
  txt(ctx, 'A short 4-step setup before recording.', 24, 206, 12.5, 500, C.secondary)
  const steps = ['Prepare', 'Position', 'Calibrate', 'Ready']
  const active = p < 0.18 ? 0 : p < 0.34 ? 1 : p < 0.8 ? 2 : 3
  steps.forEach((s, i) => {
    rr(ctx, 24 + i * 79, 222, 72, 36, 10, i < active ? C.mint : i === active ? C.primary : C.tint)
    txt(ctx, `${i + 1}. ${s}`, 60 + i * 79, 245, 10.5, 800, i === active ? '#fff' : i < active ? C.primaryDark : C.muted, 'center')
  })
  const k = smooth(seg(p, 0.34, 0.8))
  const cx = 180, cy = 390
  card(ctx, 24, 272, 312, 250, 18)
  ctx.beginPath(); ctx.arc(cx, cy, 86, 0, Math.PI * 2); ctx.strokeStyle = C.tint2; ctx.lineWidth = 14; ctx.stroke()
  ctx.beginPath(); ctx.arc(cx, cy, 86, -Math.PI / 2, -Math.PI / 2 + k * Math.PI * 2); ctx.strokeStyle = C.primary; ctx.lineCap = 'round'; ctx.stroke()
  if (k < 1) { txt(ctx, `${Math.round(k * 100)}%`, cx, cy + 12, 38, 800, C.ink, 'center'); txt(ctx, 'Hold still', cx, cy + 36, 12, 600, C.secondary, 'center') }
  else check(ctx, cx, cy, 40, C.success)
  const msg = active === 0 ? 'Sensor strapped · patient stands up' : active === 1 ? 'Stand straight, leg relaxed and still' : k < 1 ? 'Setting the starting position' : 'Sensor calibrated'
  txt(ctx, msg, 180, 556, 17, 800, k >= 1 ? C.success : C.ink, 'center')
  txt(ctx, 'Sensor setup takes about 3 seconds of quiet standing', 180, 580, 12, 600, C.secondary, 'center')
  button(ctx, 'Start movement assessment', 700, seg(p, 0.9, 0.99))
}

const CLASS_COL: Record<string, [string, string]> = { LOW: [C.mintSoft, C.primaryDark], MID: [C.warningTint, C.warningText], HIGH: [C.errorTint, C.error] }
const assess: Draw = (ctx, _p, t) => {
  ctx.fillStyle = C.bg; ctx.fillRect(0, 0, W, H)
  topBar(ctx, 'Movement Assessment', 'Triage active')
  card(ctx, 16, 116, 328, 40, 12)
  const live = t >= T.shock + 0.4 && stepsDone(t) < 5
  ctx.beginPath(); ctx.arc(34, 136, 5, 0, Math.PI * 2); ctx.fillStyle = live ? (Math.floor(t * 2) % 2 ? C.error : '#F28B82') : C.success; ctx.fill()
  txt(ctx, live || t < T.shock + 0.4 ? 'LIVE RECORDING' : 'RECORDING COMPLETE', 46, 141, 12, 800, C.ink)
  chip(ctx, 'Tashi · Right knee', 334, 123, C.mint, C.primaryDark, 10, 'right')
  const n = stepsDone(t)
  // timer ring
  card(ctx, 16, 166, 328, 176, 18)
  const el = Math.max(0, t - T.shock)
  const rem = Math.max(0, 30 - Math.floor(el * 1.6))
  ctx.beginPath(); ctx.arc(100, 254, 58, 0, Math.PI * 2); ctx.strokeStyle = C.tint2; ctx.lineWidth = 10; ctx.stroke()
  ctx.beginPath(); ctx.arc(100, 254, 58, -Math.PI / 2, -Math.PI / 2 + (1 - rem / 30) * Math.PI * 2); ctx.strokeStyle = C.primary; ctx.lineCap = 'round'; ctx.stroke()
  txt(ctx, 'REMAINING', 100, 236, 9.5, 800, C.secondary, 'center')
  txt(ctx, `00:${String(rem).padStart(2, '0')}`, 100, 266, 26, 800, C.ink, 'center')
  txt(ctx, 'STEPS COUNTED BY POD', 180, 206, 9.5, 800, C.secondary)
  txt(ctx, `${n} of 5`, 180, 238, 26, 800, C.primary)
  txt(ctx, 'SHOCK CLASS PER STEP', 180, 272, 9.5, 800, C.secondary)
  STEP_CLASS.forEach((c, i) => {
    const x = 180 + i * 31, on = i < n
    const [bg, fg] = on ? CLASS_COL[c] : [C.tint, C.muted]
    rr(ctx, x, 284, 28, 40, 8, bg)
    txt(ctx, String(i + 1), x + 14, 299, 10, 800, on ? fg : C.muted, 'center')
    txt(ctx, on ? (c === 'HIGH' ? 'HI' : c === 'MID' ? 'MID' : 'LO') : '·', x + 14, 316, 9, 800, on ? fg : C.muted, 'center')
  })
  // movement trace (accelerometer)
  card(ctx, 16, 352, 328, 222, 18)
  txt(ctx, 'Movement Trace', 32, 380, 15, 800)
  chip(ctx, 'Calibrated', 330, 364, C.tint, C.ink, 10, 'right')
  txt(ctx, 'Tibial acceleration (g) · illustrative', 32, 402, 11, 700, C.secondary)
  const gx = 32, gy = 412, gw = 296, gh = 146
  rr(ctx, gx, gy, gw, gh, 10, C.tint)
  ctx.strokeStyle = C.tint2; ctx.lineWidth = 1
  for (let i = 1; i < 4; i++) { ctx.beginPath(); ctx.moveTo(gx, gy + (i * gh) / 4); ctx.lineTo(gx + gw, gy + (i * gh) / 4); ctx.stroke() }
  txt(ctx, '4g', gx + 4, gy + 12, 9, 700, C.muted); txt(ctx, '1g', gx + 4, gy + gh - 34, 9, 700, C.muted)
  ctx.beginPath()
  const span = 4
  for (let i = 0; i <= 220; i++) {
    const tt = t - span + (i / 220) * span
    const v = tt < T.shock ? 1 : shockAt(tt)
    const x = gx + (i / 220) * gw, y = gy + gh - 10 - ((v - 0.4) / 3.8) * (gh - 20)
    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y)
  }
  ctx.strokeStyle = C.primary; ctx.lineWidth = 2.4; ctx.lineJoin = 'round'; ctx.stroke()
  STEPS_T.forEach((s, i) => {
    const x = gx + gw - ((t - s) / span) * gw
    if (x < gx || x > gx + gw || t < s) return
    const y = gy + gh - 10 - ((STEP_PEAKS[i] - 0.4) / 3.8) * (gh - 20)
    ctx.beginPath(); ctx.arc(x, y, 4.5, 0, Math.PI * 2); ctx.fillStyle = STEP_CLASS[i] === 'HIGH' ? C.error : C.warning; ctx.fill()
  })
  rr(ctx, 16, 584, 328, 44, 12, n >= 5 ? C.mintSoft : C.tint)
  txt(ctx, n >= 5 ? '✓ Test completed · 5 steps captured' : 'Movement detected — keep walking steadily', 180, 611, 12.5, 700, n >= 5 ? C.primaryDark : C.ink, 'center')
  button(ctx, n >= 5 ? 'Analyse results' : 'Stop Recording', 700, 0, { h: 50 })
}

const analysis: Draw = (ctx, p, t) => {
  ctx.fillStyle = C.bg; ctx.fillRect(0, 0, W, H)
  topBar(ctx, 'Movement Assessment', 'Triage active')
  chip(ctx, 'SCREENING ENGINE · ON-DEVICE', 24, 120, C.tint, C.primaryDark, 10)
  txt(ctx, 'Analysing Data…', 24, 182, 22, 800)
  txt(ctx, 'The screening model processes the results.', 24, 204, 12.5, 500, C.secondary)
  const cx = 180, cy = 290
  ctx.beginPath(); ctx.arc(cx, cy, 58, 0, Math.PI * 2); ctx.strokeStyle = C.tint2; ctx.lineWidth = 10; ctx.stroke()
  ctx.beginPath(); ctx.arc(cx, cy, 58, -Math.PI / 2, -Math.PI / 2 + p * Math.PI * 2); ctx.strokeStyle = C.primary; ctx.lineCap = 'round'; ctx.stroke()
  txt(ctx, `${Math.round(p * 100)}%`, cx, cy + 10, 28, 800, C.ink, 'center')
  txt(ctx, 'SCREENING PIPELINE', 24, 384, 11, 800, C.secondary)
  const items: [string, string][] = [['Patient information', '68 M'], ['Symptoms', '8 / 8'], ['Camera · ROM, posture', '74° · Δ7.5°'], ['Pod · 5-step walk', '2 HIGH · 3 MID'], ['Screening risk model', '13 inputs']]
  items.forEach(([l, v], i) => {
    const y = 396 + i * 58
    const k = seg(p, 0.05 + i * 0.18, 0.2 + i * 0.18)
    card(ctx, 24, y, 312, 48, 12)
    if (k >= 1) check(ctx, 48, y + 24, 10)
    else { ctx.beginPath(); ctx.arc(48, y + 24, 9, t * 6, t * 6 + 4.2); ctx.strokeStyle = C.primary; ctx.lineWidth = 3; ctx.stroke() }
    txt(ctx, l, 68, y + 29, 13.5, 700, k > 0 ? C.ink : C.muted)
    if (k >= 1) txt(ctx, v, 322, y + 29, 13, 800, C.primary, 'right')
  })
  txt(ctx, 'On-device · screening risk only, not a diagnosis', 180, 700, 10, 600, C.muted, 'center')
}

const result: Draw = (ctx, p) => {
  ctx.fillStyle = C.bg; ctx.fillRect(0, 0, W, H)
  topBar(ctx, 'Screening Result', 'Triage active')
  chip(ctx, '✓ Assessment finalised', 16, 116, C.mint, C.primaryDark, 10.5)
  txt(ctx, 'Right knee screening complete', 16, 170, 18.5, 800)
  txt(ctx, 'Symptoms · camera ROM + posture · tibial shock', 16, 190, 12, 500, C.secondary)
  rr(ctx, 16, 202, 328, 46, 12, C.tint)
  txt(ctx, 'Tashi Bhutia (68M)', 30, 230, 14, 800)
  chip(ctx, 'PHC Rongli', 334, 212, C.surface, C.ink, 10, 'right')
  const k = easeOut(seg(p, 0.03, 0.25))
  ctx.globalAlpha = k
  card(ctx, 16, 258, 328, 196, 18)
  ctx.save(); roundRect(ctx, 16, 258, 328, 196, 18); ctx.clip()
  const gb = ctx.createLinearGradient(16, 0, 344, 0); gb.addColorStop(0, C.mint); gb.addColorStop(1, C.errorTint)
  ctx.fillStyle = gb; ctx.fillRect(16, 258, 328, 6); ctx.restore()
  txt(ctx, 'SCREENING BAND', 32, 290, 10, 800, C.secondary)
  txt(ctx, 'Moderate', 32, 322, 25, 800, C.info)
  txt(ctx, 'screening risk', 32, 344, 16, 700, C.ink)
  rr(ctx, 196, 276, 132, 70, 12, C.infoTint)
  txt(ctx, 'NEXT ACTION', 206, 294, 9, 800, C.info)
  wrap(ctx, 'Advise PHC visit for evaluation', 206, 314, 116, 12.5, 800, C.error, 1.25)
  const bx = 32, bw = 296, by = 364
  ;[[C.mint, 0], ['#7FD3E6', 1], [C.errorTint, 2]].forEach(([c, i]) => rr(ctx, bx + (i as number) * (bw / 3), by, bw / 3 - 3, 12, 5, c as string))
  roundRect(ctx, bx + bw / 3, by - 2, bw / 3 - 3, 16, 6); ctx.strokeStyle = C.primaryDark; ctx.lineWidth = 2; ctx.stroke()
  const mx = bx + bw * 0.5 * easeOut(seg(p, 0.12, 0.35))
  ctx.beginPath(); ctx.moveTo(mx - 6, by - 12); ctx.lineTo(mx + 6, by - 12); ctx.lineTo(mx, by - 4); ctx.fillStyle = C.primaryDark; ctx.fill()
  txt(ctx, 'Low', bx, by + 32, 10.5, 600, C.secondary); txt(ctx, 'Moderate', bx + bw / 2, by + 32, 10.5, 800, C.primaryDark, 'center'); txt(ctx, 'Higher', bx + bw, by + 32, 10.5, 600, C.secondary, 'right')
  txt(ctx, 'Clinical confirmation required', 32, 438, 11.5, 700, C.secondary)
  ctx.globalAlpha = 1
  card(ctx, 16, 464, 328, 166, 18)
  txt(ctx, 'KEY MEASURED FINDINGS', 32, 490, 10.5, 800, C.secondary)
  ;([['Range of movement', 'Camera · seated bend / straighten', '74°'], ['Knee posture (standing)', 'Camera · R 168.9° · L 176.4°', 'Δ 7.5°'], ['Tibial shock · 5 steps', 'Wearable pod on the shin', '2 HIGH ↑']] as [string, string, string][]).forEach(([a, b, v], i) => {
    const kk = easeOut(seg(p, 0.3 + i * 0.1, 0.45 + i * 0.1))
    ctx.globalAlpha = kk
    const y = 502 + i * 42
    rr(ctx, 30, y, 300, 36, 10, C.tint)
    txt(ctx, a, 42, y + 16, 12.5, 800); txt(ctx, b, 42, y + 30, 9.5, 600, C.secondary)
    txt(ctx, v, 318, y + 24, 14, 800, i === 2 ? C.warningText : C.primary, 'right')
  })
  ctx.globalAlpha = 1
  card(ctx, 16, 640, 328, 50, 14, C.mintSoft)
  txt(ctx, 'AI model output · Moderate', 30, 662, 12, 800, C.primaryDark)
  txt(ctx, 'On-device neural network 13 → 32 → 16 → 3', 30, 680, 10.5, 600, C.secondary)
  button(ctx, 'Next Steps  →', 702, seg(p, 0.9, 0.99), { h: 50 })
}

const guidance: Draw = (ctx, p) => {
  ctx.fillStyle = C.bg; ctx.fillRect(0, 0, W, H)
  topBar(ctx, 'Post Screening Guidance', '✓ Ready')
  rr(ctx, 16, 116, 328, 52, 12, C.tint)
  ctx.beginPath(); ctx.arc(42, 142, 16, 0, Math.PI * 2); ctx.fillStyle = C.mint; ctx.fill(); txt(ctx, 'KD', 42, 147, 11, 800, C.primaryDark, 'center')
  txt(ctx, 'Tashi Bhutia 68M', 66, 140, 13.5, 800); txt(ctx, 'Right knee', 66, 157, 11, 500, C.secondary)
  chip(ctx, '● Moderate risk', 334, 128, C.infoTint, C.info, 10, 'right')
  txt(ctx, 'Personalised Guidelines', 16, 206, 21, 800)
  txt(ctx, 'Care steps tailored to moderate screening risk', 16, 226, 12, 500, C.secondary)
  const rows: [string, string, string, string, string][] = [
    ['Exercises', 'Gentle strengthening, 15 min daily', 'Daily 15 min', C.mint, C.primaryDark],
    ['Lifestyle Care', 'Avoid deep squatting & floor sitting', 'Essential', C.infoTint, C.info],
    ['Nutrition Plan', 'Diet matched to the risk band', 'By risk band', C.warningTint, C.warningText],
    ['When to Visit PHC', 'Within 60 days · sooner if swollen', 'Priority', C.errorTint, C.error],
  ]
  rows.forEach(([a, b, tag, bg, fg], i) => {
    const y = 242 + i * 80
    const hl = i === 2 && p > 0.6
    card(ctx, 16, y, 328, 70, 14, hl ? C.warningTint : C.surface)
    if (hl) { roundRect(ctx, 16, y, 328, 70, 14); ctx.strokeStyle = C.warning; ctx.lineWidth = 2; ctx.stroke() }
    rr(ctx, 28, y + 12, 46, 46, 12, C.tint)
    if (i === 2) { ctx.beginPath(); ctx.arc(51, y + 37, 12, 0, Math.PI * 2); ctx.fillStyle = '#E8752A'; ctx.fill(); ctx.fillStyle = '#3F9A3A'; ctx.fillRect(50, y + 20, 3, 8) }
    else rr(ctx, 43, y + 27, 16, 16, 4, C.primary)
    txt(ctx, a, 86, y + 30, 14.5, 800)
    txt(ctx, b, 86, y + 50, 11, 500, C.secondary)
    chip(ctx, tag, 334, y + 10, bg, fg, 9.5, 'right')
  })
  tap(ctx, 200, 440, seg(p, 0.6, 0.85))
  rr(ctx, 16, 566, 328, 84, 16, C.primary)
  txt(ctx, 'COMMUNITY HEALTH WORKER NOTE', 30, 590, 9.5, 800, 'rgba(255,255,255,0.9)')
  wrap(ctx, 'Explain to Tashi that this is a screening result, not a diagnosis.', 30, 612, 300, 12.5, 600, '#fff', 1.3)
  button(ctx, 'Share via WhatsApp', 664, 0, { h: 46 })
  button(ctx, 'Back to Home Dashboard', 718, 0, { h: 44, variant: 'secondary' })
}

type Food = [string, string, string]
const PLANS: { band: string; title: string; fg: string; bg: string; foods: Food[]; tip: string }[] = [
  { band: 'Low', title: 'Maintain & prevent', fg: C.primaryDark, bg: C.mint, tip: 'Stay active · re-screen in 6 months',
    foods: [['Millet / ragi roti, rice', 'Energy + calcium', '#7A4A2E'], ['Rajma, dal, chana', 'Protein for muscles', '#B5482A'], ['Seasonal greens & fruit', 'Vitamins, fibre', '#3F9A3A'], ['Milk / curd daily', 'Calcium for bones', '#F2EEE3']] },
  { band: 'Moderate', title: 'Anti-inflammatory plate', fg: C.info, bg: C.infoTint, tip: 'Each kg lost = 4 kg less load on the knee',
    foods: [['Haldi, black pepper, ginger', 'Natural anti-inflammatory', '#F2B134'], ['Ragi, curd, milk, moringa', 'Calcium-rich', '#F2EEE3'], ['Walnuts, alsi (flaxseed)', 'Omega-3 fats', '#9A6338'], ['Less sugar & fried food', 'Reduces swelling', '#E5534B']] },
  { band: 'Higher', title: 'Joint-protective + weight care', fg: C.error, bg: C.errorTint, tip: 'Follow PHC advice · visit within 2 weeks',
    foods: [['Dal, egg or paneer each meal', 'Protects muscle', '#E8C07A'], ['Morning sun + calcium foods', 'Vitamin D & bone', '#FFC300'], ['Smaller portions, more veg', 'Healthy weight', '#55A043'], ['No sugary drinks · less salt', 'Less inflammation', '#4FB3D9']] },
]
export function nutritionBand(p: number) { return p < 0.52 ? 1 : p < 0.76 ? 0 : 2 }
const nutrition: Draw = (ctx, p) => {
  ctx.fillStyle = C.bg; ctx.fillRect(0, 0, W, H)
  topBar(ctx, 'Nutrition Plan', 'By risk band', C.warningTint, C.warningText)
  txt(ctx, 'Diet for healthy joints', 16, 150, 21, 800)
  txt(ctx, 'Local, affordable foods · matched to the screening band', 16, 170, 11.5, 500, C.secondary)
  const b = nutritionBand(p)
  rr(ctx, 16, 184, 328, 46, 14, C.tint)
  PLANS.forEach((pl, i) => {
    const on = i === b
    if (on) rr(ctx, 20 + i * 108, 188, 104, 38, 11, pl.fg)
    txt(ctx, pl.band, 72 + i * 108, 213, 13.5, 800, on ? '#fff' : C.secondary, 'center')
  })
  if (b === 1) { chip(ctx, "Tashi's band", 344, 236, C.infoTint, C.info, 9.5, 'right') }
  tap(ctx, 72 + b * 108, 207, b === 1 ? 0 : seg(p, b === 0 ? 0.5 : 0.74, b === 0 ? 0.6 : 0.84))
  const pl = PLANS[b]
  const start = b === 1 ? 0 : b === 0 ? 0.52 : 0.76
  txt(ctx, pl.title, 16, 278, 17, 800, pl.fg)
  pl.foods.forEach(([a, s, col], i) => {
    const kk = easeOut(seg(p, start + 0.02 + i * 0.03, start + 0.08 + i * 0.03))
    ctx.globalAlpha = kk
    const y = 294 + i * 78 + (1 - kk) * 10
    card(ctx, 16, y, 328, 68, 14)
    ctx.beginPath(); ctx.arc(52, y + 34, 22, 0, Math.PI * 2); ctx.fillStyle = C.tint; ctx.fill()
    ctx.beginPath(); ctx.arc(52, y + 34, 14, 0, Math.PI * 2); ctx.fillStyle = col; ctx.fill()
    ctx.beginPath(); ctx.arc(47, y + 30, 4, 0, Math.PI * 2); ctx.fillStyle = 'rgba(255,255,255,0.5)'; ctx.fill()
    ctx.save(); ctx.beginPath(); ctx.rect(84, y, 252, 68); ctx.clip()
    wrap(ctx, a, 86, y + 30, 244, 13.5, 800, C.ink, 1.2)
    ctx.restore()
    txt(ctx, s, 86, y + 56, 11, 600, C.secondary)
    ctx.globalAlpha = 1
  })
  rr(ctx, 16, 612, 328, 52, 14, pl.bg)
  wrap(ctx, pl.tip, 30, 642, 300, 12.5, 800, pl.fg)
  button(ctx, 'Share diet card', 700, 0, { h: 50 })
}

const report: Draw = (ctx, p, t) => {
  ctx.fillStyle = C.bg; ctx.fillRect(0, 0, W, H)
  const done = p > 0.55, online = p > 0.15
  if (markImg.complete) ctx.drawImage(markImg, 20, 54, 32, 26)
  txt(ctx, 'SAATHI', 60, 70, 17, 800, C.primaryDark); txt(ctx, 'CLINICAL REPORTS', 60, 86, 9.5, 800, C.secondary)
  chip(ctx, done ? '● Synced' : '● 1 pending', 300, 58, done ? C.mint : C.tint, done ? C.primaryDark : C.secondary, 11, 'right')
  card(ctx, 16, 116, 328, 238, 18)
  txt(ctx, 'SCREENING ID: S-GOZBVQ', 32, 144, 10.5, 800, C.secondary)
  txt(ctx, 'Tashi Bhutia', 32, 174, 20, 800)
  txt(ctx, '68 M · Right knee · Lingdok · 14 Oct 2026', 32, 196, 11.5, 600, C.secondary)
  rr(ctx, 32, 212, 296, 60, 14, C.tint)
  ctx.beginPath(); ctx.arc(64, 242, 20, 0, Math.PI * 2); ctx.strokeStyle = C.primaryDark; ctx.lineWidth = 5; ctx.stroke()
  txt(ctx, 'Screening Risk Band', 96, 238, 13, 800); txt(ctx, 'Moderate · follow-up in 60 days', 96, 257, 11, 600, C.secondary)
  ;[['ROM · posture Δ', '74° · 7.5°'], ['Tibial shock (5 steps)', '2 HIGH · 3 MID'], ['Nutrition plan', 'Moderate']].forEach(([a, b], i) => { txt(ctx, a, 32, 298 + i * 20, 11.5, 600, C.secondary); txt(ctx, b, 328, 298 + i * 20, 11.5, 800, C.ink, 'right') })
  ;['Download PDF', 'WhatsApp', 'Print'].forEach((l, i) => { rr(ctx, 16 + i * 112, 366, 104, 42, 12, C.surface, C.tint2); txt(ctx, l, 68 + i * 112, 392, 12, 700, C.primary, 'center') })
  card(ctx, 16, 422, 328, 150, 18, done ? C.mintSoft : C.surface)
  const cx = 56, cy = 470
  ctx.fillStyle = done ? C.primary : online ? C.info : C.muted
  ctx.beginPath(); ctx.arc(cx - 8, cy + 4, 11, 0, Math.PI * 2); ctx.arc(cx + 4, cy - 3, 14, 0, Math.PI * 2); ctx.arc(cx + 16, cy + 5, 10, 0, Math.PI * 2); ctx.fill()
  ctx.fillRect(cx - 8, cy + 4, 24, 11)
  txt(ctx, done ? 'Synced to PHC Rongli' : online ? 'Network found · syncing…' : 'Saved on this device', 90, 468, 15, 800, done ? C.primaryDark : C.ink)
  txt(ctx, done ? 'Medical officer dashboard updated' : online ? 'Encrypted upload · 1 record' : 'Will sync when network returns', 90, 490, 11.5, 500, C.secondary)
  progress(ctx, 32, 516, 296, done ? 1 : online ? smooth(seg(p, 0.15, 0.55)) : 0, 8, C.tint2, done ? C.success : C.info)
  if (online && !done) for (let i = 0; i < 3; i++) { const k = (t * 1.5 + i / 3) % 1; ctx.beginPath(); ctx.arc(32 + k * 296, 520, 3, 0, Math.PI * 2); ctx.fillStyle = '#fff'; ctx.fill() }
  txt(ctx, 'Screening record only — not a medical diagnosis', 180, 556, 10.5, 600, C.muted, 'center')
  bottomNav(ctx, 2)
}

const DRAW: Record<string, Draw> = { login, language, dashboard, intake, joint, questions, camRom, camPosture, placement, pairing, calibrate, assess, analysis, result, guidance, nutrition, report }

export function screenAt(t: number): { id: string; p: number; start: number; idx: number } {
  for (let i = 0; i < SCREENS.length; i++) {
    const [id, a, b] = SCREENS[i]
    if (t < b || i === SCREENS.length - 1) return { id, p: clamp((t - a) / (b - a)), start: a, idx: i }
  }
  return { id: 'login', p: 0, start: 0, idx: 0 }
}

/* ---------- the 3D phone ---------- */
export function createPhone() {
  const canvas = document.createElement('canvas')
  canvas.width = W * S; canvas.height = H * S
  const ctx = canvas.getContext('2d')!
  const tex = new THREE.CanvasTexture(canvas)
  tex.colorSpace = THREE.SRGBColorSpace
  tex.anisotropy = 8
  tex.minFilter = THREE.LinearMipmapLinearFilter

  // Lifted clear of the body + polygon offset: 0.0015 in front of the body used to lose the
  // depth test on 16-bit depth buffers (most phones), so the screen rendered as a black rectangle.
  const screenMat = new THREE.MeshBasicMaterial({ map: tex, toneMapped: false, polygonOffset: true, polygonOffsetFactor: -4, polygonOffsetUnits: -4 })
  const build = () => {
    const g = new THREE.Group()
    const body = new THREE.Mesh(new RoundedBoxGeometry(1, 2.12, 0.1, 4, 0.12), new THREE.MeshStandardMaterial({ color: '#1C2026', roughness: 0.35, metalness: 0.6 }))
    g.add(body)
    const rim = new THREE.Mesh(new RoundedBoxGeometry(1.02, 2.14, 0.07, 4, 0.12), new THREE.MeshStandardMaterial({ color: '#7FD8CF', roughness: 0.3, metalness: 0.8 }))
    g.add(rim)
    const screen = new THREE.Mesh(new THREE.PlaneGeometry(0.93, 2.015), screenMat)
    screen.position.z = 0.085
    g.add(screen)
    const btn = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.22, 0.04), new THREE.MeshStandardMaterial({ color: '#7FD8CF', metalness: 0.8, roughness: 0.3 }))
    btn.position.set(0.515, 0.45, 0); g.add(btn)
    return g
  }

  let lastKey = ''
  function render(t: number) {
    const cur = screenAt(t)
    const key = `${cur.id}|${Math.round(t * 30)}`
    if (key === lastKey) return
    lastKey = key
    ctx.setTransform(S, 0, 0, S, 0, 0)
    const trans = 0.45
    const k = cur.idx > 0 ? smooth((t - cur.start) / trans) : 1
    if (k < 1) {
      const [pid, pa, pb] = SCREENS[cur.idx - 1]
      ctx.save(); ctx.translate(-k * W * 0.3, 0)
      DRAW[pid](ctx, 1, pa + (pb - pa), pb - pa)
      ctx.restore()
      ctx.fillStyle = `rgba(0,0,0,${0.15 * k})`; ctx.fillRect(0, 0, W, H)
      ctx.save(); ctx.translate((1 - k) * W, 0)
      ctx.shadowColor = 'rgba(0,0,0,0.25)'; ctx.shadowBlur = 20
      ctx.fillStyle = C.bg; ctx.fillRect(0, 0, W, H); ctx.shadowColor = 'transparent'
      DRAW[cur.id](ctx, cur.p, t, 0)
      ctx.restore()
    } else DRAW[cur.id](ctx, cur.p, t, 0)
    statusBar(ctx)
    tex.needsUpdate = true
  }

  return { build, render, canvas }
}
