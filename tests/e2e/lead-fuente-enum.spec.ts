import { test, expect } from '@playwright/test'

import { mapFuente } from '@/lib/lead/attribution'

// Regresión: un lead con gclid mandaba fuente_del_lead="Google Ads", valor ausente del
// enum de HubSpot → 400 INVALID_OPTION → se perdía TODO lead pagado (Google y Meta Ads).
// Enum real, confirmado en la respuesta de la API:
const FUENTES_VALIDAS = ['Ads', 'Orgánico', 'Referido', 'Outbound/Piloto BBDD', 'MetaRecsa']

test('lead desde Google Ads (gclid) emite una fuente del enum válido', () => {
  const fuente = mapFuente(undefined, 'EAIaIQobChMI5LTGpLPOlgMVqkxIAB3lKxly')
  expect(FUENTES_VALIDAS).toContain(fuente)
  expect(fuente).toBe('Ads')
})

test('lead desde Meta Ads (fbclid) emite una fuente del enum válido', () => {
  const fuente = mapFuente(undefined, undefined, 'fb-click-id-123')
  expect(FUENTES_VALIDAS).toContain(fuente)
  expect(fuente).toBe('Ads')
})

test('lead con utm_source pero sin click id cae en Ads', () => {
  expect(mapFuente('google')).toBe('Ads')
  expect(FUENTES_VALIDAS).toContain(mapFuente('google'))
})

test('lead orgánico (sin utm ni click ids) cae en Orgánico', () => {
  expect(mapFuente()).toBe('Orgánico')
  expect(FUENTES_VALIDAS).toContain(mapFuente())
})

test('ninguna combinación de entradas produce un valor fuera del enum', () => {
  const utms = [undefined, '', 'google', 'facebook', 'linkedin', 'tiktok', 'valor-raro']
  const gclids = [undefined, '', 'gclid-abc']
  const fbclids = [undefined, '', 'fbclid-xyz']

  for (const utm of utms) {
    for (const gclid of gclids) {
      for (const fbclid of fbclids) {
        expect(FUENTES_VALIDAS).toContain(mapFuente(utm, gclid, fbclid))
      }
    }
  }
})
