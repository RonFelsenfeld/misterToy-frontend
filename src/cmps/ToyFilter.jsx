import { useEffect, useRef, useState } from 'react'

import { utilService } from '../services/util.service'
import { LabelSelect } from './LabelSelect'

export function ToyFilter({ onSetFilter, filterBy }) {
  const [filterByToEdit, setFilterByToEdit] = useState(filterBy)
  const debounceOnSetFilter = useRef(utilService.debounce(onSetFilter, 300))

  useEffect(() => {
    debounceOnSetFilter.current(filterByToEdit)
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
      <form className="flex align-center">
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

        <LabelSelect onSetFilter={onSetFilter} filterBy={filterByToEdit} />
      </form>
    </section>
  )
}
