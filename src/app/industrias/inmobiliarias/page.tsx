import { buildIndustriaSchema } from '@/lib/seo/industrias'
import { InmobiliariasPage } from '@/ui/industrias/inmobiliarias/InmobiliariasPage'
import type { Metadata } from 'next'

// La misma descripción alimenta la metadata y el Service: si cambia, cambia en los dos lugares.
const DESCRIPTION =
  'Plataforma de gestión de cobranza inmobiliaria: cuotas, arriendos, promesas de compraventa y gastos comunes. Centraliza tu cartera por proyecto, reduce morosidad y transforma promesas en liquidez real.'

export const metadata: Metadata = {
  title: 'Cobranza y Control de Cuentas por Cobrar para Inmobiliarias | Sena',
  description: DESCRIPTION,
  keywords:
    'cobranza inmobiliaria, gestión de cuotas promesa compraventa, control cuentas por cobrar inmobiliaria, automatización cobranza arriendos, seguimiento cartera proyectos inmobiliarios, cobranza B2B inmobiliarias, Sena',
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://www.somossena.com/industrias/inmobiliarias',
  },
  openGraph: {
    title: 'Cobranza para Inmobiliarias | Sena',
    description:
      'Proyectos avanzan. Cobros al día. Flujo inmobiliario bajo control. Sena centraliza tu cartera, automatiza la cobranza y acelera el ciclo de pago en proyectos inmobiliarios.',
    type: 'website',
    siteName: 'Sena',
    locale: 'es_PE',
    url: 'https://www.somossena.com/industrias/inmobiliarias',
    images: ['https://www.somossena.com/sena-crm-lite.jpg'],
  },
}

const SCHEMA = buildIndustriaSchema({
  slug: 'inmobiliarias',
  name: 'Cobranza B2B para inmobiliarias',
  description: DESCRIPTION,
  audience: 'Inmobiliarias, desarrolladoras y administradoras de proyectos',
})

const Inmobiliarias = () => {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
      <InmobiliariasPage />
    </>
  )
}

export default Inmobiliarias
