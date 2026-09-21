import { ArrowRight, Check, Gauge, Handshake, LifeBuoy, Puzzle, CalendarCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import Reveal from '../../components/ui/Reveal'
import SectionHeading from '../../components/ui/SectionHeading'
import './WhyUs.css'

const REASONS = [
  {
    icon: Puzzle,
    title: 'Tecnología a la medida',
    text: 'Nada de plantillas: elegimos el stack según tu caso, tu presupuesto y hacia dónde quieres crecer.',
  },
  {
    icon: CalendarCheck,
    title: 'Entregas por etapas',
    text: 'Trabajamos en ciclos cortos y ves avances reales cada semana. Siempre sabes en qué punto está tu proyecto.',
  },
  {
    icon: Gauge,
    title: 'Rendimiento y seguridad',
    text: 'Sitios rápidos, buenas prácticas de seguridad y SEO técnico desde la primera línea de código.',
  },
  {
    icon: LifeBuoy,
    title: 'Soporte después del lanzamiento',
    text: 'No desaparecemos al entregar: medimos, corregimos y mejoramos contigo mientras tu negocio crece.',
  },
]

const FEATURED_POINTS = ['Estrategia, diseño y desarrollo', 'Comunicación directa y sin rodeos', 'Un responsable para todo el proyecto']

export default function WhyUs() {
  return (
    <section className="section why" aria-labelledby="why-title">
      <div className="container why__grid">
        <Reveal className="why__intro">
          <SectionHeading
            id="why-title"
            eyebrow="¿Por qué elegirnos?"
            title="Un equipo que entiende tu negocio antes de escribir código"
            lead="La tecnología es el medio. Lo que construimos contigo es una herramienta que genere resultados medibles para tu empresa."
            reveal="left"
          />
          <Link to="/acerca-de" className="text-link why__link" data-reveal="left" style={{ '--i': 3 }}>
            Conoce al equipo
            <ArrowRight aria-hidden="true" />
          </Link>
        </Reveal>

        <div className="why__content">
          <Reveal as="article" className="why-featured" variant="right">
            <span className="why-featured__icon">
              <Handshake aria-hidden="true" />
            </span>
            <div>
              <h3>Acompañamiento de principio a fin</h3>
              <p>
                Un solo equipo se encarga de la estrategia, el diseño, el desarrollo y el soporte. Sin intermediarios
                ni tercerizaciones: hablas directamente con quienes construyen tu producto.
              </p>
              <ul>
                {FEATURED_POINTS.map((point) => (
                  <li key={point}>
                    <Check aria-hidden="true" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal as="ul" className="why-list">
            {REASONS.map(({ icon: Icon, title, text }, index) => (
              <li key={title} className="why-item" data-reveal="up" style={{ '--i': index }}>
                <span className="why-item__icon">
                  <Icon aria-hidden="true" />
                </span>
                <h3>{title}</h3>
                <p>{text}</p>
              </li>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
