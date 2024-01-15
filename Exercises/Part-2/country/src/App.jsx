import { useState, useEffect } from "react";
import axios from "axios";
import { OPENWEATHERMAP_API_KEY } from "./weatherapi"; // Adjust the path if necessary


const App = () => {

  const [countries, setNewCountries] = useState([])
  const [search, setNewSearch] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(null)

  useEffect(() => {

    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setNewCountries(response.data)
      })

  },[countries])

   const handleShow = (country) => {
    setSelectedCountry(country)
   }

  const handleSearch = (event) => {
    setNewSearch(event.target.value)
  }

  return (
    <div>
      <SearchCountry search={search} handleSearch={handleSearch} />

      {search && <DisplayCountry countries={countries} search={search} handleShow={handleShow}/>}
      {selectedCountry && <OneCountry arr={[selectedCountry]} />}
    </div>
  )
}

const Parts = ({arr, handleShow}) => {
  return (
    <div>
      <ul>
        {arr.map(country => (
          <li key = {country.name.official}>
            {country.name.common}
            <button onClick={() => handleShow(country)}>show</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

const DisplayCountry = ({countries, search, handleShow}) => {
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
    <Parts arr={arr} handleShow={handleShow}/>
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
    <div>
      {arr.map(country => (
          <div key = {country.name.official}>
            <Weather lat={country.latlng[0]} long={country.latlng[1]} />
          </div>
        ))}
    </div>
  </div>
  )
}

const Weather = ({lat, long}) => {

  const [weatherData, setWeatherData] = useState(null)

  useEffect(() => {

  axios
    .get(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${long}&appid=${OPENWEATHERMAP_API_KEY}`)
    .then((response) => {
      setWeatherData(response.data)
    })

}, [lat, long])

return (
  <div>
    {weatherData && (
      <div>
        <h3>Weather Information</h3>
        <div>Timezone: {weatherData.timezone}</div>
        {/* Add more weather details as needed */}
      </div>
    )}
  </div>
)
}

export default App