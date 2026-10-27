import { Accent, ArrowDown, ArrowUpRight, Check, Container, PillLink, UnderlineLink } from './shared'

const pasos = [
  {
    titulo: 'Contacto realizado',
    detalle: 'Conversamos con el equipo de tesorería.',
    dia: 'Lun',
    hecho: true,
  },
  {
    titulo: 'Fecha de pago acordada',
    detalle: 'Compromiso registrado para el martes 20 de octubre.',
    dia: 'Mié',
    hecho: true,
  },
  {
    titulo: 'Recordatorio programado',
    detalle: 'Un día antes de la fecha acordada.',
    dia: 'Próx.',
    hecho: false,
  },
]

// Mockup de una cartera en movimiento, con datos ficticios y rotulado como ejemplo.
const CarteraEjemplo = () => (
  <figure className="m-0 flex-[1_1_440px] min-w-0 rounded-[20px] bg-surface-blue-soft p-5 sm:p-7 flex flex-col gap-[18px]">
    <div className="flex justify-between gap-3 text-[11px] tracking-[.12em] uppercase text-text-muted">
      <span>Así se ve una cartera en movimiento</span>
      <span>Ejemplo ilustrativo</span>
    </div>
    <div className="rounded-[14px] bg-white p-[22px] shadow-[0_10px_30px_rgba(30,44,80,.08)] flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <div
          aria-hidden="true"
          className="w-10 h-10 rounded-[10px] bg-surface-secondary border border-border-default flex items-center justify-center font-bold text-sm"
        >
          LA
        </div>
        <div className="flex flex-col">
          <span className="font-bold">Los Aromos SpA</span>
          <span className="text-[13px] text-text-secondary">Factura 10482 · CLP</span>
        </div>
      </div>
      <div className="flex justify-between items-baseline gap-3 border-b border-border-default pb-3.5">
        <span className="text-sm text-text-secondary">Saldo por cobrar</span>
        <span className="font-canaro font-bold text-[26px] sm:text-[30px] tabular-nums">$4.160.000</span>
      </div>
      <ul className="m-0 p-0 list-none flex flex-col gap-3.5">
        {pasos.map((p) => (
          <li key={p.titulo} className="flex gap-3 items-start">
            <span
              className={
                p.hecho
                  ? 'w-6 h-6 rounded-full bg-success-soft text-success flex items-center justify-center flex-none'
                  : 'w-6 h-6 rounded-full bg-surface-blue-soft text-brand-primary flex items-center justify-center flex-none'
              }
            >
              {p.hecho ? (
                <Check />
              ) : (
                <svg
                  aria-hidden="true"
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="6" cy="6" r="3.5" />
                </svg>
              )}
            </span>
            <div className="flex-1 flex flex-col">
              <span className="font-bold text-[15px]">{p.titulo}</span>
              <span className="text-[13px] text-text-secondary">{p.detalle}</span>
            </div>
            <span className="text-xs text-text-secondary">{p.dia}</span>
          </li>
        ))}
      </ul>
    </div>
    <div className="self-end -mt-1 max-w-[300px] rounded-[14px] bg-brand-primary-dark text-white px-5 py-4 flex flex-col gap-1.5">
      <span className="text-[11px] tracking-[.12em] uppercase text-text-on-dark">Tesorería · respuesta</span>
      <Accent className="text-[22px] leading-[1.25]">“Podemos pagar el martes 20.”</Accent>
    </div>
    <figcaption className="text-[13px] text-text-muted">Sena gestiona. Tú sabes qué está pasando.</figcaption>
  </figure>
)

export const Hero = () => (
  <section id="inicio" className="bg-surface-secondary scroll-mt-24">
    <Container className="pt-14 pb-14 md:pt-[88px] md:pb-[72px] flex flex-wrap gap-14 items-center">
      <div className="flex-[1_1_480px] min-w-0 flex flex-col gap-[26px]">
        <div className="flex items-center gap-2.5 text-[13px] font-bold tracking-[.14em] uppercase">
          <span aria-hidden="true" className="w-2 h-2 rounded-full bg-brand-secondary" />
          Cobranza B2B
        </div>
        <h1 className="m-0 font-canaro font-bold text-[44px] sm:text-[58px] lg:text-[72px] leading-[1.04] tracking-[-.02em] text-balance">
          Cobrar mejor. Sin perseguir cada <Accent className="text-brand-primary">factura</Accent>
          <Accent className="text-brand-secondary">.</Accent>
        </h1>
        <p className="m-0 text-[19px] leading-[1.6] text-text-body max-w-[56ch]">
          Sena cubre todo el ciclo de cobranza B2B, de la factura emitida al pago conciliado. Operas tú en
          nuestra plataforma o lo delegas completo a nuestro equipo: IA para lo temprano, especialistas
          humanos para lo difícil, sin romper la relación con tus clientes.
        </p>
        <div className="flex flex-wrap gap-x-[22px] gap-y-3.5 items-center">
          <PillLink href="#caso">
            Cuéntanos tu caso
            <ArrowUpRight />
          </PillLink>
          <UnderlineLink href="#precios">
            Cuánto cuesta
            <ArrowDown />
          </UnderlineLink>
        </div>
        <p className="m-0 text-sm text-text-secondary">El análisis de tu cartera es gratis.</p>
      </div>
      <CarteraEjemplo />
    </Container>
  </section>
)
