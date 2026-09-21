import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import './ComingSoon.css'

// Página temporal para las rutas que todavía no se construyen.
export default function ComingSoon({ title }) {
  useEffect(() => {
    document.title = `${title} · ColdevIA`
  }, [title])

  return (
    <section className="coming-soon">
      <div className="container coming-soon__inner">
        <span className="eyebrow eyebrow--light">Próximamente</span>
        <h1>{title}</h1>
        <p>Estamos preparando esta sección. Mientras tanto, conoce todo lo que hacemos desde el inicio.</p>
        <Link to="/" className="btn btn--light">
          <ArrowLeft aria-hidden="true" />
          Volver al inicio
        </Link>
      </div>
    </section>
  )
}
