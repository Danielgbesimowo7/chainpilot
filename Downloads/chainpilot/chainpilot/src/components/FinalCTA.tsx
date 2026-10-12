import { motion } from 'motion/react'
import { Button } from './ui/Button'
import { Reveal } from './ui/Reveal'
import { ScaleToFit } from './ui/ScaleToFit'
import { Dashboard, DASHBOARD_SIZE } from './Dashboard'
import { DashboardGlow, SideGlow, VerticalBeam } from './Beams'

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
        <DashboardGlow />
        <VerticalBeam />
        <SideGlow />
        <ScaleToFit width={DASHBOARD_SIZE.width} height={DASHBOARD_SIZE.height} maxWidth={910} cropHeight={897} className="relative z-10">
          <Dashboard />
        </ScaleToFit>
      </motion.div>
    </section>
  )
}
