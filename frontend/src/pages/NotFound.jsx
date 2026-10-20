import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { useT } from '../i18n/language-context'
import { usePageTitle } from '../hooks/usePageTitle'
import './ComingSoon.css'

export default function NotFound() {
  const t = useT()
  usePageTitle(`${t('pages.notFoundTitle')} · ColdevIA`)

  return (
    <section className="coming-soon">
      <div className="container coming-soon__inner">
        <span className="eyebrow eyebrow--light">{t('pages.notFoundEyebrow')}</span>
        <h1>{t('pages.notFoundTitle')}</h1>
        <p>{t('pages.notFoundText')}</p>
        <Link to="/" className="btn btn--light">
          <ArrowLeft aria-hidden="true" />
          {t('pages.backHome')}
        </Link>
      </div>
    </section>
  )
}
