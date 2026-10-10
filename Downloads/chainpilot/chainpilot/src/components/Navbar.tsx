import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Logo } from './ui/Logo'

const LINKS = [
  { label: 'Home', href: '#top' },
  { label: 'Product', href: '#product' },
  { label: 'Features', href: '#features' },
  { label: 'Pricing', href: '#pricing' },
]
const RESOURCES = ['Documentation', 'API reference', 'Changelogs', 'Status', 'Community']

function Chevron({ open }: { open: boolean }) {
  return (
    <motion.svg animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }} width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 9l6 6 6-6" stroke="#8a8a8a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </motion.svg>
  )
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [resources, setResources] = useState(false)
  const [active, setActive] = useState('#top')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const ids = LINKS.map((l) => l.href.slice(1)).filter((id) => id !== 'top')
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(`#${e.target.id}`)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    ids.forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el) })
    const top = () => window.scrollY < 300 && setActive('#top')
    window.addEventListener('scroll', top, { passive: true })
    return () => { io.disconnect(); window.removeEventListener('scroll', top) }
  }, [])

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-8 md:pt-7"
    >
      <nav
        aria-label="Primary"
        className={`relative mx-auto flex max-w-[1200px] items-center justify-between rounded-xl bg-card p-4 transition-all duration-500 ${scrolled ? 'shadow-[0_12px_40px_-12px_rgba(0,0,0,0.8)] ring-1 ring-white/[0.06]' : 'ring-1 ring-transparent'}`}
      >
        <Logo />

        <ul className="hidden items-center gap-8 lg:flex">
          {LINKS.map((l) => (
            <li key={l.href} className="relative">
              <a href={l.href} className={`text-xl font-medium transition-colors hover:text-white ${active === l.href ? 'text-white' : 'text-soft'}`}>
                {l.label}
              </a>
              {active === l.href && <motion.span layoutId="nav-underline" className="absolute -bottom-1.5 left-0 h-px w-full bg-brand" />}
            </li>
          ))}
          <li className="relative" onMouseEnter={() => setResources(true)} onMouseLeave={() => setResources(false)}>
            <button type="button" aria-expanded={resources} onClick={() => setResources((v) => !v)} className="flex items-center gap-1.5 text-xl font-medium text-soft transition-colors hover:text-white">
              Resources <Chevron open={resources} />
            </button>
            <AnimatePresence>
              {resources && (
                <motion.ul
                  initial={{ opacity: 0, y: 8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.98 }}
                  transition={{ duration: 0.18 }}
                  className="absolute left-1/2 top-full z-10 mt-3 w-52 -translate-x-1/2 rounded-xl bg-card p-2 shadow-2xl ring-1 ring-white/[0.08]"
                >
                  {RESOURCES.map((r) => (
                    <li key={r}><a href="#footer" className="block rounded-lg px-3 py-2 text-base text-soft transition-colors hover:bg-surface hover:text-white">{r}</a></li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </li>
        </ul>

        <div className="flex items-center gap-3">
          <a href="#" className="btn-border hidden h-12 w-[106px] items-center justify-center rounded-xl bg-surface text-base font-medium text-white transition-colors hover:bg-[#333] sm:inline-flex">Log in</a>
          <button type="button" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen((v) => !v)} className="flex size-11 flex-col items-center justify-center gap-1.5 rounded-xl bg-surface lg:hidden">
            <span className={`h-0.5 w-5 bg-white transition-transform ${open ? 'translate-y-2 rotate-45' : ''}`} />
            <span className={`h-0.5 w-5 bg-white transition-opacity ${open ? 'opacity-0' : ''}`} />
            <span className={`h-0.5 w-5 bg-white transition-transform ${open ? '-translate-y-2 -rotate-45' : ''}`} />
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="absolute inset-x-0 top-full mt-2 rounded-xl bg-card p-4 ring-1 ring-white/[0.08] lg:hidden">
              <ul className="flex flex-col gap-1">
                {[...LINKS, { label: 'Resources', href: '#footer' }].map((l) => (
                  <li key={l.label}><a href={l.href} onClick={() => setOpen(false)} className="block rounded-lg px-3 py-3 text-lg text-soft hover:bg-surface hover:text-white">{l.label}</a></li>
                ))}
                <li><a href="#" className="mt-2 block rounded-xl bg-surface px-3 py-3 text-center text-base font-medium text-white">Log in</a></li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  )
}
