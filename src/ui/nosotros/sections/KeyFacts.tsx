import { datosClave } from '../data/nosotros'
import { Section } from './Section'

// Tabla en el HTML servido (componente de servidor), no pintada en cliente: es lo que un motor lee.
export const KeyFacts = () => (
  <Section id="datos-clave" title="Datos clave">
    <div className="overflow-x-auto">
      <table className="w-full max-w-[960px] text-left border-collapse">
        <tbody>
          {datosClave.map((d) => (
            <tr key={d.dato} className="border-b border-border-default align-top">
              <th scope="row" className="py-3 pr-6 font-bold text-text-primary whitespace-nowrap">
                {d.dato}
              </th>
              <td className="py-3 text-text-primary">
                {d.href ? (
                  <a href={d.href} target="_blank" rel="noopener noreferrer" className="underline">
                    {d.valor}
                  </a>
                ) : (
                  d.valor
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </Section>
)
