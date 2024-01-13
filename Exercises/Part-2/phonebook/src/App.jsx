import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{name: 'Arto Hellas', number: '1234567890',id: 0}])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  

  const addPhonebook = (event) => {
    event.preventDefault()
    const phoneBookObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    }

    const flag = persons.find(person => person.name === phoneBookObject.name)

    if(flag)
    { 
      let message = phoneBookObject.name
      alert(message + " is already added to phonebook")
    }
    else{
      setPersons(persons.concat(phoneBookObject))
    }
    setNewName('')
    setNewNumber('')
  }


  const handlePhoneBookChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handlePhoneNoChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPhonebook}>
        <div>
          name: 
          <input 
            value={newName}
            onChange={handlePhoneBookChange}
            />
        </div>
        <div>
          number:
          <input
            value={newNumber}
            onChange={handlePhoneNoChange} />
        </div>
          <button type="submit">add</button>
      </form>
      <h2>Numbers</h2>
      <div>
        <ul>
          {persons.map(person => (
            <li key={person.id}>
              {person.name} ~ {person.number}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )

}

export default App