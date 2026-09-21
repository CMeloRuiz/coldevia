import { useRef, useState } from 'react'
import { AlertCircle, ArrowUpRight, Check, Clock, FileText, ShieldCheck } from 'lucide-react'
import Reveal from '../../components/ui/Reveal'
import SectionHeading from '../../components/ui/SectionHeading'
import { CONTACT_SERVICES } from '../../data/contact-services'
import './ContactForm.css'

// En desarrollo, Vite redirige /api al backend (ver vite.config.js).
// En producción se define VITE_API_URL con la URL pública de la API.
const API_URL = import.meta.env.VITE_API_URL ?? ''

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i
const PHONE_RE = /^[+\d][\d\s()-]{6,19}$/

const EMPTY = { name: '', email: '', phone: '', service: '', message: '', website: '' }

const REASSURANCES = [
  { icon: Clock, text: 'Te respondemos en menos de 24 horas hábiles.' },
  { icon: FileText, text: 'Recibes una propuesta con alcance y tiempos, sin costo.' },
  { icon: ShieldCheck, text: 'Tus datos se usan solo para contactarte.' },
]

function validate(values) {
  const errors = {}
  if (values.name.trim().length < 2) errors.name = 'Escribe tu nombre completo.'
  if (!EMAIL_RE.test(values.email.trim())) errors.email = 'Revisa el correo electrónico.'
  if (!PHONE_RE.test(values.phone.trim())) errors.phone = 'Incluye un teléfono válido, con indicativo.'
  if (!CONTACT_SERVICES.includes(values.service)) errors.service = 'Elige el servicio que te interesa.'
  if (values.message.trim().length > 1500) errors.message = 'El mensaje es demasiado largo.'
  return errors
}

export default function ContactForm() {
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [serverError, setServerError] = useState('')
  const formRef = useRef(null)

  const update = (field) => (event) => {
    const { value } = event.target
    setValues((current) => ({ ...current, [field]: value }))
    // El error de un campo desaparece apenas se corrige
    setErrors((current) => (current[field] ? { ...current, [field]: undefined } : current))
  }

  const focusFirstError = (fields) => {
    const first = Object.keys(fields)[0]
    formRef.current?.querySelector(`[name="${first}"]`)?.focus()
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (status === 'sending') return

    const found = validate(values)
    if (Object.keys(found).length > 0) {
      setErrors(found)
      focusFirstError(found)
      return
    }

    setStatus('sending')
    setServerError('')

    try {
      const response = await fetch(`${API_URL}/api/contacto`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, source: 'home' }),
      })
      const payload = await response.json().catch(() => ({}))

      if (response.status === 422 && payload.errors) {
        setErrors(payload.errors)
        focusFirstError(payload.errors)
        setStatus('idle')
        return
      }
      if (!response.ok) throw new Error(payload.error || 'No se pudo enviar la solicitud.')

      setValues(EMPTY)
      setErrors({})
      setStatus('sent')
    } catch (error) {
      setServerError(
        error.message === 'Failed to fetch'
          ? 'No pudimos conectar con el servidor. Revisa tu conexión e intenta de nuevo.'
          : error.message,
      )
      setStatus('error')
    }
  }

  const fieldProps = (field) => ({
    name: field,
    value: values[field],
    onChange: update(field),
    'aria-invalid': errors[field] ? true : undefined,
    'aria-describedby': errors[field] ? `${field}-error` : undefined,
    className: errors[field] ? 'is-invalid' : undefined,
  })

  return (
    <section className="section section--dark contact" aria-labelledby="contact-title">
      <div className="container contact__grid">
        <Reveal className="contact__intro">
          <SectionHeading
            id="contact-title"
            eyebrow="Empecemos"
            title="Cuéntanos qué necesitas y te armamos una propuesta"
            lead="Déjanos tus datos y el servicio que te interesa. Revisamos tu caso y te escribimos con los siguientes pasos."
            reveal="left"
          />
          <ul className="contact__points" data-reveal="left" style={{ '--i': 3 }}>
            {REASSURANCES.map(({ icon: Icon, text }) => (
              <li key={text}>
                <Icon aria-hidden="true" />
                {text}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="contact__card" variant="right">
          {status === 'sent' ? (
            <div className="contact__success" role="status">
              <span className="contact__success-icon">
                <Check aria-hidden="true" />
              </span>
              <h3>Solicitud enviada</h3>
              <p>Gracias por escribirnos. Te respondemos al correo que nos dejaste en menos de 24 horas hábiles.</p>
              <button type="button" className="btn btn--outline" onClick={() => setStatus('idle')}>
                Enviar otra solicitud
              </button>
            </div>
          ) : (
            <form ref={formRef} className="contact-form" onSubmit={handleSubmit} noValidate>
              {status === 'error' && serverError && (
                <p className="contact-form__alert" role="alert">
                  <AlertCircle aria-hidden="true" />
                  {serverError}
                </p>
              )}

              <div className="contact-form__row">
                <div className="field">
                  <label htmlFor="name">Nombre</label>
                  <input id="name" type="text" autoComplete="name" placeholder="Tu nombre" {...fieldProps('name')} />
                  {errors.name && (
                    <span className="field__error" id="name-error">
                      {errors.name}
                    </span>
                  )}
                </div>

                <div className="field">
                  <label htmlFor="email">Correo electrónico</label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="nombre@empresa.com"
                    {...fieldProps('email')}
                  />
                  {errors.email && (
                    <span className="field__error" id="email-error">
                      {errors.email}
                    </span>
                  )}
                </div>
              </div>

              <div className="contact-form__row">
                <div className="field">
                  <label htmlFor="phone">Teléfono</label>
                  <input
                    id="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="+57 300 000 0000"
                    {...fieldProps('phone')}
                  />
                  {errors.phone && (
                    <span className="field__error" id="phone-error">
                      {errors.phone}
                    </span>
                  )}
                </div>

                <div className="field">
                  <label htmlFor="service">Servicio de interés</label>
                  <select id="service" {...fieldProps('service')}>
                    <option value="">Elige una opción</option>
                    {CONTACT_SERVICES.map((service) => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                  {errors.service && (
                    <span className="field__error" id="service-error">
                      {errors.service}
                    </span>
                  )}
                </div>
              </div>

              <div className="field">
                <label htmlFor="message">
                  Mensaje <span className="field__optional">(opcional)</span>
                </label>
                <textarea
                  id="message"
                  rows="4"
                  placeholder="Cuéntanos brevemente qué tienes en mente."
                  {...fieldProps('message')}
                />
                {errors.message && (
                  <span className="field__error" id="message-error">
                    {errors.message}
                  </span>
                )}
              </div>

              {/* Campo trampa para bots: invisible y fuera del recorrido con tabulador */}
              <div className="contact-form__honey" aria-hidden="true">
                <label htmlFor="website">No completar</label>
                <input id="website" type="text" tabIndex="-1" autoComplete="off" {...fieldProps('website')} />
              </div>

              <button type="submit" className="btn btn--primary btn--lg btn--block" disabled={status === 'sending'}>
                {status === 'sending' ? 'Enviando…' : 'Enviar solicitud'}
                {status !== 'sending' && <ArrowUpRight aria-hidden="true" />}
              </button>

              <p className="contact-form__legal">
                Al enviar aceptas que te contactemos por correo o teléfono para responder tu solicitud.
              </p>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  )
}
