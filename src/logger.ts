import pino from 'pino'

import { NodeEnv } from './enumerables/node-env.enum'

const {
  NODE_ENV = NodeEnv.DEVELOPMENT
} = process.env

const LOGGER_OPTIONS = {
  ...(
    NODE_ENV === NodeEnv.DEVELOPMENT
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
