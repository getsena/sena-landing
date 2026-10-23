import { SITE_URL } from '@/lib/seo/site'
import { NextResponse } from 'next/server'

export async function GET() {
  // El Sitemap: apuntaba al apex, que responde 308. Mismo host que el canonical de las páginas.
  const content = `
User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
  `.trim()

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain',
    },
  })
}
