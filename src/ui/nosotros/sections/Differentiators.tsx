import { diferenciadores } from '../data/nosotros'
import { Section, textClass } from './Section'

// Se nombran categorías, nunca competidores por marca (guardrail de marca de sena-brain).
export const Differentiators = () => (
  <Section id="que-diferencia-a-sena" title="Qué diferencia a Sena">
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {diferenciadores.map((d) => (
        <div key={d.titulo}>
          <h3 className="text-brand-primary-dark text-xl font-bold mb-2">{d.titulo}</h3>
          <p className={textClass}>{d.texto}</p>
        </div>
      ))}
    </div>
  </Section>
)
