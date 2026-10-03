import { createHash } from 'crypto'
import { NextRequest, NextResponse } from 'next/server'

import { classifyLead } from '@/lib/lead/classify'
import {
  OWNER_FRANCISCO,
  PRODUCT_LIST_ID,
  addToList,
  createDeal,
  getToken,
  upsertContact,
} from '@/lib/lead/hubspot'

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
  utmMedium?: string
  utmCampaign?: string
  gclid?: string
  gbraid?: string
  wbraid?: string
  fbclid?: string
  landingPage?: string
}

const INTERES_DEL_PRODUCTO = 'Cuentas por Cobrar'

const BUCKET_LABELS = ['1–30 días', '31–60 días', '61–90 días', '3–6 meses', '6–12 meses', '1+ año']

function fmtCLP(n: number): string {
  if (n >= 1e9) return `CLP ${(n / 1e9).toFixed(1)}B`
  if (n >= 1e6) return `CLP ${Math.round(n / 1e6)}M`
  return `CLP ${Math.round(n).toLocaleString('es-CL')}`
}

function buildContactProperties(body: AnalyzerLeadPayload): Record<string, string> {
  const clasificacion = classifyLead({
    utmSource: body.utmSource,
    utmMedium: body.utmMedium,
    utmCampaign: body.utmCampaign,
    gclid: body.gclid,
    gbraid: body.gbraid,
    wbraid: body.wbraid,
    fbclid: body.fbclid,
  })
  const bucketLabel = BUCKET_LABELS[body.cartera_bucket_critico] ?? 'desconocido'

  const properties: Record<string, string> = {
    firstname: body.nombre,
    email: body.email,
    company: body.empresa,
    hubspot_owner_id: OWNER_FRANCISCO,
    interes_del_producto: INTERES_DEL_PRODUCTO,
    tipo_de_origen: 'Form landing',
    etapa_del_lead: 'Interesado',
    fuente_del_lead: clasificacion.fuente,
    origen_detalle: clasificacion.origenDetalle,
    sena_prioridad: 'B',
    sena_intencion: 'Media',
    sena_contexto: `Lead Analizador de Cartera. Cartera total: ${fmtCLP(body.cartera_total_riesgo_clp)}. Recuperable: ${fmtCLP(body.cartera_recuperable_clp)}. Bucket crítico: ${bucketLabel}. Facturación: ${body.facturacion_mensual_rango}. Industria: ${body.industria}.`,
  }

  // origen queda vacío para pagos de una plataforma desconocida (regla R4): no se envía.
  if (clasificacion.origen) properties.origen = clasificacion.origen
  if (body.telefono) properties.phone = body.telefono
  if (body.gclid) properties.gclid = body.gclid
  if (body.fbclid) properties.fbclid = body.fbclid
  if (body.landingPage) properties.landing_page = body.landingPage

  return properties
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
    const { id: contactId, isNew } = await upsertContact(token, buildContactProperties(body))
    await Promise.all([
      createDeal(
        token,
        contactId,
        {
          dealname: `Plataforma — ${body.empresa}`,
          description: `Lead Analizador de Cartera. Total: ${fmtCLP(body.cartera_total_riesgo_clp)}. Recuperable: ${fmtCLP(body.cartera_recuperable_clp)}. Industria: ${body.industria}.`,
        },
        !isNew
      ),
      addToList(token, contactId, PRODUCT_LIST_ID.Plataforma),
    ])
    await capiPromise
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[HubSpot] error:', err instanceof Error ? err.message : 'CRM error')
    await capiPromise
    return NextResponse.json(
      { ok: false, error: 'No pudimos registrar tu solicitud. Intenta de nuevo.' },
      { status: 502 }
    )
  }
}
