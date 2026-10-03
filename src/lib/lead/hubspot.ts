// Cliente HubSpot compartido por las rutas de lead (/api/lead y /api/lead-analyzer).
// Regla de fallo: un campo de clasificación nunca debe costar el lead.

export const HS_API = 'https://api.hubapi.com'
export const OWNER_FRANCISCO = '89319447'

export type Producto = 'Plataforma' | 'Recupera' | 'Opera'

// ILS IDs (v3) de las listas "Leads <Producto>" en HubSpot — distintos de los IDs v1 de la UI.
export const PRODUCT_LIST_ID: Record<Producto, string> = {
  Plataforma: '362',
  Recupera: '363',
  Opera: '364',
}

export function getToken(): string {
  const t = process.env.HUBSPOT_ACCESS_TOKEN
  if (!t) throw new Error('HUBSPOT_ACCESS_TOKEN no configurado')
  return t
}

const headers = (token: string) => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${token}`,
})

// Propiedades que, si el contacto ya las tiene, NO se sobrescriben al reenviar un formulario:
// propietario y etapa (trabajo comercial en curso) y la atribución original (first-touch).
export const PRESERVE_IF_SET = [
  'hubspot_owner_id',
  'etapa_del_lead',
  'fuente_del_lead',
  'origen',
  'origen_detalle',
  'tipo_de_origen',
]

export type ExistingContact = { id: string; properties: Record<string, string | null> }

export async function findContact(token: string, email: string): Promise<ExistingContact | null> {
  const res = await fetch(`${HS_API}/crm/v3/objects/contacts/search`, {
    method: 'POST',
    headers: headers(token),
    body: JSON.stringify({
      filterGroups: [{ filters: [{ propertyName: 'email', operator: 'EQ', value: email }] }],
      properties: ['email', ...PRESERVE_IF_SET],
      limit: 1,
    }),
  })
  if (!res.ok) return null
  const data = await res.json()
  return data.total > 0 ? { id: data.results[0].id, properties: data.results[0].properties ?? {} } : null
}

// Propiedades de clasificación: útiles para reporting, pero nunca deben costar el lead.
// Si HubSpot rechaza alguna (opción inválida o propiedad inexistente), se reintenta sin ellas:
// los datos de contacto (nombre, email, teléfono, empresa) sí se guardan.
export const CLASSIFICATION_PROPS = [
  'origen',
  'origen_detalle',
  'fuente_del_lead',
  'interes_del_producto',
  'tipo_de_origen',
  'etapa_del_lead',
  'sena_prioridad',
  'sena_intencion',
  'facturas_pendientes',
  'alguien_cobrando',
]

const RECOVERABLE_ERRORS = /INVALID_OPTION|PROPERTY_DOESNT_EXIST/

// Resume un error de HubSpot sin datos personales: su cuerpo puede traer el valor rechazado
// (email, teléfono, nombre). Solo se conserva estado, códigos y nombres de propiedad.
export function describeHubspotError(status: number, err: unknown): string {
  const text = JSON.stringify(err ?? {})
  const codes = [...new Set(text.match(/\b[A-Z]{2,}(?:_[A-Z]+)+\b/g) ?? [])].slice(0, 5)
  const props = new Set<string>()
  const errors = (err as { errors?: { context?: { propertyName?: unknown } }[] } | null)?.errors
  for (const e of Array.isArray(errors) ? errors : []) {
    const names = e?.context?.propertyName
    for (const n of Array.isArray(names) ? names : [names]) {
      if (typeof n === 'string' && /^[a-z0-9_]{1,64}$/.test(n)) props.add(n)
    }
  }
  return `status=${status} codes=${codes.join(',') || '-'} props=${[...props].slice(0, 8).join(',') || '-'}`
}

export async function writeContact(
  token: string,
  method: 'POST' | 'PATCH',
  path: string,
  properties: Record<string, string>
): Promise<Response> {
  const send = (props: Record<string, string>) =>
    fetch(`${HS_API}${path}`, {
      method,
      headers: headers(token),
      body: JSON.stringify({ properties: props }),
    })

  const res = await send(properties)
  if (res.ok) return res

  const err = await res
    .clone()
    .json()
    .catch(() => ({}))
  if (!RECOVERABLE_ERRORS.test(JSON.stringify(err))) return res

  const safe = Object.fromEntries(
    Object.entries(properties).filter(([key]) => !CLASSIFICATION_PROPS.includes(key))
  )
  console.error(
    `[HubSpot] propiedad de clasificación rechazada, reintentando sin ellas: ${describeHubspotError(res.status, err)}`
  )
  return send(safe)
}

export async function upsertContact(
  token: string,
  properties: Record<string, string>
): Promise<{ id: string; isNew: boolean }> {
  const existing = await findContact(token, properties.email)

  if (existing) {
    // first-touch: lo que el contacto ya tiene (propietario, etapa, atribución) no se pisa
    const toWrite = Object.fromEntries(
      Object.entries(properties).filter(
        ([key]) => !(PRESERVE_IF_SET.includes(key) && existing.properties[key])
      )
    )
    const res = await writeContact(token, 'PATCH', `/crm/v3/objects/contacts/${existing.id}`, toWrite)
    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      throw new Error(`PATCH contact failed: ${describeHubspotError(res.status, err)}`)
    }
    return { id: existing.id, isNew: false }
  }

  const res = await writeContact(token, 'POST', '/crm/v3/objects/contacts', properties)
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(`POST contact failed: ${describeHubspotError(res.status, err)}`)
  }
  const data = await res.json()
  return { id: data.id, isNew: true }
}

// ¿El contacto ya tiene un negocio abierto con este nombre? Si la búsqueda falla se asume que no
// (es preferible un negocio repetido a perder el seguimiento).
async function hasOpenDeal(token: string, contactId: string, dealname: string): Promise<boolean> {
  try {
    const res = await fetch(`${HS_API}/crm/v3/objects/deals/search`, {
      method: 'POST',
      headers: headers(token),
      body: JSON.stringify({
        filterGroups: [
          {
            filters: [
              { propertyName: 'dealname', operator: 'EQ', value: dealname },
              { propertyName: 'associations.contact', operator: 'EQ', value: contactId },
              { propertyName: 'dealstage', operator: 'NEQ', value: 'closedwon' },
              { propertyName: 'dealstage', operator: 'NEQ', value: 'closedlost' },
            ],
          },
        ],
        limit: 1,
      }),
    })
    if (!res.ok) return false
    const data = await res.json()
    return data.total > 0
  } catch {
    return false
  }
}

export async function createDeal(
  token: string,
  contactId: string,
  deal: { dealname: string; description: string },
  dedupe = false
): Promise<void> {
  if (dedupe && (await hasOpenDeal(token, contactId, deal.dealname))) return

  const res = await fetch(`${HS_API}/crm/v3/objects/deals`, {
    method: 'POST',
    headers: headers(token),
    body: JSON.stringify({
      properties: {
        dealname: deal.dealname,
        dealstage: 'appointmentscheduled',
        pipeline: 'default',
        hubspot_owner_id: OWNER_FRANCISCO,
        closedate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        description: deal.description,
      },
    }),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(`POST deal failed: ${describeHubspotError(res.status, err)}`)
  }
  const created = await res.json()

  await fetch(`${HS_API}/crm/v3/objects/deals/${created.id}/associations/contacts/${contactId}/3`, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${token}` },
  })
}

export async function addToList(token: string, contactId: string, listId: string): Promise<void> {
  const res = await fetch(`${HS_API}/crm/v3/lists/${listId}/memberships/add`, {
    method: 'PUT',
    headers: headers(token),
    body: JSON.stringify([contactId]),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok || (data as { recordIdsMissing?: string[] }).recordIdsMissing?.length) {
    throw new Error(`addToList failed: ${describeHubspotError(res.status, data)}`)
  }
}
