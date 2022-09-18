import { database } from './database'
import { logger } from './logger'
import { server } from './server'

async function main (): Promise<void> {
  const {
    PORT = 3000
  } = process.env

  await database.init()

  server.listen(PORT, () => logger.info(`Server listening on ${PORT}`))
}

main()
  .catch(logger.error)
