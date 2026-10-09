'use client'

import { useModalStore } from '@/lib/store/modalStore'
import { AssetImage } from '@/lib/utils/assets/image'
import { AssetVideo } from '@/lib/utils/assets/video'
import Button from '@/ui/shared/Button'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'
import { TitleDescripction } from '../../shared/TitleDescripction'
import { VideoModal } from '../../shared/VideoModal'

type StepKey = 'Prepara' | 'Cobra' | 'Evalua' | 'Recupera' | 'Concilia'

export const HowItWorks = () => {
  const router = useRouter()
  const steps = useMemo(
    () => [
      {
        key: 'Prepara' as const,
        label: '1. Prepara',
        number: 1,
        title: '1. Prepara',
        subtitle: 'Ordena facturas, contactos y montos automáticamente.',
        description: 'El sistema estructura toda la información para una gestión eficiente.',
        image: AssetImage.sincroniza,
        video: AssetVideo.prepara,
      },
      {
        key: 'Cobra' as const,
        label: '2. Cobra',
        number: 2,
        title: '2. Cobra',
        subtitle: 'CRM multicanal con WhatsApp, email y SMS.',
        description: 'Secuencias inteligentes segmentadas por vencimiento, monto y comportamiento.',
        image: AssetImage.cobra,
        video: AssetVideo.cobra,
      },
      {
        key: 'Evalua' as const,
        label: '3. Evalúa',
        number: 3,
        title: '3. Evalúa',
        subtitle: 'Métricas de conversión, aperturas y rendimiento por canal.',
        description: 'Mejora tu estrategia con datos reales.',
        image: AssetImage.evalua,
      },
      {
        key: 'Recupera' as const,
        label: '4. Recupera',
        number: 4,
        title: '4. Recupera',
        subtitle: 'Especialistas en recuperación para los casos difíciles.',
        description:
          'Cuando hace falta entran nuestros especialistas en recuperación, que cuidan tu marca y la relación con el cliente mientras gestionan el recupero.',
      },
      {
        key: 'Concilia' as const,
        label: '5. Concilia',
        number: 5,
        title: '5. Concilia',
        subtitle: 'Registro automático de tus pagos.',
        description: 'Cierre de facturas sin trabajo manual ni errores.',
        image: AssetImage.conciliator1,
        video: AssetVideo.conciliar,
      },
    ],
    []
  )

  const [activeKey, setActiveKey] = useState<StepKey>(steps[0].key)
  const activeIndex = steps.findIndex((s) => s.key === activeKey)
  const active = steps[activeIndex] ?? steps[0]
  const { showModal } = useModalStore()

  const handleVideoClick = () => {
    const stepWithVideo = active as any
    showModal({
      content: (
        <VideoModal
          videoSrc={stepWithVideo.video}
          title={`${stepWithVideo.label} con Sena`}
          description={stepWithVideo.description}
        />
      ),
      width: '690px',
      showCloseButton: true,
      showHeader: false,
      closeOnOutsideClick: true,
    })
  }

  const hasVideo = Boolean((active as any).video)

  return (
    <section id="como-funciona" className="bg-[#F9F9F9] pt-28 ">
      <div className="max-w-[1280px] mx-auto">
        <div className="px-4 md:px-12 text-left">
          <div className="flex justify-start">
            <TitleDescripction
              title="Cómo"
              subtitle="funciona"
              description="El ciclo completo, de la factura emitida al pago conciliado. Lo operas tú en la plataforma o lo delegas en nuestro equipo."
            />
          </div>
        </div>

        <div className="mt-10 px-4 md:px-12 mx-auto">
          <div className="rounded-2xl pb-5 md:pb-8">
            <div className="rounded-full flex overflow-x-auto gap-2 justify-between bg-white">
              {steps.map((s) => {
                const isActive = s.key === activeKey
                return (
                  <button
                    key={s.key}
                    type="button"
                    onClick={() => setActiveKey(s.key)}
                    className={
                      isActive
                        ? 'shrink-0 px-4 md:px-8 py-3 rounded-full bg-brand-primary text-white font-extrabold text-xs md:text-xl tracking-wide'
                        : 'shrink-0 px-4 md:px-8 py-3 rounded-full  text-brand-primary-dark font-extrabold text-xs md:text-xl tracking-wide cursor-pointer'
                    }
                  >
                    {s.label}
                  </button>
                )
              })}
            </div>

            <div className="mt-6 md:mt-8 rounded-xl bg-[#EDEDED]">
              <div className="p-6 md:p-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="bg-linear-to-br from-slate-50 to-slate-100 rounded-xl h-56 md:h-80 flex items-center justify-center justify-self-center w-full max-w-xl shadow-lg">
                  <div
                    className={`relative w-full h-full rounded-xl overflow-hidden group ${hasVideo ? 'cursor-pointer' : ''}`}
                    onClick={hasVideo ? handleVideoClick : undefined}
                  >
                    {activeKey === 'Recupera' ? (
                      <div className="bg-white w-full mx-auto rounded-xl h-full flex items-center justify-center overflow-visible relative">
                        <div className="w-[280px] h-full mr-20 rounded-xl overflow-hidden">
                          <Image
                            src={AssetImage.home3}
                            alt={active.title}
                            className="w-full h-full object-cover object-top"
                          />
                        </div>
                        <div className="absolute bottom-4 right-10 w-28 md:h-64 rounded-lg overflow-hidden shadow-xl border-2 border-white">
                          <Image
                            src={AssetImage.conciliatorNavbar}
                            alt="Dashboard"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    ) : active.image ? (
                      <>
                        <Image src={active.image} alt={active.title} fill className="object-cover" />
                        {hasVideo && (
                          <>
                            <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                            <div className="hidden md:flex absolute inset-0 items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <div className="w-16 h-16 cursor-pointer rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-xl">
                                <svg
                                  width="32"
                                  height="32"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M8 5V19L19 12L8 5Z" fill="#1E40AF" />
                                </svg>
                              </div>
                            </div>

                            <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 text-xs font-semibold text-brand-primary shadow-lg">
                                {active.label}
                              </div>
                            </div>
                          </>
                        )}
                      </>
                    ) : (active as any).video ? (
                      <>
                        <video
                          key={active.key}
                          className="absolute inset-0 w-full h-full object-cover md:cursor-pointer"
                          autoPlay
                          loop
                          muted
                          playsInline
                        >
                          <source src={(active as any).video} type="video/mp4" />
                        </video>
                        <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="hidden md:flex absolute inset-0 items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="w-16 h-16 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-xl">
                            <svg
                              width="32"
                              height="32"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M8 5V19L19 12L8 5Z" fill="#1E40AF" />
                            </svg>
                          </div>
                        </div>
                        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 text-xs font-semibold text-brand-primary shadow-lg">
                            {active.label}
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="absolute inset-0 bg-slate-50" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-16 h-16 rounded-full bg-slate-200/70 flex items-center justify-center">
                            <svg
                              width="28"
                              height="28"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M9 7.5V16.5L16.5 12L9 7.5Z" fill="#64748B" />
                            </svg>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="bg-brand-primary text-white  rounded-full flex items-center gap-3 w-fit px-8 py-2">
                    <p className="text-sm md:text-xl font-bold tracking-wide">{active.title}</p>
                  </div>
                  <div>
                    <p className="text-brand-primary-dark text-xl md:text-2xl font-extrabold tracking-wide">
                      {active.subtitle}
                    </p>
                  </div>
                  <p className="mt-2 text-black/95 leading-6 max-w-md">{active.description}</p>

                  {activeKey === 'Recupera' && (
                    <Button
                      size="md"
                      text="Conocer más sobre Recupera"
                      variant={'secondaryFilled'}
                      className="text-lg w-fit mt-2"
                      rightIcon={
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5 12H19M19 12L12 5M19 12L12 19"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      }
                      onClick={() => window.open('https://recupera.somossena.com', '_self')}
                    />
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-center gap-3">
              {steps.map((s, idx) => {
                const isActive = idx === activeIndex
                return (
                  <button
                    key={s.key}
                    type="button"
                    onClick={() => setActiveKey(s.key)}
                    className={
                      isActive
                        ? 'w-3 h-3 rounded-full bg-brand-secondary-dark'
                        : 'w-3 h-3 rounded-full bg-[#FBC2A2]'
                    }
                    aria-label={s.label}
                  />
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
