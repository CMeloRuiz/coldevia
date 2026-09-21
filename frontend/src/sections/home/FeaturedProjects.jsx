import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, Check } from 'lucide-react'
import Reveal from '../../components/ui/Reveal'
import SectionHeading from '../../components/ui/SectionHeading'
import { FEATURED_PROJECTS } from '../../data/projects'
import './FeaturedProjects.css'

// Para cambiar los proyectos, edita src/data/projects.js (no hace falta tocar este archivo).

const displayUrl = (url) => url.replace(/^https?:\/\//, '').replace(/\/$/, '')

function ProjectCard({ project, index }) {
  const { name, category, url, description, includes, roadmap, image } = project

  return (
    <li className="project" data-reveal="up" style={{ '--i': index }}>
      <a href={url} target="_blank" rel="noopener noreferrer" className="project__link">
        {/* Marco de navegador dibujado en CSS */}
        <div className="project__browser">
          <div className="project__bar" aria-hidden="true">
            <span />
            <span />
            <span />
            <p>{displayUrl(url)}</p>
          </div>
          <div className="project__media">
            <img src={image} alt={`Página de inicio de ${name}`} width="1340" height="594" loading="lazy" />
          </div>
        </div>

        <div className="project__body">
          <div className="project__head">
            <span className="project__category">{category}</span>
            <span className="project__arrow" aria-hidden="true">
              <ArrowUpRight />
            </span>
          </div>
          <h3>
            {name}
            <span className="sr-only"> (abre el sitio en una pestaña nueva)</span>
          </h3>
          <p className="project__desc">{description}</p>

          <div className="project__scope">
            <p className="project__label">Incluye hoy</p>
            <ul className="project__includes">
              {includes.map((item) => (
                <li key={item}>
                  <Check aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="project__roadmap">
            <span className="project__badge">Próxima etapa</span>
            <p>{roadmap.join(' · ')}</p>
          </div>
        </div>
      </a>
    </li>
  )
}

export default function FeaturedProjects() {
  return (
    <section className="section projects" aria-labelledby="projects-title">
      <div className="container">
        <Reveal className="projects__head">
          <SectionHeading
            id="projects-title"
            eyebrow="Proyectos destacados"
            title="Negocios reales que ya crecen con nosotros"
            reveal="up"
          />
          <Link to="/proyectos" className="text-link" data-reveal="up" style={{ '--i': 2 }}>
            Ver todos los proyectos
            <ArrowRight aria-hidden="true" />
          </Link>
        </Reveal>

        <Reveal as="ul" className="projects__grid" threshold={0.12}>
          {FEATURED_PROJECTS.map((project, index) => (
            <ProjectCard key={project.name} project={project} index={index} />
          ))}
        </Reveal>
      </div>
    </section>
  )
}
