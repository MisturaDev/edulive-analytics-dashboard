import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Tooltip,
  type ChartOptions,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend)

type SubjectPerformanceChartProps = {
  labels: string[]
  attempts: number[]
  correct: number[]
}

const options: ChartOptions<'bar'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: 'top', labels: { boxWidth: 10, boxHeight: 10 } },
    tooltip: { mode: 'index', intersect: false },
  },
  scales: {
    x: { grid: { display: false }, ticks: { color: '#94a3b8', font: { size: 11 } } },
    y: {
      grid: { color: 'rgba(148, 163, 184, 0.2)' },
      ticks: { color: '#94a3b8', font: { size: 11 } },
    },
  },
}

export function SubjectPerformanceChart({
  labels,
  attempts,
  correct,
}: SubjectPerformanceChartProps) {
  const data = {
    labels,
    datasets: [
      {
        label: 'Total Attempts',
        data: attempts,
        backgroundColor: 'rgba(59, 130, 246, 0.85)',
        borderRadius: 10,
      },
      {
        label: 'Correct Answers',
        data: correct,
        backgroundColor: 'rgba(34, 197, 94, 0.8)',
        borderRadius: 10,
      },
    ],
  }

  return (
    <div className="h-64">
      <Bar options={options} data={data} />
    </div>
  )
}
