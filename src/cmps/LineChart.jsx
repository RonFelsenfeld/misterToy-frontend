import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

import { toyService } from '../services/toy.service'

export function LineChart() {
  const { months, sales } = toyService.getSalesStats()

  const dataSales = {
    labels: months,
    datasets: [
      {
        data: sales,
        borderColor: 'rgb(150, 200, 255)',
        backgroundColor: 'rgb(150, 200, 255)',
      },
    ],
  }

  const optionsSales = {
    responsive: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  }
  return <Line data={dataSales} options={optionsSales} />
}
