import { Header } from '../layout/Header'
import { homeFaqJsonLd } from './data/faqs'
import { CaseSection } from './sections/CaseForm/CaseSection'
import { Clients } from './sections/Clients'
import { DirectCollection } from './sections/DirectCollection'
import { Faq } from './sections/Faq'
import { Hero } from './sections/Hero'
import { HomeFooter } from './sections/HomeFooter'
import { Modalities } from './sections/Modalities'
import { Pricing } from './sections/Pricing'
import { RecuperaBand } from './sections/RecuperaBand'
import { Service } from './sections/Service'
import { ServiceDemo } from './sections/ServiceDemo'

// Componente de servidor: todo el contenido (las tres etapas de la demo y las respuestas de la FAQ) va en el
// HTML inicial. Solo la demo y el formulario se hidratan.
export const HomePage = () => (
  <div className="min-h-screen flex flex-col font-adobe text-brand-primary-dark text-[17px] leading-[1.55]">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homeFaqJsonLd) }} />
    <Header variant="primary" />
    <main className="grow">
      <Hero />
      <Clients />
      <Service />
      <Modalities />
      <RecuperaBand />
      <ServiceDemo />
      <DirectCollection />
      <Pricing />
      <Faq />
      <CaseSection />
    </main>
    <HomeFooter />
  </div>
)
