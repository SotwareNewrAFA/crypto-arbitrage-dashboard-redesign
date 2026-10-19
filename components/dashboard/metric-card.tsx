import { ArrowDownRight, ArrowUpRight, Minus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { formatUsd } from '@/lib/arb-data'
import { Sparkline } from './sparkline'

function toneOf(value: number) {
  if (value > 0) return 'positive' as const
  if (value < 0) return 'negative' as const
  return 'neutral' as const
}

export function MetricCard({
  label,
  value,
  delta,
  data,
  highlight,
  compact,
}: {
  label: string
  value: number
  delta?: string
  data: number[]
  highlight?: boolean
  compact?: boolean
}) {
  const tone = toneOf(value)
  const DeltaIcon = tone === 'positive' ? ArrowUpRight : tone === 'negative' ? ArrowDownRight : Minus

  return (
    <article className={cn('glass flex flex-col', highlight && 'glass-glow', compact ? 'gap-3 p-4' : 'gap-5 p-5')}>
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-[11px] font-medium uppercase tracking-[0.08em] text-muted-foreground">
          {label}
        </h3>
        {delta && (
          <span
            className={cn(
              'inline-flex shrink-0 items-center gap-0.5 rounded-md px-1.5 py-0.5 font-mono text-[11px] tabular',
              tone === 'positive' && 'bg-positive/10 text-positive',
              tone === 'negative' && 'bg-negative/10 text-negative',
              tone === 'neutral' && 'bg-white/[0.05] text-muted-foreground',
            )}
          >
            <DeltaIcon className="size-3" aria-hidden="true" />
            {delta}
          </span>
        )}
      </div>

      <div className="flex items-end justify-between gap-4">
        <p
          className={cn(
            'font-mono font-semibold tracking-tight tabular',
            compact ? 'text-2xl' : 'text-[28px] leading-none',
            tone === 'positive' && 'text-positive',
            tone === 'negative' && 'text-negative',
            tone === 'neutral' && 'text-foreground',
          )}
        >
          {formatUsd(value)}
        </p>
        <Sparkline data={data} tone={tone} className={cn('w-24 shrink-0', compact ? 'h-7' : 'h-9')} />
      </div>
    </article>
  )
}
