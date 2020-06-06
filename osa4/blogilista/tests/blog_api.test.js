/* eslint-disable no-unused-vars */
/* eslint-disable indent */
/* eslint-disable no-undef */

const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')

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


test('id is id and not _id', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
})


test('post works', async () => {

  const postedBlog = {
    title: 'autoblogi :D',
    author: 'Kalle',
    url: 'notäätoinen',
    likes: 8
  }


  await api
    .post('/api/blogs')
    .send(postedBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(4)
})


test('Likes is iniatialized to 0 if value not given', async () => {

  const postedBlog = {
    title: 'autoblogi :D',
    author: 'Kalle',
    url: 'notäätoinen'
  }

  await api
    .post('/api/blogs')
    .send(postedBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  const response = await api.get('/api/blogs')
  console.log(response.body)
  expect(response.body[response.body.length-1].likes).toEqual(0)
})

test('url missing', async () => {

  const postedBlog = {
    title: 'autoblogi :D',
    author: 'Kalle',
  }

  await api
    .post('/api/blogs')
    .send(postedBlog)
    .expect(400)
    .expect('Content-Type', /application\/json/)
  const response = await api.get('/api/blogs')
  console.log(response.body)
  expect(response.body).toHaveLength(3)

})


test('title missing', async () => {

  const postedBlog = {
    author: 'Kalle',
    url: 'www.bemaritonparhaita.com'
  }

  await api
    .post('/api/blogs')
    .send(postedBlog)
    .expect(400)
    .expect('Content-Type', /application\/json/)
  const response = await api.get('/api/blogs')
  console.log(response.body)
  expect(response.body).toHaveLength(3)

})

test('delete is succesfull', async () => {

  const start = await api.get('/api/blogs')
  await api
    .delete(`/api/blogs/${start.body[1].id}`)
    .expect(204)
  const response = await api.get('/api/blogs')
  console.log(response.body)
  expect(response.body.length).toBeLessThan(start.body.length)

})

test('updating likes is succesfull', async () => {

  const updatedBlog = {
    likes: 900
  }

  const start = await api.get('/api/blogs')
  await api
    .put(`/api/blogs/${start.body[1].id}`)
    .send(updatedBlog)
    .expect(200)
  const response = await api.get('/api/blogs')
  console.log(response.body)
  expect(response.body[1].likes).toEqual(900)

})
