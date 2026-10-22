import { buildIndustriaSchema } from '@/lib/seo/industrias'
import { TelcoPage } from '@/ui/industrias/telco/TelcoPage'
import type { Metadata } from 'next'

// La misma descripción alimenta la metadata y el Service: si cambia, cambia en los dos lugares.
const DESCRIPTION =
  'Plataforma de gestión de cuentas por cobrar B2B para empresas de telecomunicaciones. Ordena, automatiza y recupera pagos de contratos complejos sin dañar relaciones estratégicas.'

export const metadata: Metadata = {
  title: 'Cobranza B2B para Empresas de Telecomunicaciones | Sena',
  description: DESCRIPTION,
  keywords:
    'cobranza empresas de telecomunicaciones, software cuentas por cobrar telecomunicaciones, cobranza B2B telecomunicaciones, gestión de cobranza operadores telecom, recuperación cartera clientes B2B telecom, Sena',
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://www.somossena.com/industrias/telco',
  },
  openGraph: {
    title: 'Cobranza B2B para Telecomunicaciones | Sena',
    description:
      'Sena ordena y acelera tu ciclo de cuentas por cobrar B2B en telecomunicaciones. Automatización inteligente + equipo experto en recuperación corporativa.',
    type: 'website',
    siteName: 'Sena',
    locale: 'es_PE',
    url: 'https://www.somossena.com/industrias/telco',
    images: ['https://somossena.com/sena-crm-lite.jpg'],
  },
}

const SCHEMA = buildIndustriaSchema({
  slug: 'telco',
  name: 'Cobranza B2B para empresas de telecomunicaciones',
  description: DESCRIPTION,
  audience: 'Operadores y empresas de telecomunicaciones',
})

const Telco = () => {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
      <TelcoPage />
    </>
  )
}

export default Telco
