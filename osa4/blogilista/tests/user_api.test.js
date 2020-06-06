/* eslint-disable no-unused-vars */
/* eslint-disable indent */
/* eslint-disable no-undef */

const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')

const api = supertest(app)

const initialUsers = [

        {
        username: 'hellas',
        name: 'Arho Hellas',
        password: 'salasana123',
      },
      {
        username: 'jellas',
        name: 'jArho Hellas',
        password: 'jsalasana123',
      }
    ]

  beforeEach(async () => {
    await User.deleteMany({})

    let noteObject = new User(initialUsers[0])
    await noteObject.save()

    noteObject = new User(initialUsers[1])
    await noteObject.save()
})

test('post works', async () => {

    const newUser = {
        username: 'whellas',
        name: 'wArho Hellas',
        password: 'wwsalasana123',
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    const response = await api.get('/api/users')
    expect(response.body).toHaveLength(3)
  })

test('post invalid input works', async () => {

    const newUser = {
        username: 'wh',
        name: 'wArho Hellas',
        password: 'wwsalasana123',
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    const response = await api.get('/api/users')
    expect(response.body).toHaveLength(2)

    const newUser2 = {
        username: 'whuyui7',
        name: 'gygyuugy',
        password: 'ww',
    }
    await api
      .post('/api/users')
      .send(newUser2)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    const response2 = await api.get('/api/users')
    expect(response2.body).toHaveLength(2)

    const newUser3 = {
        username: 'hellas',
        name: 'gygyuugy',
        password: 'ww',
    }
    await api
      .post('/api/users')
      .send(newUser3)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    const response3 = await api.get('/api/users')
    expect(response3.body).toHaveLength(2)

  })



  afterAll(() => {
    mongoose.connection.close()
  })
