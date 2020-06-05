/* eslint-disable indent */
/* eslint-disable no-undef */

const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

const initialBlogs = [

        {
        _id: '5a422aa71b54a676234d17f7',
        title: 'Go Harmful',
        author: 'Edsger e. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 6,
        __v: 2
      },
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 12,
        __v: 0
      },
      {
        _id: '5a422aa71b54a676234d17f9',
        title: 'Go To Statement ',
        author: 'Edsger s. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 7,
        __v: 1
      }
        ]

  beforeEach(async () => {
    await Blog.deleteMany({})

    let noteObject = new Blog(initialBlogs[0])
    await noteObject.save()

    noteObject = new Blog(initialBlogs[1])
    await noteObject.save()

    noteObject = new Blog(initialBlogs[2])
    await noteObject.save()
  })


test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

afterAll(() => {
  mongoose.connection.close()
})


test('there are three notes', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(3)
})
