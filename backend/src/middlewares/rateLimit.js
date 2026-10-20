import rateLimit from 'express-rate-limit'
import { env } from '../config/env.js'

/**
 * Límite de envíos del formulario por IP (5 por hora, configurable).
 *
 * express-rate-limit guarda las marcas en memoria: alcanza para una sola
 * instancia como la de Render. Si algún día la API corre en varias, hay que
 * pasarle un store compartido (Redis).
 */
export const contactRateLimit = rateLimit({
  windowMs: env.contactRate.windowMs,
  limit: env.contactRate.max,
  standardHeaders: 'draft-7', // RateLimit y RateLimit-Policy
  legacyHeaders: false,
  message: {
    error: 'Demasiados envíos seguidos. Intenta de nuevo más tarde.',
    code: 'rate',
  },
})
