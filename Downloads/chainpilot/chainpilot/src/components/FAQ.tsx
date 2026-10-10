import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Button } from './ui/Button'
import { Reveal } from './ui/Reveal'

const ITEMS = [
  { q: 'Does Chain Pilot hold custody of our funds?', a: 'No. Chain Pilot is a coordination and visibility layer. All signing happens in your own wallet. We cannot initiate transaction or move on your behalf.' },
  { q: 'What chains are supported?', a: 'Ethereum, Solana, Arbitrum, Polygon and Base are supported today. Enterprise teams can also request custom chains.' },
  { q: 'How does the 14-day trial work?', a: 'Every plan includes a 14-day free trial, so you can connect your wallets, invite signers and run real approval flows before choosing a plan.' },
  { q: 'What wallets are compatible?', a: 'Chain Pilot works with the multisig wallets your team already uses on each supported chain, and signing always happens in your own wallet.' },
]

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="relative scroll-mt-24 px-5 py-[72px] md:px-8">
      <div className="mx-auto grid max-w-[1200px] gap-10 lg:grid-cols-[518px_1fr] lg:gap-[72px]">
        <div className="flex flex-col justify-between gap-10">
          <Reveal>
            <h2 className="text-4xl font-medium leading-[1.15] md:text-5xl">
              <span className="text-gradient">Frequently </span><span className="text-[#e6e6e6]">Asked</span>
              <br /><span className="text-gradient">Questions</span>
            </h2>
          </Reveal>
          <Reveal delay={0.12} className="rounded-xl bg-card p-6">
            <h3 className="text-2xl font-medium text-soft md:text-[28px]">Still have <span className="text-[#e6e6e6]">questions to ask?</span></h3>
            <p className="mt-4 max-w-[390px] text-xl leading-9 text-muted">You can’t find answers to your questions? Send us a mail and we will get back to you as soon as possible</p>
            <Button href="mailto:hello@chainpilot.app" className="mt-8 !h-[46px] px-3.5 text-sm">Send us a mail</Button>
          </Reveal>
        </div>

        <ul className="flex flex-col gap-4">
          {ITEMS.map((it, i) => {
            const isOpen = open === i
            return (
              <Reveal key={it.q} as="li" delay={i * 0.08} y={20}>
                <div className="rounded-xl bg-surface/70 px-6 transition-colors hover:bg-surface">
                  <h3>
                    <button
                      type="button" aria-expanded={isOpen} aria-controls={`faq-${i}`} onClick={() => setOpen(isOpen ? null : i)}
                      className="flex w-full items-center justify-between gap-4 py-6 text-left text-xl font-normal text-soft md:text-2xl"
                    >
                      {it.q}
                      <motion.svg animate={{ rotate: isOpen ? 0 : -90 }} transition={{ duration: 0.3 }} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8a8a8a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="shrink-0" aria-hidden="true">
                        <path d="M6 9l6 6 6-6" />
                      </motion.svg>
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-${i}`} role="region"
                        initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="mb-6 border-t border-white/[0.07] pt-6">
                          <p className="rounded-xl bg-card p-3 text-xl leading-9 text-muted md:text-2xl">{it.a}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
