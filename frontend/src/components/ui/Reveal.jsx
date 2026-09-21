import { useRevealOnScroll } from '../../hooks/useRevealOnScroll'

/**
 * Envuelve contenido que aparece al hacer scroll.
 *
 * - Con `variant` ("up", "left", "right", "scale", "blur", "fade", "clip", "pop")
 *   el propio elemento se anima.
 * - Sin `variant` funciona como grupo: cuando entra en pantalla revela a todos
 *   los hijos que tengan `data-reveal`, escalonados con la variable CSS `--i`.
 */
export default function Reveal({
  as: Tag = 'div',
  variant,
  delay,
  threshold,
  rootMargin,
  className = '',
  style,
  children,
  ...rest
}) {
  const [ref, isVisible] = useRevealOnScroll({ threshold, rootMargin })
  const classes = [className, isVisible && 'is-visible'].filter(Boolean).join(' ')
  const mergedStyle = delay ? { ...style, '--d': `${delay}ms` } : style

  return (
    <Tag ref={ref} className={classes || undefined} data-reveal={variant} style={mergedStyle} {...rest}>
      {children}
    </Tag>
  )
}
