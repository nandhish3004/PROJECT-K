/* ============================================================================
   32-people.js · cast, crowd, Chennai traffic, and the app-failure banners
   ========================================================================== */

/* ------------------------------------------------------------------ palette */
const SKIN = [0x8D5A3B, 0x7A4B2E, 0x9A6646, 0x6E4429, 0xA5714B, 0x5E3A22];
const CLOTH = [0xFFFFFF, 0xE9E3D6, 0x2F5D50, 0x8E1B1B, 0x1E4E8C, 0xF2C14E, 0x3A86FF, 0xE84C8B, 0x2E3B2E, 0xB91C1C, 0x5B3A6B, 0x0F766E];

/* ==========================================================================
   Articulated person — used for the seven hero characters who actually move.
   Joint pivots are real Object3Ds so a sit / walk / press pose is just a set
   of rotations, and the phone can be parented to the elder's hand bone.
   ========================================================================== */
function person(o = {}) {
  const skinC = o.skin != null ? o.skin : SKIN[0];
  const skin = mat(skinC, { rough: 0.72, metal: 0.02, flat: false });
  const top = mat(o.top != null ? o.top : CLOTH[0], { rough: 0.88, flat: false });
  const bot = mat(o.trousers != null ? o.trousers : 0x2B3440, { rough: 0.9, flat: false });
  const hairM = mat(o.hair != null ? o.hair : 0x15120F, { rough: 0.85, flat: false });
  const S = o.scale || 1;

  const root = new THREE.Group();
  const pelvis = new THREE.Group(); pelvis.position.y = 0.84 * S; root.add(pelvis);

  /* ---------------- torso ---------------- */
  const torso = new THREE.Group(); pelvis.add(torso);
  const chest = mesh(new THREE.BoxGeometry(0.40 * S, 0.52 * S, 0.24 * S), top, 0, 0.28 * S, 0, true);
  torso.add(chest);
  /* shoulders */
  torso.add(mesh(new THREE.BoxGeometry(0.48 * S, 0.13 * S, 0.23 * S), top, 0, 0.50 * S, 0, true));
  /* collar */
  torso.add(mesh(new THREE.CylinderGeometry(0.085 * S, 0.10 * S, 0.07 * S, 10), top, 0, 0.575 * S, 0));

  /* ---------------- neck + head ---------------- */
  const neck = new THREE.Group(); neck.position.y = 0.585 * S; torso.add(neck);
  neck.add(mesh(new THREE.CylinderGeometry(0.052 * S, 0.06 * S, 0.09 * S, 8), skin, 0, 0.04 * S, 0, true));
  const head = new THREE.Group(); head.position.y = 0.09 * S; neck.add(head);
  const skull = mesh(new THREE.SphereGeometry(0.105 * S, 14, 12), skin, 0, 0.115 * S, 0, true);
  skull.scale.set(0.94, 1.12, 1.0);
  head.add(skull);
  /* jaw + cheeks give the face some structure at macro range */
  const jaw = mesh(new THREE.SphereGeometry(0.072 * S, 10, 8), skin, 0, 0.058 * S, 0.014 * S, true);
  jaw.scale.set(0.92, 0.72, 0.95); head.add(jaw);
  /* nose, ears */
  const nose = mesh(new THREE.ConeGeometry(0.019 * S, 0.055 * S, 6), skin, 0, 0.105 * S, -0.10 * S, true);
  nose.rotation.x = -PI / 2; head.add(nose);
  for (const s of [-1, 1]) head.add(mesh(new THREE.SphereGeometry(0.022 * S, 7, 6), skin, s * 0.098 * S, 0.115 * S, 0.005 * S, true));
  /* eyes — dark, small, catch the sodium light */
  const eyeM = new THREE.MeshStandardMaterial({ color: 0x1A1208, roughness: 0.25, metalness: 0.1 });
  for (const s of [-1, 1]) head.add(mesh(new THREE.SphereGeometry(0.0135 * S, 8, 6), eyeM, s * 0.036 * S, 0.135 * S, -0.088 * S));
  /* brows */
  const browM = mat(o.brow != null ? o.brow : (o.hair != null ? o.hair : 0x15120F), { rough: 0.9 });
  for (const s of [-1, 1]) head.add(mesh(new THREE.BoxGeometry(0.042 * S, 0.008 * S, 0.012 * S), browM, s * 0.036 * S, 0.158 * S, -0.093 * S));
  /* hair */
  if (o.bald !== true) {
    const hair = mesh(new THREE.SphereGeometry(0.108 * S, 14, 10, 0, TAU, 0, PI * 0.62), hairM, 0, 0.117 * S, 0.004 * S, true);
    hair.scale.set(0.97, 1.1, 1.02); head.add(hair);
    if (o.bun) head.add(mesh(new THREE.SphereGeometry(0.05 * S, 9, 7), hairM, 0, 0.14 * S, 0.10 * S, true));
    if (o.parting) head.add(mesh(new THREE.BoxGeometry(0.006 * S, 0.02 * S, 0.16 * S), mat(0x0C0A08, { rough: 0.9 }), 0.02 * S, 0.19 * S, 0));
  }
  if (o.moustache) head.add(mesh(new THREE.BoxGeometry(0.062 * S, 0.012 * S, 0.02 * S), mat(o.moustache, { rough: 0.95 }), 0, 0.072 * S, -0.095 * S));
  if (o.glasses) {
    const gm = mat(0x2A2E33, { metal: 0.7, rough: 0.35 });
    const gl = new THREE.MeshPhysicalMaterial({ color: 0xCFE0EA, roughness: 0.03, metalness: 0, transparent: true, opacity: 0.32, clearcoat: 1 });
    for (const s of [-1, 1]) {
      head.add(mesh(new THREE.TorusGeometry(0.031 * S, 0.0035 * S, 5, 14), gm, s * 0.038 * S, 0.136 * S, -0.092 * S, true));
      head.add(mesh(new THREE.CircleGeometry(0.029 * S, 12), gl, s * 0.038 * S, 0.136 * S, -0.093 * S));
      head.add(mesh(new THREE.BoxGeometry(0.05 * S, 0.003 * S, 0.003 * S), gm, s * 0.075 * S, 0.14 * S, -0.03 * S));
    }
    head.add(mesh(new THREE.BoxGeometry(0.018 * S, 0.003 * S, 0.003 * S), gm, 0, 0.14 * S, -0.098 * S));
  }
  if (o.cap) {
    const cm = mat(o.cap, { rough: 0.85 });
    head.add(mesh(new THREE.SphereGeometry(0.112 * S, 12, 8, 0, TAU, 0, PI * 0.55), cm, 0, 0.125 * S, 0, true));
    head.add(mesh(new THREE.CylinderGeometry(0.075 * S, 0.085 * S, 0.012 * S, 10), cm, 0, 0.128 * S, -0.10 * S, true));
  }

  /* ---------------- arms ---------------- */
  const arms = {};
  for (const s of [-1, 1]) {
    const shoulder = new THREE.Group();
    shoulder.position.set(s * 0.215 * S, 0.475 * S, 0);
    torso.add(shoulder);
    const upper = mesh(new THREE.CylinderGeometry(0.048 * S, 0.042 * S, 0.30 * S, 8), o.sleeves === 'short' ? skin : top, 0, -0.15 * S, 0, true);
    shoulder.add(upper);
    if (o.sleeves === 'short') shoulder.add(mesh(new THREE.CylinderGeometry(0.056 * S, 0.052 * S, 0.15 * S, 8), top, 0, -0.075 * S, 0, true));
    const elbow = new THREE.Group(); elbow.position.y = -0.30 * S; shoulder.add(elbow);
    elbow.add(mesh(new THREE.CylinderGeometry(0.040 * S, 0.034 * S, 0.27 * S, 8), skin, 0, -0.135 * S, 0, true));
    const hand = new THREE.Group(); hand.position.y = -0.275 * S; elbow.add(hand);
    const palm = mesh(new THREE.BoxGeometry(0.055 * S, 0.085 * S, 0.032 * S), skin, 0, -0.042 * S, 0, true);
    hand.add(palm);
    /* thumb — the digit that presses the keypad */
    const thumb = new THREE.Group(); thumb.position.set(-s * 0.026 * S, -0.03 * S, -0.012 * S); hand.add(thumb);
    thumb.add(mesh(new THREE.CapsuleGeometry ? new THREE.CapsuleGeometry(0.011 * S, 0.038 * S, 3, 6) : new THREE.CylinderGeometry(0.011 * S, 0.011 * S, 0.05 * S, 6), skin, 0, -0.02 * S, 0, true));
    arms[s > 0 ? 'R' : 'L'] = { shoulder, elbow, hand, thumb, upper };
  }

  /* ---------------- legs / dhoti / saree ---------------- */
  const legs = {};
  for (const s of [-1, 1]) {
    const hip = new THREE.Group(); hip.position.set(s * 0.095 * S, 0, 0); pelvis.add(hip);
    const thigh = mesh(new THREE.CylinderGeometry(0.062 * S, 0.052 * S, 0.43 * S, 8), bot, 0, -0.215 * S, 0, true);
    hip.add(thigh);
    const knee = new THREE.Group(); knee.position.y = -0.43 * S; hip.add(knee);
    knee.add(mesh(new THREE.CylinderGeometry(0.050 * S, 0.040 * S, 0.41 * S, 8), bot, 0, -0.205 * S, 0, true));
    const foot = new THREE.Group(); foot.position.y = -0.41 * S; knee.add(foot);
    foot.add(mesh(new THREE.BoxGeometry(0.085 * S, 0.055 * S, 0.20 * S), o.barefoot ? skin : mat(o.shoe != null ? o.shoe : 0x23262A, { rough: 0.8 }), 0, -0.028 * S, -0.045 * S, true));
    legs[s > 0 ? 'R' : 'L'] = { hip, knee, foot, thigh };
  }
  if (o.dhoti) {
    /* veshti: a wrapped cone from waist to ankle, white with a coloured border */
    const d = mesh(new THREE.CylinderGeometry(0.20 * S, 0.145 * S, 0.84 * S, 14, 1, true), new THREE.MeshStandardMaterial({ color: o.dhoti, roughness: 0.92, side: THREE.DoubleSide }), 0, -0.42 * S, 0, true);
    pelvis.add(d);
    pelvis.add(mesh(new THREE.CylinderGeometry(0.148 * S, 0.145 * S, 0.035 * S, 14, 1, true), mat(o.dhotiBorder != null ? o.dhotiBorder : 0xB91C1C, { rough: 0.9, side: THREE.DoubleSide }), 0, -0.82 * S, 0, true));
    /* the tucked fold at the front */
    pelvis.add(mesh(new THREE.BoxGeometry(0.05 * S, 0.5 * S, 0.02 * S), new THREE.MeshStandardMaterial({ color: o.dhoti, roughness: 0.92 }), 0.03 * S, -0.5 * S, -0.16 * S));
    legs.L.thigh.visible = legs.R.thigh.visible = false;
  }
  if (o.saree || o.kurta) {
    const skirtH = o.kurta ? 0.62 * S : 0.84 * S;
    pelvis.add(mesh(new THREE.CylinderGeometry(0.19 * S, 0.155 * S, skirtH, 14, 1, true),
      new THREE.MeshStandardMaterial({ color: o.saree || o.kurta, roughness: 0.85, side: THREE.DoubleSide }), 0, -skirtH / 2, 0, true));
    if (o.border) pelvis.add(mesh(new THREE.CylinderGeometry(0.158 * S, 0.155 * S, 0.05 * S, 14, 1, true), mat(o.border, { rough: 0.7, side: THREE.DoubleSide }), 0, -skirtH + 0.02 * S, 0, true));
  }
  if (o.dupatta) {
    const dp = mesh(new THREE.PlaneGeometry(0.16 * S, 0.86 * S), new THREE.MeshStandardMaterial({ color: o.dupatta, roughness: 0.88, side: THREE.DoubleSide }), -0.13 * S, 0.18 * S, 0.10 * S, true);
    dp.rotation.set(0.18, 0.2, 0.14);
    torso.add(dp);
  }
  if (o.bag) {
    const b = mesh(new THREE.BoxGeometry(0.20 * S, 0.24 * S, 0.09 * S), mat(o.bag, { rough: 0.9 }), 0.24 * S, -0.02 * S, 0.02 * S, true);
    torso.add(b);
    const strap = mesh(new THREE.TorusGeometry(0.19 * S, 0.012 * S, 5, 16, PI), mat(o.bagStrap || 0x2A2E33, { rough: 0.9 }), 0.02 * S, 0.34 * S, 0.02 * S, true);
    strap.rotation.set(0, PI / 2, 0.5); torso.add(strap);
  }

  const rig = {
    root, pelvis, torso, neck, head, arms, legs, S, opts: o,
    chest, jaw, skull,
  };
  resetPose(rig);
  return rig;
}

function resetPose(r) {
  r.pelvis.rotation.set(0, 0, 0);
  r.torso.rotation.set(0, 0, 0);
  r.neck.rotation.set(0, 0, 0);
  r.head.rotation.set(0, 0, 0);
  for (const k of ['L', 'R']) {
    r.arms[k].shoulder.rotation.set(0, 0, k === 'L' ? 0.06 : -0.06);
    r.arms[k].elbow.rotation.set(-0.12, 0, 0);
    r.arms[k].hand.rotation.set(0, 0, 0);
    r.arms[k].thumb.rotation.set(0, 0, 0);
    r.legs[k].hip.rotation.set(0, 0, 0);
    r.legs[k].knee.rotation.set(0, 0, 0);
    r.legs[k].foot.rotation.set(0, 0, 0);
  }
}

/* ---- poses ---- */
function poseStand(r, t, sway = 1) {
  resetPose(r);
  r.pelvis.position.y = 0.84 * r.S + Math.sin(t * 1.1) * 0.006 * sway;
  r.torso.rotation.z = Math.sin(t * 0.7) * 0.016 * sway;
  r.torso.rotation.x = Math.sin(t * 0.5 + 1) * 0.012 * sway;
  r.neck.rotation.y = Math.sin(t * 0.31) * 0.12 * sway;
  r.arms.L.shoulder.rotation.x = 0.05 + Math.sin(t * 0.6) * 0.03;
  r.arms.R.shoulder.rotation.x = 0.05 + Math.sin(t * 0.6 + 2) * 0.03;
  r.arms.L.shoulder.rotation.z = 0.11; r.arms.R.shoulder.rotation.z = -0.11;
}
/** Standing and looking down at a lit smartphone — the Act 1 contrast. */
function posePhone(r, t, lit = 1) {
  poseStand(r, t, 0.4);
  r.neck.rotation.x = 0.52; r.head.rotation.x = 0.24;
  r.torso.rotation.x = 0.10;
  for (const k of ['L', 'R']) {
    r.arms[k].shoulder.rotation.x = 0.92;
    r.arms[k].shoulder.rotation.z = k === 'L' ? 0.30 : -0.30;
    r.arms[k].elbow.rotation.x = -1.62;
    r.arms[k].hand.rotation.x = -0.28;
  }
  /* thumbs flick the touchscreen */
  r.arms.R.thumb.rotation.x = -0.5 + Math.abs(Math.sin(t * 5.3)) * 0.55 * lit;
  r.arms.L.thumb.rotation.x = -0.35 + Math.abs(Math.sin(t * 3.1 + 1)) * 0.3 * lit;
}
function poseSit(r, t, o = {}) {
  resetPose(r);
  const S = r.S;
  r.root.rotation.set(0, 0, 0);
  r.pelvis.position.y = 0.06 * S;
  r.pelvis.rotation.x = -0.10;
  r.torso.rotation.x = o.lean != null ? o.lean : 0.10;
  r.torso.rotation.z = Math.sin(t * 0.5) * 0.012;
  r.neck.rotation.x = o.headDown != null ? o.headDown : 0.42;
  r.head.rotation.x = 0.16;
  r.neck.rotation.y = o.headYaw || 0;
  for (const k of ['L', 'R']) {
    r.legs[k].hip.rotation.x = -1.42 + (k === 'L' ? 0.06 : -0.06);
    r.legs[k].knee.rotation.x = 1.46;
    r.legs[k].foot.rotation.x = -0.06;
  }
  if (o.holdPhone) {
    /* both hands cupped in front of the chest, keypad up toward the face */
    for (const k of ['L', 'R']) {
      r.arms[k].shoulder.rotation.x = 0.86;
      r.arms[k].shoulder.rotation.z = k === 'L' ? 0.34 : -0.30;
      r.arms[k].elbow.rotation.x = -1.78;
      r.arms[k].elbow.rotation.y = k === 'L' ? 0.20 : -0.20;
      r.arms[k].hand.rotation.x = -0.42;
    }
    r.arms.R.thumb.rotation.x = -(o.thumbPress || 0) * 0.95;
    r.arms.R.thumb.rotation.z = (o.thumbPress || 0) * 0.2;
  } else {
    r.arms.L.shoulder.rotation.x = 0.30; r.arms.L.shoulder.rotation.z = 0.20; r.arms.L.elbow.rotation.x = -0.55;
    r.arms.R.shoulder.rotation.x = 0.34; r.arms.R.shoulder.rotation.z = -0.22; r.arms.R.elbow.rotation.x = -0.6;
  }
  /* breathe */
  r.chest.scale.set(1 + Math.sin(t * 1.25) * 0.012, 1, 1 + Math.sin(t * 1.25) * 0.018);
}
function poseWalk(r, t, sp = 1) {
  resetPose(r);
  const p = t * sp * 5.4;
  r.pelvis.position.y = 0.84 * r.S + Math.abs(Math.sin(p)) * 0.022 * r.S;
  r.pelvis.rotation.y = Math.sin(p) * 0.10;
  r.torso.rotation.y = -Math.sin(p) * 0.16;
  r.torso.rotation.x = 0.07;
  r.arms.L.shoulder.rotation.x = Math.sin(p) * 0.62;
  r.arms.R.shoulder.rotation.x = -Math.sin(p) * 0.62;
  r.arms.L.elbow.rotation.x = -0.42 - Math.max(0, Math.sin(p)) * 0.5;
  r.arms.R.elbow.rotation.x = -0.42 - Math.max(0, -Math.sin(p)) * 0.5;
  r.legs.L.hip.rotation.x = -Math.sin(p) * 0.62;
  r.legs.R.hip.rotation.x = Math.sin(p) * 0.62;
  r.legs.L.knee.rotation.x = Math.max(0, Math.sin(p - 0.7)) * 1.05;
  r.legs.R.knee.rotation.x = Math.max(0, -Math.sin(p - 0.7)) * 1.05;
  r.legs.L.foot.rotation.x = -0.1 + Math.max(0, Math.sin(p)) * 0.3;
  r.legs.R.foot.rotation.x = -0.1 + Math.max(0, -Math.sin(p)) * 0.3;
}
/** Stepping up into the bus: front foot raised onto the step well. */
function poseStepUp(r, k) {
  resetPose(r);
  const e = EASE.inOutCubic(clamp01(k));
  r.pelvis.position.y = 0.84 * r.S + e * 0.30 * r.S;
  r.torso.rotation.x = 0.22 * e;
  r.legs.R.hip.rotation.x = -1.05 * e;
  r.legs.R.knee.rotation.x = 1.15 * e;
  r.legs.R.foot.rotation.x = -0.28 * e;
  r.legs.L.hip.rotation.x = -0.16 * e;
  r.legs.L.knee.rotation.x = 0.22 * e;
  r.arms.L.shoulder.rotation.x = 1.05 * e;      /* reaching for the grab rail */
  r.arms.L.elbow.rotation.x = -1.25 * e;
  r.arms.R.shoulder.rotation.x = 0.30 * e;
  r.arms.R.shoulder.rotation.z = -0.34;
  r.neck.rotation.x = 0.30 * e;
}

/* ==========================================================================
   Crowd — merged into a single mesh per cluster so a busy pavement or a full
   metro platform costs one draw call.
   ========================================================================== */
function crowdFigure(gb, o) {
  const skin = o.skin, cloth = o.cloth, lower = o.lower;
  const S = o.scale || 1;
  /* legs / dhoti */
  if (o.dhoti) {
    gb.add(new THREE.CylinderGeometry(0.20 * S, 0.15 * S, 0.84 * S, 10, 1, true), { pos: [0, 0.42 * S, 0], color: cloth });
  } else if (o.saree) {
    gb.add(new THREE.CylinderGeometry(0.19 * S, 0.15 * S, 0.84 * S, 10, 1, true), { pos: [0, 0.42 * S, 0], color: cloth });
  } else {
    for (const s of [-1, 1]) gb.box(0.13 * S, 0.82 * S, 0.15 * S, { pos: [s * 0.085 * S, 0.41 * S, 0], color: lower });
  }
  /* torso */
  gb.box(0.40 * S, 0.56 * S, 0.24 * S, { pos: [0, 1.12 * S, 0], color: cloth });
  gb.box(0.47 * S, 0.12 * S, 0.23 * S, { pos: [0, 1.36 * S, 0], color: cloth });
  /* arms */
  for (const s of [-1, 1]) {
    const ax = s * 0.245 * S;
    if (o.armPose === 'phone') {
      gb.box(0.105 * S, 0.30 * S, 0.115 * S, { pos: [ax, 1.18 * S, 0.02 * S], rot: [0.95, 0, s * 0.26], color: cloth });
      gb.box(0.085 * S, 0.26 * S, 0.095 * S, { pos: [ax * 0.62, 1.10 * S, -0.20 * S], rot: [-0.5, 0, s * -0.3], color: skin });
      gb.box(0.055 * S, 0.09 * S, 0.02 * S, { pos: [0, 1.02 * S, -0.30 * S], rot: [-0.3, 0, 0], color: 0x14161A });
    } else if (o.armPose === 'umbrella') {
      gb.box(0.105 * S, 0.50 * S, 0.115 * S, { pos: [ax, 1.14 * S, 0], color: cloth });
      gb.box(0.105 * S, 0.44 * S, 0.115 * S, { pos: [s * 0.16 * S, 1.42 * S, 0], rot: [0, 0, s * 0.5], color: cloth });
    } else {
      gb.box(0.105 * S, 0.52 * S, 0.115 * S, { pos: [ax, 1.10 * S, 0], color: cloth });
    }
  }
  /* head */
  gb.sph(0.105 * S, { pos: [0, 1.58 * S, 0], color: skin, seg: 10, seg2: 8, scale: [0.95, 1.1, 1] });
  if (!o.bald) gb.sph(0.108 * S, { pos: [0, 1.60 * S, 0.005 * S], color: o.hair || 0x15120F, seg: 10, seg2: 6 });
  /* umbrella */
  if (o.armPose === 'umbrella' && o.umbrella) {
    const uc = o.umbrella;
    gb.add(new THREE.SphereGeometry(0.52 * S, 12, 6, 0, TAU, 0, PI * 0.42), { pos: [o.umbX || 0.2 * S, 2.02 * S, 0], color: uc, scale: [1, 0.62, 1] });
    gb.cyl(0.014 * S, 0.014 * S, 0.72 * S, 5, { pos: [o.umbX || 0.2 * S, 1.68 * S, 0], color: 0x2A2E33 });
  }
  if (o.bag) gb.box(0.19 * S, 0.24 * S, 0.09 * S, { pos: [0.26 * S, 1.06 * S, 0.02 * S], color: o.bag });
}

/** Build a crowd cluster as ONE merged mesh (+ one for the lit phone screens). */
function crowdCluster(specs) {
  const screens = [];
  for (const s of specs) if (s.armPose === 'phone') {
    screens.push({ x: s.pos[0], y: s.pos[1] + 1.02 * (s.scale || 1), z: s.pos[2] - 0.31 * (s.scale || 1), ry: s.ry || 0, s: (s.scale || 1) });
  }
  /* every figure is baked straight into world space, so the whole crowd is
     one draw call (plus one for the floating phone screens). */
  const gb2 = new GB();
  for (const s of specs) {
    const local = new GB();
    crowdFigure(local, s);
    for (const [bucket, b] of local.g) {
      const t = gb2._bucket(bucket);
      const m = new THREE.Matrix4().compose(
        new THREE.Vector3(s.pos[0], s.pos[1], s.pos[2]),
        new THREE.Quaternion().setFromEuler(new THREE.Euler(0, s.ry || 0, 0)),
        new THREE.Vector3(1, 1, 1));
      const nm = new THREE.Matrix3().getNormalMatrix(m);
      const v = new THREE.Vector3(), n3 = new THREE.Vector3();
      for (let i = 0; i < b.p.length; i += 3) {
        v.set(b.p[i], b.p[i + 1], b.p[i + 2]).applyMatrix4(m);
        t.p.push(v.x, v.y, v.z);
        n3.set(b.n[i], b.n[i + 1], b.n[i + 2]).applyMatrix3(nm).normalize();
        t.n.push(n3.x, n3.y, n3.z);
        t.u.push(b.u[(i / 3) * 2], b.u[(i / 3) * 2 + 1]);
        t.c.push(b.c[i], b.c[i + 1], b.c[i + 2]);
      }
    }
  }
  railMats();
  const g = new THREE.Group();
  const m = gb2.build({ a: RM.conc }, { cast: true, recv: true });
  g.add(m);
  /* the little rectangles of phone light floating in the crowd */
  if (screens.length) {
    const sg = new THREE.PlaneGeometry(0.048, 0.082);
    const sm = new THREE.MeshBasicMaterial({ color: 0xBFD8FF, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending, depthWrite: false, fog: false });
    const inst = new THREE.InstancedMesh(sg, sm, screens.length);
    const d = new THREE.Object3D();
    screens.forEach((sc, i) => {
      d.position.set(sc.x, sc.y, sc.z); d.rotation.set(-0.42, sc.ry, 0); d.scale.setScalar(sc.s);
      d.updateMatrix(); inst.setMatrixAt(i, d.matrix);
      const gl = glowSprite(0x9FC4FF, 0.9, 0.5); gl.position.set(sc.x, sc.y, sc.z); g.add(gl);
    });
    inst.instanceMatrix.needsUpdate = true;
    g.add(inst);
    g.userData.screens = inst;
  }
  return g;
}

/** Convenience: a scattered pavement crowd. */
function pavementCrowd(n, area, seed = 1) {
  const r = rng(seed);
  const specs = [];
  for (let i = 0; i < n; i++) {
    const dhoti = r() < 0.34, saree = !dhoti && r() < 0.30;
    const phone = r() < 0.42, umb = !phone && r() < 0.30;
    specs.push({
      pos: [(r() - 0.5) * area.x, 0, (r() - 0.5) * area.z + (area.z0 || 0)],
      ry: r() * TAU,
      scale: 0.94 + r() * 0.12,
      skin: SKIN[(r() * SKIN.length) | 0],
      cloth: dhoti ? 0xF2EEE3 : CLOTH[(r() * CLOTH.length) | 0],
      lower: 0x2B3440,
      dhoti, saree,
      hair: r() < 0.12 ? 0xB9B9B9 : 0x15120F,
      bald: r() < 0.1,
      armPose: phone ? 'phone' : (umb ? 'umbrella' : null),
      umbrella: [0x1E4E8C, 0x8E1B1B, 0x0F766E, 0x22262A, 0xE8B21A][(r() * 5) | 0],
      umbX: (r() > 0.5 ? 1 : -1) * 0.2,
      bag: r() < 0.25 ? 0x3A2A1A : null,
    });
  }
  return crowdCluster(specs);
}

/* ==========================================================================
   Chennai traffic
   ========================================================================== */
/** The Chennai auto-rickshaw: black lower body, yellow roof and front. */
function buildAuto({ share = false, route = 'PORUR' } = {}) {
  const g = new THREE.Group();
  const gb = new GB();
  const black = 0x14171A, yellow = 0xE8B21A;
  /* cabin */
  gb.box(1.42, 0.72, 2.05, { pos: [0, 1.06, 0.1], color: black });
  gb.box(1.46, 0.30, 2.10, { pos: [0, 1.56, 0.1], color: yellow });
  /* rounded roof */
  gb.add(new THREE.CylinderGeometry(0.74, 0.74, 2.06, 12, 1, false, 0, PI), { pos: [0, 1.70, 0.1], rot: [PI / 2, 0, 0], color: yellow });
  /* front mudguard + nose */
  gb.box(0.56, 0.44, 0.5, { pos: [0, 0.86, -1.16], color: yellow });
  gb.box(0.34, 0.26, 0.3, { pos: [0, 0.62, -1.32], color: black });
  /* windscreen frame */
  gb.box(1.34, 0.06, 0.06, { pos: [0, 1.62, -0.92], color: black });
  for (const s of [-1, 1]) gb.box(0.06, 0.62, 0.06, { pos: [s * 0.66, 1.30, -0.92], color: black });
  /* wheels */
  for (const w of [[0, -1.24], [-0.72, 0.86], [0.72, 0.86]]) {
    gb.add(new THREE.CylinderGeometry(0.26, 0.26, 0.13, 12), { pos: [w[0], 0.26, w[1]], rot: [0, 0, PI / 2], color: 0x0D0F11 });
    gb.add(new THREE.CylinderGeometry(0.13, 0.13, 0.14, 8), { pos: [w[0], 0.26, w[1]], rot: [0, 0, PI / 2], color: 0x9AA0A6 });
  }
  /* driver + a couple of passengers */
  gb.sph(0.10, { pos: [0.32, 1.62, -0.30], color: SKIN[1], seg: 8, seg2: 6 });
  gb.box(0.34, 0.46, 0.24, { pos: [0.32, 1.30, -0.30], color: 0xE9E3D6 });
  gb.sph(0.10, { pos: [-0.30, 1.58, 0.44], color: SKIN[3], seg: 8, seg2: 6 });
  gb.box(0.34, 0.44, 0.24, { pos: [-0.30, 1.26, 0.44], color: 0x8E1B1B });
  railMats();
  g.add(gb.build({ a: RM.dark }, { cast: true }));
  /* glass */
  g.add(mesh(new THREE.PlaneGeometry(1.3, 0.58), RM.glass, 0, 1.30, -0.93).rotateX(-0.14));
  for (const s of [-1, 1]) g.add(mesh(new THREE.PlaneGeometry(1.5, 0.5), RM.glass, s * 0.72, 1.30, 0.2).rotateY(s * PI / 2));
  /* lights */
  for (const sx of [-0.42, 0.42]) {
    g.add(mesh(new THREE.SphereGeometry(0.075, 8, 6), new THREE.MeshStandardMaterial({ color: 0xFFF6E0, emissive: 0xFFF0CC, emissiveIntensity: 4.2 }), sx, 0.98, -1.40));
    const gl = glowSprite(0xFFF0CC, 1.5, 0.85); gl.position.set(sx, 0.98, -1.5); g.add(gl);
  }
  g.add(mesh(new THREE.BoxGeometry(0.9, 0.1, 0.06), new THREE.MeshStandardMaterial({ color: 0x8A1010, emissive: 0xFF1A1A, emissiveIntensity: 2.4 }), 0, 1.14, 1.14));
  /* mirrors */
  for (const s of [-1, 1]) g.add(mesh(new THREE.BoxGeometry(0.16, 0.09, 0.03), mat(0x22262A, { metal: 0.5, rough: 0.4 }), s * 0.82, 1.42, -0.7));
  /* meter + share-auto route board */
  g.add(mesh(new THREE.BoxGeometry(0.16, 0.12, 0.1), mat(0x2A2E33, { metal: 0.4, rough: 0.5 }), -0.42, 1.36, -0.82));
  if (share) {
    const t = (() => {
      const { c, x } = makeCanvas(256, 96);
      x.fillStyle = '#F2E7CE'; x.fillRect(0, 0, 256, 96);
      x.strokeStyle = '#14181C'; x.lineWidth = 6; x.strokeRect(3, 3, 250, 90);
      x.fillStyle = '#14181C'; x.textAlign = 'center'; x.textBaseline = 'middle';
      x.font = `800 46px ${FONT_COND}`; x.fillText(route, 128, 34);
      x.font = `700 26px ${FONT_TAMIL}`; x.fillText('ஷேர் ஆட்டோ', 128, 72);
      return canvasTexture(c);
    })();
    g.add(mesh(new THREE.PlaneGeometry(0.9, 0.34), new THREE.MeshStandardMaterial({ map: t, roughness: 0.7 }), 0, 1.98, 0.1).rotateX(-0.2));
  }
  g.userData = { kind: 'auto' };
  return g;
}

function buildCar(kind = 0) {
  const g = new THREE.Group();
  const gb = new GB();
  const palette = [[0xE8EAEC, 0x1A1E22], [0x9AA2AA, 0x14181C], [0x2B3440, 0x0E1216], [0x8E1B1B, 0x1A1010], [0xF2E7CE, 0x2A2620], [0x1E4E8C, 0x0E1A28]][kind % 6];
  const body = palette[0];
  const hatch = kind % 3 === 0, suv = kind % 5 === 4;
  const L = suv ? 4.5 : hatch ? 3.7 : 4.2, Wd = suv ? 1.86 : 1.72, Hb = suv ? 0.86 : 0.72;
  gb.box(Wd, Hb, L, { pos: [0, 0.62, 0], color: body });
  /* greenhouse */
  const ghL = L * (hatch ? 0.56 : 0.52), ghH = suv ? 0.62 : 0.54;
  gb.box(Wd - 0.12, ghH, ghL, { pos: [0, 0.62 + Hb / 2 + ghH / 2 - 0.06, suv ? -0.1 : -0.16], color: body });
  /* bumpers + sills */
  gb.box(Wd + 0.06, 0.22, 0.24, { pos: [0, 0.42, -L / 2], color: palette[1] });
  gb.box(Wd + 0.06, 0.22, 0.24, { pos: [0, 0.42, L / 2], color: palette[1] });
  gb.box(Wd + 0.04, 0.16, L - 0.6, { pos: [0, 0.34, 0], color: palette[1] });
  /* wheels */
  for (const wx of [-1, 1]) for (const wz of [-1, 1]) {
    gb.add(new THREE.CylinderGeometry(0.32, 0.32, 0.2, 14), { pos: [wx * (Wd / 2 - 0.02), 0.32, wz * (L / 2 - 0.85)], rot: [0, 0, PI / 2], color: 0x0D0F11 });
    gb.add(new THREE.CylinderGeometry(0.18, 0.18, 0.21, 10), { pos: [wx * (Wd / 2 - 0.02), 0.32, wz * (L / 2 - 0.85)], rot: [0, 0, PI / 2], color: 0xA8AEB4 });
  }
  /* occupants */
  gb.sph(0.10, { pos: [-0.36, 1.28, -0.3], color: SKIN[2], seg: 8, seg2: 6 });
  if (kind % 2 === 0) gb.sph(0.10, { pos: [0.36, 1.28, -0.3], color: SKIN[4], seg: 8, seg2: 6 });
  railMats();
  g.add(gb.build({ a: RM.steel }, { cast: true }));
  /* glass */
  const glassM = RM.glass;
  g.add(mesh(new THREE.PlaneGeometry(Wd - 0.2, ghH * 0.86), glassM, 0, 0.62 + Hb / 2 + ghH * 0.42, -ghL / 2 - 0.16 + (suv ? 0.1 : 0)).rotateX(-0.34));
  g.add(mesh(new THREE.PlaneGeometry(Wd - 0.2, ghH * 0.8), glassM, 0, 0.62 + Hb / 2 + ghH * 0.42, ghL / 2 - 0.16).rotateX(0.30).rotateY(PI));
  for (const s of [-1, 1]) g.add(mesh(new THREE.PlaneGeometry(ghL - 0.2, ghH * 0.8), glassM, s * (Wd / 2 + 0.005), 0.62 + Hb / 2 + ghH * 0.42, -0.16).rotateY(s * PI / 2));
  /* lights */
  for (const sx of [-1, 1]) {
    const hl = mesh(new THREE.BoxGeometry(0.34, 0.13, 0.06), new THREE.MeshStandardMaterial({ color: 0xFFF8E6, emissive: 0xFFF0CC, emissiveIntensity: 4.4 }), sx * (Wd / 2 - 0.28), 0.72, -L / 2 - 0.02);
    g.add(hl);
    const gl = glowSprite(0xFFF0CC, 2.4, 0.9); gl.position.set(sx * (Wd / 2 - 0.28), 0.72, -L / 2 - 0.3); g.add(gl);
    g.add(mesh(new THREE.BoxGeometry(0.3, 0.12, 0.06), new THREE.MeshStandardMaterial({ color: 0x8A1010, emissive: 0xFF1A1A, emissiveIntensity: 2.8 }), sx * (Wd / 2 - 0.26), 0.74, L / 2 + 0.02));
    const tl = glowSprite(0xFF2020, 1.8, 0.75); tl.position.set(sx * (Wd / 2 - 0.26), 0.74, L / 2 + 0.2); g.add(tl);
  }
  g.userData = { L, Wd, kind: 'car' };
  return g;
}

function buildMotorbike({ rider = true } = {}) {
  const g = new THREE.Group();
  const gb = new GB();
  const paint = [0x8E1B1B, 0x1E3A5C, 0x2E3B2E, 0x22262A, 0xF2E7CE][(hash1(g.id || 3) * 5) | 0];
  gb.box(0.34, 0.24, 1.05, { pos: [0, 0.62, 0], color: paint });
  gb.box(0.28, 0.1, 0.34, { pos: [0, 0.78, 0.06], color: 0x14171A });
  gb.add(new THREE.TorusGeometry(0.30, 0.075, 6, 16), { pos: [0, 0.30, -0.62], rot: [0, PI / 2, 0], color: 0x0D0F11 });
  gb.add(new THREE.TorusGeometry(0.30, 0.075, 6, 16), { pos: [0, 0.30, 0.66], rot: [0, PI / 2, 0], color: 0x0D0F11 });
  gb.cyl(0.03, 0.03, 0.62, 6, { pos: [0, 0.98, -0.5], rot: [0.28, 0, 0], color: 0x2A2E33 });
  gb.box(0.06, 0.06, 0.52, { pos: [0, 1.24, -0.56], rot: [-0.1, 0, 0], color: 0x2A2E33 });
  gb.sph(0.12, { pos: [0, 1.14, -0.48], color: paint, seg: 9, seg2: 7 });
  if (rider) {
    gb.box(0.36, 0.52, 0.26, { pos: [0, 1.14, 0.06], color: CLOTH[(hash1(9) * CLOTH.length) | 0] });
    gb.sph(0.115, { pos: [0, 1.56, 0.02], color: 0x1A1E22, seg: 9, seg2: 7 });   // helmet
    gb.box(0.10, 0.44, 0.11, { pos: [-0.22, 1.20, -0.14], rot: [0.6, 0, 0.2], color: CLOTH[2] });
    gb.box(0.10, 0.44, 0.11, { pos: [0.22, 1.20, -0.14], rot: [0.6, 0, -0.2], color: CLOTH[2] });
    gb.box(0.13, 0.46, 0.14, { pos: [-0.14, 0.86, 0.16], rot: [-0.5, 0, 0], color: 0x2B3440 });
    gb.box(0.13, 0.46, 0.14, { pos: [0.14, 0.86, 0.16], rot: [-0.5, 0, 0], color: 0x2B3440 });
  }
  railMats();
  g.add(gb.build({ a: RM.steel }, { cast: true }));
  g.add(mesh(new THREE.SphereGeometry(0.055, 8, 6), new THREE.MeshStandardMaterial({ color: 0xFFF8E6, emissive: 0xFFF0CC, emissiveIntensity: 4.6 }), 0, 1.14, -0.62));
  const gl = glowSprite(0xFFF0CC, 1.9, 0.9); gl.position.set(0, 1.14, -0.8); g.add(gl);
  const tl = glowSprite(0xFF2020, 1.2, 0.8); tl.position.set(0, 0.8, 0.82); g.add(tl);
  g.add(mesh(new THREE.BoxGeometry(0.1, 0.06, 0.04), new THREE.MeshStandardMaterial({ color: 0x8A1010, emissive: 0xFF1A1A, emissiveIntensity: 3 }), 0, 0.8, 0.78));
  g.userData = { kind: 'bike' };
  return g;
}

/**
 * The traffic system. Vehicle positions are pure functions of the master clock
 * so nothing ever needs to be spawned, culled or recycled imperatively: each
 * vehicle wraps around a fixed stretch of the two carriageways.
 */
function buildTraffic(scene) {
  const g = new THREE.Group();
  const r = rng(31337);
  const RANGE = 520;
  const vehicles = [];
  const lanes = [
    { z: 8.6, dir: 1, speed: [7, 12] },
    { z: 5.2, dir: 1, speed: [9, 15] },
    { z: 2.4, dir: 1, speed: [11, 18] },
    { z: -2.6, dir: -1, speed: [9, 15] },
    { z: -5.6, dir: -1, speed: [8, 13] },
    { z: -8.8, dir: -1, speed: [7, 12] },
  ];
  const kinds = ['auto', 'auto', 'car', 'car', 'bike', 'bike', 'car', 'auto', 'bike'];
  for (let i = 0; i < 46; i++) {
    const lane = lanes[i % lanes.length];
    const kind = kinds[(r() * kinds.length) | 0];
    let v;
    if (kind === 'auto') v = buildAuto({ share: r() < 0.35, route: ['PORUR', 'KOYAMBEDU', 'VADAPALANI', 'ALAPAKKAM'][(r() * 4) | 0] });
    else if (kind === 'car') v = buildCar((r() * 6) | 0);
    else v = buildMotorbike();
    const scale = kind === 'auto' ? 1 : kind === 'car' ? 1 : 1;
    v.scale.setScalar(scale);
    /* wet-road light streak: a stretched additive quad trailing the vehicle */
    const streakCol = lane.dir > 0 ? 0xFFF0CC : 0xFF2020;
    const streak = new THREE.Mesh(
      new THREE.PlaneGeometry(1.5, kind === 'car' ? 9 : 6).rotateX(-PI / 2),
      new THREE.MeshBasicMaterial({ map: TEX.radialSoft, color: streakCol, transparent: true, opacity: 0.30, blending: THREE.AdditiveBlending, depthWrite: false, fog: true })
    );
    streak.position.set(0, L.roadY + 0.014, lane.dir > 0 ? -4.5 : 4.5);
    streak.userData.noReflect = true;
    const holder = new THREE.Group();
    holder.add(v); holder.add(streak);
    g.add(holder);
    vehicles.push({
      obj: holder, lane, kind,
      x0: (r() - 0.5) * RANGE,
      speed: lerp(lane.speed[0], lane.speed[1], r()),
      wobble: r() * TAU,
      streak,
    });
  }
  scene.add(g);
  return {
    group: g, vehicles,
    update(t, density = 1) {
      for (const v of vehicles) {
        const span = RANGE * density;
        let x = v.x0 + v.lane.dir * v.speed * t * density;
        x = ((x + span / 2) % span + span) % span - span / 2;
        const wob = Math.sin(t * 0.7 + v.wobble) * 0.22;
        v.obj.position.set(x, L.roadY, v.lane.z + wob);
        v.obj.rotation.y = v.lane.dir > 0 ? -PI / 2 : PI / 2;
        const fade = 1 - smoothstep(span * 0.34, span * 0.5, Math.abs(x));
        v.obj.visible = fade > 0.02;
        v.streak.material.opacity = 0.30 * fade * density;
      }
    },
  };
}

/* ==========================================================================
   Holographic app-failure banners — the 5,400+ CUMTA grievances made visible
   ========================================================================== */
const GRIEVANCE_TEXTS = [
  { t: 'PAYMENT DEDUCTED', s: 'NO TICKET ISSUED · ₹18', code: 'ERR_CHARGE_NO_TKT' },
  { t: 'QR SCANNER EXPIRED', s: 'TOKEN TTL 00:00 · RETRY', code: 'ERR_QR_EXPIRED' },
  { t: 'NETWORK TIMEOUT', s: '2G · 0 BARS AT SHELTER', code: 'ERR_NET_TIMEOUT' },
  { t: 'APP CRASHED', s: 'com.mtc.ticketing · v4.2.1', code: 'ERR_APP_CRASH' },
  { t: 'OTP NOT RECEIVED', s: 'RESEND IN 00:29', code: 'ERR_OTP_LOST' },
  { t: 'LOGIN FAILED', s: 'AADHAAR KYC PENDING', code: 'ERR_KYC_PENDING' },
  { t: 'LIVE TRACK UNAVAILABLE', s: 'GPS FEED LOST 14 MIN', code: 'ERR_GPS_LOST' },
  { t: 'WALLET BALANCE LOW', s: 'TOP-UP REQUIRES UPI', code: 'ERR_UPI_REQUIRED' },
];

function bannerTexture(item, w = 640, h = 220) {
  const { c, x } = makeCanvas(w, h);
  x.fillStyle = 'rgba(26,4,6,0.72)'; rr(x, 0, 0, w, h, 16); x.fill();
  x.strokeStyle = 'rgba(255,60,60,0.95)'; x.lineWidth = 4; rr(x, 3, 3, w - 6, h - 6, 14); x.stroke();
  /* corner brackets */
  x.strokeStyle = '#FF6B6B'; x.lineWidth = 6;
  for (const [cx, cy, sx, sy] of [[10, 10, 1, 1], [w - 10, 10, -1, 1], [10, h - 10, 1, -1], [w - 10, h - 10, -1, -1]]) {
    x.beginPath(); x.moveTo(cx + sx * 34, cy); x.lineTo(cx, cy); x.lineTo(cx, cy + sy * 34); x.stroke();
  }
  /* warning triangle */
  x.fillStyle = '#FF3B3B';
  x.beginPath(); x.moveTo(56, 46); x.lineTo(88, 100); x.lineTo(24, 100); x.closePath(); x.fill();
  x.fillStyle = '#1A0406'; x.font = `900 40px ${FONT_COND}`; x.textAlign = 'center'; x.textBaseline = 'middle';
  x.fillText('!', 56, 84);
  x.textAlign = 'left';
  x.fillStyle = '#FFE3E3'; x.font = `800 40px ${FONT_COND}`;
  x.fillText(item.t, 108, 66);
  x.fillStyle = 'rgba(255,190,190,0.82)'; x.font = `600 24px ${FONT_MONO}`;
  x.fillText(item.s, 108, 104);
  x.fillStyle = 'rgba(255,90,90,0.95)'; x.font = `700 20px ${FONT_MONO}`;
  x.fillText(item.code, 24, h - 60);
  x.fillStyle = 'rgba(255,220,220,0.6)'; x.font = `600 18px ${FONT_MONO}`;
  x.fillText('SOURCE: CUMTA GRIEVANCE LOG · SMARTPHONE USER', 24, h - 30);
  /* scanline texture */
  x.globalAlpha = 0.10; x.fillStyle = '#000';
  for (let j = 0; j < h; j += 3) x.fillRect(0, j, w, 1);
  x.globalAlpha = 1;
  return canvasTexture(c);
}

function buildGlitchBanners(scene) {
  const g = new THREE.Group();
  const banners = [];
  GRIEVANCE_TEXTS.forEach((item, i) => {
    const tex = bannerTexture(item);
    const m = new THREE.ShaderMaterial({
      transparent: true, depthWrite: false, side: THREE.DoubleSide, fog: false,
      uniforms: {
        uTime: U.time, uAmt: { value: 0 }, uMap: { value: tex }, uSeed: { value: i * 3.77 },
        uCol: { value: new THREE.Color(0xFF3B3B) },
      },
      vertexShader: `
        varying vec2 vUvB; uniform float uTime, uSeed, uAmt;
        float hash_like( float n ) { return fract( sin( n * 127.1 ) * 43758.5453 ); }
        void main() {
          vUvB = uv;
          vec3 p = position;
          /* hologram wobble + a hard slice displacement */
          float slice = step( 0.965, hash_like( floor( uv.y * 16.0 ) + floor( uTime * 7.0 + uSeed ) ) );
          p.x += slice * 0.06 * uAmt;
          p.z += sin( uTime * 1.7 + uv.y * 5.0 + uSeed ) * 0.012 * uAmt;
          gl_Position = projectionMatrix * modelViewMatrix * vec4( p, 1.0 );
        }`,
      fragmentShader: `
        varying vec2 vUvB; uniform sampler2D uMap; uniform float uTime, uAmt, uSeed; uniform vec3 uCol;
        float hash_like( float n ) { return fract( sin( n * 127.1 ) * 43758.5453 ); }
        void main() {
          float band = floor( vUvB.y * 44.0 );
          float glitch = step( 0.93, hash_like( band + floor( uTime * 11.0 ) + uSeed ) );
          float shift = ( glitch - 0.5 ) * 0.035;
          /* chromatic aberration: the red channel tears away */
          float r = texture2D( uMap, vUvB + vec2( shift + 0.006, 0.0 ) ).a;
          float gA = texture2D( uMap, vUvB + vec2( shift, 0.0 ) ).a;
          float b = texture2D( uMap, vUvB + vec2( shift - 0.006, 0.0 ) ).a;
          vec4 base = texture2D( uMap, vUvB );
          vec3 col = base.rgb + uCol * vec3( r * 0.5, gA * 0.12, b * 0.14 );
          float scan = 0.86 + 0.14 * sin( vUvB.y * 620.0 + uTime * 8.0 );
          float flick = 0.82 + 0.18 * hash_like( floor( uTime * 24.0 ) + uSeed );
          float edge = smoothstep( 0.0, 0.02, vUvB.x ) * smoothstep( 1.0, 0.98, vUvB.x );
          float a = base.a * scan * flick * edge * uAmt;
          gl_FragColor = vec4( col * ( 0.85 + 0.35 * glitch ), a );
          if ( a < 0.01 ) discard;
        }`,
    });
    const plane = new THREE.Mesh(new THREE.PlaneGeometry(1.62, 0.56), m);
    plane.visible = false;
    g.add(plane);
    banners.push({ mesh: plane, mat: m, i, anchor: i });
  });
  /* the counter card that names the source */
  const counterTex = (() => {
    const { c, x } = makeCanvas(768, 200);
    x.fillStyle = 'rgba(20,4,6,0.78)'; rr(x, 0, 0, 768, 200, 18); x.fill();
    x.strokeStyle = 'rgba(255,80,80,0.9)'; x.lineWidth = 5; rr(x, 4, 4, 760, 192, 16); x.stroke();
    x.textAlign = 'center'; x.textBaseline = 'middle';
    x.fillStyle = '#FF6B6B'; x.font = `900 84px ${FONT_MONO}`;
    x.fillText('5,400+', 384, 62);
    x.fillStyle = '#FFE3E3'; x.font = `700 30px ${FONT_COND}`;
    x.fillText('CUMTA COMMUTER GRIEVANCES FILED', 384, 122);
    x.fillStyle = 'rgba(255,200,200,0.72)'; x.font = `600 22px ${FONT_MONO}`;
    x.fillText('EVERY ONE OF THEM FROM A SMARTPHONE WITH AN APP', 384, 164);
    return canvasTexture(c);
  })();
  const counter = new THREE.Mesh(new THREE.PlaneGeometry(2.5, 0.65),
    new THREE.MeshBasicMaterial({ map: counterTex, transparent: true, opacity: 0, depthWrite: false, side: THREE.DoubleSide, fog: false }));
  counter.visible = false;
  g.add(counter);
  scene.add(g);
  return { group: g, banners, counter };
}

/* -------------------------------- street dog ------------------------------ */
function buildDog() {
  const g = new THREE.Group();
  const gb = new GB();
  const c = 0x8A6A42;
  gb.box(0.30, 0.26, 0.62, { pos: [0, 0.42, 0], color: c });
  gb.sph(0.14, { pos: [0, 0.56, -0.36], color: c, seg: 9, seg2: 7 });
  gb.box(0.1, 0.1, 0.16, { pos: [0, 0.52, -0.48], color: 0x6E5334 });
  for (const s of [-1, 1]) {
    gb.box(0.06, 0.09, 0.02, { pos: [s * 0.07, 0.68, -0.34], rot: [0, 0, s * 0.3], color: 0x6E5334 });
    for (const lz of [-0.2, 0.2]) gb.box(0.07, 0.36, 0.07, { pos: [s * 0.11, 0.20, lz], color: c });
  }
  gb.box(0.05, 0.05, 0.3, { pos: [0, 0.56, 0.42], rot: [0.5, 0, 0], color: c });
  railMats();
  g.add(gb.build({ a: RM.dark }, { cast: true }));
  g.add(mesh(new THREE.SphereGeometry(0.022, 6, 5), new THREE.MeshStandardMaterial({ color: 0x120C06, roughness: 0.2 }), -0.05, 0.58, -0.46));
  g.add(mesh(new THREE.SphereGeometry(0.022, 6, 5), new THREE.MeshStandardMaterial({ color: 0x120C06, roughness: 0.2 }), 0.05, 0.58, -0.46));
  return g;
}
