const { test, after, beforeEach } = require('node:test')
const assert =  require('node:assert')
const Blog = require('../models/blog')
const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    console.log('cleared')

    for(let blog of helper.initialBlogs) {
        let blogObject = new Blog(blog)
        await blogObject.save()
        console.log('saved')
    }
    console.log('done')
})

test('all blogs are returned using GET', async () => {
    const contents = await api.get('/api/blogs')

    assert.strictEqual(contents.body.length, helper.initialBlogs.length)
})

test('unique identifier is "id" not "_id" ', async () => {
    const contents = await api.get('/api/blogs')

    for(let blog of contents.body)
        if ('id' in blog && !('_id' in blog)) console.log('id')

})

test.only('a new blog can be added using POST', async () => {
    const content = helper.listWithOneBlog
    console.log(content)
    await api
    .post('/api/blogs')
    .send(content)
    .expect(201)
    .expect('Content-type', /application\/json/)

    const blogsAtEnd = await api.get('/api/blogs')
    const response = blogsAtEnd.body.map(r => r.title)

    assert.strictEqual(blogsAtEnd.body.length, helper.initialBlogs.length + 1)
    assert(response.includes('Go To Statement Considered Harmful'))
})

after(async () => {
    await mongoose.connection.close()
})