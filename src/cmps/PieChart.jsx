import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

import { toyService } from '../services/toy.service'
import { utilService } from '../services/util.service'

export function PieChart({ toys }) {
  const priceByLabelMap = toyService.getPricesPerLabelMap(toys)

  const priceLabels = Object.keys(priceByLabelMap)
  const pricesByLabel = Object.values(priceByLabelMap)
  const pricePieColors = priceLabels.map(label => utilService.getRandomColor())

  const dataByPrice = {
    labels: priceLabels,
    datasets: [
      {
        label: 'Total price',
        data: pricesByLabel,
        backgroundColor: pricePieColors,
        borderColor: pricePieColors,
        borderWidth: 2,
      },
    ],
  }

  const optionsByPrice = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'left',
        align: 'start',
        labels: {
          boxWidth: 10,
          padding: 20,
        },
      },
    },
  }
  return <Pie data={dataByPrice} options={optionsByPrice} />
}
