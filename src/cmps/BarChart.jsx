import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

import { toyService } from '../services/toy.service'
import { utilService } from '../services/util.service'

export function BarChart({ toys }) {
  const inStockByLabelMap = toyService.getInStockByLabel(toys)
  const inStockLabels = Object.keys(inStockByLabelMap)
  const inStockPercentage = Object.values(inStockByLabelMap).map(val =>
    ((val / toys.length) * 100).toFixed(0)
  )
  const inStockPieColors = inStockLabels.map(label => utilService.getRandomColor())

  const dataByInStock = {
    labels: inStockLabels,
    datasets: [
      {
        data: inStockPercentage,
        backgroundColor: inStockPieColors,
        borderColor: inStockPieColors,
        borderWidth: 2,
      },
    ],
  }

  const optionsByInStock = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
  }

  return <Bar data={dataByInStock} options={optionsByInStock} />
}
