import { Resend } from 'resend'
import { env, hasMailer } from '../config/env.js'

/**
 * Error de notificación. El controlador lo distingue de un fallo cualquiera
 * para responderle al visitante que su solicitud quedó guardada.
 */
export class MailError extends Error {
  constructor(message, { configured = true } = {}) {
    super(message)
    this.name = 'MailError'
    this.configured = configured
  }
}

// El cliente se crea una sola vez; sin API key no se instancia.
const resend = env.resendApiKey ? new Resend(env.resendApiKey) : null

const escapeHtml = (value = '') =>
  String(value).replace(
    /[&<>"']/g,
    (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char],
  )

const LANGUAGE_NAMES = { es: 'Español', en: 'Inglés' }

/**
 * Fecha y hora en la zona de quien lee el aviso, con el huso escrito.
 *
 * La zona sale de CONTACT_TIMEZONE para que la hora del correo coincida con
 * el reloj de quien atiende la bandeja. El "GMT-3" evita la duda cuando el
 * aviso lo lee alguien desde otro país.
 */
const formatDate = (date = new Date()) =>
  new Intl.DateTimeFormat('es-CO', {
    // Campos sueltos: dateStyle/timeStyle no admiten timeZoneName
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZone: env.timezone,
    timeZoneName: 'shortOffset',
  }).format(date)

/**
 * Arma el correo de aviso. Separado del envío para poder revisar el contenido
 * (asunto, HTML y texto plano) sin llamar a Resend.
 */
export function buildContactEmail(data, date = new Date()) {
  const language = LANGUAGE_NAMES[data.language] ?? LANGUAGE_NAMES.es
  const message = data.message?.trim() ? data.message.trim() : '—'

  const rows = [
    ['Nombre', data.name],
    ['Correo', data.email],
    ['Teléfono', data.phone],
    ['Servicio de interés', data.service],
    ['Idioma del cliente', language],
    ['Fecha y hora', formatDate(date)],
    ['Mensaje', message],
  ]

  // Todo valor que venga del cliente se escapa antes de entrar al HTML.
  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;color:#0E1526">
      <h2 style="color:#0E1526;font-size:19px;margin:0 0 4px">Nueva solicitud desde el sitio</h2>
      <p style="color:#5F6676;font-size:14px;margin:0 0 18px">
        Formulario de contacto del Home · Respóndele en <strong>${language}</strong>
      </p>
      <table style="border-collapse:collapse">
        ${rows
          .map(
            ([label, value]) =>
              `<tr><td style="padding:6px 14px 6px 0;color:#5F6676;font-size:14px;vertical-align:top">${label}</td>
                <td style="padding:6px 0;color:#0E1526;font-size:14px"><strong>${escapeHtml(value)}</strong></td></tr>`,
          )
          .join('')}
      </table>
      <p style="color:#5F6676;font-size:13px;margin:20px 0 0">
        Responde a este correo y le llega directo a ${escapeHtml(data.email)}.
      </p>
    </div>`

  const text = [
    'Nueva solicitud desde el sitio',
    `Formulario de contacto del Home · Respóndele en ${language}`,
    '',
    ...rows.map(([label, value]) => `${label}: ${value}`),
    '',
    `Responde a este correo y le llega directo a ${data.email}.`,
  ].join('\n')

  return {
    subject: `Nueva solicitud en ColdevIA — ${data.service} — ${data.name}`,
    html,
    text,
  }
}

/**
 * Avisa por correo que llegó una solicitud nueva, con el SDK oficial de Resend.
 *
 * Se usa Resend y no SMTP porque los servicios gratuitos de Render tienen
 * bloqueada la salida a los puertos 25, 465 y 587 (cambio de septiembre de
 * 2025), así que Nodemailer contra Gmail se quedaría esperando hasta agotar el
 * tiempo de espera. Una API sobre HTTPS no depende de esos puertos.
 *
 * Lanza MailError si falta configuración o si Resend responde con error: el
 * controlador avisa al visitante en vez de dar por enviada una solicitud que
 * nadie va a leer.
 */
export async function sendContactNotification(data) {
  if (!hasMailer || !resend) {
    throw new MailError('Falta RESEND_API_KEY o CONTACT_TO_EMAIL', { configured: false })
  }

  const { subject, html, text } = buildContactEmail(data)

  // El SDK no lanza excepción ante un error de la API: lo devuelve en `error`.
  const { data: sent, error } = await resend.emails.send({
    from: env.mailFrom,
    to: env.mailTo,
    // Para responderle al cliente directamente desde la bandeja de entrada
    replyTo: data.email,
    subject,
    html,
    text,
  })

  if (error) {
    throw new MailError(`Resend rechazó el envío (${error.name ?? 'error'}): ${error.message}`)
  }

  return { sent: true, id: sent?.id }
}
