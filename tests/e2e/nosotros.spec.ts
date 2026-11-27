import { test, expect } from '@playwright/test'
import { nosotrosFaqs } from '../../src/ui/nosotros/data/nosotros'

// /nosotros es la página de identidad para buscadores y motores de respuesta. Se valida el HTML servido
// (sin JavaScript), que es lo que lee un crawler. Correr contra el preview con E2E_BASE_URL.

test('/nosotros sirve un solo H1, la tabla de datos clave y la FAQ en el HTML', async ({ request }) => {
  const res = await request.get('/nosotros')
  expect(res.status()).toBe(200)
  const html = await res.text()

  expect(html.match(/<h1[\s>]/g)?.length).toBe(1)
  expect(html).toContain('Somos Sena, cobranza B2B en Chile, Perú y')
  expect(html).toMatch(/<table[\s>]/)
  expect(html).toContain('Servicios de Tecnología Flujolink SpA')
  for (const f of nosotrosFaqs) expect(html).toContain(f.q)

  // "Quiénes somos" va antes que la historia del nombre.
  expect(html.indexOf('Quiénes somos')).toBeLessThan(html.indexOf('De dónde viene el nombre'))
})

test('/nosotros declara AboutPage y FAQPage, sin foundingDate ni founder', async ({ request }) => {
  const html = await (await request.get('/nosotros')).text()
  const bloques = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].map((m) =>
    JSON.parse(m[1])
  )
  const nodos = bloques.flatMap((b) => b['@graph'] ?? [b])
  const tipos = nodos.map((n) => n['@type'])

  expect(tipos).toContain('AboutPage')
  expect(tipos).toContain('FAQPage')

  const faq = nodos.find((n) => n['@type'] === 'FAQPage')
  expect(faq.mainEntity.map((q: { name: string }) => q.name)).toEqual(nosotrosFaqs.map((f) => f.q))

  const json = JSON.stringify(nodos)
  expect(json).not.toContain('foundingDate')
  expect(json).not.toContain('"founder"')
})
