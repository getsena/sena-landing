import { test, expect } from '@playwright/test'

// llms.txt solo puede decir lo que dice el sitio visible: sin proveedores internos ni países
// donde Sena no opera (#161).

test('llms.txt no nombra proveedores internos ni países sin confirmar', async ({ request }) => {
  const res = await request.get('/llms.txt')
  expect(res.status()).toBe(200)

  const body = await res.text()
  expect(body).toContain('Chile')
  expect(body).not.toMatch(/kapso|khipu|mercado ?pago|evolution api|colombia|ecuador|méxico|mexico/i)
})
