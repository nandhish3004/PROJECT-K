/* ============================================================================
   10-audio.js · Chennai Mobility AI sound design
   ----------------------------------------------------------------------------
   Three layers, all sync-locked to the master clock:
     1. VOICE   — pre-rendered stems (Indian-English narration + the two Tamil
                  call turns). The Tamil turns run through a 300–3400 Hz
                  bandpass + line hiss so they genuinely sound like 8 kHz
                  narrow-band telephony coming out of a handset earpiece.
     2. FOLEY   — fully procedural WebAudio: rain bed, distant diesel, rubber
                  keypad clicks, real DTMF dual-tones, SMS alert, air brakes,
                  vibration buzz, thunder.
     3. BED     — a very quiet generative drone so the film is never dead-air.
   Stems are scheduled sample-accurately against `epoch + filmTime`, so the
   picture and the sound cannot drift over the 150 seconds.
   ========================================================================== */

/* Real ITU-T DTMF pairs (Hz) — used for the dial sequence and the '1' confirm. */
const DTMF = {
  '1': [697, 1209], '2': [697, 1336], '3': [697, 1477],
  '4': [770, 1209], '5': [770, 1336], '6': [770, 1477],
  '7': [852, 1209], '8': [852, 1336], '9': [852, 1477],
  '*': [941, 1209], '0': [941, 1336], '#': [941, 1477],
};
/* The helpline: Chennai STD 044 + 8-digit subscriber number = the 10-digit
   number 4424794705, dialled with the trunk prefix 0. Matches the SMS footer. */
const HELPLINE_DISPLAY = '044 2479 4705';
const HELPLINE_DIGITS = '04424794705';

const AudioEngine = {
  ok: false, blocked: false, ctx: null, epoch: 0, muted: false,
  buffers: {}, sources: [], beds: {}, t0wall: 0,

  /* ---------------------------------------------------------------- build -- */
  init() {
    if (this.ctx) return this.ctx;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) { this.blocked = true; return null; }
    let ctx;
    try { ctx = new AC({ latencyHint: 'interactive' }); } catch (e) { this.blocked = true; return null; }
    this.ctx = ctx;

    const master = ctx.createGain(); master.gain.value = 0.0;
    const comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -14; comp.knee.value = 22; comp.ratio.value = 5;
    comp.attack.value = 0.004; comp.release.value = 0.22;
    master.connect(comp); comp.connect(ctx.destination);

    /* No MediaStreamDestination tap any more. It existed only for the old
       MediaRecorder download, which has been replaced by an offline WebCodecs
       render. Keeping it meant the live compressor graph always carried a
       MediaStreamAudioDestinationNode -- an extra full-rate render quantum on
       the audio thread -- for a stream nothing ever read. */
    this.recDest = null;

    const bus = (name, gain = 1) => { const g = ctx.createGain(); g.gain.value = gain; g.connect(master); this.beds[name] = g; return g; };
    bus('vo', 1.0); bus('call', 1.0); bus('foley', 0.9); bus('bed', 0.5); bus('sfx', 1.0);
    this.master = master;

    /* --- telephone band chain: makes the Tamil turns sound like a real call -- */
    const callIn = ctx.createGain(); callIn.gain.value = 1;
    const hp = ctx.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 320; hp.Q.value = 0.7;
    const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 3300; lp.Q.value = 0.6;
    const peak = ctx.createBiquadFilter(); peak.type = 'peaking'; peak.frequency.value = 1100; peak.gain.value = 3.2; peak.Q.value = 0.9;
    const shaper = ctx.createWaveShaper(); shaper.curve = this._softCurve(1.7); shaper.oversample = '2x';
    const callOut = ctx.createGain(); callOut.gain.value = 0.95;
    callIn.connect(hp); hp.connect(peak); peak.connect(shaper); shaper.connect(lp); lp.connect(callOut);
    callOut.connect(this.beds.call);
    this.callChain = callIn;

    /* line hiss that only exists while the call is connected */
    const hiss = ctx.createBufferSource(); hiss.buffer = this._noiseBuffer(2, 'white'); hiss.loop = true;
    const hissF = ctx.createBiquadFilter(); hissF.type = 'bandpass'; hissF.frequency.value = 1600; hissF.Q.value = 0.5;
    const hissG = ctx.createGain(); hissG.gain.value = 0;
    hiss.connect(hissF); hissF.connect(hissG); hissG.connect(this.beds.call); hiss.start();
    this.beds.hiss = hissG;

    this._buildRain();
    this._buildDiesel();
    this._buildDrone();
    this._buildCity();

    this.ok = true;
    return ctx;
  },

  _softCurve(amount) {
    const n = 1024, c = new Float32Array(n);
    for (let i = 0; i < n; i++) { const x = (i / (n - 1)) * 2 - 1; c[i] = Math.tanh(x * amount) / Math.tanh(amount); }
    return c;
  },
  _noiseBuffer(sec, kind = 'white') {
    const ctx = this.ctx, len = Math.floor(ctx.sampleRate * sec);
    const b = ctx.createBuffer(1, len, ctx.sampleRate), d = b.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, last = 0;
    for (let i = 0; i < len; i++) {
      const w = Math.random() * 2 - 1;
      if (kind === 'white') d[i] = w * 0.6;
      else if (kind === 'pink') {
        b0 = 0.99765 * b0 + w * 0.0990460; b1 = 0.96300 * b1 + w * 0.2965164;
        b2 = 0.57000 * b2 + w * 1.0526913; d[i] = (b0 + b1 + b2 + w * 0.1848) * 0.22;
      } else { /* brown */
        last = (last + 0.02 * w) / 1.02; d[i] = last * 3.2;
      }
    }
    /* crossfade the seam so the loop never clicks */
    const f = Math.floor(ctx.sampleRate * 0.05);
    for (let i = 0; i < f; i++) { const u = i / f; d[i] = d[i] * u + d[len - f + i] * (1 - u); }
    return b;
  },

  /* --------------------------------------------------------------- rain --- */
  _buildRain() {
    const ctx = this.ctx;
    const src = ctx.createBufferSource(); src.buffer = this._noiseBuffer(5, 'pink'); src.loop = true;
    const hp = ctx.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 520; hp.Q.value = 0.5;
    const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 6800; lp.Q.value = 0.4;
    const g = ctx.createGain(); g.gain.value = 0;
    src.connect(hp); hp.connect(lp); lp.connect(g); g.connect(this.beds.foley); src.start();

    /* heavy low component — rain hammering the shelter's tin roof */
    const src2 = ctx.createBufferSource(); src2.buffer = this._noiseBuffer(5, 'brown'); src2.loop = true;
    const lp2 = ctx.createBiquadFilter(); lp2.type = 'lowpass'; lp2.frequency.value = 260;
    const g2 = ctx.createGain(); g2.gain.value = 0;
    src2.connect(lp2); lp2.connect(g2); g2.connect(this.beds.foley); src2.start();

    /* high "spray" shimmer that lifts when the camera is close to the ground */
    const src3 = ctx.createBufferSource(); src3.buffer = this._noiseBuffer(4, 'white'); src3.loop = true;
    const bp3 = ctx.createBiquadFilter(); bp3.type = 'bandpass'; bp3.frequency.value = 5200; bp3.Q.value = 0.8;
    const g3 = ctx.createGain(); g3.gain.value = 0;
    src3.connect(bp3); bp3.connect(g3); g3.connect(this.beds.foley); src3.start();

    this.rain = { hi: g, low: g2, spray: g3 };
  },

  /* ------------------------------------------------------------ diesel --- */
  _buildDiesel() {
    const ctx = this.ctx;
    const out = ctx.createGain(); out.gain.value = 0; out.connect(this.beds.foley);
    const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 340; lp.Q.value = 1.1;
    lp.connect(out);

    const o1 = ctx.createOscillator(); o1.type = 'sawtooth'; o1.frequency.value = 41;
    const o2 = ctx.createOscillator(); o2.type = 'sawtooth'; o2.frequency.value = 82.6;
    const o3 = ctx.createOscillator(); o3.type = 'square'; o3.frequency.value = 27.4;
    const g1 = ctx.createGain(); g1.gain.value = 0.5;
    const g2 = ctx.createGain(); g2.gain.value = 0.22;
    const g3 = ctx.createGain(); g3.gain.value = 0.3;
    o1.connect(g1); o2.connect(g2); o3.connect(g3); g1.connect(lp); g2.connect(lp); g3.connect(lp);

    /* exhaust noise */
    const n = ctx.createBufferSource(); n.buffer = this._noiseBuffer(4, 'brown'); n.loop = true;
    const nbp = ctx.createBiquadFilter(); nbp.type = 'bandpass'; nbp.frequency.value = 190; nbp.Q.value = 0.8;
    const ng = ctx.createGain(); ng.gain.value = 0.5;
    n.connect(nbp); nbp.connect(ng); ng.connect(out);

    /* diesel chug: amplitude LFO */
    const lfo = ctx.createOscillator(); lfo.type = 'sine'; lfo.frequency.value = 7.2;
    const lfoG = ctx.createGain(); lfoG.gain.value = 0.28;
    lfo.connect(lfoG); lfoG.connect(out.gain);

    o1.start(); o2.start(); o3.start(); n.start(); lfo.start();
    this.diesel = { out, o1, o2, o3, lp, lfo };
  },

  /* --------------------------------------------------------------- drone -- */
  _buildDrone() {
    const ctx = this.ctx;
    const out = ctx.createGain(); out.gain.value = 0; out.connect(this.beds.bed);
    const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 700; lp.Q.value = 0.7;
    lp.connect(out);
    /* tanpura-ish stack on A: root, fifth, octave, and a soft high shimmer */
    const freqs = [110, 164.81, 220, 329.63, 440];
    const gains = [0.34, 0.18, 0.2, 0.08, 0.05];
    const oscs = freqs.map((f, i) => {
      const o = ctx.createOscillator(); o.type = i < 2 ? 'sine' : 'triangle'; o.frequency.value = f;
      const g = ctx.createGain(); g.gain.value = gains[i];
      /* slow beating so it breathes instead of buzzing */
      const l = ctx.createOscillator(); l.type = 'sine'; l.frequency.value = 0.045 + i * 0.021;
      const lg = ctx.createGain(); lg.gain.value = gains[i] * 0.55;
      l.connect(lg); lg.connect(g.gain); l.start();
      o.connect(g); g.connect(lp); o.start();
      return o;
    });
    /* slow filter sweep */
    const fl = ctx.createOscillator(); fl.type = 'sine'; fl.frequency.value = 0.031;
    const flg = ctx.createGain(); flg.gain.value = 260;
    fl.connect(flg); flg.connect(lp.frequency); fl.start();
    this.drone = { out, lp, oscs };
  },

  /* ------------------------------------------------- city night ambience -- */
  _buildCity() {
    const ctx = this.ctx;
    const src = ctx.createBufferSource(); src.buffer = this._noiseBuffer(6, 'brown'); src.loop = true;
    const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 180;
    const g = ctx.createGain(); g.gain.value = 0;
    src.connect(lp); lp.connect(g); g.connect(this.beds.foley); src.start();
    this.city = { g };
  },

  /* ------------------------------------------------------------- loading -- */
  async load(manifest) {
    if (!this.ctx) this.init();
    if (!this.ctx) return;
    const jobs = [];
    for (const name of Object.keys(manifest)) {
      const b64 = manifest[name];
      const bin = atob(b64.split(',')[1] || b64);
      const arr = new Uint8Array(bin.length);
      for (let i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
      jobs.push(this.ctx.decodeAudioData(arr.buffer.slice(0)).then((buf) => { this.buffers[name] = buf; }).catch(() => {}));
    }
    await Promise.all(jobs);
  },
  dur(name) { const b = this.buffers[name]; return b ? b.duration : 0; },

  /* ----------------------------------------------------------- transport -- */
  /** Bind audio time to film time. `filmNow` is where the picture currently is. */
  sync(filmNow) {
    if (!this.ctx) return;
    this.epoch = this.ctx.currentTime + 0.06 - filmNow;
  },
  async unlock() {
    if (!this.ctx) this.init();
    if (!this.ctx) return false;
    try {
      if (this.ctx.state === 'suspended') await this.ctx.resume();
      this.blocked = this.ctx.state !== 'running';
    } catch (e) { this.blocked = true; }
    return !this.blocked;
  },
  setMaster(v, ramp = 0.5) {
    if (!this.ctx) return;
    this.master.gain.cancelScheduledValues(this.ctx.currentTime);
    this.master.gain.setTargetAtTime(this.muted ? 0 : v, this.ctx.currentTime, ramp);
  },
  suspend() { if (this.ctx && this.ctx.state === 'running') this.ctx.suspend(); },
  resume() { if (this.ctx && this.ctx.state === 'suspended') this.ctx.resume(); },

  /** Schedule a stem at a film time. Narrow-band stems go through callChain. */
  play(name, filmTime, { gain = 1, phone = false, detune = 0 } = {}) {
    if (!this.ctx) return null;
    const buf = this.buffers[name];
    if (!buf) return null;
    const src = this.ctx.createBufferSource();
    src.buffer = buf; if (detune) src.detune.value = detune;
    const g = this.ctx.createGain(); g.gain.value = gain;
    src.connect(g);
    if (phone) g.connect(this.callChain); else g.connect(this.beds.vo);
    const when = this.epoch + filmTime;
    const now = this.ctx.currentTime;
    if (when >= now) src.start(when);
    else if (now - when < buf.duration) src.start(now + 0.01, now - when);   /* join mid-clip */
    else return null;                                                        /* already over */
    this.sources.push(src);
    src.onended = () => { const i = this.sources.indexOf(src); if (i >= 0) this.sources.splice(i, 1); };
    return src;
  },
  stopAll() { for (const s of this.sources) { try { s.onended = null; s.stop(); } catch (e) {} } this.sources.length = 0; },

  /* -------------------------------------------------------- one-shot sfx -- */
  _env(node, t0, a, d, peak) {
    const g = node.gain; g.cancelScheduledValues(t0);
    g.setValueAtTime(0.0001, t0);
    g.exponentialRampToValueAtTime(Math.max(0.0002, peak), t0 + a);
    g.exponentialRampToValueAtTime(0.0001, t0 + a + d);
  },
  _sfxGain(v = 1) { const g = this.ctx.createGain(); g.gain.value = v; g.connect(this.beds.sfx); return g; },

  /** Real dual-tone DTMF, band-limited like an in-band signalling tone. */
  dtmf(digit, filmTime = null, dur = 0.14, level = 0.34) {
    if (!this.ctx) return;
    const pair = DTMF[digit] || DTMF['1'];
    const t0 = filmTime == null ? this.ctx.currentTime : Math.max(this.ctx.currentTime, this.epoch + filmTime);
    const bp = this.ctx.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 1000; bp.Q.value = 0.4;
    const g = this._sfxGain(1); bp.connect(g);
    for (const f of pair) {
      const o = this.ctx.createOscillator(); o.type = 'sine'; o.frequency.value = f;
      const og = this.ctx.createGain(); this._env(og, t0, 0.006, dur, level);
      o.connect(og); og.connect(bp); o.start(t0); o.stop(t0 + dur + 0.06);
    }
  },
  /** Tactile rubber keypad click: 3 ms noise transient + a soft body thud. */
  keyClick(filmTime = null, level = 0.5) {
    if (!this.ctx) return;
    const ctx = this.ctx;
    const t0 = filmTime == null ? ctx.currentTime : Math.max(ctx.currentTime, this.epoch + filmTime);
    const n = ctx.createBufferSource(); n.buffer = this._noiseBuffer(0.06, 'white');
    const bp = ctx.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 2400; bp.Q.value = 1.4;
    const g = this._sfxGain(1); this._env(g, t0, 0.001, 0.035, level);
    n.connect(bp); bp.connect(g); n.start(t0); n.stop(t0 + 0.09);
    const o = ctx.createOscillator(); o.type = 'sine'; o.frequency.setValueAtTime(320, t0);
    o.frequency.exponentialRampToValueAtTime(120, t0 + 0.05);
    const og = this._sfxGain(1); this._env(og, t0, 0.002, 0.05, level * 0.5);
    o.connect(og); o.start(t0); o.stop(t0 + 0.12);
  },
  /** Nokia-style two-note SMS alert. */
  smsBeep(filmTime = null, level = 0.3) {
    if (!this.ctx) return;
    const ctx = this.ctx;
    const t0 = filmTime == null ? ctx.currentTime : Math.max(ctx.currentTime, this.epoch + filmTime);
    const notes = [[1567.98, 0], [1046.5, 0.13], [1567.98, 0.26]];
    for (const [f, off] of notes) {
      const o = ctx.createOscillator(); o.type = 'sine'; o.frequency.value = f;
      const g = this._sfxGain(1); this._env(g, t0 + off, 0.008, 0.11, level);
      o.connect(g); o.start(t0 + off); o.stop(t0 + off + 0.2);
      const o2 = ctx.createOscillator(); o2.type = 'triangle'; o2.frequency.value = f * 2;
      const g2 = this._sfxGain(1); this._env(g2, t0 + off, 0.006, 0.07, level * 0.22);
      o2.connect(g2); o2.start(t0 + off); o2.stop(t0 + off + 0.16);
    }
  },
  /** Handset vibration motor: three 110 ms buzzes. */
  vibrate(filmTime = null, level = 0.42) {
    if (!this.ctx) return;
    const ctx = this.ctx;
    const t0 = filmTime == null ? ctx.currentTime : Math.max(ctx.currentTime, this.epoch + filmTime);
    for (let i = 0; i < 2; i++) {
      const s = t0 + i * 0.19;
      const o = ctx.createOscillator(); o.type = 'square'; o.frequency.value = 118;
      const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 420;
      const g = this._sfxGain(1); this._env(g, s, 0.008, 0.12, level);
      o.connect(lp); lp.connect(g); o.start(s); o.stop(s + 0.2);
      const n = ctx.createBufferSource(); n.buffer = this._noiseBuffer(0.2, 'brown');
      const ng = this._sfxGain(1); this._env(ng, s, 0.006, 0.13, level * 0.5);
      n.connect(ng); n.start(s); n.stop(s + 0.22);
    }
    try { if (navigator.vibrate) navigator.vibrate([90, 70, 90]); } catch (e) {}
  },
  /** Bus air-brake release + door pneumatics. */
  airBrake(filmTime = null, level = 0.3) {
    if (!this.ctx) return;
    const ctx = this.ctx;
    const t0 = filmTime == null ? ctx.currentTime : Math.max(ctx.currentTime, this.epoch + filmTime);
    const n = ctx.createBufferSource(); n.buffer = this._noiseBuffer(1.2, 'white');
    const bp = ctx.createBiquadFilter(); bp.type = 'bandpass'; bp.Q.value = 1.1;
    bp.frequency.setValueAtTime(900, t0);
    bp.frequency.exponentialRampToValueAtTime(4200, t0 + 0.35);
    bp.frequency.exponentialRampToValueAtTime(1400, t0 + 0.9);
    const g = this._sfxGain(1); this._env(g, t0, 0.03, 0.85, level);
    n.connect(bp); bp.connect(g); n.start(t0); n.stop(t0 + 1.2);
  },
  /** Horn: the two-tone MTC bus horn. */
  horn(filmTime = null, level = 0.2, dur = 0.5) {
    if (!this.ctx) return;
    const ctx = this.ctx;
    const t0 = filmTime == null ? ctx.currentTime : Math.max(ctx.currentTime, this.epoch + filmTime);
    for (const f of [311, 415]) {
      const o = ctx.createOscillator(); o.type = 'sawtooth'; o.frequency.value = f;
      const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 1500;
      const g = this._sfxGain(1); this._env(g, t0, 0.03, dur, level);
      o.connect(lp); lp.connect(g); o.start(t0); o.stop(t0 + dur + 0.2);
    }
  },
  /** Camera-move whoosh. */
  whoosh(filmTime = null, level = 0.16, dur = 0.9, up = true) {
    if (!this.ctx) return;
    const ctx = this.ctx;
    const t0 = filmTime == null ? ctx.currentTime : Math.max(ctx.currentTime, this.epoch + filmTime);
    const n = ctx.createBufferSource(); n.buffer = this._noiseBuffer(dur + 0.4, 'pink');
    const bp = ctx.createBiquadFilter(); bp.type = 'bandpass'; bp.Q.value = 1.6;
    const a = up ? 220 : 1800, b = up ? 2100 : 260;
    bp.frequency.setValueAtTime(a, t0);
    bp.frequency.exponentialRampToValueAtTime(b, t0 + dur);
    const g = this._sfxGain(1);
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.linearRampToValueAtTime(level, t0 + dur * 0.35);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    n.connect(bp); bp.connect(g); n.start(t0); n.stop(t0 + dur + 0.4);
  },
  /** Thunder / low rumble swell. */
  thunder(filmTime = null, level = 0.34) {
    if (!this.ctx) return;
    const ctx = this.ctx;
    const t0 = filmTime == null ? ctx.currentTime : Math.max(ctx.currentTime, this.epoch + filmTime);
    const n = ctx.createBufferSource(); n.buffer = this._noiseBuffer(4, 'brown');
    const lp = ctx.createBiquadFilter(); lp.type = 'lowpass';
    lp.frequency.setValueAtTime(90, t0);
    lp.frequency.linearRampToValueAtTime(320, t0 + 0.6);
    lp.frequency.linearRampToValueAtTime(60, t0 + 3.2);
    const g = this._sfxGain(1);
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(level, t0 + 0.5);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + 3.4);
    n.connect(lp); lp.connect(g); n.start(t0); n.stop(t0 + 4);
    const o = ctx.createOscillator(); o.type = 'sine';
    o.frequency.setValueAtTime(58, t0); o.frequency.exponentialRampToValueAtTime(26, t0 + 3);
    const og = this._sfxGain(1); this._env(og, t0, 0.4, 2.6, level * 0.7);
    o.connect(og); o.start(t0); o.stop(t0 + 3.6);
  },
  /** Call connect / disconnect line clicks. */
  lineClick(filmTime = null, level = 0.22, down = false) {
    if (!this.ctx) return;
    const ctx = this.ctx;
    const t0 = filmTime == null ? ctx.currentTime : Math.max(ctx.currentTime, this.epoch + filmTime);
    const o = ctx.createOscillator(); o.type = 'sine';
    o.frequency.setValueAtTime(down ? 900 : 420, t0);
    o.frequency.exponentialRampToValueAtTime(down ? 240 : 780, t0 + 0.09);
    const g = this._sfxGain(1); this._env(g, t0, 0.004, 0.1, level);
    o.connect(g); o.start(t0); o.stop(t0 + 0.2);
  },
  /** Dial tone before the number is punched in. */
  dialTone(filmTime, dur = 1.1, level = 0.1) {
    if (!this.ctx) return;
    const ctx = this.ctx;
    const t0 = Math.max(ctx.currentTime, this.epoch + filmTime);
    const g = this._sfxGain(1);
    const bp = ctx.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 900; bp.Q.value = 1.2; bp.connect(g);
    for (const f of [350, 440]) {
      const o = ctx.createOscillator(); o.type = 'sine'; o.frequency.value = f;
      const og = ctx.createGain();
      og.gain.setValueAtTime(0.0001, t0);
      og.gain.linearRampToValueAtTime(level, t0 + 0.05);
      og.gain.setValueAtTime(level, t0 + dur - 0.05);
      og.gain.linearRampToValueAtTime(0.0001, t0 + dur);
      o.connect(og); og.connect(bp); o.start(t0); o.stop(t0 + dur + 0.1);
    }
  },
  /** UI/telemetry data blips for the aerial routing act. */
  blip(filmTime = null, freq = 1320, level = 0.09) {
    if (!this.ctx) return;
    const ctx = this.ctx;
    const t0 = filmTime == null ? ctx.currentTime : Math.max(ctx.currentTime, this.epoch + filmTime);
    const o = ctx.createOscillator(); o.type = 'sine'; o.frequency.setValueAtTime(freq, t0);
    o.frequency.exponentialRampToValueAtTime(freq * 1.5, t0 + 0.08);
    const g = this._sfxGain(1); this._env(g, t0, 0.004, 0.14, level);
    o.connect(g); o.start(t0); o.stop(t0 + 0.24);
  },
  /** Bus door clunk + the commuter's footstep on the metal step. */
  thud(filmTime = null, level = 0.3, freq = 130) {
    if (!this.ctx) return;
    const ctx = this.ctx;
    const t0 = filmTime == null ? ctx.currentTime : Math.max(ctx.currentTime, this.epoch + filmTime);
    const o = ctx.createOscillator(); o.type = 'sine';
    o.frequency.setValueAtTime(freq, t0); o.frequency.exponentialRampToValueAtTime(freq * 0.42, t0 + 0.16);
    const g = this._sfxGain(1); this._env(g, t0, 0.004, 0.2, level);
    o.connect(g); o.start(t0); o.stop(t0 + 0.3);
    const n = ctx.createBufferSource(); n.buffer = this._noiseBuffer(0.2, 'white');
    const bp = ctx.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 1800; bp.Q.value = 0.9;
    const ng = this._sfxGain(1); this._env(ng, t0, 0.002, 0.07, level * 0.4);
    n.connect(bp); bp.connect(ng); n.start(t0); n.stop(t0 + 0.25);
  },

  /* ------------------------------------- continuous mix, pure fn of time -- */
  _lastMix: -1,
  /**
   * Bed levels as a pure function of film time. Called at ~12 Hz; uses
   * setTargetAtTime so nothing ever clicks.
   */
  mix(t, state) {
    if (!this.ctx || this.ctx.state !== 'running') return;
    if (t - this._lastMix < 0.08 && !state.force) return;
    this._lastMix = t;
    const now = this.ctx.currentTime, k = 0.12;
    const set = (param, v) => param.setTargetAtTime(Math.max(0.0001, v), now, k);

    /* rain: heavy on the street, thins out as we climb, gone by the sunset */
    const alt = clamp01(inv(0, 70, state.camY || 0));          /* 0 street → 1 high */
    const rainFade = (1 - alt * 0.72) * (1 - segE(t, 132, 150, EASE.inOutSine) * 0.85);
    set(this.rain.hi.gain, 0.30 * rainFade * (state.rainAmount == null ? 1 : state.rainAmount));
    set(this.rain.low.gain, 0.42 * rainFade * (0.4 + 0.6 * (state.nearRoof == null ? 0 : state.nearRoof)));
    set(this.rain.spray.gain, 0.10 * (1 - alt) * rainFade * (state.closeToGround == null ? 0.4 : state.closeToGround));
    set(this.city.g.gain, 0.20 * (1 - alt * 0.5) * (0.35 + 0.65 * rainFade));

    /* diesel: audible whenever the bus is near the shelter / on the corridor */
    set(this.diesel.out.gain, clamp01(state.diesel == null ? 0 : state.diesel) * 0.5);
    const rpm = state.dieselRPM == null ? 41 : state.dieselRPM;
    this.diesel.o1.frequency.setTargetAtTime(rpm, now, 0.25);
    this.diesel.o2.frequency.setTargetAtTime(rpm * 2.01, now, 0.25);
    this.diesel.o3.frequency.setTargetAtTime(rpm * 0.67, now, 0.25);
    this.diesel.lfo.frequency.setTargetAtTime(clamp(rpm / 6.2, 4, 16), now, 0.3);

    /* call line hiss while connected */
    set(this.beds.hiss.gain, (state.onCall ? 0.05 : 0.0));

    /* drone bed: present in 1/3/5, ducked under dialogue */
    const bedBase = 0.13 * (state.duck == null ? 1 : state.duck);
    const bedShape = 0.55 + 0.45 * Math.sin(t * 0.09);
    set(this.drone.out.gain, bedBase * (0.6 + 0.4 * bedShape) * (t > 147.5 ? (1 - seg(t, 147.5, 150)) : 1));
  },
};
