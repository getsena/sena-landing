import { NextResponse } from 'next/server'

export const runtime = 'edge'

// País del visitante según Vercel, sin llamadas externas. Fuera de Vercel el header no existe y devuelve null.
export function GET(request: Request) {
  const header = request.headers.get('x-vercel-ip-country')
  const country = header && /^[A-Z]{2}$/.test(header) ? header : null
  return NextResponse.json({ country }, { headers: { 'Cache-Control': 'private, no-store' } })
}
