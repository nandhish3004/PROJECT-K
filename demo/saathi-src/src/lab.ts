import * as THREE from 'three'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'
import { sensorDevice } from './characters'
import { T } from './timeline'
import { clamp, mat, mesh, seg, smooth, v3 } from './util'

/* Floating "explainer" dioramas above the gorge:
   1) anatomy of the knee: heel-strike → shock wave up the tibia → pod → knee cartilage
   2) sports-biomechanics lab: tibia-mounted accelerometer ranks shoe cushioning (hard vs cushioned) */

export const ANAT_POS = v3(0, 22, 64)
export const LAB_POS = v3(24, 22, 64)
export const ANAT_PERIOD = 1.6
export const ANAT_T0 = T.shock + 5.4         // anatomy view starts
export const ANAT_WORN = T.shock + 8.8        // switch to stiff / worn knee
export const LAB_T0 = T.lab
export const LAB_SWAP = T.lab + 3.6           // hard sole → cushioned shoe
export const NOVEL_T0 = T.lab + 7
export const RUN_PERIOD = 0.72

function glowMat(color: string, opacity = 1) {
  return new THREE.MeshBasicMaterial({ color, transparent: true, opacity, blending: THREE.AdditiveBlending, depthWrite: false })
}

export function buildLab(scene: THREE.Scene) {
  /* ------------------------------ anatomy ------------------------------ */
  const anat = new THREE.Group(); anat.position.copy(ANAT_POS); scene.add(anat)
  const plate = mesh(new THREE.CylinderGeometry(7.5, 7.5, 0.4, 48), mat('#F4FBFA', { flat: false, rough: 0.5 }), 0, -0.2, 0)
  anat.add(plate)
  const rim = new THREE.Mesh(new THREE.TorusGeometry(7.5, 0.12, 6, 64), new THREE.MeshBasicMaterial({ color: '#2EC4B6' })); rim.rotation.x = Math.PI / 2; anat.add(rim)
  const grid = new THREE.GridHelper(13, 13, '#7FD8CF', '#CDEFEA'); grid.position.y = 0.02; anat.add(grid)

  const leg = new THREE.Group(); anat.add(leg) // person faces +x
  const bone = mat('#F3EBD9', { flat: false, rough: 0.6 })
  // foot
  leg.add(mesh(new RoundedBoxGeometry(1.2, 0.8, 1.0, 2, 0.25), bone, 0.1, 0.55, 0))
  const meta = mesh(new RoundedBoxGeometry(2.4, 0.35, 0.9, 2, 0.15), bone, 1.6, 0.32, 0); meta.rotation.z = -0.12; leg.add(meta)
  // tibia + fibula
  leg.add(mesh(new THREE.CylinderGeometry(0.34, 0.42, 5.0, 16), bone, 0.3, 3.5, 0))
  leg.add(mesh(new THREE.CylinderGeometry(0.85, 0.5, 0.6, 20), bone, 0.3, 6.15, 0))
  leg.add(mesh(new THREE.CylinderGeometry(0.13, 0.15, 4.4, 8), bone, -0.25, 3.5, 0.35))
  // cartilage + meniscus
  const cartMat = new THREE.MeshStandardMaterial({ color: '#5BC0EB', emissive: '#1C7FB0', emissiveIntensity: 0.3, roughness: 0.3, transparent: true, opacity: 0.95 })
  const cart = new THREE.Mesh(new THREE.CylinderGeometry(0.86, 0.86, 0.32, 24), cartMat); cart.position.set(0.3, 6.6, 0); leg.add(cart)
  const men = new THREE.Mesh(new THREE.TorusGeometry(0.72, 0.13, 8, 24), cartMat); men.rotation.x = Math.PI / 2; men.position.set(0.3, 6.6, 0); leg.add(men)
  // femur
  const femur = new THREE.Group(); femur.position.set(0.3, 7.25, 0); leg.add(femur)
  for (const z of [-0.38, 0.38]) femur.add(mesh(new THREE.SphereGeometry(0.55, 16, 12), bone, 0, 0, z))
  const shaft = mesh(new THREE.CylinderGeometry(0.4, 0.5, 4.4, 16), bone, -0.25, 2.3, 0); shaft.rotation.z = 0.12; femur.add(shaft)
  const patella = mesh(new THREE.SphereGeometry(0.42, 12, 10), bone, 0.95, 0.0, 0); patella.scale.set(0.55, 1, 0.9); femur.add(patella)
  // translucent skin
  const skinM = new THREE.MeshStandardMaterial({ color: '#C98B63', transparent: true, opacity: 0.16, roughness: 0.6, depthWrite: false })
  leg.add(new THREE.Mesh(new THREE.CapsuleGeometry(0.95, 5.2, 8, 16), skinM).translateX(0.3).translateY(3.9))
  leg.add(new THREE.Mesh(new THREE.CapsuleGeometry(1.25, 4.0, 8, 16), skinM).translateX(0.1).translateY(9.4))
  // pod strapped below the knee on the tibia
  const pod = sensorDevice(); pod.scale.setScalar(16); pod.position.set(1.15, 5.3, 0); pod.rotation.y = Math.PI / 2; leg.add(pod)
  const strap = new THREE.Mesh(new THREE.TorusGeometry(1.0, 0.16, 8, 32), mat('#2B2F36', { flat: false })); strap.rotation.x = Math.PI / 2; strap.position.set(0.3, 5.3, 0); leg.add(strap)
  // shock wave ring + glow
  const wave = new THREE.Mesh(new THREE.TorusGeometry(0.75, 0.12, 8, 32), glowMat('#FFC300')); wave.rotation.x = Math.PI / 2; leg.add(wave)
  const waveGlow = new THREE.Mesh(new THREE.SphereGeometry(0.6, 16, 12), glowMat('#FF9F1C', 0.6)); leg.add(waveGlow)
  const ripple = new THREE.Mesh(new THREE.RingGeometry(0.6, 0.9, 40), glowMat('#FFB703')); ripple.rotation.x = -Math.PI / 2; ripple.position.y = 0.05; anat.add(ripple)
  const kneeGlow = new THREE.Mesh(new THREE.SphereGeometry(1.3, 16, 12), glowMat('#FF5A36', 0.0)); kneeGlow.position.set(0.3, 6.7, 0); leg.add(kneeGlow)

  /* ------------------------------ lab ------------------------------ */
  const lab = new THREE.Group(); lab.position.copy(LAB_POS); scene.add(lab)
  lab.add(mesh(new THREE.CylinderGeometry(8, 8, 0.4, 48), mat('#F7F8FB', { flat: false, rough: 0.5 }), 0, -0.2, 0))
  const lrim = new THREE.Mesh(new THREE.TorusGeometry(8, 0.12, 6, 64), new THREE.MeshBasicMaterial({ color: '#3A86FF' })); lrim.rotation.x = Math.PI / 2; lab.add(lrim)
  // treadmill
  const tm = new THREE.Group(); lab.add(tm)
  tm.add(mesh(new RoundedBoxGeometry(7.5, 0.6, 2.6, 2, 0.2), mat('#3A3F47', { flat: false }), 0, 0.5, 0))
  const belt = mesh(new THREE.BoxGeometry(7.0, 0.08, 2.0), mat('#1B1E22'), 0, 0.84, 0); tm.add(belt)
  for (const z of [-1.25, 1.25]) {
    tm.add(mesh(new THREE.CylinderGeometry(0.07, 0.07, 3.2, 8), mat('#9AA4AA', { metal: 0.7 }), 3.1, 2.3, z))
    const rail = mesh(new THREE.CylinderGeometry(0.06, 0.06, 2.6, 8), mat('#9AA4AA', { metal: 0.7 }), 1.9, 3.8, z); rail.rotation.z = Math.PI / 2; tm.add(rail)
  }
  tm.add(mesh(new RoundedBoxGeometry(0.4, 1.4, 2.4, 2, 0.1), mat('#2B2F36', { flat: false }), 3.3, 4.2, 0))
  const belts: THREE.Mesh[] = []
  for (let i = 0; i < 14; i++) { const s = mesh(new THREE.BoxGeometry(0.06, 0.02, 1.9), mat('#3C424A'), 0, 0.89, 0, false); tm.add(s); belts.push(s) }
  // runner leg (knee down + thigh), faces +x
  const hip = new THREE.Group(); hip.position.set(-0.4, 6.35, 0); lab.add(hip)
  const skin = mat('#B97A56', { flat: false })
  hip.add(mesh(new THREE.CylinderGeometry(0.62, 0.48, 2.6, 14), mat('#1F3B73', { flat: false }), 0, -1.3, 0))
  const knee = new THREE.Group(); knee.position.y = -2.6; hip.add(knee)
  knee.add(mesh(new THREE.SphereGeometry(0.48, 12, 10), skin))
  knee.add(mesh(new THREE.CylinderGeometry(0.42, 0.3, 2.6, 14), skin, 0, -1.3, 0))
  const accel = new THREE.Group(); accel.position.set(0.42, -0.55, 0); knee.add(accel)
  accel.add(mesh(new RoundedBoxGeometry(0.22, 0.4, 0.34, 2, 0.05), mat('#3A86FF', { flat: false })))
  accel.add(mesh(new THREE.TorusGeometry(0.44, 0.06, 6, 20), mat('#2B2F36'), -0.42, 0, 0).rotateX(Math.PI / 2))
  const ankle = new THREE.Group(); ankle.position.y = -2.6; knee.add(ankle)
  const shoeHard = new THREE.Group(), shoeSoft = new THREE.Group()
  shoeHard.add(mesh(new RoundedBoxGeometry(1.5, 0.5, 0.7, 2, 0.15), mat('#5E656D', { flat: false }), 0.35, -0.2, 0))
  shoeHard.add(mesh(new THREE.BoxGeometry(1.55, 0.12, 0.72), mat('#2B2F36'), 0.35, -0.5, 0))
  shoeSoft.add(mesh(new RoundedBoxGeometry(1.5, 0.5, 0.7, 2, 0.15), mat('#FB5607', { flat: false }), 0.35, -0.15, 0))
  shoeSoft.add(mesh(new RoundedBoxGeometry(1.6, 0.42, 0.76, 2, 0.15), mat('#FFFFFF', { flat: false }), 0.35, -0.55, 0))
  ankle.add(shoeHard, shoeSoft)
  const lripple = new THREE.Mesh(new THREE.RingGeometry(0.4, 0.65, 40), glowMat('#FF5A36')); lripple.rotation.x = -Math.PI / 2; lripple.position.set(0.2, 0.92, 0); lab.add(lripple)
  const accelGlow = new THREE.Mesh(new THREE.SphereGeometry(0.55, 12, 10), glowMat('#7CC6FF', 0)); accel.add(accelGlow)

  anat.visible = lab.visible = false

  const api = {
    anat, lab, pod, cart, ankle, accel, kneeGlow,
    /** 0..1 position of the shock wave travelling up the tibia during the current stride */
    waveU: 0,
    update(t: number) {
      anat.visible = t > ANAT_T0 - 3 && t < T.result + 0.5
      lab.visible = t > ANAT_T0 && t < T.result + 0.5
      if (!anat.visible) return
      // ---- anatomy ----
      const worn = t > ANAT_WORN
      const ph = t < ANAT_T0 ? 0.5 : ((t - ANAT_T0) % ANAT_PERIOD) / ANAT_PERIOD
      const lift = ph < 0.62 ? 0 : Math.sin(((ph - 0.62) / 0.38) * Math.PI) * 0.9
      leg.position.y = lift
      leg.rotation.z = ph > 0.62 ? -Math.sin(((ph - 0.62) / 0.38) * Math.PI) * 0.06 : 0
      const wt = (t - ANAT_T0) % ANAT_PERIOD
      const u = clamp(wt / 0.45)
      api.waveU = t >= ANAT_T0 ? u : 0
      const on = t >= ANAT_T0 && wt < 0.5
      wave.visible = waveGlow.visible = on
      const amp = worn ? 1.5 : 0.85
      wave.position.set(0.3, 0.9 + u * 5.6, 0); waveGlow.position.copy(wave.position)
      wave.scale.setScalar(amp * (1 + 0.25 * Math.sin(u * Math.PI)))
      waveGlow.scale.setScalar(amp * (0.8 + 0.4 * Math.sin(u * Math.PI)))
      ;(wave.material as THREE.MeshBasicMaterial).color.set(worn ? '#FF5A36' : '#FFC300')
      ;(waveGlow.material as THREE.MeshBasicMaterial).color.set(worn ? '#FF3B1F' : '#FF9F1C')
      ;(wave.material as THREE.MeshBasicMaterial).opacity = 1 - smooth(seg(u, 0.85, 1))
      const rk = clamp(wt / 0.6)
      ripple.visible = t >= ANAT_T0
      ripple.scale.setScalar(1 + rk * (worn ? 5 : 3.5)); (ripple.material as THREE.MeshBasicMaterial).opacity = (1 - rk) * 0.9
      ;(ripple.material as THREE.MeshBasicMaterial).color.set(worn ? '#FF5A36' : '#FFB703')
      const hitKnee = t >= ANAT_T0 ? Math.exp(-Math.pow((wt - 0.45) / 0.09, 2)) : 0
      ;(kneeGlow.material as THREE.MeshBasicMaterial).opacity = hitKnee * (worn ? 0.65 : 0.25)
      const wk = smooth(seg(t, ANAT_WORN - 0.3, ANAT_WORN + 0.5))
      cart.scale.y = 1 - 0.55 * wk; men.scale.setScalar(1 - 0.25 * wk)
      cartMat.color.set(wk > 0.5 ? '#F28B82' : '#5BC0EB'); cartMat.emissive.set(wk > 0.5 ? '#B03A2E' : '#1C7FB0')
      cartMat.emissiveIntensity = 0.3 + hitKnee * 1.2
      ;(pod.userData.led as THREE.Mesh).visible = Math.abs(wt - 0.3) < 0.08 || Math.floor(t * 3) % 2 === 0
      // ---- lab ----
      if (!lab.visible) return
      const hard = t < LAB_SWAP
      shoeHard.visible = hard; shoeSoft.visible = !hard
      const rp = ((t - LAB_T0) % RUN_PERIOD) / RUN_PERIOD
      const w = rp * Math.PI * 2
      hip.rotation.z = 0.5 * Math.sin(w)              // thigh swing (forward = +x)
      knee.rotation.z = -(0.15 + 0.8 * Math.max(0, Math.sin(w - 1.4)))
      ankle.rotation.z = -0.1 - 0.2 * Math.sin(w)
      belts.forEach((b, i) => { b.position.x = 3.4 - (((t * 4 + i * 0.5) % 7)) })
      const strike = t >= LAB_T0 && t < NOVEL_T0 + 6 ? Math.exp(-Math.pow((rp - 0.2) / 0.05, 2)) : 0
      lripple.scale.setScalar(1 + strike * (hard ? 3 : 1.6)); (lripple.material as THREE.MeshBasicMaterial).opacity = strike * 0.9
      ;(accelGlow.material as THREE.MeshBasicMaterial).opacity = strike * (hard ? 0.9 : 0.45)
    },
  }
  return api
}

/** illustrative peak tibial accelerations (g) shown in the explainer */
export const PEAKS = { healthyWalk: 2.0, oaWalk: 3.6, hardShoe: 8.4, cushionShoe: 5.1 }
