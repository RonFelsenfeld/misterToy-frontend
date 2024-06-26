export function ToySort({ onSetSort, sortBy }) {
  function handleChange({ target }) {
    let { type, value } = target
    if (type === 'select-one') {
      const currDir = Object.values(sortBy)[0]
      onSetSort({ [value]: currDir || 1 })
    }

    if (type === 'checkbox') {
      const currSortCriteria = Object.keys(sortBy)[0]
      const newDir = sortBy[currSortCriteria] * -1
      onSetSort({ [currSortCriteria]: newDir })
    }
  }

  return (
    <section className="toy-sort flex align-center">
      <select name="select-sort" id="select-sort" onChange={handleChange}>
        <option value="name">Name</option>
        <option value="price">Price</option>
        <option value="createdAt">Arrival time</option>
      </select>

      <div className="flex align-center">
        <label htmlFor="sort-dir">Descending</label>
        <input type="checkbox" name="sort-dir" id="sort-dir" onChange={handleChange} />
      </div>
    </section>
  )
}
