import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import './ComingSoon.css'

export default function NotFound() {
  return (
    <section className="coming-soon">
      <div className="container coming-soon__inner">
        <span className="eyebrow eyebrow--light">Error 404</span>
        <h1>Página no encontrada</h1>
        <p>La dirección que buscas no existe o cambió de lugar.</p>
        <Link to="/" className="btn btn--light">
          <ArrowLeft aria-hidden="true" />
          Volver al inicio
        </Link>
      </div>
    </section>
  )
}
