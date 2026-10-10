import { useRef } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ChainIcon } from '../ui/ChainIcon'
import type { Chain } from '../ui/ChainIcon'
import { useLoop } from '../../hooks/useLoop'

const ROWS: { chain: Chain; name: string; addr: string }[] = [
  { chain: 'eth', name: 'ETHEREUM', addr: '0x71C9…4e2A' },
  { chain: 'sol', name: 'SOLANA', addr: '0x3b1a…1b11' },
  { chain: 'base', name: 'BASE', addr: '0x9aF2…77d0' },
  { chain: 'arb', name: 'ARBITRUM', addr: '0x5dE8…03c4' },
  { chain: 'pol', name: 'POLYGON', addr: '0xB410…ae95' },
]

export function ConnectWallets() {
  const ref = useRef<HTMLDivElement>(null)
  const { tick } = useLoop(ref, 2100)
  const active = tick % ROWS.length
  const connected = tick >= ROWS.length ? ROWS.length : tick

  return (
    <div ref={ref} className="mask-fade-y relative h-[377px] w-[588px]">
      <motion.div
        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
        className="absolute left-[76px] top-[39px] h-[400px] w-[436px] rounded-3xl bg-[#151515] px-[25px] pt-5"
      >
        <div className="flex items-center gap-2.5 border-b border-white/[0.06] pb-3 text-sm font-medium text-soft">
          <span className="size-4 rounded-full bg-brand shadow-[0_0_14px_rgba(242,72,0,0.7)]" />
          Connected wallets
          <span className="ml-auto text-[11px] font-normal text-muted tabular-nums">{Math.min(connected + 1, 5)}/5 linked</span>
        </div>
        <ul className="mt-4 space-y-1">
          {ROWS.map((r, i) => {
            const on = i === active
            const done = i < connected || on
            return (
              <li key={r.chain} className="relative h-[50px]">
                <motion.div
                  className="absolute inset-y-0 flex items-center gap-3 rounded-xl px-3"
                  animate={{
                    left: on ? -15 : 0, right: on ? -19 : 0, scaleY: 1,
                    backgroundColor: on ? '#262626' : '#1a1a1a',
                    boxShadow: on ? '0 14px 36px -10px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,255,255,0.07)' : '0 0 0 0 transparent',
                    zIndex: on ? 10 : 1, y: on ? 2 : 0,
                    opacity: on ? 1 : i > active ? 0.78 - (i - active) * 0.1 : 0.85,
                  }}
                  transition={{ type: 'spring', stiffness: 220, damping: 24 }}
                  style={{ height: on ? 60 : 46, top: on ? -5 : 2 }}
                >
                  <ChainIcon chain={r.chain} size={on ? 30 : 22} />
                  <span className={`font-light tracking-wide transition-all duration-300 ${on ? 'text-[22px] text-soft' : 'text-base text-[#9a9a9a]'}`}>{r.name}</span>
                  <span className="ml-auto flex items-center">
                    <AnimatePresence mode="wait" initial={false}>
                      {on ? (
                        <motion.span
                          key="addr"
                          initial={{ opacity: 0, scale: 0.8, x: 12 }} animate={{ opacity: 1, scale: 1, x: 0 }} exit={{ opacity: 0, scale: 0.9 }}
                          className="flex items-center gap-2 rounded-full bg-[#323232] px-3 py-1.5 text-lg text-soft tabular-nums"
                        >
                          <motion.i className="size-2 rounded-full bg-success" animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.2, repeat: Infinity }} />
                          {r.addr}
                        </motion.span>
                      ) : done ? (
                        <motion.span key="ok" initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex size-5 items-center justify-center rounded-full bg-success/20 text-success">
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
                        </motion.span>
                      ) : (
                        <motion.i key="sk" className="block h-[22px] w-[52px] animate-shimmer rounded-full bg-white/[0.06]" />
                      )}
                    </AnimatePresence>
                  </span>
                </motion.div>
              </li>
            )
          })}
        </ul>
      </motion.div>
    </div>
  )
}
