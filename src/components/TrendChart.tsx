import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  type ChartOptions,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Filler)

type TrendChartProps = {
  title: string
  subtitle?: string
  labels: string[]
  values: number[]
  lineColor: string
  fillColor: string
  showCard?: boolean
}

const chartOptions: ChartOptions<'line'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      callbacks: {
        label: (context) => `${Math.round((context.parsed.y ?? 0) * 100)}%`,
      },
    },
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: { color: '#94a3b8', font: { size: 11 } },
    },
    y: {
      grid: { color: 'rgba(148, 163, 184, 0.2)' },
      ticks: {
        color: '#94a3b8',
        callback: (value: number | string) => `${Math.round(Number(value) * 100)}%`,
        font: { size: 11 },
      },
      suggestedMin: 0,
      suggestedMax: 1,
    },
  },
} as const

export function TrendChart({
  title,
  subtitle,
  labels,
  values,
  lineColor,
  fillColor,
  showCard = true,
}: TrendChartProps) {
  const data = {
    labels,
    datasets: [
      {
        data: values,
        borderColor: lineColor,
        backgroundColor: fillColor,
        tension: 0.35,
        pointRadius: 3,
        pointBackgroundColor: lineColor,
        fill: true,
      },
    ],
  }

  const ChartBody = (
    <div className="h-40">
      <Line options={chartOptions} data={data} />
    </div>
  )

  if (!showCard) {
    return ChartBody
  }

  return (
    <div className="panel p-5">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-ink-900">{title}</h2>
        {subtitle && (
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-500">
            {subtitle}
          </p>
        )}
      </div>
      <div className="mt-6">{ChartBody}</div>
    </div>
  )
}
