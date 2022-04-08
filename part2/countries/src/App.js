import axios from 'axios'
import { useState, useEffect } from 'react'
import Display from './components/Display'
import Filter from './components/Filter'
const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  const filtered = countries.filter((country) =>
    country.name.common.toLowerCase().includes(filter.toLowerCase())
  )

  const handleFilterChange = (event) => setFilter(event.target.value)

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then((response) => setCountries(response.data))
  }, [])

  return (
    <>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <Display filter={filter} data={filtered} />
    </>
  )
}

export default App
