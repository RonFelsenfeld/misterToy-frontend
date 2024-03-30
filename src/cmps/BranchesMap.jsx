import { useState } from 'react'

import GoogleMapReact from 'google-map-react'

import { toyService } from '../services/toy.service'

const AnyReactComponent = ({ text, lat, lng, onPanToBranch }) => (
  <div style={{ fontSize: '2.5em' }} onClick={() => onPanToBranch(lat, lng)}>
    {text}
  </div>
)

export function BranchesMap() {
  const [coords, setCoords] = useState({ lat: 32.073591208159584, lng: 34.79064056091309 })
  const branches = toyService.getStoreBranches()
  const zoom = 13

  function onPanToBranch(lat, lng) {
    setCoords({ lat, lng })
  }

  return (
    <div style={{ height: '70vh', width: '60%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyBRVkXzBLhvXI7QvhMHd0dpG2u2X_R72no' }}
        center={coords}
        defaultZoom={zoom}
      >
        {branches.map(branch => {
          const { lat, lng } = branch

          return (
            <AnyReactComponent
              key={branch.lat}
              text="📍"
              lat={lat}
              lng={lng}
              onPanToBranch={onPanToBranch}
            />
          )
        })}
      </GoogleMapReact>
    </div>
  )
}
