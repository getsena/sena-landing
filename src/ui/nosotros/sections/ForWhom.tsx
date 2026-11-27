import { clientes, paraQuien } from '../data/nosotros'
import { Section, textClass } from './Section'

export const ForWhom = () => (
  <Section id="para-quien-es-sena" title="Para quién es Sena" tone="muted">
    <ul className="max-w-[860px] space-y-4 list-disc pl-5">
      {paraQuien.map((p) => (
        <li key={p.quien} className={textClass}>
          <strong>{p.quien}</strong> {p.texto}
        </li>
      ))}
    </ul>
    <p className={`${textClass} mt-8`}>
      <strong>Empresas que ya cobran con Sena:</strong> {clientes.join(', ')}.
    </p>
  </Section>
)
