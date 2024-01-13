const SearchFilter = (props) => {
    return(
    <div>
      filter shown with: 
      <input 
        value={props.search}
        onChange={props.handleSearch}
        placeholder="enter name"
      />
    </div>
    )
  }

  export default SearchFilter