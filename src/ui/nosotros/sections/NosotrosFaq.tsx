import { nosotrosFaqs } from '../data/nosotros'
import { Section } from './Section'

// <details> nativo: las respuestas están en el HTML del servidor y se abren sin JavaScript.
// El JSON-LD FAQPage lee la misma lista (data/nosotros.ts).
export const NosotrosFaq = () => (
  <Section id="preguntas-frecuentes" title="Preguntas frecuentes" tone="muted">
    <div className="max-w-[860px] border-t border-border-default">
      {nosotrosFaqs.map((f, i) => (
        <details key={f.q} open={i === 0} className="group border-b border-border-default">
          <summary className="list-none [&::-webkit-details-marker]:hidden cursor-pointer py-5 flex justify-between items-center gap-4 min-h-11 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-sm">
            <h3 className="m-0 text-lg md:text-xl font-bold text-text-primary">{f.q}</h3>
            <span aria-hidden="true" className="text-2xl font-normal text-brand-primary flex-none">
              <span className="group-open:hidden">+</span>
              <span className="hidden group-open:inline">−</span>
            </span>
          </summary>
          <p className="m-0 pr-10 pb-6 text-text-primary leading-relaxed">{f.a}</p>
        </details>
      ))}
    </div>
  </Section>
)
