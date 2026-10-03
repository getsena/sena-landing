import { NextRequest } from 'next/server'
import { test, expect } from '@playwright/test'

import { POST as postAnalyzer } from '@/app/api/lead-analyzer/route'

type Call = { method: string; url: string; body: unknown }

// Valores válidos del enum fuente_del_lead en HubSpot. Cualquier otro devuelve 400.
const FUENTES_VALIDAS = ['Ads', 'Orgánico', 'Referido', 'Outbound/Piloto BBDD', 'MetaRecsa']

// Simula HubSpot (y Meta) por ruta. `contactPost` define las respuestas sucesivas al crear contacto.
function mockHubspot(opts: { contactPost?: { status: number; json: unknown }[] } = {}) {
  const calls: Call[] = []
  let contactPosts = 0
  const original = globalThis.fetch
  globalThis.fetch = (async (url: string, init: RequestInit = {}) => {
    const method = init.method ?? 'GET'
    const body = init.body ? JSON.parse(String(init.body)) : undefined
    calls.push({ method, url, body })
    const json = (status: number, data: unknown) =>
      new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json' } })
    if (url.includes('/contacts/search')) return json(200, { total: 0, results: [] })
    if (method === 'POST' && url.endsWith('/crm/v3/objects/contacts')) {
      const r = opts.contactPost?.[contactPosts++] ?? { status: 201, json: { id: '77' } }
      return json(r.status, r.json)
    }
    if (url.endsWith('/crm/v3/objects/deals')) return json(201, { id: '88' })
    if (url.includes('/memberships/add')) return json(200, {})
    return json(200, {})
  }) as typeof fetch
  return { calls, restore: () => (globalThis.fetch = original) }
}

const contactWrites = (calls: Call[]) =>
  calls.filter((c) => c.method === 'POST' && c.url.endsWith('/crm/v3/objects/contacts'))

const analyzerPayload = {
  nombre: 'Ana',
  empresa: 'Acme',
  email: 'ana@acme.cl',
  cartera_total_riesgo_clp: 5_000_000,
  cartera_recuperable_clp: 3_000_000,
  cartera_bucket_critico: 2,
  facturacion_mensual_rango: '10M-50M',
  industria: 'Retail',
}

test.beforeEach(() => {
  process.env.HUBSPOT_ACCESS_TOKEN = 'test-token'
  delete process.env.META_PIXEL_ID
  delete process.env.META_CAPI_TOKEN
})

function req(path: string, payload: unknown) {
  return new NextRequest(`http://localhost${path}`, { method: 'POST', body: JSON.stringify(payload) })
}

test.describe('/api/lead-analyzer: atribución', () => {
  test('lead con gclid manda fuente_del_lead válida, origen Google y origen_detalle', async () => {
    const m = mockHubspot()
    try {
      const res = await postAnalyzer(req('/api/lead-analyzer', { ...analyzerPayload, gclid: 'abc', utmCampaign: '23588970667' }))
      expect(res.status).toBe(200)
      const props = (contactWrites(m.calls)[0].body as { properties: Record<string, string> }).properties
      expect(FUENTES_VALIDAS).toContain(props.fuente_del_lead)
      expect(props.fuente_del_lead).toBe('Ads')
      expect(props.origen).toBe('Google')
      expect(props.origen_detalle).toBe('google_search_plataforma')
    } finally {
      m.restore()
    }
  })

  test('lead con fbclid nunca manda "Meta Ads" como fuente', async () => {
    const m = mockHubspot()
    try {
      await postAnalyzer(req('/api/lead-analyzer', { ...analyzerPayload, fbclid: 'fb1' }))
      const props = (contactWrites(m.calls)[0].body as { properties: Record<string, string> }).properties
      expect(props.fuente_del_lead).toBe('Ads')
      expect(props.origen).toBe('Meta')
    } finally {
      m.restore()
    }
  })

  test('lead sin señales es orgánico', async () => {
    const m = mockHubspot()
    try {
      await postAnalyzer(req('/api/lead-analyzer', analyzerPayload))
      const props = (contactWrites(m.calls)[0].body as { properties: Record<string, string> }).properties
      expect(props.fuente_del_lead).toBe('Orgánico')
      expect(props.origen_detalle).toBe('organico_directo')
    } finally {
      m.restore()
    }
  })

  test('rechaza un payload sin campos requeridos', async () => {
    const m = mockHubspot()
    try {
      const res = await postAnalyzer(req('/api/lead-analyzer', { nombre: 'Ana' }))
      expect(res.status).toBe(400)
      expect(contactWrites(m.calls)).toHaveLength(0)
    } finally {
      m.restore()
    }
  })
})
