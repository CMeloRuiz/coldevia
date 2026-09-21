import './Marquee.css'

/**
 * Carrusel infinito hecho solo con CSS (@keyframes).
 *
 * El set de elementos se repite `copies` veces (siempre un número par) y la pista
 * se desplaza exactamente el 50 % de su ancho: al reiniciar, la segunda mitad
 * ocupa la posición de la primera y el salto es invisible.
 *
 * No tiene flechas, puntos ni arrastre, y no se detiene al pasar el mouse.
 */
export default function Marquee({
  children,
  direction = 'left',
  duration = 40,
  gap = 20,
  copies = 4,
  label,
  className = '',
}) {
  return (
    <div
      className={`marquee marquee--${direction} ${className}`.trim()}
      style={{ '--marquee-duration': `${duration}s`, '--marquee-gap': `${gap}px` }}
      aria-label={label}
      role={label ? 'region' : undefined}
    >
      <div className="marquee__track">
        {Array.from({ length: copies }, (_, copy) => (
          <ul className="marquee__set" key={copy} aria-hidden={copy > 0 || undefined}>
            {children}
          </ul>
        ))}
      </div>
    </div>
  )
}
