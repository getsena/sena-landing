import { test, expect } from '@playwright/test'

import { ADS_CONVERSION_LABEL } from '@/lib/tracking/leadConversion'

// Cada producto debe disparar SOLO la conversión de Google Ads de su producto. Las acciones
// "Sena/Recupera/Opera - Formulario enviado" son principales (una por clic): si una landing de Recupera u
// Opera dispara además la genérica de Sena, cada lead cuenta dos conversiones.
// El disparo vive en un solo helper (`trackLeadConversion`); las pruebas de uso por formulario están en
// lead-conversion-unica.spec.ts.
test.describe('etiquetas de conversión de Google Ads por producto', () => {
  test('hay una etiqueta distinta por producto', () => {
    expect(Object.keys(ADS_CONVERSION_LABEL).sort()).toEqual(['opera', 'plataforma', 'recupera'])
    expect(new Set(Object.values(ADS_CONVERSION_LABEL)).size).toBe(3)
  })
})
