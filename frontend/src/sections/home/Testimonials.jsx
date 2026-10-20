import { Quote } from 'lucide-react'
import Marquee from '../../components/ui/Marquee'
import Reveal from '../../components/ui/Reveal'
import SectionHeading from '../../components/ui/SectionHeading'
import { TESTIMONIALS } from '../../data/testimonials'
import { useT } from '../../i18n/language-context'
import './Testimonials.css'

// Los testimonios son placeholders: nombre y empresa en src/data/testimonials.js,
// frase y cargo en los diccionarios (testimonials.items.<id>).

export default function Testimonials() {
  const t = useT()

  return (
    <section className="section testimonials" aria-labelledby="testimonials-title">
      <Reveal className="container testimonials__head">
        <SectionHeading
          id="testimonials-title"
          eyebrow={t('testimonials.eyebrow')}
          title={t('testimonials.title')}
          reveal="up"
        />
      </Reveal>

      <Reveal variant="fade" delay={200} className="testimonials__track">
        {/* Carrusel automático: sin flechas, sin puntos, sin arrastre y sin pausa */}
        <Marquee direction="left" duration={70} gap={24} copies={2} label={t('testimonials.carouselAria')}>
          {TESTIMONIALS.map((item) => (
            <li key={item.id} className="testimonial">
              <Quote className="testimonial__mark" aria-hidden="true" />
              <blockquote>
                <p>{t(`testimonials.items.${item.id}.quote`)}</p>
              </blockquote>
              <div className="testimonial__author">
                <img src={item.photo} alt="" width="52" height="52" loading="lazy" />
                <div>
                  <strong>{item.name}</strong>
                  <span>
                    {t(`testimonials.items.${item.id}.role`)} · {item.company}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </Marquee>
      </Reveal>
    </section>
  )
}
