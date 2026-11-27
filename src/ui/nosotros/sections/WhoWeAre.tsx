// Bloque "Quiénes somos", agregado el 2026-10-12 y subido al inicio de la página el 2026-11-25.
//
// La página de identidad no decía en qué país opera Sena, de qué grupo es parte ni cuáles son las
// modalidades. Por eso, preguntado quién está detrás de Sena, un motor de respuesta reconstruía la
// cadena societaria desde el Diario Oficial: el registro público respondía lo que el sitio no.
//
// El texto es la respuesta canónica aprobada en sena-brain,
// 07_Decisiones/2026-10-08-propiedad-publica-y-fin-del-claim-de-40-anos.md, con dos reglas que
// aplican solo a piezas públicas:
//   - No se nombra a la familia controladora.
//   - Se nombra al grupo con el encuadre de su propio sitio, sin importar sus cifras de
//     trayectoria: los años son del grupo, no de Sena.
import { quienesSomos } from '../data/nosotros'
import { Section, textClass } from './Section'

export const WhoWeAre = () => (
  <Section id="quienes-somos" title="Quiénes somos">
    <div className="max-w-[720px] space-y-4 md:space-y-6">
      {quienesSomos.map((p) => (
        <p key={p} className={textClass}>
          {p}
        </p>
      ))}
    </div>
  </Section>
)
