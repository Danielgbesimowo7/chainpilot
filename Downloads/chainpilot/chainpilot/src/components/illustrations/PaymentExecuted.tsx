import { useRef } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { CountUp } from '../ui/CountUp'
import { useLoop } from '../../hooks/useLoop'

const CYCLE = 8

function Skeleton({ w, text }: { w: number; text?: string }) {
  return (
    <span className="relative flex h-3.5 items-center justify-end overflow-hidden rounded-full bg-white/[0.07]" style={{ width: w }}>
      <AnimatePresence mode="wait" initial={false}>
        {text ? (
          <motion.span key="t" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="absolute right-2 whitespace-nowrap text-[9px] font-medium text-soft">{text}</motion.span>
        ) : (
          <motion.i key="s" exit={{ opacity: 0 }} className="absolute inset-0 animate-shimmer rounded-full bg-white/[0.06]" />
        )}
      </AnimatePresence>
    </span>
  )
}

export function PaymentExecuted() {
  const ref = useRef<HTMLDivElement>(null)
  const { tick } = useLoop(ref, 1000)
  const step = tick % CYCLE
  const cycle = Math.floor(tick / CYCLE)
  const done = step >= 2

  return (
    <div ref={ref} className="mask-fade-y relative h-[377px] w-[588px]">
      <motion.div
        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
        className="absolute left-[93px] top-2 h-[420px] w-[405px] rounded-3xl bg-[#151515] px-[26px] pt-[30px]"
      >
        <div className="flex items-start gap-4">
          <span className="relative mt-1 flex size-[34px] shrink-0 items-center justify-center">
            <AnimatePresence mode="wait">
              {done ? (
                <motion.span key={`ok-${cycle}`} className="relative flex size-[34px] items-center justify-center rounded-full bg-success" initial={{ scale: 0.4 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 260, damping: 12 }}>
                  <motion.span className="absolute inset-0 rounded-full border-2 border-success" initial={{ scale: 1, opacity: 0.8 }} animate={{ scale: 1.9, opacity: 0 }} transition={{ duration: 1 }} />
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
                    <motion.path d="M5 12.5l4.5 4.5L19 7.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.15 }} />
                  </svg>
                </motion.span>
              ) : (
                <motion.span key="wait" exit={{ opacity: 0, scale: 0.6 }} className="size-[30px] rounded-full border-[3px] border-warning/25 border-t-warning" animate={{ rotate: 360 }} transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }} />
              )}
            </AnimatePresence>
          </span>
          <div>
            <div className={`text-[15px] font-medium transition-colors duration-500 ${done ? 'text-success' : 'text-warning'}`}>{done ? 'Payment Executed' : 'Executing payment…'}</div>
            <div className="mt-1 text-2xl font-medium tabular-nums text-soft">
              <CountUp key={cycle} to={125000} from={done ? 0 : 125000} duration={done ? 1.2 : 0.01} format={(n) => `${Math.round(n).toLocaleString('en-US')} USDC`} />
            </div>
            <div className="mt-1.5 text-sm text-soft">to <span className="text-muted underline decoration-muted/50 underline-offset-2">0×7cA6...21F3</span></div>
          </div>
        </div>

        <div className="mt-[18px] border-t border-white/[0.06] pt-[22px]">
          <div className="flex items-center justify-between text-sm font-medium text-soft">Transaction <Skeleton w={87} text={done ? '0x9f3a…c21b' : undefined} /></div>
          <div className="mt-[23px] flex items-center justify-between text-sm font-medium text-soft">Chain <Skeleton w={87} text={done ? 'Ethereum' : undefined} /></div>
          <div className="mt-[22px] flex items-center justify-between"><Skeleton w={86} /><Skeleton w={88} text={done ? 'Block 21,904,118' : undefined} /></div>
          <div className="mt-[22px]"><Skeleton w={355} /></div>
        </div>
      </motion.div>

      <motion.div
        className="absolute left-[205px] top-[244px] flex h-[39px] items-center gap-3 rounded-xl bg-[#1d1d1d] px-3.5 text-sm text-soft shadow-2xl ring-1 ring-white/[0.06]"
        initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.6 }}
      >
        Status:
        <AnimatePresence mode="wait">
          <motion.span
            key={done ? 'success' : 'pending'}
            initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.7 }}
            className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${done ? 'bg-success/15 text-success' : 'bg-warning/15 text-warning'}`}
          >
            <i className={`size-2 rounded-full ${done ? 'bg-success' : 'animate-shimmer bg-warning'}`} />
            {done ? 'Success' : 'Pending'}
          </motion.span>
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
