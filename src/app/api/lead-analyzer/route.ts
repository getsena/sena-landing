import { createHash, randomUUID } from 'crypto'
import { NextRequest, NextResponse } from 'next/server'

import { classifyLead } from '@/lib/lead/classify'
import { notifyLead, notifyLeadInBackground, type NotifyLeadInput } from '@/lib/lead/notify'
import { isSmokeTest } from '@/lib/lead/smoke'
import { allowUnverified, clientIp, turnstileTokenFrom, verifyTurnstile } from '@/lib/lead/turnstile'
import { readJsonBody, validateAnalyzerLead, type AnalyzerLeadPayload } from '@/lib/lead/validate'
import {
  OWNER_FRANCISCO,
  PRODUCT_LIST_ID,
  addToList,
  createDeal,
  getToken,
  upsertContact,
} from '@/lib/lead/hubspot'

const INTERES_DEL_PRODUCTO = 'Cuentas por Cobrar'

const BUCKET_LABELS = ['1–30 días', '31–60 días', '61–90 días', '3–6 meses', '6–12 meses', '1+ año']

function fmtCLP(n: number): string {
  if (n >= 1e9) return `CLP ${(n / 1e9).toFixed(1)}B`
  if (n >= 1e6) return `CLP ${Math.round(n / 1e6)}M`
  return `CLP ${Math.round(n).toLocaleString('es-CL')}`
}

function clasificar(body: AnalyzerLeadPayload) {
  return classifyLead({
    utmSource: body.utmSource,
    utmMedium: body.utmMedium,
    utmCampaign: body.utmCampaign,
    gclid: body.gclid,
    gbraid: body.gbraid,
    wbraid: body.wbraid,
    fbclid: body.fbclid,
  })
}

// Datos del aviso interno por correo (ver src/lib/lead/notify.ts).
function notifyInput(
  body: AnalyzerLeadPayload,
  outcome: NotifyLeadInput['outcome'],
  extra: { contactId?: string; error?: string; unverified?: boolean } = {}
): NotifyLeadInput {
  const clasificacion = clasificar(body)
  return {
    outcome,
    source: 'analizador',
    lead: {
      nombre: body.nombre,
      empresa: body.empresa,
      email: body.email,
      telefono: body.telefono,
      extras: {
        'Cartera en riesgo': fmtCLP(body.cartera_total_riesgo_clp),
        'Cartera recuperable': fmtCLP(body.cartera_recuperable_clp),
        'Facturación mensual': body.facturacion_mensual_rango,
        Industria: body.industria,
      },
    },
    attribution: {
      fuente: clasificacion.fuente,
      origen: clasificacion.origen,
      origenDetalle: clasificacion.origenDetalle,
      utmCampaign: body.utmCampaign,
    },
    ...extra,
  }
}

function buildContactProperties(body: AnalyzerLeadPayload): Record<string, string> {
  const clasificacion = clasificar(body)
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

async function sendMetaCapi(body: AnalyzerLeadPayload, eventId: string): Promise<void> {
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
            event_id: eventId,
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
      signal: AbortSignal.timeout(2000),
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

  const parsed = await readJsonBody(req)
  if (!parsed.ok) return NextResponse.json({ error: parsed.error }, { status: parsed.status })
  const validated = validateAnalyzerLead(parsed.value)
  if (!validated.ok) return NextResponse.json({ error: validated.error }, { status: validated.status })
  const body = validated.value

  // Turnstile: un token inválido se rechaza; sin token o con Cloudflare caído el lead se procesa igual,
  // pero queda marcado, sin Meta CAPI y con tope por IP (ver src/lib/lead/turnstile.ts).
  const ip = clientIp(req.headers)
  const verification = await verifyTurnstile(turnstileTokenFrom(parsed.value), {
    remoteIp: ip,
    action: 'lead',
  })
  if (verification.status === 'rejected') {
    return NextResponse.json(
      {
        ok: false,
        error: 'No pudimos verificar que eres una persona. Recarga la página e intenta de nuevo.',
      },
      { status: 403 }
    )
  }
  const unverified = verification.status === 'unverified'
  if (unverified && !allowUnverified(ip)) {
    return NextResponse.json(
      { ok: false, error: 'Recibimos demasiados intentos. Intenta de nuevo en unos minutos.' },
      { status: 429 }
    )
  }

  let savedContactId: string | undefined
  try {
    const { id: contactId, isNew } = await upsertContact(token, buildContactProperties(body))
    savedContactId = contactId
    const [dealCreated] = await Promise.all([
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
    // Meta solo se entera de leads que el CRM sí guardó (evita conversiones fantasma)
    if (!isSmokeTest(body.email) && !unverified) await sendMetaCapi(body, body.eventId ?? randomUUID())
    // Aviso interno solo si hay contacto o negocio nuevo: el reenvío de un lead ya abierto no repite el correo.
    if (isNew || dealCreated) notifyLeadInBackground(notifyInput(body, 'ok', { contactId, unverified }))
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[HubSpot] error:', err instanceof Error ? err.message : 'CRM error')
    // El correo es el único registro del lead: se espera (tope de 3 s) antes de responder el error.
    await notifyLead(
      notifyInput(body, 'hubspot_failed', {
        contactId: savedContactId,
        unverified,
        error: err instanceof Error ? err.message : 'error desconocido',
      })
    )
    return NextResponse.json(
      { ok: false, error: 'No pudimos registrar tu solicitud. Intenta de nuevo.' },
      { status: 502 }
    )
  }
}
