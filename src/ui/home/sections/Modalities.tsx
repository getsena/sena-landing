import clsx from 'clsx'
import type { ReactNode } from 'react'
import { Container, Dot, Eyebrow, PillLink, SectionTitle } from './shared'

const modalidades: {
  etiqueta: string
  nombre: string
  promesa: string
  detalle: string
  paraTi: string
  precio: ReactNode
}[] = [
  {
    etiqueta: 'Operas tú',
    nombre: 'Plataforma Sena',
    promesa: 'Todo el ciclo de cobranza, ordenado en una sola plataforma.',
    detalle:
      'Tu equipo opera con cartera unificada, recordatorios multicanal y conciliación, sin reemplazar tu ERP.',
    paraTi: 'tienes un equipo administrativo o financiero que hoy cobra con planillas y mensajes sueltos.',
    precio: (
      <>
        Desde <strong>USD 39</strong> al mes
      </>
    ),
  },
  {
    etiqueta: 'Operamos por ti',
    nombre: 'Ópera',
    promesa: 'El equipo de cobranza que tu empresa no tiene, operando por ti.',
    detalle:
      'Análisis, estrategia, ejecución y monitoreo a cargo de nuestro equipo, por correo, SMS, WhatsApp y llamadas. Tú ves los resultados.',
    paraTi: 'no tienes equipo de cobranza y quieres delegar el problema completo.',
    precio: (
      <>
        Desde <strong>US$50</strong> al mes
      </>
    ),
  },
  {
    etiqueta: 'Solo lo vencido',
    nombre: 'Recupera',
    promesa: 'Solo nos pagas si recuperamos.',
    detalle:
      'Tienes facturas vencidas que no has podido cobrar. Las gestionamos cuidando la relación con tu cliente.',
    paraTi: 'tienes facturas antiguas detenidas y buscas una salida prejudicial.',
    precio: (
      <>
        <strong>15%</strong> sobre lo recuperado
      </>
    ),
  },
]

export const Modalities = () => (
  <section
    id="modalidades"
    aria-labelledby="modalidades-titulo"
    className="bg-surface-secondary scroll-mt-24"
  >
    {/* El menú «Productos» del header todavía enlaza a /#productos. */}
    <span id="productos" className="block scroll-mt-24" aria-hidden="true" />
    <Container className="py-20 md:py-[104px] flex flex-col gap-12">
      <div className="flex flex-col gap-[18px] max-w-[760px]">
        <Eyebrow>Modalidades</Eyebrow>
        <SectionTitle id="modalidades-titulo">
          Un servicio, tres formas de activarlo
          <Dot />
        </SectionTitle>
        <p className="m-0 text-text-body text-[19px]">
          Somos cobranza B2B. Activas lo que necesitas, y subir de capacidad siempre está disponible.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 border-t-2 border-brand-primary-dark">
        {modalidades.map((m, i) => (
          <article
            key={m.nombre}
            className={clsx(
              'py-[30px] flex flex-col gap-3.5 border-b border-border-default',
              i === 0 && 'md:pr-7',
              i === 1 && 'md:px-7 md:border-l',
              i === 2 && 'md:pl-7 md:border-l'
            )}
          >
            <span className="text-xs font-bold tracking-[.12em] uppercase text-brand-primary">
              {m.etiqueta}
            </span>
            <h3 className="m-0 font-canaro font-bold text-[30px] leading-tight">{m.nombre}</h3>
            <p className="m-0 font-bold">{m.promesa}</p>
            <p className="m-0 text-text-muted">{m.detalle}</p>
            <p className="m-0 text-[15px] text-text-body bg-white border border-border-default rounded-[10px] px-3.5 py-3">
              <strong>Para ti si</strong> {m.paraTi}
            </p>
            <span className="text-[15px] mt-auto">{m.precio}</span>
          </article>
        ))}
      </div>
      <div className="flex flex-wrap items-center justify-between gap-[18px] bg-white border border-border-default rounded-[14px] px-[26px] py-[22px]">
        <p className="m-0 text-[19px]">
          <strong>Analizamos tu caso y te decimos cuál conviene.</strong>{' '}
          <span className="text-text-muted">El análisis de tu cartera es gratis.</span>
        </p>
        <PillLink href="#caso" variant="dark" className="min-h-11 px-[22px]">
          Cuéntanos tu caso
        </PillLink>
      </div>
    </Container>
  </section>
)
