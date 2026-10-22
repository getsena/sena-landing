import { buildIndustriaSchema } from '@/lib/seo/industrias'
import { FamilyOfficePage } from '@/ui/industrias/family-office/FamilyOfficePage'
import type { Metadata } from 'next'

// La misma descripción alimenta la metadata y el Service: si cambia, cambia en los dos lugares.
const DESCRIPTION =
  'Plataforma de gestión de cuentas por cobrar y control financiero patrimonial para Family Offices, holdings familiares y administradoras de patrimonio. Consolida la cobranza de múltiples sociedades con trazabilidad y confidencialidad.'

export const metadata: Metadata = {
  title: 'Cobranza y Control Financiero para Family Offices | Sena',
  description: DESCRIPTION,
  keywords:
    'cobranza para Family Office, gestión cuentas por cobrar holding, control financiero patrimonial, consolidación cartera empresas familiares, automatización cobranza B2B holdings, seguimiento de flujo de caja inversiones, Sena',
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://www.somossena.com/industrias/family-office',
  },
  openGraph: {
    title: 'Cobranza y Control Financiero para Family Offices | Sena',
    description:
      'Patrimonio diversificado. Control absoluto. Sena centraliza la cobranza y el seguimiento financiero para holdings familiares y estructuras de inversión.',
    type: 'website',
    siteName: 'Sena',
    locale: 'es_PE',
    url: 'https://www.somossena.com/industrias/family-office',
    images: ['https://somossena.com/sena-crm-lite.jpg'],
  },
}

const SCHEMA = buildIndustriaSchema({
  slug: 'family-office',
  name: 'Cobranza y control financiero para Family Offices',
  description: DESCRIPTION,
  audience: 'Family offices, holdings familiares y administradoras de patrimonio',
})

const FamilyOffice = () => {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
      <FamilyOfficePage />
    </>
  )
}

export default FamilyOffice
