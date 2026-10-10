type LogoMarkProps = { size?: number; className?: string }

export function LogoMark({ size = 40, className }: LogoMarkProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="cp-logo-g" x1="6" y1="2" x2="34" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ff6a2b" />
          <stop offset="1" stopColor="#e03d00" />
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="10" fill="url(#cp-logo-g)" />
      <path d="M20 9.5l9 5.1v10.8l-9 5.1-9-5.1V14.6z" stroke="#fff" strokeWidth="1.9" strokeLinejoin="round" fill="rgba(255,255,255,0.14)" />
      <path d="M11.2 14.8L20 19.9l8.8-5.1M20 19.9v10.4" stroke="#fff" strokeWidth="1.9" strokeLinejoin="round" />
    </svg>
  )
}

/** Large greyscale cube used in the stats strip and footer watermark. */
export function CubeGlyph({ className, shade = 1 }: { className?: string; shade?: number }) {
  const a = Math.round(90 * shade), b = Math.round(62 * shade), c = Math.round(38 * shade)
  return (
    <svg viewBox="0 0 140 160" className={className} aria-hidden="true">
      <path d="M70 4l66 38-66 38L4 42z" fill={`rgb(${a},${a},${a})`} />
      <path d="M4 42l66 38v76L4 118z" fill={`rgb(${b},${b},${b})`} />
      <path d="M136 42L70 80v76l66-38z" fill={`rgb(${c},${c},${c})`} />
    </svg>
  )
}

export function Logo({ size = 40, textClass = 'text-2xl' }: { size?: number; textClass?: string }) {
  return (
    <a href="#top" className="flex items-center gap-3" aria-label="Chain Pilot home">
      <LogoMark size={size} />
      <span className={`${textClass} font-medium text-white whitespace-nowrap`}>Chain Pilot</span>
    </a>
  )
}
