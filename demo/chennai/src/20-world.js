/* ============================================================================
   20-world.js · the street — Poonamallee High Road in the evening rain
   ----------------------------------------------------------------------------
   World-planar coordinates (metres). The road runs along +X; India drives on
   the left, so the near carriageway (z > 0) carries +X traffic and its kerb is
   at z = +11.4, where the MTC bus stops and where the shelter stands.
   ========================================================================== */

const L = {
  roadXmin: -460, roadXmax: 460,
  farLaneZ: [-11.0, -0.7],      // traffic heading -X
  nearLaneZ: [0.7, 11.0],       // traffic heading +X (our bus)
  kerbZ: 11.4,
  footZ: [11.4, 22.5],
  buildNearZ: 23.5,
  buildFarZ: -14.0,
  shelterX: 0, shelterZ: 16.6, shelterW: 8.6, shelterD: 3.3, shelterH: 3.05,
  benchX: 0.15, benchZ: 17.55, benchY: 0.47,
  lampZ: 11.95, lampH: 9.4, lampArm: 2.5,
  roadY: 0.02, footY: 0.17,
  /* Berthed bus centre. The nose is at local -Z and the hero bus is built with
     kerbSide = +1, so heading east (rotation.y = -PI/2) puts the front door
     (local z = -LEN/2 + 1.15 = -4.15) at world x = busStopX + 4.15 = 0.60 --
     right beside the bench -- and its door plane at z = 9.6 + 1.25 = 10.85,
     a realistic 0.43 m off the kerb face at z = 11.28. */
  busStopX: -3.55, busLaneZ: 9.6,
};

/* Global shader uniforms shared by every custom material in the film. */
const U = {
  time: { value: 0 },
  reflAmt: { value: 1 },
  rippleAmp: { value: 1 },
  wetBoost: { value: 1 },
  fogCol: { value: new THREE.Color(C.indigo) },
  night: { value: 1 },          // 1 = rainy night, 0 = golden-hour clear
  sunDir: { value: new THREE.Vector3(-0.6, 0.16, -0.78).normalize() },
  resolution: { value: new THREE.Vector2(1920, 1080) },
  camY: { value: 1.5 },
};

/* ==========================================================================
   Planar reflector — a real mirrored render of the scene about y = roadY,
   projected back onto the wet asphalt with the classic texture matrix. This is
   what puts sodium streetlamps, lamp cones, the bus and the rain inside the
   puddles. Rendered at reduced resolution and skipped entirely once the
   camera is airborne.
   ========================================================================== */
class PlanarReflector {
  constructor(renderer, planeY = L.roadY) {
    this.renderer = renderer;
    this.planeY = planeY;
    this.enabled = true;
    this.scale = 0.5;
    const size = new THREE.Vector2(1024, 512);
    this.rt = new THREE.WebGLRenderTarget(size.x, size.y, {
      minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter,
      format: THREE.RGBAFormat, type: THREE.UnsignedByteType,
      depthBuffer: true, stencilBuffer: false, generateMipmaps: false,
    });
    this.rt.texture.wrapS = this.rt.texture.wrapT = THREE.ClampToEdgeWrapping;
    this.virtualCamera = new THREE.PerspectiveCamera();
    this.uniforms = {
      tRefl: { value: this.rt.texture },
      uTexMatrix: { value: new THREE.Matrix4() },
    };
    this._n = new THREE.Vector3(0, 1, 0);
    /* saved across the mirrored pass so the main pass keeps the fog-tinted
       clear colour main.js sets every frame instead of snapping to black */
    this._prevCol = new THREE.Color();
  }
  setSize(w, h) {
    const W = Math.max(64, Math.floor(w * this.scale)), H = Math.max(64, Math.floor(h * this.scale));
    if (this.rt.width !== W || this.rt.height !== H) this.rt.setSize(W, H);
  }
  /** Reflect the camera about the plane and build the projection texture matrix. */
  update(camera) {
    const vc = this.virtualCamera;
    const planePos = new THREE.Vector3(0, this.planeY, 0);
    const n = this._n;

    /* reflected eye position */
    const eye = new THREE.Vector3().setFromMatrixPosition(camera.matrixWorld);
    const d = eye.y - this.planeY;
    vc.position.set(eye.x, this.planeY - d, eye.z);

    /* reflected target and up vector */
    const fwd = new THREE.Vector3(0, 0, -1).transformDirection(camera.matrixWorld);
    const up = new THREE.Vector3(0, 1, 0).transformDirection(camera.matrixWorld);
    const tgt = new THREE.Vector3().addVectors(eye, fwd);
    const tgtR = new THREE.Vector3(tgt.x, this.planeY - (tgt.y - this.planeY), tgt.z);
    const upR = new THREE.Vector3(up.x, -up.y, up.z);
    vc.up.copy(upR);
    vc.lookAt(tgtR);
    vc.fov = camera.fov; vc.aspect = camera.aspect;
    vc.near = Math.max(0.05, camera.near); vc.far = camera.far;
    vc.updateProjectionMatrix();
    vc.updateMatrixWorld(true);

    /* texture matrix: world → virtual clip → [0,1] uv */
    const tm = this.uniforms.uTexMatrix.value;
    tm.set(0.5, 0.0, 0.0, 0.5,
           0.0, 0.5, 0.0, 0.5,
           0.0, 0.0, 0.5, 0.5,
           0.0, 0.0, 0.0, 1.0);
    tm.multiply(vc.projectionMatrix);
    tm.multiply(vc.matrixWorldInverse);
  }
  render(scene, camera, hidden) {
    if (!this.enabled) return;
    this.update(camera);
    const r = this.renderer;
    const prevRT = r.getRenderTarget();
    const prevXr = r.xr.enabled, prevShadow = r.shadowMap.enabled;
    const prevClearAlpha = r.getClearAlpha();
    r.getClearColor(this._prevCol);
    const hideList = [];
    for (const o of hidden) if (o.visible) { hideList.push(o); o.visible = false; }
    r.xr.enabled = false;
    r.shadowMap.enabled = false;              // shadows in the mirror cost too much
    r.setRenderTarget(this.rt);
    r.setClearColor(0x05070C, 1);
    r.clear(true, true, false);
    r.render(scene, this.virtualCamera);
    for (const o of hideList) o.visible = true;
    r.setRenderTarget(prevRT);
    r.xr.enabled = prevXr;
    r.shadowMap.enabled = prevShadow;
    r.setClearColor(this._prevCol, prevClearAlpha);
  }
}

/* ==========================================================================
   Wet asphalt material: MeshStandardMaterial (so it keeps PBR lighting, env
   reflections and exponential fog) with the planar reflection, raindrop ripple
   normals and a world-planar wet mask injected through onBeforeCompile.
   ========================================================================== */
const GLSL_COMMON = `
float hash21( vec2 p ) {
  p = fract( p * vec2( 123.340, 456.210 ) );
  p += dot( p, p + 45.320 );
  return fract( p.x * p.y );
}
/* One expanding raindrop ring per cell, with its analytic gradient so the
   reflection UV can be bent without extra texture fetches. */
vec2 rippleField( vec2 p, float t, out float h ) {
  vec2 g = floor( p );
  vec2 f = p - g;
  h = 0.0;
  vec2 grad = vec2( 0.0 );
  for ( int j = -1; j <= 1; j ++ ) {
    for ( int i = -1; i <= 1; i ++ ) {
      vec2 off = vec2( float( i ), float( j ) );
      vec2 cell = g + off;
      float id = hash21( cell );
      vec2 ctr = off + vec2( hash21( cell + 7.13 ), hash21( cell + 3.71 ) ) * 0.86 + 0.07;
      float period = 1.15 + id * 1.05;
      float ph = mod( t * ( 0.85 + id * 0.4 ) + id * period, period ) / period;
      vec2 q = f - ctr;
      float d = length( q ) + 1e-5;
      float env = ( 1.0 - ph ) * smoothstep( 0.0, 0.06, ph );
      float arg = ( d - ph * 0.62 ) * 42.0;
      float s = sin( arg );
      float c = cos( arg );
      float fall = exp( -d * 6.2 );
      float ring = s * fall * env;
      h += ring;
      /* d(ring)/dq = (q/d) * [ 42*c*fall - 6.2*s*fall ] * env */
      grad += ( q / d ) * ( 42.0 * c - 6.2 * s ) * fall * env;
    }
  }
  return grad * 0.028;
}
`;

function makeWetRoadMaterial(reflector, opts = {}) {
  const m = new THREE.MeshStandardMaterial({
    color: opts.color == null ? 0xFFFFFF : opts.color,
    map: opts.map || TEX.asphalt,
    roughness: opts.rough == null ? 0.82 : opts.rough,
    metalness: 0.0,
    envMapIntensity: opts.env == null ? 0.85 : opts.env,
  });
  const worldScale = opts.worldScale || 0.085;
  const rippleScale = opts.rippleScale || 3.2;
  m.userData.shader = null;
  m.onBeforeCompile = (shader) => {
    shader.uniforms.tRefl = reflector.uniforms.tRefl;
    shader.uniforms.uTexMatrix = reflector.uniforms.uTexMatrix;
    shader.uniforms.uTime = U.time;
    shader.uniforms.uReflAmt = U.reflAmt;
    shader.uniforms.uRippleAmp = U.rippleAmp;
    shader.uniforms.uWetBoost = U.wetBoost;
    shader.uniforms.uWet = { value: opts.wetMap || TEX.wet };
    shader.uniforms.uWorldScale = { value: worldScale };
    shader.uniforms.uRippleScale = { value: rippleScale };
    shader.uniforms.uReflTint = { value: new THREE.Color(opts.reflTint == null ? 0xFFFFFF : opts.reflTint) };
    shader.uniforms.uSheen = { value: opts.sheen == null ? 0.9 : opts.sheen };

    shader.vertexShader = `
      varying vec3 vWPos;
      varying vec2 vWetUv;
      uniform float uWorldScale;
    ` + shader.vertexShader.replace('#include <fog_vertex>', `#include <fog_vertex>
      vWPos = ( modelMatrix * vec4( transformed, 1.0 ) ).xyz;
      vWetUv = vWPos.xz * uWorldScale;
    `);

    shader.fragmentShader = `
      varying vec3 vWPos;
      varying vec2 vWetUv;
      uniform sampler2D tRefl;
      uniform sampler2D uWet;
      uniform mat4 uTexMatrix;
      uniform float uTime, uReflAmt, uRippleAmp, uWetBoost, uRippleScale, uSheen;
      uniform vec3 uReflTint;
      ${GLSL_COMMON}
    ` + shader.fragmentShader;

    /* 1. wet mask + ripple field, computed once per fragment */
    shader.fragmentShader = shader.fragmentShader.replace('#include <map_fragment>', `#include <map_fragment>
      float wetRaw = texture2D( uWet, vWetUv ).r;
      float wet = clamp( wetRaw * uWetBoost, 0.0, 1.0 );
      wet = smoothstep( 0.06, 0.85, wet );
      float rh;
      vec2 rgrad = rippleField( vWPos.xz * uRippleScale, uTime, rh ) * uRippleAmp;
      rgrad *= wet;
    `);

    /* 2. wet areas get mirror-smooth roughness */
    shader.fragmentShader = shader.fragmentShader.replace('#include <roughnessmap_fragment>', `#include <roughnessmap_fragment>
      roughnessFactor = mix( roughnessFactor, 0.035, wet );
    `);

    /* 3. perturb the shading normal with the raindrop ripples */
    shader.fragmentShader = shader.fragmentShader.replace('#include <normal_fragment_maps>', `#include <normal_fragment_maps>
      vec3 wN = normalize( vec3( -rgrad.x, 1.0, -rgrad.y ) * vec3( 2.6, 1.0, 2.6 ) );
      wN = normalize( mix( vec3( 0.0, 1.0, 0.0 ), wN, clamp( length( rgrad ) * 5.0, 0.0, 1.0 ) ) );
      normal = normalize( ( viewMatrix * vec4( wN, 0.0 ) ).xyz );
    `);

    /* 4. screen-space planar reflection with a grazing-angle (Fresnel) boost */
    shader.fragmentShader = shader.fragmentShader.replace('#include <dithering_fragment>', `#include <dithering_fragment>
      if ( wet > 0.004 && uReflAmt > 0.004 ) {
        vec4 rc = uTexMatrix * vec4( vWPos, 1.0 );
        vec2 ruv = rc.xy / max( abs( rc.w ), 1e-5 );
        ruv += rgrad * 0.10;
        vec2 inB = step( vec2( 0.0 ), ruv ) * step( ruv, vec2( 1.0 ) );
        float inside = inB.x * inB.y;
        vec3 refl = texture2D( tRefl, clamp( ruv, vec2( 0.0005 ), vec2( 0.9995 ) ) ).rgb * uReflTint;
        vec3 V = normalize( vViewPosition );
        float ndv = clamp( dot( normal, V ), 0.0, 1.0 );
        float fres = pow( 1.0 - ndv, 3.4 ) * 0.82 + 0.18;
        float amt = clamp( wet * uReflAmt * inside * mix( 0.42, 1.0, fres ) * uSheen, 0.0, 0.965 );
        gl_FragColor.rgb = mix( gl_FragColor.rgb, refl, amt );
        /* a thin bright waterline where the ripple crests catch the lamps */
        gl_FragColor.rgb += vec3( 0.9, 0.66, 0.3 ) * max( 0.0, rh ) * 0.055 * wet * uReflAmt * inside;
      }
    `);
    m.userData.shader = shader;
  };
  m.customProgramCacheKey = () => 'wetroad' + (opts.key || '');
  return m;
}

/* ==========================================================================
   Sky dome — night indigo over the Coromandel coast that melts into the
   golden-hour break at the end of Act 5.
   ========================================================================== */
function buildSky(scene) {
  const geo = new THREE.SphereGeometry(1500, 40, 28);
  const mat = new THREE.ShaderMaterial({
    side: THREE.BackSide, depthWrite: false, fog: false,
    uniforms: {
      uTime: U.time, uNight: U.night, uSunDir: U.sunDir,
      uTopNight: { value: new THREE.Color(0x060A18) },
      uHorNight: { value: new THREE.Color(0x1B2036) },
      uGlowNight: { value: new THREE.Color(0x5A3A14) },
      uTopDusk: { value: new THREE.Color(0x2A0F3C) },
      uHorDusk: { value: new THREE.Color(0xFF7A18) },
      uSunCol: { value: new THREE.Color(0xFFD9A0) },
      uCloud: { value: 0.62 },
      uStars: { value: 1.0 },
    },
    vertexShader: `
      varying vec3 vDir;
      void main() {
        vDir = normalize( ( modelMatrix * vec4( position, 1.0 ) ).xyz - cameraPosition );
        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
      }`,
    fragmentShader: `
      varying vec3 vDir;
      uniform float uTime, uNight, uCloud, uStars;
      uniform vec3 uTopNight, uHorNight, uGlowNight, uTopDusk, uHorDusk, uSunCol, uSunDir;
      ${GLSL_COMMON}
      float fbm3( vec3 p ) {
        float a = 0.0, amp = 0.5;
        for ( int i = 0; i < 5; i ++ ) {
          a += amp * ( sin( p.x * 1.7 + p.y * 2.3 + p.z * 1.1 ) * 0.5 + 0.5 );
          p = p * 2.03 + vec3( 11.3, 7.7, 3.1 );
          amp *= 0.5;
        }
        return a;
      }
      void main() {
        float h = clamp( vDir.y * 0.5 + 0.5, 0.0, 1.0 );
        float up = pow( clamp( vDir.y, 0.0, 1.0 ), 0.62 );
        vec3 night = mix( uHorNight, uTopNight, up );
        vec3 dusk  = mix( uHorDusk, uTopDusk, pow( up, 0.75 ) );
        float k = 1.0 - uNight;
        vec3 col = mix( night, dusk, k );
        /* sodium city-glow dome on the horizon at night */
        float horizonBand = exp( -abs( vDir.y ) * 9.0 );
        col += uGlowNight * horizonBand * uNight * 0.85;
        /* sun disc + bloom at golden hour */
        float sd = max( 0.0, dot( normalize( vDir ), normalize( uSunDir ) ) );
        col += uSunCol * pow( sd, 900.0 ) * 6.0 * k;
        col += uSunCol * pow( sd, 22.0 ) * 0.55 * k;
        col += uSunCol * pow( sd, 4.0 ) * 0.13 * k;
        /* cloud deck */
        vec2 cuv = vDir.xz / max( 0.12, abs( vDir.y ) + 0.16 );
        float cl = fbm3( vec3( cuv * 0.42, uTime * 0.012 ) );
        cl = smoothstep( 0.42, 0.86, cl ) * uCloud;
        cl *= smoothstep( -0.06, 0.24, vDir.y );
        vec3 cloudLit = mix( vec3( 0.07, 0.08, 0.12 ), vec3( 1.0, 0.55, 0.22 ), k );
        cloudLit += uSunCol * pow( sd, 6.0 ) * 0.4 * k;
        col = mix( col, cloudLit, cl * ( 0.45 + 0.4 * k ) );
        /* stars, only in the wet night */
        float st = hash21( floor( vDir.xz * 340.0 + vDir.y * 210.0 ) );
        float tw = step( 0.9965, st ) * ( 0.55 + 0.45 * sin( uTime * 2.4 + st * 90.0 ) );
        col += vec3( 0.8, 0.86, 1.0 ) * tw * uStars * uNight * smoothstep( 0.02, 0.34, vDir.y ) * ( 1.0 - cl );
        gl_FragColor = vec4( col, 1.0 );
      }`,
  });
  const sky = new THREE.Mesh(geo, mat);
  sky.frustumCulled = false;
  sky.renderOrder = -1000;
  sky.userData.noReflect = false;
  scene.add(sky);
  return sky;
}

/* ==========================================================================
   Street build
   ========================================================================== */
function buildStreet(scene, reflector) {
  const W = { lamps: [], pools: [], cones: [], signs: [], traffic: [], shelter: null, phoneAnchor: null };

  /* ------------------------------ road slab ------------------------------ */
  const roadW = L.roadXmax - L.roadXmin, roadD = L.nearLaneZ[1] - L.farLaneZ[0];
  const roadGeo = new THREE.PlaneGeometry(roadW, roadD, 1, 1);
  roadGeo.rotateX(-PI / 2);
  const roadMat = makeWetRoadMaterial(reflector, { worldScale: 0.055, rippleScale: 2.6, key: 'road', sheen: 1.0 });
  const road = new THREE.Mesh(roadGeo, roadMat);
  road.position.set((L.roadXmin + L.roadXmax) / 2, L.roadY, (L.farLaneZ[0] + L.nearLaneZ[1]) / 2);
  road.receiveShadow = true;
  road.userData.noReflect = true;          // never reflect the mirror into itself
  scene.add(road); W.road = road; W.roadMat = roadMat;

  /* lane markings, worn and half drowned */
  const lineMat = new THREE.MeshStandardMaterial({
    map: TEX.lines, transparent: true, opacity: 0.55, roughness: 0.42, metalness: 0, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -2,
  });
  for (const z of [-5.85, 5.85]) {
    const g = new THREE.PlaneGeometry(roadW, 1.5); g.rotateX(-PI / 2);
    const m = new THREE.Mesh(g, lineMat);
    m.position.set((L.roadXmin + L.roadXmax) / 2, L.roadY + 0.004, z);
    m.userData.noReflect = true;
    scene.add(m);
  }
  TEX.lines.repeat.set(roadW / 26, 1);

  /* solid edge lines */
  const edgeMat = new THREE.MeshStandardMaterial({ color: 0xC9C3AE, transparent: true, opacity: 0.22, roughness: 0.5, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -2 });
  for (const z of [-10.55, 10.55]) {
    const g = new THREE.PlaneGeometry(roadW, 0.16); g.rotateX(-PI / 2);
    const m = new THREE.Mesh(g, edgeMat); m.position.set(0, L.roadY + 0.004, z); m.userData.noReflect = true; scene.add(m);
  }

  /* --------------------------------- median ------------------------------ */
  const medGeo = new THREE.BoxGeometry(roadW, 0.22, 1.3);
  const med = mesh(medGeo, mat(0x2A2E2C, { rough: 0.9, flat: false, map: TEX.concreteDark }), 0, L.roadY + 0.11, 0, false, true);
  med.userData.noReflect = true; scene.add(med);
  /* hedge / painted kerb strips on the median */
  const stripMat = mat(0xB9B2A0, { rough: 0.85, flat: false });
  const stripRedMat = mat(0xB91C1C, { rough: 0.8 });
  const bStrip = new GB(), bStripRed = new GB();
  for (let x = L.roadXmin + 6; x < L.roadXmax; x += 5.2) {
    if (Math.abs(x) < 60) continue;
    const isRed = (Math.floor(x / 5.2) % 2) !== 0;
    (isRed ? bStripRed : bStrip).box(2.4, 0.09, 1.36, { pos: [x, L.roadY + 0.25, 0] });
  }
  for (const bb of [bStrip, bStripRed]) {
    const gm = bb.build(bb === bStripRed ? stripRedMat : stripMat, { vertexColors: false });
    gm.name = 'medianStrips';
    gm.children.forEach((c) => { c.userData.noReflect = true; });
    scene.add(gm);
  }
  /* a few neem trees on the median — Chennai's road trees */
  for (const tx of [-96, -58, 58, 96, 150, -150]) {
    const tr = buildTree(1.6 + hash1(tx) * 0.8);
    tr.position.set(tx, L.roadY + 0.22, 0);
    scene.add(tr);
  }

  /* --------------------------- kerb + footpath ---------------------------- */
  const footD = L.footZ[1] - L.footZ[0];
  const footGeo = new THREE.PlaneGeometry(roadW, footD); footGeo.rotateX(-PI / 2);
  const footMat = new THREE.MeshStandardMaterial({
    map: TEX.asphalt, color: 0x9A9A96, roughness: 0.34, metalness: 0.0, envMapIntensity: 1.25,
  });
  const foot = new THREE.Mesh(footGeo, footMat);
  foot.position.set(0, L.footY, (L.footZ[0] + L.footZ[1]) / 2);
  foot.receiveShadow = true; scene.add(foot); W.foot = foot;

  /* granite kerb stones */
  /* Granite kerb stones. These were 460 separate meshes -- 460 draw calls every
     frame, in the main pass AND again in the mirror pass, for a row of blocks
     that can never move. Merged into one mesh via the film's own GB batcher. */
  const kerbMat = mat(0x8C8A82, { rough: 0.72, flat: false, map: TEX.concrete });
  const bKerb = new GB();
  for (let x = L.roadXmin; x < L.roadXmax; x += 2.0) {
    bKerb.box(1.96, L.footY + 0.06, 0.24, { pos: [x + 1, (L.footY + 0.06) / 2, L.kerbZ - 0.12] });
  }
  const kerbMesh = bKerb.build(kerbMat, { cast: true, recv: true, vertexColors: false });
  kerbMesh.name = 'kerbStones';
  kerbMesh.children.forEach((c) => { c.castShadow = true; c.receiveShadow = true; });
  scene.add(kerbMesh);
  /* far-side pavement */
  const farFoot = new THREE.Mesh(new THREE.PlaneGeometry(roadW, 5).rotateX(-PI / 2), footMat);
  farFoot.position.set(0, L.footY * 0.9, -13.6); farFoot.receiveShadow = true; scene.add(farFoot);

  /* storm-water drains along the kerb */
  const drainMat = mat(0x16191C, { rough: 0.95, metal: 0.2 });
  /* Drains + grates: 31 drains x (1 body + 6 grates) was ~217 draw calls for
     geometry that never moves. Two merged meshes now. */
  const grateMat = mat(0x3A3F45, { metal: 0.7, rough: 0.4 });
  const bDrain = new GB(), bGrate = new GB();
  for (let x = -220; x < 220; x += 14) {
    bDrain.box(1.5, 0.05, 0.5, { pos: [x, L.roadY + 0.006, 10.85] });
    for (let s = 0; s < 6; s++) {
      bGrate.box(1.44, 0.02, 0.035, { pos: [x, L.roadY + 0.03, 10.66 + s * 0.075] });
    }
  }
  for (const pair of [[bDrain, drainMat, 'drains'], [bGrate, grateMat, 'drainGrates']]) {
    const gm = pair[0].build(pair[1], { vertexColors: false });
    gm.name = pair[2];
    gm.children.forEach((c) => { c.userData.noReflect = true; });
    scene.add(gm);
  }

  /* ---------------------------- street lighting -------------------------- */
  /* Eleven lamps used to be eleven Groups of ~17 meshes each -- about 190 draw
     calls for identical geometry -- plus eleven real PointLights. Every one of
     those lights is evaluated per fragment on every lit object, which is the
     most expensive thing in this scene after resolution. The arms, bases, poles
     and hoods are now merged into two meshes, and only the four lamps nearest
     the camera action carry a real light; the rest keep their emissive lens,
     glow sprite and baked ground pool, which is what actually reads on screen. */
  const bLampSteel = new GB(), bLampHood = new GB();
  const LAMP_COUNT = 11;
  for (let i = -5; i <= 5; i++) {
    const x = i * 26;
    const yRot = PI;                                  /* arm reaches over the road */

    /* steel: base, pole, swept arm (as a chain of short segments) */
    const cosR = Math.cos(yRot), sinR = Math.sin(yRot);
    const rot = (lx, lz) => [x + lx * cosR + lz * sinR, -lx * sinR + lz * cosR];
    const [bx, bz] = rot(0, 0);
    bLampSteel.cyl(0.26, 0.34, 0.5, 10, { pos: [bx, 0.25, bz] });
    bLampSteel.cyl(0.11, 0.17, L.lampH, 10, { pos: [bx, L.lampH / 2 + 0.4, bz] });
    for (let seg = 0; seg < 4; seg++) {
      const f = seg / 4, f2 = (seg + 1) / 4;
      const az = -L.lampArm * f, az2 = -L.lampArm * f2;
      const ay = L.lampH + 0.36 + Math.sin(f * Math.PI * 0.5) * 0.26 - f * 0.06;
      const ay2 = L.lampH + 0.36 + Math.sin(f2 * Math.PI * 0.5) * 0.26 - f2 * 0.06;
      const [sx, sz] = rot(0, az);
      const [ex, ez] = rot(0, az2);
      const dx = ex - sx, dy = ay2 - ay, dz = ez - sz;
      const len = Math.sqrt(dx * dx + dy * dy + dz * dz) || 0.01;
      const mid = [(sx + ex) / 2, (ay + ay2) / 2, (sz + ez) / 2];
      /* tilt the cylinder onto the segment */
      const pitch = Math.acos(Math.max(-1, Math.min(1, dy / len)));
      const yaw = Math.atan2(dx, dz);
      bLampSteel.cyl(0.075, 0.075, len, 6, { pos: mid, rot: [pitch, yaw, 0] });
    }
    const [hx, hz] = rot(0, -L.lampArm);
    bLampHood.cyl(0.42, 0.52, 0.2, 10, { pos: [hx, L.lampH + 0.26, hz] });

    /* the emissive lens + glow + cone + ground pool are what the eye reads */
    const head = new THREE.Group();
    head.position.set(hx, L.lampH + 0.16, hz);
    const lens = mesh(new THREE.CylinderGeometry(0.40, 0.40, 0.05, 12), new THREE.MeshStandardMaterial({
      color: 0xFFE3A8, emissive: 0xFFC24A, emissiveIntensity: 5.2, roughness: 0.25, metalness: 0,
    }), 0, -0.02, 0);
    lens.scale.z = 0.62; head.add(lens);
    const glow = glowSprite(C.sodiumHot, 6.4, 0.85); glow.position.set(0, -0.05, 0); head.add(glow);
    const glow2 = glowSprite(C.sodium, 13.0, 0.30); glow2.position.set(0, -0.05, 0); head.add(glow2);
    const cone = buildLightCone(2.5, L.lampH + 0.1, C.sodium, 0.30);
    cone.position.set(0, -(L.lampH + 0.1) / 2 + 0.05, 0);
    head.add(cone);
    scene.add(head);

    /* a real light only for the central lamps, where the action is --
       but every head still needs the full userData contract, because
       cinematics animates intensity/glow/lens/cone on all of them. */
    let pl = null;
    if (i >= -2 && i <= 2) {
      pl = new THREE.PointLight(C.sodium, 620, 62, 2.0);
      pl.position.set(0, -0.15, 0);
      head.add(pl);
    }

    head.userData = { head, lens, glow, glow2, cone, light: pl };
    W.lamps.push(head);

    const poolMat = new THREE.MeshBasicMaterial({ map: TEX.pool, color: C.sodium, transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending, depthWrite: false, fog: true });
    const pool = new THREE.Mesh(new THREE.PlaneGeometry(19, 34).rotateX(-PI / 2), poolMat);
    pool.position.set(x - 0.6, L.roadY + 0.012, L.lampZ - L.lampArm - 1.2);
    pool.renderOrder = 2; pool.userData.noReflect = true;
    scene.add(pool); W.pools.push(pool);

    const pool2 = pool.clone(); pool2.material = poolMat;
    pool2.scale.set(0.62, 1, 0.5); pool2.position.set(x - 0.6, L.footY + 0.012, L.lampZ + 1.4);
    pool2.userData.noReflect = true; scene.add(pool2); W.pools.push(pool2);
  }
  {
    const steelMesh = bLampSteel.build(mat(0x2E3439, { metal: 0.72, rough: 0.46, flat: false }), { cast: true, vertexColors: false });
    steelMesh.name = 'lampSteel'; scene.add(steelMesh);
    const hoodMesh = bLampHood.build(mat(0x3B4148, { metal: 0.6, rough: 0.4 }), { cast: true, vertexColors: false });
    hoodMesh.name = 'lampHoods'; scene.add(hoodMesh);
  }

  /* ------------------------------ bus shelter ---------------------------- */
  W.shelter = buildShelter();
  W.shelter.position.set(L.shelterX, 0, L.shelterZ);
  scene.add(W.shelter);

  /* bus-stop totem */
  const totem = new THREE.Group();
  totem.position.set(-6.2, 0, 12.5);
  const pole = mesh(new THREE.CylinderGeometry(0.07, 0.09, 3.4, 10), mat(0x3A4046, { metal: 0.6, rough: 0.5 }), 0, 1.7, 0, true);
  totem.add(pole);
  const board = mesh(new THREE.BoxGeometry(1.12, 1.68, 0.07), [
    mat(0x111418, { rough: 0.8 }), mat(0x111418, { rough: 0.8 }),
    mat(0x111418, { rough: 0.8 }), mat(0x111418, { rough: 0.8 }),
    new THREE.MeshStandardMaterial({ map: TEX.busStop, roughness: 0.55, emissive: 0xFFFFFF, emissiveMap: TEX.busStop, emissiveIntensity: 0.32 }),
    mat(0x111418, { rough: 0.8 }),
  ], 0, 2.5, 0, true);
  totem.add(board);
  const totemGlow = glowSprite(C.sodium, 3.2, 0.22); totemGlow.position.set(0, 2.5, 0.4); totem.add(totemGlow);
  scene.add(totem); W.totem = totem;

  /* ------------------------------- buildings ----------------------------- */
  buildStreetscape(scene, W);

  /* --------------------------------- rain -------------------------------- */
  W.rain = buildRain(scene);

  /* ------------------------------ street life ---------------------------- */
  W.teaKadai = buildTeaKadai(); W.teaKadai.position.set(9.2, 0, 13.4); W.teaKadai.rotation.y = -0.42; scene.add(W.teaKadai);
  W.signal = buildTrafficSignal(); W.signal.position.set(-13.5, 0, 11.9); scene.add(W.signal);
  W.hoarding = buildHoarding(); W.hoarding.position.set(-34, 0, 21.4); W.hoarding.rotation.y = 0.16; scene.add(W.hoarding);

  return W;
}

/* ------------------------------- street lamp ------------------------------ */
function buildStreetLamp() {
  const g = new THREE.Group();
  const steel = mat(0x2E3439, { metal: 0.72, rough: 0.46, flat: false });
  const base = mesh(new THREE.CylinderGeometry(0.26, 0.34, 0.5, 12), steel, 0, 0.25, 0, true, true); g.add(base);
  const pole = mesh(new THREE.CylinderGeometry(0.11, 0.17, L.lampH, 12), steel, 0, L.lampH / 2 + 0.4, 0, true); g.add(pole);
  /* swept arm out over the carriageway */
  const curve = new THREE.CatmullRomCurve3([
    v3(0, L.lampH + 0.36, 0), v3(0, L.lampH + 0.62, -0.55),
    v3(0, L.lampH + 0.62, -1.5), v3(0, L.lampH + 0.30, -L.lampArm),
  ]);
  const arm = new THREE.Mesh(new THREE.TubeGeometry(curve, 20, 0.075, 8, false), steel);
  arm.castShadow = true; g.add(arm);
  /* luminaire housing */
  const head = new THREE.Group(); head.position.set(0, L.lampH + 0.16, -L.lampArm); g.add(head);
  const hood = mesh(new THREE.CylinderGeometry(0.42, 0.52, 0.2, 14, 1, false), mat(0x3B4148, { metal: 0.6, rough: 0.4 }), 0, 0.1, 0, true);
  hood.scale.z = 0.62; head.add(hood);
  const lens = mesh(new THREE.CylinderGeometry(0.40, 0.40, 0.05, 14), new THREE.MeshStandardMaterial({
    color: 0xFFE3A8, emissive: 0xFFC24A, emissiveIntensity: 5.2, roughness: 0.25, metalness: 0,
  }), 0, -0.02, 0);
  lens.scale.z = 0.62; head.add(lens);
  /* the visible lamp: a sprite that the puddles will reflect */
  const glow = glowSprite(C.sodiumHot, 6.4, 0.85); glow.position.set(0, -0.05, 0); head.add(glow);
  const glow2 = glowSprite(C.sodium, 13.0, 0.30); glow2.position.set(0, -0.05, 0); head.add(glow2);
  /* volumetric shaft through the rain */
  const cone = buildLightCone(2.5, L.lampH + 0.1, C.sodium, 0.30);
  cone.position.set(0, -(L.lampH + 0.1) / 2 + 0.05, 0);
  head.add(cone);
  /* real light — no shadow map, the baked pool does that job */
  const pl = new THREE.PointLight(C.sodium, 620, 62, 2.0);
  pl.position.set(0, -0.15, 0);
  head.add(pl);
  g.userData = { head, lens, glow, glow2, cone, light: pl };
  return g;
}

/** Additive volumetric cone: soft-edged, noise-modulated, reads as light in rain. */
function buildLightCone(radius, height, color, opacity) {
  const geo = new THREE.ConeGeometry(radius, height, 26, 14, true);
  geo.translate(0, 0, 0);
  const m = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide, fog: false,
    uniforms: { uTime: U.time, uColor: { value: new THREE.Color(color) }, uOpacity: { value: opacity }, uNight: U.night },
    vertexShader: `
      varying vec2 vUvC; varying vec3 vP;
      void main(){ vUvC = uv; vP = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
    fragmentShader: `
      varying vec2 vUvC; varying vec3 vP;
      uniform float uTime, uOpacity, uNight; uniform vec3 uColor;
      ${GLSL_COMMON}
      void main(){
        float v = clamp( vUvC.y, 0.0, 1.0 );          // 0 at apex(top) → 1 at rim
        float fall = pow( 1.0 - v, 1.9 );
        float edge = smoothstep( 0.0, 0.22, v );
        float nz = 0.62 + 0.38 * hash21( floor( vec2( vP.x * 3.0 + vP.z * 2.0, v * 9.0 - uTime * 0.35 ) ) );
        float a = fall * edge * nz * uOpacity * ( 0.35 + 0.65 * uNight );
        gl_FragColor = vec4( uColor * ( 0.7 + 0.6 * fall ), a );
      }`,
  });
  const c = new THREE.Mesh(geo, m);
  /* ConeGeometry puts the apex at +Y/2, so the shaft naturally opens downward. */
  c.renderOrder = 3;
  return c;
}

/* ---------------------------------- trees --------------------------------- */
function buildTree(scale = 1) {
  const g = new THREE.Group();
  const bark = mat(0x2B2620, { rough: 0.95, flat: false });
  const trunk = mesh(new THREE.CylinderGeometry(0.14 * scale, 0.26 * scale, 3.4 * scale, 8), bark, 0, 1.7 * scale, 0, true); g.add(trunk);
  const leaf = new THREE.MeshStandardMaterial({ color: 0x1E3A22, roughness: 0.92, flatShading: true });
  const r = rng(Math.floor(scale * 977));
  for (let i = 0; i < 7; i++) {
    const s = (1.0 + r() * 0.9) * scale;
    const b = mesh(new THREE.IcosahedronGeometry(s, 0), leaf,
      (r() - 0.5) * 2.2 * scale, (3.2 + r() * 1.8) * scale, (r() - 0.5) * 2.2 * scale, true);
    b.rotation.set(r() * 3, r() * 3, r() * 3);
    g.add(b);
  }
  return g;
}

/* ------------------------------- bus shelter ------------------------------ */
function buildShelter() {
  const g = new THREE.Group();
  const Wd = L.shelterW, Dp = L.shelterD, Ht = L.shelterH;
  const steel = mat(0x26332F, { metal: 0.68, rough: 0.44, flat: false });
  const steelDark = mat(0x1A2320, { metal: 0.7, rough: 0.5, flat: false });

  /* plinth */
  const plinth = mesh(new THREE.BoxGeometry(Wd + 0.5, 0.16, Dp + 0.5), mat(0x4A4A46, { rough: 0.9, flat: false, map: TEX.concrete }), 0, 0.08, 0, false, true);
  g.add(plinth);

  /* columns */
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) {
    const c = mesh(new THREE.BoxGeometry(0.17, Ht, 0.17), steel, sx * (Wd / 2 - 0.1), Ht / 2 + 0.16, sz * (Dp / 2 - 0.1), true, true);
    g.add(c);
    const cap = mesh(new THREE.BoxGeometry(0.26, 0.08, 0.26), steelDark, sx * (Wd / 2 - 0.1), Ht + 0.2, sz * (Dp / 2 - 0.1)); g.add(cap);
  }

  /* roof: corrugated tin deck on a steel frame, with a slight fall to the front */
  const roofFrame = mesh(new THREE.BoxGeometry(Wd + 0.7, 0.14, Dp + 0.7), steelDark, 0, Ht + 0.3, 0, true);
  g.add(roofFrame);
  const deckMat = new THREE.MeshStandardMaterial({ map: TEX.corrugated, color: 0x6A7076, roughness: 0.52, metalness: 0.55 });
  const deck = mesh(new THREE.BoxGeometry(Wd + 0.9, 0.05, Dp + 0.95), deckMat, 0, Ht + 0.4, -0.06, true, true);
  deck.rotation.x = 0.022;
  g.add(deck);
  /* gutter + downpipe, dripping */
  const gutter = mesh(new THREE.BoxGeometry(Wd + 0.9, 0.1, 0.14), mat(0x4C5257, { metal: 0.7, rough: 0.45 }), 0, Ht + 0.32, -(Dp / 2 + 0.42), true);
  g.add(gutter);
  const down = mesh(new THREE.CylinderGeometry(0.055, 0.055, Ht + 0.2, 8), mat(0x4C5257, { metal: 0.7, rough: 0.45 }), Wd / 2 + 0.36, (Ht + 0.2) / 2 + 0.1, -(Dp / 2 + 0.42), true);
  g.add(down);

  /* translucent smoked polycarbonate side + back glazing */
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0x2B3A40, roughness: 0.12, metalness: 0, transmission: 0.0, transparent: true, opacity: 0.30,
    side: THREE.DoubleSide, envMapIntensity: 1.6, clearcoat: 1, clearcoatRoughness: 0.06,
  });
  const back = mesh(new THREE.PlaneGeometry(Wd - 0.34, Ht - 0.34), glassMat, 0, Ht / 2 + 0.2, Dp / 2 - 0.1);
  g.add(back);
  for (const sx of [-1, 1]) {
    const side = mesh(new THREE.PlaneGeometry(Dp - 0.34, Ht - 0.34), glassMat, sx * (Wd / 2 - 0.1), Ht / 2 + 0.2, 0);
    side.rotation.y = PI / 2; g.add(side);
  }
  /* poster panel in the back glazing */
  const poster = mesh(new THREE.PlaneGeometry(1.24, 1.86), new THREE.MeshStandardMaterial({
    map: TEX.poster0, roughness: 0.7, emissive: 0xFFFFFF, emissiveMap: TEX.poster0, emissiveIntensity: 0.10,
  }), -2.35, 1.32, Dp / 2 - 0.13);
  g.add(poster);
  const poster2 = mesh(new THREE.PlaneGeometry(1.24, 1.86), new THREE.MeshStandardMaterial({
    map: TEX.poster1, roughness: 0.7, emissive: 0xFFFFFF, emissiveMap: TEX.poster1, emissiveIntensity: 0.14,
  }), 2.35, 1.32, Dp / 2 - 0.13);
  g.add(poster2);
  const posterFrame = (X) => {
    const f = new THREE.Group(); f.position.set(X, 1.32, Dp / 2 - 0.14);
    f.add(mesh(new THREE.BoxGeometry(1.34, 0.05, 0.05), steelDark, 0, 0.96, 0));
    f.add(mesh(new THREE.BoxGeometry(1.34, 0.05, 0.05), steelDark, 0, -0.96, 0));
    f.add(mesh(new THREE.BoxGeometry(0.05, 1.96, 0.05), steelDark, -0.66, 0, 0));
    f.add(mesh(new THREE.BoxGeometry(0.05, 1.96, 0.05), steelDark, 0.66, 0, 0));
    return f;
  };
  g.add(posterFrame(-2.35), posterFrame(2.35));

  /* granite stone bench — the elder's seat */
  const granite = mat(0x6B6E6A, { rough: 0.34, metal: 0.05, flat: false, map: TEX.concrete, env: 1.2 });
  const bench = new THREE.Group();
  const bz = L.benchZ - L.shelterZ;
  bench.add(mesh(new THREE.BoxGeometry(2.9, 0.11, 0.46), granite, 0, L.benchY, bz, true, true));
  bench.add(mesh(new THREE.BoxGeometry(0.34, L.benchY, 0.4), granite, -1.18, L.benchY / 2, bz, true, true));
  bench.add(mesh(new THREE.BoxGeometry(0.34, L.benchY, 0.4), granite, 1.18, L.benchY / 2, bz, true, true));
  bench.add(mesh(new THREE.BoxGeometry(2.9, 0.07, 0.1), granite, 0, L.benchY + 0.42, bz + 0.19, true));
  bench.position.x = L.benchX - L.shelterX;
  bench.position.y = 0.16;          // sits on top of the shelter plinth
  g.add(bench);

  /* shelter fascia sign: stop name in Tamil + English */
  const fasciaTex = (() => {
    const { c, x } = makeCanvas(1024, 160);
    x.fillStyle = '#0E2A24'; x.fillRect(0, 0, 1024, 160);
    x.fillStyle = '#F59E0B'; x.fillRect(0, 0, 1024, 10); x.fillRect(0, 150, 1024, 10);
    x.textAlign = 'center'; x.textBaseline = 'middle';
    x.fillStyle = '#FFF3D6'; x.font = `700 54px ${FONT_TAMIL}`;
    x.fillText('சைமாட்ஸ் ஹைவே  ·  பூந்தமல்லி நெடுஞ்சாலை', 512, 58);
    x.fillStyle = '#BFD2CB'; x.font = `600 30px ${FONT_COND}`;
    x.fillText('SIMATS HIGHWAY  ·  POONAMALLEE HIGH ROAD  ·  MTC CHENNAI', 512, 116);
    return canvasTexture(c);
  })();
  const fascia = mesh(new THREE.BoxGeometry(Wd + 0.2, 0.52, 0.1),
    new THREE.MeshStandardMaterial({ map: fasciaTex, roughness: 0.5, emissive: 0xFFFFFF, emissiveMap: fasciaTex, emissiveIntensity: 0.36 }),
    0, Ht + 0.02, -(Dp / 2 + 0.1));
  g.add(fascia);
  const fasciaBack = mesh(new THREE.BoxGeometry(Wd + 0.2, 0.52, 0.06), mat(0x141A18, { rough: 0.8 }), 0, Ht + 0.02, Dp / 2 + 0.1); g.add(fasciaBack);

  /* fluorescent tube under the roof — the shelter's own cold light */
  const tube = mesh(new THREE.BoxGeometry(1.5, 0.06, 0.09), new THREE.MeshStandardMaterial({
    color: 0xEAF4FF, emissive: 0xBFD8F0, emissiveIntensity: 3.4, roughness: 0.3,
  }), -0.2, Ht + 0.14, -0.2);
  g.add(tube);
  const tubeLight = new THREE.PointLight(0xBFD8F0, 90, 13, 2);
  tubeLight.position.set(-0.2, Ht + 0.05, -0.2); g.add(tubeLight);
  const tubeCone = buildLightCone(1.5, Ht - 0.2, 0xBFD8F0, 0.09);
  tubeCone.position.set(-0.2, (Ht - 0.2) / 2 + 0.34, -0.2); g.add(tubeCone);

  /* dripping from the gutter */
  const drip = buildDrips(6, Wd, -(Dp / 2 + 0.42));
  g.add(drip);

  /* litter, a dustbin, and standing water at the entrance */
  const bin = new THREE.Group(); bin.position.set(Wd / 2 - 0.5, 0.16, -Dp / 2 + 0.55);
  bin.add(mesh(new THREE.CylinderGeometry(0.26, 0.22, 0.72, 12), mat(0x2F5D50, { metal: 0.4, rough: 0.6 }), 0, 0.36, 0, true));
  bin.add(mesh(new THREE.CylinderGeometry(0.28, 0.28, 0.05, 12), mat(0x1E3B33, { metal: 0.4, rough: 0.6 }), 0, 0.73, 0, true));
  g.add(bin);

  g.userData = { bench, tube, tubeLight, roofY: Ht + 0.44, plinth };
  return g;
}

/** Rain dripping off a gutter line: recycled shader points. */
function buildDrips(n, width, z) {
  const pos = new Float32Array(n * 3), seed = new Float32Array(n);
  for (let i = 0; i < n; i++) { pos[i * 3] = (i / (n - 1) - 0.5) * width * 0.92 + (hash1(i) - 0.5) * 0.3; pos[i * 3 + 1] = 0; pos[i * 3 + 2] = z; seed[i] = hash1(i * 3.7); }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setAttribute('aSeed', new THREE.BufferAttribute(seed, 1));
  const m = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, fog: false,
    uniforms: { uTime: U.time, uTop: { value: L.shelterH + 0.3 }, uCol: { value: new THREE.Color(0xFFD9A0) } },
    vertexShader: `
      attribute float aSeed; uniform float uTime, uTop; varying float vA;
      void main(){
        float period = 1.3 + aSeed * 1.5;
        float ph = mod( uTime + aSeed * period, period ) / period;
        vec3 p = position; p.y = uTop - ph * uTop;
        vA = ( 1.0 - ph ) * 0.9;
        vec4 mv = modelViewMatrix * vec4( p, 1.0 );
        gl_PointSize = clamp( 90.0 / -mv.z, 1.0, 7.0 );
        gl_Position = projectionMatrix * mv;
      }`,
    fragmentShader: `
      uniform vec3 uCol; varying float vA;
      void main(){
        vec2 d = gl_PointCoord - 0.5;
        float a = smoothstep( 0.5, 0.06, length( d ) ) * vA;
        gl_FragColor = vec4( uCol, a * 0.75 );
      }`,
  });
  const p = new THREE.Points(geo, m); p.frustumCulled = false; return p;
}

/* -------------------------------- tea kadai ------------------------------- */
/** The roadside tea stall: striped awning, one bare bulb, steam. Warmth. */
function buildTeaKadai() {
  const g = new THREE.Group();
  const wood = mat(0x4A3524, { rough: 0.9, flat: false });
  const metal = mat(0x8A8F94, { metal: 0.85, rough: 0.35, flat: false });
  g.add(mesh(new THREE.BoxGeometry(2.2, 0.9, 1.2), wood, 0, 0.45, 0, true, true));
  g.add(mesh(new THREE.BoxGeometry(2.4, 0.08, 1.4), mat(0x6B7075, { metal: 0.6, rough: 0.4 }), 0, 0.94, 0, true, true));
  /* awning: blue/white stripes */
  const awn = (() => {
    const { c, x } = makeCanvas(256, 128);
    for (let i = 0; i < 16; i++) { x.fillStyle = i % 2 ? '#1E4E8C' : '#E4E8EA'; x.fillRect(i * 16, 0, 16, 128); }
    x.globalAlpha = 0.3; x.fillStyle = '#000';
    for (let s = 0; s < 90; s++) x.fillRect(hash1(s) * 256, hash1(s + 9) * 128, 6, 3);
    x.globalAlpha = 1;
    return canvasTexture(c, { wrap: THREE.RepeatWrapping });
  })();
  const awning = mesh(new THREE.BoxGeometry(2.6, 0.05, 1.5), new THREE.MeshStandardMaterial({ map: awn, roughness: 0.85, side: THREE.DoubleSide }), 0, 2.16, -0.15, true);
  awning.rotation.x = -0.22; g.add(awning);
  for (const sx of [-1, 1]) g.add(mesh(new THREE.CylinderGeometry(0.035, 0.035, 2.2, 6), metal, sx * 1.15, 1.1, -0.75, true));
  /* one bare bulb */
  const bulb = mesh(new THREE.SphereGeometry(0.055, 10, 8), new THREE.MeshStandardMaterial({ color: 0xFFF0C8, emissive: 0xFFCB6B, emissiveIntensity: 6 }), 0, 2.02, -0.2);
  g.add(bulb);
  const bl = new THREE.PointLight(0xFFB74D, 110, 11, 2); bl.position.set(0, 2.0, -0.2); g.add(bl);
  const bulbGlow = glowSprite(0xFFB74D, 2.6, 0.5); bulbGlow.position.set(0, 2.02, -0.2); g.add(bulbGlow);
  /* steel tumbler + kettle */
  g.add(mesh(new THREE.CylinderGeometry(0.05, 0.045, 0.1, 10), metal, -0.5, 1.03, 0.2, true));
  g.add(mesh(new THREE.CylinderGeometry(0.05, 0.045, 0.1, 10), metal, -0.36, 1.03, 0.26, true));
  const kettle = mesh(new THREE.SphereGeometry(0.16, 12, 10), metal, 0.6, 1.12, 0.1, true); kettle.scale.y = 0.85; g.add(kettle);
  /* steam */
  const steam = buildSteam(); steam.position.set(0.6, 1.3, 0.1); g.add(steam);
  /* sign */
  const sg = mesh(new THREE.PlaneGeometry(1.5, 0.42), new THREE.MeshStandardMaterial({
    map: TEX_SIGNS.tea.t, roughness: 0.7, emissive: 0xFFFFFF, emissiveMap: TEX_SIGNS.tea.t, emissiveIntensity: 0.3, transparent: true,
  }), 0, 2.36, -0.86, true);
  g.add(sg);
  g.userData = { bulb, light: bl, steam };
  return g;
}
function buildSteam() {
  const n = 90, pos = new Float32Array(n * 3), seed = new Float32Array(n);
  for (let i = 0; i < n; i++) { seed[i] = hash1(i * 2.3); pos[i * 3] = (hash1(i) - 0.5) * 0.16; pos[i * 3 + 1] = 0; pos[i * 3 + 2] = (hash1(i + 5) - 0.5) * 0.16; }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setAttribute('aSeed', new THREE.BufferAttribute(seed, 1));
  const m = new THREE.ShaderMaterial({
    /* NO fog:true. ShaderMaterial defaults to fog:false; enabling fog without
       fogColor/fogDensity makes three.js refreshFogUniforms() throw on the
       first draw -- a black screen with a stack trace inside three.js. */
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    uniforms: { uTime: U.time, uCol: { value: new THREE.Color(0xC8B89A) } },
    vertexShader: `
      attribute float aSeed; uniform float uTime; varying float vA;
      void main(){
        float period = 3.4 + aSeed * 2.0;
        float ph = mod( uTime * 0.55 + aSeed * period, period ) / period;
        vec3 p = position;
        p.y += ph * 1.25;
        p.x += sin( uTime * 0.7 + aSeed * 12.0 ) * ph * 0.28;
        p.z += cos( uTime * 0.6 + aSeed * 9.0 ) * ph * 0.2;
        vA = sin( ph * 3.14159 ) * 0.42;
        vec4 mv = modelViewMatrix * vec4( p, 1.0 );
        gl_PointSize = clamp( ( 24.0 + ph * 90.0 ) * 30.0 / -mv.z, 1.0, 60.0 );
        gl_Position = projectionMatrix * mv;
      }`,
    fragmentShader: `
      uniform vec3 uCol; varying float vA;
      void main(){
        float d = length( gl_PointCoord - 0.5 );
        float a = smoothstep( 0.5, 0.0, d ) * vA;
        gl_FragColor = vec4( uCol, a * 0.3 );
      }`,
  });
  const p = new THREE.Points(geo, m); p.frustumCulled = false; return p;
}

/* ------------------------------ traffic signal ---------------------------- */
function buildTrafficSignal() {
  const g = new THREE.Group();
  const steel = mat(0x33393E, { metal: 0.7, rough: 0.45, flat: false });
  g.add(mesh(new THREE.CylinderGeometry(0.09, 0.12, 5.4, 10), steel, 0, 2.7, 0, true));
  const head = new THREE.Group(); head.position.set(0, 5.5, 0); g.add(head);
  head.add(mesh(new THREE.BoxGeometry(0.34, 1.0, 0.3), mat(0x1A1E22, { rough: 0.7 }), 0, 0, 0, true));
  const lamps = [];
  const cols = [0xEF4444, 0xF59E0B, 0x22C55E];
  for (let i = 0; i < 3; i++) {
    const lm = mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.04, 12), new THREE.MeshStandardMaterial({ color: cols[i], emissive: cols[i], emissiveIntensity: i === 0 ? 3.4 : 0.15, roughness: 0.3 }), 0, 0.32 - i * 0.32, -0.16);
    lm.rotation.x = PI / 2; head.add(lm); lamps.push(lm);
    const gl = glowSprite(cols[i], 0.9, i === 0 ? 0.6 : 0.06); gl.position.set(0, 0.32 - i * 0.32, -0.22); head.add(gl);
  }
  /* pedestrian signal on the near side */
  g.userData = { lamps, head };
  return g;
}

/* -------------------------------- hoarding -------------------------------- */
/** Big backlit hoarding — the sodium-lit skyline's loudest rectangle. */
function buildHoarding() {
  const g = new THREE.Group();
  const t = (() => {
    const { c, x } = makeCanvas(1024, 512);
    const bg = x.createLinearGradient(0, 0, 1024, 512);
    bg.addColorStop(0, '#12203A'); bg.addColorStop(0.55, '#2A1440'); bg.addColorStop(1, '#7A1E1E');
    x.fillStyle = bg; x.fillRect(0, 0, 1024, 512);
    x.textAlign = 'center'; x.textBaseline = 'middle';
    x.fillStyle = '#FFE9B0'; x.shadowColor = '#F59E0B'; x.shadowBlur = 26;
    x.font = `800 92px ${FONT_TAMIL}`; x.fillText('ஒரே ஒரு போன் போதும்', 512, 132);
    x.font = `800 62px ${FONT_COND}`; x.fillStyle = '#FFFFFF'; x.fillText('JUST ONE CALL', 512, 224);
    x.shadowBlur = 0;
    x.font = `600 34px ${FONT_COND}`; x.fillStyle = 'rgba(255,233,176,0.92)';
    x.fillText('BUS ROUTE  ·  TIMING  ·  SMS  —  NO APP, NO DATA, NO SMARTPHONE', 512, 300);
    x.fillStyle = '#F59E0B'; x.font = `800 74px ${FONT_MONO}`; x.fillText('044 2479 4705', 512, 396);
    x.fillStyle = 'rgba(255,255,255,0.7)'; x.font = `600 26px ${FONT_COND}`;
    x.fillText('CHENNAI MOBILITY AI  ·  VOICE-FIRST TRANSIT FOR EVERY PHONE', 512, 466);
    x.strokeStyle = 'rgba(245,158,11,0.85)'; x.lineWidth = 10; x.strokeRect(6, 6, 1012, 500);
    return canvasTexture(c);
  })();
  const panel = mesh(new THREE.BoxGeometry(14, 7, 0.3), new THREE.MeshStandardMaterial({
    map: t, roughness: 0.55, emissive: 0xFFFFFF, emissiveMap: t, emissiveIntensity: 1.05,
  }), 0, 11.5, 0, true);
  g.add(panel);
  const frame = mat(0x2A2F34, { metal: 0.7, rough: 0.5 });
  for (const sx of [-1, 1]) { g.add(mesh(new THREE.CylinderGeometry(0.22, 0.28, 11.6, 8), frame, sx * 6.4, 5.8, 0.1, true)); }
  g.add(mesh(new THREE.BoxGeometry(14.6, 0.4, 0.5), frame, 0, 15.2, 0.1, true));
  /* floodlights washing the panel */
  for (const sx of [-4.5, 0, 4.5]) {
    const fl = mesh(new THREE.BoxGeometry(0.5, 0.24, 0.3), mat(0x2A2F34, { metal: 0.8, rough: 0.35 }), sx, 15.5, -0.5, true);
    g.add(fl);
    const em = mesh(new THREE.PlaneGeometry(0.44, 0.18), new THREE.MeshStandardMaterial({ color: 0xFFF0D0, emissive: 0xFFD9A0, emissiveIntensity: 4 }), sx, 15.42, -0.36);
    em.rotation.x = -0.5; g.add(em);
    const cone = buildLightCone(3.4, 8.0, 0xFFD9A0, 0.10);
    cone.position.set(sx, 11.5, -0.5); g.add(cone);
  }
  const gl = glowSprite(0xFFD9A0, 26, 0.14); gl.position.set(0, 11.5, -1.5); g.add(gl);
  g.userData = { panel, tex: t };
  return g;
}

/* ------------------------------ shop signage ------------------------------ */
const TEX_SIGNS = {};
function buildSignTextures() {
  const S = [
    ['ஸ்ரீ பாலாஜி மெடிக்கல்ஸ்', 'SRI BALAJI MEDICALS', '#8E1B1B'],
    ['பொன்னி மெஸ்', 'PONNI MESS · MEALS Rs.60', '#2F5D50'],
    ['தேநீர் கடை', 'TEA · COFFEE · KADAI', '#7A4A12'],
    ['லட்சுமி டெக்ஸ்டைல்ஸ்', 'LAKSHMI TEXTILES', '#6B2352'],
    ['பைரவன் எலக்ட்ரிக்கல்ஸ்', 'BAIRAVAN ELECTRICALS', '#22406B'],
    ['XEROX · STD BOOTH', 'PHOTOCOPY · RECHARGE · XEROX', '#1F5B4A'],
    ['அருண் செல்போன் கேர்', 'ARUN MOBILE CARE', '#7A2E2E'],
    ['A2B · ADYAR ANANDA BHAVAN', 'PURE VEGETARIAN', '#3E5C1E'],
    ['சரவண ஸ்டோர்ஸ்', 'SARAVANA STORES', '#8A5A12'],
    ['IRANI TEA · BAKERY', 'OPEN ALL NIGHT', '#5B2A2A'],
  ];
  S.forEach((s, i) => { TEX_SIGNS['s' + i] = { t: texSign(s[0], s[1], s[2]), tamil: s[0], latin: s[1] }; });
  TEX_SIGNS.tea = { t: texSign('தேநீர்', 'TEA ₹10', '#7A4A12', '#FFE9B0', 384, 128) };
  TEX_SIGNS.list = S;
  return TEX_SIGNS;
}

/* ------------------------------- streetscape ------------------------------ */
/** Rows of Chennai buildings with shopfronts, tanks, antennas and cabling. */
function buildStreetscape(scene, W) {
  const r = rng(20260105);
  const facades = TEX.facades;
  const buildings = [];
  const addRow = (zBase, dir, seedOff) => {
    let x = -260;
    let i = 0;
    while (x < 260) {
      const w = 9 + r() * 11;
      const d = 11 + r() * 9;
      const h = 8 + r() * 19;
      const z = zBase + dir * (d / 2);
      const b = buildBlock(w, h, d, facades[(i + seedOff) % facades.length], r);
      b.position.set(x + w / 2, 0, z);
      scene.add(b); buildings.push(b);
      /* ground-floor shop */
      if (Math.abs(x) < 130 && r() < 0.86) {
        const shop = buildShopfront(w, dir, (i * 3 + seedOff) % TEX_SIGNS.list.length, r);
        shop.position.set(x + w / 2, 0, zBase + dir * 0.16);
        scene.add(shop);
      }
      x += w + 0.6 + r() * 2.6;
      i++;
    }
  };
  addRow(L.buildNearZ, 1, 0);        // behind the shelter
  addRow(L.buildFarZ, -1, 4);        // across the road

  /* overhead cable catenaries between the lamp columns */
  const cableMat = new THREE.LineBasicMaterial({ color: 0x0A0C0E, transparent: true, opacity: 0.9 });
  for (let i = -4; i <= 4; i++) {
    const x0 = i * 26, x1 = (i + 1) * 26;
    for (let k = 0; k < 4; k++) {
      const y = L.lampH - 0.7 - k * 0.26, sag = 0.85 + k * 0.22;
      const pts = [];
      for (let s = 0; s <= 14; s++) {
        const u = s / 14;
        pts.push(v3(lerp(x0, x1, u), y - Math.sin(u * PI) * sag, L.lampZ + 0.24 + k * 0.05));
      }
      const line = new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), cableMat);
      line.userData.noReflect = true;
      scene.add(line);
    }
  }
  W.buildings = buildings;
  return buildings;
}

function buildBlock(w, h, d, facadeTex, r) {
  const g = new THREE.Group();
  const t = facadeTex.clone(); t.needsUpdate = true;
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(Math.max(1, Math.round(w / 6)), Math.max(1, Math.round(h / 9)));
  const side = new THREE.MeshStandardMaterial({ map: t, roughness: 0.88, metalness: 0.02, color: 0xB8B2A8 });
  const plainTex = TEX.concrete;
  const plain = new THREE.MeshStandardMaterial({ map: plainTex, color: 0x53514C, roughness: 0.92, metalness: 0.02 });
  const body = mesh(new THREE.BoxGeometry(w, h, d), [side, side, plain, plain, plain, plain], 0, h / 2, 0, true, true);
  g.add(body);
  /* parapet */
  g.add(mesh(new THREE.BoxGeometry(w + 0.35, 0.5, d + 0.35), plain, 0, h + 0.25, 0, true));
  /* rooftop water tanks — unmistakably Chennai */
  const tankMat = new THREE.MeshStandardMaterial({ color: 0x1F5B8C, roughness: 0.55, metalness: 0.05 });
  const tankMat2 = new THREE.MeshStandardMaterial({ color: 0x111418, roughness: 0.7 });
  const nt = 1 + Math.floor(r() * 3);
  for (let i = 0; i < nt; i++) {
    const rr2 = 0.55 + r() * 0.5;
    const tk = mesh(new THREE.CylinderGeometry(rr2, rr2, rr2 * 1.7, 12), r() < 0.6 ? tankMat : tankMat2,
      (r() - 0.5) * (w - 2.4), h + 0.5 + rr2 * 0.85, (r() - 0.5) * (d - 2.4), true);
    g.add(tk);
    g.add(mesh(new THREE.CylinderGeometry(rr2 * 1.03, rr2 * 1.03, 0.07, 12), mat(0x2A2F34, { rough: 0.7 }), tk.position.x, tk.position.y + rr2 * 0.88, tk.position.z, true));
  }
  /* TV antenna + telecom pole */
  if (r() < 0.5) {
    const a = new THREE.Group(); a.position.set((r() - 0.5) * w * 0.6, h + 0.5, (r() - 0.5) * d * 0.5);
    a.add(mesh(new THREE.CylinderGeometry(0.035, 0.035, 3.2, 6), mat(0x6A7076, { metal: 0.8, rough: 0.4 }), 0, 1.6, 0, true));
    for (let i = 0; i < 5; i++) a.add(mesh(new THREE.BoxGeometry(1.5 - i * 0.2, 0.03, 0.03), mat(0x8A9096, { metal: 0.8, rough: 0.4 }), 0, 2.4 + i * 0.16, 0, true));
    g.add(a);
  }
  /* air-conditioner condensers on the facade */
  for (let i = 0; i < 3; i++) {
    if (r() < 0.45) continue;
    const y = 3.5 + r() * (h - 5);
    g.add(mesh(new THREE.BoxGeometry(0.9, 0.6, 0.4), mat(0xB9B6AE, { rough: 0.6, metal: 0.2 }), (r() - 0.5) * (w - 1.6), y, -d / 2 - 0.2, true));
  }
  return g;
}

function buildShopfront(w, dir, signIdx, r) {
  const g = new THREE.Group();
  const sw = Math.min(w - 1.2, 4.2 + r() * 3.2);
  const st = TEX.shutters[signIdx % TEX.shutters.length];
  const shutter = mesh(new THREE.PlaneGeometry(sw, 2.7), new THREE.MeshStandardMaterial({ map: st, roughness: 0.72, metalness: 0.25 }), 0, 1.45, -dir * 0.02, false, true);
  shutter.rotation.y = dir > 0 ? PI : 0;
  g.add(shutter);
  /* signboard above */
  const S = TEX_SIGNS['s' + signIdx];
  const signMat = new THREE.MeshStandardMaterial({ map: S.t, roughness: 0.55, emissive: 0xFFFFFF, emissiveMap: S.t, emissiveIntensity: 0.55 });
  const sign = mesh(new THREE.PlaneGeometry(sw * 1.02, sw * 0.3), signMat, 0, 3.25, -dir * 0.06);
  sign.rotation.y = dir > 0 ? PI : 0;
  g.add(sign);
  g.add(mesh(new THREE.BoxGeometry(sw * 1.08, sw * 0.34, 0.12), mat(0x1A1E22, { rough: 0.8 }), 0, 3.25, dir * 0.02));
  /* tube light washing the sign */
  const tubeCol = r() < 0.5 ? 0xFFE0A8 : 0xD6EAFF;
  const tube = mesh(new THREE.BoxGeometry(sw * 0.9, 0.05, 0.06), new THREE.MeshStandardMaterial({ color: tubeCol, emissive: tubeCol, emissiveIntensity: 3.2, roughness: 0.3 }), 0, 2.95, -dir * 0.14);
  g.add(tube);
  if (r() < 0.45) {
    const pl = new THREE.PointLight(tubeCol, 42, 9, 2); pl.position.set(0, 2.9, -dir * 0.5); g.add(pl);
  }
  /* spilling warm interior light on the wet pavement */
  if (r() < 0.5) {
    const spill = new THREE.Mesh(new THREE.PlaneGeometry(sw * 1.3, 3.6).rotateX(-PI / 2),
      new THREE.MeshBasicMaterial({ color: 0xFFB45C, transparent: true, opacity: 0.16, blending: THREE.AdditiveBlending, depthWrite: false }));
    spill.position.set(0, L.footY + 0.014, dir * 1.8);
    spill.userData.noReflect = true;
    g.add(spill);
  }
  /* parked two-wheeler or a stack of crates */
  if (r() < 0.4) {
    const bike = buildScooter();
    bike.position.set((r() - 0.5) * sw, 0, dir * 1.9);
    bike.rotation.y = dir > 0 ? PI * 0.5 + r() * 0.4 : -PI * 0.5 + r() * 0.4;
    g.add(bike);
  }
  return g;
}

/* -------------------------------- scooter --------------------------------- */
function buildScooter() {
  const g = new THREE.Group();
  const body = mat(0x2A2E33, { metal: 0.5, rough: 0.42, flat: false });
  const paint = [0x8E1B1B, 0x1E3A5C, 0x2E3B2E, 0x4A4A4A, 0x6B2352][Math.floor(hash1(g.id) * 5)] || 0x8E1B1B;
  const shell = mat(paint, { metal: 0.35, rough: 0.35, flat: false });
  for (const sx of [-0.62, 0.62]) {
    const wheel = mesh(new THREE.TorusGeometry(0.28, 0.075, 8, 18), mat(0x0E1012, { rough: 0.95 }), sx, 0.28, 0, true);
    wheel.rotation.y = PI / 2; g.add(wheel);
    g.add(mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.07, 10), mat(0x9A9FA5, { metal: 0.9, rough: 0.3 }), sx, 0.28, 0, true).rotateZ(PI / 2));
  }
  g.add(mesh(new THREE.BoxGeometry(1.1, 0.22, 0.3), shell, 0, 0.5, 0, true));
  g.add(mesh(new THREE.BoxGeometry(0.42, 0.1, 0.3), mat(0x1A1C1E, { rough: 0.9 }), -0.15, 0.66, 0, true));
  const steer = mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.62, 6), body, 0.5, 0.86, 0, true);
  steer.rotation.z = -0.22; g.add(steer);
  g.add(mesh(new THREE.BoxGeometry(0.06, 0.06, 0.52), body, 0.58, 1.14, 0, true));
  g.add(mesh(new THREE.SphereGeometry(0.11, 10, 8), shell, 0.6, 1.05, 0, true));
  const hl = mesh(new THREE.CircleGeometry(0.06, 10), new THREE.MeshStandardMaterial({ color: 0xFFF3D0, emissive: 0xFFE0A0, emissiveIntensity: 1.4 }), 0.7, 1.05, 0);
  hl.rotation.y = PI / 2; g.add(hl);
  return g;
}

/* ----------------------------------- rain --------------------------------- */
/**
 * One draw call: 9000 line segments falling through a box that follows the
 * camera, lit by the sodium lamps. Density and wind are driven by the clock so
 * the storm thins out for the golden-hour finale.
 */
function buildRain(scene) {
  const COUNT = 9000;
  const BOX = { x: 120, y: 46, z: 120 };
  const pos = new Float32Array(COUNT * 6);
  const seed = new Float32Array(COUNT * 2);
  const tip = new Float32Array(COUNT * 2);
  const r = rng(4711);
  for (let i = 0; i < COUNT; i++) {
    const x = (r() - 0.5) * BOX.x, y = r() * BOX.y, z = (r() - 0.5) * BOX.z;
    const len = 0.35 + r() * 0.95;
    /* BOTH ends of the segment carry the drop's origin, and `aTip` says which
       end this vertex is. Deriving the fall from a shared origin means the
       streak keeps its exact length when it wraps around the box — otherwise
       ~2% of drops flash as full-height lightning streaks every frame. */
    pos[i * 6] = x; pos[i * 6 + 1] = y; pos[i * 6 + 2] = z;
    pos[i * 6 + 3] = x; pos[i * 6 + 4] = y; pos[i * 6 + 5] = z;
    tip[i * 2] = 0; tip[i * 2 + 1] = len;
    seed[i * 2] = r(); seed[i * 2 + 1] = len;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setAttribute('aSeed', new THREE.BufferAttribute(seed, 2));
  geo.setAttribute('aTip', new THREE.BufferAttribute(tip, 2));
  geo.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 400);

  const m = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, blending: THREE.NormalBlending, fog: false,
    uniforms: {
      uTime: U.time, uDensity: { value: 1 }, uWind: { value: new THREE.Vector2(1.5, 0.35) },
      uBox: { value: new THREE.Vector3(BOX.x, BOX.y, BOX.z) },
      uCol: { value: new THREE.Color(0xBFD4E6) }, uWarm: { value: new THREE.Color(0xFFCB7A) },
      uLamps: { value: [] }, uOpacity: { value: 0.5 },
    },
    vertexShader: `
      attribute vec2 aSeed;
      attribute vec2 aTip;                       // x = 0 head / len tail, y = length
      uniform float uTime, uDensity;
      uniform vec2 uWind; uniform vec3 uBox;
      varying float vA; varying float vWarm;
      void main() {
        float speed = 24.0 + aSeed.x * 16.0;
        vec3 p = position;
        float fall = mod( p.y - uTime * speed + aSeed.x * uBox.y, uBox.y );
        float dy = fall - p.y;                   // total descent since t = 0
        p.y = fall - aTip.x;                     // head, or head minus its length
        p.x += uWind.x * ( dy / speed ) + sin( uTime * 0.6 + aSeed.x * 20.0 ) * 0.16;
        p.z += uWind.y * ( dy / speed );
        vA = uDensity * ( 0.22 + aSeed.x * 0.78 ) * ( aTip.x > 0.0 ? 0.55 : 1.0 );
        vWarm = 0.0;
        gl_Position = projectionMatrix * modelViewMatrix * vec4( p, 1.0 );
      }`,
    fragmentShader: `
      uniform vec3 uCol, uWarm; uniform float uOpacity, uDensity;
      varying float vA; varying float vWarm;
      void main() {
        if ( vA < 0.02 ) discard;
        vec3 c = mix( uCol, uWarm, vWarm );
        gl_FragColor = vec4( c, vA * uOpacity );
      }`,
  });
  const rain = new THREE.LineSegments(geo, m);
  rain.frustumCulled = false;
  rain.renderOrder = 5;
  const group = new THREE.Group();
  group.add(rain);
  scene.add(group);

  /* ground splashes: tiny expanding rings where drops land */
  const SN = 900;
  const sp = new Float32Array(SN * 3), ss = new Float32Array(SN);
  for (let i = 0; i < SN; i++) {
    sp[i * 3] = (hash1(i * 1.7) - 0.5) * 90;
    sp[i * 3 + 1] = L.roadY + 0.02;
    sp[i * 3 + 2] = (hash1(i * 3.1) - 0.5) * 60 + 4;
    ss[i] = hash1(i * 5.3);
  }
  const sgeo = new THREE.BufferGeometry();
  sgeo.setAttribute('position', new THREE.BufferAttribute(sp, 3));
  sgeo.setAttribute('aSeed', new THREE.BufferAttribute(ss, 1));
  const sm = new THREE.ShaderMaterial({
    /* see buildSteam: fog:true without fog uniforms throws in refreshFogUniforms */
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    uniforms: { uTime: U.time, uDensity: { value: 1 }, uCol: { value: new THREE.Color(0xFFD9A0) } },
    vertexShader: `
      attribute float aSeed; uniform float uTime, uDensity; varying float vA;
      void main(){
        float period = 0.55 + aSeed * 0.5;
        float ph = mod( uTime + aSeed * period, period ) / period;
        vA = ( 1.0 - ph ) * uDensity * ( 0.3 + aSeed * 0.7 );
        vec4 mv = modelViewMatrix * vec4( position, 1.0 );
        gl_PointSize = clamp( ( 2.0 + ph * 22.0 ) * 44.0 / -mv.z, 1.0, 44.0 );
        gl_Position = projectionMatrix * mv;
      }`,
    fragmentShader: `
      uniform vec3 uCol; varying float vA;
      void main(){
        float d = length( gl_PointCoord - 0.5 );
        float ring = smoothstep( 0.5, 0.42, d ) * smoothstep( 0.18, 0.34, d );
        gl_FragColor = vec4( uCol, ring * vA * 0.5 );
      }`,
  });
  const splash = new THREE.Points(sgeo, sm);
  splash.frustumCulled = false;
  group.add(splash);

  return { group, rain, splash, mat: m, smat: sm, BOX };
}
