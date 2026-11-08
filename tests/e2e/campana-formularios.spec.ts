import { test, expect, type Page, type Route } from '@playwright/test'

import { ADS_CONVERSION_LABEL, type LeadProduct } from '@/lib/tracking/leadConversion'

// Una visita que llega de una campaña (gclid, fbclid, utm_*) debe conservar su atribución hasta el envío del
// formulario, con las páginas servidas estáticas: el lead sale con los parámetros, el teléfono con prefijo y la
// conversión de Google Ads se emite una sola vez, con la etiqueta de su producto.
// /api/lead se intercepta: no se crea ningún lead. Corre contra un servidor local:
//
//   yarn build && yarn start -p 39847
//   E2E_BASE_URL=http://localhost:39847 yarn playwright test tests/e2e/campana-formularios.spec.ts
const BASE = process.env.E2E_BASE_URL
test.skip(!BASE, 'sin E2E_BASE_URL')
test.use({ baseURL: BASE })

const CAMPANA =
  'gclid=TESTGCLID123&fbclid=TESTFBCLID456&utm_source=google&utm_medium=cpc&utm_campaign=test-campana-cl&utm_term=cobranza'

const LANDINGS: Array<{ ruta: string; producto: string | undefined; clave: LeadProduct }> = [
  // El formulario de /plataforma no envía `producto`: el servidor asume Plataforma.
  { ruta: '/plataforma', producto: undefined, clave: 'plataforma' },
  { ruta: '/recupera', producto: 'Recupera', clave: 'recupera' },
  { ruta: '/opera', producto: 'Opera', clave: 'opera' },
]

type Lead = Record<string, unknown>

async function llenarYEnviar(page: Page, ruta: string): Promise<Lead[]> {
  const leads: Lead[] = []
  await page.route('**/api/lead', async (route: Route) => {
    leads.push(JSON.parse(route.request().postData() ?? '{}'))
    await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ ok: true }) })
  })
  await page.goto(`${ruta}?${CAMPANA}`)
  await page.getByPlaceholder('Tu nombre').fill('Ana')
  await page.getByPlaceholder('Tu apellido').fill('Pérez')
  await page.getByPlaceholder('Nombre de tu empresa').fill('Acme SpA')
  await page.getByPlaceholder('tu@empresa.com').fill('ana@acme.cl')
  await page.getByPlaceholder('Número').fill('911112222')
  const form = page.locator('form').filter({ has: page.getByPlaceholder('Tu nombre') })
  await form.getByRole('button', { name: '10-50', exact: true }).click()
  await form.getByRole('button', { name: 'No', exact: true }).click()
  await form.locator('button[type="submit"]').click()
  await expect(page).toHaveURL(/\/gracias/, { timeout: 15_000 })
  return leads
}

for (const { ruta, producto, clave } of LANDINGS) {
  test.describe(ruta, () => {
    test('la página con parámetros de campaña se sirve estática (caché del CDN)', async ({ request }) => {
      const res = await request.get(`${ruta}?${CAMPANA}`)
      expect(res.status()).toBe(200)
      expect(res.headers()['cache-control'] ?? '').toContain('s-maxage')
    })

    test('el lead sale con la atribución de la campaña y el teléfono con prefijo', async ({ page }) => {
      const leads = await llenarYEnviar(page, ruta)
      expect(leads).toHaveLength(1)
      const lead = leads[0]
      expect(lead.producto).toBe(producto)
      expect(lead).toMatchObject({
        gclid: 'TESTGCLID123',
        fbclid: 'TESTFBCLID456',
        utmSource: 'google',
        utmMedium: 'cpc',
        utmCampaign: 'test-campana-cl',
        utmTerm: 'cobranza',
      })
      expect(lead.telefono).toBe('+56911112222')
      expect(typeof lead.eventId).toBe('string')
    })

    test('emite una sola conversión de Google Ads, con la etiqueta de su producto y el eventId', async ({
      page,
    }) => {
      const leads = await llenarYEnviar(page, ruta)
      const eventId = leads[0].eventId
      const conversiones = await page.evaluate(() =>
        ((window as unknown as { dataLayer: unknown[] }).dataLayer ?? [])
          .map((e) => Array.from(e as ArrayLike<unknown>))
          .filter((e) => e[0] === 'event' && e[1] === 'conversion')
          .map((e) => e[2] as { send_to: string; transaction_id?: string })
      )
      expect(conversiones.filter((c) => c.transaction_id === eventId)).toHaveLength(1)
      for (const c of conversiones) {
        expect(c.send_to).toBe(`AW-17962976949/${ADS_CONVERSION_LABEL[clave]}`)
      }
    })
  })
}

test('la atribución sobrevive a navegar a otra página antes de enviar el formulario', async ({ page }) => {
  const leads: Lead[] = []
  await page.route('**/api/lead', async (route: Route) => {
    leads.push(JSON.parse(route.request().postData() ?? '{}'))
    await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ ok: true }) })
  })
  await page.goto(`/?${CAMPANA}`)
  // La atribución se guarda al hidratar la página: se espera a que esté guardada antes de navegar.
  await page.waitForFunction(() => !!window.sessionStorage.getItem('sena_attribution_v1'))
  await page.goto('/recupera')
  await page.getByPlaceholder('Tu nombre').fill('Ana')
  await page.getByPlaceholder('Tu apellido').fill('Pérez')
  await page.getByPlaceholder('Nombre de tu empresa').fill('Acme SpA')
  await page.getByPlaceholder('tu@empresa.com').fill('ana@acme.cl')
  await page.getByPlaceholder('Número').fill('911112222')
  const form = page.locator('form').filter({ has: page.getByPlaceholder('Tu nombre') })
  await form.getByRole('button', { name: '10-50', exact: true }).click()
  await form.getByRole('button', { name: 'No', exact: true }).click()
  await form.locator('button[type="submit"]').click()
  await expect(page).toHaveURL(/\/recupera\/gracias/, { timeout: 15_000 })
  expect(leads[0]).toMatchObject({ gclid: 'TESTGCLID123', utmCampaign: 'test-campana-cl' })
})

const rellenar = async (page: Page) => {
  await page.getByPlaceholder('Tu nombre').fill('Ana')
  await page.getByPlaceholder('Tu apellido').fill('Pérez')
  await page.getByPlaceholder('Nombre de tu empresa').fill('Acme SpA')
  await page.getByPlaceholder('tu@empresa.com').fill('ana@acme.cl')
  await page.getByPlaceholder('Número').fill('911112222')
  const form = page.locator('form').filter({ has: page.getByPlaceholder('Tu nombre') })
  await form.getByRole('button', { name: '10-50', exact: true }).click()
  await form.getByRole('button', { name: 'No', exact: true }).click()
  return form
}

const capturarLeads = async (page: Page): Promise<Lead[]> => {
  const leads: Lead[] = []
  await page.route('**/api/lead', async (route: Route) => {
    leads.push(JSON.parse(route.request().postData() ?? '{}'))
    await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ ok: true }) })
  })
  return leads
}

const PAISES_LEAD = [
  { iso: 'PE', prefijo: '+51' },
  { iso: 'CO', prefijo: '+57' },
  { iso: 'EC', prefijo: '+593' },
  { iso: 'MX', prefijo: '+52' },
]

for (const { ruta } of LANDINGS) {
  test.describe(`${ruta} con visitantes de otros países`, () => {
    for (const { iso, prefijo } of PAISES_LEAD) {
      test(`un visitante de ${iso} envía el lead con ${prefijo} y su atribución`, async ({ page }) => {
        const leads = await capturarLeads(page)
        await page.route('**/api/geo', (route) => route.fulfill({ json: { country: iso } }))
        await page.goto(`${ruta}?${CAMPANA}`)
        const form = await rellenar(page)
        await expect(form.getByText(prefijo, { exact: true })).toBeVisible()
        await form.locator('button[type="submit"]').click()
        await expect(page).toHaveURL(/\/gracias/, { timeout: 15_000 })
        expect(leads[0].telefono).toBe(`${prefijo}911112222`)
        expect(leads[0]).toMatchObject({ gclid: 'TESTGCLID123', utmCampaign: 'test-campana-cl' })
      })
    }

    test('si el país llega tarde, no borra lo escrito y el lead sale con el prefijo detectado', async ({
      page,
    }) => {
      const leads = await capturarLeads(page)
      await page.route('**/api/geo', async (route) => {
        await new Promise((r) => setTimeout(r, 1500))
        await route.fulfill({ json: { country: 'PE' } })
      })
      await page.goto(`${ruta}?${CAMPANA}`)
      const form = await rellenar(page)
      await expect(form.getByText('+51', { exact: true })).toBeVisible({ timeout: 5_000 })
      await expect(page.getByPlaceholder('Número')).toHaveValue('911112222')
      await expect(page.getByPlaceholder('Tu nombre')).toHaveValue('Ana')
      await form.locator('button[type="submit"]').click()
      await expect(page).toHaveURL(/\/gracias/, { timeout: 15_000 })
      expect(leads[0].telefono).toBe('+51911112222')
    })

    test('si /api/geo tarda más que el tope, el lead sale con +56', async ({ page }) => {
      const leads = await capturarLeads(page)
      await page.route('**/api/geo', async (route) => {
        await new Promise((r) => setTimeout(r, 6000))
        await route.fulfill({ json: { country: 'PE' } }).catch(() => {})
      })
      await page.goto(`${ruta}?${CAMPANA}`)
      const form = await rellenar(page)
      await form.locator('button[type="submit"]').click()
      await expect(page).toHaveURL(/\/gracias/, { timeout: 15_000 })
      expect(leads[0].telefono).toBe('+56911112222')
    })
  })
}

test.describe('formulario «Cuéntanos tu caso» de la home', () => {
  const enviarCaso = async (page: Page, iso?: string) => {
    const leads = await capturarLeads(page)
    await page.route('**/api/geo', (route) =>
      iso ? route.fulfill({ json: { country: iso } }) : route.abort()
    )
    await page.goto(`/?${CAMPANA}`)
    const form = page.locator('form[aria-label="Cuéntanos tu caso"]')
    await form.scrollIntoViewIfNeeded()
    await form.getByRole('button', { name: /continuar/i }).click()
    await form.locator('#caso-nombre').fill('Ana')
    await form.getByPlaceholder('Nombre de tu empresa').fill('Acme SpA')
    await form.getByPlaceholder('nombre@empresa.com').fill('ana@acme.cl')
    await form.locator('#caso-telefono').fill('911112222')
    return { form, leads }
  }

  for (const { iso, prefijo } of [{ iso: undefined, prefijo: '+56' }, ...PAISES_LEAD]) {
    test(`un visitante ${iso ?? 'sin país'} envía el caso con ${prefijo} y la atribución de la campaña`, async ({
      page,
    }) => {
      const { form, leads } = await enviarCaso(page, iso)
      await expect(form.getByText(prefijo, { exact: true })).toBeVisible()
      await form.getByRole('button', { name: 'Enviar', exact: true }).click()
      await expect.poll(() => leads.length, { timeout: 10_000 }).toBe(1)
      expect(leads[0].telefono).toBe(`${prefijo}911112222`)
      expect(leads[0]).toMatchObject({ gclid: 'TESTGCLID123', utmCampaign: 'test-campana-cl' })
      await expect(page.locator('#caso-gracias')).toBeVisible()
    })
  }
})

test.describe('/contactanos', () => {
  for (const { iso, prefijo } of [
    { iso: 'CL', prefijo: '+56' },
    { iso: 'PE', prefijo: '+51' },
  ]) {
    test(`un visitante de ${iso} envía el contacto con ${prefijo} y atribución, sin crear contactos reales`, async ({
      page,
    }) => {
      const leads = await capturarLeads(page)
      const contactos: Lead[] = []
      await page.route('**/send_contact_info/**', async (route) => {
        contactos.push(JSON.parse(route.request().postData() ?? '{}'))
        await route.fulfill({ status: 200, contentType: 'application/json', body: '{}' })
      })
      await page.route('**/api/geo', (route) => route.fulfill({ json: { country: iso } }))
      await page.goto(`/contactanos?${CAMPANA}`)
      await page.getByPlaceholder('Tu nombre').fill('Ana')
      await page.getByPlaceholder('Tu apellido').fill('Pérez')
      await page.getByPlaceholder('Nombre de tu empresa').fill('Acme SpA')
      await page.getByPlaceholder('tu@email.com').fill('ana@acme.cl')
      await page.getByPlaceholder('Número').fill('911112222')
      const form = page.locator('form').filter({ has: page.getByPlaceholder('Tu nombre') })
      await expect(form.getByText(prefijo, { exact: true })).toBeVisible()
      await form.getByText('10-50', { exact: true }).click()
      await form.getByText('No', { exact: true }).click()
      await form.locator('button[type="submit"]').click()
      await expect(page).toHaveURL(/\/thankyou/, { timeout: 15_000 })
      expect(contactos).toHaveLength(1)
      expect(contactos[0]).toMatchObject({
        telefono: `${prefijo}911112222`,
        utmSource: 'google',
        utmCampaign: 'test-campana-cl',
      })
      await expect.poll(() => leads.length, { timeout: 10_000 }).toBe(1)
      expect(leads[0]).toMatchObject({ telefono: `${prefijo}911112222`, gclid: 'TESTGCLID123' })
    })
  }
})
