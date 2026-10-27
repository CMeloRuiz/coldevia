import app from './app.js'
import { env } from './config/env.js'
import { initDatabase } from './config/database.js'

// Prepara la tabla de solicitudes (si hay base configurada) antes de aceptar tráfico
await initDatabase().catch((error) => {
  console.error('[db] No se pudo inicializar la base de datos:', error.message)
})

// 0.0.0.0 explícito: Render solo detecta el servicio si escucha en todas las
// interfaces, y el puerto lo impone la plataforma con PORT.
const server = app.listen(env.port, '0.0.0.0', () => {
  console.log(`API de ColdevIA escuchando en http://0.0.0.0:${env.port} (${env.nodeEnv})`)
})

// Cierre ordenado (Render y otros hosts envían SIGTERM al redeployar).
const shutdown = (signal) => {
  console.log(`${signal} recibido, cerrando servidor...`)
  server.close(() => process.exit(0))
}

process.on('SIGTERM', () => shutdown('SIGTERM'))
process.on('SIGINT', () => shutdown('SIGINT'))
