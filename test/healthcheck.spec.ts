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

  it('Should return the correct response in the ideal case', () => {
    return request(server)
      .get('/health')
      .expect(200, {
        server: true,
        database: true
      })
  })
})
