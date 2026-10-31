import { STEPS_T, T } from './timeline'

/** Camera ROM test: the knee is straightened and bent while the phone camera tracks hip–knee–ankle. */
export const ROM_T0 = T.camera + 2.2
export const ROM_T1 = T.camera + 10.2
/** knee extension above 90° seated (degrees). 0 = foot under knee, 76 = almost straight */
export function kneeAngle(t: number) {
  if (t < ROM_T0 || t > ROM_T1) return 2
  const ph = ((t - ROM_T0) % 4) / 4
  return 2 + 74 * (0.5 - 0.5 * Math.cos(ph * Math.PI * 2)) * (0.97 + 0.03 * Math.sin(t * 0.7)) + Math.sin(t * 23) * 0.5
}
/** hip–knee–ankle angle as MediaPipe reports it (180 = straight) */
export const jointAngle = (t: number) => 90 + kneeAngle(t)
export function romSoFar(t: number) {
  if (t < ROM_T0) return 0
  const k = Math.min(t, ROM_T1) - ROM_T0
  if (k >= 2) return 74
  return 74 * (0.5 - 0.5 * Math.cos((k / 4) * Math.PI * 2))
}

/** tiny natural sway while standing still for the posture test (metres) */
export const sway = (t: number) => Math.sin(t * 2.1) * 0.004 + Math.sin(t * 5.3) * 0.0015

/** Camera posture test: mean hip–knee–ankle angle of each knee while standing still for 5 s */
export const POSTURE = { t0: T.posture + 1.9, t1: T.posture + 6.9, right: 168.9, left: 176.4 }
export const POSTURE_DIFF = +(POSTURE.left - POSTURE.right).toFixed(1)
/** running mean shown live (settles as frames accumulate) */
export function postureLive(t: number, side: 'left' | 'right') {
  const k = Math.min(1, Math.max(0, (t - POSTURE.t0) / (POSTURE.t1 - POSTURE.t0)))
  const target = POSTURE[side]
  return target + (1 - k) * (side === 'left' ? 1.6 : -2.2) * Math.sin(t * 5 + (side === 'left' ? 1 : 0))
}

/** per-step peak tibial acceleration (g, illustrative). Pod classes: MID < 3.4 g ≤ HIGH */
export const STEP_PEAKS = [3.0, 3.5, 3.1, 3.6, 3.2]

/** Tibial acceleration (g) recorded by the pod during the walking test. Illustrative values. */
export function shockAt(t: number) {
  let g = 1 + Math.sin(t * 31) * 0.03
  STEPS_T.forEach((ts, i) => {
    const d = t - ts
    if (d > -0.1 && d < 0.4) {
      const peak = STEP_PEAKS[i]
      g += (peak - 1) * Math.exp(-Math.pow(d / 0.028, 2)) - 0.5 * Math.exp(-Math.pow((d - 0.07) / 0.04, 2)) + 0.35 * Math.exp(-Math.pow((d - 0.16) / 0.05, 2))
    }
  })
  return g
}
export const stepsDone = (t: number) => STEPS_T.filter(s => t >= s).length

/** generic impact pulse train used by the anatomy + lab views */
export function pulse(t: number, t0: number, period: number, peak: number) {
  if (t < t0) return 1
  const d = ((t - t0) % period)
  return 1 + (peak - 1) * Math.exp(-Math.pow((d - 0.05) / 0.03, 2)) - 0.18 * peak * Math.exp(-Math.pow((d - 0.12) / 0.04, 2)) + 0.1 * peak * Math.exp(-Math.pow((d - 0.22) / 0.05, 2))
}
