/* ============================================================================
   CHENNAI MOBILITY AI — deterministic video export
   60-export.js  ·  render the film to a WebM file, in the browser, offline
   ---------------------------------------------------------------------------
   Why this exists
   ---------------
   Recording the live canvas with captureStream() records whatever the browser
   manages to paint, in real time. On a machine that cannot hold 60 fps that
   means dropped frames and uneven pacing baked into the file: the exported
   video inherits every hitch of the machine that made it.

   This exporter never does that. It drives the film clock in exact 1/60 s steps
   and only advances when the frame it asked for has actually been drawn. If the
   GPU takes 200 ms for a frame, the export simply takes 200 ms longer; the file
   still contains 60 distinct, evenly spaced frames per second of film. Wall
   clock time has no way to leak into the timeline.

   Audio is rendered separately through an OfflineAudioContext, which is faster
   than real time and deterministic, then muxed with the video track by
   webm-muxer. Both tracks end up in one seekable .webm.

   Anything the browser cannot do is reported, not silently swallowed.
   ========================================================================== */

/* webm-muxer is inlined by build_film.py, which replaces the line below with the
   library's UMD source at top level -- NOT inside a string, which would need the
   whole library escaped. Unbuilt, this file simply has no Muxer and the exporter
   reports itself unsupported instead of pretending. */
/*__WEBM_MUXER__*/

const Exporter = {
  running: false,
  cancelled: false,
  _cbs: {},

  on(ev, fn) { this._cbs[ev] = fn; return this; },
  _emit(ev, a, b) { const f = this._cbs[ev]; if (f) { try { f(a, b); } catch (e) {} } },

  /** True when every API a real export needs is present. */
  supported() {
    const hasMux = typeof WebMMuxer !== 'undefined' && WebMMuxer && WebMMuxer.Muxer;
    const hasEnc = typeof VideoEncoder !== 'undefined' && typeof AudioEncoder !== 'undefined';
    const hasCanvas = typeof document !== 'undefined' && !!document.createElement('canvas').getContext;
    return !!(hasMux && hasEnc && hasCanvas);
  },

  /** Human-readable reason the exporter cannot run, for the button tooltip. */
  whyUnsupported() {
    if (typeof WebMMuxer === 'undefined' || !WebMMuxer || !WebMMuxer.Muxer) return 'the muxer failed to load';
    if (typeof VideoEncoder === 'undefined') return 'this browser has no WebCodecs VideoEncoder';
    if (typeof AudioEncoder === 'undefined') return 'this browser has no WebCodecs AudioEncoder';
    return 'an unknown requirement is missing';
  },

  /*
     Render the whole film.

     opts:
       renderer, scene, camera   the live three.js objects (already sized)
       duration                  seconds of film (150)
       fps                       export frame rate (60)
       stateAt, drive, sampleCamera, drawHUD, octx, ow, oh
                                 the film's own pure functions; the exporter is
                                 deliberately not allowed to know anything else
       audio                     { manifest, cues, duration }
       onProgress(done, total, phase)

     Returns a Blob, or throws with a human-readable reason.
  */
  async render(opts) {
    if (this.running) throw new Error('An export is already running.');
    this.running = true;
    this.cancelled = false;

    const {
      renderer, scene, camera,
      duration = 150, fps = 60,
      stateAt, drive, sampleCamera,
      drawHUD, octx, ow, oh,
      onProgress = () => {},
    } = opts;

    let recCanvas = null, recCtx = null;

    try {
      /* ---------------- 1. audio, rendered offline ------------------------- */
      onProgress(0, duration, 'audio');
      let audioBuffer = null;
      try {
        audioBuffer = await this._renderAudio(opts.audio, duration);
      } catch (e) {
        /* A silent film is far better than no film. Report and continue. */
        this._emit('warning', 'Audio could not be rendered: ' + (e && e.message));
      }

      /* ---------------- 2. destination canvas ------------------------------ */
      const W = 1920, H = 1080;
      recCanvas = document.createElement('canvas');
      recCanvas.width = W; recCanvas.height = H;
      recCtx = recCanvas.getContext('2d');
      if (!recCtx) throw new Error('Could not create a 2D context for the encoder.');

      /* The renderer must draw at the export resolution, independent of how
         large the viewer's window happens to be. */
      const prevSize = renderer.getSize(new THREE.Vector2());
      const prevRatio = renderer.getPixelRatio();
      renderer.setPixelRatio(1);
      renderer.setSize(W, H, false);
      const prevAspect = camera.aspect;
      camera.aspect = W / H;
      camera.updateProjectionMatrix();

      /* ---------------- 3. encoders --------------------------------------- */
      const fpsNum = Math.round(fps);
      const muxer = new WebMMuxer.Muxer({
        target: new WebMMuxer.ArrayBufferTarget(),
        video: { codec: 'V_VP9', width: W, height: H, frameRate: fpsNum },
        audio: audioBuffer
          ? { codec: 'A_OPUS', numberOfChannels: 2, sampleRate: audioBuffer.sampleRate }
          : undefined,
        firstTimestampBehavior: 'offset',
      });

      let encodedError = null;
      const venc = new VideoEncoder({
        output: (chunk, meta) => { try { muxer.addVideoChunk(chunk, meta); } catch (e) { encodedError = e; } },
        error: (e) => { encodedError = e; },
      });
      venc.configure({
        codec: 'vp09.00.10.08',
        width: W, height: H,
        bitrate: 20000000,
        framerate: fpsNum,
        latencyMode: 'quality',
      });

      /* ---------------- 4. audio track ------------------------------------ */
      if (audioBuffer) {
        const aenc = new AudioEncoder({
          output: (chunk, meta) => { try { muxer.addAudioChunk(chunk, meta); } catch (e) { encodedError = e; } },
          error: (e) => { encodedError = e; },
        });
        aenc.configure({ codec: 'opus', numberOfChannels: 2, bitrate: 128000, sampleRate: audioBuffer.sampleRate });
        /* feed in ~1 s blocks so a long film does not need one giant AudioData */
        const SR = audioBuffer.sampleRate;
        const block = SR;
        const L = audioBuffer.getChannelData(0);
        const R = audioBuffer.numberOfChannels > 1 ? audioBuffer.getChannelData(1) : L;
        const totalFrames = audioBuffer.length;
        for (let off = 0; off < totalFrames; off += block) {
          const n = Math.min(block, totalFrames - off);
          const inter = new Float32Array(n * 2);
          for (let i = 0; i < n; i++) { inter[i * 2] = L[off + i]; inter[i * 2 + 1] = R[off + i]; }
          const ad = new AudioData({
            format: 'f32-planar',
            sampleRate: SR,
            numberOfFrames: n,
            numberOfChannels: 2,
            timestamp: Math.round((off / SR) * 1e6),
            data: (() => {
              /* planarity: channel 0 then channel 1 */
              const p2 = new Float32Array(n * 2);
              p2.set(L.subarray(off, off + n), 0);
              p2.set(R.subarray(off, off + n), n);
              return p2;
            })(),
          });
          aenc.encode(ad);
          ad.close();
        }
        await aenc.flush();
        aenc.close();
      }

      /* ---------------- 5. drive the film, frame by frame ------------------ */
      const total = Math.round(duration * fps);
      const dt = 1 / fps;
      const glc = renderer.domElement;
      const usec = 1e6;

      for (let f = 0; f < total; f++) {
        if (this.cancelled) throw new Error('Export cancelled.');
        if (encodedError) throw encodedError;

        const t = f * dt;
        const S = stateAt(t, camera.position);
        S.camPos = camera.position;
        S.t = t;
        drive(t, opts.W, S);
        sampleCamera(t, S);

        renderer.render(scene, camera);
        drawHUD(octx, ow, oh, S);

        /* composite the two canvases into the 1080p destination */
        recCtx.fillStyle = '#000';
        recCtx.fillRect(0, 0, W, H);
        recCtx.drawImage(glc, 0, 0, W, H);
        recCtx.drawImage(octx.canvas, 0, 0, W, H);

        const vf = new VideoFrame(recCanvas, {
          timestamp: Math.round(t * usec),
          duration: Math.round(dt * usec),
        });
        venc.encode(vf, { keyFrame: (f % (fpsNum * 2)) === 0 });
        vf.close();

        /* let the encoder drain so memory stays flat over 9,000 frames */
        if (venc.encodeQueueSize > 8) await new Promise((r) => setTimeout(r, 2));
        if ((f & 7) === 0) {
          onProgress(t, duration, 'video');
          await new Promise((r) => setTimeout(r, 0));
        }
      }

      onProgress(duration, duration, 'muxing');
      await venc.flush();
      venc.close();
      if (encodedError) throw encodedError;

      muxer.finalize();
      const blob = new Blob([muxer.target.buffer], { type: 'video/webm' });
      if (!blob.size) throw new Error('The encoder produced an empty file.');

      /* restore the live view */
      renderer.setPixelRatio(prevRatio);
      renderer.setSize(prevSize.x, prevSize.y, false);
      camera.aspect = prevAspect;
      camera.updateProjectionMatrix();

      onProgress(duration, duration, 'done');
      this.running = false;
      return blob;
    } catch (err) {
      this.running = false;
      throw err;
    }
  },

  /* --------------------------------------------------------------------------
     Offline audio. Every stem is placed at its authored cue time and summed into
     one stereo buffer. Rendering offline is deterministic and does not depend on
     the machine keeping up, which is exactly what a delivery file needs.
     -------------------------------------------------------------------------- */
  async _renderAudio(audio, duration) {
    if (!audio || !audio.manifest) return null;
    const AC = window.OfflineAudioContext || window.webkitOfflineAudioContext;
    if (!AC) throw new Error('OfflineAudioContext is unavailable.');

    const SR = 48000;
    const oc = new AC(2, Math.ceil(duration * SR), SR);

    /* decode the stem mp3s (already base64 in the manifest) */
    const decodeCtx = window.AudioContext ? new window.AudioContext() : null;
    const bufs = {};
    for (const name of Object.keys(audio.manifest)) {
      const b64 = audio.manifest[name];
      const bin = atob(String(b64).split(',')[1] || b64);
      const arr = new Uint8Array(bin.length);
      for (let i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
      const buf = await new Promise((res, rej) => {
        const p = oc.decodeAudioData(arr.buffer.slice(0), res, rej);
        if (p && p.then) p.then(res, rej);
      });
      bufs[name] = buf;
    }
    if (decodeCtx) { try { decodeCtx.close(); } catch (e) {} }

    const master = oc.createGain();
    master.gain.value = 1;
    master.connect(oc.destination);

    const cues = (audio.cues || []).filter((c) => c.kind === 'stem' && bufs[c.name]);
    for (const c of cues) {
      const src = oc.createBufferSource();
      src.buffer = bufs[c.name];
      const g = oc.createGain();
      g.gain.value = c.gain == null ? 1 : c.gain;
      src.connect(g);
      g.connect(master);
      const at = Math.max(0, c.t);
      if (at < duration) {
        try { src.start(at); } catch (e) {}
      }
    }

    const rendered = await oc.startRendering();
    return rendered;
  },
};
