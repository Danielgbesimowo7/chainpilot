import { useRef } from 'react'
import { motion } from 'motion/react'
import { Avatar } from '../ui/Avatar'
import type { AvatarTone } from '../ui/Avatar'
import { useLoop } from '../../hooks/useLoop'

const SIGNERS: { name: string; role: string; roleColor: string; tone: AvatarTone }[] = [
  { name: 'Daniel G', role: 'Owner', roleColor: '#00c896', tone: 'lavender' },
  { name: 'Sarah K', role: 'Signer', roleColor: '#7c5cfc', tone: 'sand' },
  { name: 'James T', role: 'Signer', roleColor: '#7c5cfc', tone: 'cocoa' },
]

export function CollectApprovals() {
  const ref = useRef<HTMLDivElement>(null)
  const { tick } = useLoop(ref, 1200)
  const step = tick % 7
  const approved = Math.min(3, Math.max(0, step - 1))
  const pct = approved * 20

  return (
    <div ref={ref} className="mask-fade-y relative h-[377px] w-[588px]">
      <motion.div
        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
        className="absolute left-[76px] top-2 h-[420px] w-[436px] rounded-3xl bg-[#151515] px-6 pt-5"
      >
        <div className="border-b border-white/[0.06] pb-3 text-center text-base font-medium text-soft">Approval Progress</div>
        <div className="mt-5 text-base text-soft"><span className="tabular-nums">{approved}/5</span> signers approved</div>
        <div className="mt-3 flex items-center gap-4">
          <div className="h-3 flex-1 overflow-hidden rounded-full bg-white/[0.08]">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-[#ff5a14] to-[#f24800] shadow-[0_0_14px_rgba(242,72,0,0.6)]"
              animate={{ width: `${pct}%` }} transition={{ type: 'spring', stiffness: 90, damping: 18 }}
            />
          </div>
          <span className="w-[34px] text-right text-base tabular-nums text-soft">{pct}%</span>
        </div>
        <ul className="mt-5 space-y-4">
          {SIGNERS.map((s, i) => {
            const ok = i < approved
            return (
              <motion.li
                key={s.name}
                initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 + i * 0.12 }}
                className="flex h-[60px] items-center gap-3 rounded-xl bg-[#1d1d1d] px-5"
              >
                <Avatar name={s.name} tone={s.tone} size={34} />
                <span className="text-base text-soft">{s.name}</span>
                <span className="text-xs font-medium" style={{ color: s.roleColor }}>{s.role}</span>
                <motion.span
                  key={`${s.name}-${ok}`}
                  initial={{ scale: ok ? 0.6 : 1 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 300, damping: 14 }}
                  className={`ml-auto flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs font-medium ${ok ? 'bg-success/15 text-success' : 'bg-white/[0.06] text-muted'}`}
                >
                  {ok ? (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9.5" strokeWidth="2.2" /><path d="M8 12.5l3 3 5-6" strokeWidth="2.6" /></svg>
                  ) : (
                    <motion.i className="size-2 rounded-full bg-muted" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.2, repeat: Infinity }} />
                  )}
                  {ok ? 'Approved' : 'Waiting'}
                </motion.span>
              </motion.li>
            )
          })}
        </ul>
      </motion.div>
    </div>
  )
}
