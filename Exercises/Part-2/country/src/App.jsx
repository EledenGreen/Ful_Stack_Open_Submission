import { useState, useEffect } from "react";
import axios from "axios";
import SearchCountry from "./components/SearchCountry";
import DisplayCountry from "./components/DisplayCountry";
import OneCountry from "./components/OneCountry";

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

export default App