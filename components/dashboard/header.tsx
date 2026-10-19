'use client'

import { useEffect, useState } from 'react'
import { Activity, Bell, RefreshCw, Settings } from 'lucide-react'
import { cn } from '@/lib/utils'

function useClock() {
  const [now, setNow] = useState<Date | null>(null)
  useEffect(() => {
    setNow(new Date())
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
  return now
}

function VenueStatus({ label, latency }: { label: string; latency: number }) {
  return (
    <div className="flex items-center gap-2 rounded-md px-2 py-1">
      <span className="relative flex size-1.5">
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-positive/60" />
        <span className="relative inline-flex size-1.5 rounded-full bg-positive" />
      </span>
      <span className="text-xs text-foreground/80">{label}</span>
      <span className="font-mono text-[11px] text-muted-foreground tabular">
        {latency}ms
      </span>
    </div>
  )
}

export function Header() {
  const now = useClock()
  const [syncing, setSyncing] = useState(false)

  const handleSync = () => {
    setSyncing(true)
    setTimeout(() => setSyncing(false), 1200)
  }

  return (
    <header className="sticky top-0 z-30 border-b border-white/[0.06] bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="relative flex size-9 items-center justify-center rounded-lg bg-gradient-to-b from-primary to-primary/70 text-primary-foreground shadow-[0_0_24px_-6px] shadow-primary/60">
            <Activity className="size-[18px]" strokeWidth={2.25} aria-hidden="true" />
          </div>
          <div className="leading-tight">
            <p className="text-[15px] font-semibold tracking-tight">Arb Desk</p>
            <p className="text-xs text-muted-foreground">
              Outcome.xyz <span className="text-muted-foreground/50">×</span> Predict.fun
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-1 rounded-lg border border-white/[0.06] bg-white/[0.02] p-0.5 lg:flex">
            <div className="flex items-center gap-2 border-r border-white/[0.06] px-2.5 py-1">
              <span className="text-xs font-medium text-positive">Bot activo</span>
              <span className="font-mono text-[11px] text-muted-foreground tabular" suppressHydrationWarning>
                {now
                  ? now.toLocaleTimeString('es-ES', { hour12: false })
                  : '--:--:--'}
              </span>
            </div>
            <VenueStatus label="Outcome" latency={42} />
            <VenueStatus label="Predict" latency={58} />
          </div>

          <button
            type="button"
            onClick={handleSync}
            disabled={syncing}
            className="inline-flex h-9 items-center gap-2 rounded-lg bg-primary px-3.5 text-sm font-medium text-primary-foreground shadow-[0_0_0_1px_inset] shadow-white/20 transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-80"
          >
            <RefreshCw className={cn('size-4', syncing && 'animate-spin')} aria-hidden="true" />
            <span className="hidden sm:inline">{syncing ? 'Sincronizando' : 'Sincronizar'}</span>
          </button>

          <button
            type="button"
            className="relative inline-flex size-9 items-center justify-center rounded-lg border border-white/[0.07] bg-white/[0.02] text-muted-foreground transition hover:bg-white/[0.05] hover:text-foreground"
            aria-label="Notificaciones"
          >
            <Bell className="size-4" aria-hidden="true" />
            <span className="absolute right-2 top-2 size-1.5 rounded-full bg-primary" />
          </button>
          <button
            type="button"
            className="inline-flex size-9 items-center justify-center rounded-lg border border-white/[0.07] bg-white/[0.02] text-muted-foreground transition hover:bg-white/[0.05] hover:text-foreground"
            aria-label="Ajustes"
          >
            <Settings className="size-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>
  )
}
