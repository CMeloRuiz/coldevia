import dotenv from 'dotenv'

dotenv.config({ quiet: true })

/**
 * Orígenes que pueden llamar a la API cuando no se define ALLOWED_ORIGINS.
 * Sirven de respaldo: en Render conviene fijar la variable de entorno para
 * poder cambiarlos sin volver a desplegar.
 */
const DEFAULT_ALLOWED_ORIGINS = [
  'https://coldevia.com', // dominio público
  'https://www.coldevia.com', // redirige a coldevia.com, pero puede originar peticiones
  'https://coldevia.onrender.com', // frontend en Render (transición)
  'http://localhost:5173', // Vite en desarrollo
  'http://127.0.0.1:5173',
]

/** Normaliza un origen: sin espacios, en minúsculas y sin barra final. */
const normalizeOrigin = (origin) => origin.trim().toLowerCase().replace(/\/+$/, '')

const parseOrigins = (value) =>
  (value ?? '')
    .split(',')
    .map(normalizeOrigin)
    .filter(Boolean)

const configuredOrigins = parseOrigins(process.env.ALLOWED_ORIGINS)

// Configuración centralizada: todo lo que dependa de variables de entorno pasa por aquí.
export const env = {
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: Number(process.env.PORT ?? 4000),
  // Lista separada por comas de orígenes que pueden llamar a la API.
  allowedOrigins: configuredOrigins.length > 0 ? configuredOrigins : DEFAULT_ALLOWED_ORIGINS,

  // PostgreSQL (Neon). Sin esta variable, las solicitudes se guardan en un
  // archivo local para no perderlas durante el desarrollo.
  databaseUrl: process.env.DATABASE_URL ?? '',

  // Resend (correo). Sin API key, el envío se omite y queda registrado en consola.
  resendApiKey: process.env.RESEND_API_KEY ?? '',
  mailFrom: process.env.CONTACT_MAIL_FROM ?? 'ColdevIA <onboarding@resend.dev>',
  mailTo: (process.env.CONTACT_MAIL_TO ?? '')
    .split(',')
    .map((mail) => mail.trim())
    .filter(Boolean),
}

export const isProduction = env.nodeEnv === 'production'
export const hasDatabase = Boolean(env.databaseUrl)
export const hasMailer = Boolean(env.resendApiKey && env.mailTo.length)

/** true si el origen de la petición está permitido (comparación normalizada). */
export const isAllowedOrigin = (origin) => env.allowedOrigins.includes(normalizeOrigin(origin))
