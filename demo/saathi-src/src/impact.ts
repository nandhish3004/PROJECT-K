import * as THREE from 'three'
import { groundHeight, WALLS } from './world'
import { T } from './timeline'
import { easeOut, rng, seg, smooth, v3 } from './util'

export const IMPACT_T0 = T.impact

export function buildImpact(scene: THREE.Scene, phc: THREE.Vector3) {
  const root = new THREE.Group(); scene.add(root)
  const r = rng(99)
  const centers: THREE.Vector3[] = [v3(4, 0, -2)]
  for (let i = 0; i < 26; i++) {
    const a = (i / 26) * Math.PI * 2 + r() * 0.15
    const rad = 105 + r() * 170
    const x = Math.cos(a) * rad, z = Math.sin(a) * rad
    centers.push(v3(x, groundHeight(x, z), z))
  }
  // instanced mini-villages
  const houseGeo = new THREE.BoxGeometry(3, 2.4, 3); houseGeo.translate(0, 1.2, 0)
  const roofGeo = new THREE.ConeGeometry(2.4, 1.6, 4); roofGeo.rotateY(Math.PI / 4); roofGeo.translate(0, 3.2, 0)
  const per = 9
  const walls = new THREE.InstancedMesh(houseGeo, new THREE.MeshStandardMaterial({ roughness: 0.8, flatShading: true }), (centers.length - 1) * per)
  const roofs = new THREE.InstancedMesh(roofGeo, new THREE.MeshStandardMaterial({ color: '#B5482A', roughness: 0.8, flatShading: true }), (centers.length - 1) * per)
  let n = 0
  const m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), col = new THREE.Color()
  centers.slice(1).forEach(c => {
    for (let k = 0; k < per; k++) {
      const a = r() * Math.PI * 2, d = 2 + r() * 9
      const x = c.x + Math.cos(a) * d, z = c.z + Math.sin(a) * d
      q.setFromEuler(new THREE.Euler(0, r() * 3, 0))
      const s = 0.8 + r() * 0.5
      m4.compose(v3(x, groundHeight(x, z), z), q, v3(s, s, s))
      walls.setMatrixAt(n, m4); roofs.setMatrixAt(n, m4)
      walls.setColorAt(n, col.set(WALLS[Math.floor(r() * WALLS.length)]))
      n++
    }
  })
  walls.castShadow = roofs.castShadow = false
  root.add(walls, roofs)

  // beacons + referral arcs
  const beaconGeo = new THREE.CylinderGeometry(1.1, 1.1, 1, 14, 1, true); beaconGeo.translate(0, 0.5, 0)
  const ringGeo = new THREE.RingGeometry(2, 3, 32); ringGeo.rotateX(-Math.PI / 2)
  const items = centers.map((c, i) => {
    const bm = new THREE.MeshBasicMaterial({ color: i === 0 ? '#FFB703' : ['#00B4A6', '#E84C8B', '#3A86FF', '#FB8500'][i % 4], transparent: true, opacity: 0, depthWrite: false, side: THREE.DoubleSide })
    const beacon = new THREE.Mesh(beaconGeo, bm); beacon.position.copy(c); root.add(beacon)
    const ring = new THREE.Mesh(ringGeo, new THREE.MeshBasicMaterial({ color: '#99EFE5', transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false }))
    ring.position.copy(c).add(v3(0, 0.6, 0)); root.add(ring)
    const top = phc.clone().add(v3(0, 8, 0))
    const mid = c.clone().lerp(top, 0.5); mid.y += 18 + c.distanceTo(top) * 0.18
    const curve = new THREE.QuadraticBezierCurve3(c.clone().add(v3(0, 3, 0)), mid, top)
    const tg = new THREE.TubeGeometry(curve, 50, 0.45, 6)
    const arc = new THREE.Mesh(tg, new THREE.MeshBasicMaterial({ color: i % 3 === 0 ? '#FFB703' : '#99EFE5', transparent: true, opacity: 0.85, blending: THREE.AdditiveBlending, depthWrite: false }))
    tg.setDrawRange(0, 0); root.add(arc)
    const at = i === 0 ? 0.3 : 0.8 + (i - 1) * 0.2
    return { beacon, ring, arc, count: tg.index!.count, at, isRef: i % 3 === 0 }
  })
  // big PHC beacon
  const phcBeacon = new THREE.Mesh(beaconGeo, new THREE.MeshBasicMaterial({ color: '#FFB703', transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide }))
  phcBeacon.position.copy(phc); phcBeacon.scale.set(3, 60, 3); root.add(phcBeacon)

  root.visible = false
  return {
    update(t: number) {
      const tt = t - IMPACT_T0
      root.visible = t > IMPACT_T0 - 2 && t < T.total + 0.5
      if (!root.visible) return
      const fadeOut = 1 - smooth(seg(t, T.end, T.end + 3))
      for (const it of items) {
        const k = easeOut(seg(tt, it.at, it.at + 0.8))
        it.beacon.scale.set(1, 4 + 46 * k, 1)
        ;(it.beacon.material as THREE.MeshBasicMaterial).opacity = 0.6 * k * fadeOut
        const rk = ((t * 0.7 + it.at) % 1)
        it.ring.scale.setScalar(0.6 + rk * 1.6)
        ;(it.ring.material as THREE.MeshBasicMaterial).opacity = (1 - rk) * 0.8 * k * fadeOut
        const ak = it.isRef ? smooth(seg(tt, it.at + 0.6, it.at + 2.0)) : 0
        it.arc.geometry.setDrawRange(0, Math.floor((it.count / 3) * ak) * 3)
        ;(it.arc.material as THREE.MeshBasicMaterial).opacity = 0.85 * fadeOut
      }
      ;(phcBeacon.material as THREE.MeshBasicMaterial).opacity = 0.5 * smooth(seg(tt, 1.5, 3)) * fadeOut
    },
  }
}
