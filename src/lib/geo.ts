import type { Country } from '@/lib/store/useCurrencyStore'

export type GeoInfo = {
  currency: Country
  whatsapp: { phoneNumber: string; countryCode: string }
}

const WHATSAPP_CHILE = { phoneNumber: '944489673', countryCode: '+56' }
const WHATSAPP_PERU = { phoneNumber: '918272599', countryCode: '+51' }

// Países donde Sena tiene o tuvo clientes. Colombia, México y Ecuador atienden por el WhatsApp de Chile.
export const GEO_POR_PAIS: Record<string, GeoInfo> = {
  CL: { currency: 'CLP', whatsapp: WHATSAPP_CHILE },
  PE: { currency: 'PEN', whatsapp: WHATSAPP_PERU },
  CO: { currency: 'COP', whatsapp: WHATSAPP_CHILE },
  MX: { currency: 'MXN', whatsapp: WHATSAPP_CHILE },
  EC: { currency: 'USD', whatsapp: WHATSAPP_CHILE },
}
