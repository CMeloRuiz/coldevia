import { useEffect } from 'react'

const FONT_WAIT_CEILING = 900 // ms: techo de espera por las fuentes
const SAFETY_CLEANUP = 2600 // ms: por si el transitionend del último elemento no llega

let started = false

/**
 * Secuencia de entrada al cargar la página (una sola vez por carga).
 *
 * 1. index.html agrega `html.intro` antes del primer pintado → el primer plano
 *    queda en su estado inicial (oculto / desplazado).
 * 2. Cuando las fuentes están listas (o pasan 900 ms), se agrega `intro-play`:
 *    cada elemento con `data-intro` transiciona con su propio `--intro-delay`.
 * 3. Cuando termina el último elemento (`data-intro-last`), se quitan ambas
 *    clases y el diseño queda estático, sin estilos de animación colgando.
 */
export function useIntroSequence() {
  useEffect(() => {
    const root = document.documentElement
    if (started || !root.classList.contains('intro')) return
    started = true

    let finished = false
    const finish = () => {
      if (finished) return
      finished = true
      root.classList.remove('intro', 'intro-play')
    }

    const play = () => {
      // Doble rAF: garantiza que el estado inicial se pintó antes de transicionar.
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          root.classList.add('intro-play')

          const last = document.querySelector('[data-intro-last]')
          if (last) {
            const onEnd = (event) => {
              if (event.target !== last || event.propertyName !== 'opacity') return
              last.removeEventListener('transitionend', onEnd)
              finish()
            }
            last.addEventListener('transitionend', onEnd)
          }
          window.setTimeout(finish, SAFETY_CLEANUP)
        })
      })
    }

    const fontsReady = document.fonts?.ready ?? Promise.resolve()
    const ceiling = new Promise((resolve) => window.setTimeout(resolve, FONT_WAIT_CEILING))
    Promise.race([fontsReady, ceiling]).then(play)
  }, [])
}
