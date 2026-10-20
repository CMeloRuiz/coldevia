import { Link } from 'react-router-dom'
import { Clock, Mail, Phone } from 'lucide-react'
import logo from '../../assets/images/logo_header.png'
import { CONTACT, COUNTRIES, SOCIALS } from '../../data/site'
import { SERVICES } from '../../data/services'
import { useT } from '../../i18n/language-context'
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
  const t = useT()
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="container">
        <Reveal className="footer-grid">
          <div className="footer-brand" data-reveal="up">
            <Link to="/" aria-label={t('header.logoAria')} className="footer-brand__logo">
              <img src={logo} alt="ColdevIA" width="408" height="140" loading="lazy" />
            </Link>
            <p>{t('footer.tagline')}</p>
            <ul className="footer-social" aria-label={t('footer.socialAria')}>
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
            <h3>{t('footer.services')}</h3>
            <ul>
              {SERVICES.map((service) => (
                <li key={service.id}>
                  <Link to="/servicios">{t(`services.items.${service.id}.title`)}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col" data-reveal="up" style={{ '--i': 2 }}>
            <h3>{t('footer.contact')}</h3>
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
                  {t('footer.whatsapp')}
                </a>
              </li>
              <li>
                <Clock aria-hidden="true" />
                <span>{t('footer.hours')}</span>
              </li>
            </ul>
          </div>

          <div className="footer-col" data-reveal="up" style={{ '--i': 3 }}>
            <h3>{t('footer.countries')}</h3>
            <ul className="footer-countries">
              {COUNTRIES.map((country) => (
                <li key={country.id}>
                  <img src={country.flag} alt="" width="24" height="16" loading="lazy" />
                  <div>
                    <strong>{t(country.nameKey)}</strong>
                    <span>{country.address}</span>
                    <a href={country.phoneHref}>{country.phone}</a>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <div className="footer-bottom">
          <p>{t('footer.rights', { year })}</p>
        </div>
      </div>
    </footer>
  )
}
