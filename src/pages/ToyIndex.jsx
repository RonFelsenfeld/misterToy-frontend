import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { loadToys, removeToy, saveToy, setFilterBy, setSortBy } from '../store/actions/toy.actions'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'

import { ToyList } from '../cmps/ToyList'
import { ToyFilter } from '../cmps/ToyFilter'
import { ToySort } from '../cmps/ToySort'
import { UserGreet } from '../cmps/UserGreet'

export function ToyIndex() {
  const toys = useSelector(storeState => storeState.toyModule.toys)
  const filterBy = useSelector(storeState => storeState.toyModule.filterBy)
  const sortBy = useSelector(storeState => storeState.toyModule.sortBy)
  const isLoading = useSelector(storeState => storeState.toyModule.isLoading)
  const user = useSelector(storeState => storeState.userModule.loggedInUser)

  useEffect(() => {
    loadToys().catch(err => showErrorMsg('Cannot load toys'))
  }, [filterBy, sortBy])

  function onSetFilter(filterBy) {
    setFilterBy(filterBy)
  }

  function onSetSort(sortBy) {
    setSortBy(sortBy)
  }

  async function onRemoveToy(toyId) {
    try {
      await removeToy(toyId)
      showSuccessMsg('Toy removed')
    } catch (err) {
      showErrorMsg('Cannot remove Toy')
    }
  }

  return (
    <section className="toy-index">
      {user && <UserGreet />}

      {user && user.isAdmin && (
        <Link to="/toy/edit">
          <button className="btn-add-toy"></button>
        </Link>
      )}

      <div className="filter-sort-container">
        <h2 className="filter-sort-title">Filter & sort your toys</h2>
        <ToyFilter onSetFilter={onSetFilter} filterBy={filterBy} />
        <ToySort onSetSort={onSetSort} sortBy={sortBy} />
      </div>

      {!isLoading || toys ? (
        <ToyList toys={toys} onRemoveToy={onRemoveToy} />
      ) : (
        <div className="loading-msg">Loading toys...</div>
      )}

      {!toys.length && <div className="no-toys-msg">No toys to show</div>}
    </section>
  )
}
