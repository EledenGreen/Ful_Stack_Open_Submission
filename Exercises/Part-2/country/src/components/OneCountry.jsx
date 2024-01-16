import { useState, useEffect } from "react"
import axios from "axios"
const api_key = import.meta.env.VITE_API_KEY


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
              <h2>Weather in {country.capital}</h2>
              <Weather lat={country.capitalInfo.latlng[0]} long={country.capitalInfo.latlng[1]} />
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
      .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${api_key}`)
      .then((response) => {
        setWeatherData(response.data)
      })
  
  }, [lat, long]);
  
  return (
    <div>
      {weatherData && (
        <div>
          <div>Temperature: {weatherData.main.temp } Kelvin</div>
          <div><WeatherIcon iconid={weatherData.weather[0].icon}/></div>
          <div> Wind : {weatherData.wind.speed} m/s </div>
        </div>
      )}
    </div>
  )
  }
  
  const WeatherIcon = ({iconid}) => {
  
    const url = `https://openweathermap.org/img/wn/${iconid}@2x.png`
  
  
      return (
        <div>
          <img src = {url} />
        </div>
      )
  }

export default OneCountry