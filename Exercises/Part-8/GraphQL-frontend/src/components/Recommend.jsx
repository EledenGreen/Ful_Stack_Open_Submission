import { useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { ALL_BOOKS, ME } from '../queries'

const Recommend = (props) => {
  const [userGenre, setUserGenre] = useState('')
  const { data: meData } = useQuery(ME, {
    skip: !props.token, // Skip the query if no token is provided
  })

  // Execute ALL_BOOKS only when userGenre is available
  const { data: bookData, loading: booksLoading } = useQuery(ALL_BOOKS, {
    variables: { genre: userGenre },
    skip: !userGenre, // Skip the query until userGenre is set
  })

  useEffect(() => {
    if (props.token && meData && meData.me) {
      const genre = meData.me.favoriteGenre
      console.log('genre', genre)
      setUserGenre(genre)
    } else {
      setUserGenre('')
    }
  }, [props.token, meData])

  if (!props.show) {
    return null
  }

  if (booksLoading || !bookData) {
    return <>loading...</>
  }

  const books = bookData.allBooks || []

  return (
    <div>
      <h2>Recommendations</h2>
      <p>favorite genre: {userGenre}</p>
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
    </div>
  )
}

export default Recommend
