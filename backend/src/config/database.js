import pg from 'pg'
import { env, hasDatabase, isProduction } from './env.js'

/**
 * Pool de PostgreSQL.
 *
 * Si no hay DATABASE_URL configurada, `pool` queda en null y el repositorio usa
 * el respaldo en archivo. Así el proyecto corre en local sin credenciales.
 */
export const pool = hasDatabase
  ? new pg.Pool({
      connectionString: env.databaseUrl,
      // Neon y la mayoría de los proveedores administrados exigen SSL
      ssl: isProduction || env.databaseUrl.includes('neon.tech') ? { rejectUnauthorized: false } : undefined,
      max: 5,
      idleTimeoutMillis: 30000,
    })
  : null

const CREATE_TABLE = `
  CREATE TABLE IF NOT EXISTS contact_requests (
    id          BIGSERIAL PRIMARY KEY,
    name        TEXT        NOT NULL,
    email       TEXT        NOT NULL,
    phone       TEXT        NOT NULL,
    service     TEXT        NOT NULL,
    message     TEXT,
    source      TEXT        NOT NULL DEFAULT 'home',
    -- Idioma desde el que se envió el formulario ('es' | 'en'): indica en qué
    -- idioma hay que responderle al cliente.
    language    TEXT        NOT NULL DEFAULT 'es',
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
  );
`

// Las bases creadas antes de añadir el idioma necesitan la columna nueva.
const ADD_LANGUAGE_COLUMN = `
  ALTER TABLE contact_requests
    ADD COLUMN IF NOT EXISTS language TEXT NOT NULL DEFAULT 'es';
`

/** Crea la tabla si no existe. Se ejecuta una vez al arrancar el servidor. */
export async function initDatabase() {
  if (!pool) {
    console.warn('[db] DATABASE_URL no configurada: las solicitudes se guardarán en data/contact-requests.jsonl')
    if (isProduction) {
      // En Render el disco es efímero: ese archivo desaparece en cada reinicio
      // o despliegue. El correo de aviso es, por ahora, el registro real.
      console.warn('[db] ATENCIÓN: en producción ese archivo se borra en cada despliegue. El registro fiable es el correo.')
    }
    return
  }
  await pool.query(CREATE_TABLE)
  await pool.query(ADD_LANGUAGE_COLUMN)
  console.log('[db] PostgreSQL listo (tabla contact_requests)')
}
