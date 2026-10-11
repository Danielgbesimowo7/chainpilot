import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { CountUp } from './ui/CountUp'
import { CubeGlyph } from './ui/Logo'
import { Reveal } from './ui/Reveal'

const glyph = (children: ReactNode) => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round" aria-hidden="true">{children}</svg>
)

const LOGOS: { name: string; mark: ReactNode; weight?: string }[] = [
  { name: 'Constellation', weight: 'font-bold', mark: glyph(<><circle cx="12" cy="12" r="3" /><circle cx="29" cy="14" r="3" /><circle cx="20" cy="29" r="3" /><path d="M14.5 13l11.5 1M13.5 14.5l5 12M27.5 16.5l-6 10.5" /></>) },
  { name: 'NovaDAO', mark: glyph(<><rect x="7" y="9" width="17" height="17" rx="3" /><rect x="15" y="14" width="17" height="17" rx="3" /></>) },
  { name: 'Uniswap', weight: 'font-medium', mark: glyph(<><circle cx="20" cy="20" r="12" /><path d="M14 22c2 4 10 4 12 0M15 15l3 2M25 15l-3 2" /></>) },
  { name: 'Orbitrum', mark: glyph(<><circle cx="15" cy="20" r="9" fill="currentColor" fillOpacity="0.55" /><circle cx="25" cy="20" r="9" /></>) },
  { name: 'Compound', mark: glyph(<><path d="M20 6l12 7v14l-12 7-12-7V13z" fill="currentColor" fillOpacity="0.45" /><path d="M25 16h-5a4 4 0 000 8h5" /></>) },
  { name: 'LayerFund', mark: glyph(<><path d="M20 7l13 7-13 7-13-7z" /><path d="M7 20l13 7 13-7M7 26l13 7 13-7" /></>) },
]

function Stat({ children, label, delay }: { children: ReactNode; label: string; delay: number }) {
  return (
    <Reveal delay={delay} className="text-center">
      <div className="text-3xl font-medium text-brand md:text-[44px] md:leading-[52px]">{children}</div>
      <div className="mx-auto mt-1 max-w-[190px] text-base leading-7 text-muted md:text-xl md:leading-[29px]">{label}</div>
    </Reveal>
  )
}

export function LogosStrip() {
  const row = [...LOGOS, ...LOGOS]
  return (
    <section aria-label="Trusted by" className="relative pb-20 pt-10 md:pt-14">
      <Reveal><h2 className="text-center text-2xl font-medium text-soft md:text-[28px]">Trusted By</h2></Reveal>

      <div className="mask-fade-x relative mx-auto mt-10 max-w-[1440px] overflow-hidden">
        <div className="flex w-max animate-marquee items-center gap-24 pr-24 hover:[animation-play-state:paused]">
          {row.map((l, i) => (
            <div key={l.name + i} className="flex items-center gap-3 text-[#7a7a7a] transition-colors hover:text-soft" aria-hidden={i >= LOGOS.length}>
              {l.mark}
              <span className={`text-[28px] tracking-tight ${l.weight ?? 'font-normal'}`}>{l.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="relative mx-auto mt-20 flex max-w-[1200px] items-center justify-center gap-10 px-6 md:gap-24">
        <motion.div className="hidden w-[78px] shrink-0 animate-float lg:block" initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.9 }}>
          <CubeGlyph shade={0.95} />
        </motion.div>
        <div className="flex flex-wrap items-start justify-center gap-x-16 gap-y-8 md:gap-x-24">
          <Stat delay={0} label="Treasure Value managed"><CountUp to={840} format={(n) => `$${Math.round(n)}m+`} /></Stat>
          <Stat delay={0.1} label="DAO teams onboarded"><CountUp to={214} /></Stat>
          <Stat delay={0.2} label="Naturally supported"><CountUp to={5} duration={1} format={(n) => `${Math.round(n)} Chains`} /></Stat>
        </div>
        <motion.div className="hidden w-[78px] shrink-0 animate-float-slow lg:block" style={{ animationDelay: '-3s' }} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.2 }}>
          <CubeGlyph shade={0.7} />
        </motion.div>
      </div>
    </section>
  )
}
