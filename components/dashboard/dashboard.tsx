'use client'

import { useState } from 'react'
import { Activity, CheckCheck, CreditCard, Gauge, LayoutDashboard, Settings, Wallet, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'
import { arbitrages, metrics, positions, sparklines } from '@/lib/arb-data'
import { Header } from './header'
import { NavTabs, type TabId } from './nav-tabs'
import { MetricCard } from './metric-card'
import { PeriodCard } from './period-card'
import { SummaryCard } from './summary-card'
import { ArbitrageTable, PositionsTable } from './arbitrage-table'

export function Dashboard() {
  const [tab, setTab] = useState<TabId>('dashboard')
  const [compact, setCompact] = useState(false)

  const detected = arbitrages.filter((a) => a.status === 'detectado')
  const confirmed = arbitrages.filter((a) => a.status === 'confirmado')
  const settled = arbitrages.filter((a) => a.status === 'liquidado')

  return (
    <div className="dashboard-stage relative isolate min-h-screen overflow-x-hidden p-3 sm:p-6">
      <div aria-hidden="true" className="dashboard-orb pointer-events-none absolute inset-x-0 top-0 -z-10 h-[520px]" />
      <div className="dashboard-shell mx-auto flex min-h-[calc(100vh-1.5rem)] max-w-[1480px] overflow-hidden rounded-[28px] border border-white/[0.08] bg-[#050506] shadow-2xl shadow-black/50">
        <aside className="dashboard-sidebar hidden w-[82px] shrink-0 flex-col items-center border-r border-white/[0.07] bg-[#0a0a0d] py-5 lg:flex">
          <div className="mb-12 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-400 to-fuchsia-500 text-sm font-semibold text-white shadow-lg shadow-violet-500/20">AD</div>
          <nav aria-label="Navegación principal" className="flex flex-1 flex-col items-center gap-5 text-white/50">
            {[LayoutDashboard, Activity, Wallet, CreditCard, Gauge, Settings].map((Icon, index) => (
              <button key={index} type="button" className={cn('flex h-10 w-10 items-center justify-center rounded-xl transition-colors hover:bg-white/[0.08] hover:text-white', index === 0 && 'bg-violet-500/15 text-violet-300')} aria-label={['Dashboard', 'Actividad', 'Billetera', 'Tarjetas', 'Métricas', 'Ajustes'][index]}><Icon className="h-[18px] w-[18px]" /></button>
            ))}
          </nav>
          <div className="h-9 w-9 rounded-full border border-white/10 bg-gradient-to-br from-slate-500 to-slate-800" aria-label="Perfil de usuario" />
        </aside>
        <div className="min-w-0 flex-1">
          <Header />
          <main className={cn('mx-auto flex max-w-[1320px] flex-col px-4 py-6 sm:px-6 lg:px-8', compact ? 'gap-4' : 'gap-6')}>
        <NavTabs
          active={tab}
          onChange={setTab}
          compact={compact}
          onToggleCompact={() => setCompact((c) => !c)}
        />

        {tab === 'dashboard' && (
          <>
            <section aria-label="Métricas principales" className={cn('grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4', compact ? 'gap-3' : 'gap-4')}>
              <MetricCard
                label="Ganancia total arbitrajes"
                value={metrics.totalArb}
                delta="+9.4%"
                data={sparklines.totalArb}
                highlight
                compact={compact}
              />
              <MetricCard
                label="Posiciones activas"
                value={metrics.activePositions}
                delta="-2.1%"
                data={sparklines.activePositions}
                compact={compact}
              />
              <MetricCard
                label="PnL arbitrajes activos"
                value={metrics.activeArbPnl}
                delta="0.0%"
                data={sparklines.activeArbPnl}
                compact={compact}
              />
              <MetricCard
                label="PnL arbitrajes liquidados"
                value={metrics.settledArbPnl}
                delta="+6.5%"
                data={sparklines.settledArbPnl}
                compact={compact}
              />
            </section>

            <section aria-label="Rendimiento por periodo" className={cn('grid grid-cols-1 lg:grid-cols-2', compact ? 'gap-3' : 'gap-4')}>
              <PeriodCard label="Ganancia semanal (UTC)" range="13 – 19 Oct" value={metrics.week} target={150} trades={0} compact={compact} />
              <PeriodCard label="Ganancia mensual (UTC)" range="Octubre 2026" value={metrics.month} target={600} trades={0} compact={compact} />
            </section>

            <section aria-label="Resumen de arbitrajes" className={cn('grid grid-cols-1 lg:grid-cols-2', compact ? 'gap-3' : 'gap-4')}>
              <SummaryCard
                icon={Zap}
                title="Arbitrajes detectados"
                countLabel="Pares pendientes"
                count={metrics.detectedPending}
                pnl={metrics.detectedPnl}
                note="Spread medio de 3.60% entre ambos venues."
                actionLabel="Ver detectados"
                onAction={() => setTab('detectados')}
                compact={compact}
              />
              <SummaryCard
                icon={CheckCheck}
                title="Arbitrajes confirmados"
                countLabel="Activos"
                count={metrics.confirmedActive}
                pnl={metrics.confirmedPnl}
                note="Todos liquidados. Revisa el historial."
                actionLabel="Ver historial"
                onAction={() => setTab('historial')}
                compact={compact}
              />
            </section>

            <ArbitrageTable
              title="Actividad reciente"
              subtitle="Últimas oportunidades entre Outcome.xyz y Predict.fun"
              rows={arbitrages.slice(0, 5)}
              compact={compact}
            />
          </>
        )}

        {tab === 'detectados' && (
          <ArbitrageTable title="Arbitrajes detectados" subtitle={`${detected.length} pares pendientes de ejecución`} rows={detected} compact={compact} />
        )}
        {tab === 'confirmados' && (
          <ArbitrageTable title="Arbitrajes confirmados" subtitle="Posiciones cubiertas en ambos venues" rows={confirmed} compact={compact} />
        )}
        {tab === 'historial' && (
          <ArbitrageTable title="Historial" subtitle={`${settled.length} arbitrajes liquidados`} rows={settled} compact={compact} />
        )}
        {tab === 'posiciones' && <PositionsTable rows={positions} compact={compact} />}
          </main>
        </div>
      </div>
    </div>
  )
}
