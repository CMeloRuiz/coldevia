import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { useT } from '../i18n/language-context'
import { usePageTitle } from '../hooks/usePageTitle'
import './ComingSoon.css'

// Página temporal para las rutas que todavía no se construyen.
// `titleKey` apunta a pages.titles.<clave> en los diccionarios.
export default function ComingSoon({ titleKey }) {
  const t = useT()
  const title = t(`pages.titles.${titleKey}`)
  usePageTitle(`${title} · ColdevIA`)

  return (
    <section className="coming-soon">
      <div className="container coming-soon__inner">
        <span className="eyebrow eyebrow--light">{t('pages.comingSoonEyebrow')}</span>
        <h1>{title}</h1>
        <p>{t('pages.comingSoonText')}</p>
        <Link to="/" className="btn btn--light">
          <ArrowLeft aria-hidden="true" />
          {t('pages.backHome')}
        </Link>
      </div>
    </section>
  )
}
