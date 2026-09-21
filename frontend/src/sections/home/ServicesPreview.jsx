import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import Reveal from '../../components/ui/Reveal'
import SectionHeading from '../../components/ui/SectionHeading'
import { SERVICES } from '../../data/services'
import './ServicesPreview.css'

export default function ServicesPreview() {
  return (
    <section className="section section--dark services" aria-labelledby="services-title">
      <div className="services__glow" aria-hidden="true" />
      <div className="container">
        <Reveal className="services__head">
          <SectionHeading
            id="services-title"
            eyebrow="Servicios"
            title="Todo lo que tu negocio necesita para operar en digital"
            reveal="blur"
          />
          <div className="services__head-side" data-reveal="blur" style={{ '--i': 2 }}>
            <p>
              Desde tu primer sitio web hasta agentes de IA que atienden a tus clientes: un mismo equipo para cada
              etapa de tu crecimiento.
            </p>
            <Link to="/servicios" className="text-link">
              Ver todos los servicios
              <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </Reveal>

        <Reveal as="ul" className="services__grid" threshold={0.08}>
          {SERVICES.map(({ icon: Icon, title, description, tags }, index) => (
            <li key={title} className="service-card" data-reveal="blur" style={{ '--i': index }}>
              <div className="service-card__top">
                <span className="service-card__icon">
                  <Icon aria-hidden="true" />
                </span>
                <span className="service-card__index">{String(index + 1).padStart(2, '0')}</span>
              </div>
              <h3>{title}</h3>
              <p>{description}</p>
              <ul className="service-card__tags" aria-label={`Incluye en ${title}`}>
                {tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
              <Link to="/servicios" className="service-card__link" aria-label={`Más sobre ${title}`}>
                <ArrowUpRight aria-hidden="true" />
              </Link>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
