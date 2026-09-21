import { useEffect, useState } from 'react'

const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3)

/**
 * Cuenta de 0 hasta `end` cuando `start` pasa a true.
 * Usa requestAnimationFrame, así que no bloquea el hilo principal.
 */
export function useCountUp(end, { duration = 1800, start = false } = {}) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!start) return undefined

    let frame
    const startedAt = performance.now()

    const tick = (now) => {
      const progress = Math.min((now - startedAt) / duration, 1)
      setValue(Math.round(easeOutCubic(progress) * end))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [end, duration, start])

  return value
}
