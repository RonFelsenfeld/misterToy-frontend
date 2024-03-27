import { useEffect, useState } from 'react'

import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import ListItemText from '@mui/material/ListItemText'
import Select from '@mui/material/Select'
import Checkbox from '@mui/material/Checkbox'

import { toyService } from '../services/toy.service'

export function LabelFilter({ onSetFilter, filterBy }) {
  const [filterByLabels, setFilterByLabels] = useState([])
  const labels = toyService.getLabels()

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
    <div>
      <FormControl
        sx={{
          m: 1,
          width: 150,
          backgroundColor: 'var(--clr-gray--1)',
          border: 'px solid lightgray',
        }}
      >
        <InputLabel id="demo-multiple-checkbox-label">Labels</InputLabel>

        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={filterByLabels}
          onChange={handleChange}
          input={<OutlinedInput label="Tag" />}
          renderValue={selected => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {labels.map(label => (
            <MenuItem key={label} value={label}>
              <Checkbox checked={filterByLabels.indexOf(label) > -1} />
              <ListItemText primary={label} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  )
}
