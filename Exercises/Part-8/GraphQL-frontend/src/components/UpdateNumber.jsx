import { useMutation, useQuery } from '@apollo/client'
import { useState } from 'react'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'
import Select from 'react-select'

const UpdateNumber = () => {
  const [born, setBorn] = useState('')
  const [selectedOption, setSelectedOption] = useState(null)

  let authors = []

  const result = useQuery(ALL_AUTHORS)

  const [changeBorn] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  })

  if (result.loading) {
    return <>loading</>
  }

  for (let i of result.data.allAuthors) {
    authors = authors.concat({ value: i.name, label: i.name })
  }

  const handleUpdate = async (event) => {
    event.preventDefault()
    const name = selectedOption.value

    changeBorn({ variables: { name, born } })
    setBorn('')
  }
  return (
    <>
      <h2>Set birthyear</h2>
      <form onSubmit={handleUpdate}>
        <Select
          defaultValue={selectedOption}
          value={selectedOption}
          onChange={setSelectedOption}
          options={authors}
        />
        <div>
          born
          <input
            value={born}
            onChange={(e) => setBorn(Number(e.target.value))}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </>
  )
}

export default UpdateNumber
