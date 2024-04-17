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

test('all blogs are returned', async () => {
    const contents = await api.get('/api/blogs')

    assert.strictEqual(contents.body.length, helper.initialBlogs.length)
})

test.only('unique identifier is "id" not "_id" ', async () => {
    const contents = await api.get('/api/blogs')

    for(let blog of contents.body)
        if ('id' in blog && !('_id' in blog)) console.log('id')

})

after(async () => {
    await mongoose.connection.close()
})