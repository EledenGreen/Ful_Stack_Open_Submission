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

test.only('all blogs are returned', async () => {
    const contents = await api.get('/api/blogs')

    assert.strictEqual(contents.body.length, helper.initialBlogs.length)
})

after(async () => {
    await mongoose.connection.close()
})