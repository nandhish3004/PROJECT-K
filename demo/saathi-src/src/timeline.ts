/** Film timeline (seconds). Every module reads chapter times from here. */
export const T = {
  intro: 0,
  problem: 9,
  asha: 17,
  app: 26,
  camera: 38,     // OpenCV / MediaPipe joint-movement (ROM) test
  posture: 49.5,  // camera posture test: left/right knee angle (hip–knee–ankle) while standing still
  strap: 57.5,    // sensor pod strapped below the knee, on the tibia
  shock: 67,      // tibial shock: walking test + anatomy view
  lab: 79,        // validation vs shoe-cushioning lab method + novelty
  result: 93,
  nutrition: 101, // care + nutrition plan by risk band
  sync: 111,
  phc: 116,       // PHC dashboard (medical officer's web view)
  arch: 128,
  impact: 144,
  end: 154,
  total: 162,
} as const

export const CHAPTERS = [
  { name: 'Hills', t: T.intro },
  { name: 'The problem', t: T.problem },
  { name: 'ASHA arrives', t: T.asha },
  { name: 'App', t: T.app },
  { name: 'Camera ROM', t: T.camera },
  { name: 'Knee posture', t: T.posture },
  { name: 'Strap pod', t: T.strap },
  { name: 'Tibial shock', t: T.shock },
  { name: 'Evidence base', t: T.lab },
  { name: 'Result', t: T.result },
  { name: 'Nutrition', t: T.nutrition },
  { name: 'Sync', t: T.sync },
  { name: 'PHC dashboard', t: T.phc },
  { name: 'Architecture', t: T.arch },
  { name: 'Impact', t: T.impact },
  { name: 'SAATHI', t: T.end },
]

/** Tashi's walking test (tibial shock): heel strikes of the sensor leg. */
export const STEPS_T = [68.4, 69.3, 70.2, 71.1, 72.0]
/** Pod's per-step shock class, as the hardware reports it (StepHistory: LOW / MID / HIGH). */
export const STEP_CLASS = ['MID', 'HIGH', 'MID', 'HIGH', 'MID'] as const
