import { ArrowRight, Check, Gauge, Handshake, LifeBuoy, Puzzle, CalendarCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import Reveal from '../../components/ui/Reveal'
import SectionHeading from '../../components/ui/SectionHeading'
import { useT } from '../../i18n/language-context'
import './WhyUs.css'

// Los textos están en why.reasons.<id> y why.featured de los diccionarios
const REASONS = [
  { id: 'custom', icon: Puzzle },
  { id: 'stages', icon: CalendarCheck },
  { id: 'performance', icon: Gauge },
  { id: 'support', icon: LifeBuoy },
]

export default function WhyUs() {
  const t = useT()
  const points = t('why.featured.points')

  return (
    <section className="section why" aria-labelledby="why-title">
      <div className="container why__grid">
        <Reveal className="why__intro">
          <SectionHeading
            id="why-title"
            eyebrow={t('why.eyebrow')}
            title={t('why.title')}
            lead={t('why.lead')}
            reveal="left"
          />
          <Link to="/acerca-de" className="text-link why__link" data-reveal="left" style={{ '--i': 3 }}>
            {t('why.teamLink')}
            <ArrowRight aria-hidden="true" />
          </Link>
        </Reveal>

        <div className="why__content">
          <Reveal as="article" className="why-featured" variant="right">
            <span className="why-featured__icon">
              <Handshake aria-hidden="true" />
            </span>
            <div>
              <h3>{t('why.featured.title')}</h3>
              <p>{t('why.featured.text')}</p>
              <ul>
                {points.map((point) => (
                  <li key={point}>
                    <Check aria-hidden="true" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal as="ul" className="why-list">
            {REASONS.map(({ id, icon: Icon }, index) => (
              <li key={id} className="why-item" data-reveal="up" style={{ '--i': index }}>
                <span className="why-item__icon">
                  <Icon aria-hidden="true" />
                </span>
                <h3>{t(`why.reasons.${id}.title`)}</h3>
                <p>{t(`why.reasons.${id}.text`)}</p>
              </li>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
