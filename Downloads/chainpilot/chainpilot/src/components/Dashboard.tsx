import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { ChainIcon } from './ui/ChainIcon'
import type { Chain } from './ui/ChainIcon'
import { Avatar } from './ui/Avatar'
import { CountUp } from './ui/CountUp'
import { LogoMark } from './ui/Logo'
import { INFLOW, OUTFLOW, toArea, toPath } from '../data/chart'

const W = 1098
export const DASHBOARD_SIZE = { width: W, height: 684 }

const ease = [0.16, 1, 0.3, 1] as const

function Icon({ d, size = 14, className }: { d: string; size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d={d} />
    </svg>
  )
}

const ICONS = {
  home: 'M3 11l9-8 9 8v9a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1z',
  wallet: 'M3 7a2 2 0 012-2h13v4M3 7v10a2 2 0 002 2h15V9H5a2 2 0 01-2-2zM16 14h2',
  pay: 'M3 10l8-7 10 10-8 8L3 10zM8 8h.01',
  chart: 'M4 20V10M10 20V4M16 20v-7M22 20H2',
  doc: 'M6 3h9l4 4v14H6zM14 3v5h5M9 13h6M9 17h6',
  users: 'M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM22 21v-2a4 4 0 00-3-3.9M16 3.1a4 4 0 010 7.8',
  lock: 'M6 11V8a6 6 0 1112 0v3M5 11h14v10H5z',
  log: 'M4 5h16M4 12h16M4 19h10',
  alert: 'M12 3l10 18H2zM12 10v5M12 18h.01',
  search: 'M11 19a8 8 0 100-16 8 8 0 000 16zM21 21l-4.3-4.3',
  clock: 'M12 21a9 9 0 100-18 9 9 0 000 18zM12 7v5l3 2',
  moon: 'M21 13a9 9 0 11-10-10 7 7 0 0010 10z',
  bell: 'M6 9a6 6 0 1112 0c0 6 2 7 2 7H4s2-1 2-7zM10 20a2 2 0 004 0',
  plus: 'M12 5v14M5 12h14',
  up: 'M7 17L17 7M8 7h9v9',
  chev: 'M6 9l6 6 6-6',
}

type NavItem = { label: string; icon: keyof typeof ICONS; badge?: number; active?: boolean; hot?: boolean }
const NAV: { group: string; items: NavItem[] }[] = [
  { group: 'Main', items: [
    { label: 'Dashboard', icon: 'home', active: true }, { label: 'Wallets', icon: 'wallet' },
    { label: 'Payments', icon: 'pay', badge: 3 }, { label: 'Analytics', icon: 'chart' },
  ] },
  { group: 'Governance', items: [
    { label: 'Proposals', icon: 'doc' }, { label: 'Signers', icon: 'users' }, { label: 'Permissions', icon: 'lock' },
  ] },
  { group: 'Monitoring', items: [
    { label: 'Audit logs', icon: 'log' }, { label: 'Risk alerts', icon: 'alert', badge: 2, hot: true },
  ] },
]

function Sidebar() {
  return (
    <aside className="absolute left-0 top-0 h-full w-[229px] border-r border-white/[0.05] bg-[#121212] px-3 pt-3">
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <LogoMark size={22} />
          <span className="text-[13px] font-medium text-white">Chain Pilot</span>
        </div>
        <span className="size-3.5 rounded-[3px] border border-white/30" />
      </div>
      <div className="mt-4 flex h-8 items-center gap-2 rounded-lg bg-white/[0.05] px-2.5 text-[11px] text-white/45">
        <Icon d={ICONS.search} size={13} /> Search anything
      </div>
      {NAV.map((g, gi) => (
        <div key={g.group} className={gi === 0 ? 'mt-4' : 'mt-3 border-t border-white/[0.05] pt-3'}>
          <div className="mb-1 flex items-center gap-1.5 px-2 text-[10px] text-white/35">
            {gi === 0 && <Icon d={ICONS.chev} size={10} />}{g.group}
          </div>
          {g.items.map((it, i) => (
            <motion.div
              key={it.label}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + gi * 0.15 + i * 0.06, duration: 0.5, ease }}
              className={`flex h-[29px] items-center gap-2 rounded-lg px-2 text-[12px] ${it.active ? 'bg-white/[0.08] text-white' : 'text-white/55'}`}
            >
              <Icon d={ICONS[it.icon]} size={13} />
              <span className="flex-1">{it.label}</span>
              {it.badge && <span className="flex size-3.5 items-center justify-center rounded-full bg-brand text-[8px] font-semibold text-white">{it.badge}</span>}
            </motion.div>
          ))}
        </div>
      ))}
    </aside>
  )
}

function TopBar() {
  return (
    <div className="absolute left-[229px] top-0 flex h-[49px] w-[869px] items-center justify-between border-b border-white/[0.05] px-[21px]">
      <div className="flex items-center gap-3 text-[11px]">
        <span className="text-white/40">Main</span><span className="text-white/25">›</span><span className="font-medium text-white/90">Dashboard</span>
        <span className="ml-2 flex items-center gap-1.5 rounded-full bg-white/[0.07] px-2 py-1 text-[9px] text-white/80">
          <span className="relative flex size-2"><span className="absolute inset-0 rounded-full bg-success/50 animate-ping-ring" /><span className="size-2 rounded-full bg-success" /></span>
          All chains Live
        </span>
      </div>
      <div className="flex items-center gap-4 text-white/60">
        <div className="flex items-center">
          {(['Maya R', 'Amare L', 'Daniel R', 'Priya S'] as const).map((n, i) => (
            <span key={n} className={i ? '-ml-2' : ''}><Avatar name={n} size={21} ring tone={(['pink', 'sand', 'lavender', 'cocoa'] as const)[i]} /></span>
          ))}
          <span className="-ml-1 rounded-full bg-[#2b2b2b] px-1.5 text-[9px] text-white/70">+5</span>
        </div>
        <span className="h-5 w-px bg-white/10" />
        <Icon d={ICONS.clock} size={14} /><Icon d={ICONS.moon} size={14} />
        <span className="relative"><Icon d={ICONS.bell} size={14} /><span className="absolute -right-1.5 -top-1.5 flex size-3 items-center justify-center rounded-full bg-brand text-[7px] font-semibold text-white">3</span></span>
        <span className="h-5 w-px bg-white/10" />
        <span className="flex items-center gap-1 rounded-md bg-brand px-2.5 py-[5px] text-[11px] font-medium text-white"><Icon d={ICONS.plus} size={11} /> New payment</span>
      </div>
    </div>
  )
}

function Panel({ x, y, w, h, children, delay = 0 }: { x: number; y: number; w: number; h: number; children: ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.7, ease }}
      className="absolute overflow-hidden rounded-xl border border-white/[0.06] bg-gradient-to-b from-white/[0.045] to-white/[0.015] p-3"
      style={{ left: x, top: y, width: w, height: h }}
    >
      {children}
    </motion.div>
  )
}

function Kpi({ x, label, children, foot, delay, extra }: { x: number; label: string; children: ReactNode; foot: ReactNode; delay: number; extra?: ReactNode }) {
  return (
    <Panel x={x} y={67} w={192} h={109} delay={delay}>
      <span className="absolute left-0 top-[10px] h-[15px] w-[3px] rounded-r bg-brand" />
      <div className="px-0.5 text-[12px] text-white/70">{label}</div>
      <div className="mt-1 text-[26px] font-medium leading-[37px] text-white">{children}</div>
      <div className="mt-1.5 flex items-center gap-1.5 text-[9px] text-white/45">{foot}</div>
      {extra}
    </Panel>
  )
}

const Delta = ({ v, tone = 'success' }: { v: string; tone?: 'success' | 'warning' }) => (
  <span className={`flex items-center gap-0.5 rounded px-1 py-px font-medium ${tone === 'success' ? 'bg-success/15 text-success' : 'bg-warning/15 text-warning'}`}>
    <Icon d={ICONS.up} size={8} />{v}
  </span>
)

const BALANCES: { chain: Chain; name: string; value: string; pct: string; fill: number; from: string; to: string }[] = [
  { chain: 'eth', name: 'Ethereum', value: '$1.84m', pct: '38.6%', fill: 0.86, from: '#7f9cf5', to: '#4a5fb0' },
  { chain: 'sol', name: 'Solana', value: '$960k', pct: '19.9%', fill: 0.52, from: '#2fd1a0', to: '#1c7d63' },
  { chain: 'arb', name: 'Arbitrum', value: '$820k', pct: '17.0%', fill: 0.42, from: '#ff5a14', to: '#8a3512' },
  { chain: 'pol', name: 'Polygon', value: '$640k', pct: '13.3%', fill: 0.3, from: '#a55bff', to: '#5b2f94' },
  { chain: 'base', name: 'Base', value: '$560k', pct: '11.6%', fill: 0.24, from: '#2f6bff', to: '#1b3f99' },
]

const QUEUE: { chain: string; c: Chain; label: string; wallet: string; signed: number; amount: string; status: 'Needs you' | 'Pending' | 'New' }[] = [
  { chain: 'ETH', c: 'eth', label: 'Contributor Payroll', wallet: 'Ops Multisig', signed: 2, amount: '$24,000', status: 'Needs you' },
  { chain: 'ARB', c: 'arb', label: 'Grant Disbursement', wallet: 'Grant Multisig', signed: 2, amount: '$24,000', status: 'Needs you' },
  { chain: 'SOL', c: 'sol', label: 'Protocol Fee Sweep', wallet: 'Grant Multisig', signed: 1, amount: '$2,200', status: 'Pending' },
  { chain: 'BAS', c: 'base', label: 'Grant Disbursement', wallet: 'Base Ops', signed: 0, amount: '$8,500', status: 'New' },
]

const STATUS_STYLE = { 'Needs you': 'bg-warning/15 text-warning', Pending: 'bg-white/10 text-white/70', New: 'bg-governance/20 text-[#a994ff]' } as const

export function Dashboard() {
  const cw = 402, ch = 150
  return (
    <div className="relative overflow-hidden rounded-xl border border-white/[0.08] bg-[#131313] shadow-[0_0_80px_-10px_rgba(242,72,0,0.45)]" style={{ width: W, height: 684 }}>
      <Sidebar />
      <TopBar />

      <Kpi x={250} label="Total Treasury" delay={0.15} foot={<><Delta v="+0.8%" /><span>• Last 7 days</span></>}>
        <CountUp to={4.82} duration={1.8} format={(n) => `$${n.toFixed(2)}m`} />
      </Kpi>
      <Kpi x={460} label="Stablecoin Ratio" delay={0.25} foot={<><span>$2.96m</span><span className="text-white/60">USDC/DAI</span></>}>
        <CountUp to={61.4} duration={1.8} format={(n) => `${n.toFixed(1)}%`} />
      </Kpi>
      <Kpi x={671} label="Monthly Burn" delay={0.35} foot={<><Delta v="+6.2%" tone="warning" /><span>• MoM</span></>}>
        <CountUp to={497} duration={1.8} format={(n) => `$${Math.round(n)}k`} />
      </Kpi>
      <Kpi
        x={881} label="Runway" delay={0.45}
        foot={<span className="rounded bg-white/[0.07] px-1.5 py-0.5">At current burn</span>}
        extra={
          <div className="absolute bottom-3 right-3 w-[83px]">
            <div className="h-px bg-success/50" />
            <div className="mt-1 flex justify-between text-[6px] text-white/40"><span>Now</span><span>6 mo</span><span>12 mo</span><span>18 mo</span></div>
          </div>
        }
      >
        <CountUp to={10} duration={1.4} format={(n) => `${Math.round(n)} months`} />
      </Kpi>

      {/* Inflow vs Outflow */}
      <Panel x={250} y={195} w={491} h={334} delay={0.5}>
        <div className="flex items-center justify-between">
          <span className="text-[12px] font-medium text-white/80">Inflow vs Outflow</span>
          <div className="flex gap-0.5 rounded-md bg-white/[0.05] p-[3px] text-[9px] text-white/60">
            {['30 days', '6 months', 'YTD', '1 year'].map((t) => <span key={t} className={`rounded px-1.5 py-1 ${t === '6 months' ? 'bg-white/10 text-white' : ''}`}>{t}</span>)}
          </div>
        </div>
        <div className="relative mt-3 h-[191px]">
          <div className="absolute left-0 top-[51px] flex h-[162px] flex-col justify-between text-[8px] text-white/40">
            {['$1m', '$800k', '$600k', '$400k', '$200k'].map((t) => <span key={t}>{t}</span>)}
          </div>
          <div className="absolute bottom-0 left-12 right-1 flex justify-between text-[8px] text-white/40">
            {['Jan', 'Feb', 'Mar', 'April', 'May', 'Jun'].map((t) => <span key={t}>{t}</span>)}
          </div>
          <svg viewBox={`0 0 ${cw} ${ch}`} className="absolute left-[59px] top-[51px] overflow-visible" width={cw} height={ch}>
            <defs>
              <linearGradient id="d-in" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#00c896" stopOpacity="0.5" /><stop offset="1" stopColor="#00c896" stopOpacity="0" /></linearGradient>
              <linearGradient id="d-out" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#f24800" stopOpacity="0.5" /><stop offset="1" stopColor="#f24800" stopOpacity="0" /></linearGradient>
            </defs>
            {[0, 1, 2, 3, 4].map((i) => <line key={i} x1="0" x2={cw} y1={(i / 4) * ch} y2={(i / 4) * ch} stroke="white" strokeOpacity="0.05" />)}
            <motion.path d={toArea(OUTFLOW, cw, ch)} fill="url(#d-out)" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 1.4, duration: 1 }} />
            <motion.path d={toArea(INFLOW, cw, ch)} fill="url(#d-in)" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 1.6, duration: 1 }} />
            <motion.path d={toPath(OUTFLOW, cw, ch)} stroke="#f24800" strokeWidth="1.4" fill="none" strokeLinejoin="round" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ delay: 0.7, duration: 1.8, ease: 'easeInOut' }} />
            <motion.path d={toPath(INFLOW, cw, ch)} stroke="#00c896" strokeWidth="1.4" fill="none" strokeLinejoin="round" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ delay: 0.9, duration: 1.8, ease: 'easeInOut' }} />
            <motion.g initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 2.5, duration: 0.6 }}>
              <line x1={cw * 0.72} x2={cw * 0.72} y1="8" y2={ch} stroke="white" strokeOpacity="0.45" strokeDasharray="3 3" />
              <circle cx={cw * 0.72} cy={(1 - OUTFLOW[31]) * ch} r="2.5" fill="#f24800" stroke="#fff" strokeWidth="0.8" />
              <circle cx={cw * 0.72} cy={(1 - INFLOW[31]) * ch} r="2.5" fill="#00c896" stroke="#fff" strokeWidth="0.8" />
            </motion.g>
          </svg>
          <motion.div
            initial={{ opacity: 0, y: 6 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 2.7, duration: 0.5 }}
            className="absolute left-[287px] top-[28px] w-[126px] rounded-md border border-white/[0.07] bg-[#1a1a1a] p-1.5 text-[8px] text-white/60 shadow-xl"
          >
            <div className="mb-1 border-b border-white/[0.07] pb-1 text-[7px] text-white/45">April 2026.</div>
            <div className="flex items-center gap-1.5 text-[9px] text-white/85"><i className="size-1.5 rounded-full bg-success" />inflow <b className="ml-auto font-medium">$360k</b></div>
            <div className="mt-1 flex items-center gap-1.5 text-[9px] text-white/85"><i className="size-1.5 rounded-full bg-brand" />outflow <b className="ml-auto font-medium">$745k</b></div>
            <div className="mt-1 flex justify-between border-t border-white/[0.07] pt-1 text-[7px]"><span>Net this month</span><b className="font-medium text-danger">-$385k</b></div>
          </motion.div>
        </div>
        <div className="mt-2 flex items-start gap-4">
          <div className="space-y-2 pt-2 text-[8px] text-white/60">
            <div className="flex items-center gap-1.5"><i className="h-[3px] w-4 rounded bg-success" />Inflow</div>
            <div className="flex items-center gap-1.5"><i className="h-[3px] w-4 rounded bg-brand" />Outflow</div>
          </div>
          <div className="grid flex-1 grid-cols-4 gap-px overflow-hidden rounded-md bg-white/[0.05] text-[8px] text-white/45">
            {[['Total Inflow', '$3.02m', '6 month period'], ['Total Outflow', '$2.98', '6 month period'], ['Avg Monthly Burn', '$497k', 'Stable vs prev period'], ['Net Change', '+$40k', '+33.2% vs prev period']].map(([a, b, c], i) => (
              <div key={a} className="bg-[#171717] p-1.5">
                <div>{a}</div><div className={`my-0.5 text-[14px] font-medium ${i === 3 ? 'text-white' : 'text-white'}`}>{b}</div>
                <div className={i === 3 ? 'text-success' : ''}>{c}</div>
              </div>
            ))}
          </div>
        </div>
      </Panel>

      {/* Chain balances */}
      <Panel x={758} y={195} w={316} h={334} delay={0.6}>
        <div className="mt-0.5 flex items-center justify-between">
          <span className="text-[12px] font-medium text-white/80">Chain Balances</span>
          <span className="flex items-center gap-1 rounded-full bg-white/[0.06] px-1.5 py-0.5 text-[9px] text-white/70"><i className="size-1.5 rounded-full bg-success" />Live</span>
        </div>
        <div className="mt-12 space-y-[18px]">
          {BALANCES.map((b, i) => (
            <div key={b.chain} className="flex items-center text-[10px]">
              <span className="flex w-[103px] items-center gap-1.5 text-white/80"><ChainIcon chain={b.chain} size={18} />{b.name}</span>
              <span className="relative h-[7px] w-[86px] overflow-hidden rounded-full bg-white/[0.06]">
                <motion.span
                  className="absolute inset-y-0 left-0 rounded-full"
                  style={{ background: `linear-gradient(90deg, ${b.from}, ${b.to})` }}
                  initial={{ width: 0 }} whileInView={{ width: `${b.fill * 100}%` }} viewport={{ once: true }}
                  transition={{ delay: 1 + i * 0.12, duration: 1, ease }}
                />
              </span>
              <span className="ml-auto flex w-[93px] justify-between font-medium text-white"><span>{b.value}</span><span className="text-white/45">{b.pct}</span></span>
            </div>
          ))}
        </div>
        <div className="absolute inset-x-3 bottom-3 flex items-center justify-between border-t border-white/[0.07] pt-2 text-[9px] text-white/45">
          <span>Total across 5 chains.</span><span className="text-[12px] font-medium text-white">$4.82m</span>
        </div>
      </Panel>

      {/* Approval queue */}
      <Panel x={250} y={547} w={823} h={281} delay={0.7}>
        <div className="flex items-center justify-between">
          <span className="text-[12px] font-medium text-white/80">Approval Queue</span>
          <span className="text-[10px] text-white/50">View all →</span>
        </div>
        <div className="mt-3 text-[10px]">
          <div className="grid grid-cols-[82px_143px_111px_126px_126px_85px_1fr] bg-white/[0.04] py-1 text-[9px] text-white/45">
            {['Chain', 'Label', 'Wallet', 'Address', 'Signed', 'Amount', 'Status'].map((h) => <span key={h} className="px-1.5">{h}</span>)}
          </div>
          {QUEUE.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 1.2 + i * 0.12, duration: 0.5, ease }}
              className="grid h-[33px] grid-cols-[82px_143px_111px_126px_126px_85px_1fr] items-center border-b border-white/[0.04] text-white/75"
            >
              <span className="flex items-center gap-1.5 px-1.5"><ChainIcon chain={r.c} size={15} />{r.chain}</span>
              <span className="px-1.5">{r.label}</span>
              <span className="px-1.5">{r.wallet}</span>
              <span className="px-1.5"><i className="block h-3 w-16 animate-shimmer rounded-full bg-white/[0.08]" /></span>
              <span className="flex items-center gap-2 px-1.5">
                <span className="flex">{[0, 1, 2].map((k) => <i key={k} className={`-ml-1.5 first:ml-0 size-[15px] rounded-full border border-[#171717] ${k < r.signed ? 'bg-gradient-to-br from-[#d8d0ff] to-[#a99bff]' : 'bg-white/10'}`} />)}</span>
                {r.signed}/3 Signed
              </span>
              <span className="px-1.5 text-white">{r.amount}</span>
              <span className="px-1.5"><span className={`rounded px-1.5 py-1 text-[9px] ${STATUS_STYLE[r.status]}`}>{r.status}</span></span>
            </motion.div>
          ))}
        </div>
        <div className="absolute bottom-3 left-3 text-[9px] text-white/40">Showing 5 out of 10 pending proposals</div>
      </Panel>
    </div>
  )
}
