import * as THREE from 'three'

export const clamp = (x: number, a = 0, b = 1) => Math.min(b, Math.max(a, x))
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t
export const smooth = (x: number) => { x = clamp(x); return x * x * (3 - 2 * x) }
export const easeInOut = (x: number) => { x = clamp(x); return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2 }
export const easeOut = (x: number) => 1 - Math.pow(1 - clamp(x), 3)
export const easeOutBack = (x: number) => { x = clamp(x); const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2) }
/** 0..1 progress of t inside [a,b] */
export const seg = (t: number, a: number, b: number) => clamp((t - a) / (b - a))
/** fade-in / hold / fade-out window */
export const win = (t: number, a: number, b: number, f = 0.5) => Math.min(smooth((t - a) / f), smooth((b - t) / f))

export const v3 = (x = 0, y = 0, z = 0) => new THREE.Vector3(x, y, z)

/** deterministic random */
export function rng(seed: number) {
  let s = seed >>> 0
  return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296 }
}

const matCache = new Map<string, THREE.MeshStandardMaterial>()
export function mat(color: THREE.ColorRepresentation, opts: { rough?: number; metal?: number; emissive?: THREE.ColorRepresentation; ei?: number; flat?: boolean } = {}) {
  const key = `${new THREE.Color(color).getHexString()}|${opts.rough ?? 0.85}|${opts.metal ?? 0}|${opts.emissive ?? ''}|${opts.ei ?? 0}|${opts.flat ?? true}`
  let m = matCache.get(key)
  if (!m) {
    m = new THREE.MeshStandardMaterial({ color, roughness: opts.rough ?? 0.85, metalness: opts.metal ?? 0, flatShading: opts.flat ?? true })
    if (opts.emissive) { m.emissive = new THREE.Color(opts.emissive); m.emissiveIntensity = opts.ei ?? 1 }
    matCache.set(key, m)
  }
  return m
}

export function mesh(geo: THREE.BufferGeometry, material: THREE.Material, x = 0, y = 0, z = 0, shadow = true) {
  const m = new THREE.Mesh(geo, material)
  m.position.set(x, y, z)
  m.castShadow = shadow
  m.receiveShadow = true
  return m
}

/** Catmull-Rom interpolation of keyframed vectors. keys: [t, x, y, z] */
export function splineAt(keys: number[][], t: number, out = new THREE.Vector3()) {
  if (t <= keys[0][0]) return out.set(keys[0][1], keys[0][2], keys[0][3])
  const n = keys.length
  if (t >= keys[n - 1][0]) return out.set(keys[n - 1][1], keys[n - 1][2], keys[n - 1][3])
  let i = 0
  while (i < n - 2 && t > keys[i + 1][0]) i++
  const p0 = keys[Math.max(0, i - 1)], p1 = keys[i], p2 = keys[i + 1], p3 = keys[Math.min(n - 1, i + 2)]
  const u = easeInOut((t - p1[0]) / (p2[0] - p1[0])) * 0.35 + ((t - p1[0]) / (p2[0] - p1[0])) * 0.65
  const cr = (a: number, b: number, c: number, d: number) => {
    const u2 = u * u, u3 = u2 * u
    return 0.5 * (2 * b + (-a + c) * u + (2 * a - 5 * b + 4 * c - d) * u2 + (-a + 3 * b - 3 * c + d) * u3)
  }
  return out.set(cr(p0[1], p1[1], p2[1], p3[1]), cr(p0[2], p1[2], p2[2], p3[2]), cr(p0[3], p1[3], p2[3], p3[3]))
}

export function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  const rr = Math.min(r, w / 2, h / 2)
  ctx.beginPath()
  ctx.moveTo(x + rr, y)
  ctx.arcTo(x + w, y, x + w, y + h, rr)
  ctx.arcTo(x + w, y + h, x, y + h, rr)
  ctx.arcTo(x, y + h, x, y, rr)
  ctx.arcTo(x, y, x + w, y, rr)
  ctx.closePath()
}

export const FONT = `Inter, "Segoe UI", Roboto, "Noto Sans", system-ui, -apple-system, sans-serif`

/** Text label as a sprite (used sparingly for architecture blocks). */
export function labelSprite(title: string, sub?: string, opts: { color?: string; bg?: string; accent?: string; scale?: number } = {}) {
  const c = document.createElement('canvas')
  const W = 1024, H = sub ? 300 : 190
  c.width = W; c.height = H
  const ctx = c.getContext('2d')!
  ctx.fillStyle = opts.bg ?? 'rgba(255,255,255,0.94)'
  roundRect(ctx, 8, 8, W - 16, H - 16, 60); ctx.fill()
  ctx.fillStyle = opts.accent ?? '#00685F'
  roundRect(ctx, 40, H / 2 - 50, 16, 100, 8); ctx.fill()
  ctx.fillStyle = opts.color ?? '#0E1A1A'
  ctx.textBaseline = 'middle'
  ctx.font = `700 76px ${FONT}`
  ctx.fillText(title, 90, sub ? 105 : H / 2 + 2, W - 130)
  if (sub) { ctx.font = `500 54px ${FONT}`; ctx.fillStyle = '#5F6B6B'; ctx.fillText(sub, 90, 200, W - 130) }
  const tex = new THREE.CanvasTexture(c)
  tex.colorSpace = THREE.SRGBColorSpace
  tex.anisotropy = 4
  const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false, fog: false, toneMapped: false }))
  const s = opts.scale ?? 4
  sp.scale.set(s, s * H / W, 1)
  return sp
}
