import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sobre Sena · Cobranza B2B en Chile, Perú y Colombia',
  description:
    'Sena es una compañía de cobranza B2B con clientes en Chile, Perú y Colombia. Cubrimos el ciclo completo, de la factura emitida al pago conciliado.',
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.somossena.com/nosotros' },
}

import { NosotrosPage } from '@/ui/nosotros/NosotrosPage'

const Page = () => {
  return <NosotrosPage />
}

export default Page
