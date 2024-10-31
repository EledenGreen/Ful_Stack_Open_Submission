import axios from 'axios'
import { baseUrl } from '../constants'
import { DiaryEntry, NewDiaryEntry, NonSensitiveDiaryEntry } from '../types'

export const getAllDiaries = async () => {
  const response = await axios.get<NonSensitiveDiaryEntry[]>(baseUrl)
  return response.data
}

export const create = async (object: NewDiaryEntry) => {
  const { data } = await axios.post<DiaryEntry>(baseUrl, object)

  return data
}
