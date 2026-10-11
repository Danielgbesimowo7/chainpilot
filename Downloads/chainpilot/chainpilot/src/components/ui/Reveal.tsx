import type { ReactNode } from 'react'
import { motion } from 'motion/react'

type Props = { children: ReactNode; delay?: number; y?: number; className?: string; as?: 'div' | 'li' | 'section' }

export function Reveal({ children, delay = 0, y = 28, className, as = 'div' }: Props) {
  const Tag = motion[as]
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Tag>
  )
}

export function SectionHeader({ pill, title, body, titleClass = 'text-[28px] leading-[1.15] sm:text-4xl md:text-5xl' }: { pill?: ReactNode; title: ReactNode; body?: ReactNode; titleClass?: string }) {
  return (
    <div className="mx-auto flex max-w-[823px] flex-col items-center gap-6 text-center">
      {pill && <Reveal>{pill}</Reveal>}
      <Reveal delay={0.08}><h2 className={`text-gradient font-medium leading-tight ${titleClass}`}>{title}</h2></Reveal>
      {body && <Reveal delay={0.16}><p className="text-base leading-7 text-muted sm:text-lg md:text-2xl md:leading-9">{body}</p></Reveal>}
    </div>
  )
}
