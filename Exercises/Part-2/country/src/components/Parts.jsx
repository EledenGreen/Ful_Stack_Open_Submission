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

export default Parts