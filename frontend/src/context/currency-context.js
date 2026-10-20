import { createContext, useContext } from 'react'
import { DEFAULT_CURRENCY } from '../data/currencies'

export const CurrencyContext = createContext({
  currency: DEFAULT_CURRENCY,
  setCurrency: () => {},
  suggestCurrency: () => {},
  chosenByUser: false,
})

/** Devuelve la moneda activa y la función para cambiarla. */
export const useCurrency = () => useContext(CurrencyContext)

export const CURRENCY_STORAGE_KEY = 'coldevia:currency'
