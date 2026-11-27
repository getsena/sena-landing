import { comoTrabajamos } from '../data/nosotros'
import { Section, textClass } from './Section'

export const HowWeWork = () => (
  <Section id="como-trabajamos" title="Cómo trabajamos">
    <ul className="max-w-[860px] space-y-4 list-disc pl-5">
      {comoTrabajamos.map((c) => (
        <li key={c.titulo} className={textClass}>
          <strong>{c.titulo}</strong>
          {c.texto ? ` ${c.texto}` : ''}
        </li>
      ))}
    </ul>
  </Section>
)
