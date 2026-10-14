import { test, expect, type Page, type Route } from '@playwright/test'

// E2E del widget de Turnstile en el formulario de /plataforma, en un navegador real.
// Corre contra un servidor local construido con la site key de prueba de Cloudflare (siempre pasa):
//
//   NEXT_PUBLIC_TURNSTILE_SITE_KEY=1x00000000000000000000AA yarn build
//   yarn start -p 39847
//   E2E_BASE_URL=http://localhost:39847 yarn playwright test tests/e2e/turnstile-form.spec.ts
//
// /api/lead se intercepta: aquí se verifica lo que el formulario ENVÍA, no lo que hace el servidor.
const BASE = process.env.E2E_BASE_URL
test.skip(!BASE, 'sin E2E_BASE_URL')
test.use({ baseURL: BASE })

const DUMMY_TOKEN = 'XXXX.DUMMY.TOKEN.XXXX'

async function fillForm(page: Page) {
  await page.goto('/plataforma')
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

const submit = (form: ReturnType<Page['locator']>) =>
  form.getByRole('button', { name: /solicitar demo gratuito/i }).click()

type Captured = { body: Record<string, unknown> }

function interceptLead(page: Page, replies: Array<{ status: number; json: unknown }>) {
  const captured: Captured[] = []
  let n = 0
  return page
    .route('**/api/lead', async (route: Route) => {
      captured.push({ body: JSON.parse(route.request().postData() ?? '{}') })
      const r = replies[Math.min(n++, replies.length - 1)]
      await route.fulfill({ status: r.status, contentType: 'application/json', body: JSON.stringify(r.json) })
    })
    .then(() => captured)
}

test('envía el token de Turnstile en el cuerpo de /api/lead', async ({ page }) => {
  const captured = await interceptLead(page, [{ status: 200, json: { ok: true } }])
  const form = await fillForm(page)
  // Cloudflare tarda unos segundos en entregar el token: se espera a que el widget lo tenga.
  await page.waitForFunction(() => {
    const t = document.querySelector<HTMLInputElement>('input[name="cf-turnstile-response"]')
    return !!t?.value
  })
  await submit(form)
  await expect(page).toHaveURL(/\/plataforma\/gracias/, { timeout: 15_000 })
  expect(captured).toHaveLength(1)
  expect(captured[0].body['cf-turnstile-response']).toBe(DUMMY_TOKEN)
  expect(captured[0].body.email).toBe('ana@acme.cl')
})

test('si Cloudflare está bloqueado el formulario se envía igual, sin token', async ({ page }) => {
  await page.route('**/challenges.cloudflare.com/**', (route) => route.abort())
  const captured = await interceptLead(page, [{ status: 200, json: { ok: true } }])
  const form = await fillForm(page)
  await submit(form)
  await expect(page).toHaveURL(/\/plataforma\/gracias/, { timeout: 15_000 })
  expect(captured).toHaveLength(1)
  expect(captured[0].body['cf-turnstile-response']).toBeUndefined()
})

test('un 403 muestra el mensaje del servidor y no avanza', async ({ page }) => {
  const mensaje = 'No pudimos verificar que eres una persona. Recarga la página e intenta de nuevo.'
  await interceptLead(page, [{ status: 403, json: { ok: false, error: mensaje } }])
  const form = await fillForm(page)
  await submit(form)
  await expect(page.getByText(mensaje)).toBeVisible({ timeout: 10_000 })
  await expect(page).not.toHaveURL(/gracias/)
})

test('tras un error el siguiente intento vuelve a enviar un token y puede completarse', async ({ page }) => {
  const captured = await interceptLead(page, [
    { status: 403, json: { ok: false, error: 'No pudimos verificar que eres una persona.' } },
    { status: 200, json: { ok: true } },
  ])
  const form = await fillForm(page)
  await submit(form)
  await expect(page.getByText('No pudimos verificar que eres una persona.')).toBeVisible({ timeout: 10_000 })
  await submit(form)
  await expect(page).toHaveURL(/\/plataforma\/gracias/, { timeout: 15_000 })
  expect(captured).toHaveLength(2)
  expect(captured[1].body['cf-turnstile-response']).toBe(DUMMY_TOKEN)
})

for (const ruta of ['/recupera', '/opera', '/contactanos']) {
  test(`el widget de Turnstile también carga y entrega token en ${ruta}`, async ({ page }) => {
    await page.goto(ruta)
    await page.waitForFunction(
      () => !!document.querySelector<HTMLInputElement>('input[name="cf-turnstile-response"]')?.value,
      null,
      { timeout: 20_000 }
    )
  })
}
