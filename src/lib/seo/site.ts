// El host canónico es www: el apex responde 308 hacia acá, y así lo declara el canonical de
// cada página. El sitemap venía listando el apex, o sea ofrecía a los crawlers 18+ URLs que
// redirigen y que la propia página desautoriza. El host vive acá para que sitemap y canonical
// no se vuelvan a separar. Verificado el 2026-10-22.
export const SITE_URL = 'https://www.somossena.com'

// Los @id con los que el layout raíz publica la organización y el sitio. Cualquier schema de
// otra página los referencia en vez de repetir el nodo: así el motor arma un grafo y no varias
// organizaciones sueltas que se llaman igual.
export const ORGANIZATION_ID = `${SITE_URL}/#organization`

// Mismos países que declara el Organization del layout raíz.
export const AREA_SERVED = ['Chile', 'Perú', 'Colombia'] as const
