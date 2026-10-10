import { useLayoutEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'

/** Renders fixed-size artwork at its design size and scales it down to fit narrower containers. */
export function ScaleToFit({ width, height, children, className = '' }: { width: number; height: number; children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const update = () => setScale(Math.min(1, el.clientWidth / width))
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [width])

  return (
    <div ref={ref} className={`mx-auto w-full ${className}`} style={{ maxWidth: width, height: height * scale }}>
      <div style={{ width, height, transform: `scale(${scale})`, transformOrigin: 'top left' }}>{children}</div>
    </div>
  )
}
