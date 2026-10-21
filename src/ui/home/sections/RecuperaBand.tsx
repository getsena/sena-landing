import { ArrowUpRight, Container, Dot, Eyebrow, PillLink, SectionTitle } from './shared'

const pasos = [
  {
    titulo: 'Nos cuentas qué necesitas recuperar.',
    texto: 'Revisamos las facturas vencidas y su antigüedad.',
  },
  {
    titulo: 'Gestionamos la recuperación.',
    texto: 'Gestión prejudicial, cuidando la relación con tu cliente.',
  },
  { titulo: 'Pagas solo sobre lo recuperado.', texto: 'Si no recuperamos, no pagas.' },
]

export const RecuperaBand = () => (
  <section
    id="recupera"
    aria-labelledby="recupera-titulo"
    className="bg-brand-primary text-white scroll-mt-24"
  >
    <Container className="py-20 md:py-[104px] flex flex-wrap gap-x-[72px] gap-y-14">
      <div className="flex-[1_1_440px] min-w-0 flex flex-col gap-6">
        <Eyebrow className="text-white">Empieza con Recupera</Eyebrow>
        <SectionTitle id="recupera-titulo" className="lg:text-[58px] leading-[1.04]">
          ¿Facturas que ya te cansaste de perseguir
          <Dot className="text-white" mark="?" />
        </SectionTitle>
        <p className="m-0 text-[19px] leading-[1.6] max-w-[46ch]">
          Empieza por esas. Solo nos pagas si recuperamos: 15% sobre lo cobrado, sin ticket mínimo y sin costo
          fijo.
        </p>
        <div className="flex flex-wrap gap-3.5 items-center">
          <PillLink href="#caso" variant="inverted">
            Quiero empezar con Recupera
            <ArrowUpRight />
          </PillLink>
        </div>
        <p className="m-0 text-sm">Te respondemos en 24 horas.</p>
      </div>
      <ol className="flex-[1_1_460px] min-w-0 list-none m-0 p-0 flex flex-col border-t border-white/35">
        {pasos.map((p, i) => (
          <li key={p.titulo} className="flex gap-5 py-[26px] border-b border-white/35">
            <span
              aria-hidden="true"
              className="w-[34px] h-[34px] rounded-full border-[1.5px] border-white flex items-center justify-center text-[15px] flex-none"
            >
              {i + 1}
            </span>
            <div className="flex flex-col gap-1">
              <h3 className="m-0 text-[21px] font-bold leading-snug">{p.titulo}</h3>
              <p className="m-0">{p.texto}</p>
            </div>
          </li>
        ))}
        <li className="pt-[22px] flex flex-col gap-1.5">
          <span className="text-xs tracking-[.12em] uppercase">Y después</span>
          <p className="m-0 text-[19px]">
            Si quieres este nivel de gestión en toda tu cartera, activas Ópera. La ampliación se acuerda
            contigo; no es automática.
          </p>
        </li>
      </ol>
    </Container>
  </section>
)
