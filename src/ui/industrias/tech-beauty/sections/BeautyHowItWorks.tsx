'use client'

import { useState } from 'react'

const steps = [
  {
    key: 'prepara',
    label: '1. Prepara',
    title: 'Prepara',
    description: 'Importa tus facturas y clientes. Ordena montos, vencimientos y contactos automáticamente.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path d="M14 2V8H20" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M12 18V12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path
          d="M9 15L12 12L15 15"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    key: 'cobra',
    label: '2. Cobra',
    title: 'Cobra',
    description: 'Activa secuencias multicanal inteligentes. WhatsApp, email y SMS con el tono de tu marca.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M22 2L11 13"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M22 2L15 22L11 13L2 9L22 2Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    key: 'evalua',
    label: '3. Evalúa',
    title: 'Evalúa',
    description: 'Mide qué funciona. Métricas de apertura, respuesta y conversión por canal y segmento.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 20V10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M12 20V4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M6 20V14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    key: 'recupera',
    label: '4. Recupera',
    title: 'Recupera',
    description:
      'Para casos complejos, nuestro equipo de especialistas interviene con criterio y experiencia.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12 12.5C9.93 12.5 8.25 10.82 8.25 8.75C8.25 6.68 9.93 5 12 5C14.07 5 15.75 6.68 15.75 8.75C15.75 10.82 14.07 12.5 12 12.5Z"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <path
          d="M6.5 19C6.5 15.96 8.96 13.5 12 13.5C15.04 13.5 17.5 15.96 17.5 19"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    key: 'concilia',
    label: '5. Concilia',
    title: 'Concilia',
    description: 'Pagos registrados automáticamente. Cierre de facturas sin trabajo manual.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M9 11L12 14L22 4"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M21 12V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3H16"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
]

export const BeautyHowItWorks = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const active = steps[activeIndex]

  return (
    <section id="beauty-como-funciona" className="py-16 md:py-24">
      <div className="max-w-[1280px] mx-auto px-4 md:px-10">
        <div className="text-left mb-12">
          <p className="text-brand-primary-dark text-2xl sm:text-4xl font-extrabold leading-tight">
            Tu ciclo de cobranza
            <br />
            <span className="text-brand-primary">en 5 pasos</span>
          </p>
        </div>

        {/* Desktop */}
        <div className="hidden md:block">
          <div className="rounded-full flex overflow-x-auto gap-2 justify-between bg-[#F9F9F9] mb-8">
            {steps.map((s, idx) => {
              const isActive = idx === activeIndex
              return (
                <button
                  key={s.key}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  className={
                    isActive
                      ? 'shrink-0 px-6 py-3 rounded-full bg-brand-primary text-white font-extrabold text-lg tracking-wide'
                      : 'shrink-0 px-6 py-3 rounded-full text-brand-primary-dark font-extrabold text-lg tracking-wide cursor-pointer hover:bg-slate-100 transition-colors'
                  }
                >
                  {s.label}
                </button>
              )
            })}
          </div>

          <div className="bg-[#F9F9F9] rounded-2xl p-8 md:p-10 border border-slate-100">
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 rounded-2xl bg-brand-primary/10 flex items-center justify-center text-brand-primary shrink-0">
                {active.icon}
              </div>
              <div>
                <div className="bg-brand-primary text-white rounded-full px-6 py-2 w-fit mb-4">
                  <p className="text-lg font-bold tracking-wide">{active.label}</p>
                </div>
                <p className="text-slate-700 text-lg leading-relaxed max-w-xl">{active.description}</p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-center gap-3">
            {steps.map((s, idx) => (
              <button
                key={s.key}
                type="button"
                onClick={() => setActiveIndex(idx)}
                className={
                  idx === activeIndex
                    ? 'w-3 h-3 rounded-full bg-brand-secondary-dark'
                    : 'w-3 h-3 rounded-full bg-[#FBC2A2]'
                }
                aria-label={s.label}
              />
            ))}
          </div>
        </div>

        {/* Mobile */}
        <div className="md:hidden flex flex-col gap-4">
          {steps.map((s) => (
            <div key={s.key} className="bg-[#F9F9F9] rounded-2xl p-5 border border-slate-100">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary shrink-0">
                  {s.icon}
                </div>
                <span className="bg-brand-primary text-white rounded-full px-4 py-1 text-sm font-bold">
                  {s.label}
                </span>
              </div>
              <p className="text-slate-700 text-sm leading-relaxed">{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
