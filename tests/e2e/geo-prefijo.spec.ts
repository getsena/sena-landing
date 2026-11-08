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
