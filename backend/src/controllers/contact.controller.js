import { saveContactRequest } from '../services/contactRepository.js'
import { sendContactNotification } from '../services/mailer.js'

// Debe coincidir con las opciones del select del formulario (frontend/src/data/services.js)
const SERVICES = [
  'Creación de sitios web',
  'E-commerce',
  'SaaS',
  'Automatizaciones',
  'Infraestructura de TI',
  'Agentes de IA',
]

// Idiomas del selector del sitio; cualquier otro valor se guarda como 'es'
const LANGUAGES = ['es', 'en']

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i
const PHONE_RE = /^[+\d][\d\s()-]{6,19}$/

const clean = (value) => (typeof value === 'string' ? value.trim() : '')

function validate(body) {
  const data = {
    name: clean(body.name),
    email: clean(body.email),
    phone: clean(body.phone),
    service: clean(body.service),
    message: clean(body.message),
  }
  const errors = {}

  if (data.name.length < 2 || data.name.length > 80) errors.name = 'Escribe tu nombre completo.'
  if (!EMAIL_RE.test(data.email) || data.email.length > 120) errors.email = 'Revisa el correo electrónico.'
  if (!PHONE_RE.test(data.phone)) errors.phone = 'Revisa el número de teléfono.'
  if (!SERVICES.includes(data.service)) errors.service = 'Elige un servicio de la lista.'
  if (data.message.length > 1500) errors.message = 'El mensaje es demasiado largo.'

  return { data, errors }
}

/** POST /api/contacto — guarda la solicitud y avisa por correo. */
export async function createContactRequest(req, res, next) {
  try {
    // Campo trampa: los bots lo completan, las personas no lo ven.
    if (clean(req.body?.website)) return res.status(202).json({ ok: true })

    const { data, errors } = validate(req.body ?? {})
    if (Object.keys(errors).length > 0) {
      return res.status(422).json({ error: 'Revisa los datos del formulario.', errors })
    }

    // Idioma desde el que se envió el formulario: define en qué idioma responder
    const language = LANGUAGES.includes(clean(req.body.language)) ? clean(req.body.language) : 'es'
    const saved = await saveContactRequest({
      ...data,
      source: clean(req.body.source) || 'home',
      language,
    })

    // El correo no debe tumbar la solicitud: si falla, ya quedó guardada.
    let notified = false
    try {
      const result = await sendContactNotification({ ...data, language })
      notified = result.sent
    } catch (error) {
      console.error('[mail] No se pudo enviar la notificación:', error.message)
    }

    return res.status(201).json({ ok: true, id: saved.id, storage: saved.storage, notified })
  } catch (error) {
    return next(error)
  }
}
