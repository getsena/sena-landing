import { test, expect } from '@playwright/test'

// Google no descubre recupera.somossena.com ni agente.somossena.com: nadie los enlaza en un HTML
// que pueda leer sin ejecutar JS. Estos tests leen la respuesta del servidor, no la página
// hidratada (#165).

const SUBDOMINIOS = ['https://recupera.somossena.com', 'https://agente.somossena.com']

test('la home enlaza a los subdominios desde el header o el footer en el HTML del servidor', async ({
  request,
}) => {
  const res = await request.get('/')
  expect(res.status()).toBe(200)

  const html = await res.text()
  const bloques = [...html.matchAll(/<(header|footer)\b[\s\S]*?<\/\1>/g)].map((m) => m[0]).join('\n')

  for (const url of SUBDOMINIOS) {
    expect(bloques, `falta <a href="${url}"> en header/footer`).toMatch(
      new RegExp(`<a\\b[^>]*href="${url.replace(/\./g, '\\.')}/?"`)
    )
  }
})

test('el sitemap solo lista URLs de www, sin apex ni duplicados', async ({ request }) => {
  const res = await request.get('/sitemap.xml')
  expect(res.status()).toBe(200)

  const locs = [...(await res.text()).matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim())
  expect(locs.length).toBeGreaterThan(0)

  const fueraDeWww = locs.filter((loc) => !/^https:\/\/www\.somossena\.com(\/|$)/.test(loc))
  expect(fueraDeWww).toEqual([])

  const duplicadas = locs.filter((loc, i) => locs.indexOf(loc) !== i)
  expect(duplicadas).toEqual([])
})
