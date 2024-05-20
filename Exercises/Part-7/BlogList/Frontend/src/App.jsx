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
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useMatch,
} from 'react-router-dom'
import userService from './services/user'
import './App.css'

const padding = {
  paddingRight: 5,
}
const Menu = () => {
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

const App = () => {
  const dispatch = useDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [users, setUsers] = useState([])

  const blogs = useSelector((state) =>
    [...state.blogs].slice().sort((a, b) => b.likes - a.likes)
  )

  const user = useSelector((state) => state.user)
  console.log('initial user state', user)

  const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')

  useEffect(() => {
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
      blogService.getAll().then((initialBlogs) => {
        dispatch(setBlogs(initialBlogs))
      })
      if (users.length === 0) {
        userService.getAll().then((res) => {
          setUsers(res)
          console.log('asdfg')
        })
      }
    }
  }, [loggedUserJSON])

  const match = useMatch('/users/:id')
  console.log('USERS', users)
  console.log('MATCH:', match)
  let userMatch = null

  if (match && users && users.length > 0) {
    console.log('USERS ARRAY', users)
    userMatch = users.find((user) => user.id === match.params.id)
  }

  const match2 = useMatch('/blogs/:id')
  console.log('USERS', users)
  console.log('MATCH:', match2)
  let blogMatch = null

  if (match2 && blogs && blogs.length > 0) {
    blogMatch = blogs.find((blog) => blog.id === match2.params.id)
    console.log('INSIDE', blogMatch)
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

  const UserView = ({ users }) => {
    return (
      <div>
        <div style={padding}>
          <p> {user.name} logged-in </p>
          {logoutForm()}
        </div>

        <h2>Users</h2>
        <div>
          <div className="userItem">
            <span></span>
            <span className="userBlogs">Blogs created</span>
          </div>
        </div>
        <ul>
          {users.map((user) => (
            <li key={user.id} className="userItem">
              <span className="userName">
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </span>
              <span className="userBlogs">{user.blogs.length}</span>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  const BlogListView = () => {
    return (
      <div>
        <h2>User</h2>
        <p> {user.name} logged-in </p>
        {logoutForm()}
        <h2>Create</h2>
        {addBlogForm()}

        <h2>Blogs</h2>
        <ul>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} user={user} />
          ))}
        </ul>
      </div>
    )
  }

  const SingleUserView = ({ userMatch }) => {
    console.log('******************', userMatch)
    if (!userMatch) {
      return null
    }
    return (
      <div>
        <h2>User</h2>
        <p> {user.name} logged-in </p>
        {logoutForm()}
        <h3>{userMatch.name}</h3>
        <h4>added blogs</h4>
        <ul className="userBlogs">
          {userMatch.blogs.map((blog) => (
            <li key={blog.id}>{blog.title}</li>
          ))}
        </ul>
      </div>
    )
  }

  const SingleBlogView = ({ blogMatch }) => {
    const dispatch = useDispatch()

    const handleLikeUpdate = (blogMatch) => {
      dispatch(likeAction(blogMatch))
    }
    console.log('SINGLE', blogMatch)
    return (
      <div>
        <h2>User</h2>
        <p> {user.name} logged-in </p>
        {logoutForm()}
        <h3>
          {blogMatch.title} {blogMatch.author}{' '}
        </h3>
        <ul>
          <li>url: {blogMatch.url} </li>
          <li className="likes">
            likes: {blogMatch.likes}
            <button onClick={() => handleLikeUpdate(blogMatch)}>like</button>
          </li>
          <li> added by {blogMatch.user.name} </li>
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

      <Notification />

      <div>
        <Routes>
          <Route path="/" element={<BlogListView />} />
          <Route path="/users" element={<UserView users={users} />} />
          <Route
            path="/users/:id"
            element={<SingleUserView userMatch={userMatch} />}
          />
          <Route path="/blogs" element={<BlogListView />} />
          <Route
            path="/blogs/:id"
            element={<SingleBlogView blogMatch={blogMatch} />}
          />
        </Routes>
      </div>
    </div>
  )
}

export default App
