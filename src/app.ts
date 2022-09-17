import express from 'express'
import pino from 'pino-http'

const app = express()

app.use(pino())

export { app }
