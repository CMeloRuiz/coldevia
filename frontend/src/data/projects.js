// ============================================================================
// PROYECTOS DESTACADOS DEL HOME
// ----------------------------------------------------------------------------
// Proyectos reales de clientes. Cada tarjeta abre el sitio en una pestaña nueva.
//   · `includes`: lo que el proyecto tiene hoy en producción.
//   · `roadmap`:  lo que el cliente tiene planificado como siguiente etapa.
// Portadas en src/assets/images/projects/ (webp, captura del hero del sitio).
// ============================================================================

import imgGonzalez from '../assets/images/projects/proyecto-comercializadora-gonzalez.webp'
import imgGma from '../assets/images/projects/proyecto-grupo-medicos-asociados.webp'
import imgGym78 from '../assets/images/projects/proyecto-gym78.webp'

export const FEATURED_PROJECTS = [
  {
    name: 'Comercializadora González',
    category: 'Ferretería y eléctricos',
    url: 'https://comercializadoragonzalez-ferreteria.com/',
    description: 'Catálogo en línea y tienda virtual para una comercializadora de herramientas y material eléctrico.',
    includes: ['Landing page', 'Tienda virtual'],
    roadmap: ['Backend propio'],
    image: imgGonzalez,
  },
  {
    name: 'Grupo Médicos Asociados',
    category: 'Salud',
    url: 'https://grupomedicosasociados.com/',
    description: 'Sitio para un grupo médico con un chatbot que orienta a los pacientes y procesos automatizados.',
    includes: ['Landing page', 'Chatbot', 'Automatizaciones'],
    roadmap: ['Tienda virtual', 'Panel administrativo'],
    image: imgGma,
  },
  {
    name: 'GYM78',
    category: 'Fitness',
    url: 'https://gym78-web.onrender.com/',
    description: 'Sitio, tienda y panel de gestión para un gimnasio con más de veinte años de trayectoria.',
    includes: ['Landing page', 'Tienda virtual', 'Panel administrativo'],
    roadmap: ['SaaS de autogestión de rutinas'],
    image: imgGym78,
  },
]
