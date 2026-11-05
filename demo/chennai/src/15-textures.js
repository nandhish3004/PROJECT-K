/* ============================================================================
   15-textures.js · every surface in the film is generated in code
   ----------------------------------------------------------------------------
   No image assets are fetched: asphalt grain, wet masks, building facades,
   Tamil shop signage, MTC route boards, corrugated tin, the city grid seen
   from 800 m up and the monochrome LCD of the handset are all drawn to
   canvases at boot and uploaded once as CanvasTextures.
   ========================================================================== */

const TEX = {};

/* ------------------------------- noise helpers ---------------------------- */
function canvasNoise(x, w, h, scale, oct, seed, mono = true) {
  const img = x.createImageData(w, h), d = img.data;
  for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) {
    let v = 0, amp = 0.5, fx = scale, fy = scale;
    for (let o = 0; o < oct; o++) { v += fbm2(i * fx / w * 8 + seed, j * fy / h * 8 + seed * 1.7, 1) * amp; amp *= 0.5; fx *= 2; fy *= 2; }
    v = v * 0.5 + 0.5;
    const k = (j * w + i) * 4;
    if (mono) { const c = clamp01(v) * 255; d[k] = d[k + 1] = d[k + 2] = c; }
    else { d[k] = clamp01(v) * 255; d[k + 1] = clamp01(v * 0.96 + 0.02) * 255; d[k + 2] = clamp01(v * 1.04) * 255; }
    d[k + 3] = 255;
  }
  x.putImageData(img, 0, 0);
}
/* Cheap value noise sampled per-pixel (fast enough for one-off 512px maps). */
function vnoise(x, y, seed) {
  return fbm2(x * 0.021 + seed, y * 0.024 + seed * 2.3, 4) * 0.5
    + fbm2(x * 0.083 + seed * 3.1, y * 0.077 + seed, 3) * 0.28
    + (hash2(Math.floor(x * 0.5), Math.floor(y * 0.5)) - 0.5) * 0.16;
}

/* --------------------------------- asphalt -------------------------------- */
/** Rain-slicked wet asphalt albedo (#12161A base) with aggregate + oil + tar. */
function texAsphalt(size = 1024) {
  const { c, x } = makeCanvas(size, size);
  const img = x.createImageData(size, size), d = img.data;
  const base = [0x12, 0x16, 0x1A];
  for (let j = 0; j < size; j++) for (let i = 0; i < size; i++) {
    const n = vnoise(i, j, 11.3);                     /* -1..1 */
    const grit = (hash2(i * 3.1, j * 2.7) - 0.5) * 0.34;
    const patch = fbm2(i * 0.004 + 5, j * 0.004 - 3, 3) * 0.5;
    let l = 1 + n * 0.42 + grit + patch * 0.3;
    /* wet darker streaks where water sheets off */
    const sheet = fbm2(i * 0.0016 - 2.2, j * 0.0062 + 7.1, 3);
    l *= 1 - Math.max(0, sheet) * 0.34;
    const k = (j * size + i) * 4;
    d[k] = clamp(base[0] * l, 0, 255); d[k + 1] = clamp(base[1] * l, 0, 255); d[k + 2] = clamp(base[2] * l * 1.03, 0, 255); d[k + 3] = 255;
  }
  x.putImageData(img, 0, 0);
  /* tar cracks */
  x.strokeStyle = 'rgba(6,8,10,0.5)'; x.lineWidth = 1.4;
  const r = rng(9137);
  for (let s = 0; s < 26; s++) {
    x.beginPath();
    let px = r() * size, py = r() * size; x.moveTo(px, py);
    for (let k = 0; k < 9; k++) { px += (r() - 0.5) * 78; py += (r() - 0.5) * 78; x.lineTo(px, py); }
    x.stroke();
  }
  /* faded white/yellow paint flecks and tyre polish */
  for (let s = 0; s < 220; s++) {
    x.fillStyle = `rgba(${180 + (r() * 50 | 0)},${180 + (r() * 50 | 0)},${175 + (r() * 50 | 0)},${0.015 + r() * 0.03})`;
    x.beginPath(); x.arc(r() * size, r() * size, 3 + r() * 34, 0, TAU); x.fill();
  }
  const t = canvasTexture(c, { wrap: THREE.RepeatWrapping, aniso: 8 });
  t.repeat.set(26, 5);
  return t;
}

/** Roughness map: dry aggregate is rough, wet patches and puddles are slick. */
function texAsphaltRough(size = 1024) {
  const { c, x } = makeCanvas(size, size);
  const img = x.createImageData(size, size), d = img.data;
  for (let j = 0; j < size; j++) for (let i = 0; i < size; i++) {
    const n = vnoise(i, j, 41.7);
    let v = 0.86 - n * 0.16 - Math.max(0, fbm2(i * 0.0016 - 2.2, j * 0.0062 + 7.1, 3)) * 0.5;
    v = clamp(v, 0.05, 0.97);
    const k = (j * size + i) * 4; d[k] = d[k + 1] = d[k + 2] = v * 255; d[k + 3] = 255;
  }
  x.putImageData(img, 0, 0);
  const t = canvasTexture(c, { srgb: false, wrap: THREE.RepeatWrapping });
  t.repeat.set(26, 5);
  return t;
}

/**
 * Wet mask: broad sheet-water everywhere plus discrete puddles that sit in the
 * road's depressions. White = mirror-like, black = dry aggregate. Drives both
 * roughness and screen-space reflection strength in the road shader.
 */
function texWetMask(size = 1024, seed = 7) {
  const { c, x } = makeCanvas(size, size);
  x.fillStyle = '#000'; x.fillRect(0, 0, size, size);
  const r = rng(seed * 7919);
  /* sheet water: soft large blotches */
  for (let s = 0; s < 60; s++) {
    const px = r() * size, py = r() * size, rad = 40 + r() * 200;
    const g = x.createRadialGradient(px, py, 0, px, py, rad);
    const a = 0.10 + r() * 0.22;
    g.addColorStop(0, `rgba(255,255,255,${a})`); g.addColorStop(0.55, `rgba(255,255,255,${a * 0.42})`); g.addColorStop(1, 'rgba(255,255,255,0)');
    x.fillStyle = g; x.beginPath(); x.ellipse(px, py, rad * (0.7 + r() * 1.6), rad * (0.4 + r() * 0.7), r() * PI, 0, TAU); x.fill();
  }
  /* discrete puddles with hard-ish rims */
  for (let s = 0; s < 26; s++) {
    const px = r() * size, py = r() * size, rad = 26 + r() * 96;
    x.save(); x.translate(px, py); x.scale(1 + r() * 1.5, 0.5 + r() * 0.7); x.rotate(r() * PI);
    const g = x.createRadialGradient(0, 0, 0, 0, 0, rad);
    g.addColorStop(0, 'rgba(255,255,255,0.95)'); g.addColorStop(0.7, 'rgba(255,255,255,0.72)'); g.addColorStop(0.92, 'rgba(255,255,255,0.18)'); g.addColorStop(1, 'rgba(255,255,255,0)');
    x.fillStyle = g; x.beginPath();
    for (let a = 0; a <= 32; a++) { const th = (a / 32) * TAU, rr = rad * (0.82 + 0.18 * Math.sin(th * 3 + s)); const X = Math.cos(th) * rr, Y = Math.sin(th) * rr; a ? x.lineTo(X, Y) : x.moveTo(X, Y); }
    x.closePath(); x.fill(); x.restore();
  }
  const t = canvasTexture(c, { srgb: false, wrap: THREE.RepeatWrapping });
  t.repeat.set(6, 2.2);
  return t;
}

/* ------------------------------ lane markings ----------------------------- */
function texRoadLines(w = 1024, h = 256) {
  const { c, x } = makeCanvas(w, h);
  x.clearRect(0, 0, w, h);
  /* dashed centre lane divider, worn by traffic */
  const r = rng(4242);
  x.fillStyle = 'rgba(226,222,205,0.72)';
  for (let i = 0; i < 12; i++) {
    const X = i * (w / 12) + 12;
    x.fillRect(X, h * 0.46, w / 12 - 62, h * 0.075);
  }
  /* grime over the paint */
  for (let s = 0; s < 900; s++) {
    x.fillStyle = `rgba(18,22,26,${0.05 + r() * 0.2})`;
    x.fillRect(r() * w, r() * h, 2 + r() * 16, 1 + r() * 5);
  }
  const t = canvasTexture(c, { transparent: true, wrap: THREE.RepeatWrapping });
  return t;
}

/* --------------------------------- facades -------------------------------- */
/**
 * Chennai street building facade: plaster, stained by monsoon, with a grid of
 * windows — some lit warm — plus balconies, AC boxes and a parapet.
 */
function texFacade(idx = 0, w = 512, h = 1024) {
  const { c, x } = makeCanvas(w, h);
  const r = rng(1013 + idx * 977);
  const plaster = ['#6E6357', '#7A6A5C', '#5C5A55', '#8A7B6A', '#6B6055', '#77695C', '#5F5750', '#847766'][idx % 8];
  x.fillStyle = plaster; x.fillRect(0, 0, w, h);
  /* monsoon staining: vertical runs from the parapet down */
  for (let s = 0; s < 260; s++) {
    const px = r() * w, len = 40 + r() * (h * 0.7);
    const g = x.createLinearGradient(px, 0, px, len);
    const a = 0.05 + r() * 0.22;
    g.addColorStop(0, `rgba(24,28,22,${a})`); g.addColorStop(1, 'rgba(24,28,22,0)');
    x.fillStyle = g; x.fillRect(px, r() * h * 0.3, 1.5 + r() * 7, len);
  }
  /* plaster mottling */
  for (let s = 0; s < 500; s++) {
    x.fillStyle = `rgba(${r() > 0.5 ? '255,250,238' : '20,22,20'},${0.02 + r() * 0.06})`;
    x.beginPath(); x.arc(r() * w, r() * h, 3 + r() * 30, 0, TAU); x.fill();
  }
  /* windows */
  const cols = 4 + (idx % 3), rows = 7 + (idx % 4);
  const mw = w / cols, mh = h / rows;
  const ww = mw * 0.5, wh = mh * 0.52;
  for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
    const X = i * mw + (mw - ww) / 2, Y = j * mh + (mh - wh) / 2 + mh * 0.06;
    const lit = r() < 0.34;
    /* recess */
    x.fillStyle = 'rgba(14,16,18,0.85)'; x.fillRect(X - 3, Y - 3, ww + 6, wh + 6);
    if (lit) {
      const warm = r();
      const g = x.createLinearGradient(X, Y, X, Y + wh);
      g.addColorStop(0, warm > 0.5 ? '#FFD79A' : '#FFE7BE');
      g.addColorStop(1, warm > 0.5 ? '#C98A3C' : '#D9A85F');
      x.fillStyle = g;
    } else {
      const g = x.createLinearGradient(X, Y, X + ww, Y + wh);
      g.addColorStop(0, '#1A222C'); g.addColorStop(0.45, '#2C3A49'); g.addColorStop(0.5, '#131A22'); g.addColorStop(1, '#0C1116');
      x.fillStyle = g;
    }
    x.fillRect(X, Y, ww, wh);
    /* mullion */
    x.fillStyle = 'rgba(20,22,24,0.75)'; x.fillRect(X + ww / 2 - 1, Y, 2, wh);
    /* sill + grille */
    x.fillStyle = 'rgba(220,214,200,0.22)'; x.fillRect(X - 5, Y + wh + 2, ww + 10, 4);
    if (r() < 0.4) { x.strokeStyle = 'rgba(30,32,34,0.6)'; x.lineWidth = 1.5; for (let b = 0; b < 4; b++) { x.beginPath(); x.moveTo(X, Y + (wh / 4) * b + 3); x.lineTo(X + ww, Y + (wh / 4) * b + 3); x.stroke(); } }
    /* balcony on some bays */
    if (j % 2 === 1 && r() < 0.45) {
      x.fillStyle = 'rgba(90,84,76,0.9)'; x.fillRect(X - 9, Y + wh + 5, ww + 18, 7);
      x.strokeStyle = 'rgba(38,40,42,0.8)'; x.lineWidth = 1.6;
      for (let b = 0; b < 7; b++) { x.beginPath(); x.moveTo(X - 8 + b * (ww + 16) / 6, Y + wh + 5); x.lineTo(X - 8 + b * (ww + 16) / 6, Y + wh - 16); x.stroke(); }
    }
    /* AC unit */
    if (r() < 0.12) { x.fillStyle = '#B9B6AE'; x.fillRect(X + ww * 0.1, Y + wh + 8, ww * 0.55, wh * 0.3); x.fillStyle = '#6E6B64'; x.fillRect(X + ww * 0.13, Y + wh + 11, ww * 0.49, wh * 0.24); }
  }
  /* parapet band + roof line */
  x.fillStyle = 'rgba(30,32,34,0.55)'; x.fillRect(0, 0, w, 12);
  x.fillStyle = 'rgba(232,226,212,0.14)'; x.fillRect(0, 12, w, 5);
  /* cables draped across */
  x.strokeStyle = 'rgba(10,10,12,0.8)'; x.lineWidth = 2;
  for (let s = 0; s < 3; s++) {
    const y0 = h * (0.1 + r() * 0.5);
    x.beginPath(); x.moveTo(0, y0);
    x.bezierCurveTo(w * 0.3, y0 + 26 + r() * 30, w * 0.7, y0 + 18 + r() * 34, w, y0 - 8 + r() * 20);
    x.stroke();
  }
  const t = canvasTexture(c, { wrap: THREE.RepeatWrapping, aniso: 4 });
  return t;
}

/** Ground-floor shopfront: rolled shutter + awning + grime. */
function texShutter(idx = 0, w = 512, h = 256) {
  const { c, x } = makeCanvas(w, h);
  const r = rng(55 + idx * 31);
  const paint = ['#2F5D50', '#7A2E2E', '#2E3D6B', '#5B4A2F', '#3A4A3A', '#6B3A5B'][idx % 6];
  x.fillStyle = paint; x.fillRect(0, 0, w, h);
  /* horizontal shutter slats */
  for (let j = 0; j < h; j += 9) {
    x.fillStyle = `rgba(255,255,255,${0.05 + r() * 0.05})`; x.fillRect(0, j, w, 2);
    x.fillStyle = `rgba(0,0,0,${0.14 + r() * 0.14})`; x.fillRect(0, j + 5, w, 3.4);
  }
  /* rust + dust */
  for (let s = 0; s < 260; s++) {
    x.fillStyle = `rgba(${120 + r() * 60 | 0},${60 + r() * 40 | 0},30,${0.03 + r() * 0.14})`;
    x.beginPath(); x.arc(r() * w, r() * h, 2 + r() * 22, 0, TAU); x.fill();
  }
  /* open shop: warm interior glow at the bottom on some */
  if (idx % 3 === 0) {
    const g = x.createLinearGradient(0, h, 0, h * 0.4);
    g.addColorStop(0, 'rgba(255,196,110,0.55)'); g.addColorStop(1, 'rgba(255,196,110,0)');
    x.fillStyle = g; x.fillRect(w * 0.12, h * 0.42, w * 0.76, h * 0.58);
  }
  return canvasTexture(c, { wrap: THREE.RepeatWrapping });
}

/**
 * Tamil / English shop signboard — the single strongest "this is Chennai"
 * signal in the frame, so the typography is drawn properly: Tamil headline in
 * a Tamil-capable stack, Latin subtitle, painted border, bulb dots.
 */
function texSign(tamil, latin, bg = '#8E1B1B', fg = '#FFE9B0', w = 512, h = 160) {
  const { c, x } = makeCanvas(w, h);
  const g = x.createLinearGradient(0, 0, 0, h);
  g.addColorStop(0, bg); g.addColorStop(0.5, shade(bg, -12)); g.addColorStop(1, shade(bg, -30));
  x.fillStyle = g; x.fillRect(0, 0, w, h);
  /* border */
  x.strokeStyle = fg; x.lineWidth = 5; x.strokeRect(9, 9, w - 18, h - 18);
  x.strokeStyle = 'rgba(255,255,255,0.25)'; x.lineWidth = 1.5; x.strokeRect(17, 17, w - 34, h - 34);
  /* bulb dots */
  x.fillStyle = 'rgba(255,214,140,0.9)';
  for (let i = 0; i < Math.floor(w / 26); i++) { x.beginPath(); x.arc(16 + i * 26, 4, 2.6, 0, TAU); x.fill(); x.beginPath(); x.arc(16 + i * 26, h - 4, 2.6, 0, TAU); x.fill(); }
  /* Tamil headline */
  x.textAlign = 'center'; x.fillStyle = fg;
  let fs = Math.floor(h * 0.34);
  x.font = `700 ${fs}px ${FONT_TAMIL}`;
  while (x.measureText(tamil).width > w - 46 && fs > 12) { fs -= 2; x.font = `700 ${fs}px ${FONT_TAMIL}`; }
  x.shadowColor = 'rgba(0,0,0,0.6)'; x.shadowBlur = 6; x.shadowOffsetY = 2;
  x.fillText(tamil, w / 2, h * 0.46);
  /* Latin subtitle */
  x.shadowBlur = 0; x.shadowOffsetY = 0;
  let ls = Math.floor(h * 0.15);
  x.font = `600 ${ls}px ${FONT_COND}`;
  x.fillStyle = 'rgba(255,255,255,0.86)';
  while (x.measureText(latin).width > w - 60 && ls > 8) { ls -= 1; x.font = `600 ${ls}px ${FONT_COND}`; }
  x.fillText(latin, w / 2, h * 0.78);
  /* weathering */
  x.globalAlpha = 0.16;
  for (let s = 0; s < 90; s++) { x.fillStyle = hash2(s, 3) > 0.5 ? '#000' : '#fff'; x.fillRect(hash2(s, 1) * w, hash2(s, 2) * h, 3 + hash2(s, 4) * 30, 1 + hash2(s, 5) * 5); }
  x.globalAlpha = 1;
  return canvasTexture(c);
}
function shade(hex, amt) {
  const n = typeof hex === 'number' ? hex : parseInt(hex.slice(1), 16);
  const r = clamp(((n >> 16) & 255) + amt, 0, 255), g = clamp(((n >> 8) & 255) + amt, 0, 255), b = clamp((n & 255) + amt, 0, 255);
  return `rgb(${r | 0},${g | 0},${b | 0})`;
}

/* ------------------------------ MTC bus panels ---------------------------- */
/** Amber destination/route board: white digits on #EA580C, LED-dot feel. */
function texRouteBoard(route, dest, w = 512, h = 128) {
  const { c, x } = makeCanvas(w, h);
  x.fillStyle = '#EA580C'; x.fillRect(0, 0, w, h);
  const g = x.createLinearGradient(0, 0, 0, h);
  g.addColorStop(0, 'rgba(255,255,255,0.22)'); g.addColorStop(0.5, 'rgba(255,255,255,0)'); g.addColorStop(1, 'rgba(0,0,0,0.3)');
  x.fillStyle = g; x.fillRect(0, 0, w, h);
  x.strokeStyle = 'rgba(20,10,0,0.55)'; x.lineWidth = 6; x.strokeRect(3, 3, w - 6, h - 6);
  x.textAlign = 'center'; x.textBaseline = 'middle';
  x.fillStyle = '#FFF6E2';
  x.font = `800 ${Math.floor(h * 0.52)}px ${FONT_COND}`;
  x.shadowColor = 'rgba(255,190,90,0.85)'; x.shadowBlur = 18;
  x.fillText(route, w * 0.19, h * 0.5);
  x.shadowBlur = 8;
  x.font = `700 ${Math.floor(h * 0.3)}px ${FONT_TAMIL}`;
  x.fillText(dest, w * 0.62, h * 0.44);
  const t = canvasTexture(c); t.anisotropy = 8;
  return t;
}
/** Interior LED-style "next stop" strip. */
function texLEDStrip(text, w = 1024, h = 96) {
  const { c, x } = makeCanvas(w, h);
  x.fillStyle = '#05070A'; x.fillRect(0, 0, w, h);
  x.font = `700 ${Math.floor(h * 0.6)}px ${FONT_MONO}`;
  x.fillStyle = '#FF8A1E'; x.textBaseline = 'middle';
  x.shadowColor = '#FF8A1E'; x.shadowBlur = 14;
  x.fillText(text, 18, h * 0.54);
  return canvasTexture(c);
}

/* --------------------------------- signage -------------------------------- */
/** Bus-stop totem board: MTC crest + Tamil/English stop name + route list. */
function texBusStopBoard(w = 512, h = 768) {
  const { c, x } = makeCanvas(w, h);
  x.fillStyle = '#0E2A24'; x.fillRect(0, 0, w, h);
  x.fillStyle = '#F59E0B'; x.fillRect(0, 0, w, 92);
  x.textAlign = 'center'; x.textBaseline = 'middle';
  x.fillStyle = '#12100C'; x.font = `800 40px ${FONT_COND}`;
  x.fillText('MTC CHENNAI · BUS STOP', w / 2, 48);
  x.fillStyle = '#FFF3D6'; x.font = `700 34px ${FONT_TAMIL}`;
  x.fillText('பேருந்து நிறுத்தம்', w / 2, 140);
  x.fillStyle = '#F59E0B'; x.font = `700 30px ${FONT_TAMIL}`;
  x.fillText('சைமாட்ஸ் ஹைவே', w / 2, 196);
  x.fillStyle = '#DCE6E2'; x.font = `600 24px ${FONT_COND}`;
  x.fillText('SIMATS HIGHWAY · THANDALAM', w / 2, 232);
  x.strokeStyle = 'rgba(245,158,11,0.5)'; x.lineWidth = 2;
  x.beginPath(); x.moveTo(30, 264); x.lineTo(w - 30, 264); x.stroke();
  x.textAlign = 'left'; x.fillStyle = '#BFD2CB'; x.font = `600 22px ${FONT_MONO}`;
  const rows = ['54   PORUR RDTA', '54E  PORUR → BC', 'B54  BROADWAY', '128  KOYAMBEDU', '581  T.NAGAR', 'PP66 PADI', '517  AMBATTUR', '570  VELAPPAN'];
  rows.forEach((r2, i) => {
    const y = 306 + i * 44;
    x.fillStyle = i % 2 ? 'rgba(255,255,255,0.045)' : 'rgba(255,255,255,0.012)';
    x.fillRect(24, y - 20, w - 48, 38);
    x.fillStyle = '#F59E0B'; x.font = `800 24px ${FONT_MONO}`;
    x.fillText(r2.slice(0, 4), 36, y + 2);
    x.fillStyle = '#D7E4DF'; x.font = `600 22px ${FONT_MONO}`;
    x.fillText(r2.slice(5), 110, y + 2);
  });
  x.textAlign = 'center'; x.fillStyle = 'rgba(255,243,214,0.7)'; x.font = `600 20px ${FONT_MONO}`;
  x.fillText('HELPLINE 044 2479 4705', w / 2, h - 68);
  x.fillText('VOICE + SMS · ANY PHONE', w / 2, h - 40);
  return canvasTexture(c);
}

/** Shelter advertising panel — a CUMTA-style public information poster. */
function texPoster(kind = 0, w = 512, h = 768) {
  const { c, x } = makeCanvas(w, h);
  const r = rng(31 + kind * 17);
  if (kind === 0) {
    x.fillStyle = '#F2E7CE'; x.fillRect(0, 0, w, h);
    x.fillStyle = '#B91C1C'; x.fillRect(0, 0, w, 150);
    x.textAlign = 'center'; x.textBaseline = 'middle';
    x.fillStyle = '#FFF1DC'; x.font = `800 42px ${FONT_TAMIL}`; x.fillText('பொதுப் புகார்', w / 2, 56);
    x.font = `700 26px ${FONT_COND}`; x.fillText('CUMTA GRIEVANCE REDRESSAL', w / 2, 108);
    x.fillStyle = '#22303A'; x.font = `600 26px ${FONT_TAMIL}`;
    const lines = ['கட்டணம் பிடித்தமாகி', 'டிக்கெட் கிடைக்கவில்லையா?', 'பஸ் நிற்கவில்லையா?', '', 'ஒரே ஒரு போன்.', 'ஆப்பும் இல்லை,', 'இணையமும் இல்லை.'];
    lines.forEach((l, i) => x.fillText(l, w / 2, 210 + i * 46));
    x.fillStyle = '#B91C1C'; x.font = `800 60px ${FONT_MONO}`; x.fillText('044', w / 2, 560);
    x.font = `800 54px ${FONT_MONO}`; x.fillText('2479 4705', w / 2, 622);
    x.fillStyle = '#22303A'; x.font = `600 22px ${FONT_COND}`; x.fillText('CALL FROM ANY PHONE · TAMIL / TANGLISH', w / 2, 690);
  } else {
    /* a film poster — unavoidable on a Chennai street */
    x.fillStyle = '#141026'; x.fillRect(0, 0, w, h);
    const g = x.createRadialGradient(w / 2, h * 0.38, 20, w / 2, h * 0.38, w * 0.7);
    g.addColorStop(0, '#F59E0B'); g.addColorStop(0.4, '#B91C1C'); g.addColorStop(1, '#141026');
    x.fillStyle = g; x.fillRect(0, 0, w, h);
    x.textAlign = 'center'; x.fillStyle = '#FFF6DA'; x.shadowColor = '#000'; x.shadowBlur = 12;
    x.font = `800 96px ${FONT_TAMIL}`; x.fillText('மழை', w / 2, h * 0.34);
    x.font = `800 44px ${FONT_COND}`; x.fillText('A CHENNAI STORY', w / 2, h * 0.42);
    x.shadowBlur = 0; x.font = `700 26px ${FONT_TAMIL}`; x.fillStyle = 'rgba(255,246,218,0.85)';
    x.fillText('விரைவில் வெளிவரும்', w / 2, h * 0.86);
  }
  /* torn corners + rain damage + paste streaks */
  x.globalAlpha = 0.22;
  for (let s = 0; s < 120; s++) { x.fillStyle = r() > 0.5 ? '#000' : '#fff'; x.fillRect(r() * w, r() * h, 2 + r() * 40, 1 + r() * 8); }
  x.globalAlpha = 0.18; x.fillStyle = '#2A2418';
  x.beginPath(); x.moveTo(0, h); x.lineTo(w * 0.24, h); x.lineTo(0, h * 0.74); x.closePath(); x.fill();
  x.globalAlpha = 1;
  return canvasTexture(c);
}

/* ------------------------------ city from above --------------------------- */
/** 2 km city grid seen from 800 m: blocks, streets, the Poonamallee corridor. */
function texCityGrid(size = 2048) {
  const { c, x } = makeCanvas(size, size);
  x.fillStyle = '#080B10'; x.fillRect(0, 0, size, size);
  const r = rng(20250105);
  /* blocks */
  const cell = size / 26;
  for (let i = 0; i < 26; i++) for (let j = 0; j < 26; j++) {
    const X = i * cell, Y = j * cell;
    const pad = cell * (0.10 + r() * 0.09);
    const w2 = cell - pad * 2, h2 = cell - pad * 2;
    const l = 0.55 + r() * 0.5;
    x.fillStyle = `rgb(${(16 * l) | 0},${(20 * l) | 0},${(25 * l) | 0})`;
    x.fillRect(X + pad, Y + pad, w2, h2);
    /* sub-lots */
    const n = 2 + (r() * 4 | 0);
    for (let s = 0; s < n; s++) {
      const sx = X + pad + r() * w2 * 0.7, sy = Y + pad + r() * h2 * 0.7;
      const sw = w2 * (0.12 + r() * 0.28), sh = h2 * (0.12 + r() * 0.28);
      const ll = 0.7 + r() * 0.9;
      x.fillStyle = `rgb(${(22 * ll) | 0},${(26 * ll) | 0},${(32 * ll) | 0})`;
      x.fillRect(sx, sy, sw, sh);
      /* lit rooftops / street spill */
      if (r() < 0.35) { x.fillStyle = `rgba(245,158,11,${0.05 + r() * 0.16})`; x.fillRect(sx, sy, sw, sh); }
    }
  }
  /* street lamps along the grid */
  for (let i = 0; i <= 26; i++) for (let j = 0; j < 40; j++) {
    if (r() < 0.55) { x.fillStyle = `rgba(255,180,80,${0.20 + r() * 0.35})`; x.fillRect(i * cell - 1.5, j * (size / 40), 3, 3); }
    if (r() < 0.55) { x.fillStyle = `rgba(255,180,80,${0.20 + r() * 0.35})`; x.fillRect(j * (size / 40), i * cell - 1.5, 3, 3); }
  }
  /* headlight streams: moving traffic frozen as streaks */
  for (let s = 0; s < 260; s++) {
    const horiz = r() > 0.5;
    const lane = Math.floor(r() * 26) * cell + cell * (0.02 + r() * 0.04);
    const pos = r() * size, len = 6 + r() * 46;
    x.fillStyle = r() > 0.5 ? 'rgba(255,244,214,0.5)' : 'rgba(255,60,40,0.42)';
    if (horiz) x.fillRect(pos, lane, len, 2); else x.fillRect(lane, pos, 2, len);
  }
  /* the Poonamallee High Road corridor, brighter than the rest */
  x.save();
  x.strokeStyle = 'rgba(30,34,40,1)'; x.lineWidth = cell * 0.30;
  x.beginPath(); x.moveTo(0, size * 0.98); x.bezierCurveTo(size * 0.34, size * 0.80, size * 0.55, size * 0.52, size * 0.99, size * 0.30); x.stroke();
  x.strokeStyle = 'rgba(245,158,11,0.10)'; x.lineWidth = cell * 0.30;
  x.beginPath(); x.moveTo(0, size * 0.98); x.bezierCurveTo(size * 0.34, size * 0.80, size * 0.55, size * 0.52, size * 0.99, size * 0.30); x.stroke();
  x.restore();
  const t = canvasTexture(c, { aniso: 2 });
  return t;
}

/** Emissive window texture for the instanced far-city blocks. */
function texWindows(w = 256, h = 256) {
  const { c, x } = makeCanvas(w, h);
  x.fillStyle = '#000'; x.fillRect(0, 0, w, h);
  const r = rng(8891);
  const cw = 16, ch = 12;
  for (let j = 0; j < h / ch; j++) for (let i = 0; i < w / cw; i++) {
    const lit = r() < 0.26;
    if (!lit) continue;
    const warm = r();
    x.fillStyle = warm > 0.6 ? `rgba(255,${170 + r() * 60 | 0},${90 + r() * 60 | 0},${0.5 + r() * 0.5})` : `rgba(${200 + r() * 55 | 0},${225 + r() * 30 | 0},255,${0.35 + r() * 0.5})`;
    x.fillRect(i * cw + 3, j * ch + 3, cw - 7, ch - 6);
  }
  const t = canvasTexture(c, { wrap: THREE.RepeatWrapping, srgb: true });
  return t;
}

/* --------------------------------- concrete ------------------------------- */
function texConcrete(size = 512, tint = [128, 126, 120]) {
  const { c, x } = makeCanvas(size, size);
  const img = x.createImageData(size, size), d = img.data;
  for (let j = 0; j < size; j++) for (let i = 0; i < size; i++) {
    const n = vnoise(i, j, 77.1) * 0.5 + 0.5;
    const k = (j * size + i) * 4;
    d[k] = tint[0] * (0.72 + n * 0.5); d[k + 1] = tint[1] * (0.72 + n * 0.5); d[k + 2] = tint[2] * (0.72 + n * 0.5); d[k + 3] = 255;
  }
  x.putImageData(img, 0, 0);
  x.strokeStyle = 'rgba(40,40,40,0.35)'; x.lineWidth = 2;
  for (let i = 1; i < 4; i++) { x.beginPath(); x.moveTo(0, (size / 4) * i); x.lineTo(size, (size / 4) * i); x.stroke(); }
  const t = canvasTexture(c, { wrap: THREE.RepeatWrapping });
  t.repeat.set(4, 4);
  return t;
}
/** Corrugated tin for the shelter roof. */
function texCorrugated(w = 256, h = 256) {
  const { c, x } = makeCanvas(w, h);
  for (let i = 0; i < w; i += 8) {
    const g = x.createLinearGradient(i, 0, i + 8, 0);
    g.addColorStop(0, '#2A2E33'); g.addColorStop(0.4, '#4B5259'); g.addColorStop(0.6, '#3A4046'); g.addColorStop(1, '#22262A');
    x.fillStyle = g; x.fillRect(i, 0, 8, h);
  }
  const r = rng(3);
  for (let s = 0; s < 200; s++) { x.fillStyle = `rgba(${100 + r() * 60 | 0},${50 + r() * 30 | 0},20,${0.05 + r() * 0.2})`; x.beginPath(); x.arc(r() * w, r() * h, 2 + r() * 14, 0, TAU); x.fill(); }
  const t = canvasTexture(c, { wrap: THREE.RepeatWrapping }); t.repeat.set(6, 3);
  return t;
}

/* --------------------------------- LCD text ------------------------------- */
/**
 * Monochrome green LCD (#84CC16 backlight) of the feature phone. Drawn at
 * 4x the physical pixel grid then downsampled, with a visible pixel lattice,
 * so a macro shot reads as a real segment/dot-matrix display.
 */
function makeLCD(w = 256, h = 192) {
  const { c, x } = makeCanvas(w, h);
  const draw = (fn) => {
    x.fillStyle = '#0A1405'; x.fillRect(0, 0, w, h);
    const g = x.createRadialGradient(w / 2, h / 2, 8, w / 2, h / 2, w * 0.72);
    g.addColorStop(0, '#9BD62B'); g.addColorStop(0.62, '#7CB317'); g.addColorStop(1, '#4E7A0C');
    x.fillStyle = g; x.fillRect(0, 0, w, h);
    x.save();
    fn(x, w, h);
    x.restore();
    /* pixel lattice */
    x.globalAlpha = 0.16; x.fillStyle = '#0B1405';
    for (let j = 0; j < h; j += 3) x.fillRect(0, j, w, 1);
    for (let i = 0; i < w; i += 3) x.fillRect(i, 0, 1, h);
    x.globalAlpha = 0.07; x.fillStyle = '#E8FFB0'; x.fillRect(0, 0, w, h * 0.16);
    x.globalAlpha = 1;
  };
  const tex = canvasTexture(c, { aniso: 8 });
  return { c, x, tex, draw: (fn) => { draw(fn); tex.needsUpdate = true; } };
}

/* --------------------------------- keycaps -------------------------------- */
/** Rubber keycap legend sheet (3x4 grid + nav cluster) for the keypad. */
function texKeypad(w = 512, h = 640) {
  const { c, x } = makeCanvas(w, h);
  x.fillStyle = '#101113'; x.fillRect(0, 0, w, h);
  const labels = [['1', ''], ['2', 'ABC'], ['3', 'DEF'], ['4', 'GHI'], ['5', 'JKL'], ['6', 'MNO'], ['7', 'PQRS'], ['8', 'TUV'], ['9', 'WXYZ'], ['*', '+'], ['0', ' '], ['#', 'sym']];
  const cw = w / 3, ch = h / 4;
  x.textAlign = 'center'; x.textBaseline = 'middle';
  labels.forEach((L, i) => {
    const X = (i % 3) * cw + cw / 2, Y = ((i / 3) | 0) * ch + ch / 2;
    x.fillStyle = '#F2F4F5'; x.font = `700 ${ch * 0.44}px ${FONT_COND}`;
    x.fillText(L[0], X, Y - ch * 0.07);
    if (L[1]) { x.fillStyle = 'rgba(220,226,228,0.62)'; x.font = `600 ${ch * 0.15}px ${FONT_COND}`; x.fillText(L[1], X, Y + ch * 0.26); }
  });
  return canvasTexture(c);
}

/* ----------------------------- glow / soft discs -------------------------- */
function texRadial(size = 256, stops = [[0, 1], [0.35, 0.42], [1, 0]], power = 1) {
  const { c, x } = makeCanvas(size, size);
  const g = x.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  for (const [u, a] of stops) g.addColorStop(u, `rgba(255,255,255,${Math.pow(a, power).toFixed(3)})`);
  x.fillStyle = g; x.fillRect(0, 0, size, size);
  return canvasTexture(c, { srgb: false });
}
/** Sodium light pool projected on wet ground: hot core + long specular tail. */
function texLightPool(w = 256, h = 512) {
  const { c, x } = makeCanvas(w, h);
  const g = x.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w / 2);
  g.addColorStop(0, 'rgba(255,255,255,0.95)');
  g.addColorStop(0.18, 'rgba(255,214,140,0.62)');
  g.addColorStop(0.42, 'rgba(245,158,11,0.24)');
  g.addColorStop(0.72, 'rgba(245,158,11,0.06)');
  g.addColorStop(1, 'rgba(245,158,11,0)');
  x.fillStyle = g; x.save(); x.translate(w / 2, h / 2); x.scale(1, 2); x.translate(-w / 2, -h / 2);
  x.fillRect(0, 0, w, h / 2); x.restore();
  x.fillStyle = g; x.fillRect(0, 0, w, h);
  return canvasTexture(c, { srgb: false });
}
/** Headlight beam cross-section (for the volumetric cone shader). */
function texBeam(size = 256) {
  const { c, x } = makeCanvas(size, size);
  const g = x.createLinearGradient(0, 0, 0, size);
  g.addColorStop(0, 'rgba(255,255,255,0.9)');
  g.addColorStop(0.4, 'rgba(255,255,255,0.28)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  x.fillStyle = g; x.fillRect(0, 0, size, size);
  return canvasTexture(c, { srgb: false });
}

/* ------------------------------- boot them all ---------------------------- */
function buildTextures() {
  TEX.asphalt = texAsphalt(1024);
  TEX.asphaltRough = texAsphaltRough(512);
  TEX.wet = texWetMask(1024, 7);
  TEX.wetFoot = texWetMask(512, 19);
  TEX.lines = texRoadLines(1024, 256);
  TEX.facades = []; for (let i = 0; i < 8; i++) TEX.facades.push(texFacade(i, 512, 1024));
  TEX.shutters = []; for (let i = 0; i < 6; i++) TEX.shutters.push(texShutter(i, 512, 256));
  TEX.concrete = texConcrete(512, [126, 124, 118]);
  TEX.concreteDark = texConcrete(512, [86, 88, 90]);
  TEX.corrugated = texCorrugated(256, 256);
  TEX.cityGrid = texCityGrid(2048);
  TEX.windows = texWindows(256, 256);
  TEX.radial = texRadial(256);
  TEX.radialSoft = texRadial(256, [[0, 1], [0.5, 0.28], [1, 0]]);
  TEX.pool = texLightPool(256, 512);
  TEX.beam = texBeam(256);
  TEX.keypad = texKeypad(512, 640);
  TEX.busStop = texBusStopBoard(512, 768);
  TEX.poster0 = texPoster(0, 512, 768);
  TEX.poster1 = texPoster(1, 512, 768);
  TEX.route54 = texRouteBoard('54', 'போரூர்', 512, 128);
  TEX.route54E = texRouteBoard('54E', 'போரூர் ரவுண்டானா', 512, 128);
  TEX.led = texLEDStrip('54 · PORUR ROUNDTANA · NEXT: SIMATS HIGHWAY', 1024, 96);
  return TEX;
}
