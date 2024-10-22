import { useLazyQuery, useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'
import { useState } from 'react'

const Genre = ({ setBooks }) => {
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
  }

  return (
    <>
      {genresUnique.map((p, index) => (
        <button key={index} onClick={() => handleGenre(p)}>
          {p}
        </button>
      ))}
    </>
  )
}

export default Genre
