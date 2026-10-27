import { buildIndustriaSchema } from '@/lib/seo/industrias'
import { InterComPage } from '@/ui/industrias/intercompany/InterComPage'
import type { Metadata } from 'next'

// La misma descripción alimenta la metadata y el Service: si cambia, cambia en los dos lugares.
const DESCRIPTION =
  'Protege tu MRR y recupera pagos fallidos con Sena. Plataforma de cobranza automatizada para empresas SaaS, plataformas digitales y negocios con ingresos recurrentes. Reduce churn financiero y recupera ingresos.'

export const metadata: Metadata = {
  title: 'Cobranza para Empresas SaaS y Modelos de Suscripción | Sena',
  description: DESCRIPTION,
  keywords:
    'cobranza para empresas SaaS, recuperación de pagos fallidos suscripción, gestión cuentas por cobrar MRR, automatización cobranza B2B recurrente, control financiero plataformas digitales, reducir churn financiero SaaS, cobranza modelo Intercompany, Sena',
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://www.somossena.com/industrias/intercompany',
  },
  openGraph: {
    title: 'Cobranza para SaaS y Suscripciones | Sena',
    description:
      'MRR protegido. Cobranza automatizada. Cero ingresos perdidos por falta de pago. Sena transforma la recuperación de pagos en empresas de suscripción.',
    type: 'website',
    siteName: 'Sena',
    locale: 'es_PE',
    url: 'https://www.somossena.com/industrias/intercompany',
    images: ['https://www.somossena.com/sena-crm-lite.jpg'],
  },
}

const SCHEMA = buildIndustriaSchema({
  slug: 'intercompany',
  name: 'Cobranza B2B para empresas SaaS y modelos de suscripción',
  description: DESCRIPTION,
  audience: 'Empresas SaaS y plataformas digitales con ingresos recurrentes',
})

const InterCom = () => {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
      <InterComPage />
    </>
  )
}

export default InterCom
