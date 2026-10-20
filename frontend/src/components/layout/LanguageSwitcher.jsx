import { useEffect, useRef, useState } from 'react'
import { ChevronDown, Languages } from 'lucide-react'
import { LANGUAGES, useLanguage } from '../../i18n/language-context'
import './LanguageSwitcher.css'

/**
 * Selector de idioma del header (ES / EN).
 *
 * Mismo comportamiento que el selector de moneda: se cierra con Escape o al
 * hacer clic afuera y se recorre con las flechas del teclado. Es independiente
 * de la moneda: se puede ver el sitio en inglés con precios en pesos.
 */
export default function LanguageSwitcher({ variant = 'bar', onSelect, ...rest }) {
  const { language, setLanguage, t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const rootRef = useRef(null)
  const buttonRef = useRef(null)
  const listRef = useRef(null)
  const active = LANGUAGES.find((item) => item.code === language) ?? LANGUAGES[0]

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
    setLanguage(code)
    setIsOpen(false)
    buttonRef.current?.focus()
    onSelect?.(code)
  }

  const onListKeyDown = (event) => {
    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return
    event.preventDefault()
    const options = Array.from(listRef.current?.querySelectorAll('button') ?? [])
    const index = options.indexOf(document.activeElement)
    const next = event.key === 'ArrowDown' ? index + 1 : index - 1
    options[(next + options.length) % options.length]?.focus()
  }

  return (
    <div className={`lang lang--${variant} ${isOpen ? 'is-open' : ''}`} ref={rootRef} {...rest}>
      <button
        type="button"
        ref={buttonRef}
        className="lang__trigger"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={t('header.language.ariaLabel', { name: active.name })}
        onClick={() => setIsOpen((open) => !open)}
      >
        <Languages className="lang__icon" aria-hidden="true" />
        <span className="lang__code">{active.label}</span>
        <ChevronDown className="lang__chevron" aria-hidden="true" />
      </button>

      <ul
        className="lang__list"
        role="listbox"
        aria-label={t('header.language.listLabel')}
        ref={listRef}
        onKeyDown={onListKeyDown}
        inert={!isOpen}
      >
        {LANGUAGES.map((item) => (
          <li key={item.code} role="option" aria-selected={item.code === language}>
            <button type="button" className="lang__option" onClick={() => choose(item.code)} lang={item.code}>
              <strong>{item.label}</strong>
              <span>{item.name}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
