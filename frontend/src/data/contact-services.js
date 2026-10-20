// Opciones del select "Servicio de interés".
//
// `value` es lo que viaja al backend y SIEMPRE va en español: el servidor
// valida contra esa lista (backend/src/controllers/contact.controller.js).
// `key` apunta al texto visible en contact.serviceOptions.<key> de cada idioma,
// así el cliente ve la opción en inglés pero la solicitud llega normalizada.
export const CONTACT_SERVICES = [
  { key: 'web', value: 'Creación de sitios web' },
  { key: 'ecommerce', value: 'E-commerce' },
  { key: 'saas', value: 'SaaS' },
  { key: 'automation', value: 'Automatizaciones' },
  { key: 'infrastructure', value: 'Infraestructura de TI' },
  { key: 'ai', value: 'Agentes de IA' },
]

export const CONTACT_SERVICE_VALUES = CONTACT_SERVICES.map((service) => service.value)
