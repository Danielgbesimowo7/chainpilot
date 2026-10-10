export type Chain = 'eth' | 'sol' | 'base' | 'arb' | 'pol'

export const CHAIN_LABEL: Record<Chain, string> = {
  eth: 'Ethereum', sol: 'Solana', base: 'Base', arb: 'Arbitrum', pol: 'Polygon',
}

export function ChainIcon({ chain, size = 18, className }: { chain: Chain; size?: number; className?: string }) {
  const common = { width: size, height: size, viewBox: '0 0 32 32', className, role: 'img' as const, 'aria-label': CHAIN_LABEL[chain] }
  switch (chain) {
    case 'eth':
      return (
        <svg {...common}>
          <circle cx="16" cy="16" r="16" fill="#0a0a12" />
          <path d="M16 5l6 10.4-6 3.4-6-3.4z" fill="#a9b6ff" />
          <path d="M16 5v13.8l-6-3.4z" fill="#e4e8ff" />
          <path d="M16 20.4l6-3.4-6 9.6-6-9.6z" fill="#7d8cff" />
          <path d="M16 20.4v6.2L10 17z" fill="#b6c0ff" />
        </svg>
      )
    case 'sol':
      return (
        <svg {...common}>
          <defs>
            <linearGradient id="sol-g" x1="6" y1="26" x2="26" y2="6" gradientUnits="userSpaceOnUse">
              <stop stopColor="#9945ff" /><stop offset="1" stopColor="#14f195" />
            </linearGradient>
          </defs>
          <circle cx="16" cy="16" r="16" fill="#0a0a12" />
          <path d="M9.5 20.2h12.9l-1.9 2.2H7.6zM9.5 14.9h12.9l-1.9 2.2H7.6zM9.5 9.6h12.9l-1.9 2.2H7.6z" fill="url(#sol-g)" />
        </svg>
      )
    case 'base':
      return (
        <svg {...common}>
          <circle cx="16" cy="16" r="16" fill="#0052ff" />
          <path d="M16 7.5a8.5 8.5 0 100 17c4.4 0 8-3.4 8.5-7.7H8.2v-1.6h16.3A8.5 8.5 0 0016 7.5z" fill="#fff" />
        </svg>
      )
    case 'arb':
      return (
        <svg {...common}>
          <circle cx="16" cy="16" r="16" fill="#213147" />
          <path d="M16 5.5l8.4 4.8v9.4L16 24.5l-8.4-4.8v-9.4z" fill="#12aaff" opacity="0.25" />
          <path d="M16 6.8l7.3 4.2v8L16 23.2 8.7 19v-8z" stroke="#9dcced" strokeWidth="1.4" fill="none" />
          <path d="M13 21l3-9.2 3 9.2m-4.6-2.6h3.2" stroke="#fff" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    case 'pol':
      return (
        <svg {...common}>
          <circle cx="16" cy="16" r="16" fill="#8247e5" />
          <path d="M20.6 12.4l-3-1.7a1.5 1.5 0 00-1.5 0l-3 1.7a1.5 1.5 0 00-.8 1.3v3.5c0 .5.3 1 .8 1.3l1.2.7 1.2-.7-1-.6v-3.1l2.6-1.5 2.6 1.5v3.1l-2.6 1.5-1.6-.9v-1.4l1.6.9 1.4-.8v-1l-2.2-1.3a.6.6 0 00-.6 0l-2.2 1.3v2.7c0 .2.1.4.3.5l2.5 1.4c.3.2.6.2.9 0l3-1.7c.5-.3.8-.8.8-1.3v-3.5c0-.5-.3-1-.8-1.3z" fill="#fff" transform="translate(-.4 .2)" />
        </svg>
      )
  }
}
