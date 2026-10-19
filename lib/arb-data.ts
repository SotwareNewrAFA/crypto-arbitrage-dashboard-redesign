export type ArbStatus = 'detectado' | 'confirmado' | 'liquidado'

export type Arbitrage = {
  id: string
  market: string
  category: string
  outcomeSide: 'YES' | 'NO'
  outcomePrice: number
  predictSide: 'YES' | 'NO'
  predictPrice: number
  size: number
  pnl: number
  status: ArbStatus
  time: string
}

export type Position = {
  id: string
  market: string
  venue: 'Outcome' | 'Predict'
  side: 'YES' | 'NO'
  entry: number
  mark: number
  size: number
  pnl: number
}

export const metrics = {
  totalArb: 91.89,
  activePositions: -5.47,
  activeArbPnl: 0,
  settledArbPnl: 74.55,
  week: 0,
  month: 0,
  detectedPending: 2,
  detectedPnl: 17.34,
  confirmedActive: 0,
  confirmedPnl: 0,
}

export const sparklines = {
  totalArb: [42, 48, 46, 55, 61, 58, 66, 72, 70, 79, 84, 91.89],
  activePositions: [2.1, 1.4, 0.8, 1.2, -0.4, -1.8, -1.2, -2.9, -3.4, -4.1, -4.9, -5.47],
  activeArbPnl: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  settledArbPnl: [30, 34, 33, 41, 45, 49, 52, 58, 61, 66, 70, 74.55],
}

export const arbitrages: Arbitrage[] = [
  {
    id: 'ARB-1042',
    market: 'BTC > $120k el 31 Oct',
    category: 'Cripto',
    outcomeSide: 'YES',
    outcomePrice: 0.412,
    predictSide: 'NO',
    predictPrice: 0.551,
    size: 250,
    pnl: 9.25,
    status: 'detectado',
    time: '06:18:04',
  },
  {
    id: 'ARB-1041',
    market: 'ETH ETF flujos netos positivos (sem.)',
    category: 'Cripto',
    outcomeSide: 'NO',
    outcomePrice: 0.338,
    predictSide: 'YES',
    predictPrice: 0.627,
    size: 230,
    pnl: 8.09,
    status: 'detectado',
    time: '06:14:51',
  },
  {
    id: 'ARB-1039',
    market: 'Fed recorta tasas en noviembre',
    category: 'Macro',
    outcomeSide: 'YES',
    outcomePrice: 0.604,
    predictSide: 'NO',
    predictPrice: 0.362,
    size: 400,
    pnl: 13.6,
    status: 'liquidado',
    time: 'Ayer 22:41',
  },
  {
    id: 'ARB-1036',
    market: 'SOL supera $250 antes de dic.',
    category: 'Cripto',
    outcomeSide: 'NO',
    outcomePrice: 0.71,
    predictSide: 'YES',
    predictPrice: 0.254,
    size: 320,
    pnl: 11.52,
    status: 'liquidado',
    time: 'Ayer 17:09',
  },
  {
    id: 'ARB-1033',
    market: 'Real Madrid gana El Clásico',
    category: 'Deportes',
    outcomeSide: 'YES',
    outcomePrice: 0.47,
    predictSide: 'NO',
    predictPrice: 0.497,
    size: 600,
    pnl: 19.8,
    status: 'liquidado',
    time: '17 Oct 20:12',
  },
  {
    id: 'ARB-1030',
    market: 'CPI EE.UU. ≤ 2.9% interanual',
    category: 'Macro',
    outcomeSide: 'NO',
    outcomePrice: 0.288,
    predictSide: 'YES',
    predictPrice: 0.684,
    size: 520,
    pnl: 14.56,
    status: 'liquidado',
    time: '16 Oct 14:30',
  },
  {
    id: 'ARB-1027',
    market: 'Apple anuncia nuevo chip M5',
    category: 'Tech',
    outcomeSide: 'YES',
    outcomePrice: 0.815,
    predictSide: 'NO',
    predictPrice: 0.158,
    size: 560,
    pnl: 15.07,
    status: 'liquidado',
    time: '15 Oct 09:55',
  },
]

export const positions: Position[] = [
  {
    id: 'POS-221',
    market: 'BTC > $120k el 31 Oct',
    venue: 'Outcome',
    side: 'YES',
    entry: 0.412,
    mark: 0.398,
    size: 250,
    pnl: -3.5,
  },
  {
    id: 'POS-219',
    market: 'ETH ETF flujos netos positivos (sem.)',
    venue: 'Predict',
    side: 'YES',
    entry: 0.627,
    mark: 0.618,
    size: 230,
    pnl: -2.07,
  },
  {
    id: 'POS-214',
    market: 'Trump firma ley stablecoins Q4',
    venue: 'Outcome',
    side: 'NO',
    entry: 0.244,
    mark: 0.248,
    size: 25,
    pnl: 0.1,
  },
]

export function formatUsd(value: number, signed = false) {
  const abs = Math.abs(value).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
  if (value < 0) return `-$${abs}`
  if (signed && value > 0) return `+$${abs}`
  return `$${abs}`
}

export function spreadOf(arb: Arbitrage) {
  return 1 - (arb.outcomePrice + arb.predictPrice)
}
