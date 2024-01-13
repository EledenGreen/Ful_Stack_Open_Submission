import Parts from "./Parts"

const Persons = ({persons, search}) => {
    const arr =  persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()));
  
    return(
      <Parts arr={arr} />
    )
  }

export default Persons