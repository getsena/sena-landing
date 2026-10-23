import { test, expect } from '@playwright/test'

// El prefijo de teléfono de los formularios arranca en Chile (+56): el HTML que entrega el servidor,
// antes de que cargue el JS, no debe mostrar +51. Con JS desactivado se ve exactamente ese primer render.
// Corre contra un servidor local:
//
//   yarn build && yarn start -p 39847
//   E2E_BASE_URL=http://localhost:39847 yarn playwright test tests/e2e/prefijo-telefono-chile.spec.ts
const BASE = process.env.E2E_BASE_URL
test.skip(!BASE, 'sin E2E_BASE_URL')
test.use({ baseURL: BASE, javaScriptEnabled: false })

const RUTAS = ['/plataforma', '/recupera', '/opera', '/contactanos']

for (const ruta of RUTAS) {
  test(`${ruta}: el selector de prefijo muestra +56 en el primer render`, async ({ page }) => {
    await page.goto(ruta)
    const form = page.locator('form').filter({ has: page.getByPlaceholder('Número') })
    await expect(form).toHaveCount(1)
    await expect(form.getByText('+56', { exact: true })).toHaveCount(1)
    await expect(form.getByText('+51', { exact: true })).toHaveCount(0)
  })
}
