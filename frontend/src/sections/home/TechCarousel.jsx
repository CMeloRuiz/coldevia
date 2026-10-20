import Marquee from '../../components/ui/Marquee'
import Reveal from '../../components/ui/Reveal'
import SectionHeading from '../../components/ui/SectionHeading'
import { BACKEND_TECH, FRONTEND_TECH } from '../../data/technologies'
import { useT } from '../../i18n/language-context'
import './TechCarousel.css'

const TechChip = ({ name, logo }) => (
  <li className="tech-chip">
    <img src={logo} alt="" width="32" height="32" loading="lazy" />
    <span>{name}</span>
  </li>
)

export default function TechCarousel() {
  const t = useT()

  return (
    <section className="section tech" aria-labelledby="tech-title">
      <Reveal className="container tech__head">
        <SectionHeading id="tech-title" eyebrow={t('tech.eyebrow')} title={t('tech.title')} reveal="fade" />
        <p className="tech__note" data-reveal="fade" style={{ '--i': 2 }}>
          {t('tech.note')}
        </p>
      </Reveal>

      <div className="tech__rows">
        <Reveal className="tech__row" variant="left">
          {/* Frontend: se desplaza de derecha a izquierda */}
          <Marquee direction="left" duration={45} gap={16} label={t('tech.frontendAria')}>
            {FRONTEND_TECH.map((tech) => (
              <TechChip key={tech.name} {...tech} />
            ))}
          </Marquee>
        </Reveal>

        <Reveal className="tech__row" variant="right" delay={150}>
          {/* Backend: se desplaza de izquierda a derecha */}
          <Marquee direction="right" duration={45} gap={16} label={t('tech.backendAria')}>
            {BACKEND_TECH.map((tech) => (
              <TechChip key={tech.name} {...tech} />
            ))}
          </Marquee>
        </Reveal>
      </div>
    </section>
  )
}
