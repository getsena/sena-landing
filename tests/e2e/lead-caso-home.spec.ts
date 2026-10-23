import { readFileSync } from 'fs'
import { NextRequest } from 'next/server'
import { test, expect } from '@playwright/test'

import { POST as postLead } from '@/app/api/lead/route'
import { productoDelCaso } from '@/lib/lead/caso'
import { validateLead } from '@/lib/lead/validate'

// Formulario «Cuéntanos tu caso» de la home: manda un bloque `caso` y no trae apellido, facturas
// pendientes ni «alguien cobrando». /api/lead lo acepta sin inventar esos campos.

const caso = {
  cotizar: 'habitual',
  tipo_cartera: 'B2B',
  necesidad: 'delegar',
  canales: ['Correo', 'WhatsApp'],
  volumen_clientes: 120,
  antiguedad: '31-90',
  comentarios: 'Cartera con distribuidores.',
}

const homeLead = {
  nombre: 'Ana',
  empresa: 'Acme SpA',
  email: 'ana@acme.cl',
  telefono: '+56911111111',
  producto: 'Opera',
  caso,
}

test.describe('validateLead con caso', () => {
  test('acepta el payload de la home sin apellido, facturas ni «alguien cobrando»', () => {
    const r = validateLead(homeLead)
    expect(r.ok).toBe(true)
    if (r.ok) {
      expect(r.value.apellido).toBe('')
      expect(r.value.facturas_pendientes).toBe('')
      expect(r.value.alguien_cobrando).toBe('')
      expect(r.value.caso).toMatchObject({ necesidad: 'delegar', canales: ['Correo', 'WhatsApp'] })
    }
  })

  test('sin caso, apellido, facturas y «alguien cobrando» siguen siendo obligatorios', () => {
    const { caso: _, ...sinCaso } = homeLead
    void _
    expect(validateLead(sinCaso).ok).toBe(false)
  })

  test('rechaza opciones fuera de lo permitido', () => {
    for (const malo of [
      { ...caso, cotizar: 'otro' },
      { ...caso, tipo_cartera: 'B2G' },
      { ...caso, necesidad: 'todo' },
      { ...caso, canales: ['Fax'] },
      { ...caso, canales: 'Correo' },
      { ...caso, comentarios: 'a'.repeat(1001) },
      'caso',
      null,
    ]) {
      expect(validateLead({ ...homeLead, caso: malo }).ok, JSON.stringify(malo)).toBe(false)
    }
  })

  test('descarta volúmenes y antigüedad inválidos sin rechazar el lead', () => {
    const r = validateLead({
      ...homeLead,
      caso: { ...caso, volumen_clientes: -3, volumen_facturas: 1.5, antiguedad: 'siempre' },
    })
    expect(r.ok).toBe(true)
    if (r.ok) {
      expect(r.value.caso?.volumen_clientes).toBeUndefined()
      expect(r.value.caso?.volumen_facturas).toBeUndefined()
      expect(r.value.caso?.antiguedad).toBeUndefined()
    }
  })

  test('si vienen facturas o «alguien cobrando», se validan igual', () => {
    expect(validateLead({ ...homeLead, facturas_pendientes: '999' }).ok).toBe(false)
  })
})

test.describe('productoDelCaso', () => {
  test('asigna el producto según lo que cotiza y la necesidad', () => {
    expect(productoDelCaso({ cotizar: 'recupera', necesidad: 'equipo' })).toBe('Recupera')
    expect(productoDelCaso({ cotizar: 'habitual', necesidad: 'dificil' })).toBe('Recupera')
    expect(productoDelCaso({ cotizar: 'habitual', necesidad: 'delegar' })).toBe('Opera')
    expect(productoDelCaso({ cotizar: 'habitual', necesidad: 'equipo' })).toBe('Plataforma')
    expect(productoDelCaso({ cotizar: 'habitual', necesidad: 'recaudacion' })).toBe('Plataforma')
  })
})

test.describe('/api/lead con caso', () => {
  test.beforeEach(() => {
    process.env.HUBSPOT_ACCESS_TOKEN = 'test-token'
    delete process.env.META_PIXEL_ID
    delete process.env.META_CAPI_TOKEN
  })

  test('guarda el caso en el contexto y el negocio, sin prioridad ni campos inventados', async () => {
    const calls: { method: string; url: string; body: unknown }[] = []
    const original = globalThis.fetch
    globalThis.fetch = (async (url: string, init: RequestInit = {}) => {
      const method = init.method ?? 'GET'
      calls.push({ method, url, body: init.body ? JSON.parse(String(init.body)) : undefined })
      const json = (status: number, data: unknown) =>
        new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json' } })
      if (url.includes('/contacts/search')) return json(200, { total: 0, results: [] })
      if (method === 'POST' && url.endsWith('/crm/v3/objects/contacts')) return json(201, { id: '77' })
      if (url.endsWith('/crm/v3/objects/deals')) return json(201, { id: '88' })
      return json(200, {})
    }) as typeof fetch
    try {
      const res = await postLead(
        new NextRequest('http://localhost/api/lead', { method: 'POST', body: JSON.stringify(homeLead) })
      )
      expect(res.status).toBe(200)

      const contacto = calls.find((c) => c.method === 'POST' && c.url.endsWith('/crm/v3/objects/contacts'))
      const props = (contacto?.body as { properties: Record<string, string> }).properties
      expect(props.firstname).toBe('Ana')
      expect(props.lastname).toBe('')
      for (const k of ['sena_prioridad', 'sena_intencion', 'facturas_pendientes', 'alguien_cobrando']) {
        expect(props).not.toHaveProperty(k)
      }
      expect(props.sena_contexto).toContain('Lead home')
      expect(props.sena_contexto).toContain('Principal necesidad: Delegar la gestión')
      expect(props.sena_contexto).toContain('Canales: Correo, WhatsApp')

      const negocio = calls.find((c) => c.method === 'POST' && c.url.endsWith('/crm/v3/objects/deals'))
      const deal = (negocio?.body as { properties: Record<string, string> }).properties
      expect(deal.dealname).toBe('Opera — Acme SpA')
      expect(deal.description).toContain('Tipo de cartera: B2B')

      // la lista de HubSpot es la del producto asignado
      expect(calls.some((c) => c.url.includes('/lists/364/memberships/add'))).toBe(true)
    } finally {
      globalThis.fetch = original
    }
  })
})

test.describe('formulario de la home', () => {
  const t = readFileSync('src/ui/home/sections/CaseForm/CaseForm.tsx', 'utf8')

  test('emite una sola conversión de Ads, con el eventId del lead y después de la confirmación', () => {
    expect(t.match(/trackLeadConversion\(/g)).toHaveLength(1)
    expect(t).toContain('{ eventId })')
    expect(t.indexOf('trackLeadConversion(')).toBeGreaterThan(t.indexOf('!json.ok'))
    expect(t).not.toContain("'conversion'")
    expect(t).not.toMatch(/AW-17962976949\/\w+/)
  })

  test('avisa a GTM una sola vez con conversion_event_signup_2 y el origin del producto en minúscula', () => {
    expect(t.match(/event: 'conversion_event_signup_2'/g)).toHaveLength(1)
    expect(t).toContain('origin: CONVERSION[producto]')
    expect(t.indexOf("event: 'conversion_event_signup_2'")).toBeGreaterThan(t.indexOf('!json.ok'))
    // GTM filtra por origin con `equals`: 'Recupera' no coincidiría y el lead se perdería en GA4.
    const origenes = [...t.matchAll(/^\s+(?:Plataforma|Opera|Recupera): '(\w+)',$/gm)].map((m) => m[1])
    expect(origenes.sort()).toEqual(['opera', 'plataforma', 'recupera'])
  })

  test('envía a /api/lead con Turnstile y el teléfono con prefijo de país', () => {
    expect(t).toContain("fetch('/api/lead'")
    expect(t).toContain("'cf-turnstile-response': turnstileToken")
    expect(t).toMatch(/telefono: `\$\{prefijo/)
  })
})
