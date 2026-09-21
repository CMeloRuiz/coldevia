import { useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export function scrollToSection(id) {
  const target = document.getElementById(id)
  if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

/**
 * Devuelve una función que lleva a una sección del Home.
 * Si ya estamos en "/", hace scroll suave; si no, navega a "/#id" y el
 * ScrollManager hace el scroll cuando el Home termina de montarse.
 */
export function useSectionNavigation() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  return useCallback(
    (id) => {
      if (pathname === '/') {
        scrollToSection(id)
      } else {
        navigate(`/#${id}`)
      }
    },
    [navigate, pathname],
  )
}
