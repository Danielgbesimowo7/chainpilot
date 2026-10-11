import { motion } from 'motion/react'
import { Pill } from './ui/Pill'
import { Button } from './ui/Button'
import { ScaleToFit } from './ui/ScaleToFit'
import { Dashboard, DASHBOARD_SIZE } from './Dashboard'
import { LightTraces, Spotlights } from './Beams'

const COLS = 16
const ROWS = 7

function GridBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute left-1/2 top-0 hidden -translate-x-1/2 gap-2 sm:grid"
      style={{
        width: 1496, gridTemplateColumns: `repeat(${COLS}, 86px)`,
        WebkitMaskImage: 'radial-gradient(ellipse 60% 85% at 50% 0%, #000 15%, transparent 78%)',
        maskImage: 'radial-gradient(ellipse 60% 85% at 50% 0%, #000 15%, transparent 78%)',
      }}
    >
      {Array.from({ length: COLS * ROWS }, (_, i) => {
        const lit = (i * 7 + (i % 5) * 3) % 11 === 0
        return (
          <span
            key={i}
            className="h-[86px] rounded-xl bg-white/[0.022]"
            style={lit ? { animation: `twinkle ${5 + (i % 4)}s ease-in-out ${(i % 9) * 0.6}s infinite`, background: 'rgba(255,255,255,0.045)' } : undefined}
          />
        )
      })}
    </div>
  )
}

const WORDS = 'One Workspace for Every Wallet Across'.split(' ')

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pb-0 pt-[132px] md:pt-[209px]">
      <GridBackdrop />
      <Spotlights />

      <div className="relative mx-auto flex max-w-[871px] flex-col items-center gap-6 px-5 text-center">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}>
          <Pill>Trusted by DAOs, funds, and protocol teams</Pill>
        </motion.div>

        <div className="flex flex-col items-center gap-6">
          <h1 className="text-[32px] font-medium leading-[1.1] sm:text-5xl md:text-6xl lg:text-[64px]">
            <span>
              {WORDS.map((w, i) => (
                <motion.span
                  key={w + i}
                  className="text-gradient mr-[0.25em] inline-block"
                  initial={{ opacity: 0, y: 24, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 0.8, delay: 0.25 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                >
                  {w}
                </motion.span>
              ))}
            </span>
            <motion.span
              className="inline-block font-serif italic text-brand"
              initial={{ opacity: 0, y: 24, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.9, delay: 0.25 + WORDS.length * 0.07, ease: [0.16, 1, 0.3, 1] }}
            >
              Every Chain.
            </motion.span>
          </h1>
          <motion.p
            className="max-w-[637px] text-base leading-7 text-muted sm:text-lg md:text-2xl md:leading-9"
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.95 }}
          >
            ChainPilot unifies treasury operations for DAOs and Web3 teams, approvals, payroll, risk monitoring, and audit trails across 5 chains.
          </motion.p>
        </div>

        <motion.div className="mt-2 flex flex-wrap items-center justify-center gap-4 md:gap-6" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.1 }}>
          <Button>Get started for free</Button>
          <Button variant="secondary" href="#product">See live demo</Button>
        </motion.div>
      </div>

      <motion.div
        id="product"
        className="relative mx-auto mt-16 w-full max-w-[1098px] px-4 md:mt-28 lg:px-0"
        initial={{ opacity: 0, y: 60, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.2, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <LightTraces side="left" />
        <LightTraces side="right" />
        {/* glow spilling out of the dashboard's side edges where the pipes plug in */}
        <div aria-hidden="true" className="pointer-events-none absolute -left-[11px] top-[119px] z-20 hidden h-[376px] w-[23px] rounded-full bg-[#ff5a14] opacity-80 blur-[22px] mix-blend-screen xl:block" />
        <div aria-hidden="true" className="pointer-events-none absolute -right-[11px] top-[119px] z-20 hidden h-[376px] w-[23px] rounded-full bg-[#ff5a14] opacity-80 blur-[22px] mix-blend-screen xl:block" />
        <ScaleToFit width={DASHBOARD_SIZE.width} height={DASHBOARD_SIZE.height} maxWidth={1098} cropHeight={897} className="relative z-10">
          <Dashboard />
        </ScaleToFit>
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-[220px] bg-gradient-to-b from-transparent via-page/80 to-page" />
      </motion.div>
    </section>
  )
}
