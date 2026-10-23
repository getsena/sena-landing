import { buildIndustriaSchema } from '@/lib/seo/industrias'
import { ServiciosBasicosPage } from '@/ui/industrias/servicios-basicos/ServiciosBasicosPage'
import type { Metadata } from 'next'

// La misma descripción alimenta la metadata y el Service: si cambia, cambia en los dos lugares.
const DESCRIPTION =
  'Plataforma de gestión de cuentas por cobrar B2B para empresas de servicios básicos y utilities. Ordena, automatiza y recupera pagos de contratos regulados sin dañar relaciones estratégicas.'

export const metadata: Metadata = {
  title: 'Cobranza B2B para Empresas de Servicios Básicos | Sena',
  description: DESCRIPTION,
  keywords:
    'cobranza empresas de servicios básicos, software cuentas por cobrar utilities, cobranza B2B servicios básicos, gestión de cobranza utilities B2B, recuperación cartera clientes B2B servicios esenciales, Sena',
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://www.somossena.com/industrias/servicios-basicos',
  },
  openGraph: {
    title: 'Cobranza B2B para Servicios Básicos | Sena',
    description:
      'Inteligencia en la gestión de contratos. Precisión en cada cobro. Sena transforma la cobranza B2B en empresas de servicios básicos.',
    type: 'website',
    siteName: 'Sena',
    locale: 'es_PE',
    url: 'https://www.somossena.com/industrias/servicios-basicos',
    images: ['https://somossena.com/sena-crm-lite.jpg'],
  },
}

const SCHEMA = buildIndustriaSchema({
  slug: 'servicios-basicos',
  name: 'Cobranza B2B para empresas de servicios básicos',
  description: DESCRIPTION,
  audience: 'Empresas de servicios básicos y utilities: agua, electricidad y gas',
})

const ServiciosBasicos = () => {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
      <ServiciosBasicosPage />
    </>
  )
}

export default ServiciosBasicos
