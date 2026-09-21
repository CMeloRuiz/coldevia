import { Link } from 'react-router-dom'
import { Clock, Mail, Phone } from 'lucide-react'
import logo from '../../assets/images/logo_header.png'
import { CONTACT, COUNTRIES, SOCIALS } from '../../data/site'
import { SERVICES } from '../../data/services'
import Reveal from '../ui/Reveal'
import { FacebookIcon, GithubIcon, InstagramIcon, LinkedinIcon, WhatsappIcon } from '../ui/BrandIcons'
import './Footer.css'

const SOCIAL_ICONS = {
  linkedin: LinkedinIcon,
  instagram: InstagramIcon,
  facebook: FacebookIcon,
  github: GithubIcon,
}

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="container">
        <Reveal className="footer-grid">
          <div className="footer-brand" data-reveal="up">
            <Link to="/" aria-label="ColdevIA, ir al inicio" className="footer-brand__logo">
              <img src={logo} alt="ColdevIA" width="408" height="140" loading="lazy" />
            </Link>
            <p>
              Desarrollamos software a la medida para empresas que quieren vender más, operar mejor y crecer con
              tecnología.
            </p>
            <ul className="footer-social" aria-label="Redes sociales">
              {SOCIALS.map(({ name, href, icon }) => {
                const Icon = SOCIAL_ICONS[icon]
                return (
                  <li key={name}>
                    <a href={href} target="_blank" rel="noreferrer" aria-label={name}>
                      <Icon />
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>

          <div className="footer-col" data-reveal="up" style={{ '--i': 1 }}>
            <h3>Servicios</h3>
            <ul>
              {SERVICES.map((service) => (
                <li key={service.title}>
                  <Link to="/servicios">{service.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col" data-reveal="up" style={{ '--i': 2 }}>
            <h3>Contacto</h3>
            <ul className="footer-contact">
              <li>
                <Mail aria-hidden="true" />
                <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
              </li>
              <li>
                <Phone aria-hidden="true" />
                <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
              </li>
              <li>
                <WhatsappIcon />
                <a href={CONTACT.whatsappHref} target="_blank" rel="noreferrer">
                  WhatsApp
                </a>
              </li>
              <li>
                <Clock aria-hidden="true" />
                <span>{CONTACT.hours}</span>
              </li>
            </ul>
          </div>

          <div className="footer-col" data-reveal="up" style={{ '--i': 3 }}>
            <h3>Operamos en</h3>
            <ul className="footer-countries">
              {COUNTRIES.map((country) => (
                <li key={country.name}>
                  <img src={country.flag} alt="" width="24" height="16" loading="lazy" />
                  <div>
                    <strong>{country.name}</strong>
                    <span>{country.address}</span>
                    <a href={country.phoneHref}>{country.phone}</a>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <div className="footer-bottom">
          <p>© {year} ColdevIA. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
