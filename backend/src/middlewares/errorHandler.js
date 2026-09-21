import { isProduction } from '../config/env.js'

// Manejador central de errores. Express 5 también captura errores de funciones async.
// eslint-disable-next-line no-unused-vars
export const errorHandler = (err, req, res, next) => {
  const status = err.status ?? err.statusCode ?? 500

  if (status >= 500) console.error(err)

  res.status(status).json({
    error: status >= 500 && isProduction ? 'Error interno del servidor' : err.message,
  })
}
