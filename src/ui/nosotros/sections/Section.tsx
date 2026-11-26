import type { ReactNode } from 'react'

// Contenedor y H2 comunes de /nosotros. Un solo render por sección (sin variantes desktop/mobile
// duplicadas): cada encabezado aparece una vez en el HTML servido.
type Props = {
  id: string
  title: string
  tone?: 'white' | 'muted'
  children: ReactNode
}

export const Section = ({ id, title, tone = 'white', children }: Props) => (
  <section
    id={id}
    aria-labelledby={`${id}-titulo`}
    className={`${tone === 'muted' ? 'bg-surface-secondary' : 'bg-white'} scroll-mt-24`}
  >
    <div className="px-4 md:px-8 py-10 md:py-16 max-w-[1280px] mx-auto">
      <h2
        id={`${id}-titulo`}
        className="text-brand-primary-dark text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight mb-6 md:mb-8"
      >
        {title}
      </h2>
      {children}
    </div>
  </section>
)

export const textClass = 'text-base lg:text-lg text-text-primary leading-relaxed'
