import { useLazyQuery, useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { ALL_BOOKS, ME } from '../queries'

const Recommend = (props) => {
  const [userGenre, setUserGenre] = useState('')
  const [books, setBooks] = useState([])
  const { data: meData } = useQuery(ME, {
    skip: !props.token,
  })
  const [AllBooks, { loading: booksLoading }] = useLazyQuery(ALL_BOOKS)

  useEffect(() => {
    const fetch = async () => {
      if (props.token && meData && meData.me) {
        const genre = meData.me.favoriteGenre
        console.log('genre', genre)
        const { data: bookData } = await AllBooks({
          variables: { genre: genre },
        })
        console.log('books', bookData)
        setUserGenre(genre)
        setBooks(bookData.allBooks)
      } else {
        setUserGenre('')
        setBooks([])
      }
    }
    fetch()
  }, [props.token, meData, AllBooks])

  if (!props.show) {
    return null
  }

  if (booksLoading || books.length < 0) {
    return <>loading...</>
  }

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
