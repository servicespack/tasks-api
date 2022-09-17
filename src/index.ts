import { app } from './app'
import { logger } from './logger'

async function main (): Promise<void> {
  const {
    PORT = 3000
  } = process.env

  app.listen(PORT, () => logger.info(`Listening on ${PORT}`))
}

main()
  .catch(logger.error)
