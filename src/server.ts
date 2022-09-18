import express from 'express'
import helmet from 'helmet'
import http from 'http'
import pino from 'pino-http'

import { LOGGER_OPTIONS } from './logger'
import { router } from './routers/tasks.router'
import { database } from './database'

const app = express()
const server = http.createServer(app)

app.use(express.json())
app.use(helmet())
app.use(pino(LOGGER_OPTIONS))

app.get('/health', async (request, response) => {
  return response.json({
    server: server.listening,
    database: await database.isConnected()
  })
})

app.use('/tasks', router)

export { server }
