import type { ReactNode } from 'react'
import { motion } from 'motion/react'
import { Pill } from './ui/Pill'
import { ScaleToFit } from './ui/ScaleToFit'
import { SectionHeader } from './ui/Reveal'
import { BarsIllustration } from './illustrations/BarsIllustration'
import { AnalyticsIllustration } from './illustrations/AnalyticsIllustration'
import { TeamIllustration } from './illustrations/TeamIllustration'
import { ChainsIllustration } from './illustrations/ChainsIllustration'
import { RiskIllustration } from './illustrations/RiskIllustration'

type CardProps = { title: string; body: string; art: ReactNode; w: number; h: number; className?: string; index: number }

function FeatureCard({ title, body, art, w, h, className = '', index }: CardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, delay: (index % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4 }}
      className={`group dot-pattern relative flex flex-col overflow-hidden rounded-3xl bg-card ring-1 ring-white/[0.03] transition-shadow duration-500 hover:shadow-[0_20px_60px_-20px_rgba(242,72,0,0.25)] hover:ring-white/[0.08] ${className}`}
    >
      <div className="px-0 pt-0">
        <ScaleToFit width={w} height={h}>{art}</ScaleToFit>
      </div>
      <div className="px-6 pb-6 pt-1">
        <h3 className="text-2xl font-medium text-soft">{title}</h3>
        <p className="mt-3 max-w-[420px] text-xl leading-[30px] text-muted">{body}</p>
      </div>
    </motion.article>
  )
}

export function Features() {
  return (
    <section id="features" className="relative scroll-mt-24 px-5 py-[72px] md:px-8">
      <SectionHeader
        pill={<Pill>Built for modern treasuries</Pill>}
        title="Every Tool Your Treasury Needs."
        body="Manage assets across chains, streamline approvals, and get real-time visibility into your onchain treasury from a single dashboard."
      />
      <div className="mx-auto mt-14 grid max-w-[1200px] grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-6">
        <FeatureCard index={0} className="lg:col-span-3" w={588} h={400} art={<BarsIllustration />} title="Unified Cross-Chain Overview" body="Monitor balances across all chains in one place." />
        <FeatureCard index={1} className="lg:col-span-3" w={588} h={400} art={<AnalyticsIllustration />} title="Treasury Analytics" body="Track inflows, outflows and runways across chains." />
        <FeatureCard index={2} className="lg:col-span-2" w={384} h={377} art={<TeamIllustration />} title="Team Control" body="Role based access for DAOs and finance teams." />
        <FeatureCard index={3} className="lg:col-span-2" w={384} h={377} art={<ChainsIllustration />} title="Support Multiple Chains" body="Track assets, approvals, and risk across multiple chains." />
        <FeatureCard index={4} className="sm:col-span-2 lg:col-span-2" w={384} h={377} art={<RiskIllustration />} title="Audit and Risk Monitoring" body="Real-time alerts and transaction history" />
      </div>
    </section>
  )
}
