import Toggleable from "./Togglable"

const Blog = ({ blog }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
  <div style={blogStyle}>
    {console.log(blog)}
    {blog.title} {blog.author} 
    <Toggleable buttonLabel='view'>
      <div>
        <ul>
          <li>url: {blog.url}</li>
          <li>likes: {blog.likes}
            <button>like</button>
          </li>
          <li>username: {blog.user.username}</li>
        </ul>
      </div>
    </Toggleable>
  </div>
  )  
}

export default Blog