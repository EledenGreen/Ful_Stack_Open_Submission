import { useEffect, useState } from 'react'
import { DiaryEntry, NewDiaryEntry, Visibility, Weather } from './types'
import { getAllDiaries, create } from './services/diaries'
import axios from 'axios'

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([])
  const [date, setDate] = useState<string>('')
  const [visibility, setVisibility] = useState<Visibility>(Visibility.Good)
  const [weather, setWeather] = useState<Weather>(Weather.Cloudy)
  const [comment, setComment] = useState<string>('')
  const [error, setError] = useState<string>('')

  useEffect(() => {
    getAllDiaries().then((data) => {
      setDiaries(data)
    })
  }, [])

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault()
    createEntry({ date, visibility, weather, comment })
    setDate('')
    setVisibility(Visibility.Good)
    setWeather(Weather.Cloudy)
    setComment('')
  }

  const onWeatherChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    const value = event.target.value as Weather
    setWeather(value)
  }

  const onVisibilityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    const value = event.target.value as Visibility
    setVisibility(value)
  }

  const createEntry = async (object: NewDiaryEntry) => {
    try {
      const diaryEntry = await create(object)
      setDiaries(diaries.concat(diaryEntry))
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === 'string') {
          const message = e.response.data.replace(
            'Something went wrong. Error: ',
            ''
          )
          console.error(message)
          setError(message)
        } else {
          setError('Unrecognized axios error')
        }
      } else {
        console.error('Unknown error', e)
        setError('Unknown error')
      }
    }
  }

  return (
    <div>
      {error}
      <form onSubmit={handleSubmit}>
        <div>
          date
          <input
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        </div>
        <div>
          visibility
          <input
            type="string"
            value={visibility}
            onChange={onVisibilityChange}
          />
        </div>
        <div>
          weather
          <input type="string" value={weather} onChange={onWeatherChange} />
        </div>
        <div>
          comment
          <input
            type="string"
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
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
