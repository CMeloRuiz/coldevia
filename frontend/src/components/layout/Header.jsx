import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import logo from '../../assets/images/logo_header.png'
import { NAV_LINKS } from '../../data/site'
import { useSectionNavigation } from '../../hooks/useSectionNavigation'
import { useLanguage } from '../../i18n/language-context'
import CurrencySwitcher from './CurrencySwitcher'
import LanguageSwitcher from './LanguageSwitcher'
import './Header.css'

/**
 * Destino del botón "Contacto".
 *
 * Mientras no exista la página /contacto, el botón lleva al formulario del
 * final del Home (sección con id="contacto"). El desplazamiento respeta el
 * header fijo gracias a `scroll-margin-top` en `.section` (ver index.css).
 *
 * PARA CAMBIARLO A LA PÁGINA DEDICADA: reemplaza esta constante por
 *   const CONTACT_TARGET = { type: 'route', to: '/contacto' }
 * El resto del componente ya contempla las dos variantes.
 */
const CONTACT_TARGET = { type: 'section', id: 'contacto' }

/**
 * Header dinámico.
 *
 * Un elemento centinela de 24 px al inicio de la página se observa con
 * IntersectionObserver: cuando deja de verse (el usuario scrolleó), el header
 * recibe la clase `is-scrolled` y CSS anima la transición a la "píldora" de
 * vidrio esmerilado con 20 px de margen lateral. Al volver al tope, vuelve al
 * estado inicial con la misma transición.
 */
export default function Header() {
  const sentinelRef = useRef(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [menuPath, setMenuPath] = useState(null)
  const { pathname } = useLocation()
  const goToSection = useSectionNavigation()
  const { t } = useLanguage()

  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel || !('IntersectionObserver' in window)) return undefined

    const observer = new IntersectionObserver(([entry]) => setIsScrolled(!entry.isIntersecting))
    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [])

  // El menú móvil se cierra solo al cambiar de ruta.
  const menuOpen = isMenuOpen && menuPath === pathname

  const openMenu = () => {
    setMenuPath(pathname)
    setIsMenuOpen((open) => !open)
  }
  const closeMenu = () => setIsMenuOpen(false)

  useEffect(() => {
    if (!menuOpen) return undefined
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setIsMenuOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  const handleSectionClick = (event, id) => {
    event.preventDefault()
    closeMenu()
    goToSection(id)
  }

  const renderLink = (item) =>
    item.section ? (
      <a href={`/#${item.section}`} onClick={(event) => handleSectionClick(event, item.section)}>
        {t(item.labelKey)}
      </a>
    ) : (
      <NavLink to={item.to} onClick={closeMenu}>
        {t(item.labelKey)}
      </NavLink>
    )

  /** Botón de contacto: sección del Home o ruta propia, según CONTACT_TARGET. */
  const renderContactButton = (className, extra = {}) =>
    CONTACT_TARGET.type === 'section' ? (
      <a
        href={`/#${CONTACT_TARGET.id}`}
        className={className}
        onClick={(event) => handleSectionClick(event, CONTACT_TARGET.id)}
        {...extra}
      >
        {t('header.contact')}
        <ArrowUpRight aria-hidden="true" />
      </a>
    ) : (
      <Link to={CONTACT_TARGET.to} className={className} onClick={closeMenu} {...extra}>
        {t('header.contact')}
        <ArrowUpRight aria-hidden="true" />
      </Link>
    )

  const classes = ['site-header', isScrolled && 'is-scrolled', menuOpen && 'is-open']
    .filter(Boolean)
    .join(' ')

  return (
    <>
      <div ref={sentinelRef} className="header-sentinel" aria-hidden="true" />

      <header className={classes}>
        <div className="site-header__bar">
          <Link
            to="/"
            className="site-header__logo"
            aria-label={t('header.logoAria')}
            onClick={closeMenu}
            data-intro="lift"
            style={{ '--intro-delay': '0.46s', '--intro-dur': '0.62s' }}
          >
            <img src={logo} alt="ColdevIA" width="408" height="140" />
          </Link>

          <nav className="site-header__nav" aria-label={t('header.navAria')}>
            <ul>
              {NAV_LINKS.map((item, index) => (
                <li
                  key={item.id}
                  data-intro="lift"
                  style={{ '--intro-delay': `${0.54 + index * 0.045}s`, '--intro-dur': '0.55s' }}
                >
                  {renderLink(item)}
                </li>
              ))}
            </ul>
          </nav>

          {/* Idioma y moneda son independientes entre sí */}
          <LanguageSwitcher
            variant="bar"
            data-intro="lift"
            style={{ '--intro-delay': '0.69s', '--intro-dur': '0.55s' }}
          />
          <CurrencySwitcher
            variant="bar"
            data-intro="lift"
            style={{ '--intro-delay': '0.71s', '--intro-dur': '0.55s' }}
          />

          {renderContactButton('btn btn--primary site-header__cta', {
            'data-intro': 'settle',
            style: { '--intro-delay': '0.73s', '--intro-dur': '0.55s' },
          })}

          <button
            type="button"
            className="site-header__toggle"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? t('header.closeMenu') : t('header.openMenu')}
            onClick={openMenu}
            data-intro="lift"
            style={{ '--intro-delay': '0.68s', '--intro-dur': '0.55s' }}
          >
            {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>

        <div id="mobile-menu" className="mobile-menu" inert={!menuOpen}>
          <ul>
            {NAV_LINKS.map((item) => (
              <li key={item.id}>{renderLink(item)}</li>
            ))}
          </ul>
          <LanguageSwitcher variant="menu" onSelect={closeMenu} />
          <CurrencySwitcher variant="menu" onSelect={closeMenu} />
          {renderContactButton('btn btn--primary btn--block')}
        </div>
      </header>
    </>
  )
}
