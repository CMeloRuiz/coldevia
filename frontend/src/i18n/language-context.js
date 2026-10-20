import { createContext, useContext } from 'react'

export const LANGUAGES = [
  { code: 'es', label: 'ES', name: 'Español' },
  { code: 'en', label: 'EN', name: 'English' },
]

export const DEFAULT_LANGUAGE = 'es'
export const LANGUAGE_STORAGE_KEY = 'coldevia:language'

export const LanguageContext = createContext({
  language: DEFAULT_LANGUAGE,
  setLanguage: () => {},
  t: (key) => key,
})

/** Devuelve { language, setLanguage, t }. */
export const useLanguage = () => useContext(LanguageContext)

/** Atajo para componentes que solo necesitan traducir. */
export const useT = () => useContext(LanguageContext).t
