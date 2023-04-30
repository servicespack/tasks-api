import { database } from './database'
import { logger } from './logger'
import { server } from './http.server'

const {
  HTTP_SERVER_ENABLED = 'true',
  HTTP_SERVER_PORT = 3000
} = process.env

await database.init()

if (HTTP_SERVER_ENABLED === 'true') {
  server.listen(HTTP_SERVER_PORT, () => { logger.info(`Server listening on ${HTTP_SERVER_PORT}`) })
}

process.on('SIGTERM', async () => {
  server.close()
  await database.close()
})

process
  .on('unhandledRejection', logger.error)
  .on('uncaughtException', logger.error)
