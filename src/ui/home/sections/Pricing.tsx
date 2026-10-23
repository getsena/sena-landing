import { Container, Dot, Eyebrow, SectionTitle } from './shared'

const th = 'text-left font-normal text-text-secondary pb-2 text-[13px]'
const td = 'py-3 border-t border-border-default'

const planesPlataforma = [
  { plan: 'Starter', clientes: 'Hasta 10', precio: <strong>USD 39</strong> },
  { plan: 'Growth', clientes: 'Hasta 100', precio: <strong>USD 349</strong> },
  {
    plan: 'Enterprise',
    clientes: '100+',
    precio: (
      <>
        desde <strong>USD 799</strong>
      </>
    ),
  },
]

const tramosOpera = [
  { cartera: 'Menos de 10 clientes', precio: <strong>US$50</strong> },
  { cartera: 'De 10 a 50 clientes', precio: 'Se cotiza' },
  { cartera: 'Más de 50 clientes', precio: <strong>US$300</strong> },
]

const Encabezado = ({ etiqueta, nota }: { etiqueta: string; nota: string }) => (
  <div className="flex flex-col gap-1">
    <h3 className="m-0 text-xs font-bold tracking-[.12em] uppercase text-brand-primary">{etiqueta}</h3>
    <span className="text-[15px] text-text-muted">{nota}</span>
  </div>
)

const cta =
  'text-center rounded-full font-bold no-underline min-h-11 px-3 py-3 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2'

export const Pricing = () => (
  <section id="precios" aria-labelledby="precios-titulo" className="bg-surface-secondary scroll-mt-24">
    <Container className="py-20 md:py-[104px] flex flex-col gap-11">
      <div className="flex flex-col gap-[18px] max-w-[760px]">
        <Eyebrow>Precios</Eyebrow>
        <SectionTitle id="precios-titulo">
          Todos los precios son públicos
          <Dot />
        </SectionTitle>
        <p className="m-0 text-text-body text-[19px]">
          La Plataforma parte en USD 39 al mes, Ópera desde US$50 al mes y Recupera cobra 15% de lo que
          recupera. El análisis de tu cartera es gratis, y de ahí sale cuál te conviene.
        </p>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-5 items-start">
        <div className="bg-white border border-border-default rounded-2xl p-7 flex flex-col gap-[18px]">
          <Encabezado etiqueta="Plataforma Sena · operas tú" nota="Planes mensuales" />
          <table className="w-full border-collapse text-[15px] tabular-nums">
            <thead>
              <tr>
                <th scope="col" className={th}>
                  Plan
                </th>
                <th scope="col" className={th}>
                  Clientes
                </th>
                <th scope="col" className={`${th} text-right`}>
                  Precio
                </th>
              </tr>
            </thead>
            <tbody>
              {planesPlataforma.map((p) => (
                <tr key={p.plan}>
                  <td className={`${td} font-bold`}>{p.plan}</td>
                  <td className={td}>{p.clientes}</td>
                  <td className={`${td} text-right`}>{p.precio}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <a
            href="#caso"
            className={`${cta} border-[1.5px] border-brand-primary-dark text-brand-primary-dark hover:bg-brand-primary-dark/10 focus-visible:ring-brand-primary-dark`}
          >
            Elegir plan
          </a>
        </div>
        <div className="bg-white border-2 border-brand-primary rounded-2xl p-7 flex flex-col gap-[18px]">
          <Encabezado
            etiqueta="Ópera · operamos por ti"
            nota="Según cuántos clientes activos tiene tu cartera"
          />
          <table className="w-full border-collapse text-[15px] tabular-nums">
            <thead>
              <tr>
                <th scope="col" className={th}>
                  Cartera
                </th>
                <th scope="col" className={`${th} text-right`}>
                  Precio al mes
                </th>
              </tr>
            </thead>
            <tbody>
              {tramosOpera.map((t) => (
                <tr key={t.cartera}>
                  <td className={td}>{t.cartera}</td>
                  <td className={`${td} text-right`}>{t.precio}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <a
            href="#caso"
            className={`${cta} bg-brand-primary text-white hover:bg-brand-primary/90 focus-visible:ring-brand-primary`}
          >
            Cuéntanos tu caso
          </a>
        </div>
        <div className="bg-white border border-border-default rounded-2xl p-7 flex flex-col gap-[18px]">
          <Encabezado etiqueta="Recupera · solo lo vencido" nota="Pagas solo si recuperamos" />
          <div className="flex items-baseline gap-2.5 border-t border-border-default pt-3.5">
            <span className="font-canaro font-bold text-[56px] leading-none">15%</span>
            <span className="text-text-muted">sobre lo recuperado</span>
          </div>
          <ul className="m-0 p-0 list-none flex flex-col gap-2 text-[15px]">
            <li className="flex gap-2.5">
              <span aria-hidden="true" className="text-success">
                ✓
              </span>
              Sin ticket mínimo
            </li>
            <li className="flex gap-2.5">
              <span aria-hidden="true" className="text-success">
                ✓
              </span>
              Sin costo fijo ni compromiso mensual
            </li>
          </ul>
          <a
            href="#caso"
            className={`${cta} border-[1.5px] border-brand-primary-dark text-brand-primary-dark hover:bg-brand-primary-dark/10 focus-visible:ring-brand-primary-dark`}
          >
            Iniciar recupero
          </a>
        </div>
      </div>
    </Container>
  </section>
)
