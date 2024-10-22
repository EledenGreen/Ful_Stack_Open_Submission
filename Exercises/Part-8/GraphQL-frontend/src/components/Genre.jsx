import { useLazyQuery, useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'
import { useState } from 'react'

const Genre = ({ setBooks, setGenre }) => {
  const result = useQuery(ALL_BOOKS)
  const [AllBooks] = useLazyQuery(ALL_BOOKS)

  if (result.loading) {
    return <>loading</>
  }

  const books = result.data.allBooks
  let genresUnique = []

  for (let i of books) {
    genresUnique = [...new Set([...genresUnique, ...i.genres])]
  }

  const handleGenre = async (p) => {
    console.log('p', p)
    const { data } = await AllBooks({ variables: { genre: p } })
    console.log(data.allBooks)
    setBooks(data.allBooks)
    setGenre(p)
  }

  const reset = async () => {
    const { data } = await AllBooks()
    setBooks(data.allBooks)
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
