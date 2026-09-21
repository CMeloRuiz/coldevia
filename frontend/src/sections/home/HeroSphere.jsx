import { useEffect, useRef } from 'react'
import './HeroSphere.css'

/* ============================================================================
   Esfera de puntos conectados — canvas 2D, sin librerías.

   · Los puntos se reparten de forma pareja con una espiral de Fibonacci.
   · Las uniones se calculan una sola vez: cada punto se enlaza con los vecinos
     cercanos y, además, con sus 6 más próximos, así ninguno queda suelto.
   · Gira sola, muy lento. Al pasar el mouse, la esfera se inclina hacia el
     cursor y los puntos cercanos se encienden y se apartan un poco.
   · Se detiene cuando sale de pantalla o la pestaña queda oculta.
   ========================================================================== */

const LINK_DISTANCE = 0.24 // distancia máxima (en la esfera unitaria) para unir dos puntos
const NEAREST = 6 // vecinos más cercanos que cada punto enlaza siempre
const JITTER = 0.26 // desorden de la distribución, en fracción de la separación entre puntos
const FOV = 2.1 // profundidad de la perspectiva

/* La perspectiva agranda la silueta: un punto de la esfera unitaria a
   profundidad h se proyecta a sqrt(1-h²)·FOV/(FOV-h), que alcanza su máximo en
   h = 1/FOV. Con FOV = 2.1 ese máximo es 1.137·radio, así que el radio no puede
   valer la mitad del lienzo o la esfera se corta por los cuatro lados.
   Se suma margen para el tamaño del punto y para el empujón del cursor. */
const PERSPECTIVE_SPREAD = Math.sqrt(1 - 1 / (FOV * FOV)) / (1 - 1 / (FOV * FOV)) // = FOV/sqrt(FOV²-1)
const EDGE_MARGIN = 1.13 // 13 % extra: brillo del punto + desplazamiento al pasar el mouse
const TILT_BASE = -0.3 // inclinación en reposo

function fibonacciSphere(count) {
  const points = new Float32Array(count * 3)
  const golden = Math.PI * (3 - Math.sqrt(5))
  // La separación media entre puntos sirve de escala para el desorden
  const spacing = (2 / Math.sqrt(count)) * JITTER
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2
    const ring = Math.sqrt(Math.max(0, 1 - y * y))
    const theta = golden * i
    // Un poco de desorden rompe las espirales perfectas: queda constelación, no malla
    let x = Math.cos(theta) * ring + (Math.random() - 0.5) * spacing
    let py = y + (Math.random() - 0.5) * spacing
    let z = Math.sin(theta) * ring + (Math.random() - 0.5) * spacing
    const norm = Math.hypot(x, py, z) || 1
    points[i * 3] = x / norm
    points[i * 3 + 1] = py / norm
    points[i * 3 + 2] = z / norm
  }
  return points
}

/**
 * Une los puntos con dos criterios que se complementan:
 *   1. todos los pares que están a menos de `maxDistance`, y
 *   2. los `nearest` vecinos más cercanos de cada punto.
 * El segundo criterio garantiza que ningún punto quede suelto y que la malla
 * se vea pareja, incluso donde el desorden dejó huecos.
 */
function buildLinks(points, count, maxDistance, nearest) {
  const from = []
  const to = []
  const seen = new Set()
  const max2 = maxDistance * maxDistance

  const addPair = (a, b) => {
    const i = Math.min(a, b)
    const j = Math.max(a, b)
    const key = i * count + j
    if (seen.has(key)) return
    seen.add(key)
    from.push(i)
    to.push(j)
  }

  const bestDist = new Float32Array(nearest)
  const bestIndex = new Int32Array(nearest)

  for (let i = 0; i < count; i++) {
    bestDist.fill(Infinity)
    bestIndex.fill(-1)

    for (let j = 0; j < count; j++) {
      if (i === j) continue
      const dx = points[i * 3] - points[j * 3]
      const dy = points[i * 3 + 1] - points[j * 3 + 1]
      const dz = points[i * 3 + 2] - points[j * 3 + 2]
      const d2 = dx * dx + dy * dy + dz * dz

      if (j > i && d2 < max2) addPair(i, j)

      // Inserción ordenada en la lista de los más cercanos
      if (d2 < bestDist[nearest - 1]) {
        let slot = nearest - 1
        while (slot > 0 && d2 < bestDist[slot - 1]) {
          bestDist[slot] = bestDist[slot - 1]
          bestIndex[slot] = bestIndex[slot - 1]
          slot--
        }
        bestDist[slot] = d2
        bestIndex[slot] = j
      }
    }

    for (let k = 0; k < nearest; k++) {
      if (bestIndex[k] >= 0) addPair(i, bestIndex[k])
    }
  }

  return { from: Int32Array.from(from), to: Int32Array.from(to), length: from.length }
}

// Punto de luz pre-renderizado: dibujarlo es mucho más barato que un gradiente por cuadro
function createDotSprite() {
  const size = 64
  const sprite = document.createElement('canvas')
  sprite.width = size
  sprite.height = size
  const ctx = sprite.getContext('2d')
  const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
  gradient.addColorStop(0, 'rgba(255, 255, 255, 1)')
  gradient.addColorStop(0.22, 'rgba(244, 246, 251, 0.92)')
  gradient.addColorStop(0.45, 'rgba(175, 192, 242, 0.3)')
  gradient.addColorStop(1, 'rgba(122, 145, 227, 0)')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, size, size)
  return sprite
}

const LINK_BUCKETS = [0.1, 0.15, 0.21, 0.28, 0.37, 0.48]

export default function HeroSphere() {
  const hostRef = useRef(null)
  const canvasRef = useRef(null)

  useEffect(() => {
    const host = hostRef.current
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sprite = createDotSprite()

    let width = 0
    let height = 0
    let radius = 0
    let centerX = 0
    let centerY = 0

    let count = 0
    let points = null
    let links = null
    let phases = null
    let projX = null
    let projY = null
    let projDepth = null
    let projGlow = null

    const state = {
      spin: 0,
      tiltX: TILT_BASE,
      tiltY: 0,
      targetX: TILT_BASE,
      targetY: 0,
      pointerX: -9999,
      pointerY: -9999,
    }

    const buildModel = () => {
      const next = window.innerWidth < 760 ? 250 : 400
      if (next === count) return
      count = next
      points = fibonacciSphere(count)
      links = buildLinks(points, count, LINK_DISTANCE, NEAREST)
      phases = new Float32Array(count)
      for (let i = 0; i < count; i++) phases[i] = Math.random() * Math.PI * 2
      projX = new Float32Array(count)
      projY = new Float32Array(count)
      projDepth = new Float32Array(count)
      projGlow = new Float32Array(count)
    }

    const resize = () => {
      const rect = host.getBoundingClientRect()
      const dpr = Math.min(2, window.devicePixelRatio || 1)
      width = rect.width
      height = rect.height
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      centerX = width / 2
      centerY = height / 2
      radius = Math.min(width, height) / 2 / (PERSPECTIVE_SPREAD * EDGE_MARGIN)
      buildModel()
    }

    const draw = (now) => {
      ctx.clearRect(0, 0, width, height)
      if (!count || radius <= 0) return

      const rotY = state.spin + state.tiltY
      const rotX = state.tiltX
      const sinY = Math.sin(rotY)
      const cosY = Math.cos(rotY)
      const sinX = Math.sin(rotX)
      const cosX = Math.cos(rotX)
      const influence = radius * 0.55
      const twinkle = reduceMotion.matches ? 0 : 1

      for (let i = 0; i < count; i++) {
        const px = points[i * 3]
        const py = points[i * 3 + 1]
        const pz = points[i * 3 + 2]

        // Giro sobre Y y después inclinación sobre X
        const x = px * cosY + pz * sinY
        const zy = pz * cosY - px * sinY
        const y = py * cosX - zy * sinX
        const z = py * sinX + zy * cosX

        const perspective = FOV / (FOV - z)
        let screenX = centerX + x * radius * perspective
        let screenY = centerY + y * radius * perspective

        // Reacción al cursor: los puntos cercanos se encienden y se apartan
        let glow = 0
        const dx = screenX - state.pointerX
        const dy = screenY - state.pointerY
        const distance = Math.hypot(dx, dy)
        if (distance < influence) {
          const strength = 1 - distance / influence
          glow = strength * strength * (0.6 + 0.4 * strength)
          const push = glow * radius * 0.09
          if (distance > 0.001) {
            screenX += (dx / distance) * push
            screenY += (dy / distance) * push
          }
        }

        projX[i] = screenX
        projY[i] = screenY
        projDepth[i] = (z + 1) / 2 // 0 = atrás, 1 = adelante
        projGlow[i] = glow
      }

      // Halo suave bajo el cursor
      if (state.pointerX > -9000) {
        const halo = ctx.createRadialGradient(
          state.pointerX,
          state.pointerY,
          0,
          state.pointerX,
          state.pointerY,
          influence,
        )
        halo.addColorStop(0, 'rgba(122, 145, 227, 0.16)')
        halo.addColorStop(0.55, 'rgba(122, 145, 227, 0.05)')
        halo.addColorStop(1, 'rgba(122, 145, 227, 0)')
        ctx.globalAlpha = 1
        ctx.fillStyle = halo
        ctx.beginPath()
        ctx.arc(state.pointerX, state.pointerY, influence, 0, Math.PI * 2)
        ctx.fill()
      }

      // Uniones, agrupadas por opacidad para hacer pocos trazos por cuadro
      const buckets = LINK_BUCKETS.map(() => null)
      for (let k = 0; k < links.length; k++) {
        const a = links.from[k]
        const b = links.to[k]
        const depth = (projDepth[a] + projDepth[b]) / 2
        const glow = Math.max(projGlow[a], projGlow[b])
        const alpha = 0.1 + depth * depth * 0.34 + glow * 0.5
        let index = 0
        while (index < LINK_BUCKETS.length - 1 && alpha > LINK_BUCKETS[index]) index++
        if (!buckets[index]) buckets[index] = []
        buckets[index].push(projX[a], projY[a], projX[b], projY[b])
      }

      ctx.lineWidth = 1
      for (let index = 0; index < buckets.length; index++) {
        const segments = buckets[index]
        if (!segments) continue
        ctx.globalAlpha = 1
        ctx.strokeStyle = `rgba(175, 192, 242, ${LINK_BUCKETS[index]})`
        ctx.beginPath()
        for (let s = 0; s < segments.length; s += 4) {
          ctx.moveTo(segments[s], segments[s + 1])
          ctx.lineTo(segments[s + 2], segments[s + 3])
        }
        ctx.stroke()
      }

      // Los puntos van al final: quedan por encima de las uniones
      for (let i = 0; i < count; i++) {
        const depth = projDepth[i]
        const glow = projGlow[i]
        const pulse = 1 - twinkle * 0.18 * (0.5 + 0.5 * Math.sin(now * 0.0011 + phases[i]))
        const alpha = (0.2 + depth * 0.78) * pulse + glow * 0.7
        const size = (1.2 + depth * 2.4 + glow * 4.6) * 2

        ctx.globalAlpha = Math.min(1, alpha)
        ctx.drawImage(sprite, projX[i] - size, projY[i] - size, size * 2, size * 2)
      }

      // Aro del limbo: retoma el anillo abierto del logo
      ctx.globalAlpha = 1
      ctx.strokeStyle = 'rgba(122, 145, 227, 0.16)'
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius * 1.06, 0, Math.PI * 2)
      ctx.stroke()
      ctx.globalAlpha = 1
    }

    let frame = 0
    let last = performance.now()
    let visible = true

    const loop = (now) => {
      const delta = Math.min(50, now - last)
      last = now
      if (!reduceMotion.matches) state.spin += delta * 0.00011
      state.tiltX += (state.targetX - state.tiltX) * 0.06
      state.tiltY += (state.targetY - state.tiltY) * 0.06
      draw(now)
      frame = requestAnimationFrame(loop)
    }

    const start = () => {
      if (frame || !visible || document.hidden) return
      last = performance.now()
      frame = requestAnimationFrame(loop)
    }
    const stop = () => {
      cancelAnimationFrame(frame)
      frame = 0
    }

    const onPointerMove = (event) => {
      const rect = canvas.getBoundingClientRect()
      state.pointerX = event.clientX - rect.left
      state.pointerY = event.clientY - rect.top
      const nx = state.pointerX / rect.width - 0.5
      const ny = state.pointerY / rect.height - 0.5
      state.targetY = nx * 0.85
      state.targetX = TILT_BASE - ny * 0.5
    }

    const onPointerLeave = () => {
      state.pointerX = -9999
      state.pointerY = -9999
      state.targetY = 0
      state.targetX = TILT_BASE
    }

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) start()
      else stop()
    })
    const resizeObserver = new ResizeObserver(resize)
    const onVisibility = () => (document.hidden ? stop() : start())

    resize()
    observer.observe(host)
    resizeObserver.observe(host)
    document.addEventListener('visibilitychange', onVisibility)
    canvas.addEventListener('pointermove', onPointerMove)
    canvas.addEventListener('pointerleave', onPointerLeave)
    start()

    return () => {
      stop()
      observer.disconnect()
      resizeObserver.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
      canvas.removeEventListener('pointermove', onPointerMove)
      canvas.removeEventListener('pointerleave', onPointerLeave)
    }
  }, [])

  return (
    <div className="hero-sphere" ref={hostRef} aria-hidden="true">
      <canvas ref={canvasRef} className="hero-sphere__canvas" />
    </div>
  )
}
