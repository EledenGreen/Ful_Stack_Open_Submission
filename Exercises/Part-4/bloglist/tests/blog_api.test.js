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
        {assert.ok('id' in blog)
        assert.ok(!('_id' in blog))}
})

test('a new blog can be added using POST', async () => {
    const content = helper.listWithOneBlog[0]
    console.log('Token', helper.token)

    const temp = await api
    .post('/api/blogs')
    .set({ Authorization: `Bearer ${helper.token}`})
    .send(content)
    .expect(201)
    .expect('Content-type', /application\/json/)

    console.log('POST response', temp.status, temp.statusType)
    console.log('Response body', temp.body)
    

    const blogsAtEnd = await api.get('/api/blogs')
    const response = blogsAtEnd.body.map(r => r.title)

    assert.strictEqual(blogsAtEnd.body.length, helper.initialBlogs.length + 1)
    assert(response.includes('Go To Statement Considered Harmful'))
})

test('presence of "likes" property is tested in a POST request', async () => {
    const content = helper.listWithOneBlog

    if('likes' in content[0])
        console.log('contains likes')

    const response = await api
    .post('/api/blogs')
    .send(content)
    .expect(201)
    .expect('Content-Type', /application\/json/)

    if(!('likes' in content[0])) 
    {
    console.log('defaulting to 0')
    assert.strictEqual(response.body.likes, 0)
    }
})

test('title or url is missing', async () => {
    const content = helper.listWithNoTitle[0]

    const response = await api
    .post('/api/blogs')
    .send(content)
    .expect(400)

    console.log(response.status)
    assert.strictEqual(response.status, 400)
})

test('deleting a specified blog by id', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)
    
    const blogsAtEnd = await helper.blogsInDb()

    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1)
})

test.only('updating only likes value', async () => {
    const patch = helper.blogToPatch
    console.log(patch)
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]
    console.log(blogToUpdate)

    const response = await api
        .patch(`/api/blogs/${blogToUpdate.id}`)
        .send(patch)
        .expect(200)
        console.log('api response', response.body)

    const blogsAtEnd = await helper.blogsInDb()
    const updatedBlog = blogsAtEnd[0]
    console.log(updatedBlog)

    assert.strictEqual(updatedBlog.likes, 10)
})

after(async () => {
    await mongoose.connection.close()
})