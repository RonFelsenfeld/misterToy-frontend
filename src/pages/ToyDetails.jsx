import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { toyService } from '../services/toy.service'
import { showErrorMsg } from '../services/event-bus.service'

export function ToyDetails() {
  const [toy, setToy] = useState(null)
  const { toyId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (toyId) loadToy()
  }, [toyId])

  function loadToy() {
    toyService
      .getById(toyId)
      .then(setToy)
      .catch(err => {
        console.error('Had issues with loading toy details', err)
        showErrorMsg("Could not load toy's details")
        navigate('/toy')
      })
  }

  function getIsInStock(toy) {
    if (toy.inStock) return 'In stock'
    return 'Out of stock'
  }

  function getStockClass(toy) {
    if (!toy.inStock) return 'out-stock'
    return ''
  }

  if (!toy) return <div className="loading-msg">Loading details...</div>
  return (
    <section className="toy-details">
      <Link to={`/toy`}>
        <button className="btn-back">Back</button>
      </Link>

      <header className="details-header flex column">
        <h1 className="toy-name">Toy name : {toy.name}</h1>
        <h5 className="toy-price">Price: ${toy.price}</h5>
        <ul className="toy-labels flex clean-list">
          {toy.labels.map((label, idx) => (
            <li key={`${label + idx}`} className="label">
              {label} |
            </li>
          ))}
        </ul>
      </header>

      <p className="toy-desc">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi voluptas cumque tempore,
        aperiam sed dolorum rem! Nemo quidem, placeat perferendis tempora aspernatur sit, explicabo
        veritatis corrupti perspiciatis repellat, enim quibusdam!
      </p>
      <p className={`toy-stock ${getStockClass(toy)}`}>{getIsInStock(toy)}</p>
    </section>
  )
}
