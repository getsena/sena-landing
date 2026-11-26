import { AssetImage } from '@/lib/utils/assets/image'

export const OurInspiration = () => {
  return (
    // Va dentro de "El equipo detrás de Sena" como H3: la historia del nombre baja de prioridad porque
    // el Río Sena es una de las entidades que le gana a la marca en los motores de respuesta.
    <div>
      <div>
        <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-center">
          {/* Text Content */}
          <div className="w-full md:w-1/2 lg:w-1/3 space-y-6">
            <h3 className="text-brand-primary-dark text-2xl md:text-3xl font-extrabold">
              De dónde viene el nombre
            </h3>

            <div className="space-y-6 text-brand-primary-dark text-base md:text-lg leading-relaxed">
              <p>
                Nos inspira el río Sena de París.
                <br />
                Un río que avanza solo cuando puede
                <br />y que necesita cuidado cuando el camino se complica.
              </p>

              <p>
                Así entendemos el cobrar.
                <br />
                A veces fluye y otras veces hay que estar ahí para
                <br />
                ayudarlo a avanzar.
              </p>

              <p>
                Por eso cobrar bien es un arte:
                <br />
                hacerlo con{' '}
                <span className="bg-brand-primary text-white px-2 py-0.5 rounded">
                  cuidado, criterio y experiencia.
                </span>
              </p>

              <p>
                Sena. El arte de cobrar <span className="text-brand-secondary">bien.</span>
              </p>
            </div>
          </div>

          {/* Image */}
          <div className="w-full md:w-1/2 lg:w-2/3">
            <div className="overflow-hidden">
              <img
                src={AssetImage.rioSena.src}
                alt="Río Sena de París"
                className="w-full max-h-[300px] md:max-h-[400px] object-cover rounded-2xl "
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
