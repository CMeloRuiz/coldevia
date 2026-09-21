import Reveal from '../../components/ui/Reveal'
import SectionHeading from '../../components/ui/SectionHeading'
import './Steps.css'

const STEPS = [
  {
    title: 'Conversación inicial',
    text: 'Nos cuentas tu idea, tus objetivos y el contexto de tu negocio. Sin costo ni compromiso.',
  },
  {
    title: 'Propuesta y plan',
    text: 'Te enviamos alcance, tiempos y presupuesto claros, divididos por etapas.',
  },
  {
    title: 'Diseño y desarrollo',
    text: 'Construimos en ciclos cortos y validas los avances en cada entrega.',
  },
  {
    title: 'Pruebas y lanzamiento',
    text: 'Revisamos rendimiento, seguridad y usabilidad antes de publicar.',
  },
  {
    title: 'Acompañamiento',
    text: 'Medimos resultados, damos soporte y seguimos mejorando contigo.',
  },
]

export default function Steps() {
  return (
    <section className="section section--dark steps" aria-labelledby="steps-title">
      <div className="container">
        <Reveal className="steps__head">
          <SectionHeading
            id="steps-title"
            eyebrow="Cómo trabajamos"
            title="Cinco pasos, del primer contacto a la entrega"
            lead="Un proceso simple y transparente: siempre sabes qué sigue, cuánto cuesta y cuándo estará listo."
            reveal="right"
          />
        </Reveal>

        <Reveal as="ol" className="steps__list" threshold={0.25}>
          {STEPS.map((step, index) => (
            <li key={step.title} className="step">
              <span className="step__number" data-reveal="pop" style={{ '--i': index * 2 }}>
                {index + 1}
              </span>
              <div className="step__body" data-reveal="up" style={{ '--i': index * 2 + 1 }}>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
