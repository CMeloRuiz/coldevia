import { env, hasMailer } from '../config/env.js'

const RESEND_ENDPOINT = 'https://api.resend.com/emails'

const escapeHtml = (value = '') =>
  String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char])

/**
 * Avisa por correo que llegó una solicitud nueva (Resend).
 *
 * Si faltan RESEND_API_KEY o CONTACT_MAIL_TO, no se envía nada y se deja
 * constancia en consola: la solicitud ya quedó guardada igual.
 */
export async function sendContactNotification(data) {
  if (!hasMailer) {
    console.warn('[mail] Sin RESEND_API_KEY o CONTACT_MAIL_TO: no se envió la notificación')
    return { sent: false, reason: 'not-configured' }
  }

  // El aviso va siempre en español, pero indica en qué idioma escribe el cliente
  const idiomas = { es: 'Español', en: 'Inglés' }
  const idioma = idiomas[data.language] ?? idiomas.es

  const rows = [
    ['Nombre', data.name],
    ['Correo', data.email],
    ['Teléfono', data.phone],
    ['Servicio de interés', data.service],
    ['Idioma del cliente', idioma],
    ['Mensaje', data.message || '—'],
  ]
    .map(
      ([label, value]) =>
        `<tr><td style="padding:6px 14px 6px 0;color:#5F6676;font-size:14px">${label}</td>
          <td style="padding:6px 0;color:#0E1526;font-size:14px"><strong>${escapeHtml(value)}</strong></td></tr>`,
    )
    .join('')

  const response = await fetch(RESEND_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.resendApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: env.mailFrom,
      to: env.mailTo,
      reply_to: data.email,
      subject: `Nueva solicitud de ${data.name} · ${data.service} (${idioma})`,
      html: `
        <div style="font-family:Arial,Helvetica,sans-serif;max-width:560px">
          <h2 style="color:#0E1526;font-size:19px;margin:0 0 4px">Nueva solicitud desde el sitio</h2>
          <p style="color:#5F6676;font-size:14px;margin:0 0 18px">
            Formulario de contacto del Home · Respóndele en <strong>${idioma}</strong>
          </p>
          <table style="border-collapse:collapse">${rows}</table>
        </div>`,
    }),
  })

  if (!response.ok) {
    const detail = await response.text()
    throw new Error(`Resend respondió ${response.status}: ${detail}`)
  }

  return { sent: true }
}
