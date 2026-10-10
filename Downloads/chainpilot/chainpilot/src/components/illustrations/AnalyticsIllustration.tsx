import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { INFLOW, OUTFLOW, POINTS, toArea, toPath } from '../../data/chart'
import { useLoop } from '../../hooks/useLoop'

const W = 485, H = 170
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June']
const lo = 12, hi = 40

export function AnalyticsIllustration() {
  const ref = useRef<HTMLDivElement>(null)
  const { inView } = useLoop(ref, 1000)
  const [idx, setIdx] = useState(31)

  useEffect(() => {
    if (!inView) return
    let dir = 1
    const id = window.setInterval(() => {
      setIdx((i) => {
        if (i >= hi) dir = -1
        if (i <= lo) dir = 1
        return i + dir
      })
    }, 120)
    return () => window.clearInterval(id)
  }, [inView])

  const x = (idx / (POINTS - 1)) * W
  const inV = Math.round(INFLOW[idx] * 1000)
  const outV = Math.round(OUTFLOW[idx] * 1000)
  const net = inV - outV
  const month = MONTHS[Math.min(5, Math.floor((idx / (POINTS - 1)) * 6))]
  const tipLeft = Math.min(Math.max(x - 20, 0), W - 126)

  return (
    <div ref={ref} className="relative h-[400px] w-[588px]">
      <div className="absolute left-11 top-[150px]" style={{ width: W, height: H }}>
        <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} className="overflow-visible">
          <defs>
            <linearGradient id="an-in" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#00c896" stopOpacity="0.4" /><stop offset="1" stopColor="#00c896" stopOpacity="0" /></linearGradient>
            <linearGradient id="an-out" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#f24800" stopOpacity="0.45" /><stop offset="1" stopColor="#f24800" stopOpacity="0" /></linearGradient>
          </defs>
          <motion.path d={toArea(OUTFLOW, W, H)} fill="url(#an-out)" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 1.4, duration: 1.2 }} />
          <motion.path d={toArea(INFLOW, W, H)} fill="url(#an-in)" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 1.6, duration: 1.2 }} />
          <motion.path d={toPath(OUTFLOW, W, H)} fill="none" stroke="#f24800" strokeWidth="1.6" strokeLinejoin="round" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 2, ease: 'easeInOut' }} />
          <motion.path d={toPath(INFLOW, W, H)} fill="none" stroke="#00c896" strokeWidth="1.6" strokeLinejoin="round" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 2, ease: 'easeInOut', delay: 0.2 }} />
          <motion.g animate={{ x }} transition={{ type: 'spring', stiffness: 220, damping: 26 }}>
            <line y1="0" y2={H} stroke="white" strokeOpacity="0.4" strokeDasharray="3 4" />
            <circle cy={(1 - OUTFLOW[idx]) * H} r="3" fill="#f24800" stroke="#fff" strokeWidth="1" />
            <circle cy={(1 - INFLOW[idx]) * H} r="3" fill="#00c896" stroke="#fff" strokeWidth="1" />
          </motion.g>
        </svg>

        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 2.2 }}
          animate={{ left: tipLeft }}
          className="absolute -top-[52px] w-[126px] rounded-lg border border-white/[0.07] bg-[#1b1b1b] px-2 py-1.5 text-[10px] text-white/60 shadow-xl"
          style={{ left: tipLeft }}
        >
          <div className="mb-1 border-b border-white/[0.07] pb-1 text-[9px] text-white/45">{month} 2026.</div>
          <div className="flex items-center gap-1.5 text-[11px] text-white/85"><i className="size-1.5 rounded-full bg-success" />inflow <b className="ml-auto font-medium tabular-nums">${inV}k</b></div>
          <div className="mt-1 flex items-center gap-1.5 text-[11px] text-white/85"><i className="size-1.5 rounded-full bg-brand" />outflow <b className="ml-auto font-medium tabular-nums">${outV}k</b></div>
          <div className="mt-1 flex justify-between border-t border-white/[0.07] pt-1 text-[9px]">
            <span>Net this month</span>
            <b className={`font-medium tabular-nums ${net < 0 ? 'text-danger' : 'text-success'}`}>{net < 0 ? '-' : '+'}${Math.abs(net)}k</b>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
