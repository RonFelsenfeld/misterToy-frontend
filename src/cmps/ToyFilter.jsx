import { useEffect, useRef, useState } from 'react'

import { utilService } from '../services/util.service'
import { LabelFilter } from './LabelFilter'

export function ToyFilter({ onSetFilter, filterBy }) {
  const [filterByToEdit, setFilterByToEdit] = useState(filterBy)
  const debounceOnSetFilter = useRef(utilService.debounce(onSetFilter, 300))

  useEffect(() => {
    debounceOnSetFilter.current(filterByToEdit)
  }, [filterByToEdit])

  function handleChange({ target }) {
    let { value, name: field, type } = target

    if (type === 'number') value = +value

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
          placeholder="By name"
          name="name"
          value={filterByToEdit.name}
          onChange={handleChange}
        />

        <input
          type="number"
          id="maxPrice"
          placeholder="By max price"
          name="maxPrice"
          value={filterByToEdit.maxPrice ? filterByToEdit.maxPrice : ''}
          onChange={handleChange}
        />

        <select name="inStock" id="inStock" onChange={handleChange}>
          <option value="all">All</option>
          <option value="inStock">In stock</option>
          <option value="outOfStock">Out of stock</option>
        </select>

        <LabelFilter onSetFilter={onSetFilter} filterBy={filterByToEdit} />
      </form>
    </section>
  )
}
