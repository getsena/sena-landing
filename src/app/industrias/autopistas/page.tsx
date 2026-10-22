import { buildIndustriaSchema } from '@/lib/seo/industrias'
import { AutopistasPage } from '@/ui/industrias/autopistas/AutopistasPage'
import type { Metadata } from 'next'

// La misma descripción alimenta la metadata y el Service: si cambia, cambia en los dos lugares.
const DESCRIPTION =
  'Plataforma de gestión de cuentas por cobrar B2B para concesionarias de autopistas. Conciliación de TAG, gestión de flotas y cobranza inteligente para infraestructura vial.'

export const metadata: Metadata = {
  title: 'Cobranza B2B para Autopistas y Concesiones Viales | Sena',
  description: DESCRIPTION,
  keywords:
    'cobranza autopistas B2B, conciliación TAG empresas, gestión de cobranza concesionarias, cobranza flotas peajes, recuperación cartera infraestructura vial, Sena',
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.somossena.com/industrias/autopistas' },
  openGraph: {
    title: 'Cobranza B2B para Autopistas | Sena',
    description:
      'Rutas fluidas. Conciliación exacta. Cobranza inteligente. Sena transforma la cobranza B2B en concesiones de autopistas.',
    type: 'website',
    siteName: 'Sena',
    locale: 'es_PE',
    url: 'https://www.somossena.com/industrias/autopistas',
    images: ['https://somossena.com/sena-crm-lite.jpg'],
  },
}

const SCHEMA = buildIndustriaSchema({
  slug: 'autopistas',
  name: 'Cobranza B2B para autopistas y concesiones viales',
  description: DESCRIPTION,
  audience: 'Concesionarias de autopistas y operadores de infraestructura vial',
})

const Autopistas = () => {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
      <AutopistasPage />
    </>
  )
}

export default Autopistas
