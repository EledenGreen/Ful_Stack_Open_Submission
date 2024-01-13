const Parts = ({arr}) => {

    return (
      <ul>
        {arr.map(person => (
          <li key={person.id}>
            {person.name} ~ {person.number}
          </li>
        ))}
      </ul>
    
    )
  }

export default Parts