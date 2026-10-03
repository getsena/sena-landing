import { createHash } from 'crypto'
import { NextRequest, NextResponse } from 'next/server'

import { mapOrigen } from '@/lib/lead/attribution'

type AnalyzerLeadPayload = {
  nombre: string
  empresa: string
  email: string
  telefono?: string
  cartera_total_riesgo_clp: number
  cartera_recuperable_clp: number
  cartera_bucket_critico: number
  facturacion_mensual_rango: string
  industria: string
  utmSource?: string
  gclid?: string
  fbclid?: string
  landingPage?: string
}

const HS_API = 'https://api.hubapi.com'
const OWNER_FRANCISCO = '89319447'
const PRODUCT_LIST_ID = '362'
const INTERES_DEL_PRODUCTO = 'Cuentas por Cobrar'

const BUCKET_LABELS = ['1–30 días', '31–60 días', '61–90 días', '3–6 meses', '6–12 meses', '1+ año']

function fmtCLP(n: number): string {
  if (n >= 1e9) return `CLP ${(n / 1e9).toFixed(1)}B`
  if (n >= 1e6) return `CLP ${Math.round(n / 1e6)}M`
  return `CLP ${Math.round(n).toLocaleString('es-CL')}`
}

function getToken(): string {
  const t = process.env.HUBSPOT_ACCESS_TOKEN
  if (!t) throw new Error('HUBSPOT_ACCESS_TOKEN no configurado')
  return t
}

async function findContactByEmail(token: string, email: string): Promise<string | null> {
  const res = await fetch(`${HS_API}/crm/v3/objects/contacts/search`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({
      filterGroups: [{ filters: [{ propertyName: 'email', operator: 'EQ', value: email }] }],
      properties: ['email'],
      limit: 1,
    }),
  })
  if (!res.ok) return null
  const data = await res.json()
  return data.total > 0 ? data.results[0].id : null
}

async function upsertContact(token: string, body: AnalyzerLeadPayload): Promise<string> {
  const origen = mapOrigen(body.utmSource, body.gclid, body.fbclid)
  const fuente = body.gclid ? 'Google Ads' : body.fbclid ? 'Meta Ads' : body.utmSource ? 'Ads' : 'Orgánico'
  const bucketLabel = BUCKET_LABELS[body.cartera_bucket_critico] ?? 'desconocido'

  const properties: Record<string, string> = {
    firstname: body.nombre,
    email: body.email,
    company: body.empresa,
    hubspot_owner_id: OWNER_FRANCISCO,
    interes_del_producto: INTERES_DEL_PRODUCTO,
    tipo_de_origen: 'Analizador de Cartera',
    etapa_del_lead: 'Interesado',
    origen,
    fuente_del_lead: fuente,
    sena_prioridad: 'B',
    sena_intencion: 'Media',
    sena_contexto: `Lead Analizador de Cartera. Cartera total: ${fmtCLP(body.cartera_total_riesgo_clp)}. Recuperable: ${fmtCLP(body.cartera_recuperable_clp)}. Bucket crítico: ${bucketLabel}. Facturación: ${body.facturacion_mensual_rango}. Industria: ${body.industria}.`,
    cartera_total_riesgo_clp: String(Math.round(body.cartera_total_riesgo_clp)),
    cartera_recuperable_clp: String(Math.round(body.cartera_recuperable_clp)),
    cartera_bucket_critico: bucketLabel,
    facturacion_mensual_rango: body.facturacion_mensual_rango,
    industria: body.industria,
  }

  if (body.telefono) properties.phone = body.telefono
  if (body.gclid) properties.gclid = body.gclid
  if (body.fbclid) properties.fbclid = body.fbclid
  if (body.landingPage) properties.landing_page = body.landingPage

  const existingId = await findContactByEmail(token, body.email)

  if (existingId) {
    const res = await fetch(`${HS_API}/crm/v3/objects/contacts/${existingId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ properties }),
    })
    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      throw new Error(`PATCH contact failed: ${JSON.stringify(err)}`)
    }
    return existingId
  }

  const res = await fetch(`${HS_API}/crm/v3/objects/contacts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ properties }),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(`POST contact failed: ${JSON.stringify(err)}`)
  }
  const data = await res.json()
  return data.id
}

async function createDeal(token: string, contactId: string, body: AnalyzerLeadPayload): Promise<void> {
  const res = await fetch(`${HS_API}/crm/v3/objects/deals`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({
      properties: {
        dealname: `Plataforma — ${body.empresa}`,
        dealstage: 'appointmentscheduled',
        pipeline: 'default',
        hubspot_owner_id: OWNER_FRANCISCO,
        closedate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        description: `Lead Analizador de Cartera. Total: ${fmtCLP(body.cartera_total_riesgo_clp)}. Recuperable: ${fmtCLP(body.cartera_recuperable_clp)}. Industria: ${body.industria}.`,
      },
    }),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(`POST deal failed: ${JSON.stringify(err)}`)
  }
  const deal = await res.json()

  await fetch(`${HS_API}/crm/v3/objects/deals/${deal.id}/associations/contacts/${contactId}/3`, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${token}` },
  })
}

async function addToList(token: string, contactId: string): Promise<void> {
  const res = await fetch(`${HS_API}/crm/v3/lists/${PRODUCT_LIST_ID}/memberships/add`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify([contactId]),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok || (data as { recordIdsMissing?: string[] }).recordIdsMissing?.length) {
    throw new Error(`addToList failed for contact ${contactId}: ${JSON.stringify(data)}`)
  }
}

async function sendMetaCapi(body: AnalyzerLeadPayload): Promise<void> {
  const pixelId = process.env.META_PIXEL_ID
  const capiToken = process.env.META_CAPI_TOKEN
  if (!pixelId || !capiToken) return

  const hashedEmail = createHash('sha256').update(body.email.toLowerCase().trim()).digest('hex')
  const userData: Record<string, string | string[]> = { em: [hashedEmail] }
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
            event_time: Math.floor(Date.now() / 1000),
            action_source: 'website',
            user_data: userData,
            custom_data: {
              content_name: 'analizador-cartera',
              utm_source: body.utmSource,
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

  let body: AnalyzerLeadPayload
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Payload inválido' }, { status: 400 })
  }

  const {
    nombre,
    empresa,
    email,
    cartera_total_riesgo_clp,
    cartera_recuperable_clp,
    cartera_bucket_critico,
    facturacion_mensual_rango,
    industria,
  } = body
  if (
    !nombre ||
    !empresa ||
    !email ||
    cartera_total_riesgo_clp == null ||
    cartera_recuperable_clp == null ||
    cartera_bucket_critico == null ||
    !facturacion_mensual_rango ||
    !industria
  ) {
    return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 400 })
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return NextResponse.json({ error: 'Email inválido' }, { status: 400 })
  }

  const capiPromise = sendMetaCapi(body)

  try {
    const contactId = await upsertContact(token, body)
    await Promise.all([createDeal(token, contactId, body), addToList(token, contactId)])
    await capiPromise
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[HubSpot] error:', err instanceof Error ? err.message : 'CRM error')
    await capiPromise
    return NextResponse.json({ ok: true, warning: 'CRM sync pendiente' })
  }
}
