import * as THREE from 'three'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'
import { mat, mesh } from './util'

export interface Rig {
  root: THREE.Group
  hips: THREE.Group
  torso: THREE.Group
  head: THREE.Group
  shoulderL: THREE.Group; shoulderR: THREE.Group
  elbowL: THREE.Group; elbowR: THREE.Group
  handL: THREE.Group; handR: THREE.Group
  legL: THREE.Group; legR: THREE.Group
  kneeL: THREE.Group; kneeR: THREE.Group
  skirt?: THREE.Object3D
  seatedDrape?: THREE.Object3D
  hipH: number
}

export interface PersonOpts {
  skin: string
  top: string           // blouse / kurta
  saree?: string        // saree colour (female)
  border?: string
  legs?: string         // trousers / dhoti
  hair: string
  bun?: boolean
  turban?: string
  scale?: number
  stick?: boolean
  dupatta?: string      // salwar-kameez scarf across the chest
  kurta?: boolean       // long kurta hem (hidden while seated / kneeling, so legs never clip)
  shorts?: boolean      // knee-length shorts: knee + shin are bare (camera can see the knee)
  cap?: string          // knitted cap
  vest?: string         // sleeveless jacket
  moustache?: string
}

export function person(o: PersonOpts): Rig {
  const root = new THREE.Group()
  const hipH = 0.86
  const hips = new THREE.Group(); hips.position.y = hipH; root.add(hips)
  const skinM = mat(o.skin, { flat: false, rough: 0.7 })
  const topM = mat(o.top, { flat: false })
  const legM = mat(o.legs ?? o.skin, { flat: false })

  // torso
  const torso = new THREE.Group(); hips.add(torso)
  torso.add(mesh(new THREE.CylinderGeometry(0.15, 0.13, 0.56, 10), topM, 0, 0.28, 0))
  if (o.saree) {
    // pallu draped diagonally across the chest
    const pallu = mesh(new THREE.BoxGeometry(0.14, 0.62, 0.33), mat(o.saree, { flat: false }), 0.03, 0.3, 0)
    pallu.rotation.z = 0.5; torso.add(pallu)
    const b = mesh(new THREE.BoxGeometry(0.035, 0.62, 0.335), mat(o.border ?? '#E0A526'), 0.1, 0.27, 0, false)
    b.rotation.z = 0.5; torso.add(b)
    torso.add(mesh(new THREE.CylinderGeometry(0.135, 0.15, 0.12, 10), mat(o.saree, { flat: false }), 0, 0.05, 0))
  }
  if (o.dupatta) {
    const dm = mat(o.dupatta, { flat: false })
    const d1 = mesh(new THREE.BoxGeometry(0.1, 0.6, 0.322), dm, -0.02, 0.32, 0); d1.rotation.z = -0.55; torso.add(d1)
    const ring = mesh(new THREE.TorusGeometry(0.135, 0.028, 6, 14), dm, 0, 0.55, 0, false); ring.rotation.x = Math.PI / 2; torso.add(ring)
    const tail = mesh(new THREE.BoxGeometry(0.1, 0.42, 0.03), dm, -0.12, 0.3, -0.15); tail.rotation.z = 0.1; torso.add(tail)
  }
  if (o.vest) {
    const vm = mat(o.vest, { flat: false })
    // open-front sleeveless jacket (cylinder with a gap at +z)
    torso.add(mesh(new THREE.CylinderGeometry(0.162, 0.142, 0.5, 14, 1, true, 0.42, Math.PI * 2 - 0.84), vm, 0, 0.3, 0))
    torso.add(mesh(new THREE.CylinderGeometry(0.165, 0.165, 0.04, 14, 1, true, 0.42, Math.PI * 2 - 0.84), mat('#E0C27A'), 0, 0.06, 0, false))
    for (let i = 0; i < 3; i++) torso.add(mesh(new THREE.SphereGeometry(0.009, 6, 4), mat('#E0C27A', { metal: 0.6, rough: 0.3 }), 0.072, 0.16 + i * 0.11, 0.142, false))
  }
  // neck + head
  torso.add(mesh(new THREE.CylinderGeometry(0.045, 0.05, 0.08, 6), skinM, 0, 0.6, 0))
  const head = new THREE.Group(); head.position.y = 0.72; torso.add(head)
  head.add(mesh(new THREE.SphereGeometry(0.115, 16, 12), skinM, 0, 0, 0))
  const hairM = mat(o.hair, { flat: false, rough: 0.6 })
  const hair = mesh(new THREE.SphereGeometry(0.122, 16, 12, 0, Math.PI * 2, 0, Math.PI * 0.55), hairM, 0, 0.012, -0.012)
  head.add(hair)
  if (o.bun) head.add(mesh(new THREE.SphereGeometry(0.06, 10, 8), hairM, 0, 0.0, -0.13))
  if (o.cap) {
    const cm = mat(o.cap, { flat: false, rough: 0.9 })
    head.add(mesh(new THREE.SphereGeometry(0.128, 16, 10, 0, Math.PI * 2, 0, Math.PI * 0.42), cm, 0, 0.03, -0.005))
    const rib = mesh(new THREE.TorusGeometry(0.118, 0.022, 6, 18), mat('#3A2747', { flat: false, rough: 0.9 }), 0, 0.055, -0.005); rib.rotation.x = Math.PI / 2; head.add(rib)
  }
  if (o.moustache) {
    const mm = mat(o.moustache, { rough: 0.8 })
    for (const sx of [-1, 1]) { const m = mesh(new THREE.CapsuleGeometry(0.009, 0.03, 3, 6), mm, sx * 0.022, -0.026, 0.108, false); m.rotation.z = Math.PI / 2 + sx * 0.35; head.add(m) }
  }
  if (o.turban) {
    const tb = mesh(new THREE.TorusGeometry(0.1, 0.05, 8, 16), mat(o.turban), 0, 0.07, 0)
    tb.rotation.x = Math.PI / 2; head.add(tb)
    head.add(mesh(new THREE.SphereGeometry(0.1, 10, 8), mat(o.turban), 0, 0.1, 0))
  }
  for (const sx of [-1, 1]) head.add(mesh(new THREE.SphereGeometry(0.013, 6, 4), mat('#1A1A1A'), sx * 0.04, 0.015, 0.105, false))
  if (o.saree) head.add(mesh(new THREE.SphereGeometry(0.011, 6, 4), mat('#D7263D', { emissive: '#D7263D', ei: 0.4 }), 0, 0.055, 0.112, false))
  // smile
  const smile = mesh(new THREE.TorusGeometry(0.025, 0.005, 4, 10, Math.PI), mat('#6B2E2E'), 0, -0.04, 0.105, false)
  smile.rotation.z = Math.PI; head.add(smile)

  // arms
  const arm = (side: number) => {
    const sh = new THREE.Group(); sh.position.set(side * 0.19, 0.5, 0); torso.add(sh)
    sh.add(mesh(new THREE.SphereGeometry(0.055, 8, 6), topM, 0, 0, 0))
    sh.add(mesh(new THREE.CylinderGeometry(0.045, 0.04, 0.28, 8), o.saree ? skinM : topM, 0, -0.14, 0))
    const el = new THREE.Group(); el.position.y = -0.28; sh.add(el)
    el.add(mesh(new THREE.CylinderGeometry(0.038, 0.034, 0.26, 8), skinM, 0, -0.13, 0))
    if (o.saree) el.add(mesh(new THREE.TorusGeometry(0.036, 0.01, 4, 10), mat(side > 0 ? '#E0A526' : '#D7263D', { metal: 0.5, rough: 0.4 }), 0, -0.22, 0, false))
    const hand = new THREE.Group(); hand.position.y = -0.28; el.add(hand)
    hand.add(mesh(new THREE.SphereGeometry(0.042, 8, 6), skinM, 0, 0, 0))
    return { sh, el, hand }
  }
  const L = arm(-1), R = arm(1)

  // legs
  const leg = (side: number) => {
    const hp = new THREE.Group(); hp.position.set(side * 0.085, 0, 0); hips.add(hp)
    hp.add(mesh(new THREE.CylinderGeometry(0.065, 0.055, 0.42, 8), legM, 0, -0.21, 0))
    const kn = new THREE.Group(); kn.position.y = -0.42; hp.add(kn)
    kn.add(mesh(new THREE.SphereGeometry(0.055, 8, 6), o.shorts ? skinM : legM, 0, 0, 0))
    kn.add(mesh(new THREE.CylinderGeometry(0.05, 0.04, 0.42, 8), o.saree || o.shorts ? skinM : legM, 0, -0.21, 0))
    if (o.shorts) hp.add(mesh(new THREE.CylinderGeometry(0.074, 0.07, 0.07, 10), legM, 0, -0.33, 0, false)) // hem, just above the knee
    if (o.saree) kn.add(mesh(new THREE.TorusGeometry(0.042, 0.008, 4, 10), mat('#C0C0C0', { metal: 0.8, rough: 0.3 }), 0, -0.38, 0, false))
    kn.add(mesh(new THREE.BoxGeometry(0.08, 0.05, 0.18), mat(o.shorts ? '#2B2B2B' : '#5A3A22'), 0, -0.43, 0.04))
    return { hp, kn }
  }
  const LL = leg(-1), LR = leg(1)

  let skirt: THREE.Object3D | undefined, seatedDrape: THREE.Object3D | undefined
  if (o.saree) {
    const sk = new THREE.Group()
    sk.add(mesh(new THREE.CylinderGeometry(0.16, 0.3, 0.8, 14), mat(o.saree, { flat: false }), 0, -0.36, 0))
    sk.add(mesh(new THREE.CylinderGeometry(0.302, 0.31, 0.09, 14), mat(o.border ?? '#E0A526'), 0, -0.73, 0, false))
    sk.add(mesh(new THREE.BoxGeometry(0.06, 0.7, 0.02), mat(o.border ?? '#E0A526'), 0.05, -0.38, 0.235, false))
    hips.add(sk); skirt = sk
    const sd = new THREE.Group()
    sd.add(mesh(new THREE.BoxGeometry(0.36, 0.17, 0.5), mat(o.saree, { flat: false }), 0, 0, 0.2))
    sd.add(mesh(new THREE.BoxGeometry(0.38, 0.12, 0.06), mat(o.saree, { flat: false }), 0, -0.07, 0.45))
    sd.add(mesh(new THREE.BoxGeometry(0.385, 0.04, 0.065), mat(o.border ?? '#E0A526'), 0, -0.13, 0.45, false))
    sd.visible = false
    hips.add(sd); seatedDrape = sd
  } else if (o.kurta) {
    // knee-length kurta (side-slit look): hidden when seated or kneeling so the thighs never cut through it
    const k = new THREE.Group()
    k.add(mesh(new THREE.CylinderGeometry(0.15, 0.215, 0.36, 12), topM, 0, -0.13, 0))
    k.add(mesh(new THREE.CylinderGeometry(0.217, 0.219, 0.035, 12), mat(o.dupatta ?? o.top), 0, -0.3, 0, false))
    hips.add(k); skirt = k
  } else if (o.legs && !o.shorts) {
    // short tunic hem
    const k = mesh(new THREE.CylinderGeometry(0.15, 0.19, 0.2, 10), topM, 0, -0.05, 0)
    hips.add(k); skirt = k
  }

  if (o.stick) {
    const st = mesh(new THREE.CylinderGeometry(0.014, 0.014, 0.95, 5), mat('#7A4F2A'), 0, -0.42, 0.02)
    R.hand.add(st)
    root.userData.stick = st
  }

  root.scale.setScalar(o.scale ?? 1)
  return {
    root, hips, torso, head, hipH,
    shoulderL: L.sh, shoulderR: R.sh, elbowL: L.el, elbowR: R.el, handL: L.hand, handR: R.hand,
    legL: LL.hp, legR: LR.hp, kneeL: LL.kn, kneeR: LR.kn, skirt, seatedDrape,
  }
}

export function resetPose(r: Rig) {
  for (const g of [r.hips, r.torso, r.head, r.shoulderL, r.shoulderR, r.elbowL, r.elbowR, r.legL, r.legR, r.kneeL, r.kneeR]) g.rotation.set(0, 0, 0)
  r.hips.position.set(0, r.hipH, 0)
  r.shoulderL.rotation.z = -0.08; r.shoulderR.rotation.z = 0.08
  if (r.skirt) r.skirt.visible = true
  if (r.seatedDrape) r.seatedDrape.visible = false
}

export function walkPose(r: Rig, phase: number, amp = 0.45, limp = 0) {
  const s = Math.sin(phase)
  r.legL.rotation.x = -s * amp
  r.legR.rotation.x = s * amp * (1 - limp * 0.5)
  r.kneeL.rotation.x = Math.max(0, Math.sin(phase + 1.2)) * amp * 1.4
  r.kneeR.rotation.x = Math.max(0, Math.sin(phase + 1.2 + Math.PI)) * amp * 1.4 * (1 - limp * 0.6)
  r.shoulderL.rotation.x = s * amp * 0.8
  r.shoulderR.rotation.x = -s * amp * 0.8
  r.hips.position.y = r.hipH + Math.abs(Math.cos(phase)) * 0.025 - 0.02 - (limp ? Math.max(0, Math.sin(phase)) * 0.03 : 0)
  r.torso.rotation.z = limp ? Math.sin(phase) * 0.06 : 0
}

export function sitPose(r: Rig, seatH: number) {
  r.hips.position.y = seatH + 0.07
  r.legL.rotation.x = -Math.PI / 2; r.legR.rotation.x = -Math.PI / 2
  r.kneeL.rotation.x = Math.PI / 2; r.kneeR.rotation.x = Math.PI / 2
  r.legL.rotation.y = 0.08; r.legR.rotation.y = -0.08
  if (r.skirt) r.skirt.visible = false
  if (r.seatedDrape) r.seatedDrape.visible = true
}

export function holdPhonePose(r: Rig, lift = 1) {
  r.shoulderR.rotation.x = -0.75 * lift
  r.shoulderR.rotation.z = 0.25 * lift
  r.elbowR.rotation.x = -1.1 * lift
  r.head.rotation.x = 0.25 * lift
}

/** The SAATHI wearable knee sensor */
export function sensorDevice() {
  const g = new THREE.Group()
  const body = mesh(new RoundedBoxGeometry(0.075, 0.05, 0.026, 3, 0.01), mat('#00685F', { rough: 0.35, flat: false }), 0, 0, 0)
  g.add(body)
  g.add(mesh(new RoundedBoxGeometry(0.06, 0.036, 0.006, 2, 0.004), mat('#99EFE5', { rough: 0.3, flat: false }), 0, 0, 0.013, false))
  const led = mesh(new THREE.SphereGeometry(0.006, 8, 6), new THREE.MeshBasicMaterial({ color: '#7CFFB2' }), 0.022, 0.01, 0.017, false)
  g.add(led)
  g.userData.led = led
  return g
}

export function scooter(color = '#00A6A6') {
  const g = new THREE.Group()
  const body = mat(color, { rough: 0.35, flat: false })
  const dark = mat('#222')
  for (const z of [-0.62, 0.62]) {
    const w = mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.12, 16), dark, 0, 0.24, z)
    w.rotation.z = Math.PI / 2; g.add(w)
    const hub = mesh(new THREE.CylinderGeometry(0.11, 0.11, 0.13, 10), mat('#BBBBBB', { metal: 0.8, rough: 0.3 }), 0, 0.24, z, false)
    hub.rotation.z = Math.PI / 2; g.add(hub)
  }
  g.add(mesh(new THREE.BoxGeometry(0.34, 0.08, 0.7), body, 0, 0.3, 0.05))
  g.add(mesh(new RoundedBoxGeometry(0.4, 0.38, 0.62, 3, 0.1), body, 0, 0.52, -0.42))
  g.add(mesh(new RoundedBoxGeometry(0.3, 0.1, 0.55, 2, 0.04), mat('#3A2A1E', { flat: false }), 0, 0.76, -0.38))
  const shield = mesh(new RoundedBoxGeometry(0.38, 0.7, 0.1, 3, 0.04), body, 0, 0.62, 0.5)
  shield.rotation.x = -0.25; g.add(shield)
  g.add(mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.5, 6), mat('#999', { metal: 0.7 }), 0, 0.95, 0.56, false))
  const bar = mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.62, 6), mat('#333'), 0, 1.18, 0.6, false)
  bar.rotation.z = Math.PI / 2; g.add(bar)
  g.add(mesh(new THREE.SphereGeometry(0.07, 10, 8), new THREE.MeshBasicMaterial({ color: '#FFF6C8' }), 0, 1.08, 0.7, false))
  // satchel with the SAATHI kit
  g.add(mesh(new RoundedBoxGeometry(0.3, 0.22, 0.2, 2, 0.04), mat('#99EFE5', { flat: false }), 0, 0.9, -0.85))
  return g
}

export function placeOnSeat(r: Rig) {
  sitPose(r, 0.72)
  r.legL.rotation.x = -1.25; r.legR.rotation.x = -1.25
  r.kneeL.rotation.x = 1.45; r.kneeR.rotation.x = 1.45
  r.shoulderL.rotation.x = -1.05; r.shoulderR.rotation.x = -1.05
  r.elbowL.rotation.x = -0.35; r.elbowR.rotation.x = -0.35
  r.torso.rotation.x = 0.15
}

/** kneeling on the ground in front of the patient (strapping the pod) */
export function kneelPose(r: Rig, lean = 0.45) {
  if (r.skirt) r.skirt.visible = false
  r.hips.position.y = 0.5
  r.legL.rotation.x = -0.15; r.legR.rotation.x = -0.15
  r.kneeL.rotation.x = Math.PI / 2 + 0.15; r.kneeR.rotation.x = Math.PI / 2 + 0.15
  r.torso.rotation.x = lean
  r.shoulderL.rotation.x = -1.0; r.shoulderR.rotation.x = -1.0
  r.elbowL.rotation.x = -0.6; r.elbowR.rotation.x = -0.6
  r.shoulderL.rotation.z = 0.25; r.shoulderR.rotation.z = -0.25
  r.head.rotation.x = 0.35
}

/** ASHA kit bag worn across the shoulder */
export function ashaBag() {
  const g = new THREE.Group()
  g.add(mesh(new RoundedBoxGeometry(0.3, 0.24, 0.1, 2, 0.03), mat('#00685F', { flat: false }), 0, 0, 0))
  g.add(mesh(new RoundedBoxGeometry(0.2, 0.08, 0.02, 2, 0.01), mat('#99EFE5', { flat: false }), 0, 0.03, 0.055, false))
  const strap = mesh(new THREE.BoxGeometry(0.035, 0.75, 0.02), mat('#004F48'), 0.12, 0.33, 0.0, false)
  strap.rotation.z = 0.55; g.add(strap)
  return g
}

/** phone stand: the patient faces the phone camera for the ROM + posture tests */
export function tripod() {
  const g = new THREE.Group()
  const m = mat('#2B2F36', { metal: 0.5, rough: 0.4, flat: false })
  for (let i = 0; i < 3; i++) {
    const a = (i / 3) * Math.PI * 2
    const leg = mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.95, 6), m, Math.sin(a) * 0.16, 0.45, Math.cos(a) * 0.16)
    leg.rotation.set(Math.cos(a) * 0.33, 0, -Math.sin(a) * 0.33); g.add(leg)
  }
  g.add(mesh(new THREE.CylinderGeometry(0.014, 0.014, 0.3, 6), m, 0, 1.0, 0))
  g.add(mesh(new THREE.BoxGeometry(0.1, 0.03, 0.05), m, 0, 1.15, 0))
  return g
}
