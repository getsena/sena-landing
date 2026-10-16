import type { Metadata } from 'next'
import { OperaPage } from '@/ui/opera/OperaPage'

export const metadata: Metadata = {
  title: 'Tu Equipo de Cobranza Externo | Sena Opera',
  description:
    'Ópera es el equipo de cobranza B2B que tu empresa no tiene: nosotros cobramos, tú ves los resultados. Desde US$50 al mes, con análisis de cartera sin costo. Chile y Perú.',
  keywords:
    'equipo de cobranza externo, outsourcing de cobranza, servicio de cobranza b2b, agentes de ia para cobranza, cobranza latam',
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.somossena.com/opera' },
  openGraph: {
    title: 'Tu Equipo de Cobranza Externo | Sena Opera',
    description:
      'Tecnología, agentes de IA y especialistas humanos trabajando en conjunto para cobrar por ti.',
    url: 'https://www.somossena.com/opera',
    type: 'website',
    images: ['https://somossena.com/sena-crm-lite.jpg'],
    siteName: 'Sena',
    locale: 'es_CL',
  },
}

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      name: 'Sena Opera',
      description:
        'Servicio integral de cobranza B2B que combina tecnología, agentes de IA y especialistas humanos.',
      url: 'https://www.somossena.com/opera',
      areaServed: 'LATAM',
      provider: { '@type': 'Organization', name: 'Sena', url: 'https://www.somossena.com' },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: '¿Sena es un software o un servicio de cobranza?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Es un servicio completo. Combinamos plataforma tecnológica, agentes de IA y especialistas humanos. Tú vendes, nosotros cobramos.',
          },
        },
        {
          '@type': 'Question',
          name: '¿Es como tener un equipo de cobranza propio?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Sí, pero sin los costos fijos. Un equipo dedicado que conoce tu cartera, gestiona tus cuentas y te reporta resultados, sin contratar ni capacitar.',
          },
        },
        {
          '@type': 'Question',
          name: '¿Cuánto tarda en ver resultados?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Primeros acuerdos de pago típicamente en 2-3 semanas. La implementación toma días, no meses.',
          },
        },
        {
          '@type': 'Question',
          name: '¿Se integra con mis sistemas?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Sí. APIs para los ERPs más usados (SAP, Oracle, etc). También trabajamos con archivos si lo prefieres.',
          },
        },
      ],
    },
  ],
}

const Page = () => (
  <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
    <OperaPage />
  </>
)

export default Page
