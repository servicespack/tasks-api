import { afterAll, beforeAll, describe, it } from '@jest/globals'
import { Server } from 'http'
import { faker } from '@faker-js/faker'
import os from 'os'
import path from 'path'
import request from 'supertest'

import { Database } from '../src/database'

describe('Healthcheck', () => {
  let database: Database
  let server: Server

  beforeAll(async () => {
    process.env = {
      ...process.env,
      DATABASE: path.join(os.tmpdir(), '@every/tasks-api', faker.datatype.string()),
      JWT_SECRET: faker.lorem.word()
    }

    database = (
      await import(path.join(__dirname, '..', 'src', 'database'))
    ).database
    await database.init()

    server = (
      await import(path.join(__dirname, '..', 'src', 'server'))
    ).server
  })

  afterAll(async () => {
    await database.close()
  })

  it('Should return the correct response in the ideal case', async () => {
    return await request(server)
      .get('/health')
      .expect(200, {
        server: true,
        database: true
      })
  })
})
