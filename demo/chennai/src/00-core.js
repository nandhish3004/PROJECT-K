/* ============================================================================
   CHENNAI MOBILITY AI — 150-second autonomous cinematic 3D demo film
   00-core.js  ·  math, easings, deterministic tween/timeline engine, canvas
   ---------------------------------------------------------------------------
   Everything in this film is a PURE FUNCTION of the master clock `t` (seconds,
   0 → 150). Nothing is event driven, nothing waits for a click, and no control
   is required from the viewer: the scene progression, the camera glide, the
   narrative acts and every piece of UI telemetry are driven by one clock.
   The tween engine below is a GSAP-style API (tl.to / tl.fromTo / tl.call with
   power2.inOut-style eases) but implemented deterministically so that the film
   is frame-exact, scrub-safe and syncs perfectly with the pre-scheduled audio.
   ========================================================================== */

const THREE = window.THREE;

/* --------------------------------- palette -------------------------------- */
/* Authentic Chennai night palette — coastal indigo, sodium vapour, MTC red. */
const C = {
  asphalt:      0x12161A,   // rain-slicked wet asphalt
  puddle:       0x1E232A,   // puddle water, sodium reflections in it
  mtcRed:       0xB91C1C,   // MTC bus chrome-oxide red
  mtcCream:     0xE8DCC4,   // MTC bus cream skirt / band
  routeAmber:   0xEA580C,   // amber route panels
  sodium:       0xF59E0B,   // sodium-vapor lamp
  sodiumHot:    0xFFC24A,   // lamp core
  indigo:       0x0B132B,   // Coromandel coastal night indigo
  lcdGreen:     0x84CC16,   // monochrome feature-phone LCD backlight
  handset:      0x141517,   // matte black rubberised body
  cyan:         0x38BDF8,   // data / telemetry accent
  grievance:    0xEF4444,   // grievance lane
  sunset:       0xFF7A18,
  sunsetDeep:   0x2A0F3C,
};
const css = (hex) => '#' + hex.toString(16).padStart(6, '0');

/* ---------------------------------- math ---------------------------------- */
const PI = Math.PI, TAU = PI * 2;
const clamp = (v, a = 0, b = 1) => (v < a ? a : v > b ? b : v);
const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);
const lerp = (a, b, u) => a + (b - a) * u;
const inv = (a, b, v) => (b === a ? 0 : (v - a) / (b - a));
const mix = lerp;
/** Normalised progress of t across [a,b], clamped. */
const seg = (t, a, b) => clamp01((t - a) / (b - a || 1e-6));
/** Progress of t across [a,b] then eased. */
const segE = (t, a, b, e = EASE.linear) => e(seg(t, a, b));
/**
 * 0 outside [a,b], 1 inside, with an eased fade-in over `fi` seconds and an
 * eased fade-out over `fo` seconds. Used for every narrative layer that has to
 * appear and then genuinely disappear (banners, ripples, lanes, badges).
 */
const window01 = (t, a, b, fi = 0.4, fo = 0.4) =>
  Math.min(segE(t, a, a + fi, EASE.outCubic), 1 - segE(t, b - fo, b, EASE.inCubic));
const smoothstep = (e0, e1, x) => { const u = clamp01((x - e0) / (e1 - e0 || 1e-6)); return u * u * (3 - 2 * u); };
const smootherstep = (e0, e1, x) => { const u = clamp01((x - e0) / (e1 - e0 || 1e-6)); return u * u * u * (u * (u * 6 - 15) + 10); };
const approach = (a, b, l) => a + (b - a) * (1 - Math.exp(-l));
const deg = (d) => (d * PI) / 180;

const v3 = (x = 0, y = 0, z = 0) => new THREE.Vector3(x, y, z);
const col = (c) => new THREE.Color(c);

/* Deterministic hash / value noise — same values every run, every machine. */
function hash1(n) { const s = Math.sin(n * 127.1) * 43758.5453123; return s - Math.floor(s); }
function hash2(x, y) { const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453123; return s - Math.floor(s); }
function noise1(x) { const i = Math.floor(x), f = x - i, u = f * f * (3 - 2 * f); return lerp(hash1(i), hash1(i + 1), u) * 2 - 1; }
function fbm1(x, oct = 4) { let a = 0, amp = 0.5, fr = 1; for (let i = 0; i < oct; i++) { a += noise1(x * fr) * amp; amp *= 0.5; fr *= 2; } return a; }
function noise2(x, y) {
  const ix = Math.floor(x), iy = Math.floor(y), fx = x - ix, fy = y - iy;
  const ux = fx * fx * (3 - 2 * fx), uy = fy * fy * (3 - 2 * fy);
  const a = hash2(ix, iy), b = hash2(ix + 1, iy), c = hash2(ix, iy + 1), d = hash2(ix + 1, iy + 1);
  return lerp(lerp(a, b, ux), lerp(c, d, ux), uy) * 2 - 1;
}
function fbm2(x, y, oct = 4) { let a = 0, amp = 0.5, fx = 1, fy = 1; for (let i = 0; i < oct; i++) { a += noise2(x * fx, y * fy) * amp; amp *= 0.5; fx *= 2; fy *= 2; } return a; }

/** Seeded PRNG (mulberry32) so the city is identical on every run. */
function rng(seed) { let a = seed >>> 0; return () => { a |= 0; a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }

/* ---------------------------------- easing -------------------------------- */
const EASE = {
  linear: (u) => u,
  inQuad: (u) => u * u,
  outQuad: (u) => 1 - (1 - u) * (1 - u),
  inOutQuad: (u) => (u < 0.5 ? 2 * u * u : 1 - Math.pow(-2 * u + 2, 2) / 2),
  inCubic: (u) => u * u * u,
  outCubic: (u) => 1 - Math.pow(1 - u, 3),
  inOutCubic: (u) => (u < 0.5 ? 4 * u * u * u : 1 - Math.pow(-2 * u + 2, 3) / 2),
  inQuart: (u) => u * u * u * u,
  outQuart: (u) => 1 - Math.pow(1 - u, 4),
  inOutQuart: (u) => (u < 0.5 ? 8 * u * u * u * u : 1 - Math.pow(-2 * u + 2, 4) / 2),
  inQuint: (u) => u ** 5,
  outQuint: (u) => 1 - (1 - u) ** 5,
  inOutQuint: (u) => (u < 0.5 ? 16 * u ** 5 : 1 - Math.pow(-2 * u + 2, 5) / 2),
  inSine: (u) => 1 - Math.cos((u * PI) / 2),
  outSine: (u) => Math.sin((u * PI) / 2),
  inOutSine: (u) => -(Math.cos(PI * u) - 1) / 2,
  inExpo: (u) => (u === 0 ? 0 : Math.pow(2, 10 * u - 10)),
  outExpo: (u) => (u === 1 ? 1 : 1 - Math.pow(2, -10 * u)),
  inOutExpo: (u) => (u === 0 ? 0 : u === 1 ? 1 : u < 0.5 ? Math.pow(2, 20 * u - 10) / 2 : (2 - Math.pow(2, -20 * u + 10)) / 2),
  inCirc: (u) => 1 - Math.sqrt(1 - u * u),
  outCirc: (u) => Math.sqrt(1 - (u - 1) * (u - 1)),
  inOutCirc: (u) => (u < 0.5 ? (1 - Math.sqrt(1 - 4 * u * u)) / 2 : (Math.sqrt(1 - Math.pow(-2 * u + 2, 2)) + 1) / 2),
  outBack: (u) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(u - 1, 3) + c1 * Math.pow(u - 1, 2); },
  inOutBack: (u) => { const c2 = 1.70158 * 1.525; return u < 0.5 ? (Math.pow(2 * u, 2) * ((c2 + 1) * 2 * u - c2)) / 2 : (Math.pow(2 * u - 2, 2) * ((c2 + 1) * (u * 2 - 2) + c2) + 2) / 2; },
  outElastic: (u) => { const c4 = (2 * PI) / 3; return u === 0 ? 0 : u === 1 ? 1 : Math.pow(2, -10 * u) * Math.sin((u * 10 - 0.75) * c4) + 1; },
  /* "cinematic" — long slow settle, used for most camera moves */
  cine: (u) => u < 0.5 ? 4 * u * u * u : 1 - Math.pow(-2 * u + 2, 3) / 2,
  glide: (u) => u * u * (3 - 2 * u),
};
/* GSAP-style name lookup so the cue sheet reads like a tween timeline. */
const easeByName = (n) => {
  if (typeof n === 'function') return n;
  const map = { none: 'linear', linear: 'linear', 'power1.in': 'inQuad', 'power1.out': 'outQuad', 'power1.inOut': 'inOutQuad', 'power2.in': 'inCubic', 'power2.out': 'outCubic', 'power2.inOut': 'inOutCubic', 'power3.in': 'inQuart', 'power3.out': 'outQuart', 'power3.inOut': 'inOutQuart', 'power4.in': 'inQuint', 'power4.out': 'outQuint', 'power4.inOut': 'inOutQuint', 'sine.in': 'inSine', 'sine.out': 'outSine', 'sine.inOut': 'inOutSine', 'expo.in': 'inExpo', 'expo.out': 'outExpo', 'expo.inOut': 'inOutExpo', 'circ.in': 'inCirc', 'circ.out': 'outCirc', 'circ.inOut': 'inOutCirc', 'back.out': 'outBack', 'back.inOut': 'inOutBack', 'elastic.out': 'outElastic', cine: 'cine', glide: 'glide' };
  return EASE[map[n] || n] || EASE.linear;
};

/* --------------------------- deterministic tweens ------------------------- */
/**
 * A tween is {obj, key, from, to, t0, t1, ease, onUpdate}. Evaluating it is a
 * pure function of t, so pausing / replaying / recording never desyncs anything.
 */
class Tween {
  constructor(o) { Object.assign(this, o); this.ease = easeByName(o.ease || 'linear'); }
  value(t) {
    const u = this.ease(seg(t, this.t0, this.t1));
    return typeof this.from === 'number' ? lerp(this.from, this.to, u) : u;
  }
  apply(t) {
    const u = this.ease(seg(t, this.t0, this.t1));
    const tgt = this.obj;
    if (this.keys) { for (const k of this.keys) tgt[k] = lerp(this.fromV[k], this.toV[k], u); }
    else if (typeof this.from === 'number') tgt[this.key] = lerp(this.from, this.to, u);
    if (this.onUpdate) this.onUpdate(u, tgt);
  }
}

/**
 * Timeline — a flat, seekable list of tweens + one-shot calls. `evaluate(t)`
 * applies every tween (pure) and fires calls whose threshold was crossed while
 * playing forward, which is the only direction this film ever travels.
 */
class Timeline {
  constructor() { this.tweens = []; this.calls = []; this.last = 0; }
  to(obj, vars, at) {
    const t0 = typeof at === 'number' ? at : this.cursor || 0;
    const dur = vars.duration != null ? vars.duration : 1;
    const tw = new Tween({ obj, t0, t1: t0 + dur, ease: vars.ease, onUpdate: vars.onUpdate });
    if (vars.vec3) {
      tw.keys = ['x', 'y', 'z']; tw.fromV = { x: vars.from.x, y: vars.from.y, z: vars.from.z }; tw.toV = vars.to;
    } else {
      tw.key = vars.key; tw.from = vars.from; tw.to = vars.to;
    }
    this.tweens.push(tw); this.cursor = tw.t1; return this;
  }
  call(fn, at) { this.calls.push({ at, fn, fired: false }); this.calls.sort((a, b) => a.at - b.at); return this; }
  evaluate(t) {
    const forward = t >= this.last;
    for (const tw of this.tweens) if (t >= tw.t0 - 1e-9 || t <= tw.t1) tw.apply(t);
    if (forward) { for (const c of this.calls) { if (!c.fired && t >= c.at) { c.fired = true; c.fn(t); } } }
    else { for (const c of this.calls) if (c.fired && t < c.at) c.fired = false; }
    this.last = t;
  }
  reset() { for (const c of this.calls) c.fired = false; this.last = 0; }
}

/* --------------------------- keyframed value track ------------------------ */
/**
 * Keyframe track: `kt.add(t, value, easeName)`. Evaluation uses monotone cubic
 * interpolation between keys for buttery 60 fps camera + light moves with no
 * overshoot. Values may be numbers or THREE.Vector3 / THREE.Color.
 */
class Track {
  constructor() { this.keys = []; }
  add(t, value, ease = 'linear') { this.keys.push({ t, value, ease: easeByName(ease) }); this.keys.sort((a, b) => a.t - b.t); return this; }
  get length() { return this.keys.length; }
  at(t) {
    const K = this.keys;
    if (!K.length) return 0;
    if (t <= K[0].t) return K[0].value;
    if (t >= K[K.length - 1].t) return K[K.length - 1].value;
    let i = 0; while (i < K.length - 2 && t >= K[i + 1].t) i++;
    const a = K[i], b = K[i + 1];
    const u = b.ease(seg(t, a.t, b.t));
    if (typeof a.value === 'number') return lerp(a.value, b.value, u);
    if (a.value.isVector3) return v3().lerpVectors(a.value, b.value, u);
    if (a.value.isColor) return col(0).copy(a.value).lerp(b.value, u);
    return u < 0.5 ? a.value : b.value;
  }
}

/* ------------------------- Catmull-Rom through keys ----------------------- */
/**
 * CameraTrack: time-parameterised centripetal Catmull-Rom across shot keys, so
 * the whole 150 s glide is one continuous C1 curve — no cuts, no OrbitControls.
 */
/* Reused by CameraTrack._cr so a 9,000-frame path allocates nothing. */
/* C1-smooth tangent magnitude limiter: identity below `lim`, then asymptotically
   approaches it. (l/lim)/(1 + (l/lim)^p)^(1/p) with p=4 keeps curve shape close to
   the hard-limited version while removing the discontinuity that caused judder. */
function _softScale(l, lim) {
  if (!(l > 0) || !(lim > 0)) return 1;
  const r = l / lim;
  if (r <= 1) return 1;
  return Math.pow(1 + Math.pow(r, 4), -0.25);
}
const _crM1 = new THREE.Vector3(), _crM2 = new THREE.Vector3();
const _crT1 = new THREE.Vector3(), _crT2 = new THREE.Vector3();

class CameraTrack {
  constructor() { this.keys = []; }
  add(o) { this.keys.push(Object.assign({ ease: easeByName('cine'), fov: 42, roll: 0 }, o)); this.keys.sort((a, b) => a.t - b.t); this._ph = null; this._tm = null; this._kp = null; return this; }
  /** Local index + eased parameter for time t. */
  /* ------------------------------------------------------------------------
     Time map.

     The obvious implementation is  u = b.ease(seg(t, a.t, b.t))  -- every key
     applies its OWN ease to its segment. That is C0 but not C1: at each key
     boundary the ease function and u both change instantaneously, so the
     parametric speed jumps. Catmull-Rom then multiplies that jump by the segment
     chord, which on the Act 3/4 aerial keys (hundreds of metres apart) produced
     single-frame speed steps of 50-265 m/s. Rendered at 60 fps that is judder,
     and because it is baked into the timeline it survives into the exported
     video -- which is exactly the symptom: the downloaded file jitters too.

     The fix is a proper time map. Each key stores the average velocity its own
     easing would produce over its segment. The parametric rate at time t is a
     smoothstep-weighted blend of the segment either side of the key, so the rate
     is continuous across the boundary and so is its derivative. Integrating that
     rate over the timeline gives a monotone lookup, which is then normalised back
     to the configured key times: the camera still arrives at each key on exactly
     the authored second, so every shot and cue stays locked, but it no longer
     changes speed abruptly when it gets there.
     ------------------------------------------------------------------------ */
  _compileTimeMap() {
    const K = this.keys;
    if (this._tm && this._tm.n === K.length) return this._tm;
    const N = Math.max(64, K.length * 48);
    const t0 = K[0].t, t1 = K[K.length - 1].t;
    if (!(t1 > t0)) return null;

    /* average parametric rate each segment's own easing implies, measured from
       the easing itself (midpoint rule over 64 samples) */
    const rate = new Array(K.length - 1);
    for (let i = 0; i < K.length - 1; i++) {
      const e = K[i + 1].ease;
      const h = 1e-4;
      let acc = 0;
      for (let s2 = 0; s2 < 64; s2++) acc += e((s2 + 0.5) / 64);
      rate[i] = acc / 64;
    }

    const rateAt = (t) => {
      let i = 0;
      while (i < K.length - 2 && t >= K[i + 1].t) i++;
      const a = K[i], b = K[i + 1];
      const localR = rate[i];
      const prevR = i > 0 ? rate[i - 1] : rate[i];
      const nextR = i < K.length - 2 ? rate[i + 1] : rate[i];
      const h = smoothstep(0, 1, (t - a.t) / Math.max(1e-6, b.t - a.t));
      const left = lerp(prevR, localR, h);
      const right = lerp(localR, nextR, h);
      return Math.max(1e-4, lerp(left, right, h));
    };

    /* integrate */
    const xs = new Float64Array(N + 1), ys = new Float64Array(N + 1);
    let acc = 0;
    xs[0] = t0; ys[0] = 0;
    for (let k = 1; k <= N; k++) {
      const ta = t0 + (t1 - t0) * ((k - 1) / N);
      const tb = t0 + (t1 - t0) * (k / N);
      const tm2 = 0.5 * (ta + tb);
      acc += (tb - ta) * rateAt(tm2);
      xs[k] = tb; ys[k] = acc;
    }
    const total = acc;
    if (!(total > 0)) return null;
    const span = t1 - t0;
    this._tm = { n: K.length, xs: xs, ys: ys, total: total, t0: t0, t1: t1, span: span };
    return this._tm;
  }

  /** Invert the integrated rate: authored clock time -> normalised track progress 0..1. */
  _progress(t) {
    const tm = this._compileTimeMap();
    if (!tm) return 0;
    if (t <= tm.t0) return 0;
    if (t >= tm.t1) return 1;
    const xs = tm.xs, ys = tm.ys;
    let lo = 0, hi = xs.length - 1;
    while (hi - lo > 1) {
      const mid = (lo + hi) >> 1;
      if (xs[mid] <= t) lo = mid; else hi = mid;
    }
    const x0 = xs[lo], x1 = xs[hi], y0 = ys[lo], y1 = ys[hi];
    const w = x1 > x0 ? (t - x0) / (x1 - x0) : 0;
    return (y0 + (y1 - y0) * w) / tm.total;
  }

  _span(t) {
    const K = this.keys;
    if (t <= K[0].t) return { i: 0, u: 0 };
    if (t >= K[K.length - 1].t) return { i: K.length - 2, u: 1 };
    /* map clock time to track progress, then place progress on the authored key
       spans by their actual length so each key is still hit exactly on time */
    const prog = this._progress(t);
    const t0 = K[0].t, t1 = K[K.length - 1].t;
    let i = 0;
    while (i < K.length - 2 && t >= K[i + 1].t) i++;
    const a = K[i], b = K[i + 1];
    /* progress of each key boundary, using the same integrated map */
    if (!this._kp || this._kp.n !== K.length) {
      const kp = new Float64Array(K.length);
      for (let q = 0; q < K.length; q++) kp[q] = this._progress(K[q].t);
      this._kp = { n: K.length, kp: kp };
    }
    const kp = this._kp.kp;
    const p0 = kp[i], p1 = kp[i + 1];
    const u = p1 > p0 ? clamp01((prog - p0) / (p1 - p0)) : (t >= b.t ? 1 : 0);
    return { i, u: u };
  }
  /**
   * Non-uniform Catmull-Rom as a cubic Hermite, with tangents weighted by the
   * harmonic mean of the neighbouring chord lengths and then hard-limited.
   *
   * Why not the textbook forms. This shot list mixes a 630 m aerial sweep with
   * a 5 mm push toward one keypad digit, so consecutive chords differ by up to
   * 100,000x. Uniform Catmull-Rom takes the tangent at a key as (P2 - P0) / 2
   * with no regard for spacing, so a 5 mm segment inherits a tangent from its
   * 600 m neighbour and the camera swings 20 cm off path -- 40x the move it was
   * asked to make. Centripetal (Barry-Goldman) fixes spacing but not this: its
   * knot intervals make the outer control points extrapolate far past [0,1],
   * which reproduces the same 1 m overshoot on a 0.25 m chord.
   *
   * Weighting each side by the *other* side's relative length makes the tangent
   * collapse onto the short segment whenever the two differ, and degrades
   * exactly to 0.5 * (P2 - P0) when they are equal. The 3*chord limit is the
   * Fritsch-Carlson condition, which guarantees the cubic cannot leave the
   * endpoint box by more than a bounded amount. Cinematically the result is
   * what a real operator does: a fast move arrives and settles gently into the
   * macro, instead of the lens lurching past its mark.
   */
  _cr(p0, p1, p2, p3, u, out) {
    const d01 = Math.sqrt(Math.max(1e-12, p0.distanceToSquared(p1)));
    const d12 = Math.sqrt(Math.max(1e-12, p1.distanceToSquared(p2)));
    const d23 = Math.sqrt(Math.max(1e-12, p2.distanceToSquared(p3)));

    /* tangent at p1, for the segment p1 -> p2 */
    _crM1.copy(_crT1.copy(p1).sub(p0)).multiplyScalar(d12 / (d01 + d12));
    _crM1.addScaledVector(_crT2.copy(p2).sub(p1), d01 / (d01 + d12));
    /* tangent at p2, for the same segment */
    _crM2.copy(_crT1.copy(p2).sub(p1)).multiplyScalar(d23 / (d12 + d23));
    _crM2.addScaledVector(_crT2.copy(p3).sub(p2), d12 / (d12 + d23));

    /* Smooth magnitude limit. The previous form was a hard clamp
       (if (l > lim) l = lim), which switches on abruptly on one segment and off
       on the next. Because the endpoint tangents are shared between adjacent
       segments, that switch made the tangent itself jump at key boundaries --
       a second, independent source of the judder. This limiter is C1 everywhere:
       it is the identity below lim and eases asymptotically toward lim above it,
       so tangent magnitude changes continuously as the camera leaves a key. */
    const lim = 3 * d12;
    _crM1.multiplyScalar(_softScale(_crM1.length(), lim));
    _crM2.multiplyScalar(_softScale(_crM2.length(), lim));

    const u2 = u * u, u3 = u2 * u;
    const h00 = 2 * u3 - 3 * u2 + 1, h10 = u3 - 2 * u2 + u;
    const h01 = -2 * u3 + 3 * u2, h11 = u3 - u2;
    return out.copy(p1).multiplyScalar(h00)
      .addScaledVector(_crM1, h10)
      .addScaledVector(p2, h01)
      .addScaledVector(_crM2, h11);
  }

  /**
   * Phantom keys beyond the first and last. Clamping the index instead (the
   * obvious shortcut) repeats the end control point, which collapses a knot
   * interval to zero and makes the very first and very last frames of the film
   * divide by near-nothing. Reflecting through the end key keeps the knot
   * spacing equal to the first real segment and makes the tangent there equal
   * the chord -- i.e. the camera leaves key 0 heading exactly at key 1.
   */
  _buildPhantoms() {
    const K = this.keys, n = K.length;
    if (n < 2) { const only = K[0] || { pos: v3(), target: v3() }; this._ph = { pre: only, post: only }; return; }
    const refl = (a, b) => ({
      pos: v3().copy(a.pos).multiplyScalar(2).sub(b.pos),
      target: v3().copy(a.target).multiplyScalar(2).sub(b.target),
    });
    this._ph = { pre: refl(K[0], K[1]), post: refl(K[n - 1], K[n - 2]) };
  }
  sample(t, outPos, outTarget) {
    const K = this.keys;
    if (!this._ph) this._buildPhantoms();
    const { i, u } = this._span(t);
    const g = (k) => (k < 0 ? this._ph.pre : (k >= K.length ? this._ph.post : K[k]));
    this._cr(g(i - 1).pos, g(i).pos, g(i + 1).pos, g(i + 2).pos, u, outPos);
    this._cr(g(i - 1).target, g(i).target, g(i + 1).target, g(i + 2).target, u, outTarget);
    const a = g(i), b = g(i + 1);
    this.fov = lerp(a.fov, b.fov, u);
    this.roll = lerp(a.roll || 0, b.roll || 0, u);
    this.segIndex = i;
    return outPos;
  }
}

/* ------------------------------- time format ------------------------------ */
const timecode = (s) => {
  const m = Math.floor(Math.max(0, s) / 60), r = Math.floor(Math.max(0, s) % 60);
  return m + ':' + String(r).padStart(2, '0');
};
const timecodeF = (s) => {
  const m = Math.floor(Math.max(0, s) / 60), r = Math.max(0, s) % 60;
  return m + ':' + (r < 10 ? '0' : '') + r.toFixed(1);
};

/* ------------------------------ canvas / text ----------------------------- */
let _fontReady = false;
const FONT_LATIN = "'Segoe UI','Helvetica Neue',Helvetica,Arial,sans-serif";
const FONT_MONO = "'SFMono-Regular',Consolas,'Roboto Mono','DejaVu Sans Mono',monospace";
const FONT_TAMIL = "'Noto Sans Tamil','Nirmala UI','Tamil Sangam MN','Latha','Noto Sans',sans-serif";
const FONT_COND = "'Oswald','Arial Narrow','Segoe UI',Helvetica,sans-serif";

function makeCanvas(w, h) {
  const c = document.createElement('canvas'); c.width = w; c.height = h;
  const x = c.getContext('2d'); x.textBaseline = 'alphabetic';
  return { c, x };
}
function canvasTexture(c, { srgb = true, aniso = 4, wrap = null } = {}) {
  const t = new THREE.CanvasTexture(c);
  if (srgb) t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = aniso;
  t.minFilter = THREE.LinearMipmapLinearFilter; t.magFilter = THREE.LinearFilter;
  t.generateMipmaps = true;
  if (wrap) { t.wrapS = t.wrapT = wrap; }
  t.needsUpdate = true;
  return t;
}
/** Word-wrap helper that measures properly for the canvas 2D context. */
function wrapText(x, text, maxW) {
  const words = String(text).split(/\s+/); const lines = []; let line = '';
  for (const w of words) {
    const test = line ? line + ' ' + w : w;
    if (x.measureText(test).width > maxW && line) { lines.push(line); line = w; }
    else line = test;
  }
  if (line) lines.push(line);
  return lines;
}
/** Round-rect path (works on browsers without ctx.roundRect). */
function rr(x, X, Y, W, H, r) {
  r = Math.min(r, W / 2, H / 2);
  x.beginPath();
  x.moveTo(X + r, Y); x.lineTo(X + W - r, Y); x.quadraticCurveTo(X + W, Y, X + W, Y + r);
  x.lineTo(X + W, Y + H - r); x.quadraticCurveTo(X + W, Y + H, X + W - r, Y + H);
  x.lineTo(X + r, Y + H); x.quadraticCurveTo(X, Y + H, X, Y + H - r);
  x.lineTo(X, Y + r); x.quadraticCurveTo(X, Y, X + r, Y); x.closePath();
}

/* ------------------------------ geometry utils ---------------------------- */
/** Rounded box via an extruded rounded rectangle — used for handset, badges. */
function roundedBoxGeo(w, h, d, r, bevel = 0.004) {
  const s = new THREE.Shape();
  const W = w, H = h, R = Math.min(r, W / 2 - 1e-4, H / 2 - 1e-4);
  s.moveTo(-W / 2 + R, -H / 2);
  s.lineTo(W / 2 - R, -H / 2); s.quadraticCurveTo(W / 2, -H / 2, W / 2, -H / 2 + R);
  s.lineTo(W / 2, H / 2 - R); s.quadraticCurveTo(W / 2, H / 2, W / 2 - R, H / 2);
  s.lineTo(-W / 2 + R, H / 2); s.quadraticCurveTo(-W / 2, H / 2, -W / 2, H / 2 - R);
  s.lineTo(-W / 2, -H / 2 + R); s.quadraticCurveTo(-W / 2, -H / 2, -W / 2 + R, -H / 2);
  const g = new THREE.ExtrudeGeometry(s, { depth: d - bevel * 2, bevelEnabled: true, bevelThickness: bevel, bevelSize: bevel, bevelSegments: 3, curveSegments: 8 });
  g.center();
  return g;
}
function mesh(geo, mat, x = 0, y = 0, z = 0, castS = false, recvS = false) {
  const m = new THREE.Mesh(geo, mat); m.position.set(x, y, z); m.castShadow = castS; m.receiveShadow = recvS; return m;
}
function mat(color, { rough = 0.75, metal = 0.0, emis = 0, emisC = null, flat = true, opacity = 1, transparent = false, side = null, map = null, env = 1 } = {}) {
  const m = new THREE.MeshStandardMaterial({ color, roughness: rough, metalness: metal, flatShading: flat });
  if (emis) { m.emissive = new THREE.Color(emisC == null ? color : emisC); m.emissiveIntensity = emis; }
  if (opacity < 1 || transparent) { m.transparent = true; m.opacity = opacity; }
  if (side) m.side = side;
  if (map) m.map = map;
  m.envMapIntensity = env;
  return m;
}
/** Additive glow sprite (radial gradient) — cheap volumetric bloom substitute. */
function glowTexture(inner = 'rgba(255,255,255,1)', outer = 'rgba(255,255,255,0)', power = 1) {
  const { c, x } = makeCanvas(128, 128);
  const g = x.createRadialGradient(64, 64, 0, 64, 64, 64);
  for (let i = 0; i <= 10; i++) {
    const u = i / 10;
    const a = Math.pow(1 - u, 2.2 * power);
    g.addColorStop(u, `rgba(255,255,255,${a.toFixed(3)})`);
  }
  x.fillStyle = g; x.fillRect(0, 0, 128, 128);
  const t = canvasTexture(c, { srgb: false });
  t._tint = { inner, outer };
  return t;
}
const GLOW_TEX = { cur: null };
function glowTex() { if (!GLOW_TEX.cur) GLOW_TEX.cur = glowTexture(); return GLOW_TEX.cur; }
function glowSprite(color, size, opacity = 1) {
  const m = new THREE.SpriteMaterial({ map: glowTex(), color, transparent: true, opacity, blending: THREE.AdditiveBlending, depthWrite: false, depthTest: true });
  const s = new THREE.Sprite(m); s.scale.setScalar(size); return s;
}

/* ------------------------------- DOM helpers ------------------------------ */
const $ = (id) => document.getElementById(id);
const win = () => ({ w: window.innerWidth, h: window.innerHeight, dpr: Math.min(window.devicePixelRatio || 1, 2) });

/* ==========================================================================
   Geometry batching — a merged-mesh builder.
   A 12-car EMU rake modelled part-by-part is ~2400 scene objects; five rakes
   would put the scene graph past 12k nodes and the per-frame matrix traversal
   would eat the frame budget on its own. Everything static or repeated is
   therefore baked into a handful of merged meshes with vertex colours.
   ========================================================================== */
class GB {
  constructor() { this.g = new Map(); this._m = new THREE.Matrix4(); this._q = new THREE.Quaternion(); this._e = new THREE.Euler(); }
  _bucket(name) {
    if (!this.g.has(name)) this.g.set(name, { p: [], n: [], u: [], c: [] });
    return this.g.get(name);
  }
  /** Add a geometry, transformed and tinted, into a named merge bucket. */
  add(geo, o = {}) {
    const b = this._bucket(o.group || 'a');
    const pos = o.pos || [0, 0, 0], rot = o.rot || [0, 0, 0], sc = o.scale || [1, 1, 1];
    this._e.set(rot[0], rot[1], rot[2]);
    this._q.setFromEuler(this._e);
    this._m.compose(new THREE.Vector3(pos[0], pos[1], pos[2]), this._q, new THREE.Vector3(sc[0], sc[1], sc[2]));
    const nm = new THREE.Matrix3().getNormalMatrix(this._m);
    const g = geo.index ? geo.toNonIndexed() : geo;
    const P = g.attributes.position.array, N = g.attributes.normal ? g.attributes.normal.array : null;
    const UV = g.attributes.uv ? g.attributes.uv.array : null;
    const v = new THREE.Vector3(), n3 = new THREE.Vector3();
    const col = o.color == null ? null : (o.color.isColor ? o.color : new THREE.Color(o.color));
    for (let i = 0; i < P.length; i += 3) {
      v.set(P[i], P[i + 1], P[i + 2]).applyMatrix4(this._m);
      b.p.push(v.x, v.y, v.z);
      if (N) { n3.set(N[i], N[i + 1], N[i + 2]).applyMatrix3(nm).normalize(); b.n.push(n3.x, n3.y, n3.z); }
      else b.n.push(0, 1, 0);
      if (UV) b.u.push(UV[(i / 3) * 2], UV[(i / 3) * 2 + 1]); else b.u.push(0, 0);
      if (col) b.c.push(col.r, col.g, col.b); else b.c.push(1, 1, 1);
    }
    if (g !== geo) g.dispose();
    return this;
  }
  /** Convenience: add via a mesh-like transform triple. */
  box(w, h, d, o) { return this.add(new THREE.BoxGeometry(w, h, d), o); }
  cyl(rt, rb, h, seg, o) { return this.add(new THREE.CylinderGeometry(rt, rb, h, seg), o); }
  sph(r, o) { return this.add(new THREE.SphereGeometry(r, o && o.seg || 10, o && o.seg2 || 8), o); }
  tor(r, t, o) { return this.add(new THREE.TorusGeometry(r, t, o && o.rad || 6, o && o.tub || 14), o); }
  pln(w, h, o) { return this.add(new THREE.PlaneGeometry(w, h), o); }
  geo(name) {
    const b = this._bucket(name);
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(b.p, 3));
    g.setAttribute('normal', new THREE.Float32BufferAttribute(b.n, 3));
    g.setAttribute('uv', new THREE.Float32BufferAttribute(b.u, 2));
    g.setAttribute('color', new THREE.Float32BufferAttribute(b.c, 3));
    g.computeBoundingSphere();
    return g;
  }
  /** Build one Mesh per bucket using the material map {bucket: material}. */
  build(mats, opts = {}) {
    const grp = new THREE.Group();
    for (const [name] of this.g) {
      const m = (typeof mats === 'object' && !mats.isMaterial) ? (mats[name] || mats.a) : mats;
      const mm = opts.vertexColors === false ? m : cloneVC(m);
      const meshO = new THREE.Mesh(this.geo(name), mm);
      meshO.castShadow = !!opts.cast; meshO.receiveShadow = !!opts.recv;
      meshO.name = name;
      grp.add(meshO);
    }
    return grp;
  }
  get count() { let n = 0; for (const [, b] of this.g) n += b.p.length / 3; return n; }
}
const _vcCache = new Map();
/** One vertex-colour-enabled clone per source material, reused across buckets. */
function cloneVC(m) {
  if (m.vertexColors) return m;
  if (_vcCache.has(m.uuid)) return _vcCache.get(m.uuid);
  const c = m.clone();
  c.vertexColors = true;
  _vcCache.set(m.uuid, c);
  return c;
}

/** Stop three from re-deriving local matrices every frame for static content. */
function freeze(obj) {
  obj.updateMatrixWorld(true);
  obj.traverse((o) => { o.matrixAutoUpdate = false; o.updateMatrix(); });
  obj.updateMatrixWorld(true);
  return obj;
}
/** Count scene-graph nodes (used by the perf HUD). */
function countNodes(root) { let n = 0; root.traverse(() => n++); return n; }
