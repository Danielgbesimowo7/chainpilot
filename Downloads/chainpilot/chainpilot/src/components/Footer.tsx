import { motion } from 'motion/react'
import { Logo, CubeGlyph } from './ui/Logo'

const COLS = [
  { title: 'Product', links: ['Dashboard', 'Payments', 'Analytics', 'Audit logs', 'Risk alerts'] },
  { title: 'Company', links: ['About us', 'Blogs', 'Careers', 'Security', 'Press kits'] },
  { title: 'Resources', links: ['Documentation', 'API reference', 'Changelogs', 'Status', 'Community'] },
]

const S = (p: { children: React.ReactNode }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f24800" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{p.children}</svg>
)
const SOCIALS = [
  { label: 'Facebook', icon: <S><path d="M14 8h2.5V4.5H14a3.5 3.5 0 00-3.5 3.5v2H8v3.5h2.5V21H14v-7.5h2.5L17 10h-3V8z" /></S> },
  { label: 'X', icon: <S><path d="M4 4l16 16M20 4L4 20" /></S> },
  { label: 'Instagram', icon: <S><rect x="4" y="4" width="16" height="16" rx="5" /><circle cx="12" cy="12" r="3.6" /><path d="M16.8 7.2h.01" strokeWidth="2.4" /></S> },
  { label: 'Telegram', icon: <S><path d="M21 4L3 11l6 2.5L11 20l3-4 5 3z" /><path d="M9 13.5L21 4" /></S> },
]

export function Footer() {
  return (
    <footer id="footer" className="relative overflow-hidden px-5 pb-16 pt-[120px] md:px-8">
      <div className="mx-auto max-w-[1200px]">
        <div className="flex flex-col gap-12 lg:flex-row lg:justify-between">
          <motion.div className="max-w-[379px]" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <Logo size={40} textClass="text-[32px]" />
            <p className="mt-4 text-2xl font-medium leading-9 text-muted">Cross-chain treasury management for DAOs, Protocol teams and Web3-native organisations.</p>
          </motion.div>

          <div className="flex flex-col items-start gap-12 lg:items-end">
            <div className="flex flex-wrap gap-x-16 gap-y-10">
              {COLS.map((c, i) => (
                <motion.nav key={c.title} aria-label={c.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 + i * 0.1 }}>
                  <h3 className="text-2xl font-semibold text-[#dedede]">{c.title}</h3>
                  <ul className="mt-6 flex flex-col gap-4">
                    {c.links.map((l) => (
                      <li key={l}><a href="#" className="text-2xl text-muted transition-colors hover:text-white">{l}</a></li>
                    ))}
                  </ul>
                </motion.nav>
              ))}
            </div>
            <div className="flex gap-4">
              {SOCIALS.map((s) => (
                <motion.a key={s.label} href="#" aria-label={s.label} whileHover={{ y: -3, backgroundColor: 'rgba(242,72,0,0.12)' }} className="flex size-[46px] items-center justify-center rounded-full border-2 border-brand">
                  {s.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 h-px bg-white/[0.06]" />
        <div className="mt-12 flex flex-col justify-between gap-3 text-xl text-muted md:flex-row">
          <p>© 2026 Chain Pilot. All rights reserved.</p>
          <p><a href="#" className="hover:text-white">Privacy Policy</a>. <a href="#" className="hover:text-white">Terms of Service</a>.</p>
        </div>
      </div>

      <motion.div
        aria-hidden="true"
        className="mx-auto mt-[116px] flex max-w-[960px] select-none items-center justify-center gap-3 md:gap-6"
        initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <CubeGlyph className="w-[14%] shrink-0" shade={0.62} />
        <span
          className="whitespace-nowrap text-[clamp(56px,13.4vw,190px)] font-bold leading-none tracking-tight text-transparent"
          style={{ backgroundImage: 'linear-gradient(110deg,#1d1d1d 38%,#303030 50%,#1d1d1d 62%)', backgroundSize: '250% 100%', WebkitBackgroundClip: 'text', backgroundClip: 'text', animation: 'shine 7s linear infinite' }}
        >
          Chain Pilot
        </span>
      </motion.div>
    </footer>
  )
}
