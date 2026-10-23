import { readFileSync } from 'fs'

import { test, expect } from '@playwright/test'

import { ADS_CONVERSION_LABEL, trackLeadConversion } from '@/lib/tracking/leadConversion'

// El formulario (o el analizador) emite la conversión de Google Ads con transaction_id = eventId, solo cuando
// el servidor confirma el lead. Las páginas de gracias siguen emitiéndola (redundancia actual): unificar las
// fuentes queda para un PR correctivo.

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
      const ok = trackLeadConversion('recupera', { eventId: 'ev-1' })
      expect(ok).toBe(true)
      expect(calls).toHaveLength(1)
      expect(calls[0]).toEqual([
        'event',
        'conversion',
        { send_to: `AW-17962976949/${ADS_CONVERSION_LABEL.recupera}`, transaction_id: 'ev-1' },
      ])
    })
  })

  test('no envía datos personales del cliente a Google', () => {
    conGtag((calls) => {
      trackLeadConversion('plataforma', { eventId: 'ev-2' })
      expect(calls.some((c) => c[1] === 'user_data' || c[0] === 'set')).toBe(false)
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

test.describe('origen de la conversión', () => {
  const formularios = [
    { producto: 'plataforma', path: 'src/ui/plataforma/sections/PlataformaContactForm.tsx' },
    { producto: 'recupera', path: 'src/ui/recupera/sections/RecuperaContactForm.tsx' },
    { producto: 'opera', path: 'src/ui/opera/sections/OperaContactForm.tsx' },
  ]
  for (const f of formularios) {
    test(`${f.producto}: el formulario emite la conversión con el eventId del lead, tras la confirmación`, () => {
      const t = src(f.path)
      expect(t).toContain(`trackLeadConversion('${f.producto}', { eventId })`)
      expect(t).not.toContain("'conversion'")
      // la conversión va después de la validación de la respuesta del servidor
      expect(t.indexOf('trackLeadConversion(')).toBeGreaterThan(t.indexOf('!json.ok'))
    })
  }

  const gracias = [
    { producto: 'plataforma', path: 'src/ui/plataforma/PlataformaGraciasPage.tsx' },
    { producto: 'recupera', path: 'src/ui/recupera/RecuperaGraciasPage.tsx' },
    { producto: 'opera', path: 'src/ui/opera/OperaGraciasPage.tsx' },
  ]
  for (const g of gracias) {
    test(`${g.producto}: la página de gracias conserva su emisión (no se pierde lo que funciona hoy)`, () => {
      const t = src(g.path)
      expect(t).toContain("'conversion'")
      expect(t).toContain(ADS_CONVERSION_LABEL[g.producto as keyof typeof ADS_CONVERSION_LABEL])
      expect(t).toContain('conversion_event_signup_2')
    })
  }

  test('el analizador de cartera emite la conversión de Plataforma solo si el servidor confirma el lead', () => {
    const t = src('src/ui/shared/PortfolioAnalyzer/PortfolioAnalyzerModal.tsx')
    expect(t).toContain("trackLeadConversion('plataforma'")
    expect(t).toMatch(/res\.ok\s*&&\s*json\.ok/)
    expect(t.indexOf('trackLeadConversion(')).toBeGreaterThan(t.indexOf('res.ok'))
  })

  test('los formularios y el analizador no escriben etiquetas de conversión a mano', () => {
    for (const path of [
      ...formularios.map((f) => f.path),
      'src/ui/shared/PortfolioAnalyzer/PortfolioAnalyzerModal.tsx',
    ]) {
      expect(src(path), path).not.toMatch(/AW-17962976949\/\w+/)
    }
  })
})
