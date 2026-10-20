import { useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { scrollToSection } from './useSectionNavigation'

/**
 * ÚNICO destino del contacto en todo el sitio.
 *
 * Mientras no exista la página /contacto, los botones de contacto (el del
 * header y el principal del hero) llevan al formulario del final del Home
 * (sección con id="contacto"). El desplazamiento respeta el header fijo
 * gracias a `scroll-margin-top` en `.section` (ver index.css).
 *
 * PARA CAMBIARLO A LA PÁGINA DEDICADA: reemplaza esta constante por
 *   export const CONTACT_TARGET = { type: 'route', to: '/contacto' }
 * y listo: los dos botones ya contemplan las dos variantes y no hay que
 * tocarlos. Este es el único lugar donde se define el destino.
 */
export const CONTACT_TARGET = { type: 'section', id: 'contacto' }

/** Enlace que se pinta en el botón cuando el destino es una sección del Home. */
export const CONTACT_HREF =
  CONTACT_TARGET.type === 'section' ? `/#${CONTACT_TARGET.id}` : CONTACT_TARGET.to

/** Primer campo del formulario: es a donde va el foco al llegar. */
const FIRST_FIELD_ID = 'name'

/**
 * Lleva el foco al primer campo cuando el formulario ya está en el DOM.
 * `preventScroll` evita el salto brusco: el navegador no vuelve a mover la
 * página, que ya quedó donde la dejó el scroll suave.
 */
function focusFirstField(attempt = 0) {
  const field = document.getElementById(FIRST_FIELD_ID)
  if (field) {
    field.focus({ preventScroll: true })
    return
  }
  // Al venir de otra ruta, el Home puede tardar un par de cuadros en montarse.
  if (attempt < 20) window.setTimeout(() => focusFirstField(attempt + 1), 100)
}

/** Espera a que termine el scroll suave antes de enfocar. */
function focusWhenScrollEnds() {
  if ('onscrollend' in window) {
    const onEnd = () => {
      window.clearTimeout(fallback)
      focusFirstField()
    }
    window.addEventListener('scrollend', onEnd, { once: true })
    // Si el scroll no llega a moverse (ya estábamos en el formulario), no hay
    // evento "scrollend": el temporizador lo resuelve igual.
    const fallback = window.setTimeout(() => {
      window.removeEventListener('scrollend', onEnd)
      focusFirstField()
    }, 1200)
    return
  }
  window.setTimeout(focusFirstField, 700)
}

/**
 * Devuelve la función que usan TODOS los botones de contacto del sitio.
 * Si ya estamos en el Home hace scroll suave; si no, navega a "/#contacto" y
 * el ScrollManager hace el scroll al montarse el Home. En ambos casos, al
 * llegar, el foco queda en el primer campo del formulario.
 */
export function useContactNavigation() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  return useCallback(() => {
    if (CONTACT_TARGET.type === 'route') {
      navigate(CONTACT_TARGET.to)
      return
    }

    if (pathname === '/') {
      scrollToSection(CONTACT_TARGET.id)
    } else {
      navigate(`/#${CONTACT_TARGET.id}`)
    }
    focusWhenScrollEnds()
  }, [navigate, pathname])
}
