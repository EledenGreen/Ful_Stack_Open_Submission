const blogsRouter = require('express').Router()
const { request } = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
        return authorization.replace('Bearer ', '')
    }
    return null
}

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1} )
        response.json(blogs)
    })

blogsRouter.post('/', async (request, response,) => {
    const body = request.body

    const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'tokken invalid' })
    }
    const user = await User.findById(decodedToken.id)

    if(!(body.title) || !(body.url))
    {
        response.status(400).end()
    }
    else
    {
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user.id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
    }
})

blogsRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
})

blogsRouter.patch('/:id', async (request, response) => {
    try {
        const body = request.body
        console.log('patch', body)
        const blog = {
            likes: body.likes
        }
        console.log('patch',blog)
        const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
        console.log('patch',updatedBlog)
        if (!updatedBlog) {
            return response.status(404).json({ error: 'Blog not found' })
        }
        response.json(updatedBlog)
    } catch (error) {
        console.error('Error updating blog:', error)
        response.status(500).json({ error: 'Server error' })
    }
})


module.exports = blogsRouter