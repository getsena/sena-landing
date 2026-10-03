import { test, expect } from '@playwright/test'

import { mergeAttribution, parseAttribution, toPayload } from '@/lib/lead/clientAttribution'

test.describe('parseAttribution', () => {
  test('lee gclid, gbraid, wbraid, fbclid y los cinco utm', () => {
    const p = parseAttribution(
      '?gclid=g1&gbraid=g2&wbraid=g3&fbclid=f1&utm_source=google&utm_medium=cpc&utm_campaign=23588970667&utm_content=c&utm_term=t'
    )
    expect(p).toEqual({
      gclid: 'g1',
      gbraid: 'g2',
      wbraid: 'g3',
      fbclid: 'f1',
      utm_source: 'google',
      utm_medium: 'cpc',
      utm_campaign: '23588970667',
      utm_content: 'c',
      utm_term: 't',
    })
  })

  test('ignora vacíos y parámetros desconocidos, y recorta espacios', () => {
    expect(parseAttribution('?gclid=&foo=1&utm_source=%20google%20')).toEqual({ utm_source: 'google' })
    expect(parseAttribution('')).toEqual({})
  })

  test('limita el largo de cada valor', () => {
    const largo = 'a'.repeat(1000)
    expect(parseAttribution(`?gclid=${largo}`).gclid).toHaveLength(256)
  })
})

test.describe('mergeAttribution (first-touch con clic pagado nuevo)', () => {
  test('sin clic nuevo, lo guardado se conserva al navegar a otra página sin query', () => {
    const stored = { gclid: 'g1', utm_campaign: '23588970667', utm_medium: 'cpc' }
    expect(mergeAttribution(stored, {})).toEqual(stored)
  })

  test('sin clic nuevo, lo guardado manda y la URL solo completa lo que falta', () => {
    const merged = mergeAttribution({ utm_source: 'google' }, { utm_source: 'otro', utm_term: 'cobranza' })
    expect(merged).toEqual({ utm_source: 'google', utm_term: 'cobranza' })
  })

  test('un clic pagado nuevo reemplaza todo lo anterior', () => {
    const stored = { utm_source: 'newsletter', utm_campaign: 'promo-septiembre' }
    const current = { gclid: 'g9', utm_campaign: '24170007327' }
    expect(mergeAttribution(stored, current)).toEqual(current)
  })

  test('un fbclid nuevo también reemplaza (no mezcla campañas)', () => {
    expect(mergeAttribution({ gclid: 'g1', utm_campaign: '1' }, { fbclid: 'f2' })).toEqual({ fbclid: 'f2' })
  })

  test('gbraid y wbraid cuentan como clic pagado nuevo', () => {
    expect(mergeAttribution({ utm_source: 'x' }, { gbraid: 'b1' })).toEqual({ gbraid: 'b1' })
    expect(mergeAttribution({ utm_source: 'x' }, { wbraid: 'w1' })).toEqual({ wbraid: 'w1' })
  })
})

test.describe('toPayload', () => {
  test('mapea a los nombres que esperan las rutas de lead', () => {
    expect(
      toPayload({ gclid: 'g', gbraid: 'b', wbraid: 'w', fbclid: 'f', utm_source: 's', utm_medium: 'm', utm_campaign: 'c', utm_content: 'o', utm_term: 't' })
    ).toEqual({ gclid: 'g', gbraid: 'b', wbraid: 'w', fbclid: 'f', utmSource: 's', utmMedium: 'm', utmCampaign: 'c', utmContent: 'o', utmTerm: 't' })
  })

  test('sin datos devuelve todo indefinido', () => {
    expect(Object.values(toPayload({})).every((v) => v === undefined)).toBe(true)
  })
})
