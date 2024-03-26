import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { toyService } from '../services/toy.service'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'

import { saveToy } from '../store/actions/toy.actions'

export function ToyEdit() {
  const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())
  const { toyId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (toyId) loadToy()
  }, [toyId])

  function loadToy() {
    toyService
      .getById(toyId)
      .then(setToyToEdit)
      .catch(err => {
        console.error('Edit toy -> Could not load toy', err)
        showErrorMsg('Could not load toy')
        navigate('/toy')
      })
  }

  function handleChange({ target }) {
    let { value, name: field, type } = target
    if (type === 'number') value = +value
    if (type === 'checkbox') value = value === 'true' ? false : true
    setToyToEdit(prevToy => ({ ...prevToy, [field]: value }))
  }

  function onSaveToy(ev) {
    ev.preventDefault()

    // Dummy details in case the user don't fill them (For dev purposes)
    if (!toyToEdit.name) toyToEdit.name = 'Anonymous toy'
    if (!toyToEdit.price) toyToEdit.price = 100

    saveToy(toyToEdit)
      .then(() => {
        showSuccessMsg('Toy Saved!')
        navigate('/toy')
      })
      .catch(err => {
        console.error('Had issues in saving toy', err)
        showErrorMsg('Had issues in saving toy')
      })
  }

  return (
    <section className="toy-edit flex column align-center">
      <h2>{toyToEdit._id ? 'Edit' : 'Add'} toy</h2>

      <form onSubmit={onSaveToy} className="flex column align-center">
        <div className="inputs-container flex column align-center">
          <div className="input-container flex align-center justify-between">
            <label htmlFor="name">Name: </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Enter new name"
              value={toyToEdit.name}
              onChange={handleChange}
            />
          </div>

          <div className="input-container flex align-center justify-between">
            <label htmlFor="price">Price: </label>
            <input
              type="number"
              name="price"
              id="price"
              placeholder="Enter new price"
              value={toyToEdit.price || ''}
              onChange={handleChange}
            />
          </div>

          <div className="input-container flex align-center justify-between">
            <label htmlFor="inStock">In stock: </label>
            <input
              type="checkbox"
              name="inStock"
              id="inStock"
              checked={toyToEdit.inStock}
              value={toyToEdit.inStock}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="actions-container flex">
          <button className="btn btn-save">{toyToEdit._id ? 'Save' : 'Add'}</button>
          <Link to="/toy">
            <button className="btn btn-cancel">Cancel</button>
          </Link>
        </div>
      </form>
    </section>
  )
}
