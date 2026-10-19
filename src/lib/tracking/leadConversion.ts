// Conversión de Google Ads por lead, emitida desde el origen: el formulario (o el analizador de cartera) la
// llama una sola vez, cuando el servidor confirma el lead. Las páginas de gracias no la emiten: contaban
// recargas y visitas directas.
//
// - `transaction_id` = eventId del lead: Google deduplica por id aunque la señal llegue más de una vez.
// - `user_data` (conversiones mejoradas): email y teléfono normalizados; gtag los envía con hash. Permite
//   atribuir un lead cuando el clic no trae un gclid válido (iOS con gbraid/wbraid, cookie perdida).

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
  email?: string
  telefono?: string
}

function normalizeEmail(email?: string): string | undefined {
  const v = email?.trim().toLowerCase()
  return v || undefined
}

// E.164: '+' y solo dígitos. Sin dígitos no hay teléfono que enviar.
function normalizePhone(telefono?: string): string | undefined {
  const digits = telefono?.replace(/\D/g, '')
  return digits ? `+${digits}` : undefined
}

// Devuelve false si gtag no está (bloqueador, script sin cargar): el lead ya quedó guardado en el servidor.
export function trackLeadConversion(product: LeadProduct, input: LeadConversionInput): boolean {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return false

  const email = normalizeEmail(input.email)
  const phone_number = normalizePhone(input.telefono)
  if (email || phone_number) {
    window.gtag('set', 'user_data', {
      ...(email ? { email } : {}),
      ...(phone_number ? { phone_number } : {}),
    })
  }

  window.gtag('event', 'conversion', {
    send_to: `${ADS_ID}/${ADS_CONVERSION_LABEL[product]}`,
    transaction_id: input.eventId,
  })
  return true
}
