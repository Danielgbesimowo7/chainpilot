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

function Card({ t }: { t: T }) {
  return (
    <motion.figure
      whileHover={{ y: -4 }}
      className="group flex w-[300px] shrink-0 flex-col justify-between gap-6 whitespace-normal rounded-2xl bg-card p-5 ring-1 ring-white/[0.03] transition-shadow hover:ring-white/[0.09] sm:w-[440px] sm:p-6 lg:w-[560px]"
    >
      <blockquote className="text-base italic leading-7 md:leading-9 sm:text-xl text-[#9a9a9a] transition-colors duration-500 group-hover:text-soft md:text-2xl">{t.quote}</blockquote>
      <figcaption className="flex items-center gap-3 border-t border-white/[0.07] pt-6">
        <Avatar name={t.name} tone={t.tone} size={60} />
        <div>
          <div className={`text-base text-soft sm:text-xl md:text-2xl ${t.caps ? 'uppercase' : ''}`}>{t.name}</div>
          <div className="text-base text-muted">{t.role}</div>
        </div>
      </figcaption>
    </motion.figure>
  )
}

function MarqueeRow({ items, reverse, duration }: { items: T[]; reverse?: boolean; duration: number }) {
  // Two identical halves; the track slides exactly one half, so the loop is seamless.
  return (
    <div className="group/row overflow-hidden">
      <div
        className="flex w-max motion-reduce:!animate-none group-hover/row:[animation-play-state:paused]"
        style={{ animation: `marquee ${duration}s linear infinite ${reverse ? 'reverse' : 'normal'}` }}
      >
        {[0, 1].map((half) => (
          <div key={half} className="flex shrink-0 gap-6 pr-6" aria-hidden={half === 1 || undefined}>
            {items.map((t) => <Card key={t.name} t={t} />)}
          </div>
        ))}
      </div>
    </div>
  )
}

export function Testimonials() {
  return (
    <section id="testimonials" className="relative overflow-hidden py-[72px]">
      <div className="px-5 md:px-8">
        <SectionHeader pill={<Pill>We are top-notch and our users know it</Pill>} title="What Our Users Say About Our Product" />
      </div>
      <div className="mask-fade-x mt-14 space-y-6">
        <MarqueeRow items={ROW1} duration={50} />
        <MarqueeRow items={ROW2} reverse duration={60} />
      </div>
    </section>
  )
}
