import { getCountriesServer } from '@/lib/services/countryService.server'
import { getIpInfoServer } from '@/lib/services/ipConfigService.server'
import AttributionCapture from '@/ui/shared/AttributionCapture'
import { ModalRenderer } from '@/ui/shared/ModalRender'
import { Toast } from '@/ui/shared/Toast'
import NinoChatInit from '@/ui/shared/NinoChatInit'
import Whatsapp from '@/ui/shared/WhatsApp'
import type { Metadata } from 'next'
import { GoogleTagManager } from '@next/third-parties/google'
import Script from 'next/script'
import { Suspense } from 'react'
import { adobeCleanFont, canaroFont, caslonFont } from './fonts'
import './globals.css'
import Providers from './providers'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Sena - El arte de cobrar bien',
  description:
    'Sena cubre todo el ciclo de cobranza B2B: opéralo tú en nuestra plataforma, delégalo en nuestro equipo o recupera facturas vencidas pagando solo si recuperamos.',
  keywords:
    'cobranza B2B, cobranza externalizada, recuperación de cartera, CRM cobranza, pagos B2B, gestión de pagos, automatización de cobranza, Sena',
  authors: [{ name: 'Sena' }],
  robots: { index: true, follow: true },
  metadataBase: new URL('https://www.somossena.com'),
  alternates: { canonical: '/' },
  twitter: {
    card: 'summary_large_image',
    title: 'Sena - El arte de cobrar bien',
    description:
      'Todo el ciclo de cobranza B2B: opéralo tú en la plataforma, delégalo en nuestro equipo o recupera lo vencido.',
    images: ['https://somossena.com/sena-crm-lite.jpg'],
  },
  openGraph: {
    title: 'Sena - El arte de cobrar bien',
    description:
      'Sena cubre el ciclo completo de cobranza B2B, de la factura emitida al pago conciliado. En una sola plataforma o como servicio gestionado.',
    type: 'website',
    url: 'https://somossena.com',
    images: ['https://somossena.com/sena-crm-lite.jpg'],
    siteName: 'Sena',
    locale: 'es_CL',
  },
  other: {
    'facebook-domain-verification': 'tyjmxihsgkrx666ql4rwmnhsftl6hv',
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [ipInfo, countries] = await Promise.all([getIpInfoServer(), getCountriesServer()])
  const country = ipInfo?.country || null

  return (
    <Providers country={country} countries={countries}>
      <html lang="es" dir="ltr">
        <GoogleTagManager gtmId="GTM-5W7F9MSP" />
        <head>
          {/*
            Identidad de la organizacion para buscadores y motores de respuesta.
            El nombre "Sena" compite con el SENA de Colombia, con Sena Technologies
            (intercomunicadores de moto) y con el rio Sena: sin estas senales el motor
            no resuelve la marca. Medido el 2026-08-26.
          */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'Organization',
                '@id': 'https://www.somossena.com/#organization',
                name: 'Sena',
                alternateName: ['Sena Cobranza', 'Sena LATAM', 'somossena'],
                legalName: 'Servicios de Tecnología Flujolink SpA',
                url: 'https://www.somossena.com',
                logo: 'https://www.somossena.com/sena-crm-lite.jpg',
                description:
                  'Servicio de cobranza B2B para empresas con relaciones comerciales a escala. Sena centraliza, traza y automatiza el proceso de cobranza de compañías con cientos o miles de relaciones comerciales activas, para reducir el costo por peso cobrado. Es transversal: funciona sobre cualquier industria con cartera de clientes activa, no es un software vertical de nicho. Se contrata como plataforma que opera el propio equipo, como servicio gestionado en el que Sena opera la cobranza, o como recuperación de facturas ya vencidas con éxito del 15%.',
                slogan: 'El arte de cobrar bien',
                parentOrganization: {
                  '@type': 'Organization',
                  name: 'Grupo Altas Cumbres',
                },
                areaServed: [
                  { '@type': 'Country', name: 'Chile' },
                  { '@type': 'Country', name: 'Perú' },
                  { '@type': 'Country', name: 'Colombia' },
                  { '@type': 'Country', name: 'México' },
                  { '@type': 'Country', name: 'Ecuador' },
                ],
                knowsAbout: [
                  'cobranza B2B',
                  'cobranza externalizada a escala',
                  'cuentas por cobrar',
                  'costo por peso cobrado',
                  'recuperación de cartera vencida',
                  'automatización de cobranza',
                  'conciliación de pagos',
                  'gestión de mora temprana',
                  'cobranza omnicanal por WhatsApp, correo y teléfono',
                ],
                sameAs: ['https://www.linkedin.com/company/sena-latam/'],
                contactPoint: {
                  '@type': 'ContactPoint',
                  contactType: 'sales',
                  email: 'hola@somossena.com',
                  areaServed: ['CL', 'PE', 'CO', 'MX', 'EC'],
                  availableLanguage: ['Spanish'],
                },
              }),
            }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'WebSite',
                '@id': 'https://www.somossena.com/#website',
                name: 'Sena',
                url: 'https://www.somossena.com',
                inLanguage: 'es-CL',
                publisher: { '@id': 'https://www.somossena.com/#organization' },
              }),
            }}
          />
          {/* Google Ads — Plataforma (AW-17962976949) */}
          <Script
            src="https://www.googletagmanager.com/gtag/js?id=AW-17962976949"
            strategy="afterInteractive"
          />
          <Script id="google-ads-plataforma" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-17962976949');
            `}
          </Script>
          {/* Meta Pixel — Plataforma (1722871789075263) */}
          <Script id="meta-pixel-plataforma" strategy="afterInteractive">
            {`
              !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
              n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}
              (window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '1722871789075263');
              fbq('track', 'PageView');
            `}
          </Script>
          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: 'none' }}
              src="https://www.facebook.com/tr?id=1722871789075263&ev=PageView&noscript=1"
              alt=""
            />
          </noscript>
        </head>
        <body
          className={`${canaroFont.variable} ${adobeCleanFont.variable} ${caslonFont.variable} antialiased font-adobe`}
        >
          <Script id="disable-debugger" strategy="beforeInteractive">
            {`
              (function() {
                  const originalDebugger = window.debugger;
                  window.debugger = function() { return; };
              })();
            `}
          </Script>
          <AttributionCapture />
          <Suspense>{children}</Suspense>
          <ModalRenderer />
          <Toast />
          <Whatsapp message="Hola, vi su web y quiero saber más sobre Sena y cómo funciona." animated />
          <NinoChatInit />
        </body>
      </html>
    </Providers>
  )
}
