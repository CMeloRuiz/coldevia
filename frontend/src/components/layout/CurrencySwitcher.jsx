import { useEffect, useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { CURRENCIES, getCurrency } from '../../data/currencies'
import { useCurrency } from '../../context/currency-context'
import './CurrencySwitcher.css'

/**
 * Selector de moneda del header.
 *
 * Muestra la bandera del país de la moneda activa y despliega las tres
 * opciones. Se cierra con Escape o al hacer clic afuera, y se puede recorrer
 * con las flechas del teclado.
 */
export default function CurrencySwitcher({ variant = 'bar', onSelect, ...rest }) {
  const { currency, setCurrency } = useCurrency()
  const [isOpen, setIsOpen] = useState(false)
  const rootRef = useRef(null)
  const buttonRef = useRef(null)
  const listRef = useRef(null)
  const active = getCurrency(currency)

  useEffect(() => {
    if (!isOpen) return undefined

    const onPointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) setIsOpen(false)
    }
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
        buttonRef.current?.focus()
      }
    }

    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen])

  const choose = (code) => {
    setCurrency(code)
    setIsOpen(false)
    buttonRef.current?.focus()
    onSelect?.(code)
  }

  // Flechas arriba/abajo para moverse entre las opciones abiertas
  const onListKeyDown = (event) => {
    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return
    event.preventDefault()
    const options = Array.from(listRef.current?.querySelectorAll('button') ?? [])
    const index = options.indexOf(document.activeElement)
    const next = event.key === 'ArrowDown' ? index + 1 : index - 1
    options[(next + options.length) % options.length]?.focus()
  }

  return (
    <div className={`currency currency--${variant} ${isOpen ? 'is-open' : ''}`} ref={rootRef} {...rest}>
      <button
        type="button"
        ref={buttonRef}
        className="currency__trigger"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={`Moneda: ${active.name}. Cambiar moneda`}
        onClick={() => setIsOpen((open) => !open)}
      >
        <img className="currency__flag" src={active.flag} alt="" width="28" height="28" />
        <span className="currency__code">{active.code}</span>
        <ChevronDown className="currency__chevron" aria-hidden="true" />
      </button>

      <ul
        className="currency__list"
        role="listbox"
        aria-label="Moneda de los precios"
        ref={listRef}
        onKeyDown={onListKeyDown}
        inert={!isOpen}
      >
        {CURRENCIES.map((item) => (
          <li key={item.code} role="option" aria-selected={item.code === currency}>
            <button type="button" className="currency__option" onClick={() => choose(item.code)}>
              <img className="currency__flag" src={item.flag} alt="" width="28" height="28" />
              <span className="currency__option-text">
                <strong>{item.code}</strong>
                <small>{item.country}</small>
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
