# ColdevIA — API

Node.js + Express. Sirve el formulario de contacto del sitio https://coldevia.com.

```bash
npm install
cp .env.example .env
npm run dev      # http://localhost:4000
```

## Endpoints

| Método | Ruta            | Descripción                                        |
| ------ | --------------- | -------------------------------------------------- |
| GET    | `/api/health`   | Verificación para monitoreo y despliegues.          |
| POST   | `/api/contacto` | Guarda una solicitud del formulario y avisa por correo. |

### POST /api/contacto

```jsonc
{
  "name": "Ana Gómez",
  "email": "ana@empresa.com",
  "phone": "+57 320 829 1613",
  "service": "SaaS",          // siempre en español: se valida contra la lista del controlador
  "message": "Opcional",
  "source": "home",
  "language": "es"            // 'es' | 'en': idioma desde el que se envió el formulario
}
```

- Validación por campo; si algo falla responde `422` con `errors` (el frontend traduce los mensajes).
- Campo trampa `website` contra bots y límite de 5 envíos cada 10 minutos por IP.
- `language` se guarda en la base y aparece en el correo de aviso, para saber en qué idioma
  responderle al cliente. Cualquier valor distinto de `es`/`en` se guarda como `es`.

## Almacenamiento

Con `DATABASE_URL` configurada, las solicitudes van a la tabla `contact_requests`
(se crea sola al arrancar, igual que la columna `language` en bases anteriores).
Sin esa variable, se guardan en `data/contact-requests.jsonl` para no perderlas en desarrollo.

## Variables de entorno

Ver `.env.example`. Las dos que hay que revisar al cambiar de dominio o de hosting:

- `ALLOWED_ORIGINS`: orígenes permitidos por CORS, separados por comas y sin barra final.
  Si se deja vacía, se usa la lista por defecto de `src/config/env.js`.
- `CONTACT_MAIL_TO` y `RESEND_API_KEY`: sin ellas la solicitud se guarda igual, pero no se
  envía el correo de aviso.
