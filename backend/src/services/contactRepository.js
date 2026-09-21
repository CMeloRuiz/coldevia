import { appendFile, mkdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { pool } from '../config/database.js'

const FALLBACK_DIR = fileURLToPath(new URL('../../data/', import.meta.url))
const FALLBACK_FILE = path.join(FALLBACK_DIR, 'contact-requests.jsonl')

/**
 * Guarda una solicitud de contacto.
 *
 * Con PostgreSQL configurado la inserta en `contact_requests`; si no, la agrega
 * a un archivo .jsonl local para que ninguna solicitud se pierda en desarrollo.
 */
export async function saveContactRequest(data) {
  if (pool) {
    const { rows } = await pool.query(
      `INSERT INTO contact_requests (name, email, phone, service, message, source)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id, created_at`,
      [data.name, data.email, data.phone, data.service, data.message || null, data.source ?? 'home'],
    )
    return { id: rows[0].id, createdAt: rows[0].created_at, storage: 'postgres' }
  }

  const record = { ...data, createdAt: new Date().toISOString() }
  await mkdir(FALLBACK_DIR, { recursive: true })
  await appendFile(FALLBACK_FILE, `${JSON.stringify(record)}\n`, 'utf8')
  return { id: null, createdAt: record.createdAt, storage: 'file' }
}
