import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Quiénes somos — Sena, cobranza B2B en Chile y Perú',
  description:
    'Sena es una compañía de cobranza B2B que cubre el ciclo completo, de la factura emitida al pago conciliado. Conoce al equipo, de dónde viene el nombre y cómo trabajamos.',
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.somossena.com/nosotros' },
}

import { NosotrosPage } from '@/ui/nosotros/NosotrosPage'

const Page = () => {
  return <NosotrosPage />
}

export default Page
