export const OurTeamIntro = () => {
  return (
    <section className=" bg-surface-secondary">
      <div className="px-4 py-4 md:py-0 md:px-8 max-w-[1280px] mx-auto">
        {/* Desktop */}
        <div className="hidden md:block py-16">
          <div className="max-w-[720px]">
            <h2 className="text-brand-primary-dark text-4xl lg:text-5xl font-extrabold leading-tight mb-6">
              Nuestro
              <br />
              equipo
            </h2>

            <p className=" text-base lg:text-lg text-text-primary mb-6 leading-relaxed">
              Un equipo multidisciplinario que une tecnología, experiencia financiera y criterio humano.
              Especialistas en producto, desarrollo y operaciones de cobranza que diseñan cada funcionalidad
              pensando en el equilibrio entre efectividad y relaciones.
            </p>

            <p className=" text-base lg:text-lg text-text-primary leading-relaxed">
              Síguenos en{' '}
              <a
                href="https://www.linkedin.com/company/sena-latam/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold underline text-text-primary"
              >
                LinkedIn
              </a>{' '}
              para conocer al equipo, ver cómo trabajamos y aprender sobre el arte de la cobranza profesional.
            </p>
          </div>
        </div>

        {/* Mobile */}
        <div className="md:hidden">
          <h2 className="text-brand-primary-dark text-3xl font-extrabold leading-tight mb-4">
            Nuestro
            <br />
            equipo
          </h2>

          <p className="text-base text-text-primary mb-4 leading-relaxed">
            Un equipo multidisciplinario que une tecnología, experiencia financiera y criterio humano.
            Especialistas en producto, desarrollo y operaciones de cobranza que diseñan cada funcionalidad
            pensando en el equilibrio entre efectividad y relaciones.
          </p>

          <p className="text-base text-text-primary leading-relaxed">
            Síguenos en{' '}
            <a
              href="https://www.linkedin.com/company/sena-latam/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold underline text-text-primary"
            >
              LinkedIn
            </a>{' '}
            para conocer al equipo, ver cómo trabajamos y aprender sobre el arte de la cobranza profesional.
          </p>
        </div>
      </div>
    </section>
  )
}
