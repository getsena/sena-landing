import { test, expect } from '@playwright/test'

import { CLASSIFICATION_PROPS, writeContact } from '@/lib/lead/hubspot'

type Call = { method: string; url: string; body: { properties: Record<string, string> } }

// Simula HubSpot: responde en orden con las respuestas dadas y registra cada llamada.
function mockFetch(responses: { status: number; json: unknown }[]) {
  const calls: Call[] = []
  const original = globalThis.fetch
  globalThis.fetch = (async (url: string, init: RequestInit) => {
    calls.push({ method: init.method ?? 'GET', url, body: JSON.parse(String(init.body)) })
    const r = responses[calls.length - 1] ?? { status: 200, json: {} }
    return new Response(JSON.stringify(r.json), {
      status: r.status,
      headers: { 'Content-Type': 'application/json' },
    })
  }) as typeof fetch
  return { calls, restore: () => (globalThis.fetch = original) }
}

const PROPS: Record<string, string> = {
  email: 'a@b.cl',
  firstname: 'Ana',
  origen: 'Google',
  origen_detalle: 'google_search_plataforma',
  fuente_del_lead: 'Ads',
  sena_prioridad: 'A',
}

test.describe('writeContact: un campo de clasificación nunca cuesta el lead', () => {
  test('guarda a la primera si HubSpot acepta todo', async () => {
    const m = mockFetch([{ status: 200, json: { id: '1' } }])
    try {
      const res = await writeContact('tok', 'POST', '/crm/v3/objects/contacts', PROPS)
      expect(res.ok).toBe(true)
      expect(m.calls).toHaveLength(1)
      expect(m.calls[0].body.properties).toEqual(PROPS)
    } finally {
      m.restore()
    }
  })

  test('reintenta sin clasificación ante INVALID_OPTION y conserva los datos de contacto', async () => {
    const m = mockFetch([
      { status: 400, json: { errors: [{ code: 'INVALID_OPTION', message: 'fuente_del_lead' }] } },
      { status: 201, json: { id: '2' } },
    ])
    try {
      const res = await writeContact('tok', 'POST', '/crm/v3/objects/contacts', PROPS)
      expect(res.ok).toBe(true)
      expect(m.calls).toHaveLength(2)
      expect(Object.keys(m.calls[1].body.properties).sort()).toEqual(['email', 'firstname'])
    } finally {
      m.restore()
    }
  })

  test('reintenta sin clasificación ante PROPERTY_DOESNT_EXIST (propiedad nueva aún no creada)', async () => {
    const m = mockFetch([
      {
        status: 400,
        json: {
          status: 'error',
          message: 'Property values were not valid: [{"error":"PROPERTY_DOESNT_EXIST","name":"origen_detalle"}]',
        },
      },
      { status: 200, json: { id: '3' } },
    ])
    try {
      const res = await writeContact('tok', 'PATCH', '/crm/v3/objects/contacts/3', PROPS)
      expect(res.ok).toBe(true)
      expect(m.calls).toHaveLength(2)
      expect(m.calls[1].body.properties).not.toHaveProperty('origen_detalle')
      expect(m.calls[1].body.properties.email).toBe('a@b.cl')
    } finally {
      m.restore()
    }
  })

  test('no reintenta ante otros errores y devuelve la respuesta fallida', async () => {
    const m = mockFetch([{ status: 500, json: { message: 'boom' } }])
    try {
      const res = await writeContact('tok', 'POST', '/crm/v3/objects/contacts', PROPS)
      expect(res.status).toBe(500)
      expect(m.calls).toHaveLength(1)
    } finally {
      m.restore()
    }
  })

  test('origen_detalle forma parte de las propiedades de clasificación', () => {
    expect(CLASSIFICATION_PROPS).toContain('origen_detalle')
  })
})
