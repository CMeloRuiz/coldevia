import Reveal from '../../components/ui/Reveal'
import SectionHeading from '../../components/ui/SectionHeading'
import { useT } from '../../i18n/language-context'
import './Steps.css'

export default function Steps() {
  const t = useT()
  const steps = t('steps.items') // array de { title, text }

  return (
    <section className="section section--dark steps" aria-labelledby="steps-title">
      <div className="container">
        <Reveal className="steps__head">
          <SectionHeading
            id="steps-title"
            eyebrow={t('steps.eyebrow')}
            title={t('steps.title')}
            lead={t('steps.lead')}
            reveal="right"
          />
        </Reveal>

        <Reveal as="ol" className="steps__list" threshold={0.25}>
          {steps.map((step, index) => (
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
