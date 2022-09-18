import express from 'express'
import helmet from 'helmet'
import http from 'http'
import pino from 'pino-http'

import { logger, LOGGER_OPTIONS } from './logger'
import { router } from './routers/tasks.router'
import { database } from './database'

const app = express()
const server = http.createServer(app)

app.use(express.json())
app.use(helmet())
app.use(pino(LOGGER_OPTIONS))

app.get('/health', (_request, response) => {
  Promise.all([
    database.isConnected()
  ])
    .then(([database]) => {
      response.json({
        server: server.listening,
        database
      })
    })
    .catch((...errors) => {
      logger.error(errors)
      response.status(500)
    })
})

app.use('/tasks', router)

export { server }
