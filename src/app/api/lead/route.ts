import { createHash, randomUUID } from 'crypto'
import { NextRequest, NextResponse } from 'next/server'

import { classifyLead } from '@/lib/lead/classify'
import {
  OWNER_FRANCISCO,
  PRODUCT_LIST_ID,
  addToList,
  createDeal,
  getToken,
  upsertContact,
  type Producto,
} from '@/lib/lead/hubspot'

type LeadPayload = {
  nombre: string
  apellido: string
  empresa: string
  email: string
  telefono: string
  facturas_pendientes: string
  alguien_cobrando: string
  producto?: Producto
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  utmContent?: string
  utmTerm?: string
  gclid?: string
  gbraid?: string
  wbraid?: string
  fbclid?: string
  landingPage?: string
  // id compartido con el pixel del navegador para que Meta deduplique el evento
  eventId?: string
}

const INTERES_DEL_PRODUCTO = 'Cuentas por Cobrar'

// Scoring A/B/C basado en tamaño de cartera + urgencia de cobro
function calcPrioridad(facturas: string, cobrando: string): 'A' | 'B' | 'C' {
  let score = 0
  if (facturas === '50+') score += 2
  else if (facturas === '10-50') score += 1

  // alguien_cobrando: el form envía "Sí" — lo normalizamos
  const c = cobrando.toLowerCase().trim()
  if (c === 'no') score += 2
  else if (c === 'a veces') score += 1

  if (score >= 4) return 'A'
  if (score >= 2) return 'B'
  return 'C'
}

function calcSenaIntencion(p: 'A' | 'B' | 'C'): string {
  return p === 'A' ? 'Alta' : p === 'B' ? 'Media' : 'Baja'
}

// Normaliza alguien_cobrando para el enum HubSpot ("Sí" → "Si")
function normalizeCobrando(value: string): string {
  const v = value.trim()
  if (v === 'Sí' || v === 'Si' || v.toLowerCase() === 'si') return 'Si'
  return v
}

function buildContactProperties(body: LeadPayload): Record<string, string> {
  const producto = body.producto ?? 'Plataforma'
  const prioridad = calcPrioridad(body.facturas_pendientes, body.alguien_cobrando)
  const clasificacion = classifyLead({
    utmSource: body.utmSource,
    utmMedium: body.utmMedium,
    utmCampaign: body.utmCampaign,
    gclid: body.gclid,
    gbraid: body.gbraid,
    wbraid: body.wbraid,
    fbclid: body.fbclid,
  })

  const properties: Record<string, string> = {
    firstname: body.nombre,
    lastname: body.apellido,
    email: body.email,
    phone: body.telefono,
    company: body.empresa,
    hubspot_owner_id: OWNER_FRANCISCO,
    interes_del_producto: INTERES_DEL_PRODUCTO,
    tipo_de_origen: 'Form landing',
    etapa_del_lead: 'Interesado',
    fuente_del_lead: clasificacion.fuente,
    origen_detalle: clasificacion.origenDetalle,
    sena_prioridad: prioridad,
    sena_intencion: calcSenaIntencion(prioridad),
    facturas_pendientes: body.facturas_pendientes,
    alguien_cobrando: normalizeCobrando(body.alguien_cobrando),
    sena_contexto: `Lead landing ${producto}. Facturas: ${body.facturas_pendientes}. Cobrando: ${body.alguien_cobrando}. Prioridad auto: ${prioridad}. Origen: ${clasificacion.origen || 'otro'}.`,
  }

  // origen queda vacío para pagos de una plataforma desconocida (regla R4): no se envía.
  if (clasificacion.origen) properties.origen = clasificacion.origen

  if (body.gclid) properties.gclid = body.gclid
  if (body.fbclid) properties.fbclid = body.fbclid
  if (body.landingPage) properties.landing_page = body.landingPage
  if (body.utmCampaign) properties.utm_campaign = body.utmCampaign
  if (body.utmTerm) properties.utm_term = body.utmTerm

  return properties
}

async function sendMetaCapi(body: LeadPayload, eventId: string): Promise<void> {
  const pixelId = process.env.META_PIXEL_ID
  const capiToken = process.env.META_CAPI_TOKEN
  if (!pixelId || !capiToken) return

  const hashedEmail = createHash('sha256').update(body.email.toLowerCase().trim()).digest('hex')

  const userData: Record<string, string | string[]> = {
    em: [hashedEmail],
  }
  if (body.fbclid) userData.fbc = `fb.1.${Date.now()}.${body.fbclid}`

  try {
    await fetch(`https://graph.facebook.com/v21.0/${pixelId}/events`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        access_token: capiToken,
        data: [
          {
            event_name: 'Lead',
            event_id: eventId,
            event_time: Math.floor(Date.now() / 1000),
            action_source: 'website',
            user_data: userData,
            custom_data: {
              content_name: (body.producto ?? 'Plataforma').toLowerCase(),
              utm_source: body.utmSource,
              utm_campaign: body.utmCampaign,
            },
          },
        ],
      }),
      signal: AbortSignal.timeout(5000),
    })
  } catch (err) {
    console.error('[CAPI] error:', err instanceof Error ? err.message : 'CAPI error')
  }
}

export async function POST(req: NextRequest) {
  let token: string
  try {
    token = getToken()
  } catch {
    return NextResponse.json({ error: 'HubSpot no configurado' }, { status: 500 })
  }

  let body: LeadPayload
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Payload inválido' }, { status: 400 })
  }

  const { nombre, apellido, empresa, email, telefono, facturas_pendientes, alguien_cobrando } = body
  if (!nombre || !apellido || !empresa || !email || !telefono || !facturas_pendientes || !alguien_cobrando) {
    return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 400 })
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return NextResponse.json({ error: 'Email inválido' }, { status: 400 })
  }

  const PRODUCTOS_VALIDOS = ['Plataforma', 'Recupera', 'Opera'] as const
  if (body.producto && !PRODUCTOS_VALIDOS.includes(body.producto)) {
    body.producto = undefined
  }

  try {
    const producto = body.producto ?? 'Plataforma'
    const { id: contactId, isNew } = await upsertContact(token, buildContactProperties(body))
    const prioridad = calcPrioridad(body.facturas_pendientes, body.alguien_cobrando)
    await Promise.all([
      createDeal(
        token,
        contactId,
        {
          dealname: `${producto} — ${body.empresa}`,
          description: `Prioridad: ${prioridad} · Facturas: ${body.facturas_pendientes} · Cobrando: ${body.alguien_cobrando}`,
        },
        !isNew
      ),
      addToList(token, contactId, PRODUCT_LIST_ID[producto]),
    ])
    // Meta solo se entera de leads que el CRM sí guardó (evita conversiones fantasma)
    await sendMetaCapi(body, body.eventId ?? randomUUID())
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[HubSpot] error:', err instanceof Error ? err.message : 'CRM error')
    return NextResponse.json(
      { ok: false, error: 'No pudimos registrar tu solicitud. Intenta de nuevo.' },
      { status: 502 }
    )
  }
}
