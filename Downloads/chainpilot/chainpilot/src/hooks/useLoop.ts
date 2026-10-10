import { useEffect, useState } from 'react'
import { useInView } from 'motion/react'
import type { RefObject } from 'react'

/**
 * Drives a looping illustration: returns an increasing tick only while the
 * element is on screen, so off-screen animations don't burn CPU.
 */
export function useLoop(ref: RefObject<Element | null>, ms: number) {
  const inView = useInView(ref, { amount: 0.35 })
  const [tick, setTick] = useState(0)
  useEffect(() => {
    if (!inView) return
    setTick((t) => t + 1)
    const id = window.setInterval(() => setTick((t) => t + 1), ms)
    return () => window.clearInterval(id)
  }, [inView, ms])
  return { tick, inView }
}
