import dotenv from 'dotenv'

dotenv.config({ quiet: true })

// Configuración centralizada: todo lo que dependa de variables de entorno pasa por aquí.
export const env = {
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: Number(process.env.PORT ?? 4000),
  // Lista separada por comas de orígenes que pueden llamar a la API.
  allowedOrigins: (process.env.ALLOWED_ORIGINS ?? 'http://localhost:5173')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean),

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
