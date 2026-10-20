import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import Reveal from '../../components/ui/Reveal'
import SectionHeading from '../../components/ui/SectionHeading'
import { SERVICES } from '../../data/services'
import { useT } from '../../i18n/language-context'
import './ServicesPreview.css'

export default function ServicesPreview() {
  const t = useT()

  return (
    <section className="section section--dark services" aria-labelledby="services-title">
      <div className="services__glow" aria-hidden="true" />
      <div className="container">
        <Reveal className="services__head">
          <SectionHeading
            id="services-title"
            eyebrow={t('services.eyebrow')}
            title={t('services.title')}
            reveal="blur"
          />
          <div className="services__head-side" data-reveal="blur" style={{ '--i': 2 }}>
            <p>{t('services.lead')}</p>
            <Link to="/servicios" className="text-link">
              {t('services.allLink')}
              <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </Reveal>

        <Reveal as="ul" className="services__grid" threshold={0.08}>
          {SERVICES.map(({ id, icon: Icon }, index) => {
            const title = t(`services.items.${id}.title`)
            const tags = t(`services.items.${id}.tags`)

            return (
              <li key={id} className="service-card" data-reveal="blur" style={{ '--i': index }}>
                <div className="service-card__top">
                  <span className="service-card__icon">
                    <Icon aria-hidden="true" />
                  </span>
                  <span className="service-card__index">{String(index + 1).padStart(2, '0')}</span>
                </div>
                <h3>{title}</h3>
                <p>{t(`services.items.${id}.description`)}</p>
                <ul className="service-card__tags" aria-label={t('services.includesAria', { title })}>
                  {tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
                <Link to="/servicios" className="service-card__link" aria-label={t('services.moreAria', { title })}>
                  <ArrowUpRight aria-hidden="true" />
                </Link>
              </li>
            )
          })}
        </Reveal>
      </div>
    </section>
  )
}
