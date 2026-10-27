import { saveContactRequest } from '../services/contactRepository.js'
import { sendContactNotification, MailError } from '../services/mailer.js'

// Debe coincidir con las opciones del select del formulario (frontend/src/data/contact-services.js)
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

/**
 * Deja el texto en condiciones de guardarse y de incrustarse en el correo:
 * quita etiquetas HTML y caracteres de control, y recorta los espacios.
 * El escapado final lo hace el mailer; esto evita además que el dato quede
 * sucio en la base.
 */
const clean = (value) =>
  typeof value === 'string'
    ? value
        .replace(/<[^>]*>/g, ' ')
        // eslint-disable-next-line no-control-regex
        .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
        .replace(/[ \t]+/g, ' ')
        .trim()
    : ''

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

/** POST /api/contact — guarda la solicitud y avisa por correo. */
export async function createContactRequest(req, res, next) {
  try {
    // Campo trampa: los bots lo completan, las personas no lo ven.
    if (clean(req.body?.website)) return res.status(202).json({ ok: true })

    const { data, errors } = validate(req.body ?? {})
    if (Object.keys(errors).length > 0) {
      return res.status(422).json({ error: 'Revisa los datos del formulario.', code: 'validation', errors })
    }

    // Idioma desde el que se envió el formulario: define en qué idioma responder
    const language = LANGUAGES.includes(clean(req.body.language)) ? clean(req.body.language) : 'es'
    const request = { ...data, source: clean(req.body.source) || 'home', language }

    // Primero se guarda: pase lo que pase con el correo, la solicitud existe.
    const saved = await saveContactRequest(request)

    try {
      const { id } = await sendContactNotification(request)
      // El id de Resend permite rastrear el envío en su panel desde los logs
      console.log(`[contact] Solicitud de ${request.email} notificada (Resend ${id ?? 'sin id'})`)
    } catch (error) {
      // Ninguna solicitud se pierde: queda guardada y además escrita en el log,
      // con todos los datos, para poder responderla a mano.
      console.error(
        `[contact] SOLICITUD SIN NOTIFICAR (${error.message}) · guardada en ${saved.storage}${saved.id ? ` #${saved.id}` : ''} ·`,
        JSON.stringify(request),
      )

      const notConfigured = error instanceof MailError && error.configured === false
      return res.status(notConfigured ? 503 : 502).json({
        error: 'Guardamos tu solicitud, pero no pudimos enviar el aviso por correo.',
        code: 'mail',
        saved: true,
      })
    }

    return res.status(201).json({ ok: true, id: saved.id, storage: saved.storage, notified: true })
  } catch (error) {
    return next(error)
  }
}
