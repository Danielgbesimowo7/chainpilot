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

/* ---- Dashboard overview chart (points are in the chart panel's own pixel space) ---- */
type Pt = [number, number]

function jag(anchors: Pt[], step: number, noise: number, seed: number): Pt[] {
  const rand = rng(seed)
  const out: Pt[] = []
  const x0 = anchors[0][0]
  const x1 = anchors[anchors.length - 1][0]
  let k = 0
  for (let x = x0; x <= x1 + 0.01; x += step) {
    while (k < anchors.length - 2 && x > anchors[k + 1][0]) k++
    const [ax, ay] = anchors[k]
    const [bx, by] = anchors[k + 1]
    const t = Math.min(1, Math.max(0, (x - ax) / (bx - ax || 1)))
    const edge = x === x0 || x >= x1 - 0.01 ? 0 : 1
    out.push([x, ay + (by - ay) * t + (rand() - 0.5) * 2 * noise * edge])
  }
  return out
}

export const OVERVIEW_BASE = 288
export const OVERVIEW_IN = jag(
  [[94, 288], [100, 276], [110, 252], [135, 254], [150, 232], [165, 238], [190, 262], [205, 248], [225, 205], [243, 186], [262, 202], [275, 230], [290, 245], [305, 240], [330, 243], [355, 230], [380, 234], [404, 245], [418, 215], [432, 160], [455, 98], [470, 110], [490, 126], [505, 146], [520, 166], [535, 156], [550, 186], [565, 205], [585, 200], [600, 186], [621, 173]],
  4, 3.2, 21,
)
export const OVERVIEW_OUT = jag(
  [[94, 288], [105, 282], [125, 245], [150, 205], [165, 200], [180, 204], [195, 226], [210, 236], [225, 232], [240, 236], [255, 226], [280, 210], [300, 205], [330, 175], [355, 150], [375, 132], [392, 128], [404, 148], [420, 152], [440, 158], [455, 150], [470, 155], [485, 160], [500, 186], [515, 190], [535, 188], [550, 214], [565, 234], [580, 240], [595, 254], [610, 258], [621, 246]],
  4, 3.2, 7,
)

export const ptsPath = (p: Pt[]) => p.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`).join(' ')
export const ptsArea = (p: Pt[], base: number) => `${ptsPath(p)} L${p[p.length - 1][0]} ${base} L${p[0][0]} ${base} Z`
