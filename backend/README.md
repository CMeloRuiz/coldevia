# ColdevIA — API

Node.js + Express. Atiende el formulario de contacto del sitio https://coldevia.com.

```bash
npm install
cp .env.example .env     # y completa los valores
npm run dev              # http://localhost:4000
```

## Endpoints

| Método | Ruta            | Descripción                                             |
| ------ | --------------- | ------------------------------------------------------- |
| GET    | `/api/health`   | Verificación de que el servicio está vivo.               |
| POST   | `/api/contact`  | Guarda una solicitud del formulario y avisa por correo.  |
| POST   | `/api/contacto` | Alias del anterior (nombre viejo, se mantiene por caché).|

### POST /api/contact

```jsonc
{
  "name": "Ana Gómez",
  "email": "ana@empresa.com",
  "phone": "+57 320 829 1613",
  "service": "SaaS",          // siempre en español: se valida contra la lista del controlador
  "message": "Opcional",      // hasta 1500 caracteres
  "source": "home",
  "language": "es",           // 'es' | 'en': idioma desde el que se envió el formulario
  "website": ""               // campo trampa: si viene con texto, se descarta en silencio
}
```

Respuestas:

| Código | Cuándo                                        | Cuerpo                                      |
| ------ | --------------------------------------------- | ------------------------------------------- |
| 201    | Guardada y notificada                          | `{ ok, id, storage, notified }`             |
| 202    | Campo trampa completado (bot)                  | `{ ok: true }`                              |
| 422    | Datos inválidos                                | `{ error, code: 'validation', errors }`     |
| 429    | Más de 5 envíos por hora desde la misma IP     | `{ error, code: 'rate' }`                   |
| 502    | Guardada, pero Resend falló                    | `{ error, code: 'mail', saved: true }`      |
| 503    | Guardada, pero falta configurar el correo      | `{ error, code: 'mail', saved: true }`      |

La validación se repite entera en el servidor (campos obligatorios, formato de
correo y teléfono, longitudes máximas) y el texto se limpia de etiquetas HTML y
caracteres de control antes de guardarlo; además, todo valor que entra al correo
se escapa. Protección contra spam: campo trampa `website`, límite por IP con
`express-rate-limit` y cabeceras de seguridad con `helmet`.

**Ninguna solicitud se pierde:** primero se guarda y después se intenta el
correo. Si el envío falla, la solicitud queda guardada, el servidor escribe en
el log la línea `[contact] SOLICITUD SIN NOTIFICAR` con todos los datos, y la
respuesta es un error claro para que el visitante no crea que llegó el aviso.

## Despliegue en Render (Web Service `coldevia-api`)

| Campo              | Valor                 |
| ------------------ | --------------------- |
| Root Directory     | `backend`             |
| Build Command      | `npm ci`              |
| Start Command      | `npm start`           |
| Health Check Path  | `/api/health`         |
| Runtime            | Node (`engines.node` fija Node 22) |

El servidor escucha en `0.0.0.0` y en el puerto que impone Render con `PORT`.
`trust proxy` está activado, así que el límite por IP ve la IP real del
visitante y no la del proxy de Render.

Variables de entorno del servicio (los valores secretos van en el panel, nunca
en el repositorio): `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `FRONTEND_URL`.
`PORT` la define Render sola.

En el sitio estático `coldevia` hay que definir `VITE_API_URL` con la URL de
este servicio y **volver a desplegarlo**: Vite incrusta esa variable al
compilar.

## Correo: por qué Resend y no Gmail con Nodemailer

Los servicios gratuitos de Render **tienen bloqueada la salida a los puertos
SMTP 25, 465 y 587** desde septiembre de 2025
([changelog de Render](https://render.com/changelog/free-web-services-will-no-longer-allow-outbound-traffic-to-smtp-ports)).
Con Nodemailer contra Gmail la conexión no fallaría con un error de
autenticación: se quedaría esperando hasta agotar el tiempo, que es un problema
difícil de diagnosticar. La API de Resend va por HTTPS, así que no depende de
esos puertos. Además evita guardar una contraseña de aplicación de Gmail en las
variables de entorno y deja registro de cada envío en su panel.

Si algún día se cambia a Gmail (requiere plan de pago en Render): activar la
verificación en dos pasos en la cuenta de Google, entrar a
`myaccount.google.com` → Seguridad → Contraseñas de aplicaciones, generar una
para "Correo", y usar esos 16 caracteres como contraseña SMTP en
`smtp.gmail.com:587`.

### Configurar Resend

El dominio `coldevia.com` ya está verificado en Resend (SPF, DKIM y DMARC), así
que se puede enviar desde un buzón propio y a cualquier destinatario.

1. En https://resend.com/api-keys → Create API Key, permiso **Sending access**.
2. Copiar la clave (empieza por `re_`) en `RESEND_API_KEY`. Solo se muestra una
   vez.
3. `CONTACT_TO_EMAIL=ventas@coldevia.com`. Ese buzón reenvía al Gmail personal
   por Cloudflare Email Routing; cambiar de destinatario no toca el código.
4. El remitente por defecto es `ColdevIA <ventas@coldevia.com>`. Solo hay que
   definir `CONTACT_FROM_EMAIL` si se quiere otro.

## Almacenamiento

**Hoy el registro real de cada solicitud es el correo.** No hay base de datos
configurada: sin `DATABASE_URL`, las solicitudes se escriben en
`data/contact-requests.jsonl`, que sirve en desarrollo pero **no en Render**,
donde el disco es efímero y ese archivo desaparece en cada reinicio o
despliegue (el servidor lo avisa en el log al arrancar en producción). Por eso
el envío del correo no se da nunca por bueno: si Resend falla, la respuesta es
un error y los datos quedan en el log del servicio.

Cuando haga falta un historial consultable, se crea una base en Neon y se pone
su cadena en `DATABASE_URL`: el código ya crea la tabla `contact_requests` y la
columna `language` al arrancar, no hay que migrar nada a mano.

## Variables de entorno

Todas están en `.env.example` (sin valores reales). `.env` está en `.gitignore`.

| Variable                 | Para qué sirve                                                        |
| ------------------------ | --------------------------------------------------------------------- |
| `PORT`                   | Puerto local (Render lo define solo).                                  |
| `FRONTEND_URL`           | Orígenes permitidos por CORS, separados por comas y sin barra final.   |
| `DATABASE_URL`           | PostgreSQL (Neon). Sin ella, las solicitudes van a un archivo local.   |
| `RESEND_API_KEY`         | Clave de Resend. Sin ella el formulario responde error.                |
| `CONTACT_FROM_EMAIL`     | Remitente verificado en Resend.                                        |
| `CONTACT_TO_EMAIL`       | Destinatario(s) del aviso, separados por comas.                        |
| `CONTACT_TIMEZONE`       | Zona de la fecha del correo (Buenos Aires por defecto).                |
| `CONTACT_RATE_MAX`       | Envíos permitidos por IP en cada ventana (5 por defecto).              |
| `CONTACT_RATE_WINDOW_MS` | Duración de la ventana en milisegundos (1 hora por defecto).           |

`ALLOWED_ORIGINS`, `CONTACT_MAIL_FROM` y `CONTACT_MAIL_TO` son los nombres
anteriores de tres de ellas y siguen funcionando, para no romper lo que ya está
configurado en Render.

## Probar el endpoint localmente

```bash
npm run dev
curl http://localhost:4000/api/health

curl -X POST http://localhost:4000/api/contact \
  -H 'Content-Type: application/json' \
  -d '{"name":"Ana Gómez","email":"ana@empresa.com","phone":"+57 320 829 1613","service":"SaaS","message":"Prueba","language":"es"}'
```

Casos que conviene revisar: campo vacío o correo inválido → `422`; `website`
con texto → `202` sin guardar nada; seis envíos seguidos → `429`; un `Origin`
que no esté en `FRONTEND_URL` → la respuesta llega sin cabeceras CORS y el
navegador la bloquea.
