import Toggleable from "./Togglable"
import blogService from "../services/blogs"

const Blog = ({ blog, handleLikeUpdate }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLike = async () => {
    try {
      const updatedBlog = await blogService.addLike(blog)
      handleLikeUpdate(updatedBlog)
    }
    catch (error) {
      console.error(error.message)
    }
  }

  return (
  <div style={blogStyle}>
    {console.log(blog)}
    {blog.title} {blog.author} 
    <Toggleable buttonLabel='view'>
      <div>
        <ul onClick={handleLike}>
          <li>url: {blog.url}</li>
          <li>likes: {blog.likes}
            <button type="click">like</button>
          </li>
          <li>username: {blog.user.username}</li>
        </ul>
      </div>
    </Toggleable>
  </div>
  )  
}

export default Blog