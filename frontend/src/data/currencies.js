// ============================================================================
// MONEDAS
// El selector del header cambia la moneda con la que se muestran los planes.
// `locale` define el separador de miles de cada país.
// ============================================================================

import flagColombia from '../assets/images/flags/colombia.webp'
import flagArgentina from '../assets/images/flags/argentina.webp'
import flagEeuu from '../assets/images/flags/eeuu.webp'

export const CURRENCIES = [
  {
    code: 'COP',
    name: 'Peso colombiano',
    country: 'Colombia',
    symbol: '$',
    locale: 'es-CO',
    flag: flagColombia,
  },
  {
    code: 'ARS',
    name: 'Peso argentino',
    country: 'Argentina',
    symbol: '$',
    locale: 'es-AR',
    flag: flagArgentina,
  },
  {
    code: 'USD',
    name: 'Dólar estadounidense',
    country: 'Estados Unidos',
    symbol: '$',
    locale: 'en-US',
    flag: flagEeuu,
  },
]

export const DEFAULT_CURRENCY = 'COP'

export const getCurrency = (code) =>
  CURRENCIES.find((currency) => currency.code === code) ??
  CURRENCIES.find((currency) => currency.code === DEFAULT_CURRENCY)

/** Formatea un monto con el separador de miles que corresponde a la moneda. */
export const formatAmount = (amount, code) => {
  const currency = getCurrency(code)
  return new Intl.NumberFormat(currency.locale, { maximumFractionDigits: 0 }).format(amount)
}
