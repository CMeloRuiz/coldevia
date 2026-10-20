// ============================================================================
// PROYECTOS DESTACADOS DEL HOME
// ----------------------------------------------------------------------------
// Aquí va solo lo estructural: enlace e imagen. Los textos (categoría,
// descripción, "incluye hoy" y "próxima etapa") viven en los diccionarios,
// bajo projects.items.<id>, para poder mostrarlos en español e inglés.
//
// Para cambiar un proyecto:
//   1. Coloca la captura en src/assets/images/projects/ (webp, recorte ancho
//      tipo 2.2:1 con la parte superior del sitio).
//   2. Ajusta `url` e `image` aquí y los textos en src/i18n/es.js y en.js.
// ============================================================================

import imgGonzalez from '../assets/images/projects/proyecto-comercializadora-gonzalez.webp'
import imgGma from '../assets/images/projects/proyecto-grupo-medicos-asociados.webp'
import imgSpotnear from '../assets/images/projects/proyecto-spotnear.webp'

export const FEATURED_PROJECTS = [
  {
    id: 'gonzalez',
    name: 'Comercializadora González',
    url: 'https://comercializadoragonzalez-ferreteria.com/',
    image: imgGonzalez,
  },
  {
    id: 'gma',
    name: 'Grupo Médicos Asociados',
    url: 'https://grupomedicosasociados.com/',
    image: imgGma,
  },
  {
    id: 'spotnear',
    name: 'SpotNear',
    url: 'https://spotnear-frontend.onrender.com/',
    image: imgSpotnear,
  },
]
