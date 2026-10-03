// Opciones válidas del enum `fuente_del_lead` en HubSpot. Mandar cualquier otro
// valor devuelve 400 INVALID_OPTION y tumba el lead completo.
const FUENTE_ADS = 'Ads'
const FUENTE_ORGANICO = 'Orgánico'

// utm_source → valor del enum origen en HubSpot
export function mapOrigen(utmSource?: string, gclid?: string, fbclid?: string): string {
  if (gclid) return 'Google'
  if (fbclid) return 'Meta'
  const src = (utmSource ?? '').toLowerCase()
  if (src === 'google' || src === 'cpc') return 'Google'
  if (src === 'facebook' || src === 'meta' || src === 'fb') return 'Meta'
  if (src === 'linkedin') return 'LinkedIn'
  return 'Orgánico'
}

// Todo tráfico pagado (Google Ads, Meta Ads) cae en 'Ads' — el enum de HubSpot no
// distingue plataforma. El detalle de la plataforma vive en `origen` y `gclid`/`fbclid`.
export function mapFuente(utmSource?: string, gclid?: string, fbclid?: string): string {
  if (gclid || fbclid || utmSource) return FUENTE_ADS
  return FUENTE_ORGANICO
}
