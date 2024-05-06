import { render, screen } from '@testing-library/react'
import Blog from './Blog'


test('renders content', () => {
  const blog = {
    title: 'title',
    author: 'author',
    user: {
      id: 'testUserId',
    },
  }

  const user = {
    id: 'testUserId',
    username: 'test username',
  }

  const handleLikeUpdate = vi.fn()
  const handleDeleteBlog = vi.fn()

  render(<Blog blog={blog} handleLikeUpdate={handleLikeUpdate} handleDeleteBlog={handleDeleteBlog} user={user}/>)

  const elementTitle = screen.findByText('title')
  const elementAuthor = screen.findByText('author')
  expect(elementTitle).toBeDefined()
  expect(elementAuthor).toBeDefined()

  const elementUrl = screen.queryByText('url')
  const elementNumber = screen.queryByText('number')

  expect(elementUrl).toBeNull()
  expect(elementNumber).toBeNull()
})