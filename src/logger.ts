import pino from 'pino'

const {
  NODE_ENV = 'development'
} = process.env

const LOGGER_OPTIONS = {
  ...(
    NODE_ENV === 'development'
      ? {
          transport: {
            target: 'pino-pretty'
          }
        }
      : {}
  )
}

const logger = pino(LOGGER_OPTIONS)

export { logger, LOGGER_OPTIONS }
