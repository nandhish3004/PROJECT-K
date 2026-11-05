/* ============================================================================
   50-hud.js · the 2D overlay — progress line, titles, captions, telemetry
   ----------------------------------------------------------------------------
   Every element is a pure function of the master clock, so the HUD is
   frame-exact and recordable. Nothing here is clickable: the film is
   autonomous from the first frame to the last.
   ========================================================================== */

const HUD = {
  audioReady: false,
  hintUntil: 0,
  fps: 60,
  quality: 'ULTRA',
};

/* -------------------------------------------------------------------------- */
/*  reusable primitives                                                        */
/* -------------------------------------------------------------------------- */
function glass(ctx, x, y, w, h, r, accent, alpha) {
  const g = ctx.createLinearGradient(x, y, x + w * 0.35, y + h);
  g.addColorStop(0, `rgba(24,32,42,${0.62 * alpha})`);
  g.addColorStop(0.5, `rgba(12,18,26,${0.50 * alpha})`);
  g.addColorStop(1, `rgba(8,12,18,${0.66 * alpha})`);
  ctx.fillStyle = g; rr(ctx, x, y, w, h, r); ctx.fill();
  ctx.strokeStyle = `rgba(190,214,234,${0.16 * alpha})`; ctx.lineWidth = 1;
  rr(ctx, x + 0.5, y + 0.5, w - 1, h - 1, r); ctx.stroke();
  ctx.strokeStyle = accent; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(x + r, y + 1); ctx.lineTo(x + r + Math.min(64, w * 0.28), y + 1); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(x + 1, y + r); ctx.lineTo(x + 1, y + r + Math.min(34, h * 0.3)); ctx.stroke();
}
function label(ctx, x, y, txt, { size = 11, color = 'rgba(226,238,248,0.92)', weight = 700, alpha = 1, letter = 0.10, font = FONT_MONO } = {}) {
  ctx.save(); ctx.globalAlpha = alpha;
  ctx.font = `${weight} ${size}px ${font}`; ctx.fillStyle = color;
  ctx.textBaseline = 'alphabetic';
  if (letter > 0) {
    let cx = x;
    for (const ch of txt) { ctx.fillText(ch, cx, y); cx += ctx.measureText(ch).width + size * letter; }
  } else ctx.fillText(txt, x, y);
  ctx.restore();
}
function rows(ctx, x, y, pairs, { size = 11, gap = 17, alpha = 1, w = 250 } = {}) {
  ctx.save(); ctx.globalAlpha = alpha;
  pairs.forEach(([k, v], i) => {
    const yy = y + i * gap;
    ctx.font = `500 ${size}px ${FONT_MONO}`; ctx.fillStyle = 'rgba(158,186,210,0.72)';
    ctx.fillText(k.toUpperCase(), x, yy);
    ctx.font = `700 ${size}px ${FONT_MONO}`; ctx.fillStyle = '#F2F7FB';
    ctx.textAlign = 'right'; ctx.fillText(String(v), x + w, yy); ctx.textAlign = 'left';
    ctx.strokeStyle = 'rgba(150,180,205,0.10)'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(x, yy + 5.5); ctx.lineTo(x + w, yy + 5.5); ctx.stroke();
  });
  ctx.restore();
}
function wrapLines(ctx, text, maxW) {
  const words = String(text).split(/\s+/), out = []; let line = '';
  for (const wd of words) {
    const test = line ? line + ' ' + wd : wd;
    if (ctx.measureText(test).width > maxW && line) { out.push(line); line = wd; }
    else line = test;
  }
  if (line) out.push(line);
  return out;
}

/* -------------------------------------------------------------------------- */
/*  the thin amber progress line at the very top of the viewport               */
/* -------------------------------------------------------------------------- */
function drawProgress(ctx, w, h, S) {
  const t = S.t, u = clamp01(t / DURATION);
  const LINE_H = 2;                                  // thin, as specified
  const y = 0;                                       // the very top of the viewport
  const pad = 0;

  /* track */
  ctx.fillStyle = 'rgba(10,14,20,0.55)';
  ctx.fillRect(pad, y, w - pad * 2, LINE_H + 3);

  /* elapsed — sodium amber with a hot leading edge */
  const g = ctx.createLinearGradient(pad, 0, pad + (w - pad * 2) * u, 0);
  g.addColorStop(0, 'rgba(180,86,20,0.85)');
  g.addColorStop(0.72, '#EA580C');
  g.addColorStop(1, '#F59E0B');
  ctx.fillStyle = g;
  ctx.fillRect(pad, y, (w - pad * 2) * u, LINE_H);

  /* leading edge glow */
  const hx = pad + (w - pad * 2) * u;
  const hg = ctx.createRadialGradient(hx, y + 1, 0, hx, y + 1, 26);
  hg.addColorStop(0, 'rgba(245,158,11,0.55)');
  hg.addColorStop(1, 'rgba(245,158,11,0)');
  ctx.fillStyle = hg; ctx.fillRect(hx - 26, y - 12, 52, 26);
  ctx.fillStyle = '#FDE68A'; ctx.fillRect(hx - 1, y - 1, 2, LINE_H + 2);

  /* act segment ticks + roman numerals */
  ctx.textAlign = 'center'; ctx.textBaseline = 'top';
  for (const a of ACTS) {
    const x = pad + (w - pad * 2) * (a.t0 / DURATION);
    const active = S.actN === a.n;
    ctx.fillStyle = active ? '#F59E0B' : 'rgba(210,228,242,0.42)';
    ctx.fillRect(x - 0.5, y + LINE_H, 1, active ? 9 : 6);
    ctx.font = `${active ? 800 : 600} 9px ${FONT_MONO}`;
    ctx.fillStyle = active ? 'rgba(245,158,11,0.98)' : 'rgba(190,210,228,0.42)';
    ctx.fillText(['I', 'II', 'III', 'IV', 'V'][a.n - 1], x + (w - pad * 2) * (30 / DURATION) / 2, y + LINE_H + (active ? 11 : 8));
  }
  const xe = w - pad;
  ctx.fillStyle = 'rgba(210,228,242,0.42)'; ctx.fillRect(xe - 0.5, y + LINE_H, 1, 6);

  /* timecode readout, tucked under the line at the right */
  ctx.textAlign = 'right';
  const tc = timecode(t, 25);
  ctx.font = `700 11px ${FONT_MONO}`;
  ctx.fillStyle = 'rgba(245,158,11,0.92)';
  ctx.fillText(`${tc} / 02:30:00`, w - 14, y + LINE_H + 10);
  ctx.textAlign = 'left';
  ctx.font = `600 10px ${FONT_MONO}`;
  ctx.fillStyle = 'rgba(196,216,234,0.55)';
  ctx.fillText(`${S.actN === 5 ? 'ACT V' : 'ACT ' + ['I', 'II', 'III', 'IV', 'V'][S.actN - 1]} · ${(u * 100).toFixed(1)}%`, 14, y + LINE_H + 11);
}

/* -------------------------------------------------------------------------- */
/*  act titles                                                                 */
/* -------------------------------------------------------------------------- */
function drawActTitle(ctx, w, h, S) {
  const a = S.act, lt = S.t - a.t0;
  const k = window01(lt, 0.35, 5.6, 0.8, 1.1);
  if (k < 0.01) return;
  const cy = h * 0.30;
  ctx.save(); ctx.globalAlpha = k;
  ctx.textAlign = 'center';
  /* rule */
  const rw = 168 * (0.4 + 0.6 * k);
  ctx.strokeStyle = 'rgba(245,158,11,0.55)'; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(w / 2 - rw, cy - 34); ctx.lineTo(w / 2 + rw, cy - 34); ctx.stroke();
  ctx.font = `700 11px ${FONT_MONO}`; ctx.fillStyle = '#F59E0B';
  ctx.fillText(`ACT ${['I', 'II', 'III', 'IV', 'V'][a.n - 1]}  ·  ${timecode(a.t0)}–${timecode(a.t1)}`, w / 2, cy - 44);
  ctx.font = `800 ${Math.min(40, w * 0.032)}px ${FONT_COND}`;
  ctx.fillStyle = '#FFFFFF';
  ctx.shadowColor = 'rgba(0,0,0,0.8)'; ctx.shadowBlur = 18;
  ctx.fillText(a.name, w / 2, cy);
  ctx.shadowBlur = 0;
  ctx.font = `500 12px ${FONT_MONO}`; ctx.fillStyle = 'rgba(214,230,244,0.72)';
  ctx.fillText('CHENNAI MOBILITY AI  ·  CUMTA INTEGRATED TRANSIT ASSISTANCE', w / 2, cy + 24);
  ctx.restore(); ctx.textAlign = 'left';
}

/* -------------------------------------------------------------------------- */
/*  captions + Tamil subtitles                                                 */
/* -------------------------------------------------------------------------- */
function activeCaption(t) {
  for (const [a, b, txt] of CAPTIONS) if (t >= a && t < b + 0.5) return { a, b, txt, k: window01(t, a, b, 0.35, 0.55) };
  return null;
}
function activeSubtitle(t) {
  for (const s of SUBTITLES) if (t >= s.t0 && t < s.t1) return Object.assign({ k: window01(t, s.t0, s.t1, 0.3, 0.5) }, s);
  return null;
}
function drawCaptions(ctx, w, h, S, barH) {
  const cap = activeCaption(S.t), sub = activeSubtitle(S.t);
  let y = h - barH - 34;
  ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic';

  if (sub && sub.k > 0.01) {
    ctx.save(); ctx.globalAlpha = sub.k;
    const bw = Math.min(w * 0.80, 1080);
    ctx.fillStyle = 'rgba(6,10,16,0.62)'; rr(ctx, w / 2 - bw / 2, y - 84, bw, 78, 6); ctx.fill();
    ctx.strokeStyle = 'rgba(132,204,22,0.42)'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(w / 2 - bw / 2, y - 84); ctx.lineTo(w / 2 - bw / 2, y - 6); ctx.stroke();
    ctx.font = `600 10px ${FONT_MONO}`; ctx.fillStyle = '#84CC16';
    ctx.fillText(sub.who, w / 2, y - 68);
    ctx.font = `500 ${Math.min(21, w * 0.017)}px ${FONT_TAMIL}`; ctx.fillStyle = '#FFFFFF';
    ctx.fillText(sub.ta, w / 2, y - 44);
    ctx.font = `400 ${Math.min(13, w * 0.011)}px ${FONT_COND}`; ctx.fillStyle = 'rgba(226,238,248,0.86)';
    const tr = wrapLines(ctx, sub.tr, bw - 60);
    tr.forEach((ln, i) => ctx.fillText(ln, w / 2, y - 24 + i * 15));
    ctx.restore();
    y -= 96;
  }

  if (cap && cap.k > 0.01) {
    ctx.save(); ctx.globalAlpha = cap.k;
    ctx.font = `400 ${Math.min(19, w * 0.0152)}px ${FONT_COND}`;
    const maxW = Math.min(w * 0.78, 1120);
    const lines = wrapLines(ctx, cap.txt, maxW);
    ctx.shadowColor = 'rgba(0,0,0,0.92)'; ctx.shadowBlur = 12; ctx.shadowOffsetY = 2;
    lines.forEach((ln, i) => {
      const yy = y - (lines.length - 1 - i) * 25;
      ctx.fillStyle = 'rgba(4,8,12,0.52)';
      const tw = ctx.measureText(ln).width;
      rr(ctx, w / 2 - tw / 2 - 12, yy - 16, tw + 24, 24, 4); ctx.fill();
      ctx.fillStyle = '#F4F8FB'; ctx.fillText(ln, w / 2, yy);
    });
    ctx.restore();
  }
  ctx.textAlign = 'left';
}

/* -------------------------------------------------------------------------- */
/*  telemetry panels — content changes with the act                            */
/* -------------------------------------------------------------------------- */
function panelSpecs(S) {
  const t = S.t, out = [];
  const P = (id, title, accent, rowsArr, k) => out.push({ id, title, accent, rows: rowsArr, k });

  P('street', 'CUMTA GRIEVANCE FEED · LIVE', '#EF4444', [
    ['payment deducted', Math.round(S.hud.grievances * 0.41).toLocaleString('en-IN')],
    ['qr scanner expired', Math.round(S.hud.grievances * 0.33).toLocaleString('en-IN')],
    ['network timeout', Math.round(S.hud.grievances * 0.26).toLocaleString('en-IN')],
    ['total filed (90d)', `${S.hud.grievances.toLocaleString('en-IN')}+`],
    ['source', 'CUMTA / MTC PORTAL'],
  ], window01(t, 17.5, 30.0, 1.8, 1.6));

  P('device', 'HANDSET · NOKIA-CLASS FEATURE PHONE', '#84CC16', [
    ['display', 'MONOCHROME GREEN LCD'],
    ['network', '2G GSM · CS VOICE'],
    ['data plan', 'NONE — 0 KB'],
    ['input', 'RUBBER KEYPAD + DTMF'],
    ['mode', S.hud.mode],
  ], window01(t, 25.0, 46.0, 1.6, 1.6) * 0.96);

  P('ingest', 'TELEPHONY INGEST · FASTAPI', '#F59E0B', [
    ['gateway', 'FASTAPI + WEBSOCKET'],
    ['codec', S.hud.pcm],
    ['frame', t > 55 ? `${Math.floor((t * 50) % 1000).toString().padStart(3, '0')} / 20 ms` : '—'],
    ['asr', S.hud.asr],
    ['latency', S.hud.latency ? `${S.hud.latency} ms` : '—'],
    ['dtmf', S.hud.dtmf],
  ], window01(t, 33.0, 122.0, 1.6, 2.0) * (1 - window01(t, 66, 92, 1.5, 1.5) * 0.0));

  P('route', 'ROUTE RESOLVER · GTFS', '#EA580C', [
    ['feed', S.hud.gtfs],
    ['origin', 'SIMATS HIGHWAY'],
    ['dest', 'PORUR ROUNDTANA'],
    ['service', 'MTC 54 / 54E'],
    ['eta', '~35 MIN'],
    ['headway', '8–10 MIN'],
    ['corridor', 'POONAMALLEE HIGH RD · NH 48'],
  ], window01(t, 66.0, 92.0, 1.8, 1.8));

  P('griev', 'GRIEVANCE BRAIN · DETERMINISTIC', '#60A5FA', [
    ['lane 1', 'GTFS SCHEDULED TIMETABLE'],
    ['lane 2', 'GRIEVANCE INGESTION'],
    ['llm in path', 'NONE — RULE + FEED'],
    ['tickets', t > 81 ? `${Math.round(S.ticketFlow * 4)} FILED` : 'QUEUED'],
    ['depot', 'MTC PORUR DEPOT'],
    ['ref', 'GRV-4471 … 4474'],
  ], window01(t, 79.0, 94.0, 1.8, 1.8));

  P('sms', 'OUTBOUND SMS · GSM 7-BIT', '#84CC16', [
    ['payload', 'CUMTA GUIDE'],
    ['characters', S.hud.smsSeg],
    ['encoding', 'GSM 7-BIT DEFAULT'],
    ['segments', '1'],
    ['delivery', 'DLR CONFIRMED'],
    ['cost to user', '₹0 — NO DATA'],
  ], window01(t, 112.0, 126.0, 1.6, 1.6));

  P('net', 'ONE CHENNAI · ONE NETWORK — CUMTA', '#F59E0B', [
    ['mtc bus', 'ROUTE 54 / 54E · LIVE'],
    ['chennai metro', 'GREEN LINE · CORRIDOR 2'],
    ['suburban rail', 'SR · BEACH ↔ TAMBARAM'],
    ['mrts', 'BEACH ↔ VELACHERY'],
    ['authority', 'CUMTA UNIFIED'],
  ], window01(t, 60.0, 138.0, 2.0, 3.0) * 0.9);

  return out.filter(p => p.k > 0.01);
}

function drawPanels(ctx, w, h, S) {
  const specs = panelSpecs(S);
  if (!specs.length) return;
  const PW = Math.min(292, w * 0.235);
  const x = w - PW - 22;
  let y = 78;
  ctx.save();
  for (const p of specs) {
    const rh = p.rows.length * 17 + 40;
    if (y + rh > h - 150) break;
    ctx.globalAlpha = p.k;
    glass(ctx, x, y, PW, rh, 7, p.accent, 1);
    label(ctx, x + 14, y + 22, p.title, { size: 9.5, color: p.accent, alpha: 1, letter: 0.075 });
    rows(ctx, x + 14, y + 42, p.rows, { size: 10.5, gap: 17, w: PW - 28, alpha: 1 });
    y += rh + 10;
  }
  ctx.restore();
}

/* -------------------------------------------------------------------------- */
/*  left rail: shot slate (film-crew style, reinforces "lots of shots")        */
/* -------------------------------------------------------------------------- */
function drawSlate(ctx, w, h, S, barH) {
  const k = S.hudTech;
  if (k < 0.02) return;
  ctx.save(); ctx.globalAlpha = k * 0.9;
  const x = 22, y = h - barH - 96;
  ctx.font = `700 10px ${FONT_MONO}`; ctx.fillStyle = 'rgba(245,158,11,0.85)';
  ctx.fillText(S.shot, x, y);
  ctx.font = `500 10px ${FONT_MONO}`; ctx.fillStyle = 'rgba(190,212,232,0.58)';
  ctx.fillText(S.shotNote || 'CONTINUOUS CRANE · NO CUT', x, y + 15);
  ctx.fillStyle = 'rgba(150,178,204,0.42)';
  ctx.fillText(`${HUD.quality} · ${Math.round(HUD.fps)} FPS · r160 · ORBIT DISABLED`, x, y + 30);
  /* mini lens readout */
  const fov = S.fov ? S.fov.toFixed(1) : '—';
  ctx.fillStyle = 'rgba(150,178,204,0.42)';
  ctx.fillText(`LENS ${fov}° · ${S.camY ? S.camY.toFixed(1) : '0.0'} m AGL`, x, y + 45);
  ctx.restore();
}

/* -------------------------------------------------------------------------- */
/*  impact telemetry (Act 5)                                                   */
/* -------------------------------------------------------------------------- */
function drawImpact(ctx, w, h, S) {
  const k = S.hudTele;
  if (k < 0.02) return;
  ctx.save(); ctx.globalAlpha = k;
  const bw = Math.min(900, w * 0.66), bh = 168;
  const x = (w - bw) / 2, y = h * 0.20;
  glass(ctx, x, y, bw, bh, 10, '#F59E0B', 1);
  label(ctx, x + 24, y + 30, 'CUMTA IMPACT TELEMETRY · 90-DAY ROLLING', { size: 11, color: '#F59E0B', letter: 0.09 });

  const cols = [
    { v: S.hud.calls.toLocaleString('en-IN'), u: '', l: 'TOTAL INBOUND CALLS', s: 'TAMIL · TANGlish · MADRAS BASHAI' },
    { v: `${Math.round(S.hud.tanglish)}%`, u: '', l: 'DIALECT ADAPTATION', s: `${Math.round(S.hud.madras)}% MADRAS BASHAI · ${Math.round(S.hud.formal)}% FORMAL TAMIL` },
    { v: `${S.hud.sms}%`, u: '', l: 'SMS DELIVERY', s: 'DELIVERED · GSM 7-BIT · 1 SEGMENT' },
  ];
  const cw = (bw - 48) / 3;
  cols.forEach((c, i) => {
    const cx = x + 24 + i * cw;
    ctx.textBaseline = 'alphabetic';
    ctx.font = `800 ${Math.min(46, cw * 0.24)}px ${FONT_COND}`;
    ctx.fillStyle = '#FFFFFF'; ctx.fillText(c.v, cx, y + 92);
    ctx.font = `700 10px ${FONT_MONO}`; ctx.fillStyle = '#F59E0B';
    ctx.fillText(c.l, cx, y + 114);
    ctx.font = `500 9.5px ${FONT_MONO}`; ctx.fillStyle = 'rgba(200,220,238,0.62)';
    const ln = wrapLines(ctx, c.s, cw - 20);
    ln.forEach((l, j) => ctx.fillText(l, cx, y + 130 + j * 13));
    if (i) { ctx.strokeStyle = 'rgba(160,190,215,0.14)'; ctx.beginPath(); ctx.moveTo(cx - 12, y + 46); ctx.lineTo(cx - 12, y + bh - 24); ctx.stroke(); }
  });
  ctx.restore();
}

/* -------------------------------------------------------------------------- */
/*  final title card                                                           */
/* -------------------------------------------------------------------------- */
function drawTitleCard(ctx, w, h, S) {
  const k = S.titleCard;
  if (k < 0.01) return;
  ctx.save();
  /* warm wash */
  ctx.globalAlpha = k * 0.55;
  const g = ctx.createLinearGradient(0, h * 0.25, 0, h * 0.85);
  g.addColorStop(0, 'rgba(10,14,22,0.0)');
  g.addColorStop(0.5, 'rgba(8,12,20,0.62)');
  g.addColorStop(1, 'rgba(6,10,16,0.86)');
  ctx.fillStyle = g; ctx.fillRect(0, h * 0.25, w, h * 0.6);

  ctx.globalAlpha = k;
  ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic';
  const cy = h * 0.50;
  ctx.font = `700 12px ${FONT_MONO}`; ctx.fillStyle = '#F59E0B';
  ctx.fillText('C H E N N A I   M O B I L I T Y   A I', w / 2, cy - 46);
  ctx.font = `800 ${Math.min(74, w * 0.055)}px ${FONT_COND}`;
  ctx.fillStyle = '#FFFFFF';
  ctx.shadowColor = 'rgba(245,158,11,0.35)'; ctx.shadowBlur = 34;
  ctx.fillText('EVERY COMMUTER. EVERY BUS. ANY PHONE.', w / 2, cy + 6);
  ctx.shadowBlur = 0;
  ctx.font = `500 ${Math.min(20, w * 0.016)}px ${FONT_TAMIL}`;
  ctx.fillStyle = 'rgba(232,242,250,0.9)';
  ctx.fillText('ஒவ்வொரு பயணியும். ஒவ்வொரு பேருந்தும். எந்த ஃபோனிலும்.', w / 2, cy + 44);
  const rw = Math.min(420, w * 0.34) * (0.5 + 0.5 * k);
  ctx.strokeStyle = 'rgba(245,158,11,0.5)'; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(w / 2 - rw, cy + 66); ctx.lineTo(w / 2 + rw, cy + 66); ctx.stroke();
  ctx.font = `600 11px ${FONT_MONO}`; ctx.fillStyle = 'rgba(206,224,240,0.72)';
  ctx.fillText('UNIFIED UNDER CUMTA · MTC BUS · CHENNAI METRO · SOUTHERN RAILWAY SUBURBAN · MRTS', w / 2, cy + 88);
  ctx.fillText('8 kHz TELEPHONY → GTFS ROUTING → DTMF CONFIRMATION → 148-CHARACTER SMS', w / 2, cy + 106);
  ctx.restore(); ctx.textAlign = 'left';
}

/* -------------------------------------------------------------------------- */
/*  lens + film treatment                                                      */
/* -------------------------------------------------------------------------- */
let _grainPattern = null;
let _vigCache = null;
function drawLens(ctx, w, h, S, t) {
  const barH = Math.round(h * 0.5 * (1 - 0.39) * S.letterbox);   // 2.39:1 target
  /* letterbox bars */
  if (barH > 0.5) {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, w, barH);
    ctx.fillRect(0, h - barH, w, barH);
  }
  /* vignette -- constant for a given canvas size, so rebuild only on resize */
  if (!_vigCache || _vigCache.w !== w || _vigCache.h !== h) {
    const vg = ctx.createRadialGradient(w / 2, h * 0.5, Math.min(w, h) * 0.24, w / 2, h * 0.5, Math.max(w, h) * 0.74);
    vg.addColorStop(0, 'rgba(0,0,0,0)');
    vg.addColorStop(0.62, 'rgba(2,4,8,0.22)');
    vg.addColorStop(1, 'rgba(1,2,5,0.72)');
    _vigCache = { w: w, h: h, g: vg };
  }
  ctx.fillStyle = _vigCache.g; ctx.fillRect(0, 0, w, h);

  /* rain beading on the lens, only when the camera is low and wet */
  const bead = clamp01(S.rain) * S.closeToGround;
  if (bead > 0.02) {
    ctx.save(); ctx.globalCompositeOperation = 'lighter';
    for (let i = 0; i < 34; i++) {
      const bx = hash2(i, 3) * w, by = hash2(i, 9) * h;
      const br = 2 + hash2(i, 17) * 9;
      const sl = (Math.sin(t * (0.25 + hash2(i, 5) * 0.4) + i) * 0.5 + 0.5);
      const rg = ctx.createRadialGradient(bx, by, 0, bx, by, br);
      rg.addColorStop(0, `rgba(255,214,150,${0.10 * bead * sl})`);
      rg.addColorStop(0.6, `rgba(190,210,235,${0.045 * bead})`);
      rg.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = rg; ctx.beginPath(); ctx.arc(bx, by, br, 0, TAU); ctx.fill();
    }
    ctx.restore();
  }

  /* anamorphic streak on the brightest practicals */
  const streak = clamp01(S.lampDim || 1) * (1 - S.night * 0.25);
  if (streak > 0.05) {
    ctx.save(); ctx.globalCompositeOperation = 'lighter';
    const sg = ctx.createLinearGradient(0, h * 0.46, w, h * 0.46);
    sg.addColorStop(0, 'rgba(245,158,11,0)');
    sg.addColorStop(0.5, `rgba(245,158,11,${0.030 * streak})`);
    sg.addColorStop(1, 'rgba(245,158,11,0)');
    ctx.fillStyle = sg; ctx.fillRect(0, h * 0.40, w, h * 0.13);
    ctx.restore();
  }

  /* film grain */
  if (!_grainPattern) {
    const gc = document.createElement('canvas'); gc.width = gc.height = 128;
    const gx = gc.getContext('2d');
    const id = gx.createImageData(128, 128);
    for (let i = 0; i < id.data.length; i += 4) {
      const v = 110 + Math.random() * 90;
      id.data[i] = id.data[i + 1] = id.data[i + 2] = v; id.data[i + 3] = 26;
    }
    gx.putImageData(id, 0, 0);
    _grainPattern = ctx.createPattern(gc, 'repeat');
  }
  /* Film grain. A full-screen 'overlay' composite is one of the most expensive
     things a 2D canvas can do and covers millions of pixels every frame.
     source-over with a low-alpha speck tile reads almost identically. */
  ctx.save();
  ctx.globalAlpha = 0.5;
  ctx.translate((hash1(Math.floor(t * 24)) * 128) | 0, (hash1(Math.floor(t * 24) + 7) * 128) | 0);
  ctx.fillStyle = _grainPattern; ctx.fillRect(-128, -128, w + 256, h + 256);
  ctx.restore();

  /* scanline breath on the LCD-heavy acts */
  const scan = Math.max(window01(t, 108, 124, 1.5, 1.5), window01(t, 33, 47, 1.5, 1.5)) * 0.5;
  if (scan > 0.01) {
    ctx.save(); ctx.globalAlpha = scan * 0.30; ctx.globalCompositeOperation = 'overlay';
    ctx.fillStyle = '#84CC16';
    for (let y = 0; y < h; y += 3) ctx.fillRect(0, y, w, 1);
    ctx.restore();
  }
  return barH;
}

/* -------------------------------------------------------------------------- */
/*  audio hint (non-blocking — the timeline never waits for it)                */
/* -------------------------------------------------------------------------- */
function drawHint(ctx, w, h, S) {
  if (HUD.audioReady) return;
  const k = window01(S.t, 0.8, 148, 1.0, 2.0) * (0.62 + 0.38 * Math.sin(S.t * 2.2));
  if (k < 0.02) return;
  ctx.save(); ctx.globalAlpha = k;
  ctx.textAlign = 'center';
  const bw = 330, bh = 42, x = (w - bw) / 2, y = h - 96;
  ctx.fillStyle = 'rgba(8,12,18,0.6)'; rr(ctx, x, y, bw, bh, 21); ctx.fill();
  ctx.strokeStyle = 'rgba(245,158,11,0.5)'; ctx.lineWidth = 1; rr(ctx, x + 0.5, y + 0.5, bw - 1, bh - 1, 21); ctx.stroke();
  ctx.font = `700 11px ${FONT_MONO}`; ctx.fillStyle = '#F59E0B';
  ctx.fillText('TAP ANYWHERE FOR AUDIO · THE FILM PLAYS ON', w / 2, y + 26);
  ctx.restore(); ctx.textAlign = 'left';
}

/* -------------------------------------------------------------------------- */
/*  master overlay draw                                                        */
/* -------------------------------------------------------------------------- */
function drawHUD(ctx, w, h, S) {
  ctx.clearRect(0, 0, w, h);
  const barH = drawLens(ctx, w, h, S, S.t);
  drawPanels(ctx, w, h, S);
  drawImpact(ctx, w, h, S);
  drawSlate(ctx, w, h, S, barH);
  drawCaptions(ctx, w, h, S, barH);
  drawActTitle(ctx, w, h, S);
  drawTitleCard(ctx, w, h, S);
  drawHint(ctx, w, h, S);
  drawProgress(ctx, w, h, S);       // always last: the very top of the viewport
}
