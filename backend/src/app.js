import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import { env } from './config/env.js'
import apiRouter from './routes/index.js'
import { notFound } from './middlewares/notFound.js'
import { errorHandler } from './middlewares/errorHandler.js'

const app = express()

app.disable('x-powered-by')
// Render y similares ponen un proxy delante: sin esto req.ip sería la del proxy
app.set('trust proxy', 1)
app.use(helmet())
app.use(
  cors({
    origin(origin, callback) {
      // Permite herramientas sin origen (curl, Postman) y los orígenes configurados.
      if (!origin || env.allowedOrigins.includes(origin)) return callback(null, true)
      return callback(new Error(`Origen no permitido por CORS: ${origin}`))
    },
  }),
)
app.use(express.json({ limit: '100kb' }))

app.use('/api', apiRouter)

app.use(notFound)
app.use(errorHandler)

export default app
