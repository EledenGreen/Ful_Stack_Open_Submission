import axios from 'axios'
import { baseUrl } from '../constants'
import { NonSensitiveDiaryEntry } from '../types'

export const getAllDiaries = () => {
  return axios
    .get<NonSensitiveDiaryEntry[]>(baseUrl)
    .then((response) => response.data)
}
