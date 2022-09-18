import { afterAll, afterEach, beforeAll, describe, expect, it } from '@jest/globals'
import { Server } from 'http'
import { faker } from '@faker-js/faker'
import njwt from 'njwt'
import os from 'os'
import path from 'path'
import request from 'supertest'

import { Database } from '../src/database'
import { Task } from '../src/entities/task.entity'
import { TaskStatus } from '../src/enumerables/task-status.enum'

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

  afterEach(async () => {
    await database.em.nativeDelete(Task, {})
  })

  afterAll(async () => {
    await database.close()
  })

  describe('POST /tasks', () => {
    it('Should create a new task correctly in the ideal case', async () => {
      const sub = faker.datatype.uuid()
      const token = `Bearer ${njwt.create({ sub }, process.env.JWT_SECRET).compact()}`

      const title = faker.lorem.words()
      const description = faker.lorem.text()

      const { status, body } = await request(server)
        .post('/tasks')
        .send({
          title,
          description
        })
        .set('Authorization', token)

      expect(status).toBe(201)
      expect(body).toEqual({
        id: expect.any(Number),
        title,
        description,
        status: TaskStatus.TO_DO,
        ownerId: sub,
        createdAt: expect.any(String),
        updatedAt: expect.any(String)
      })
    })

    it('Should not allow in case of invalid token', async () => {
      const sub = faker.datatype.uuid()
      const token = faker.helpers.arrayElement([
        `Bearer ${njwt.create({ sub }, faker.datatype.string()).compact()}`,
        ''
      ])

      const title = faker.lorem.words()
      const description = faker.lorem.text()

      const { status } = await request(server)
        .post('/tasks')
        .send({
          title,
          description
        })
        .set('Authorization', token)

      expect(status).toBe(401)
    })
  })

  describe('GET /tasks', () => {
    it('Should list all owner\'s tasks', async () => {
      const token1 = `Bearer ${njwt.create({ sub: faker.datatype.uuid() }, process.env.JWT_SECRET).compact()}`
      const token2 = `Bearer ${njwt.create({ sub: faker.datatype.uuid() }, process.env.JWT_SECRET).compact()}`

      const { body: task } = await request(server)
        .post('/tasks')
        .set('Authorization', token1)
        .send({
          title: faker.lorem.words(),
          description: faker.lorem.text()
        })

      await request(server)
        .post('/tasks')
        .set('Authorization', token2)
        .send({
          title: faker.lorem.words(),
          description: faker.lorem.text()
        })

      const { status, body } = await request(server)
        .get('/tasks')
        .set('Authorization', token1)

      expect(status).toBe(200)
      expect(body).toEqual({
        data: [
          task
        ],
        total: 1
      })
    })
  })
})
