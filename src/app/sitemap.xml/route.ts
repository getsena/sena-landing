import { blogPosts } from '@/lib/data/blogPosts'
import { SITE_URL } from '@/lib/seo/site'
import { parseSpanishDate } from '@/lib/utils/blog'
import { NextResponse } from 'next/server'

export async function GET() {
  // El apex redirige 308 a www, que es el host de todos los canonical: listar el apex acá
  // entregaba un sitemap entero de URLs que redirigen.
  const baseUrl = SITE_URL

  const pages = [
    { path: '', priority: '1.0' },
    { path: 'plataforma', priority: '0.9' },
    { path: 'recupera', priority: '0.9' },
    { path: 'opera', priority: '0.9' },
    { path: 'term', priority: '0.8' },
    { path: 'privacy', priority: '0.8' },
    { path: 'nosotros', priority: '0.8' },
    { path: 'contactanos', priority: '0.8' },
    { path: 'blog', priority: '0.8' },
    { path: 'industrias/servicios-basicos', priority: '0.7' },
    { path: 'industrias/tech-beauty', priority: '0.7' },
    { path: 'industrias/intercompany', priority: '0.7' },
    { path: 'industrias/telco', priority: '0.7' },
    { path: 'industrias/maquinarias', priority: '0.7' },
    { path: 'industrias/autopistas', priority: '0.7' },
    { path: 'industrias/inmobiliarias', priority: '0.7' },
    { path: 'industrias/family-office', priority: '0.7' },
  ]

  const urlsXml = pages
    .map(
      ({ path, priority }) => `
      <url>
        <loc>${baseUrl}${path ? `/${path}` : ''}</loc>
        <changefreq>monthly</changefreq>
        <priority>${priority}</priority>
      </url>
    `
    )
    .join('')

  // Las entradas del blog se declaran desde la misma fuente que las renderiza,
  // para que publicar un post lo deje en el sitemap sin tocar este archivo.
  const blogUrlsXml = blogPosts
    .map((post) => {
      // parseSpanishDate revienta si la fecha no viene como "1 de enero 2026".
      // El sitemap no puede caerse por un post con la fecha mal escrita.
      let lastmod: string | null = null
      try {
        const parsed = parseSpanishDate(post.date)
        if (!Number.isNaN(parsed.getTime())) lastmod = parsed.toISOString().split('T')[0]
      } catch {
        lastmod = null
      }

      return `
      <url>
        <loc>${baseUrl}/blog/${post.slug}</loc>${
          lastmod
            ? `
        <lastmod>${lastmod}</lastmod>`
            : ''
        }
        <changefreq>monthly</changefreq>
        <priority>0.6</priority>
      </url>
    `
    })
    .join('')

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlsXml}${blogUrlsXml}
</urlset>`

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}
