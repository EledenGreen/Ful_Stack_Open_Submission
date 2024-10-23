import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'
import { useEffect, useState } from 'react'

const Genre = ({ setBooks, setGenre }) => {
  const [selectedGenre, setSelectedGenre] = useState(null)

  const result = useQuery(ALL_BOOKS)
  const { loading, data } = useQuery(ALL_BOOKS, {
    variables: selectedGenre ? { genre: selectedGenre } : {},
  })

  useEffect(() => {
    if (data) {
      setBooks(data.allBooks)
    }
  }, [data, setBooks])

  if (result.loading || loading) {
    return <>loading</>
  }

  const books = result.data.allBooks
  let genresUnique = []

  for (let i of books) {
    genresUnique = [...new Set([...genresUnique, ...i.genres])]
  }

  const handleGenre = async (p) => {
    setSelectedGenre(p)
    setGenre(p)
  }

  const reset = async () => {
    setSelectedGenre(null)
    setGenre('all genres')
  }

  return (
    <>
      {genresUnique.map((p, index) => (
        <button key={index} onClick={() => handleGenre(p)}>
          {p}
        </button>
      ))}
      <button onClick={() => reset()}>all genres</button>
    </>
  )
}

export default Genre
