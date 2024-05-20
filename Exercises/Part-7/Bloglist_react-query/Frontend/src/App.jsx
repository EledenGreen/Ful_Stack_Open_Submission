/* eslint-disable indent */
import React, { useState, useEffect, useReducer } from 'react'
import Blog from './components/Blog'
import blogService, { create } from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Toggleable from './components/Togglable'
import CounterContext from './CounterContext'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getAll, addLike, deleteBlog } from './services/blogs'

const counterReducer = (state = null, action) => {
  switch (action.type) {
    case 'NEW_NOTIF':
      return action.payload
    default:
      return null
  }
}

const userReducer = (state, action) => {
  switch (action.type) {
    case 'NEW_USER':
      return action.payload
    default:
      return state
  }
}

const App = () => {
  const [counter, counterDispatch] = useReducer(counterReducer, null)
  const [user, userDispatch] = useReducer(userReducer, null)

  const queryClient = useQueryClient()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      userDispatch({ type: 'NEW_USER', payload: user })
    }
  }, [])

  const deleteBlogMutation = useMutation({
    mutationFn: deleteBlog,
    onSuccess: () => {
      queryClient.invalidateQueries('blogs')
    },
  })

  const handleDeleteBlog = (blog) => {
    if (window.confirm(`Delete ${blog.title} by ${blog.author} ?`)) {
      deleteBlogMutation.mutate(blog).then(() => {
        window.alert('Deleted')
      })
    }
  }

  const likeBlogMutation = useMutation({
    mutationFn: addLike,
    onSuccess: (updatedBlog) => {
      queryClient.setQueryData(['blogs'], (oldData) => {
        if (!oldData) return []
        return oldData.map((blog) =>
          blog.id === updatedBlog.id ? updatedBlog : blog
        )
      })
    },
  })

  const handleLikeUpdate = async (blog) => {
    likeBlogMutation.mutate(blog)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

      blogService.setToken(user.token)
      userDispatch({ type: 'NEW_USER', payload: user })
      setUsername('')
      setPassword('')
    } catch (exception) {
      counterDispatch({
        type: 'NEW_NOTIF',
        payload: 'Wrong username or password',
      })
      setTimeout(() => {
        counterDispatch('')
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    window.localStorage.removeItem('loggedBlogappUser')
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
          data-testid="username"
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
          data-testid="password"
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const logoutForm = () => (
    <form onSubmit={handleLogout}>
      <button type="submit">Logout</button>
    </form>
  )

  const addBlogForm = () => {
    return (
      <Toggleable buttonLabel="new blog">
        <BlogForm createBlog={addBlog} />
      </Toggleable>
    )
  }

  const newBlogMutation = useMutation({
    mutationFn: create,
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(['blogs'], blogs.concat(newBlog))
      counterDispatch({
        type: 'NEW_NOTIF',
        payload: `a new blog ${newBlog.title} by ${newBlog.author} added`,
      })
      setTimeout(() => {
        counterDispatch('')
      }, 5000)
    },
  })

  const addBlog = (blogObject) => {
    newBlogMutation.mutate(blogObject)
  }

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: getAll,
    retry: 1,
  })

  if (result.isPending) {
    return <div>pending</div>
  }

  if (result.isError) {
    return <div>error</div>
  }

  const blogs = result.data

  blogs.sort((a, b) => b.likes - a.likes)

  if (user === null) {
    return (
      <CounterContext.Provider value={[counter, counterDispatch]}>
        <div>
          <h2>Log in to application</h2>
          <Notification />
          {loginForm()}
        </div>
      </CounterContext.Provider>
    )
  }

  return (
    <CounterContext.Provider value={[counter, counterDispatch]}>
      <div>
        <h2>User</h2>
        <Notification />

        <p> {user.name} logged-in </p>
        {logoutForm()}

        <h2>Create</h2>
        {addBlogForm()}

        <h2>Blogs</h2>

        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            handleLikeUpdate={handleLikeUpdate}
            handleDeleteBlog={handleDeleteBlog}
            user={user}
          />
        ))}
      </div>
    </CounterContext.Provider>
  )
}

export default App
