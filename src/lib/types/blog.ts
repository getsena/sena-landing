export type TextFragment =
  | { type: 'text'; text: string }
  | { type: 'bold'; text: string }
  | { type: 'link'; text: string; href: string }

export type ListItem = string | TextFragment[]

export type BlogContentBlock =
  | { type: 'title'; text: string }
  | { type: 'subtitle'; text: string }
  | { type: 'paragraph'; fragments: TextFragment[] }
  | { type: 'quote'; text: string }
  | { type: 'list'; items: ListItem[] }
  | { type: 'image'; link: string }

export interface BlogFaqItem {
  question: string
  answer: string
}

/**
 * Para cuál de los cinco ICP de Sena está escrito el post.
 *
 * Los cinco son **acreedores**: quien cobra su propia cartera, o quien cobra la
 * de sus mandantes. No hay valor para el deudor ni para el consumidor final, y
 * esa ausencia es el punto — dos posts salieron escritos para el deudor y hubo
 * que reorientarlos ya publicados (`5f48a5f`).
 *
 * La ficha completa de cada perfil vive en sena-brain
 * (`03_Clientes/ICP_principal.md`). Acá van solo las etiquetas: este repo es
 * público.
 */
export type LectorPost =
  /** PYME en expansión que gestiona su propia cartera */
  | 'pyme-que-cobra'
  /** micro empresa: el founder vende y entrega, nadie dedicado a cobrar */
  | 'micro-empresa-sin-equipo'
  /** distribuidora con fuerza de venta: la cobranza está repartida y sin dueño */
  | 'distribuidora-con-fuerza-de-venta'
  /** corporativo con ERP global, Sena como capa complementaria */
  | 'enterprise-con-erp'
  /** empresa de cobranza que cobra la cartera de sus mandantes (B2B2B) */
  | 'empresa-de-cobranza'

export interface BlogPost {
  id: number
  slug: string
  title: string
  intro: string
  date: string
  // author: string;
  tags: string[]
  image: string
  /**
   * Lector del post. Opcional en el tipo porque los 24 posts históricos no lo
   * declaran, pero `npm run blog:gate` lo exige en todo post que la rama toque.
   */
  lector?: LectorPost
  /**
   * Lo que impide publicar este post. Un post con `bloqueos` no vacío no pasa la
   * puerta.
   *
   * Existe porque el aviso ya se escribía y no detenía nada: las dos veces que
   * una imagen no correspondía al post, quedó anotada como "PENDIENTE" en el
   * cuerpo del commit y se mergeó igual (`1d52578`, `d3b7e5b`). Acá el aviso
   * vive en el dato, se borra cuando se resuelve, y mientras esté, falla.
   */
  bloqueos?: string[]
  /**
   * Preguntas frecuentes del post. Fuente única: de acá salen tanto el bloque
   * visible al final del artículo como el JSON-LD `FAQPage` que permite que los
   * motores de respuesta extraigan y citen las respuestas. No duplicar en `content`.
   */
  faq?: BlogFaqItem[]
  content: BlogContentBlock[]
}
