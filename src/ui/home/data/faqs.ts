// Preguntas de la home. La sección FAQ y el JSON-LD FAQPage leen esta misma lista: si cambia una
// respuesta, cambia en los dos lugares.
export const homeFaqs = [
  {
    q: '¿Sena vende software o servicio?',
    a: 'Las dos cosas. Plataforma Sena si tu equipo opera la cobranza, Ópera si quieres delegarla y Recupera para las facturas que ya vencieron.',
  },
  {
    q: '¿Puedo empezar solo con lo vencido?',
    a: 'Sí. Recupera cobra 15% sobre lo que recupera, sin ticket mínimo y sin costo fijo.',
  },
  {
    q: '¿Cuánto demora en partir Ópera?',
    a: 'Dos semanas desde la firma del acuerdo.',
  },
  {
    q: '¿Tengo que cambiar mi ERP?',
    a: 'No. La Plataforma funciona sin reemplazar tu ERP.',
  },
  {
    q: '¿Cómo cuidan la relación con mis clientes?',
    a: 'El motor limita la frecuencia de contacto por cliente y por campaña, y cada gestión queda registrada y es auditable.',
  },
  {
    q: '¿También trabajan con carteras B2C?',
    a: 'Nuestro foco es la cobranza B2B, y hoy también evaluamos carteras B2C y mixtas. Cuéntanos la tuya y te decimos cómo podemos ayudarte.',
  },
]

export const homeFaqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: homeFaqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}
