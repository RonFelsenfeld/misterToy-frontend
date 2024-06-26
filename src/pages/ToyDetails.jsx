import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { toyService } from '../services/toy.service'
import { showErrorMsg } from '../services/event-bus.service'

import { ToyMsg } from '../cmps/ToyMsg'
import { ToyReview } from '../cmps/ToyReview'
import { loadReviews } from '../store/actions/review.action'
import {
  SOCKET_EMIT_DELETE_MSG,
  SOCKET_EMIT_REMOVE_MSG,
  SOCKET_EMIT_SET_TOPIC,
  SOCKET_EVENT_ADD_MSG,
  SOCKET_EVENT_REVIEW_REMOVED,
  socketService,
} from '../services/socket.service'

export function ToyDetails() {
  const [toy, setToy] = useState(null)
  const toyReviews = useSelector(storeState => storeState.reviewModule.reviews)

  const { toyId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (toyId) {
      loadToy()
      loadReviews({ toyId })
    }

    socketService.emit(SOCKET_EMIT_SET_TOPIC, toyId)

    socketService.on(SOCKET_EVENT_ADD_MSG, msg => {
      setToy(prevToy => ({ ...prevToy, msgs: [...prevToy.msgs, msg] }))
    })

    socketService.on(SOCKET_EMIT_DELETE_MSG, msgId => {
      setToy(prevToy => ({
        ...prevToy,
        msgs: [...prevToy.msgs.filter(m => m.id !== msgId)],
      }))
    })

    return () => {
      socketService.off(SOCKET_EVENT_ADD_MSG)
      socketService.off(SOCKET_EVENT_REVIEW_REMOVED)
    }
  }, [])

  async function loadToy() {
    try {
      const toy = await toyService.getById(toyId)
      setToy(toy)
    } catch (err) {
      console.error('Had issues with loading toy details', err)
      showErrorMsg("Could not load toy's details")
      navigate('/toy')
    }
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
        <button className="btn-back"></button>
      </Link>

      <div className="main-container flex">
        <div className="details-container flex column">
          <h1 className="toy-name">{toy.name}</h1>

          <ul className="toy-labels flex clean-list">
            {toy.labels.map((label, idx) => (
              <li key={`${label + idx}`} className="label">
                {label}
              </li>
            ))}
          </ul>

          <h5 className="toy-price">${toy.price}</h5>

          <p className="toy-desc">{toy.description}</p>
          <p className={`toy-stock ${getStockClass(toy)}`}>{getIsInStock(toy)}</p>

          <div className="msgs-reviews-container flex justify-between">
            <ToyMsg toy={toy} setToy={setToy} />
            <ToyReview toy={toy} toyReviews={toyReviews} />
          </div>
        </div>

        <img className="toy-img" src={toy.imgUrl} alt="" />
      </div>
    </section>
  )
}
