import { create } from 'zustand'

export type Country = 'PEN' | 'CLP' | 'COP' | 'MXN' | 'USD'

interface CurrencyState {
  // Currency from IP configuration
  ipCurrency: Country // CLP
  setIpCurrency: (currency: Country) => void

  whatsappCountry: { phoneNumber: string; countryCode: string }
  setWhatsappCountry: ({ phoneNumber, countryCode }: { phoneNumber: string; countryCode: string }) => void
}

export const useCurrencyStore = create<CurrencyState>((set) => ({
  // Default values
  ipCurrency: 'CLP',
  whatsappCountry: { phoneNumber: '944489673', countryCode: '+56' },

  // Actions
  setIpCurrency: (currency) => set({ ipCurrency: currency }),
  setWhatsappCountry: ({ phoneNumber, countryCode }) =>
    set({ whatsappCountry: { phoneNumber, countryCode } }),
}))
