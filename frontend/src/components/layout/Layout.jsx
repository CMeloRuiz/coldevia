import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import ScrollManager from './ScrollManager'
import { useIntroSequence } from '../../hooks/useIntroSequence'
import { useCanonicalLinks } from '../../hooks/useCanonicalLinks'
import { useT } from '../../i18n/language-context'

export default function Layout() {
  useIntroSequence()
  useCanonicalLinks()
  const t = useT()

  return (
    <div className="app-shell">
      <a href="#contenido" className="skip-link">
        {t('pages.skipLink')}
      </a>
      <ScrollManager />
      <Header />
      <main id="contenido">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
