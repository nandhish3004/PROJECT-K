/* ============================================================================
   24-rail.js · the other three legs of CUMTA's unified network
   ----------------------------------------------------------------------------
   Chennai Mobility AI is a voice layer over the whole CUMTA system, so the
   film has to show that system actually moving. Everything here is built to
   real Chennai specifications:

   1. CHENNAI METRO — Green Line (Corridor 2), Chennai Central ↔ St. Thomas
      Mount. The Inner Ring Road (Jawaharlal Nehru Salai) stretch is elevated
      on single-shaft piers carrying precast U-girders, and it crosses
      Poonamallee High Road at the Koyambedu / CMBT junction — right inside
      this film's corridor. Trains are 3-car stainless-aluminium sets on
      750 V DC third-rail, so they carry NO pantograph.

   2. SOUTHERN RAILWAY SUBURBAN — the Chennai Beach ↔ Tambaram section, the
      busiest suburban corridor in India: four tracks, concrete sleepers,
      25 kV AC overhead with OHE masts, colour-light signals, high-level
      platforms, foot-over-bridges, and ICF-built stainless EMU rakes with
      pantographs and the classic red-and-silver livery.

   3. MRTS — Chennai Beach ↔ Velachery, elevated along the Buckingham Canal.

   Trains run on Catmull-Rom splines and are pure functions of the master
   clock, so a rake is at the same kilometre every single time the film plays.
   ========================================================================== */

/* ------------------------------------------------------------------ helpers */
/** Rails + sleepers + ballast laid along a curve, all instanced. */
function buildTrackRun(curve, { length, gauge = 1.676, sleepersPer = 0.62, ballastW = 3.4, ballastCol = 0x4A423A, railCol = 0x9AA2AA, u0 = 0, u1 = 1, sleeperScale = 1 } = {}) {
  const g = new THREE.Group();
  const up = new THREE.Vector3(0, 1, 0);

  /* ballast prism as a ribbon */
  const ballast = new THREE.Mesh(
    ribbonGeometry(curve, ballastW, Math.max(8, Math.floor(length / 6))),
    new THREE.MeshStandardMaterial({ color: ballastCol, roughness: 0.98, metalness: 0, side: THREE.DoubleSide })
  );
  ballast.position.y = 0.02;
  g.add(ballast);

  /* rails: two thin ribbons lifted onto the sleeper */
  const railMat = new THREE.MeshStandardMaterial({ color: railCol, roughness: 0.28, metalness: 0.94, side: THREE.DoubleSide, envMapIntensity: 1.4 });
  const railGeoA = ribbonGeometry(curve, 0.075, Math.max(8, Math.floor(length / 8)));
  const n = Math.max(4, Math.floor(length / sleepersPer));
  const sleeperGeo = new THREE.BoxGeometry(gauge + 0.78 * sleeperScale, 0.16, 0.26 * sleeperScale);
  const sleeperMat = new THREE.MeshStandardMaterial({ color: 0x6E6A64, roughness: 0.94, metalness: 0.02 });
  const sleepers = new THREE.InstancedMesh(sleeperGeo, sleeperMat, n);
  const dummy = new THREE.Object3D();
  for (let i = 0; i < n; i++) {
    const u = lerp(u0, u1, i / (n - 1));
    const p = curve.getPointAt(clamp01(u));
    const t = curve.getTangentAt(clamp01(u));
    dummy.position.set(p.x, p.y + 0.08, p.z);
    dummy.rotation.set(0, Math.atan2(t.x, t.z), 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    sleepers.setMatrixAt(i, dummy.matrix);
  }
  sleepers.instanceMatrix.needsUpdate = true;
  sleepers.frustumCulled = false;
  g.add(sleepers);

  /* two running rails + (optionally) a third rail */
  const rails = [];
  for (const side of [-1, 1]) {
    const railCurve = offsetCurve(curve, side * gauge / 2, 0.20);
    const r = new THREE.Mesh(ribbonGeometry(railCurve, 0.085, Math.max(8, Math.floor(length / 8))), railMat);
    g.add(r); rails.push(r);
  }
  g.userData = { rails, sleepers, curve };
  return g;
}

/** A curve offset sideways by `d` metres and lifted by `y`. */
function offsetCurve(curve, d, y = 0, samples = 90) {
  const pts = [];
  for (let i = 0; i <= samples; i++) {
    const u = i / samples;
    const p = curve.getPointAt(u), t = curve.getTangentAt(u);
    const s = new THREE.Vector3(-t.z, 0, t.x).normalize().multiplyScalar(d);
    pts.push(v3(p.x + s.x, p.y + y, p.z + s.z));
  }
  return new THREE.CatmullRomCurve3(pts, false, 'catmullrom', 0.5);
}

/* ==========================================================================
   1. CHENNAI METRO — Green Line elevated viaduct over the Koyambedu junction
   ========================================================================== */
const METRO = {
  x: 1010,                 // crosses the corridor at Koyambedu
  z0: -1080, z1: 300,      // St. Thomas Mount side ↔ CMBT side
  deckY: 12.4,
  accent: 0x16A34A,        // Green Line
  stations: [
    { z: -142, tamil: 'சி.எம்.பி.டி', en: 'PURATCHI THALAIVI Dr. J. JAYALALITHAA CMBT', short: 'CMBT' },
    { z: -430, tamil: 'அரும்பாக்கம்', en: 'ARUMBAKKAM', short: 'ARUMBAKKAM' },
    { z: -742, tamil: 'வடபழனி', en: 'VADAPALANI', short: 'VADAPALANI' },
  ],
};
const METRO_CURVE = new THREE.CatmullRomCurve3([
  v3(METRO.x + 6, METRO.deckY, METRO.z0),
  v3(METRO.x + 2, METRO.deckY, METRO.z0 * 0.62),
  v3(METRO.x - 1, METRO.deckY, -330),
  v3(METRO.x, METRO.deckY, -120),
  v3(METRO.x + 2, METRO.deckY, 90),
  v3(METRO.x + 8, METRO.deckY, METRO.z1),
], false, 'catmullrom', 0.5);

function buildMetro(scene) {
  const g = new THREE.Group();
  const conc = new THREE.MeshStandardMaterial({ color: 0x8E9296, roughness: 0.86, metalness: 0.04, envMapIntensity: 0.7 });
  const concDark = new THREE.MeshStandardMaterial({ color: 0x5C6165, roughness: 0.9, metalness: 0.05 });
  const steel = new THREE.MeshStandardMaterial({ color: 0x3A4147, roughness: 0.45, metalness: 0.8 });

  /* -------- single-shaft piers with a pier capital (CMRL's signature) ----- */
  const pierCount = Math.floor(Math.abs(METRO.z1 - METRO.z0) / 27);
  const shaftGeo = new THREE.BoxGeometry(1.5, 1, 2.9);          // scaled per instance
  const capGeo = new THREE.BoxGeometry(4.2, 1.4, 9.4);
  const shafts = new THREE.InstancedMesh(shaftGeo, conc, pierCount);
  const caps = new THREE.InstancedMesh(capGeo, concDark, pierCount);
  const dummy = new THREE.Object3D();
  for (let i = 0; i < pierCount; i++) {
    const u = (i + 0.5) / pierCount;
    const p = METRO_CURVE.getPointAt(u);
    const t = METRO_CURVE.getTangentAt(u);
    const yaw = Math.atan2(t.x, t.z);
    const h = p.y - 0.1;
    dummy.position.set(p.x, h / 2, p.z); dummy.rotation.set(0, yaw, 0); dummy.scale.set(1, h, 1);
    dummy.updateMatrix(); shafts.setMatrixAt(i, dummy.matrix);
    dummy.position.set(p.x, p.y - 1.0, p.z); dummy.scale.set(1, 1, 1);
    dummy.updateMatrix(); caps.setMatrixAt(i, dummy.matrix);
  }
  shafts.instanceMatrix.needsUpdate = true; caps.instanceMatrix.needsUpdate = true;
  shafts.castShadow = true; caps.castShadow = true;
  shafts.frustumCulled = caps.frustumCulled = false;
  g.add(shafts, caps);

  /* -------- precast U-girder deck: bottom slab + two webs + parapet ------- */
  const deckLen = Math.abs(METRO.z1 - METRO.z0);
  const segs = Math.floor(deckLen / 7);
  const slab = new THREE.Mesh(ribbonGeometry(METRO_CURVE, 8.6, segs), new THREE.MeshStandardMaterial({ color: 0x9A9EA2, roughness: 0.84, metalness: 0.05, side: THREE.DoubleSide }));
  g.add(slab);
  for (const s of [-1, 1]) {
    /* the U-girder webs stand up along the alignment; the coping caps them */
    g.add(new THREE.Mesh(verticalRibbon(offsetCurve(METRO_CURVE, s * 4.3, 0), 2.1, segs, -1.0), conc));
    g.add(new THREE.Mesh(verticalRibbon(offsetCurve(METRO_CURVE, s * 4.5, 0), 0.55, segs, 1.15), concDark));
  }
  /* walkway cantilever on the outside of each web */
  for (const s of [-1, 1]) {
    const wlk = new THREE.Mesh(ribbonGeometry(offsetCurve(METRO_CURVE, s * 5.4, 0), 1.5, segs), concDark);
    wlk.position.y = 0.12; g.add(wlk);
  }

  /* -------- track slab + third rail (750 V DC, so no overhead wire) ------- */
  const trackSlab = new THREE.Mesh(ribbonGeometry(METRO_CURVE, 7.2, segs), new THREE.MeshStandardMaterial({ color: 0x4C5054, roughness: 0.95, metalness: 0.02, side: THREE.DoubleSide }));
  trackSlab.position.y = 0.16; g.add(trackSlab);
  const railMat = new THREE.MeshStandardMaterial({ color: 0xB6BEC6, roughness: 0.2, metalness: 0.96, envMapIntensity: 1.8 });
  for (const s of [-1, 1]) {
    const r = new THREE.Mesh(ribbonGeometry(offsetCurve(METRO_CURVE, s * 0.75, 0.28), 0.1, segs), railMat);
    g.add(r);
  }
  /* third rail on timber bearers, covered, outside the running rails */
  const thirdRailMat = new THREE.MeshStandardMaterial({ color: 0xD8452F, roughness: 0.45, metalness: 0.7 });
  const thirdRail = new THREE.Mesh(ribbonGeometry(offsetCurve(METRO_CURVE, 2.55, 0.34), 0.22, segs), thirdRailMat);
  g.add(thirdRail);
  const thirdCover = new THREE.Mesh(ribbonGeometry(offsetCurve(METRO_CURVE, 2.55, 0.5), 0.5, segs),
    new THREE.MeshStandardMaterial({ color: 0xE8B21A, roughness: 0.8, metalness: 0.05, side: THREE.DoubleSide, transparent: true, opacity: 0.85 }));
  g.add(thirdCover);

  /* -------- stations -------- */
  const stations = [];
  for (const st of METRO.stations) {
    const s = buildMetroStation(st, conc, concDark, steel);
    g.add(s); stations.push(s);
  }

  /* -------- CMRL hoardings under the viaduct -------- */
  for (const z of [-260, -620, -900, 40]) {
    const h = buildMetroHoarding();
    const u = clamp01((z - METRO.z0) / (METRO.z1 - METRO.z0));
    const p = METRO_CURVE.getPointAt(u);
    const t = METRO_CURVE.getTangentAt(u);
    h.position.set(p.x + Math.sign(hash1(z)) * 9.5, 0, p.z);
    h.rotation.y = Math.atan2(t.x, t.z) + PI / 2;
    g.add(h);
  }

  /* -------- the trains -------- */
  const trains = [];
  for (let i = 0; i < 2; i++) {
    const tr = buildMetroTrain(METRO.accent, i === 0);
    tr.userData.dir = i === 0 ? 1 : -1;
    tr.userData.offset = i * 0.47;
    g.add(tr); trains.push(tr);
  }

  scene.add(g);
  return { group: g, curve: METRO_CURVE, trains, stations, deckY: METRO.deckY };
}

/** Vertical ribbon: a strip standing up along a curve (used for girder webs). */
function verticalRibbon(curve, height, segments, yBase = 0) {
  const pos = [], uv = [], idx = [];
  const up = new THREE.Vector3(0, 1, 0);
  for (let i = 0; i <= segments; i++) {
    const u = i / segments;
    const p = curve.getPointAt(u);
    pos.push(p.x, p.y + yBase, p.z);
    pos.push(p.x, p.y + yBase + height, p.z);
    uv.push(u * segments * 0.3, 0, u * segments * 0.3, 1);
  }
  for (let i = 0; i < segments; i++) {
    const a = i * 2, b = i * 2 + 1, c = i * 2 + 2, d = i * 2 + 3;
    idx.push(a, b, c, c, b, d);
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  geo.setIndex(idx);
  geo.computeVertexNormals();
  return geo;
}

/* ------------------------- shared rail/metro materials -------------------- */
const RM = {};
function railMats() {
  if (RM.ready) return RM;
  RM.conc = new THREE.MeshStandardMaterial({ color: 0xFFFFFF, vertexColors: true, roughness: 0.88, metalness: 0.05, envMapIntensity: 0.7 });
  RM.concDark = new THREE.MeshStandardMaterial({ color: 0xFFFFFF, vertexColors: true, roughness: 0.92, metalness: 0.05 });
  RM.steel = new THREE.MeshStandardMaterial({ color: 0xFFFFFF, vertexColors: true, roughness: 0.34, metalness: 0.88, envMapIntensity: 1.6 });
  RM.chrome = new THREE.MeshStandardMaterial({ color: 0xFFFFFF, vertexColors: true, roughness: 0.16, metalness: 0.96, envMapIntensity: 2.0 });
  RM.dark = new THREE.MeshStandardMaterial({ color: 0xFFFFFF, vertexColors: true, roughness: 0.72, metalness: 0.35 });
  RM.glass = new THREE.MeshPhysicalMaterial({
    color: 0xFFFFFF, vertexColors: true, roughness: 0.05, metalness: 0.18, transparent: true, opacity: 0.66,
    clearcoat: 1, clearcoatRoughness: 0.03, envMapIntensity: 2.4, side: THREE.DoubleSide, depthWrite: false,
  });
  RM.silhouette = new THREE.MeshStandardMaterial({ color: 0x0A0E12, roughness: 0.95, metalness: 0, transparent: true, opacity: 0.86 });
  RM.yellow = new THREE.MeshStandardMaterial({ color: 0xE8B21A, roughness: 0.9, emissive: 0xE8B21A, emissiveIntensity: 0.2 });
  RM.ready = true;
  return RM;
}

/* ==========================================================================
   Metro station — side platforms, platform screen doors, barrel-vault canopy
   ========================================================================== */
function buildMetroStation(st, conc, concDark, steel) {
  const g = new THREE.Group();
  const y = METRO.deckY, LEN = 96;
  g.position.set(METRO.x, 0, st.z);
  railMats();

  /* ---- structure: merged into three meshes ---- */
  const bStruct = new GB(), bDark = new GB(), bSteel = new GB();
  bStruct.box(WID_STATION, 0.6, LEN, { pos: [-13.5, y - 4.2, 0], color: 0x9AA0A4 });
  for (let i = -3; i <= 3; i++) bStruct.box(1.1, y - 4.2, 1.1, { pos: [-22.5, (y - 4.2) / 2, i * (LEN / 7)], color: 0x8A9094 });
  for (const sz of [-LEN / 2 + 12, LEN / 2 - 12]) {
    bStruct.box(7.4, y - 4.0, 5.6, { pos: [-22.5, (y - 4.0) / 2, sz], color: 0x92989C });
    for (let s = 0; s < 22; s++) bStruct.box(6.6, 0.16, 0.42, { pos: [-22.5, 0.3 + s * ((y - 4.6) / 22), sz + 2.4 - s * 0.22], color: 0x7E8488 });
    bSteel.box(3.0, y - 0.5, 3.0, { pos: [-28.1, (y - 0.5) / 2, sz], color: 0x7E868C });
  }
  /* platforms + tactile strips + PSD frames */
  for (const s of [-1, 1]) {
    bStruct.box(4.6, 0.34, LEN - 4, { pos: [s * 6.8, y + 0.28, 0], color: 0xA2A8AC });
    for (let i = -6; i <= 6; i++) bDark.box(0.24, 2.7, 0.2, { pos: [s * (6.8 - s * 2.15), y + 1.6, i * 7.2], color: 0x4A5157 });
    bSteel.box(0.3, 0.3, LEN - 6, { pos: [s * (6.8 - s * 2.15), y + 2.95, 0], color: 0xB4BAC0 });
    /* canopy ribs */
    for (let i = -7; i <= 7; i++) {
      const rib = new THREE.TorusGeometry(12.3, 0.16, 5, 16, PI);
      bSteel.add(rib, { pos: [0, y + 3.0, i * ((LEN - 4) / 15)], rot: [PI / 2, 0, 0], scale: [1, 0.42, 1], color: 0x6E767C });
    }
  }
  g.add(bStruct.build({ a: RM.conc }, { cast: true, recv: true }));
  g.add(bDark.build({ a: RM.dark }));
  g.add(bSteel.build({ a: RM.steel }));

  /* yellow tactile warning strip — mandatory on CMRL platforms */
  const bY = new GB();
  for (const s of [-1, 1]) bY.box(0.42, 0.03, LEN - 4, { pos: [s * 8.7, y + 0.47, 0], color: 0xE8B21A });
  g.add(bY.build({ a: RM.yellow }));

  /* platform screen doors (CMRL runs PSDs on the elevated line) */
  const psdMat = new THREE.MeshPhysicalMaterial({ color: 0x2C3A44, roughness: 0.08, metalness: 0.1, transparent: true, opacity: 0.32, clearcoat: 1, envMapIntensity: 1.6, side: THREE.DoubleSide, depthWrite: false });
  for (const s of [-1, 1]) {
    const psd = mesh(new THREE.BoxGeometry(0.14, 2.5, LEN - 8), psdMat, s * 4.55, y + 1.6, 0);
    g.add(psd);
  }

  /* escalator trusses */
  for (const sz of [-LEN / 2 + 12, LEN / 2 - 12]) for (const dx of [-17.9, -15.3]) {
    const esc = mesh(new THREE.BoxGeometry(2.2, 0.5, 15.4), RM.steel, dx, (y - 4.2) / 2 + 0.6, sz, true);
    esc.rotation.x = -Math.atan2(y - 4.2, 15);
    g.add(esc);
  }

  /* barrel-vault canopy */
  const canopyMat = new THREE.MeshStandardMaterial({ color: 0xD8DDE2, roughness: 0.42, metalness: 0.55, side: THREE.DoubleSide });
  const canopy = new THREE.Mesh(new THREE.CylinderGeometry(12.4, 12.4, LEN - 2, 20, 1, true, 0, PI), canopyMat);
  canopy.rotation.z = PI / 2; canopy.rotation.y = PI / 2; canopy.scale.set(1, 1, 0.42);
  canopy.position.set(0, y + 3.0, 0); canopy.castShadow = true;
  g.add(canopy);
  /* skylight strip along the crown */
  g.add(mesh(new THREE.BoxGeometry(3.4, 0.12, LEN - 6), new THREE.MeshPhysicalMaterial({ color: 0xBFD8E8, roughness: 0.06, transparent: true, opacity: 0.4 }), 0, y + 8.1, 0));

  /* station name boards — Tamil above, English below */
  const bt = metroBoardTex(st);
  const boardMat = new THREE.MeshStandardMaterial({ map: bt, roughness: 0.5, emissive: 0xFFFFFF, emissiveMap: bt, emissiveIntensity: 0.55, side: THREE.DoubleSide });
  for (const sz of [-LEN / 2 + 22, 0, LEN / 2 - 22]) for (const s of [-1, 1]) {
    const b = mesh(new THREE.PlaneGeometry(20, 3.1), boardMat, s * 4.2, y + 4.5, sz);
    b.rotation.y = s > 0 ? 0 : PI;
    g.add(b);
  }
  /* CMRL roundel on the canopy ends */
  const roundel = TEX.cmrlRoundel || (TEX.cmrlRoundel = texCMRL());
  const rMat = new THREE.MeshStandardMaterial({ map: roundel, roughness: 0.5, emissive: 0xFFFFFF, emissiveMap: roundel, emissiveIntensity: 0.75, transparent: true, side: THREE.DoubleSide });
  for (const sz of [-LEN / 2 + 1, LEN / 2 - 1]) g.add(mesh(new THREE.CircleGeometry(2.3, 24), rMat, 0, y + 5.6, sz));

  /* platform lighting: cool white on the concourse, sodium on the stairs */
  /* Seven cool strips down the concourse plus four sodium stair lights: eleven
     real lights for a station the camera only ever sees from the street. Paint
     them instead -- the emissive fittings above already carry the highlights,
     these pools are what the light does to the floor. */
  for (let i = -3; i <= 3; i++) {
    const z = i * (LEN / 7);
    const pl = lightPool(0xEAF2FF, 11, 0.34); pl.position.set(0, y + 0.05, z); g.add(pl);
    if (i % 2 === 0) { const w = lightPool(0xFFC24A, 8, 0.28); w.position.set(-22.5, y + 0.05, z); g.add(w); }
  }
  g.userData = { y, LEN, name: st.en, platZ: st.z };
  return g;
}
const WID_STATION = 20;

function metroBoardTex(st) {
  const key = 'mb_' + st.short;
  if (TEX[key]) return TEX[key];
  const { c, x } = makeCanvas(1024, 160);
  x.fillStyle = '#0F1A14'; x.fillRect(0, 0, 1024, 160);
  x.fillStyle = '#16A34A'; x.fillRect(0, 0, 1024, 12); x.fillRect(0, 148, 1024, 12);
  x.textAlign = 'center'; x.textBaseline = 'middle';
  x.fillStyle = '#FFFFFF'; x.font = `700 52px ${FONT_TAMIL}`;
  x.fillText(st.tamil, 512, 54);
  x.fillStyle = '#CFE8D8'; x.font = `600 30px ${FONT_COND}`;
  const lines = wrapText(x, st.en, 950);
  x.fillText(lines[0] || st.en, 512, lines.length > 1 ? 104 : 116);
  if (lines[1]) { x.font = `600 24px ${FONT_COND}`; x.fillText(lines[1], 512, 136); }
  TEX[key] = canvasTexture(c);
  return TEX[key];
}

function texCMRL(size = 256) {
  const { c, x } = makeCanvas(size, size);
  x.clearRect(0, 0, size, size);
  x.fillStyle = '#0E7A3D'; x.beginPath(); x.arc(size / 2, size / 2, size * 0.46, 0, TAU); x.fill();
  x.fillStyle = '#FFFFFF'; x.beginPath(); x.arc(size / 2, size / 2, size * 0.34, 0, TAU); x.fill();
  x.fillStyle = '#0E7A3D'; x.beginPath(); x.arc(size / 2, size / 2, size * 0.24, 0, TAU); x.fill();
  x.textAlign = 'center'; x.textBaseline = 'middle';
  x.fillStyle = '#FFFFFF'; x.font = `800 ${size * 0.15}px ${FONT_COND}`;
  x.fillText('CMRL', size / 2, size / 2 + 1);
  return canvasTexture(c, { srgb: true });
}

function buildMetroHoarding() {
  const g = new THREE.Group();
  const t = (() => {
    if (TEX.cmrlHoard) return TEX.cmrlHoard;
    const { c, x } = makeCanvas(1024, 384);
    const bg = x.createLinearGradient(0, 0, 1024, 384);
    bg.addColorStop(0, '#0B3D22'); bg.addColorStop(0.6, '#12683A'); bg.addColorStop(1, '#0B3D22');
    x.fillStyle = bg; x.fillRect(0, 0, 1024, 384);
    x.strokeStyle = 'rgba(255,255,255,0.45)'; x.lineWidth = 8; x.strokeRect(10, 10, 1004, 364);
    x.textAlign = 'center'; x.textBaseline = 'middle';
    x.fillStyle = '#FFFFFF'; x.font = `800 60px ${FONT_TAMIL}`; x.fillText('சென்னை மெட்ரோ ரயில்', 512, 76);
    x.font = `800 52px ${FONT_COND}`; x.fillStyle = '#D7F5E2'; x.fillText('CHENNAI METRO RAIL LTD', 512, 146);
    x.font = `700 40px ${FONT_COND}`; x.fillStyle = '#FFFFFF'; x.fillText('GREEN LINE · CORRIDOR 2', 512, 214);
    x.font = `600 28px ${FONT_MONO}`; x.fillStyle = '#BFE9CE'; x.fillText('CHENNAI CENTRAL ↔ ST. THOMAS MOUNT', 512, 266);
    x.font = `600 24px ${FONT_MONO}`; x.fillStyle = 'rgba(255,255,255,0.8)'; x.fillText('ONE CHENNAI · ONE CARD · ONE NETWORK — CUMTA', 512, 320);
    TEX.cmrlHoard = canvasTexture(c);
    return TEX.cmrlHoard;
  })();
  const panel = mesh(new THREE.BoxGeometry(12, 4.5, 0.24), new THREE.MeshStandardMaterial({
    map: t, roughness: 0.6, emissive: 0xFFFFFF, emissiveMap: t, emissiveIntensity: 0.55,
  }), 0, 5.6, 0, true);
  g.add(panel);
  const b = new GB();
  b.box(12.5, 0.34, 0.5, { pos: [0, 8.0, 0], color: 0x2A2F34 });
  for (const sx of [-1, 1]) b.cyl(0.2, 0.24, 5.6, 8, { pos: [sx * 5.4, 2.8, 0.14], color: 0x333A40 });
  g.add(b.build({ a: RM.dark }, { cast: true }));
  return g;
}

/** CMRL 3-car set: stainless-aluminium, colour band, NO pantograph (750 V DC third rail). */
function buildMetroTrain(accent) {
  railMats();
  const g = new THREE.Group();
  const CAR_LEN = 20.6, CAR_W = 2.88, CAR_H = 3.6, GAP = 0.9;
  const cars = [];
  for (let i = 0; i < 3; i++) {
    const car = new THREE.Group();
    car.position.z = (i - 1) * (CAR_LEN + GAP);
    const bb = new GB(), bg = new GB(), bs = new GB(), bd = new GB();
    /* body + nose */
    bb.box(CAR_W, CAR_H, CAR_LEN, { pos: [0, CAR_H / 2 + 0.55, 0], color: 0xE8ECEF });
    bb.box(CAR_W + 0.04, 0.44, CAR_LEN - 0.2, { pos: [0, 1.15, 0], color: accent });
    bb.box(CAR_W + 0.02, 0.5, CAR_LEN - 0.2, { pos: [0, 0.62, 0], color: 0x2B3238 });
    bb.box(CAR_W - 0.3, 0.14, CAR_LEN - 0.6, { pos: [0, CAR_H + 0.55, 0], color: 0xE2E6E9 });
    for (let a = 0; a < 3; a++) bb.box(2.2, 0.36, 3.4, { pos: [0, CAR_H + 0.72, -CAR_LEN / 3 + a * (CAR_LEN / 3)], color: 0xB9C0C6 });
    if (i !== 1) {
      const dir = i === 0 ? -1 : 1;
      bb.sph(CAR_W * 0.52, { pos: [0, CAR_H / 2 + 0.55, dir * (CAR_LEN / 2 + 0.5)], scale: [1, 1.5, 2.4], color: 0xE8ECEF, seg: 12, seg2: 9 });
      bd.box(2.0, 0.42, 0.08, { pos: [0, 3.2, dir * (CAR_LEN / 2 + 0.66)], color: 0xFF9A2E });
    }
    /* doors + windows */
    for (const s of [-1, 1]) {
      bg.box(0.06, 1.15, CAR_LEN - 3.4, { pos: [s * (CAR_W / 2 + 0.012), 2.72, 0], color: 0x0C141A });
      for (let d = 0; d < 4; d++) {
        const dz = -CAR_LEN / 2 + 3.1 + d * ((CAR_LEN - 6.2) / 3);
        bb.box(0.1, 2.05, 1.5, { pos: [s * (CAR_W / 2 + 0.02), 1.86, dz], color: 0xC9CFD4 });
        bb.box(0.12, 0.12, 1.6, { pos: [s * (CAR_W / 2 + 0.02), 2.95, dz], color: accent });
        bg.box(0.07, 0.9, 1.34, { pos: [s * (CAR_W / 2 + 0.06), 2.2, dz], color: 0x0C141A });
      }
      /* passenger silhouettes */
      for (let p = 0; p < 9; p++) {
        const pz = -CAR_LEN / 2 + 2 + p * ((CAR_LEN - 4) / 8);
        bs.cyl(0.22, 0.22, 1.1, 6, { pos: [s * (CAR_W / 2 - 0.42), 2.35, pz], color: 0x0A0E12 });
      }
    }
    /* bogies + third-rail collector shoes */
    for (const bz of [-CAR_LEN / 2 + 3.4, CAR_LEN / 2 - 3.4]) {
      bd.box(2.3, 0.7, 3.0, { pos: [0, 0.5, bz], color: 0x2B3238 });
      for (const wx of [-1, 1]) for (const wz of [-1.05, 1.05]) {
        bd.cyl(0.46, 0.46, 0.16, 12, { pos: [wx * 0.82, 0.46, bz + wz], rot: [0, 0, PI / 2], color: 0x1A1E22 });
      }
      bd.box(0.3, 0.16, 1.5, { pos: [1.55, 0.42, bz], color: 0xD8452F });
    }
    car.add(bb.build({ a: RM.steel }, { cast: true }));
    car.add(bg.build({ a: RM.glass }));
    car.add(bs.build({ a: RM.silhouette }));
    car.add(bd.build({ a: RM.dark }));
    /* lights stay as separate small emissive meshes — only on the driving cars */
    if (i !== 1) {
      const dir = i === 0 ? -1 : 1;
      for (const sx of [-0.85, 0.85]) {
        car.add(mesh(new THREE.BoxGeometry(0.42, 0.2, 0.1), new THREE.MeshStandardMaterial({ color: 0xFFF6E0, emissive: 0xFFF0CC, emissiveIntensity: 5 }), sx, 1.35, dir * (CAR_LEN / 2 + 0.66)));
        const gl = glowSprite(0xFFF0CC, 4.0, 0.9); gl.position.set(sx, 1.35, dir * (CAR_LEN / 2 + 1.0)); car.add(gl);
      }
      const tl = mesh(new THREE.BoxGeometry(0.3, 0.16, 0.08), new THREE.MeshStandardMaterial({ color: 0x8A1010, emissive: 0xFF1A1A, emissiveIntensity: 3 }), 0, 1.15, dir * (CAR_LEN / 2 + 0.7));
      car.add(tl);
    }
    g.add(car); cars.push(car);
  }
  const glowIn = glowSprite(0xFFE3B0, 40, 0.10); glowIn.position.set(0, 3.2, 0); g.add(glowIn);
  g.userData = { cars, CAR_LEN, GAP };
  return g;
}

/* ==========================================================================
   2. SOUTHERN RAILWAY — Chennai Beach ↔ Tambaram suburban section
   ========================================================================== */
const RAIL = {
  x: 1470, z0: -1320, z1: 300,
  tracks: [-6.0, -2.0, 2.0, 6.0],
  stations: [
    { z: -960, en: 'MAMBALAM', tamil: 'மாம்பலம்' },
    { z: -660, en: 'KODAMBAKKAM', tamil: 'கோடம்பாக்கம்' },
    { z: -330, en: 'CHETPET', tamil: 'சேத்துப்பட்டு' },
  ],
};
const railCurveAt = (off) => new THREE.CatmullRomCurve3([
  v3(RAIL.x + off + 6, 0.35, RAIL.z0),
  v3(RAIL.x + off, 0.35, RAIL.z0 * 0.66),
  v3(RAIL.x + off - 4, 0.35, -520),
  v3(RAIL.x + off - 1, 0.35, -160),
  v3(RAIL.x + off + 3, 0.35, 120),
  v3(RAIL.x + off + 8, 0.35, RAIL.z1),
], false, 'catmullrom', 0.5);

function buildSuburbanRail(scene) {
  railMats();
  const g = new THREE.Group();
  const curves = RAIL.tracks.map(railCurveAt);
  const span = Math.abs(RAIL.z1 - RAIL.z0) * 1.02;

  /* formation: ballast shoulder under all four tracks */
  const formation = new THREE.Mesh(ribbonGeometry(curves[1], 27, 190),
    new THREE.MeshStandardMaterial({ color: 0x3E3830, roughness: 0.99, metalness: 0, side: THREE.DoubleSide }));
  formation.position.y = 0.02;
  g.add(formation);
  for (const c of curves) g.add(buildTrackRun(c, { length: span, ballastW: 4.1, sleeperScale: 1.06 }));

  /* ---------------- 25 kV AC overhead equipment ---------------- */
  const NM = Math.floor(span / 48);
  const steelMat = new THREE.MeshStandardMaterial({ color: 0x8B9298, roughness: 0.5, metalness: 0.82 });
  for (const side of [-1, 1]) {
    const cEdge = curves[side > 0 ? 3 : 0];
    const masts = new THREE.InstancedMesh(new THREE.CylinderGeometry(0.16, 0.24, 1, 7), steelMat, NM);
    const cants = new THREE.InstancedMesh(new THREE.BoxGeometry(1, 0.18, 0.18), steelMat, NM * 3);
    const regs = new THREE.InstancedMesh(new THREE.BoxGeometry(0.14, 1, 0.14), steelMat, NM * 3);
    const d = new THREE.Object3D();
    let ci = 0, ri = 0;
    for (let i = 0; i < NM; i++) {
      const u = (i + 0.5) / NM;
      const p = cEdge.getPointAt(u), t = cEdge.getTangentAt(u);
      const yaw = Math.atan2(t.x, t.z);
      const nx = -t.z, nz = t.x;                    // unit normal in XZ
      const X = p.x + nx * side * 5.6, Z = p.z + nz * side * 5.6;
      d.position.set(X, 0.35 + 3.8, Z); d.rotation.set(0, yaw, 0); d.scale.set(1, 7.6, 1);
      d.updateMatrix(); masts.setMatrixAt(i, d.matrix);
      /* cantilevers reaching in over the three tracks nearest this mast */
      for (let k = 0; k < 3; k++) {
        const reach = 2.0 + k * 4.0;
        const cx = X - nx * side * reach, cz = Z - nz * side * reach;
        d.position.set((X + cx) / 2, 7.3, (Z + cz) / 2);
        d.rotation.set(0, yaw, 0); d.scale.set(reach, 1, 1);
        d.updateMatrix(); cants.setMatrixAt(ci++, d.matrix);
        d.position.set(cx, 6.3, cz); d.rotation.set(0, yaw, 0); d.scale.set(1, 2.2, 1);
        d.updateMatrix(); regs.setMatrixAt(ri++, d.matrix);
      }
    }
    masts.instanceMatrix.needsUpdate = cants.instanceMatrix.needsUpdate = regs.instanceMatrix.needsUpdate = true;
    masts.frustumCulled = cants.frustumCulled = regs.frustumCulled = false;
    g.add(masts, cants, regs);
  }
  /* contact wire + catenary + droppers, per track */
  const wireMat = new THREE.MeshBasicMaterial({ color: 0xB9C2C8 });
  for (const c of curves) {
    for (const [yy, rr] of [[5.55, 0.05], [6.6, 0.035]]) {
      const pts = [];
      for (let i = 0; i <= 150; i++) {
        const u = i / 150, p = c.getPointAt(u);
        pts.push(v3(p.x, p.y + yy, p.z));
      }
      const wire = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts, false, 'catmullrom', 0.5), 260, rr, 4, false), wireMat);
      wire.frustumCulled = false; g.add(wire);
    }
    const drops = [];
    for (let i = 0; i <= 110; i++) {
      const u = i / 110, p = c.getPointAt(u);
      drops.push(v3(p.x, p.y + 6.6, p.z), v3(p.x, p.y + 5.55, p.z));
    }
    const dl = new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(drops), new THREE.LineBasicMaterial({ color: 0x8A9298, transparent: true, opacity: 0.7 }));
    dl.frustumCulled = false; g.add(dl);
  }

  /* ---------------- colour-light signals ---------------- */
  const signals = [];
  for (let i = 0; i < 10; i++) {
    const u = 0.05 + i * 0.10;
    const s = buildRailSignal();
    const p = curves[0].getPointAt(u), t = curves[0].getTangentAt(u);
    s.position.set(p.x + (-t.z) * -9.8, p.y, p.z + t.x * -9.8);
    s.rotation.y = Math.atan2(t.x, t.z) + PI;
    g.add(s); signals.push(s);
  }

  /* ---------------- stations ---------------- */
  for (const st of RAIL.stations) g.add(buildRailStation(st, curves));

  /* ---------------- ICF EMU rakes ---------------- */
  const trains = [];
  const rakes = [
    { track: 0, dir: 1, offset: 0.00, cars: 12, speed: 1.00 },
    { track: 1, dir: -1, offset: 0.44, cars: 9, speed: 0.86 },
    { track: 2, dir: 1, offset: 0.68, cars: 12, speed: 0.92 },
    { track: 3, dir: -1, offset: 0.21, cars: 9, speed: 1.06 },
  ];
  for (const rk of rakes) {
    const tr = buildEMU(rk.cars);
    tr.userData = Object.assign({}, rk);
    g.add(tr); trains.push(tr);
  }
  /* a long-distance rake on the outer track */
  const express = buildEMU(16, { livery: 'express' });
  express.userData = { track: 1, dir: 1, offset: 0.83, cars: 16, speed: 1.55 };
  g.add(express); trains.push(express);

  scene.add(g);
  return { group: g, curves, trains, signals, stations: RAIL.stations };
}

function buildRailSignal() {
  const g = new THREE.Group();
  const b = new GB();
  b.cyl(0.11, 0.15, 5.4, 7, { pos: [0, 2.7, 0], color: 0x6E757B });
  b.box(0.44, 1.5, 0.34, { pos: [0, 5.2, 0], color: 0x1A1E22 });
  b.box(0.5, 0.1, 0.1, { pos: [0, 4.34, -0.2], color: 0xDDEEFF });
  g.add(b.build({ a: RM.dark }, { cast: true }));
  const lamps = [];
  const cols = [0x22C55E, 0xFACC15, 0xEF4444];
  for (let i = 0; i < 3; i++) {
    const on = i === 2;
    const lm = mesh(new THREE.SphereGeometry(0.115, 10, 8), new THREE.MeshStandardMaterial({ color: cols[i], emissive: cols[i], emissiveIntensity: on ? 4.2 : 0.12, roughness: 0.3 }), 0, 5.68 - i * 0.48, -0.2);
    g.add(lm);
    const gl = glowSprite(cols[i], 1.2, on ? 0.7 : 0.05); gl.position.copy(lm.position); g.add(gl);
    lm.userData.glow = gl;
    lamps.push(lm);
  }
  g.userData = { lamps };
  return g;
}

function buildRailStation(st, curves) {
  railMats();
  const g = new THREE.Group();
  const u = clamp01((st.z - RAIL.z0) / (RAIL.z1 - RAIL.z0));
  const p = curves[1].getPointAt(u), t = curves[1].getTangentAt(u);
  g.position.set(p.x, 0, p.z);
  g.rotation.y = Math.atan2(t.x, t.z);
  const LEN = 190;

  const bS = new GB(), bD = new GB(), bY = new GB();
  /* two island platforms serving the four tracks */
  for (const px of [-4.0, 4.0]) {
    bS.box(6.4, 1.0, LEN, { pos: [px, 0.85, 0], color: 0x8A8E92 });
    for (const e of [-1, 1]) bY.box(0.34, 0.04, LEN - 4, { pos: [px + e * 2.9, 1.37, 0], color: 0xE8B21A });
    /* platform shelter on steel columns */
    for (let i = -5; i <= 5; i++) {
      const z = i * (LEN / 11);
      for (const sx of [-1, 1]) bD.cyl(0.1, 0.12, 3.4, 6, { pos: [px + sx * 2.2, 3.05, z], color: 0x5A5F63 });
      bD.box(5.2, 0.14, LEN / 12, { pos: [px, 4.82, z], color: 0x6E7A74 });
    }
    for (let i = -4; i <= 4; i += 2) bD.box(2.6, 0.12, 0.5, { pos: [px, 1.85, i * (LEN / 10)], color: 0x5A5F63 });
    /* sodium platform lighting */
    for (let i = -3; i <= 3; i++) {
      const z = i * (LEN / 7);
      bD.cyl(0.1, 0.14, 9.2, 7, { pos: [px, 5.95, z], color: 0x5A5F63 });
    }
  }
  g.add(bS.build({ a: RM.conc }, { recv: true }));
  g.add(bD.build({ a: RM.dark }, { cast: true }));
  g.add(bY.build({ a: RM.yellow }));

  /* lamp heads + glow (kept separate so they can be emissive) */
  for (const px of [-4.0, 4.0]) for (let i = -3; i <= 3; i++) {
    const z = i * (LEN / 7);
    g.add(mesh(new THREE.BoxGeometry(0.7, 0.2, 0.34), new THREE.MeshStandardMaterial({ color: 0xFFF0CC, emissive: 0xFFC24A, emissiveIntensity: 4 }), px, 9.6, z));
    const gl = glowSprite(C.sodiumHot, 8.0, 0.5); gl.position.set(px, 9.6, z); g.add(gl);
    if (i % 2 === 0) { const pl = lightPool(0xFFC24A, 10, 0.30); pl.position.set(px, 0.08, z); g.add(pl); }
  }

  /* Southern Railway name boards: white on black, Tamil above English */
  const boardTex = (() => {
    const key = 'rsb_' + st.en;
    if (TEX[key]) return TEX[key];
    const { c, x } = makeCanvas(1024, 192);
    x.fillStyle = '#0A0C0E'; x.fillRect(0, 0, 1024, 192);
    x.strokeStyle = '#FFFFFF'; x.lineWidth = 7; x.strokeRect(8, 8, 1008, 176);
    x.textAlign = 'center'; x.textBaseline = 'middle';
    x.fillStyle = '#FFFFFF'; x.font = `700 60px ${FONT_TAMIL}`; x.fillText(st.tamil, 512, 60);
    x.font = `800 50px ${FONT_COND}`; x.fillText(st.en, 512, 128);
    x.fillStyle = '#F59E0B'; x.font = `600 22px ${FONT_MONO}`; x.fillText('SOUTHERN RAILWAY · CHENNAI SUBURBAN SECTION', 512, 170);
    TEX[key] = canvasTexture(c);
    return TEX[key];
  })();
  const btMat = new THREE.MeshStandardMaterial({ map: boardTex, roughness: 0.6, emissive: 0xFFFFFF, emissiveMap: boardTex, emissiveIntensity: 0.45, side: THREE.DoubleSide });
  for (const px of [-4.0, 4.0]) for (const z of [-LEN / 2 + 16, LEN / 2 - 16]) {
    const b = mesh(new THREE.PlaneGeometry(9.5, 1.78), btMat, px, 3.4, z);
    b.rotation.y = PI / 2; g.add(b);
  }

  /* foot-over-bridge across all four tracks */
  const fob = new THREE.Group(); fob.position.set(0, 0, -LEN / 2 + 40); g.add(fob);
  const bf = new GB(), bg2 = new GB();
  bf.box(30, 0.5, 4.4, { pos: [0, 8.2, 0], color: 0x8A8E92 });
  bf.box(30, 0.3, 4.8, { pos: [0, 11.0, 0], color: 0x6E7A74 });
  for (const sx of [-1, 0, 1]) bf.box(0.8, 8.2, 0.8, { pos: [sx * 13, 4.1, 0], color: 0x5A5F63 });
  for (const sx of [-13, -4, 4, 13]) {
    for (let s = 0; s < 20; s++) bf.box(2.6, 0.16, 0.4, { pos: [sx, 0.3 + s * 0.41, 3.4 + (20 - s) * 0.24], color: 0x6A6F73 });
    bf.box(2.8, 8.4, 0.24, { pos: [sx, 4.2, 8.4], color: 0x5A5F63 });
  }
  fob.add(bf.build({ a: RM.conc }, { cast: true, recv: true }));
  for (const sz of [-2.2, 2.2]) {
    fob.add(mesh(new THREE.BoxGeometry(30, 2.6, 0.18), new THREE.MeshPhysicalMaterial({ color: 0x2C3A44, roughness: 0.1, transparent: true, opacity: 0.32, depthWrite: false }), 0, 9.6, sz));
  }

  /* station building on the street side */
  const bld = new THREE.Group(); bld.position.set(-16, 0, 12); g.add(bld);
  const bb2 = new GB();
  bb2.box(20, 6.4, 12, { pos: [0, 3.2, 0], color: 0xB9A88C });
  bb2.box(21, 0.7, 13, { pos: [0, 6.7, 0], color: 0x7A3B2E });
  bld.add(bb2.build({ a: RM.conc }, { cast: true, recv: true }));
  for (let i = -2; i <= 2; i++) bld.add(mesh(new THREE.BoxGeometry(2.2, 2.6, 0.2), new THREE.MeshStandardMaterial({ color: 0xFFD79A, emissive: 0xFFC46B, emissiveIntensity: 0.95 }), i * 3.6, 2.6, -6.05));
  const sbTex = (() => {
    const key = 'rs_' + st.en;
    if (TEX[key]) return TEX[key];
    const { c, x } = makeCanvas(1024, 192);
    x.fillStyle = '#7A1F1F'; x.fillRect(0, 0, 1024, 192);
    x.textAlign = 'center'; x.textBaseline = 'middle';
    x.fillStyle = '#FFF3D6'; x.font = `800 64px ${FONT_TAMIL}`; x.fillText(st.tamil, 512, 60);
    x.font = `800 54px ${FONT_COND}`; x.fillText(st.en, 512, 134);
    TEX[key] = canvasTexture(c);
    return TEX[key];
  })();
  bld.add(mesh(new THREE.PlaneGeometry(18, 3.4), new THREE.MeshStandardMaterial({ map: sbTex, roughness: 0.6, emissive: 0xFFFFFF, emissiveMap: sbTex, emissiveIntensity: 0.4 }), 0, 5.0, -6.12));
  return g;
}

/**
 * ICF stainless-steel EMU rake — the Chennai suburban train. Silver body with
 * the red-and-cream band, big open saloon glazing, sliding doors, and a
 * pantograph per motor coach because these run on 25 kV AC overhead.
 */
function buildEMU(cars = 12, { livery = 'suburban' } = {}) {
  railMats();
  const g = new THREE.Group();
  const CAR_LEN = 19.6, CAR_W = 3.15, CAR_H = 3.9, GAP = 0.65;
  const bandCol = livery === 'express' ? 0x1E4E8C : 0xA81C1C;
  const list = [];
  const bB = new GB(), bG = new GB(), bD = new GB(), bS = new GB();
  for (let i = 0; i < cars; i++) {
    const cz = (i - (cars - 1) / 2) * (CAR_LEN + GAP);
    bB.box(CAR_W, CAR_H, CAR_LEN, { pos: [0, CAR_H / 2 + 0.62, cz], color: 0xC8CDD2 });
    for (let r2 = 0; r2 < 5; r2++) bB.box(CAR_W + 0.05, 0.06, CAR_LEN - 0.4, { pos: [0, 1.1 + r2 * 0.72, cz], color: 0xA8AEB4 });
    bB.box(CAR_W + 0.06, 0.42, CAR_LEN - 0.1, { pos: [0, 1.62, cz], color: bandCol });
    bB.box(CAR_W + 0.06, 0.16, CAR_LEN - 0.1, { pos: [0, 1.94, cz], color: 0xF2E7CE });
    bB.box(CAR_W - 0.4, 0.2, CAR_LEN - 0.8, { pos: [0, CAR_H + 0.66, cz], color: 0xAEB4BA });
    for (let v = 0; v < 4; v++) bD.box(1.5, 0.28, 1.0, { pos: [0, CAR_H + 0.82, cz - CAR_LEN / 3 + v * (CAR_LEN / 4.5)], color: 0x24282C });
    bD.box(CAR_W - 0.3, 0.7, CAR_LEN - 1.2, { pos: [0, 0.6, cz], color: 0x24282C });
    for (const bz of [-CAR_LEN / 2 + 3.3, CAR_LEN / 2 - 3.3]) {
      bD.box(2.5, 0.7, 3.1, { pos: [0, 0.62, cz + bz], color: 0x24282C });
      for (const wx of [-1, 1]) for (const wz of [-1.05, 1.05]) {
        bD.cyl(0.5, 0.5, 0.15, 12, { pos: [wx * 0.92, 0.5, cz + bz + wz], rot: [0, 0, PI / 2], color: 0x1E2226 });
      }
    }
    for (const s of [-1, 1]) {
      for (let wI = 0; wI < 7; wI++) {
        const z = cz - CAR_LEN / 2 + 2.4 + wI * ((CAR_LEN - 4.8) / 6);
        bG.box(0.07, 1.3, 1.9, { pos: [s * (CAR_W / 2 + 0.012), 3.0, z], color: 0x0D141A });
        bD.box(0.09, 0.09, 2.0, { pos: [s * (CAR_W / 2 + 0.02), 3.68, z], color: 0x24282C });
      }
      for (const dz of [-CAR_LEN / 2 + 1.1, CAR_LEN / 2 - 1.1]) {
        bD.box(0.08, 2.5, 1.5, { pos: [s * (CAR_W / 2 + 0.012), 2.4, cz + dz], color: 0x9AA0A6 });
      }
      for (let p = 0; p < 11; p++) {
        bS.cyl(0.24, 0.24, 1.2, 5, { pos: [s * (CAR_W / 2 - 0.5), 2.5, cz - CAR_LEN / 2 + 1.8 + p * ((CAR_LEN - 3.6) / 10)], color: 0x0B0F13 });
      }
    }
    /* driving cab at each end of the rake */
    if (i === 0 || i === cars - 1) {
      const dir = i === 0 ? -1 : 1;
      const z = cz + dir * (CAR_LEN / 2);
      bB.box(CAR_W - 0.2, 1.5, 0.9, { pos: [0, 3.0, z + dir * 0.3], color: 0xC8CDD2 });
      bG.box(CAR_W - 0.5, 0.9, 0.12, { pos: [0, 3.2, z + dir * 0.78], color: 0x0D141A });
      g.add(mesh(new THREE.PlaneGeometry(1.5, 0.4), new THREE.MeshStandardMaterial({ color: 0x111111, emissive: 0xFFB347, emissiveIntensity: 1.8 }), 0, 4.05, z + dir * 0.78).rotateY(dir > 0 ? 0 : PI));
    }
    /* pantograph on motor coaches */
    if (i % 3 === 1) {
      const pan = buildPantograph();
      pan.position.set(0, CAR_H + 0.9, cz);
      g.add(pan);
    }
    list.push({ z: cz });
  }
  /* rake-end lights */
  for (const dir of [-1, 1]) {
    const z = dir * ((cars - 1) / 2) * (CAR_LEN + GAP) + dir * (CAR_LEN / 2);
    for (const sx of [-1.05, 1.05]) {
      g.add(mesh(new THREE.BoxGeometry(0.36, 0.24, 0.1), new THREE.MeshStandardMaterial({ color: 0xFFF6E0, emissive: 0xFFF0CC, emissiveIntensity: 4.6 }), sx, 2.0, z + dir * 0.82));
      const gl = glowSprite(0xFFF0CC, 4.6, 0.85); gl.position.set(sx, 2.0, z + dir * 1.2); g.add(gl);
    }
    g.add(mesh(new THREE.BoxGeometry(0.26, 0.26, 0.08), new THREE.MeshStandardMaterial({ color: 0xFF2A2A, emissive: 0xFF2020, emissiveIntensity: 3.6 }), 0, 1.7, z + dir * 0.84));
    const tgl = glowSprite(0xFF2020, 2.6, 0.7); tgl.position.set(0, 1.7, z + dir * 1.1); g.add(tgl);
  }
  g.add(bB.build({ a: RM.steel }, { cast: true }));
  g.add(bG.build({ a: RM.glass }));
  g.add(bD.build({ a: RM.dark }));
  g.add(bS.build({ a: RM.silhouette }));
  g.userData.cars = list;
  g.userData.total = cars * (CAR_LEN + GAP);
  g.userData.CAR_LEN = CAR_LEN;
  return g;
}

function buildPantograph() {
  const g = new THREE.Group();
  const b = new GB();
  const col = 0xB0B7BD;
  b.box(1.7, 0.12, 1.3, { pos: [0, 0.06, 0], color: col });
  b.box(0.1, 2.0, 0.1, { pos: [-0.4, 1.0, 0], rot: [0, 0, 0.36], color: col });
  b.box(0.1, 2.0, 0.1, { pos: [0.4, 1.0, 0], rot: [0, 0, -0.36], color: col });
  b.box(0.09, 1.7, 0.09, { pos: [-0.15, 2.5, 0.3], rot: [0, 0, -0.3], color: col });
  b.box(0.09, 1.7, 0.09, { pos: [0.15, 2.5, -0.3], rot: [0, 0, -0.3], color: col });
  b.box(1.9, 0.08, 0.3, { pos: [0, 3.25, 0], color: col });
  b.box(1.9, 0.06, 0.1, { pos: [0, 3.32, 0.09], color: 0x2A2E32 });
  b.box(1.9, 0.06, 0.1, { pos: [0, 3.32, -0.09], color: 0x2A2E32 });
  for (const sx of [-0.85, 0.85]) b.box(0.08, 0.5, 0.08, { pos: [sx, 3.01, 0], color: col });
  g.add(b.build({ a: RM.steel }, { cast: true }));
  return g;
}

/* ==========================================================================
   3. MRTS — Chennai Beach ↔ Velachery, elevated beside the Buckingham Canal
   ========================================================================== */
function buildMRTS(scene) {
  railMats();
  const g = new THREE.Group();
  const X = 2080;
  const curve = new THREE.CatmullRomCurve3([
    v3(X, 10.4, -1180), v3(X - 16, 10.4, -780), v3(X - 6, 10.4, -380),
    v3(X + 10, 10.4, -60), v3(X + 2, 10.4, 300),
  ], false, 'catmullrom', 0.5);
  const segs = 140;
  const bd = new GB();
  bd.add(ribbonGeometry(curve, 8.2, segs), { color: 0x9AA0A4 });
  for (const s of [-1, 1]) bd.add(verticalRibbon(offsetCurve(curve, s * 4.1, 0), 1.5, segs, -0.6), { color: 0x8C9296 });
  g.add(bd.build({ a: RM.conc }, { cast: true }));
  /* twin circular piers — the MRTS signature */
  const NM = 50;
  const inst = new THREE.InstancedMesh(new THREE.CylinderGeometry(1.05, 1.25, 1, 10), RM.conc, NM * 2);
  const d = new THREE.Object3D();
  let k = 0;
  for (let i = 0; i < NM; i++) {
    const u = (i + 0.5) / NM;
    const p = curve.getPointAt(u);
    for (const s of [-1, 1]) {
      const off = offsetCurve(curve, s * 2.2, 0).getPointAt(u);
      d.position.set(off.x, (p.y - 0.4) / 2, off.z); d.scale.set(1, p.y - 0.4, 1); d.rotation.set(0, 0, 0);
      d.updateMatrix(); inst.setMatrixAt(k++, d.matrix);
    }
  }
  inst.instanceMatrix.needsUpdate = true; inst.frustumCulled = false; inst.castShadow = true;
  g.add(inst);

  /* Chepauk station */
  const stn = new THREE.Group();
  const u2 = 0.44, p2 = curve.getPointAt(u2), t2 = curve.getTangentAt(u2);
  stn.position.set(p2.x, 0, p2.z); stn.rotation.y = Math.atan2(t2.x, t2.z);
  const bs = new GB();
  bs.box(20, 0.5, 78, { pos: [0, 9.6, 0], color: 0x9AA0A4 });
  bs.box(22, 0.4, 80, { pos: [0, 13.2, 0], color: 0x6E7A74 });
  for (let i = -4; i <= 4; i++) bs.cyl(0.4, 0.4, 9.6, 8, { pos: [(i % 2 ? -8.4 : 8.4), 4.8, i * 9], color: 0x9AA0A4 });
  stn.add(bs.build({ a: RM.conc }, { cast: true }));
  const nmTex = (() => {
    if (TEX.mrts_chepauk) return TEX.mrts_chepauk;
    const { c, x } = makeCanvas(768, 128);
    x.fillStyle = '#0E2A3A'; x.fillRect(0, 0, 768, 128);
    x.strokeStyle = '#38BDF8'; x.lineWidth = 5; x.strokeRect(5, 5, 758, 118);
    x.textAlign = 'center'; x.textBaseline = 'middle';
    x.fillStyle = '#FFFFFF'; x.font = `700 44px ${FONT_TAMIL}`; x.fillText('சேப்பாக்கம்', 384, 42);
    x.font = `800 38px ${FONT_COND}`; x.fillText('CHEPAUK · MRTS', 384, 94);
    TEX.mrts_chepauk = canvasTexture(c); return TEX.mrts_chepauk;
  })();
  const nmMat = new THREE.MeshStandardMaterial({ map: nmTex, emissive: 0xFFFFFF, emissiveMap: nmTex, emissiveIntensity: 0.6, side: THREE.DoubleSide });
  for (const sz of [-30, 30]) { const b = mesh(new THREE.PlaneGeometry(14, 2.3), nmMat, 0, 11.6, sz); b.rotation.y = PI / 2; stn.add(b); }
  g.add(stn);

  /* two MRTS rakes */
  const trains = [];
  for (let i = 0; i < 2; i++) {
    const tr = buildMRTSTrain();
    tr.userData = { dir: i ? -1 : 1, offset: i * 0.5, speed: 0.5 };
    g.add(tr); trains.push(tr);
  }
  scene.add(g);
  return { group: g, curve, trains };
}

function buildMRTSTrain() {
  railMats();
  const g = new THREE.Group();
  const CAR_LEN = 18.5, CAR_W = 2.9, CAR_H = 3.4;
  const bb = new GB(), bg = new GB(), bs = new GB();
  for (let i = 0; i < 4; i++) {
    const cz = (i - 1.5) * (CAR_LEN + 0.7);
    bb.box(CAR_W, CAR_H, CAR_LEN, { pos: [0, CAR_H / 2 + 0.6, cz], color: 0xE6EAED });
    bb.box(CAR_W + 0.05, 0.4, CAR_LEN - 0.2, { pos: [0, 1.3, cz], color: 0x1D7A4C });
    bb.box(CAR_W + 0.05, 0.14, CAR_LEN - 0.2, { pos: [0, 1.62, cz], color: 0x1E4E8C });
    for (const s of [-1, 1]) {
      bg.box(0.06, 1.2, CAR_LEN - 4, { pos: [s * (CAR_W / 2 + 0.012), 2.8, cz], color: 0x0D141A });
      for (let p = 0; p < 8; p++) bs.cyl(0.22, 0.22, 1.1, 5, { pos: [s * (CAR_W / 2 - 0.45), 2.4, cz - CAR_LEN / 2 + 2 + p * ((CAR_LEN - 4) / 7)], color: 0x0B0F13 });
    }
    for (const bz of [-CAR_LEN / 2 + 3.2, CAR_LEN / 2 - 3.2]) bb.box(2.3, 0.65, 2.9, { pos: [0, 0.55, cz + bz], color: 0x24282C });
  }
  for (const dir of [-1, 1]) {
    const z = dir * (1.5 * (CAR_LEN + 0.7) + CAR_LEN / 2);
    for (const sx of [-0.9, 0.9]) {
      g.add(mesh(new THREE.BoxGeometry(0.34, 0.22, 0.1), new THREE.MeshStandardMaterial({ color: 0xFFF6E0, emissive: 0xFFF0CC, emissiveIntensity: 4.4 }), sx, 1.9, z + dir * 0.5));
      const gl = glowSprite(0xFFF0CC, 4.0, 0.8); gl.position.set(sx, 1.9, z + dir * 0.8); g.add(gl);
    }
  }
  g.add(bb.build({ a: RM.steel }, { cast: true }));
  g.add(bg.build({ a: RM.glass }));
  g.add(bs.build({ a: RM.silhouette }));
  return g;
}

/* ==========================================================================
   Train motion — every rake is a pure function of the master clock
   ========================================================================== */
function driveTrain(train, curve, u, { yOff = 0, lateral = 0, dir = 1 } = {}) {
  const uu = ((u % 1) + 1) % 1;
  const p = curve.getPointAt(uu);
  const t = curve.getTangentAt(uu);
  const nx = -t.z, nz = t.x, len = Math.hypot(nx, nz) || 1;
  train.position.set(p.x + (nx / len) * lateral, p.y + yOff, p.z + (nz / len) * lateral);
  train.rotation.y = Math.atan2(t.x * dir, t.z * dir);
  return train.position;
}
