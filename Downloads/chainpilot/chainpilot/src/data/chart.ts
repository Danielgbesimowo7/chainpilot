/** Deterministic pseudo-random so the charts render identically on every load. */
function rng(seed: number) {
  let s = seed
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296
    return s / 4294967296
  }
}

type Anchor = [number, number]

function series(anchors: Anchor[], points: number, noise: number, seed: number) {
  const rand = rng(seed)
  return Array.from({ length: points }, (_, i) => {
    const x = i / (points - 1)
    let k = 0
    while (k < anchors.length - 2 && x > anchors[k + 1][0]) k++
    const [x0, y0] = anchors[k]
    const [x1, y1] = anchors[k + 1]
    const t = x1 === x0 ? 0 : (x - x0) / (x1 - x0)
    const base = y0 + (y1 - y0) * Math.min(1, Math.max(0, t))
    const wobble = (rand() - 0.5) * 2 * noise
    return Math.min(0.97, Math.max(0.03, base + wobble))
  })
}

export const POINTS = 44

export const OUTFLOW = series(
  [[0, 0.06], [0.14, 0.2], [0.3, 0.3], [0.45, 0.27], [0.6, 0.55], [0.68, 0.78], [0.72, 0.88], [0.78, 0.66], [0.9, 0.42], [1, 0.2]],
  POINTS, 0.045, 7,
)
export const INFLOW = series(
  [[0, 0.16], [0.14, 0.26], [0.3, 0.3], [0.45, 0.24], [0.56, 0.4], [0.66, 0.18], [0.715, 0.2], [0.74, 0.84], [0.8, 0.8], [0.9, 0.6], [1, 0.52]],
  POINTS, 0.045, 21,
)

export function toPath(values: number[], w: number, h: number) {
  return values.map((v, i) => `${i === 0 ? 'M' : 'L'}${((i / (values.length - 1)) * w).toFixed(1)} ${((1 - v) * h).toFixed(1)}`).join(' ')
}

export function toArea(values: number[], w: number, h: number) {
  return `${toPath(values, w, h)} L${w} ${h} L0 ${h} Z`
}
