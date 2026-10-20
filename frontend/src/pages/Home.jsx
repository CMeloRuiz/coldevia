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
import { useT } from '../i18n/language-context'
import { usePageTitle } from '../hooks/usePageTitle'

export default function Home() {
  const t = useT()
  usePageTitle(t('meta.title'))

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
