import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { LogosStrip } from './components/LogosStrip'
import { Features } from './components/Features'
import { HowItWorks } from './components/HowItWorks'
import { Testimonials } from './components/Testimonials'
import { Pricing } from './components/Pricing'
import { FAQ } from './components/FAQ'
import { FinalCTA } from './components/FinalCTA'
import { Footer } from './components/Footer'

export default function App() {
  return (
    <div className="relative min-h-screen bg-page text-fg">
      <Navbar />
      <main>
        <Hero />
        <LogosStrip />
        <Features />
        <HowItWorks />
        <Testimonials />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  )
}
