import { motion } from 'motion/react'

/** Soft diagonal spotlight shafts in the top corners of the hero. */
export function Spotlights() {
  const shaft = 'absolute origin-top bg-gradient-to-b from-white/[0.13] via-white/[0.04] to-transparent blur-2xl'
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[760px] overflow-hidden">
      <div className="absolute -left-24 -top-16 h-[860px] w-[560px] animate-spot origin-top-left" style={{ animationDelay: '-2s' }}>
        <div className={`${shaft} left-10 top-0 h-full w-[200px] -rotate-[24deg]`} />
        <div className={`${shaft} left-[120px] top-0 h-[90%] w-[170px] -rotate-[36deg] opacity-70`} />
      </div>
      <div className="absolute -right-24 -top-16 h-[860px] w-[560px] animate-spot origin-top-right" style={{ animationDelay: '-5s' }}>
        <div className={`${shaft} right-10 top-0 h-full w-[200px] rotate-[24deg]`} />
        <div className={`${shaft} right-[120px] top-0 h-[90%] w-[170px] rotate-[36deg] opacity-70`} />
      </div>
    </div>
  )
}

/* Pipe beam from the design: three neon lines that run from the page edge into the dashboard,
   fed by a big orange glow at the outer end. Outer end is x=0, the dashboard edge is x=182. */
const TRACES = [
  { d: 'M0 20 L56 60 H182', y: 60 },
  { d: 'M0 120 H182', y: 120 },
  { d: 'M0 220 L56 180 H182', y: 180 },
]

export function LightTraces({ side }: { side: 'left' | 'right' }) {
  const id = `pipe-${side}`
  const left = side === 'left'
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute top-[174px] z-0 hidden h-[240px] w-[182px] xl:block ${left ? 'right-[calc(100%-10px)]' : 'left-[calc(100%-10px)]'}`}
    >
      {/* orange source glow sitting at the outer end of the pipes */}
      <motion.div
        className={`absolute top-1/2 h-[627px] w-[340px] -translate-y-1/2 mix-blend-screen ${left ? 'left-[-199px]' : 'right-[-199px]'}`}
        style={{ background: 'radial-gradient(ellipse 50% 50% at 50% 50%, rgba(255,112,16,0.98) 0%, rgba(255,92,10,0.72) 24%, rgba(242,72,0,0.34) 52%, rgba(242,72,0,0.1) 78%, transparent 100%)' }}
        animate={{ opacity: [0.82, 1, 0.88, 1, 0.82] }}
        transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
      />
      <svg viewBox="0 0 182 240" className={`absolute inset-0 size-full overflow-visible ${left ? '' : '-scale-x-100'}`} fill="none">
        <defs>
          <filter id={`${id}-wide`} x="-20%" y="-60%" width="140%" height="220%"><feGaussianBlur stdDeviation="7" /></filter>
          <filter id={`${id}-mid`} x="-20%" y="-60%" width="140%" height="220%"><feGaussianBlur stdDeviation="3" /></filter>
          <filter id={`${id}-thin`} x="-20%" y="-60%" width="140%" height="220%"><feGaussianBlur stdDeviation="0.9" /></filter>
          <linearGradient id={`${id}-core`} x1="0" y1="0" x2="182" y2="0" gradientUnits="userSpaceOnUse">
            <stop stopColor="#ffb257" /><stop offset="0.4" stopColor="#ffe4b0" /><stop offset="1" stopColor="#fff6e0" />
          </linearGradient>
        </defs>
        <g filter={`url(#${id}-wide)`} stroke="#ff6a14" strokeWidth="11" strokeLinecap="round" strokeLinejoin="round" opacity="0.75">
          {TRACES.map((t) => <path key={t.d} d={t.d} />)}
        </g>
        <g filter={`url(#${id}-mid)`} stroke="#ff9a3c" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" opacity="0.95">
          {TRACES.map((t) => <path key={t.d} d={t.d} />)}
        </g>
        <g filter={`url(#${id}-thin)`} stroke={`url(#${id}-core)`} strokeWidth="3.8" strokeLinecap="round" strokeLinejoin="round">
          {TRACES.map((t) => <path key={t.d} d={t.d} />)}
        </g>
        {/* current travelling from the glow into the dashboard */}
        {TRACES.map((t, i) => (
          <motion.path
            key={`pulse-${t.d}`}
            d={t.d}
            pathLength={1}
            stroke="#fff"
            strokeWidth="3.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="0.12 1"
            initial={{ strokeDashoffset: 0.12 }}
            animate={{ strokeDashoffset: [0.12, -1.05] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeIn', delay: i * 0.4, repeatDelay: 0.5 }}
            style={{ filter: 'drop-shadow(0 0 6px #ffc27a)' }}
          />
        ))}
        {TRACES.map((t, i) => (
          <motion.circle
            key={`hit-${t.d}`}
            cx="176" cy={t.y} r="9" fill="#ffb066" style={{ filter: 'blur(5px)' }}
            animate={{ opacity: [0, 0, 0.95, 0], scale: [0.6, 0.6, 1.3, 0.8] }}
            transition={{ duration: 2.7, repeat: Infinity, ease: 'easeOut', delay: i * 0.4, times: [0, 0.62, 0.8, 1] }}
          />
        ))}
      </svg>
    </div>
  )
}

/** Column of light that shoots up from behind the dashboard in the closing CTA.
 *  Built from the design's own layers (all blurred, blended with plus-lighter so there is no hard edge):
 *  an orange body that is hottest at the base and cools to dark at the top, a pale core, a faint wide
 *  halo near the top, and a bright orange orb where the beam leaves the dashboard.
 *  Coordinates are relative to the dashboard's top-left corner (design: dashboard at x=403, y=393). */
const EMBERS = [
  { x: -10, s: 3, d: 3.4, t: 0.0, drift: -26 },
  { x: 6, s: 2, d: 2.8, t: 0.9, drift: 14 },
  { x: 0, s: 3, d: 3.8, t: 1.7, drift: -10 },
  { x: 12, s: 2, d: 3.1, t: 0.4, drift: 24 },
  { x: -14, s: 2, d: 2.9, t: 1.3, drift: 30 },
  { x: 16, s: 3, d: 3.3, t: 3.1, drift: -22 },
]

const BLEND = { mixBlendMode: 'plus-lighter' as const }

/* Horizontal falloff shaped like a gaussian. Used as a mask so the light has no edge at all,
   and so no CSS blur filter is needed (large blur filters band and stair-step on some GPUs). */
const SOFT_X = 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.04) 10%, rgba(0,0,0,0.16) 22%, rgba(0,0,0,0.42) 35%, rgba(0,0,0,0.8) 44%, #000 50%, rgba(0,0,0,0.8) 56%, rgba(0,0,0,0.42) 65%, rgba(0,0,0,0.16) 78%, rgba(0,0,0,0.04) 90%, transparent 100%)'
const mask = (m: string) => ({ maskImage: m, WebkitMaskImage: m })

/** Column of light that shoots up from behind the dashboard in the closing CTA.
 *  Independent layers (all additive, all gradient-masked so nothing has an edge):
 *  atmosphere -> outer body -> orange body -> flare at the base -> inner glow -> white-hot core.
 *  The anchor sits on the dashboard's top edge at the beam's x (design: x=603 inside the 910px dashboard). */
export function VerticalBeam() {
  const col = (w: number, h: number, gradient: string, extra?: object) => ({
    left: -w / 2, top: 34 - h, width: w, height: h, ...BLEND, ...mask(SOFT_X), background: gradient, ...extra,
  })
  return (
    <div aria-hidden="true" className="pointer-events-none absolute left-[603px] top-0 z-0 hidden lg:block">
      {/* 1 - outer atmospheric glow */}
      <motion.div
        className="absolute"
        style={{ left: -150, top: -330, width: 300, height: 380, ...BLEND, background: 'radial-gradient(ellipse 50% 62% at 50% 100%, rgba(242,72,0,0.5) 0%, rgba(242,72,0,0.2) 45%, rgba(242,72,0,0.05) 75%, transparent 100%)' }}
        animate={{ opacity: [0.8, 1, 0.85, 1, 0.8] }}
        transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* the beam itself: ignites upward once, then breathes */}
      <motion.div
        className="absolute left-0 top-0 h-0 w-0 origin-bottom"
        style={{ transformOrigin: '0 34px' }}
        initial={{ scaleY: 0, opacity: 0 }}
        whileInView={{ scaleY: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* 2 - wide body, fades out toward the tip */}
        <div style={col(130, 426, 'linear-gradient(to top, rgba(242,72,0,0.75) 0%, rgba(242,72,0,0.5) 30%, rgba(242,72,0,0.3) 62%, rgba(242,72,0,0.12) 100%)')} className="absolute" />
        {/* wider foot: the beam flares out near the dashboard */}
        <div style={col(190, 220, 'linear-gradient(to top, rgba(255,96,16,0.75) 0%, rgba(242,72,0,0.4) 45%, transparent 100%)')} className="absolute" />
        {/* 3 - vivid orange body */}
        <motion.div
          className="absolute"
          style={col(70, 426, 'linear-gradient(to top, rgba(255,128,36,1) 0%, rgba(255,110,24,0.95) 28%, rgba(250,90,16,0.7) 58%, rgba(235,72,10,0.5) 86%, rgba(235,72,10,0.25) 100%)')}
          animate={{ opacity: [0.9, 1, 0.94, 1, 0.9] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* 4 - saturated inner glow */}
        <motion.div
          className="absolute"
          style={col(42, 400, 'linear-gradient(to top, rgba(255,190,90,1) 0%, rgba(255,150,50,0.95) 30%, rgba(255,120,30,0.65) 62%, rgba(255,110,24,0.18) 100%)')}
          animate={{ opacity: [0.85, 1, 0.9, 1, 0.85] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* 5 - white-hot core */}
        <motion.div
          className="absolute"
          style={col(20, 330, 'linear-gradient(to top, #fff 0%, #fff6dc 22%, #ffdca0 48%, rgba(255,184,100,0.7) 74%, rgba(255,150,60,0.12) 100%)')}
          animate={{ opacity: [0.9, 1, 0.92, 1, 0.9], scaleX: [1, 1.15, 0.95, 1.08, 1] }}
          transition={{ duration: 1.9, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      {/* 6 - bright flare where the beam meets the dashboard */}
      <motion.div
        className="absolute"
        style={{ left: -110, top: -78, width: 220, height: 96, ...BLEND, background: 'radial-gradient(ellipse 50% 100% at 50% 100%, rgba(255,236,190,0.95) 0%, rgba(255,160,60,0.8) 28%, rgba(255,100,20,0.4) 58%, transparent 100%)' }}
        animate={{ opacity: [0.85, 1, 0.9, 1, 0.85] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* embers drifting up the beam */}
      {EMBERS.map((e, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-[#ffd9a0]"
          style={{ left: e.x, top: 0, width: e.s, height: e.s, boxShadow: '0 0 6px 1px rgba(255,160,70,0.8)' }}
          initial={{ y: 0, opacity: 0 }}
          animate={{ y: [0, -380], x: [0, e.drift], opacity: [0, 0.8, 0.7, 0] }}
          transition={{ duration: e.d, repeat: Infinity, delay: e.t, ease: 'easeOut' }}
        />
      ))}
    </div>
  )
}

/** Light the beam throws onto the dashboard's top edge. It is centred on the edge (half over the dashboard, half above it),
 *  stays within the dashboard's width, and every gradient reaches zero before its box ends, so nothing is cut off or spills far away.
 *  Coordinates are relative to the dashboard wrapper (910px wide in the design). */
export function DashboardGlow() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 hidden lg:block">
      {/* broad, dim wash under the top glow so the gap above the dashboard is not left black */}
      <motion.div
        className="absolute"
        style={{ left: -60, top: -120, width: 1030, height: 190, ...BLEND, background: 'radial-gradient(ellipse 50% 50% at 50% 55%, rgba(242,72,0,0.24) 0%, rgba(242,72,0,0.12) 45%, rgba(242,72,0,0.04) 75%, transparent 100%)' }}
        animate={{ opacity: [0.8, 1, 0.85, 1, 0.8] }}
        transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* tight, bright pool around the beam */}
      <motion.div
        className="absolute"
        style={{ left: 603 - 260, top: -88, width: 520, height: 120, ...BLEND, background: 'radial-gradient(ellipse 50% 50% at 50% 50%, rgba(255,140,40,0.7) 0%, rgba(255,104,22,0.42) 32%, rgba(242,72,0,0.15) 64%, transparent 100%)' }}
        animate={{ opacity: [0.85, 1, 0.9, 1, 0.85] }}
        transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* softer glow along the whole top edge, a little wider than the dashboard */}
      <motion.div
        className="absolute"
        style={{ left: -30, top: -62, width: 970, height: 68, ...BLEND, background: 'radial-gradient(ellipse 50% 50% at 50% 50%, rgba(242,72,0,0.34) 0%, rgba(242,72,0,0.16) 50%, transparent 100%)' }}
        animate={{ opacity: [0.75, 1, 0.8, 0.95, 0.75] }}
        transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}

/** Faint orange light centred on the dashboard's left and right side edges (design Rectangle 32 / 34):
 *  it sits both behind and in front of the edge, so it reads as light, not as a border. */
export function SideGlow() {
  const fade = 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.55) 14%, #000 32%, #000 62%, rgba(0,0,0,0.5) 84%, transparent 100%)'
  return (
    <>
      {(['left', 'right'] as const).map((side) => (
        <div
          key={side}
          aria-hidden="true"
          className="pointer-events-none absolute z-20 hidden h-[470px] w-[120px] lg:block"
          style={{ top: -50, [side]: -60, ...mask(fade) }}
        >
          <div
            className="size-full"
            style={{ ...BLEND, ...mask(SOFT_X), background: 'linear-gradient(to bottom, rgba(242,72,0,0.4), rgba(242,72,0,0.4))' }}
          />
        </div>
      ))}
    </>
  )
}
