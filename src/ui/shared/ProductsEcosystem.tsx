'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const PRODUCTS = [
  {
    slug: 'plataforma',
    label: 'Plataforma Sena',
    tag: 'Operas tú',
    desc: 'Cartera unificada, recordatorios multicanal y conciliación. Tú controlas el proceso.',
    cta: 'Ver Plataforma',
    href: '/plataforma',
    color: 'bg-brand-primary/10 text-brand-primary-dark',
  },
  {
    slug: 'opera',
    label: 'Ópera',
    tag: 'Operamos por ti',
    desc: 'El equipo de cobranza que tu empresa no tiene. Nosotros operamos, tú ves los resultados.',
    cta: 'Ver Ópera',
    href: 'https://agente.somossena.com',
    color: 'bg-violet-50 text-violet-800',
  },
  {
    slug: 'recupera',
    label: 'Recupera',
    tag: 'Solo lo vencido',
    desc: 'Facturas vencidas que no has podido cobrar. Pagas solo si recuperamos, sin ticket mínimo.',
    cta: 'Ver Recupera',
    href: 'https://recupera.somossena.com',
    color: 'bg-emerald-50 text-emerald-800',
  },
]

export const ProductsEcosystem = ({ active }: { active: 'plataforma' | 'recupera' | 'opera' }) => (
  <section className="bg-white border-y border-slate-100 py-10">
    <div className="max-w-[1280px] mx-auto px-4">
      <p className="text-center text-xs font-bold uppercase tracking-widest text-text-disabled mb-6">
        El ecosistema completo de cobranza de Sena
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
        {PRODUCTS.map((p) => {
          const isActive = p.slug === active
          return (
            <div
              key={p.slug}
              className={`rounded-2xl p-5 border transition-all ${
                isActive
                  ? 'border-brand-primary/30 bg-brand-primary/5 shadow-sm'
                  : 'border-slate-100 bg-slate-50'
              }`}
            >
              <span className={`inline-block text-xs font-bold px-2.5 py-1 rounded-full mb-3 ${p.color}`}>
                {p.tag}
              </span>
              <p className="font-extrabold text-brand-primary-dark text-base mb-1">{p.label}</p>
              <p className="text-text-secondary text-sm leading-relaxed mb-4">{p.desc}</p>
              {isActive ? (
                <span className="text-xs text-brand-primary font-semibold">Estás aquí</span>
              ) : (
                <Link
                  href={p.href}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-primary hover:text-brand-primary-dark transition-colors"
                >
                  {p.cta}
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              )}
            </div>
          )
        })}
      </div>
    </div>
  </section>
)
