import { cn } from '@/lib/utils'
import { formatUsd, spreadOf, type Arbitrage, type ArbStatus, type Position } from '@/lib/arb-data'

const statusStyles: Record<ArbStatus, { label: string; className: string; dot: string }> = {
  detectado: {
    label: 'Detectado',
    className: 'border-warning/20 bg-warning/10 text-warning',
    dot: 'bg-warning',
  },
  confirmado: {
    label: 'Confirmado',
    className: 'border-primary/20 bg-primary/10 text-primary',
    dot: 'bg-primary',
  },
  liquidado: {
    label: 'Liquidado',
    className: 'border-white/10 bg-white/[0.04] text-muted-foreground',
    dot: 'bg-muted-foreground',
  },
}

function SideTag({ side }: { side: 'YES' | 'NO' }) {
  return (
    <span
      className={cn(
        'rounded px-1 font-mono text-[10px] font-medium leading-4',
        side === 'YES' ? 'bg-positive/10 text-positive' : 'bg-negative/10 text-negative',
      )}
    >
      {side}
    </span>
  )
}

function TableShell({
  title,
  subtitle,
  children,
}: {
  title: string
  subtitle: string
  children: React.ReactNode
}) {
  return (
    <section className="glass overflow-hidden">
      <div className="flex items-center justify-between gap-4 border-b border-white/[0.06] px-5 py-4">
        <div>
          <h2 className="text-sm font-semibold tracking-tight">{title}</h2>
          <p className="mt-0.5 text-xs text-muted-foreground">{subtitle}</p>
        </div>
      </div>
      <div className="overflow-x-auto">{children}</div>
    </section>
  )
}

const th = 'px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.08em] text-muted-foreground whitespace-nowrap'

export function ArbitrageTable({
  title,
  subtitle,
  rows,
  compact,
}: {
  title: string
  subtitle: string
  rows: Arbitrage[]
  compact?: boolean
}) {
  const cell = cn('px-5 whitespace-nowrap', compact ? 'py-2' : 'py-3.5')

  return (
    <TableShell title={title} subtitle={subtitle}>
      <table className="w-full min-w-[860px] text-sm">
        <thead className="bg-white/[0.015]">
          <tr className="border-b border-white/[0.06]">
            <th scope="col" className={cn(th, 'text-left')}>Mercado</th>
            <th scope="col" className={cn(th, 'text-right')}>Outcome.xyz</th>
            <th scope="col" className={cn(th, 'text-right')}>Predict.fun</th>
            <th scope="col" className={cn(th, 'text-right')}>Spread</th>
            <th scope="col" className={cn(th, 'text-right')}>Tamaño</th>
            <th scope="col" className={cn(th, 'text-right')}>PnL</th>
            <th scope="col" className={cn(th, 'text-left')}>Estado</th>
            <th scope="col" className={cn(th, 'text-right')}>Hora</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/[0.04]">
          {rows.length === 0 && (
            <tr>
              <td colSpan={8} className="px-5 py-10 text-center text-sm text-muted-foreground">
                No hay arbitrajes en esta vista.
              </td>
            </tr>
          )}
          {rows.map((r) => {
            const spread = spreadOf(r)
            const status = statusStyles[r.status]
            return (
              <tr key={r.id} className="group transition-colors hover:bg-white/[0.025]">
                <td className={cell}>
                  <div className="flex flex-col">
                    <span className="font-medium text-foreground">{r.market}</span>
                    {!compact && (
                      <span className="mt-0.5 text-xs text-muted-foreground">
                        <span className="font-mono">{r.id}</span>
                        <span className="mx-1.5 text-muted-foreground/40">/</span>
                        {r.category}
                      </span>
                    )}
                  </div>
                </td>
                <td className={cn(cell, 'text-right')}>
                  <span className="inline-flex items-center gap-2">
                    <SideTag side={r.outcomeSide} />
                    <span className="font-mono tabular">{r.outcomePrice.toFixed(3)}</span>
                  </span>
                </td>
                <td className={cn(cell, 'text-right')}>
                  <span className="inline-flex items-center gap-2">
                    <SideTag side={r.predictSide} />
                    <span className="font-mono tabular">{r.predictPrice.toFixed(3)}</span>
                  </span>
                </td>
                <td className={cn(cell, 'text-right font-mono tabular text-positive')}>
                  {(spread * 100).toFixed(2)}%
                </td>
                <td className={cn(cell, 'text-right font-mono tabular text-foreground/80')}>
                  {formatUsd(r.size)}
                </td>
                <td
                  className={cn(
                    cell,
                    'text-right font-mono font-medium tabular',
                    r.pnl >= 0 ? 'text-positive' : 'text-negative',
                  )}
                >
                  {formatUsd(r.pnl, true)}
                </td>
                <td className={cell}>
                  <span
                    className={cn(
                      'inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-[11px] font-medium',
                      status.className,
                    )}
                  >
                    <span className={cn('size-1.5 rounded-full', status.dot)} />
                    {status.label}
                  </span>
                </td>
                <td className={cn(cell, 'text-right font-mono text-xs tabular text-muted-foreground')}>
                  {r.time}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </TableShell>
  )
}

export function PositionsTable({ rows, compact }: { rows: Position[]; compact?: boolean }) {
  const cell = cn('px-5 whitespace-nowrap', compact ? 'py-2' : 'py-3.5')
  const total = rows.reduce((acc, r) => acc + r.pnl, 0)

  return (
    <TableShell title="Posiciones abiertas" subtitle={`${rows.length} posiciones · PnL no realizado ${formatUsd(total, true)}`}>
      <table className="w-full min-w-[720px] text-sm">
        <thead className="bg-white/[0.015]">
          <tr className="border-b border-white/[0.06]">
            <th scope="col" className={cn(th, 'text-left')}>Mercado</th>
            <th scope="col" className={cn(th, 'text-left')}>Venue</th>
            <th scope="col" className={cn(th, 'text-left')}>Lado</th>
            <th scope="col" className={cn(th, 'text-right')}>Entrada</th>
            <th scope="col" className={cn(th, 'text-right')}>Mark</th>
            <th scope="col" className={cn(th, 'text-right')}>Tamaño</th>
            <th scope="col" className={cn(th, 'text-right')}>PnL</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/[0.04]">
          {rows.map((r) => (
            <tr key={r.id} className="transition-colors hover:bg-white/[0.025]">
              <td className={cell}>
                <div className="flex flex-col">
                  <span className="font-medium">{r.market}</span>
                  {!compact && <span className="mt-0.5 font-mono text-xs text-muted-foreground">{r.id}</span>}
                </div>
              </td>
              <td className={cn(cell, 'text-foreground/80')}>{r.venue === 'Outcome' ? 'Outcome.xyz' : 'Predict.fun'}</td>
              <td className={cell}>
                <SideTag side={r.side} />
              </td>
              <td className={cn(cell, 'text-right font-mono tabular')}>{r.entry.toFixed(3)}</td>
              <td className={cn(cell, 'text-right font-mono tabular')}>{r.mark.toFixed(3)}</td>
              <td className={cn(cell, 'text-right font-mono tabular text-foreground/80')}>{formatUsd(r.size)}</td>
              <td
                className={cn(
                  cell,
                  'text-right font-mono font-medium tabular',
                  r.pnl >= 0 ? 'text-positive' : 'text-negative',
                )}
              >
                {formatUsd(r.pnl, true)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </TableShell>
  )
}
