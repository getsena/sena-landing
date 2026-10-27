import { buildIndustriaSchema } from '@/lib/seo/industrias'
import { TechBeautyPage } from '@/ui/industrias/tech-beauty/TechBeautyPage'
import type { Metadata } from 'next'

// La misma descripción alimenta la metadata y el Service: si cambia, cambia en los dos lugares.
const DESCRIPTION =
  'Plataforma de gestión de cuentas por cobrar para empresas de belleza y cosmética. Automatiza tu cobranza sin dañar la elegancia de tu marca ni las relaciones con salones y distribuidores.'

export const metadata: Metadata = {
  title: 'Cobranza para Empresas de Belleza y Cosmética | Sena',
  description: DESCRIPTION,
  keywords:
    'cobranza para empresas de belleza, software de cuentas por cobrar cosmética, gestión de cobranza distribuidores, automatización cobranza B2B, recuperación de cartera beauty tech, Sena',
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://www.somossena.com/industrias/tech-beauty',
  },
  openGraph: {
    title: 'Cobranza para Beauty Tech | Sena',
    description:
      'Cobra sin perder la elegancia de tu marca. Sena automatiza tu ciclo de cuentas por cobrar para salones, distribuidores y retailers de belleza.',
    type: 'website',
    siteName: 'Sena',
    locale: 'es_PE',
    url: 'https://www.somossena.com/industrias/tech-beauty',
    images: ['https://www.somossena.com/sena-crm-lite.jpg'],
  },
}

const SCHEMA = buildIndustriaSchema({
  slug: 'tech-beauty',
  name: 'Cobranza B2B para empresas de belleza y cosmética',
  description: DESCRIPTION,
  audience: 'Marcas de belleza y cosmética, distribuidores, salones y retailers',
})

const TechBeauty = () => {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
      <TechBeautyPage />
    </>
  )
}

export default TechBeauty
