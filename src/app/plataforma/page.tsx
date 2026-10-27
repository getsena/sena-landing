import type { Metadata } from 'next'
import { PlataformaPage } from '@/ui/plataforma/PlataformaPage'

export const metadata: Metadata = {
  title: 'Software de Cobranza B2B para Empresas en Chile | Sena Plataforma',
  description:
    'Automatiza tu cobranza B2B con Sena. Visibilidad total de tu cartera, recordatorios automáticos y conciliación sin reemplazar tu tech stack. Agenda demo gratis.',
  keywords:
    'software cobranza b2b, plataforma cobranza chile, automatizar cobranza empresas, cuentas por cobrar b2b, gestion cartera vencida, crm cobranza chile',
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.somossena.com/plataforma' },
  openGraph: {
    title: 'Software de Cobranza B2B para Empresas en Chile | Sena',
    description:
      'Automatiza tu cobranza B2B. Visibilidad total, recordatorios automáticos y conciliación sin cambiar tu stack.',
    url: 'https://www.somossena.com/plataforma',
    type: 'website',
    images: ['https://www.somossena.com/sena-crm-lite.jpg'],
    siteName: 'Sena',
    locale: 'es_CL',
  },
}

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: 'Sena Plataforma',
      description:
        'Software de cobranza B2B para empresas en Chile. Automatiza el seguimiento de facturas, recordatorios y conciliación sin cambiar tu tech stack.',
      url: 'https://www.somossena.com/plataforma',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      inLanguage: 'es-CL',
      offers: { '@type': 'Offer', url: 'https://www.somossena.com/plataforma' },
      publisher: { '@type': 'Organization', name: 'Sena', url: 'https://www.somossena.com' },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: '¿Qué es Sena Plataforma?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Sena Plataforma es un software de cobranza B2B que automatiza el seguimiento de facturas vencidas, envía recordatorios automáticos y concilia pagos sin reemplazar tu ERP o sistema contable.',
          },
        },
        {
          '@type': 'Question',
          name: '¿Cuánto tiempo toma implementar Sena?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'La implementación típica toma entre 1 y 2 semanas. Sena se conecta a tu sistema de facturación existente sin migraciones ni desarrollo personalizado.',
          },
        },
        {
          '@type': 'Question',
          name: '¿Sena se integra con ERPs o sistemas de facturación?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Sí. Sena se integra con los principales ERPs y sistemas de facturación del mercado chileno. No reemplaza tu stack tecnológico, se conecta sobre él.',
          },
        },
        {
          '@type': 'Question',
          name: '¿Es adecuado para empresas con alto volumen de facturas?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Sí. Sena está diseñado para empresas B2B con carteras de 50 a miles de facturas mensuales. Automatiza el proceso para que tu equipo se enfoque solo en los casos que lo requieren.',
          },
        },
      ],
    },
  ],
}

const Page = () => (
  <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
    <PlataformaPage />
  </>
)

export default Page
