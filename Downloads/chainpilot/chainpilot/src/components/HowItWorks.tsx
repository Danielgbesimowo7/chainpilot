import type { ReactNode } from 'react'
import { motion } from 'motion/react'
import { Pill } from './ui/Pill'
import { ScaleToFit } from './ui/ScaleToFit'
import { SectionHeader } from './ui/Reveal'
import { ConnectWallets } from './illustrations/ConnectWallets'
import { CreateProposal } from './illustrations/CreateProposal'
import { CollectApprovals } from './illustrations/CollectApprovals'
import { PaymentExecuted } from './illustrations/PaymentExecuted'

const STEPS: { n: string; title: string; body: string; art: ReactNode }[] = [
  { n: '01', title: 'Connect Your Wallets', body: 'Securely connect your treasury wallets across multiple chains', art: <ConnectWallets /> },
  { n: '02', title: 'Create Proposals', body: 'Define transfer details, recipients, amounts and execution rules', art: <CreateProposal /> },
  { n: '03', title: 'Collect Approvals', body: 'Required signers review and approve the proposal based on your policy', art: <CollectApprovals /> },
  { n: '04', title: 'Execute and Monitor', body: 'Funds are executed securely and monitored in real-time', art: <PaymentExecuted /> },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative scroll-mt-24 px-5 py-[72px] md:px-8">
      <SectionHeader
        pill={<Pill>How it works</Pill>}
        title="Simple Steps. Maximum Control"
        body="Chainpilot makes onchain treasury management secure, transparent, and effortless."
      />
      <div className="mx-auto mt-14 grid max-w-[1200px] grid-cols-1 gap-6 lg:grid-cols-2">
        {STEPS.map((s, i) => (
          <motion.article
            key={s.n}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: (i % 2) * 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="dot-pattern relative flex flex-col lg:min-h-[527px] overflow-hidden rounded-3xl bg-card ring-1 ring-white/[0.03]"
          >
            <div className="flex gap-3 p-6">
              <motion.span
                className="flex h-10 w-[49px] shrink-0 items-center justify-center rounded-lg bg-brand text-[28px] font-semibold leading-none text-white shadow-[0_8px_24px_-8px_rgba(242,72,0,0.8)]"
                initial={{ scale: 0.6, rotate: -8 }} whileInView={{ scale: 1, rotate: 0 }} viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 260, damping: 14, delay: 0.2 + (i % 2) * 0.12 }}
              >
                {s.n}
              </motion.span>
              <div>
                <h3 className="text-xl font-medium leading-8 text-soft md:text-2xl md:leading-[40px]">{s.title}</h3>
                <p className="mt-1 max-w-[420px] text-base leading-6 md:text-xl md:leading-[30px] text-muted">{s.body}</p>
              </div>
            </div>
            <div className="mt-3 lg:mt-auto">
              <ScaleToFit width={588} height={377} minScale={0.74}>{s.art}</ScaleToFit>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
