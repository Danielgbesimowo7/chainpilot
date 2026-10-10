import { useRef } from 'react'
import { motion } from 'motion/react'
import { ChainIcon } from '../ui/ChainIcon'
import type { Chain } from '../ui/ChainIcon'
import { useLoop } from '../../hooks/useLoop'

const BARS: { chain: Chain; label: string; h: number; v: string; real: string }[] = [
  { chain: 'eth', label: 'ETH', h: 170, v: '$4m', real: '$4.8m' },
  { chain: 'sol', label: 'SOL', h: 130, v: '$3m', real: '$3.1m' },
  { chain: 'base', label: 'BAS', h: 103, v: '$2m', real: '$2.4m' },
  { chain: 'arb', label: 'ARB', h: 85, v: '$2m', real: '$1.9m' },
  { chain: 'pol', label: 'POL', h: 67, v: '$1m', real: '$1.2m' },
]

const DOTS = [
  { x: 463, y: -1, delay: 0 },
  { x: 473, y: 315, delay: 1.2 },
  { x: -37, y: 287, delay: 2.1 },
]

export function BarsIllustration() {
  const ref = useRef<HTMLDivElement>(null)
  const { tick, inView } = useLoop(ref, 2400)
  const active = tick % BARS.length
  const total = 12450320 + tick * 1840

  return (
    <div ref={ref} className="relative h-[400px] w-[588px]">
      {DOTS.map((d) => (
        <div key={d.x} className="absolute grid animate-float-slow gap-2" style={{ left: d.x, top: d.y, animationDelay: `-${d.delay}s`, gridTemplateColumns: 'repeat(9, 10px)' }}>
          {Array.from({ length: 45 }, (_, i) => <i key={i} className="size-[10px] rounded-full bg-white/[0.035]" />)}
        </div>
      ))}

      <motion.div
        initial={{ opacity: 0, y: -12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }}
        className="absolute left-[293px] top-8 h-[92px] w-[224px] rounded-2xl bg-white/[0.04] px-4 pt-4"
      >
        <div className="text-xl font-medium text-soft">Total treasury value</div>
        <div className="mt-1 flex items-center gap-2 text-2xl font-semibold tabular-nums text-white">
          ${total.toLocaleString('en-US')}
        </div>
        <motion.span
          key={tick}
          initial={{ opacity: 1, y: 0 }} animate={{ opacity: 0, y: -14 }} transition={{ duration: 1.4 }}
          className="pointer-events-none absolute right-3 top-3 text-xs font-medium text-success"
        >
          {inView && tick > 0 ? '+$1,840' : ''}
        </motion.span>
      </motion.div>

      {/* faint grid behind bars */}
      <div className="absolute left-[78px] top-[168px] h-[170px] w-[433px]" style={{ backgroundImage: 'repeating-linear-gradient(180deg, rgba(255,255,255,0.045) 0 1px, transparent 1px 17px)' }} />

      {BARS.map((b, i) => {
        const left = 78 + i * 96
        const isActive = i === active
        return (
          <div key={b.chain}>
            <motion.div
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.5 + i * 0.12 }}
              animate={{ y: isActive ? -4 : 0 }}
              className="absolute w-[49px] text-center text-base font-medium tabular-nums"
              style={{ left, top: 338 - b.h - 30, color: isActive ? '#fff' : '#9a9a9a' }}
            >
              {isActive ? b.real : b.v}
            </motion.div>
            <motion.div
              className="absolute w-[49px] origin-bottom rounded-2xl border border-white/[0.06]"
              style={{ left, top: 338 - b.h, height: b.h }}
              initial={{ scaleY: 0, opacity: 0 }}
              whileInView={{ scaleY: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 90, damping: 16, delay: 0.3 + i * 0.12 }}
            >
              <motion.div
                className="absolute inset-0 rounded-2xl"
                animate={{
                  background: isActive
                    ? 'linear-gradient(180deg, #4a4a4a 0%, #262626 100%)'
                    : 'linear-gradient(180deg, #2c2c2c 0%, #1b1b1b 100%)',
                  boxShadow: isActive ? '0 0 36px -6px rgba(242,72,0,0.45), inset 0 1px 0 rgba(255,255,255,0.18)' : '0 0 0 rgba(0,0,0,0)',
                }}
                transition={{ duration: 0.6 }}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.7 + i * 0.1 }}
              className="absolute flex -translate-x-1/2 items-center gap-2 text-base"
              style={{ left: left + 24, top: 352, color: isActive ? '#fff' : '#9a9a9a' }}
            >
              <ChainIcon chain={b.chain} size={24} />{b.label}
            </motion.div>
          </div>
        )
      })}
    </div>
  )
}
