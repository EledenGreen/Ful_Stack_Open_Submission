import { useEffect, useState } from 'react'
import { NonSensitiveDiaryEntry } from './types'
import { getAllDiaries } from './services/diaries'

const App = () => {
  const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([])

  useEffect(() => {
    getAllDiaries().then((data) => {
      setDiaries(data)
    })
  }, [])

  return (
    <div>
      <ul>
        <h3>Diary entries</h3>

        {diaries.map((diary, index) => (
          <div key={index}>
            <h3>{diary.date}</h3>
            <p>Visibility: {diary.visibility}</p>
            <p>Weather: {diary.weather}</p>
          </div>
        ))}
      </ul>
    </div>
  )
}

export default App
