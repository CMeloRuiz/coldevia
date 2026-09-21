import { useEffect, useRef, useState } from 'react'

const supportsObserver = () =>
  typeof window !== 'undefined' && 'IntersectionObserver' in window

/**
 * Observa un elemento y devuelve `isVisible = true` cuando entra en el viewport.
 *
 * El umbral por defecto es 0 (basta con que asome un píxel) y el retardo se
 * controla con rootMargin. Con un umbral por proporción, un elemento más ancho
 * o más alto que la pantalla nunca llega a cumplirlo y se queda invisible: es
 * lo que pasaba con los carruseles de tecnologías en móvil.
 *
 * @param {object}  options
 * @param {number}  options.threshold  Porción visible necesaria (0 a 1).
 * @param {string}  options.rootMargin Margen del viewport; el valor por defecto
 *                                     dispara la animación un poco antes del borde inferior.
 * @param {boolean} options.once       Si es true, deja de observar tras la primera aparición.
 * @returns {[React.RefObject, boolean]}
 */
export function useRevealOnScroll({
  threshold = 0,
  rootMargin = '0px 0px -12% 0px',
  once = true,
} = {}) {
  const ref = useRef(null)
  // Sin IntersectionObserver (navegadores muy viejos) el contenido se muestra directamente.
  const [isVisible, setIsVisible] = useState(() => !supportsObserver())

  useEffect(() => {
    const node = ref.current
    if (!node || !supportsObserver()) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (once) observer.disconnect()
        } else if (!once) {
          setIsVisible(false)
        }
      },
      { threshold, rootMargin },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [threshold, rootMargin, once])

  return [ref, isVisible]
}
