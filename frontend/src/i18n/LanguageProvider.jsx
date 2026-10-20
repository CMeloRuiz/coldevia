import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { es } from './es'
import { en } from './en'
import { DEFAULT_LANGUAGE, LANGUAGES, LANGUAGE_STORAGE_KEY, LanguageContext } from './language-context'
import { useCurrency } from '../context/currency-context'

const DICTIONARIES = { es, en }

const isValid = (code) => LANGUAGES.some((language) => language.code === code)

/**
 * Idioma inicial, por orden de prioridad:
 *   1. el parámetro ?lang= de la URL (lo usan las etiquetas hreflang),
 *   2. la elección guardada en localStorage,
 *   3. español.
 * A propósito NO se mira el idioma del navegador: el sitio siempre abre en
 * español salvo que la persona haya pedido inglés antes.
 */
const readInitialLanguage = () => {
  try {
    const fromUrl = new URLSearchParams(window.location.search).get('lang')
    if (isValid(fromUrl)) return fromUrl
  } catch {
    // URL no disponible (entornos sin window)
  }
  try {
    const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY)
    if (isValid(stored)) return stored
  } catch {
    // localStorage puede fallar en modo privado o con cookies bloqueadas
  }
  return DEFAULT_LANGUAGE
}

/** Recorre el diccionario con una ruta tipo "hero.titleLine1". */
const readPath = (dictionary, path) =>
  path.split('.').reduce((branch, key) => (branch == null ? undefined : branch[key]), dictionary)

export default function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(readInitialLanguage)
  const { currency, chosenByUser, suggestCurrency } = useCurrency()
  const previousLanguage = useRef(language)

  const setLanguage = useCallback((code) => {
    if (isValid(code)) setLanguageState(code)
  }, [])

  // Persistencia de la elección
  useEffect(() => {
    try {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language)
    } catch {
      // Sin almacenamiento, la elección vale solo para esta visita
    }
  }, [language])

  /**
   * Traduce una clave. Acepta variables entre llaves: t('x', { name: 'Ana' }).
   * Devuelve también arrays y objetos (listas de características, pasos, etc.).
   * Si falta en el idioma activo, cae al español antes que mostrar la clave.
   */
  const t = useCallback(
    (key, vars) => {
      let value = readPath(DICTIONARIES[language], key)
      if (value === undefined) value = readPath(es, key)
      if (value === undefined) {
        if (import.meta.env.DEV) console.warn(`[i18n] Falta la clave "${key}" en ${language}`)
        return key
      }
      if (typeof value === 'string' && vars) {
        return value.replace(/\{(\w+)\}/g, (match, name) => (vars[name] ?? match).toString())
      }
      return value
    },
    [language],
  )

  // Idioma del documento y descripción por defecto
  useEffect(() => {
    document.documentElement.lang = language
    const description = document.querySelector('meta[name="description"]')
    if (description) description.setAttribute('content', t('meta.description'))
  }, [language, t])

  /**
   * Si alguien pasa a inglés y nunca eligió moneda, se sugiere USD.
   * La moneda sigue siendo independiente del idioma: una vez que la persona
   * elige una, el idioma ya no la toca.
   */
  useEffect(() => {
    if (previousLanguage.current !== language && language === 'en' && !chosenByUser) {
      suggestCurrency('USD')
    }
    previousLanguage.current = language
  }, [language, chosenByUser, suggestCurrency])

  const value = useMemo(() => ({ language, setLanguage, t, currency }), [language, setLanguage, t, currency])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}
