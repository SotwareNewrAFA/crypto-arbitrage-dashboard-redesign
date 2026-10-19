'use client'

import { CheckCheck, History, LayoutGrid, Rows3, Wallet, Zap, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export type TabId = 'dashboard' | 'detectados' | 'confirmados' | 'historial' | 'posiciones'

const tabs: { id: TabId; label: string; icon: LucideIcon; count?: number }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
  { id: 'detectados', label: 'Detectados', icon: Zap, count: 2 },
  { id: 'confirmados', label: 'Confirmados', icon: CheckCheck },
  { id: 'historial', label: 'Historial', icon: History },
  { id: 'posiciones', label: 'Posiciones', icon: Wallet, count: 3 },
]

export function NavTabs({
  active,
  onChange,
  compact,
  onToggleCompact,
}: {
  active: TabId
  onChange: (id: TabId) => void
  compact: boolean
  onToggleCompact: () => void
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <nav
        aria-label="Secciones"
        className="-mx-1 overflow-x-auto px-1 [scrollbar-width:none]"
      >
        <div className="inline-flex items-center gap-1 rounded-xl border border-white/[0.06] bg-white/[0.02] p-1">
          {tabs.map(({ id, label, icon: Icon, count }) => {
            const isActive = id === active
            return (
              <button
                key={id}
                type="button"
                onClick={() => onChange(id)}
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  'relative inline-flex h-8 items-center gap-2 whitespace-nowrap rounded-lg px-3 text-sm transition',
                  isActive
                    ? 'bg-white/[0.07] text-foreground shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08),0_1px_2px_rgba(0,0,0,0.4)]'
                    : 'text-muted-foreground hover:text-foreground',
                )}
              >
                <Icon className={cn('size-4', isActive && 'text-primary')} aria-hidden="true" />
                {label}
                {count !== undefined && (
                  <span
                    className={cn(
                      'rounded-md px-1.5 font-mono text-[10px] leading-4 tabular',
                      isActive ? 'bg-primary/15 text-primary' : 'bg-white/[0.06] text-muted-foreground',
                    )}
                  >
                    {count}
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </nav>

      <button
        type="button"
        onClick={onToggleCompact}
        aria-pressed={compact}
        className={cn(
          'inline-flex h-9 items-center gap-2 self-start rounded-lg border px-3 text-sm transition sm:self-auto',
          compact
            ? 'border-primary/30 bg-primary/10 text-primary'
            : 'border-white/[0.07] bg-white/[0.02] text-muted-foreground hover:text-foreground',
        )}
      >
        <Rows3 className="size-4" aria-hidden="true" />
        Vista compacta
      </button>
    </div>
  )
}
