import { useEffect, useState } from 'react'
import axios from 'axios'
import Countries from './Countries'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div>
      <div>
        find countries{' '}
        <input
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>

      <Countries countries={filteredCountries} />
    </div>
  )
}

export default App
