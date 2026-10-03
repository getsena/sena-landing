import { NextRequest } from 'next/server'
import { test, expect } from '@playwright/test'

import { POST as postAnalyzer } from '@/app/api/lead-analyzer/route'
import { POST as postLead } from '@/app/api/lead/route'

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

  test('solo manda propiedades que existen en HubSpot y un tipo_de_origen válido', async () => {
    const m = mockHubspot()
    try {
      await postAnalyzer(req('/api/lead-analyzer', analyzerPayload))
      const props = (contactWrites(m.calls)[0].body as { properties: Record<string, string> }).properties
      expect(props.tipo_de_origen).toBe('Form landing')
      for (const inexistente of [
        'cartera_total_riesgo_clp',
        'cartera_recuperable_clp',
        'cartera_bucket_critico',
        'facturacion_mensual_rango',
        'industria',
      ]) {
        expect(props).not.toHaveProperty(inexistente)
      }
      // los datos de cartera siguen disponibles para ventas dentro del contexto
      expect(props.sena_contexto).toContain('Retail')
      expect(props.sena_contexto).toContain('10M-50M')
    } finally {
      m.restore()
    }
  })

  test('si HubSpot falla responde 502, no un éxito silencioso', async () => {
    const m = mockHubspot({ contactPost: [{ status: 500, json: { message: 'boom' } }] })
    try {
      const res = await postAnalyzer(req('/api/lead-analyzer', analyzerPayload))
      expect(res.status).toBe(502)
      expect(await res.json()).toMatchObject({ ok: false })
    } finally {
      m.restore()
    }
  })
})

const leadPayload = {
  nombre: 'Ana',
  apellido: 'Pérez',
  empresa: 'Acme',
  email: 'ana@acme.cl',
  telefono: '+56911111111',
  facturas_pendientes: '10-50',
  alguien_cobrando: 'No',
  producto: 'Recupera',
  fbclid: 'fb1',
}

const capiCalls = (calls: Call[]) => calls.filter((c) => c.url.includes('graph.facebook.com'))

test.describe('Meta CAPI: solo se reporta lo que el CRM guardó', () => {
  test.beforeEach(() => {
    process.env.META_PIXEL_ID = 'pixel-1'
    process.env.META_CAPI_TOKEN = 'capi-token'
  })

  for (const [nombre, run] of [
    ['/api/lead', (p: object) => postLead(req('/api/lead', p))],
    ['/api/lead-analyzer', (p: object) => postAnalyzer(req('/api/lead-analyzer', p))],
  ] as const) {
    const base = nombre === '/api/lead' ? leadPayload : analyzerPayload

    test(`${nombre}: envía el evento Lead con event_id después de guardar en HubSpot`, async () => {
      const m = mockHubspot()
      try {
        const res = await run({ ...base, eventId: 'evt-123' })
        expect(res.status).toBe(200)
        const capi = capiCalls(m.calls)
        expect(capi).toHaveLength(1)
        const evento = (capi[0].body as { data: { event_id: string; event_name: string }[] }).data[0]
        expect(evento.event_name).toBe('Lead')
        expect(evento.event_id).toBe('evt-123')
        // el evento sale después de crear el contacto, no antes
        const iContacto = m.calls.findIndex((c) => c.method === 'POST' && c.url.endsWith('/crm/v3/objects/contacts'))
        expect(m.calls.indexOf(capi[0])).toBeGreaterThan(iContacto)
      } finally {
        m.restore()
      }
    })

    test(`${nombre}: genera un event_id si el cliente no manda uno`, async () => {
      const m = mockHubspot()
      try {
        await run(base)
        const evento = (capiCalls(m.calls)[0].body as { data: { event_id: string }[] }).data[0]
        expect(evento.event_id).toMatch(/^[0-9a-f-]{36}$/)
      } finally {
        m.restore()
      }
    })

    test(`${nombre}: no reporta a Meta si HubSpot falla`, async () => {
      const m = mockHubspot({ contactPost: [{ status: 500, json: { message: 'boom' } }] })
      try {
        const res = await run(base)
        expect(res.status).toBe(502)
        expect(capiCalls(m.calls)).toHaveLength(0)
      } finally {
        m.restore()
      }
    })
  }
})

test.describe('rutas de lead: un campo de clasificación rechazado no pierde el lead', () => {
  const CLASIFICACION = ['origen', 'origen_detalle', 'fuente_del_lead', 'sena_prioridad', 'etapa_del_lead']

  for (const [nombre, run, base] of [
    ['/api/lead', (p: object) => postLead(req('/api/lead', p)), leadPayload],
    ['/api/lead-analyzer', (p: object) => postAnalyzer(req('/api/lead-analyzer', p)), analyzerPayload],
  ] as const) {
    test(`${nombre}: ante 400 INVALID_OPTION reintenta sin clasificación y responde ok`, async () => {
      const m = mockHubspot({
        contactPost: [
          { status: 400, json: { errors: [{ code: 'INVALID_OPTION', message: 'fuente_del_lead' }] } },
          { status: 201, json: { id: '77' } },
        ],
      })
      try {
        const res = await run({ ...base, gclid: 'abc' })
        expect(res.status).toBe(200)
        const writes = contactWrites(m.calls)
        expect(writes).toHaveLength(2)
        const reintento = (writes[1].body as { properties: Record<string, string> }).properties
        for (const k of CLASIFICACION) expect(reintento).not.toHaveProperty(k)
        expect(reintento.email).toBe(base.email)
        expect(reintento.firstname).toBe('Ana')
      } finally {
        m.restore()
      }
    })

    test(`${nombre}: ante PROPERTY_DOESNT_EXIST también guarda el lead sin clasificación`, async () => {
      const m = mockHubspot({
        contactPost: [
          {
            status: 400,
            json: { message: 'Property values were not valid: [{"error":"PROPERTY_DOESNT_EXIST","name":"origen_detalle"}]' },
          },
          { status: 201, json: { id: '78' } },
        ],
      })
      try {
        const res = await run({ ...base, gclid: 'abc' })
        expect(res.status).toBe(200)
        expect(contactWrites(m.calls)).toHaveLength(2)
      } finally {
        m.restore()
      }
    })

    test(`${nombre}: un error que no es de clasificación no se reintenta y responde 502`, async () => {
      const m = mockHubspot({ contactPost: [{ status: 500, json: { message: 'boom' } }] })
      try {
        const res = await run(base)
        expect(res.status).toBe(502)
        expect(contactWrites(m.calls)).toHaveLength(1)
      } finally {
        m.restore()
      }
    })
  }
})

test.describe('smoke tests: los emails +smoke no se reportan a Meta', () => {
  test.beforeEach(() => {
    process.env.META_PIXEL_ID = 'pixel-1'
    process.env.META_CAPI_TOKEN = 'capi-token'
  })

  for (const [nombre, run, base] of [
    ['/api/lead', (p: object) => postLead(req('/api/lead', p)), leadPayload],
    ['/api/lead-analyzer', (p: object) => postAnalyzer(req('/api/lead-analyzer', p)), analyzerPayload],
  ] as const) {
    test(`${nombre}: guarda el lead pero no envía CAPI si el email lleva +smoke`, async () => {
      const m = mockHubspot()
      try {
        const res = await run({ ...base, email: 'smoke+123@somossena.com' })
        expect(res.status).toBe(200)
        expect(contactWrites(m.calls)).toHaveLength(1)
        expect(capiCalls(m.calls)).toHaveLength(0)
      } finally {
        m.restore()
      }
    })

    test(`${nombre}: un email normal sí se reporta a Meta`, async () => {
      const m = mockHubspot()
      try {
        await run({ ...base, email: 'ana+ventas@acme.cl' })
        expect(capiCalls(m.calls)).toHaveLength(1)
      } finally {
        m.restore()
      }
    })
  }
})

