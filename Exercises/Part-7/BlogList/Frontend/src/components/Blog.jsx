import { Link, Routes, Route, useMatch } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Blog = ({ blog, handleLikeUpdate, handleDeleteBlog, user }) => {
  const blogs = useSelector((state) => state.blogs)

  const match = useMatch('/blogs/:id')
  let blogMatch = null

  if (match && blogs && blogs.length > 0) {
    blogMatch = blogs.find((b) => b.id === match.params.id)
  }
  console.log('test', blog)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div style={blogStyle} className="blogTest">
      {console.log(blog)}
      <Link to={`/blogs/${blog.id}`}>
        {blog.title} {blog.author}
      </Link>
    </div>
  )
}

export default Blog
