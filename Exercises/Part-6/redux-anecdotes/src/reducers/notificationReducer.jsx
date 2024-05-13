import { createSlice } from "@reduxjs/toolkit";

const initialState = 'works'

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        notificationAction(state, action) {
            return action.payload
        }
    }
})

export default notificationSlice.reducer
export const { notificationAction} = notificationSlice.actions