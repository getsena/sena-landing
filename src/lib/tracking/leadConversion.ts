// Conversión de Google Ads por lead, emitida desde el origen: el formulario (o el analizador de cartera) la
// llama una sola vez, cuando el servidor confirma el lead.
//
// `transaction_id` = eventId del lead: identifica la conversión de forma única.
//
// Las páginas de gracias y los tags de GTM siguen emitiendo la misma conversión (redundancia que hoy cubre
// bloqueadores y fallas); unificarlas en una sola fuente queda para un PR correctivo.

export type LeadProduct = 'plataforma' | 'recupera' | 'opera'

const ADS_ID = 'AW-17962976949'

// Una acción de conversión principal por producto (una por clic). No mezclar etiquetas entre productos.
export const ADS_CONVERSION_LABEL: Record<LeadProduct, string> = {
  plataforma: 'JNP9CMq42ZgcELWNtfVC',
  recupera: 'sCCeCNfunKccELWNtfVC',
  opera: 'TyATCOr4nKccELWNtfVC',
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

export type LeadConversionInput = {
  eventId: string
}

// Devuelve false si gtag no está (bloqueador, script sin cargar): el lead ya quedó guardado en el servidor.
export function trackLeadConversion(product: LeadProduct, input: LeadConversionInput): boolean {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return false

  window.gtag('event', 'conversion', {
    send_to: `${ADS_ID}/${ADS_CONVERSION_LABEL[product]}`,
    transaction_id: input.eventId,
  })
  return true
}
