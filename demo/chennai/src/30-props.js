/* ============================================================================
   30-props.js · the two hero props: the MTC bus and the feature phone
   ========================================================================== */

/* ==========================================================================
   MTC CHENNAI CITY BUS — ordinary (non-AC) service, Ashok Leyland Viking
   class: 10.6 m × 2.5 m, chrome-oxide red over a cream skirt, amber route
   board, two folding passenger doors, conductor working the rear door.
   ========================================================================== */
function buildMTCBus({ route = '54', destTa = 'போரூர் ரவுண்டானா', destEn = 'PORUR ROUNDTANA',
                       plate = 'TN 01 N 4471', depot = 'PMD-07', detail = true, kerbSide = -1 } = {}) {
  /* `kerbSide` says which local X the passenger doors sit on. The model is
     built length-along-Z with its nose at -Z and, by default, its kerb side
     at -X. The hero bus in Act 5 has to berth nose-east with its doors on the
     pavement, which needs kerbSide = +1 — everything that is genuinely
     handed (doors, step wells, driver's seat, conductor's fare box) follows. */
  const g = new THREE.Group();
  const LEN = 10.6, WID = 2.5, HGT = 3.06, FLOOR = 0.72;

  const red = new THREE.MeshStandardMaterial({ color: C.mtcRed, roughness: 0.42, metalness: 0.22, envMapIntensity: 1.25 });
  const redDark = new THREE.MeshStandardMaterial({ color: 0x7A1414, roughness: 0.55, metalness: 0.2 });
  const cream = new THREE.MeshStandardMaterial({ color: C.mtcCream, roughness: 0.46, metalness: 0.14, envMapIntensity: 1.1 });
  const roofM = new THREE.MeshStandardMaterial({ color: 0xD9D5CB, roughness: 0.6, metalness: 0.16 });
  const black = new THREE.MeshStandardMaterial({ color: 0x14171A, roughness: 0.62, metalness: 0.3 });
  const chrome = new THREE.MeshStandardMaterial({ color: 0xC9CFD4, roughness: 0.14, metalness: 0.96, envMapIntensity: 2.0 });
  const glass = new THREE.MeshPhysicalMaterial({
    color: 0x0A1218, roughness: 0.045, metalness: 0.18, transparent: true, opacity: 0.62,
    clearcoat: 1, clearcoatRoughness: 0.03, envMapIntensity: 2.6, side: THREE.DoubleSide,
  });
  const rubber = new THREE.MeshStandardMaterial({ color: 0x0D0F11, roughness: 0.95, metalness: 0 });

  /* ------------------------------- main body ---------------------------- */
  const body = mesh(new THREE.BoxGeometry(WID, HGT - 0.55, LEN), red, 0, (HGT - 0.55) / 2 + 0.55, 0, true, true);
  g.add(body);
  /* cream lower skirt band — the classic MTC two-tone */
  g.add(mesh(new THREE.BoxGeometry(WID + 0.03, 0.62, LEN - 0.05), cream, 0, 0.86, 0, true, true));
  /* black valance below the skirt */
  g.add(mesh(new THREE.BoxGeometry(WID + 0.02, 0.3, LEN - 0.1), black, 0, 0.4, 0, true));
  /* white roof with ventilators and the painted route number */
  g.add(mesh(new THREE.BoxGeometry(WID - 0.06, 0.18, LEN - 0.2), roofM, 0, HGT + 0.06, 0, true, true));
  for (let i = -2; i <= 2; i++) g.add(mesh(new THREE.BoxGeometry(1.4, 0.14, 0.9), new THREE.MeshStandardMaterial({ color: 0xB9B5AB, roughness: 0.7 }), 0, HGT + 0.18, i * 2.1, true));
  /* destination sign box on the roof front */
  g.add(mesh(new THREE.BoxGeometry(WID - 0.5, 0.34, 0.7), black, 0, HGT + 0.22, -LEN / 2 + 0.9, true));

  /* front and rear caps, slightly raked */
  const capGeo = new THREE.BoxGeometry(WID, HGT - 0.4, 0.34);
  const front = mesh(capGeo, red, 0, (HGT - 0.4) / 2 + 0.6, -LEN / 2 - 0.02, true, true);
  front.rotation.x = -0.035; g.add(front);
  const rear = mesh(capGeo, red, 0, (HGT - 0.4) / 2 + 0.6, LEN / 2 + 0.02, true, true);
  rear.rotation.x = 0.03; g.add(rear);

  /* ------------------------------ windscreen ---------------------------- */
  const wind = mesh(new THREE.BoxGeometry(WID - 0.42, 1.24, 0.09), glass, 0, 1.98, -LEN / 2 - 0.14);
  wind.rotation.x = -0.12; g.add(wind);
  /* black rubber surround + centre pillar */
  g.add(mesh(new THREE.BoxGeometry(WID - 0.34, 1.34, 0.06), black, 0, 1.98, -LEN / 2 - 0.17));
  g.add(mesh(new THREE.BoxGeometry(0.09, 1.26, 0.12), black, 0, 1.98, -LEN / 2 - 0.16));
  /* rear window */
  const rearWin = mesh(new THREE.BoxGeometry(WID - 0.5, 0.96, 0.08), glass, 0, 2.06, LEN / 2 + 0.15);
  rearWin.rotation.x = 0.08; g.add(rearWin);

  /* --------------------- amber route board (front top) ------------------ */
  const boardTex = TEX.route54 || texRouteBoard(route, destTa, 512, 128);
  const boardMat = new THREE.MeshStandardMaterial({ map: boardTex, roughness: 0.5, emissive: 0xFFFFFF, emissiveMap: boardTex, emissiveIntensity: 1.5 });
  const board = mesh(new THREE.PlaneGeometry(WID - 0.62, 0.36), boardMat, 0, 2.72, -LEN / 2 - 0.2);
  board.rotation.x = -0.1; g.add(board);
  /* side route board behind the front door */
  const sideBoard = mesh(new THREE.PlaneGeometry(1.5, 0.3), boardMat.clone(), -WID / 2 - 0.012, 2.42, -LEN / 2 + 2.1);
  sideBoard.rotation.y = -PI / 2; g.add(sideBoard);
  const sideBoardR = sideBoard.clone(); sideBoardR.position.x = WID / 2 + 0.012; sideBoardR.rotation.y = PI / 2; g.add(sideBoardR);

  /* -------------------------- side window band -------------------------- */
  for (const s of [-1, 1]) {
    /* continuous glass with black rubbers between bays */
    g.add(mesh(new THREE.BoxGeometry(0.07, 1.02, LEN - 3.1), glass, s * (WID / 2 + 0.005), 2.02, 0.55));
    g.add(mesh(new THREE.BoxGeometry(0.09, 1.12, LEN - 3.0), black, s * (WID / 2 - 0.005), 2.02, 0.55));
    for (let i = 0; i < 7; i++) {
      const z = -LEN / 2 + 2.6 + i * ((LEN - 4.6) / 6);
      g.add(mesh(new THREE.BoxGeometry(0.1, 1.14, 0.09), black, s * (WID / 2 + 0.008), 2.02, z));
    }
    /* driver's window */
    g.add(mesh(new THREE.BoxGeometry(0.07, 0.86, 1.2), glass, s * (WID / 2 + 0.005), 2.02, -LEN / 2 + 1.5));
    /* cream band along the window sill */
    g.add(mesh(new THREE.BoxGeometry(WID + 0.035, 0.12, LEN - 0.3), cream, 0, 1.46, 0));
    g.add(mesh(new THREE.BoxGeometry(WID + 0.035, 0.09, LEN - 0.3), redDark, 0, 2.6, 0));
  }

  /* --------------------------- passenger doors -------------------------- */
  /* MTC ordinary buses: front door behind the driver, and a rear/middle door.
     Both are bi-folding, opening inward. Door apertures cut visually by a
     recessed black frame + two leaf panels each. */
  const doors = [];
  const doorSpecs = [
    { z: -LEN / 2 + 1.15, side: kerbSide, w: 1.16 },   // front door, kerb side
    { z: LEN / 2 - 2.35, side: kerbSide, w: 1.30 },    // rear door, kerb side
  ];
  for (const ds of doorSpecs) {
    const d = new THREE.Group();
    d.position.set(ds.side * (WID / 2), 0, ds.z);
    /* aperture recess */
    d.add(mesh(new THREE.BoxGeometry(0.1, 2.24, ds.w + 0.14), black, 0, 1.28, 0));
    const leafL = new THREE.Group(); leafL.position.set(0, 0, -ds.w / 2); d.add(leafL);
    const leafR = new THREE.Group(); leafR.position.set(0, 0, ds.w / 2); d.add(leafR);
    for (const [leaf, dir] of [[leafL, 1], [leafR, -1]]) {
      leaf.add(mesh(new THREE.BoxGeometry(0.07, 2.16, ds.w / 2), red, ds.side * 0.02, 1.28, dir * (ds.w / 4), true));
      leaf.add(mesh(new THREE.BoxGeometry(0.05, 1.0, ds.w / 2 - 0.16), glass, ds.side * 0.05, 1.86, dir * (ds.w / 4)));
      leaf.add(mesh(new THREE.BoxGeometry(0.09, 0.5, ds.w / 2 - 0.05), cream, ds.side * 0.02, 0.86, dir * (ds.w / 4), true));
      /* grab handle */
      leaf.add(mesh(new THREE.CylinderGeometry(0.022, 0.022, 0.7, 6), chrome, ds.side * 0.09, 1.7, dir * (ds.w / 4 + 0.1), true));
      leaf.userData.dir = dir;
    }
    /* entry step well */
    d.add(mesh(new THREE.BoxGeometry(0.5, 0.1, ds.w - 0.1), black, ds.side * 0.28, 0.44, 0));
    d.add(mesh(new THREE.BoxGeometry(0.5, 0.1, ds.w - 0.1), black, ds.side * 0.28, 0.16, 0));
    g.add(d);
    doors.push({ group: d, leafL, leafR, open: 0 });
  }

  /* ------------------------------- headlamps ---------------------------- */
  const lampMat = new THREE.MeshStandardMaterial({ color: 0xFFF6E0, emissive: 0xFFF0CC, emissiveIntensity: 4.6, roughness: 0.2 });
  const headLamps = [];
  for (const sx of [-0.82, 0.82]) {
    const hl = mesh(new THREE.BoxGeometry(0.46, 0.24, 0.12), lampMat, sx, 1.16, -LEN / 2 - 0.19, true);
    g.add(hl); headLamps.push(hl);
    /* chrome bezel */
    g.add(mesh(new THREE.BoxGeometry(0.54, 0.32, 0.08), chrome, sx, 1.16, -LEN / 2 - 0.16));
    const gl = glowSprite(0xFFF0CC, 2.6, 0.95); gl.position.set(sx, 1.16, -LEN / 2 - 0.5); g.add(gl);
    /* indicator */
    const ind = mesh(new THREE.BoxGeometry(0.2, 0.12, 0.1), new THREE.MeshStandardMaterial({ color: 0xFFB020, emissive: 0xFF9500, emissiveIntensity: 0.4, roughness: 0.3 }), sx * 1.35, 1.16, -LEN / 2 - 0.19);
    g.add(ind);
  }
  /* tail lamps + reverse + indicator */
  const tailLamps = [];
  for (const sx of [-0.92, 0.92]) {
    const tl = mesh(new THREE.BoxGeometry(0.4, 0.34, 0.1), new THREE.MeshStandardMaterial({ color: 0x8A1010, emissive: 0xFF1A1A, emissiveIntensity: 2.2, roughness: 0.3 }), sx, 1.3, LEN / 2 + 0.19);
    g.add(tl); tailLamps.push(tl);
    const gl = glowSprite(0xFF2A2A, 1.9, 0.7); gl.position.set(sx, 1.3, LEN / 2 + 0.4); g.add(gl);
    tailLamps[tailLamps.length - 1].userData.glow = gl;
  }

  /* --------------------------- grille + bumper -------------------------- */
  g.add(mesh(new THREE.BoxGeometry(WID - 0.7, 0.3, 0.1), black, 0, 0.78, -LEN / 2 - 0.2, true));
  for (let i = 0; i < 7; i++) g.add(mesh(new THREE.BoxGeometry(WID - 0.8, 0.02, 0.06), chrome, 0, 0.68 + i * 0.035, -LEN / 2 - 0.24));
  g.add(mesh(new THREE.BoxGeometry(WID + 0.06, 0.34, 0.4), black, 0, 0.42, -LEN / 2 - 0.1, true));
  g.add(mesh(new THREE.BoxGeometry(WID + 0.06, 0.34, 0.4), black, 0, 0.42, LEN / 2 + 0.1, true));
  /* tow hooks */
  for (const sx of [-1, 1]) g.add(mesh(new THREE.TorusGeometry(0.09, 0.028, 6, 12), chrome, sx * 0.95, 0.42, -LEN / 2 - 0.28));

  /* MTC badge + registration plate */
  const badge = mesh(new THREE.PlaneGeometry(0.86, 0.24), new THREE.MeshStandardMaterial({
    map: TEX.mtcBadge || (TEX.mtcBadge = texMTCBadge()), roughness: 0.5, emissive: 0xFFFFFF,
    emissiveMap: TEX.mtcBadge || TEX.mtcBadge, emissiveIntensity: 0.5, transparent: true,
  }), 0, 1.52, -LEN / 2 - 0.22);
  g.add(badge);
  const plateTex = TEX['plate_' + plate] || (TEX['plate_' + plate] = texNumberPlate(plate));
  for (const zz of [-LEN / 2 - 0.24, LEN / 2 + 0.24]) {
    const pl = mesh(new THREE.PlaneGeometry(0.94, 0.24), new THREE.MeshStandardMaterial({ map: plateTex, roughness: 0.6 }), 0, 0.62, zz);
    if (zz > 0) pl.rotation.y = PI;
    g.add(pl);
  }

  /* ------------------------------- mirrors ------------------------------ */
  for (const s of [-1, 1]) {
    const m = new THREE.Group(); m.position.set(s * (WID / 2 + 0.06), 2.28, -LEN / 2 + 0.55); g.add(m);
    m.add(mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.5, 6), black, s * 0.24, 0, 0, true).rotateZ(PI / 2));
    const arm = mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.42, 6), black, s * 0.44, -0.16, 0, true);
    arm.rotation.z = 0.5; m.add(arm);
    const head2 = mesh(new THREE.BoxGeometry(0.2, 0.34, 0.06), black, s * 0.52, -0.3, 0, true);
    head2.rotation.y = s * 0.25; m.add(head2);
    m.add(mesh(new THREE.PlaneGeometry(0.16, 0.3), new THREE.MeshStandardMaterial({ color: 0x9FB4C4, roughness: 0.05, metalness: 0.9 }), s * 0.49, -0.3, -0.035).rotateY(s > 0 ? -PI / 2 : PI / 2));
  }

  /* -------------------------------- wheels ------------------------------ */
  const wheels = [];
  const wheelSpec = [
    { x: -WID / 2 - 0.02, z: -LEN / 2 + 1.95 }, { x: WID / 2 + 0.02, z: -LEN / 2 + 1.95 },
    { x: -WID / 2 - 0.02, z: LEN / 2 - 2.5 }, { x: WID / 2 + 0.02, z: LEN / 2 - 2.5 },
    { x: -WID / 2 - 0.02, z: LEN / 2 - 1.35 }, { x: WID / 2 + 0.02, z: LEN / 2 - 1.35 },
  ];
  const tyreGeo = new THREE.CylinderGeometry(0.52, 0.52, 0.3, 20);
  const hubGeo = new THREE.CylinderGeometry(0.26, 0.26, 0.32, 12);
  for (const w of wheelSpec) {
    const wg = new THREE.Group(); wg.position.set(w.x, 0.52, w.z); g.add(wg);
    const tyre = mesh(tyreGeo, rubber, 0, 0, 0, true);
    tyre.rotation.z = PI / 2; wg.add(tyre);
    const hub = mesh(hubGeo, chrome, 0, 0, 0, true);
    hub.rotation.z = PI / 2; wg.add(hub);
    /* lug nuts */
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * TAU;
      const nut = mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.34, 5), new THREE.MeshStandardMaterial({ color: 0x8A9096, metalness: 0.9, roughness: 0.3 }), Math.cos(a) * 0.15, Math.sin(a) * 0.15, 0, true);
      nut.rotation.z = PI / 2; wg.add(nut);
    }
    /* mud flap */
    wg.add(mesh(new THREE.BoxGeometry(0.32, 0.42, 0.03), rubber, 0, -0.5, w.x > 0 ? -0.2 : 0.2, true));
    wheels.push(wg);
  }
  /* wheel arches */
  for (const w of wheelSpec) {
    const arch = new THREE.Mesh(new THREE.TorusGeometry(0.62, 0.07, 6, 14, PI), black);
    arch.position.set(w.x * 0.98, 0.52, w.z);
    arch.rotation.set(0, PI / 2, 0);
    g.add(arch);
  }

  /* --------------------------- headlight beams -------------------------- */
  const beams = [];
  if (detail) {
    for (const sx of [-0.82, 0.82]) {
      const spot = new THREE.SpotLight(0xFFF0CC, 4200, 90, deg(17), 0.55, 1.6);
      spot.position.set(sx, 1.16, -LEN / 2 - 0.2);
      spot.target.position.set(sx * 2.4, -0.6, -LEN / 2 - 34);
      g.add(spot); g.add(spot.target);
      /* volumetric cone cutting the rain */
      const cone = buildLightCone(4.2, 34, 0xFFF0CC, 0.11);
      cone.position.set(sx, 1.0, -LEN / 2 - 17);
      cone.rotation.x = -PI / 2 - 0.05;
      g.add(cone);
      beams.push({ spot, cone });
    }
    /* interior fluorescent light spilling out of the windows */
    const interior = new THREE.PointLight(0xFFE0B0, 900, 16, 2);
    interior.position.set(0, 2.5, 0); g.add(interior);
  }

  /* ------------------------------ wipers -------------------------------- */
  const wipers = [];
  for (const sx of [-0.52, 0.52]) {
    const w = new THREE.Group(); w.position.set(sx, 1.42, -LEN / 2 - 0.2); g.add(w);
    const arm = mesh(new THREE.BoxGeometry(0.045, 0.03, 0.62), black, 0, 0, -0.3, true);
    w.add(arm);
    w.add(mesh(new THREE.BoxGeometry(0.06, 0.04, 0.6), rubber, 0, -0.03, -0.6, true));
    wipers.push(w);
  }

  /* ------------------------- interior (visible) ------------------------- */
  if (detail) {
    const seatM = mat(0x2E3B4A, { rough: 0.9, flat: false });
    const pole = new THREE.MeshStandardMaterial({ color: 0xC9CFD4, roughness: 0.2, metalness: 0.9 });
    for (let i = 0; i < 9; i++) {
      const z = -LEN / 2 + 2.2 + i * 0.86;
      for (const s of [-1, 1]) {
        g.add(mesh(new THREE.BoxGeometry(0.52, 0.5, 0.72), seatM, s * 0.86, FLOOR + 0.28, z, true));
        g.add(mesh(new THREE.BoxGeometry(0.5, 0.62, 0.12), seatM, s * 1.1, FLOOR + 0.8, z, true));
      }
    }
    /* stanchion poles */
    for (let i = 0; i < 6; i++) {
      const z = -LEN / 2 + 1.9 + i * 1.5;
      g.add(mesh(new THREE.CylinderGeometry(0.032, 0.032, HGT - FLOOR - 0.3, 8), pole, -0.28, FLOOR + (HGT - FLOOR) / 2, z, true));
      g.add(mesh(new THREE.CylinderGeometry(0.032, 0.032, HGT - FLOOR - 0.3, 8), pole, 0.28, FLOOR + (HGT - FLOOR) / 2, z + 0.75, true));
    }
    /* grab rails along the ceiling */
    for (const s of [-0.62, 0.62]) g.add(mesh(new THREE.CylinderGeometry(0.026, 0.026, LEN - 3, 8), pole, s, HGT - 0.24, 0.4, true).rotateX(PI / 2));
    /* driver's seat + steering wheel */
    const DX = -kerbSide * 0.72;                 // driver sits on the offside
    g.add(mesh(new THREE.BoxGeometry(0.56, 0.5, 0.6), seatM, DX, FLOOR + 0.28, -LEN / 2 + 1.0, true));
    const steer = mesh(new THREE.TorusGeometry(0.22, 0.028, 6, 18), black, DX, FLOOR + 0.86, -LEN / 2 + 0.62, true);
    steer.rotation.x = PI / 2 - 0.42; g.add(steer);
    g.add(mesh(new THREE.BoxGeometry(0.5, 0.34, 0.3), black, DX, FLOOR + 0.6, -LEN / 2 + 0.62, true));
    /* fare box + conductor's perch by the rear door, on the kerb side */
    g.add(mesh(new THREE.BoxGeometry(0.4, 0.42, 0.34), mat(0x3A4046, { metal: 0.6, rough: 0.4 }), kerbSide * 0.86, FLOOR + 0.24, LEN / 2 - 2.9, true));
    /* destination LED strip inside, above the windscreen */
    const ledMat = new THREE.MeshStandardMaterial({ map: TEX.led, emissive: 0xFFFFFF, emissiveMap: TEX.led, emissiveIntensity: 1.7, roughness: 0.6 });
    g.add(mesh(new THREE.PlaneGeometry(2.1, 0.2), ledMat, 0, 2.62, -LEN / 2 + 0.2).rotateY(PI));
    /* depot code + bus number stencilled on the skirt */
    const stencil = (() => {
      const { c, x } = makeCanvas(512, 96);
      x.clearRect(0, 0, 512, 96);
      x.fillStyle = '#1B1F24'; x.font = `800 62px ${FONT_MONO}`; x.textBaseline = 'middle';
      x.fillText(plate, 14, 50);
      x.font = `700 40px ${FONT_MONO}`; x.fillText(depot, 372, 50);
      return canvasTexture(c, { srgb: true });
    })();
    for (const s of [-1, 1]) {
      const st = mesh(new THREE.PlaneGeometry(2.1, 0.4), new THREE.MeshStandardMaterial({ map: stencil, transparent: true, roughness: 0.8 }), s * (WID / 2 + 0.014), 0.86, 1.9);
      st.rotation.y = s > 0 ? PI / 2 : -PI / 2;
      g.add(st);
    }
    /* "MTC" lettering on the cream band */
    const mtcWord = (() => {
      const { c, x } = makeCanvas(512, 128);
      x.clearRect(0, 0, 512, 128);
      x.textAlign = 'center'; x.textBaseline = 'middle';
      x.fillStyle = '#7A1414'; x.font = `800 62px ${FONT_TAMIL}`; x.fillText('மாநகரப் போக்குவரத்து', 256, 42);
      x.font = `800 40px ${FONT_COND}`; x.fillText('METROPOLITAN TRANSPORT CORP.', 256, 96);
      return canvasTexture(c, { srgb: true });
    })();
    for (const s of [-1, 1]) {
      const w2 = mesh(new THREE.PlaneGeometry(3.2, 0.8), new THREE.MeshStandardMaterial({ map: mtcWord, transparent: true, roughness: 0.7 }), s * (WID / 2 + 0.015), 1.98, 2.4);
      w2.rotation.y = s > 0 ? PI / 2 : -PI / 2;
      g.add(w2);
    }
  }

  /* --------------------- road spray off the rear wheels ----------------- */
  const spray = buildWheelSpray();
  spray.position.set(0, 0.2, LEN / 2 - 1.9);
  g.add(spray);

  g.userData = { wheels, doors, wipers, beams, headLamps, tailLamps, spray, LEN, WID, HGT, FLOOR, route, destTa, destEn, plate };
  return g;
}

function texMTCBadge() {
  const { c, x } = makeCanvas(512, 148);
  x.clearRect(0, 0, 512, 148);
  x.fillStyle = '#FFE9B0'; x.font = `900 92px ${FONT_COND}`; x.textAlign = 'center'; x.textBaseline = 'middle';
  x.shadowColor = 'rgba(0,0,0,0.6)'; x.shadowBlur = 8;
  x.fillText('M T C', 256, 52);
  x.font = `800 40px ${FONT_TAMIL}`;
  x.fillText('மாநகரப் பேருந்து', 256, 116);
  return canvasTexture(c, { srgb: true });
}
function texNumberPlate(text) {
  const { c, x } = makeCanvas(512, 128);
  x.fillStyle = '#F4F1E4'; x.fillRect(0, 0, 512, 128);
  x.strokeStyle = '#14181C'; x.lineWidth = 8; x.strokeRect(4, 4, 504, 120);
  x.fillStyle = '#14181C'; x.font = `900 74px ${FONT_MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle';
  x.fillText(text, 256, 68);
  return canvasTexture(c);
}

/** Water thrown up by the tyres — the single best "it is raining" cue. */
function buildWheelSpray(n = 420) {
  const pos = new Float32Array(n * 3), seed = new Float32Array(n * 2);
  for (let i = 0; i < n; i++) {
    pos[i * 3] = (hash1(i) - 0.5) * 2.6;
    pos[i * 3 + 1] = 0;
    pos[i * 3 + 2] = (hash1(i + 5) - 0.5) * 1.2;
    seed[i * 2] = hash1(i + 11); seed[i * 2 + 1] = hash1(i + 17);
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setAttribute('aSeed', new THREE.BufferAttribute(seed, 2));
  const m = new THREE.ShaderMaterial({
    /* see buildSteam: fog:true without fog uniforms throws in refreshFogUniforms */
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    uniforms: { uTime: U.time, uSpeed: { value: 0 }, uCol: { value: new THREE.Color(0xBFD4E6) } },
    vertexShader: `
      attribute vec2 aSeed; uniform float uTime, uSpeed; varying float vA;
      void main(){
        float period = 0.34 + aSeed.y * 0.4;
        float ph = mod( uTime * ( 1.2 + uSpeed ) + aSeed.x * period, period ) / period;
        vec3 p = position;
        p.y += ph * ( 0.9 + aSeed.y * 1.5 );
        p.z += ph * ( 1.6 + aSeed.x * 2.6 ) * ( 0.3 + uSpeed );
        p.x += sin( ph * 8.0 + aSeed.x * 20.0 ) * 0.3 * ph;
        vA = sin( ph * 3.14159 ) * uSpeed;
        vec4 mv = modelViewMatrix * vec4( p, 1.0 );
        gl_PointSize = clamp( ( 14.0 + ph * 60.0 ) * 26.0 / -mv.z, 1.0, 44.0 );
        gl_Position = projectionMatrix * mv;
      }`,
    fragmentShader: `
      uniform vec3 uCol; varying float vA;
      void main(){ float d = length( gl_PointCoord - 0.5 ); gl_FragColor = vec4( uCol, smoothstep( 0.5, 0.05, d ) * vA * 0.34 ); }`,
  });
  const p = new THREE.Points(geo, m); p.frustumCulled = false;
  return p;
}

/* ==========================================================================
   THE HANDSET — matte black rubberised feature phone, monochrome green LCD.
   Every key is a real Object3D so the film can depress it mechanically and
   light its rim; the LCD is a canvas texture redrawn per state.
   ========================================================================== */
const PHONE = {
  W: 0.0455, H: 0.1085, D: 0.0142,
  SMS: [
    'CUMTA GUIDE',
    'From: SIMATS Highway',
    'To: Porur Roundtana',
    'Service: 54 / 54E',
    'Time: ~35 mins (Freq: 10m)',
    'Status: SCHEDULED',
    'Ref: GRV-4471',
    'Help: 044-24794705',
  ].join('\n'),
};
PHONE.SMS_LEN = PHONE.SMS.length;      // 148 characters, one GSM segment

function buildPhone() {
  const g = new THREE.Group();
  const { W, H, D } = PHONE;

  /* rubberised matte black shell — high roughness, a hint of sheen at the edges */
  const shellMat = new THREE.MeshPhysicalMaterial({
    color: C.handset, roughness: 0.88, metalness: 0.04, clearcoat: 0.16, clearcoatRoughness: 0.85,
    sheen: 0.4, sheenColor: new THREE.Color(0x2A2E33), envMapIntensity: 0.55,
  });
  const body = new THREE.Mesh(roundedBoxGeo(W, H, D, 0.0075, 0.0018), shellMat);
  body.castShadow = true; body.receiveShadow = true;
  g.add(body);

  /* slightly proud front bezel plate */
  const bezel = new THREE.Mesh(roundedBoxGeo(W - 0.0016, H - 0.0022, 0.0022, 0.006, 0.0008),
    new THREE.MeshPhysicalMaterial({ color: 0x0B0C0D, roughness: 0.62, metalness: 0.16, clearcoat: 0.6, envMapIntensity: 0.8 }));
  bezel.position.z = -D / 2 - 0.0004;
  g.add(bezel);

  /* ------------------------------- the LCD ------------------------------ */
  const lcdW = W * 0.74, lcdH = H * 0.235;
  const lcd = makeLCD(320, 240);
  const glassMat = new THREE.MeshStandardMaterial({
    color: 0x0E1A06, map: lcd.tex, emissive: 0xFFFFFF, emissiveMap: lcd.tex,
    emissiveIntensity: 0.0, roughness: 0.16, metalness: 0.0,
  });
  const screen = new THREE.Mesh(new THREE.PlaneGeometry(lcdW, lcdH), glassMat);
  screen.position.set(0, H * 0.27, -D / 2 - 0.0018);
  g.add(screen);
  /* reflective cover lens over the LCD */
  const lens = new THREE.Mesh(new THREE.PlaneGeometry(lcdW + 0.004, lcdH + 0.004),
    new THREE.MeshPhysicalMaterial({ color: 0x000000, roughness: 0.02, metalness: 0, transparent: true, opacity: 0.16, clearcoat: 1, envMapIntensity: 2.4 }));
  lens.position.set(0, H * 0.27, -D / 2 - 0.0026);
  g.add(lens);
  /* backlight spill onto the elder's face and thumb */
  const backlight = new THREE.PointLight(C.lcdGreen, 0, 0.6, 2);
  backlight.position.set(0, H * 0.27, -D / 2 - 0.06);
  g.add(backlight);

  /* ------------------------------ earpiece ------------------------------ */
  const grilleMat = new THREE.MeshStandardMaterial({ color: 0x1A1D20, roughness: 0.95, metalness: 0.2 });
  for (let i = 0; i < 9; i++) g.add(mesh(new THREE.CylinderGeometry(0.00055, 0.00055, 0.002, 5), grilleMat, (i - 4) * 0.0017, H * 0.44, -D / 2 - 0.0006).rotateX(PI / 2));
  /* brand mark */
  const brandTex = (() => {
    const { c, x } = makeCanvas(512, 96);
    x.clearRect(0, 0, 512, 96);
    x.fillStyle = '#8A9098'; x.textAlign = 'center'; x.textBaseline = 'middle';
    x.font = `700 56px ${FONT_COND}`; x.fillText('CUMTA  105', 256, 50);
    return canvasTexture(c, { srgb: true });
  })();
  const brand = mesh(new THREE.PlaneGeometry(W * 0.62, W * 0.115), new THREE.MeshStandardMaterial({ map: brandTex, transparent: true, roughness: 0.7, metalness: 0.4 }), 0, H * 0.395, -D / 2 - 0.0016);
  g.add(brand);

  /* ------------------------------- keypad ------------------------------- */
  const keyMat = new THREE.MeshPhysicalMaterial({ color: 0x1C1F22, roughness: 0.82, metalness: 0.06, clearcoat: 0.25, clearcoatRoughness: 0.7, envMapIntensity: 0.6 });
  const keyTopMat = new THREE.MeshStandardMaterial({ color: 0x23272B, roughness: 0.76, metalness: 0.08 });
  const keys = {};
  const keyOrder = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'];
  const kW = W * 0.235, kH = H * 0.052, kD = 0.0034;
  const gridTop = H * 0.085, gridLeft = -W * 0.345, pitchX = W * 0.345, pitchY = H * 0.0715;
  const legends = { '1': '1', '2': 'ABC 2', '3': 'DEF 3', '4': 'GHI 4', '5': 'JKL 5', '6': 'MNO 6', '7': 'PQRS 7', '8': 'TUV 8', '9': 'WXYZ 9', '*': '* +', '0': '0  ', '#': '# ⇧' };
  for (let i = 0; i < 12; i++) {
    const name = keyOrder[i];
    const col = i % 3, row = (i / 3) | 0;
    const k = new THREE.Group();
    k.position.set(gridLeft + col * pitchX, gridTop - row * pitchY, -D / 2 - 0.0012);
    /* key body */
    const base = new THREE.Mesh(roundedBoxGeo(kW, kH, kD, 0.0018, 0.0008), keyMat.clone());
    k.add(base);
    /* legend */
    const lt = (() => {
      const { c, x } = makeCanvas(256, 96);
      x.clearRect(0, 0, 256, 96);
      x.textAlign = 'center'; x.textBaseline = 'middle';
      x.fillStyle = '#E8EDF1'; x.font = `700 62px ${FONT_COND}`;
      x.fillText(legends[name].replace(/[A-Z]{2,}\s?/, '').trim() || legends[name], 128, 46);
      const letters = (legends[name].match(/[A-Z]{2,}/) || [''])[0];
      if (letters) { x.fillStyle = 'rgba(210,220,228,0.7)'; x.font = `600 24px ${FONT_COND}`; x.fillText(letters, 128, 80); }
      return canvasTexture(c, { srgb: true });
    })();
    const legend = mesh(new THREE.PlaneGeometry(kW * 0.86, kH * 0.86), new THREE.MeshStandardMaterial({ map: lt, transparent: true, roughness: 0.6 }), 0, 0, -kD / 2 - 0.0003);
    k.add(legend);
    /* amber rim that lights on press */
    const rim = new THREE.Mesh(roundedBoxGeo(kW + 0.0016, kH + 0.0016, 0.0008, 0.0022, 0.0004),
      new THREE.MeshBasicMaterial({ color: C.sodium, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false, fog: false }));
    rim.position.z = -kD / 2 - 0.0008;
    k.add(rim);
    /* backlight glow under the key */
    const glowL = new THREE.MeshBasicMaterial({ color: C.sodiumHot, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false, fog: false });
    const gl = mesh(new THREE.PlaneGeometry(kW * 1.5, kH * 2.4), glowL, 0, 0, -kD / 2 - 0.0012);
    k.add(gl);
    g.add(k);
    keys[name] = { group: k, base, rim, glow: gl, press: 0, z0: k.position.z };
  }

  /* navigation cluster: D-pad + OK, and the two soft keys */
  const navY = H * 0.147;
  const nav = new THREE.Group(); nav.position.set(0, navY, -D / 2 - 0.0012); g.add(nav);
  const dpad = new THREE.Mesh(new THREE.TorusGeometry(W * 0.135, W * 0.038, 8, 26), keyMat.clone());
  nav.add(dpad);
  const okKey = new THREE.Mesh(new THREE.CylinderGeometry(W * 0.075, W * 0.075, 0.0032, 16), keyTopMat.clone());
  okKey.rotation.x = PI / 2; nav.add(okKey);
  keys.nav = { group: nav, base: dpad, rim: null, glow: null, press: 0, z0: nav.position.z };
  /* soft keys either side of the D-pad */
  for (const s of [-1, 1]) {
    const sk = new THREE.Mesh(roundedBoxGeo(W * 0.2, H * 0.036, 0.0032, 0.0016, 0.0007), keyMat.clone());
    sk.position.set(s * W * 0.335, navY, -D / 2 - 0.0012);
    g.add(sk);
  }

  /* green call key and red end key — the two that matter most in this film */
  const callY = H * 0.197;
  const mkSpecial = (color, x) => {
    const k = new THREE.Group(); k.position.set(x, callY, -D / 2 - 0.0012); g.add(k);
    const base = new THREE.Mesh(roundedBoxGeo(W * 0.26, H * 0.043, 0.0036, 0.0022, 0.0008),
      new THREE.MeshPhysicalMaterial({ color: 0x16181A, roughness: 0.7, metalness: 0.1, clearcoat: 0.5 }));
    k.add(base);
    const glyph = mesh(new THREE.PlaneGeometry(W * 0.16, H * 0.028), new THREE.MeshStandardMaterial({
      color, emissive: color, emissiveIntensity: 1.1, roughness: 0.5, transparent: true, opacity: 0.95,
    }), 0, 0, -0.002);
    k.add(glyph);
    const rim = new THREE.Mesh(roundedBoxGeo(W * 0.275, H * 0.052, 0.0008, 0.0024, 0.0004),
      new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.25, blending: THREE.AdditiveBlending, depthWrite: false, fog: false }));
    rim.position.z = -0.0024; k.add(rim);
    return { group: k, base, rim, glow: null, press: 0, z0: k.position.z, glyph };
  };
  keys.call = mkSpecial(0x22C55E, -W * 0.27);
  keys.end = mkSpecial(0xEF4444, W * 0.27);

  /* --------------------------- top and bottom --------------------------- */
  /* torch LED */
  const torch = mesh(new THREE.CylinderGeometry(0.0022, 0.0022, 0.001, 8), new THREE.MeshStandardMaterial({ color: 0xEAF4FF, emissive: 0xDDEEFF, emissiveIntensity: 0.2, roughness: 0.2 }), 0, H / 2 - 0.004, -D / 2 + 0.002);
  torch.rotation.x = PI / 2; g.add(torch);
  /* earpiece slot at the very top edge, mic pinhole at the bottom */
  g.add(mesh(new THREE.CylinderGeometry(0.0006, 0.0006, 0.0016, 6), grilleMat, 0, -H / 2 + 0.006, -D / 2 - 0.0004).rotateX(PI / 2));
  /* charging + headset ports on the bottom edge */
  g.add(mesh(new THREE.BoxGeometry(0.008, 0.0022, 0.0026), grilleMat, 0, -H / 2 + 0.0006, 0));
  /* side volume rocker */
  g.add(mesh(new THREE.BoxGeometry(0.0016, 0.014, 0.004), keyMat.clone(), -W / 2 - 0.0006, H * 0.14, 0));

  /* ------------------------------ LCD states ---------------------------- */
  const S = {
    idle: () => {
      lcd.draw((x, w, h) => {
        x.fillStyle = '#0B1405';
        /* status row */
        bars(x, 8, 12, 0.85); battery(x, w - 46, 12, 0.62);
        x.font = `700 26px ${FONT_MONO}`; x.fillStyle = '#0B1405'; x.textBaseline = 'middle';
        x.fillText('19:42', w / 2 - 34, 24);
        /* operator */
        x.font = `700 22px ${FONT_MONO}`;
        x.fillText('Airtel 4G  ·  NO DATA', 10, 56);
        /* nothing on a feature phone — that is the point */
        x.font = `700 40px ${FONT_TAMIL}`;
        x.fillText('வணக்கம்', 12, 116);
        x.font = `600 22px ${FONT_MONO}`;
        x.fillText('No apps. No internet.', 12, 150);
        x.fillText('Balance Rs. 12.40', 12, 176);
        softkeys(x, w, h, 'Menu', 'Names');
      });
    },
    dial: (digits) => {
      lcd.draw((x, w, h) => {
        x.fillStyle = '#0B1405';
        bars(x, 8, 12, 0.85); battery(x, w - 46, 12, 0.62);
        x.font = `700 22px ${FONT_MONO}`; x.fillText('Airtel · voice only', 10, 56);
        x.font = `800 46px ${FONT_MONO}`;
        const shown = formatDial(digits);
        x.fillText(shown, 12, 112);
        x.font = `600 20px ${FONT_MONO}`;
        x.fillText(digits.length >= 11 ? 'CUMTA HELPLINE · CHENNAI' : 'Enter number…', 12, 148);
        x.fillStyle = 'rgba(11,20,5,0.55)'; x.fillRect(10, 162, w - 20, 4);
        x.fillStyle = '#0B1405'; x.fillRect(10, 162, (w - 20) * (digits.length / 11), 4);
        softkeys(x, w, h, 'Call', 'Clear');
      });
    },
    calling: () => {
      lcd.draw((x, w, h) => {
        x.fillStyle = '#0B1405';
        bars(x, 8, 12, 0.85); battery(x, w - 46, 12, 0.62);
        x.font = `700 26px ${FONT_MONO}`; x.fillText('Calling…', 12, 66);
        x.font = `800 40px ${FONT_MONO}`; x.fillText('044 2479 4705', 12, 116);
        x.font = `600 20px ${FONT_MONO}`; x.fillText('CUMTA MOBILITY HELPLINE', 12, 152);
        softkeys(x, w, h, 'Handsfree', 'End');
      });
    },
    incall: (secs) => {
      lcd.draw((x, w, h) => {
        x.fillStyle = '#0B1405';
        bars(x, 8, 12, 0.85); battery(x, w - 46, 12, 0.62);
        x.font = `700 24px ${FONT_MONO}`; x.fillText('00:' + String(Math.floor(secs)).padStart(2, '0'), w - 96, 24);
        x.font = `700 26px ${FONT_MONO}`; x.fillText('HELPLINE · TAMIL', 12, 70);
        x.font = `600 20px ${FONT_MONO}`; x.fillText('8 kHz voice · in-band DTMF', 12, 104);
        /* live level meter */
        const lvl = 0.35 + 0.6 * Math.abs(Math.sin(secs * 4.1)) * Math.abs(Math.sin(secs * 1.7));
        x.strokeStyle = '#0B1405'; x.lineWidth = 3; x.strokeRect(12, 124, w - 24, 22);
        for (let i = 0; i < 18; i++) {
          if (i / 18 > lvl) break;
          x.fillStyle = '#0B1405'; x.fillRect(15 + i * ((w - 30) / 18), 127, (w - 30) / 18 - 3, 16);
        }
        x.font = `600 18px ${FONT_MONO}`; x.fillText('Press 1 for SMS route guide', 12, 168);
        softkeys(x, w, h, 'Keypad', 'End');
      });
    },
    endcall: (secs) => {
      lcd.draw((x, w, h) => {
        x.fillStyle = '#0B1405';
        bars(x, 8, 12, 0.85); battery(x, w - 46, 12, 0.62);
        x.font = `700 26px ${FONT_MONO}`; x.fillText('Call ended', 12, 80);
        x.font = `600 22px ${FONT_MONO}`; x.fillText('Duration 00:' + String(Math.floor(secs)).padStart(2, '0'), 12, 118);
        x.fillText('Rs. 1.20 · 10-digit call', 12, 148);
        softkeys(x, w, h, 'Redial', 'Names');
      });
    },
    smsAlert: () => {
      lcd.draw((x, w, h) => {
        x.fillStyle = '#0B1405';
        bars(x, 8, 12, 0.85); battery(x, w - 46, 12, 0.62);
        x.font = `800 30px ${FONT_MONO}`; x.fillText('1 NEW MESSAGE', 12, 78);
        x.font = `600 22px ${FONT_MONO}`; x.fillText('From: CUMTA (VK-CUMTA)', 12, 116);
        x.fillText('148 characters · 1 segment', 12, 148);
        softkeys(x, w, h, 'Read', 'Delete');
      });
    },
    sms: (reveal) => {
      lcd.draw((x, w, h) => {
        x.fillStyle = '#0B1405';
        bars(x, 8, 12, 0.85); battery(x, w - 46, 12, 0.62);
        x.font = `700 20px ${FONT_MONO}`; x.fillText('CUMTA  ·  148/160', 10, 52);
        const lines = PHONE.SMS.split('\n');
        let shown = 0;
        for (let i = 0; i < lines.length; i++) {
          const L = lines[i];
          const chars = Math.max(0, Math.min(L.length, Math.floor(reveal) - shown));
          shown += L.length + 1;
          if (chars <= 0) continue;
          const txt = L.slice(0, chars);
          x.font = i === 0 ? `800 21px ${FONT_MONO}` : `600 16px ${FONT_MONO}`;
          x.fillText(txt, 10, 74 + i * 15);
        }
        /* blinking cursor */
        if (Math.floor(reveal) < PHONE.SMS.length && Math.floor(U.time.value * 3) % 2 === 0) {
          let ci = 0, done = false;
          for (let i = 0; i < lines.length && !done; i++) {
            if (ci + lines[i].length >= Math.floor(reveal)) {
              x.fillRect(10 + x.measureText(lines[i].slice(0, Math.max(0, Math.floor(reveal) - ci))).width, 68 + i * 15, 7, 12);
              done = true;
            }
            ci += lines[i].length + 1;
          }
        }
        softkeys(x, w, h, 'Back', 'Del');
      });
    },
    dark: () => { lcd.draw((x, w, h) => { x.fillStyle = '#0B1405'; }); },
  };

  g.userData = {
    lcd, screen, glassMat, backlight, keys, body, states: S, W, H, D,
    /* Local-space framing anchors. The macro camera keys are authored as
       (anchor + direction * distance) against these, measured once at build
       time, so the framing is exact no matter how the hand rig settles. */
    anchors: {
      centre: v3(0, 0, 0),
      lcd: v3(0, H * 0.27, -D / 2),
      keypad: v3(0, gridTop - 1.5 * pitchY, -D / 2),
      key1: v3(gridLeft, gridTop, -D / 2),
      key0: v3(gridLeft + pitchX, gridTop - 3 * pitchY, -D / 2),
      call: v3(-W * 0.27, callY, -D / 2),
      end: v3(W * 0.27, callY, -D / 2),
      mic: v3(0, -H / 2 + 0.006, -D / 2),
    },
    lens, torch, brand, dialDigits: '', screenState: 'idle',
    /** Press a key by name; k = 0..1 travel. */
    press(name, k) {
      const key = this.keys[name]; if (!key) return;
      key.press = clamp01(k);
      key.group.position.z = key.z0 - key.press * 0.0019;
      const s = 1 - key.press * 0.035;
      key.group.scale.set(s, s, 1);
      if (key.rim) key.rim.material.opacity = Math.min(0.95, key.press * 1.1);
      if (key.rim) key.rim.scale.setScalar(1 + key.press * 0.12);
      if (key.glow) key.glow.material.opacity = key.press * 0.5;
      if (key.base && key.base.material) {
        key.base.material.emissive = key.base.material.emissive || new THREE.Color();
        key.base.material.emissiveIntensity = key.press * 0.9;
        key.base.material.emissive.setHex(C.sodium);
      }
    },
    /** Backlight level 0..1 (the LCD is dark until something happens). */
    setBacklight(v) {
      this.glassMat.emissiveIntensity = v * 2.1;
      this.backlight.intensity = v * 0.42;
      this.lens.material.opacity = 0.16 - v * 0.06;
    },
    setState(name, arg) {
      if (this.screenState === name && name !== 'dial' && name !== 'incall' && name !== 'sms') return;
      this.screenState = name;
      (this.states[name] || this.states.idle)(arg);
    },
  };
  /* initialise */
  g.userData.states.idle();
  g.userData.setBacklight(0.35);
  return g;
}
function bars(x, X, Y, level) {
  x.fillStyle = '#0B1405';
  for (let i = 0; i < 5; i++) {
    const h = 6 + i * 4;
    if (i / 5 < level) x.fillRect(X + i * 9, Y + 22 - h, 6, h);
    else x.fillRect(X + i * 9, Y + 20, 6, 2);
  }
}
function battery(x, X, Y, level) {
  x.fillStyle = '#0B1405';
  x.fillRect(X, Y + 4, 34, 16);
  x.fillRect(X + 34, Y + 9, 4, 6);
  x.clearRect(X + 2, Y + 6, 30, 12);
  x.fillStyle = 'rgba(155,214,43,0.35)'; x.fillRect(X + 2, Y + 6, 30, 12);
  x.fillStyle = '#0B1405'; x.fillRect(X + 3, Y + 7, 28 * level, 10);
}
function softkeys(x, w, h, left, right) {
  x.fillStyle = 'rgba(11,20,5,0.85)'; x.fillRect(0, h - 34, w, 34);
  x.fillStyle = '#9BD62B'; x.font = `700 21px ${FONT_MONO}`;
  x.textAlign = 'left'; x.fillText(left, 10, h - 13);
  x.textAlign = 'right'; x.fillText(right, w - 10, h - 13);
  x.textAlign = 'left';
}
function formatDial(d) {
  const s = String(d);
  if (s.length <= 3) return s;
  if (s.length <= 7) return s.slice(0, 3) + ' ' + s.slice(3);
  return s.slice(0, 3) + ' ' + s.slice(3, 7) + ' ' + s.slice(7);
}
