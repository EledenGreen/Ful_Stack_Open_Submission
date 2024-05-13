import { createSlice } from "@reduxjs/toolkit";

const initialState = null

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        notificationAction(state, action) {
            return `Anecdote: "${action.payload}" created` 
        },
        notificationRemover() {
            return null
        },
        notificationVote(state, action) {
            return `You voted: "${action.payload}"`
        }
    }
})

export default notificationSlice.reducer
export const { notificationAction, notificationRemover, notificationVote } = notificationSlice.actions