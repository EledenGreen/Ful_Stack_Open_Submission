import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Toggleable from './components/Togglable'
import { setNotification } from './reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import { createBlogs, likeAction } from './reducers/blogReducer'
import { setBlogs } from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import userService from './services/user'

const App = () => {
  const dispatch = useDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [users, setUsers] = useState()

  const blogs = useSelector((state) =>
    [...state.blogs].slice().sort((a, b) => b.likes - a.likes)
  )

  const user = useSelector((state) => state.user)
  console.log('initial user state', user)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
      blogService.getAll().then((initialBlogs) => {
        dispatch(setBlogs(initialBlogs))
      })
      userService.getAll().then((res) => {
        setUsers(res)
      })
    }
  }, [])

  const handleDeleteBlog = (id) => {
    const blogToRemove = blogs.find((blog) => blog.id === id)

    if (
      window.confirm(`Delete ${blogToRemove.title} by ${blogToRemove.author} ?`)
    ) {
      blogService.deleteBlog(id).then(() => {
        window.alert('Deleted')
        blogService.getAll().then((initialBlogs) => {
          dispatch(setBlogs(initialBlogs))
        })
      })
    }
  }

  const handleLikeUpdate = (blog) => {
    dispatch(likeAction(blog))
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
      dispatch(setUser(user))
      setUsername('')
      setPassword('')

      blogService.getAll().then((initialBlogs) => {
        dispatch(setBlogs(initialBlogs))
      })
    } catch (exception) {
      dispatch(setNotification('Wrong username or password', 5))
      console.log('not login')
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

  const addBlog = (blogObject) => {
    dispatch(createBlogs(blogObject))
    dispatch(
      setNotification(
        `a new blog ${blogObject.title} by ${blogObject.author} added`,
        5
      )
    )
  }

  const Menu = () => {
    const padding = {
      paddingRight: 5,
    }
    return (
      <div>
        <Link style={padding} to="/users">
          users
        </Link>
        <Link style={padding} to="/blogs">
          blogs
        </Link>
      </div>
    )
  }

  const Test = () => {
    return (
      <div>
        <p> {user.name} logged-in </p>
        {logoutForm()}
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.name} {user.username}
            </li>
          ))}
        </ul>
      </div>
    )
  }

  const BlogList = () => {
    return (
      <div>
        <h2>Create</h2>
        {addBlogForm()}

        <h2>Blogs</h2>
        <ul>
          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              handleLikeUpdate={handleLikeUpdate}
              handleDeleteBlog={handleDeleteBlog}
              user={user}
            />
          ))}
        </ul>
      </div>
    )
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification />
        {loginForm()}
      </div>
    )
  }

  return (
    <div>
      <Menu />
      <h2>User</h2>
      <Notification />

      <div>
        <Routes>
          <Route path="/users" element={<Test />} />
          <Route path="/blogs" element={<BlogList />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
