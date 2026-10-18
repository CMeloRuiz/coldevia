import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import { env, isAllowedOrigin } from './config/env.js'
import apiRouter from './routes/index.js'
import { notFound } from './middlewares/notFound.js'
import { errorHandler } from './middlewares/errorHandler.js'

const app = express()

app.disable('x-powered-by')
// Render y similares ponen un proxy delante: sin esto req.ip sería la del proxy
app.set('trust proxy', 1)

app.use(
  helmet({
    // La API responde a un frontend en otro dominio (coldevia.com), así que no
    // puede quedarse con la política "same-origin" que trae helmet por defecto.
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  }),
)

/**
 * CORS. Los orígenes salen de ALLOWED_ORIGINS (ver config/env.js).
 * Un origen no permitido se responde SIN cabeceras CORS: el navegador bloquea
 * la respuesta y la petición no se convierte en un error 500 del servidor.
 */
const corsOptions = {
  origin(origin, callback) {
    // Sin cabecera Origin: curl, Postman, health checks del propio Render.
    if (!origin) return callback(null, true)
    if (isAllowedOrigin(origin)) return callback(null, true)
    console.warn(`[cors] Origen rechazado: ${origin}`)
    return callback(null, false)
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  credentials: true, // por si en el futuro se envían cookies o cabeceras de sesión
  maxAge: 86400, // el navegador cachea el preflight 24 h
}

// cors() también responde los preflight (OPTIONS) y corta ahí la cadena.
app.use(cors(corsOptions))

app.use(express.json({ limit: '100kb' }))

app.use('/api', apiRouter)

app.use(notFound)
app.use(errorHandler)

export default app
