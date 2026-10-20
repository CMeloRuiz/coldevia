import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, Check } from 'lucide-react'
import Reveal from '../../components/ui/Reveal'
import SectionHeading from '../../components/ui/SectionHeading'
import { FEATURED_PROJECTS } from '../../data/projects'
import { useT } from '../../i18n/language-context'
import './FeaturedProjects.css'

// Enlace e imagen: src/data/projects.js · Textos: projects.items.<id> en los diccionarios

const displayUrl = (url) => url.replace(/^https?:\/\//, '').replace(/\/$/, '')

function ProjectCard({ project, index, t }) {
  const { id, name, url, image } = project
  const includes = t(`projects.items.${id}.includes`)
  const roadmap = t(`projects.items.${id}.roadmap`)

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
            <img src={image} alt={t('projects.imageAlt', { name })} width="1340" height="594" loading="lazy" />
          </div>
        </div>

        <div className="project__body">
          <div className="project__head">
            <span className="project__category">{t(`projects.items.${id}.category`)}</span>
            <span className="project__arrow" aria-hidden="true">
              <ArrowUpRight />
            </span>
          </div>
          <h3>
            {name}
            <span className="sr-only">{t('projects.newTab')}</span>
          </h3>
          <p className="project__desc">{t(`projects.items.${id}.description`)}</p>

          <div className="project__scope">
            <p className="project__label">{t('projects.includesLabel')}</p>
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
            <span className="project__badge">{t('projects.roadmapLabel')}</span>
            <p>{roadmap.join(' · ')}</p>
          </div>
        </div>
      </a>
    </li>
  )
}

export default function FeaturedProjects() {
  const t = useT()

  return (
    <section className="section projects" aria-labelledby="projects-title">
      <div className="container">
        <Reveal className="projects__head">
          <SectionHeading
            id="projects-title"
            eyebrow={t('projects.eyebrow')}
            title={t('projects.title')}
            reveal="up"
          />
          <Link to="/proyectos" className="text-link" data-reveal="up" style={{ '--i': 2 }}>
            {t('projects.allLink')}
            <ArrowRight aria-hidden="true" />
          </Link>
        </Reveal>

        <Reveal as="ul" className="projects__grid" threshold={0.12}>
          {FEATURED_PROJECTS.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} t={t} />
          ))}
        </Reveal>
      </div>
    </section>
  )
}
