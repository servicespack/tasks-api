import { describe } from '@jest/globals'
import request from 'supertest'

import { database } from '../src/database'
import { server } from '../src/server'

describe('Healthcheck', () => {
  beforeAll(async () => {
    await database.init()
  })

  afterAll(async () => {
    await database.close()
  })

  describe('GET /tasks', () => {
    it('Should list all tasks', () => {
      return request(server)
        .get('/tasks')
        .expect(200)
    })
  })
})
