import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { scrollToSection } from '../../hooks/useSectionNavigation'

/**
 * Al cambiar de ruta:
 * - si la URL trae un hash (ej. "/#precios"), hace scroll suave a esa sección;
 * - si no, vuelve al inicio de la página sin animación.
 */
export default function ScrollManager() {
  const { pathname, hash, key } = useLocation()

  useEffect(() => {
    if (hash) {
      // Espera un instante a que la página nueva termine de pintarse.
      const timer = window.setTimeout(() => scrollToSection(hash.slice(1)), 80)
      return () => window.clearTimeout(timer)
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    return undefined
  }, [pathname, hash, key])

  return null
}
