import { Footer } from '@/ui/layout/Footer'
import { Header } from '@/ui/layout/Header'
import { Hero } from './sections/Hero'
import { OurInspiration } from './sections/OurInspiration'
import { OurTeamIntro } from './sections/OurTeamIntro'
import { SenaRecovery } from './sections/SenaRecovery'
import { WhoWeAre } from './sections/WhoWeAre'

export const NosotrosPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header variant="primary" />
      <div className="grow">
        <div className="bg-surface-secondary">
          <div className="max-w-[1280px] mx-auto">
            <Hero />
          </div>
        </div>
        <OurInspiration />
        <WhoWeAre />
        <OurTeamIntro />
        <SenaRecovery />
      </div>
      <Footer />
    </div>
  )
}
