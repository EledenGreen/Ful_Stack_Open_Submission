import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'
import Genre from './Genre'
import { useEffect, useState } from 'react'

const Books = (props) => {
  const [books, setBooks] = useState([])
  const [genre, setGenre] = useState('all genres')
  const { data, loading, refetch } = useQuery(ALL_BOOKS)

  useEffect(() => {
    if (data && data.allBooks) {
      setBooks(data.allBooks)
    }
  }, [data])

  if (loading) {
    return null
  }

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>books</h2>
      <p>Genre: {genre}</p>
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
      <Genre setBooks={setBooks} setGenre={setGenre} />
    </div>
  )
}

export default Books
