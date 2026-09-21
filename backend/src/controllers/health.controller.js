import { env } from '../config/env.js'

// GET /api/health — verificación simple para monitoreo y despliegues.
export const getHealth = (req, res) => {
  res.json({
    status: 'ok',
    service: 'coldevia-api',
    environment: env.nodeEnv,
    uptime: Math.round(process.uptime()),
    timestamp: new Date().toISOString(),
  })
}
