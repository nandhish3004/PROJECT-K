/* ============================================================================
   22-city.js · the world above the street
   ----------------------------------------------------------------------------
   Act 3 pulls out to a bird's-eye view of Chennai's road network and Act 5
   ends on a panorama, so the street scene has to sit inside a real city:
   a 3 km procedural block field, the Poonamallee corridor from SIMATS Highway
   (Thandalam) to Porur Roundtana, a lattice cellular mast, the aerial FastAPI
   telephony gateway, the Cooum/Napier Bridge crossing and Chennai Central.
   ========================================================================== */

/* The corridor, in world metres. +X/-Z is north-east toward the city. */
/* Poonamallee High Road (NH 48), west → east, with the real stop sequence.
   +X is east, toward Chennai Central and the Coromandel coast. The street
   set-piece (the shelter, x = 0) IS the SIMATS Highway stop at Ramapuram. */
const CORRIDOR_PTS = [
  { x: -1240, z:  214, name: 'THANDALAM' },
  { x: -1010, z:  168, name: 'POONAMALLEE' },
  { x:  -760, z:  112, name: 'MANGADU' },
  { x:  -520, z:   62, name: 'RAMAPURAM' },
  { x:  -260, z:   22, name: 'SIMATS HIGHWAY' },
  { x:     0, z:    0, name: 'BUS STOP · PICKUP' },
  { x:   210, z:   -8, name: 'PORUR BYPASS' },
  { x:   400, z:  -22, name: 'PORUR ROUNDTANA' },
  { x:   610, z:  -52, name: 'MGR NAGAR' },
  { x:   800, z:  -88, name: 'ALAPAKKAM' },
  { x:  1010, z: -142, name: 'KOYAMBEDU' },
  { x:  1210, z: -206, name: 'AMINJIKARAI' },
  { x:  1380, z: -268, name: 'KILPAUK' },
  { x:  1560, z: -350, name: 'CHENNAI CENTRAL' },
];
const curveOf = (arr, y) => new THREE.CatmullRomCurve3(arr.map(p => v3(p.x, y, p.z)), false, 'catmullrom', 0.4);
const CORRIDOR = curveOf(CORRIDOR_PTS, 0.4);
/* The advertised trip: SIMATS Highway (Thandalam side) → Porur Roundtana. */
const TRIP_PTS = CORRIDOR_PTS.slice(0, 8);
const TRIP = curveOf(TRIP_PTS, 2.2);
const DEPOT = { x: 300, z: 268, name: 'MTC PORUR DEPOT' };
const GRIEVANCE = new THREE.CatmullRomCurve3([
  v3(0, 2.2, 6), v3(66, 3.0, 78), v3(150, 3.6, 168), v3(DEPOT.x, 4.0, DEPOT.z),
], false, 'catmullrom', 0.4);

/* ------------------------------- ribbon geo ------------------------------- */
function ribbonGeometry(curve, width, segments, yOff = 0) {
  const pos = [], uv = [], idx = [];
  const up = new THREE.Vector3(0, 1, 0);
  for (let i = 0; i <= segments; i++) {
    const u = i / segments;
    const p = curve.getPointAt(u);
    const t = curve.getTangentAt(u);
    const side = new THREE.Vector3().crossVectors(t, up).normalize().multiplyScalar(width / 2);
    pos.push(p.x - side.x, p.y + yOff, p.z - side.z);
    pos.push(p.x + side.x, p.y + yOff, p.z + side.z);
    uv.push(0, u * segments * 0.25, 1, u * segments * 0.25);
  }
  for (let i = 0; i < segments; i++) {
    const a = i * 2, b = i * 2 + 1, c = i * 2 + 2, d = i * 2 + 3;
    idx.push(a, c, b, b, c, d);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  g.setIndex(idx);
  g.computeVertexNormals();
  return g;
}

/* ==========================================================================
   Ground haze / volumetric layer for the aerial acts
   ========================================================================== */
function buildGroundHaze(scene) {
  const geo = new THREE.PlaneGeometry(3400, 3400, 1, 1);
  geo.rotateX(-PI / 2);
  const m = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide, fog: false,
    uniforms: {
      uTime: U.time, uAmount: { value: 0 }, uNight: U.night,
      uColA: { value: new THREE.Color(0x1E2A44) }, uColB: { value: new THREE.Color(0xF59E0B) },
      uCam: { value: new THREE.Vector3() },
    },
    vertexShader: `
      varying vec2 vW; varying vec3 vP;
      void main(){
        vec4 wp = modelMatrix * vec4(position,1.0);
        vW = wp.xz; vP = position;
        gl_Position = projectionMatrix * viewMatrix * wp;
      }`,
    fragmentShader: `
      varying vec2 vW; varying vec3 vP;
      uniform float uTime, uAmount, uNight; uniform vec3 uColA, uColB, uCam;
      ${GLSL_COMMON}
      float fbm( vec2 p ){
        float a = 0.0, amp = 0.5;
        for ( int i = 0; i < 5; i ++ ) { a += amp * ( hash21( floor( p ) ) * 0.5 + 0.5 * smoothstep(0.0,1.0,sin(p.x)*0.5+0.5) ); p = p * 2.07 + 13.7; amp *= 0.5; }
        return a;
      }
      void main(){
        float d = length( vW - uCam.xz );
        float near_ = smoothstep( 40.0, 420.0, d );           // no haze right under us
        float far_  = 1.0 - smoothstep( 900.0, 1750.0, d );
        vec2 p = vW * 0.0022 + vec2( uTime * 0.006, uTime * 0.0035 );
        float n = fbm( p ) * 0.72 + fbm( p * 2.7 - uTime * 0.01 ) * 0.28;
        n = smoothstep( 0.34, 0.92, n );
        vec3 col = mix( uColA, uColB, ( 1.0 - uNight ) * 0.85 );
        float a = n * near_ * far_ * uAmount;
        gl_FragColor = vec4( col, a * 0.5 );
      }`,
  });
  const haze = new THREE.Mesh(geo, m);
  haze.position.y = 26;
  haze.renderOrder = 6;
  haze.frustumCulled = false;
  haze.userData.noReflect = true;
  scene.add(haze);
  const haze2 = haze.clone(); haze2.material = m.clone();
  haze2.material.uniforms.uTime = U.time; haze2.material.uniforms.uAmount = m.uniforms.uAmount;
  haze2.position.y = 62; haze2.scale.setScalar(1.25);
  haze2.userData.noReflect = true;
  scene.add(haze2);
  return { haze, haze2, mat: m, mat2: haze2.material, amount: m.uniforms.uAmount };
}

/* ==========================================================================
   City: 3 km block field + ground grid
   ========================================================================== */
function buildCity(scene) {
  const g = new THREE.Group();

  /* ground grid plane */
  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(4200, 4200).rotateX(-PI / 2),
    new THREE.MeshStandardMaterial({ map: TEX.cityGrid, color: 0x8FA0B4, roughness: 0.62, metalness: 0.18, envMapIntensity: 0.7 })
  );
  ground.position.set(180, -0.35, -140);
  ground.receiveShadow = false;
  g.add(ground);

  /* instanced block field */
  const r = rng(777001);
  const COUNT = 1750;
  const geo = new THREE.BoxGeometry(1, 1, 1);
  geo.translate(0, 0.5, 0);
  const matB = new THREE.MeshStandardMaterial({
    map: TEX.windows, color: 0x0C1016, roughness: 0.82, metalness: 0.16,
    emissive: 0xFFC46B, emissiveMap: TEX.windows, emissiveIntensity: 1.5, envMapIntensity: 0.5,
  });
  TEX.windows.repeat.set(2, 3);
  const inst = new THREE.InstancedMesh(geo, matB, COUNT);
  inst.instanceMatrix.setUsage(THREE.StaticDrawUsage);
  const dummy = new THREE.Object3D();
  const cCol = new THREE.Color();
  let n = 0;
  /* keep the street set-piece and the corridor clear of blocks */
  const clearStreet = (x, z) => Math.abs(z - 5) < 40 && Math.abs(x) < 240;
  const clearCorridor = (x, z) => {
    let best = 1e9;
    for (let i = 0; i <= 60; i++) { const p = CORRIDOR.getPointAt(i / 60); const d = Math.hypot(p.x - x, p.z - z); if (d < best) best = d; }
    return best < 34;
  };
  const corridorSamples = [];
  for (let i = 0; i <= 80; i++) corridorSamples.push(CORRIDOR.getPointAt(i / 80));
  const nearCorridor = (x, z) => {
    let best = 1e9;
    for (const p of corridorSamples) { const d = Math.hypot(p.x - x, p.z - z); if (d < best) best = d; }
    return best;
  };
  for (let i = 0; i < COUNT * 3 && n < COUNT; i++) {
    const x = (r() - 0.42) * 2900 + 120;
    const z = (r() - 0.42) * 2900 - 120;
    if (clearStreet(x, z)) continue;
    const dc = nearCorridor(x, z);
    if (dc < 30) continue;
    /* taller toward the city centre (north-east), low-rise out here */
    const central = clamp01(1 - Math.hypot(x - 1000, z + 620) / 1500);
    const h = (5 + r() * 13) * (1 + central * 3.4) * (0.7 + r() * 0.8);
    const w = 14 + r() * 30, d2 = 14 + r() * 30;
    dummy.position.set(x, -0.3, z);
    dummy.scale.set(w, h, d2);
    dummy.rotation.y = (Math.round(r() * 3) * PI) / 2 + (r() - 0.5) * 0.05;
    dummy.updateMatrix();
    inst.setMatrixAt(n, dummy.matrix);
    const warm = r();
    cCol.setHSL(0.06 + warm * 0.06, 0.28 + r() * 0.3, 0.30 + r() * 0.34);
    inst.setColorAt(n, cCol);
    n++;
  }
  inst.count = n;
  inst.instanceMatrix.needsUpdate = true;
  if (inst.instanceColor) inst.instanceColor.needsUpdate = true;
  inst.frustumCulled = false;
  g.add(inst);

  /* arterial road ribbons radiating from the corridor */
  const ribbonMat = new THREE.MeshStandardMaterial({ color: 0x151A20, roughness: 0.55, metalness: 0.2, side: THREE.DoubleSide });
  const arterials = [
    [[-700, 500], [-200, 200], [300, -100], [900, -520], [1300, -820]],
    [[-820, -180], [-300, -60], [240, 120], [700, 380], [1080, 620]],
    [[-160, -780], [-40, -300], [120, 220], [280, 700]],
    [[1500, -260], [900, -120], [300, 40], [-300, 200], [-760, 380]],
  ];
  for (const a of arterials) {
    const c = new THREE.CatmullRomCurve3(a.map(p => v3(p[0], 0.02, p[1])), false, 'catmullrom', 0.4);
    const rib = new THREE.Mesh(ribbonGeometry(c, 26, 90), ribbonMat);
    rib.userData.noReflect = true;
    g.add(rib);
    /* sodium pin-pricks along each arterial */
    const lampGeo = new THREE.PlaneGeometry(3.2, 3.2).rotateX(-PI / 2);
    const lampMat = new THREE.MeshBasicMaterial({ map: TEX.radialSoft, color: C.sodiumHot, transparent: true, opacity: 0.75, blending: THREE.AdditiveBlending, depthWrite: false });
    const cnt = 120;
    const inst2 = new THREE.InstancedMesh(lampGeo, lampMat, cnt);
    for (let i = 0; i < cnt; i++) {
      const p = c.getPointAt(i / (cnt - 1));
      const t = c.getTangentAt(i / (cnt - 1));
      const s = new THREE.Vector3(-t.z, 0, t.x).normalize().multiplyScalar((i % 2 ? 1 : -1) * 14);
      dummy.position.set(p.x + s.x, 0.14, p.z + s.z);
      dummy.rotation.set(0, 0, 0); dummy.scale.set(1, 1, 1);
      dummy.updateMatrix(); inst2.setMatrixAt(i, dummy.matrix);
    }
    inst2.instanceMatrix.needsUpdate = true;
    inst2.userData.noReflect = true;
    g.add(inst2);
  }

  /* the highway itself, laid over the corridor curve */
  const highway = new THREE.Mesh(ribbonGeometry(CORRIDOR, 30, 260, 0.06),
    new THREE.MeshStandardMaterial({ color: 0x12161A, roughness: 0.34, metalness: 0.22, side: THREE.DoubleSide, envMapIntensity: 1.0 }));
  highway.userData.noReflect = true;
  g.add(highway);

  scene.add(g);
  return { group: g, ground, inst, highway };
}

/* ==========================================================================
   Route lane — the amber GTFS spline with a travelling service pulse
   ========================================================================== */
function buildRouteLane(scene) {
  const g = new THREE.Group();
  const laneMat = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide, fog: false,
    uniforms: {
      uTime: U.time, uAmount: { value: 0 }, uHead: { value: 0 },
      uColA: { value: new THREE.Color(C.routeAmber) }, uColB: { value: new THREE.Color(C.sodiumHot) },
    },
    vertexShader: `
      varying vec2 vUvL;
      void main(){ vUvL = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
    fragmentShader: `
      varying vec2 vUvL;
      uniform float uTime, uAmount, uHead; uniform vec3 uColA, uColB;
      void main(){
        float across = 1.0 - abs( vUvL.x - 0.5 ) * 2.0;
        float edge = smoothstep( 0.0, 0.35, across );
        float core = pow( across, 6.0 );
        /* packets of light travelling the corridor */
        float flow = fract( vUvL.y * 6.0 - uTime * 0.42 );
        float packet = pow( 1.0 - abs( flow - 0.5 ) * 2.0, 7.0 );
        /* reveal wipe following the camera's inspection of the lane */
        float reveal = smoothstep( uHead + 0.06, uHead - 0.02, vUvL.y );
        float head = exp( -pow( ( vUvL.y - uHead ) * 26.0, 2.0 ) );
        float a = ( edge * 0.34 + core * 0.85 + packet * 0.5 + head * 1.2 ) * reveal * uAmount;
        vec3 col = mix( uColA, uColB, core + packet * 0.7 + head );
        gl_FragColor = vec4( col, clamp( a, 0.0, 1.0 ) );
      }`,
  });
  const ribbon = new THREE.Mesh(ribbonGeometry(TRIP, 9.5, 240), laneMat);
  g.add(ribbon);

  /* solid tube spine so the lane reads as geometry from any angle */
  const tubeMat = new THREE.MeshBasicMaterial({ color: C.routeAmber, transparent: true, opacity: 0.0, blending: THREE.AdditiveBlending, depthWrite: false, fog: false });
  const tube = new THREE.Mesh(new THREE.TubeGeometry(TRIP, 240, 0.42, 8, false), tubeMat);
  g.add(tube);

  /* stop markers along the trip */
  const stops = [];
  const stopGeo = new THREE.CylinderGeometry(2.6, 2.6, 0.5, 20, 1, true);
  const stopMat = new THREE.MeshBasicMaterial({ color: C.sodiumHot, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, side: THREE.DoubleSide, depthWrite: false, fog: false });
  const names = ['SIMATS HIGHWAY', 'RAMAPURAM JCT', 'ALAPAKKAM', 'PICKUP · BUS STOP', 'PORUR BYPASS', 'MGR NAGAR', 'PORUR ROUNDTANA'];
  for (let i = 0; i < TRIP_PTS.length; i++) {
    const p = TRIP.getPointAt(i / (TRIP_PTS.length - 1));
    const ring = new THREE.Mesh(stopGeo, stopMat.clone());
    ring.position.set(p.x, 0.6, p.z);
    g.add(ring);
    stops.push({ ring, name: names[i], p: p.clone(), u: i / (TRIP_PTS.length - 1) });
  }
  scene.add(g);
  return { group: g, ribbon, laneMat, tube, tubeMat, stops };
}

/* ==========================================================================
   Grievance lane — deterministic branch off the corridor into a depot queue
   ========================================================================== */
function buildGrievanceLane(scene) {
  const g = new THREE.Group();
  const mat2 = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide, fog: false,
    uniforms: { uTime: U.time, uAmount: { value: 0 }, uCol: { value: new THREE.Color(C.grievance) }, uCol2: { value: new THREE.Color(0x38BDF8) } },
    vertexShader: `varying vec2 vUvL; void main(){ vUvL = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
    fragmentShader: `
      varying vec2 vUvL; uniform float uTime, uAmount; uniform vec3 uCol, uCol2;
      void main(){
        float across = 1.0 - abs( vUvL.x - 0.5 ) * 2.0;
        float dash = step( 0.42, fract( vUvL.y * 26.0 - uTime * 0.5 ) );
        float flow = pow( 1.0 - abs( fract( vUvL.y * 3.0 - uTime * 0.3 ) - 0.5 ) * 2.0, 6.0 );
        float a = ( smoothstep(0.0,0.4,across) * 0.34 * dash + flow * 0.8 + pow(across,7.0) * 0.7 ) * uAmount;
        gl_FragColor = vec4( mix( uCol, uCol2, flow ), clamp(a,0.0,1.0) );
      }`,
  });
  const ribbon = new THREE.Mesh(ribbonGeometry(GRIEVANCE, 6.5, 120), mat2);
  g.add(ribbon);

  /* depot queue node */
  const depot = new THREE.Group(); depot.position.set(DEPOT.x, 0, DEPOT.z); g.add(depot);
  const padMat = new THREE.MeshBasicMaterial({ color: C.grievance, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false, fog: false });
  const pad = new THREE.Mesh(new THREE.RingGeometry(6, 15, 40, 1).rotateX(-PI / 2), padMat);
  pad.position.y = 1.2; depot.add(pad);
  const pad2 = new THREE.Mesh(new THREE.RingGeometry(16, 18, 40, 1).rotateX(-PI / 2), padMat.clone());
  pad2.position.y = 1.2; depot.add(pad2);
  /* queue columns */
  const cols = [];
  for (let i = 0; i < 5; i++) {
    const a = (i / 5) * TAU;
    const col = new THREE.Mesh(new THREE.BoxGeometry(2.2, 1, 2.2), new THREE.MeshBasicMaterial({
      color: i % 2 ? C.grievance : 0x38BDF8, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false, fog: false,
    }));
    col.position.set(Math.cos(a) * 9.5, 2, Math.sin(a) * 9.5);
    depot.add(col); cols.push(col);
  }
  /* grievance tickets travelling the branch */
  const tickets = [];
  for (let i = 0; i < 4; i++) {
    const t = makeTicketCard(i);
    t.visible = false; g.add(t); tickets.push(t);
  }
  scene.add(g);
  return { group: g, ribbon, mat: mat2, depot, pad, pad2, cols, tickets };
}

function makeTicketCard(i) {
  const items = [
    ['GRV-4471', 'PAYMENT DEDUCTED', '₹18 · NO TICKET ISSUED', 'LOGGED → DEPOT QUEUE'],
    ['GRV-4472', 'STOP SKIPPED', 'BUS 54E · ALAPAKKAM', 'LOGGED → DEPOT QUEUE'],
    ['GRV-4473', 'FREQUENCY MISS', 'HEADWAY > 22 MIN', 'LOGGED → CONTROL ROOM'],
    ['GRV-4474', 'PASS NOT HONOURED', 'CONDUCTOR DISPUTE', 'LOGGED → DEPOT QUEUE'],
  ];
  const [ref, title, sub, act] = items[i % items.length];
  const { c, x } = makeCanvas(512, 224);
  x.fillStyle = 'rgba(10,8,12,0.82)'; rr(x, 0, 0, 512, 224, 18); x.fill();
  x.strokeStyle = 'rgba(239,68,68,0.95)'; x.lineWidth = 5; rr(x, 3, 3, 506, 218, 16); x.stroke();
  x.fillStyle = '#EF4444'; rr(x, 18, 18, 148, 40, 8); x.fill();
  x.fillStyle = '#FFE9E9'; x.font = `700 26px ${FONT_MONO}`; x.textBaseline = 'middle';
  x.fillText(ref, 30, 39);
  x.fillStyle = '#FFF1F1'; x.font = `800 34px ${FONT_COND}`; x.fillText(title, 18, 92);
  x.fillStyle = 'rgba(255,220,220,0.82)'; x.font = `600 24px ${FONT_MONO}`; x.fillText(sub, 18, 132);
  x.fillStyle = '#38BDF8'; x.font = `700 24px ${FONT_MONO}`; x.fillText(act, 18, 182);
  x.fillStyle = 'rgba(56,189,248,0.9)'; x.beginPath(); x.arc(470, 182, 9, 0, TAU); x.fill();
  const tex = canvasTexture(c);
  const m = new THREE.Mesh(new THREE.PlaneGeometry(9.2, 4.0),
    new THREE.MeshBasicMaterial({ map: tex, transparent: true, opacity: 0, depthWrite: false, side: THREE.DoubleSide, fog: false }));
  m.userData = { tex };
  return m;
}

/* ==========================================================================
   Cellular mast — where the 8 kHz voice leaves the street
   ========================================================================== */
function buildTower() {
  const g = new THREE.Group();
  const H = 46;
  const steel = mat(0x4A5158, { metal: 0.86, rough: 0.42, flat: false });
  const steelDark = mat(0x2C3238, { metal: 0.8, rough: 0.5, flat: false });

  /* three legs, tapering */
  const legs = [];
  for (let i = 0; i < 3; i++) {
    const a = (i / 3) * TAU + PI / 6;
    const pts = [];
    for (let s = 0; s <= 12; s++) {
      const u = s / 12;
      const rad = lerp(4.6, 1.05, Math.pow(u, 0.82));
      pts.push(v3(Math.cos(a) * rad, u * H, Math.sin(a) * rad));
    }
    const leg = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 40, 0.22, 7, false), steel);
    leg.castShadow = true; g.add(leg); legs.push(pts);
  }
  /* horizontal rings + diagonal bracing */
  const RINGS = 11;
  for (let r = 1; r <= RINGS; r++) {
    const u = r / RINGS;
    const y = u * H;
    const rad = lerp(4.6, 1.05, Math.pow(u, 0.82));
    const ring = new THREE.Mesh(new THREE.TorusGeometry(rad, 0.09, 6, 26), steelDark);
    ring.rotation.x = PI / 2; ring.position.y = y; g.add(ring);
    for (let i = 0; i < 3; i++) {
      const a0 = (i / 3) * TAU + PI / 6, a1 = ((i + 1) / 3) * TAU + PI / 6;
      const rad0 = lerp(4.6, 1.05, Math.pow((r - 1) / RINGS, 0.82));
      const y0 = ((r - 1) / RINGS) * H;
      const p0 = v3(Math.cos(a0) * rad0, y0, Math.sin(a0) * rad0);
      const p1 = v3(Math.cos(a1) * rad, y, Math.sin(a1) * rad);
      const mid = v3().addVectors(p0, p1).multiplyScalar(0.5);
      const len = p0.distanceTo(p1);
      const br = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, len, 5), steelDark);
      br.position.copy(mid);
      br.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), v3().subVectors(p1, p0).normalize());
      g.add(br);
    }
  }
  /* antenna panels + microwave drums */
  const panels = [];
  for (let i = 0; i < 3; i++) {
    const a = (i / 3) * TAU;
    const p = new THREE.Group();
    p.position.set(Math.cos(a) * 1.5, H - 3.4, Math.sin(a) * 1.5);
    p.rotation.y = -a;
    p.add(mesh(new THREE.BoxGeometry(0.42, 3.1, 0.22), mat(0xD8DDE2, { rough: 0.55, metal: 0.1, flat: false }), 0, 0, 0, true));
    p.add(mesh(new THREE.BoxGeometry(0.46, 0.16, 0.3), steelDark, 0, 1.6, 0, true));
    p.add(mesh(new THREE.BoxGeometry(0.46, 0.16, 0.3), steelDark, 0, -1.6, 0, true));
    g.add(p); panels.push(p);
  }
  for (let i = 0; i < 2; i++) {
    const a = (i / 2) * TAU + 1.1;
    const drum = mesh(new THREE.CylinderGeometry(0.95, 0.95, 0.5, 16), mat(0xB9BEC4, { metal: 0.55, rough: 0.45, flat: false }), Math.cos(a) * 1.9, H - 7.6, Math.sin(a) * 1.9, true);
    drum.rotation.set(PI / 2, 0, -a);
    g.add(drum);
  }
  /* aviation beacons */
  const beacons = [];
  for (const y of [H * 0.5, H * 0.78, H - 0.4]) {
    const b = mesh(new THREE.SphereGeometry(0.22, 10, 8), new THREE.MeshStandardMaterial({ color: 0xFF2A2A, emissive: 0xFF2020, emissiveIntensity: 4 }), 0, y, 0);
    g.add(b);
    const gl = glowSprite(0xFF3B30, 3.4, 0.8); gl.position.set(0, y, 0); g.add(gl);
    beacons.push({ mesh: b, glow: gl, phase: y });
  }
  /* equipment hut + fence */
  const hut = mesh(new THREE.BoxGeometry(5.2, 2.6, 3.4), mat(0x9AA0A6, { metal: 0.3, rough: 0.62, flat: false, map: TEX.concrete }), 6.6, 1.3, 1.2, true, true);
  g.add(hut);
  g.add(mesh(new THREE.BoxGeometry(5.4, 0.24, 3.6), mat(0x5A6167, { metal: 0.5, rough: 0.5 }), 6.6, 2.72, 1.2, true));
  const fenceMat = new THREE.MeshStandardMaterial({ color: 0x3A4046, metalness: 0.7, roughness: 0.5, wireframe: true });
  const fence = mesh(new THREE.BoxGeometry(16, 2.4, 16), fenceMat, 0, 1.2, 0);
  g.add(fence);
  /* A small sodium floodlight on the compound. Its only visible work is the
     warm patch it lays on the yard, so skip the light and paint the patch. */
  { const fl = lightPool(0xF59E0B, 9, 0.42); fl.position.set(4, 0.06, 4); g.add(fl); }
  const hutGlow = glowSprite(C.sodium, 3.0, 0.4); hutGlow.position.set(4, 6, 4); g.add(hutGlow);

  /* radio wavefronts: expanding shells that fire while the call is live */
  const waves = [];
  for (let i = 0; i < 4; i++) {
    const w = new THREE.Mesh(new THREE.SphereGeometry(1, 26, 16), new THREE.ShaderMaterial({
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.BackSide, fog: false,
      uniforms: { uP: { value: 0 }, uCol: { value: new THREE.Color(C.sodium) }, uAmt: { value: 0 } },
      vertexShader: `varying vec3 vN; void main(){ vN = normalize(normalMatrix * normal); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
      fragmentShader: `varying vec3 vN; uniform float uP, uAmt; uniform vec3 uCol;
        void main(){ float f = pow( 1.0 - abs( dot( vN, vec3(0.0,0.0,1.0) ) ), 2.0 ); gl_FragColor = vec4( uCol, f * uAmt * 0.5 * (1.0-uP) ); }`,
    }));
    w.position.set(0, H - 4, 0);
    w.visible = false;
    g.add(w); waves.push(w);
  }
  g.userData = { H, beacons, panels, waves, top: v3(0, H - 3.4, 0) };
  return g;
}

/* ==========================================================================
   Aerial cloud node — "FastAPI Telephony Gateway (8kHz PCM Stream)"
   ========================================================================== */
function buildCloudNode() {
  const g = new THREE.Group();

  /* holographic platform rings */
  const ringMat = new THREE.MeshBasicMaterial({ color: C.cyan, transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide, fog: false });
  const rings = [];
  for (let i = 0; i < 3; i++) {
    const r = new THREE.Mesh(new THREE.RingGeometry(9 + i * 4.2, 9.5 + i * 4.2, 64).rotateX(-PI / 2), ringMat.clone());
    r.material.opacity = 0.42 - i * 0.1;
    g.add(r); rings.push(r);
  }
  const disc = new THREE.Mesh(new THREE.CircleGeometry(9, 48).rotateX(-PI / 2),
    new THREE.MeshBasicMaterial({ color: 0x0B1B2E, transparent: true, opacity: 0.55, depthWrite: false, fog: false }));
  disc.position.y = -0.06; g.add(disc);

  /* server rack cluster */
  const rackMat = new THREE.MeshStandardMaterial({ color: 0x11161C, roughness: 0.4, metalness: 0.72, envMapIntensity: 1.4 });
  const racks = [];
  for (let i = 0; i < 5; i++) {
    const a = (i / 5) * TAU + 0.4;
    const rk = new THREE.Group();
    rk.position.set(Math.cos(a) * 5.4, 0, Math.sin(a) * 5.4);
    rk.rotation.y = -a + PI / 2;
    rk.userData.a0 = rk.rotation.y;          // rest yaw, so the sway is additive
    rk.add(mesh(new THREE.BoxGeometry(2.4, 5.2, 1.3), rackMat, 0, 2.6, 0, true));
    /* blinking unit LEDs */
    for (let u = 0; u < 9; u++) {
      const led = mesh(new THREE.BoxGeometry(1.9, 0.09, 0.04), new THREE.MeshBasicMaterial({
        color: u % 3 === 0 ? 0x38BDF8 : (u % 3 === 1 ? C.sodiumHot : 0x22C55E), transparent: true, opacity: 0.9, fog: false,
      }), 0, 0.7 + u * 0.52, -0.67);
      rk.add(led); rk.userData['led' + u] = led;
    }
    g.add(rk); racks.push(rk);
  }

  /* the label panel */
  const label = (() => {
    const { c, x } = makeCanvas(1024, 256);
    x.fillStyle = 'rgba(6,16,28,0.78)'; rr(x, 0, 0, 1024, 256, 26); x.fill();
    x.strokeStyle = 'rgba(56,189,248,0.95)'; x.lineWidth = 5; rr(x, 4, 4, 1016, 248, 24); x.stroke();
    x.textBaseline = 'middle'; x.textAlign = 'center';
    x.fillStyle = '#38BDF8'; x.font = `800 30px ${FONT_MONO}`;
    x.fillText('AERIAL EDGE NODE · COROMANDEL REGION', 512, 46);
    x.fillStyle = '#EAF6FF'; x.font = `800 62px ${FONT_COND}`;
    x.fillText('FastAPI Telephony Gateway', 512, 112);
    x.fillStyle = '#F59E0B'; x.font = `700 44px ${FONT_MONO}`;
    x.fillText('( 8 kHz PCM STREAM )', 512, 172);
    x.fillStyle = 'rgba(190,225,250,0.72)'; x.font = `600 26px ${FONT_MONO}`;
    x.fillText('SIP · RTP G.711 μ-law · WHISPER ASR · GTFS LOOKUP · SMS GATEWAY', 512, 222);
    return canvasTexture(c);
  })();
  const panel = new THREE.Mesh(new THREE.PlaneGeometry(26, 6.5),
    new THREE.MeshBasicMaterial({ map: label, transparent: true, opacity: 0, depthWrite: false, side: THREE.DoubleSide, fog: false }));
  panel.position.set(0, 11.5, 0);
  g.add(panel);

  /* live 8 kHz PCM trace — redrawn every frame while the call is up */
  const pcm = makeCanvas(512, 128);
  const pcmTex = canvasTexture(pcm.c, { srgb: true });
  const scope = new THREE.Mesh(new THREE.PlaneGeometry(15, 3.75),
    new THREE.MeshBasicMaterial({ map: pcmTex, transparent: true, opacity: 0, depthWrite: false, side: THREE.DoubleSide, fog: false }));
  scope.position.set(0, 6.4, 0.02);
  g.add(scope);

  /* cloud shell */
  const shell = new THREE.Mesh(new THREE.IcosahedronGeometry(15, 2), new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide, fog: false,
    uniforms: { uTime: U.time, uAmt: { value: 0 }, uCol: { value: new THREE.Color(0x38BDF8) } },
    vertexShader: `varying vec3 vN; varying vec3 vP; void main(){ vN = normalize(normalMatrix*normal); vP = position; gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.0); }`,
    fragmentShader: `varying vec3 vN; varying vec3 vP; uniform float uTime, uAmt; uniform vec3 uCol;
      ${GLSL_COMMON}
      void main(){
        float wire = smoothstep( 0.86, 1.0, abs( sin( vP.x * 0.9 ) ) * abs( sin( vP.y * 0.9 ) ) * abs( sin( vP.z * 0.9 ) ) );
        float fres = pow( 1.0 - abs( dot( vN, vec3(0.0,0.0,1.0) ) ), 3.0 );
        float a = ( fres * 0.20 + wire * 0.16 ) * uAmt;
        gl_FragColor = vec4( uCol, a );
      }`,
  }));
  shell.position.y = 6; g.add(shell);

  /* orbiting data motes */
  const MN = 260;
  const mp = new Float32Array(MN * 3), ms = new Float32Array(MN * 2);
  for (let i = 0; i < MN; i++) {
    const a = hash1(i) * TAU, rr2 = 6 + hash1(i + 3) * 14, yy = (hash1(i + 7) - 0.3) * 16;
    mp[i * 3] = Math.cos(a) * rr2; mp[i * 3 + 1] = yy; mp[i * 3 + 2] = Math.sin(a) * rr2;
    ms[i * 2] = hash1(i + 11); ms[i * 2 + 1] = 0.3 + hash1(i + 13) * 0.9;
  }
  const mgeo = new THREE.BufferGeometry();
  mgeo.setAttribute('position', new THREE.BufferAttribute(mp, 3));
  mgeo.setAttribute('aSeed', new THREE.BufferAttribute(ms, 2));
  const mmat = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, fog: false,
    uniforms: { uTime: U.time, uAmt: { value: 0 } },
    vertexShader: `
      attribute vec2 aSeed; uniform float uTime, uAmt; varying float vA;
      void main(){
        float a = uTime * ( 0.14 + aSeed.y * 0.3 ) + aSeed.x * 6.283;
        float r = length( position.xz );
        vec3 p = vec3( cos(a) * r, position.y + sin( uTime * 0.6 + aSeed.x * 9.0 ) * 0.9, sin(a) * r );
        vA = uAmt * ( 0.35 + 0.65 * abs( sin( uTime * 1.6 + aSeed.x * 20.0 ) ) );
        vec4 mv = modelViewMatrix * vec4( p, 1.0 );
        gl_PointSize = clamp( 150.0 / -mv.z, 1.0, 9.0 );
        gl_Position = projectionMatrix * mv;
      }`,
    fragmentShader: `varying float vA; void main(){ float d = length(gl_PointCoord-0.5); gl_FragColor = vec4( mix(vec3(0.22,0.74,0.97), vec3(1.0,0.76,0.42), d), smoothstep(0.5,0.0,d) * vA ); }`,
  });
  const motes = new THREE.Points(mgeo, mmot0());
  function mmot0() { return mmat; }
  motes.frustumCulled = false; g.add(motes);

  /* uplink beam from the mast top into the node */
  const beamMat = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide, fog: false,
    uniforms: { uTime: U.time, uAmt: { value: 0 }, uCol: { value: new THREE.Color(C.sodiumHot) } },
    vertexShader: `varying vec2 vUvB; void main(){ vUvB = uv; gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.0); }`,
    fragmentShader: `
      varying vec2 vUvB; uniform float uTime, uAmt; uniform vec3 uCol;
      void main(){
        float across = 1.0 - abs( vUvB.x - 0.5 ) * 2.0;
        float core = pow( across, 3.0 );
        float pkt = pow( 1.0 - abs( fract( vUvB.y * 5.0 - uTime * 0.9 ) - 0.5 ) * 2.0, 9.0 );
        gl_FragColor = vec4( uCol, ( core * 0.26 + pkt * 0.95 ) * uAmt );
      }`,
  });
  const beamLen = 44;
  const beam = new THREE.Mesh(new THREE.CylinderGeometry(1.5, 3.4, beamLen, 20, 1, true), beamMat);
  beam.position.y = -beamLen / 2 - 3;
  g.add(beam);

  /* drawPCM() expects one object carrying the canvas, its 2D context and the
     texture it has to invalidate -- keep those together rather than making
     the caller stitch them up every frame. */
  g.userData = { panel, scope, pcm: { c: pcm.c, x: pcm.x, tex: pcmTex }, pcmTex,
                 rings, racks, shell, motes, beam, beamMat, label };
  return g;
}

/** Redraw the 8 kHz PCM oscilloscope — band-limited, so it looks like telephony. */
function drawPCM(pcmCtx, t, active, level = 1) {
  const w = pcmCtx.c.width, h = pcmCtx.c.height, x = pcmCtx.x;
  x.fillStyle = 'rgba(4,12,20,0.92)'; x.fillRect(0, 0, w, h);
  x.strokeStyle = 'rgba(56,189,248,0.16)'; x.lineWidth = 1;
  for (let i = 1; i < 8; i++) { x.beginPath(); x.moveTo((w / 8) * i, 0); x.lineTo((w / 8) * i, h); x.stroke(); }
  for (let i = 1; i < 4; i++) { x.beginPath(); x.moveTo(0, (h / 4) * i); x.lineTo(w, (h / 4) * i); x.stroke(); }
  /* 8 kHz sampling: 512 samples ≈ 64 ms of narrow-band speech */
  x.strokeStyle = active ? '#84CC16' : 'rgba(132,204,22,0.35)';
  x.lineWidth = 2; x.beginPath();
  const N = 256;
  for (let i = 0; i <= N; i++) {
    const u = i / N;
    let s = 0;
    if (active) {
      /* band-limited: only low harmonics survive 300–3400 Hz */
      s = Math.sin(u * 26 + t * 22) * 0.42 + Math.sin(u * 61 - t * 31) * 0.24
        + Math.sin(u * 113 + t * 47) * 0.11 + fbm1(u * 9 + t * 3.2, 3) * 0.30;
      s *= (0.55 + 0.45 * Math.sin(t * 5.1 + u * 2.2)) * level;
    } else {
      s = fbm1(u * 6 + t * 0.7, 2) * 0.06;
    }
    const X = u * w, Y = h / 2 - s * (h * 0.40);
    i ? x.lineTo(X, Y) : x.moveTo(X, Y);
  }
  x.stroke();
  if (active) { x.shadowColor = '#84CC16'; x.shadowBlur = 10; x.stroke(); x.shadowBlur = 0; }
  x.fillStyle = 'rgba(132,204,22,0.9)'; x.font = `700 15px ${FONT_MONO}`;
  x.fillText('fs = 8000 Hz · G.711 μ-law · 64 kbit/s', 10, 20);
  x.fillStyle = active ? 'rgba(255,120,80,0.95)' : 'rgba(120,140,150,0.6)';
  x.beginPath(); x.arc(w - 16, 15, 5, 0, TAU); x.fill();
  x.fillStyle = 'rgba(200,225,240,0.7)'; x.textAlign = 'right';
  x.fillText(active ? 'STREAM ACTIVE' : 'IDLE', w - 28, 20);
  x.textAlign = 'left';
  pcmCtx.tex.needsUpdate = true;
}

/* ==========================================================================
   Act 5 landmarks — Napier Bridge over the Cooum, and Chennai Central
   ========================================================================== */
function buildLandmarks(scene) {
  const g = new THREE.Group();
  const brick = mat(0x4A2A22, { rough: 0.92, flat: false });
  const conc = mat(0x3B3F44, { rough: 0.88, metal: 0.06, flat: false });

  /* ------------------------------- river -------------------------------- */
  const river = new THREE.Mesh(new THREE.PlaneGeometry(130, 2100).rotateX(-PI / 2),
    new THREE.MeshStandardMaterial({ color: 0x0A1219, roughness: 0.06, metalness: 0.42, envMapIntensity: 1.5 }));
  river.position.set(1810, 0.1, -330);
  river.rotation.y = PI / 2;
  river.userData.noReflect = true;
  g.add(river);

  /* ---------------------------- Napier Bridge --------------------------- */
  const bridge = new THREE.Group();
  bridge.position.set(1810, 0, -300);
  bridge.rotation.y = PI / 2;
  const LEN = 260, DECK_Y = 13;
  const deck = mesh(new THREE.BoxGeometry(LEN, 1.6, 17), conc, 0, DECK_Y, 0, true);
  bridge.add(deck);
  bridge.add(mesh(new THREE.BoxGeometry(LEN, 0.9, 18.4), conc, 0, DECK_Y - 1.1, 0, true));
  /* arches */
  for (let i = 0; i < 6; i++) {
    const x = -LEN / 2 + 24 + i * ((LEN - 48) / 5);
    const arch = new THREE.Mesh(new THREE.TorusGeometry(15, 1.5, 8, 26, PI), conc);
    arch.position.set(x, DECK_Y - 2.4, 0);
    arch.rotation.z = PI;
    arch.scale.z = 1.6;
    bridge.add(arch);
    if (i < 5) bridge.add(mesh(new THREE.BoxGeometry(3.4, DECK_Y, 15), conc, x + (LEN - 48) / 10, DECK_Y / 2, 0, true));
  }
  /* parapet + the bridge's famous lamp standards */
  for (const sz of [-8.6, 8.6]) bridge.add(mesh(new THREE.BoxGeometry(LEN, 1.5, 0.6), conc, 0, DECK_Y + 1.5, sz, true));
  for (let i = 0; i <= 14; i++) {
    const x = -LEN / 2 + 8 + i * ((LEN - 16) / 14);
    for (const sz of [-8.6, 8.6]) {
      const p = mesh(new THREE.CylinderGeometry(0.16, 0.22, 4.2, 6), conc, x, DECK_Y + 3.6, sz, true);
      bridge.add(p);
      const lm = mesh(new THREE.SphereGeometry(0.36, 8, 6), new THREE.MeshStandardMaterial({ color: 0xFFF0CC, emissive: 0xFFC24A, emissiveIntensity: 2.4 }), x, DECK_Y + 5.9, sz);
      bridge.add(lm);
      const gl = glowSprite(C.sodiumHot, 5.2, 0.5); gl.position.set(x, DECK_Y + 5.9, sz); bridge.add(gl);
    }
  }
  g.add(bridge);

  /* ---------------------------- Chennai Central -------------------------- */
  const central = new THREE.Group();
  central.position.set(1580, 0, -420);
  central.rotation.y = -0.36;
  const facade = mesh(new THREE.BoxGeometry(190, 26, 40), brick, 0, 13, 0, true);
  central.add(facade);
  /* arcaded bays */
  for (let i = 0; i < 16; i++) {
    const x = -85 + i * (170 / 15);
    const bay = mesh(new THREE.PlaneGeometry(6.4, 12), new THREE.MeshStandardMaterial({ color: 0xFFC46B, emissive: 0xFFB347, emissiveIntensity: 0.85, roughness: 0.7 }), x, 8, -20.2);
    bay.rotation.y = PI; central.add(bay);
  }
  /* clock tower */
  const tower = mesh(new THREE.BoxGeometry(26, 62, 26), brick, 0, 31, 0, true);
  central.add(tower);
  central.add(mesh(new THREE.BoxGeometry(29, 3, 29), conc, 0, 63, 0, true));
  const spire = mesh(new THREE.ConeGeometry(15, 20, 4), conc, 0, 74, 0, true);
  spire.rotation.y = PI / 4; central.add(spire);
  for (let i = 0; i < 4; i++) {
    const a = (i / 4) * TAU;
    const clock = mesh(new THREE.CircleGeometry(5.4, 24), new THREE.MeshStandardMaterial({ color: 0xFFF3D6, emissive: 0xFFE0A0, emissiveIntensity: 1.5 }), Math.cos(a) * 13.2, 52, Math.sin(a) * 13.2);
    clock.rotation.y = -a + PI / 2;
    central.add(clock);
    central.add(mesh(new THREE.BoxGeometry(0.5, 4.4, 0.3), mat(0x22282C, { rough: 0.6 }), Math.cos(a) * 13.5, 53.1, Math.sin(a) * 13.5).rotateY(-a));
  }
  /* corner turrets with domes */
  for (const sx of [-1, 1]) {
    const t2 = mesh(new THREE.BoxGeometry(15, 36, 15), brick, sx * 88, 18, 0, true);
    central.add(t2);
    const dome = mesh(new THREE.SphereGeometry(9, 16, 10, 0, TAU, 0, PI / 2), conc, sx * 88, 36, 0, true);
    central.add(dome);
    central.add(mesh(new THREE.ConeGeometry(1.6, 8, 8), conc, sx * 88, 47, 0, true));
  }
  /* floodlit warm wash */
  /* The floodlit dome wash, 40 m up over a 380 m range: it cannot resolve as a
     light on anything the camera ever gets near, but the warm glow it leaves on
     the concourse sells the whole skyline. Cheap pool instead of a real lamp. */
  { const wash = lightPool(0xFFB45C, 46, 0.30); wash.position.set(0, 0.1, -70); central.add(wash); }
  g.add(central);

  /* ------------------------------ the sea -------------------------------- */
  const sea = new THREE.Mesh(new THREE.PlaneGeometry(3600, 2600).rotateX(-PI / 2),
    new THREE.MeshStandardMaterial({ color: 0x071018, roughness: 0.12, metalness: 0.5, envMapIntensity: 1.7 }));
  sea.position.set(3100, 0.3, -260);
  sea.userData.noReflect = true;
  g.add(sea);
  /* surf line */
  const surf = new THREE.Mesh(new THREE.PlaneGeometry(2600, 26).rotateX(-PI / 2),
    new THREE.MeshBasicMaterial({ map: TEX.radialSoft, color: 0xCFE6F5, transparent: true, opacity: 0.16, blending: THREE.AdditiveBlending, depthWrite: false }));
  surf.position.set(2240, 0.45, -260); surf.rotation.y = PI / 2;
  surf.userData.noReflect = true;
  g.add(surf);

  /* distant skyline silhouette strip so the horizon is never empty */
  const skyStrip = new THREE.Mesh(new THREE.PlaneGeometry(5200, 220),
    new THREE.MeshBasicMaterial({ map: TEX.skylineStrip || (TEX.skylineStrip = makeSkylineStrip()), transparent: true, opacity: 0.85, depthWrite: false, fog: true }));
  skyStrip.position.set(1400, 112, -2200);
  skyStrip.userData.noReflect = true;
  g.add(skyStrip);

  scene.add(g);
  return { group: g, bridge, central, river, sea };
}
function makeSkylineStrip(w = 2048, h = 256) {
  const { c, x } = makeCanvas(w, h);
  x.clearRect(0, 0, w, h);
  const r = rng(4242);
  let X = 0;
  while (X < w) {
    const bw = 14 + r() * 66, bh = 22 + r() * 210;
    x.fillStyle = `rgba(9,12,20,${0.72 + r() * 0.28})`;
    x.fillRect(X, h - bh, bw, bh);
    if (r() < 0.22) { x.fillRect(X + bw * 0.36, h - bh - 16 - r() * 34, bw * 0.28, 40); }
    /* a handful of lit windows */
    for (let s = 0; s < 12; s++) {
      if (r() < 0.55) continue;
      x.fillStyle = `rgba(255,${170 + r() * 70 | 0},${90 + r() * 80 | 0},${0.25 + r() * 0.5})`;
      x.fillRect(X + 3 + r() * (bw - 7), h - bh + 4 + r() * (bh - 10), 2.4, 2.4);
    }
    X += bw + 2 + r() * 12;
  }
  return canvasTexture(c, { srgb: true });
}

/* ==========================================================================
   Acoustic ripples — 8 kHz voice leaving the handset microphone
   ========================================================================== */
function buildAcousticRipples(scene) {
  const g = new THREE.Group();
  const rings = [];
  for (let i = 0; i < 7; i++) {
    const m = new THREE.ShaderMaterial({
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide, fog: false,
      uniforms: { uP: { value: 0 }, uAmt: { value: 0 }, uCol: { value: new THREE.Color(C.sodium) } },
      vertexShader: `varying vec2 vUvR; void main(){ vUvR = uv; gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.0); }`,
      fragmentShader: `
        varying vec2 vUvR; uniform float uP, uAmt; uniform vec3 uCol;
        void main(){
          float d = abs( length( vUvR - 0.5 ) * 2.0 - uP );
          float band = smoothstep( 0.10, 0.0, d );
          gl_FragColor = vec4( uCol, band * uAmt * ( 1.0 - uP ) );
        }`,
    });
    const ring = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), m);
    ring.visible = false;
    g.add(ring);
    rings.push({ mesh: ring, mat: m });
  }
  /* the rising voice column the camera follows skyward */
  const col = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.9, 1, 22, 40, true), new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide, fog: false,
    uniforms: { uTime: U.time, uAmt: { value: 0 }, uCol: { value: new THREE.Color(C.sodiumHot) } },
    vertexShader: `varying vec2 vUvC; void main(){ vUvC = uv; gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.0); }`,
    fragmentShader: `
      varying vec2 vUvC; uniform float uTime, uAmt; uniform vec3 uCol;
      ${GLSL_COMMON}
      void main(){
        float across = 1.0 - abs( vUvC.x - 0.5 ) * 2.0;
        float core = pow( across, 2.2 );
        float rise = fract( vUvC.y * 3.0 - uTime * 0.75 );
        float pulse = pow( 1.0 - abs( rise - 0.5 ) * 2.0, 5.0 );
        float fade = smoothstep( 0.0, 0.12, vUvC.y ) * ( 1.0 - smoothstep( 0.72, 1.0, vUvC.y ) );
        float nz = 0.7 + 0.3 * hash21( floor( vec2( vUvC.x * 12.0, vUvC.y * 30.0 - uTime * 2.0 ) ) );
        gl_FragColor = vec4( uCol, ( core * 0.30 + pulse * 0.9 ) * fade * nz * uAmt );
      }`,
  }));
  col.visible = false;
  g.add(col);
  scene.add(g);
  return { group: g, rings, column: col };
}
