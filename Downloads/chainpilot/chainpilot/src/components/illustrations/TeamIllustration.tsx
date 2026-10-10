import { useRef } from 'react'
import { motion } from 'motion/react'
import { Avatar } from '../ui/Avatar'
import type { AvatarTone } from '../ui/Avatar'
import { useLoop } from '../../hooks/useLoop'

const MEMBERS: { name: string; tone: AvatarTone; role: string; color: string; cx: number; cy: number; chipX: number; chipY: number }[] = [
  { name: 'Daniel G', tone: 'lavender', role: 'Owner', color: '#00c896', cx: 77, cy: 87, chipX: 135, chipY: 65 },
  { name: 'Sarah K', tone: 'sand', role: 'Signer', color: '#7c5cfc', cx: 180, cy: 179, chipX: 238, chipY: 157 },
  { name: 'James T', tone: 'pink', role: 'Analyst', color: '#1d9bf0', cx: 78, cy: 271, chipX: 136, chipY: 249 },
]

export function TeamIllustration() {
  const ref = useRef<HTMLDivElement>(null)
  const { tick } = useLoop(ref, 2000)
  const active = tick % MEMBERS.length

  return (
    <div ref={ref} className="relative h-[377px] w-[384px]">
      {/* approval path linking the three members */}
      <svg className="absolute inset-0" width="384" height="377" fill="none" aria-hidden="true">
        <motion.path
          d="M77 87 C 130 100, 150 150, 180 179 S 100 250, 78 271"
          stroke="white" strokeOpacity="0.12" strokeDasharray="4 6"
          initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.6, delay: 0.8 }}
        />
        <motion.circle
          r="3.5" fill="#f24800" style={{ filter: 'drop-shadow(0 0 6px #f24800)' }}
          animate={{ cx: [77, 180, 78, 77], cy: [87, 179, 271, 87] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
      </svg>

      {MEMBERS.map((m, i) => {
        const on = i === active
        return (
          <div key={m.name}>
            <motion.div
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: m.cx, top: m.cy }}
              initial={{ opacity: 0, scale: 0.4 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 220, damping: 15, delay: 0.2 + i * 0.25 }}
            >
              <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut' }}>
                <span className="relative flex size-[68px] items-center justify-center rounded-full bg-[#1c1c1c] ring-1 ring-white/[0.08]">
                  {on && <span className="absolute inset-0 rounded-full animate-ping-ring" style={{ boxShadow: `0 0 0 2px ${m.color}` }} />}
                  <Avatar name={m.name} tone={m.tone} size={50} />
                </span>
              </motion.div>
            </motion.div>

            <motion.div
              className="absolute flex h-11 items-center gap-2.5 rounded-full bg-[#1f1f1f] pl-3 pr-4 text-base text-soft"
              style={{ left: m.chipX, top: m.chipY }}
              initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 + i * 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.span
                animate={on ? { scale: [1, 1.35, 1] } : { scale: 1 }}
                transition={{ duration: 0.6 }}
                className="flex size-[22px] items-center justify-center rounded-full"
                style={{ background: m.color }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
              </motion.span>
              {m.role}
              <motion.span
                className="absolute inset-0 rounded-full"
                animate={{ boxShadow: on ? `0 0 0 1px ${m.color}66, 0 0 22px -4px ${m.color}88` : '0 0 0 0 transparent' }}
                transition={{ duration: 0.5 }}
              />
            </motion.div>
          </div>
        )
      })}
    </div>
  )
}
