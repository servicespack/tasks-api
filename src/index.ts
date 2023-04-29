import { database } from './database'
import { logger } from './logger'
import { server } from './http.server'

async function main (): Promise<void> {
  const {
    HTTP_SERVER_PORT = 3000
  } = process.env

  await database.init()

  server.listen(HTTP_SERVER_PORT, () => { logger.info(`Server listening on ${HTTP_SERVER_PORT}`) })

  process.on('SIGTERM', async () => {
    server.close()
    await database.close()
  })
}

main()
  .catch(logger.error)
