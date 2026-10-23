import { AREA_SERVED, ORGANIZATION_ID, SITE_URL } from '@/lib/seo/site'

// Las ocho páginas de /industrias/* tenían metadata y canonical pero ningún structured data:
// son las páginas de long tail por industria y no declaraban nada citable. Esto arma el Service
// de cada una colgando del Organization del layout raíz por @id.
//
// No emite FAQPage a propósito: ninguna de estas páginas renderiza preguntas visibles, y marcar
// un Q&A que no está en la página es motivo de acción manual de Google.
type IndustriaSchemaInput = {
  /** Segmento de la URL, sin /industrias. */
  slug: string
  /** Nombre del servicio tal como se ofrece a esa industria. */
  name: string
  /** La misma descripción que declara la metadata de la página. */
  description: string
  /** A quién atiende, en los términos en que la industria se nombra a sí misma. */
  audience: string
}

export const buildIndustriaSchema = ({
  slug,
  name,
  description,
  audience,
}: IndustriaSchemaInput): Record<string, unknown> => {
  const url = `${SITE_URL}/industrias/${slug}`

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${url}#service`,
    name,
    description,
    url,
    serviceType: 'Cobranza B2B',
    inLanguage: 'es',
    provider: { '@id': ORGANIZATION_ID },
    areaServed: AREA_SERVED.map((country) => ({ '@type': 'Country', name: country })),
    audience: { '@type': 'BusinessAudience', name: audience },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
  }
}
