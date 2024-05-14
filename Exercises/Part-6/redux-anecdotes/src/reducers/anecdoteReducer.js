import { createSlice } from "@reduxjs/toolkit"
import annecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
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
    },
    appendAnecdote(state, action) {
     state.push(action.payload)
    }
  }
})

export const { voteAction, setAnecdotes, appendAnecdote } = anecdoteSlice.actions 

export const initialAnecdotes = () => {
  return async dispatch => {
    const annecdotes = await annecdoteService.getAll()
    dispatch(setAnecdotes(annecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await annecdoteService.create(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export default anecdoteSlice.reducer
