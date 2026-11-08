import { test, expect } from '@playwright/test'

// El país nunca bloquea la página: el formulario arranca en Chile (+56) y, si /api/geo responde,
// cambia al prefijo del visitante, salvo que el usuario ya haya elegido uno.
// Corre contra un servidor local (el header x-vercel-ip-country solo existe en Vercel):
//
//   yarn build && yarn start -p 39847
//   E2E_BASE_URL=http://localhost:39847 yarn playwright test tests/e2e/geo-prefijo.spec.ts
const BASE = process.env.E2E_BASE_URL
test.skip(!BASE, 'sin E2E_BASE_URL')

const PAISES = [
  { iso: 'CL', prefijo: '+56' },
  { iso: 'PE', prefijo: '+51' },
  { iso: 'CO', prefijo: '+57' },
  { iso: 'EC', prefijo: '+593' },
  { iso: 'MX', prefijo: '+52' },
]

test.describe('/api/geo', () => {
  for (const { iso } of PAISES) {
    test(`devuelve ${iso} cuando Vercel lo informa`, async ({ request }) => {
      const res = await request.get('/api/geo', { headers: { 'x-vercel-ip-country': iso } })
      expect(await res.json()).toEqual({ country: iso })
    })
  }

  test('devuelve null sin header o con un valor inválido', async ({ request }) => {
    expect(await (await request.get('/api/geo')).json()).toEqual({ country: null })
    const invalido = await request.get('/api/geo', { headers: { 'x-vercel-ip-country': 'xx' } })
    expect(await invalido.json()).toEqual({ country: null })
  })
})

test.describe('formulario de /contactanos', () => {
  const formulario = (page: import('@playwright/test').Page) =>
    page.locator('form').filter({ has: page.getByPlaceholder('Número') })

  for (const { iso, prefijo } of PAISES) {
    test(`muestra ${prefijo} cuando el visitante es de ${iso}`, async ({ page }) => {
      await page.route('**/api/geo', (route) => route.fulfill({ json: { country: iso } }))
      await page.goto('/contactanos')
      await expect(formulario(page).getByText(prefijo, { exact: true })).toBeVisible()
    })
  }

  test('queda en +56 si /api/geo falla', async ({ page }) => {
    await page.route('**/api/geo', (route) => route.abort())
    await page.goto('/contactanos')
    await expect(formulario(page).getByText('+56', { exact: true })).toBeVisible()
  })

  test('no pisa el prefijo que el usuario ya eligió', async ({ page }) => {
    await page.route('**/api/geo', async (route) => {
      await new Promise((r) => setTimeout(r, 1500))
      await route.fulfill({ json: { country: 'PE' } })
    })
    await page.goto('/contactanos')
    const form = formulario(page)
    await form.getByText('+56', { exact: true }).click()
    await page.getByText('+57', { exact: true }).click()
    await expect(form.getByText('+57', { exact: true })).toBeVisible()
    await page.waitForTimeout(2500)
    await expect(form.getByText('+57', { exact: true })).toBeVisible()
    await expect(form.getByText('+51', { exact: true })).toHaveCount(0)
  })
})

test.describe('lista de países de la API', () => {
  const form = (page: import('@playwright/test').Page) =>
    page.locator('form').filter({ has: page.getByPlaceholder('Número') })
  const paisesApi = (paises: Array<{ id: number; country: string; country_code: string }>) =>
    paises.map((p) => ({ ...p, icon: '' }))

  test('si la API responde una lista vacía, el selector conserva los países base', async ({ page }) => {
    await page.route('**/countries/**', (route) => route.fulfill({ json: [] }))
    await page.route('**/api/geo', (route) => route.fulfill({ json: { country: 'CO' } }))
    await page.goto('/contactanos')
    await expect(form(page).getByText('+57', { exact: true })).toBeVisible()
  })

  test('si la API no trae Colombia, Ecuador ni México, siguen disponibles', async ({ page }) => {
    const soloChilePeru = paisesApi([
      { id: 1, country: '+51', country_code: 'Perú' },
      { id: 2, country: '+56', country_code: 'Chile' },
    ])
    await page.route('**/countries/**', (route) => route.fulfill({ json: soloChilePeru }))
    await page.route('**/api/geo', (route) => route.fulfill({ json: { country: 'EC' } }))
    await page.goto('/contactanos')
    await expect(form(page).getByText('+593', { exact: true })).toBeVisible()
  })

  test('si la API caída responde 502, el selector funciona con los países base', async ({ page }) => {
    await page.route('**/countries/**', (route) => route.fulfill({ status: 502, body: 'Bad Gateway' }))
    await page.route('**/api/geo', (route) => route.fulfill({ json: { country: 'MX' } }))
    await page.goto('/contactanos')
    await expect(form(page).getByText('+52', { exact: true })).toBeVisible()
  })
})

test.describe('en el celular', () => {
  test.use({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true })

  for (const { iso, prefijo } of [
    { iso: 'PE', prefijo: '+51' },
    { iso: 'CO', prefijo: '+57' },
  ]) {
    test(`/contactanos muestra ${prefijo} cuando el visitante es de ${iso}`, async ({ page }) => {
      await page.route('**/api/geo', (route) => route.fulfill({ json: { country: iso } }))
      await page.goto('/contactanos')
      const form = page.locator('form').filter({ has: page.getByPlaceholder('Número') })
      await expect(form.getByText(prefijo, { exact: true })).toBeVisible()
    })
  }
})

test.describe('botón de WhatsApp y login del header', () => {
  const whatsapp = (page: import('@playwright/test').Page) =>
    page.getByRole('link', { name: 'Abrir chat de WhatsApp' })

  for (const { iso, numero } of [
    { iso: 'PE', numero: '51918272599' },
    { iso: 'CL', numero: '56944489673' },
    { iso: 'CO', numero: '56944489673' },
    { iso: 'MX', numero: '56944489673' },
    { iso: 'EC', numero: '56944489673' },
  ]) {
    test(`el WhatsApp abre el número de ${iso} (+${numero})`, async ({ page }) => {
      await page.route('**/api/geo', (route) => route.fulfill({ json: { country: iso } }))
      await page.goto('/')
      await expect(whatsapp(page)).toHaveAttribute('href', new RegExp(`phone=\\+${numero}`))
    })
  }

  test('sin país el WhatsApp queda en el número de Chile', async ({ page }) => {
    await page.route('**/api/geo', (route) => route.abort())
    await page.goto('/')
    await expect(whatsapp(page)).toHaveAttribute('href', /phone=\+56944489673/)
  })

  for (const { iso, l } of [
    { iso: 'PE', l: 'l=pe&' },
    { iso: 'CL', l: 'l=&' },
  ]) {
    test(`Iniciar sesión desde ${iso} va a dashboard con ${l}`, async ({ page }) => {
      await page.route('**/api/geo', (route) => route.fulfill({ json: { country: iso } }))
      await page.route('https://dashboard.somossena.com/**', (route) =>
        route.fulfill({ contentType: 'text/html', body: '<title>dashboard</title>' })
      )
      await page.goto('/')
      // El WhatsApp cambia en el mismo instante que la moneda: avisa que el país ya se aplicó.
      if (iso === 'PE') await expect(whatsapp(page)).toHaveAttribute('href', /phone=\+51918272599/)
      await page.getByText('Iniciar sesión', { exact: true }).first().click()
      await page.waitForURL(/dashboard\.somossena\.com\/login/)
      expect(page.url()).toContain(l)
    })
  }
})
