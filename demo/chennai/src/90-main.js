/* ============================================================================
   90-main.js · boot, assembly and the autonomous 150-second projection
   ----------------------------------------------------------------------------
   No OrbitControls. No transport UI. The picture starts on the first frame and
   runs to 02:30:00 on its own, then holds on the title card and loops.
   The only affordances are audio unlock (a browser requirement, never a gate)
   and an optional recorder.
   ========================================================================== */

const FILM = {
  t: 0, running: true, speed: 1, hold: 9,
  frames: 0, fps: 60, msAvg: 8, quality: 3,
  recording: false, recFixed: true,
};

/* ---------------------------------------------------------------- fatal card */
function fatal(title, body) {
  const el = document.getElementById('fatal');
  if (!el) return;
  el.hidden = false;
  el.innerHTML = `<div class="fcard"><h1>${title}</h1><p>${body}</p></div>`;
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
  key.shadow.mapSize.set(2048, 2048);
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
  for (let i = 0; i < commuters.length; i++) {
    const c = commuters[i];
    const rig = person(Object.assign({ scale: 0.99 + (i % 3) * 0.014, shoe: 0x1A1D21 }, c.o));
    rig.root.position.set(c.p[0], c.p[1], c.p[2]);
    rig.root.rotation.y = c.ry;
    scene.add(rig.root);
    const screen = glowSprite(0x9FC4FF, 0.5, 0.6);
    rig.root.add(screen);
    screen.position.set(0, 1.16, -0.34);
    W.phones.push({ rig, phase: i * 2.7 + 1.3, screen });
  }

  /* ---- waiting crowd on the footpath, baked to one draw call ---- */
  const cluster = pavementCrowd(26, { x: 62, z: 9.5, z0: 18.6 }, 91);
  cluster.position.set(-6, 0.16, 0);
  scene.add(cluster);
  const cluster2 = pavementCrowd(14, { x: 30, z: 6, z0: 17.2 }, 233);
  cluster2.position.set(22, 0.16, 0);
  scene.add(cluster2);
  W.crowdRigs = [];

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
/*  BOOT                                                                      */
/* ========================================================================== */
async function main() {
  const glc = document.getElementById('gl');
  const ovc = document.getElementById('overlay');
  if (!glc || !ovc) { fatal('CANVAS MISSING', 'The film needs both #gl and #overlay canvases.'); return; }

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({
      canvas: glc, antialias: true, alpha: false, stencil: false,
      powerPreference: 'high-performance', preserveDrawingBuffer: true,
    });
  } catch (err) {
    fatal('WEBGL UNAVAILABLE', 'This browser or device blocked WebGL, so the Chennai Mobility AI film cannot render. Try a desktop browser with hardware acceleration enabled.');
    return;
  }
  if (!renderer.getContext()) { fatal('WEBGL UNAVAILABLE', 'No WebGL context could be created.'); return; }

  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(window.innerWidth, window.innerHeight, false);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.28;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
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
    const pr = renderer.getPixelRatio();
    renderer.setSize(w, h, false);
    ow = Math.round(w * pr); oh = Math.round(h * pr);
    ovc.width = ow; ovc.height = oh;
    ovc.style.width = w + 'px'; ovc.style.height = h + 'px';
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    W.reflector.setSize(ow, oh);
  }
  window.addEventListener('resize', resize);
  resize();

  /* ---- recorder (optional; never part of the playback path) ---- */
  let rec = null, recChunks = [], recCanvas = null, recCtx = null;
  function startRecord() {
    if (FILM.recording || typeof MediaRecorder === 'undefined') return;
    recCanvas = document.createElement('canvas');
    recCanvas.width = 1920; recCanvas.height = 1080;
    recCtx = recCanvas.getContext('2d');
    const vs = recCanvas.captureStream(60);
    const tracks = vs.getVideoTracks().slice();
    if (AudioEngine.recDest && AudioEngine.recDest.stream) {
      AudioEngine.recDest.stream.getAudioTracks().forEach((a) => tracks.push(a));
    }
    const mime = ['video/webm;codecs=vp9,opus', 'video/webm;codecs=vp8,opus', 'video/webm']
      .find((m) => MediaRecorder.isTypeSupported && MediaRecorder.isTypeSupported(m));
    recChunks = [];
    rec = new MediaRecorder(new MediaStream(tracks), { mimeType: mime, videoBitsPerSecond: 26e6, audioBitsPerSecond: 192e3 });
    rec.ondataavailable = (e) => { if (e.data && e.data.size) recChunks.push(e.data); };
    rec.onstop = () => {
      const blob = new Blob(recChunks, { type: 'video/webm' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'chennai-mobility-ai-1080p.webm';
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(a.href), 4000);
      setRecUI(false);
    };
    rec.start(250);
    FILM.recording = true; FILM.t = 0; cueIdx = 0;
    AudioEngine.stopAll(); AudioEngine.sync(0);
    setRecUI(true);
  }
  function stopRecord() {
    if (!FILM.recording || !rec) return;
    FILM.recording = false;
    try { rec.stop(); } catch (e) {}
  }
  function setRecUI(on) {
    const b = document.getElementById('rec');
    if (b) { b.classList.toggle('live', on); b.textContent = on ? '■ STOP' : '● RECORD 1080p'; }
  }
  const recBtn = document.getElementById('rec');
  if (recBtn) recBtn.addEventListener('click', (ev) => { ev.stopPropagation(); FILM.recording ? stopRecord() : startRecord(); });
  window.addEventListener('keydown', (ev) => {
    if (ev.key === 'r' || ev.key === 'R') { FILM.recording ? stopRecord() : startRecord(); }
    if (ev.key === 'm' || ev.key === 'M') { AudioEngine.muted = !AudioEngine.muted; AudioEngine.setMaster(0.95, 0.2); }
  });

  /* ---- adaptive quality ------------------------------------------------- */
  function adapt(ms) {
    FILM.msAvg = FILM.msAvg * 0.94 + ms * 0.06;
    if (FILM.frames % 90) return;
    const pr = renderer.getPixelRatio();
    if (FILM.msAvg > 21 && FILM.quality > 0) {
      FILM.quality--;
      if (FILM.quality === 2) { renderer.setPixelRatio(Math.min(1.25, pr)); resize(); }
      else if (FILM.quality === 1) { renderer.setPixelRatio(1); resize(); W.reflector.scale = 0.4; }
      else { W.reflector.enabled = false; }
      HUD.quality = ['ULTRA', 'HIGH', 'BALANCED', 'PERFORMANCE'][3 - FILM.quality] || 'PERFORMANCE';
    } else if (FILM.msAvg < 11 && FILM.quality < 3) {
      FILM.quality++;
      if (FILM.quality === 1) { W.reflector.enabled = true; }
      else if (FILM.quality === 2) { W.reflector.scale = 0.6; renderer.setPixelRatio(1.25); resize(); }
      else { renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2)); resize(); }
      HUD.quality = ['ULTRA', 'HIGH', 'BALANCED', 'PERFORMANCE'][3 - FILM.quality] || 'ULTRA';
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
    lights.key.shadow.autoUpdate = S.closeToGround > 0.35;

    /* the mirror pass only earns its cost when the road is actually in shot */
    const wantRefl = W.reflector.enabled && S.reflAmt > 0.02 && S.closeToGround > 0.05;
    if (wantRefl) W.reflector.render(scene, camera, noReflect);
    U.reflAmt.value = wantRefl ? clamp01(S.reflAmt) : 0;

    renderer.render(scene, camera);

    /* HUD */
    octx.setTransform(1, 0, 0, 1, 0, 0);
    drawHUD(octx, ow, oh, S);

    /* audio */
    if (audioLoaded && HUD.audioReady) {
      S.rainAmount = S.rain;
      S.nearRoof = clamp01(1.25 - S.camY * 0.30);
      AudioEngine.mix(t, S);
      fireCues(t);
    }

    /* recorder composites both canvases into one 1080p stream */
    if (FILM.recording && recCtx) {
      recCtx.fillStyle = '#000'; recCtx.fillRect(0, 0, 1920, 1080);
      recCtx.drawImage(glc, 0, 0, 1920, 1080);
      recCtx.drawImage(ovc, 0, 0, 1920, 1080);
    }

    HUD.fps = HUD.fps * 0.92 + (1 / Math.max(realDt, 1e-4)) * 0.08;
    adapt(realDt * 1000);
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
