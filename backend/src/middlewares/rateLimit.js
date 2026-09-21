/**
 * Límite de envíos por IP, en memoria.
 *
 * Alcanza para frenar envíos repetidos del formulario. Si en el futuro la API
 * corre en varias instancias, conviene moverlo a Redis o al proveedor de hosting.
 */
export function rateLimit({ windowMs = 10 * 60 * 1000, max = 5 } = {}) {
  const hits = new Map()

  return (req, res, next) => {
    const key = req.ip ?? 'desconocida'
    const now = Date.now()
    const entry = hits.get(key)

    if (!entry || now > entry.resetAt) {
      hits.set(key, { count: 1, resetAt: now + windowMs })
    } else if (entry.count >= max) {
      const retryAfter = Math.ceil((entry.resetAt - now) / 1000)
      res.set('Retry-After', String(retryAfter))
      return res.status(429).json({ error: 'Demasiados envíos seguidos. Intenta de nuevo en unos minutos.' })
    } else {
      entry.count += 1
    }

    // Limpieza de entradas vencidas para que el Map no crezca sin control
    if (hits.size > 500) {
      for (const [ip, value] of hits) if (now > value.resetAt) hits.delete(ip)
    }

    return next()
  }
}
