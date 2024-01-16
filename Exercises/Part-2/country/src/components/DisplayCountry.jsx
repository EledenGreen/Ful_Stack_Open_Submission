import Parts from "./Parts";
import OneCountry from "./OneCountry";

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

export default DisplayCountry

