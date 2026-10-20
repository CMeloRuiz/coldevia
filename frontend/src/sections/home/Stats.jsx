import { useCountUp } from '../../hooks/useCountUp'
import { useRevealOnScroll } from '../../hooks/useRevealOnScroll'
import { useT } from '../../i18n/language-context'
import './Stats.css'

// Solo los números viven aquí; las etiquetas están en stats.items.<id>
const STATS = [
  { id: 'projects', value: 20 },
  { id: 'clients', value: 30 },
  { id: 'years', value: 10 },
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
  const t = useT()

  return (
    <section className="stats" aria-label={t('stats.sectionAria')}>
      <div className="container">
        <div ref={ref} className={`stats__card ${isVisible ? 'is-visible' : ''}`} data-reveal="scale">
          <div className="stats__intro" data-reveal="up">
            <span className="eyebrow">{t('stats.eyebrow')}</span>
            <p>{t('stats.intro')}</p>
          </div>
          <ul className="stats__list">
            {STATS.map((stat, index) => (
              <StatItem
                key={stat.id}
                value={stat.value}
                label={t(`stats.items.${stat.id}.label`)}
                detail={t(`stats.items.${stat.id}.detail`)}
                index={index}
                start={isVisible}
              />
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
