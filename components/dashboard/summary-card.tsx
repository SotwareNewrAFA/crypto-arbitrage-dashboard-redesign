import { ArrowRight, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { formatUsd } from '@/lib/arb-data'

export function SummaryCard({
  icon: Icon,
  title,
  countLabel,
  count,
  pnl,
  note,
  actionLabel,
  onAction,
  compact,
}: {
  icon: LucideIcon
  title: string
  countLabel: string
  count: number
  pnl: number
  note?: string
  actionLabel: string
  onAction: () => void
  compact?: boolean
}) {
  return (
    <article className={cn('glass flex flex-col', compact ? 'gap-4 p-4' : 'gap-6 p-5')}>
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="flex size-7 items-center justify-center rounded-md border border-primary/20 bg-primary/10 text-primary">
            <Icon className="size-3.5" aria-hidden="true" />
          </span>
          <h2 className="text-sm font-semibold tracking-tight">{title}</h2>
        </div>
        <button
          type="button"
          onClick={onAction}
          className="group inline-flex items-center gap-1 text-xs text-muted-foreground transition hover:text-foreground"
        >
          {actionLabel}
          <ArrowRight className="size-3 transition group-hover:translate-x-0.5" aria-hidden="true" />
        </button>
      </div>

      <div className="grid grid-cols-2 divide-x divide-white/[0.06] rounded-xl border border-white/[0.05] bg-black/20">
        <div className="px-4 py-3">
          <p className="text-[11px] uppercase tracking-[0.08em] text-muted-foreground">{countLabel}</p>
          <p className="mt-1 font-mono text-2xl font-semibold tabular">{count}</p>
        </div>
        <div className="px-4 py-3 text-right">
          <p className="text-[11px] uppercase tracking-[0.08em] text-muted-foreground">PnL</p>
          <p
            className={cn(
              'mt-1 font-mono text-2xl font-semibold tabular',
              pnl > 0 ? 'text-positive' : pnl < 0 ? 'text-negative' : 'text-foreground',
            )}
          >
            {formatUsd(pnl)}
          </p>
        </div>
      </div>

      {note && <p className="text-xs text-muted-foreground">{note}</p>}
    </article>
  )
}
