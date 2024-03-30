import { useEffect, useState } from 'react'

import { LabelSelect } from './LabelSelect'

export function LabelFilter({ onSetFilter, filterBy }) {
  const [filterByLabels, setFilterByLabels] = useState(filterBy.labels)

  useEffect(() => {
    onSetFilter({ ...filterBy, labels: [...filterByLabels] })
  }, [filterByLabels])

  const handleChange = event => {
    const {
      target: { value },
    } = event
    setFilterByLabels(typeof value === 'string' ? value.split(',') : value)
  }

  const MenuProps = {
    PaperProps: {
      style: {
        width: 150,
      },
    },
  }

  return (
    <LabelSelect labelsState={filterByLabels} handleChange={handleChange} MenuProps={MenuProps} />
  )
}
