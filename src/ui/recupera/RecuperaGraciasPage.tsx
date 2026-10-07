'use client'

import { AssetImage } from '@/lib/utils/assets/image'
import Image from 'next/image'
import Link from 'next/link'
import Script from 'next/script'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { pixelEventOptions } from '@/lib/lead/clientAttribution'

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    fbq?: (...args: unknown[]) => void
  }
}

export const RecuperaGraciasPage = () => {
  const router = useRouter()

  useEffect(() => {
    if (!window.dataLayer) window.dataLayer = []
    window.dataLayer.push({ event: 'conversion_event_signup_2', origin: 'recupera' })
    if (window.gtag) {
      window.gtag('event', 'conversion', { send_to: 'AW-17962976949/sCCeCNfunKccELWNtfVC' })
    }
    if (window.fbq) window.fbq('track', 'Lead', { content_name: 'recupera' }, ...pixelEventOptions())
  }, [])

  return (
    <div className="min-h-screen bg-surface-secondary flex flex-col">
      <div className="w-full py-6 flex justify-center">
        <button onClick={() => router.push('/')} className="cursor-pointer">
          <Image src={AssetImage.logoBlack} alt="Sena" className="w-36" />
        </button>
      </div>

      <div className="flex-1 flex items-start justify-center px-4 pb-16">
        <div className="w-full max-w-2xl">
          {/* Success card */}
          <div className="bg-white rounded-3xl shadow-[0_8px_40px_rgba(0,0,0,0.06)] border border-border-default overflow-hidden mb-6">
            <div className="h-1.5 bg-linear-to-r from-brand-primary via-brand-primary to-brand-secondary" />
            <div className="px-8 pt-8 pb-6 md:px-12 text-center">
              <div className="flex justify-center mb-5">
                <div className="w-14 h-14 rounded-full bg-green-50 border-2 border-green-200 flex items-center justify-center">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M20 6L9 17L4 12"
                      stroke="#22c55e"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
              <h1 className="font-canaro text-brand-primary-dark text-2xl md:text-3xl font-extrabold leading-tight mb-2">
                ¡Recibimos tu solicitud!
              </h1>
              <p className="text-text-secondary text-sm md:text-base leading-relaxed mb-1">
                Nuestro equipo evaluará tu cartera y te contactará en 24-48 horas.
              </p>
              <p className="text-brand-primary-dark text-sm md:text-base font-bold leading-relaxed mb-6">
                Si prefieres avanzar ahora, agenda tu evaluación directamente:
              </p>
            </div>
          </div>

          {/* HubSpot inline calendar */}
          <div className="bg-white rounded-3xl shadow-[0_8px_40px_rgba(0,0,0,0.06)] border border-border-default overflow-hidden mb-6">
            <div className="px-4 pt-6 pb-2 text-center">
              <p className="text-xs text-text-disabled font-medium mb-4">Agenda tu evaluación gratuita</p>
            </div>
            <div
              className="meetings-iframe-container w-full"
              style={{ minHeight: 620 }}
              data-src="https://meetings.hubspot.com/francisco502?embed=true"
            />
          </div>

          {/* Fallback link */}
          <div className="text-center mb-6">
            <Link
              href="https://meetings.hubspot.com/francisco502"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-primary text-sm font-semibold hover:underline"
            >
              Abrir calendario en nueva pestaña →
            </Link>
          </div>

          {/* WhatsApp Agent */}
          <div className="flex flex-col items-center gap-3 mb-8">
            <p className="text-text-secondary text-sm">¿Tienes dudas? Habla con nuestro agente</p>
            <Link
              href="https://wa.me/56977290160?text=Hola%2C+me+registr%C3%A9+en+Recupera+SENA.+Quiero+recuperar+mi+cartera+vencida."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-[#25D366] hover:bg-[#1da851] text-white font-bold text-sm px-5 py-3 rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-[#25D366]/25 hover:scale-[1.02]"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Hablar por WhatsApp
            </Link>
          </div>

          {/* Footer */}
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-6 text-text-disabled text-xs">
              <span>Sin costo</span>
              <span>·</span>
              <span>Sin compromiso</span>
              <span>·</span>
              <span>Modelo contingente</span>
            </div>
            <button
              onClick={() => router.push('/recupera')}
              className="text-brand-primary text-sm font-semibold hover:underline cursor-pointer flex items-center gap-1"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M19 12H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path
                  d="M12 19L5 12L12 5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Volver a la landing
            </button>
            <p className="text-text-disabled text-xs mt-2">
              Sena — <span className="font-caslon">El arte de cobrar bien</span>
            </p>
          </div>
        </div>
      </div>

      <Script
        src="https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js"
        strategy="lazyOnload"
      />
    </div>
  )
}
