import type { ReactNode } from 'react'
import { Container, Dot, Eyebrow, SectionTitle } from './shared'

const icon = (children: ReactNode) => (
  <svg
    aria-hidden="true"
    width="26"
    height="26"
    viewBox="0 0 26 26"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    className="flex-none mt-0.5 text-brand-primary"
  >
    {children}
  </svg>
)

const puntos = [
  {
    titulo: 'De cada factura, al siguiente paso.',
    texto:
      'Contactamos a las personas correctas por correo, SMS, WhatsApp o llamada, resolvemos consultas y acordamos fechas de pago.',
    icono: icon(<path d="M4 13h14M13 6l7 7-7 7" />),
  },
  {
    titulo: 'Negociación dentro de tus reglas.',
    texto:
      'Tu empresa define los límites. Sena negocia acuerdos y repactaciones dentro de ellos y te deriva las excepciones.',
    icono: icon(
      <>
        <circle cx="13" cy="13" r="9" />
        <circle cx="13" cy="13" r="3" />
      </>
    ),
  },
  {
    titulo: 'IA para lo temprano, especialistas para lo difícil.',
    texto:
      'La automatización cubre recordatorios y seguimientos. Cuando hace falta criterio, entra una persona del equipo.',
    icono: icon(
      <>
        <circle cx="9" cy="9" r="4" />
        <path d="M2.5 22c.8-4 3.4-6 6.5-6s5.7 2 6.5 6M17 7h7M17 12h7M17 17h5" />
      </>
    ),
  },
  {
    titulo: 'Todo queda registrado.',
    texto:
      'Cada gestión queda registrada y es auditable. El motor limita la frecuencia de contacto por cliente para no saturar la relación.',
    icono: icon(
      <>
        <rect x="4" y="3" width="18" height="20" rx="2" />
        <path d="M8 9h10M8 13h10M8 17h6" />
      </>
    ),
  },
]

export const Service = () => (
  <section id="servicio" aria-labelledby="servicio-titulo" className="scroll-mt-24">
    <Container className="py-20 md:py-[104px] flex flex-wrap gap-x-[72px] gap-y-12">
      <div className="flex-[1_1_400px] min-w-0 flex flex-col gap-[22px]">
        <Eyebrow>Un servicio que se hace cargo</Eyebrow>
        <SectionTitle id="servicio-titulo">
          Tu equipo no tiene que estar en todo
          <Dot />
        </SectionTitle>
        <p className="m-0 text-text-body max-w-[46ch]">
          Sena contacta, conversa y sigue los compromisos de pago de cada cliente. Los casos que necesitan
          criterio llegan a un especialista con todo el historial.
        </p>
      </div>
      <ul className="flex-[1_1_520px] min-w-0 list-none m-0 p-0 flex flex-col border-t border-border-default">
        {puntos.map((p) => (
          <li key={p.titulo} className="flex gap-[22px] py-[26px] border-b border-border-default">
            {p.icono}
            <div className="flex flex-col gap-1.5">
              <h3 className="m-0 text-[21px] font-bold leading-snug">{p.titulo}</h3>
              <p className="m-0 text-text-muted">{p.texto}</p>
            </div>
          </li>
        ))}
      </ul>
    </Container>
  </section>
)
