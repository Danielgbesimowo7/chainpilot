import { useRef } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ChainIcon } from '../ui/ChainIcon'
import { CountUp } from '../ui/CountUp'
import { useLoop } from '../../hooks/useLoop'

const CYCLE = 9

function Field({ w, filled, delay = 0, h = 38 }: { w: number | string; filled: boolean; delay?: number; h?: number }) {
  return (
    <div className="relative overflow-hidden rounded-lg bg-[#1d1d1d]" style={{ width: w, height: h }}>
      <motion.i
        className="absolute inset-y-[11px] left-3 block rounded-full bg-white/15"
        animate={{ width: filled ? '58%' : '0%' }}
        transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  )
}

export function CreateProposal() {
  const ref = useRef<HTMLDivElement>(null)
  const { tick } = useLoop(ref, 1000)
  const step = tick % CYCLE
  const cycle = Math.floor(tick / CYCLE)
  const clicked = step >= 6

  return (
    <div ref={ref} className="mask-fade-y relative h-[377px] w-[588px]">
      <motion.div
        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
        className="absolute left-[75px] top-[50px] h-[400px] w-[438px] rounded-3xl bg-[#151515] px-6 pt-5"
      >
        <div className="border-b border-white/[0.06] pb-3 text-center text-sm font-medium text-soft">New Payment Proposal</div>
        <div className="mt-4 space-y-3">
          <Field w="100%" filled={step >= 1} />
          <div className="flex gap-2.5">
            <Field w={187} filled={step >= 2} h={36} />
            <Field w={189} filled={step >= 3} h={36} />
          </div>
          <Field w="100%" filled={step >= 4} h={36} />
        </div>
      </motion.div>

      {/* network chip */}
      <AnimatePresence>
        {step >= 2 && (
          <motion.div
            key={`net-${cycle}`}
            initial={{ opacity: 0, x: 30, scale: 0.85 }} animate={{ opacity: 1, x: 0, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 220, damping: 18 }}
            className="absolute left-[431px] top-[96px] flex h-12 items-center gap-2.5 rounded-xl bg-[#1d1d1d] px-3.5 text-base font-medium text-soft shadow-2xl ring-1 ring-white/[0.06]"
          >
            Network: <ChainIcon chain="sol" size={26} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* amount tile */}
      <AnimatePresence>
        {step >= 3 && (
          <motion.div
            key={`amt-${cycle}`}
            initial={{ opacity: 0, x: -30, scale: 0.9 }} animate={{ opacity: 1, x: 0, scale: 1 }} exit={{ opacity: 0, scale: 0.92 }}
            transition={{ type: 'spring', stiffness: 200, damping: 18 }}
            className="absolute left-[43px] top-[184px] h-[73px] w-[187px] rounded-xl bg-[#1d1d1d] px-3 pt-2.5 shadow-2xl ring-1 ring-white/[0.06]"
          >
            <div className="flex items-center gap-2 text-sm font-medium text-soft">
              <svg width="22" height="22" viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="16" r="16" fill="#2775ca" /><circle cx="16" cy="16" r="8.5" fill="none" stroke="#fff" strokeWidth="1.8" /><path d="M18.4 13.2c-.4-1-1.3-1.5-2.4-1.5-1.2 0-2.1.6-2.1 1.6 0 2.4 4.7 1.1 4.7 3.6 0 1-1 1.7-2.5 1.7-1.2 0-2.2-.5-2.6-1.6M16 10.4v1.3m0 8.6v-1.3" stroke="#fff" strokeWidth="1.4" fill="none" strokeLinecap="round" /></svg>
              Amount in USDC
            </div>
            <div className="mt-1 text-2xl font-medium tabular-nums text-soft">
              <CountUp key={cycle} to={125000} duration={1.1} format={(n) => `$${Math.round(n).toLocaleString('en-US')}`} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* submit button + cursor */}
      <motion.div
        className="absolute left-[336px] top-[284px] flex h-9 w-[152px] items-center justify-center overflow-hidden rounded-lg bg-gradient-to-b from-[#ff6a2b] to-[#e03d00] text-xs font-medium text-white shadow-[0_8px_24px_-6px_rgba(242,72,0,0.7)]"
        animate={{ scale: step === 6 ? 0.94 : 1, opacity: step >= 4 ? 1 : 0.55 }}
        transition={{ duration: 0.18 }}
      >
        {clicked ? 'Proposal created ✓' : 'Create proposal'}
        {step === 6 && <motion.span key={cycle} className="absolute size-3 rounded-full bg-white/60" initial={{ scale: 0, opacity: 0.8 }} animate={{ scale: 18, opacity: 0 }} transition={{ duration: 0.7 }} style={{ left: 126, top: 12 }} />}
      </motion.div>
      <motion.svg
        width="26" height="30" viewBox="0 0 26 30" className="absolute z-10 drop-shadow-xl" aria-hidden="true"
        animate={{ left: step >= 5 ? 466 : 330, top: step >= 5 ? 288 : 200, opacity: step >= 4 && step < 8 ? 1 : 0 }}
        transition={{ duration: step >= 5 ? 0.9 : 0.01, ease: 'easeInOut' }}
      >
        <path d="M3 2l17 11-7.5 1.7L9 22z" fill="#111" stroke="#fff" strokeWidth="1.6" strokeLinejoin="round" />
      </motion.svg>
    </div>
  )
}
