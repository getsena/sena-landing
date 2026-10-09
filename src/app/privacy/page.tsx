import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Política de privacidad — Sena',
  description:
    'Cómo Sena trata los datos personales: finalidades, subencargados, transferencia internacional y derechos de los titulares.',
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.somossena.com/privacy' },
}

import { PrivacyPage } from '@/ui/privacy/PrivacyPage'

const Page = () => {
  return <PrivacyPage />
}

export default Page
