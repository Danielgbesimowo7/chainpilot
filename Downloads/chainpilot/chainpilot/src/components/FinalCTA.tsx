import { motion } from 'motion/react'
import { Button } from './ui/Button'
import { Reveal } from './ui/Reveal'
import { ScaleToFit } from './ui/ScaleToFit'
import { Dashboard, DASHBOARD_SIZE } from './Dashboard'
import { EdgeGlow, VerticalBeam } from './Beams'

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden px-5 pb-0 pt-12 md:px-8 lg:h-[819px] lg:pt-[44px]">
      <div className="relative mx-auto max-w-[1200px]">
        <div className="relative z-10 max-w-[670px]">
          <Reveal>
            <h2 className="text-gradient text-[28px] font-medium leading-[1.15] sm:text-4xl md:text-5xl md:leading-[1.2]">Bring clarity, control, and confidence to your treasury.</h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-6 max-w-[620px] text-base leading-7 text-muted sm:text-xl md:text-2xl">Manage assets, approvals, and governance workflows across chains from one secure command center.</p>
          </Reveal>
          <Reveal delay={0.24} className="mt-8 flex flex-wrap gap-6">
            <Button>Get started for free</Button>
            <Button variant="secondary">Talk to Sales</Button>
          </Reveal>
        </div>
      </div>

      <motion.div
        className="relative mx-auto mt-16 w-full max-w-[910px] lg:absolute lg:bottom-auto lg:left-auto lg:right-[calc(50%-593px)] lg:top-[393px] lg:mt-0"
        initial={{ opacity: 0, y: 70 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="hidden lg:block"><VerticalBeam /></div>
        {/* light spilling around the dashboard, positioned like the design's blurred ellipses */}
        <motion.div aria-hidden="true" className="pointer-events-none absolute left-[539px] top-[-76px] hidden h-[130px] w-[1330px] lg:block" style={{ mixBlendMode: 'plus-lighter', background: 'radial-gradient(closest-side, rgba(242,84,12,0.5), rgba(242,72,0,0.18) 55%, transparent 100%)' }} animate={{ opacity: [0.75, 1, 0.8, 1, 0.75] }} transition={{ duration: 4.4, repeat: Infinity, ease: 'easeInOut' }} />
        <motion.div aria-hidden="true" className="pointer-events-none absolute left-[648px] top-[-73px] hidden h-[130px] w-[350px] lg:block" style={{ mixBlendMode: 'plus-lighter', background: 'radial-gradient(closest-side, rgba(255,110,24,0.55), rgba(242,72,0,0.2) 55%, transparent 100%)' }} animate={{ opacity: [0.7, 1, 0.78, 0.95, 0.7] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} />
        <EdgeGlow side="left" />
        <EdgeGlow side="right" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-3 top-0 z-20 h-px bg-gradient-to-r from-transparent via-[#ff9a50] to-transparent" />
        <ScaleToFit width={DASHBOARD_SIZE.width} height={DASHBOARD_SIZE.height} maxWidth={910} cropHeight={897} className="relative z-10">
          <Dashboard />
        </ScaleToFit>
      </motion.div>
    </section>
  )
}
