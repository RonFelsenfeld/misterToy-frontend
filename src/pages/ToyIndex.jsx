import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { loadToys, removeToy, setFilterBy } from '../store/actions/toy.actions'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'

import { ToyList } from '../cmps/ToyList'
import { ToyFilter } from '../cmps/ToyFilter'

export function ToyIndex() {
  const toys = useSelector(storeState => storeState.toyModule.toys)
  const filterBy = useSelector(storeState => storeState.toyModule.filterBy)
  const isLoading = useSelector(storeState => storeState.toyModule.isLoading)

  useEffect(() => {
    loadToys().catch(err => showErrorMsg('Cannot load toys'))
  }, [filterBy])

  function onSetFilter(filterBy) {
    setFilterBy(filterBy)
  }

  function onRemoveToy(toyId) {
    removeToy(toyId)
      .then(() => {
        showSuccessMsg('Toy removed')
      })
      .catch(err => {
        showErrorMsg('Cannot remove Toy')
      })
  }

  return (
    <section className="toy-index">
      <Link to="/toy/edit">
        <button className="btn-add-toy">Add toy</button>
      </Link>

      <ToyFilter onSetFilter={onSetFilter} filterBy={filterBy} />

      {!isLoading || toys ? (
        <ToyList toys={toys} onRemoveToy={onRemoveToy} />
      ) : (
        <div className="loading-msg">Loading toys...</div>
      )}

      {!toys.length && <div className="no-toys-msg">No toys to show</div>}
    </section>
  )
}
