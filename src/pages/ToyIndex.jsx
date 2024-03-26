import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { loadToys, removeToy, saveToy } from '../store/actions/toy.actions'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { ToyList } from '../cmps/ToyList'
import { Link } from 'react-router-dom'

export function ToyIndex() {
  const toys = useSelector(storeState => storeState.toyModule.toys)
  const isLoading = useSelector(storeState => storeState.toyModule.isLoading)

  useEffect(() => {
    loadToys().catch(err => showErrorMsg('Cannot load toys'))
  }, [])

  function onRemoveToy(toyId) {
    removeToy(toyId)
      .then(() => {
        showSuccessMsg('Toy removed')
      })
      .catch(err => {
        showErrorMsg('Cannot remove Toy')
      })
  }

  function onAddToy(toy) {
    toy.createdAt = Date.now()
    saveToy(toy)
      .then(() => {
        showSuccessMsg(`Toy added successfully`)
      })
      .catch(err => showErrorMsg('Had trouble adding toy'))
  }

  if (isLoading) return <div className="loading-msg">Loading...</div>
  return (
    <section className="toy-index">
      <Link to="/toy/edit">
        <button className="btn-add-toy">Add toy</button>
      </Link>

      {toys.length ? (
        <ToyList toys={toys} onRemoveToy={onRemoveToy} />
      ) : (
        <div className="no-toys-msg">No toys to show</div>
      )}
    </section>
  )
}
