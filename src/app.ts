import express from 'express'
import helmet from 'helmet'
import pino from 'pino-http'

import { LOGGER_OPTIONS } from './logger'

const app = express()

app.use(helmet())
app.use(pino(LOGGER_OPTIONS))

export { app }
