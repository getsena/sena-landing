// Bloque "Quiénes somos", agregado el 2026-10-12.
//
// La página de identidad no decía en qué país opera Sena, de qué grupo es parte
// ni cuáles son las modalidades. Por eso, preguntado quién está detrás de Sena,
// un motor de respuesta reconstruía la cadena societaria desde el Diario Oficial:
// el registro público respondía lo que el sitio no respondía.
//
// El texto es la respuesta canónica aprobada en sena-brain,
// 07_Decisiones/2026-10-08-propiedad-publica-y-fin-del-claim-de-40-anos.md, con
// dos reglas que aplican solo a piezas públicas:
//   - No se nombra a la familia controladora.
//   - Se nombra al grupo con el encuadre de su propio sitio, sin importar sus
//     cifras de trayectoria: los años son del grupo, no de Sena.
const PARRAFOS = [
  'Sena es una compañía de cobranza B2B que opera en Chile y Perú. Cubrimos el ciclo completo, de la factura emitida al pago conciliado, en tres modalidades: la plataforma que opera tu equipo, el servicio gestionado que operamos nosotros, y la recuperación de cartera que ya venció.',
  'Somos parte del Grupo Altas Cumbres, un holding latinoamericano presente en retail, inmobiliario, salud y servicios financieros. Nuestros accionistas son el grupo y Recaudadora S.A., también del grupo.',
  'Ninguna de las dos opera Sena: tenemos equipo, tecnología y operación propios, y los datos de tu cartera los procesamos nosotros.',
]

export const WhoWeAre = () => {
  return (
    <section className="bg-white">
      <div className="px-4 py-4 md:py-0 md:px-8 max-w-[1280px] mx-auto">
        {/* Desktop */}
        <div className="hidden md:block py-16">
          <div className="max-w-[720px]">
            <h2 className="text-brand-primary-dark text-4xl lg:text-5xl font-extrabold leading-tight mb-6">
              Quiénes
              <br />
              somos
            </h2>
            {PARRAFOS.map((p, i) => (
              <p
                key={p}
                className={`text-base lg:text-lg text-text-primary leading-relaxed ${
                  i < PARRAFOS.length - 1 ? 'mb-6' : ''
                }`}
              >
                {p}
              </p>
            ))}
          </div>
        </div>

        {/* Mobile */}
        <div className="md:hidden py-8">
          <h2 className="text-brand-primary-dark text-3xl font-extrabold leading-tight mb-4">
            Quiénes
            <br />
            somos
          </h2>
          {PARRAFOS.map((p, i) => (
            <p
              key={p}
              className={`text-base text-text-primary leading-relaxed ${
                i < PARRAFOS.length - 1 ? 'mb-4' : ''
              }`}
            >
              {p}
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}
