import { Quote } from 'lucide-react'
import Marquee from '../../components/ui/Marquee'
import Reveal from '../../components/ui/Reveal'
import SectionHeading from '../../components/ui/SectionHeading'
import { TESTIMONIALS } from '../../data/testimonials'
import './Testimonials.css'

// Los testimonios son placeholders: se reemplazan en src/data/testimonials.js

export default function Testimonials() {
  return (
    <section className="section testimonials" aria-labelledby="testimonials-title">
      <Reveal className="container testimonials__head">
        <SectionHeading
          id="testimonials-title"
          eyebrow="Testimonios"
          title="Lo que dicen quienes ya trabajan con nosotros"
          reveal="up"
        />
      </Reveal>

      <Reveal variant="fade" delay={200} className="testimonials__track">
        {/* Carrusel automático: sin flechas, sin puntos, sin arrastre y sin pausa */}
        <Marquee direction="left" duration={70} gap={24} copies={2} label="Testimonios de clientes">
          {TESTIMONIALS.map((item) => (
            <li key={item.name} className="testimonial">
              <Quote className="testimonial__mark" aria-hidden="true" />
              <blockquote>
                <p>{item.quote}</p>
              </blockquote>
              <div className="testimonial__author">
                <img src={item.photo} alt="" width="52" height="52" loading="lazy" />
                <div>
                  <strong>{item.name}</strong>
                  <span>
                    {item.role} · {item.company}
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
