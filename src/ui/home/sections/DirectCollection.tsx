import { ArrowUpRight, Check, Container, Dot, Eyebrow, SectionTitle, UnderlineLink } from './shared'

export const DirectCollection = () => (
  <section
    id="recaudacion"
    aria-labelledby="recaudacion-titulo"
    className="border-t border-border-default scroll-mt-24"
  >
    <Container className="py-20 md:py-[104px] flex flex-wrap gap-x-[72px] gap-y-12 items-center">
      <div className="flex-[1_1_460px] min-w-0 rounded-[18px] bg-surface-blue-soft p-6 sm:p-8 flex flex-col gap-[22px]">
        <div className="flex items-center gap-3">
          <span className="w-10 h-10 rounded-full bg-brand-primary-dark text-white flex items-center justify-center flex-none">
            <svg
              aria-hidden="true"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
            >
              <path d="M13 3L3 13M3 6v7h7" />
            </svg>
          </span>
          <span className="text-xs tracking-[.14em] uppercase text-text-body">Recaudación directa</span>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-[15px] text-text-muted">Una cuenta asignada a tu cliente.</span>
          <span className="font-canaro font-bold text-[30px] sm:text-[36px] leading-[1.1]">
            Un pago que sabes de quién es.
          </span>
        </div>
        <div className="rounded-xl bg-white px-5 py-[18px] shadow-[0_10px_30px_rgba(30,44,80,.08)] flex items-center gap-3.5">
          <span className="w-[34px] h-[34px] rounded-full bg-success-soft text-success flex items-center justify-center flex-none">
            <Check size={14} />
          </span>
          <div className="flex-1 min-w-0 flex flex-col">
            <span className="font-bold">Transferencia identificada</span>
            <span className="text-[13px] text-text-secondary">Los Aromos SpA · ejemplo ilustrativo</span>
          </div>
          <div className="flex flex-col items-end tabular-nums">
            <span className="text-xs text-text-secondary">CLP</span>
            <span className="font-bold">$4.160.000</span>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-text-muted">
          <span>Tu cliente</span>
          <span aria-hidden="true">→</span>
          <span>Cuenta asignada</span>
          <span aria-hidden="true">→</span>
          <span>Pago identificado</span>
        </div>
      </div>
      <div className="flex-[1_1_440px] min-w-0 flex flex-col gap-[22px]">
        <Eyebrow>Recaudación directa</Eyebrow>
        <SectionTitle id="recaudacion-titulo">
          Cada pago, identificado. Menos comisiones
          <Dot />
        </SectionTitle>
        <p className="m-0 text-text-body text-[19px]">
          Una cuenta de recaudación por contraparte facilita identificar los pagos y conciliarlos. Disponible
          en Plataforma Sena y en Ópera.
        </p>
        <p className="m-0 text-[19px] font-bold">
          Las transferencias directas a esa cuenta pueden evitar las comisiones de una pasarela de pago.
        </p>
        <UnderlineLink href="#caso">
          Cuéntanos tu caso
          <ArrowUpRight />
        </UnderlineLink>
        <p className="m-0 text-sm text-text-secondary max-w-[54ch]">
          El ahorro depende de los pagos que migren desde una pasarela y de las tarifas actuales. Otros medios
          de pago y costos bancarios conservan sus condiciones.
        </p>
      </div>
    </Container>
  </section>
)
