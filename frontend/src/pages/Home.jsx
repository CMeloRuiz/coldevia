import { useEffect } from 'react'
import Hero from '../sections/home/Hero'
import Stats from '../sections/home/Stats'
import WhyUs from '../sections/home/WhyUs'
import ServicesPreview from '../sections/home/ServicesPreview'
import TechCarousel from '../sections/home/TechCarousel'
import FeaturedProjects from '../sections/home/FeaturedProjects'
import Pricing from '../sections/home/Pricing'
import Steps from '../sections/home/Steps'
import Testimonials from '../sections/home/Testimonials'
import ContactForm from '../sections/home/ContactForm'

export default function Home() {
  useEffect(() => {
    document.title = 'ColdevIA · Desarrollo de software a la medida'
  }, [])

  return (
    <>
      <Hero />
      <Stats />
      <WhyUs />
      <ServicesPreview />
      <TechCarousel />
      <FeaturedProjects />
      <Pricing />
      <Steps />
      <Testimonials />
      <ContactForm />
    </>
  )
}
