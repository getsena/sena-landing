'use client'
import { AssetImage } from '@/lib/utils/assets/image'
import Button from '@/ui/shared/Button'
import Image, { StaticImageData } from 'next/image'
import { useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useRef, useState } from 'react'

type ProductKey = 'autogestion' | 'opera' | 'recuperacion'

type Product = {
  key: ProductKey
  /** Quién opera la cobranza en esta modalidad — el eje que diferencia las tres. */
  eyebrow: string
  name: string
  promise: string
  description: string
  fit: string
  cta: string
  image: StaticImageData
  onCtaClick: () => void
}

const ProductCard = ({ product, highlighted }: { product: Product; highlighted: boolean }) => (
  <div
    className={`flex flex-col bg-surface-default rounded-2xl overflow-hidden border transition-shadow ${
      highlighted
        ? 'border-brand-secondary ring-2 ring-brand-secondary shadow-lg'
        : 'border-border-default shadow-sm'
    }`}
  >
    <div className="bg-brand-primary p-4">
      <div className="bg-surface-default rounded-xl h-40 overflow-hidden">
        <Image src={product.image} alt={product.name} className="w-full h-full object-cover" />
      </div>
    </div>

    <div className="flex flex-col grow p-5">
      <span className="self-start rounded-full bg-brand-secondary/10 text-brand-secondary text-xs font-bold px-3 py-1">
        {product.eyebrow}
      </span>

      <p className="mt-3 font-canaro text-brand-primary-dark text-2xl font-extrabold">{product.name}</p>

      <p className="mt-2 text-black font-bold text-sm leading-5">{product.promise}</p>

      <p className="mt-2 text-text-primary text-sm leading-5">{product.description}</p>

      <p className="mt-4 text-text-secondary text-xs leading-5">
        <span className="font-bold text-brand-primary-dark">Para ti si:</span> {product.fit}
      </p>

      <Button text={product.cta} className="mt-5 self-start" size="sm" onClick={product.onCtaClick} />
    </div>
  </div>
)

export const Products = () => {
  const products = useMemo<Product[]>(
    () => [
      {
        key: 'autogestion',
        eyebrow: 'Operas tú',
        name: 'Plataforma Sena',
        promise: 'Todo el ciclo de cobranza, ordenado en una sola plataforma.',
        description:
          'Tu equipo opera con mejor tecnología: cartera unificada, recordatorios multicanal y conciliación, sin reemplazar tu ERP. Primer cobro automatizado operando en 2 semanas.',
        fit: 'tienes un equipo administrativo o financiero que hoy cobra con planillas y mensajes sueltos.',
        cta: 'Agenda una demo',
        image: AssetImage.autogestion,
        onCtaClick: () => {
          window.open('https://meetings.hubspot.com/francisco502', '_blank')
        },
      },
      {
        key: 'opera',
        eyebrow: 'Operamos por ti',
        name: 'Ópera',
        promise: 'El equipo de cobranza que tu empresa no tiene, operando por ti.',
        description:
          'Análisis, estrategia, ejecución y monitoreo. Tú solo ves los resultados. El análisis inicial de tu cartera es gratuito.',
        fit: 'no tienes equipo de cobranza y quieres delegar el problema completo.',
        cta: 'Cotizar para mi empresa',
        image: AssetImage.cobra,
        onCtaClick: () => {
          window.location.href = 'https://agente.somossena.com'
        },
      },
      {
        key: 'recuperacion',
        eyebrow: 'Solo lo vencido',
        name: 'Recupera',
        promise: 'Solo nos pagas si recuperamos.',
        description:
          'Tienes facturas vencidas que no has podido cobrar. Nosotros las recuperamos: 15% sobre lo cobrado, sin ticket mínimo.',
        fit: 'tienes facturas antiguas detenidas y buscas una salida prejudicial.',
        cta: 'Iniciar recupero',
        image: AssetImage.recuperaGirl,
        onCtaClick: () => {
          window.open('https://recupera.somossena.com', '_self')
        },
      },
    ],
    []
  )

  const searchParams = useSearchParams()
  const tabParam = searchParams.get('tab')
  const sectionRef = useRef<HTMLElement>(null)

  // Las tres modalidades se muestran siempre. `highlighted` solo destaca una cuando se llega
  // por deep-link (?tab=) o desde el menú del header, que emite `sena:product-tab`.
  const [highlighted, setHighlighted] = useState<ProductKey | null>(null)

  const isProductKey = (value: string | null): value is ProductKey =>
    value === 'autogestion' || value === 'opera' || value === 'recuperacion'

  useEffect(() => {
    if (isProductKey(tabParam)) {
      setHighlighted(tabParam)
      sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [tabParam])

  useEffect(() => {
    const handler = (e: Event) => {
      const tab = (e as CustomEvent).detail
      if (isProductKey(tab)) {
        setHighlighted(tab)
        sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
    window.addEventListener('sena:product-tab', handler)
    return () => window.removeEventListener('sena:product-tab', handler)
  }, [])

  return (
    <section id="productos" ref={sectionRef} className="max-w-[1280px] mx-auto pt-28 scroll-mt-24">
      <div className="bg-surface-secondary px-4 py-10 md:rounded-3xl md:p-10">
        <div className="max-w-3xl">
          <p className="font-adobe text-brand-primary-dark text-2xl sm:text-4xl font-black">
            Un servicio, tres formas de activarlo
            <span className="text-brand-secondary font-caslon">.</span>
          </p>
          <p className="font-adobe text-black mt-3 text-lg leading-6">
            Somos cobranza B2B. Activas lo que necesitas, y subir de capacidad siempre está disponible.
            Analizamos tu caso y te decimos cuál conviene — el análisis de tu cartera es gratis.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {products.map((p) => (
            <ProductCard key={p.key} product={p} highlighted={highlighted === p.key} />
          ))}
        </div>
      </div>
    </section>
  )
}
