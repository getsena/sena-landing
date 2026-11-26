import { LINKEDIN_JAZMIN } from '../data/nosotros'
import { OurInspiration } from './OurInspiration'
import { Section, textClass } from './Section'

// No se mencionan resultados de FlujoLink ni cifras internas: solo la refundación y el foco.
export const Team = () => (
  <Section id="equipo" title="El equipo detrás de Sena" tone="muted">
    <div className="max-w-[720px] space-y-4 md:space-y-6 mb-10 md:mb-16">
      <p className={textClass}>
        Sena es la evolución de FlujoLink. En enero de 2026 se refundó con una estrategia nueva, una marca
        nueva y un foco claro: la cobranza B2B.
      </p>
      <p className={textClass}>
        <strong>Jazmín Jorquera</strong> es CEO de Sena desde diciembre de 2025. Fue vicepresidenta de
        FinteChile, la asociación fintech de Chile.{' '}
        <a href={LINKEDIN_JAZMIN} target="_blank" rel="noopener noreferrer" className="font-bold underline">
          LinkedIn
        </a>
      </p>
      <p className={textClass}>
        El equipo reúne producto, ingeniería, ventas y gestión de casos. Las personas que llaman y gestionan
        los casos complejos son del equipo de Sena.
      </p>
    </div>
    <OurInspiration />
  </Section>
)
