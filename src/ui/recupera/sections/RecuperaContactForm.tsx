'use client'

import { useCountries } from '@/lib/services/countryService'
import { useCurrencyStore } from '@/lib/store/useCurrencyStore'
import {
  getAttributionPayload,
  landingPageUrl,
  newEventId,
  rememberLeadEventId,
} from '@/lib/lead/clientAttribution'
import Button from '@/ui/shared/Button'
import { Input } from '@/ui/shared/Input'
import SimpleCountrySelect, { OptionSelect } from '@/ui/shared/SimpleCountrySelect'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    fbq?: (...args: unknown[]) => void
  }
}

type FormData = {
  nombre: string
  apellido: string
  empresa: string
  email: string
  whatsapp: string
  facturas_pendientes: string
  alguien_cobrando: string
}

export const RecuperaContactForm = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const { data: countries = [] } = useCountries()
  const { ipCurrency } = useCurrencyStore()
  const router = useRouter()
  const [countrySelect, setCountrySelect] = useState<string | null>(null)

  const countryOptions = useMemo(() => {
    if (!countries.length) return []
    const priority = ['+51', '+56', '+57', '+593', '+52']
    const priorityItems: OptionSelect[] = []
    const otherItems: OptionSelect[] = []
    countries.forEach((item) => {
      const option: OptionSelect = {
        id: item.country,
        label: item.country,
        icon: item.icon,
        subValue: item.country,
      }
      if (priority.includes(item.country)) priorityItems.push(option)
      else otherItems.push(option)
    })
    priorityItems.sort((a, b) => priority.indexOf(a.id) - priority.indexOf(b.id))
    return [...priorityItems, ...otherItems]
  }, [countries])

  useEffect(() => {
    const currencyMap: Record<string, string> = {
      PEN: '+51',
      CLP: '+56',
      COP: '+57',
      MXN: '+52',
      USD: '+593',
    }
    if (ipCurrency && currencyMap[ipCurrency]) setCountrySelect(currencyMap[ipCurrency])
  }, [ipCurrency])

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      nombre: '',
      apellido: '',
      empresa: '',
      email: '',
      whatsapp: '',
      facturas_pendientes: '',
      alguien_cobrando: '',
    },
  })

  const onSubmit = async (data: FormData) => {
    setIsLoading(true)
    setSubmitError('')
    const eventId = newEventId()
    const telefono = (countrySelect || '') + data.whatsapp
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: data.nombre,
          apellido: data.apellido,
          empresa: data.empresa,
          email: data.email,
          telefono,
          facturas_pendientes: data.facturas_pendientes,
          alguien_cobrando: data.alguien_cobrando,
          producto: 'Recupera',
          ...getAttributionPayload(),
          landingPage: landingPageUrl(),
          eventId,
        }),
      })
      const json = await res.json().catch(() => ({ ok: false }))
      if (!res.ok || !json.ok) {
        setSubmitError('No pudimos registrar tu solicitud. Intenta de nuevo o escríbenos por WhatsApp.')
        setIsLoading(false)
        return
      }

      if (window.gtag) {
        window.gtag('event', 'completar_formulario', { product: 'recupera' })
        window.gtag('event', 'conversion', { send_to: 'AW-17962976949/JNP9CMq42ZgcELWNtfVC' })
      }
      rememberLeadEventId(eventId)
      if (window.fbq) window.fbq('track', 'Lead', { content_name: 'recupera' }, { eventID: eventId })

      router.push('/recupera/gracias')
    } catch {
      setSubmitError('No pudimos registrar tu solicitud. Intenta de nuevo o escríbenos por WhatsApp.')
      setIsLoading(false)
    }
  }

  const facturaOpciones = [
    { value: '1-10', label: '1-10' },
    { value: '10-50', label: '10-50' },
    { value: '50+', label: '50+' },
  ]

  const cobranzaOpciones = [
    { value: 'Sí', label: 'Sí' },
    { value: 'No', label: 'No' },
    { value: 'A veces', label: 'A veces' },
  ]

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full rounded-2xl bg-white shadow-sm border border-border-default p-6 md:p-8"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <Controller
          name="nombre"
          control={control}
          rules={{ required: 'El nombre es obligatorio' }}
          render={({ field }) => (
            <Input label="Nombre" placeholder="Tu nombre" {...field} error={errors.nombre?.message} />
          )}
        />
        <Controller
          name="apellido"
          control={control}
          rules={{ required: 'El apellido es obligatorio' }}
          render={({ field }) => (
            <Input label="Apellido" placeholder="Tu apellido" {...field} error={errors.apellido?.message} />
          )}
        />
      </div>

      <div className="mb-4">
        <Controller
          name="empresa"
          control={control}
          rules={{ required: 'El nombre de la empresa es obligatorio' }}
          render={({ field }) => (
            <Input
              label="Empresa"
              placeholder="Nombre de tu empresa"
              {...field}
              error={errors.empresa?.message}
            />
          )}
        />
      </div>

      <div className="mb-4">
        <Controller
          name="email"
          control={control}
          rules={{
            required: 'El email es obligatorio',
            pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Email inválido' },
          }}
          render={({ field }) => (
            <Input
              label="Email"
              type="email"
              placeholder="tu@empresa.com"
              {...field}
              error={errors.email?.message}
            />
          )}
        />
      </div>

      <div className="mb-4">
        <Controller
          name="whatsapp"
          control={control}
          rules={{
            required: 'El número de WhatsApp es obligatorio',
            pattern: { value: /^[0-9]+$/, message: 'Solo se permiten números' },
          }}
          render={({ field }) => (
            <Input
              label="WhatsApp"
              type="tel"
              placeholder="Número"
              value={field.value || ''}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                field.onChange(e.target.value.replace(/\D/g, ''))
              }
              error={errors.whatsapp?.message}
              leftElement={
                <SimpleCountrySelect
                  value={countrySelect}
                  onChange={(value: string) => setCountrySelect(value)}
                  options={countryOptions}
                />
              }
            />
          )}
        />
      </div>

      <div className="mb-5">
        <label className="block text-sm font-bold text-black mb-3">
          ¿Cuántas facturas tienes pendientes?<span className="text-red-500">*</span>
        </label>
        <Controller
          name="facturas_pendientes"
          control={control}
          rules={{ required: 'Debes seleccionar una opción' }}
          render={({ field }) => (
            <div className="flex flex-wrap gap-2">
              {facturaOpciones.map((op) => (
                <button
                  key={op.value}
                  type="button"
                  onClick={() => field.onChange(op.value)}
                  className={`min-h-[44px] px-5 py-2 rounded-full border-2 text-sm font-semibold transition-colors ${
                    field.value === op.value
                      ? 'border-brand-primary bg-brand-primary text-white'
                      : 'border-border-default bg-white text-text-primary hover:border-brand-primary'
                  }`}
                >
                  {op.label}
                </button>
              ))}
            </div>
          )}
        />
        {errors.facturas_pendientes && (
          <p className="text-red-500 text-xs mt-1">{errors.facturas_pendientes.message}</p>
        )}
      </div>

      <div className="mb-6">
        <label className="block text-sm font-bold text-black mb-3">
          ¿Alguien en tu equipo se encarga de cobrar?<span className="text-red-500">*</span>
        </label>
        <Controller
          name="alguien_cobrando"
          control={control}
          rules={{ required: 'Debes seleccionar una opción' }}
          render={({ field }) => (
            <div className="flex flex-wrap gap-2">
              {cobranzaOpciones.map((op) => (
                <button
                  key={op.value}
                  type="button"
                  onClick={() => field.onChange(op.value)}
                  className={`min-h-[44px] px-5 py-2 rounded-full border-2 text-sm font-semibold transition-colors ${
                    field.value === op.value
                      ? 'border-brand-primary bg-brand-primary text-white'
                      : 'border-border-default bg-white text-text-primary hover:border-brand-primary'
                  }`}
                >
                  {op.label}
                </button>
              ))}
            </div>
          )}
        />
        {errors.alguien_cobrando && (
          <p className="text-red-500 text-xs mt-1">{errors.alguien_cobrando.message}</p>
        )}
      </div>

      <p className="text-xs text-text-secondary mb-5">
        Al enviar, aceptas los{' '}
        <Link href="/term" className="text-brand-primary font-semibold hover:underline">
          Términos
        </Link>{' '}
        y la{' '}
        <Link href="/privacy" className="text-brand-primary font-semibold hover:underline">
          Política de Privacidad
        </Link>
        .
      </p>

      {submitError && <p className="text-red-500 text-sm mb-4">{submitError}</p>}

      <Button
        type="submit"
        text={isLoading ? 'Enviando...' : 'Solicitar Evaluación Gratuita'}
        variant="secondaryFilled"
        size="md"
        className="w-full md:w-auto min-h-[44px]"
        disabled={isLoading}
      />
    </form>
  )
}
