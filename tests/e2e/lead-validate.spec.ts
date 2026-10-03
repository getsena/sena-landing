import { NextRequest } from 'next/server'
import { test, expect } from '@playwright/test'

import { POST as postAnalyzer } from '@/app/api/lead-analyzer/route'
import { POST as postLead } from '@/app/api/lead/route'
import { MAX_BODY_BYTES, validateAnalyzerLead, validateLead } from '@/lib/lead/validate'

const lead = {
  nombre: 'Ana',
  apellido: 'Pérez',
  empresa: 'Acme SpA',
  email: 'ana@acme.cl',
  telefono: '+56 9 1111 1111',
  facturas_pendientes: '10-50',
  alguien_cobrando: 'Sí',
}

const analyzer = {
  nombre: 'Ana',
  empresa: 'Acme',
  email: 'ana@acme.cl',
  cartera_total_riesgo_clp: 5_000_000,
  cartera_recuperable_clp: 3_000_000,
  cartera_bucket_critico: 2,
  facturacion_mensual_rango: '10M-50M',
  industria: 'Retail',
}

const okLead = (over: object) => validateLead({ ...lead, ...over })

test.describe('validateLead', () => {
  test('acepta el payload que envían los formularios', () => {
    const r = validateLead({ ...lead, producto: 'Recupera', gclid: 'abc_123-x', utmCampaign: '23588970667' })
    expect(r.ok).toBe(true)
    if (r.ok) {
      expect(r.value.producto).toBe('Recupera')
      expect(r.value.gclid).toBe('abc_123-x')
    }
  })

  test('rechaza lo que no es un objeto', () => {
    for (const raw of [null, 'x', 5, [], undefined]) expect(validateLead(raw).ok).toBe(false)
  })

  test('rechaza campos que no son string (arrays, objetos, números)', () => {
    for (const campo of ['nombre', 'apellido', 'empresa', 'email', 'telefono', 'facturas_pendientes', 'alguien_cobrando']) {
      for (const malo of [['a@b.cl'], { a: 1 }, 123, true, null]) {
        expect(okLead({ [campo]: malo }).ok, `${campo}=${JSON.stringify(malo)}`).toBe(false)
      }
    }
  })

  test('rechaza largos excesivos', () => {
    expect(okLead({ nombre: 'a'.repeat(101) }).ok).toBe(false)
    expect(okLead({ email: `${'a'.repeat(250)}@b.cl` }).ok).toBe(false)
    expect(okLead({ telefono: '1'.repeat(31) }).ok).toBe(false)
  })

  test('rechaza email, teléfono y opciones fuera de lo permitido', () => {
    expect(okLead({ email: 'sin-arroba' }).ok).toBe(false)
    expect(okLead({ telefono: 'abc' }).ok).toBe(false)
    expect(okLead({ facturas_pendientes: '999' }).ok).toBe(false)
    expect(okLead({ alguien_cobrando: 'quizás' }).ok).toBe(false)
  })

  test('quita caracteres de control y recorta espacios', () => {
    const r = okLead({ nombre: '  Ana\u0000\n\u0007 ', empresa: 'Acme\r\nSpA' })
    expect(r.ok).toBe(true)
    if (r.ok) {
      expect(r.value.nombre).toBe('Ana')
      expect(r.value.empresa).toBe('AcmeSpA')
    }
  })

  test('descarta (sin rechazar el lead) atribución con formato inválido', () => {
    const r = okLead({
      gclid: 'x'.repeat(300),
      fbclid: '<script>',
      gbraid: { a: 1 },
      utmSource: 'a'.repeat(300),
      landingPage: 'javascript:alert(1)',
      eventId: 'no-es-uuid',
    })
    expect(r.ok).toBe(true)
    if (r.ok) {
      expect(r.value.gclid).toBeUndefined()
      expect(r.value.fbclid).toBeUndefined()
      expect(r.value.gbraid).toBeUndefined()
      expect(r.value.utmSource).toBeUndefined()
      expect(r.value.landingPage).toBeUndefined()
      expect(r.value.eventId).toBeUndefined()
    }
  })

  test('conserva una URL http(s) válida y un eventId UUID', () => {
    const id = '123e4567-e89b-42d3-a456-426614174000'
    const r = okLead({ landingPage: 'https://www.somossena.com/recupera', eventId: id.toUpperCase() })
    expect(r.ok).toBe(true)
    if (r.ok) {
      expect(r.value.landingPage).toBe('https://www.somossena.com/recupera')
      expect(r.value.eventId).toBe(id)
    }
  })

  test('un producto desconocido se ignora y no rechaza el lead', () => {
    const r = okLead({ producto: 'Otro' })
    expect(r.ok).toBe(true)
    if (r.ok) expect(r.value.producto).toBeUndefined()
  })
})

test.describe('validateAnalyzerLead', () => {
  test('acepta el payload del analizador', () => {
    expect(validateAnalyzerLead(analyzer).ok).toBe(true)
  })

  test('rechaza montos no numéricos, negativos, infinitos y enormes', () => {
    for (const malo of ['abc', -1, Infinity, NaN, 1e16, null, {}]) {
      expect(validateAnalyzerLead({ ...analyzer, cartera_total_riesgo_clp: malo }).ok, String(malo)).toBe(false)
      expect(validateAnalyzerLead({ ...analyzer, cartera_recuperable_clp: malo }).ok, String(malo)).toBe(false)
    }
  })

  test('rechaza un bucket que no sea entero de 0 a 5', () => {
    for (const malo of [-1, 6, 1.5, '2', null, {}]) {
      expect(validateAnalyzerLead({ ...analyzer, cartera_bucket_critico: malo }).ok, String(malo)).toBe(false)
    }
  })

  test('el teléfono es opcional, pero si es inválido se descarta', () => {
    const r = validateAnalyzerLead({ ...analyzer, telefono: 'abc' })
    expect(r.ok).toBe(true)
    if (r.ok) expect(r.value.telefono).toBeUndefined()
  })
})

// Las rutas responden 400 o 413 sin llamar a HubSpot ni a Meta.
test.describe('las rutas rechazan payloads inválidos antes de tocar servicios externos', () => {
  test.beforeEach(() => {
    process.env.HUBSPOT_ACCESS_TOKEN = 'test-token'
    process.env.META_PIXEL_ID = 'pixel'
    process.env.META_CAPI_TOKEN = 'capi'
  })

  const post = (run: typeof postLead, path: string, body: string) =>
    run(new NextRequest(`http://localhost${path}`, { method: 'POST', body }))

  for (const [path, run, base] of [
    ['/api/lead', postLead, lead],
    ['/api/lead-analyzer', postAnalyzer, analyzer],
  ] as const) {
    test(`${path}: email como array responde 400 y no llama a nadie`, async () => {
      const llamadas: string[] = []
      const original = globalThis.fetch
      globalThis.fetch = (async (url: string) => {
        llamadas.push(String(url))
        return new Response('{}')
      }) as typeof fetch
      try {
        const res = await post(run, path, JSON.stringify({ ...base, email: ['ana@acme.cl'] }))
        expect(res.status).toBe(400)
        expect(llamadas).toEqual([])
      } finally {
        globalThis.fetch = original
      }
    })

    test(`${path}: un cuerpo enorme responde 413`, async () => {
      const original = globalThis.fetch
      let llamado = false
      globalThis.fetch = (async () => {
        llamado = true
        return new Response('{}')
      }) as typeof fetch
      try {
        const res = await post(run, path, JSON.stringify({ ...base, nombre: 'a'.repeat(MAX_BODY_BYTES) }))
        expect(res.status).toBe(413)
        expect(llamado).toBe(false)
      } finally {
        globalThis.fetch = original
      }
    })

    test(`${path}: JSON inválido responde 400`, async () => {
      const res = await post(run, path, '{no es json')
      expect(res.status).toBe(400)
    })
  }
})
