/**
 * Generative soundtrack (WebAudio, no assets): tanpura drone, bansuri-style melody in raag Bhupali, and a light tabla keherwa.
 */
export class Score {
  ctx: AudioContext
  master: GainNode
  stream: MediaStreamAudioDestinationNode
  private reverb: ConvolverNode
  private timer = 0
  private next = { drone: 0, tabla: 0, melody: 0 }
  private step = { drone: 0, tabla: 0, melody: 0 }
  private started = 0
  muted = false

  constructor() {
    this.ctx = new AudioContext()
    this.master = this.ctx.createGain(); this.master.gain.value = 0.55
    this.stream = this.ctx.createMediaStreamDestination()
    const comp = this.ctx.createDynamicsCompressor()
    this.master.connect(comp); comp.connect(this.ctx.destination); comp.connect(this.stream)
    this.reverb = this.ctx.createConvolver()
    const len = this.ctx.sampleRate * 2.6
    const ir = this.ctx.createBuffer(2, len, this.ctx.sampleRate)
    for (let c = 0; c < 2; c++) { const d = ir.getChannelData(c); for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 2.6) }
    this.reverb.buffer = ir
    const rv = this.ctx.createGain(); rv.gain.value = 0.35
    this.reverb.connect(rv); rv.connect(this.master)
  }

  private out(node: AudioNode, wet = 0.4) {
    const dry = this.ctx.createGain(); dry.gain.value = 1
    node.connect(dry); dry.connect(this.master)
    if (wet > 0) { const w = this.ctx.createGain(); w.gain.value = wet; node.connect(w); w.connect(this.reverb) }
  }

  private pluck(freq: number, at: number, dur = 3.2, vol = 0.12) {
    const c = this.ctx
    const g = c.createGain(); g.gain.setValueAtTime(0, at); g.gain.linearRampToValueAtTime(vol, at + 0.02); g.gain.exponentialRampToValueAtTime(0.0008, at + dur)
    const f = c.createBiquadFilter(); f.type = 'lowpass'; f.frequency.setValueAtTime(2600, at); f.frequency.exponentialRampToValueAtTime(700, at + dur); f.Q.value = 2
    for (const det of [-6, 5, 0]) {
      const o = c.createOscillator(); o.type = det === 0 ? 'triangle' : 'sawtooth'; o.frequency.value = freq; o.detune.value = det
      o.connect(f); o.start(at); o.stop(at + dur + 0.1)
    }
    f.connect(g); this.out(g, 0.5)
  }

  private flute(freq: number, at: number, dur: number, vol = 0.09) {
    const c = this.ctx
    const g = c.createGain(); g.gain.setValueAtTime(0, at); g.gain.linearRampToValueAtTime(vol, at + 0.09); g.gain.setValueAtTime(vol, at + dur * 0.7); g.gain.exponentialRampToValueAtTime(0.0008, at + dur + 0.4)
    const o = c.createOscillator(); o.type = 'sine'; o.frequency.setValueAtTime(freq * 0.985, at); o.frequency.exponentialRampToValueAtTime(freq, at + 0.08)
    const o2 = c.createOscillator(); o2.type = 'triangle'; o2.frequency.value = freq * 2
    const g2 = c.createGain(); g2.gain.value = 0.12
    const lfo = c.createOscillator(); lfo.frequency.value = 5.2; const lg = c.createGain(); lg.gain.value = freq * 0.006
    lfo.connect(lg); lg.connect(o.frequency)
    // breath
    const nb = c.createBuffer(1, c.sampleRate * (dur + 0.5), c.sampleRate); const nd = nb.getChannelData(0); for (let i = 0; i < nd.length; i++) nd[i] = Math.random() * 2 - 1
    const ns = c.createBufferSource(); ns.buffer = nb
    const nf = c.createBiquadFilter(); nf.type = 'bandpass'; nf.frequency.value = freq * 2; nf.Q.value = 3
    const ng = c.createGain(); ng.gain.value = 0.18
    ns.connect(nf); nf.connect(ng); ng.connect(g)
    o.connect(g); o2.connect(g2); g2.connect(g)
    for (const n of [o, o2, lfo, ns]) { n.start(at); n.stop(at + dur + 0.5) }
    this.out(g, 0.7)
  }

  private drum(at: number, kind: 'dha' | 'na' | 'ge' | 'ti', vol = 1) {
    const c = this.ctx
    if (kind === 'dha' || kind === 'ge') {
      const o = c.createOscillator(); o.type = 'sine'
      o.frequency.setValueAtTime(kind === 'dha' ? 110 : 95, at); o.frequency.exponentialRampToValueAtTime(58, at + 0.35)
      const g = c.createGain(); g.gain.setValueAtTime(0.32 * vol, at); g.gain.exponentialRampToValueAtTime(0.001, at + 0.5)
      o.connect(g); o.start(at); o.stop(at + 0.55); this.out(g, 0.15)
    }
    if (kind !== 'ge') {
      const base = kind === 'ti' ? 760 : 540
      for (const [m, v] of [[1, 0.16], [2.01, 0.07], [2.98, 0.04]] as const) {
        const o = c.createOscillator(); o.type = 'sine'; o.frequency.value = base * m
        const g = c.createGain(); g.gain.setValueAtTime(v * vol, at); g.gain.exponentialRampToValueAtTime(0.0008, at + (kind === 'ti' ? 0.09 : 0.22))
        o.connect(g); o.start(at); o.stop(at + 0.3); this.out(g, 0.25)
      }
    }
  }

  private schedule() {
    const now = this.ctx.currentTime, ahead = now + 0.25
    const SA = 146.83 // D
    const el = now - this.started
    // tanpura: Pa Sa' Sa' Sa
    while (this.next.drone < ahead) {
      const seq = [SA * 0.75, SA, SA, SA * 0.5]
      this.pluck(seq[this.step.drone % 4], this.next.drone, 3.4, this.step.drone % 4 === 3 ? 0.14 : 0.1)
      this.next.drone += 0.82; this.step.drone++
    }
    // tabla keherwa (8 matras) after intro
    const beat = 60 / 84 / 2
    while (this.next.tabla < ahead) {
      if (el > 7) {
        const bol = (['dha', 'ge', 'na', 'ti', 'na', 'ka', 'dha', 'na'] as const)[this.step.tabla % 8]
        if (bol !== 'ka') this.drum(this.next.tabla, bol, Math.min(1, (el - 7) / 4) * (this.step.tabla % 8 === 0 ? 1.1 : 0.8))
      }
      this.next.tabla += beat; this.step.tabla++
    }
    // bansuri melody — raag Bhupali (S R G P D)
    const deg = [0, 2, 4, 7, 9, 12, 14, 16]
    const phrase: [number, number][] = [[2, 2], [3, 1], [4, 1], [5, 3], [-1, 1], [4, 1], [3, 1], [2, 1], [3, 2], [1, 2], [0, 3], [-1, 1],
      [3, 1], [4, 1], [5, 1], [6, 1], [5, 2], [4, 1], [3, 1], [4, 2], [2, 2], [3, 3], [-1, 1], [2, 1], [1, 1], [0, 4], [-1, 2]]
    while (this.next.melody < ahead) {
      const [d, b] = phrase[this.step.melody % phrase.length]
      const dur = b * beat * 2
      if (d >= 0 && el > 3) this.flute(SA * 2 * Math.pow(2, deg[d] / 12), this.next.melody, dur * 0.95)
      this.next.melody += dur; this.step.melody++
    }
  }

  start() {
    if (this.timer) return
    this.ctx.resume()
    const now = this.ctx.currentTime + 0.05
    this.started = now
    this.next = { drone: now, tabla: now, melody: now + 0.5 }
    this.step = { drone: 0, tabla: 0, melody: 0 }
    this.timer = window.setInterval(() => this.schedule(), 60)
  }
  pause() { this.ctx.suspend() }
  resume() { this.ctx.resume() }
  setMuted(m: boolean) { this.muted = m; this.master.gain.setTargetAtTime(m ? 0 : 0.55, this.ctx.currentTime, 0.1) }
}
