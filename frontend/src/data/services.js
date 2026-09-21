import { Bot, Globe, Layers, Server, ShoppingBag, Workflow } from 'lucide-react'

// Resumen de servicios para el Home. La página /servicios tendrá el detalle completo.
export const SERVICES = [
  {
    icon: Globe,
    title: 'Creación de sitios web',
    description:
      'Sitios corporativos y landing pages rápidos, optimizados para buscadores y pensados para convertir visitas en clientes.',
    tags: ['Corporativos', 'Landing pages', 'SEO'],
  },
  {
    icon: ShoppingBag,
    title: 'E-commerce',
    description:
      'Tiendas en línea con pasarelas de pago, inventario y logística integrados para vender todos los días del año.',
    tags: ['Pagos en línea', 'Inventario', 'Catálogos'],
  },
  {
    icon: Layers,
    title: 'SaaS',
    description:
      'Plataformas por suscripción diseñadas para escalar: usuarios, roles, facturación recurrente y paneles de control.',
    tags: ['Multiusuario', 'Suscripciones', 'Dashboards'],
  },
  {
    icon: Workflow,
    title: 'Automatizaciones',
    description:
      'Conectamos tus herramientas y eliminamos tareas repetitivas para que tu equipo dedique su tiempo a lo importante.',
    tags: ['Integraciones', 'Flujos', 'Reportes'],
  },
  {
    icon: Server,
    title: 'Infraestructura de TI',
    description:
      'Servidores, nube, respaldos y seguridad configurados para que tu operación funcione estable y sin sorpresas.',
    tags: ['Cloud', 'Seguridad', 'Respaldos'],
  },
  {
    icon: Bot,
    title: 'Agentes de IA para tu negocio',
    description:
      'Asistentes inteligentes que atienden clientes, califican prospectos y responden 24/7 con la información de tu empresa.',
    tags: ['WhatsApp', 'Atención 24/7', 'Ventas'],
  },
]
