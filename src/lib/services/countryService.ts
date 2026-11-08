import { useQuery } from '@tanstack/react-query'
import { TCountry } from '../types'

const API_BASE_URL = 'https://dev.mv.flujolink.com/api/v1'

export const fetchCountries = async (): Promise<TCountry[]> => {
  const response = await fetch(`${API_BASE_URL}/countries/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error(`Error ${response.status}: Failed to fetch countries`)
  }

  return response.json()
}

const FLUJOPAY_FLAGS = 'https://flujopay.blob.core.windows.net/flujopay-django-files/flags'

// Lista base: el selector funciona aunque la API no responda; la API la refresca en segundo plano.
export const DEFAULT_COUNTRIES: TCountry[] = [
  { id: 1, country: '+51', country_code: 'Perú', icon: `${FLUJOPAY_FLAGS}/peru.png` },
  { id: 2, country: '+56', country_code: 'Chile', icon: `${FLUJOPAY_FLAGS}/chile_1.png` },
  { id: 3, country: '+57', country_code: 'Colombia', icon: '/flags/co.svg' },
  { id: 4, country: '+593', country_code: 'Ecuador', icon: '/flags/ec.svg' },
  { id: 5, country: '+52', country_code: 'México', icon: '/flags/mx.svg' },
]

// La API puede traer menos países de los que atendemos (o venir vacía): los países base siempre quedan
// disponibles y la API solo aporta sus banderas y los países adicionales.
export const mergeCountries = (api: TCountry[]): TCountry[] => {
  const porPrefijo = new Map(api.map((c) => [c.country, c]))
  const extra = api.filter((c) => !DEFAULT_COUNTRIES.some((d) => d.country === c.country))
  return [...DEFAULT_COUNTRIES.map((d) => porPrefijo.get(d.country) ?? d), ...extra]
}

export const COUNTRIES_QUERY_KEY = ['countries'] as const

export const useCountries = () => {
  return useQuery({
    queryKey: COUNTRIES_QUERY_KEY,
    queryFn: async () => mergeCountries(await fetchCountries()),
    initialData: DEFAULT_COUNTRIES,
    initialDataUpdatedAt: 0,
    staleTime: 1000 * 60 * 60, // 1 hora - los países no cambian frecuentemente
    gcTime: 1000 * 60 * 60 * 24, // 24 horas en cache
  })
}
