import type { ReactNode } from 'react'

export function Pill({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 rounded-full bg-surface p-2 pr-3 text-base font-medium text-[rgba(207,207,207,0.48)] ${className}`}>
      <span className="relative ml-1 inline-flex size-3 items-center justify-center">
        <span className="absolute inset-0 rounded-full bg-success/40 animate-ping-ring" />
        <span className="relative size-2.5 rounded-full bg-success" />
      </span>
      {children}
    </span>
  )
}
