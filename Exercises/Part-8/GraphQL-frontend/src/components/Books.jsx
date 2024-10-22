import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'
import Genre from './Genre'
import { useEffect, useState } from 'react'

const Books = (props) => {
  const [books, setBooks] = useState([])
  const result = useQuery(ALL_BOOKS)

  useEffect(() => {
    if (result.data && result.data.allBooks) {
      setBooks(result.data.allBooks)
    }
  }, [result])

  if (result.loading) {
    return null
  }

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Genre setBooks={setBooks} />
    </div>
  )
}

export default Books
