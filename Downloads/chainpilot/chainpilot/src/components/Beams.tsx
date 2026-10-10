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

const TRACES = [
  'M0 19 L52 62 H176',
  'M0 120 H176',
  'M0 221 L52 178 H176',
]

/**
 * Glowing circuit-style light traces that feed into the dashboard edges.
 * Each trace has a steady neon core plus a travelling pulse of light.
 */
export function LightTraces({ side }: { side: 'left' | 'right' }) {
  const id = `trace-${side}`
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute top-[193px] hidden w-[300px] lg:block ${side === 'left' ? 'right-full' : 'left-full'}`}
      style={{ height: 240 }}
    >
      {/* soft orange bloom hugging the dashboard edge */}
      <motion.div
        className={`absolute top-1/2 h-[376px] w-[130px] -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(255,107,26,0.95),rgba(242,72,0,0.55)_45%,transparent)] blur-[22px] ${side === 'left' ? 'right-[-40px]' : 'left-[-40px]'}`}
        animate={{ opacity: [0.65, 1, 0.8, 1, 0.65], scaleY: [0.95, 1.05, 1, 1.04, 0.95] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
      />
      <svg
        viewBox="0 0 176 240"
        className={`absolute top-0 h-[240px] w-[176px] overflow-visible ${side === 'left' ? 'right-0 -scale-x-100' : 'left-0'}`}
        fill="none"
      >
        <defs>
          <linearGradient id={`${id}-core`} x1="0" y1="0" x2="176" y2="0" gradientUnits="userSpaceOnUse">
            <stop stopColor="#ffd9b8" />
            <stop offset="0.35" stopColor="#ff8a3d" />
            <stop offset="1" stopColor="#f24800" />
          </linearGradient>
          <filter id={`${id}-glow`} x="-30%" y="-80%" width="160%" height="260%">
            <feGaussianBlur stdDeviation="6" />
          </filter>
          <filter id={`${id}-soft`} x="-30%" y="-80%" width="160%" height="260%">
            <feGaussianBlur stdDeviation="2.2" />
          </filter>
        </defs>
        {/* wide glow */}
        <g filter={`url(#${id}-glow)`} stroke="#ff5a14" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" opacity="0.85">
          {TRACES.map((d) => <path key={d} d={d} />)}
        </g>
        {/* neon core */}
        <g filter={`url(#${id}-soft)`} stroke={`url(#${id}-core)`} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
          {TRACES.map((d) => <path key={d} d={d} />)}
        </g>
        <g stroke="#fff4e6" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" opacity="0.9">
          {TRACES.map((d) => <path key={d} d={d} />)}
        </g>
        {/* travelling pulses, flowing outwards from the dashboard */}
        {TRACES.map((d, i) => (
          <motion.path
            key={`pulse-${d}`}
            d={d}
            pathLength={1}
            stroke="#fff"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="0.1 1"
            initial={{ strokeDashoffset: 0.1 }}
            animate={{ strokeDashoffset: [0.1, -1.05] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.45, repeatDelay: 0.6 }}
            style={{ filter: 'drop-shadow(0 0 6px #ffb067)' }}
          />
        ))}
      </svg>
    </div>
  )
}

/** Vertical beam that drops into the dashboard in the closing CTA. */
export function VerticalBeam() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute left-[70%] top-0 z-0 h-[420px] w-[200px] -translate-x-1/2">
      <motion.div
        className="absolute left-1/2 top-0 h-full w-[120px] -translate-x-1/2 bg-[radial-gradient(closest-side,rgba(255,107,26,0.75),rgba(242,72,0,0.25)_60%,transparent)] blur-xl"
        animate={{ opacity: [0.65, 1, 0.75, 1, 0.65], scaleX: [0.9, 1.1, 1, 1.08, 0.9] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute left-1/2 top-0 h-full w-[26px] -translate-x-1/2 bg-gradient-to-b from-[#ffb36b] via-[#ffd9a8] to-white blur-[7px]"
        animate={{ opacity: [0.8, 1, 0.85, 1, 0.8] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="absolute left-1/2 top-0 h-full w-[8px] -translate-x-1/2 bg-gradient-to-b from-[#ffe2c2] to-white shadow-[0_0_24px_6px_rgba(255,170,90,0.8)]" />
      {/* light motes rising up the beam */}
      {[0, 1, 2, 3].map((i) => (
        <motion.span
          key={i}
          className="absolute left-1/2 size-1 rounded-full bg-white shadow-[0_0_10px_3px_rgba(255,190,120,0.9)]"
          style={{ marginLeft: (i - 1.5) * 7 }}
          initial={{ bottom: -4, opacity: 0 }}
          animate={{ bottom: [0, 420], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 2.8, repeat: Infinity, delay: i * 0.7, ease: 'easeOut' }}
        />
      ))}
    </div>
  )
}
