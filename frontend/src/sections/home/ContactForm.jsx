import { useRef, useState } from 'react'
import { AlertCircle, ArrowUpRight, Check, Clock, FileText, ShieldCheck } from 'lucide-react'
import Reveal from '../../components/ui/Reveal'
import SectionHeading from '../../components/ui/SectionHeading'
import { CONTACT_SERVICES, CONTACT_SERVICE_VALUES } from '../../data/contact-services'
import { useLanguage } from '../../i18n/language-context'
import './ContactForm.css'

// En desarrollo, Vite redirige /api al backend (ver vite.config.js).
// En producción se define VITE_API_URL con la URL pública de la API.
const API_URL = import.meta.env.VITE_API_URL ?? ''

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i
const PHONE_RE = /^[+\d][\d\s()-]{6,19}$/

const EMPTY = { name: '', email: '', phone: '', service: '', message: '', website: '' }

const REASSURANCES = [Clock, FileText, ShieldCheck]

function validate(values) {
  const errors = {}
  if (values.name.trim().length < 2) errors.name = 'name'
  if (!EMAIL_RE.test(values.email.trim())) errors.email = 'email'
  if (!PHONE_RE.test(values.phone.trim())) errors.phone = 'phone'
  if (!CONTACT_SERVICE_VALUES.includes(values.service)) errors.service = 'service'
  if (values.message.trim().length > 1500) errors.message = 'message'
  return errors
}

export default function ContactForm() {
  const { t, language } = useLanguage()
  const [values, setValues] = useState(EMPTY)
  // Cada error guarda la CLAVE del mensaje, no el texto: así el aviso cambia
  // de idioma si la persona cambia el selector con el formulario ya validado.
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [serverErrorKey, setServerErrorKey] = useState('')
  const formRef = useRef(null)
  const points = t('contact.points')

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
    setServerErrorKey('')

    try {
      const response = await fetch(`${API_URL}/api/contacto`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // `language` le dice al backend en qué idioma responderle al cliente
        body: JSON.stringify({ ...values, source: 'home', language }),
      })
      const payload = await response.json().catch(() => ({}))

      if (response.status === 422 && payload.errors) {
        // El backend devuelve la clave del campo; el texto lo pone el idioma activo
        const mapped = Object.fromEntries(Object.keys(payload.errors).map((field) => [field, field]))
        setErrors(mapped)
        focusFirstError(mapped)
        setStatus('idle')
        return
      }
      if (!response.ok) throw new Error('generic')

      setValues(EMPTY)
      setErrors({})
      setStatus('sent')
    } catch (error) {
      setServerErrorKey(error.message === 'Failed to fetch' ? 'network' : 'generic')
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

  const fieldError = (field) =>
    errors[field] ? (
      <span className="field__error" id={`${field}-error`}>
        {t(`contact.errors.${errors[field]}`)}
      </span>
    ) : null

  return (
    <section id="contacto" className="section section--dark contact" aria-labelledby="contact-title">
      <div className="container contact__grid">
        <Reveal className="contact__intro">
          <SectionHeading
            id="contact-title"
            eyebrow={t('contact.eyebrow')}
            title={t('contact.title')}
            lead={t('contact.lead')}
            reveal="left"
          />
          <ul className="contact__points" data-reveal="left" style={{ '--i': 3 }}>
            {points.map((text, index) => {
              const Icon = REASSURANCES[index]
              return (
                <li key={text}>
                  <Icon aria-hidden="true" />
                  {text}
                </li>
              )
            })}
          </ul>
        </Reveal>

        <Reveal className="contact__card" variant="right">
          {status === 'sent' ? (
            <div className="contact__success" role="status">
              <span className="contact__success-icon">
                <Check aria-hidden="true" />
              </span>
              <h3>{t('contact.success.title')}</h3>
              <p>{t('contact.success.text')}</p>
              <button type="button" className="btn btn--outline" onClick={() => setStatus('idle')}>
                {t('contact.success.again')}
              </button>
            </div>
          ) : (
            <form ref={formRef} className="contact-form" onSubmit={handleSubmit} noValidate>
              {status === 'error' && serverErrorKey && (
                <p className="contact-form__alert" role="alert">
                  <AlertCircle aria-hidden="true" />
                  {t(`contact.errors.${serverErrorKey}`)}
                </p>
              )}

              <div className="contact-form__row">
                <div className="field">
                  <label htmlFor="name">{t('contact.fields.name.label')}</label>
                  <input
                    id="name"
                    type="text"
                    autoComplete="name"
                    placeholder={t('contact.fields.name.placeholder')}
                    {...fieldProps('name')}
                  />
                  {fieldError('name')}
                </div>

                <div className="field">
                  <label htmlFor="email">{t('contact.fields.email.label')}</label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder={t('contact.fields.email.placeholder')}
                    {...fieldProps('email')}
                  />
                  {fieldError('email')}
                </div>
              </div>

              <div className="contact-form__row">
                <div className="field">
                  <label htmlFor="phone">{t('contact.fields.phone.label')}</label>
                  <input
                    id="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder={t('contact.fields.phone.placeholder')}
                    {...fieldProps('phone')}
                  />
                  {fieldError('phone')}
                </div>

                <div className="field">
                  <label htmlFor="service">{t('contact.fields.service.label')}</label>
                  <select id="service" {...fieldProps('service')}>
                    <option value="">{t('contact.fields.service.placeholder')}</option>
                    {/* value viaja siempre en español: el backend valida contra esa lista */}
                    {CONTACT_SERVICES.map((service) => (
                      <option key={service.key} value={service.value}>
                        {t(`contact.serviceOptions.${service.key}`)}
                      </option>
                    ))}
                  </select>
                  {fieldError('service')}
                </div>
              </div>

              <div className="field">
                <label htmlFor="message">
                  {t('contact.fields.message.label')}{' '}
                  <span className="field__optional">{t('contact.fields.message.optional')}</span>
                </label>
                <textarea
                  id="message"
                  rows="4"
                  placeholder={t('contact.fields.message.placeholder')}
                  {...fieldProps('message')}
                />
                {fieldError('message')}
              </div>

              {/* Campo trampa para bots: invisible y fuera del recorrido con tabulador */}
              <div className="contact-form__honey" aria-hidden="true">
                <label htmlFor="website">No completar</label>
                <input id="website" type="text" tabIndex="-1" autoComplete="off" {...fieldProps('website')} />
              </div>

              <button type="submit" className="btn btn--primary btn--lg btn--block" disabled={status === 'sending'}>
                {status === 'sending' ? t('contact.submitting') : t('contact.submit')}
                {status !== 'sending' && <ArrowUpRight aria-hidden="true" />}
              </button>

              <p className="contact-form__legal">{t('contact.legal')}</p>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  )
}
