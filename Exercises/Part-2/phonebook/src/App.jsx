import { useState } from "react"
import Form from "./components/Form"
import SearchFilter from "./components/SearchFilter"
import Persons from "./components/Persons"

const App = () => {
  const [persons, setPersons] = useState([{name: 'Arto Hellas', number: '1234567890',id: 0}])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setNewSearch] = useState('')
  

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

  const handleSearch = (event) => {
    console.log(event.target.value)
    setNewSearch(event.target.value)

  }
  
  return (
    <div>
      <h2>Phonebook</h2>

        <SearchFilter search={search} handleSearch={handleSearch} />

      <h2>Add a new</h2>
      
        <Form 
          addPhonebook={addPhonebook} newName={newName} handlePhoneBookChange={handlePhoneBookChange}
          newNumber={newNumber} handlePhoneNoChange={handlePhoneNoChange}
        />
      
      <h2>Numbers</h2>
        
        <Persons persons={persons} search={search} setPersons={setPersons} />

    </div>
  )

}

export default App