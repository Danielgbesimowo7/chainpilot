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
const SOFT_Y = 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.3) 18%, #000 40%, #000 62%, rgba(0,0,0,0.3) 84%, transparent 100%)'
const mask = (m: string) => ({ maskImage: m, WebkitMaskImage: m })

export function VerticalBeam() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute left-[585px] top-[-392px] z-0 h-[426px] w-[37px]">
      {/* faint wide halo around the beam (Ellipse 25) */}
      <motion.div
        className="absolute left-[-130px] top-[-40px] h-[330px] w-[297px]"
        style={{ ...BLEND, background: 'radial-gradient(closest-side, rgba(242,72,0,0.3) 0%, rgba(242,72,0,0.14) 45%, transparent 100%)' }}
        animate={{ opacity: [0.75, 1, 0.82, 1, 0.75] }}
        transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* orange orb at the base of the beam (Ellipse 22) */}
      <motion.div
        className="absolute left-[-165px] top-[116px] h-[383px] w-[371px]"
        style={{ ...BLEND, background: 'radial-gradient(closest-side at 50% 49%, rgba(228,80,26,0.95) 0%, rgba(222,76,26,0.7) 20%, rgba(180,58,20,0.36) 46%, rgba(110,38,14,0.1) 76%, transparent 100%)' }}
        animate={{ opacity: [0.85, 1, 0.9, 1, 0.85] }}
        transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* the beam itself: ignites upward once, then breathes */}
      <motion.div
        className="absolute inset-0 origin-bottom"
        initial={{ scaleY: 0, opacity: 0 }}
        whileInView={{ scaleY: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* orange body: hottest at the foot, cooling to dark at the tip */}
        <motion.div
          className="absolute inset-y-0 left-1/2 w-[120px] -translate-x-1/2"
          style={{ ...BLEND, ...mask(SOFT_X), background: 'linear-gradient(to top, #e8531a 0%, rgba(228,80,26,0.9) 16%, rgba(196,66,22,0.58) 44%, rgba(140,48,18,0.3) 74%, rgba(100,34,14,0.08) 100%)' }}
          animate={{ opacity: [0.88, 1, 0.92, 1, 0.88] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* pale core */}
        <motion.div
          className="absolute inset-y-0 left-1/2 w-[56px] -translate-x-1/2"
          style={{ ...BLEND, ...mask(SOFT_X), background: 'linear-gradient(to top, rgba(215,175,155,0.55) 0%, rgba(195,145,125,0.32) 26%, rgba(150,105,90,0.12) 62%, transparent 100%)' }}
          animate={{ opacity: [0.8, 1, 0.85, 1, 0.8] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      {/* embers drifting up the beam */}
      {EMBERS.map((e, i) => (
        <motion.span
          key={i}
          className="absolute left-1/2 rounded-full bg-[#ffd9a0]"
          style={{ marginLeft: e.x, width: e.s, height: e.s, boxShadow: '0 0 6px 1px rgba(255,160,70,0.8)' }}
          initial={{ bottom: 0, opacity: 0 }}
          animate={{ bottom: [0, 400], x: [0, e.drift], opacity: [0, 0.8, 0.7, 0] }}
          transition={{ duration: e.d, repeat: Infinity, delay: e.t, ease: 'easeOut' }}
        />
      ))}
    </div>
  )
}

/** Soft orange light hugging the dashboard's left or right edge (design Rectangle 32 / 34). Pure gradients, no blur filter. */
export function EdgeGlow({ side }: { side: 'left' | 'right' }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute top-[-26px] hidden h-[446px] w-[110px] lg:block ${side === 'left' ? '-left-[56px]' : '-right-[56px]'}`}
      style={{ ...mask(SOFT_Y), background: `linear-gradient(to ${side === 'left' ? 'right' : 'left'}, transparent 0%, rgba(242,72,0,0.1) 25%, rgba(242,72,0,0.34) 50%, rgba(242,72,0,0.4) 56%, rgba(242,72,0,0.14) 72%, transparent 100%)` }}
    />
  )
}
