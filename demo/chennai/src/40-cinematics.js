/* ============================================================================
   40-cinematics.js · the 150-second autonomous timeline
   ----------------------------------------------------------------------------
   24 shots across 5 acts, one continuous Catmull-Rom camera curve, no cuts and
   no OrbitControls. Every value below — camera, fog, rain, phone state, key
   presses, train positions, telemetry — is a pure function of the master clock.

   Audio cue times are measured against the real stem durations:
     vo-01 3.82 · vo-02 4.01 · vo-03 4.60 · vo-04 4.48 · vo-05 4.73
     vo-06 4.26 · vo-07 4.47 · vo-08 4.16 · vo-09 4.76 · vo-10 4.12
     vo-11 4.05 · vo-12 5.66 · vo-13 2.69 · ta-caller 5.28 · ta-agent 14.89
   ========================================================================== */

const DURATION = 150;

const ACTS = [
  { n: 1, t0: 0, t1: 30, name: 'THE DIGITAL DIVIDE AT STREET LEVEL' },
  { n: 2, t0: 30, t1: 60, name: 'CELLULAR INGESTION & 8kHz STREAMING' },
  { n: 3, t0: 60, t1: 90, name: 'DUAL-LANE 3D ROUTING & GRIEVANCE BRAIN' },
  { n: 4, t0: 90, t1: 120, name: 'DTMF KEYPAD "1" PRESS & 148-CHAR SMS' },
  { n: 5, t0: 120, t1: 150, name: 'REAL-WORLD IMPACT & CUMTA TELEMETRY' },
];
const actAt = (t) => { let i = 0; while (i < ACTS.length - 1 && t >= ACTS[i + 1].t0) i++; return ACTS[i]; };

/* -------------------------------- shot list ------------------------------- */
const SHOTS = [
  /* Boundaries sit on camera-key times, so the slate in the corner always
     names the move the audience is actually watching. */
  { t0: 0.0,   t1: 4.5,   act: 1, name: 'SH-01 · LOW-ANGLE PUDDLE DOLLY',      note: 'wet asphalt, sodium lamps in the mirror' },
  { t0: 4.5,   t1: 9.0,   act: 1, name: 'SH-02 · TRACKING THE CARRIAGEWAY',    note: 'the shelter enters frame' },
  { t0: 9.0,   t1: 13.0,  act: 1, name: 'SH-03 · CRANE PAST A PASSING BUS',    note: 'tyre spray, headlight cones' },
  { t0: 13.0,  t1: 17.0,  act: 1, name: 'SH-04 · DOLLY INTO THE SHELTER',      note: 'through the rain curtain' },
  { t0: 17.0,  t1: 21.0,  act: 1, name: 'SH-05 · THE ELDER ON THE BENCH',      note: 'no apps, no data, no signal anxiety' },
  { t0: 21.0,  t1: 25.0,  act: 1, name: 'SH-06 · ORBIT: APP FAILURE BANNERS',  note: '5,400+ CUMTA grievances on record' },
  { t0: 25.0,  t1: 30.0,  act: 1, name: 'SH-07 · PUSH IN ON THE HANDSET',      note: 'from street to silicon' },
  { t0: 30.0,  t1: 34.0,  act: 2, name: 'SH-08 · MACRO: THE GREEN CALL KEY',   note: 'rubber key, 1.9 mm of travel' },
  { t0: 34.0,  t1: 39.0,  act: 2, name: 'SH-09 · MACRO: 10-DIGIT DTMF DIAL',   note: '044 2479 4705' },
  { t0: 39.0,  t1: 46.5,  act: 2, name: 'SH-10 · ACOUSTIC RIPPLES AT 8 kHz',   note: 'the Tamil caller turn' },
  { t0: 46.5,  t1: 51.0,  act: 2, name: 'SH-11 · ARC OFF THE HANDSET',         note: 'the voice leaves the microphone' },
  { t0: 51.0,  t1: 57.5,  act: 2, name: 'SH-12 · SKYWARD ASCEND',              note: 'out through the shelter mouth' },
  { t0: 57.5,  t1: 63.5,  act: 2, name: 'SH-13 · LATTICE MAST → CLOUD NODE',   note: 'FastAPI telephony gateway' },
  { t0: 63.5,  t1: 67.0,  act: 3, name: 'SH-14 · GATEWAY PANEL + PCM SCOPE',   note: '8 kHz \u00b5-law, 20 ms frames' },
  { t0: 67.0,  t1: 73.0,  act: 3, name: 'SH-15 · SWING OUT TO BIRD\u2019S-EYE',note: 'the whole Poonamallee corridor' },
  { t0: 73.0,  t1: 78.5,  act: 3, name: 'SH-16 · GTFS CORRIDOR WIPE-ON',       note: 'Thandalam \u2192 Porur Roundtana' },
  { t0: 78.5,  t1: 83.5,  act: 3, name: 'SH-17 · LOW AERIAL CHASE, BUS 54',    note: '14 scheduled stops, feed-bound' },
  { t0: 83.5,  t1: 87.5,  act: 3, name: 'SH-18 · BANKING ORBIT AT PORUR',      note: 'metro viaduct crossing NH 48' },
  { t0: 87.5,  t1: 91.0,  act: 3, name: 'SH-19 · GRIEVANCE LANE BRANCHES',     note: 'deterministic depot queue' },
  { t0: 91.0,  t1: 95.5,  act: 4, name: 'SH-20 · CLIMB OUT, TURN FOR HOME',    note: 'Porur depot to the street' },
  { t0: 95.5,  t1: 99.0,  act: 4, name: 'SH-21 · DIVE FROM THE SKYLINE',       note: '260 m in three and a half seconds' },
  { t0: 99.0,  t1: 104.5, act: 4, name: 'SH-22 · INTO THE SHELTER MOUTH',      note: 'back down to the hands' },
  { t0: 104.5, t1: 108.5, act: 4, name: 'SH-23 · MACRO: KEY \u201c1\u201d DEPRESSES', note: '697 + 1209 Hz, in-band' },
  { t0: 108.5, t1: 112.5, act: 4, name: 'SH-24 · HANG-UP + HAPTIC PULSE',      note: 'the handset buzzes' },
  { t0: 112.5, t1: 116.0, act: 4, name: 'SH-25 · LCD BACKLIGHT RISES',         note: '1 new message' },
  { t0: 116.0, t1: 120.5, act: 4, name: 'SH-26 · PUSH IN: THE 148-CHAR SMS',   note: 'monochrome green, one segment' },
  { t0: 120.5, t1: 124.0, act: 5, name: 'SH-27 · PULL OUT: HEADLIGHTS IN RAIN',note: 'diesel on the audio bed' },
  { t0: 124.0, t1: 128.0, act: 5, name: 'SH-28 · BUS 54 BERTHS AT THE KERB',   note: 'air brakes, 0.43 m to the kerb face' },
  { t0: 128.0, t1: 132.0, act: 5, name: 'SH-29 · THE COMMUTER STEPS UP',       note: 'bench to kerb to doorway' },
  { t0: 132.0, t1: 136.0, act: 5, name: 'SH-30 · BUS DEPARTS, TYRE SPRAY',     note: 'east toward Porur' },
  { t0: 136.0, t1: 140.0, act: 5, name: 'SH-31 · CRANE UP INTO THE SUNSET',    note: 'the storm breaks over the Coromandel' },
  { t0: 140.0, t1: 144.5, act: 5, name: 'SH-32 · PANORAMA ACROSS CHENNAI',     note: 'metro, suburban rail, MRTS' },
  { t0: 144.5, t1: 147.5, act: 5, name: 'SH-33 · NAPIER BRIDGE + CENTRAL',     note: 'the Cooum, the clock tower, the sea' },
  { t0: 147.5, t1: 150.0, act: 5, name: 'SH-34 · TITLE CARD',                  note: 'CUMTA telemetry hold' },
];
const shotAt = (t) => { for (const s of SHOTS) if (t >= s.t0 && t < s.t1) return s; return SHOTS[SHOTS.length - 1]; };

/* ==========================================================================
   CAMERA TRACK — one continuous curve through 40 shot keys
   ========================================================================== */
function buildCameraTrack(PH) {
  const K = new CameraTrack();
  /* CameraTrack stores easing *functions*; the shot list is far more readable
     as names, so translate here rather than at every one of the 40 keys. */
  const k = (t, pos, target, fov, ease = 'cine', roll = 0) =>
    K.add({ t, pos: v3(pos[0], pos[1], pos[2]), target: v3(target[0], target[1], target[2]), fov,
            ease: typeof ease === 'function' ? ease : easeByName(ease), roll });

  /* Macro keys are authored against the handset, not against absolute world
     coordinates. `PH` holds the anchor world positions measured once, after the
     elder has been posed, so an ECU of a 10.7 mm key is framed exactly even
     though the hand it belongs to is never in the same place twice. At runtime
     the whole track is re-offset by (anchorNow - anchorHere) * followWeight. */
  const mk = (t, anchor, dir, dist, fov, ease = 'cine') => {
    const A = PH[anchor] || PH.centre;
    const d = v3(dir[0], dir[1], dir[2]).normalize().multiplyScalar(dist);
    k(t, [A.x + d.x, A.y + d.y, A.z + d.z], [A.x, A.y, A.z], fov, ease);
  };

  /* ---- ACT 1 : street level -------------------------------------------- */
  k(0.0, [-104, 0.40, 6.6], [-34, 0.62, 9.4], 60, 'linear');
  k(4.5, [-62, 0.52, 5.1], [-8, 1.00, 11.0], 56, 'glide');
  k(9.0, [-31, 1.62, 8.4], [3, 2.05, 14.4], 48, 'inOutCubic');
  k(13.0, [-12.5, 1.98, 12.2], [0.4, 1.58, 16.7], 44, 'glide');
  k(17.0, [-3.6, 1.66, 14.2], [0.22, 1.34, 17.2], 40, 'inOutSine');
  k(21.0, [3.1, 1.76, 13.5], [0.3, 1.30, 17.0], 42, 'glide');
  mk(25.0, 'centre', [0.52, 0.50, -0.69], 0.660, 33, 'inOutCubic');
  mk(30.0, 'centre', [0.30, 0.66, -0.69], 0.340, 26, 'glide');

  /* ---- ACT 2 : macro on the handset, then skyward ----------------------- */
  mk(32.0, 'keypad', [0.24, 0.70, -0.67], 0.245, 22, 'inOutSine');
  mk(36.0, 'keypad', [0.16, 0.74, -0.65], 0.235, 21, 'glide');
  mk(41.0, 'lcd',    [-0.22, 0.70, -0.68], 0.250, 22, 'inOutSine');
  mk(46.5, 'centre', [-0.46, 0.52, -0.72], 0.420, 30, 'inOutCubic');
  k(51.0, [2.20, 2.06, 13.05], [0.60, 2.35, 16.30], 40, 'inOutCubic');
  k(54.5, [8.20, 13.2, 7.40], [20.0, 28.0, 27.0], 48, 'inQuad');
  k(57.5, [17.5, 33.0, 22.0], [26.0, 46.0, 34.0], 44, 'glide');
  k(60.5, [21.5, 56.0, 18.0], [26.0, 78.0, 34.0], 42, 'outCubic');

  /* ---- ACT 3 : aerial routing ------------------------------------------ */
  /* One continuous arc: climb out west over Thandalam, round the western end
     of NH 48, then come back east low along the corridor behind Bus 54, bank
     through Porur Roundtana and pull up over the depot. Authored so every
     successive segment turns by less than 90 degrees -- a path that doubles
     back on itself makes the spline loop and the horizon strobe. */
  k(63.5, [24.0, 100.5, 6.0], [26.0, 98.0, 34.0], 38, 'inOutSine');
  k(67.0, [-120.0, 175.0, -150.0], [-150.0, 34.0, -70.0], 44, 'inOutCubic');
  k(70.0, [-300.0, 258.0, -215.0], [-300.0, 8.0, -50.0], 46, 'glide');
  k(73.0, [-455.0, 292.0, -120.0], [-320.0, 0.0, 30.0], 46, 'inOutSine');
  k(76.0, [-450.0, 232.0, 60.0], [-290.0, 0.0, 95.0], 44, 'glide');
  k(78.5, [-340.0, 152.0, 140.0], [-200.0, 2.0, 90.0], 42, 'inOutCubic');
  k(81.0, [-160.0, 84.0, 150.0], [-60.0, 2.0, 60.0], 40, 'glide');
  k(83.5, [30.0, 48.0, 110.0], [150.0, 3.0, 18.0], 40, 'glide');
  k(86.0, [220.0, 40.0, 66.0], [340.0, 4.0, -14.0], 38, 'inOutSine');
  /* Spaced so that no segment covers more than ~2.5x the distance of its
     neighbour per second: a fast move that arrives and settles reads as
     cinematography, the same distance covered in a third of the time reads as
     a lurch, because the spline's peak speed is bounded by 3x its chord. */
  k(87.5, [330.0, 44.0, 20.0], [395.0, 6.0, 40.0], 38, 'glide');
  k(89.5, [400.0, 82.0, 95.0], [390.0, 9.0, 115.0], 40, 'inOutSine');
  k(91.0, [455.0, 158.0, 232.0], [345.0, 12.0, 215.0], 44, 'outCubic');

  /* ---- ACT 4 : climb out over Porur, then dive back into the hands ------ */
  k(93.5, [240.0, 300.0, 250.0], [120.0, 30.0, 120.0], 46, 'inOutCubic');
  k(95.5, [46.0, 260.0, 200.0], [8.0, 10.0, 44.0], 44, 'inQuad');
  k(99.0, [12.0, 26.0, 7.0], [2.0, 3.0, 16.0], 38, 'glide');
  k(101.5, [1.70, 2.02, 13.20], [0.40, 1.40, 16.60], 32, 'outCubic');
  mk(102.8, 'centre', [0.34, 0.62, -0.71], 0.300, 26, 'inOutCubic');
  mk(104.5, 'key1',   [-0.12, 0.76, -0.64], 0.058, 20, 'inOutCubic');
  mk(108.5, 'key1',   [-0.06, 0.80, -0.60], 0.052, 19, 'glide');
  mk(112.5, 'lcd',    [0.10, 0.76, -0.64], 0.165, 21, 'inOutSine');
  mk(116.0, 'lcd',    [0.14, 0.74, -0.66], 0.138, 20, 'glide');
  mk(120.5, 'lcd',    [0.16, 0.72, -0.67], 0.142, 19, 'inOutSine');

  /* ---- ACT 5 : the bus, then the panorama ------------------------------- */
  k(124.0, [1.40, 1.44, 14.60], [2.8, 1.58, 11.4], 36, 'outCubic');
  k(128.0, [7.4, 1.90, 15.10], [1.6, 1.72, 9.6], 40, 'glide');
  k(132.0, [3.05, 1.32, 13.05], [-0.4, 1.18, 9.2], 34, 'inOutSine');
  k(136.0, [-7.0, 3.60, 13.80], [7.0, 2.70, 9.4], 42, 'inOutCubic');
  k(140.0, [-16.0, 34.0, 42.0], [-900.0, 58.0, 500.0], 48, 'outCubic');
  k(144.5, [190.0, 168.0, 150.0], [940.0, 72.0, -270.0], 45, 'glide');
  k(147.5, [560.0, 282.0, 208.0], [1720.0, 92.0, -500.0], 42, 'inOutSine');
  k(150.0, [800.0, 342.0, 248.0], [1960.0, 104.0, -560.0], 40, 'linear');

  return K;
}

/* ==========================================================================
   AUDIO CUE SHEET
   ========================================================================== */
const DIAL_DIGITS = '04424794705';
const DIAL_T0 = 34.0, DIAL_STEP = 0.42;
const CALL_KEY_T = 32.4, DIALTONE_T = 33.1, CONNECT_T = 40.9;
const CALLER_T = 41.5, CALLER_DUR = 5.28;
const AGENT_T = 76.4, AGENT_DUR = 14.89;
const KEY1_T = 104.6, HANGUP_T = 108.4, VIBRATE_T = 109.6, SMS_T = 112.2;
const BUS_ARRIVE_T0 = 118.0, BUS_BERTH_T = 125.4, DOOR_OPEN_T = 126.2;
const STAND_T0 = 126.4, STAND_T1 = 127.4;
const WALK_T0 = 127.4, WALK_T1 = 131.2, STEP_T0 = 131.2, STEP_T1 = 133.0;
const DOOR_CLOSE_T = 133.4, BUS_DEPART_T = 134.2;

const CUES = [];
const cue = (t, kind, data) => CUES.push(Object.assign({ t, kind }, data));
/* narration */
[[1.8, 'vo-01'], [7.4, 'vo-02'], [13.2, 'vo-03'], [30.6, 'vo-04'], [48.2, 'vo-05'],
 [60.8, 'vo-06'], [66.0, 'vo-07'], [71.4, 'vo-08'], [99.4, 'vo-09'], [106.6, 'vo-10'],
 [121.2, 'vo-11'], [127.0, 'vo-12'], [143.2, 'vo-13']].forEach(([t, n]) => cue(t, 'stem', { name: n }));
/* the two Tamil call turns, band-limited through the handset earpiece */
cue(CALLER_T, 'stem', { name: 'ta-caller', phone: true, gain: 1.25 });
cue(AGENT_T, 'stem', { name: 'ta-agent', phone: true, gain: 1.25 });
/* foley */
cue(0.6, 'thunder', { level: 0.30 });
cue(24.0, 'thunder', { level: 0.18 });
cue(9.4, 'whoosh', { level: 0.14, dur: 1.1 });
cue(CALL_KEY_T, 'keyClick', { level: 0.62 });
cue(CALL_KEY_T, 'lineClick', { level: 0.16 });
cue(DIALTONE_T, 'dialTone', { dur: 0.85, level: 0.09 });
for (let i = 0; i < DIAL_DIGITS.length; i++) {
  cue(DIAL_T0 + i * DIAL_STEP, 'dtmf', { digit: DIAL_DIGITS[i], dur: 0.15, level: 0.30 });
  cue(DIAL_T0 + i * DIAL_STEP, 'keyClick', { level: 0.44 });
}
cue(CONNECT_T, 'lineClick', { level: 0.22 });
cue(CONNECT_T + 0.05, 'blip', { freq: 1560, level: 0.07 });
cue(50.6, 'whoosh', { level: 0.20, dur: 1.6 });
cue(57.2, 'blip', { freq: 1180, level: 0.10 });
cue(60.4, 'blip', { freq: 1760, level: 0.11 });
cue(63.4, 'blip', { freq: 2090, level: 0.10 });
cue(73.2, 'whoosh', { level: 0.18, dur: 1.4 });
cue(76.2, 'blip', { freq: 880, level: 0.09 });
cue(87.2, 'blip', { freq: 660, level: 0.10 });
cue(88.0, 'blip', { freq: 990, level: 0.10 });
cue(91.4, 'whoosh', { level: 0.22, dur: 2.0, up: false });
cue(KEY1_T, 'dtmf', { digit: '1', dur: 0.20, level: 0.40 });
cue(KEY1_T, 'keyClick', { level: 0.66 });
cue(HANGUP_T, 'lineClick', { level: 0.24, down: true });
cue(HANGUP_T + 0.02, 'keyClick', { level: 0.5 });
cue(VIBRATE_T, 'vibrate', { level: 0.40 });
cue(SMS_T, 'smsBeep', { level: 0.30 });
cue(SMS_T + 0.32, 'blip', { freq: 1320, level: 0.08 });
cue(BUS_ARRIVE_T0 + 1.0, 'horn', { level: 0.16, dur: 0.45 });
cue(BUS_BERTH_T - 0.9, 'airBrake', { level: 0.30 });
cue(BUS_BERTH_T, 'thud', { level: 0.22, freq: 96 });
cue(DOOR_OPEN_T, 'airBrake', { level: 0.16 });
cue(STEP_T0 + 0.1, 'thud', { level: 0.20, freq: 150 });
cue(STEP_T0 + 0.9, 'thud', { level: 0.18, freq: 150 });
cue(DOOR_CLOSE_T, 'thud', { level: 0.26, freq: 110 });
cue(BUS_DEPART_T + 0.4, 'airBrake', { level: 0.14 });
cue(BUS_DEPART_T + 1.2, 'horn', { level: 0.13, dur: 0.35 });
cue(140.2, 'thunder', { level: 0.10 });
CUES.sort((a, b) => a.t - b.t);

/* ==========================================================================
   CAPTIONS (Indian-English narration) and SUBTITLES (Tamil dialogue)
   ========================================================================== */
const CAPTIONS = [
  [1.8, 5.7, 'Chennai. Seven in the evening. The rain has been falling since four, and Poonamallee High Road has turned into a mirror.'],
  [7.4, 11.5, 'Five thousand four hundred CUMTA grievances. Payment deducted, no ticket. QR scanner expired. Network timeout.'],
  [13.2, 17.9, 'On this stone bench, a man with a two hundred rupee keypad phone. No apps. No internet. No data. Just a voice, and a number.'],
  [30.6, 35.2, 'He presses the green call key. Ten digits. And the call is answered in eight kilohertz — the narrow band of ordinary telephony.'],
  [48.2, 53.0, 'The voice climbs up through the rain, into the tower, and onto a FastAPI gateway streaming raw PCM. No app store. No data plan.'],
  [60.8, 65.2, 'Two lanes open across the city\u2019s road graph. Lane one is the timetable: GTFS scheduled services, read straight from the depot.'],
  [66.0, 70.6, 'Bus fifty four, and fifty four E. Thirty five minutes to Porur. Headway, eight to ten minutes. Nothing invented. Nothing hallucinated.'],
  [71.4, 75.7, 'Lane two is the grievance brain. A skipped stop, a deducted fare — logged deterministically to a depot queue, with a reference number.'],
  [99.4, 104.3, 'One key. In-band DTMF. The tone travels back down the very same call. No touchscreen. No confirmation dialog. No data.'],
  [106.6, 110.8, 'The call ends. The handset vibrates. And one hundred and forty eight characters of plain text arrive on a monochrome green screen.'],
  [121.2, 125.4, 'Route fifty four rolls into the shelter curb. He steps up safely. No QR code. No wallet. No waiting for a signal.'],
  [127.0, 132.8, 'Twelve thousand four hundred and eighty inbound calls. Fifty eight percent Tanglish. Thirty percent Madras bashai. Twelve percent formal Tamil. Ninety nine point two percent of SMS delivered.'],
  [143.2, 146.0, 'Chennai Mobility AI. Every commuter. Every bus. Any phone.'],
];
const SUBTITLES = [
  {
    t0: CALLER_T, t1: CALLER_T + CALLER_DUR + 0.6, who: 'COMMUTER · ON CALL',
    ta: 'தலைவா, சைமாட்ஸ் ஹைவே கிட்ட நிக்கிறேன் பா. போரூர் ரவுண்டானா போகணும்.',
    tr: 'Boss, I\u2019m standing near SIMATS Highway. I need to get to Porur Roundtana.',
  },
  {
    t0: AGENT_T, t1: AGENT_T + AGENT_DUR + 0.6, who: 'CUMTA HELPLINE AGENT · 044 2479 4705',
    ta: 'சைமாட்ஸ்-ல 54 இல்ல 54E பஸ் எடுங்க. 35 நிமிஷத்துல போரூர் போயிடலாம். ரூட் விவரம் SMS அனுப்பவா? கீபேட்-ல 1 அமுக்குங்க.',
    tr: 'Take bus 54 or 54E from SIMATS. You can reach Porur in 35 minutes. Shall I SMS the route details? Press 1 on the keypad.',
  },
];

/* ==========================================================================
   PURE STATE — everything the HUD, the audio mix and the world need at time t
   ========================================================================== */
function stateAt(t, camPos) {
  const act = actAt(t), shot = shotAt(t);
  const s = {
    t, act, actName: act.name, actN: act.n, shot: shot.name, shotNote: shot.note,
    camPos: camPos || null,

    /* --- environment: the storm breaks for the golden-hour finale --- */
    night: 1 - segE(t, 134, 148, EASE.inOutSine),
    rain: (1 - segE(t, 130, 146, EASE.inOutCubic)) * (0.55 + 0.45 * (1 - segE(t, 51, 62, EASE.inOutSine))),
    rainClose: 1 - segE(t, 50, 60, EASE.inOutSine),
    fogDensity: lerp(0.0125, 0.00042, segE(t, 52, 74, EASE.inOutCubic)) * lerp(1, 0.5, segE(t, 134, 148, EASE.inOutSine)),
    haze: segE(t, 58, 72, EASE.inOutCubic) * (1 - segE(t, 128, 140, EASE.inOutSine) * 0.55),
    reflAmt: (1 - segE(t, 48, 60, EASE.inOutCubic)) * (0.25 + 0.75 * (1 - segE(t, 120, 126, EASE.inOutSine))) + segE(t, 126, 133, EASE.inOutSine) * 0.75 * (1 - segE(t, 137, 146, EASE.inOutCubic)),
    wet: lerp(1.25, 0.42, segE(t, 136, 150, EASE.inOutSine)),
    lampDim: 1 - segE(t, 138, 150, EASE.inOutSine) * 0.55,

    /* --- narrative layers --- */
    banners: window01(t, 18.5, 30.5, 2.6, 2.0) * 0.92,
    bannerCounter: window01(t, 21.5, 29.0, 1.6, 1.8),
    ripples: window01(t, 39.0, 52.0, 1.6, 2.4),
    column: segE(t, 49.0, 53.0, EASE.inOutCubic) * (1 - segE(t, 58.5, 61.5, EASE.inOutSine)),
    towerWave: window01(t, 52.0, 63.0, 1.8, 2.0),
    cloud: window01(t, 58.0, 96.0, 3.0, 4.0),
    cloudPanel: window01(t, 61.5, 92.0, 2.2, 3.0),
    route: segE(t, 68.0, 74.5, EASE.inOutCubic) * (1 - segE(t, 92.0, 96.0, EASE.inOutCubic)),
    routeHead: segE(t, 68.0, 76.0, EASE.inOutCubic),
    routeBus: window01(t, 74.0, 92.0, 1.6, 1.8),
    grievance: window01(t, 79.5, 94.0, 2.4, 2.2),
    ticketFlow: seg(t, 81.0, 90.0),

    /* --- city systems: always alive, but only lit up when the film looks --- */
    /* the wide city only has to exist once the camera has left the street:
       at street level FogExp2(0.0125) already hides everything past ~240 m,
       so switching it on mid-ascent is invisible and saves a lot of fill. */
    cityVisible: segE(t, 44, 56, EASE.inOutCubic),

    /* --- camera lock-on for the macro shots --- */
    /* Macro shots lock the camera onto the moving subject instead of a fixed
       point in space, so breathing and hand tremor never break the framing. */
    followWeight: Math.max(
      segE(t, 22.0, 26.0, EASE.inOutCubic) * (1 - segE(t, 49.0, 52.0, EASE.inOutCubic)),
      segE(t, 99.0, 103.0, EASE.inOutCubic) * (1 - segE(t, 121.5, 124.0, EASE.inOutCubic))
    ),
    followKey: 'phone',

    /* --- call state --- */
    onCall: t >= CONNECT_T && t < HANGUP_T,
    dialing: t >= CALL_KEY_T && t < CONNECT_T,
    dialCount: clamp(Math.floor((t - DIAL_T0) / DIAL_STEP) + 1, 0, DIAL_DIGITS.length),

    /* --- audio mix helpers --- */
    duck: (t > CALLER_T - 0.4 && t < CALLER_T + CALLER_DUR + 0.8) ? 0.30
      : (t > AGENT_T - 0.4 && t < AGENT_T + AGENT_DUR + 0.8) ? 0.30 : 1.0,
    camY: camPos ? camPos.y : 1.5,
    closeToGround: camPos ? 1 - clamp01(camPos.y / 4) : 0.4,
    nearRoof: 0,

    /* --- framing --- */
    /* 2.39:1 bars open out for the macro acts and close in for the panorama */
    letterbox: lerp(0.30, 0.62, Math.max(
      window01(t, 24.0, 52.0, 3.0, 3.0),
      window01(t, 95.0, 125.0, 4.0, 3.0))),
    titleCard: segE(t, 141.5, 145.0, EASE.outCubic),
    hudTech: window01(t, 2.0, 138.0, 2.0, 3.0),
    hudTele: segE(t, 128.0, 133.0, EASE.outCubic) * (1 - segE(t, 148.5, 150, EASE.inOutSine) * 0.0),
  };

  /* --- diesel: the hero bus, and the corridor bus in the aerial act --- */
  const bx = busX(t);
  const dShelter = 1 - clamp01(Math.abs(bx - L.busStopX) / 90);
  s.diesel = clamp01(Math.max(window01(t, BUS_ARRIVE_T0, BUS_DEPART_T + 8, 1.4, 3.0) * dShelter * 1.25,
    window01(t, 74, 92, 2, 2) * 0.42));
  s.dieselRPM = t < BUS_BERTH_T ? lerp(74, 41, segE(t, BUS_ARRIVE_T0, BUS_BERTH_T, EASE.outQuart))
    : t < BUS_DEPART_T ? 38 + Math.sin(t * 2.2) * 2.5
      : lerp(41, 88, segE(t, BUS_DEPART_T, BUS_DEPART_T + 5, EASE.inOutCubic));
  s.busSpeed = t < BUS_BERTH_T ? lerp(17, 0, segE(t, BUS_ARRIVE_T0, BUS_BERTH_T, EASE.outQuart))
    : t < BUS_DEPART_T ? 0 : lerp(0, 15, segE(t, BUS_DEPART_T, BUS_DEPART_T + 6, EASE.inOutCubic));

  /* --- phone screen state machine --- */
  if (t < CALL_KEY_T) s.screen = { name: 'idle', backlight: 0.30 + 0.10 * Math.sin(t * 0.8) };
  else if (t < DIAL_T0) s.screen = { name: 'idle', backlight: 0.85 };
  else if (t < CONNECT_T - 0.4) s.screen = { name: 'dial', arg: DIAL_DIGITS.slice(0, s.dialCount), backlight: 1.0 };
  else if (t < CONNECT_T + 0.2) s.screen = { name: 'calling', backlight: 1.0 };
  else if (t < HANGUP_T) s.screen = { name: 'incall', arg: t - CONNECT_T, backlight: 1.0 };
  else if (t < VIBRATE_T) s.screen = { name: 'endcall', arg: HANGUP_T - CONNECT_T, backlight: 0.95 };
  else if (t < SMS_T) s.screen = { name: 'idle', backlight: 0.45 };
  else if (t < SMS_T + 1.0) s.screen = { name: 'smsAlert', backlight: 1.0 };
  else s.screen = { name: 'sms', arg: seg(t, SMS_T + 0.9, SMS_T + 7.5) * (PHONE.SMS_LEN + 1), backlight: 1.0 };
  s.smsReveal = t >= SMS_T + 0.9 ? seg(t, SMS_T + 0.9, SMS_T + 7.5) : 0;

  /* --- telemetry, all counting up on the clock --- */
  const tele = segE(t, 126, 143, EASE.inOutCubic);
  s.hud = {
    calls: Math.round(12480 * tele),
    callsTarget: 12480,
    tanglish: 58 * tele, madras: 30 * tele, formal: 12 * tele,
    sms: (99.2 * tele).toFixed(1),
    grievances: Math.round(5400 * window01(t, 20, 27, 2.0, 1.6)),
    latency: t > 60 ? Math.round(380 + 60 * Math.abs(Math.sin(t * 1.7))) : 0,
    asr: t > 60 ? (0.90 + 0.07 * Math.abs(Math.sin(t * 1.1))).toFixed(2) : '—',
    pcm: t > 55 ? '8 kHz μ-law' : '—',
    dtmf: t > KEY1_T - 1.4 && t < KEY1_T + 1.6 ? '697 + 1209 Hz' : (s.dialing ? 'DTMF IN-BAND' : '—'),
    gtfs: t > 66 ? 'FEED OK · 0 HALLUC' : '—',
    smsSeg: t > SMS_T ? '148 / 160 · SEG 1' : '—',
    mode: t < CALL_KEY_T ? 'IDLE · NO DATA' : s.onCall ? 'CALL ACTIVE · 8 kHz' : t < SMS_T ? 'DTMF CONFIRM' : 'SMS DELIVERED',
  };
  return s;
}

/* ==========================================================================
   HERO BUS choreography — eases in from the west and berths at the kerb
   ========================================================================== */
function busX(t) {
  if (t < BUS_ARRIVE_T0) return -170;
  if (t < BUS_BERTH_T) return lerp(-170, L.busStopX, EASE.outQuart(seg(t, BUS_ARRIVE_T0, BUS_BERTH_T)));
  if (t < BUS_DEPART_T) return L.busStopX;
  return L.busStopX + EASE.inOutCubic(clamp01((t - BUS_DEPART_T) / 16)) * 300;
}

/* ------------------------------- key presses ------------------------------ */
/** A mechanical key travel envelope: 55 ms down, hold, 70 ms release. */
function pressEnv(t, t0, dur = 0.19) {
  const u = (t - t0) / dur;
  if (u < 0 || u > 1) return 0;
  return u < 0.3 ? EASE.outCubic(u / 0.3) : u < 0.55 ? 1 : 1 - EASE.inCubic((u - 0.55) / 0.45);
}
function keyPresses(t) {
  const out = {};
  const add = (name, k) => { if (k > 0.001) out[name] = Math.max(out[name] || 0, k); };
  add('call', pressEnv(t, CALL_KEY_T, 0.20));
  for (let i = 0; i < DIAL_DIGITS.length; i++) {
    add(DIAL_DIGITS[i], pressEnv(t, DIAL_T0 + i * DIAL_STEP, 0.17));
  }
  add('1', pressEnv(t, KEY1_T, 0.24));
  add('end', pressEnv(t, HANGUP_T, 0.20));
  /* idle thumb resting pressure so the macro never looks frozen */
  return out;
}

/* ==========================================================================
   DRIVE — mutate the world for time t. Pure given (t, W, S).
   ========================================================================== */
const _tmpV = v3(), _tmpV2 = v3(), _tmpV3 = v3();
const _tmpQ = new THREE.Quaternion(), _tmpQ2 = new THREE.Quaternion();
const _tmpE = new THREE.Euler();

function drive(t, W, S) {
  /* ------------------------------- environment --------------------------- */
  U.time.value = t;
  U.night.value = S.night;
  U.reflAmt.value = clamp01(S.reflAmt);
  U.wetBoost.value = S.wet;
  U.rippleAmp.value = 0.35 + 0.65 * S.rain;
  U.camY.value = S.camY;

  if (W.sky) {
    const su = W.sky.material.uniforms;
    su.uNight.value = S.night;
    su.uCloud.value = lerp(0.62, 0.30, 1 - S.night);
    su.uStars.value = S.night * (1 - segE(t, 138, 150, EASE.inOutSine));
    /* the sun drops toward the west-north-west as the storm breaks */
    const sunAz = lerp(-0.35, 0.10, segE(t, 132, 150, EASE.inOutSine));
    su.uSunDir.value.set(-0.88, lerp(0.02, 0.13, segE(t, 134, 150, EASE.inOutSine)), 0.47 + sunAz).normalize();
    U.sunDir.value.copy(su.uSunDir.value);
  }
  if (W.rain) {
    const cp = S.camPos || _tmpV.set(0, 1.5, 12);
    W.rain.group.position.set(cp.x, 0, cp.z);
    W.rain.rain.position.y = clamp(cp.y - 20, -8, 460);
    W.rain.mat.uniforms.uDensity.value = S.rain;
    W.rain.mat.uniforms.uOpacity.value = 0.30 + 0.34 * S.rainClose;
    W.rain.smat.uniforms.uDensity.value = S.rain * S.rainClose;
    W.rain.mat.uniforms.uWind.value.set(1.5 + Math.sin(t * 0.21) * 0.9, 0.35 + Math.cos(t * 0.17) * 0.25);
  }
  if (W.haze) {
    W.haze.amount.value = S.haze;
    W.haze.mat.uniforms.uCam.value.copy(S.camPos || _tmpV.set(0, 0, 0));
    if (W.haze.mat2 && W.haze.mat2.uniforms.uCam) W.haze.mat2.uniforms.uCam.value.copy(S.camPos || _tmpV);
  }

  /* streetlamps: sodium flicker, then dimming for golden hour */
  if (W.lamps) for (let i = 0; i < W.lamps.length; i++) {
    const lm = W.lamps[i], u = lm.userData;
    const fl = 0.94 + 0.06 * Math.sin(t * (7.3 + i) + i * 2.1) + (hash2(Math.floor(t * 9), i) > 0.985 ? -0.28 : 0);
    const k = fl * S.lampDim;
    /* Every one of these is optional: distant lamps carry no real light, and
       a merged head may carry fewer pieces. Animating what exists is enough. */
    if (u.light) u.light.intensity = 620 * k;
    if (u.glow) u.glow.material.opacity = 0.85 * k;
    if (u.glow2) u.glow2.material.opacity = 0.30 * k;
    if (u.lens) u.lens.material.emissiveIntensity = 5.2 * k;
    if (u.cone) u.cone.material.uniforms.uOpacity.value = 0.30 * k * (0.4 + 0.6 * S.rain);
  }
  if (W.pools) for (const p of W.pools) p.material.opacity = 0.5 * S.lampDim * (0.5 + 0.5 * S.night);
  if (W.teaKadai) {
    const u = W.teaKadai.userData;
    const fl = 0.92 + 0.08 * Math.sin(t * 9.1);
    u.light.intensity = 110 * fl * S.lampDim;
    u.bulb.material.emissiveIntensity = 6 * fl * S.lampDim;
    u.steam.material.uniforms.uTime.value = t;
  }
  if (W.signal) {
    /* the junction cycles: red for the shelter side while the bus approaches */
    const phase = (t * 0.075) % 1;
    const on = phase < 0.45 ? 2 : phase < 0.55 ? 1 : 0;
    W.signal.userData.lamps.forEach((lm, i) => {
      lm.material.emissiveIntensity = i === on ? 4.2 : 0.12;
      if (lm.userData.glow) lm.userData.glow.material.opacity = i === on ? 0.7 : 0.05;
    });
  }

  /* --------------------------------- cast -------------------------------- */
  const presses = keyPresses(t);
  const thumbPress = Math.max(presses.call || 0, presses['1'] || 0, presses.end || 0,
    DIAL_DIGITS.split('').reduce((m, d) => Math.max(m, presses[d] || 0), 0));

  const e = W.elder;
  if (e) {
    const R = e.root;
    R.visible = true;
    if (t < STAND_T0) {
      /* Seated on the stone bench. The rig's nose is local -Z, so yaw ~0 faces
         the road and the camera; yaw PI would have shown his back all film. */
      poseSit(e, t, {
        holdPhone: true, thumbPress,
        headDown: lerp(0.24, 0.46, segE(t, 28, 34, EASE.inOutSine)),
        headYaw: Math.sin(t * 0.21) * 0.10,
        lean: 0.10 + 0.07 * segE(t, 30, 42, EASE.inOutSine),
      });
      /* micro-tremor: at 58 mm of working distance, stillness reads as a still */
      R.position.set(L.benchX + Math.sin(t * 1.9) * 0.0016 + Math.sin(t * 5.3) * 0.0007,
                     0.685 + Math.sin(t * 1.25) * 0.0022, L.benchZ - 0.20);
      R.rotation.y = 0.12;
    } else if (t < STEP_T1 + 0.3) {
      const stand = segE(t, STAND_T0, STAND_T1, EASE.inOutCubic);
      const walkU = EASE.inOutSine(seg(t, WALK_T0, WALK_T1));
      const stepU = seg(t, STEP_T0, STEP_T1);
      if (stand < 0.999) {
        poseSit(e, t, { holdPhone: true, thumbPress: 0 });
        blendPose(e, stand);
        R.position.set(L.benchX, lerp(0.685, 0.16, stand), L.benchZ - 0.20);
        R.rotation.y = lerp(0.12, 0.34, stand);
      } else if (stepU <= 0.001) {
        poseWalk(e, t, 1.05);
        const p = W.walkCurve.getPointAt(walkU), tg = W.walkCurve.getTangentAt(walkU);
        R.position.copy(p);
        /* nose is -Z, so aim it at the tangent with atan2(-x, -z) */
        R.rotation.y = Math.atan2(-tg.x, -tg.z);
      } else {
        poseStepUp(e, stepU);
        const pEnd = W.walkCurve.getPointAt(1);
        R.position.set(pEnd.x, pEnd.y + stepU * (W.busFloor || 0.72), pEnd.z);
        R.rotation.y = 0.15;                        // square to the doorway
      }
    } else {
      R.visible = false;                            // aboard; the bus hides him
    }
    R.updateMatrixWorld(true);
  }

  /* The handset is held screen-up, tilted back ~44 degrees toward the reader --
     which happens to be exactly the angle every macro key is framed from. The
     orientation is set in world space so the hand rig's own roll never turns
     the screen away from the lens. */
  if (W.phoneAnchor) {
    _tmpQ.setFromEuler(_tmpE.set(0.775, 0.10, 0.0, 'XYZ'));
    W.phoneAnchor.parent.getWorldQuaternion(_tmpQ2).invert();
    W.phoneAnchor.quaternion.copy(_tmpQ2.multiply(_tmpQ));
  }

  if (W.phones) for (const p of W.phones) {
    posePhone(p.rig, t + p.phase, 1);
    if (p.screen) p.screen.material.opacity = 0.9;
  }
  if (W.crowdRigs) for (const c of W.crowdRigs) poseStand(c.rig, t + c.phase, 0.7);

  /* -------------------------------- handset ------------------------------ */
  if (W.phone) {
    const pd = W.phone.userData;
    pd.setBacklight(S.screen.backlight);
    pd.setState(S.screen.name, S.screen.arg);
    for (const name of Object.keys(pd.keys)) pd.press(name, 0);
    for (const name of Object.keys(presses)) pd.press(name, presses[name]);
    /* haptic pulse: the whole handset buzzes on the SMS */
    const vib = window01(t, VIBRATE_T, VIBRATE_T + 0.42, 0.05, 0.18);
    if (vib > 0) {
      const a = vib * 0.0016;
      W.phone.position.x = (W.phone.userData.homeX || 0) + Math.sin(t * 145) * a;
      W.phone.position.y = (W.phone.userData.homeY || 0) + Math.cos(t * 131) * a * 0.7;
      W.phone.rotation.z = (W.phone.userData.homeRZ || 0) + Math.sin(t * 152) * a * 1.4;
    } else if (W.phone.userData.homeX != null) {
      W.phone.position.x = W.phone.userData.homeX;
      W.phone.position.y = W.phone.userData.homeY;
      W.phone.rotation.z = W.phone.userData.homeRZ;
    }
  }

  /* --------------------------- glitch banners ---------------------------- */
  if (W.banners) {
    const camDir = S.camPos ? S.camPos : _tmpV.set(0, 1.5, 12);
    W.banners.banners.forEach((b, i) => {
      const show = S.banners > 0.01;
      b.mesh.visible = show;
      if (!show) return;
      const stagger = clamp01((S.banners - i * 0.055) / 0.5);
      b.mat.uniforms.uAmt.value = stagger * (0.55 + 0.45 * Math.sin(t * 1.3 + i));
      const a = t * 0.16 + (i / W.banners.banners.length) * TAU;
      const rr = 3.1 + Math.sin(i * 2.3) * 0.8;
      b.mesh.position.set(
        L.shelterX + Math.cos(a) * rr,
        1.42 + Math.sin(t * 0.7 + i * 1.9) * 0.34 + (i % 3) * 0.42,
        L.shelterZ - 1.2 + Math.sin(a) * rr * 0.72
      );
      b.mesh.lookAt(camDir.x, b.mesh.position.y, camDir.z);
      b.mesh.rotateY(PI);
      const sc = 0.86 + stagger * 0.2 + Math.sin(t * 2.2 + i) * 0.012;
      b.mesh.scale.setScalar(sc);
    });
    if (W.banners.counter) {
      W.banners.counter.visible = S.bannerCounter > 0.01;
      W.banners.counter.material.opacity = S.bannerCounter;
      W.banners.counter.position.set(L.shelterX - 0.2, 2.62, L.shelterZ - 2.9);
      W.banners.counter.lookAt(camDir.x, 2.62, camDir.z);
      W.banners.counter.rotateY(PI);
    }
  }

  /* -------------------------- acoustic ripples --------------------------- */
  if (W.ripples && W.phone) {
    const src = W.phone.getWorldPosition(_tmpV2);
    const amt = S.ripples;
    W.ripples.rings.forEach((r, i) => {
      const on = amt > 0.01;
      r.mesh.visible = on;
      if (!on) return;
      const period = 1.15;
      const ph = ((t * 1.0 + i * (period / W.ripples.rings.length)) % period) / period;
      const rad = 0.06 + ph * 2.6;
      r.mesh.position.copy(src);
      r.mesh.scale.setScalar(rad);
      r.mesh.lookAt(camDirOf(S));
      r.mat.uniforms.uP.value = ph;
      r.mat.uniforms.uAmt.value = amt * (1 - ph * 0.55);
    });
    const col = W.ripples.column;
    if (col) {
      const on = S.column > 0.01;
      col.visible = on;
      if (on) {
        const topY = 46;
        const h = lerp(6, topY - src.y, segE(t, 50.5, 57.5, EASE.inOutCubic));
        col.scale.set(1, h, 1);
        col.position.set(src.x, src.y + h / 2, src.z);
        col.material.uniforms.uAmt.value = S.column;
      }
    }
  }

  /* ------------------------------ cellular mast -------------------------- */
  if (W.tower) {
    const u = W.tower.userData;
    u.beacons.forEach((b, i) => {
      const on = (Math.sin(t * 2.4 + i * 1.1) > 0.2) ? 1 : 0.08;
      b.mesh.material.emissiveIntensity = 4 * on;
      b.glow.material.opacity = 0.8 * on;
    });
    u.waves.forEach((w, i) => {
      const on = S.towerWave > 0.01;
      w.visible = on;
      if (!on) return;
      const period = 2.6;
      const ph = ((t * 1 + i * (period / u.waves.length)) % period) / period;
      w.scale.setScalar(2 + ph * 46);
      w.material.uniforms.uP.value = ph;
      w.material.uniforms.uAmt.value = S.towerWave;
    });
  }

  /* ------------------------------ cloud gateway -------------------------- */
  if (W.cloud) {
    const u = W.cloud.userData;
    const amt = S.cloud;
    u.panel.material.opacity = S.cloudPanel * 0.96;
    u.scope.material.opacity = S.cloudPanel * 0.94;
    u.shell.material.uniforms.uAmt.value = amt * 0.8;
    u.beamMat.uniforms.uAmt.value = amt * (S.onCall ? 1 : 0.25);
    u.motes.material.uniforms.uAmt.value = amt;
    u.rings.forEach((r, i) => {
      r.material.opacity = (0.42 - i * 0.1) * amt;
      r.rotation.y = t * (0.06 + i * 0.03);
    });
    u.racks.forEach((rk, i) => {
      rk.rotation.y = rk.userData.a0 + Math.sin(t * 0.2 + i) * 0.05;
      for (let k = 0; k < 9; k++) {
        const led = rk.userData['led' + k];
        if (led) led.material.opacity = amt * (0.25 + 0.75 * (hash2(Math.floor(t * 6) + k * 3, i * 7) > 0.45 ? 1 : 0.15));
      }
    });
    u.panel.lookAt(camDirOf(S));
    u.scope.lookAt(camDirOf(S));
    if (S.cloudPanel > 0.02) drawPCM(u.pcm, t, S.onCall, S.onCall ? 1 : 0.35);
  }

  /* ------------------------------- route lane ---------------------------- */
  if (W.route) {
    const r = W.route;
    r.laneMat.uniforms.uAmount.value = S.route;
    r.laneMat.uniforms.uHead.value = S.routeHead;
    r.tubeMat.opacity = S.route * 0.55;
    r.tube.visible = S.route > 0.02;
    r.ribbon.visible = S.route > 0.02;
    r.stops.forEach((st, i) => {
      const on = S.route > 0.02 && S.routeHead > st.u - 0.02;
      st.ring.visible = on;
      if (on) {
        st.ring.material.opacity = S.route * 0.55;
        st.ring.scale.setScalar(1 + Math.sin(t * 2.4 + i) * 0.06);
        st.ring.position.y = 0.6 + Math.sin(t * 1.6 + i * 0.8) * 0.25;
      }
    });
    /* Bus 54 running the advertised trip */
    if (W.busAerial) {
      const on = S.routeBus > 0.02;
      W.busAerial.visible = on;
      if (on) {
        const u = segE(t, 74.0, 92.0, EASE.inOutCubic) * 0.92 + 0.04;
        const p = TRIP.getPointAt(u), tan = TRIP.getTangentAt(u);
        W.busAerial.position.set(p.x, L.roadY, p.z);
        W.busAerial.rotation.y = Math.atan2(-tan.x, -tan.z);   // nose is local -Z
        const spd = 13 + 3 * Math.sin(t * 0.6);
        animateBus(W.busAerial, t, spd, 0, 0);
      }
    }
    if (W.routeBadge) driveBadge(W.routeBadge, t, S.route, TRIP.getPointAt(0.62), S);
  }

  /* ----------------------------- grievance lane -------------------------- */
  if (W.griev) {
    const g = W.griev;
    g.mat.uniforms.uAmount.value = S.grievance;
    g.ribbon.visible = S.grievance > 0.02;
    g.pad.material.opacity = S.grievance * 0.5;
    g.pad2.material.opacity = S.grievance * 0.32;
    g.pad.rotation.y = t * 0.25; g.pad2.rotation.y = -t * 0.18;
    g.pad.visible = g.pad2.visible = S.grievance > 0.02;
    g.cols.forEach((c, i) => {
      c.visible = S.grievance > 0.02;
      const fill = clamp01((S.ticketFlow * 4 - i) * 1.4) * S.grievance;
      c.scale.y = Math.max(0.001, fill * 9);
      c.position.y = 2 + fill * 4.5;
      c.material.opacity = 0.5 * fill;
    });
    g.tickets.forEach((tk, i) => {
      const u = S.ticketFlow * 1.25 - i * 0.16;
      const on = S.grievance > 0.02 && u > 0.02 && u < 1;
      tk.visible = on;
      if (!on) return;
      const p = GRIEVANCE.getPointAt(clamp01(u));
      tk.position.set(p.x, p.y + 5.4 + Math.sin(t * 1.4 + i) * 0.4, p.z);
      tk.lookAt(camDirOf(S));
      tk.material.opacity = S.grievance * Math.min(1, u * 8) * Math.min(1, (1 - u) * 6);
    });
    if (W.grievBadge) driveBadge(W.grievBadge, t, S.grievance, _tmpV2.set(DEPOT.x, 24, DEPOT.z), S);
  }

  /* ----------------------------- hero MTC bus ---------------------------- */
  if (W.busHero) {
    const x = busX(t);
    const vis = t > BUS_ARRIVE_T0 - 3;
    W.busHero.visible = vis;
    if (vis) {
      W.busHero.position.set(x, L.roadY, L.busLaneZ);
      /* Nose (local -Z) to world +X = eastbound toward Porur, and because this
         bus is built with kerbSide = +1 its doors land on world +Z = the kerb. */
      W.busHero.rotation.y = -PI / 2;
      const steer = t < BUS_BERTH_T ? Math.sin(t * 0.9) * 0.012 : 0;
      W.busHero.rotation.z = steer;
      const doorK = segE(t, DOOR_OPEN_T, DOOR_OPEN_T + 1.4, EASE.inOutCubic) * (1 - segE(t, DOOR_CLOSE_T - 1.2, DOOR_CLOSE_T, EASE.inOutCubic));
      animateBus(W.busHero, t, S.busSpeed, doorK, S.night);
    }
  }

  /* ------------------------------- rail systems -------------------------- */
  if (W.metro) {
    W.metro.trains.forEach((tr, i) => {
      const dir = i === 0 ? 1 : -1;
      const u = ((t * 0.0135 * (i === 0 ? 1 : 0.86) * dir + (i * 0.47)) % 1 + 1) % 1;
      driveTrain(tr, METRO_CURVE, u, { yOff: 0.62, dir });
    });
  }
  if (W.rail) {
    W.rail.trains.forEach((tr, i) => {
      const rk = tr.userData;
      const c = W.rail.curves[rk.track];
      const u = ((t * 0.0155 * rk.speed * rk.dir + rk.offset) % 1 + 1) % 1;
      driveTrain(tr, c, u, { yOff: 0.0, dir: rk.dir });
    });
    /* signal aspects step through their sequence */
    W.rail.signals.forEach((sg, i) => {
      const ph = ((t * 0.06 + i * 0.17) % 1);
      const on = ph < 0.6 ? 0 : ph < 0.78 ? 1 : 2;
      sg.userData.lamps.forEach((lm, k) => {
        lm.material.emissiveIntensity = k === on ? 4.2 : 0.12;
        if (lm.userData.glow) lm.userData.glow.material.opacity = k === on ? 0.7 : 0.05;
      });
    });
  }
  if (W.mrts) {
    W.mrts.trains.forEach((tr, i) => {
      const dir = tr.userData.dir;
      const u = ((t * 0.011 * dir + tr.userData.offset) % 1 + 1) % 1;
      driveTrain(tr, W.mrts.curve, u, { yOff: 0.5, dir });
    });
  }

  /* ------------------------- the wide city + landmarks -------------------- */
  const cityOn = S.cityVisible > 0.02;
  if (W.city && W.city.group.visible !== cityOn) W.city.group.visible = cityOn;
  if (W.landmarks && W.landmarks.group.visible !== cityOn) W.landmarks.group.visible = cityOn;

  /* -------------------------------- traffic ------------------------------ */
  if (W.traffic) W.traffic.update(t, lerp(1, 0.55, segE(t, 55, 70, EASE.inOutSine)));
}

function camDirOf(S) { return S.camPos || _tmpV.set(0, 1.6, 12); }

/** Wheels, wipers, doors, spray and headlight output for one MTC bus. */
function animateBus(bus, t, speed, doorK, night) {
  const u = bus.userData;
  const spin = t * (speed / 0.52);
  for (const w of u.wheels) w.rotation.x = -spin;
  const wp = speed > 0.5 ? 1 : 0.35;
  u.wipers.forEach((w, i) => { w.rotation.y = Math.sin(t * 2.6 * wp + i * 0.4) * 0.95 - 0.2; });
  u.doors.forEach((d) => {
    d.open = doorK;
    d.leafL.rotation.y = doorK * 1.15;
    d.leafR.rotation.y = -doorK * 1.15;
  });
  if (u.spray) u.spray.material.uniforms.uSpeed.value = clamp01(speed / 14);
  if (u.beams) for (const b of u.beams) {
    b.spot.intensity = 4200 * (0.35 + 0.65 * (night == null ? 1 : night));
    b.cone.material.uniforms.uOpacity.value = 0.11 * (0.3 + 0.7 * (night == null ? 1 : night)) * (0.5 + 0.5 * clamp01(speed / 8 + 0.4));
  }
  for (const tl of (u.tailLamps || [])) {
    const braking = speed < 0.4 && t > BUS_ARRIVE_T0 && t < BUS_BERTH_T + 0.6;
    tl.material.emissiveIntensity = braking ? 5.4 : 2.2;
    if (tl.userData.glow) tl.userData.glow.material.opacity = braking ? 1.0 : 0.6;
  }
}

/** Blend the sit pose toward standing by k (used for the elder's stand-up). */
function blendPose(r, k) {
  const e = clamp01(k);
  r.pelvis.position.y = lerp(0.06, 0.84, e) * r.S;
  r.legs.L.hip.rotation.x = lerp(-1.42, 0, e);
  r.legs.R.hip.rotation.x = lerp(-1.42, 0, e);
  r.legs.L.knee.rotation.x = lerp(1.46, 0, e);
  r.legs.R.knee.rotation.x = lerp(1.46, 0, e);
  r.torso.rotation.x = lerp(0.10, 0.03, e);
  r.neck.rotation.x = lerp(0.42, 0.06, e);
  r.arms.L.shoulder.rotation.x = lerp(0.86, 0.10, e);
  r.arms.R.shoulder.rotation.x = lerp(0.86, 0.10, e);
  r.arms.L.elbow.rotation.x = lerp(-1.78, -0.30, e);
  r.arms.R.elbow.rotation.x = lerp(-1.78, -0.30, e);
}

/**
 * Floating 3D badge. Billboarded about Y only, so it stays upright like a real
 * overhead sign rather than tipping to stare at a high camera.
 */
function driveBadge(badge, t, amt, anchor, S) {
  if (!badge) return;
  badge.visible = amt > 0.02;
  if (!badge.visible) return;
  badge.position.set(anchor.x, anchor.y + Math.sin(t * 0.8) * 0.6, anchor.z);
  const c = camDirOf(S);
  badge.rotation.y = Math.atan2(c.x - badge.position.x, c.z - badge.position.z);
  badge.material.opacity = amt;
  badge.scale.setScalar(0.9 + amt * 0.1);
}

/** Build a glass badge panel with the given lines. */
function makeBadge(lines, { accent = '#F59E0B', w = 1024, h = 256, scale = 1 } = {}) {
  const { c, x } = makeCanvas(w, h);
  x.fillStyle = 'rgba(8,12,18,0.74)'; rr(x, 0, 0, w, h, 22); x.fill();
  x.strokeStyle = accent; x.lineWidth = 4; rr(x, 4, 4, w - 8, h - 8, 20); x.stroke();
  x.fillStyle = accent; x.fillRect(24, 24, 8, h - 48);
  x.textBaseline = 'middle';
  let y = h / 2 - ((lines.length - 1) * 0.5) * (h / (lines.length + 1.4));
  lines.forEach((L, i) => {
    x.fillStyle = i === 0 ? '#FFFFFF' : (i === lines.length - 1 ? accent : 'rgba(226,238,248,0.88)');
    x.font = i === 0 ? `800 ${Math.floor(h * 0.185)}px ${FONT_COND}` : `600 ${Math.floor(h * 0.128)}px ${FONT_MONO}`;
    x.fillText(L, 48, y);
    y += (i === 0 ? h * 0.26 : h * 0.20);
  });
  const tex = canvasTexture(c);
  const m = new THREE.Mesh(new THREE.PlaneGeometry(w / 100 * scale, h / 100 * scale),
    new THREE.MeshBasicMaterial({ map: tex, transparent: true, opacity: 0, depthWrite: false, side: THREE.DoubleSide, fog: false }));
  m.renderOrder = 20;
  return m;
}
