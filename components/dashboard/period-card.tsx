import { CalendarDays } from 'lucide-react'
import { cn } from '@/lib/utils'
import { formatUsd } from '@/lib/arb-data'

export function PeriodCard({
  label,
  range,
  value,
  target,
  trades,
  compact,
}: {
  label: string
  range: string
  value: number
  target: number
  trades: number
  compact?: boolean
}) {
  const progress = Math.max(0, Math.min(100, (value / target) * 100))

  return (
    <article className={cn('glass flex flex-col', compact ? 'gap-3 p-4' : 'gap-5 p-5')}>
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-[11px] font-medium uppercase tracking-[0.08em] text-muted-foreground">
          {label}
        </h3>
        <span className="inline-flex items-center gap-1.5 rounded-md border border-white/[0.06] bg-white/[0.02] px-2 py-0.5 text-[11px] text-muted-foreground">
          <CalendarDays className="size-3" aria-hidden="true" />
          {range}
        </span>
      </div>

      <div className="flex items-end justify-between gap-4">
        <p
          className={cn(
            'font-mono font-semibold tracking-tight tabular',
            compact ? 'text-2xl' : 'text-[32px] leading-none',
            value > 0 ? 'text-positive' : value < 0 ? 'text-negative' : 'text-foreground',
          )}
        >
          {formatUsd(value)}
        </p>
        <dl className="flex gap-6 text-right">
          <div>
            <dt className="text-[11px] text-muted-foreground">Operaciones</dt>
            <dd className="font-mono text-sm tabular">{trades}</dd>
          </div>
          <div>
            <dt className="text-[11px] text-muted-foreground">Objetivo</dt>
            <dd className="font-mono text-sm tabular">{formatUsd(target)}</dd>
          </div>
        </dl>
      </div>

      <div className="flex items-center gap-3">
        <div
          className="h-1 flex-1 overflow-hidden rounded-full bg-white/[0.06]"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress)}
          aria-label={`Progreso hacia objetivo ${label.toLowerCase()}`}
        >
          <div
            className="h-full rounded-full bg-gradient-to-r from-primary/60 to-primary"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="font-mono text-[11px] text-muted-foreground tabular">
          {progress.toFixed(0)}%
        </span>
      </div>
    </article>
  )
}
