import { useCountUp } from '../../hooks/useCountUp'
import { useRevealOnScroll } from '../../hooks/useRevealOnScroll'
import './Stats.css'

const STATS = [
  { value: 20, label: 'Proyectos', detail: 'entregados y funcionando en producción' },
  { value: 30, label: 'Clientes', detail: 'en Colombia, Argentina y Estados Unidos' },
  { value: 10, label: 'Años de experiencia', detail: 'construyendo software para empresas' },
]

function StatItem({ value, label, detail, start, index }) {
  const current = useCountUp(value, { start, duration: 1600 + index * 250 })

  return (
    <li className="stat" data-reveal="up" style={{ '--i': index + 1 }}>
      <p className="stat__number" aria-label={`${value}+ ${label}`}>
        <span aria-hidden="true">{current}</span>
        <span className="stat__plus" aria-hidden="true">
          +
        </span>
      </p>
      <p className="stat__label">{label}</p>
      <p className="stat__detail">{detail}</p>
    </li>
  )
}

export default function Stats() {
  const [ref, isVisible] = useRevealOnScroll({ threshold: 0.35 })

  return (
    <section className="stats" aria-label="Logros de ColdevIA">
      <div className="container">
        <div ref={ref} className={`stats__card ${isVisible ? 'is-visible' : ''}`} data-reveal="scale">
          <div className="stats__intro" data-reveal="up">
            <span className="eyebrow">Trayectoria</span>
            <p>Resultados que respaldan cada proyecto que aceptamos.</p>
          </div>
          <ul className="stats__list">
            {STATS.map((stat, index) => (
              <StatItem key={stat.label} {...stat} index={index} start={isVisible} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
