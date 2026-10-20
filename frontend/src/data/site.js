// ============================================================================
// Datos generales del sitio: navegación, contacto, redes y países.
// Los textos visibles (etiquetas del menú, nombres de países, horario) están
// en los diccionarios de src/i18n/; aquí solo van datos y claves.
// TODO(cristhian): confirmar correo y URLs de redes sociales.
// ============================================================================

import flagColombia from '../assets/images/flags/colombia.webp'
import flagArgentina from '../assets/images/flags/argentina.webp'
import flagEeuu from '../assets/images/flags/eeuu.webp'

/** Dirección pública del sitio (canonical, sitemap, datos estructurados). */
export const SITE_URL = 'https://coldevia.com'

export const NAV_LINKS = [
  { id: 'services', labelKey: 'header.nav.services', to: '/servicios' },
  { id: 'projects', labelKey: 'header.nav.projects', to: '/proyectos' },
  { id: 'about', labelKey: 'header.nav.about', to: '/acerca-de' },
  // 'Precios' todavía no es una página: hace scroll a la sección del Home.
  { id: 'pricing', labelKey: 'header.nav.pricing', section: 'precios' },
]

export const CONTACT = {
  email: 'info@coldevia.com',
  phone: '+57 320 829 1613',
  phoneHref: 'tel:+573208291613',
  whatsappHref: 'https://wa.me/573208291613',
  // El horario se traduce: footer.hours
}

// TODO(cristhian): URLs reales de redes sociales.
export const SOCIALS = [
  { name: 'LinkedIn', href: 'https://www.linkedin.com/', icon: 'linkedin' },
  { name: 'Instagram', href: 'https://www.instagram.com/', icon: 'instagram' },
  { name: 'Facebook', href: 'https://www.facebook.com/', icon: 'facebook' },
  { name: 'GitHub', href: 'https://github.com/', icon: 'github' },
]

export const COUNTRIES = [
  {
    id: 'colombia',
    nameKey: 'footer.countryNames.colombia',
    address: 'Villapinzón (Cundinamarca)',
    phone: '+57 320 829 1613',
    phoneHref: 'tel:+573208291613',
    flag: flagColombia,
  },
  {
    id: 'argentina',
    nameKey: 'footer.countryNames.argentina',
    address: 'Palermo (CABA)',
    phone: '+54 11 6117-3398',
    phoneHref: 'tel:+541161173398',
    flag: flagArgentina,
  },
  {
    id: 'usa',
    nameKey: 'footer.countryNames.usa',
    address: 'Norfolk (Virginia)',
    phone: '+1 325 203 4791',
    phoneHref: 'tel:+13252034791',
    flag: flagEeuu,
  },
]
