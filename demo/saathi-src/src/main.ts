import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { buildWorld } from './world'
import { person, resetPose, walkPose, sitPose, holdPhonePose, kneelPose, sensorDevice, ashaBag, tripod, type Rig } from './characters'
import { createPhone, logoImg, markImg, screenAt, SCREENS } from './phone'
import { buildArchitecture } from './architecture'
import { buildImpact } from './impact'
import { buildLab, ANAT_PERIOD, ANAT_T0, ANAT_WORN, LAB_SWAP, LAB_T0, NOVEL_T0, PEAKS, RUN_PERIOD } from './lab'
import { T, CHAPTERS, STEPS_T, STEP_CLASS } from './timeline'
import { kneeAngle, jointAngle, romSoFar, sway, shockAt, stepsDone, pulse, ROM_T0, ROM_T1, POSTURE, postureLive, STEP_PEAKS } from './signals'
import { createDashboardMonitor, monitorK } from './dashboard'
import { Score } from './audio'
import { FONT, clamp, easeInOut, easeOut, lerp, mat, mesh, roundRect, seg, smooth, splineAt, v3, win } from './util'
import logoUrl from '../../src/assets/saathi-logo.png'
import markUrl from '../../src/assets/saathi-mark.png'
import pod1 from '../../src/assets/pod-1.png'
import pod2 from '../../src/assets/pod-2.png'
import pod3 from '../../src/assets/pod-3.png'

/* =============================== timeline =============================== */
const TOTAL = T.total
const chapterAt = (t: number) => { let i = 0; while (i < CHAPTERS.length - 1 && t >= CHAPTERS[i + 1].t) i++; return i }

/* =============================== renderer =============================== */
const glCanvas = document.getElementById('gl') as HTMLCanvasElement
const overlay = document.getElementById('overlay') as HTMLCanvasElement
const octx = overlay.getContext('2d')!

// If 3D or the module fails for any reason, say so on screen instead of showing a black page.
function fatal(msg: string) {
  const el = document.getElementById('fatal')
  if (!el) return
  const p = el.querySelector('p'); if (p) p.textContent = msg
  el.classList.remove('hidden')
  const s = document.getElementById('start'); if (s) s.classList.add('gone')
}
window.addEventListener('error', e => fatal('Could not start: ' + (e.message || 'the page failed to load. Check your connection and reload.')))
window.addEventListener('unhandledrejection', e => fatal('Could not start: ' + (e.reason?.message || e.reason || 'the page failed to load. Reload to try again.')))

let renderer: THREE.WebGLRenderer
try {
  renderer = new THREE.WebGLRenderer({ canvas: glCanvas, antialias: true, powerPreference: 'high-performance' })
} catch (err) {
  fatal('This browser could not start 3D (WebGL). Turn on hardware acceleration, or open the link in Chrome, Edge or Safari and reload.')
  throw err
}
glCanvas.addEventListener('webglcontextlost', e => {
  e.preventDefault()
  fatal('The 3D view stopped (graphics context lost). Reload the page to restart the film.')
})
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.toneMapping = THREE.ACESFilmicToneMapping
renderer.toneMappingExposure = 1.08
renderer.outputColorSpace = THREE.SRGBColorSpace
renderer.autoClear = false

const scene = new THREE.Scene()
const ui = new THREE.Scene()
ui.add(new THREE.AmbientLight('#ffffff', 1.4))
const uiSun = new THREE.DirectionalLight('#ffffff', 2.0); uiSun.position.set(2, 3, 5); ui.add(uiSun)
const camera = new THREE.PerspectiveCamera(45, 16 / 9, 0.05, 4000)
ui.add(camera)

const world = buildWorld(scene)
const fogBase = (scene.fog as THREE.Fog).color.clone(), fogArch = new THREE.Color('#EEF6F9')

/* =============================== cast =============================== */
// Tashi Bhutia, 68 — knee-length shorts so the camera can see both knees (a saree would hide the knee landmarks)
const K = person({ skin: '#C99B70', top: '#E9E3D6', legs: '#3E4B5C', shorts: true, hair: '#CFCFCF', cap: '#5B3A6B', vest: '#2F4A3A', moustache: '#D9D9D9', stick: true })
// Sunita, ASHA worker — salwar kameez with a dupatta
const A = person({ skin: '#A0694A', top: '#E84C8B', legs: '#F6E3EC', kurta: true, dupatta: '#7B1E5B', hair: '#141414', bun: true })
scene.add(K.root, A.root)
const stick = K.root.userData.stick as THREE.Object3D
const bag = ashaBag(); bag.position.set(0.17, 0.1, 0.02); A.torso.add(bag)

// SAATHI pod strapped just below Tashi's right knee, on the front of the tibia, light facing forward
const sensor = sensorDevice(); sensor.scale.setScalar(1.3); sensor.position.set(0, -0.11, 0.062); K.kneeL.add(sensor)
const strapMat = new THREE.MeshStandardMaterial({ color: '#2B2F36', roughness: 0.6 })
const strap = new THREE.Mesh(new THREE.TorusGeometry(0.054, 0.013, 6, 28), strapMat)
strap.rotation.x = Math.PI / 2; strap.position.y = -0.11; K.kneeL.add(strap)
let strapK = 1
function setStrap(k: number) {
  const q = Math.round(clamp(k) * 30) / 30
  if (q === strapK) return
  strapK = q
  strap.geometry.dispose()
  strap.geometry = new THREE.TorusGeometry(0.054, 0.013, 6, 28, Math.max(0.01, q * Math.PI * 2))
  strap.visible = q > 0.02
}

// tripod for the camera tests
const stand = tripod(); stand.position.set(7.2, 0, 3.6); scene.add(stand)

// low stool + Pahadi thali (nutrition chapter)
const thali = new THREE.Group(); thali.position.set(6.15, 0, 2.15); scene.add(thali)
{
  thali.add(mesh(new THREE.CylinderGeometry(0.26, 0.24, 0.05, 20), mat('#8B5A2B', { flat: false }), 0, 0.33, 0))
  for (let i = 0; i < 4; i++) { const a = i * Math.PI / 2 + 0.6; thali.add(mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.31, 6), mat('#6E4520'), Math.cos(a) * 0.17, 0.155, Math.sin(a) * 0.17)) }
  const brass = mat('#D4A017', { metal: 0.75, rough: 0.28, flat: false })
  thali.add(mesh(new THREE.CylinderGeometry(0.22, 0.2, 0.02, 32), brass, 0, 0.37, 0))
  const bowls: [number, number, string][] = [[-0.11, -0.08, '#F2C14E'], [0.0, -0.13, '#3F8F3A'], [0.11, -0.08, '#7A2E1F'], [0.12, 0.05, '#F7F3E8']]
  for (const [x, z, c] of bowls) {
    thali.add(mesh(new THREE.CylinderGeometry(0.05, 0.035, 0.035, 14), brass, x, 0.395, z))
    thali.add(mesh(new THREE.CylinderGeometry(0.044, 0.044, 0.006, 14), mat(c, { flat: false }), x, 0.41, z))
  }
  for (let i = 0; i < 3; i++) thali.add(mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.012, 18), mat('#5A3A2A', { flat: false }), -0.06 + i * 0.012, 0.39 + i * 0.012, 0.07))
  thali.add(mesh(new THREE.CylinderGeometry(0.03, 0.026, 0.09, 12), mat('#F4C430', { flat: false }), 0.2, 0.42, 0.16))
  for (let i = 0; i < 5; i++) thali.add(mesh(new THREE.IcosahedronGeometry(0.014, 0), mat('#8A5A2B'), 0.03 + i * 0.022, 0.39, 0.12, false))
}

// villagers for life
interface Extra { rig: Rig; kind: 'idle' | 'run' | 'sit'; pos: THREE.Vector3; rot: number; ph: number; c?: THREE.Vector3; rad?: number; sp?: number }
const extras: Extra[] = [
  { rig: person({ skin: '#7A4B2E', top: '#FFFFFF', legs: '#F2EEE3', hair: '#222', turban: '#FF9933' }), kind: 'idle', pos: v3(-12, 0, 11), rot: 2.4, ph: 0 },
  { rig: person({ skin: '#8D5A3B', top: '#FFB703', saree: '#3A86FF', border: '#FFD166', hair: '#111', bun: true }), kind: 'idle', pos: v3(-1.7, 0, 1.7), rot: -2.5, ph: 1 },
  { rig: person({ skin: '#9A6646', top: '#E63946', legs: '#1D3557', hair: '#111', scale: 0.62 }), kind: 'run', pos: v3(), rot: 0, ph: 0, c: v3(-31, 0, 8), rad: 4.3, sp: 0.6 },
  { rig: person({ skin: '#8A5A3A', top: '#06D6A0', legs: '#5A189A', hair: '#111', scale: 0.58 }), kind: 'run', pos: v3(), rot: 0, ph: 2.2, c: v3(-31, 0, 8), rad: 4.6, sp: 0.6 },
  { rig: person({ skin: '#7A4B2E', top: '#FFFFFF', legs: '#FFFFFF', hair: '#BBB', turban: '#D7263D' }), kind: 'sit', pos: v3(-18.5, 0, 4), rot: 0.6, ph: 0 },
  { rig: person({ skin: '#946042', top: '#FF6B6B', saree: '#FFB703', border: '#D7263D', hair: '#111', bun: true }), kind: 'idle', pos: v3(23, 0, 1.5), rot: 0.4, ph: 2 },
]
extras.forEach(e => scene.add(e.rig.root))
extras[1].rig.head.add(new THREE.Mesh(new THREE.SphereGeometry(0.13, 12, 10), new THREE.MeshStandardMaterial({ color: '#D4A017', metalness: 0.7, roughness: 0.3 })).translateY(0.2))

/* =============================== phones =============================== */
const phoneKit = createPhone()
const handPhone = phoneKit.build(); handPhone.scale.setScalar(0.072); handPhone.position.set(0, -0.075, 0.03); handPhone.rotation.set(-0.35, 0, Math.PI)
A.handR.add(handPhone)
const standPhone = phoneKit.build(); standPhone.scale.setScalar(0.072); standPhone.position.set(7.2, 1.255, 3.6); scene.add(standPhone)
const heroPhone = phoneKit.build(); ui.add(heroPhone)
const heroScreen = heroPhone.children.find(c => (c as unknown as { material?: { map?: unknown } }).material?.map) as THREE.Mesh
const glowTex = (() => {
  const c = document.createElement('canvas'); c.width = c.height = 256
  const g = c.getContext('2d')!; const gr = g.createRadialGradient(128, 128, 0, 128, 128, 128)
  gr.addColorStop(0, 'rgba(153,239,229,0.9)'); gr.addColorStop(0.45, 'rgba(46,196,182,0.35)'); gr.addColorStop(1, 'rgba(46,196,182,0)')
  g.fillStyle = gr; g.fillRect(0, 0, 256, 256)
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t
})()
const heroGlow = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTex, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, opacity: 0.8 }))
heroGlow.scale.set(3.4, 3.4, 1); heroGlow.position.z = -0.4; heroPhone.add(heroGlow)

const dash = createDashboardMonitor(); ui.add(dash.group); dash.group.visible = false
const arch = buildArchitecture(scene, phoneKit.build)
const impact = buildImpact(scene, world.phc)
const lab = buildLab(scene)

/* =============================== FX =============================== */
function radialSprite(inner: string, outer: string, size = 1) {
  const c = document.createElement('canvas'); c.width = c.height = 128
  const g = c.getContext('2d')!; const gr = g.createRadialGradient(64, 64, 0, 64, 64, 64)
  gr.addColorStop(0, inner); gr.addColorStop(1, outer); g.fillStyle = gr; g.fillRect(0, 0, 128, 128)
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: t, transparent: true, depthWrite: false, depthTest: false, blending: THREE.AdditiveBlending }))
  s.scale.setScalar(size); return s
}
function ringSprite(color: string) {
  const c = document.createElement('canvas'); c.width = c.height = 128
  const g = c.getContext('2d')!; g.strokeStyle = color; g.lineWidth = 7; g.beginPath(); g.arc(64, 64, 56, 0, Math.PI * 2); g.stroke()
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace
  return new THREE.Sprite(new THREE.SpriteMaterial({ map: t, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }))
}
const painGlow = radialSprite('rgba(255,60,60,1)', 'rgba(255,0,0,0)', 0.4); scene.add(painGlow)
const shockGlow = radialSprite('rgba(255,210,60,1)', 'rgba(255,120,0,0)', 0.2); scene.add(shockGlow)
const heelRing = ringSprite('#FFC300'); scene.add(heelRing)
const bleRings = [0, 1, 2].map(() => { const s = ringSprite('#99EFE5'); scene.add(s); return s })
const syncDots = Array.from({ length: 22 }, () => { const m = new THREE.Mesh(new THREE.SphereGeometry(1.0, 12, 10), new THREE.MeshBasicMaterial({ color: '#FFE08A' })); const g = radialSprite('rgba(255,230,140,0.9)', 'rgba(255,200,60,0)', 6); m.add(g); scene.add(m); return m })
const towerRings = [0, 1, 2].map(() => { const s = ringSprite('#FFE08A'); scene.add(s); return s })
const ashaPin = radialSprite('rgba(255,255,255,1)', 'rgba(124,255,233,0)', 3); scene.add(ashaPin)

/* =============================== character placement =============================== */
const DEG = Math.PI / 180
const tmpV = new THREE.Vector3(), tmpV2 = new THREE.Vector3(), tmpQ = new THREE.Quaternion()
const doorPos = v3(4, 0, -0.5), standPos = v3(6.1, 0, 1.75)
const seatPos = world.charpai.clone().setZ(world.charpai.z + 0.08)
const ashaStand = v3(8.6, 0, 2.35)
const behindStand = v3(7.9, 0, 4.4)
const kneelSpot = v3(7.62, 0, 1.98)
const kneeFront = v3(7.1, 0, 1.5)
const watchSpot = v3(10.0, 0, 1.5)
const postureSpot = v3(7.2, 0, 1.4)
const seatFront = v3(7.2, 0, 1.53)
const WALK_A = v3(5.0, 0, 1.9), WALK_B = v3(9.2, 0, 1.9), WALK_T0 = 67.5, WALK_T1 = 72.45
// sensor-chapter beats
const POD_T = T.strap + 1.1, WRAP_T = T.strap + 2.4, WRAP_T1 = T.strap + 3.9 // pod placed, strap wrapped
const RISE_T = T.strap + 4.4                                                  // patient + ASHA get up
const GRAB_T = RISE_T + 0.8                                                   // ASHA takes the phone off the tripod
const AT_START_T = RISE_T + 2.7                                               // patient at the start of the walk lane
// camera tests: test 1 (ROM) films the right knee from the SIDE; Sunita then carries the tripod to the front for test 2
const SIDE_STAND = v3(5.05, 0, 1.45), FRONT_STAND = v3(7.2, 0, 3.6), SIDE_ASHA = v3(5.55, 0, 0.55)
const MOVE_T0 = ROM_T1 + 0.05, MOVE_T1 = T.posture + 1.3, GRIP = 0.35 // walk to the tripod / carry it / step back
const CARRY_DIR = FRONT_STAND.clone().sub(SIDE_STAND).normalize()
function placeTripod(t: number) {
  const k = smooth(seg(t, MOVE_T0 + GRIP, MOVE_T1 - GRIP))
  stand.position.lerpVectors(SIDE_STAND, FRONT_STAND, k); stand.rotation.y = lerp(-Math.PI / 2, 0, k)
  standPhone.position.copy(stand.position).setY(1.255); standPhone.rotation.y = stand.rotation.y
  return k
}

const ROAD_L = world.road.getLength()
const nearestU = (x: number, z: number) => { let best = 0, bd = 1e9; for (let i = 0; i <= 3000; i++) { const p = world.road.getPointAt(i / 3000); const d = Math.hypot(p.x - x, p.z - z); if (d < bd) { bd = d; best = i / 3000 } } return best }
const uLow = nearestU(24, 71)
const U_NEAR0 = 1 - 4.3 / ROAD_L
const pathEnd = world.road.getPointAt(1)
/** where Sunita is (and which way she faces) while she climbs to Tashi's courtyard */
function ashaApproach(t: number, out: THREE.Vector3): number {
  if (t < 20.5) {
    const u = Math.min(1, uLow + (t - T.asha) * 1.3 / ROAD_L)
    out.copy(world.road.getPointAt(u)); const tg = world.road.getTangentAt(u); return Math.atan2(tg.x, tg.z)
  }
  if (t < 23.2) {
    const u = lerp(U_NEAR0, 1, seg(t, 20.5, 23.2))
    out.copy(world.road.getPointAt(u)); const tg = world.road.getTangentAt(u); return Math.atan2(tg.x, tg.z)
  }
  const k = smooth(seg(t, 23.2, 25.8))
  out.lerpVectors(pathEnd, ashaStand, k); out.y = lerp(pathEnd.y, 0, Math.min(1, k * 3))
  return Math.atan2(ashaStand.x - pathEnd.x, ashaStand.z - pathEnd.z)
}
const patientWalkX = (t: number) => lerp(WALK_A.x, WALK_B.x, seg(t, WALK_T0, WALK_T1))
const faceAt = (from: THREE.Vector3, to: THREE.Vector3) => Math.atan2(to.x - from.x, to.z - from.z)

function seated(t: number) {
  K.root.position.copy(seatPos); K.root.rotation.y = 0
  sitPose(K, 0.43)
  K.torso.rotation.x = 0.04
  K.shoulderL.rotation.x = -0.55; K.shoulderR.rotation.x = -0.55; K.elbowL.rotation.x = -0.65; K.elbowR.rotation.x = -0.65
  K.head.rotation.y = 0.35 + Math.sin(t * 0.5) * 0.1
}

/** blend seated (k = 0) → standing (k = 1); used to get up from / sit down on the chair */
function standUp(k: number, from: THREE.Vector3, to: THREE.Vector3, rot: number) {
  const e = smooth(k)
  K.root.position.lerpVectors(from, to, e); K.root.rotation.y = rot
  K.hips.position.y = lerp(0.5, K.hipH, e)
  K.legL.rotation.x = K.legR.rotation.x = lerp(-Math.PI / 2, 0, e)
  K.kneeL.rotation.x = K.kneeR.rotation.x = lerp(Math.PI / 2, 0, e)
  K.legL.rotation.y = 0.08 * (1 - e); K.legR.rotation.y = -0.08 * (1 - e)
  K.torso.rotation.x = 0.08 + 0.42 * Math.sin(e * Math.PI)
  K.shoulderL.rotation.x = K.shoulderR.rotation.x = -0.55 * (1 - e)
  K.elbowL.rotation.x = K.elbowR.rotation.x = -0.65 * (1 - e)
}

function animateCast(t: number) {
  /* ---------------- Kamala ---------------- */
  resetPose(K)
  stick.visible = t < 25
  K.torso.rotation.x = 0.16
  if (t < T.problem) {
    K.root.position.copy(doorPos); K.root.rotation.y = 0.2
    K.head.rotation.y = Math.sin(t * 0.6) * 0.3
    K.shoulderR.rotation.x = -0.25
  } else if (t < 13.5) {
    const u = seg(t, T.problem, 13.5)
    K.root.position.lerpVectors(doorPos, standPos, u)
    K.root.rotation.y = faceAt(doorPos, standPos)
    walkPose(K, t * 4.6, 0.3, 1)
    K.torso.rotation.x = 0.22
    K.shoulderR.rotation.x = -0.3 + Math.sin(t * 4.6) * 0.1
  } else if (t < 24.2) {
    K.root.position.copy(standPos)
    const k = smooth(seg(t, 13.5, 14.3)) * (1 - smooth(seg(t, 16.6, 17.4)))
    K.root.rotation.y = lerp(faceAt(doorPos, standPos), 0.15, smooth(seg(t, 13.5, 14.5))) + 0.9 * smooth(seg(t, 22, 23))
    K.torso.rotation.x = 0.2 + 0.5 * k
    K.shoulderL.rotation.x = -0.7 * k; K.elbowL.rotation.x = -0.4 * k
    K.legL.rotation.x = -0.15 * k; K.kneeL.rotation.x = 0.3 * k
    K.head.rotation.x = 0.15 * k
    K.shoulderR.rotation.x = -0.25
  } else if (t < 25.2) {
    const front = seatPos.clone().setZ(seatPos.z + 0.45)
    K.root.position.lerpVectors(standPos, front, smooth(seg(t, 24.2, 25.2)))
    K.root.rotation.y = faceAt(standPos, front)
    walkPose(K, t * 4.6, 0.25, 1)
  } else if (t < T.posture) {
    seated(t)
    // camera test 1 (joint movement): seated, filmed from his right side — bend and straighten the right knee
    if (t > ROM_T0 - 0.2 && t < ROM_T1 + 0.2) { K.kneeL.rotation.x = Math.PI / 2 - kneeAngle(t) * DEG; K.head.rotation.y = 0.0; K.head.rotation.x = 0.1 }
  } else if (t < T.posture + 0.8) {
    standUp(seg(t, T.posture, T.posture + 0.8), seatPos, postureSpot, 0)
  } else if (t < T.strap - 0.6) {
    // camera test 2 (posture): stand naturally facing the camera, still for 5 s — the right knee rests slightly bent
    K.root.position.copy(postureSpot); K.root.position.x += sway(t); K.root.rotation.y = 0
    K.torso.rotation.x = 0.04
    K.legL.rotation.x = -0.09; K.kneeL.rotation.x = 0.2; K.hips.position.y = K.hipH - 0.006
    K.shoulderL.rotation.z = -0.1; K.shoulderR.rotation.z = 0.1
  } else if (t < T.strap + 0.2) {
    standUp(1 - seg(t, T.strap - 0.6, T.strap + 0.2), seatPos, postureSpot, 0)
  } else if (t < RISE_T) {
    seated(t)
    K.head.rotation.y = 0; K.head.rotation.x = 0.4 // watches the pod being strapped
  } else if (t < RISE_T + 0.6) {
    standUp(seg(t, RISE_T, RISE_T + 0.6), seatPos, seatFront, 0)
  } else if (t < AT_START_T) {
    // walk to the start of the lane
    const k = seg(t, RISE_T + 0.6, AT_START_T)
    K.root.position.lerpVectors(seatFront, WALK_A, k)
    K.root.rotation.y = faceAt(seatFront, WALK_A)
    walkPose(K, t * 5.2, 0.3, 0.6)
  } else if (t < WALK_T0) {
    // sensor setup: ~3 s of quiet standing, sensor leg straight and still
    K.root.position.copy(WALK_A)
    K.root.rotation.y = lerp(faceAt(seatFront, WALK_A), Math.PI / 2, smooth(seg(t, AT_START_T, AT_START_T + 0.5)))
    K.torso.rotation.x = 0.06; K.head.rotation.y = -0.25
  } else if (t < T.result - 0.5) {
    // walking test (tibial shock): five easy steps along the courtyard
    const wk = t >= WALK_T0 && t < WALK_T1
    K.root.position.set(patientWalkX(t), 0, WALK_A.z)
    K.root.rotation.y = Math.PI / 2
    if (wk) walkPose(K, Math.PI / 2 + (2 * Math.PI * (t - STEPS_T[0])) / 0.9, 0.36, 0.4)
    K.torso.rotation.x = 0.12
  } else {
    seated(t)
  }

  /* ---------------- Sunita (ASHA) ---------------- */
  resetPose(A)
  A.root.visible = t >= T.asha - 0.1
  handPhone.visible = t >= 25.6 && !(t >= 39.6 && t < GRAB_T)
  standPhone.visible = t >= 39.6 && t < GRAB_T
  stand.visible = t >= 38.3 && t < T.shock
  placeTripod(t)
  if (t < 25.8) {
    const rot = ashaApproach(t, tmpV)
    A.root.position.copy(tmpV); A.root.rotation.y = rot
    walkPose(A, t * 7.2, 0.5)
    A.torso.rotation.x = t < 23.2 ? 0.12 : 0.04
  } else if (t < 38) {
    A.root.position.copy(ashaStand)
    A.root.rotation.y = faceAt(ashaStand, seatPos) + 0.35
    holdPhonePose(A, 0.6 + 0.4 * smooth(seg(t, 25.8, 26.6)))
  } else if (t < 39.6) {
    // walks round the front of the patient and mounts the phone on the tripod at his right side (side view)
    const k = smooth(seg(t, 37.7, 39.3))
    A.root.position.lerpVectors(ashaStand, SIDE_ASHA, k); A.root.position.z += Math.sin(k * Math.PI) * 0.95
    tmpV.copy(SIDE_ASHA); A.root.rotation.y = k < 0.92 ? faceAt(ashaStand, tmpV.setZ(SIDE_ASHA.z + 1.6)) : faceAt(SIDE_ASHA, SIDE_STAND)
    walkPose(A, t * 7.5, 0.45 * (1 - k))
    holdPhonePose(A, 0.8)
  } else if (t < MOVE_T0) {
    A.root.position.copy(SIDE_ASHA); A.root.rotation.y = faceAt(SIDE_ASHA, seatPos) - 0.25
    A.shoulderL.rotation.x = -0.2; A.head.rotation.x = 0.1
    if (t < 40.4) holdPhonePose(A, 1 - seg(t, 39.6, 40.4))
  } else if (t < MOVE_T1) {
    // steps behind the tripod, carries it (phone still mounted) round to the front of the patient, then steps back
    const grip = tmpV2.copy(stand.position).addScaledVector(CARRY_DIR, -0.42)
    const carryYaw = Math.atan2(CARRY_DIR.x, CARRY_DIR.z)
    if (t < MOVE_T0 + GRIP) {
      const k = smooth(seg(t, MOVE_T0, MOVE_T0 + GRIP))
      A.root.position.lerpVectors(SIDE_ASHA, grip, k); A.root.rotation.y = lerp(faceAt(SIDE_ASHA, seatPos) - 0.25, carryYaw, k)
      walkPose(A, t * 7.5, 0.3)
    } else if (t < MOVE_T1 - GRIP) {
      A.root.position.copy(grip); A.root.rotation.y = carryYaw
      walkPose(A, t * 7.5, 0.4)
      A.shoulderR.rotation.x = -0.95; A.elbowR.rotation.x = -0.35; A.shoulderL.rotation.x = -0.95; A.elbowL.rotation.x = -0.35
      A.shoulderR.rotation.z = 0.12; A.shoulderL.rotation.z = -0.12
    } else {
      const k = smooth(seg(t, MOVE_T1 - GRIP, MOVE_T1))
      A.root.position.lerpVectors(grip, behindStand, k); A.root.rotation.y = lerp(carryYaw, Math.PI - 0.12, k)
      walkPose(A, t * 7.5, 0.3 * (1 - k))
    }
  } else if (t < T.strap) {
    A.root.position.copy(behindStand); A.root.rotation.y = Math.PI - 0.12
    A.shoulderL.rotation.x = -0.2; A.head.rotation.x = 0.1
    if (t > T.strap - 1.0) { A.shoulderR.rotation.x = -1.2; A.elbowR.rotation.x = -0.4 } // asks him to sit again
  } else if (t < POD_T - 0.2) {
    const k = smooth(seg(t, T.strap, POD_T - 0.3))
    A.root.position.lerpVectors(behindStand, kneelSpot, k); A.root.position.x += Math.sin(k * Math.PI) * 0.6
    A.root.rotation.y = k < 0.85 ? faceAt(behindStand, kneelSpot) : faceAt(kneelSpot, kneeFront)
    walkPose(A, t * 7.5, 0.4 * (1 - k))
  } else if (t < RISE_T) {
    A.root.position.copy(kneelSpot); A.root.rotation.y = faceAt(kneelSpot, kneeFront)
    kneelPose(A, 0.5)
    const w = t > WRAP_T && t < WRAP_T1 ? Math.sin(t * 6) * 0.08 : 0
    A.shoulderL.rotation.x += w; A.shoulderR.rotation.x -= w
  } else if (t < GRAB_T) {
    // back to the tripod for the phone
    const k = smooth(seg(t, RISE_T, GRAB_T))
    A.root.position.lerpVectors(kneelSpot, behindStand, k); A.root.position.x += Math.sin(k * Math.PI) * 0.5
    A.root.rotation.y = faceAt(kneelSpot, behindStand)
    walkPose(A, t * 7.5, 0.4)
  } else if (t < GRAB_T + 0.9) {
    const k = smooth(seg(t, GRAB_T, GRAB_T + 0.9))
    A.root.position.lerpVectors(behindStand, watchSpot, k)
    A.root.rotation.y = faceAt(behindStand, watchSpot)
    walkPose(A, t * 7.5, 0.4)
    holdPhonePose(A, 0.7)
  } else if (t < T.result - 0.5) {
    A.root.position.copy(watchSpot)
    A.root.rotation.y = faceAt(watchSpot, K.root.position)
    holdPhonePose(A, 0.9)
  } else {
    A.root.position.copy(ashaStand)
    A.root.rotation.y = faceAt(ashaStand, seatPos) + 0.35
    holdPhonePose(A, 1)
    if (t > T.nutrition + 3) A.head.rotation.y = -0.3
  }

  /* ---------------- villagers ---------------- */
  for (const e of extras) {
    resetPose(e.rig)
    if (e.kind === 'run' && e.c && e.rad && e.sp) {
      const a = t * e.sp + e.ph
      e.rig.root.position.set(e.c.x + Math.cos(a) * e.rad, 0, e.c.z + Math.sin(a) * e.rad)
      e.rig.root.rotation.y = -a + Math.PI
      walkPose(e.rig, t * 11 + e.ph, 0.75)
      e.rig.shoulderL.rotation.x *= 1.3
    } else if (e.kind === 'sit') {
      e.rig.root.position.copy(e.pos); e.rig.root.rotation.y = e.rot
      sitPose(e.rig, 0.62)
      e.rig.shoulderL.rotation.x = -0.5; e.rig.shoulderR.rotation.x = -0.5
      e.rig.head.rotation.y = Math.sin(t * 0.4) * 0.4
    } else {
      e.rig.root.position.copy(e.pos); e.rig.root.rotation.y = e.rot + Math.sin(t * 0.3 + e.ph) * 0.2
      e.rig.head.rotation.y = Math.sin(t * 0.7 + e.ph) * 0.4
      e.rig.shoulderR.rotation.x = Math.sin(t * 1.2 + e.ph) * 0.2
      if (e === extras[1]) { e.rig.shoulderR.rotation.x = -2.8; e.rig.elbowR.rotation.x = -0.6 }
    }
  }

  /* ---------------- pod + strap ---------------- */
  const podOn = t >= POD_T
  sensor.visible = podOn
  sensor.position.z = lerp(0.3, 0.062, smooth(seg(t, POD_T, WRAP_T)))
  sensor.position.y = lerp(-0.06, -0.11, smooth(seg(t, POD_T, WRAP_T)))
  setStrap(t < WRAP_T ? 0 : seg(t, WRAP_T, WRAP_T1))
  ;(sensor.userData.led as THREE.Mesh).visible = Math.floor(t * 3) % 2 === 0 || (t > T.strap + 6.5 && t < T.shock + 6)

  // pain glow (problem chapter)
  K.kneeL.getWorldPosition(tmpV)
  painGlow.position.copy(tmpV)
  const pk = win(t, 13.8, 17.4, 0.5)
  painGlow.visible = pk > 0.01
  painGlow.scale.setScalar((0.35 + 0.18 * Math.sin(t * 7)) * pk)

  // pairing rings (pod ↔ phone)
  sensor.getWorldPosition(tmpV)
  bleRings.forEach((r, i) => {
    const k = ((t * 0.8 + i / 3) % 1)
    r.visible = t > T.strap + 4.1 && t < WALK_T1
    r.position.copy(tmpV); r.scale.setScalar(0.05 + k * 0.45); r.material.opacity = (1 - k) * 0.85
  })

  // tibial shock: at every heel strike a pulse runs from the ankle up the tibia to the pod
  let last = -1
  for (const s of STEPS_T) if (t >= s) last = s
  const d = t - last
  const on = last > 0 && d < 0.35 && t < WALK_T1 + 0.3
  shockGlow.visible = heelRing.visible = on
  if (on) {
    const ankle = K.kneeL.localToWorld(tmpV2.set(0, -0.4, 0.02))
    const pod = sensor.getWorldPosition(new THREE.Vector3())
    const u = clamp(d / 0.22)
    shockGlow.position.lerpVectors(ankle, pod, easeOut(u))
    shockGlow.scale.setScalar(0.09 + 0.07 * Math.sin(u * Math.PI))
    shockGlow.material.opacity = 1 - smooth(seg(d, 0.22, 0.35))
    heelRing.position.copy(ankle).setY(0.03)
    heelRing.scale.setScalar(0.05 + d * 1.6); heelRing.material.opacity = 1 - d / 0.35
    ;(sensor.userData.led as THREE.Mesh).visible = d > 0.18
  }

  // ASHA pin during the wide shot
  const pinA = win(t, T.asha + 0.3, 20.4, 0.4)
  ashaPin.visible = pinA > 0
  if (pinA > 0) { A.root.getWorldPosition(ashaPin.position); ashaPin.position.y += 2.4; ashaPin.material.opacity = pinA * (0.75 + 0.25 * Math.sin(t * 6)) }

  // sync: phone → tower → PHC
  handPhone.getWorldPosition(tmpV2)
  const sk = t > T.sync + 0.5 && t < T.phc + 1.4
  const towerTop = world.towerTop, phcTop = world.phc.clone().add(v3(0, 7, 0))
  syncDots.forEach((dd, i) => {
    dd.visible = sk
    if (!sk) return
    const u = (t * 0.35 + i / syncDots.length) % 1
    if (u < 0.5) { const k = u / 0.5; dd.position.lerpVectors(tmpV2, towerTop, k); dd.position.y += Math.sin(k * Math.PI) * 12 }
    else { const k = (u - 0.5) / 0.5; dd.position.lerpVectors(towerTop, phcTop, k); dd.position.y += Math.sin(k * Math.PI) * 24 }
  })
  towerRings.forEach((r, i) => {
    const k = ((t * 0.6 + i / 3) % 1)
    r.visible = sk; r.position.copy(towerTop); r.scale.setScalar(2 + k * 16); r.material.opacity = (1 - k)
  })
  thali.visible = t > T.nutrition - 0.5 && t < T.phc
}

/* =============================== camera direction =============================== */
// architecture + impact camera path, authored with the architecture chapter starting at 116 s (shifted to T.arch below)
const ARCH_KEYS_P = [[116, -34, 74, 52], [118.2, -22, 76, 33], [121.5, -10, 76.5, 31], [125, 3, 77, 32], [128.5, 16, 77, 32], [132, 4, 86, 60], [135, 60, 150, 205], [139, 185, 140, 125], [142, 210, 118, -30], [146, 34, 42, 72], [150, 8, 14, 31]]
const ARCH_KEYS_L = [[116, -24, 72, 0], [118.2, -22, 74, 0], [121.5, -10, 74.5, 0], [125, 3, 74.5, 0], [128.5, 17, 74.5, 0], [132, 4, 73.5, 0], [135, 10, 0, 0], [139, 10, 0, 0], [142, 10, 0, 0], [146, 4, 3, 0], [150, 4, 2.5, -2]]
type Seg = { a: number; b: number; blend?: number; keys?: { p: number[][]; l: number[][] }; proc?: (t: number, p: THREE.Vector3, l: THREE.Vector3) => void }
const orbit = (c: THREE.Vector3, r: number, h: number, a0: number, a1: number, ta: number, tb: number) => (t: number, p: THREE.Vector3, l: THREE.Vector3) => {
  const a = lerp(a0, a1, seg(t, ta, tb))
  p.set(c.x + Math.sin(a) * r, h + Math.sin(t * 0.3) * 0.2, c.z + Math.cos(a) * r); l.copy(c)
}
const SEGS: Seg[] = [
  { a: 0, b: T.asha, keys: {
    p: [[0, 62, 128, 255], [3, 40, 66, 165], [6, 22, 22, 72], [9, 13, 5, 17], [11.5, 10.5, 2.6, 8.6], [14.5, 8.8, 1.45, 4.9], [17, 8.5, 1.3, 4.4]],
    l: [[0, 0, 12, -60], [3, 0, 6, -20], [6, 4, 2, 0], [9, 5.5, 1.2, 0], [11.5, 5.6, 1.0, 0.9], [14.5, 6.2, 0.6, 1.7], [17, 6.2, 0.55, 1.75]] } },
  // wide: Sunita climbing from the footbridge — the hamlet perched above the gorge
  { a: T.asha, b: 20.5, proc: (t, p, l) => {
    const k = seg(t, T.asha, 20.5)
    p.set(lerp(62, 52, k), lerp(-8, -4, k), lerp(156, 146, k))
    ashaApproach(t, l); l.lerp(v3(8, 0, 20), 0.35); l.y += 4
  } },
  // close follow on the last switchback into the courtyard
  { a: 20.5, b: T.app, proc: (t, p, l) => {
    ashaApproach(Math.min(t, 25.8), l)
    const k = smooth(seg(t, 23.4, 26))
    p.copy(l).add(v3(lerp(2.4, 3.6, k), lerp(1.6, 2.2, k), lerp(-2.4, 2.6, k)))
    l.y += lerp(1.0, 0.8, k); l.lerp(v3(7.6, 0.8, 1.6), k * 0.6)
  } },
  { a: T.app, b: T.camera, blend: 1.0, proc: orbit(v3(7.4, 0.9, 1.8), 8.5, 2.6, 0.25, 0.95, T.app, T.camera) },
  // camera test 1 — joint movement: over the tripod phone's shoulder, the right knee in profile
  { a: T.camera, b: T.posture, blend: 1.2, keys: {
    p: [[38, 9.6, 2.6, 6.6], [40, 3.35, 1.6, 3.85], [44, 3.45, 1.5, 3.75], [ROM_T1, 3.5, 1.5, 3.7], [T.posture, 4.2, 1.6, 4.4]],
    l: [[38, 7.0, 0.8, 2.0], [40, 6.35, 0.7, 1.15], [44, 6.45, 0.64, 1.15], [ROM_T1, 6.45, 0.64, 1.15], [T.posture, 6.6, 0.8, 2.0]] } },
  // camera test 2 — knee posture: the phone's point of view, both legs in frame
  { a: T.posture, b: T.strap, blend: 0.9, keys: { p: [[T.posture, 5.35, 1.5, 5.0], [T.strap, 5.55, 1.35, 4.6]], l: [[T.posture, 7.3, 0.8, 1.35], [T.strap, 7.3, 0.78, 1.35]] } },
  // strapping close-up on the right shin, then the walk to the lane + quiet standing for sensor setup
  { a: T.strap, b: T.shock, blend: 0.8, keys: {
    p: [[T.strap, 6.3, 1.25, 4.0], [POD_T, 6.15, 0.98, 2.85], [RISE_T - 0.2, 6.25, 0.92, 2.72], [RISE_T + 1.0, 7.0, 1.55, 6.1], [AT_START_T + 0.3, 6.15, 1.3, 5.1], [T.shock, 5.85, 1.15, 5.3]],
    l: [[T.strap, 7.15, 0.55, 1.6], [POD_T, 7.28, 0.42, 1.6], [RISE_T - 0.2, 7.26, 0.42, 1.58], [RISE_T + 1.0, 6.5, 0.8, 1.8], [AT_START_T + 0.3, 5.75, 0.82, 1.9], [T.shock, 5.75, 0.74, 1.9]] } },
  // walking test — side tracking shot of the right shin
  { a: T.shock, b: WALK_T1, proc: (t, p, l) => {
    const x = patientWalkX(t)
    p.set(x + 0.5, 0.95, 5.6); l.set(x + 0.9, 0.62, 1.9)
  } },
  // fly up to the floating anatomy diorama
  { a: WALK_T1, b: T.lab, keys: {
    p: [[WALK_T1, WALK_B.x + 0.5, 0.95, 5.6], [73.3, 20, 14, 36], [74.4, 14, 29, 94], [75.3, 1.6, 28.4, 84], [79, -0.4, 28.2, 81]],
    l: [[WALK_T1, WALK_B.x + 0.9, 0.62, 1.9], [73.3, 8, 14, 50], [74.4, 1.5, 27, 64], [75.3, 0.6, 27.3, 64], [79, 0.6, 27.3, 64]] } },
  // lab treadmill, then pull back to both dioramas for the novelty
  { a: T.lab, b: T.result, keys: {
    p: [[79, -0.4, 28.2, 81], [80.6, 24.5, 26.8, 79], [86, 25, 26.6, 77.5], [88.2, 12, 30.5, 101], [93, 12, 30, 99]],
    l: [[79, 0.6, 27.3, 64], [80.6, 24.5, 25.2, 64], [86, 24.5, 25.2, 64], [88.2, 12, 25.8, 64], [93, 12, 25.8, 64]] } },
  { a: T.result, b: T.nutrition, proc: orbit(v3(7.3, 0.9, 1.8), 7.5, 2.4, -0.25, 0.3, T.result, T.nutrition) },
  { a: T.nutrition, b: T.sync, blend: 1.0, keys: { p: [[101, 4.6, 1.6, 4.5], [104, 5.2, 1.25, 3.7], [111, 5.45, 1.1, 3.35]], l: [[101, 6.6, 0.6, 2.0], [104, 6.3, 0.42, 2.15], [111, 6.3, 0.4, 2.15]] } },
  { a: T.sync, b: T.phc, blend: 1.0, keys: { p: [[111, 28, 14, 42], [113.2, 118, 52, 32], [T.phc, 132, 58, 12]], l: [[111, 6, 1, 2], [113.2, 10, -5, 45], [T.phc, 10, -5, 45]] } },
  // across the gorge to the PHC, where the record lands on the medical officer's dashboard
  { a: T.phc, b: T.arch, proc: (t, p, l) => {
    const k = easeInOut(seg(t, T.phc, T.phc + 2.2))
    const phc = world.phc
    p.lerpVectors(v3(132, 58, 12), v3(phc.x + 34 + (t - T.phc) * 0.6, phc.y + 30, phc.z - 46), k)
    l.lerpVectors(v3(10, -5, 45), v3(phc.x, phc.y + 3, phc.z), k)
  } },
  { a: T.arch, b: TOTAL, blend: 1.4, keys: {
    p: ARCH_KEYS_P.map(([tt, x, y, z]) => [tt - 116 + T.arch, x, y, z]),
    l: ARCH_KEYS_L.map(([tt, x, y, z]) => [tt - 116 + T.arch, x, y, z]) } },
]
const camPos = new THREE.Vector3(), camLook = new THREE.Vector3()
function evalSeg(s: Seg, t: number, p: THREE.Vector3, l: THREE.Vector3) {
  if (s.proc) s.proc(t, p, l)
  else if (s.keys) { splineAt(s.keys.p, t, p); splineAt(s.keys.l, t, l) }
}
function cameraAt(t: number, p: THREE.Vector3, l: THREE.Vector3) {
  let i = 0; while (i < SEGS.length - 1 && t >= SEGS[i + 1].a) i++
  const s = SEGS[i]
  evalSeg(s, t, p, l)
  if (s.blend && i > 0 && t < s.a + s.blend) {
    const pp = new THREE.Vector3(), pl = new THREE.Vector3()
    evalSeg(SEGS[i - 1], s.a, pp, pl)
    const k = easeInOut((t - s.a) / s.blend)
    p.lerpVectors(pp, p, k); l.lerpVectors(pl, l, k)
  }
}

/* =============================== hero phone choreography =============================== */
type PMode = 'hand' | 'hero' | 'corner' | 'gone'
const PKEYS: [number, PMode][] = [
  [0, 'hand'], [26, 'hand'], [27, 'hero'], [38, 'hero'], [38.6, 'corner'], [T.strap, 'corner'], [T.strap + 0.5, 'hero'], [POD_T - 0.1, 'hero'], [POD_T + 0.5, 'corner'], [RISE_T, 'corner'], [RISE_T + 0.5, 'hero'], [T.shock, 'hero'], [T.shock + 0.5, 'corner'],
  [72, 'corner'], [72.5, 'gone'], [93, 'gone'], [93.6, 'hero'], [111, 'hero'], [111.6, 'corner'], [T.phc + 0.4, 'corner'], [T.phc + 1.0, 'gone'],
]
const poseP = { a: new THREE.Vector3(), b: new THREE.Vector3() }, poseQ = { a: new THREE.Quaternion(), b: new THREE.Quaternion() }
function modePose(m: PMode, t: number, pos: THREE.Vector3, q: THREE.Quaternion) {
  if (m === 'hand') {
    handPhone.getWorldPosition(pos); handPhone.getWorldQuaternion(q)
    return 0.072
  }
  const asp = camera.aspect
  const wide = asp > 1.15
  let off: THREE.Vector3, s: number, ry: number
  if (m === 'hero') { off = v3(wide ? 0.5 * Math.min(1.25, asp / 1.78) : 0, wide ? -0.06 : -0.02, -2.5); s = wide ? 0.69 : 0.78; ry = -0.2 }
  else { off = wide ? v3(0.98 * Math.min(1.3, asp / 1.78), -0.12, -2.6) : v3(0.2, -0.42, -2.6); s = m === 'gone' ? 0.0001 : wide ? 0.5 : 0.36; ry = -0.32 }
  pos.copy(off).applyMatrix4(camera.matrixWorld)
  q.copy(camera.quaternion).multiply(tmpQ.setFromEuler(new THREE.Euler(Math.sin(t * 0.5) * 0.04, ry + Math.sin(t * 0.6) * 0.06, 0)))
  return s
}
function phoneMode(t: number): PMode {
  let i = 0; while (i < PKEYS.length - 1 && t >= PKEYS[i + 1][0]) i++
  return PKEYS[i][1]
}
function updateHeroPhone(t: number) {
  let i = 0; while (i < PKEYS.length - 1 && t >= PKEYS[i + 1][0]) i++
  const [ta, ma] = PKEYS[i], [tb, mb] = PKEYS[Math.min(i + 1, PKEYS.length - 1)]
  if ((ma === 'hand' && mb === 'hand') || (ma === 'gone' && mb === 'gone') || i === PKEYS.length - 1) { heroPhone.visible = false; heroGlow.visible = false; return }
  heroPhone.visible = true
  const k = tb > ta ? easeInOut((t - ta) / (tb - ta)) : 1
  const sa = modePose(ma, t, poseP.a, poseQ.a), sb = modePose(mb, t, poseP.b, poseQ.b)
  heroPhone.position.lerpVectors(poseP.a, poseP.b, k)
  heroPhone.quaternion.slerpQuaternions(poseQ.a, poseQ.b, k)
  heroPhone.scale.setScalar(lerp(sa, sb, k))
  heroGlow.visible = true
  heroGlow.material.opacity = 0.75 * (ma === 'hand' ? k : mb === 'hand' ? 1 - k : 1)
}

/* =============================== PHC dashboard monitor =============================== */
function updateMonitor(t: number) {
  const k = monitorK(t)
  dash.group.visible = k > 0.002
  if (!dash.group.visible) return
  dash.render(t)
  const dist = 2.5
  const visH = 2 * dist * Math.tan((camera.fov * DEG) / 2), visW = visH * camera.aspect
  const s = Math.min(1, (visW * 0.94) / dash.size.w, (visH * 0.8) / dash.size.h)
  const wideAsp = camera.aspect > 1.15
  tmpV.set(0, (wideAsp ? -0.09 : 0) - (1 - k) * 0.5, -dist).applyMatrix4(camera.matrixWorld)
  dash.group.position.copy(tmpV)
  dash.group.quaternion.copy(camera.quaternion).multiply(tmpQ.setFromEuler(new THREE.Euler(-0.04 * (1 - k), Math.sin(t * 0.35) * 0.025, 0)))
  dash.group.scale.setScalar(s * (0.9 + 0.1 * k))
}

/* =============================== 2D overlay (minimal text) =============================== */
const CAPTIONS: [number, number, string, string, boolean?][] = [
  [9.6, 16.6, 'Knee pain, high in the hills', 'The nearest PHC is across the gorge'],
  [17.4, 20.2, 'Meet Sunita, ASHA worker', 'She walks these hills — SAATHI is her screening kit'],
  [96.2, 100.6, 'Screening risk in minutes', 'A smarter referral, not a diagnosis', true],
  [111.8, 115.6, 'Syncs when the network returns', 'The record travels to PHC Rongli, across the gorge'],
  [T.impact + 1.2, T.impact + 6.8, 'Every hill hamlet. Earlier care.', ''],
]
const HEADERS: [number, number, string, string][] = [
  [38.8, T.posture - 0.3, 'Test 1 of 2 · Joint movement', 'Seated, side view · knee bends and straightens in the camera plane'],
  [T.posture + 0.5, T.strap - 0.4, 'Test 2 of 2 · Knee posture', 'Standing still for 5 s · left vs right knee angle (hip – knee – ankle)'],
  [T.strap + 0.3, 61.3, 'Pod strapped just below the knee', 'On the front of the shin bone (tibia) · light facing forward'],
  [61.8, 64.2, 'Pod paired over Bluetooth', 'SAATHI Sensor SP-8842 · signal strong · battery 88%'],
  [64.5, T.shock - 0.2, 'Sensor setup · 3 s of quiet standing', 'The pod learns its resting position before the walk'],
  [67.4, 72.2, 'Walk test · tibial shock at every step', 'The pod counts each heel strike and classes it LOW · MID · HIGH'],
  [101.4, 110.6, "Care doesn't stop at screening", 'A local diet plan matched to the risk band'],
]
const STEP_GROUPS: { title: string; from: number; to: number; names: string[] }[] = [
  { title: 'APP FLOW · INTAKE', from: 0, to: 5, names: ['Sign in', 'Language', 'Dashboard', 'Register patient', 'Select joint', 'Symptoms'] },
  { title: 'SCREENING · CAMERA', from: 6, to: 7, names: ['Test 1 · Joint movement', 'Test 2 · Knee posture'] },
  { title: 'SCREENING · SENSOR POD', from: 8, to: 11, names: ['Strap pod below knee', 'Pair pod', 'Sensor setup', 'Walk test · tibial shock'] },
  { title: 'OUTCOME', from: 12, to: 16, names: ['On-device analysis', 'Risk result', 'Guidance', 'Nutrition plan', 'Report & sync'] },
]
const logoForOverlay = new Image(); logoForOverlay.src = logoUrl
const markForOverlay = new Image(); markForOverlay.src = markUrl
;(document.getElementById('brandMark') as HTMLImageElement).src = markUrl
;(document.getElementById('startLogo') as HTMLImageElement).src = logoUrl
;(document.getElementById('podImg1') as HTMLImageElement).src = pod1
;(document.getElementById('podImg2') as HTMLImageElement).src = pod2
;(document.getElementById('podImg3') as HTMLImageElement).src = pod3
void logoImg; void markImg

type P2 = { x: number; y: number; front: boolean }
function project(v: THREE.Vector3, W: number, H: number): P2 {
  const p = v.clone().project(camera)
  return { x: (p.x * 0.5 + 0.5) * W, y: (-p.y * 0.5 + 0.5) * H, front: p.z < 1 }
}
const wp = (o: THREE.Object3D, local?: THREE.Vector3) => local ? o.localToWorld(local.clone()) : o.getWorldPosition(new THREE.Vector3())
function txt(ctx: CanvasRenderingContext2D, s: string, x: number, y: number, size: number, weight: number, color: string, align: CanvasTextAlign = 'left') {
  ctx.font = `${weight} ${size}px ${FONT}`; ctx.fillStyle = color; ctx.textAlign = align; ctx.textBaseline = 'middle'; ctx.fillText(s, x, y)
}
function pill(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, fill: string) { roundRect(ctx, x, y, w, h, h / 2); ctx.fillStyle = fill; ctx.fill() }
function card(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number, fill = 'rgba(255,255,255,0.95)') {
  ctx.save(); ctx.shadowColor = 'rgba(0,0,0,0.22)'; ctx.shadowBlur = 24; roundRect(ctx, x, y, w, h, r); ctx.fillStyle = fill; ctx.fill(); ctx.restore()
}
function dot(ctx: CanvasRenderingContext2D, p: P2, r: number, fill: string, stroke = '#FFFFFF', lw = 2) {
  ctx.beginPath(); ctx.arc(p.x, p.y, r, 0, Math.PI * 2); ctx.fillStyle = fill; ctx.fill(); ctx.strokeStyle = stroke; ctx.lineWidth = lw; ctx.stroke()
}
function line(ctx: CanvasRenderingContext2D, a: P2, b: P2, color: string, lw: number, dash: number[] = []) {
  ctx.setLineDash(dash); ctx.strokeStyle = color; ctx.lineWidth = lw; ctx.lineCap = 'round'
  ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); ctx.setLineDash([])
}
/** labelled callout from a 3D anchor */
function callout(ctx: CanvasRenderingContext2D, u: number, at: P2, dx: number, dy: number, title: string, sub = '', accent = '#00685F') {
  if (!at.front) return
  const lx = at.x + dx * u, ly = at.y + dy * u
  line(ctx, at, { x: lx, y: ly, front: true }, '#FFFFFF', 2.5 * u)
  dot(ctx, at, 7 * u, accent, '#FFFFFF', 3 * u)
  ctx.font = `800 ${21 * u}px ${FONT}`
  const w1 = ctx.measureText(title).width
  ctx.font = `600 ${16 * u}px ${FONT}`
  const w = Math.max(w1, sub ? ctx.measureText(sub).width : 0) + 40 * u
  const h = (sub ? 66 : 46) * u
  const bx = dx < 0 ? lx - w : lx
  card(ctx, bx, ly - h / 2, w, h, 16 * u)
  ctx.fillStyle = accent; roundRect(ctx, bx, ly - h / 2, 7 * u, h, 3 * u); ctx.fill()
  txt(ctx, title, bx + 20 * u, sub ? ly - 12 * u : ly, 21 * u, 800, '#0B2E2B')
  if (sub) txt(ctx, sub, bx + 20 * u, ly + 15 * u, 16 * u, 600, '#4F6B68')
}
/** scrolling trace of g over the last `span` seconds */
function trace(ctx: CanvasRenderingContext2D, u: number, x: number, y: number, w: number, h: number, t: number, fn: (tt: number) => number, ymax: number, color: string, span = 3.2) {
  ctx.strokeStyle = color; ctx.lineWidth = 3.5 * u; ctx.lineJoin = 'round'
  ctx.beginPath()
  const N = 220
  for (let i = 0; i <= N; i++) {
    const tt = t - span + (span * i) / N
    const g = clamp(fn(tt) / ymax)
    const px = x + (w * i) / N, py = y + h - g * h
    if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py)
  }
  ctx.stroke()
}
function graphPanel(ctx: CanvasRenderingContext2D, u: number, x: number, y: number, w: number, h: number, title: string, ymax: number) {
  card(ctx, x, y, w, h, 24 * u, 'rgba(10,32,30,0.82)')
  txt(ctx, title, x + 26 * u, y + 32 * u, 18 * u, 800, '#99EFE5')
  txt(ctx, 'illustrative values', x + w - 24 * u, y + 32 * u, 13 * u, 600, 'rgba(255,255,255,0.55)', 'right')
  const gx = x + 60 * u, gy = y + 58 * u, gw = w - 86 * u, gh = h - 92 * u
  ctx.strokeStyle = 'rgba(255,255,255,0.12)'; ctx.lineWidth = 1
  for (let gv = 0; gv <= ymax; gv += ymax > 6 ? 2 : 1) {
    const yy = gy + gh - (gv / ymax) * gh
    ctx.beginPath(); ctx.moveTo(gx, yy); ctx.lineTo(gx + gw, yy); ctx.stroke()
    txt(ctx, `${gv} g`, gx - 10 * u, yy, 12 * u, 600, 'rgba(255,255,255,0.5)', 'right')
  }
  return { gx, gy, gw, gh }
}
function header(ctx: CanvasRenderingContext2D, u: number, W: number, k: number, title: string, sub: string) {
  ctx.globalAlpha = k
  ctx.font = `800 ${32 * u}px ${FONT}`
  const w = Math.max(ctx.measureText(title).width, (ctx.font = `600 ${19 * u}px ${FONT}`, ctx.measureText(sub).width)) + 80 * u
  card(ctx, W / 2 - w / 2, 70 * u - (1 - k) * 14 * u, w, 92 * u, 46 * u)
  txt(ctx, title, W / 2, 104 * u - (1 - k) * 14 * u, 32 * u, 800, '#004F48', 'center')
  txt(ctx, sub, W / 2, 140 * u - (1 - k) * 14 * u, 19 * u, 600, '#2F8981', 'center')
  ctx.globalAlpha = 1
}

const shockFn = (tt: number) => pulse(tt, ANAT_T0, ANAT_PERIOD, tt < ANAT_WORN ? PEAKS.healthyWalk : PEAKS.oaWalk)
const LAB_P0 = LAB_T0 + 0.2 * RUN_PERIOD - 0.05
const labFn = (tt: number) => tt < LAB_T0 ? 1 : pulse(tt, LAB_P0, RUN_PERIOD, tt < LAB_SWAP ? PEAKS.hardShoe : PEAKS.cushionShoe)

function drawOverlay(t: number) {
  const W = overlay.width, H = overlay.height
  const wide = camera.aspect > 1.15
  const u = wide ? Math.min(W / 1920, H / 1080) : W / 1150
  const ctx = octx
  ctx.clearRect(0, 0, W, H)
  ctx.save()

  // ----- intro title -----
  const ia = win(t, 0.6, 8.3, 0.8)
  if (ia > 0) {
    ctx.globalAlpha = ia
    const cw = 300 * u, cx = W / 2, cy = H * 0.4 - (1 - ia) * 20 * u
    ctx.save(); ctx.shadowColor = 'rgba(0,0,0,0.25)'; ctx.shadowBlur = 40 * u
    roundRect(ctx, cx - cw / 2, cy - cw / 2, cw, cw, 44 * u); ctx.fillStyle = 'rgba(255,255,255,0.96)'; ctx.fill(); ctx.restore()
    if (logoForOverlay.complete) ctx.drawImage(logoForOverlay, cx - cw / 2 + 14 * u, cy - cw / 2 + 14 * u, cw - 28 * u, cw - 28 * u)
    const tag = 'AI-assisted knee osteoarthritis screening for India\u2019s hill villages'
    ctx.font = `700 ${32 * u}px ${FONT}`; const tw = ctx.measureText(tag).width + 64 * u
    pill(ctx, cx - tw / 2, cy + cw / 2 + 26 * u, tw, 60 * u, 'rgba(0,40,36,0.78)')
    txt(ctx, tag, cx, cy + cw / 2 + 57 * u, 32 * u, 700, '#FFFFFF', 'center')
    ctx.globalAlpha = 1
  }

  // ----- chapter tag -----
  const ch = chapterAt(t)
  if (ch > 0 && ch < CHAPTERS.length - 1) {
    const a = win(t, CHAPTERS[ch].t + 0.2, CHAPTERS[ch].t + 3.2, 0.4)
    if (a > 0) {
      ctx.globalAlpha = a
      const label = CHAPTERS[ch].name.toUpperCase()
      ctx.font = `800 ${20 * u}px ${FONT}`
      const w = ctx.measureText(label).width + 110 * u
      const y0 = wide ? 96 * u : 190 * u
      pill(ctx, 60 * u, y0, w, 50 * u, 'rgba(0,79,72,0.88)')
      pill(ctx, 66 * u, y0 + 6 * u, 52 * u, 38 * u, '#99EFE5')
      txt(ctx, String(ch).padStart(2, '0'), 92 * u, y0 + 25 * u, 18 * u, 800, '#004F48', 'center')
      txt(ctx, label, 132 * u, y0 + 26 * u, 20 * u, 800, '#FFFFFF')
      ctx.globalAlpha = 1
    }
  }

  // ----- lower-third captions -----
  for (const [a, b, title, sub, left] of CAPTIONS) {
    const k = win(t, a, b, 0.6)
    if (k <= 0) continue
    ctx.globalAlpha = k
    const g = ctx.createLinearGradient(0, H * 0.62, 0, H)
    g.addColorStop(0, 'rgba(0,20,18,0)'); g.addColorStop(1, 'rgba(0,20,18,0.55)')
    ctx.fillStyle = g; ctx.fillRect(0, H * 0.62, W, H * 0.38)
    const y = H - 190 * u + (1 - k) * 20 * u
    const lx = left && wide ? 70 * u : W / 2, al: CanvasTextAlign = left && wide ? 'left' : 'center'
    {
      ctx.font = `800 ${(left ? 54 : 62) * u}px ${FONT}`; let bw = ctx.measureText(title).width
      if (sub) { ctx.font = `600 ${28 * u}px ${FONT}`; bw = Math.max(bw, ctx.measureText(sub).width) }
      bw += 80 * u; const bh = (sub ? 150 : 96) * u, bx = al === 'left' ? lx - 40 * u : lx - bw / 2
      card(ctx, bx, y - 52 * u, bw, bh, 30 * u, 'rgba(0,36,32,0.62)')
    }
    ctx.shadowColor = 'rgba(0,0,0,0.35)'; ctx.shadowBlur = 10 * u
    txt(ctx, title, lx, y, (left ? 54 : 62) * u, 800, '#FFFFFF', al)
    if (sub) txt(ctx, sub, lx, y + 58 * u, 28 * u, 600, '#D5F8F5', al)
    ctx.shadowBlur = 0; ctx.globalAlpha = 1
  }
  for (const [a, b, title, sub] of HEADERS) { const k = win(t, a, b, 0.5); if (k > 0) header(ctx, u, W, k, title, sub) }

  // ----- ASHA pin -----
  const pinA = win(t, T.asha + 0.3, 20.4, 0.4)
  if (pinA > 0) {
    const p = project(wp(A.root).add(v3(0, 2.6, 0)), W, H)
    if (p.front) { ctx.globalAlpha = pinA; callout(ctx, u, p, 60, -70, 'Sunita · ASHA', 'climbing to Tashi\u2019s hamlet', '#E84C8B'); ctx.globalAlpha = 1 }
  }

  // ----- app flow step rail -----
  const mode = phoneMode(t)
  const railOn = (t > 26.3 && t < 72.2) || (t > 93.6 && t < T.phc)
  if (railOn && wide && (mode === 'hero' || mode === 'corner' || t < 27)) {
    const cur = screenAt(t)
    const grp = STEP_GROUPS.find(g => cur.idx >= g.from && cur.idx <= g.to)!
    const a = Math.min(smooth(seg(t, 26.3, 27.3)), 1 - smooth(seg(t, 71.4, 72.2)), t > 93 ? smooth(seg(t, 93.6, 94.4)) : 1, 1 - smooth(seg(t, T.phc - 0.8, T.phc)))
    ctx.globalAlpha = a
    const x = 70 * u, rowH = 58 * u
    const top = H / 2 - (grp.names.length * rowH) / 2 + 30 * u
    roundRect(ctx, x - 24 * u, top - 50 * u, 430 * u, grp.names.length * rowH + 76 * u, 28 * u)
    ctx.fillStyle = 'rgba(0,40,36,0.58)'; ctx.fill()
    txt(ctx, grp.title, x, top - 14 * u, 16 * u, 800, '#99EFE5')
    grp.names.forEach((n, i) => {
      const idx = grp.from + i
      const y = top + 26 * u + i * rowH
      const active = idx === cur.idx, done = idx < cur.idx
      if (active) pill(ctx, x - 10 * u, y - 23 * u, 392 * u, 46 * u, '#FFFFFF')
      ctx.beginPath(); ctx.arc(x + 16 * u, y, 14 * u, 0, Math.PI * 2)
      ctx.fillStyle = active ? '#00685F' : done ? '#99EFE5' : 'rgba(255,255,255,0.25)'; ctx.fill()
      if (done) { ctx.strokeStyle = '#004F48'; ctx.lineWidth = 3.5 * u; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x + 9 * u, y); ctx.lineTo(x + 14 * u, y + 6 * u); ctx.lineTo(x + 24 * u, y - 6 * u); ctx.stroke() }
      else txt(ctx, String(idx + 1), x + 16 * u, y + 1 * u, 13 * u, 800, '#FFFFFF', 'center')
      txt(ctx, n, x + 44 * u, y + 1 * u, 22 * u, active ? 800 : 600, active ? '#004F48' : done ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.6)')
      if (active) progressBar(ctx, x + 44 * u, y + 15 * u, 290 * u, 4 * u, cur.p)
    })
    ctx.globalAlpha = 1
  }

  // ----- camera tests: view frustum + pose skeleton -----
  const side = t < MOVE_T0 + 0.5
  const fa = side ? win(t, 39.9, MOVE_T0, 0.5) : win(t, MOVE_T1 + 0.1, T.strap - 0.3, 0.5)
  if (fa > 0) {
    ctx.globalAlpha = fa * 0.9
    const lens = project(wp(standPhone, v3(0, 0.6, -0.15)), W, H)
    const cs = (side
      ? [v3(7.1, 0.02, 0.5), v3(7.1, 0.02, 2.05), v3(7.1, 1.4, 2.05), v3(7.1, 1.4, 0.5)]
      : [v3(6.65, 0.02, 1.4), v3(7.75, 0.02, 1.4), v3(7.75, 1.75, 1.4), v3(6.65, 1.75, 1.4)]).map(c => project(c, W, H))
    if (lens.front && cs.every(c => c.front)) {
      ctx.beginPath(); cs.forEach((c, i) => i ? ctx.lineTo(c.x, c.y) : ctx.moveTo(c.x, c.y)); ctx.closePath()
      ctx.fillStyle = 'rgba(124,255,233,0.07)'; ctx.fill(); ctx.strokeStyle = 'rgba(124,255,233,0.7)'; ctx.lineWidth = 2 * u; ctx.stroke()
      cs.forEach(c => line(ctx, lens, c, 'rgba(124,255,233,0.45)', 1.5 * u, [8 * u, 8 * u]))
      dot(ctx, lens, 6 * u, '#7CFFE9')
    }
    ctx.globalAlpha = 1
  }
  const ra = win(t, ROM_T0 - 0.6, ROM_T1 + 0.8, 0.4)
  if (ra > 0) {
    ctx.globalAlpha = ra
    const hip = project(wp(K.legL), W, H), knee = project(wp(K.kneeL), W, H), ank = project(wp(K.kneeL, v3(0, -0.42, 0)), W, H)
    if (hip.front && knee.front && ank.front) {
      line(ctx, hip, knee, '#FFD166', 6 * u); line(ctx, knee, ank, '#FFD166', 6 * u)
      for (const p of [hip, knee, ank]) dot(ctx, p, 8 * u, '#FFB703')
      const a1 = Math.atan2(hip.y - knee.y, hip.x - knee.x), a2 = Math.atan2(ank.y - knee.y, ank.x - knee.x)
      let da = a2 - a1; while (da > Math.PI) da -= Math.PI * 2; while (da < -Math.PI) da += Math.PI * 2
      ctx.beginPath(); ctx.moveTo(knee.x, knee.y); ctx.arc(knee.x, knee.y, 46 * u, a1, a1 + da, da < 0); ctx.closePath()
      ctx.fillStyle = 'rgba(255,209,102,0.35)'; ctx.fill()
      callout(ctx, u, knee, -250, 120, `Joint angle ${Math.round(jointAngle(t))}°`, `range of motion ${Math.round(romSoFar(t))}°`, '#FFB703')
    }
    ctx.globalAlpha = 1
  }
  const pa = win(t, T.posture + 1.1, T.strap - 0.7, 0.4)
  if (pa > 0) {
    ctx.globalAlpha = pa
    const P = (o: THREE.Object3D, l?: THREE.Vector3) => project(wp(o, l), W, H)
    // MediaPipe landmarks 24-26-28 (right) and 23-25-27 (left): hip – knee – ankle
    const legs: [THREE.Object3D, THREE.Object3D, string, number, number][] = [
      [K.legL, K.kneeL, 'Right knee', postureLive(t, 'right'), -1],
      [K.legR, K.kneeR, 'Left knee', postureLive(t, 'left'), 1],
    ]
    for (const [hipO, kneeO, name, val, side] of legs) {
      const hip = P(hipO), knee = P(kneeO), ank = P(kneeO, v3(0, -0.42, 0.02))
      if (!(hip.front && knee.front && ank.front)) continue
      line(ctx, hip, knee, '#FFD166', 6 * u); line(ctx, knee, ank, '#FFD166', 6 * u)
      for (const q of [hip, knee, ank]) dot(ctx, q, 8 * u, '#FFB703')
      callout(ctx, u, knee, side * 170, -30, `${name} ${val.toFixed(1)}°`, 'hip – knee – ankle', '#FFB703')
    }
    // 5-second hold + symmetry
    const k = clamp((t - POSTURE.t0) / (POSTURE.t1 - POSTURE.t0))
    const bw = 560 * u, bh = 128 * u, bx = 70 * u, by = H - bh - 120 * u
    card(ctx, bx, by, bw, bh, 26 * u, 'rgba(10,32,30,0.85)')
    const rx = bx + 66 * u, ry = by + bh / 2, rr0 = 40 * u
    ctx.lineCap = 'round'
    ctx.beginPath(); ctx.arc(rx, ry, rr0, 0, Math.PI * 2); ctx.strokeStyle = 'rgba(255,255,255,0.15)'; ctx.lineWidth = 8 * u; ctx.stroke()
    ctx.beginPath(); ctx.arc(rx, ry, rr0, -Math.PI / 2, -Math.PI / 2 + k * Math.PI * 2); ctx.strokeStyle = '#99EFE5'; ctx.stroke()
    txt(ctx, k < 1 ? `${Math.max(0, 5 - k * 5).toFixed(0)}s` : '✓', rx, ry + 1 * u, 24 * u, 800, '#FFFFFF', 'center')
    txt(ctx, k < 1 ? 'STANDING STILL · 5 s' : 'POSTURE DATA SUFFICIENT', bx + 130 * u, by + 38 * u, 15 * u, 800, '#99EFE5')
    txt(ctx, 'Symmetry difference', bx + 130 * u, by + 74 * u, 20 * u, 700, '#FFFFFF')
    txt(ctx, `${Math.abs(postureLive(t, 'left') - postureLive(t, 'right')).toFixed(1)}°`, bx + bw - 30 * u, by + 74 * u, 30 * u, 800, '#FFD166', 'right')
    txt(ctx, 'right knee rests more bent than the left', bx + 130 * u, by + 104 * u, 14 * u, 600, 'rgba(255,255,255,0.65)')
    ctx.globalAlpha = 1
  }

  // ----- strapping callout -----
  const sa = win(t, WRAP_T + 0.3, RISE_T - 0.1, 0.4)
  if (sa > 0) {
    ctx.globalAlpha = sa
    callout(ctx, u, project(wp(sensor), W, H), -190, 110, 'SAATHI pod on the tibia', 'just below the right knee · light forward', '#00685F')
    ctx.globalAlpha = 1
  }

  // ----- walking test: peak g at each heel strike -----
  const wa = win(t, STEPS_T[0] - 0.4, WALK_T1 - 0.1, 0.3)
  if (wa > 0) {
    ctx.globalAlpha = wa
    const n = stepsDone(t)
    const pod = project(wp(sensor), W, H)
    const cls = n ? STEP_CLASS[n - 1] : ''
    const ccol = cls === 'HIGH' ? '#E5484D' : '#FF8A00'
    callout(ctx, u, pod, 70, -190, n ? `Step ${n} · ${cls} shock` : 'Recording…', n ? `peak ≈ ${STEP_PEAKS[n - 1].toFixed(1)} g (illustrative)` : 'walk 5 easy steps', n ? ccol : '#00685F')
    const pw = 520 * u, ph = 210 * u, px = 70 * u, py = H - ph - 70 * u
    const gp = graphPanel(ctx, u, px, py, pw, ph, 'TIBIAL ACCELERATION', 4)
    trace(ctx, u, gp.gx, gp.gy, gp.gw, gp.gh, t, shockAt, 4, '#FFB703', 2.4)
    // per-step classes, as the pod reports them (StepHistory)
    STEP_CLASS.forEach((c, i) => {
      const on = i < n, cx = px + i * 104 * u
      pill(ctx, cx, py - 62 * u, 94 * u, 44 * u, on ? (c === 'HIGH' ? '#E5484D' : '#FF8A00') : 'rgba(10,32,30,0.55)')
      txt(ctx, on ? `${i + 1} · ${c}` : `${i + 1} · —`, cx + 47 * u, py - 40 * u, 17 * u, 800, '#FFFFFF', 'center')
    })
    ctx.globalAlpha = 1
  }

  // ----- anatomy explainer -----
  const an = win(t, 74.2, T.lab - 0.2, 0.5)
  if (an > 0) {
    ctx.globalAlpha = an
    header(ctx, u, W, an, 'What is tibial shock?', 'Each heel strike sends a jolt up the shin to the knee')
    const worn = t > ANAT_WORN
    const P = (o: THREE.Object3D, l?: THREE.Vector3) => project(wp(o, l), W, H)
    callout(ctx, u, P(lab.anat, v3(0.2, 0.3, 0)), -120, 40, 'Heel strike', '', '#FFB703')
    callout(ctx, u, P(lab.pod), 160, 30, 'Pod measures peak g', 'IMU on the tibia', '#00685F')
    callout(ctx, u, P(lab.cart), 150, -110, worn ? 'Worn cartilage · stiff gait' : 'Healthy cartilage', worn ? 'sharper, higher shock' : 'shock is damped', worn ? '#E5484D' : '#2EC4B6')
    const pw = 560 * u, ph = 230 * u, px = 70 * u, py = H - ph - 70 * u
    const gp = graphPanel(ctx, u, px, py, pw, ph, worn ? 'STIFF OA GAIT' : 'HEALTHY GAIT', 4)
    trace(ctx, u, gp.gx, gp.gy, gp.gw, gp.gh, t, shockFn, 4, worn ? '#FF5A36' : '#2EC4B6')
    txt(ctx, `peak ≈ ${worn ? PEAKS.oaWalk : PEAKS.healthyWalk} g`, px + pw - 26 * u, py + ph - 22 * u, 20 * u, 800, '#FFFFFF', 'right')
    ctx.globalAlpha = 1
  }

  // ----- lab validation -----
  const la = win(t, 80.4, NOVEL_T0 + 0.2, 0.5)
  if (la > 0) {
    ctx.globalAlpha = la
    header(ctx, u, W, la, 'The method footwear labs use', 'Published tibial-accelerometer research · Saathi adapts it as screening support')
    const hard = t < LAB_SWAP
    const P = (o: THREE.Object3D) => project(wp(o), W, H)
    callout(ctx, u, P(lab.accel), -190, -70, 'Tibial accelerometer', '', '#3A86FF')
    callout(ctx, u, P(lab.ankle), 150, 40, hard ? 'Hard sole' : 'Cushioned shoe', hard ? 'high peak' : 'lower peak', hard ? '#E5484D' : '#2EC4B6')
    const pw = 560 * u, ph = 230 * u, px = 70 * u, py = H - ph - 70 * u
    const gp = graphPanel(ctx, u, px, py, pw, ph, 'PEAK TIBIAL ACCELERATION', 10)
    trace(ctx, u, gp.gx, gp.gy, gp.gw, gp.gh, t, labFn, 10, hard ? '#FF5A36' : '#2EC4B6', 2.6)
    // bar comparison
    const bk = smooth(seg(t, LAB_SWAP + 1.4, LAB_SWAP + 2.4))
    if (bk > 0) {
      const bx = W - (wide ? 520 : 400) * u, by = H - 300 * u
      card(ctx, bx, by, 420 * u, 230 * u, 24 * u)
      txt(ctx, 'Lower peak = better cushioning', bx + 24 * u, by + 34 * u, 18 * u, 800, '#004F48')
      const bars: [string, number, string][] = [['Hard sole', PEAKS.hardShoe, '#FF5A36'], ['Cushioned', PEAKS.cushionShoe, '#2EC4B6']]
      bars.forEach(([n, v, c], i) => {
        const yy = by + 80 * u + i * 66 * u
        txt(ctx, n, bx + 24 * u, yy + 14 * u, 17 * u, 700, '#2B3A39')
        roundRect(ctx, bx + 140 * u, yy, 220 * u * (v / 10) * bk, 28 * u, 8 * u); ctx.fillStyle = c; ctx.fill()
        txt(ctx, `${v} g`, bx + 150 * u + 220 * u * (v / 10) * bk, yy + 14 * u, 17 * u, 800, '#2B3A39')
      })
      txt(ctx, 'illustrative values', bx + 24 * u, by + 206 * u, 13 * u, 600, '#7A8A88')
    }
    ctx.globalAlpha = 1
  }

  // ----- novelty -----
  const na = win(t, NOVEL_T0 + 0.6, T.result - 0.2, 0.5)
  if (na > 0) {
    ctx.globalAlpha = na
    header(ctx, u, W, na, 'Same physics. New place: the doorstep.', 'Labs change the shoe and keep the runner · SAATHI keeps the footwear and measures the person')
    const items = ['Published method, no lab needed', 'Camera ROM + posture + shock', 'Low-cost pod · works offline', 'Run by ASHA workers']
    ctx.font = `800 ${20 * u}px ${FONT}`
    const pws = items.map(s => ctx.measureText(s).width + 84 * u), gap = 18 * u
    const rows = pws.reduce((a, b) => a + b, 0) + gap * 3 < W - 60 * u ? [[0, 1, 2, 3]] : [[0, 1], [2, 3]]
    items.forEach((s, i) => {
      const k = smooth(seg(t, NOVEL_T0 + 1.2 + i * 0.35, NOVEL_T0 + 2 + i * 0.35)) * na
      ctx.globalAlpha = k
      const r = rows.findIndex(row => row.includes(i)), row = rows[r]
      const total = row.reduce((a, j) => a + pws[j], 0) + gap * (row.length - 1)
      let x = W / 2 - total / 2; for (const j of row) { if (j === i) break; x += pws[j] + gap }
      const pw = pws[i], y = H - (rows.length === 1 ? 165 : 250) * u + r * 76 * u + (1 - k) * 20 * u
      pill(ctx, x, y - 30 * u, pw, 60 * u, 'rgba(255,255,255,0.95)')
      ctx.beginPath(); ctx.arc(x + 32 * u, y, 12 * u, 0, Math.PI * 2); ctx.fillStyle = ['#2EC4B6', '#FFB703', '#3A86FF', '#E84C8B'][i]; ctx.fill()
      txt(ctx, s, x + 56 * u, y + 1 * u, 20 * u, 800, '#004F48')
    })
    // LAB → DOORSTEP tags over the dioramas
    ctx.globalAlpha = na
    const la3 = project(lab.lab.position.clone().add(v3(0, 9, 0)), W, H), an3 = project(lab.anat.position.clone().add(v3(0, 13.5, 0)), W, H)
    if (la3.front && an3.front) {
      const tag = (p: P2, s: string, c: string) => { ctx.font = `800 ${22 * u}px ${FONT}`; const w = ctx.measureText(s).width + 44 * u; pill(ctx, p.x - w / 2, p.y - 24 * u, w, 48 * u, c); txt(ctx, s, p.x, p.y + 1 * u, 22 * u, 800, '#FFFFFF', 'center') }
      tag(la3, 'SPORTS LAB', '#3A86FF'); tag(an3, 'SAATHI · DOORSTEP', '#00685F')
      ctx.strokeStyle = '#FFFFFF'; ctx.lineWidth = 4 * u; ctx.setLineDash([12 * u, 10 * u])
      ctx.beginPath(); ctx.moveTo(la3.x - 120 * u, la3.y); ctx.lineTo(an3.x + 160 * u, an3.y); ctx.stroke(); ctx.setLineDash([])
      const ax = an3.x + 160 * u, ay = an3.y
      ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(ax + 18 * u, ay - 12 * u); ctx.lineTo(ax + 18 * u, ay + 12 * u); ctx.closePath(); ctx.fillStyle = '#FFFFFF'; ctx.fill()
    }
    ctx.globalAlpha = 1
  }

  // ----- architecture header -----
  const ar = win(t, T.arch + 1.6, T.impact - 0.4, 0.6)
  if (ar > 0) {
    ctx.globalAlpha = ar
    pill(ctx, W / 2 - 480 * u, 80 * u, 960 * u, 96 * u, 'rgba(255,255,255,0.95)')
    txt(ctx, 'How SAATHI works', W / 2, 114 * u, 38 * u, 800, '#004F48', 'center')
    txt(ctx, 'Camera + pod → phone (on-device AI) → cloud → PHC  ·  offline-first', W / 2, 151 * u, 21 * u, 600, '#2F8981', 'center')
    ctx.globalAlpha = 1
  }

  // ----- impact pills -----
  const ip = win(t, T.impact + 2.5, T.end - 0.4, 0.6)
  if (ip > 0) {
    const items = ['Doorstep screening', 'Lab-grade biomechanics', 'Diet + care plan', '6 Indian languages']
    const pw = 340 * u, gap = 22 * u, total = items.length * pw + (items.length - 1) * gap
    items.forEach((s, i) => {
      const k = smooth(seg(t, T.impact + 2.5 + i * 0.35, T.impact + 3.3 + i * 0.35)) * ip
      ctx.globalAlpha = k
      const x = W / 2 - total / 2 + i * (pw + gap), y = H - 100 * u + (1 - k) * 20 * u
      pill(ctx, x, y - 32 * u, pw, 64 * u, 'rgba(255,255,255,0.95)')
      ctx.beginPath(); ctx.arc(x + 34 * u, y, 13 * u, 0, Math.PI * 2); ctx.fillStyle = ['#2EC4B6', '#FFB703', '#3A86FF', '#E84C8B'][i]; ctx.fill()
      txt(ctx, s, x + 60 * u, y + 1 * u, 23 * u, 800, '#004F48')
    })
    ctx.globalAlpha = 1
  }

  // ----- finale -----
  const fin = smooth(seg(t, T.end + 1.2, T.end + 2.6))
  if (fin > 0) {
    const g = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, Math.max(W, H) * 0.7)
    g.addColorStop(0, `rgba(255,255,255,${0.75 * fin})`); g.addColorStop(1, `rgba(255,255,255,${0.15 * fin})`)
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H)
    ctx.globalAlpha = fin
    const s = 360 * u
    if (logoForOverlay.complete) ctx.drawImage(logoForOverlay, W / 2 - s / 2, H / 2 - s * 0.68 - (1 - fin) * 20 * u, s, s)
    txt(ctx, 'A companion for earlier care', W / 2, H / 2 + s * 0.45, 48 * u, 800, '#00685F', 'center')
    ctx.globalAlpha = smooth(seg(t, T.end + 3, T.end + 4))
    txt(ctx, 'Screening support for community health workers · not a diagnostic device', W / 2, H / 2 + s * 0.45 + 56 * u, 22 * u, 600, '#5F6B6B', 'center')
    ctx.globalAlpha = 1
  }

  // ----- watermark -----
  if (t > T.problem && t < T.end + 1 && (t < T.phc || t > T.impact + 0.5) && markForOverlay.complete && wide) {
    ctx.globalAlpha = 0.9
    pill(ctx, W - 240 * u, 96 * u, 180 * u, 48 * u, 'rgba(255,255,255,0.9)')
    ctx.drawImage(markForOverlay, W - 228 * u, 102 * u, 46 * u, 36 * u)
    txt(ctx, 'SAATHI', W - 130 * u, 121 * u, 22 * u, 800, '#00685F', 'center')
    ctx.globalAlpha = 1
  }
  ctx.restore()
}
function progressBar(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, p: number) {
  roundRect(ctx, x, y, w, h, h / 2); ctx.fillStyle = 'rgba(0,104,95,0.15)'; ctx.fill()
  roundRect(ctx, x, y, Math.max(h, w * clamp(p)), h, h / 2); ctx.fillStyle = '#00685F'; ctx.fill()
}

/* =============================== sizing =============================== */
let fixedSize: [number, number] | null = null
function resize() {
  const vw = window.innerWidth, vh = window.innerHeight
  let w: number, h: number, cssW: number, cssH: number
  if (fixedSize) {
    [w, h] = fixedSize
    const s = Math.min(vw / w, vh / h); cssW = w * s; cssH = h * s
    renderer.setPixelRatio(1)
  } else {
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    renderer.setPixelRatio(dpr)
    cssW = vw; cssH = vh; w = Math.round(vw * dpr); h = Math.round(vh * dpr)
  }
  renderer.setSize(fixedSize ? w : cssW, fixedSize ? h : cssH, false)
  for (const c of [glCanvas, overlay]) { c.style.width = cssW + 'px'; c.style.height = cssH + 'px' }
  overlay.width = renderer.domElement.width; overlay.height = renderer.domElement.height
  camera.aspect = cssW / cssH; camera.updateProjectionMatrix()
}
window.addEventListener('resize', resize)
resize()

/* =============================== controls & UI =============================== */
const controls = new OrbitControls(camera, glCanvas)
controls.enabled = false; controls.enableDamping = true; controls.maxPolarAngle = Math.PI * 0.6; controls.maxDistance = 900; controls.minDistance = 1.5

let t = 0, playing = false, exploring = false, started = false
let score: Score | null = null

/* ---- 2-minute submission cut: play the 162 s master timeline at 1.22x and
   jump five dead segments, landing at 1:59 without desyncing any module.
   This cut is fully silent (no music, no voice-over) by design. ---- */
const SPEED = 1.22
const CUTS: [number, number][] = [[0, 3.5], [5.5, 7.5], [21.5, 25.5], [105.6, 110.8], [138.8, 143.2]]
/** wall-clock seconds of the 2-minute cut for a given master-timeline time */
const removedBefore = (x: number) => CUTS.reduce((s, [a, b]) => s + (x <= a ? 0 : x >= b ? b - a : x - a), 0)
const eff = (x: number) => (x - removedBefore(x)) / SPEED
let musicOn = true
const $ = (id: string) => document.getElementById(id)!
const btnPlay = $('btnPlay'), timeEl = $('time'), chaptersEl = $('chapters'), hint = $('hint')
const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`

const chapEls = CHAPTERS.map((c, i) => {
  const end = i < CHAPTERS.length - 1 ? CHAPTERS[i + 1].t : TOTAL
  const el = document.createElement('div'); el.className = 'chap'; el.style.flex = String(end - c.t)
  el.innerHTML = `<span>${c.name}</span><div class="bar"><div class="fill"></div></div>`
  el.addEventListener('click', (e) => {
    const r = el.getBoundingClientRect()
    const f = clamp((e.clientX - r.left) / r.width)
    seek(c.t + f * (end - c.t) * 0.98)
  })
  chaptersEl.appendChild(el)
  return { el, fill: el.querySelector('.fill') as HTMLElement, a: c.t, b: end }
})

function ensureScore() {
  // silent cut: the generative soundtrack is never started; the Score graph
  // exists only so the recorder has an (empty) audio track to mux
  if (!score) { try { score = new Score(); score.setMuted(true) } catch { score = null } }
}
function setPlaying(p: boolean) {
  playing = p
  btnPlay.textContent = p ? '❚❚' : '▶'
  if (p && exploring) setExplore(false)
  if (score) { if (p) score.resume(); else score.pause() }
}
function seek(nt: number) { t = clamp(nt, 0, TOTAL - 0.01); if (exploring) setExplore(false); if (!playing) setPlaying(true) }
function setExplore(on: boolean) {
  exploring = on
  controls.enabled = on
  $('btnExplore').classList.toggle('on', on)
  hint.classList.toggle('hidden', !on)
  hotspotLayer.style.display = on ? 'block' : 'none'
  if (on) {
    if (playing) { playing = false; btnPlay.textContent = '▶'; score?.pause() }
    controls.target.copy(camLook)
    controls.update()
  }
}
btnPlay.addEventListener('click', () => { ensureScore(); setPlaying(!playing) })
$('btnExplore').addEventListener('click', () => setExplore(!exploring))
$('btnSound').addEventListener('click', () => {
  musicOn = !musicOn
  ;($('btnSound').querySelector('span') as HTMLElement).textContent = musicOn ? 'Music on' : 'Music off'
  $('btnSound').classList.toggle('on', !musicOn)
  ensureScore(); score?.setMuted(!musicOn)
})
glCanvas.addEventListener('pointerdown', () => { if (started && !exploring && !recording) setExplore(true) })

function begin(explore: boolean) {
  started = true
  $('start').classList.add('gone')
  $('honesty').classList.remove('hidden')
  ensureScore()
  if (!explore) { try { document.documentElement.requestFullscreen?.() } catch { /* user can retry with the button */ } }
  if (explore) { t = 40; setExplore(true); camera.position.set(46, 22, 70); controls.target.set(6, 2, 10); controls.update() }
  else { t = 0; setPlaying(true) }
}
$('btnStart').addEventListener('click', () => begin(false))
$('btnStartExplore').addEventListener('click', () => begin(true))
window.addEventListener('keydown', e => {
  if (e.code === 'Space') { e.preventDefault(); if (!started) begin(false); else { ensureScore(); setPlaying(!playing) } }
  if (e.code === 'ArrowRight') seek(t + 5)
  if (e.code === 'ArrowLeft') seek(t - 5)
})

// auto-hide UI while the film plays
let lastMove = performance.now()
window.addEventListener('pointermove', () => { lastMove = performance.now() })
const uiEls = Array.from(document.querySelectorAll('.ui'))

// hotspots (explore mode)
const hotspotLayer = $('hotspots')
hotspotLayer.style.display = 'none'
const HOTSPOTS: { label: string; pos: () => THREE.Vector3; t: number }[] = [
  { label: "Tashi's home", pos: () => world.kamalaHouse.clone().setY(6.4), t: T.problem },
  { label: 'Footpath from the gorge', pos: () => world.road.getPointAt(0.45).add(v3(0, 3, 0)), t: T.asha },
  { label: 'Camera tests · ROM + knee posture', pos: () => stand.position.clone().add(v3(0, 1.8, 0)), t: T.camera },
  { label: 'Pod on the tibia', pos: () => wp(sensor).add(v3(0, 0.35, 0)), t: T.strap },
  { label: 'Tibial shock explainer', pos: () => lab.anat.position.clone().add(v3(0, 14, 0)), t: ANAT_T0 + 1 },
  { label: 'Sports-lab method', pos: () => lab.lab.position.clone().add(v3(0, 10, 0)), t: T.lab },
  { label: 'Mobile tower · sync', pos: () => world.towerTop.clone().add(v3(0, 3, 0)), t: T.sync },
  { label: 'PHC Rongli · dashboard', pos: () => world.phc.clone().add(v3(0, 10, 0)), t: T.phc },
  { label: 'Architecture', pos: () => v3(0, 78, 0), t: T.arch },
]
const hsEls = HOTSPOTS.map(h => {
  const el = document.createElement('div'); el.className = 'hotspot'
  el.innerHTML = `<b>${h.label}</b><i></i>`
  el.addEventListener('pointerdown', e => e.stopPropagation())
  el.addEventListener('click', () => seek(h.t))
  hotspotLayer.appendChild(el)
  return el
})

/* =============================== recording =============================== */
let recording = false
let recorder: MediaRecorder | null = null
let comp: HTMLCanvasElement | null = null, compCtx: CanvasRenderingContext2D | null = null
const recChunks: Blob[] = []
function startRecording() {
  if (recording) return
  if (typeof MediaRecorder === 'undefined') { alert('Video recording is not supported in this browser. Try Chrome or Edge.'); return }
  ensureScore()
  fixedSize = [1920, 1080]; resize()
  comp = document.createElement('canvas'); comp.width = 1920; comp.height = 1080
  compCtx = comp.getContext('2d')!
  const stream = comp.captureStream(30)
  score?.stream.stream.getAudioTracks().forEach(tr => stream.addTrack(tr))
  const types = ['video/mp4;codecs=avc1.640028,mp4a.40.2', 'video/mp4', 'video/webm;codecs=vp9,opus', 'video/webm;codecs=vp8,opus', 'video/webm']
  const mime = types.find(m => MediaRecorder.isTypeSupported(m)) ?? ''
  recorder = new MediaRecorder(stream, mime ? { mimeType: mime, videoBitsPerSecond: 14_000_000 } : undefined)
  recChunks.length = 0
  recorder.ondataavailable = e => { if (e.data.size) recChunks.push(e.data) }
  recorder.onstop = () => {
    const type = recorder?.mimeType || 'video/webm'
    const blob = new Blob(recChunks, { type })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob); a.download = `SAATHI-3D-demo.${type.includes('mp4') ? 'mp4' : 'webm'}`
    document.body.appendChild(a); a.click(); a.remove()
    fixedSize = null; resize()
    $('recBadge').classList.add('hidden'); $('btnRecord').classList.remove('on')
  }
  if (exploring) setExplore(false)
  t = 0; recording = true
  setPlaying(true)
  recorder.start(1000)
  $('recBadge').classList.remove('hidden'); $('btnRecord').classList.add('on')
}
function stopRecording() { if (!recording) return; recording = false; recorder?.stop() }
$('btnRecord').addEventListener('click', () => { if (!started) begin(false); if (recording) stopRecording(); else startRecording() })
$('btnFull').addEventListener('click', () => {
  if (document.fullscreenElement) document.exitFullscreen().catch(() => {})
  else document.documentElement.requestFullscreen?.()
})

/* =============================== main loop =============================== */
let last = performance.now()
cameraAt(0, camPos, camLook); camera.position.copy(camPos); camera.lookAt(camLook)

function frame(now: number) {
  const dt = Math.min(0.05, (now - last) / 1000); last = now
  if (playing) {
    t += dt * SPEED
    for (const [a, b] of CUTS) if (t > a && t < b) { t = b; break }
    if (t >= TOTAL) {
      if (recording) { t = TOTAL - 0.001; stopRecording(); setPlaying(false) }
      else { t = TOTAL - 0.001; setPlaying(false) }
    }
  }
  const nowS = now / 1000
  world.update(nowS, dt)
  animateCast(t)
  arch.update(exploring ? T.arch + 14 : t)
  impact.update(t)
  // in explore mode the explainer dioramas loop so visitors can fly around them
  lab.update(exploring ? ANAT_T0 + 3.0 + (nowS % 6) : t)
  if (exploring) { lab.anat.visible = lab.lab.visible = true }
  if (exploring) {
    controls.update()
    camLook.copy(controls.target)
  } else {
    cameraAt(t, camPos, camLook)
    camera.position.copy(camPos)
    camera.lookAt(camLook)
  }
  camera.updateMatrixWorld()
  updateHeroPhone(exploring ? 0 : t)
  updateMonitor(exploring ? -10 : t)
  phoneKit.render(t)
  $('pod').classList.toggle('on', started && !exploring && t > T.strap + 0.4 && t < T.shock - 0.6)

  // architecture chapter: thick pale haze turns the hillside behind the floating diagram into a clean backdrop
  const fogK = exploring ? 0 : win(t, T.arch - 0.4, T.impact - 0.2, 1.2)
  const fog = scene.fog as THREE.Fog
  fog.near = lerp(220, 30, fogK); fog.far = lerp(1500, 105, fogK)
  fog.color.copy(fogBase).lerp(fogArch, fogK)
  renderer.clear()
  renderer.render(scene, camera)
  renderer.clearDepth()
  renderer.render(ui, camera)
  drawOverlay(exploring ? -10 : t)
  if (recording && compCtx) { compCtx.drawImage(glCanvas, 0, 0, 1920, 1080); compCtx.drawImage(overlay, 0, 0, 1920, 1080); $('recTime').textContent = `${fmt(eff(t))} / ${fmt(eff(TOTAL))}` }

  // UI state
  timeEl.textContent = `${fmt(eff(t))} / ${fmt(eff(TOTAL))}`
  const ci = chapterAt(t)
  chapEls.forEach((c, i) => { c.fill.style.width = `${clamp((t - c.a) / (c.b - c.a)) * 100}%`; c.el.classList.toggle('active', i === ci) })
  const idle = started && playing && !exploring && now - lastMove > 2600
  uiEls.forEach(el => el.classList.toggle('idle', idle || recording))
  if (exploring) {
    const rect = glCanvas.getBoundingClientRect()
    HOTSPOTS.forEach((h, i) => {
      const p = h.pos().project(camera)
      const vis = p.z < 1 && Math.abs(p.x) < 1.05 && Math.abs(p.y) < 1.05
      hsEls[i].style.display = vis ? 'flex' : 'none'
      if (vis) { hsEls[i].style.left = `${rect.left + (p.x * 0.5 + 0.5) * rect.width}px`; hsEls[i].style.top = `${rect.top + (-p.y * 0.5 + 0.5) * rect.height}px` }
    })
  }
  requestAnimationFrame(frame)
}
requestAnimationFrame(frame)

// expose for debugging / screenshots
;(window as unknown as { saathi: unknown }).saathi = { seek: (s: number) => { t = s }, get t() { return t }, play: () => setPlaying(true), pause: () => setPlaying(false), SCREENS, easeOut, phoneCanvas: phoneKit.canvas,
  phoneRect: () => { const v = new THREE.Vector3(); heroScreen.getWorldPosition(v); v.project(camera); return { x: v.x * 0.5 + 0.5, y: -v.y * 0.5 + 0.5, z: v.z, vis: heroPhone.visible } } }
