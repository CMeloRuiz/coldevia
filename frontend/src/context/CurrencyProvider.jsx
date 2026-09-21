import { useCallback, useEffect, useMemo, useState } from 'react'
import { CURRENCIES, DEFAULT_CURRENCY } from '../data/currencies'
import { CURRENCY_STORAGE_KEY, CurrencyContext } from './currency-context'

const isValid = (code) => CURRENCIES.some((currency) => currency.code === code)

// Lee la preferencia guardada antes del primer render (evita el parpadeo de
// mostrar COP y cambiar a la moneda elegida un instante después).
const readStoredCurrency = () => {
  try {
    const stored = window.localStorage.getItem(CURRENCY_STORAGE_KEY)
    if (isValid(stored)) return stored
  } catch {
    // localStorage puede fallar en modo privado o con las cookies bloqueadas
  }
  return DEFAULT_CURRENCY
}

/** Mantiene la moneda elegida y la persiste en localStorage. */
export default function CurrencyProvider({ children }) {
  const [currency, setCurrencyState] = useState(readStoredCurrency)

  const setCurrency = useCallback((code) => {
    if (!isValid(code)) return
    setCurrencyState(code)
  }, [])

  useEffect(() => {
    try {
      window.localStorage.setItem(CURRENCY_STORAGE_KEY, currency)
    } catch {
      // Si no se puede guardar, la selección vale solo para esta visita
    }
  }, [currency])

  const value = useMemo(() => ({ currency, setCurrency }), [currency, setCurrency])

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>
}
