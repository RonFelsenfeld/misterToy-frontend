import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { loadToys, removeToy, saveToy } from '../store/actions/toy.actions'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { ToyList } from '../cmps/ToyList'

export function ToyIndex() {
  const toys = useSelector(storeState => storeState.toyModule.toys)
  const isLoading = useSelector(storeState => storeState.toyModule.toys)

  useEffect(() => {
    loadToys().catch(err => showErrorMsg('Cannot load toys'))
  }, [])

  function onRemoveToy(toyId) {
    removeToy()
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

  return (
    <section className="toy-index main-layout">
      <ToyList toys={toys} onRemoveToy={onRemoveToy} />
    </section>
  )
}
