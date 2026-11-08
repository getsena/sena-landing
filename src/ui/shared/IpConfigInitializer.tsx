'use client'

import { GEO_POR_PAIS } from '@/lib/geo'
import { useCurrencyStore } from '@/lib/store/useCurrencyStore'
import { useEffect } from 'react'

const GEO_TIMEOUT_MS = 3000

// El país nunca bloquea el render: la página carga con los valores de Chile y, si llega el país, se ajustan.
export const IpConfigInitializer = () => {
  const { setIpCurrency, setWhatsappCountry } = useCurrencyStore()

  useEffect(() => {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), GEO_TIMEOUT_MS)

    fetch('/api/geo', { signal: controller.signal })
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { country?: string | null } | null) => {
        const geo = data?.country ? GEO_POR_PAIS[data.country] : undefined
        if (!geo) return
        setIpCurrency(geo.currency)
        setWhatsappCountry(geo.whatsapp)
      })
      .catch(() => {})
      .finally(() => clearTimeout(timer))

    return () => {
      clearTimeout(timer)
      controller.abort()
    }
  }, [setIpCurrency, setWhatsappCountry])

  return null
}
