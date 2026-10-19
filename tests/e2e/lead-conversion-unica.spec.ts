import { readFileSync } from 'fs'

import { test, expect } from '@playwright/test'

import { ADS_CONVERSION_LABEL, trackLeadConversion } from '@/lib/tracking/leadConversion'

// Una conversión de Google Ads por lead, emitida desde el origen (el formulario o el analizador) solo cuando
// el servidor confirma el lead. Las páginas de gracias no emiten conversión: contaban recargas y visitas directas.

const src = (path: string) => readFileSync(path, 'utf8')

type Call = unknown[]
function conGtag(fn: (calls: Call[]) => void) {
  const calls: Call[] = []
  const g = globalThis as unknown as { window?: unknown }
  const previo = g.window
  g.window = { gtag: (...args: unknown[]) => calls.push(args) }
  try {
    fn(calls)
  } finally {
    g.window = previo
  }
}

test.describe('trackLeadConversion', () => {
  test('emite una conversión con la etiqueta del producto y transaction_id igual al eventId', () => {
    conGtag((calls) => {
      const ok = trackLeadConversion('recupera', { eventId: 'ev-1', email: 'A@B.cl', telefono: '+56 9 1234 5678' })
      expect(ok).toBe(true)
      const conversiones = calls.filter((c) => c[0] === 'event' && c[1] === 'conversion')
      expect(conversiones).toHaveLength(1)
      expect(conversiones[0][2]).toEqual({
        send_to: `AW-17962976949/${ADS_CONVERSION_LABEL.recupera}`,
        transaction_id: 'ev-1',
      })
    })
  })

  test('envía email y teléfono normalizados (conversiones mejoradas) antes de la conversión', () => {
    conGtag((calls) => {
      trackLeadConversion('plataforma', { eventId: 'ev-2', email: '  Persona@Empresa.CL ', telefono: '+56 9 1234-5678' })
      expect(calls[0]).toEqual(['set', 'user_data', { email: 'persona@empresa.cl', phone_number: '+56912345678' }])
      expect(calls[1][1]).toBe('conversion')
    })
  })

  test('un teléfono sin código de país (no E.164) se omite; el email se envía igual', () => {
    conGtag((calls) => {
      trackLeadConversion('plataforma', { eventId: 'ev-5', email: 'x@y.cl', telefono: '9 1234 5678' })
      expect(calls[0]).toEqual(['set', 'user_data', { email: 'x@y.cl' }])
    })
  })

  test('sin email ni teléfono no envía user_data pero sí la conversión', () => {
    conGtag((calls) => {
      trackLeadConversion('opera', { eventId: 'ev-3' })
      expect(calls.some((c) => c[1] === 'user_data')).toBe(false)
      expect(calls.filter((c) => c[1] === 'conversion')).toHaveLength(1)
    })
  })

  test('cada producto usa su propia etiqueta', () => {
    expect(new Set(Object.values(ADS_CONVERSION_LABEL)).size).toBe(3)
    expect(ADS_CONVERSION_LABEL).toEqual({
      plataforma: 'JNP9CMq42ZgcELWNtfVC',
      recupera: 'sCCeCNfunKccELWNtfVC',
      opera: 'TyATCOr4nKccELWNtfVC',
    })
  })

  test('sin gtag (bloqueador) no falla y devuelve false', () => {
    const g = globalThis as unknown as { window?: unknown }
    const previo = g.window
    g.window = {}
    try {
      expect(trackLeadConversion('recupera', { eventId: 'ev-4' })).toBe(false)
    } finally {
      g.window = previo
    }
  })
})

test.describe('origen único de la conversión', () => {
  const formularios = [
    { producto: 'plataforma', path: 'src/ui/plataforma/sections/PlataformaContactForm.tsx' },
    { producto: 'recupera', path: 'src/ui/recupera/sections/RecuperaContactForm.tsx' },
    { producto: 'opera', path: 'src/ui/opera/sections/OperaContactForm.tsx' },
  ]
  for (const f of formularios) {
    test(`${f.producto}: el formulario emite la conversión con el eventId del lead, tras la confirmación`, () => {
      const t = src(f.path)
      expect(t).toContain(`trackLeadConversion('${f.producto}'`)
      expect(t).toContain('eventId')
      expect(t).not.toContain("'conversion'")
      // la conversión va después de la validación de la respuesta del servidor
      expect(t.indexOf('trackLeadConversion(')).toBeGreaterThan(t.indexOf('!json.ok'))
    })
  }

  const gracias = [
    'src/ui/plataforma/PlataformaGraciasPage.tsx',
    'src/ui/recupera/RecuperaGraciasPage.tsx',
    'src/ui/opera/OperaGraciasPage.tsx',
  ]
  for (const path of gracias) {
    test(`${path} no emite conversión de Ads`, () => {
      const t = src(path)
      expect(t).not.toContain("'conversion'")
      expect(t).not.toContain('AW-17962976949')
      // el evento de GA4 (vía GTM) sigue en la página de gracias
      expect(t).toContain('conversion_event_signup_2')
    })
  }

  test('el analizador de cartera emite la conversión de Plataforma solo si el servidor confirma el lead', () => {
    const t = src('src/ui/shared/PortfolioAnalyzer/PortfolioAnalyzerModal.tsx')
    expect(t).toContain("trackLeadConversion('plataforma'")
    expect(t).toMatch(/res\.ok\s*&&\s*json\.ok/)
    expect(t.indexOf('trackLeadConversion(')).toBeGreaterThan(t.indexOf('res.ok'))
  })

  test('las etiquetas de conversión viven solo en el helper', () => {
    for (const path of [...formularios.map((f) => f.path), ...gracias, 'src/ui/shared/PortfolioAnalyzer/PortfolioAnalyzerModal.tsx']) {
      expect(src(path), path).not.toMatch(/AW-17962976949\/\w+/)
    }
  })
})
