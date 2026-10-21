import { Accent, Container, Dot, Eyebrow, SectionTitle } from '../shared'
import { CaseForm } from './CaseForm'

export const CaseSection = () => (
  <section id="caso" aria-labelledby="caso-titulo" className="bg-brand-primary-dark text-white scroll-mt-24">
    <Container className="py-20 md:py-[104px] flex flex-wrap gap-x-[72px] gap-y-12 items-start">
      <div className="flex-[1_1_420px] min-w-0 flex flex-col gap-[22px]">
        <Eyebrow className="text-text-on-dark">Empecemos por tu cartera</Eyebrow>
        <SectionTitle id="caso-titulo" className="lg:text-[60px] leading-[1.04]">
          Cobrar bien hace la <Accent className="text-text-on-dark-accent">diferencia</Accent>
          <Dot />
        </SectionTitle>
        <p className="m-0 text-[19px] text-text-on-dark max-w-[42ch]">
          Cuéntanos qué necesitas cobrar. Analizamos tu cartera gratis y te decimos qué modalidad conviene.
        </p>
        <p className="m-0 text-[15px] text-text-on-dark">
          También puedes escribir a{' '}
          <a href="mailto:hola@somossena.com" className="text-white underline">
            hola@somossena.com
          </a>
        </p>
      </div>
      <CaseForm />
    </Container>
  </section>
)
