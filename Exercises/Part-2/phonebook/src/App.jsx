import { useState, useEffect } from "react"
import Form from "./components/Form"
import SearchFilter from "./components/SearchFilter"
import Persons from "./components/Persons"
import phone from "./services/phone"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setNewSearch] = useState('')
  
  useEffect(() => {
    phone
      .getAll()
      .then(initialPhone => {
        setPersons(initialPhone)
      })
  }, [])
  console.log('render', persons.length, 'persons')

  const removeButton = (id) => {  
    const personToRemove = persons.find((person) => person.id === id);

    if(window.confirm(`Delete ${personToRemove.name} ?`)){
    phone
      .remove(id)
      .then(() => {
        phone
          .getAll()
          .then(initialPhone => {
            setPersons(initialPhone)
          })
      }

      
      )   
  }
}

  const addPhonebook = (event) => {
    event.preventDefault()
    const phoneBookObject = {
      name: newName,
      number: newNumber,
    }

    const flag = persons.find(person => person.name === phoneBookObject.name)
    
    if(flag)
    { 
        if(window.confirm(`${phoneBookObject.name} is already to phonebook, replace the old number with a new one ?`))
        { 
          const personToUpdate = persons.find((person) => person.name === phoneBookObject.name)

          phone
            .updateNumber(personToUpdate.id, phoneBookObject)
            .then(() =>{
              phone 
                .getAll()
                .then(initialPhone => {
                  setPersons(initialPhone)
                })
            })
        }
    }
  
    else{
      phone
      .create(phoneBookObject)
      .then(returnedPhone => {
        setPersons(persons.concat(returnedPhone))
      })
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
        
        <Persons persons={persons} search={search} setPersons={setPersons} removeButton={removeButton}/>

    </div>
  )

}

export default App