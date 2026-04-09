import Navbar from '@/components/navbar/Navbar'
import Hero from '@/components/hero/Hero'
import Services from '@/components/services/Services'
import Portfolio from '@/components/portfolio/Portfolio'
import About from '@/components/about/About'
import Stats from '@/components/stats/Stats'
import Process from '@/components/process/Process'
import Testimonials from '@/components/testimonials/Testimonials'
import Sponsors from '@/components/sponsors/Sponsors'
import FAQ from '@/components/faq/FAQ'
import CTA from '@/components/cta/CTA'
import Footer from '@/components/footer/Footer'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Services />
      <Portfolio />
      <About />
      <Stats />
      <Process />
      <Testimonials />
      <Sponsors />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  )
}
