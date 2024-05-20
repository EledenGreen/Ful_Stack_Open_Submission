import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
  },
})

export const { setBlogs, appendBlog } = blogSlice.actions

export const initialBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlogs = (object) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(object)
    dispatch(appendBlog(newBlog))
  }
}

export const likeAction = (object) => {
  return async (dispatch) => {
    await blogService.addLike(object)
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createComment = (object, content) => {
  console.log('reducer', content)
  return async (dispatch) => {
    await blogService.addComment(object, content)
    const blogs = await blogService.getAll()
    console.log('reducer', content)
    dispatch(setBlogs(blogs))
  }
}

export default blogSlice.reducer
