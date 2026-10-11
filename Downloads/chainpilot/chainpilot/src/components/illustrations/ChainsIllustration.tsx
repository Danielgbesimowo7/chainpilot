import { motion } from 'motion/react'
import { ChainIcon } from '../ui/ChainIcon'
import type { Chain } from '../ui/ChainIcon'

const C = { x: 192, y: 242 }
// node centres and the connector that runs from beside each node to the vault (all from the design)
const NODES: { chain: Chain; x: number; y: number; from: [number, number]; to: [number, number] }[] = [
  { chain: 'eth', x: 192, y: 144, from: [192, 162], to: [192, 219] },
  { chain: 'arb', x: 93, y: 178, from: [110, 193], to: [169, 236] },
  { chain: 'sol', x: 292, y: 178, from: [274, 193], to: [215, 236] },
  { chain: 'base', x: 42, y: 250, from: [67, 252], to: [166, 252] },
  { chain: 'pol', x: 342, y: 250, from: [316, 252.5], to: [217, 252.5] },
]

export function ChainsIllustration() {
  return (
    <div className="relative h-[377px] w-[384px]">
      <svg className="absolute inset-0 overflow-visible" width="384" height="377" fill="none" aria-hidden="true">
        <defs>
          <linearGradient id="arc-sweep" x1="0" y1="0" x2="1" y2="0">
            <stop stopColor="#f24800" stopOpacity="0" /><stop offset="0.5" stopColor="#ff8a3d" /><stop offset="1" stopColor="#f24800" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* faint arc bands the chains sit on: nodes lie on the outer one */}
        {[[150, 109, 46], [102, 74, 36]].map(([rx, ry, w], i) => (
          <motion.path
            key={rx}
            d={`M${192 - rx} 252 A${rx} ${ry} 0 0 1 ${192 + rx} 252`}
            stroke={`url(#arc-band-${i})`} strokeWidth={w}
            initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.4, delay: 0.1 + i * 0.15 }}
          />
        ))}
        {/* light sweeping along the main arc */}
        <motion.path
          d="M42 252 A150 109 0 0 1 342 252" pathLength={1} stroke="url(#arc-sweep)" strokeWidth="2" strokeLinecap="round" strokeDasharray="0.22 1"
          initial={{ strokeDashoffset: 0.22 }} animate={{ strokeDashoffset: [0.22, -1] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        />
        {NODES.map((n, i) => (
          <g key={n.chain}>
            <motion.line
              x1={n.from[0]} y1={n.from[1]} x2={n.to[0]} y2={n.to[1]} stroke="white" strokeOpacity="0.16" strokeDasharray="3 5"
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.9 + i * 0.1 }}
            />
            {/* data packet travelling node -> vault */}
            <motion.circle
              r="3" fill="#ff8a3d" style={{ filter: 'drop-shadow(0 0 5px #ff6a1a)' }}
              initial={{ cx: n.from[0], cy: n.from[1], opacity: 0 }}
              animate={{ cx: [n.from[0], n.to[0]], cy: [n.from[1], n.to[1]], opacity: [0, 1, 1, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 2.4, delay: 1.4 + i * 0.7, ease: 'easeInOut' }}
            />
          </g>
        ))}
      </svg>

      {NODES.map((n, i) => (
        <motion.div
          key={n.chain}
          className="absolute"
          style={{ left: n.x - 25.6, top: n.y - 25.6 }}
          initial={{ opacity: 0, scale: 0.3 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 200, damping: 14, delay: 0.5 + i * 0.12 }}
        >
          <motion.span
            className="relative flex size-[51px] items-center justify-center rounded-full bg-[#101010] shadow-[inset_1.8px_1.8px_10px_rgba(255,255,255,0.1)] before:absolute before:-inset-[9px] before:-z-10 before:rounded-full before:bg-white/[0.03]"
            animate={{ boxShadow: ['0 0 0 0 rgba(242,72,0,0)', '0 0 22px 0 rgba(242,72,0,0.35)', '0 0 0 0 rgba(242,72,0,0)'] }}
            transition={{ duration: 2.6, repeat: Infinity, delay: 1 + i * 0.7, repeatDelay: 1.2 }}
          >
            <ChainIcon chain={n.chain} size={30} />
          </motion.span>
        </motion.div>
      ))}

      <motion.div
        className="absolute"
        style={{ left: C.x - 26, top: C.y - 26 }}
        initial={{ opacity: 0, scale: 0.4 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ type: 'spring', stiffness: 160, damping: 14 }}
      >
        <motion.span className="relative flex size-[52px] items-center justify-center rounded-full bg-[#212121]" animate={{ y: [0, -3, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
          <motion.span className="absolute inset-0 rounded-full border border-brand/60" animate={{ scale: [1, 1.8], opacity: [0.7, 0] }} transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut' }} />
          <svg width="30" height="32" viewBox="0 0 140 160" aria-hidden="true">
            <path d="M70 4l66 38-66 38L4 42z" fill="#6b6b6b" /><path d="M4 42l66 38v76L4 118z" fill="#454545" /><path d="M136 42L70 80v76l66-38z" fill="#2a2a2a" />
          </svg>
        </motion.span>
      </motion.div>
    </div>
  )
}
