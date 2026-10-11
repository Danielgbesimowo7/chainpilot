import { motion } from 'motion/react'
import type { CSSProperties, ReactNode } from 'react'
import { ChainIcon } from './ui/ChainIcon'
import type { Chain } from './ui/ChainIcon'
import { Avatar } from './ui/Avatar'
import type { AvatarTone } from './ui/Avatar'
import { CountUp } from './ui/CountUp'
import { LogoMark } from './ui/Logo'
import { OVERVIEW_BASE, OVERVIEW_IN, OVERVIEW_OUT, ptsArea, ptsPath } from '../data/chart'

/** The dashboard is drawn at the exact size of the Figma "Dahboard overview" frame (1440 x 1553). */
export const DASHBOARD_SIZE = { width: 1440, height: 1553 }

const ease = [0.16, 1, 0.3, 1] as const
const view = { once: true, amount: 0.05 } as const

function Icon({ d, size = 20, className, sw = 1.6 }: { d: string; size?: number; className?: string; sw?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d={d} />
    </svg>
  )
}

const I = {
  home: 'M4 11l8-7 8 7v8a1 1 0 01-1 1h-4v-5H9v5H5a1 1 0 01-1-1z',
  wallet: 'M3 7a2 2 0 012-2h13v3M3 7v10a2 2 0 002 2h15V8H5a2 2 0 01-2-1zM16 13.5h2',
  pay: 'M4 10l7-7 9 9-7 7zM8.5 8.5h.01',
  chart: 'M5 20V10M10 20V4M15 20v-7M20 20V8',
  doc: 'M6 3h8l4 4v14H6zM14 3v4h4M9 12h6M9 16h4',
  users: 'M16 20v-1.5a3.5 3.5 0 00-3.5-3.5h-5A3.5 3.5 0 004 18.5V20M10 12a3.5 3.5 0 100-7 3.5 3.5 0 000 7zM20 20v-1.5a3.5 3.5 0 00-2.5-3.3M15.5 5.2a3.5 3.5 0 010 6.6',
  shield: 'M12 3l7 3v5.5c0 4.5-3 7.5-7 9.5-4-2-7-5-7-9.5V6zM12 10v4M12 8h.01',
  log: 'M6 3h8l4 4v14H6zM14 3v4h4M11 16a2 2 0 100-4 2 2 0 000 4zM12.5 15.5L15 18',
  alert: 'M12 4l9 16H3zM12 10v4M12 17h.01',
  settings: 'M12 15a3 3 0 100-6 3 3 0 000 6zM12 3v2.5M12 18.5V21M3 12h2.5M18.5 12H21M5.6 5.6l1.8 1.8M16.6 16.6l1.8 1.8M18.4 5.6l-1.8 1.8M7.4 16.6l-1.8 1.8',
  info: 'M12 21a9 9 0 100-18 9 9 0 000 18zM12 11v5M12 8h.01',
  search: 'M11 19a8 8 0 100-16 8 8 0 000 16zM21 21l-4.3-4.3',
  clock: 'M12 21a9 9 0 100-18 9 9 0 000 18zM12 7v5l3 2',
  moon: 'M20 14A8 8 0 1110 4a6.5 6.5 0 0010 10z',
  bell: 'M6 9a6 6 0 1112 0c0 6 2 7 2 7H4s2-1 2-7zM10 20a2 2 0 004 0',
  plus: 'M12 5v14M5 12h14',
  arrowRight: 'M4 12h16M14 6l6 6-6 6',
  upRight: 'M7 17L17 7M8 7h9v9',
  down: 'M6 9l6 6 6-6',
  right: 'M9 6l6 6-6 6',
  sidebar: 'M4 5h16v14H4zM14 5v14',
}

/* ---------- shared bits ---------- */

function Box({ x, y, w, h, delay = 0, className = '', children }: { x: number; y: number; w: number; h: number; delay?: number; className?: string; children: ReactNode }) {
  return (
    <motion.div
      className={`absolute rounded-[12px] border border-[#232323] bg-white/[0.01] ${className}`}
      style={{ left: x, top: y, width: w, height: h }}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={view}
      transition={{ delay, duration: 0.75, ease }}
    >
      {children}
    </motion.div>
  )
}

const Title = ({ children }: { children: ReactNode }) => <p className="text-[20px] font-semibold leading-[normal] text-[#95959c]">{children}</p>

function ViewAll() {
  return (
    <div className="flex items-center gap-[7px] text-[16px] font-medium text-[#727279]">
      View all <Icon d={I.arrowRight} size={20} />
    </div>
  )
}

function LiveDot({ size = 12 }: { size?: number }) {
  return (
    <span className="relative inline-flex shrink-0" style={{ width: size, height: size }}>
      <span className="absolute inset-0 animate-ping-ring rounded-full bg-success/50" />
      <span className="relative inline-flex size-full items-center justify-center rounded-full bg-success/25">
        <span className="size-[62%] rounded-full bg-success" />
      </span>
    </span>
  )
}

/** Table row wrapper: staggered slide-in. */
function Row({ i, cols, children, className = '' }: { i: number; cols: string; children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={`grid h-[44px] items-center border-b border-[rgba(103,99,99,0.1)] ${className}`}
      style={{ gridTemplateColumns: cols }}
      initial={{ opacity: 0, x: -14 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={view}
      transition={{ delay: 1.1 + i * 0.1, duration: 0.55, ease }}
    >
      {children}
    </motion.div>
  )
}

function HeadRow({ cols, heads }: { cols: string; heads: string[] }) {
  return (
    <div className="grid h-[40px] items-center rounded-[8px] bg-white/[0.05] text-[14px] font-medium text-[rgba(207,207,207,0.48)]" style={{ gridTemplateColumns: cols }}>
      {heads.map((h) => <span key={h} className="px-2">{h}</span>)}
    </div>
  )
}

const dim = 'text-[14px] font-medium text-[rgba(207,207,207,0.48)]'
const bright = 'text-[14px] font-medium text-[#cfcfcf]'

/* ---------- sidebar ---------- */

type Item = { label: string; icon: string; size?: number; badge?: number; active?: boolean }
const NAV: { group: string; items: Item[] }[] = [
  { group: 'Main', items: [
    { label: 'Dashboard', icon: I.home, size: 20, active: true }, { label: 'Wallets', icon: I.wallet, size: 18 },
    { label: 'Payments', icon: I.pay, size: 18, badge: 3 }, { label: 'Analytics', icon: I.chart, size: 18 },
  ] },
  { group: 'Governance', items: [
    { label: 'Proposals', icon: I.doc, size: 18 }, { label: 'Signers', icon: I.users, size: 18 }, { label: 'Permissions', icon: I.shield, size: 18 },
  ] },
  { group: 'Monitoring', items: [
    { label: 'Audit logs', icon: I.log, size: 18 }, { label: 'Risk alerts', icon: I.alert, size: 18, badge: 2 },
  ] },
]

const GroupLabel = ({ children, open }: { children: ReactNode; open?: boolean }) => (
  <div className="flex items-center gap-2 px-2 text-[16px] font-medium text-[rgba(149,149,156,0.4)]">
    <Icon d={I.down} size={20} className={open ? '' : ''} />{children}
  </div>
)

function NavRow({ it, delay }: { it: Item; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={view} transition={{ delay, duration: 0.5, ease }}
      className={`flex items-center justify-between rounded-[8px] p-2 ${it.active ? 'bg-white/[0.07]' : ''}`}
    >
      <div className="flex items-center gap-3">
        <Icon d={it.icon} size={it.size ?? 18} className={it.active ? 'text-[#cfcfcf]' : 'text-[#727279]'} />
        <p className={`text-[18px] leading-[normal] ${it.active ? 'text-[#cfcfcf]' : 'text-[#727279]'}`}>{it.label}</p>
      </div>
      {it.badge && <span className="flex size-[18px] items-center justify-center rounded-full bg-brand text-[12px] font-medium text-[#e6edf3]">{it.badge}</span>}
    </motion.div>
  )
}

function Sidebar() {
  return (
    <div className="absolute left-0 top-0 flex h-[1024px] w-[300px] flex-col items-center justify-between border-r border-[#232323] bg-[#171717] p-4">
      <div className="flex w-[270px] flex-col gap-6">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <LogoMark size={32} />
              <p className="text-[20px] font-medium text-white">Chain Pilot</p>
            </div>
            <Icon d={I.sidebar} size={24} className="text-[#cfcfcf]/70" />
          </div>
          <div className="flex items-center gap-3 rounded-[8px] bg-white/[0.03] px-2 py-3">
            <Icon d={I.search} size={20} className="text-[#727279]" />
            <p className="text-[16px] text-[#727279]">Search anything...</p>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          {NAV.map((g, gi) => (
            <div key={g.group} className={gi ? 'border-t border-white/[0.06] pt-4' : ''}>
              <div className="flex flex-col gap-3">
                <GroupLabel>{g.group}</GroupLabel>
                <div className="flex flex-col gap-2">
                  {g.items.map((it, i) => <NavRow key={it.label} it={it} delay={0.4 + gi * 0.12 + i * 0.06} />)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex w-[267px] flex-col gap-6">
        <div className="flex flex-col gap-3">
          <GroupLabel>Account</GroupLabel>
          <div className="flex flex-col gap-2">
            <NavRow it={{ label: 'Settings', icon: I.settings }} delay={1} />
            <NavRow it={{ label: 'Help', icon: I.info }} delay={1.06} />
          </div>
        </div>
        <div className="h-[56px] rounded-[8px] bg-[#1c1c1c] p-1">
          <div className="flex size-full items-center justify-between rounded-[6px] bg-white/[0.03] px-3 py-1">
            <div className="flex items-center gap-2">
              <Avatar name="Daniel Gbesimowo" tone="lavender" size={28} />
              <div className="flex w-[142px] flex-col gap-[2px] font-medium">
                <p className="text-[14px] leading-[normal] text-[#cdcdcd]">Daniel Gbesimowo</p>
                <p className="text-[12px] leading-[normal] text-[rgba(149,149,156,0.57)]">Treasury Lead</p>
              </div>
            </div>
            <Icon d={I.down} size={20} className="text-[#cfcfcf]/70" />
          </div>
        </div>
      </div>
    </div>
  )
}

/* ---------- top bar ---------- */

const TEAM: { n: string; t: AvatarTone }[] = [
  { n: 'Maya Rodriguez', t: 'sand' }, { n: 'Amare Lee', t: 'pink' }, { n: 'Daniel Ross', t: 'lavender' }, { n: 'Priya Solis', t: 'cocoa' },
]

const ringBtn = 'flex items-center rounded-[8px] border-2 border-[rgba(170,206,255,0.11)] p-2 gap-1'

function TopBar() {
  return (
    <div className="absolute left-[300px] top-0 flex h-[64px] w-[1140px] items-center justify-between border-b border-[#232323] bg-[#171717] py-[14px] pl-7 pr-8">
      <div className="flex items-center gap-6">
        <div className="flex items-end gap-[2px]">
          <div className="flex items-start gap-[2px] text-[16px] font-medium text-[rgba(149,149,156,0.4)]">Main<Icon d={I.right} size={20} /></div>
          <p className="text-[18px] font-medium text-[#cfcfcf]">Dashboard</p>
        </div>
        <div className="flex items-center gap-2 rounded-full bg-[#272727] p-2">
          <LiveDot size={12} />
          <p className="text-[12px] font-medium text-[#cfcfcf]">All chains Live</p>
        </div>
      </div>
      <div className="flex items-center gap-5">
        <div className="flex items-center">
          {TEAM.map((m, i) => (
            <motion.span key={m.n} className="-mr-3 inline-flex" initial={{ opacity: 0, scale: 0.6 }} whileInView={{ opacity: 1, scale: 1 }} viewport={view} transition={{ delay: 0.5 + i * 0.08, type: 'spring', stiffness: 380, damping: 18 }}>
              <Avatar name={m.n} tone={m.t} size={28} ring />
            </motion.span>
          ))}
          <span className="rounded-[20px] bg-[#303030] p-1 text-[12px] font-medium text-[#cfcfcf]">+5</span>
        </div>
        <span className="h-[30px] w-px bg-white/10" />
        <div className="flex items-center gap-2">
          <span className="rounded-full border border-[#232323] p-2 text-[#cfcfcf]/80"><Icon d={I.clock} size={19} /></span>
          <span className="rounded-full border border-[#232323] p-2 text-[#cfcfcf]/80"><Icon d={I.moon} size={19} /></span>
          <span className="relative rounded-full border border-[#232323] p-2 text-[#cfcfcf]/80">
            <Icon d={I.bell} size={19} />
            <motion.span
              className="absolute left-[18px] top-[-2px] flex size-4 items-center justify-center rounded-full bg-danger text-[10.667px] font-medium text-[#e6edf3]"
              animate={{ scale: [1, 1.18, 1] }} transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            >3</motion.span>
          </span>
        </div>
        <span className="h-[30px] w-px bg-white/10" />
        <div className={`${ringBtn} bg-[#272727] text-[16px] font-medium text-white`}>Export <Icon d={I.down} size={20} /></div>
        <div className={`${ringBtn} bg-brand text-[16px] font-medium text-white`}><Icon d={I.plus} size={20} />New payment</div>
      </div>
    </div>
  )
}

/* ---------- KPIs ---------- */

const KPI_GLOW: CSSProperties = {
  background: 'radial-gradient(ellipse 62% 55% at 58% 118%, rgba(242,72,0,0.34), rgba(242,72,0,0.12) 55%, transparent 80%)',
}

function Kpi({ i, label, foot, children, runway }: { i: number; label: string; foot: ReactNode; children: ReactNode; runway?: boolean }) {
  return (
    <motion.div
      className={`relative h-[143px] w-[252px] shrink-0 overflow-hidden rounded-[12px] border border-[#232323] ${runway ? 'bg-white/[0.01] px-4 py-3' : 'bg-[#1c1c1c] p-4'}`}
      initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={view} transition={{ delay: 0.15 + i * 0.1, duration: 0.7, ease }}
    >
      <div className="pointer-events-none absolute inset-0" style={KPI_GLOW} />
      <motion.span
        className={`absolute left-0 h-5 w-1 rounded-l-[4px] bg-brand ${runway ? 'top-[13px]' : 'top-4'}`}
        initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={view} transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
      />
      <div className={`relative flex flex-col items-start ${runway ? 'gap-[9px]' : 'gap-2'}`}>
        <p className="text-[20px] font-medium leading-[normal] text-[#95959c]">{label}</p>
        <p className="font-['Segoe_UI',Inter,sans-serif] text-[36px] font-semibold leading-[normal] text-white/80">{children}</p>
        {foot}
      </div>
    </motion.div>
  )
}

const Delta = ({ v, tone }: { v: string; tone: 'ok' | 'up' }) => (
  <div className="flex items-center">
    <Icon d={I.upRight} size={20} className="text-success" />
    <span className={`rounded-[54px] p-1 text-[12px] font-medium ${tone === 'ok' ? 'bg-[rgba(0,254,190,0.12)] text-success' : 'bg-[rgba(0,254,190,0.12)] text-success'}`}>{v}</span>
  </div>
)

const Dot = () => <span className="size-1 rounded-full bg-[#95959c]" />

function KpiSection() {
  return (
    <div className="absolute left-[328px] top-[88px] flex w-[1080px] items-center gap-6">
      <Kpi i={0} label="Total Treasury" foot={
        <div className="flex items-center gap-2"><Delta v="+0.8%" tone="ok" /><Dot /><span className="text-[12px] text-[#95959c]">Last 7 days</span></div>
      }>
        <CountUp to={4.82} duration={1.8} format={(n) => `$${n.toFixed(2)}m`} />
      </Kpi>
      <Kpi i={1} label="Stablecoin Ratio" foot={
        <div className="flex items-center gap-2 py-1 text-[12px] text-[#95959c]"><span className="whitespace-pre">{'$2.96m   '}<b className="font-medium">USDC/DAI</b></span></div>
      }>
        <CountUp to={61.4} duration={1.8} format={(n) => `${n.toFixed(1)}%`} />
      </Kpi>
      <Kpi i={2} label="Monthly Burn" foot={
        <div className="flex items-center gap-2"><Delta v="+6.2%" tone="up" /><Dot /><span className="text-[12px] text-[#95959c]">MoM</span></div>
      }>
        <CountUp to={497} duration={1.8} format={(n) => `$${Math.round(n)}k`} />
      </Kpi>
      <Kpi i={3} runway label="Runway" foot={
        <div className="flex w-[219px] items-start justify-between">
          <span className="rounded-[54px] bg-[#272727] px-2 py-1 text-[12px] font-medium text-[rgba(207,207,207,0.48)]">At current burn</span>
          <div className="relative w-[108px]">
            <div className="absolute left-0 top-1 h-[2px] w-[108px] rounded-[9px] bg-[rgba(0,200,150,0.44)]" />
            <motion.div className="absolute left-0 top-1 h-[2px] rounded-[9px] bg-success" initial={{ width: 0 }} whileInView={{ width: 69.77 }} viewport={view} transition={{ delay: 1.2, duration: 1.2, ease }} />
            <div className="relative flex items-end gap-2 text-[8px] font-medium leading-[10px]">
              <span className="pt-[11px] text-success">Now</span>
              {['6 mo', '12 mo', '18 mo'].map((t) => (
                <span key={t} className="relative pt-[11px] text-[rgba(207,207,207,0.48)]">
                  <i className="absolute left-1/2 top-0 h-[9px] w-px bg-[rgba(207,207,207,0.3)]" />{t}
                </span>
              ))}
            </div>
          </div>
        </div>
      }>
        <CountUp to={10} duration={1.4} format={(n) => `${Math.round(n)} months`} />
      </Kpi>
    </div>
  )
}

/* ---------- inflow vs outflow ---------- */

const Y_AXIS = ['$1m', '$800k', '$600k', '$400k', '$200k']
const X_AXIS = ['Jan', 'Feb', 'Mar', 'April', 'May', 'Jun']
const RANGES = ['30 days', '6 months', 'YTD', '1 year']

const Ring = ({ c }: { c: string }) => (
  <span className="inline-flex size-2 shrink-0 items-center justify-center rounded-full" style={{ background: c }}><span className="size-[3px] rounded-full bg-white" /></span>
)

function LegendLine({ c }: { c: string }) {
  return (
    <svg width="24" height="8" viewBox="0 0 24 8" aria-hidden="true">
      <path d="M0 4h24" stroke={c} strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="12" cy="4" r="3.2" fill={c} stroke="#fff" strokeWidth="1" />
    </svg>
  )
}

function ChartPanel() {
  const stats = [
    { l: 'Total Inflow', v: '$3.02m', f: <span>6 month period</span>, dot: '#00c896', w: 126, cls: 'rounded-l-[6px]' },
    { l: 'Total Outflow', v: '$2.98', f: <span>6 month period</span>, dot: '#f24800', w: 127, cls: 'border-l border-[#232323]' },
    { l: 'Avg Monthly Burn', v: '$497k', f: <span>Stable vs prev period</span>, w: 128, cls: 'border-l border-[#232323]' },
    { l: 'Net Change', v: '+$40k', f: <span><b className="font-medium text-success">+33.2%</b> vs prev period</span>, w: 126, cls: 'rounded-r-[6px] border-l border-[#232323]' },
  ]
  return (
    <Box x={328} y={255} w={644} h={438} delay={0.5} className="overflow-hidden">
      {/* header */}
      <div className="absolute left-4 right-4 top-4 flex items-center justify-between">
        <Title>Inflow vs Outflow</Title>
        <div className="flex items-center gap-1 rounded-[11px] bg-white/[0.02] p-1">
          {RANGES.map((r) => (
            <span key={r} className={`flex h-8 items-center justify-center rounded-[8px] p-2 text-[14px] ${r === '6 months' ? 'bg-white/[0.07] font-medium text-white' : 'text-[#cfcfcf]'}`}>{r}</span>
          ))}
        </div>
      </div>

      {/* axes */}
      <div className="absolute left-4 top-[83.6px] flex h-[213px] w-[56px] flex-col justify-between px-1 text-[14px] text-white/80">
        {Y_AXIS.map((t) => <span key={t} className="leading-[normal]">{t}</span>)}
      </div>
      <div className="absolute left-[79.8px] top-[309.5px] flex h-[17.5px] w-[544px] justify-between px-1 text-[14px] text-white/80">
        {X_AXIS.map((t) => <span key={t} className="leading-[normal]">{t}</span>)}
      </div>

      {/* lines, drawn in this panel's own pixel space */}
      <svg className="absolute left-0 top-0 overflow-visible" width="644" height="438" viewBox="0 0 644 438" fill="none">
        <defs>
          <linearGradient id="ov-out" x1="0" y1="100" x2="0" y2="288" gradientUnits="userSpaceOnUse">
            <stop stopColor="#f24800" stopOpacity="0.45" /><stop offset="1" stopColor="#f24800" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="ov-in" x1="0" y1="95" x2="0" y2="288" gradientUnits="userSpaceOnUse">
            <stop stopColor="#00c896" stopOpacity="0.36" /><stop offset="1" stopColor="#00c896" stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.path d={ptsArea(OVERVIEW_OUT, OVERVIEW_BASE)} fill="url(#ov-out)" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={view} transition={{ delay: 1.6, duration: 1.2 }} />
        <motion.path d={ptsArea(OVERVIEW_IN, OVERVIEW_BASE)} fill="url(#ov-in)" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={view} transition={{ delay: 1.8, duration: 1.2 }} />
        <motion.path d={ptsPath(OVERVIEW_OUT)} stroke="#f24800" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={view} transition={{ delay: 0.8, duration: 2, ease: 'easeInOut' }} />
        <motion.path d={ptsPath(OVERVIEW_IN)} stroke="#00c896" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={view} transition={{ delay: 1, duration: 2, ease: 'easeInOut' }} />
        {/* selected month */}
        <motion.g initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={view} transition={{ delay: 2.8, duration: 0.6 }}>
          <line x1="404" x2="404" y1="92" y2="288" stroke="white" strokeOpacity="0.4" strokeDasharray="3 4" />
          <circle cx="404" cy="148" r="4" fill="#f24800" stroke="#fff" strokeWidth="1.5" />
          <circle cx="404" cy="245" r="4" fill="#00c896" stroke="#fff" strokeWidth="1.5" />
          <motion.circle cx="404" cy="148" r="4" fill="none" stroke="#f24800" strokeWidth="1.2" animate={{ r: [4, 11], opacity: [0.7, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }} />
          <motion.circle cx="404" cy="245" r="4" fill="none" stroke="#00c896" strokeWidth="1.2" animate={{ r: [4, 11], opacity: [0.7, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeOut', delay: 1 }} />
        </motion.g>
      </svg>

      {/* tooltip */}
      <motion.div
        className="absolute left-[225px] top-[76px] flex w-[165px] flex-col gap-1 rounded-[6px] bg-[#171717] p-2 shadow-[0_6px_3.3px_rgba(0,0,0,0.29)]"
        initial={{ opacity: 0, y: 8, scale: 0.96 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={view} transition={{ delay: 3, duration: 0.5, ease }}
      >
        <p className="text-[10px] font-medium text-[rgba(149,149,156,0.57)]">April 2026.</p>
        <div className="h-px bg-white/10" />
        <div className="flex flex-col gap-[5px] text-[12px] text-white/80">
          <div className="flex items-center gap-2"><Ring c="#00c896" />$360k</div>
          <div className="flex items-center gap-[9px]"><Ring c="#f24800" />$745k</div>
        </div>
        <div className="h-px bg-white/10" />
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-medium text-[rgba(149,149,156,0.57)]">Net this month</p>
          <p className="text-[12px] text-danger">-$385k</p>
        </div>
      </motion.div>

      {/* legend + stats */}
      <div className="absolute left-4 top-[347px] flex items-center gap-3">
        <div className="flex flex-col justify-center gap-3 text-[12px] font-medium text-white/80">
          <div className="flex items-center gap-2 p-1"><LegendLine c="#00c896" />Inflow</div>
          <div className="flex items-center gap-2 p-1"><LegendLine c="#f24800" />Outflow</div>
        </div>
        <div className="flex items-center">
          {stats.map((s, i) => (
            <motion.div
              key={s.l}
              className={`flex h-[75px] flex-col gap-1 bg-[#171717] p-2 ${s.cls}`}
              style={{ width: s.w }}
              initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={view} transition={{ delay: 1.3 + i * 0.08, duration: 0.5, ease }}
            >
              <div className="flex items-center gap-2 whitespace-nowrap text-[10px] font-medium text-[rgba(149,149,156,0.57)]">
                {s.dot && <Ring c={s.dot} />}{s.l}
              </div>
              <p className="whitespace-nowrap font-['Segoe_UI',Inter,sans-serif] text-[20px] font-semibold leading-[normal] text-white/80">{s.v}</p>
              <div className="whitespace-nowrap text-[10px] font-medium text-[rgba(149,149,156,0.57)]">{s.f}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </Box>
  )
}

/* ---------- chain balances ---------- */

const BALANCES: { chain: Chain; name: string; value: string; pct: string; fill: number; solid: string; track: string }[] = [
  { chain: 'eth', name: 'Ethereum', value: '$1.84m', pct: '38.6%', fill: 94, solid: '#74a0f3', track: 'rgba(116,160,243,0.44)' },
  { chain: 'sol', name: 'Solana', value: '$960k', pct: '19.9%', fill: 73, solid: '#4be6c0', track: 'rgba(75,230,192,0.44)' },
  { chain: 'sol', name: 'Solana', value: '$960k', pct: '19.9%', fill: 61, solid: '#4be6c0', track: 'rgba(75,230,192,0.44)' },
  { chain: 'arb', name: 'Arbitrum', value: '$820k', pct: '17.0%', fill: 47.58, solid: '#f24800', track: 'rgba(242,72,0,0.44)' },
  { chain: 'pol', name: 'Polygon', value: '$640k', pct: '13.3%', fill: 37.82, solid: '#a627c2', track: 'rgba(126,61,225,0.44)' },
  { chain: 'base', name: 'Base', value: '$560k', pct: '11.6%', fill: 23.18, solid: '#0052ff', track: 'rgba(0,82,255,0.44)' },
]

function BalancesPanel() {
  return (
    <Box x={994} y={255} w={414} h={438} delay={0.6}>
      <div className="absolute left-4 right-4 top-4 flex items-center justify-between">
        <Title>Chain Balances</Title>
        <div className="flex items-center gap-2 rounded-[54px] bg-[#272727] p-2">
          <LiveDot size={12} />
          <span className="text-[12px] font-medium text-[#cfcfcf]">Live</span>
        </div>
      </div>
      <div className="absolute left-4 top-[84px] flex w-[382px] flex-col gap-6">
        {BALANCES.map((b, i) => (
          <motion.div
            key={i} className="flex items-center justify-between"
            initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={view} transition={{ delay: 0.9 + i * 0.09, duration: 0.5, ease }}
          >
            <div className="flex w-[248px] items-center justify-between">
              <div className="flex items-center gap-2">
                <ChainIcon chain={b.chain} size={24} />
                <p className="text-[16px] text-[#cfcfcf]">{b.name}</p>
              </div>
              <div className="relative h-[9px] w-[113px] rounded-[9px]" style={{ background: b.track }}>
                <motion.div
                  className="absolute left-0 top-0 h-full rounded-[9px]" style={{ background: b.solid }}
                  initial={{ width: 0 }} whileInView={{ width: b.fill }} viewport={view} transition={{ delay: 1.1 + i * 0.1, duration: 1.1, ease }}
                />
              </div>
            </div>
            <div className="flex items-center gap-4 text-[16px]">
              <p className="font-semibold text-[#cfcfcf]">{b.value}</p>
              <p className="font-medium text-[#727279]">{b.pct}</p>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="absolute inset-x-4 bottom-4 flex flex-col gap-[13px]">
        <div className="h-px bg-white/[0.07]" />
        <div className="flex items-start justify-between">
          <p className="text-[14px] font-medium text-[#727279]">Total across 5 chains.</p>
          <p className="text-[16px] font-semibold text-[#cfcfcf]">$4.82m</p>
        </div>
      </div>
    </Box>
  )
}

/* ---------- approval queue ---------- */

const QUEUE_COLS = '108px 187px 146px 1fr 1fr 111px 1fr'
const QUEUE: { c: Chain; sym: string; label: string; wallet: string; addr: string; signed: number; amount: string; status: 'Needs you' | 'Pending' | 'New' }[] = [
  { c: 'eth', sym: 'ETH', label: 'Contributor Payroll', wallet: 'Ops Multisig', addr: '0x4a2f...8b91', signed: 2, amount: '$24,000', status: 'Needs you' },
  { c: 'arb', sym: 'ARB', label: 'Grant Disbursement', wallet: 'Grant Multisig', addr: '0x3b1a...1b11', signed: 2, amount: '$24,000', status: 'Needs you' },
  { c: 'sol', sym: 'SOL', label: 'Protocol Fee Sweep', wallet: 'Grant Multisig', addr: '0x5b3f...9c93', signed: 1, amount: '$2,200', status: 'Pending' },
  { c: 'base', sym: 'BASE', label: 'Grant Disbursement', wallet: 'Base Ops', addr: '0x5b3f...9c93', signed: 0, amount: '$8,500', status: 'New' },
  { c: 'pol', sym: 'POL', label: 'Contributor Payroll', wallet: 'Polygon Liquid', addr: '0x4a2f...8b91', signed: 0, amount: '$2,200', status: 'New' },
]
const STATUS = {
  'Needs you': 'rounded-[42px] bg-[rgba(116,160,243,0.28)] text-[#74a0f3]',
  Pending: 'rounded-[42px] bg-[rgba(245,166,35,0.14)] text-warning',
  New: 'rounded-[54px] bg-[rgba(0,254,190,0.12)] text-success',
} as const

const SIGNERS: AvatarTone[][] = [['pink', 'sand', 'slate'], ['pink', 'lavender', 'slate'], ['lavender', 'slate', 'cocoa'], ['slate', 'cocoa', 'slate'], ['slate', 'cocoa', 'slate']]

function ApprovalQueue() {
  return (
    <Box x={328} y={717} w={1080} h={381} delay={0.7}>
      <div className="absolute inset-4 flex flex-col gap-6">
        <div className="flex items-center justify-between"><Title>Approval Queue</Title><ViewAll /></div>
        <div>
          <HeadRow cols={QUEUE_COLS} heads={['Chain', 'Label', 'Wallet', 'Address', 'Signed', 'Amount', 'Status']} />
          {QUEUE.map((r, i) => (
            <Row key={i} i={i} cols={QUEUE_COLS}>
              <span className="flex items-center gap-1 px-2"><ChainIcon chain={r.c} size={20} /><span className={dim}>{r.sym}</span></span>
              <span className={`px-2 ${bright}`}>{r.label}</span>
              <span className={`px-2 ${dim}`}>{r.wallet}</span>
              <span className="px-2"><span className={`inline-block rounded-[54px] bg-[#272727] px-2 py-1 ${dim}`}>{r.addr}</span></span>
              <span className="flex items-center gap-2 px-2">
                <span className="flex">
                  {[0, 1, 2].map((k) => (
                    <span key={k} className={`-mr-2 last:mr-0 ${k < r.signed ? '' : 'opacity-45'}`}><Avatar name={`Signer ${k + 1}`} tone={SIGNERS[i][k]} size={20} ring /></span>
                  ))}
                </span>
                <span className={dim}>{r.signed}/3 Signed</span>
              </span>
              <span className={`px-2 ${dim}`}>{r.amount}</span>
              <span className="px-2"><span className={`inline-block px-2 py-1 text-[12px] font-medium ${STATUS[r.status]}`}>{r.status}</span></span>
            </Row>
          ))}
        </div>
        <p className="text-[14px] font-medium text-[#727279]">Showing 5 out of 10 pending proposals</p>
      </div>
    </Box>
  )
}

/* ---------- recent activity ---------- */

const ACT_COLS = '181px 111px 1fr 1fr 1fr'
const ACTIVITY: { kind: 'out' | 'in' | 'sig'; name: string; c: Chain; sym: string; amount: string; tone: 'out' | 'in' | 'dim'; status: 'Confirmed' | 'Signed' | 'Pending'; time: string }[] = [
  { kind: 'out', name: 'USDC Transfer', c: 'base', sym: 'BASE', amount: '-$12000', tone: 'out', status: 'Confirmed', time: '2 min ago' },
  { kind: 'in', name: 'ETH recieved', c: 'eth', sym: 'ETH', amount: '+$44000', tone: 'in', status: 'Confirmed', time: '18 min ago' },
  { kind: 'sig', name: 'Multisig  confirmed', c: 'arb', sym: 'ARB', amount: '3/3', tone: 'dim', status: 'Signed', time: '1h ago' },
  { kind: 'out', name: 'DAI Payroll', c: 'eth', sym: 'ETH', amount: '-$12000', tone: 'out', status: 'Confirmed', time: '3h ago' },
  { kind: 'out', name: 'Grant Disbursement', c: 'sol', sym: 'SOL', amount: '$8500', tone: 'dim', status: 'Pending', time: '5h ago' },
  { kind: 'out', name: 'Bridge Fee', c: 'pol', sym: 'POL', amount: '-$42', tone: 'out', status: 'Confirmed', time: 'Yesterday' },
]
const ACT_STATUS = {
  Confirmed: 'rounded-[54px] bg-[rgba(0,254,190,0.12)] text-success',
  Signed: 'rounded-[54px] bg-[rgba(132,39,194,0.2)] text-[#8427c2]',
  Pending: 'rounded-[42px] bg-[rgba(245,166,35,0.14)] text-warning',
} as const

function RecentActivity() {
  return (
    <Box x={328} y={1122} w={637} h={409} delay={0.8}>
      <div className="absolute left-4 top-4 flex w-[605px] flex-col gap-4">
        <div className="flex items-center justify-between"><Title>Recent Activity</Title><ViewAll /></div>
        <div>
          <HeadRow cols={ACT_COLS} heads={['Transaction', 'Chain', 'Amount', 'Status', 'Time']} />
          {ACTIVITY.map((r, i) => (
            <Row key={i} i={i + 2} cols={ACT_COLS}>
              <span className="flex items-center gap-2 px-2">
                {r.kind === 'sig' ? (
                  <span className="flex size-5 items-center justify-center rounded-full bg-brand text-[10px] font-medium text-white">SIG</span>
                ) : (
                  <Icon d={I.upRight} size={20} className={`${r.kind === 'in' ? 'rotate-180 text-success' : 'text-danger'}`} />
                )}
                <span className={`whitespace-pre ${bright}`}>{r.name}</span>
              </span>
              <span className="flex items-center gap-1 px-2"><ChainIcon chain={r.c} size={20} /><span className={dim}>{r.sym}</span></span>
              <span className={`px-2 text-[14px] font-medium ${r.tone === 'out' ? 'text-danger' : r.tone === 'in' ? 'text-success' : 'text-[rgba(207,207,207,0.48)]'}`}>{r.amount}</span>
              <span className="px-2"><span className={`inline-block px-2 py-1 text-[12px] font-medium ${ACT_STATUS[r.status]}`}>{r.status}</span></span>
              <span className={`px-2 ${dim}`}>{r.time}</span>
            </Row>
          ))}
        </div>
        <p className="text-[14px] font-medium text-[#727279]">Last Synced <motion.span animate={{ opacity: [1, 0.45, 1] }} transition={{ duration: 2.4, repeat: Infinity }}>42s</motion.span> ago</p>
      </div>
    </Box>
  )
}

/* ---------- risk alerts ---------- */

function Alert({ color, title, body, primary, delay }: { color: string; title: string; body: string; primary: string; delay: number }) {
  const btn = 'rounded-[8px] border-2 border-[rgba(170,206,255,0.11)] px-2 py-1 text-[14px] font-medium text-white'
  return (
    <motion.div
      className="flex items-stretch gap-[14px]"
      initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={view} transition={{ delay, duration: 0.6, ease }}
    >
      <motion.span className="w-[3px] shrink-0 rounded-[3px]" style={{ background: color }} animate={{ opacity: [1, 0.55, 1] }} transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }} />
      <div className="flex flex-col gap-3">
        <p className="text-[14px] font-medium" style={{ color }}>{title}</p>
        <p className="w-[366px] text-[14px] font-medium leading-[17px] text-[rgba(207,207,207,0.48)]">{body}</p>
        <div className="flex items-center gap-3">
          <span className={`${btn} bg-brand`}>{primary}</span>
          <span className={`${btn} bg-[#272727]`}>Dismiss</span>
        </div>
      </div>
    </motion.div>
  )
}

function RiskAlerts() {
  return (
    <Box x={989} y={1122} w={419} h={409} delay={0.9}>
      <div className="absolute inset-x-4 top-4 flex h-[377px] flex-col justify-between">
        <div className="flex items-center justify-between"><Title>Risk Alerts</Title><ViewAll /></div>
        <div className="flex flex-col gap-9">
          <Alert delay={1.2} color="#ff4d4d" title="ETH concentration at 38.6%" primary="Rebalance" body="Ops Multisig holds 38.6 of total treasury. Policy limit is 40%. Two pending inflows could breach this threshold before end of week" />
          <Alert delay={1.4} color="#f5a623" title="Unusual outflow - ARB wallet" primary="VIew transaction" body="$18,000 USDC moved from Grants Multisig within a 2-hour window. Outlow velocity is 4X the 30 day average" />
        </div>
        <p className="text-[14px] font-medium text-[#727279]">2 active </p>
      </div>
    </Box>
  )
}

/* ---------- the dashboard ---------- */

export function Dashboard() {
  return (
    <div
      className="relative overflow-hidden rounded-[22px] border border-white/[0.09] bg-[#161616] font-sans"
      style={{ width: DASHBOARD_SIZE.width, height: DASHBOARD_SIZE.height }}
    >
      <Sidebar />
      <TopBar />
      <KpiSection />
      <ChartPanel />
      <BalancesPanel />
      <ApprovalQueue />
      <RecentActivity />
      <RiskAlerts />
    </div>
  )
}
