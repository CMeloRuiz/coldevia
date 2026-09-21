import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import ScrollManager from './ScrollManager'
import { useIntroSequence } from '../../hooks/useIntroSequence'

export default function Layout() {
  useIntroSequence()

  return (
    <div className="app-shell">
      <a href="#contenido" className="skip-link">
        Saltar al contenido
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
