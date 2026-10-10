import type { ReactNode } from 'react'
import { motion } from 'motion/react'

type Props = { children: ReactNode; variant?: 'primary' | 'secondary'; href?: string; className?: string; onClick?: () => void }

export function Button({ children, variant = 'primary', href = '#', className = '', onClick }: Props) {
  const tone = variant === 'primary' ? 'bg-brand shadow-[0_0_0_0_rgba(242,72,0,0)] hover:shadow-[0_8px_30px_-6px_rgba(242,72,0,0.6)]' : 'bg-surface hover:bg-[#303030]'
  return (
    <motion.a
      href={href}
      onClick={onClick}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={`btn-border inline-flex h-12 items-center justify-center rounded-xl px-3 py-2 text-base font-medium text-white transition-shadow duration-300 ${tone} ${className}`}
    >
      {children}
    </motion.a>
  )
}
