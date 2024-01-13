
const Form = (props) => {
    return (
      <form onSubmit={props.addPhonebook}>
      <div>
        name: 
        <input 
          value={props.newName}
          onChange={props.handlePhoneBookChange}
          />
      </div>
      <div>
        number:
        <input
          value={props.newNumber}
          onChange={props.handlePhoneNoChange} />
      </div>
        <button type="submit">add</button>
    </form>
    )
  }

export default Form