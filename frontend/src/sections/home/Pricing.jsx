import { Link } from 'react-router-dom'
import { Check, Info } from 'lucide-react'
import Reveal from '../../components/ui/Reveal'
import SectionHeading from '../../components/ui/SectionHeading'
import { PLANS } from '../../data/plans'
import { formatAmount, getCurrency } from '../../data/currencies'
import { useCurrency } from '../../context/currency-context'
import { useT } from '../../i18n/language-context'
import './Pricing.css'

// Montos: src/data/plans.js · Textos: pricing.plans.<id> en los diccionarios.
// La moneda se elige en el header y es independiente del idioma.

export default function Pricing() {
  const { currency } = useCurrency()
  const { symbol, code } = getCurrency(currency)
  const t = useT()
  const cta = t('pricing.cta')

  return (
    <section id="precios" className="section pricing" aria-labelledby="pricing-title">
      <div className="container">
        <Reveal className="pricing__head">
          <SectionHeading
            id="pricing-title"
            eyebrow={t('pricing.eyebrow')}
            title={t('pricing.title')}
            lead={t('pricing.lead')}
            reveal="fade"
          />
        </Reveal>

        <Reveal as="ul" className="pricing__grid" threshold={0.12}>
          {PLANS.map((plan, index) => {
            const name = t(`pricing.plans.${plan.id}.name`)
            const features = t(`pricing.plans.${plan.id}.features`)
            const badge = plan.highlighted ? t(`pricing.plans.${plan.id}.badge`) : null

            return (
              <li
                key={plan.id}
                className={`plan ${plan.highlighted ? 'plan--highlighted' : ''}`}
                data-reveal="up"
                style={{ '--i': index }}
              >
                {badge && <span className="plan__badge">{badge}</span>}

                <h3 className="plan__name">{name}</h3>
                <p className="plan__tagline">{t(`pricing.plans.${plan.id}.tagline`)}</p>

                {/* aria-live: el lector de pantalla anuncia el cambio de moneda */}
                <p className="plan__price" aria-live="polite">
                  <span className="plan__from">{t('pricing.from')}</span>
                  <span className="plan__currency">{symbol}</span>
                  <span className="plan__amount">{formatAmount(plan.prices[code], code)}</span>
                  <span className="plan__period">{code}</span>
                </p>

                <ul className="plan__features">
                  {features.map((feature) => (
                    <li key={feature}>
                      <span className="plan__check">
                        <Check aria-hidden="true" />
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link
                  to="/contacto"
                  className={`btn btn--block ${plan.highlighted ? 'btn--primary' : 'btn--outline'}`}
                  aria-label={t('pricing.ctaAria', { cta, plan: name })}
                >
                  {cta}
                </Link>
              </li>
            )
          })}
        </Reveal>

        <Reveal as="p" className="pricing__note" variant="fade" delay={400}>
          <Info aria-hidden="true" />
          <span>
            {t('pricing.noteQuestion')} <Link to="/contacto">{t('pricing.noteLink')}</Link> {t('pricing.noteRest')}
          </span>
        </Reveal>
      </div>
    </section>
  )
}
