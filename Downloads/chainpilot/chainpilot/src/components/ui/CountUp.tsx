import { useEffect, useRef, useState } from 'react'
import { animate, useInView } from 'motion/react'

type Props = {
  to: number
  from?: number
  duration?: number
  delay?: number
  format?: (n: number) => string
  /** When set, re-runs whenever this changes (for looping illustrations). */
  trigger?: unknown
  className?: string
}

export function CountUp({ to, from = 0, duration = 1.6, delay = 0, format = (n) => Math.round(n).toLocaleString('en-US'), trigger, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: false, amount: 0.4 })
  const [value, setValue] = useState(from)

  useEffect(() => {
    if (!inView) return
    const controls = animate(from, to, { duration, delay, ease: [0.16, 1, 0.3, 1], onUpdate: setValue })
    return () => controls.stop()
  }, [inView, to, from, duration, delay, trigger])

  return <span ref={ref} className={className}>{format(value)}</span>
}
