const PALETTE: Record<string, [string, string]> = {
  lavender: ['#d8d0ff', '#a99bff'],
  pink: ['#ffc9c9', '#ff9d9d'],
  slate: ['#5b6670', '#2f363c'],
  sand: ['#e8dcc8', '#c4b08e'],
  cocoa: ['#6b4a35', '#3b2619'],
  grey: ['#f1f1f1', '#cfcfcf'],
}

export type AvatarTone = keyof typeof PALETTE

function initials(name: string) {
  return name.split(/\s+/).map((p) => p[0]).slice(0, 2).join('').toUpperCase()
}

/** Stand-in for the memoji avatars in the design. Swap for real images when exported. */
export function Avatar({ name, tone = 'lavender', size = 32, ring = false }: { name: string; tone?: AvatarTone; size?: number; ring?: boolean }) {
  const [a, b] = PALETTE[tone]
  const dark = tone === 'slate' || tone === 'cocoa'
  return (
    <span
      role="img"
      aria-label={name}
      className={`inline-flex shrink-0 items-center justify-center rounded-full font-semibold ${ring ? 'ring-2 ring-[#1c1c1c]' : ''}`}
      style={{ width: size, height: size, fontSize: size * 0.36, background: `linear-gradient(145deg, ${a}, ${b})`, color: dark ? '#e9e9e9' : '#2b2b33' }}
    >
      {size >= 24 ? initials(name) : null}
    </span>
  )
}
