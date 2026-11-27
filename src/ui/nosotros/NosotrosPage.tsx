import { Footer } from '@/ui/layout/Footer'
import { Header } from '@/ui/layout/Header'
import { nosotrosJsonLd } from './data/nosotros'
import { Differentiators } from './sections/Differentiators'
import { ForWhom } from './sections/ForWhom'
import { Hero } from './sections/Hero'
import { HowWeWork } from './sections/HowWeWork'
import { KeyFacts } from './sections/KeyFacts'
import { NosotrosFaq } from './sections/NosotrosFaq'
import { SenaRecovery } from './sections/SenaRecovery'
import { Team } from './sections/Team'
import { WhatWeDo } from './sections/WhatWeDo'
import { WhoWeAre } from './sections/WhoWeAre'

// Orden aprobado el 2026-11-25 (sena-brain, 06_Comunicacion/landings/nosotros.md): "Quiénes somos" abre la
// página; la historia del nombre baja a la sección de equipo.
export const NosotrosPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(nosotrosJsonLd) }}
      />
      <Header variant="primary" />
      <main className="grow">
        <div className="bg-surface-secondary">
          <div className="max-w-[1280px] mx-auto">
            <Hero />
          </div>
        </div>
        <WhoWeAre />
        <WhatWeDo />
        <Differentiators />
        <ForWhom />
        <HowWeWork />
        <Team />
        <KeyFacts />
        <NosotrosFaq />
        <SenaRecovery />
      </main>
      <Footer />
    </div>
  )
}
