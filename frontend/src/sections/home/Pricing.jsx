import { Link } from 'react-router-dom'
import { Check, Info } from 'lucide-react'
import Reveal from '../../components/ui/Reveal'
import SectionHeading from '../../components/ui/SectionHeading'
import { PLAN_CTA_LABEL, PLANS } from '../../data/plans'
import { formatAmount, getCurrency } from '../../data/currencies'
import { useCurrency } from '../../context/currency-context'
import './Pricing.css'

// Precios y características: src/data/plans.js
// La moneda se elige en el selector del header (contexto CurrencyProvider).

export default function Pricing() {
  const { currency } = useCurrency()
  const { symbol, code } = getCurrency(currency)

  return (
    <section id="precios" className="section pricing" aria-labelledby="pricing-title">
      <div className="container">
        <Reveal className="pricing__head">
          <SectionHeading
            id="pricing-title"
            eyebrow="Planes y precios"
            title="Elige el punto de partida para tu proyecto"
            lead="Tres planes claros para empezar. Si tu proyecto necesita algo distinto, armamos una propuesta a tu medida."
            reveal="fade"
          />
        </Reveal>

        <Reveal as="ul" className="pricing__grid" threshold={0.12}>
          {PLANS.map((plan, index) => (
            <li
              key={plan.id}
              className={`plan ${plan.highlighted ? 'plan--highlighted' : ''}`}
              data-reveal="up"
              style={{ '--i': index }}
            >
              {plan.badge && <span className="plan__badge">{plan.badge}</span>}

              <h3 className="plan__name">{plan.name}</h3>
              <p className="plan__tagline">{plan.tagline}</p>

              {/* aria-live: el lector de pantalla anuncia el cambio de moneda */}
              <p className="plan__price" aria-live="polite">
                <span className="plan__from">Desde</span>
                <span className="plan__currency">{symbol}</span>
                <span className="plan__amount">{formatAmount(plan.prices[code], code)}</span>
                <span className="plan__period">{code}</span>
              </p>

              <ul className="plan__features">
                {plan.features.map((feature) => (
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
                aria-label={`${PLAN_CTA_LABEL}: ${plan.name}`}
              >
                {PLAN_CTA_LABEL}
              </Link>
            </li>
          ))}
        </Reveal>

        <Reveal as="p" className="pricing__note" variant="fade" delay={400}>
          <Info aria-hidden="true" />
          <span>
            ¿No sabes cuál te conviene? <Link to="/contacto">Escríbenos</Link> y te ayudamos a elegir. Valores de
            referencia; cambia la moneda desde el selector del menú. Cada proyecto se cotiza según su alcance.
          </span>
        </Reveal>
      </div>
    </section>
  )
}
