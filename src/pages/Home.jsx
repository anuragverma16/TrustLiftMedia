import Hero from '../components/Hero'
import About from '../components/About'
import Stats from '../components/Stats'
import Services from '../components/Services'
import FeaturedWork from '../components/FeaturedWork'
import WhyChoose from '../components/WhyChoose'
import Testimonials from '../components/Testimonials'
import Blog from '../components/Blog'
import CTA from '../components/CTA'

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Stats />
      <Services />
      <FeaturedWork limit={3} />
      <WhyChoose />
      <Testimonials />
      <Blog />
      <CTA />
    </>
  )
}
