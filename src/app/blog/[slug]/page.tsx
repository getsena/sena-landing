import { blogPosts } from '@/lib/data/blogPosts'
import { parseSpanishDate } from '@/lib/utils/blog'
import { SinglePostPage } from '@/ui/blog/SinglePostPage'
import { notFound } from 'next/navigation'

type Params = Promise<{ slug: string }>

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }))
}

// Los posts salen de blogPosts.ts, así que publicar uno nuevo ya exige build.
// Con dynamicParams en false, cualquier slug fuera de esa lista responde 404 de
// verdad en vez de 200 con la página de error: antes, /blog/<lo-que-sea>
// devolvía 200 y Google podía indexarlo.
export const dynamicParams = false

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params
  const post = blogPosts.find((p) => p.slug === slug)

  // Devolver {} hacía que la metadata cayera al layout raíz, que declara
  // canonical hacia la home. Cada URL inexistente del blog se declaraba
  // duplicada de la home — el mismo problema que arreglamos para los posts
  // reales. Acá se corta explícitamente.
  if (!post) {
    return {
      title: 'Página no encontrada',
      robots: { index: false, follow: false },
      alternates: { canonical: null },
    }
  }

  return {
    title: post.title,
    description: post.intro,
    alternates: { canonical: `https://www.somossena.com/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.intro,
      images: [{ url: post.image }],
      type: 'article',
      url: `https://somossena.com/blog/${post.slug}`,
    },
  }
}

export default async function Page({ params }: { params: Params }) {
  const { slug } = await params
  const post = blogPosts.find((p) => p.slug === slug)

  if (!post) return notFound()

  const url = `https://www.somossena.com/blog/${post.slug}`

  // parseSpanishDate revienta si la fecha no viene como "1 de enero 2026".
  // Un post con la fecha mal escrita no puede tumbar la página.
  let datePublished: string | undefined
  try {
    const parsed = parseSpanishDate(post.date)
    if (!Number.isNaN(parsed.getTime())) datePublished = parsed.toISOString()
  } catch {
    datePublished = undefined
  }

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${url}#article`,
    headline: post.title,
    description: post.intro,
    image: typeof post.image === 'string' ? post.image : undefined,
    ...(datePublished ? { datePublished } : {}),
    inLanguage: 'es-CL',
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    author: { '@id': 'https://www.somossena.com/#organization' },
    publisher: { '@id': 'https://www.somossena.com/#organization' },
  }

  // El bloque FAQPage es el que los motores de respuesta extraen y citan.
  const faqSchema =
    post.faq && post.faq.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          '@id': `${url}#faq`,
          mainEntity: post.faq.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: { '@type': 'Answer', text: item.answer },
          })),
        }
      : null

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}
      <SinglePostPage post={post} />
    </>
  )
}
