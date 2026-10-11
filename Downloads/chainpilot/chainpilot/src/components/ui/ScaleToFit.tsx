import { useLayoutEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'

type Props = {
  /** Design size of the artwork. */
  width: number
  height: number
  /** Widest the artwork may be displayed (defaults to its design width). */
  maxWidth?: number
  /** Show only the top part of the artwork (in design pixels). */
  cropHeight?: number
  /** Never shrink below this scale; the artwork is centred and its sides clipped instead. */
  minScale?: number
  children: ReactNode
  className?: string
}

/** Renders fixed-size artwork at its design size and scales it to fit the container. */
export function ScaleToFit({ width, height, maxWidth = width, cropHeight, minScale = 0, children, className = '' }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(maxWidth / width)
  const [offset, setOffset] = useState(0)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const update = () => {
      const s = Math.max(minScale, Math.min(1, el.clientWidth / width))
      setScale(s)
      setOffset(Math.min(0, (el.clientWidth - width * s) / 2))
    }
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [width, minScale])

  const visible = cropHeight ?? height
  return (
    <div ref={ref} className={`mx-auto w-full ${cropHeight || minScale ? 'overflow-hidden' : ''} ${className}`} style={{ maxWidth, height: visible * scale }}>
      <div style={{ width, height, transform: `scale(${scale})`, transformOrigin: 'top left', marginLeft: offset }}>{children}</div>
    </div>
  )
}
