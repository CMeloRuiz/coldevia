import Marquee from '../../components/ui/Marquee'
import Reveal from '../../components/ui/Reveal'
import SectionHeading from '../../components/ui/SectionHeading'
import { BACKEND_TECH, FRONTEND_TECH } from '../../data/technologies'
import './TechCarousel.css'

const TechChip = ({ name, logo }) => (
  <li className="tech-chip">
    <img src={logo} alt="" width="32" height="32" loading="lazy" />
    <span>{name}</span>
  </li>
)

export default function TechCarousel() {
  return (
    <section className="section tech" aria-labelledby="tech-title">
      <Reveal className="container tech__head">
        <SectionHeading
          id="tech-title"
          eyebrow="Tecnologías"
          title="Herramientas probadas, elegidas para cada proyecto"
          reveal="fade"
        />
        <p className="tech__note" data-reveal="fade" style={{ '--i': 2 }}>
          Trabajamos con tecnologías modernas y con comunidad activa, para que tu producto sea fácil de mantener y de
          escalar en el tiempo.
        </p>
      </Reveal>

      <div className="tech__rows">
        <Reveal className="tech__row" variant="left">
          {/* Frontend: se desplaza de derecha a izquierda */}
          <Marquee direction="left" duration={45} gap={16} label="Tecnologías frontend">
            {FRONTEND_TECH.map((tech) => (
              <TechChip key={tech.name} {...tech} />
            ))}
          </Marquee>
        </Reveal>

        <Reveal className="tech__row" variant="right" delay={150}>
          {/* Backend: se desplaza de izquierda a derecha */}
          <Marquee direction="right" duration={45} gap={16} label="Tecnologías backend">
            {BACKEND_TECH.map((tech) => (
              <TechChip key={tech.name} {...tech} />
            ))}
          </Marquee>
        </Reveal>
      </div>
    </section>
  )
}
