import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contáctanos — Sena, cobranza B2B',
  description:
    'Cuéntanos tu caso y te respondemos en 24 horas. Analizamos tu cartera sin costo y te decimos qué modalidad de Sena te conviene.',
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.somossena.com/contactanos' },
}

import { ContactanosPage } from '@/ui/contactanos/ContactanosPage'

const Page = () => {
  return <ContactanosPage />
}

export default Page
