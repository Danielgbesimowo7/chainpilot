import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Button } from './ui/Button'
import { Reveal } from './ui/Reveal'

type Plan = { name: string; price: number; blurb: string; features: string[]; popular?: boolean }

const PLANS: Plan[] = [
  {
    name: 'STARTER', price: 49,
    blurb: 'Perfect for small DAO teams getting started with structured treasury management across 1-2 chains',
    features: ['Up to 2 connected wallets', '2 chains support', 'Up to 5 team members', 'Multisig approval flows', 'Basic audit logs (1 month)', 'Email notifications.', '2 chains support'],
  },
  {
    name: 'PROFESSIONAL', price: 89, popular: true,
    blurb: 'Perfect for active DAO teams managing multi-chain treasury operations at scale with full monitoring.',
    features: ['Up to 10 connected wallets', '5 chains + supported', 'Up to 20 team members', 'Multisig approval flows', 'Full audit logs (1 year)', 'Risk monitoring + Alerts', 'Automated payroll', 'CSV + PDF export'],
  },
  {
    name: 'ENTERPRISE', price: 149,
    blurb: 'For protocols & investment syndicates with large treasuries, compliance requirements, and dedicated support needs.',
    features: ['Everything in Professional plan', 'Unlimited wallets', 'All 5 chains + custom chains', 'Unlimited team members', 'Full API access', 'Dedicated account manager', 'Custom spend policies'],
  },
]

function Check() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a2a2a2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0" aria-hidden="true">
      <circle cx="12" cy="12" r="10" /><path d="M7.5 12.5l3 3 6-6.5" />
    </svg>
  )
}

function Price({ value }: { value: number }) {
  return (
    <span className="relative inline-flex h-[44px] overflow-hidden align-bottom text-4xl font-semibold text-soft">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span key={value} initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -40, opacity: 0 }} transition={{ type: 'spring', stiffness: 260, damping: 26 }} className="tabular-nums">
          ${value}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

export function Pricing() {
  const [yearly, setYearly] = useState(false)

  return (
    <section id="pricing" className="relative scroll-mt-24 px-5 py-[72px] md:px-8">
      <div className="mx-auto flex max-w-[771px] flex-col items-center gap-6 text-center">
        <Reveal><h2 className="text-gradient text-[28px] font-medium sm:text-4xl md:text-5xl">Simple, Transparent Pricing</h2></Reveal>
        <Reveal delay={0.08}><p className="text-base leading-7 text-muted sm:text-xl md:text-2xl">All plans include a 14-day free trial.</p></Reveal>
        <Reveal delay={0.16}>
          <div role="group" aria-label="Billing period" className="relative flex gap-2 rounded-[11px] bg-surface p-2">
            {([['Monthly', false], ['Yearly', true]] as const).map(([label, isYearly]) => {
              const on = yearly === isYearly
              return (
                <button key={label} type="button" aria-pressed={on} onClick={() => setYearly(isYearly)} className="relative rounded-lg px-3 py-2 text-base">
                  {on && <motion.span layoutId="billing-pill" className="absolute inset-0 rounded-lg bg-white/[0.08]" transition={{ type: 'spring', stiffness: 380, damping: 30 }} />}
                  <span className={`relative ${on ? 'font-medium text-white' : 'text-soft'}`}>
                    {label}{isYearly && <span className="text-success"> (save 20%)</span>}
                  </span>
                </button>
              )
            })}
          </div>
        </Reveal>
      </div>

      <div className="mx-auto mt-14 grid max-w-[1200px] items-center gap-6 md:mt-[56px] lg:grid-cols-3">
        {PLANS.map((p, i) => {
          const price = yearly ? Math.round(p.price * 0.8) : p.price
          return (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.8, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6 }}
              className={`relative flex flex-col gap-6 rounded-3xl bg-card px-3 pb-3 ${p.popular ? 'border-[3px] border-brand/[0.33] pt-[33px] lg:pb-3' : 'pt-5'}`}
            >
              {p.popular && (
                <>
                  <span className="absolute left-1/2 top-[-17px] -translate-x-1/2 whitespace-nowrap rounded-[15px] bg-brand px-[101px] py-1 text-base font-semibold text-white max-sm:px-12">MOST POPULAR</span>
                </>
              )}
              <div className="flex flex-col gap-4 px-3">
                <p className="text-base font-medium text-muted">{p.name}</p>
                <p className="flex items-baseline gap-1"><Price value={price} /><span className="text-base font-semibold text-muted">/ Per Month</span></p>
                <p className="text-base font-medium leading-6 text-muted">{p.blurb}</p>
              </div>
              <div className="flex flex-1 flex-col justify-between gap-12 rounded-[13px] bg-panel p-4">
                <ul className="flex flex-col gap-3.5">
                  {p.features.map((f, k) => (
                    <motion.li
                      key={f + k}
                      initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.1 + k * 0.05 }}
                      className="flex items-center gap-3 text-base font-medium leading-6 text-[#a2a2a2]"
                    >
                      <Check />{f}
                    </motion.li>
                  ))}
                </ul>
                <Button variant={p.popular ? 'primary' : 'secondary'} className="w-full">Get Started</Button>
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
