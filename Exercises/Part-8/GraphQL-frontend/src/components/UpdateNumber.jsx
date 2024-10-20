import { useMutation } from '@apollo/client'
import { useState } from 'react'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'

const UpdateNumber = () => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [changeBorn] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  })

  const handleUpdate = (event) => {
    event.preventDefault()

    changeBorn({ variables: { name, born } })

    setName('')
    setBorn('')
  }
  return (
    <>
      <h2>Set birthyear</h2>
      <form onSubmit={handleUpdate}>
        <div>
          name
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </div>
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
