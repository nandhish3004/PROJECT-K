import * as THREE from 'three'
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js'
import { clamp, mat, mesh, rng, v3 } from './util'

/* A remote Himalayan hamlet on a mountain shelf, terraced fields falling to a river gorge,
   a footbridge, the PHC far away on the opposite slope, snow peaks all around. */

export const SUN_DIR = new THREE.Vector3(0.5, 0.62, 0.6).normalize()

function rotm(m: THREE.Mesh, axis: 'x' | 'y' | 'z', v: number) { m.rotation[axis] = v; return m }
const sstep = (a: number, b: number, x: number) => { const t = clamp((x - a) / (b - a)); return t * t * (3 - 2 * t) }

export const WALLS = ['#2E86DE', '#E84C8B', '#FFB703', '#2EC4B6', '#9B5DE5', '#FB5607', '#06D6A0', '#FF6B6B', '#3A86FF', '#F15BB5']
const FLAGS = ['#1E6FD9', '#FFFFFF', '#E63946', '#2BA84A', '#FFC300'] // Himalayan prayer-flag colours

/* ------------------------------------------------------------------ terrain */
// footpath (x, z) from the footbridge up the switchbacks to Tashi's courtyard
export const PATH_XZ: [number, number][] = [[-10, 92], [14, 86], [36, 77], [12, 66], [-26, 56], [-6, 46], [26, 37], [10, 27], [-4, 19], [3, 12], [6, 6.5]]
function pathDist(x: number, z: number) {
  let best = 1e9
  for (let i = 0; i < PATH_XZ.length - 1; i++) {
    const [ax, az] = PATH_XZ[i], [bx, bz] = PATH_XZ[i + 1]
    const dx = bx - ax, dz = bz - az
    const u = clamp(((x - ax) * dx + (z - az) * dz) / (dx * dx + dz * dz))
    best = Math.min(best, Math.hypot(x - ax - dx * u, z - az - dz * u))
  }
  return best
}
function noise2(x: number, z: number) {
  return Math.sin(x * 0.031 + 1.3) * Math.cos(z * 0.027 - 0.7) + 0.5 * Math.sin(x * 0.071 - z * 0.053 + 2.1) + 0.25 * Math.sin(x * 0.13 + z * 0.11)
}
function ridged(x: number, z: number) {
  let s = 0, a = 1, f = 0.0042
  for (let i = 0; i < 5; i++) { s += a * (1 - Math.abs(Math.sin(x * f + i * 1.7) * Math.cos(z * f * 1.13 - i * 0.9))); a *= 0.5; f *= 2.03 }
  return s
}
const RIVER_Z = (x: number) => 102 + Math.sin(x * 0.018) * 6
const TERR_D = 4.4, TERR_RISE = TERR_D * 0.55

function profile(x: number, z: number) {
  const zw = z + (z > 18 ? 4 * Math.sin(x * 0.035) * sstep(18, 30, z) : 0)
  const rz = RIVER_Z(x)
  let h: number
  if (z < -14) h = (-z - 14) * 0.62 + Math.pow(Math.max(0, -z - 50), 1.25) * 0.35
  else if (z < rz) h = zw < 16 ? 0 : Math.max(-41.8, -(zw - 16) * 0.55)
  else h = -41.8 + Math.max(0, z - rz - 10) * 0.6 + Math.pow(Math.max(0, z - rz - 40), 1.25) * 0.35
  h -= 2.2 * (1 - sstep(4, 10, Math.abs(z - rz)))
  return { h, zw }
}

/** smooth slope height (no terraces) — used for the footpath */
export function slopeHeight(x: number, z: number) {
  const { h } = profile(x, z)
  const shelfD = Math.max(Math.abs(x) - 70, -14 - z, z - 16, 0)
  let y = h + Math.max(0, Math.abs(x) - 70) * 0.36
  y += noise2(x, z) * 4.5 * sstep(0, 40, shelfD) * (1 - 0.8 * (1 - sstep(1.5, 6, pathDist(x, z))))
  y += sstep(260, 620, Math.hypot(x, z - 40)) * ridged(x, z) * 85
  return y
}
function terraceMask(x: number, z: number) {
  const front = sstep(19, 22, z) * (1 - sstep(84, 88, z)) * (1 - sstep(88, 104, Math.abs(x) + 6 * Math.sin(z * 0.2)))
  const back = sstep(-64, -58, z) * (1 - sstep(-22, -18, z)) * (1 - sstep(44, 58, Math.abs(x + 8)))
  return Math.max(front, back) * sstep(2.2, 4.5, pathDist(x, z))
}
export function groundHeight(x: number, z: number) {
  const s = slopeHeight(x, z)
  const m = terraceMask(x, z)
  if (m <= 0) return s
  let st: number
  if (z > 0) { const { zw } = profile(x, z); const k = Math.floor((zw - 16) / TERR_D); st = -k * TERR_RISE - 0.4 }
  else { const k = Math.floor((-z - 14) / 3.4); st = (k + 1) * 3.4 * 0.62 - 0.2 }
  return s + (st - s) * m
}
function terraceColorIdx(x: number, z: number) {
  const { zw } = profile(x, z)
  const k = z > 0 ? Math.floor((zw - 16) / TERR_D) : Math.floor((-z - 14) / 3.4) + 40
  const c = Math.floor((x + 200 + Math.sin(k * 1.7) * 9) / 26)
  return { k, c, frac: z > 0 ? ((zw - 16) / TERR_D) % 1 : ((-z - 14) / 3.4) % 1 }
}

export interface World {
  road: THREE.CatmullRomCurve3
  kamalaHouse: THREE.Vector3
  charpai: THREE.Vector3
  phc: THREE.Vector3
  tower: THREE.Vector3
  towerTop: THREE.Vector3
  update: (t: number, dt: number) => void
}

function sky(scene: THREE.Scene) {
  const geo = new THREE.SphereGeometry(1900, 32, 16)
  const m = new THREE.ShaderMaterial({
    side: THREE.BackSide, depthWrite: false, fog: false,
    uniforms: {
      top: { value: new THREE.Color('#2F7FD6') }, mid: { value: new THREE.Color('#8CC8F2') },
      horizon: { value: new THREE.Color('#E8F1F5') }, sun: { value: SUN_DIR.clone() },
    },
    vertexShader: `varying vec3 vDir; void main(){ vDir = normalize(position); gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.0); }`,
    fragmentShader: `uniform vec3 top; uniform vec3 mid; uniform vec3 horizon; uniform vec3 sun; varying vec3 vDir;
      void main(){ float h = vDir.y;
        vec3 c = mix(horizon, mid, smoothstep(-0.02, 0.16, h));
        c = mix(c, top, smoothstep(0.16, 0.7, h));
        float s = max(dot(normalize(vDir), normalize(sun)), 0.0);
        c += vec3(1.0,0.85,0.6)*pow(s, 16.0)*0.3 + vec3(1.0,0.97,0.85)*pow(s, 700.0)*1.6;
        if (h < 0.0) c = horizon;
        gl_FragColor = vec4(c,1.0); }`,
  })
  scene.add(new THREE.Mesh(geo, m))
}

function triPrism(w: number, h: number, len: number) {
  const s = new THREE.Shape()
  s.moveTo(-w / 2, 0); s.lineTo(w / 2, 0); s.lineTo(0, h); s.closePath()
  const g = new THREE.ExtrudeGeometry(s, { depth: len, bevelEnabled: false })
  g.translate(0, 0, -len / 2)
  return g
}

function toran(g: THREE.Group, width: number, y: number, z: number) {
  const n = 11
  for (let i = 0; i < n; i++) {
    const x = -width / 2 + (width * i) / (n - 1)
    const sag = Math.sin((i / (n - 1)) * Math.PI) * 0.18
    g.add(mesh(new THREE.IcosahedronGeometry(0.075, 0), mat(i % 2 ? '#FF8C00' : '#FFC300'), x, y - sag, z, false))
  }
}

/** Pahadi "kath-kuni" house: stone + timber banded ground floor, painted wooden upper floor, slate roof. */
export function pahadiHouse(x: number, y: number, z: number, rotY: number, paint: string, w = 5.4, d = 4.4, storeys = 2) {
  const g = new THREE.Group()
  g.position.set(x, y, z); g.rotation.y = rotY
  const stone = mat('#A39C92'), timber = mat('#6B4426'), wood = mat('#9A6338'), slate = mat('#5E656D')
  // foundation reaching down the slope
  g.add(mesh(new THREE.BoxGeometry(w + 0.6, 8, d + 0.6), mat('#8E877E'), 0, -3.85, 0))
  const fh = 2.5
  g.add(mesh(new THREE.BoxGeometry(w, fh, d), stone, 0, fh / 2 + 0.15, 0))
  for (let i = 0; i < 4; i++) g.add(mesh(new THREE.BoxGeometry(w + 0.06, 0.12, d + 0.06), timber, 0, 0.45 + i * 0.6, 0, false))
  // door with painted frame + marigold toran
  g.add(mesh(new THREE.BoxGeometry(1.0, 1.85, 0.12), mat('#5A341B'), -0.9, 1.08, d / 2 + 0.04, false))
  g.add(mesh(new THREE.BoxGeometry(1.25, 0.16, 0.16), mat(paint), -0.9, 2.05, d / 2 + 0.06, false))
  for (const sx of [-1, 1]) g.add(mesh(new THREE.BoxGeometry(0.14, 1.95, 0.16), mat(paint), -0.9 + sx * 0.58, 1.08, d / 2 + 0.06, false))
  toran(g, 1.2, 2.0, d / 2 + 0.16)
  g.add(mesh(new THREE.BoxGeometry(0.8, 0.7, 0.1), mat('#1F3B4D'), 1.2, 1.5, d / 2 + 0.04, false))
  g.add(mesh(new THREE.BoxGeometry(0.98, 0.88, 0.08), mat(paint), 1.2, 1.5, d / 2 + 0.02, false))
  let top = fh + 0.15
  if (storeys > 1) {
    const uh = 2.1
    g.add(mesh(new THREE.BoxGeometry(w + 0.5, uh, d + 0.5), wood, 0, top + uh / 2, 0))
    // painted balcony
    g.add(mesh(new THREE.BoxGeometry(w + 0.9, 0.14, 1.0), timber, 0, top + 0.08, d / 2 + 0.7, false))
    g.add(mesh(new THREE.BoxGeometry(w + 0.9, 0.12, 0.1), mat(paint), 0, top + 0.95, d / 2 + 1.15, false))
    for (let i = 0; i <= 10; i++) g.add(mesh(new THREE.BoxGeometry(0.07, 0.85, 0.07), mat(i % 2 ? paint : '#FFFFFF'), -(w + 0.8) / 2 + (i * (w + 0.8)) / 10, top + 0.5, d / 2 + 1.15, false))
    for (const sx of [-1.4, 0, 1.4]) {
      g.add(mesh(new THREE.BoxGeometry(0.85, 0.95, 0.1), mat('#FFFFFF'), sx, top + 1.1, d / 2 + 0.27, false))
      g.add(mesh(new THREE.BoxGeometry(0.62, 0.72, 0.12), mat(sx === 0 ? '#FFB703' : '#1F6F8B'), sx, top + 1.1, d / 2 + 0.29, false))
    }
    top += uh
  }
  const rg = triPrism(d + 1.8, 1.6, w + 1.6); rg.rotateY(Math.PI / 2)
  g.add(mesh(rg, slate, 0, top, 0))
  g.add(mesh(new THREE.BoxGeometry(w + 1.7, 0.18, 0.22), mat('#3F454B'), 0, top + 1.6, 0, false))
  return g
}

function deodarGeo() {
  const parts: THREE.BufferGeometry[] = []
  for (let i = 0; i < 4; i++) { const c = new THREE.ConeGeometry(2.2 - i * 0.45, 3.0, 7); c.translate(0, 2.4 + i * 1.7, 0); parts.push(c) }
  return mergeGeometries(parts)!
}

function rhodoGeo() {
  const parts: THREE.BufferGeometry[] = []
  const r = rng(5)
  for (let i = 0; i < 4; i++) { const c = new THREE.IcosahedronGeometry(1.1 + r() * 0.4, 0); c.translate((r() - 0.5) * 1.6, 2.6 + r() * 0.9, (r() - 0.5) * 1.6); parts.push(c) }
  return mergeGeometries(parts)!
}

function cow(x: number, y: number, z: number, rot: number, body: string, hornColor: string) {
  const g = new THREE.Group(); g.position.set(x, y, z); g.rotation.y = rot; g.scale.setScalar(0.85)
  const white = mat(body)
  g.add(mesh(new THREE.BoxGeometry(0.75, 0.7, 1.5), white, 0, 1.0, 0))
  g.add(mesh(new THREE.BoxGeometry(0.42, 0.45, 0.55), white, 0, 1.25, 0.95))
  for (const sx of [-1, 1]) {
    const horn = mesh(new THREE.ConeGeometry(0.05, 0.3, 5), mat(hornColor), sx * 0.15, 1.6, 0.9, false)
    horn.rotation.z = -sx * 0.5; g.add(horn)
    for (const sz of [-0.55, 0.55]) g.add(mesh(new THREE.BoxGeometry(0.16, 0.7, 0.16), white, sx * 0.25, 0.35, sz))
  }
  g.add(mesh(new THREE.TorusGeometry(0.24, 0.04, 5, 12), mat('#FF8C00'), 0, 1.1, 0.8, false))
  return g
}

/** simple wooden chair (the app asks the patient to sit on a chair) */
function chair(x: number, z: number, rot: number) {
  const g = new THREE.Group(); g.position.set(x, 0, z); g.rotation.y = rot
  const w = mat('#8B5A2B'), p = mat('#E84C8B')
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) g.add(mesh(new THREE.BoxGeometry(0.06, 0.45, 0.06), w, sx * 0.21, 0.22, sz * 0.2))
  g.add(mesh(new THREE.BoxGeometry(0.5, 0.06, 0.48), w, 0, 0.46, 0))
  g.add(mesh(new THREE.BoxGeometry(0.46, 0.035, 0.44), p, 0, 0.5, 0, false))
  for (const sx of [-1, 1]) g.add(mesh(new THREE.BoxGeometry(0.06, 0.55, 0.06), w, sx * 0.21, 0.75, -0.2))
  g.add(mesh(new THREE.BoxGeometry(0.48, 0.2, 0.05), mat('#2EC4B6'), 0, 0.9, -0.2))
  return g
}

function prayerFlags(group: THREE.Group, a: THREE.Vector3, b: THREE.Vector3, r: () => number, sag = 1.2) {
  for (const p of [a, b]) group.add(mesh(new THREE.CylinderGeometry(0.06, 0.08, 5, 5), mat('#6E4B2E'), p.x, p.y - 2.5, p.z))
  const n = Math.max(10, Math.round(a.distanceTo(b) * 1.6))
  const geo = new THREE.PlaneGeometry(0.42, 0.5); geo.translate(0, -0.25, 0)
  const pts: THREE.Vector3[] = []
  for (let i = 0; i <= n; i++) {
    const u = i / n
    const p = a.clone().lerp(b, u); p.y -= Math.sin(u * Math.PI) * sag
    pts.push(p)
    if (i > 0 && i < n) {
      const f = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ color: FLAGS[i % FLAGS.length], side: THREE.DoubleSide, roughness: 0.8 }))
      f.position.copy(p)
      f.lookAt(p.x + (b.z - a.z), p.y, p.z - (b.x - a.x))
      f.userData.phase = r() * 6
      group.add(f)
    }
  }
  group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), new THREE.LineBasicMaterial({ color: '#555' })))
}

function hillTemple(x: number, y: number, z: number) {
  const g = new THREE.Group(); g.position.set(x, y, z); g.rotation.y = 0.5
  g.add(mesh(new THREE.BoxGeometry(5, 8, 5), mat('#8E877E'), 0, -3.6, 0))
  g.add(mesh(new THREE.BoxGeometry(4.6, 0.6, 4.6), mat('#C9BFB0'), 0, 0.5, 0))
  g.add(mesh(new THREE.BoxGeometry(3, 2.6, 3), mat('#B8ADA0'), 0, 2.1, 0))
  for (let i = 0; i < 4; i++) g.add(mesh(new THREE.BoxGeometry(3.06, 0.12, 3.06), mat('#6B4426'), 0, 1.0 + i * 0.55, 0, false))
  g.add(mesh(new THREE.BoxGeometry(0.9, 1.6, 0.12), mat('#B01E2F'), 0, 1.6, 1.53, false))
  // tiered pagoda roofs
  for (let i = 0; i < 3; i++) {
    const r = 2.9 - i * 0.75
    const roof = mesh(new THREE.ConeGeometry(r, 1.1, 4), mat(i === 1 ? '#C0392B' : '#5E656D'), 0, 3.9 + i * 1.05, 0)
    roof.rotation.y = Math.PI / 4; g.add(roof)
    if (i < 2) g.add(mesh(new THREE.BoxGeometry(r * 0.9, 0.5, r * 0.9), mat('#9A6338'), 0, 4.55 + i * 1.05, 0, false))
  }
  g.add(mesh(new THREE.SphereGeometry(0.25, 10, 8), mat('#E0A526', { metal: 0.6, rough: 0.35 }), 0, 7.4, 0))
  const flagShape = new THREE.Shape(); flagShape.moveTo(0, 0); flagShape.lineTo(1.2, -0.3); flagShape.lineTo(0, -0.7); flagShape.closePath()
  const flag = new THREE.Mesh(new THREE.ShapeGeometry(flagShape), new THREE.MeshStandardMaterial({ color: '#E63946', side: THREE.DoubleSide }))
  flag.position.set(0.04, 9.2, 0); g.add(flag)
  g.add(mesh(new THREE.CylinderGeometry(0.035, 0.035, 2.2, 4), mat('#5A3A22'), 0, 8.2, 0, false))
  g.userData.flag = flag
  return g
}

function phcBuilding(x: number, y: number, z: number) {
  const g = new THREE.Group(); g.position.set(x, y, z); g.rotation.y = Math.PI * 1.04
  g.add(mesh(new THREE.BoxGeometry(13, 10, 9), mat('#8E877E'), 0, -4.8, 0))
  g.add(mesh(new THREE.BoxGeometry(11, 4.2, 7), mat('#F7F7F2'), 0, 2.3, 0))
  g.add(mesh(new THREE.BoxGeometry(11.05, 0.5, 7.05), mat('#00685F'), 0, 0.8, 0, false))
  const rg = triPrism(8.2, 1.8, 12); rg.rotateY(Math.PI / 2)
  g.add(mesh(rg, mat('#2A9D8F'), 0, 4.4, 0))
  g.add(mesh(new THREE.BoxGeometry(2.0, 2.4, 0.2), mat('#99EFE5', { rough: 0.3 }), 0, 1.4, 3.55, false))
  for (const sx of [-3.6, -2, 2, 3.6]) g.add(mesh(new THREE.BoxGeometry(1.0, 1.0, 0.15), mat('#2A5DA8', { rough: 0.3 }), sx, 2.5, 3.55, false))
  const c = document.createElement('canvas'); c.width = 512; c.height = 128
  const ctx = c.getContext('2d')!
  ctx.fillStyle = '#00685F'; ctx.fillRect(0, 0, 512, 128)
  ctx.fillStyle = '#FFFFFF'; ctx.fillRect(28, 34, 60, 60)
  ctx.fillStyle = '#D7263D'; ctx.fillRect(50, 40, 16, 48); ctx.fillRect(34, 56, 48, 16)
  ctx.fillStyle = '#FFFFFF'; ctx.font = '700 56px Inter, system-ui, sans-serif'; ctx.textBaseline = 'middle'
  ctx.fillText('PHC Rongli', 110, 66)
  const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace
  const board = new THREE.Mesh(new THREE.PlaneGeometry(7, 1.75), new THREE.MeshBasicMaterial({ map: tex, fog: false }))
  board.position.set(0, 7.4, 3.2); g.add(board)
  for (const sx of [-3, 3]) g.add(mesh(new THREE.BoxGeometry(0.15, 2.4, 0.15), mat('#555555'), sx, 6.2, 3.2, false))
  // jeep — the road ends here; the hamlet above is reachable only on foot
  const jeep = new THREE.Group(); jeep.position.set(-8, 0, 4); jeep.rotation.y = 0.4
  jeep.add(mesh(new THREE.BoxGeometry(2, 1.4, 3.6), mat('#FFFFFF'), 0, 1.1, 0))
  jeep.add(mesh(new THREE.BoxGeometry(2.02, 0.3, 3.62), mat('#D7263D'), 0, 1.0, 0, false))
  for (const sx of [-1, 1]) for (const sz of [-1.1, 1.1]) { const w = mesh(new THREE.CylinderGeometry(0.4, 0.4, 0.25, 12), mat('#222222'), sx * 1.0, 0.4, sz); w.rotation.z = Math.PI / 2; jeep.add(w) }
  g.add(jeep)
  return g
}

function tower(x: number, y: number, z: number) {
  const g = new THREE.Group(); g.position.set(x, y, z)
  const H = 22
  for (let i = 0; i < 4; i++) {
    const a = (i / 4) * Math.PI * 2 + Math.PI / 4
    const leg = mesh(new THREE.CylinderGeometry(0.12, 0.18, H, 5), mat('#9AA4AA', { metal: 0.6, rough: 0.4 }), Math.cos(a) * 1.1, H / 2, Math.sin(a) * 1.1)
    g.add(leg)
  }
  for (let k = 1; k < 8; k++) {
    const ring = mesh(new THREE.TorusGeometry(1.1 - k * 0.07, 0.06, 4, 4), mat(k % 2 ? '#D7263D' : '#FFFFFF'), 0, (k / 8) * H, 0, false)
    ring.rotation.x = Math.PI / 2; ring.rotation.z = Math.PI / 4; g.add(ring)
  }
  for (let i = 0; i < 3; i++) { const a = (i / 3) * Math.PI * 2; g.add(mesh(new THREE.BoxGeometry(0.4, 1.8, 0.25), mat('#E8E8E8'), Math.cos(a) * 0.8, H - 1.5, Math.sin(a) * 0.8)) }
  g.add(mesh(new THREE.SphereGeometry(0.25, 8, 6), mat('#FF2D2D', { emissive: '#FF2D2D', ei: 2 }), 0, H + 0.3, 0, false))
  // solar panel
  const sp = mesh(new THREE.BoxGeometry(2.4, 0.08, 1.6), mat('#1F3B73', { rough: 0.2, metal: 0.4 }), 2.6, 1.6, 0); sp.rotation.z = 0.5; g.add(sp)
  return g
}

function footbridge(world: THREE.Group, a: THREE.Vector3, b: THREE.Vector3, r: () => number) {
  const n = 28
  const dir = b.clone().sub(a); const len = dir.length(); dir.normalize()
  const side = v3(dir.z, 0, -dir.x)
  const rot = Math.atan2(dir.x, dir.z)
  const plankM = mat('#9A6338'), ropeM = new THREE.LineBasicMaterial({ color: '#4A3420' })
  const deck: THREE.Vector3[] = []
  for (let i = 0; i <= n; i++) { const u = i / n; const p = a.clone().lerp(b, u); p.y -= Math.sin(u * Math.PI) * 2.2; deck.push(p) }
  deck.forEach((p, i) => { if (i % 1 === 0) { const pl = mesh(new THREE.BoxGeometry(1.8, 0.1, len / n * 0.8), plankM, p.x, p.y, p.z, false); pl.rotation.y = rot; world.add(pl) } })
  for (const s of [-1, 1]) {
    const rope = deck.map(p => p.clone().addScaledVector(side, s * 0.95).add(v3(0, 1.1, 0)))
    world.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(rope), ropeM))
    for (let i = 0; i <= n; i += 2) world.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([deck[i].clone().addScaledVector(side, s * 0.9), rope[i]]), ropeM))
    for (const end of [a, b]) world.add(mesh(new THREE.BoxGeometry(0.35, 2.6, 0.35), mat('#6B4426'), end.x + side.x * s * 1.0, end.y + 0.6, end.z + side.z * s * 1.0))
  }
  // prayer flags along the bridge
  const g = new THREE.Group(); world.add(g)
  prayerFlags(g, a.clone().addScaledVector(side, 1.0).add(v3(0, 3.6, 0)), b.clone().addScaledVector(side, 1.0).add(v3(0, 3.6, 0)), r, 3)
  return g
}

export function buildWorld(scene: THREE.Scene): World {
  scene.background = new THREE.Color('#E8F1F5')
  scene.fog = new THREE.Fog('#DCEAF2', 220, 1500)
  sky(scene)

  scene.add(new THREE.HemisphereLight('#D6ECFF', '#6B7F4A', 1.25))
  const sun = new THREE.DirectionalLight('#FFF0D6', 2.7)
  sun.position.copy(SUN_DIR).multiplyScalar(140)
  sun.castShadow = true
  sun.shadow.mapSize.set(2048, 2048)
  const sc = sun.shadow.camera as THREE.OrthographicCamera
  sc.left = -70; sc.right = 70; sc.top = 70; sc.bottom = -70; sc.near = 10; sc.far = 380
  sun.shadow.bias = -0.0006; sun.shadow.normalBias = 0.05
  scene.add(sun); scene.add(sun.target)

  const r = rng(42)
  const world = new THREE.Group(); scene.add(world)

  /* ---- terrain: one mesh, dense in the middle, sparse at the edges ---- */
  const N = 300
  const gGeo = new THREE.PlaneGeometry(2, 2, N, N)
  gGeo.rotateX(-Math.PI / 2)
  const pos = gGeo.attributes.position as THREE.BufferAttribute
  const remap = (u: number) => 150 * u + 1250 * Math.pow(Math.abs(u), 5) * Math.sign(u)
  for (let i = 0; i < pos.count; i++) {
    const x = remap(pos.getX(i)), z = remap(pos.getZ(i)) + 30
    pos.setXYZ(i, x, groundHeight(x, z), z)
  }
  gGeo.computeVertexNormals()
  // per-face colours (crisp terrace fields): colour each triangle by its centroid
  const tGeo = gGeo.toNonIndexed()
  const tp = tGeo.attributes.position as THREE.BufferAttribute
  const cols = new Float32Array(tp.count * 3)
  const grassA = new THREE.Color('#7DB843'), grassB = new THREE.Color('#A6CC52'), forest = new THREE.Color('#4E8A3C'), rock = new THREE.Color('#8E8A84'), snow = new THREE.Color('#F7FAFF')
  const riser = new THREE.Color('#9B7B55'), dirt = new THREE.Color('#C9A777'), river = new THREE.Color('#6E9C8A')
  const CROPS = ['#D9487A', '#F0C33C', '#7CC046', '#D9B862', '#55A043', '#EC8A3C', '#C04A72', '#A2D04A', '#F5D85A']
  const tmp = new THREE.Color(), tmp2 = new THREE.Color()
  const va = new THREE.Vector3(), vb = new THREE.Vector3(), vc = new THREE.Vector3(), fn = new THREE.Vector3()
  for (let f = 0; f < tp.count; f += 3) {
    va.fromBufferAttribute(tp, f); vb.fromBufferAttribute(tp, f + 1); vc.fromBufferAttribute(tp, f + 2)
    fn.subVectors(vc, vb).cross(vb.clone().sub(va)).normalize()
    const ny = Math.abs(fn.y)
    const x = (va.x + vb.x + vc.x) / 3, y = (va.y + vb.y + vc.y) / 3, z = (va.z + vb.z + vc.z) / 3
    tmp.copy(grassA).lerp(grassB, (Math.sin(x * 0.07) * Math.cos(z * 0.05) + 1) / 2)
    const fm = sstep(0.2, 0.9, noise2(x * 1.7 + 40, z * 1.7) * 0.5 + 0.5) * sstep(20, 60, Math.hypot(x, z))
    tmp.lerp(forest, fm * 0.8)
    const tm = terraceMask(x, z)
    if (tm > 0.5) {
      const { k, c } = terraceColorIdx(x, z)
      tmp2.set(CROPS[Math.abs(k * 3 + c * 5) % CROPS.length])
      tmp.copy(ny < 0.8 ? riser : tmp2)
    }
    const pd = pathDist(x, z)
    if (pd < 2.2 && z > 5) tmp.lerp(dirt, 0.85)
    const yard = Math.max(0, 1 - Math.hypot((x - 5) / 9, (z - 3) / 5))
    tmp.lerp(dirt, Math.min(1, yard * 1.6))
    if (Math.abs(z - RIVER_Z(x)) < 12 && y < -40) tmp.lerp(river, 0.6)
    const steep = 1 - sstep(0.55, 0.8, ny)
    tmp.lerp(rock, steep * (tm > 0.5 ? 0 : 0.9))
    const sn = sstep(120, 150, y + noise2(x * 3, z * 3) * 14) * (0.55 + 0.45 * sstep(0.45, 0.75, ny))
    tmp.lerp(snow, sn)
    for (let k = 0; k < 3; k++) { cols[(f + k) * 3] = tmp.r; cols[(f + k) * 3 + 1] = tmp.g; cols[(f + k) * 3 + 2] = tmp.b }
  }
  tGeo.setAttribute('color', new THREE.BufferAttribute(cols, 3))
  tGeo.computeVertexNormals()
  const ground = new THREE.Mesh(tGeo, new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 1, flatShading: true }))
  ground.receiveShadow = true
  world.add(ground)

  /* ---- river ---- */
  {
    const pts: number[] = [], idx: number[] = []
    const M = 160
    for (let i = 0; i <= M; i++) {
      const x = -900 + (1800 * i) / M, z = RIVER_Z(x)
      pts.push(x, -42.6, z - 6, x, -42.6, z + 6)
      if (i < M) { const a = i * 2; idx.push(a, a + 1, a + 2, a + 1, a + 3, a + 2) }
    }
    const rg = new THREE.BufferGeometry(); rg.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3)); rg.setIndex(idx); rg.computeVertexNormals()
    const rm = new THREE.Mesh(rg, new THREE.MeshStandardMaterial({ color: '#4FB3D9', roughness: 0.15, metalness: 0.15, side: THREE.DoubleSide, emissive: '#1C6C8C', emissiveIntensity: 0.25 }))
    world.add(rm)
  }

  /* ---- stone footpath ---- */
  const pathPts = PATH_XZ.map(([x, z]) => v3(x, slopeHeight(x, z) + 0.08, z))
  pathPts[pathPts.length - 1].y = 0.02; pathPts[pathPts.length - 2].y = 0.04
  const road = new THREE.CatmullRomCurve3(pathPts, false, 'catmullrom', 0.2)
  {
    const M = 600, verts: number[] = [], idx: number[] = []
    for (let i = 0; i <= M; i++) {
      const p = road.getPointAt(i / M), tg = road.getTangentAt(i / M)
      const side = v3(tg.z, 0, -tg.x).normalize().multiplyScalar(1.1)
      const yl = Math.max(p.y, slopeHeight(p.x + side.x, p.z + side.z) + 0.06), yr = Math.max(p.y, slopeHeight(p.x - side.x, p.z - side.z) + 0.06)
      verts.push(p.x + side.x, (p.z < 8 ? 0.03 : yl), p.z + side.z, p.x - side.x, (p.z < 8 ? 0.03 : yr), p.z - side.z)
      if (i < M) { const a = i * 2; idx.push(a, a + 1, a + 2, a + 1, a + 3, a + 2) }
    }
    const rg = new THREE.BufferGeometry(); rg.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3)); rg.setIndex(idx); rg.computeVertexNormals()
    const rm = new THREE.Mesh(rg, new THREE.MeshStandardMaterial({ color: '#B9AE9E', roughness: 1, side: THREE.DoubleSide, polygonOffset: true, polygonOffsetFactor: -2 }))
    rm.receiveShadow = true; world.add(rm)
    // stepping stones along the path edges
    const stoneGeo = new THREE.DodecahedronGeometry(0.35, 0)
    const sm = new THREE.InstancedMesh(stoneGeo, mat('#8F887F'), 360)
    const m4 = new THREE.Matrix4()
    for (let i = 0; i < 360; i++) {
      const u = (i + 0.5) / 360, p = road.getPointAt(u), tg = road.getTangentAt(u)
      const s = (i % 2 ? 1 : -1) * 1.35
      m4.compose(v3(p.x + tg.z * s, Math.max(p.y, slopeHeight(p.x + tg.z * s, p.z - tg.x * s)) + 0.05, p.z - tg.x * s), new THREE.Quaternion().setFromEuler(new THREE.Euler(r(), r(), r())), v3(1, 0.6, 1).multiplyScalar(0.7 + r() * 0.6))
      sm.setMatrixAt(i, m4)
    }
    world.add(sm)
  }

  /* ---- footbridge over the gorge ---- */
  const bridgeA = v3(-10, -36.4, 90), bridgeB = v3(-12, -36.4, 116)
  const bridgeFlags = footbridge(world, bridgeA, bridgeB, r)

  /* ---- houses ---- */
  const kamalaHouse = v3(4, 0, -3.2)
  world.add(pahadiHouse(kamalaHouse.x, 0, kamalaHouse.z, 0, '#2E86DE', 6, 4.6, 2))
  const spots: [number, number, number][] = [
    [-11, -4, 0.15], [-33, -2, -0.1], [-46, 2, 0.2], [17, -5, -0.1], [30, -2, -0.2], [44, 1, 0.1], [57, 3, -0.25],
    [-20, 9, 0.1], [24, 10, -0.1], [-56, 12, 0.3],
    // upper hamlet on the slope behind
    [-14, -24, 0.1], [6, -27, -0.05], [26, -25, -0.15], [-34, -27, 0.2], [44, -30, -0.2], [-4, -40, 0.05], [18, -43, -0.1], [-26, -44, 0.15],
  ]
  spots.forEach(([x, z, ry], i) => world.add(pahadiHouse(x, groundHeight(x, z) - (z < -14 ? 0.6 : 0), z, ry, WALLS[(i * 3 + 1) % WALLS.length], 4.6 + r() * 1.4, 4 + r() * 0.6, r() > 0.25 ? 2 : 1)))
  // houses on the opposite slope near the PHC
  for (let i = 0; i < 8; i++) { const x = 20 + i * 14 + r() * 6, z = 132 + r() * 22; world.add(pahadiHouse(x, groundHeight(x, z) - 0.4, z, Math.PI + (r() - 0.5) * 0.3, WALLS[(i * 7) % WALLS.length], 4.8, 4.2, 2)) }

  /* ---- courtyard: slate paving, chair, tulsi, pots, woodpile ---- */
  const pave = new THREE.Mesh(new THREE.PlaneGeometry(10, 5.5), mat('#B8B1A6', { rough: 1 }))
  pave.rotation.x = -Math.PI / 2; pave.position.set(5.5, 0.03, 2.6); pave.receiveShadow = true; world.add(pave)
  for (let i = 0; i < 18; i++) world.add(rotm(mesh(new THREE.PlaneGeometry(1.1 + r() * 0.5, 0.9 + r() * 0.4), mat(r() > 0.5 ? '#A9A196' : '#C4BDB2'), 1.2 + (i % 6) * 1.6 + r() * 0.3, 0.04, 0.8 + Math.floor(i / 6) * 1.5 + r() * 0.2, false), 'x', -Math.PI / 2))
  const charpaiPos = v3(7.2, 0, 1.0)
  world.add(chair(charpaiPos.x, charpaiPos.z, 0))
  world.add(mesh(new THREE.BoxGeometry(0.7, 0.8, 0.7), mat('#F2A65A'), 0.2, 0.4, 0.4))
  world.add(mesh(new THREE.IcosahedronGeometry(0.42, 0), mat('#3F9A3A'), 0.2, 1.05, 0.4))
  // brass / copper / steel water pots (gagri) by the door, on a low stone ledge
  {
    const prof = [[0, 0], [0.12, 0.01], [0.24, 0.1], [0.27, 0.22], [0.24, 0.34], [0.14, 0.42], [0.09, 0.47], [0.09, 0.52], [0.13, 0.56], [0.12, 0.58], [0, 0.58]].map(([x, y]) => new THREE.Vector2(x, y))
    const potGeo = new THREE.LatheGeometry(prof, 16)
    world.add(mesh(new THREE.BoxGeometry(1.9, 0.12, 0.7), mat('#8E877C'), 10.2, 0.06, -0.4))
    ;(['#D4A017', '#B5542F', '#C9CCD1'] as const).forEach((c, i) => world.add(mesh(potGeo, mat(c, { metal: 0.65, rough: 0.32, flat: false }), 9.6 + i * 0.6, 0.12, -0.4)))
  }
  for (let i = 0; i < 12; i++) { const lg = mesh(new THREE.CylinderGeometry(0.12, 0.12, 1.6, 6), mat('#7A5230'), -0.6, 0.15 + Math.floor(i / 4) * 0.24, -0.4 + (i % 4) * 0.26); lg.rotation.x = Math.PI / 2; world.add(lg) }
  // marigold + flower pots on the courtyard wall
  for (let i = 0; i < 6; i++) { if (i === 3) continue; world.add(mesh(new THREE.CylinderGeometry(0.2, 0.15, 0.3, 8), mat('#B5542F'), 1 + i * 1.6, 0.15, 5.6)); world.add(mesh(new THREE.IcosahedronGeometry(0.17, 0), mat('#3E8E3A'), 1 + i * 1.6, 0.36, 5.6, false)); for (let f = 0; f < 5; f++) { const fa = f * 1.256 + i; world.add(mesh(new THREE.IcosahedronGeometry(0.055, 0), mat(['#FF8C00', '#FFC300', '#E84C8B'][(i + f) % 3]), 1 + i * 1.6 + Math.cos(fa) * 0.1, 0.46 + (f % 2) * 0.04, 5.6 + Math.sin(fa) * 0.1, false)) } }
  // courtyard wall with a gap where the footpath enters
  world.add(mesh(new THREE.BoxGeometry(4.75, 0.5, 0.35), mat('#9C958B'), 2.625, 0.25, 6.0))
  world.add(mesh(new THREE.BoxGeometry(3.75, 0.5, 0.35), mat('#9C958B'), 8.875, 0.25, 6.0))

  world.add(cow(-6, 0, 8, 0.8, '#7A4E2D', '#E84C8B'))
  world.add(cow(-3.5, 0, 10.5, -0.6, '#EFEAE0', '#3A86FF'))
  world.add(cow(36, 0, 8, 2.2, '#3B3B3B', '#FFB703'))

  /* ---- temple, flags, tower, PHC ---- */
  const tmpl = hillTemple(-24, 0, -6); world.add(tmpl)
  const flagGroup = new THREE.Group(); world.add(flagGroup)
  prayerFlags(flagGroup, v3(-29, 5.5, -2), v3(-16, 5.5, 4), r)
  prayerFlags(flagGroup, v3(12.5, 5.2, -1.5), v3(14.5, 5.2, -8), r, 0.8)
  prayerFlags(flagGroup, v3(-3, 5.2, -0.5), v3(-8, 5.2, 6), r, 0.8)
  prayerFlags(flagGroup, v3(22, 4.6, 12), v3(34, 4.6, 6), r)

  const towerPos = v3(-46, groundHeight(-46, -50), -50)
  world.add(tower(towerPos.x, towerPos.y, towerPos.z))
  const phc = v3(72, groundHeight(72, 140) + 0.3, 140)
  world.add(phcBuilding(phc.x, phc.y, phc.z))

  /* ---- trees: deodar forests + flowering rhododendron ---- */
  {
    const dGeo = deodarGeo(), rGeo = rhodoGeo()
    const trunkGeo = new THREE.CylinderGeometry(0.25, 0.35, 2.2, 5); trunkGeo.translate(0, 1.1, 0)
    const blossomGeo = new THREE.IcosahedronGeometry(0.32, 0)
    const deo: THREE.Matrix4[] = [], rho: THREE.Matrix4[] = [], trunks: THREE.Matrix4[] = [], bl: THREE.Matrix4[] = []
    const m4 = () => new THREE.Matrix4()
    let tries = 0
    while ((deo.length < 1500 || rho.length < 220) && tries < 30000) {
      tries++
      const a = r() * Math.PI * 2, rad = 18 + Math.pow(r(), 0.8) * 520
      const x = Math.cos(a) * rad, z = Math.sin(a) * rad * 0.9 + 30
      const y = groundHeight(x, z)
      if (y > 118 || y < -44) continue
      if (terraceMask(x, z) > 0.1 || pathDist(x, z) < 4) continue
      if (Math.abs(x) < 64 && z > -16 && z < 17) continue // the village shelf stays open
      if (Math.abs(z - RIVER_Z(x)) < 9) continue
      if (Math.hypot(x - phc.x, z - phc.z) < 12 || Math.hypot(x - towerPos.x, z - towerPos.z) < 6) continue
      const s = 0.8 + r() * 0.9
      const q = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, r() * 6, 0))
      const isRho = rho.length < 220 && y < 40 && r() < 0.22
      if (isRho) {
        rho.push(m4().compose(v3(x, y, z), q, v3(s, s, s))); trunks.push(m4().compose(v3(x, y, z), q, v3(s, s, s)))
        for (let k = 0; k < 5; k++) bl.push(m4().compose(v3(x + (r() - 0.5) * 2.4 * s, y + (2.6 + r() * 1.6) * s, z + (r() - 0.5) * 2.4 * s), q, v3(s, s, s)))
      } else if (deo.length < 1500) {
        const ss = s * (1.2 + r() * 0.6)
        deo.push(m4().compose(v3(x, y, z), q, v3(ss, ss * (1.1 + r() * 0.4), ss))); trunks.push(m4().compose(v3(x, y, z), q, v3(ss, ss, ss)))
      }
    }
    const inst = (geo: THREE.BufferGeometry, m: THREE.Material, arr: THREE.Matrix4[], shadow: boolean) => {
      const im = new THREE.InstancedMesh(geo, m, arr.length); arr.forEach((x, i) => im.setMatrixAt(i, x)); im.castShadow = shadow; im.receiveShadow = true; world.add(im); return im
    }
    const dIm = inst(dGeo, mat('#3B7343'), deo, true)
    const dc = new THREE.Color()
    for (let i = 0; i < deo.length; i++) dIm.setColorAt(i, dc.set(['#3B7343', '#467A3A', '#356B45', '#4F8440'][i % 4]))
    inst(rGeo, mat('#3E7D3A'), rho, true)
    inst(trunkGeo, mat('#6E4B2E'), trunks, false)
    const bIm = inst(blossomGeo, mat('#E8344E', { emissive: '#A0102A', ei: 0.25 }), bl, false)
    for (let i = 0; i < bl.length; i++) bIm.setColorAt(i, dc.set(['#E8344E', '#FF5C8A', '#D7263D'][i % 3]))
    // a few trees close to the village for depth
    for (const [x, z] of [[-14, -12], [14, -12], [36, -10], [-40, -10], [62, -8], [-60, -6]] as [number, number][]) {
      const y = groundHeight(x, z)
      const t = new THREE.Mesh(dGeo, mat('#3F7A45')); t.position.set(x, y, z); t.scale.setScalar(1.4); t.castShadow = true; world.add(t)
      world.add(mesh(trunkGeo, mat('#6E4B2E'), x, y, z))
    }
  }

  /* ---- clouds drifting through the valley and around peaks ---- */
  const clouds: THREE.Group[] = []
  const cloudMat = new THREE.MeshStandardMaterial({ color: '#FFFFFF', roughness: 1, emissive: '#F2F7FF', emissiveIntensity: 0.45, flatShading: true, transparent: true, opacity: 0.92 })
  for (let i = 0; i < 26; i++) {
    const c = new THREE.Group()
    const n = 4 + Math.floor(r() * 4)
    for (let k = 0; k < n; k++) c.add(new THREE.Mesh(new THREE.IcosahedronGeometry(3 + r() * 3.5, 1), cloudMat).translateX(k * 4 - n * 2).translateY(r() * 2).translateZ(r() * 3))
    if (i < 9) c.position.set(-260 + r() * 520, -24 + r() * 14, 95 + r() * 40)
    else { const a = r() * Math.PI * 2, rad = 160 + r() * 380; c.position.set(Math.cos(a) * rad, 70 + r() * 90, Math.sin(a) * rad) }
    c.scale.setScalar(0.9 + r() * 1.3)
    world.add(c); clouds.push(c)
  }

  /* ---- Himalayan griffons circling the gorge ---- */
  const birds: THREE.Group[] = []
  for (let i = 0; i < 8; i++) {
    const b = new THREE.Group()
    const wingGeo = new THREE.BoxGeometry(1.6, 0.05, 0.45)
    const wl = new THREE.Mesh(wingGeo, mat('#4A3B2E')); wl.position.x = -0.8
    const wr = new THREE.Mesh(wingGeo, mat('#4A3B2E')); wr.position.x = 0.8
    const pl = new THREE.Group(); pl.add(wl); const pr = new THREE.Group(); pr.add(wr)
    b.add(pl, pr, new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.3, 1.1), mat('#5A4636')))
    b.userData = { pl, pr, a: r() * 6, rad: 28 + r() * 30, h: 20 + r() * 25, ph: r() * 6 }
    world.add(b); birds.push(b)
  }

  const flag = tmpl.userData.flag as THREE.Mesh

  return {
    road, kamalaHouse, charpai: charpaiPos, phc, tower: towerPos, towerTop: towerPos.clone().setY(towerPos.y + 22),
    update(t) {
      for (const b of birds) {
        const u = b.userData
        const a = u.a + t * 0.12
        b.position.set(Math.cos(a) * u.rad + 10, u.h + Math.sin(t * 0.5 + u.ph) * 1.5, Math.sin(a) * u.rad + 60)
        b.rotation.set(0, -a, 0.25)
        const f = Math.sin(t * 2.2 + u.ph) * 0.18
        u.pl.rotation.z = f; u.pr.rotation.z = -f
      }
      for (const c of clouds) { c.position.x += 0.02; if (c.position.x > 600) c.position.x = -600 }
      flag.rotation.y = Math.sin(t * 3) * 0.35
      for (const g of [flagGroup, bridgeFlags]) g.children.forEach(ch => { if (ch.userData.phase !== undefined) ch.rotation.x = Math.sin(t * 2.5 + ch.userData.phase) * 0.4 })
    },
  }
}
