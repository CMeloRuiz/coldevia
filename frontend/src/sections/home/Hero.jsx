import { Link } from 'react-router-dom'
import HeroSphere from './HeroSphere'
import './Hero.css'

// Flecha fina de los CTA (trazo de 1.35 px, escala con el tamaño de fuente)
const Arrow = () => (
  <svg className="hero__arw" viewBox="0 0 12 10" fill="none" aria-hidden="true">
    <path
      d="M0.8 5h10M7.1 1.4 10.9 5l-3.8 3.6"
      stroke="currentColor"
      strokeWidth="1.35"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

// Cada renglón del título es un bloque propio (no <br>): la entrada enmascara renglón por renglón.
const Line = ({ delay, children }) => (
  <span className="ln">
    <span className="ln-i" data-intro="line" style={{ '--intro-delay': delay }}>
      {children}
    </span>
  </span>
)

export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__backdrop" aria-hidden="true" />

      <div className="container hero__inner">
        <div className="hero__content">
          <h1 id="hero-title" className="hero__title">
            <Line delay="0.12s">Software a la medida</Line>
            <Line delay="0.22s">
              que hace <span className="hero__accent">crecer</span>
            </Line>
            <Line delay="0.32s">tu negocio</Line>
          </h1>

          <p className="hero__lead" data-intro="blur" style={{ '--intro-delay': '0.58s' }}>
            Sitios web, e-commerce, plataformas SaaS, automatizaciones y agentes de IA para que vendas más y operes
            mejor.
          </p>

          <div className="hero__ctas">
            <Link
              to="/contacto"
              className="btn btn--primary hero__cta"
              data-intro="settle"
              style={{ '--intro-delay': '0.9s' }}
            >
              Agenda una asesoría
              <Arrow />
            </Link>
            <Link
              to="/servicios"
              className="hero__link"
              data-intro="settle"
              data-intro-last
              style={{ '--intro-delay': '0.97s' }}
            >
              Ver servicios
              <Arrow />
            </Link>
          </div>
        </div>

        {/* Esfera de puntos conectados: gira sola y reacciona al mouse */}
        <div className="hero__visual" data-intro="lift" style={{ '--intro-delay': '0.5s', '--intro-dur': '1.1s' }}>
          <HeroSphere />
        </div>
      </div>
    </section>
  )
}
