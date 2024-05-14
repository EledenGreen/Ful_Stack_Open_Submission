import { createSlice } from "@reduxjs/toolkit"
import annecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    setAnecdotes(state, action) {
      return action.payload
    },
    appendAnecdote(state, action) {
     state.push(action.payload)
    }
  }
})

export const { setAnecdotes, appendAnecdote } = anecdoteSlice.actions 

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

export const voteAction = (id, object) => {
  return async dispatch => {
    await annecdoteService.voteUpdate(id, object)
    const annecdotes = await annecdoteService.getAll()
    dispatch(setAnecdotes(annecdotes))
  }
}

export default anecdoteSlice.reducer
