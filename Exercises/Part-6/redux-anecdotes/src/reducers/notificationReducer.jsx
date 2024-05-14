import { createSlice } from "@reduxjs/toolkit";

const initialState = null

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        notificationRemover() {
            return null
        },
        notificationState(state, action) {
            return action.payload
        },
    },
})

export const {  notificationRemover, notificationState } = notificationSlice.actions

export const setNotification = (content, time) => {
    return async dispatch => {
        await dispatch(notificationState(content))
        setTimeout(async () => {
            await dispatch(notificationRemover())
        }, time * 1000);
    }
}

export default notificationSlice.reducer
