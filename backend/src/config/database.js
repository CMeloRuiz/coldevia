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
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
  );
`

/** Crea la tabla si no existe. Se ejecuta una vez al arrancar el servidor. */
export async function initDatabase() {
  if (!pool) {
    console.warn('[db] DATABASE_URL no configurada: las solicitudes se guardarán en data/contact-requests.jsonl')
    return
  }
  await pool.query(CREATE_TABLE)
  console.log('[db] PostgreSQL listo (tabla contact_requests)')
}
