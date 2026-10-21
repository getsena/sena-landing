// Formulario «Cuéntanos tu caso» de la home: etiquetas legibles para HubSpot y el aviso interno, y
// el producto al que se asigna el lead (lista de HubSpot y etiqueta de conversión de Ads).

import type { Producto } from '@/lib/lead/hubspot'
import type { LeadCaso } from '@/lib/lead/validate'

export const COTIZAR_LABEL: Record<LeadCaso['cotizar'], string> = {
  habitual: 'Cartera habitual',
  recupera: 'Empezar por Recupera',
}

export const NECESIDAD_LABEL: Record<LeadCaso['necesidad'], string> = {
  equipo: 'Potenciar mi equipo',
  delegar: 'Delegar la gestión',
  recaudacion: 'Recaudación y conciliación',
  dificil: 'Recuperar deuda difícil',
}

export const ANTIGUEDAD_LABEL: Record<NonNullable<LeadCaso['antiguedad']>, string> = {
  '0-30': 'Menos de 30 días',
  '31-90': '31 a 90 días',
  '91-180': '91 a 180 días',
  '180+': 'Más de 180 días',
}

// Recupera si lo pide o si la necesidad es deuda difícil; Ópera si quiere delegar; si no, Plataforma.
export function productoDelCaso(caso: Pick<LeadCaso, 'cotizar' | 'necesidad'>): Producto {
  if (caso.cotizar === 'recupera' || caso.necesidad === 'dificil') return 'Recupera'
  if (caso.necesidad === 'delegar') return 'Opera'
  return 'Plataforma'
}

// Pares etiqueta → valor, solo con lo que el visitante respondió.
export function casoExtras(caso: LeadCaso): Record<string, string | number> {
  const extras: Record<string, string | number> = {
    'Quiere cotizar': COTIZAR_LABEL[caso.cotizar],
    'Tipo de cartera': caso.tipo_cartera,
    'Principal necesidad': NECESIDAD_LABEL[caso.necesidad],
    Canales: caso.canales.join(', ') || 'Sin indicar',
  }
  if (caso.volumen_clientes !== undefined) extras['Clientes al mes'] = caso.volumen_clientes
  if (caso.volumen_facturas !== undefined) extras['Facturas al mes'] = caso.volumen_facturas
  if (caso.antiguedad) extras['Antigüedad de la deuda'] = ANTIGUEDAD_LABEL[caso.antiguedad]
  if (caso.comentarios) extras.Comentarios = caso.comentarios
  return extras
}

export function casoResumen(caso: LeadCaso): string {
  return Object.entries(casoExtras(caso))
    .map(([k, v]) => `${k}: ${v}`)
    .join('. ')
}
