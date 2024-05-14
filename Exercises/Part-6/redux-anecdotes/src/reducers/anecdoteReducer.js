import { createSlice } from "@reduxjs/toolkit"
import annecdoteService from '../services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    addAnecdoteAction(state, action) {
      const content = action.payload
      state.push({
        content,
        id: getId(),
        votes: 0
      })
    },
    voteAction(state, action) {
      
      const id = action.payload
      const anecdoteToChange = state.find(n => n.id === id)
      const changeAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }

      return state.map(anecdote => 
        anecdote.id !== id ? anecdote : changeAnecdote
      )
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { addAnecdoteAction, voteAction, setAnecdotes } = anecdoteSlice.actions 

export const initialAnecdotes = () => {
  return async dispatch => {
    const annecdotes = await annecdoteService.getAll()
    dispatch(setAnecdotes(annecdotes))
  }
}

export default anecdoteSlice.reducer
