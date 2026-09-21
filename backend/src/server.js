import app from './app.js'
import { env } from './config/env.js'
import { initDatabase } from './config/database.js'

// Prepara la tabla de solicitudes (si hay base configurada) antes de aceptar tráfico
await initDatabase().catch((error) => {
  console.error('[db] No se pudo inicializar la base de datos:', error.message)
})

const server = app.listen(env.port, () => {
  console.log(`API de ColdevIA escuchando en http://localhost:${env.port} (${env.nodeEnv})`)
})

// Cierre ordenado (Render y otros hosts envían SIGTERM al redeployar).
const shutdown = (signal) => {
  console.log(`${signal} recibido, cerrando servidor...`)
  server.close(() => process.exit(0))
}

process.on('SIGTERM', () => shutdown('SIGTERM'))
process.on('SIGINT', () => shutdown('SIGINT'))
