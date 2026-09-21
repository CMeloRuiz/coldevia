// ============================================================================
// Datos generales del sitio: navegación, contacto, redes y países.
// TODO(cristhian): reemplazar el correo, el teléfono y las URLs de redes por
// los valores reales antes de publicar.
// ============================================================================

import flagColombia from '../assets/images/flags/colombia.webp'
import flagArgentina from '../assets/images/flags/argentina.webp'
import flagEeuu from '../assets/images/flags/eeuu.webp'

export const NAV_LINKS = [
  { label: 'Servicios', to: '/servicios' },
  { label: 'Proyectos', to: '/proyectos' },
  { label: 'Acerca de', to: '/acerca-de' },
  // 'Precios' todavía no es una página: hace scroll a la sección del Home.
  { label: 'Precios', section: 'precios' },
]

export const CONTACT = {
  email: 'info@coldevia.com', // TODO(cristhian): confirmar correo
  phone: '+57 320 829 1613', // TODO(cristhian): teléfono real
  phoneHref: 'tel:+573000000000',
  whatsappHref: 'https://wa.me/573208291613', // TODO(cristhian): número real
  hours: 'Lunes a viernes · 8:00 a 18:00 (GMT-5)',
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
    name: 'Colombia',
    address: 'Villapinzón (Cundinamarca)',
    phone: '+57 320 829 1613',
    phoneHref: 'tel:+573208291613',
    flag: flagColombia,
  },
  {
    name: 'Argentina',
    address: 'Concepción Arenal 3505 (CABA)',
    phone: '+54 11 6117-3398',
    phoneHref: 'tel:+541161173398',
    flag: flagArgentina,
  },
  {
    name: 'Estados Unidos',
    address: 'Norfolk (Virginia)',
    phone: '+1 325 203 4791',
    phoneHref: 'tel:+13252034791',
    flag: flagEeuu,
  },
]
