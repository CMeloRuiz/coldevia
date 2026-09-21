// ============================================================================
// PLANES Y PRECIOS
// `prices` guarda el monto de cada plan en las tres monedas del selector del
// header. El formato (separador de miles) lo resuelve formatAmount() según la
// moneda elegida, en src/data/currencies.js.
// ============================================================================

export const PLANS = [
  {
    id: 'basico',
    name: 'Plan Básico',
    tagline: 'Presencia profesional para empezar.',
    prices: { COP: 500000, ARS: 250000, USD: 200 },
    features: [
      'Sitio web de hasta 5 secciones',
      'Diseño adaptable a celulares',
      'Formulario de contacto y WhatsApp',
      'Configuración SEO inicial',
      'Dominio y hosting por 1 año',
    ],
  },
  {
    id: 'business',
    name: 'Plan Business',
    tagline: 'El equilibrio que elige la mayoría.',
    prices: { COP: 1000000, ARS: 500000, USD: 350 },
    highlighted: true,
    badge: 'Más elegido',
    features: [
      'Sitio o tienda de hasta 12 secciones',
      'Panel autoadministrable',
      'Pagos en línea o reservas',
      'Integración con CRM y correo',
      'Soporte técnico por 3 meses',
    ],
  },
  {
    id: 'profesional',
    name: 'Plan Profesional',
    tagline: 'Soluciones a la medida para escalar.',
    prices: { COP: 2000000, ARS: 1000000, USD: 700 },
    features: [
      'Plataforma web o SaaS a la medida',
      'Automatización de procesos',
      'Agente de IA integrado',
      'Infraestructura en la nube',
      'Soporte prioritario por 6 meses',
    ],
  },
]

export const PLAN_CTA_LABEL = 'Quiero este plan'
