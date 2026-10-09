import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Términos y condiciones — Sena',
  description: 'Condiciones de uso de los servicios de cobranza B2B de Sena.',
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.somossena.com/term' },
}

import { TermPage } from '@/ui/term/TermPage'

const Page = () => {
  return <TermPage />
}

export default Page
