import { app } from './app'
import { database } from './database'
import { logger } from './logger'

async function main (): Promise<void> {
  const {
    PORT = 3000
  } = process.env

  await database.init()

  app.listen(PORT, () => logger.info(`Listening on ${PORT}`))
}

main()
  .catch(logger.error)
