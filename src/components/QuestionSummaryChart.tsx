import {
  ArcElement,
  Chart as ChartJS,
  Legend,
  Tooltip,
  type ChartOptions,
} from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

type QuestionSummaryChartProps = {
  labels: string[]
  values: number[]
  colors: string[]
}

const options: ChartOptions<'doughnut'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: 'right', labels: { boxWidth: 10, boxHeight: 10 } },
  },
  cutout: '70%',
}

export function QuestionSummaryChart({
  labels,
  values,
  colors,
}: QuestionSummaryChartProps) {
  const data = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: colors,
        borderWidth: 0,
      },
    ],
  }

  return (
    <div className="h-64">
      <Doughnut data={data} options={options} />
    </div>
  )
}
