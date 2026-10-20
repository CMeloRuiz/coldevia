import { useCallback, useEffect, useMemo, useState } from 'react'
import { CURRENCIES, DEFAULT_CURRENCY } from '../data/currencies'
import { CURRENCY_STORAGE_KEY, CurrencyContext } from './currency-context'

const isValid = (code) => CURRENCIES.some((currency) => currency.code === code)

const readStoredCurrency = () => {
  try {
    const stored = window.localStorage.getItem(CURRENCY_STORAGE_KEY)
    if (isValid(stored)) return stored
  } catch {
    // localStorage puede fallar en modo privado o con las cookies bloqueadas
  }
  return null
}

/** Mantiene la moneda elegida y la persiste en localStorage. */
export default function CurrencyProvider({ children }) {
  // Lee la preferencia guardada antes del primer render (evita el parpadeo de
  // mostrar COP y cambiar a la moneda elegida un instante después).
  const [currency, setCurrencyState] = useState(() => readStoredCurrency() ?? DEFAULT_CURRENCY)
  // true si la moneda actual la eligió la persona (guardada o en esta visita).
  // El cambio de idioma solo sugiere moneda cuando esto es false.
  const [chosenByUser, setChosenByUser] = useState(() => readStoredCurrency() !== null)

  const setCurrency = useCallback((code) => {
    if (!isValid(code)) return
    setCurrencyState(code)
    setChosenByUser(true)
  }, [])

  /** Cambia la moneda sin marcarla como elección propia (ver LanguageProvider). */
  const suggestCurrency = useCallback((code) => {
    if (!isValid(code)) return
    setCurrencyState((current) => (current === code ? current : code))
  }, [])

  useEffect(() => {
    try {
      window.localStorage.setItem(CURRENCY_STORAGE_KEY, currency)
    } catch {
      // Si no se puede guardar, la selección vale solo para esta visita
    }
  }, [currency])

  const value = useMemo(
    () => ({ currency, setCurrency, suggestCurrency, chosenByUser }),
    [currency, setCurrency, suggestCurrency, chosenByUser],
  )

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>
}
