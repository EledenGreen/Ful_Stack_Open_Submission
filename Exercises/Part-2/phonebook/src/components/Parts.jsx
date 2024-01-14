
const Parts = ({arr, removeButton}) => {

    return (
      <ul>
        {arr.map(person => (
          <li key={person.id}>
            {person.name} ~ {person.number}
            <button onClick={() => removeButton(person.id)}>delete</button>
          </li>
        ))}
      </ul>
    
    )
  }


export default Parts