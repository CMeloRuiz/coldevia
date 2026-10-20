import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { SITE_URL } from '../data/site'
import { useLanguage } from '../i18n/language-context'

/**
 * Mantiene al día las etiquetas que dependen de la ruta y del idioma:
 * canonical, og:url y los hreflang.
 *
 * El sitio sirve los dos idiomas desde la misma dirección, así que la versión
 * en inglés se identifica con ?lang=en. Esa es la URL que se declara en el
 * hreflang "en" y la que lee LanguageProvider al abrir la página.
 */
const setLink = (rel, href, hreflang) => {
  const selector = hreflang ? `link[rel="${rel}"][hreflang="${hreflang}"]` : `link[rel="${rel}"]`
  let element = document.head.querySelector(selector)
  if (!element) {
    element = document.createElement('link')
    element.setAttribute('rel', rel)
    if (hreflang) element.setAttribute('hreflang', hreflang)
    document.head.appendChild(element)
  }
  element.setAttribute('href', href)
}

export function useCanonicalLinks() {
  const { pathname } = useLocation()
  const { language } = useLanguage()

  useEffect(() => {
    const path = pathname === '/' ? '/' : pathname
    const spanishUrl = `${SITE_URL}${path}`
    const englishUrl = `${spanishUrl}?lang=en`
    const canonical = language === 'en' ? englishUrl : spanishUrl

    setLink('canonical', canonical)
    setLink('alternate', spanishUrl, 'es')
    setLink('alternate', englishUrl, 'en')
    setLink('alternate', spanishUrl, 'x-default')

    const ogUrl = document.head.querySelector('meta[property="og:url"]')
    if (ogUrl) ogUrl.setAttribute('content', canonical)
  }, [pathname, language])
}
