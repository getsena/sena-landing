import { modalidades } from '../data/nosotros'
import { Section, textClass } from './Section'

export const WhatWeDo = () => (
  <Section id="que-hace-sena" title="Qué hace Sena" tone="muted">
    <div className="grid gap-8 md:grid-cols-3">
      {modalidades.map((m) => (
        <div key={m.titulo}>
          <h3 className="text-brand-primary-dark text-xl md:text-2xl font-bold mb-3">{m.titulo}</h3>
          <p className={textClass}>{m.texto}</p>
        </div>
      ))}
    </div>
  </Section>
)
