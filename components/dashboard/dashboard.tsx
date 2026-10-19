'use client'

import { useState } from 'react'
import { CheckCheck, Zap } from 'lucide-react'
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
    <div className="relative isolate min-h-screen overflow-x-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[520px] bg-[radial-gradient(60%_60%_at_50%_0%,oklch(0.8_0.15_168/0.07),transparent_70%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,oklch(1_0_0/0.025)_1px,transparent_1px),linear-gradient(to_bottom,oklch(1_0_0/0.025)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_70%)]"
      />

      <Header />

      <main className={cn('mx-auto flex max-w-7xl flex-col px-4 py-6 sm:px-6 lg:px-8', compact ? 'gap-4' : 'gap-6')}>
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
  )
}
