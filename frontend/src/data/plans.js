// ============================================================================
// PLANES Y PRECIOS
// `prices` guarda el monto de cada plan en las tres monedas del selector del
// header. El formato (separador de miles) lo resuelve formatAmount() según la
// moneda elegida, en src/data/currencies.js.
// Los nombres, lemas y características están en los diccionarios, bajo
// pricing.plans.<id> (src/i18n/es.js y en.js).
// ============================================================================

export const PLANS = [
  { id: 'basico', prices: { COP: 500000, ARS: 250000, USD: 200 } },
  { id: 'business', prices: { COP: 1000000, ARS: 500000, USD: 350 }, highlighted: true },
  { id: 'profesional', prices: { COP: 2000000, ARS: 1000000, USD: 700 } },
]
