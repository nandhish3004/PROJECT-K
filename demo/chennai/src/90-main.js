/* ============================================================================
   90-main.js · boot, assembly and the autonomous 150-second projection
   ----------------------------------------------------------------------------
   No OrbitControls. No transport UI. The picture starts on the first frame and
   runs to 02:30:00 on its own, then holds on the title card and loops.
   The only affordances are audio unlock (a browser requirement, never a gate)
   and an optional recorder.
   ========================================================================== */

/* --------------------------------------------------------------------------
   QUALITY PRESETS

   A presentation cannot be a science experiment. The adaptive governor still
   exists as a safety net, but the film now STARTS at a tier that is known to
   hold frame rate on modest hardware, and only ever steps DOWN from there. It
   used to start at ULTRA and take ~2 s of visibly stuttering frames to discover
   it had to back off, which is the worst possible first impression.

   Override with the URL:
     ?q=high    prettier  (reflections + shadows + 1.5x DPR) for recording
     ?q=low     cheapest
     (default)  presentation: smooth first, detail second
   -------------------------------------------------------------------------- */
const PRESETS = {
  high:         { dpr: 1.5, reflect: true,  shadows: true,  start: 3, grain: true,  beads: 34 },
  /* The default: what a live demo gets. No mirror pass, NO shadow pass (each is
     a full extra scene render), grain off, fewer lens beads, and the drawing
     buffer capped at 720p and scaled up by CSS. On a projector that is
     indistinguishable and several times cheaper. */
  presentation: { dpr: 1.0, reflect: false, shadows: false, start: 2, grain: false, beads: 8, maxPx: 1280 * 720 },
  low:          { dpr: 0.85, reflect: false, shadows: false, start: 1, grain: false, beads: 8 },
};
function pickPreset() {
  try {
    const q = (window.location && window.location.search || '').toLowerCase();
    if (/[?&]q=high\b/.test(q)) return 'high';
    if (/[?&]q=low\b/.test(q)) return 'low';
  } catch (e) {}
  return 'presentation';
}
const PRESET_NAME = pickPreset();
const PRESET = PRESETS[PRESET_NAME];

const FILM = {
  t: 0, running: true, speed: 1, hold: 9,
  frames: 0, fps: 60, msAvg: 8, quality: PRESET.start,
  recording: false, recFixed: true,
  /* governor's multiplier on the pixel budget; 1 = the tier's allotment */
  pxScale: 1.0,
};

/* ---------------------------------------------------------------- fatal card */
function fatal(title, body) {
  const el = document.getElementById('fatal');
  if (el) {
    el.hidden = false;
    el.removeAttribute('hidden');          /* the attribute alone wins in some browsers */
    el.style.display = 'block';
    const esc = function (x) {
      return String(x).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    };
    el.innerHTML = '<div class="fcard"><h1>' + esc(title) + '</h1><p>'
      + esc(body).replace(/\n/g, '<br>') + '</p><p style="margin-top:14px;font-size:11px;color:#6b7280">'
      + 'build ' + esc(BUILD_ID) + '</p></div>';
  }
  const d = document.getElementById('diag');
  if (d) d.textContent = 'FATAL: ' + title;
  try { if (window.console) console.error('[fatal]', title, body); } catch (e) {}
}

/* --------------------------------------------------------------------------
   Nothing is allowed to fail silently. A black rectangle is indistinguishable
   from a dead page, so every failure path -- uncaught error, rejected boot
   promise, lost GPU context, or a loop that simply never paints -- has to put
   something legible on screen.
   -------------------------------------------------------------------------- */
let __painted = false;
function armBootWatchdog() {
  setTimeout(function () {
    if (__painted) return;
    const el = document.getElementById('fatal');
    if (el && el.hidden) {
      fatal('NOTHING RENDERED',
        'The page loaded but the film never painted a single frame, so WebGL '
        + 'could not start in this browser. Check that hardware acceleration is '
        + 'enabled (chrome://gpu), then open the developer console with F12 and '
        + 'copy whatever is printed in red.');
    }
  }, 20000);
}
if (typeof window !== 'undefined' && window.addEventListener) {
  window.addEventListener('error', function (e) {
    if (__painted) return;
    const msg = String((e && e.message) || 'unknown error');
    let where = '', st = '';
    try { if (e && e.lineno) where = '\n' + String(e.filename || '').split('/').pop() + ':' + e.lineno + ':' + e.colno; } catch (x) {}
    try { if (e && e.error && e.error.stack) st = '\n\n' + String(e.error.stack).split('\n').slice(0, 8).join('\n'); } catch (x) {}
    fatal('SCRIPT ERROR', msg + where + st);
    const d = document.getElementById('diag');
    if (d) d.textContent = 'ERR ' + msg + where + st;
  });
  window.addEventListener('unhandledrejection', function (e) {
    const r = e && e.reason;
    let st = '';
    try { if (r && r.stack) st = '\n\n' + String(r.stack).split('\n').slice(0, 8).join('\n'); } catch (x) {}
    if (!__painted) fatal('BOOT REJECTED', String((r && r.message) || r) + st);
  });
}
let GLVER = 'WebGL ?';
function describeGL(renderer) {
  try {
    const g = renderer.getContext();
    GLVER = (renderer.capabilities && renderer.capabilities.isWebGL2) ? 'WebGL2' : 'WebGL1';
    const dbg = g.getExtension && g.getExtension('WEBGL_debug_renderer_info');
    if (dbg) GLVER += ' \u00b7 ' + String(g.getParameter(dbg.UNMASKED_RENDERER_WEBGL)).slice(0, 42);
  } catch (e) {}
}

/* ------------------------------------------------------------- environment */
/**
 * A PMREM of a hand-built gradient dome. r160's UMD core ships no
 * RoomEnvironment, so the wet chrome, bus paint and handset plastic get their
 * specular interest from this instead: cold indigo overhead, sodium at the
 * horizon, one hot practical where the streetlamps would be.
 */
function makeEnvironment(renderer) {
  const pmrem = new THREE.PMREMGenerator(renderer);
  const es = new THREE.Scene();
  const dome = new THREE.Mesh(
    new THREE.SphereGeometry(60, 32, 20),
    new THREE.ShaderMaterial({
      side: THREE.BackSide, depthWrite: false,
      uniforms: {
        uTop: { value: new THREE.Color(0x0B132B) },
        uHor: { value: new THREE.Color(0x3A2A1E) },
        uGlow: { value: new THREE.Color(0xF59E0B) },
        uGround: { value: new THREE.Color(0x12161A) },
      },
      vertexShader: `varying vec3 vD; void main(){ vD = normalize(position);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
      fragmentShader: `varying vec3 vD; uniform vec3 uTop, uHor, uGlow, uGround;
        void main(){
          float h = clamp(vD.y, -1.0, 1.0);
          vec3 c = mix(uHor, uTop, smoothstep(0.0, 0.62, h));
          c = mix(uGround, c, smoothstep(-0.28, 0.03, h));
          float band = exp(-pow((h - 0.015) * 11.0, 2.0));
          float az = pow(max(0.0, dot(normalize(vec3(vD.x,0.0,vD.z)), normalize(vec3(-0.7,0.0,0.5)))), 5.0);
          c += uGlow * band * (0.30 + 0.85 * az);
          gl_FragColor = vec4(c, 1.0);
        }`,
    })
  );
  dome.frustumCulled = false;
  es.add(dome);
  /* two emissive cards so metal picks up a readable highlight */
  const card = (col, x, y, z, sx, sy) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(sx, sy),
      new THREE.MeshBasicMaterial({ color: col, side: THREE.DoubleSide }));
    m.position.set(x, y, z); m.lookAt(0, 0, 0); es.add(m);
  };
  card(0xFFC46B, -22, 9, 14, 26, 8);
  card(0x9FC4FF, 18, 16, -20, 30, 12);
  card(0x2A3644, 0, -18, 6, 44, 44);

  const rt = pmrem.fromScene(es, 0.035);
  pmrem.dispose();
  es.traverse((o) => { if (o.geometry) o.geometry.dispose(); if (o.material) o.material.dispose(); });
  return rt.texture;
}

/* ------------------------------------------------------------------- lights */
function buildLights(scene) {
  const hemi = new THREE.HemisphereLight(0x3A4E75, 0x141A26, 0.85);
  scene.add(hemi);

  /* One and only one shadow-casting light. Everything else is a practical. */
  const key = new THREE.DirectionalLight(0xBFD4F2, 0.85);
  key.position.set(-60, 90, 70);
  key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);   /* 2048^2 PCF-soft re-renders the scene each frame for one key */
  key.shadow.camera.left = -58; key.shadow.camera.right = 58;
  key.shadow.camera.top = 58; key.shadow.camera.bottom = -58;
  key.shadow.camera.near = 8; key.shadow.camera.far = 340;
  key.shadow.bias = -0.0009;
  key.shadow.normalBias = 0.028;
  key.shadow.radius = 2.2;
  const tgt = new THREE.Object3D(); tgt.position.set(0, 0, 14); scene.add(tgt);
  key.target = tgt;
  scene.add(key);

  /* low warm fill from the shopfronts and the tea kadai side of the street */
  const fill = new THREE.DirectionalLight(0xE08A2A, 0.30);
  fill.position.set(24, 14, 40);
  scene.add(fill);

  return { hemi, key, fill, tgt };
}

/* ========================================================================== */
/*  ASSEMBLY                                                                  */
/* ========================================================================== */
function assemble(renderer, scene) {
  const W = {};
  W.scene = scene;

  /* ---- textures first: nearly every builder reads from TEX ---- */
  buildTextures();
  buildSignTextures();

  /* ---- the reflector has to exist before the road material ---- */
  const reflector = new PlanarReflector(renderer, L.roadY);
  W.reflector = reflector;

  /* ---- street set ---- */
  Object.assign(W, buildStreet(scene, reflector));
  W.sky = buildSky(scene);
  buildStreetscape(scene, W);
  W.fog = scene.fog;

  /* ---- wide city, corridors, landmarks ---- */
  W.haze = buildGroundHaze(scene);
  W.city = buildCity(scene);
  W.route = buildRouteLane(scene);
  W.griev = buildGrievanceLane(scene);
  W.landmarks = buildLandmarks(scene);
  W.city.group.visible = false;            // gated by stateAt().cityVisible
  W.landmarks.group.visible = false;

  /* ---- cellular mast + the FastAPI gateway node ---- */
  W.tower = buildTower();
  W.tower.position.set(26, 0, 34);
  scene.add(W.tower);
  W.cloud = buildCloudNode();
  W.cloud.position.set(26, 92, 34);        // the 44 m beam lands on the mast top
  scene.add(W.cloud);
  W.ripples = buildAcousticRipples(scene);

  /* ---- the three rail systems that make this a CUMTA city ---- */
  W.metro = buildMetro(scene);
  W.rail = buildSuburbanRail(scene);
  W.mrts = buildMRTS(scene);

  /* ---- life on the street ---- */
  W.traffic = buildTraffic(scene);
  W.banners = buildGlitchBanners(scene);

  /* ---- the two MTC buses ---- */
  /* Hero: kerbSide +1 so that, heading east (rotation.y = -PI/2), its folding
     doors open onto the pavement rather than into live traffic. */
  W.busHero = buildMTCBus({ kerbSide: 1 });
  W.busHero.visible = false;
  scene.add(W.busHero);
  W.busFloor = W.busHero.userData.FLOOR;

  /* Aerial: a lighter build, sampled along the advertised GTFS trip. */
  W.busAerial = buildMTCBus({ detail: false });
  W.busAerial.visible = false;
  scene.add(W.busAerial);
  /* The aerial bus is only ever seen from far above in the finale. Its two
     SpotLights are 90 m of throw across the whole street -- every lit surface
     in frame pays for them -- and from that height the beam cone is all anyone
     reads anyway. Strip the lights, keep the cones. */
  {
    const n = bakeOutLights(W.busAerial, { radius: 7, opacity: 0.34 });
    const beams = W.busAerial.userData && W.busAerial.userData.beams;
    if (beams) for (const b of beams) if (b.spot) b.spot = null;
    if (window.console) console.log('[bake] aerial bus: ' + n + ' lights -> pools');
  }

  /* ---- floating 3D badges ---- */
  W.routeBadge = makeBadge([
    'GTFS SCHEDULED TIMETABLE',
    'BUS 54 / 54E  ·  ~35 MINS  ·  HEADWAY 8–10 MINS',
    'ZERO HALLUCINATION — FEED-BOUND, NOT GENERATED',
  ], { accent: '#EA580C', scale: 1.35 });
  W.routeBadge.position.set(0, 30, 0);
  scene.add(W.routeBadge);

  W.grievBadge = makeBadge([
    'MTC PORUR DEPOT · GRIEVANCE QUEUE',
    'DETERMINISTIC LOGGING — NO LLM IN THE PATH',
    '4 TICKETS FILED · REF GRV-4471 … 4474',
  ], { accent: '#60A5FA', scale: 1.35 });
  scene.add(W.grievBadge);

  /* ---- the elder ---- */
  W.elder = person({
    skin: 0x6B4A34, scale: 0.985, dhoti: true, dhotiBorder: 0xB91C1C,
    shirt: 0xD8D2C4, top: 0xD8D2C4, hair: 0xD9D9D9, bald: false,
    moustache: 0xD2D2D2, glasses: true, barefoot: true, sleeves: 0.62,
  });
  scene.add(W.elder.root);

  /* his walk to the bus door, measured off the berth geometry */
  W.walkCurve = new THREE.CatmullRomCurve3([
    v3(L.benchX, 0.16, L.benchZ - 0.20),
    v3(0.20, 0.16, 15.20),
    v3(0.34, 0.15, 13.10),
    v3(0.48, 0.02, 11.55),
    v3(L.busStopX + 4.15, 0.00, L.busLaneZ + 0.75),   // inside the front doorway
  ], false, 'centripetal', 0.5);

  /* ---- the handset, parented to his right hand ---- */
  W.phone = buildPhone();
  W.phoneAnchor = new THREE.Object3D();
  W.phoneAnchor.position.set(0.012, 0.030, -0.012);
  W.elder.arms.R.hand.add(W.phoneAnchor);
  W.phoneAnchor.add(W.phone);
  W.phone.userData.homeX = 0; W.phone.userData.homeY = 0; W.phone.userData.homeRZ = 0;

  /* ---- smartphone commuters inside the shelter ---- */
  W.phones = [];
  const commuters = [
    { p: [-2.75, 0, 15.55], ry: 0.30, o: { skin: 0x8A5E3C, top: 0x1F6FEB, trousers: 0x22262B, hair: 0x14110E, bag: 0x2A2E33 } },
    { p: [2.55, 0, 15.95], ry: -0.44, o: { skin: 0x7A5236, top: 0xE8DCC4, trousers: 0x2B3440, hair: 0x15120F, saree: false, bun: true } },
    { p: [-1.35, 0, 18.35], ry: 2.72, o: { skin: 0x6E4A31, top: 0x0F766E, trousers: 0x1D2228, hair: 0x14110E, cap: 0xB91C1C } },
    { p: [3.35, 0, 17.35], ry: -2.02, o: { skin: 0x93663F, kurta: true, top: 0xF2EEE3, trousers: 0x3A3F46, hair: 0x15120F, moustache: 0x1A1613 } },
  ];
  /* Four commuters inside the shelter are genuinely near camera, so they keep
     their rigs -- but they hold a phone still. Their screens stay live (they
     are the only thing that reads as "waiting for an app"), and the figures
     themselves are baked so nothing is re-posed per frame. */
  /* Only the fields crowdFigure actually models. The cap and moustache are
     lost; at this distance, in this light, they never resolved anyway. */
  const shelterSpecs = commuters.map((c, i) => ({
    pos: [c.p[0], c.p[1], c.p[2]],
    ry: c.ry,
    scale: 0.99 + (i % 3) * 0.014,
    skin: c.o.skin, cloth: c.o.top, lower: c.o.trousers,
    hair: c.o.hair, bag: c.o.bag,
    dhoti: !!c.o.dhoti, saree: !!c.o.saree,
    armPose: 'phone',           // every one of them is looking at a handset
  }));
  const shelterCrowd = crowdCluster(shelterSpecs);
  scene.add(shelterCrowd);
  freeze(shelterCrowd);          /* no per-frame matrix work for a still crowd */
  W.shelterCrowd = shelterCrowd;
  W.crowdRigs = [];             /* nothing in here is posed any more */

  /* ---- waiting crowd on the footpath, baked to one draw call ----
     These used to be fourteen skeletal rigs at ~20 meshes each, every one of
     them re-posed and re-multiplied per frame so a passer-by 40 m back could
     sway 0.7 radians. Standing commuters barely move; the sway was invisible
     and it was 280 animated objects in the update path every single frame.
     Merged into the same baked clusters the background crowd already used, so
     the footpath is three draw calls instead of three hundred. */
  const cluster = pavementCrowd(26, { x: 62, z: 9.5, z0: 18.6 }, 91);
  cluster.position.set(-6, 0.16, 0);
  scene.add(cluster);
  const cluster2 = pavementCrowd(14, { x: 30, z: 6, z0: 17.2 }, 233);
  cluster2.position.set(22, 0.16, 0);
  scene.add(cluster2);

  /* a stray at the kerb — every Chennai street has one */
  const dog = buildDog();
  dog.position.set(-7.4, 0.16, 13.9);
  dog.rotation.y = 0.9;
  scene.add(dog);
  W.dog = dog;

  freeze(W.city.group);
  freeze(W.landmarks.group);

  return W;
}

/* ========================================================================== */
/*  CALIBRATION — measure the handset so the macro keys frame it exactly       */
/* ========================================================================== */
function calibrate(W, t) {
  const S = stateAt(t, v3(0.4, 1.27, 15.9));
  drive(t, W, S);
  W.scene.updateMatrixWorld(true);
  const PH = {};
  const anchors = W.phone.userData.anchors;
  for (const name of Object.keys(anchors)) {
    PH[name] = W.phone.localToWorld(anchors[name].clone());
  }
  /* and where the phone centre is right now, for the runtime follow offset */
  PH.now = W.phone.getWorldPosition(v3());
  return PH;
}

/* ========================================================================== */
/*  BUILD STAMP                                                               */
/* ========================================================================== */
/* Replaced at build time with the commit and timestamp. Printed on the page so
   "is this the version I just deployed?" is answerable by looking, instead of
   guessing whether the browser or the CDN served a stale copy. */
const BUILD_ID = '/*__BUILD_ID__*/dev';

/* ========================================================================== */
/*  BOOT                                                                      */
/* ========================================================================== */
async function main() {
  const glc = document.getElementById('gl');
  const ovc = document.getElementById('overlay');
  if (!glc || !ovc) { fatal('CANVAS MISSING', 'The film needs both #gl and #overlay canvases.'); return; }

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({
      /* preserveDrawingBuffer:true makes the driver keep a GPU copy of every
         frame so drawImage() can read it back -- a large constant cost paid
         60x a second purely for the optional recorder. Opt in with ?rec. */
      canvas: glc, antialias: true, alpha: false, stencil: false,
      powerPreference: 'high-performance',
      preserveDrawingBuffer: !!(window.location && /[?&]rec\b/.test(window.location.search)),
    });
  } catch (err) {
    fatal('WEBGL UNAVAILABLE', 'This browser or device blocked WebGL, so the Chennai Mobility AI film cannot render. Try a desktop browser with hardware acceleration enabled.');
    return;
  }
  if (!renderer.getContext()) { fatal('WEBGL UNAVAILABLE', 'No WebGL context could be created.'); return; }
  describeGL(renderer);
  armBootWatchdog();
  if (glc.addEventListener) {
    glc.addEventListener('webglcontextlost', function (ev) {
      ev.preventDefault();
      fatal('GPU CONTEXT LOST', 'The browser dropped the WebGL context, so rendering stopped. This is usually a driver or GPU-memory problem. Reload the page.');
    }, false);
  }

  /* Resolution follows the preset. 2x DPR on a 1080p panel is 4x the pixels for
     no visible gain in a full-screen film; the presentation tier renders at 1x
     device pixels, which is the single largest saving available. */
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, PRESET.dpr));
  renderer.setSize(window.innerWidth, window.innerHeight, false);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.28;
  renderer.shadowMap.enabled = !!PRESET.shadows;
  /* PCFSoft filters 9 taps per fragment; PCF filters 4. At 1024 it is
     indistinguishable on a moving, rain-blurred night shot. */
  renderer.shadowMap.type = THREE.PCFShadowMap;
  renderer.setClearColor(0x05070C, 1);

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x121C33, 0.0125);
  /* Safety net: even if the sky dome were ever clipped or failed to compile,
     the background clears to atmospheric indigo rather than pure black, so the
     film can never present as a black rectangle. The sky mesh draws over it. */
  scene.background = new THREE.Color(0x121C33);

  const camera = new THREE.PerspectiveCamera(58, window.innerWidth / window.innerHeight, 0.012, 1400);
  camera.position.set(-104, 0.4, 6.6);
  /* OrbitControls are deliberately never constructed: the camera is a
     Catmull-Rom track driven entirely by the master clock. */

  try { scene.environment = makeEnvironment(renderer); }
  catch (e) { if (window.console) console.warn('[env] PMREM unavailable:', e.message); }
  const lights = buildLights(scene);

  let W;
  try {
    W = assemble(renderer, scene);
  } catch (err) {
    fatal('SCENE BUILD FAILED', String(err && err.message || err));
    if (window.console) console.error(err);
    return;
  }

  /* ---- measure the handset, then author the camera track against it ---- */
  const PH = calibrate(W, 30.0);
  const camTrack = buildCameraTrack(PH);

  /* ---- collect the geometry the mirror must not reflect ---- */
  const noReflect = [];
  scene.traverse((o) => { if (o.userData && o.userData.noReflect) noReflect.push(o); });
  noReflect.push(W.sky);

  /* ---- audio ---- */
  /* The build replaces this comment-plus-empty-object with the base64 stems.
     Written this way so the module still parses standalone in the harness. */
  const AUDIO_MANIFEST = /*__AUDIO_MANIFEST__*/{};
  let audioLoaded = false;
  AudioEngine.load(AUDIO_MANIFEST).then(() => {
    audioLoaded = true;
    AudioEngine.sync(FILM.t);
  }).catch(() => { audioLoaded = false; });

  function unlockAudio() {
    if (HUD.audioReady) return;
    AudioEngine.unlock().then((ok) => {
      if (!ok) return;
      HUD.audioReady = true;
      /* if we are still early, restart so nothing of the narration is missed;
         otherwise just carry on and drop the cues that already went by */
      if (FILM.t < 20) { FILM.t = 0; cueIdx = 0; }
      else { while (cueIdx < CUES.length && CUES[cueIdx].t < FILM.t - 0.1) cueIdx++; }
      AudioEngine.sync(FILM.t);
      AudioEngine.setMaster(0.95, 0.8);
    });
    try {
      if (document.documentElement.requestFullscreen && !document.fullscreenElement) {
        document.documentElement.requestFullscreen({ navigationUI: 'hide' }).catch(() => {});
      }
    } catch (e) {}
  }
  window.addEventListener('pointerdown', unlockAudio);
  window.addEventListener('keydown', unlockAudio);
  window.addEventListener('touchstart', unlockAudio, { passive: true });

  /* ---- cue firing: each cue fires exactly once per playthrough ---- */
  let cueIdx = 0;
  function fireCues(t) {
    if (!audioLoaded || !HUD.audioReady) { cueIdx = 0; return; }
    let guard = 0;
    while (cueIdx < CUES.length && CUES[cueIdx].t <= t && guard++ < 64) {
      const c = CUES[cueIdx++];
      if (t - c.t > 1.2) continue;                       // stale after a jump
      switch (c.kind) {
        case 'stem': AudioEngine.play(c.name, t, { gain: c.gain == null ? 1 : c.gain, phone: !!c.phone }); break;
        case 'dtmf': AudioEngine.dtmf(c.digit, t, c.dur, c.level); break;
        case 'keyClick': AudioEngine.keyClick(t, c.level); break;
        case 'smsBeep': AudioEngine.smsBeep(t, c.level); break;
        case 'vibrate': AudioEngine.vibrate(t, c.level); break;
        case 'airBrake': AudioEngine.airBrake(t, c.level); break;
        case 'horn': AudioEngine.horn(t, c.level, c.dur); break;
        case 'whoosh': AudioEngine.whoosh(t, c.level, c.dur, c.up !== false); break;
        case 'thunder': AudioEngine.thunder(t, c.level); break;
        case 'lineClick': AudioEngine.lineClick(t, c.level, !!c.down); break;
        case 'dialTone': AudioEngine.dialTone(t, c.dur, c.level); break;
        case 'blip': AudioEngine.blip(t, c.freq, c.level); break;
        case 'thud': AudioEngine.thud(t, c.level, c.freq); break;
      }
    }
  }

  /* ---- HUD canvas ---- */
  const octx = ovc.getContext('2d');
  let ow = 0, oh = 0;
  function resize() {
    const w = window.innerWidth, h = window.innerHeight;
    let pr = renderer.getPixelRatio();

    /* Cap total pixels. Shading cost is per-pixel, so this is the single
       strongest lever available: at the presentation tier we never shade more
       than ~0.9 MP no matter how large the window is, and the browser scales
       the result up with CSS for free (the GPU's texture filtering does it). */
    /* FILM.pxScale is the governor's throttle on the budget: 1.0 when healthy,
       0.55 when the machine cannot hold frame rate. Without this the governor
       had nothing left to give on the presentation tier, because the cap was
       re-applied from PRESET on every resize and immediately undid it. */
    if (PRESET.maxPx) {
      const budget = PRESET.maxPx * FILM.pxScale;
      const want = w * h * pr * pr;
      if (want > budget) pr = Math.max(0.4, pr * Math.sqrt(budget / want));
    }
    renderer.setPixelRatio(pr);
    renderer.setSize(w, h, false);
    /* The overlay is UI: bars, thin rules, small type and one screen of grain.
       At 1.5x DPR that is ~2M pixels of 2D fill per frame for detail no one can
       resolve. Capping at 1x halves the CPU cost and is invisible. */
    const prHud = Math.min(pr, 1);
    ow = Math.round(w * prHud); oh = Math.round(h * prHud);
    ovc.width = ow; ovc.height = oh;
    ovc.style.width = w + 'px'; ovc.style.height = h + 'px';
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    W.reflector.setSize(ow, oh);
  }
  window.addEventListener('resize', resize);
  resize();

  /* ---- keyboard ---------------------------------------------------------- */
  /* The MediaRecorder download path is gone: it captured the canvas in real
     time, so it baked dropped frames into the file, and it forced
     preserveDrawingBuffer. Exports go through the offline WebCodecs renderer
     instead. That leaves only the mute toggle here. */
  window.addEventListener('keydown', (ev) => {
    if (ev.key === 'm' || ev.key === 'M') { AudioEngine.muted = !AudioEngine.muted; AudioEngine.setMaster(0.95, 0.2); }
  });
  const recBtn = document.getElementById('rec');
  if (recBtn && recBtn.style) recBtn.style.display = 'none';

  /* ---- adaptive quality ------------------------------------------------- */
  const TIER_NAME = ['PERFORMANCE', 'BALANCED', 'HIGH', 'ULTRA'];
  /* How much of the pixel budget each tier is allowed. The dominant cost at
     every one of these resolutions is fragments, so this is the knob that
     actually moves frame rate; reflection and grain are switched off already
     on the presentation tier. */
  const TIER_PX = [0.55, 0.72, 0.88, 1.0];
  function applyTier() {
    const q = FILM.quality;
    FILM.pxScale = TIER_PX[q] != null ? TIER_PX[q] : 1.0;
    W.reflector.enabled = PRESET.reflect && q >= 2;
    W.reflector.scale = q >= 3 ? 0.35 : 0.5;
    renderer.setPixelRatio(q >= 3 ? Math.min(window.devicePixelRatio || 1, 1.5) : 1);
    resize();
  }

  function adapt(ms) {
    FILM.msAvg = FILM.msAvg * 0.94 + ms * 0.06;
    /* 90 frames (~1.5 s) before the governor even looks was too slow to rescue
       a bad first impression. Sample every 20 frames. */
    if (FILM.frames % 20) return;
    const pr = renderer.getPixelRatio();
    /* 21 ms (~48 fps) was far too forgiving: a 30 ms budget reads as lag on a
       projector. Step down at 15 ms, and never step back up beyond the tier we
       started in -- climbing mid-presentation is how you get a hitch at the
       worst moment. */
    if (FILM.msAvg > 15 && FILM.quality > 0) {
      FILM.quality--;
      applyTier();
      HUD.quality = TIER_NAME[FILM.quality];
    } else if (FILM.msAvg < 9 && FILM.quality < Math.min(3, PRESET.start)) {
      FILM.quality++;
      applyTier();
      HUD.quality = TIER_NAME[FILM.quality];
    }
  }

  /* ---- per-frame camera -------------------------------------------------- */
  const camPos = v3(), camTarget = v3(), followOff = v3(), anchorNow = v3();
  const FOG_NIGHT = new THREE.Color(0x121C33), FOG_DUSK = new THREE.Color(0x7A4A2C);
  let lastNow = performance.now();

  function sampleCamera(t, S) {
    camTrack.sample(t, camPos, camTarget);
    /* macro shots ride the subject: re-offset the whole curve by however far
       the handset has travelled since it was measured, weighted in and out so
       the wide shots stay locked to the street */
    if (S.followWeight > 0.001 && W.phoneAnchor) {
      W.phone.getWorldPosition(anchorNow);
      followOff.subVectors(anchorNow, PH.now).multiplyScalar(S.followWeight);
      camPos.add(followOff); camTarget.add(followOff);
    }
    camera.position.copy(camPos);
    camera.up.set(0, 1, 0);
    camera.lookAt(camTarget);

    /* fov + a rolling near/far pair: a 52 mm working distance and a 3 km
       horizon cannot share one depth range, so both move with the shot */
    const d = camera.position.distanceTo(camTarget);
    camera.near = clamp(d * 0.05, 0.010, 4.0);
    camera.far = S.cityVisible > 0.05 ? 15000 : 620;
    camera.updateProjectionMatrix();
    S.fov = camera.fov;
    S.near = camera.near; S.far = camera.far;
  }

  /* ---- the projection loop ---------------------------------------------- */
  function tick(now) {
    requestAnimationFrame(tick);
    const realDt = Math.min(0.1, (now - lastNow) / 1000);
    lastNow = now;

    /* while recording the clock is frame-locked to 1/60 so the exported file
       is exactly 150 s long and every cue lands on the frame it was authored
       for, no matter how long the GPU actually took */
    const dt = (FILM.recording && FILM.recFixed) ? (1 / 60) : realDt * FILM.speed;
    FILM.t += dt;
    FILM.frames++;

    if (FILM.t >= DURATION + FILM.hold) {          // auto-loop, no user input
      FILM.t = 0; cueIdx = 0;
      AudioEngine.stopAll(); AudioEngine.sync(0);
    }
    const t = Math.min(FILM.t, DURATION);

    const S = stateAt(t, camera.position);
    S.camPos = camera.position;

    drive(t, W, S);
    sampleCamera(t, S);

    /* The sky dome IS the background. Keep it centred on the camera and scaled
       to sit just inside whatever far plane this shot needs -- the wide street
       shots pull `far` down to 620, which would otherwise clip a 1500-radius
       dome completely and leave the frame showing nothing but the clear colour. */
    if (W.sky) {
      const SKY_R = 1500;
      W.sky.scale.setScalar(Math.min(SKY_R, camera.far * 0.72) / SKY_R);
      W.sky.position.copy(camera.position);
    }

    /* atmosphere */
    scene.fog.density = S.fogDensity;
    scene.fog.color.copy(FOG_NIGHT).lerp(FOG_DUSK, 1 - S.night);
    U.fogCol.value.copy(scene.fog.color);
    renderer.setClearColor(scene.fog.color, 1);
    lights.hemi.intensity = lerp(1.30, 0.85, S.night);
    lights.hemi.color.copy(new THREE.Color(0x2A3A5C)).lerp(new THREE.Color(0xFFD9A0), 1 - S.night);
    lights.key.intensity = lerp(2.85, 0.95, S.night);
    lights.key.color.copy(new THREE.Color(0xBFD4F2)).lerp(new THREE.Color(0xFFB066), 1 - S.night);
    lights.key.position.copy(U.sunDir.value).multiplyScalar(180).add(lights.tgt.position);
    lights.fill.intensity = lerp(0.75, 0.42, S.night);
    /* The shadow pass re-renders ~3,400 objects EVERY frame. The key light
       tracks a sun that moves fractions of a degree per frame, so bake the map
       at ~8 Hz on ground shots and freeze it when airborne. */
    lights.key.shadow.autoUpdate = false;
    if (S.closeToGround > 0.35) {
      if ((FILM.frames - (FILM._lastShadow | 0)) >= 8) { FILM._lastShadow = FILM.frames; lights.key.shadow.needsUpdate = true; }
    }

    /* the mirror pass only earns its cost when the road is actually in shot */
    /* The mirror is a SECOND full scene render. At 0.5 of a 1080p canvas that
       is more pixels than the main pass. 0.35 still reads as a wet road because
       the reflection is blurred by the ripple normals. */
    W.reflector.scale = 0.35;
    /* The mirror is a SECOND full scene render. On the presentation tier it is
       off entirely: the wet road still reads wet from the specular response and
       the ripple normals, and this is the second-largest saving after DPR. */
    const wantRefl = PRESET.reflect && W.reflector.enabled
      && S.reflAmt > 0.02 && S.closeToGround > 0.05;
    if (wantRefl) W.reflector.render(scene, camera, noReflect);
    U.reflAmt.value = wantRefl ? clamp01(S.reflAmt) : 0;

    renderer.render(scene, camera);
    __painted = true;

    /* Always-on telemetry. If the film ever looks wrong, this row says what the
       loop actually believes: clock, canvas size, draw calls, near/far, GPU. */
    if (FILM.frames % 15 === 0) {
      const dEl = document.getElementById('diag');
      if (dEl) {
        const sz = renderer.getSize(new THREE.Vector2());
        const calls = (renderer.info && renderer.info.render) ? renderer.info.render.calls : -1;
        dEl.textContent =
          't ' + t.toFixed(2) + ' / ' + DURATION + ' s    ' + Math.round(HUD.fps) + ' fps    ' + HUD.quality + ' (' + PRESET_NAME + ')' +
          '\ncanvas ' + Math.round(sz.x) + 'x' + Math.round(sz.y) + '    dpr ' + renderer.getPixelRatio().toFixed(2) +
          '\ncalls ' + calls + '    far ' + Math.round(camera.far) + '    frames ' + FILM.frames +
          '\n' + GLVER + '    build ' + BUILD_ID;
      }
    }

    /* HUD at 30 Hz. It is a full-screen 2D canvas repaint -- clearRect over
       ~900k pixels plus the panels and captions -- and nothing in it moves fast
       enough to need 60 Hz. Halving it buys back a slice of CPU every frame,
       which on a two-core laptop is exactly the budget that matters. */
    if ((FILM.frames & 1) === 0 || FILM.recording) {
      octx.setTransform(1, 0, 0, 1, 0, 0);
      drawHUD(octx, ow, oh, S);
    }

    /* audio */
    if (audioLoaded && HUD.audioReady) {
      S.rainAmount = S.rain;
      S.nearRoof = clamp01(1.25 - S.camY * 0.30);
      AudioEngine.mix(t, S);
      fireCues(t);
    }

    HUD.fps = HUD.fps * 0.92 + (1 / Math.max(realDt, 1e-4)) * 0.08;
    adapt(realDt * 1000);
  }

  /* ---- deterministic download -------------------------------------------- */
  const dlBtn = document.getElementById('dl');
  const dlBar = document.getElementById('dlbar');
  if (dlBtn) {
    if (!Exporter.supported()) {
      dlBtn.disabled = true;
      dlBtn.textContent = 'Download unavailable \u00b7 use Chrome or Edge';
      dlBtn.title = 'Export needs WebCodecs, which this browser lacks: ' + Exporter.whyUnsupported();
    }
    dlBtn.addEventListener('click', async (ev) => {
      ev.stopPropagation();
      if (Exporter.running) { Exporter.cancelled = true; return; }
      if (!HUD.audioReady) { try { await unlockAudio(); } catch (e) {} }

      const wasRecording = FILM.recording;
      FILM.recording = true;              /* freezes the live loop's clock */
      dlBtn.classList.add('busy');
      dlBtn.textContent = 'Rendering\u2026';
      const setPct = (p) => { if (dlBar) dlBar.style.width = Math.round(p * 100) + '%'; };
      setPct(0);

      try {
        const blob = await Exporter.render({
          renderer, scene, camera, W,
          duration: DURATION, fps: 60,
          stateAt, drive, sampleCamera,
          drawHUD, octx, ow, oh,
          audio: { manifest: AUDIO_MANIFEST, cues: CUES, duration: DURATION },
          onProgress: (done, total) => setPct(total ? done / total : 0),
        });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'chennai-mobility-ai-1080p.webm';
        document.body.appendChild(a); a.click(); a.remove();
        setTimeout(() => URL.revokeObjectURL(a.href), 60000);
        dlBtn.textContent = '\u2713 Saved \u00b7 download again';
      } catch (err) {
        const msg = String((err && err.message) || err);
        dlBtn.textContent = msg === 'Export cancelled.' ? 'Cancelled \u00b7 try again' : 'Failed \u00b7 try again';
        if (window.console) console.error('[export]', err);
      } finally {
        FILM.recording = wasRecording;
        dlBtn.classList.remove('busy');
        setPct(0);
        /* the export resized the renderer; put the live view back */
        resize();
        FILM.t = 0; cueIdx = 0;
        AudioEngine.stopAll(); AudioEngine.sync(0);
      }
    });
  }

  /* ---- go ---------------------------------------------------------------- */
  const boot = document.getElementById('boot');
  if (boot) boot.remove();
  requestAnimationFrame((now) => { lastNow = now; tick(now); });

  if (window.console) {
    console.log(`[chennai-mobility-ai] three r${THREE.REVISION} · ${countNodes(scene)} scene nodes · ${DURATION}s · ${SHOTS.length} shots · ${CUES.length} cues`);
  }
}

/* The verification harness loads this file for its functions and sets
   window.__NO_BOOT__ so that nothing tries to touch a real GL context. */
if (!(typeof window !== 'undefined' && window.__NO_BOOT__)) {
  main().catch((err) => {
    fatal('BOOT FAILED', String((err && err.message) || err));
    if (window.console) console.error(err);
  });
}
