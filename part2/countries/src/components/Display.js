import Details from './Details'
import { useState } from 'react'

const Display = ({ filter, data }) => {
  const [isShow, setIsShow] = useState(null)

  if (!filter) return

  if (data.length > 10) {
    return 'Too many matches, specify another filter'
  }

  if (data.length > 1) {
    return (
      <>
        {data.map((country) => (
          <div key={country.cca2}>
            {country.name.common}{' '}
            <button
              onClick={() => {
                if (isShow === country.name.common) {
                  setIsShow(null)
                } else {
                  setIsShow(country.name.common)
                }
              }}
            >
              {isShow === country.name.common ? 'hide' : 'show'}
            </button>
            {isShow === country.name.common && <Details country={country} />}
          </div>
        ))}
      </>
    )
  }

  if (data.length === 1) {
    return <Details country={data[0]} />
  }

  return 'No Results'
}

export default Display
