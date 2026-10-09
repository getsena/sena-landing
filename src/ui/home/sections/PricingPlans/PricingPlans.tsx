'use client'

import Button from '@/ui/shared/Button'
import { useState } from 'react'
import { TitleDescripction } from '../../../shared/TitleDescripction'
import { PlanCard, TPlan } from './PlanCard'

/** Ópera y Recupera no tienen plan fijo, pero sí precio publicable desde el 2026-10-09:
 *  Ópera desde US$50/mes (bajo 10 relaciones) y US$300/mes (sobre 50); Recupera 15% de lo
 *  recuperado. El tramo de 10 a 50 relaciones se cotiza — no inventar un intermedio. */
const ServiceCard = ({
  name,
  eyebrow,
  price,
  priceNote,
  includes,
  cta,
  onCtaClick,
}: {
  name: string
  eyebrow: string
  price: string
  priceNote: string
  includes: string[]
  cta: string
  onCtaClick: () => void
}) => (
  <div className="flex flex-col bg-surface-default rounded-2xl border border-border-default shadow-card p-6">
    <span className="self-start rounded-full bg-brand-secondary/10 text-brand-secondary text-xs font-bold px-3 py-1">
      {eyebrow}
    </span>
    <p className="mt-3 font-canaro text-brand-primary-dark text-2xl font-extrabold">{name}</p>
    <div className="mt-3 flex items-baseline gap-2">
      <p className="text-brand-primary text-3xl font-extrabold">{price}</p>
      <p className="text-text-secondary text-sm">{priceNote}</p>
    </div>
    <ul className="mt-4 flex flex-col gap-2 grow">
      {includes.map((item) => (
        <li key={item} className="text-text-primary text-sm leading-5 flex gap-2">
          <span className="text-brand-secondary font-bold">·</span>
          {item}
        </li>
      ))}
    </ul>
    <Button text={cta} className="mt-6 self-start" size="sm" onClick={onCtaClick} />
  </div>
)

export const PricingPlans = () => {
  const plans: TPlan[] = [
    {
      name: 'Plan Starter',
      subtitle: 'Para pequeñas empresas y primeros volúmenes',
      price: 39,
      includedClients: 'Hasta 10',
      invoicesPerMonth: 'Hasta 50',
      features: [
        'CRM básico de cobranza',
        'Automatización de recordatorios',
        'Conciliación manual',
        'Reportes básicos',
        'Soporte por email',
      ],
      variant: 'starter',
      cta: 'Contrata ahora',
      onCtaClick: () => {
        // window.open("https://meetings.hubspot.com/francisco502", "_blank"); // TODO: Cambiar a la url de abajo cuando sea el momento
        window.open('https://app.flujolink.com/signup?origin=main', '_blank')
      },
    },
    {
      name: 'Plan Growth',
      subtitle: 'Para empresas en expansión',
      price: 349,
      includedClients: 'Hasta 100',
      invoicesPerMonth: 'Hasta 500',
      features: [
        'Todo lo de Starter, más:',
        'CRM avanzado multicanal',
        'Segmentación inteligente',
        'Conciliación automática',
        'Portal de cliente',
        'Campañas automatizadas',
        'Reportería avanzada',
        'Soporte prioritario',
      ],
      variant: 'growth',
      popular: true,
      cta: 'Contrata ahora',
      onCtaClick: () => {
        window.open('https://meetings.hubspot.com/francisco502', '_blank')
      },
    },
    {
      name: 'Plan Enterprise',
      subtitle: 'Para alto volumen y operaciones críticas',
      price: 799,
      includedClients: '100+',
      invoicesPerMonth: 'Desde 500',
      features: [
        'Todo lo de Growth, más:',
        'Volumen ilimitado',
        'API completa',
        'Gestión humana especializada',
        'Multi-tenant y white label',
        'SLA garantizado',
        'Account Manager dedicado',
      ],
      variant: 'enterprise',
      cta: 'Habla con ventas',
      onCtaClick: () => {
        window.open('https://meetings.hubspot.com/francisco502', '_blank')
      },
    },
  ]

  const [selectedPlan, setSelectedPlan] = useState(0)

  return (
    <section id="precios" className="py-14 max-w-[1280px] mx-auto pt-28">
      <div className="px-4 md:px-12 text-left">
        <div className="flex justify-start">
          <TitleDescripction
            title="Planes diseñados"
            subtitle="para tu empresa"
            description="Todos los precios son públicos. La Plataforma parte en USD 39 al mes, Ópera desde US$50 al mes y Recupera cobra 15% de lo que recupera. El análisis de tu cartera es gratis, y de ahí sale cuál te conviene."
          />
        </div>
      </div>

      <div className="mt-8 px-4 md:px-12">
        <p className="text-xs font-bold uppercase tracking-widest text-text-disabled">
          Plataforma Sena · operas tú
        </p>
      </div>

      {/* Mobile: Selector + Card */}
      <div className="md:hidden mt-4 px-4">
        <div className="bg-white rounded-2xl border-2 border-[#3771d1] shadow-sm overflow-hidden">
          {plans.map((plan, index) => (
            <button
              key={plan.variant}
              type="button"
              onClick={() => {
                setSelectedPlan(index)
                // plan.onCtaClick?.();
              }}
              className={`
                w-full flex items-center gap-3 p-4
                transition-colors
                ${index === 1 ? 'border-t-2 border-b-2 border-[#3771d1]' : ''}
                ${selectedPlan === index ? 'bg-blue-50' : ''}
              `}
            >
              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  selectedPlan === index ? 'border-[#3771d1] bg-white' : 'border-slate-300'
                }`}
              >
                {selectedPlan === index && (
                  <svg
                    className="w-4 h-4 text-[#3771d1]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <div className="flex-1 text-left">
                <p className="font-bold text-sm text-black">{plan.name.toUpperCase()}</p>
                <p className="text-xs text-slate-500">{plan.subtitle}</p>
              </div>
              {plan.popular && (
                <span className="text-sm h-9 px-4 inline-flex items-center justify-center gap-2 rounded-full font-bold transition-all bg-brand-secondary text-white">
                  Más popular
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="mt-6">
          <PlanCard plan={plans[selectedPlan]} />
        </div>
      </div>

      {/* Desktop: Grid */}
      <div className="hidden md:block mt-4 px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-end max-w-6xl mx-auto">
          <PlanCard plan={plans[0]} />

          <PlanCard plan={plans[1]} />

          <PlanCard plan={plans[2]} />
        </div>
      </div>

      {/* Ópera y Recupera: no se venden por plan fijo */}
      <div className="mt-14 px-4 md:px-12">
        <p className="text-xs font-bold uppercase tracking-widest text-text-disabled">
          Si prefieres no operar tú
        </p>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl">
          <ServiceCard
            name="Ópera"
            eyebrow="Operamos por ti"
            price="Fee mensual"
            priceNote="según tu cartera"
            includes={[
              'Análisis inicial de tu cartera, sin costo',
              'Estrategia, ejecución y monitoreo a cargo de nuestro equipo',
              'Informe de resultados: tú solo ves los números',
            ]}
            cta="Cotizar para mi empresa"
            onCtaClick={() => {
              window.location.href = 'https://agente.somossena.com'
            }}
          />
          <ServiceCard
            name="Recupera"
            eyebrow="Solo lo vencido"
            price="15%"
            priceNote="sobre lo cobrado"
            includes={[
              'Sin ticket mínimo y sin costo fijo',
              'Pagas solo si recuperamos',
              'Gestión prejudicial, cuidando la relación con tu cliente',
            ]}
            cta="Iniciar recupero"
            onCtaClick={() => {
              window.open('https://recupera.somossena.com', '_self')
            }}
          />
        </div>
      </div>
    </section>
  )
}
