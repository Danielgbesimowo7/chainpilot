import { useRef } from 'react'
import type { ReactNode } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { useLoop } from '../../hooks/useLoop'

type Tone = 'success' | 'warning' | 'danger' | 'governance'
const TONE: Record<Tone, { c: string; bg: string }> = {
  success: { c: '#00c896', bg: 'rgba(0,200,150,0.08)' },
  warning: { c: '#f5a623', bg: 'rgba(245,166,35,0.08)' },
  danger: { c: '#ff4d4d', bg: 'rgba(255,77,77,0.1)' },
  governance: { c: '#7c5cfc', bg: 'rgba(124,92,252,0.1)' },
}

const Svg = ({ children }: { children: ReactNode }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{children}</svg>
)
const ICON = {
  check: <Svg><circle cx="12" cy="12" r="9" /><path d="M8 12.5l3 3 5-6" /></Svg>,
  clock: <Svg><circle cx="12" cy="12" r="9" /><path d="M8 12h.01M12 12h.01M16 12h.01" strokeWidth="2.6" /></Svg>,
  alert: <Svg><path d="M12 4l9 16H3z" /><path d="M12 10v4M12 17h.01" /></Svg>,
  key: <Svg><circle cx="8" cy="12" r="4" /><path d="M12 12h9M18 12v3" /></Svg>,
}

const ALERTS: { text: string; tone: Tone; icon: keyof typeof ICON }[] = [
  { text: 'Policy updated', tone: 'success', icon: 'check' },
  { text: '3 pending approvals', tone: 'warning', icon: 'clock' },
  { text: 'Unusual outflow detected', tone: 'danger', icon: 'alert' },
  { text: 'New signer added', tone: 'governance', icon: 'key' },
  { text: 'Audit log exported', tone: 'success', icon: 'check' },
  { text: 'Limit nearly reached', tone: 'warning', icon: 'clock' },
]

const SLOTS = [
  { x: 48, y: 56, opacity: 0.28, scale: 0.94 },
  { x: 140, y: 131, opacity: 0.95, scale: 1 },
  { x: 45, y: 218, opacity: 1, scale: 1 },
]

export function RiskIllustration() {
  const ref = useRef<HTMLDivElement>(null)
  const { tick } = useLoop(ref, 2600)
  const n = ALERTS.length
  const visible = SLOTS.map((_, slot) => ({ slot, idx: (((tick + 2 - slot) % n) + n) % n }))

  return (
    <div ref={ref} className="relative h-[377px] w-[384px]">
      <AnimatePresence initial={false}>
        {visible.map(({ slot, idx }) => {
          const a = ALERTS[idx]
          const t = TONE[a.tone]
          const alarming = a.tone === 'danger' && slot === 2
          return (
            <motion.div
              key={idx}
              className="absolute flex h-[46px] items-center gap-2.5 whitespace-nowrap rounded-full border-2 px-3.5 text-base font-medium"
              style={{ borderColor: t.c, background: t.bg, color: '#d6d6d6' }}
              initial={{ x: SLOTS[0].x, y: -10, opacity: 0, scale: 0.9 }}
              animate={{ ...SLOTS[slot] }}
              exit={{ y: 320, opacity: 0, scale: 0.92, transition: { duration: 0.5 } }}
              transition={{ type: 'spring', stiffness: 120, damping: 20 }}
            >
              <motion.span style={{ color: t.c }} animate={alarming ? { rotate: [0, -12, 12, -8, 8, 0] } : { rotate: 0 }} transition={{ duration: 0.7, delay: 0.5 }}>
                {ICON[a.icon]}
              </motion.span>
              {a.text}
              {alarming && <span className="absolute inset-0 -z-10 rounded-full animate-ping-ring" style={{ boxShadow: `0 0 0 2px ${t.c}` }} />}
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
