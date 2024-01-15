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

      {search && <DisplayCountry countries={countries} search={search} />}

    </div>
  )
}

const Parts = ({arr}) => {
  return (
    <div>
      <ul>
        {arr.map(country => (
          <li key = {country.name.official}>
            {country.name.common}
          </li>
        ))}
      </ul>
    </div>
  )
}

const DisplayCountry = ({countries, search}) => {
  const arr = countries.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase()));
  
  if(arr.length > 10)
  {
    return(
      <div>
        Too many matches, specify another filter
      </div>
    )
  }
  else if(arr.length === 1)
  { 
    return(
      <OneCountry arr={arr}/>
    )
  }
  else {
    return (
    <Parts arr={arr} />
    )
  }
}

const SearchCountry = ({search, handleSearch}) => {
  return (
    <div>
      find countries  
      <input 
        value={search}
        onChange={handleSearch}
      />
    </div>
  )
}

const OneCountry = ({arr}) => {

  return (
  <div>
    
    <div>
        {arr.map(country => (
          <div key = {country.name.official}>
            <h2>{country.name.common}</h2>
          </div>
        ))}
    </div>
    <div>
        {arr.map(country => (
          <div key = {country.name.official}>
            Capital : {country.capital}
          </div>
        ))}
    </div>
    <div>
        {arr.map(country => (
          <div key = {country.name.official}>
            Area : {country.area}
          </div>
        ))}
    </div>
    <div>
      <h3>Languages:</h3>
      <ul>
        {arr.map(country => (
          <div key = {country.name.official}>
            <ul>
              {Object.entries(country.languages).map(([languageCode, languageName])=> (
                <li key = {languageCode}>
                  {languageName}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </ul>
    </div>
    <div>
      {arr.map(country => (
          <div key = {country.name.official}>
            <img src={country.flags.png} alt={country.flags.alt}/>
          </div>
        ))}
    </div>
  </div>
  )
}

export default App