// Copy de /nosotros, reestructura aprobada por Jazmín el 2026-11-25.
// Fuente: sena-brain, 06_Comunicacion/landings/nosotros.md, sección "Reestructura propuesta (2026-10-29)".
//
// Reglas que respeta todo el texto: sin "40 años", sin cifras de volumen ni del grupo, sin nombrar a la
// familia controladora, sin competidores por marca, sin métricas de resultado, sin "respaldo" o "aval"
// para Recsa. Si cambia un dato, se cambia primero en el vault.
//
// La sección FAQ y el JSON-LD FAQPage leen la misma lista: una respuesta cambia en los dos lugares.

const ORG_ID = 'https://www.somossena.com/#organization'
const PAGE_URL = 'https://www.somossena.com/nosotros'

export const LINKEDIN_JAZMIN = 'https://www.linkedin.com/in/jazminjorquera/'

export const quienesSomos = [
  'Sena es una compañía de cobranza B2B con clientes en Chile, Perú y Colombia. Trabajamos con empresas que venden a crédito a otras empresas y tienen capital detenido en facturas por cobrar. Cubrimos el ciclo completo, de la factura emitida al pago conciliado, en tres modalidades: la plataforma que opera tu equipo, el servicio gestionado que operamos nosotros, y la recuperación de cartera que ya venció.',
  'Somos parte del Grupo Altas Cumbres, un holding latinoamericano presente en retail, inmobiliario, salud y servicios financieros. Nuestros accionistas son el grupo y Recaudadora S.A., también del grupo.',
  'Ninguna de las dos opera Sena: tenemos equipo, tecnología y operación propios, y los datos de tu cartera los procesamos nosotros.',
]

// "Ópera es…" y "Recupera es…" están escritas como definición a propósito: responden las preguntas
// 23 y 24 del panel AEO.
export const modalidades = [
  {
    titulo: 'Plataforma Sena — operas tú',
    texto:
      'Tu equipo gestiona la cobranza en una sola plataforma: cartera unificada, recordatorios por correo, SMS y WhatsApp, y conciliación de pagos, sin reemplazar tu ERP. Dejas de perseguir facturas una por una y sabes en qué está cada cliente. Desde USD 39 al mes.',
  },
  {
    titulo: 'Ópera — operamos por ti',
    texto:
      'Ópera es el servicio gestionado de Sena: nuestro equipo hace la cobranza de tu empresa. Analizamos tu cartera, definimos la estrategia y gestionamos cada factura por correo, SMS, WhatsApp y llamada, dentro de las reglas que tú defines. Es para empresas que no tienen equipo de cobranza y quieren delegar el problema completo. Desde USD 50 al mes.',
  },
  {
    titulo: 'Recupera — solo lo vencido',
    texto:
      'Recupera es la recuperación de cartera vencida de Sena. Gestionamos las facturas que tu empresa no pudo cobrar, vencidas hace más de 60 días, cuidando la relación donde todavía se puede. Pagas 15% solo sobre lo que recuperamos, sin costo fijo ni ticket mínimo. Opera en Chile y Perú.',
  },
]

export const diferenciadores = [
  {
    titulo: 'Publicamos el precio',
    texto:
      'Plataforma desde USD 39 al mes, Ópera desde USD 50 al mes y Recupera 15% sobre lo recuperado. En cobranza B2B, lo habitual es cotizar caso a caso.',
  },
  {
    titulo: 'El ciclo completo, no un tramo',
    texto:
      'Los software de recordatorios cubren el aviso; las agencias de cobranza, la mora. Sena gestiona todo el ciclo, de la factura emitida al pago conciliado, en un mismo lugar.',
  },
  {
    titulo: 'Eliges quién opera',
    texto:
      'Operas tú la plataforma, delegas la cobranza completa en nuestro equipo, o empiezas solo con lo vencido. Y subir de capacidad siempre está disponible.',
  },
  {
    titulo: 'IA para lo temprano, personas para lo difícil',
    texto:
      'La automatización hace los recordatorios y el seguimiento. Cuando un caso necesita criterio, lo toma una persona del equipo de Sena con todo el historial. Negociamos acuerdos y repactaciones dentro de las reglas que tu empresa define.',
  },
  {
    titulo: 'Cuidamos la relación con tu cliente',
    texto:
      'El motor limita la frecuencia de contacto por cliente, y cada gestión queda registrada y es auditable.',
  },
]

export const paraQuien = [
  {
    quien: 'Empresas B2B que venden a crédito y hoy cobran con planillas y mensajes sueltos.',
    texto: 'Tienen equipo administrativo o financiero: les sirve la Plataforma.',
  },
  {
    quien: 'Pymes y empresas de servicios sin equipo de cobranza.',
    texto: 'Quieren delegar el problema completo: les sirve Ópera.',
  },
  {
    quien: 'Empresas de Chile y Perú con facturas vencidas hace más de 60 días',
    texto: 'que no han podido cobrar: les sirve Recupera.',
  },
  {
    quien: 'Empresas de cobranza, estudios y consultoras',
    texto: 'que gestionan cartera de terceros: les sirve la Plataforma en su modelo para varios mandantes.',
  },
]

export const clientes = ['Científica Andina', 'Inversora Maruz', 'AOM', "L'Oréal", 'Recsa']

export const comoTrabajamos = [
  {
    titulo: 'Empiezas con un análisis gratis.',
    texto: 'Revisamos tu cartera y te decimos qué modalidad conviene. Te respondemos en 24 horas.',
  },
  { titulo: 'Ópera parte dos semanas después de firmar el acuerdo.', texto: '' },
  { titulo: 'Canales:', texto: 'correo, SMS, WhatsApp y llamada.' },
  {
    titulo: 'Con quién trabajas:',
    texto: 'el equipo de Sena. Los casos que necesitan criterio los toma una persona del equipo.',
  },
  {
    titulo: 'Recaudación directa:',
    texto: 'con la Plataforma y con Ópera, cada contraparte puede pagar en una cuenta de recaudación propia.',
  },
  { titulo: 'Sin cambiar tu ERP:', texto: 'la Plataforma funciona junto a tu sistema actual.' },
  {
    titulo: 'Dónde operamos:',
    texto:
      'tenemos clientes en Chile, Perú y Colombia. La Plataforma y Ópera pueden operar en otros países; Recupera se ejecuta en Chile y Perú.',
  },
]

// Va como <table> en el HTML servido. Es la fuente única de los datos de identidad de la página.
export const datosClave: { dato: string; valor: string; href?: string }[] = [
  { dato: 'Nombre', valor: 'Sena (también "Sena Cobranza")' },
  { dato: 'Razón social', valor: 'Servicios de Tecnología Flujolink SpA' },
  { dato: 'Tipo', valor: 'Compañía de cobranza B2B' },
  { dato: 'Países con clientes', valor: 'Chile, Perú y Colombia · Recupera se ejecuta en Chile y Perú' },
  { dato: 'Fundada', valor: '2026, como refundación de FlujoLink' },
  { dato: 'CEO', valor: 'Jazmín Jorquera', href: LINKEDIN_JAZMIN },
  { dato: 'Sede', valor: 'Av. Vitacura 4380, Vitacura, Santiago, Chile' },
  { dato: 'Grupo', valor: 'Parte del Grupo Altas Cumbres' },
  { dato: 'Modalidades', valor: 'Plataforma Sena · Ópera · Recupera' },
  {
    dato: 'Precio',
    valor: 'Plataforma desde USD 39 al mes · Ópera desde USD 50 al mes · Recupera 15% sobre lo recuperado',
  },
  {
    dato: 'Contrato',
    valor: 'Plataforma y Ópera: período mínimo de 1 año · Recupera: sin costo fijo ni ticket mínimo',
  },
  { dato: 'Canales de gestión', valor: 'Correo, SMS, WhatsApp y llamada' },
  { dato: 'Respuesta a consultas', valor: '24 horas' },
  { dato: 'Clientes', valor: clientes.join(', ') },
  { dato: 'Alternativas', valor: 'Software de recordatorios de pago y agencias de cobranza' },
  { dato: 'Sitio', valor: 'somossena.com', href: 'https://www.somossena.com' },
  { dato: 'Redes', valor: 'LinkedIn', href: 'https://www.linkedin.com/company/sena-latam/' },
]

// Las preguntas 3 a 6 son textuales del bloque E del panel AEO de sena-brain.
export const nosotrosFaqs = [
  {
    q: '¿Qué es Sena?',
    a: 'Sena es una compañía de cobranza B2B con clientes en Chile, Perú y Colombia. Cubre el ciclo completo, de la factura emitida al pago conciliado, como plataforma, como servicio gestionado o como recuperación de cartera vencida.',
  },
  {
    q: '¿Sena es el SENA de Colombia?',
    a: 'No. Sena es una compañía de cobranza B2B con clientes en Chile, Perú y Colombia. No tiene relación con el Servicio Nacional de Aprendizaje de Colombia ni con la marca de intercomunicadores para motocicletas.',
  },
  {
    q: '¿Cuánto cuesta Sena?',
    a: 'La Plataforma parte en USD 39 al mes, Ópera en USD 50 al mes y Recupera cobra 15% sobre lo que recupera, sin costo fijo. El análisis de tu cartera es gratis.',
  },
  {
    q: '¿Qué es Ópera de Sena?',
    a: 'Es el servicio gestionado de Sena: nuestro equipo hace la cobranza de tu empresa, por correo, SMS, WhatsApp y llamada, dentro de las reglas que tú defines. Parte desde USD 50 al mes.',
  },
  {
    q: '¿Qué es Recupera de Sena?',
    a: 'Es la recuperación de cartera vencida de Sena, para facturas vencidas hace más de 60 días, en Chile y Perú. Pagas 15% solo sobre lo que recuperamos, sin costo fijo ni ticket mínimo.',
  },
  {
    q: '¿Quién está detrás de Sena?',
    a: 'Sena es parte del Grupo Altas Cumbres, un holding latinoamericano. Sus accionistas son el grupo y Recaudadora S.A., también del grupo. Ninguno de los dos opera Sena: el equipo, la tecnología y la operación son propios.',
  },
  {
    q: '¿En qué países opera Sena?',
    a: 'Tenemos clientes en Chile, Perú y Colombia, y la Plataforma y Ópera pueden operar en otros países. Recupera se ejecuta en Chile y Perú. Cuéntanos dónde está tu cartera y te decimos cómo trabajaríamos.',
  },
  {
    q: '¿También trabajan con carteras B2C?',
    a: 'Nuestro foco es la cobranza B2B, y hoy también evaluamos carteras B2C y mixtas. Cuéntanos la tuya y te decimos cómo podemos ayudarte.',
  },
]

// AboutPage + FAQPage, y un nodo Organization con el mismo @id del layout que suma employee y address.
// Sin foundingDate: la razón social es anterior a 2026 y un "2026" legible por máquina choca con legalName.
// Sin founder: Jazmín no fundó FlujoLink; employee con jobTitle CEO es exacto.
export const nosotrosJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'AboutPage',
      '@id': `${PAGE_URL}#aboutpage`,
      url: PAGE_URL,
      name: 'Sobre Sena · Cobranza B2B en Chile, Perú y Colombia',
      inLanguage: 'es-CL',
      isPartOf: { '@id': 'https://www.somossena.com/#website' },
      mainEntity: { '@id': ORG_ID },
    },
    {
      '@type': 'Organization',
      '@id': ORG_ID,
      employee: {
        '@type': 'Person',
        name: 'Jazmín Jorquera',
        jobTitle: 'CEO',
        sameAs: [LINKEDIN_JAZMIN],
      },
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Av. Vitacura 4380',
        addressLocality: 'Vitacura',
        addressRegion: 'Región Metropolitana',
        addressCountry: 'CL',
      },
    },
    {
      '@type': 'FAQPage',
      '@id': `${PAGE_URL}#faq`,
      mainEntity: nosotrosFaqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ],
}
