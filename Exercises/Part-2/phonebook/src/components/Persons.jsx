import Parts from "./Parts"

const Persons = ({persons, search, removeButton}) => {
    const arr =  persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()));
  
    return(
      <Parts arr={arr} removeButton={removeButton}/>
    )
  }

export default Persons