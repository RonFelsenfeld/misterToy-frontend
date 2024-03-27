import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { toyService } from '../services/toy.service'

import { BarChart } from '../cmps/BarChart'
import { LineChart } from '../cmps/LineChart'
import { PieChart } from '../cmps/PieChart'

export function Dashboard() {
  const [toys, setToys] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    loadToys()
  }, [])

  function loadToys() {
    toyService
      .query()
      .then(setToys)
      .catch(err => {
        console.error('Dashboard - Had issues loading toys')
        navigate('/')
      })
  }

  if (!toys) return <div className="loading-msg">Loading dashboard...</div>
  return (
    <section className="dashboard">
      <h2 className="dashboard-title">Store dashboard</h2>

      <h3 className="chart-title">Price by label</h3>
      <div className="chart-container flex align-center justify-center">
        <PieChart toys={toys} />
      </div>

      <h3 className="chart-title">In stock by label (%)</h3>
      <div className="chart-container flex align-center justify-center">
        <BarChart toys={toys} />
      </div>

      <h3 className="chart-title">Sales per month</h3>
      <div className="chart-container flex align-center justify-center">
        <LineChart toys={toys} />
      </div>
    </section>
  )
}