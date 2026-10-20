import dotenv from 'dotenv'

dotenv.config({ quiet: true })

/**
 * Orígenes que pueden llamar a la API cuando no se define FRONTEND_URL.
 * Sirven de respaldo: en Render conviene fijar la variable de entorno para
 * poder cambiarlos sin volver a desplegar.
 */
const DEFAULT_ALLOWED_ORIGINS = [
  'https://coldevia.com', // dominio público
  'https://www.coldevia.com', // redirige a coldevia.com, pero puede originar peticiones
  'http://localhost:5173', // Vite en desarrollo
  'http://127.0.0.1:5173',
]

/** Normaliza un origen: sin espacios, en minúsculas y sin barra final. */
const normalizeOrigin = (origin) => origin.trim().toLowerCase().replace(/\/+$/, '')

const parseList = (value) =>
  (value ?? '')
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)

const parseOrigins = (value) => parseList(value).map(normalizeOrigin)

// FRONTEND_URL es el nombre actual; ALLOWED_ORIGINS se mantiene porque es el que
// está configurado hoy en Render (si existen las dos, se usan ambas listas).
const configuredOrigins = [
  ...parseOrigins(process.env.FRONTEND_URL),
  ...parseOrigins(process.env.ALLOWED_ORIGINS),
]

// Configuración centralizada: todo lo que dependa de variables de entorno pasa por aquí.
export const env = {
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: Number(process.env.PORT ?? 4000),
  // Lista separada por comas de orígenes que pueden llamar a la API.
  allowedOrigins: configuredOrigins.length > 0 ? [...new Set(configuredOrigins)] : DEFAULT_ALLOWED_ORIGINS,

  // PostgreSQL (Neon). Sin esta variable, las solicitudes se guardan en un
  // archivo local para no perderlas durante el desarrollo.
  databaseUrl: process.env.DATABASE_URL ?? '',

  // Resend (correo). Sin API key o sin destinatario no se envía nada y la
  // solicitud se responde con error, para que nadie crea que llegó el aviso.
  resendApiKey: process.env.RESEND_API_KEY ?? '',
  // CONTACT_FROM_EMAIL / CONTACT_TO_EMAIL son los nombres actuales;
  // CONTACT_MAIL_FROM / CONTACT_MAIL_TO siguen funcionando por compatibilidad.
  mailFrom: process.env.CONTACT_FROM_EMAIL ?? process.env.CONTACT_MAIL_FROM ?? 'ColdevIA <onboarding@resend.dev>',
  mailTo: parseList(process.env.CONTACT_TO_EMAIL ?? process.env.CONTACT_MAIL_TO),

  // Límite de envíos del formulario por IP.
  contactRate: {
    windowMs: Number(process.env.CONTACT_RATE_WINDOW_MS ?? 60 * 60 * 1000), // 1 hora
    max: Number(process.env.CONTACT_RATE_MAX ?? 5),
  },
}

export const isProduction = env.nodeEnv === 'production'
export const hasDatabase = Boolean(env.databaseUrl)
export const hasMailer = Boolean(env.resendApiKey && env.mailTo.length)

/** true si el origen de la petición está permitido (comparación normalizada). */
export const isAllowedOrigin = (origin) => env.allowedOrigins.includes(normalizeOrigin(origin))
