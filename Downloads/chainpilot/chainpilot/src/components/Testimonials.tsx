import { motion } from 'motion/react'
import { Avatar } from './ui/Avatar'
import type { AvatarTone } from './ui/Avatar'
import { Pill } from './ui/Pill'
import { SectionHeader } from './ui/Reveal'

type T = { quote: string; name: string; role: string; tone: AvatarTone; caps?: boolean }
const ROW1: T[] = [
  { quote: '“Chain Pilot replaced 4 separate tools and a 20-tab spreadsheet. Our signers actually use it now. Approvals that used to take 3 days happen in under an hour.”', name: 'Maya Rodriguez', role: 'Head of Finance, Gitcoin DAO', tone: 'slate', caps: true },
  { quote: '“The risk alerts alone saved us from a bridge exposure we didn’t know we had. This is what treasury tooling should have been from day one.”', name: 'Daniel Gbesimowo', role: 'Treasury Lead, Compound Finance', tone: 'pink' },
]
const ROW2: T[] = [
  { quote: '“Finally a tool that understands DAO finance. The audit trail alone is worth the subscription. Our community now has full visibility into every treasury movement.”', name: 'Amare Lee', role: 'CFO, Optimism Foundation', tone: 'cocoa', caps: true },
  { quote: '“Before ChainPilot, treasury visibility across Ethereum and Solana was messy. Now our team tracks balances, risks, and signer activity from one dashboard.”', name: 'Daniel Ross', role: 'Finance Ops at Orbit Labs', tone: 'pink' },
  { quote: '“The anomaly alerts caught unusual outflows before execution. That single layer of protection gave our treasury team far more confidence moving capital”', name: 'Priya Solis', role: 'Core Contributor at LayerFund', tone: 'sand' },
]

function Card({ t, i, className }: { t: T; i: number; className: string }) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4 }}
      className={`group flex flex-col justify-between gap-6 rounded-2xl bg-card p-6 ring-1 ring-white/[0.03] transition-shadow hover:ring-white/[0.09] ${className}`}
    >
      <blockquote className="text-xl italic leading-9 text-[#9a9a9a] transition-colors duration-500 group-hover:text-soft md:text-2xl">{t.quote}</blockquote>
      <figcaption className="flex items-center gap-3 border-t border-white/[0.07] pt-6">
        <Avatar name={t.name} tone={t.tone} size={60} />
        <div>
          <div className={`text-xl text-soft md:text-2xl ${t.caps ? 'uppercase' : ''}`}>{t.name}</div>
          <div className="text-base text-muted">{t.role}</div>
        </div>
      </figcaption>
    </motion.figure>
  )
}

export function Testimonials() {
  return (
    <section id="testimonials" className="relative px-5 py-[72px] md:px-8">
      <SectionHeader pill={<Pill>We are top-notch and our users know it</Pill>} title="What Our Users Say About Our Product" />
      <div className="mask-fade-x mx-auto mt-14 max-w-[1200px] space-y-6 px-1 lg:px-0">
        <div className="grid gap-6 md:grid-cols-2">
          {ROW1.map((t, i) => <Card key={t.name} t={t} i={i} className="" />)}
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {ROW2.map((t, i) => <Card key={t.name} t={t} i={i + 2} className="" />)}
        </div>
      </div>
    </section>
  )
}
