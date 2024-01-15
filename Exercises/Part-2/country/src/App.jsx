import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {

  const [countries, setNewCountries] = useState([])
  const [search, setNewSearch] = useState('')

  useEffect(() => {

    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setNewCountries(response.data)
      })

  },[countries])

  const handleSearch = (event) => {
    setNewSearch(event.target.value)
  }

  return (
    <div>
      <SearchCountry search={search} handleSearch={handleSearch} />

      <DisplayCountry countries={countries} search={search} />

    </div>
  )
}

const Parts = ({arr}) => {
  return (
    <div>
      <ul>
        {arr.map(country => (
          <li key = {country.name.official}>
            {country.name.official}
          </li>
        ))}
      </ul>
    </div>
  )
}

const DisplayCountry = ({countries, search}) => {
  const arr = countries.filter(country => country.name.official.toLowerCase().includes(search.toLowerCase()));

  return (
    <Parts arr={arr} />
  )
}

const SearchCountry = ({search, handleSearch}) => {
  return (
    <div>
      search country: 
      <input 
        value={search}
        onChange={handleSearch}
      />
    </div>
  )
}

export default App