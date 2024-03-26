import { useEffect, useRef, useState } from 'react'

import { utilService } from '../services/util.service'
import { useLinkClickHandler } from 'react-router-dom'

export function ToyFilter({ onSetFilter, filterBy }) {
  const [filterByToEdit, setFilterByToEdit] = useState(filterBy)
  onSetFilter = useRef(utilService.debounce(onSetFilter, 300))

  useEffect(() => {
    onSetFilter.current(filterByToEdit)
  }, [filterByToEdit])

  function handleChange({ target }) {
    let { value, name: field, type } = target

    if (type === 'select-one') {
      if (value === 'inStock') value = true
      else if (value === 'outOfStock') value = false
      else value = null
    }

    setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
  }

  return (
    <section className="toy-filter">
      <h1 className="filter-title">Filter our toys</h1>
      <form className="flex">
        <input
          type="text"
          id="name"
          placeholder="Filter by name"
          name="name"
          value={filterByToEdit.name}
          onChange={handleChange}
        />

        <select name="inStock" id="inStock" onChange={handleChange}>
          <option value="all">All</option>
          <option value="inStock">In stock</option>
          <option value="outOfStock">Out of stock</option>
        </select>
      </form>
    </section>
  )
}
