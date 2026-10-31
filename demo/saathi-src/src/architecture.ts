import * as THREE from 'three'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'
import { sensorDevice } from './characters'
import { T } from './timeline'
import { paintDashboardStill } from './dashboard'
import { FONT, easeOutBack, labelSprite, mat, roundRect, seg, smooth, v3 } from './util'

export const ARCH_Y = 70
export const ARCH_T0 = T.arch

function slabTexture(title: string, sub: string, col: string) {
  const c = document.createElement('canvas'); c.width = 1024; c.height = 160
  const ctx = c.getContext('2d')!
  ctx.fillStyle = col; ctx.fillRect(0, 0, 1024, 160)
  ctx.fillStyle = 'rgba(255,255,255,0.92)'; roundRect(ctx, 28, 30, 100, 100, 26); ctx.fill()
  ctx.fillStyle = col; ctx.beginPath(); ctx.arc(78, 80, 20, 0, Math.PI * 2); ctx.fill()
  ctx.fillStyle = '#FFFFFF'; ctx.textBaseline = 'middle'
  ctx.font = `800 58px ${FONT}`; ctx.fillText(title, 160, 62)
  ctx.font = `500 38px ${FONT}`; ctx.fillStyle = 'rgba(255,255,255,0.85)'; ctx.fillText(sub, 160, 116)
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8
  return t
}

interface Node { obj: THREE.Object3D; label?: THREE.Sprite; at: number; base: number }
interface Link { tube: THREE.Mesh; curve: THREE.Curve<THREE.Vector3>; at: number; dots: THREE.Mesh[]; count: number; label?: THREE.Sprite }

export function buildArchitecture(scene: THREE.Scene, buildPhone: () => THREE.Group) {
  const root = new THREE.Group(); root.position.y = ARCH_Y; scene.add(root)

  // floating blueprint platform
  const plat = new THREE.Mesh(new THREE.CylinderGeometry(30, 30, 0.4, 6), new THREE.MeshStandardMaterial({ color: '#E1FBF8', transparent: true, opacity: 0.55, roughness: 0.3, metalness: 0.1 }))
  plat.position.y = -0.4; root.add(plat)
  const edge = new THREE.Mesh(new THREE.TorusGeometry(30, 0.18, 6, 6), new THREE.MeshBasicMaterial({ color: '#2EC4B6' }))
  edge.rotation.x = Math.PI / 2; edge.rotation.z = Math.PI / 6; edge.position.y = -0.2; root.add(edge)
  const grid = new THREE.GridHelper(52, 26, '#00685F', '#7FD8CF')
  ;(grid.material as THREE.Material).transparent = true; (grid.material as THREE.Material).opacity = 0.35
  grid.position.y = -0.18; root.add(grid)

  const nodes: Node[] = []
  const add = (obj: THREE.Object3D, at: number, label?: THREE.Sprite, labelY = 0) => {
    root.add(obj)
    if (label) { label.position.set(obj.position.x, labelY, obj.position.z + 0.5); root.add(label) }
    nodes.push({ obj, label, at, base: obj.scale.x })
  }

  // 0. phone camera vision (MediaPipe Pose)
  const cam = new THREE.Group(); cam.position.set(-24, 3, 0)
  cam.add(new THREE.Mesh(new RoundedBoxGeometry(3.2, 2.2, 1.2, 3, 0.3), mat('#1C2026', { flat: false })))
  const lens = new THREE.Mesh(new THREE.CylinderGeometry(0.75, 0.85, 0.6, 24), mat('#2B2F36', { flat: false, metal: 0.6, rough: 0.3 })); lens.rotation.x = Math.PI / 2; lens.position.z = 0.8; cam.add(lens)
  const glass = new THREE.Mesh(new THREE.CircleGeometry(0.55, 24), new THREE.MeshBasicMaterial({ color: '#7CFFE9' })); glass.position.z = 1.11; cam.add(glass)
  add(cam, 0.6, labelSprite('Camera vision', 'MediaPipe Pose · ROM & posture', { scale: 5.8 }), 9.6)

  // 1. wearable pod on the tibia
  const sensor = sensorDevice(); sensor.scale.setScalar(42); sensor.position.set(-15.5, 3, 0)
  add(sensor, 1.0, labelSprite('Wearable pod', 'IMU on tibia · shock per step', { scale: 5.8 }), 6.6)
  const strap = new THREE.Mesh(new THREE.TorusGeometry(2.2, 0.35, 10, 30), mat('#2B2F36', { flat: false }))
  strap.position.set(-15.5, 3, -0.8); add(strap, 1.1)

  // 2. phone running SAATHI
  const phone = buildPhone(); phone.scale.setScalar(2.7); phone.position.set(-7, 3.2, 0.6); phone.rotation.y = 0.25
  add(phone, 2.4, labelSprite('SAATHI app', 'React + TS PWA · offline-first', { scale: 5.8 }), 7.0)

  // 3. app layers (exploded stack)
  const layers: [string, string, string][] = [
    ['Screens', '6 languages · voice guidance', '#00685F'],
    ['Vision + sensor', 'Pose ROM · tibial shock', '#2F8981'],
    ['Risk engine', 'On-device NN · diet plan', '#3A86FF'],
    ['Offline store', 'Local records · sync queue', '#9B5DE5'],
  ]
  const slabs: THREE.Group[] = []
  layers.forEach(([a, b, col], i) => {
    const g = new THREE.Group()
    const box = new THREE.Mesh(new RoundedBoxGeometry(8.4, 1.05, 4.2, 3, 0.25), new THREE.MeshStandardMaterial({ color: col, roughness: 0.4, metalness: 0.1 }))
    box.castShadow = true; g.add(box)
    const face = new THREE.Mesh(new THREE.PlaneGeometry(8.0, 1.25), new THREE.MeshBasicMaterial({ map: slabTexture(a, b, col), toneMapped: false }))
    face.scale.y = 0.8; face.position.z = 2.11; g.add(face)
    g.position.set(2, 6.2 - i * 1.6, 0)
    add(g, 3.4 + i * 0.45)
    g.userData.y = g.position.y
    slabs.push(g)
  })
  const stackLabel = labelSprite('App architecture', 'React + TypeScript · modular', { scale: 5.8 })
  stackLabel.position.set(2, 8.6, 0.5); root.add(stackLabel)
  nodes.push({ obj: new THREE.Object3D(), label: stackLabel, at: 3.4, base: 1 })

  // 4. mobile tower
  const tower = new THREE.Group(); tower.position.set(11, 0, 0)
  for (let i = 0; i < 4; i++) { const a = (i / 4) * Math.PI * 2 + Math.PI / 4; const l = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.12, 7, 5), mat('#8C979D', { metal: 0.6 })); l.position.set(Math.cos(a) * 0.6, 3.5, Math.sin(a) * 0.6); tower.add(l) }
  for (let k = 1; k < 6; k++) { const r = new THREE.Mesh(new THREE.TorusGeometry(0.62, 0.05, 4, 4), mat(k % 2 ? '#D7263D' : '#FFFFFF')); r.rotation.x = Math.PI / 2; r.position.y = k * 1.2; tower.add(r) }
  tower.add(new THREE.Mesh(new THREE.SphereGeometry(0.22, 10, 8), new THREE.MeshBasicMaterial({ color: '#FF3B3B' })).translateY(7.3))
  add(tower, 6.6, labelSprite('Sync when online', '4G / Wi-Fi · retry queue', { scale: 5.8 }), 9.6)

  // 5. cloud backend
  const cloud = new THREE.Group(); cloud.position.set(19, 5.5, -1)
  const cm = new THREE.MeshStandardMaterial({ color: '#FFFFFF', emissive: '#DCE9FF', emissiveIntensity: 0.4, roughness: 0.6, flatShading: true })
  ;[[0, 0, 0, 2.2], [-2, -0.5, 0, 1.6], [2.1, -0.4, 0, 1.7], [0.8, 1.0, -0.3, 1.5], [-1, 0.7, 0.4, 1.3]].forEach(([x, y, z, r]) => cloud.add(new THREE.Mesh(new THREE.IcosahedronGeometry(r, 1), cm).translateX(x).translateY(y).translateZ(z)))
  const lock = new THREE.Mesh(new RoundedBoxGeometry(1.2, 1.0, 0.5, 2, 0.15), mat('#00685F', { flat: false }))
  lock.position.set(0, -0.2, 2.1); cloud.add(lock)
  const shackle = new THREE.Mesh(new THREE.TorusGeometry(0.38, 0.1, 6, 14, Math.PI), mat('#00685F', { flat: false }))
  shackle.position.set(0, 0.3, 2.1); cloud.add(shackle)
  add(cloud, 8.6, labelSprite('Secure backend', 'Express · Prisma · Neon Postgres', { scale: 5.8 }), 9.6)

  // 6. PHC dashboard
  const phc = new THREE.Group(); phc.position.set(26, 0, 1.5)
  const ph1 = new THREE.Mesh(new THREE.BoxGeometry(5, 3, 3.4), mat('#F7F7F2')); ph1.position.y = 1.5; phc.add(ph1)
  const ph2 = new THREE.Mesh(new THREE.BoxGeometry(5.05, 0.4, 3.45), mat('#00685F')); ph2.position.y = 0.6; phc.add(ph2)
  const crossV = new THREE.Mesh(new THREE.BoxGeometry(0.35, 1.1, 0.1), new THREE.MeshBasicMaterial({ color: '#D7263D' })); crossV.position.set(0, 2.1, 1.76); phc.add(crossV)
  const crossH = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.35, 0.1), new THREE.MeshBasicMaterial({ color: '#D7263D' })); crossH.position.set(0, 2.1, 1.76); phc.add(crossH)
  const mon = new THREE.Mesh(new RoundedBoxGeometry(3.4, 2.2, 0.2, 2, 0.1), mat('#1C2026', { flat: false })); mon.position.set(0, 4.6, 0.5); phc.add(mon)
  const dashC = document.createElement('canvas'); dashC.width = 768; dashC.height = 480
  const dt = new THREE.CanvasTexture(dashC); dt.colorSpace = THREE.SRGBColorSpace; dt.anisotropy = 8
  paintDashboardStill(dashC, () => { dt.needsUpdate = true })
  const scr = new THREE.Mesh(new THREE.PlaneGeometry(3.2, 2.0), new THREE.MeshBasicMaterial({ map: dt, toneMapped: false })); scr.position.set(0, 4.6, 0.61); phc.add(scr)
  add(phc, 10.6, labelSprite('PHC dashboard', 'Overview · registry · analytics', { scale: 5.8 }), 8.4)

  // links + flowing data packets
  const links: Link[] = []
  const link = (a: THREE.Vector3, b: THREE.Vector3, at: number, color: string, h = 3, label?: string) => {
    const mid = a.clone().lerp(b, 0.5); mid.y += h
    const curve = new THREE.QuadraticBezierCurve3(a, mid, b)
    const geo = new THREE.TubeGeometry(curve, 64, 0.09, 6)
    const tube = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.55 }))
    tube.geometry.setDrawRange(0, 0)
    root.add(tube)
    const dots: THREE.Mesh[] = []
    for (let i = 0; i < 6; i++) { const d = new THREE.Mesh(new THREE.SphereGeometry(0.28, 10, 8), new THREE.MeshBasicMaterial({ color: '#FFFFFF' })); d.visible = false; root.add(d); dots.push(d) }
    let sp: THREE.Sprite | undefined
    if (label) { sp = labelSprite(label, undefined, { scale: 3.6, accent: color }); sp.position.copy(curve.getPoint(0.5)).add(v3(0, 1.0, 0)); root.add(sp); sp.material.opacity = 0 }
    links.push({ tube, curve, at, dots, count: geo.index!.count, label: sp })
  }
  link(v3(-22.4, 4.2, 0.6), v3(-8.4, 4.6, 0.6), 1.6, '#FFB703', 4.5, 'On-device vision')
  link(v3(-13.6, 3.0, 0), v3(-8.2, 3.0, 0.6), 2.0, '#2EC4B6', 1.5, 'Bluetooth / Wi-Fi')
  link(v3(-5.8, 3.6, 0.6), v3(-2.2, 4.4, 0), 3.2, '#00685F', 1.2)
  link(v3(6.4, 3.6, 0), v3(10.6, 6.8, 0), 6.2, '#3A86FF', 2.5, 'Encrypted sync')
  link(v3(11.4, 7.0, 0), v3(16.8, 5.6, -1), 8.2, '#3A86FF', 2.5)
  link(v3(21, 5, -1), v3(26, 4.6, 1.5), 10.2, '#9B5DE5', 2.0)

  root.visible = false

  return {
    root,
    update(t: number) {
      const tt = t - ARCH_T0
      root.visible = t > ARCH_T0 - 3 && t < ARCH_T0 + 20
      if (!root.visible) return
      const pf = smooth(seg(tt, -1.5, 1.0))
      ;(plat.material as THREE.MeshStandardMaterial).opacity = 0.55 * pf
      ;(grid.material as THREE.Material).opacity = 0.35 * pf
      edge.scale.setScalar(0.6 + 0.4 * pf)
      for (const n of nodes) {
        const k = easeOutBack(seg(tt, n.at, n.at + 0.7))
        n.obj.scale.setScalar(Math.max(0.0001, n.base * k))
        if (n.label) { n.label.material.opacity = smooth(seg(tt, n.at + 0.3, n.at + 0.9)) }
      }
      slabs.forEach((s, i) => { const k = smooth(seg(tt, 3.4 + i * 0.45, 4.1 + i * 0.45)); s.position.y = s.userData.y + (1 - k) * 6; s.position.x = 2 + Math.sin(t * 0.8 + i) * 0.06 })
      sensor.rotation.y = Math.sin(t * 0.9) * 0.5 + 0.3
      strap.rotation.y = sensor.rotation.y
      phone.rotation.y = 0.25 + Math.sin(t * 0.7) * 0.12
      cloud.position.y = 5.5 + Math.sin(t * 1.2) * 0.3
      for (const l of links) {
        const k = smooth(seg(tt, l.at, l.at + 0.9))
        l.tube.geometry.setDrawRange(0, Math.floor((l.count / 3) * k) * 3)
        if (l.label) l.label.material.opacity = smooth(seg(tt, l.at + 0.5, l.at + 1.2))
        l.dots.forEach((d, i) => {
          d.visible = k >= 1
          if (d.visible) { const u = (t * 0.45 + i / l.dots.length) % 1; l.curve.getPoint(u, d.position); d.scale.setScalar(0.6 + Math.sin(u * Math.PI) * 0.7) }
        })
      }
    },
  }
}
