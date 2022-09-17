import express from 'express'
import pino from 'pino-http'

import { LOGGER_OPTIONS } from './logger'

const app = express()

app.use(pino(LOGGER_OPTIONS))

export { app }
