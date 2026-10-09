import { BlogPost } from '../types/blog'
import { AssetImageBlog } from '../utils/assets/imageBlog'
import { parseSpanishDate, slug } from '../utils/blog'

export const featuredPostId = 33

export const blogPosts: BlogPost[] = [
  // {
  //   id: 4,
  //   slug: slug(
  //     "omnicanalidad e inteligencia artificial para optimizar tu cobranza",
  //   ),
  //   title:
  //     "Cómo Sena combina omnicanalidad e inteligencia artificial para optimizar tu cobranza",
  //   intro:
  //     "Gestionar cuentas por cobrar no tiene por qué ser una tarea lenta ni desgastante. Con Sena, las empresas pueden reducir la morosidad y mejorar su flujo de caja usando herramientas que combinan automatización, contacto inteligente y tecnología de vanguardia. ",
  //   date: "20 de marzo 2025",
  //   tags: ["Sena", "IA"],
  //   image:
  //     "https://lh7-rt.googleusercontent.com/docsz/AD_4nXcp5aWPPhubM2pDplaKNFiNYuvmmg9kzjXOSUp7OsvqX577TfFJPQ9K7U-Q4iQVjtm2bS6csBdUAJJOhrD4fO7KUeUEL5TZC9klvgQ5_kQQE9uzqYHNPj2CgzsvINDGQeW_bzzEWQ?key=Z63nbao0Z_MUHrbOnmsjiw",
  //   content: [
  //     {
  //       type: "paragraph",
  //       fragments: [
  //         {
  //           type: "text",
  //           text: "Gestionar cuentas por cobrar no tiene por qué ser una tarea lenta ni desgastante. Con Sena, las empresas pueden reducir la morosidad y mejorar su flujo de caja usando herramientas que combinan automatización, contacto inteligente y tecnología de vanguardia.",
  //         },
  //       ],
  //     },
  //     {
  //       type: "paragraph",
  //       fragments: [
  //         {
  //           type: "text",
  //           text: "No se trata solo de enviar recordatorios. Se trata de hacerlo bien. ",
  //         },
  //       ],
  //     },
  //     { type: "title", text: "¿Qué hace diferente a Sena? " },
  //     {
  //       type: "paragraph",
  //       fragments: [
  //         {
  //           type: "text",
  //           text: "Sena es mucho más que un ",
  //         },
  //         {
  //           type: "bold",
  //           text: "software contable. ",
  //         },
  //         {
  //           type: "text",
  //           text: "Es un ",
  //         },
  //         {
  //           type: "link",
  //           text: "software para empresas ",
  //           href: "",
  //         },
  //         {
  //           type: "text",
  //           text: "que conecta tus sistemas de facturación, tus canales de comunicación y tus equipos de finanzas en un solo lugar. Todo, sin fricciones. ",
  //         },
  //       ],
  //     },
  //     {
  //       type: "paragraph",
  //       fragments: [
  //         {
  //           type: "text",
  //           text: "Gracias a su enfoque omnicanal, puedes contactar a tus clientes vía correo, WhatsApp, SMS o incluso desde un ",
  //         },
  //         {
  //           type: "bold",
  //           text: "CRM ",
  //         },
  //         {
  //           type: "text",
  //           text: "integrado, dependiendo de cómo prefieran comunicarse. Así, los recordatorios de pago dejan de ser correos perdidos y se convierten en conversaciones reales. ",
  //         },
  //       ],
  //     },
  //     {
  //       type: "title",
  //       text: "IA aplicada a la cobranza (sin complicarte la vida) ",
  //     },
  //     {
  //       type: "paragraph",
  //       fragments: [
  //         {
  //           type: "text",
  //           text: "Sena utiliza ",
  //         },
  //         {
  //           type: "bold",
  //           text: " inteligencia artificial ",
  //         },
  //         {
  //           type: "text",
  //           text: "para analizar patrones de pago y ayudarte a definir el mejor tipo de contacto para cada cliente. No necesitas ser técnico: solo verás sugerencias claras que aumentan la probabilidad de cobro sin afectar la relación comercial. ",
  //         },
  //       ],
  //     },
  //     {
  //       type: "quote",
  //       text: "“Muchas veces el problema no es el cliente, sino el canal. Sena adapta el mensaje y la vía según el comportamiento de cada pagador", explica Sebastián Gajardo, Product Manager de Sena.",
  //     },
  //     { type: "title", text: "Integración real con tu operación " },
  //     {
  //       type: "paragraph",
  //       fragments: [
  //         {
  //           type: "text",
  //           text: "¿Ya usas un ERP o un sistema de facturación? No hay problema. Sena se conecta fácilmente con tus herramientas actuales, transformándose en un software de gestión que potencia tus procesos sin exigir que cambies lo que ya funciona. ",
  //         },
  //       ],
  //     },
  //     {
  //       type: "paragraph",
  //       fragments: [
  //         {
  //           type: "bold",
  //           text: "¿El resultado? Menos correos sin respuesta, más pagos realizados y un equipo financiero con más tiempo para lo importante. ",
  //         },
  //       ],
  //     },
  //   ],
  // },
  {
    id: 5,
    slug: slug('cuanto le cuesta a tu equipo cobrar de forma manual'),
    title: '¿Cuánto le cuesta a tu equipo cobrar de forma manual?',
    intro:
      'El costo de una cobranza desordenada no aparece en el estado de resultados. Aparece en el tiempo que tu equipo pierde, en los errores que se acumulan y en las oportunidades que se dejan ir. Ese costo es real, aunque nadie lo esté midiendo.',
    date: '02 de diciembre 2025',
    tags: ['Cobranza', 'Educación Financiera'],
    image: AssetImageBlog.blog_5_main.src,
    content: [
      {
        type: 'title',
        text: '¿Cuánto le cuesta a tu equipo cobrar de forma manual?',
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Hay un costo que pocas empresas calculan: el tiempo que su equipo dedica a gestionar cobranza de forma manual. Revisar planillas, redactar correos uno por uno, hacer llamadas sin registro, cruzar información entre WhatsApp y Excel. Cada hora invertida en eso es una hora que no se destinó a vender, a retener clientes o a mejorar la operación.',
          },
        ],
      },
      { type: 'subtitle', text: 'El problema no es la persona. Es el sistema.' },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Cuando la cobranza depende de la memoria de alguien, los errores son inevitables. Se olvidan facturas, se mandan recordatorios a destiempo, se pierde el historial de conversaciones. Y cuando el equipo crece, el caos escala con él. No porque las personas fallen, sino porque un proceso manual no escala.',
          },
        ],
      },
      { type: 'subtitle', text: 'Lo que se puede automatizar' },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'La mayoría de las tareas operativas de cobranza son repetibles y predecibles: recordatorios antes del vencimiento, seguimientos a los 3, 7 y 15 días, notificaciones por WhatsApp o email según el comportamiento del cliente. Todo eso puede ejecutarse automáticamente, con el tono correcto y en el momento adecuado, sin que nadie del equipo tenga que intervenir.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Cuando la tecnología se encarga de lo rutinario, tu equipo puede enfocarse en lo que realmente requiere criterio humano: negociar acuerdos, gestionar casos complejos, cuidar las relaciones estratégicas.',
          },
        ],
      },
      { type: 'subtitle', text: 'El costo de no automatizar' },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Cada mes que pasa con un proceso manual es un mes con más facturas rezagadas, más horas perdidas y más estrés acumulado en el equipo financiero. La cobranza no resuelta no desaparece sola: crece.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: '¿Quieres saber cuánto tiempo está perdiendo tu equipo en cobranza manual? ',
          },
          {
            type: 'link',
            text: 'Agenda una demo y lo revisamos juntos.',
            href: 'https://meetings.hubspot.com/francisco502',
          },
        ],
      },
    ],
  },
  {
    id: 6,
    slug: slug('Factura vencida que nadie paga que puedes hacer'),
    title: 'Factura vencida que nadie paga: qué puedes hacer',
    intro:
      'Cumpliste. Entregaste el servicio, emitiste la factura y esperaste. Pero el pago no llegó. En algún momento dejaste de esperar y empezaste a perseguir. Eso tiene un nombre: cartera vencida. Y tiene solución.',
    date: '05 de diciembre 2025',
    tags: ['Cobranza', 'Sena'],
    image: AssetImageBlog.blog_6_main.src,
    content: [
      {
        type: 'title',
        text: 'Factura vencida que nadie paga: qué puedes hacer',
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Cumpliste. Entregaste el servicio, emitiste la factura y esperaste. Pero el pago no llegó. En algún momento dejaste de esperar y empezaste a perseguir -- llamadas sin respuesta, correos ignorados, promesas que no se cumplen. Eso tiene un nombre: ',
          },
          { type: 'bold', text: 'cartera vencida.' },
          { type: 'text', text: ' Y tiene solución.' },
        ],
      },
      { type: 'subtitle', text: 'No es factoring. Es recuperación.' },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Cuando una factura lleva más de 60 días vencida, el camino habitual es el factoring: cedes tu documento, recibes un porcentaje adelantado y pierdes parte de lo que te deben. En Sena hacemos algo distinto. No compramos tu factura ni te damos un préstamo. ',
          },
          {
            type: 'bold',
            text: 'Recuperamos el pago directamente con tu cliente, a través de gestión profesional, y solo cobramos si logramos que te paguen.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Tu factura sigue siendo tuya. No cedes derechos. No comprometes la relación comercial. No pagas por adelantado.',
          },
        ],
      },
      { type: 'subtitle', text: '¿Cómo funciona Recupera?' },
      {
        type: 'list',
        items: [
          'Nos cuentas cuáles son las facturas vencidas y los montos.',
          'Evaluamos tu cartera sin costo.',
          'Activamos la gestión: contacto profesional con tu cliente por los canales adecuados.',
          'Seguimiento hasta el acuerdo de pago.',
          'Cuando el pago se concreta, recibes lo que te corresponde.',
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'El proceso está respaldado por el equipo humano de Sena. Saben cómo hablar con quien no paga -- sin romper la relación comercial.',
          },
        ],
      },
      {
        type: 'image',
        link: 'https://lh7-rt.googleusercontent.com/docsz/AD_4nXc709NrLvnJSDVR39oh82sue9wENpR1rmX7GPnZd4ULBZmUfoYMoD_5z6SzytDkudGGwiYSImsHcDYyy3CY-6ZWrMnmOS2E9l_ipBTpucny4KskH_U-l_IjsEdt47KDeKmAvfC1PwD50BEhbxR_mVU?key=zNxDjqMGOyLpRYie3ixLSQ',
      },
      { type: 'subtitle', text: 'Sin riesgo de tu parte' },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Si no recuperamos, no pagas nada. Sin letras pequeñas. Sin sorpresas. Ese es el modelo de Recupera: alineamos nuestros incentivos con los tuyos.',
          },
        ],
      },
      {
        type: 'quote',
        text: `”Tu cartera vencida no está perdida. Solo necesita el proceso correcto.”`,
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: '¿Tienes facturas vencidas que no has podido cobrar? ',
          },
          {
            type: 'link',
            text: 'Cuéntanos qué está pasando en tu cartera.',
            href: 'https://meetings.hubspot.com/francisco502',
          },
        ],
      },
      { type: 'image', link: AssetImageBlog.blog_6_3.src },
    ],
  },
  {
    id: 7,
    slug: slug('vender a credito sin politica de cobranza es un riesgo financiero'),
    title: 'Vender a crédito sin política de cobranza es un riesgo financiero',
    intro:
      'Extender crédito a un cliente es una decisión comercial. No cobrar a tiempo es una consecuencia financiera. El problema es que muchas empresas diseñan bien la primera parte y no tienen nada estructurado para la segunda.',
    date: '09 de diciembre 2025',
    tags: ['Sena', 'Cobranza', 'Educación Financiera'],
    image: AssetImageBlog.blog_7_main.src,
    content: [
      {
        type: 'title',
        text: 'Vender a crédito sin política de cobranza es un riesgo financiero',
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Cuando una empresa decide vender a crédito, asume un riesgo: que el dinero no llegue cuando debería. Ese riesgo se puede gestionar. El problema es que la mayoría de las empresas tiene una política de crédito -- aunque sea informal -- pero no tiene una política de cobranza. Y ahí es donde empieza el problema.',
          },
        ],
      },
      { type: 'subtitle', text: 'El ciclo que nadie cierra' },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'El ciclo de una venta B2B tiene dos mitades: la primera termina cuando el cliente firma o acepta. La segunda termina cuando el dinero entra a tu cuenta. Muchas empresas invierten todo su esfuerzo en la primera mitad -- propuestas, negociaciones, contratos -- y dejan la segunda al azar: un recordatorio cuando alguien se acuerda, un correo cuando la factura ya lleva 45 días vencida.',
          },
        ],
      },
      { type: 'subtitle', text: 'Qué debería tener una política de cobranza' },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'No se necesita un manual extenso. Se necesita tener claro, al menos, tres cosas: cuándo se envía el primer recordatorio (antes del vencimiento, no después), por qué canal se contacta a cada tipo de cliente, y qué pasa si no hay respuesta a los 15, 30 o 60 días. Eso solo, aplicado con consistencia, cambia completamente el resultado.',
          },
        ],
      },
      {
        type: 'image',
        link: 'https://lh7-rt.googleusercontent.com/docsz/AD_4nXfSdjWiLw2HnwccLjaJ1-Ps3SonCHVFWLzXB-zCo1U2T04NSBJ_B_hSC6Hsu4fMezwTDyCfmLyDHblGvW64ll-OEwviwNmWsyoympvetH8pj0WsdD3drd814206dNNn8_o8O_Zp42usY4MsCSUKTjI?key=vXGcwwMqEuun1PDHDhkzYg',
      },
      { type: 'subtitle', text: 'Cuando la cartera ya está vencida' },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Si la política no existió desde el principio, la deuda se acumula. En ese punto, el equipo interno rara vez tiene el tiempo, el proceso o la experiencia para recuperarla sin poner en riesgo la relación comercial. Ahí es donde entra Recupera: gestión especializada de deuda activa, con el respaldo del equipo humano de Sena.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'En Sena ayudamos a cerrar el ciclo completo: desde automatizar la cobranza preventiva hasta recuperar lo que ya está vencido. ',
          },
          {
            type: 'link',
            text: 'Conversemos sobre tu cartera.',
            href: 'https://meetings.hubspot.com/francisco502',
          },
        ],
      },
    ],
  },
  {
    id: 11,
    slug: slug('Por que nacio Sena el arte de cobrar bien'),
    title: 'Por qué nació Sena: el arte de cobrar bien',
    intro:
      'La cobranza existe porque el dinero no siempre llega cuando debería. Mecanismos de pago ineficientes, ventas a crédito sin seguimiento, contrapartes que no priorizan pagar. Todo eso acumula deuda en la calle y presión en tu caja. Sena nació para cambiar eso.',
    date: '12 de diciembre 2025',
    tags: ['Sena', 'Blog'],
    image: AssetImageBlog.blog_11_main.src,
    content: [
      {
        type: 'title',
        text: 'Por qué nació Sena: el arte de cobrar bien',
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'La cobranza existe porque el dinero no siempre llega cuando debería. Mecanismos de pago ineficientes, ventas a crédito sin seguimiento, contrapartes que simplemente no priorizan pagar. Todo eso acumula deuda en la calle y presión en tu caja.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Y no es un problema nuevo. En el mundo de los negocios, la deuda que no se gestiona mata empresas. Pero hacerlo mal también. Una cobranza hostil o ineficiente puede costarte el cliente que más trabajo te costó conseguir.',
          },
        ],
      },
      { type: 'subtitle', text: 'El problema que queríamos resolver' },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Sena nació de cientos de conversaciones con empresas B2B que enfrentaban el mismo problema: ya habían vendido, habían entregado el servicio, y aún así estaban esperando el pago. Sin visibilidad de su cartera. Sin proceso. Sin tiempo para perseguir a cada cliente.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'El resultado era siempre el mismo: estrés financiero, relaciones comerciales tensas y equipos perdiendo horas en tareas que no deberían depender de la memoria de nadie.',
          },
        ],
      },
      { type: 'subtitle', text: 'Cobrar también es una forma de cuidar' },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Nuestra filosofía es simple: cobrar bien no es ser agresivo. Es tener un proceso profesional que transmite orden y respeto -- tanto para quien cobra como para quien paga. No se trata solo de lograr que las facturas entren a una cuenta bancaria. Se trata de que tu negocio siga creciendo, con tu flujo de caja ordenado y tus relaciones comerciales intactas.',
          },
        ],
      },
      {
        type: 'quote',
        text: `”Cobrar también es una forma de cuidar: cuidar el pago, la relación y al cliente.”`,
      },
      { type: 'subtitle', text: 'Tecnología y experiencia humana, juntas' },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Sena combina una plataforma de automatización multicanal -- WhatsApp, email, SMS -- con el respaldo del equipo humano de Sena. Cuando la tecnología no es suficiente, entra el criterio humano.',
          },
        ],
      },
      {
        type: 'image',
        link: AssetImageBlog.blog_11_main.src,
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Seguimos construyendo junto a las empresas que usan Sena todos los días. Porque creemos que ninguna empresa debería perder dinero -- ni relaciones -- por falta de proceso.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'link',
            text: '¿Quieres ver cómo funciona Sena en tu operación? Agenda una demo aquí.',
            href: 'https://meetings.hubspot.com/francisco502',
          },
        ],
      },
    ],
  },
  {
    id: 13,
    slug: slug('retrasos en pagos: el drama silencioso que asfixia a las pymes peruanas'),
    title: 'Retrasos en pagos: el drama silencioso que asfixia a las pymes peruanas',
    intro:
      'Las pequeñas y medianas empresas (pymes) conforman más del 99% del tejido empresarial del Perú. Sin embargo, siguen siendo las principales víctimas de un problema crónico que rara vez se discute abiertamente: los retrasos en pagos.',
    date: '16 de diciembre 2025',
    tags: ['Prensa'],
    image: AssetImageBlog.blog_13_main.src,
    content: [
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Las pequeñas y medianas empresas (pymes) conforman más del 99% del tejido empresarial del Perú. Sin embargo, siguen siendo las principales víctimas de un problema crónico que rara vez se discute abiertamente:  ',
          },
          {
            type: 'bold',
            text: 'los retrasos en pagos.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'En sectores como construcción y comercio, la ',
          },
          {
            type: 'bold',
            text: 'morosidad supera el 13% y 8% respectivamente',
          },
          {
            type: 'text',
            text: 'según datos del Instituto de Economía y Desarrollo Empresarial (IEDEP) de la Cámara de Comercio de Lima. Pero más allá de las cifras, se esconde una realidad angustiante para miles de emprendedores que operan con liquidez limitada, alta incertidumbre y pagos vencidos que nunca llegan a tiempo.',
          },
        ],
      },
      {
        type: 'subtitle',
        text: '”Cobrar” no debería ser un tabú',
      },
      {
        type: 'quote',
        text: `”Aunque legalmente el plazo de pago es de 30 días, muchas pymes reciben su dinero después de 60, 90 o incluso 120 días. Esto se da especialmente en sectores como construcción, donde el retraso ya es una norma no escrita. Las pequeñas empresas temen perder contratos si exigen sus pagos a tiempo. En Perú, hablar de cobranzas aún es visto como algo negativo”, comenta Juan Córdova, Subgerente de Venta B2B en Sena, en entrevista para PQS.pe.`,
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Este desequilibrio entre grandes clientes y proveedores más pequeños genera consecuencias devastadoras: ',
          },
          {
            type: 'bold',
            text: 'más de 100,000 pymes cierran cada año en Perú',
          },
          {
            type: 'text',
            text: ', y hasta el 40% de estos cierres están vinculados a problemas de flujo de caja.',
          },
        ],
      },
      {
        type: 'image',
        link: AssetImageBlog.blog_13_main.src,
      },
      {
        type: 'subtitle',
        text: '¿Cómo cambiar esta realidad?',
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Desde Sena, promovemos una nueva visión de la cobranza: ',
          },
          {
            type: 'bold',
            text: 'cobrar bien, a tiempo y sin conflicto',
          },
          {
            type: 'text',
            text: '. Para ello, es fundamental:',
          },
        ],
      },
      {
        type: 'list',
        items: [
          [
            {
              type: 'bold',
              text: 'Profesionalizar los procesos de cobro',
            },
          ],
          [
            {
              type: 'bold',
              text: 'Utilizar herramientas tecnológicas',
            },
            {
              type: 'text',
              text: ' que automaticen y gestionen la cobranza sin fricciones',
            },
          ],
          [
            {
              type: 'bold',
              text: 'Cambiar la mentalidad del emprendedor',
            },
            {
              type: 'text',
              text: ': exigir el cumplimiento de pago no es agresivo, es saludable para el negocio',
            },
          ],
        ],
      },
      {
        type: 'quote',
        text: `"Nuestra misión es romper el círculo vicioso que atrapa a las pymes y convertir la cobranza en una palanca de crecimiento, no en un obstáculo", añade Córdova.`,
      },
      {
        type: 'subtitle',
        text: '¿Y el marco legal?',
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Aunque existen mecanismos como la cobranza judicial o coactiva, estos son procesos costosos, lentos y poco accesibles para una pyme. La tan mencionada ',
          },
          {
            type: 'bold',
            text: 'Ley de Pronto Pago',
          },
          {
            type: 'text',
            text: ', similar a la implementada en Chile, aún sigue en discusión en Perú sin avances concretos.',
          },
        ],
      },
      {
        type: 'quote',
        text: `"El Estado tiene la responsabilidad de establecer reglas claras, sancionar el incumplimiento de pagos y fomentar la digitalización. Y el sistema financiero también puede contribuir ofreciendo factoring accesible y justo", concluye Córdova.`,
      },
      {
        type: 'subtitle',
        text: 'Lee la nota completa',
      },
      {
        type: 'paragraph',
        fragments: [
          { type: 'text', text: 'Puedes acceder al artículo original en ' },
          {
            type: 'link',
            text: 'PQS.pe',
            href: 'https://pqs.pe/emprendimiento/retrasos-en-pagos-el-drama-silencioso-que-asfixia-a-las-pymes/',
          },
          {
            type: 'text',
            text: ', donde profundizamos en cómo este problema silencioso sigue afectando a miles de negocios peruanos y qué medidas se pueden tomar desde el sector público y privado.',
          },
        ],
      },
    ],
  },
  {
    id: 14,
    slug: slug(
      'tu flujo de caja está amenazado por clientes morosos, automatizar tu proceso de cobranza puede ser la solución'
    ),
    title:
      '¿Tu flujo de caja está en riesgo? Descubre cómo reducir la morosidad con automatización inteligente',
    intro:
      'En las empresas B2B, el flujo de caja puede verse afectado incluso cuando las ventas van bien. ¿La razón? La morosidad silenciosa: clientes que postergan pagos, olvidan sus compromisos o simplemente no responden. Y mientras tanto, tu empresa sigue operando con ingresos pendientes que nunca llegan. Este desequilibrio se convierte en un cuello de botella para crecer, invertir y proyectar tu negocio con solidez.',
    date: '19 de diciembre 2025',
    tags: ['Blog'],
    image: AssetImageBlog.blog_14_main.src,
    content: [
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'En las empresas B2B, el flujo de caja puede verse afectado incluso cuando las ventas van bien. ¿La razón? La morosidad silenciosa: clientes que postergan pagos, olvidan sus compromisos o simplemente no responden. Y mientras tanto, tu empresa sigue operando con ingresos pendientes que nunca llegan. Este desequilibrio se convierte en un cuello de botella para crecer, invertir y proyectar tu negocio con solidez.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'La pregunta clave es: ',
          },
          {
            type: 'bold',
            text: '¿estás gestionando tus cuentas por cobrar de forma estratégica o reactiva?',
          },
          {
            type: 'text',
            text: ' Si aún dependes de Excel, recordatorios manuales o correos improvisados, tu sistema está fallando. Hoy, el diferencial competitivo está en la eficiencia, y eso significa automatizar. En Sena, ayudamos a empresas a digitalizar completamente su gestión de cuentas por cobrar, con recordatorios automáticos, trazabilidad en tiempo real y reportes que te permiten tomar decisiones con data, no con intuición.',
          },
        ],
      },
      {
        type: 'image',
        link: AssetImageBlog.blog_14_main.src,
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Pero automatizar no solo es eficiencia. Es prevención. ¿Cómo? Aplicando flujos inteligentes de comunicación vía WhatsApp, email o SMS, activados según el comportamiento de pago de cada cliente. No todos pagan igual, y por eso no todos deberían recibir el mismo seguimiento.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Ahora bien, ¿qué pasa si tu cartera ya está vencida y sabes que tienes dinero por recuperar, pero no cuentas con el equipo ni los procesos para hacerlo? No necesitas construir un área de cobranzas desde cero. Para eso está ',
          },
          {
            type: 'bold',
            text: 'Recupera Plus',
          },
          {
            type: 'text',
            text: ': nuestro servicio especializado en ',
          },
          {
            type: 'bold',
            text: 'recuperar deudas activas',
          },
          {
            type: 'text',
            text: ' de forma profesional, sin afectar la relación con tus clientes y sin que tú muevas un dedo. Nosotros lo hacemos por ti con procesos efectivos y éticos, enfocados en recuperar sin conflicto.',
          },
        ],
      },
      // {
      //     type: 'paragraph',
      //     fragments: [
      //         {
      //             type: 'text',
      //             text: '¿Quieres saber cuánto podrías estar dejando en la mesa? Usa nuestra ',
      //         },
      //         {
      //             type: 'bold',
      //             text: 'Calculadora de Recuperación',
      //         },
      //         {
      //             type: 'text',
      //             text: ' y descubre el potencial que podrías volver a inyectar a tu flujo de caja este mes.',
      //         },
      //     ],
      // },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'No necesitas más planillas ni más meses con ingresos retenidos. Necesitas estructura, visibilidad y seguimiento.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'link',
            text: 'Agenda una demo y ve cómo Sena puede ordenar tu cobranza.',
            href: 'https://meetings.hubspot.com/francisco502',
          },
        ],
      },
    ],
  },
  {
    id: 15,
    slug: slug(
      'Descubre por qué tus clientes no pagan a tiempo, cómo eso afecta tu negocio y qué solución existe para recuperar el control '
    ),
    title: 'Clientes que no pagan a tiempo: causas, impacto y solución definitiva para empresas B2B',
    intro:
      'En todo negocio B2B existe un momento incómodo que se repite: un cliente no paga a tiempo. Y no hablamos de uno o dos días, sino semanas o incluso meses sin respuesta. El área de ventas se frustra, finanzas pierde visibilidad y dirección comienza a sentir la presión en la caja. Pero, ¿por qué ocurre esto con tanta frecuencia? Y más importante aún: ¿cómo puedes solucionarlo sin desgastar la relación comercial?',
    date: '06 de enero 2026',
    tags: ['Blog'],
    image: AssetImageBlog.blog_15_main.src,
    content: [
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'En todo negocio B2B existe un momento incómodo que se repite: un cliente no paga a tiempo. Y no hablamos de uno o dos días, sino semanas o incluso meses sin respuesta. El área de ventas se frustra, finanzas pierde visibilidad y dirección comienza a sentir la presión en la caja. Pero, ¿por qué ocurre esto con tanta frecuencia? Y más importante aún: ¿cómo puedes solucionarlo sin desgastar la relación comercial?',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'bold',
            text: 'Las verdaderas causas detrás de los impagos',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'En Sena, después de analizar cientos de casos, identificamos que el impago no siempre es por falta de dinero. A menudo responde a tres causas principales:',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: '1. ',
          },
          {
            type: 'bold',
            text: 'Desorganización del cliente',
          },
          {
            type: 'text',
            text: ': No tienen procesos internos claros, se les pasan los vencimientos, no priorizan los pagos.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: '2. ',
          },
          {
            type: 'bold',
            text: 'Falta de seguimiento por parte de la empresa',
          },
          {
            type: 'text',
            text: ': Si no recuerdas, no cobras. Muchos negocios pierden dinero simplemente por no hacer seguimiento automatizado.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: '3. ',
          },
          {
            type: 'bold',
            text: 'Falta de estructura en la cobranza',
          },
          {
            type: 'text',
            text: ': Correo por aquí, una llamada por allá, pero sin trazabilidad ni estrategia.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Estas causas, que parecen menores, se traducen en cientos de miles de soles retenidos cada año. Mientras tanto, tú sigues operando, pagando planilla y proveedores con dinero que aún no ha ingresado.',
          },
        ],
      },
      {
        type: 'image',
        link: AssetImageBlog.blog_15_main.src,
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'bold',
            text: 'El impacto financiero es más grande de lo que crees',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'La morosidad no solo afecta tu flujo de caja. Tiene un efecto dominó en toda tu operación: retrasas pagos a proveedores, reduces inversiones, pierdes oportunidades comerciales y tu equipo pierde tiempo persiguiendo deudas en lugar de vender o innovar.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Por eso es clave tener una gestión robusta de cobranza desde el primer día. Si tu empresa aún gestiona sus cuentas por cobrar en Excel o de forma manual, estás expuesto a errores, olvidos y falta de seguimiento. Con Sena puedes automatizar recordatorios, visualizar todo el historial de cobranza y actuar con tiempo, no con urgencia.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'bold',
            text: '¿Y si ya sabes que tienes clientes morosos, pero no tienes equipo para cobrar?',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Cuando ya tienes una cartera vencida y ningún área interna puede tomar acción --ya sea por falta de tiempo, recursos o experiencia-- lo peor que puedes hacer es dejar que el problema crezca. En vez de eso, delega. Con ',
          },
          {
            type: 'bold',
            text: 'Recupera Plus',
          },
          {
            type: 'text',
            text: ', nosotros recuperamos esa deuda por ti. Sin confrontaciones, sin procesos invasivos, y cuidando la relación comercial.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Recupera Plus es ideal para empresas que ya saben cuánto les deben, pero no tienen la estructura ni el tiempo para convertir eso en dinero en caja. Nuestro equipo profesional se encarga de todo, con tecnología, trazabilidad y comunicación efectiva.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'bold',
            text: 'Toma acción hoy: no normalices la morosidad',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Cada día que pasa sin cobrar una deuda es dinero que podrías estar reinvirtiendo en tu empresa. La solución comienza por dejar atrás los procesos manuales.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'link',
            text: 'Conversemos sobre tu cartera.',
            href: 'https://meetings.hubspot.com/francisco502',
          },
        ],
      },
    ],
  },
  {
    id: 16,
    slug: slug('La educación financiera en empresas B2B es clave para cobrar mejor y crecer con estabilidad'),
    title:
      'Educación financiera para empresas B2B: el primer paso para cobrar mejor y crecer con estabilidad',
    intro:
      'En el mundo de los negocios B2B, el éxito no depende únicamente de vender más. Depende de cobrar mejor. Y para lograrlo, el primer paso no está en contratar a un equipo más grande ni en perseguir a los clientes, sino en algo mucho más profundo: educación financiera.',
    date: '09 de enero 2026',
    tags: ['Blog'],
    image: AssetImageBlog.blog_16_main.src,
    content: [
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'En el mundo de los negocios B2B, el éxito no depende únicamente de vender más. Depende de cobrar mejor. Y para lograrlo, el primer paso no está en contratar a un equipo más grande ni en perseguir a los clientes, sino en algo mucho más profundo: ',
          },
          {
            type: 'bold',
            text: 'educación financiera',
          },
          {
            type: 'text',
            text: '.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Cuando una empresa entiende cómo fluye su dinero, cómo se comportan sus cuentas por cobrar y qué tan eficiente es su sistema de cobranza, comienza a operar con una nueva mentalidad. Ya no se trata de sobrevivir mes a mes esperando que el cliente pague, sino de proyectar el crecimiento con base en data, procesos y control. Esa es la diferencia entre una empresa reactiva y una financieramente saludable.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Uno de los errores más comunes que encontramos en empresas que facturan bien, pero tienen problemas de liquidez, es la falta de estructura en el seguimiento de cobranzas. ¿Te suena familiar?: recordatorios manuales, Excel compartidos entre áreas, correos sin respuesta, pagos que se caen entre los cracks. No es casualidad que el dinero no llegue: ',
          },
          {
            type: 'bold',
            text: 'es el sistema el que está roto.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Por eso, el punto de partida para fortalecer la salud financiera de tu negocio es profesionalizar tu proceso de cobranza. Y eso comienza por digitalizar tu gestión de cuentas por cobrar. Esto no es solo implementar un software, es un cambio de enfoque: automatizar recordatorios, integrar canales de contacto (como WhatsApp, email o llamadas programadas), generar reportes de riesgo por cliente y tener visibilidad total de tu cartera en tiempo real.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Una empresa que domina sus cuentas por cobrar no solo recupera más rápido su dinero, sino que puede planificar con más seguridad, invertir con más precisión y operar con menos estrés. Porque no se trata solo de cobrar por cobrar. Se trata de ordenar las finanzas de tu empresa desde la raíz.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Además, digitalizar tu cobranza no significa perder el toque humano. Todo lo contrario: al automatizar tareas operativas, liberas a tu equipo para que pueda enfocarse en relaciones estratégicas y resolución de casos complejos. Mientras la tecnología trabaja por ti, tu equipo toma decisiones con información clara y actualizada.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'bold',
            text: 'Conclusión',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'La educación financiera no es solo teoría contable. Es tomar decisiones reales que impactan tu rentabilidad. Si aún estás gestionando tu cobranza con métodos improvisados, estás dejando pasar oportunidades valiosas. Empieza por lo esencial: ordena tu flujo, entiende tu cartera y actúa con visión.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Sena puede ayudarte a digitalizar y profesionalizar tu gestión de cuentas por cobrar, sin fricciones, sin complicaciones, y con resultados visibles en semanas. ',
          },
          {
            type: 'link',
            text: 'Agenda una demo aquí.',
            href: 'https://meetings.hubspot.com/francisco502',
          },
        ],
      },
    ],
  },
  {
    id: 17,
    slug: slug(
      'Profesionalizar tu cobranza no significa ser agresivo. Descubre cómo digitalizar tu proceso y recuperar tus cuentas vencidas'
    ),
    title: 'Cómo profesionalizar tu cobranza sin perder clientes: estrategias probadas para empresas B2B',
    intro: `Muchas empresas temen profesionalizar su proceso de cobranza por miedo a "espantar" a sus clientes. La realidad es todo lo contrario: un proceso profesional transmite orden, seriedad y respeto. No hay nada más dañino que perseguir a un cliente sin estructura, sin consistencia y sin tacto. Eso es lo que realmente deteriora relaciones.`,
    date: '13 de enero 2026',
    tags: ['Blog'],
    image: AssetImageBlog.blog_17_main.src,
    content: [
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: `Muchas empresas temen profesionalizar su proceso de cobranza por miedo a "espantar" a sus clientes. La realidad es todo lo contrario: un proceso profesional transmite orden, seriedad y respeto. No hay nada más dañino que perseguir a un cliente sin estructura, sin consistencia y sin tacto. Eso es lo que realmente deteriora relaciones.`,
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'En el mundo B2B, cobrar de forma efectiva ',
          },
          {
            type: 'bold',
            text: 'no se trata de insistir más, sino de hacerlo mejor',
          },
          {
            type: 'text',
            text: '. Y para lograrlo, necesitas aplicar dos enfoques clave en el momento correcto: digitalizar tus ',
          },
          {
            type: 'bold',
            text: 'cuentas por cobrar',
          },
          {
            type: 'text',
            text: ' para hacer seguimiento automatizado, y escalar a un servicio de recuperación especializada como ',
          },
          {
            type: 'bold',
            text: 'Recupera Plus',
          },
          {
            type: 'text',
            text: ' cuando ya tienes deudas activas que no logras resolver por tu cuenta.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'bold',
            text: 'Paso 1: Digitaliza tu cobranza antes de que el problema escale',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Si tu empresa todavía depende de hojas de Excel para controlar las cobranzas, estás a un paso del caos. A medida que crece tu base de clientes, aumenta también el riesgo de olvido, duplicidad o errores humanos. El primer gran paso para profesionalizar tu proceso es implementar un sistema que te brinde trazabilidad, alertas automatizadas y seguimiento inteligente.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Con Sena, puedes digitalizar tu gestión de cuentas por cobrar, automatizando recordatorios por WhatsApp, correo o llamada, generando reportes de riesgo por cliente y organizando todo el proceso en una sola plataforma. Así, reduces la morosidad sin esfuerzo operativo, y mantienes la relación comercial intacta, porque el cliente se siente acompañado, no presionado.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Además, cuando tu equipo de finanzas trabaja con visibilidad y control, puede tomar decisiones más estratégicas: segmentar clientes según comportamiento de pago, priorizar acciones y anticiparse a escenarios de riesgo.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'bold',
            text: 'Paso 2: Si la deuda ya existe, actúa sin perder tiempo',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Ahora bien, hay otro escenario común: empresas que ya tienen ',
          },
          {
            type: 'bold',
            text: 'cartera vencida',
          },
          {
            type: 'text',
            text: ', saben que sus clientes les deben, pero no cuentan con el equipo, tiempo ni procesos para recuperar ese dinero. Aquí ya no basta con enviar recordatorios: se necesita una acción más estructurada.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Para estos casos, Sena ofrece ',
          },
          {
            type: 'bold',
            text: 'Recupera Plus',
          },
          {
            type: 'text',
            text: ', un servicio diseñado específicamente para ',
          },
          {
            type: 'bold',
            text: 'empresas que ya identificaron su deuda activa',
          },
          {
            type: 'text',
            text: ', pero necesitan apoyo externo para cobrar. Nosotros asumimos el proceso completo, con comunicaciones profesionales, protocolos éticos y trazabilidad de cada contacto, para que tú puedas recuperar el dinero sin desgastar tu operación ni poner en riesgo la relación comercial.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'No se trata de una cobranza invasiva ni agresiva. Es una recuperación bien hecha, desde la empatía, la tecnología y la experiencia.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'bold',
            text: '¿Qué logras al profesionalizar tu cobranza?',
          },
        ],
      },
      {
        type: 'list',
        items: [
          'Reduces tu morosidad sin desgastar relaciones.',
          'Ordenas tu flujo de caja y proyectas con más certeza.',
          'Libertas a tu equipo financiero de tareas operativas improductivas.',
          'Cuidas tu marca, tu reputación y tu base de clientes.',
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'bold',
            text: 'Conclusión',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Profesionalizar tu proceso de cobranza no solo te permite cobrar más rápido, sino mejor. Ya sea implementando un sistema automatizado para tus cuentas por cobrar o activando un plan de recuperación con Recupera Plus, el objetivo es el mismo: ',
          },
          {
            type: 'bold',
            text: 'recuperar tu dinero sin perder a tus clientes.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'No sigas normalizando los pagos vencidos. ',
          },
          {
            type: 'link',
            text: 'Conversemos sobre cómo profesionalizar tu cobranza.',
            href: 'https://meetings.hubspot.com/francisco502',
          },
        ],
      },
    ],
  },
  {
    id: 18,
    slug: 'si-no-haces-seguimiento-no-cobras-como-Sena-profesionaliza-el-seguimiento-y-recupera-tu-dinero',
    title: 'Si no haces seguimiento, no cobras: cómo Sena profesionaliza el seguimiento y recupera tu dinero',
    intro:
      'Hiciste el cálculo. Ahora sabes cuánto dinero tienes atrapado en tu cartera vencida. ¿Y ahora qué?\n\nEl mayor error que cometen las empresas con deudas activas no es no saber cuánto les deben --ese paso ya lo diste--, sino **no hacer seguimiento constante, estratégico y profesional para recuperar ese dinero**. No basta con una llamada. No basta con reenviar la factura. Si no hay estructura, el cliente posterga, ignora... y tú sigues perdiendo.',
    date: '16 de enero 2026',
    tags: ['Blog'],
    image: AssetImageBlog.blog_18_main.src,
    content: [
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Hiciste el cálculo. Ahora sabes cuánto dinero tienes atrapado en tu cartera vencida. ¿Y ahora qué?',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'El mayor error que cometen las empresas con deudas activas no es no saber cuánto les deben --ese paso ya lo diste--, sino ',
          },
          {
            type: 'bold',
            text: 'no hacer seguimiento constante, estratégico y profesional para recuperar ese dinero',
          },
          {
            type: 'text',
            text: '. No basta con una llamada. No basta con reenviar la factura. Si no hay estructura, el cliente posterga, ignora... y tú sigues perdiendo.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'bold',
            text: 'El seguimiento es el corazón de toda recuperación efectiva',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Hacer seguimiento no es perseguir. Es tener un ',
          },
          {
            type: 'bold',
            text: 'sistema estructurado',
          },
          {
            type: 'text',
            text: ', donde cada cliente moroso reciba comunicaciones oportunas, por el canal adecuado, con el mensaje correcto y la frecuencia ideal. Suena simple, pero requiere tiempo, estrategia y experiencia. Por eso muchas empresas, incluso sabiendo que tienen deudas por recuperar, no logran hacerlo solas.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Ahí es donde entra ',
          },
          {
            type: 'bold',
            text: 'Recupera Plus',
          },
          {
            type: 'text',
            text: ': nuestro servicio especializado en ',
          },
          {
            type: 'bold',
            text: 'recuperación de deudas activas',
          },
          {
            type: 'text',
            text: ', diseñado para empresas que no tienen un equipo interno de cobranza ni procesos profesionales para gestionarlo.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'bold',
            text: '¿Cómo lo hacemos?',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Con Recupera Plus, Sena se encarga de todo el seguimiento por ti. Diseñamos flujos inteligentes que combinan llamadas, emails y WhatsApps según el comportamiento del cliente. Cada acción queda registrada, cada avance se reporta, y tú tienes visibilidad completa del proceso. Nuestro enfoque es ético, profesional y centrado en resultados.',
          },
        ],
      },
      {
        type: 'image',
        link: AssetImageBlog.blog_18_main.src,
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Recuperamos sin fricciones, sin amenazas y sin poner en riesgo la relación comercial. Porque entendemos que detrás de cada cliente hay una oportunidad de negocio... pero también una obligación pendiente.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'bold',
            text: '¿Qué pasa si no haces nada?',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Lo que pasa todos los meses: ese dinero sigue fuera de tu caja. Mientras tú te enfocas en operar, vender y pagar tus propias obligaciones, estás financiando a clientes que simplemente no respondieron a tiempo... y a los que nadie les volvió a escribir.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'bold',
            text: 'El seguimiento lo es todo. Y si tú no lo haces, nadie lo hará por ti.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'bold',
            text: 'Conclusión: haz que ese número se convierta en recuperación real',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Deja que Sena se encargue del seguimiento profesional y empieza a recuperar lo que ya sabes que te pertenece.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'link',
            text: 'Solicita una evaluación gratuita de tu cartera.',
            href: 'https://meetings.hubspot.com/francisco502',
          },
        ],
      },
    ],
  },
  {
    id: 20,
    slug: 'como-saber-si-tu-cliente-te-va-a-pagar',
    title: 'Cómo saber si tu cliente te va a pagar antes de venderle a crédito',
    intro:
      'Vender a crédito es una decisión de riesgo y casi siempre se toma a ciegas. Con certeza no vas a saber si tu cliente te va a pagar, pero sí puedes reducir la incertidumbre con el historial externo, tu propia data de pago y las condiciones del trato. En este artículo revisamos qué señales mirar antes de dar el crédito, qué te dice y qué no te dice cada una, y cómo ordenar la decisión para que no dependa del olfato de quien vende.',
    date: '26 de agosto 2026',
    tags: ['Blog', 'Riesgo crediticio'],
    image: AssetImageBlog.blog_20_main.src,
    faq: [
      {
        question: '¿Puedo consultar el historial comercial de una empresa antes de venderle?',
        answer:
          'Sí. Existen proveedores externos de score crediticio y reportes comerciales de empresas. En Sena nos conectamos con terceros para entregar ese servicio dentro de la operación de cobranza.',
      },
      {
        question: '¿Qué hago si un cliente que ya me compra empieza a atrasarse?',
        answer:
          'Lo ideal es que te reúnas lo antes posible con tu cliente para evaluar qué está pasando y, de ser necesario, restringir una próxima venta a crédito.',
      },
      {
        question: '¿Conviene pedir garantías o acortar el plazo?',
        answer:
          'Que se pidan garantías depende de la industria. Lo que sí conviene es acortar los plazos cuando un cliente no está respetando los plazos de pago acordados.',
      },
    ],
    content: [
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'La cobranza comienza mucho antes del vencimiento de la factura. Comienza cuando debes decidir a quién le vendes tu producto o servicio. Es decir, la mora no se produce cuando el cliente no paga, se produce cuando le vendiste en condiciones que no debiste aprobar.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: '¿Quién es el responsable de esta decisión? ¿O de entregar y mantener la información actualizada para poder tomarla?',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Si tu cliente te va a pagar, no lo sabrás con certeza. Lo que sí puedes hacer es reducir la incertidumbre a través de un historial externo, tu propia data de pago y las condiciones del trato.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'El área de finanzas, riesgo, cobranza y comercial: todas tienen algo que ver en este proceso. Y si no está bien estructurado, termina sin un responsable claro, perjudicando la caja y el resultado de la empresa.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'El DSO promedio en B2B es de 50 a 60 días (PwC Working Capital Study). Ese plazo no es el problema: el problema es lo que se suma después del vencimiento, y eso sí depende de decisiones que tomaste antes de vender.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Cobrar bien empieza en la decisión de vender. Eso requiere que las empresas tengan datos pero, por sobre todo, información valiosa que las ayude a decidir. Luego esa información debe estar disponible en el momento en que se define si se le da crédito o no a un cliente.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'El área comercial tiene incentivos para vender, y hay que cuidar que esos incentivos estén alineados con los riesgos y la tolerancia definidos por el área financiera.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [{ type: 'text', text: 'La mayoría de las empresas cuentan con la siguiente data:' }],
      },
      {
        type: 'list',
        items: [
          [
            { type: 'bold', text: 'Historial externo: ' },
            {
              type: 'text',
              text: 'existen diversas herramientas que sirven de termómetro para evaluar qué tan buen pagador puede ser un cliente. Es lo que se conoce como ',
            },
            {
              type: 'link',
              text: 'score crediticio',
              href: '/blog/score-crediticio-de-clientes-que-mirar',
            },
            { type: 'text', text: '.' },
          ],
          [
            { type: 'bold', text: 'Tu propia data de pago: ' },
            { type: 'text', text: 'todo el historial que ya tienes con ese cliente.' },
          ],
          [
            { type: 'bold', text: 'Antigüedad de la relación: ' },
            { type: 'text', text: 'si es una relación construida y estable, o algo de corto plazo.' },
          ],
          [
            { type: 'bold', text: 'Concentración: ' },
            { type: 'text', text: 'qué tan relevante es ese cliente para tu cartera.' },
          ],
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Ninguna de esas señales dice si va a pagar. Reducen el riesgo, pero no lo eliminan. Tampoco son muy útiles por separado, sobre todo cuando un ejecutivo comercial debe tomar una decisión en una visita a terreno: tiene al cliente en frente y está esperando una respuesta.',
          },
        ],
      },
      { type: 'title', text: 'Cómo ordenar la decisión de crédito' },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Para evitar que esta decisión dependa del olfato del encargado comercial en terreno, las empresas deberían considerar estos tres elementos:',
          },
        ],
      },
      {
        type: 'list',
        items: [
          [
            { type: 'bold', text: 'Criterio escrito: ' },
            {
              type: 'text',
              text: 'debe haber un proceso de otorgamiento de crédito establecido por el área financiera. Ese documento define las reglas, los períodos de revisión, las excepciones y los responsables.',
            },
          ],
          [
            { type: 'bold', text: 'Tramos de crédito: ' },
            {
              type: 'text',
              text: 'dentro del mismo proceso debe estar la regla de tramos, que dependerá de la industria, el tamaño de la empresa y el modelo de negocio. Lo esperable es que mientras más nueva sea la relación comercial, menor sea el otorgamiento de crédito. Se pueden establecer excepciones, por ejemplo si se trata de una gran empresa o de algún criterio excepcional.',
            },
          ],
          [
            { type: 'bold', text: 'Matriz RACI: ' },
            {
              type: 'text',
              text: 'responsable, aprobador, consultado e informado. Independiente de la versión que uses, lo relevante es tener claro quién cuida la regla, quién ejecuta el otorgamiento y a quién se le puede pedir una evaluación particular. Parte importante del proceso es saber quiénes interactúan cuando se requiere una revisión o una aprobación.',
            },
          ],
        ],
      },
      { type: 'title', text: '¿Qué pasa cuando vendes a crédito sin revisar?' },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Uno de los casos más habituales en que nuestros clientes solicitan score crediticio es la venta directa. Han tenido casos de estafa, mal comportamiento de pago e incertidumbre con la entrega de crédito. Se caracterizan por ser empresas con gran cantidad de clientes, donde es difícil hacer una revisión completa sin las herramientas digitales adecuadas.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'En Sena facilitamos la conexión a esas herramientas y, además, entregamos un panel de control con el estado actual de tus ventas y facturas, que te permite actuar a tiempo.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Contáctanos o agenda una demo: revisamos tu industria y los desafíos de tu cobranza, y definimos contigo el mejor sistema para tus facturas impagas.',
          },
        ],
      },
    ],
  },
  {
    id: 21,
    slug: 'score-crediticio-de-clientes-que-mirar',
    title: 'Score crediticio de tus clientes: qué mirar antes de aprobar una venta a crédito',
    intro:
      'Corres el score de un cliente nuevo y sale un número bajo. ¿Le vendes o no? Un score crediticio no es un semáforo: es una probabilidad construida sobre historial pasado, y un resultado bajo no significa que tu cliente no te vaya a pagar. Revisamos qué mide realmente, por qué un puntaje bajo puede tener explicación, y cómo cruzarlo con lo que ya sabes de tu propia cartera para decidir cuánto crédito das y en qué condiciones.',
    date: '26 de agosto 2026',
    tags: ['Blog', 'Riesgo crediticio'],
    image: AssetImageBlog.blog_21_main.src,
    faq: [
      {
        question: '¿El score que entrega Sena es de empresas, de personas naturales, o ambos?',
        answer: 'Ambos. Podemos entregar score tanto de personas naturales como de empresas.',
      },
      {
        question: '¿Viene dentro del Plan Core?',
        answer:
          'Sí. Entregamos score crediticio de proveedores externos como parte de la operación de cobranza. El volumen de consultas y las condiciones los definimos según tu industria y tu modelo de negocio.',
      },
      {
        question: '¿Mi cliente se entera si consulto su score?',
        answer:
          'No se le notifica: consultar un score no genera ningún aviso a tu cliente. En Sena cuidamos la relación comercial de nuestros clientes con sus clientes, y el score sirve para decidir mejor, no para presionar.',
      },
    ],
    content: [
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Tomaste una excelente decisión: utilizar un score crediticio para evaluar la salud comercial de tus clientes. Corres el score para un cliente nuevo. Obtienes un número bajo. ¿Qué haces? ¿Le vendes a ese cliente?',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'El score crediticio es un instrumento que mide el riesgo financiero de una empresa basado en su historial y que busca predecir su comportamiento de pago futuro, estableciendo una probabilidad de incumplimiento o de quiebra, según la herramienta.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [{ type: 'text', text: 'El score se compone de dos ventanas de tiempo:' }],
      },
      {
        type: 'list',
        items: [
          [
            { type: 'bold', text: 'Retrospectiva: ' },
            {
              type: 'text',
              text: 'dependiendo de la herramienta, pueden analizar 12 a 24 meses, o incluso años en caso de que la empresa presente causas judiciales.',
            },
          ],
          [
            { type: 'bold', text: 'Predictiva: ' },
            {
              type: 'text',
              text: 'en base a modelos estadísticos se pronostica un comportamiento de pago para los próximos meses. A la vez se hace una actualización periódica, en ciclos dinámicos que dependen de la industria en la que operas.',
            },
          ],
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Un buen score crediticio debe considerar el historial de pagos, el nivel de endeudamiento, los datos demográficos y la antigüedad de la empresa, incluyendo además cualquier registro público que pueda impactar la gestión de sus facturas.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Conviene tener presente la escala del fenómeno: aproximadamente la mitad de las ventas B2B a crédito presentan atraso (Atradius Payment Practices Barometer). El atraso es la norma, no la excepción, y por eso un score bajo no se lee como veredicto.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Dado que el score es una probabilidad, un resultado bajo no implica que no te vaya a pagar. Existen diversos motivos por los cuales un cliente puede tener un score bajo: empresa nueva, giro estacional o una disputa comercial, por ejemplo.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Y si tu cliente ya te compra, la información que tienes tú puede ser mucho más valiosa que la que entrega un score crediticio. Aquí es donde se vuelve estratégico juntar ambas fuentes. Antes de eso conviene tener ordenada la decisión de crédito: lo desarrollamos en ',
          },
          {
            type: 'link',
            text: 'Cómo saber si tu cliente te va a pagar antes de venderle a crédito',
            href: '/blog/como-saber-si-tu-cliente-te-va-a-pagar',
          },
          { type: 'text', text: '.' },
        ],
      },
      { type: 'title', text: '¿Qué hago si el score de mi cliente es bajo?' },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Con toda la data que tienes, te podemos ayudar a cruzar el score crediticio externo con tu propia data de pago y fijar límites por tramo.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Si el score te dio bajo pero tu data muestra buen comportamiento de pago, puedes seguir vendiendo con resguardos: crédito a más corto plazo, un tope al monto de la próxima venta, o un porcentaje de pago adelantado cuando se trata de clientes nuevos.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: '¿Te gustaría optimizar el uso que le das a tu información de cobranza? Contáctanos o agenda una demo y lo revisamos contigo.',
          },
        ],
      },
    ],
  },
  {
    id: 22,
    slug: 'calcular-roi-en-15-minutos-descubre-cuanto-ahorras-al-automatizar-tu-cobranza',
    title: 'Calcular ROI en 15 minutos: descubre cuánto ahorras al automatizar tu cobranza ',
    intro:
      '¿Vale la pena pagar por un software de cobranza? La mejor forma de responder no es con percepciones, sino con datos. En este artículo aprenderás a calcular ROI en solo 15 minutos y a descubrir cómo la automatización de procesos transforma la cobranza en un motor de ahorro y eficiencia.',
    date: '03 de marzo 2026',
    tags: ['Blog', 'Visión Financiera', 'Educación Financiera'],
    image: AssetImageBlog.blog_22_main.src,
    content: [
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: '¿Vale la pena pagar por un software de cobranza? La mejor forma de responder no es con percepciones, sino con datos. En este artículo aprenderás a calcular ROI en solo 15 minutos y a descubrir cómo la automatización de procesos transforma la cobranza en un motor de ahorro y eficiencia.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'bold',
            text: '¿Qué es el ROI y por qué es clave en decisiones financieras?',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'El ROI (Return on Investment o Retorno de la Inversión) es una métrica que permite saber si una inversión genera beneficios suficientes frente al dinero y tiempo invertidos.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'En el contexto de la gestión de cobranzas, el ROI responde a una pregunta crítica: ¿la automatización genera más valor que el costo del software?',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Medir el ROI automatización cobranzas se ha vuelto indispensable para CFOs y gerentes que deben justificar presupuestos ante directorios o socios. No se trata solo de eficiencia, sino de demostrar con números que la inversión se traduce en mayor liquidez, menos costos y un flujo de caja más estable.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'bold',
            text: 'Cómo calcular ROI en tu empresa paso a paso',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'La fórmula básica es:',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'ROI = (Beneficio - Inversión) / Inversión x 100',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Ejemplo:',
          },
        ],
      },
      {
        type: 'list',
        items: [
          'Inversión en software de cobranza: $1,000 mensuales.',
          'Beneficio estimado: $3,500 en reducción de cartera vencida y ahorro operativo.',
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'ROI = (3,500 - 1,000) / 1,000 x 100 = 250%',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Esto significa que por cada dólar invertido, la empresa recupera 2.5 adicionales.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Lo mejor: con las métricas adecuadas, calcular ROI puede tomar solo 15 minutos. Basta con identificar la inversión, medir los beneficios (ahorro en horas, reducción de morosidad, incremento en liquidez) y aplicar la fórmula.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'bold',
            text: 'Beneficios financieros de la automatización de cobranza',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Un buen ROI no aparece por casualidad, sino porque la automatización impacta directamente en varios frentes:',
          },
        ],
      },
      {
        type: 'list',
        items: [
          'Reducción del DSO: menos días de venta pendientes de cobro.',
          'Menor carga operativa: equipos que dejan tareas manuales para enfocarse en estrategia.',
          'Incremento en la tasa de recuperación: más facturas cobradas en menos tiempo.',
          'Flujo de caja más predecible: mayor liquidez para pagar proveedores o invertir.',
          'Eficiencia operativa: menor dependencia de Excel y procesos fragmentados.',
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Cada uno de estos indicadores de ahorro y eficiencia entra en el cálculo del ROI, reforzando el valor de la automatización.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'bold',
            text: 'La calculadora ROI de Sena',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Sena va más allá de la teoría. Su plataforma incluye una calculadora ROI diseñada para mostrar, en tiempo real, cuánto tiempo y dinero ahorra la empresa al automatizar la cobranza.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'La herramienta considera:',
          },
        ],
      },
      {
        type: 'list',
        items: [
          'Horas liberadas de tareas manuales.',
          'Reducción del DSO gracias a flujos automáticos.',
          'Incremento de la tasa de recuperación de facturas.',
          'Impacto directo en el flujo de caja.',
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'El resultado es un informe claro y visual que facilita la toma de decisiones: el CFO no solo dice que la automatización es útil, lo demuestra con cifras.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'bold',
            text: 'Casos comunes donde calcular ROI cambia la decisión',
          },
        ],
      },
      {
        type: 'list',
        items: [
          'Un CFO frente al directorio: necesita justificar inversión en software frente a contratar más personal. El ROI demuestra que la automatización genera más valor con menos gasto fijo.',
          'Una pyme con liquidez ajustada: duda si pagar por una plataforma. El cálculo muestra que recuperar facturas atrasadas vale mucho más que el costo mensual.',
          'Una empresa en crecimiento: necesita escalar sin aumentar su equipo de cobranza. El ROI proyecta ahorros que permiten crecer sin contratar.',
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'En todos estos escenarios, calcular ROI aporta la seguridad que los números entregan y ayuda a transformar dudas en decisiones estratégicas.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'La automatización de cobranza no debe verse como un gasto, sino como una inversión que se mide con datos. Calcular ROI permite comprobar en minutos si la decisión genera valor real para la empresa.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Con Sena, este proceso es aún más sencillo gracias a su calculadora de ROI: una herramienta que conecta indicadores como DSO, tasa de recuperación y flujo de caja con el impacto financiero directo de la automatización.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: '¿Quieres comprobar en minutos cuánto puede ahorrar tu empresa? ',
          },
          {
            type: 'link',
            text: 'Prueba la calculadora ROI de Sena.',
            href: 'https://meetings.hubspot.com/francisco502',
          },
        ],
      },
    ],
  },
  {
    id: 23,
    slug: 'descubre-que-software-de-cobranza-puede-ayudarte-a-automatizar-procesos-salir-del-excel-y-mejorar-la-liquidez-en-tu-pyme',
    title: '¿Qué software de cobranza me ayuda a automatizar las cobranzas en mi pyme?',
    intro:
      'Muchas pymes todavía dependen de hojas de Excel y recordatorios manuales para gestionar las cuentas por cobrar. Este enfoque no solo consume tiempo, también aumenta el riesgo de errores y afecta el flujo de caja. La buena noticia es que existen soluciones digitales pensadas para automatizar el proceso y mejorar la eficiencia. En este blog revisaremos qué software de cobranza puede ayudarte a salir del Excel, qué funciones debes buscar y cómo Sena se convierte en un aliado estratégico para crecer sin fricciones.',
    date: '06 de marzo 2026',
    tags: ['Blog', 'Producto', 'Servicio'],
    image: AssetImageBlog.blog_23_main.src,
    content: [
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Muchas pymes todavía dependen de hojas de Excel y recordatorios manuales para gestionar las cuentas por cobrar. Este enfoque no solo consume tiempo, también aumenta el riesgo de errores y afecta el ',
          },
          {
            type: 'bold',
            text: 'flujo de caja',
          },
          {
            type: 'text',
            text: '. La buena noticia es que existen soluciones digitales pensadas para automatizar el proceso y mejorar la eficiencia. En este blog revisaremos qué ',
          },
          {
            type: 'bold',
            text: 'software de cobranza',
          },
          {
            type: 'text',
            text: ' puede ayudarte a salir del Excel, qué funciones debes buscar y cómo Sena se convierte en un aliado estratégico para crecer sin fricciones.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'bold',
            text: 'El problema de depender de Excel para la cobranza',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Excel ha sido durante años la herramienta favorita de muchas empresas para llevar un control financiero básico. Sin embargo, cuando una pyme empieza a manejar cientos de facturas mensuales, el sistema se queda corto.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Los principales problemas son:',
          },
        ],
      },
      {
        type: 'list',
        items: [
          [
            {
              type: 'bold',
              text: 'Falta de trazabilidad',
            },
            {
              type: 'text',
              text: ': los recordatorios enviados por correo o WhatsApp no quedan registrados de forma ordenada.',
            },
          ],
          [
            {
              type: 'bold',
              text: 'Errores manuales',
            },
            {
              type: 'text',
              text: ': copiar y pegar datos del ERP a una planilla es propenso a equivocaciones.',
            },
          ],
          [
            {
              type: 'bold',
              text: 'Pérdida de tiempo',
            },
            {
              type: 'text',
              text: ': los equipos financieros gastan horas en tareas repetitivas.',
            },
          ],
          [
            {
              type: 'bold',
              text: 'Impacto en liquidez',
            },
            {
              type: 'text',
              text: ': los atrasos aumentan y el ',
            },
            {
              type: 'bold',
              text: 'DSO',
            },
            {
              type: 'text',
              text: ' (días promedio de cobro) se eleva, poniendo presión en el flujo de caja.',
            },
          ],
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'En este contexto, la digitalización de la cobranza deja de ser una opción para convertirse en una necesidad.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'bold',
            text: '¿Qué es un software de cobranza y cómo funciona?',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Un ',
          },
          {
            type: 'bold',
            text: 'software de cobranza',
          },
          {
            type: 'text',
            text: ' es una plataforma digital, generalmente en la nube (SaaS), que centraliza, automatiza y monitorea los procesos de recuperación de pagos.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'A diferencia de las herramientas tradicionales, este tipo de sistemas ofrece:',
          },
        ],
      },
      {
        type: 'list',
        items: [
          [
            {
              type: 'bold',
              text: 'Automatización inteligente',
            },
            {
              type: 'text',
              text: ': recordatorios automáticos antes y después del vencimiento.',
            },
          ],
          [
            {
              type: 'bold',
              text: 'Visibilidad total',
            },
            {
              type: 'text',
              text: ': dashboards con métricas en tiempo real.',
            },
          ],
          [
            {
              type: 'bold',
              text: 'Escalabilidad',
            },
            {
              type: 'text',
              text: ': permite manejar mayor volumen de facturas sin aumentar el equipo.',
            },
          ],
          [
            {
              type: 'bold',
              text: 'Integración',
            },
            {
              type: 'text',
              text: ': conexión con ERP o CRM para sincronizar datos sin esfuerzo manual.',
            },
          ],
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'En resumen, pasa de un proceso manual y reactivo a una gestión proactiva, ordenada y enfocada en resultados.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'bold',
            text: 'Funciones clave de un software de cobranza para pymes',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Cuando busques una solución para tu empresa, asegúrate de que incluya estas funcionalidades:',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: '1. ',
          },
          {
            type: 'bold',
            text: 'Automatización de recordatorios',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Correos, SMS o WhatsApp enviados según reglas de negocio, liberando al equipo de tareas repetitivas.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: '2. ',
          },
          {
            type: 'bold',
            text: 'Dashboards en tiempo real',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Métricas como DSO, antigüedad de cartera y ',
          },
          {
            type: 'bold',
            text: 'tasa de recuperación',
          },
          {
            type: 'text',
            text: ' disponibles al instante para tomar decisiones rápidas.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: '3. ',
          },
          {
            type: 'bold',
            text: 'Segmentación de clientes morosos',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Clasificación automática por riesgo y monto, lo que permite priorizar la gestión en cuentas críticas.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: '4. ',
          },
          {
            type: 'bold',
            text: 'Reportes y métricas exportables',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Información lista para auditorías y presentaciones gerenciales.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: '5. ',
          },
          {
            type: 'bold',
            text: 'Historial de interacciones',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Registro de llamadas, correos y notas, aportando trazabilidad y respaldo ante disputas.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'bold',
            text: 'Cómo elegir el software de cobranza adecuado',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'No todas las soluciones son iguales. Para una pyme que busca salir del Excel y digitalizarse, conviene evaluar los siguientes aspectos:',
          },
        ],
      },
      {
        type: 'list',
        items: [
          [
            {
              type: 'bold',
              text: 'Escalabilidad',
            },
            {
              type: 'text',
              text: ': que pueda crecer al ritmo de tu negocio.',
            },
          ],
          [
            {
              type: 'bold',
              text: 'Integración sencilla',
            },
            {
              type: 'text',
              text: ': conexión con sistemas existentes sin procesos complejos.',
            },
          ],
          [
            {
              type: 'bold',
              text: 'Facilidad de uso',
            },
            {
              type: 'text',
              text: ': una interfaz intuitiva para el equipo.',
            },
          ],
          [
            {
              type: 'bold',
              text: 'Soporte y seguridad',
            },
            {
              type: 'text',
              text: ': respaldo ante dudas y cumplimiento de estándares de protección de datos.',
            },
          ],
          [
            {
              type: 'bold',
              text: 'Relación costo-beneficio',
            },
            {
              type: 'text',
              text: ': medir el ',
            },
            {
              type: 'bold',
              text: 'ROI automatización cobranzas',
            },
            {
              type: 'text',
              text: ' frente a contratar más personal o mantener procesos manuales.',
            },
          ],
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'bold',
            text: 'Caso Sena: automatización enfocada en resultados',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Sena no es solo un ',
          },
          {
            type: 'bold',
            text: 'software de cobranza',
          },
          {
            type: 'text',
            text: ', es una plataforma SaaS que combina automatización tecnológica con ejecución profesional.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Lo que lo hace destacar frente a otras opciones:',
          },
        ],
      },
      {
        type: 'list',
        items: [
          [
            {
              type: 'bold',
              text: 'Visibilidad del DSO',
            },
            {
              type: 'text',
              text: ': cuánto demora cobrarse cada factura y qué está empujando el promedio.',
            },
          ],
          [
            {
              type: 'bold',
              text: 'Ahorro de tiempo operativo',
            },
            {
              type: 'text',
              text: ' gracias a flujos automáticos.',
            },
          ],
          [
            {
              type: 'bold',
              text: 'Dashboards con KPIs clave',
            },
            {
              type: 'text',
              text: ': aging de cartera, top morosos, flujo de caja proyectado.',
            },
          ],
          [
            {
              type: 'bold',
              text: 'Bitácora completa de gestiones',
            },
            {
              type: 'text',
              text: ' con trazabilidad para auditorías.',
            },
          ],
          [
            {
              type: 'bold',
              text: 'Estrategias inteligentes de cobranza',
            },
            {
              type: 'text',
              text: ' configuradas según el perfil de cada cliente.',
            },
          ],
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'El resultado: menos morosidad, más liquidez y una gestión de cobranzas ordenada y profesional.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Depender de Excel para manejar las cuentas por cobrar es insostenible cuando una pyme busca crecer. Un ',
          },
          {
            type: 'bold',
            text: 'software de cobranza',
          },
          {
            type: 'text',
            text: ' ofrece automatización, visibilidad y control en tiempo real, liberando al equipo financiero de tareas manuales y garantizando liquidez.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Sena, además, convierte los datos en decisiones estratégicas al vigilar indicadores como DSO, tasa de recuperación y eficiencia operativa.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: '¿Quieres salir del Excel y automatizar tu cobranza de manera profesional? ',
          },
          {
            type: 'link',
            text: 'Conoce Sena y transforma tu gestión financiera',
            href: 'https://meetings.hubspot.com/francisco502',
          },
          {
            type: 'text',
            text: '.',
          },
        ],
      },
    ],
  },
  {
    id: 24,
    slug: 'descubre-los-kpis-de-cobranza-mas-importantes-para-medir-la-efectividad-de-tu-gestion-y-mejorar-la-toma-de-decisiones',
    title: '¿Qué KPIs de cobranza debo revisar para saber si mi cobranza está funcionando?',
    intro:
      'Medir la efectividad de la cobranza no significa únicamente revisar cuánto dinero ingresa a caja. Para un CFO o controller, lo que realmente importa es analizar los KPIs de cobranza, es decir, los indicadores que muestran la eficiencia del proceso, anticipan riesgos y permiten justificar decisiones estratégicas ante la gerencia.',
    date: '10 de marzo 2026',
    tags: ['Blog', 'Visión Financiera', 'Educación Financiera'],
    image: AssetImageBlog.blog_24_main.src,
    content: [
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Medir la efectividad de la cobranza no significa únicamente revisar cuánto dinero ingresa a caja. Para un CFO o controller, lo que realmente importa es analizar los KPIs de cobranza, es decir, los indicadores que muestran la eficiencia del proceso, anticipan riesgos y permiten justificar decisiones estratégicas ante la gerencia.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'bold',
            text: 'La importancia de los KPIs en la gestión de cobranza',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Una empresa puede emitir cientos de facturas, pero si estas no se convierten en liquidez oportuna, su operación corre riesgos. Los indicadores de cobranza ofrecen una radiografía clara de cómo se comporta la cartera, identificando patrones de pago, clientes morosos y posibles fugas de liquidez.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Medir KPIs no solo ayuda a saber si la estrategia de cobranza está funcionando, sino también a tomar decisiones de mejora: ajustar plazos, renegociar con clientes o reforzar políticas de crédito. En pocas palabras, los KPIs de cobranza conectan la gestión operativa con la salud financiera de la empresa.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'bold',
            text: 'Principales KPIs de cobranza que debes monitorear',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'bold',
            text: '1. DSO (Days Sales Outstanding)',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'El DSO mide los días promedio que tarda la empresa en recuperar el dinero de sus ventas a crédito. Un DSO alto puede señalar problemas de flujo de caja o clientes que pagan tarde. Reducirlo es clave para mantener liquidez y operar sin depender de préstamos.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'bold',
            text: '2. Aging de cartera',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Este indicador clasifica las cuentas por cobrar según su antigüedad: 30, 60, 90 días o más. El aging permite priorizar esfuerzos sobre las facturas más críticas y visualizar qué parte de la cartera corre mayor riesgo de incobrabilidad.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'bold',
            text: '3. Tasa de recuperación',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Mide el porcentaje de facturas efectivamente cobradas sobre el total emitido. Una tasa baja revela ineficiencia en la cobranza y alerta sobre posibles pérdidas.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'bold',
            text: '4. Promedio de días de mora',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Indica cuántos días adicionales, después de la fecha de vencimiento, tardan los clientes en pagar. Este KPI permite evaluar el comportamiento real de pago y sirve para diseñar recordatorios más efectivos.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'bold',
            text: '5. Eficiencia operativa en cobranza',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'No basta con cobrar; importa cuánto cuesta hacerlo. Este KPI compara los recursos invertidos en cobranza (tiempo y personal) contra los montos recuperados. Un proceso eficiente debería minimizar costos y maximizar liquidez.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'bold',
            text: 'Cómo interpretar los indicadores de cobranza',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Los números por sí solos no cuentan toda la historia. Un DSO de 40 días puede ser excelente para una empresa industrial, pero preocupante para un negocio de servicios con plazos más cortos. Del mismo modo, un aging de cartera concentrado en deudas mayores a 90 días es una señal crítica de ineficiencia.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'La clave es comparar los KPIs financieros de tu empresa con:',
          },
        ],
      },
      {
        type: 'list',
        items: [
          'Promedios del sector.',
          'Tu propio historial de cobranza.',
          'Las metas fijadas en tus políticas de crédito.',
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Así podrás identificar si tu gestión de cuentas por cobrar va en la dirección correcta o si necesita ajustes inmediatos.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'bold',
            text: 'Herramientas para medir KPIs en tiempo real',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'El reto de muchos CFOs es que sus métricas de cobranza se calculan de manera manual en Excel, lo que genera retrasos y errores. Aquí es donde la tecnología cambia el juego.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Con plataformas como Sena puedes:',
          },
        ],
      },
      {
        type: 'list',
        items: [
          'Acceder a dashboards en tiempo real con métricas como DSO, aging y tasa de recuperación.',
          'Centralizar todas las cuentas por cobrar en un solo sistema.',
          'Automatizar reportes y presentarlos fácilmente a la gerencia.',
          'Identificar tendencias antes de que se conviertan en problemas graves de liquidez.',
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Gracias a estas herramientas, los indicadores de cobranza dejan de ser estáticos y se convierten en información accionable.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Los KPIs de cobranza son mucho más que simples métricas: son la brújula que muestra si la empresa está convirtiendo ventas en liquidez real. Analizar el DSO, el aging de cartera, la tasa de recuperación y otros indicadores permite anticipar riesgos, optimizar procesos y justificar decisiones financieras.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: '¿Quieres medir tus KPIs de cobranza en tiempo real y reducir la incertidumbre en tus finanzas? ',
          },
          {
            type: 'link',
            text: 'Descubre cómo Sena puede ayudarte a transformar tu gestión',
            href: 'https://meetings.hubspot.com/francisco502',
          },
          {
            type: 'text',
            text: '.',
          },
        ],
      },
    ],
  },
  {
    id: 25,
    slug: 'descubre-como-sena-mide-el-exito-de-sus-automatizaciones-con-KPIs-de-cobranza-clave-para-optimizar-liquidez-y-eficiencia',
    title:
      '¿Cómo mide Sena el éxito de sus automatizaciones? ¿Qué KPIs de automatización de cobranza vigilan?',
    intro:
      'Automatizar la cobranza no basta: lo que marca la diferencia es saber qué KPIs automatización cobranza se están cumpliendo. En Sena, el éxito se mide con indicadores concretos que muestran si la empresa cobra más rápido, mejora su flujo de caja y reduce la carga manual del equipo.',
    date: '13 de marzo 2026',
    tags: ['Blog', 'Visión Financiera', 'Educación Financiera'],
    image: AssetImageBlog.blog_25_main.src,
    content: [
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Automatizar la cobranza no basta: lo que marca la diferencia es saber qué KPIs automatización cobranza se están cumpliendo. En Sena, el éxito se mide con indicadores concretos que muestran si la empresa cobra más rápido, mejora su flujo de caja y reduce la carga manual del equipo.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'bold',
            text: 'Medir el éxito de la automatización: la filosofía Sena',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Muchas pymes creen que automatizar es sinónimo de éxito. Pero, sin indicadores de cobranza, no hay forma de saber si las acciones digitales están generando resultados reales.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Sena conecta cada flujo automatizado con métricas de cuentas por cobrar visibles en tiempo real. Así, el éxito no se mide por la cantidad de correos enviados, sino por cómo mejoran el DSO, el aging de cartera y la tasa de recuperación.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'bold',
            text: 'KPIs automatización cobranza que Sena vigila',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'bold',
            text: '1. DSO (Days Sales Outstanding)',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Este indicador muestra cuántos días tarda en promedio una empresa en recuperar el dinero de sus ventas a crédito. Una reducción del DSO confirma que la automatización acelera la cobranza y libera liquidez.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'bold',
            text: '2. Aging de cartera',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Sena clasifica de forma automática las facturas según su antigüedad. Este KPI revela la proporción de facturas en 30, 60 o 90 días de mora y permite enfocar la gestión en clientes críticos.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'bold',
            text: '3. Tasa de recuperación',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Más allá de la automatización, lo importante es cuántas facturas realmente se cobran. Este KPI muestra si las campañas digitales logran convertir deuda en liquidez efectiva.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'bold',
            text: '4. Flujo de caja proyectado',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'La plataforma integra información de ERP y cuentas por cobrar para proyectar la liquidez disponible. Con esta visión, un CFO puede anticipar necesidades de financiamiento y planificar con datos.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'bold',
            text: '5. Eficiencia operativa',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Sena mide el impacto de las automatizaciones en el tiempo y esfuerzo del equipo. Menos horas en tareas manuales significa más capacidad para trabajar en estrategias financieras de valor.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'bold',
            text: 'Cómo Sena conecta automatización y KPIs',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Cada flujo programado --recordatorios por email, avisos vía WhatsApp o segmentaciones-- queda vinculado a los KPIs automatización cobranza. Si los pagos llegan más rápido, baja el DSO; si se reducen las facturas de más de 90 días, mejora el aging de cartera; si aumentan los montos recuperados, sube la tasa de recuperación.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'El resultado es simple: la automatización deja de ser una promesa abstracta y se convierte en datos claros y auditables.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'bold',
            text: 'Valor para CFOs y controllers',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Los gerentes financieros necesitan más que percepciones: requieren reportes confiables para tomar decisiones. Con Sena pueden:',
          },
        ],
      },
      {
        type: 'list',
        items: [
          'Monitorear en tiempo real los indicadores de cobranza.',
          'Exportar reportes automáticos para auditorías.',
          'Analizar tendencias del flujo de caja.',
          'Demostrar mejoras en eficiencia operativa gracias a la automatización.',
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Esto convierte a los KPIs automatización cobranza en aliados estratégicos para justificar decisiones y mostrar resultados medibles a la gerencia.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Automatizar la cobranza solo tiene valor cuando se traduce en mejores indicadores financieros. Sena mide el éxito de sus flujos con KPIs claros: DSO, aging de cartera, tasa de recuperación, flujo de caja proyectado y eficiencia operativa.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: '¿Quieres medir tus resultados con datos y no con suposiciones? ',
          },
          {
            type: 'link',
            text: 'Descubre cómo Sena transforma la cobranza con KPIs en tiempo real',
            href: 'https://meetings.hubspot.com/francisco502',
          },
          {
            type: 'text',
            text: '.',
          },
        ],
      },
    ],
  },
  {
    id: 26,
    slug: 'aprende-que-es-dso-como-calcularlo-y-estrategias-para-reducirlo-y-fortalecer-las-finanzas-de-tu-empresa',
    title: '¿Qué es DSO y cómo puedo reducirlo en mi empresa?',
    intro:
      'El DSO es una de las métricas financieras más influyentes para la salud de cualquier empresa, especialmente en pymes que dependen de un flujo de caja estable para crecer. Si no lo mides, puedes estar perdiendo liquidez sin darte cuenta. En este blog conocerás qué es, cómo calcularlo y las mejores estrategias para reducirlo de forma práctica.',
    date: '17 de marzo 2026',
    tags: ['Blog', 'Cobranza'],
    image: AssetImageBlog.blog_26_main.src,
    content: [
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'El ',
          },
          {
            type: 'bold',
            text: 'DSO',
          },
          {
            type: 'text',
            text: ' es una de las métricas financieras más influyentes para la salud de cualquier empresa, especialmente en pymes que dependen de un flujo de caja estable para crecer. Si no lo mides, puedes estar perdiendo liquidez sin darte cuenta. En este blog conocerás qué es, cómo calcularlo y las mejores estrategias para reducirlo de forma práctica.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'bold',
            text: '¿Qué es DSO y por qué es tan importante?',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'El DSO, también conocido como Days Sales Outstanding o Días de Venta Pendientes de Cobro, mide el promedio de días que tarda una empresa en recuperar el dinero de sus ventas a crédito.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'En términos simples, refleja ',
          },
          {
            type: 'bold',
            text: 'cuánto tiempo pasa desde que emites una factura hasta que recibes el pago',
          },
          {
            type: 'text',
            text: '. Mientras más alto sea este número, más tardan tus clientes en pagar y más presión existe sobre tu liquidez.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Para las pymes, donde cada sol o peso cuenta, un DSO elevado puede significar problemas para cubrir sueldos, pagar proveedores o invertir en crecimiento. Por eso, los CFOs y responsables financieros lo consideran un ',
          },
          {
            type: 'bold',
            text: 'KPI clave',
          },
          {
            type: 'text',
            text: ' para evaluar la eficiencia en la gestión de cuentas por cobrar.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'bold',
            text: 'Cómo calcular el DSO en tu empresa',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'El cálculo del DSO no es complejo. La fórmula más usada es:',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'bold',
            text: 'DSO = (Cuentas por cobrar / Ventas a crédito) x Número de días',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Ejemplo:',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Imagina que tu pyme tiene ',
          },
          {
            type: 'bold',
            text: '$150,000 en cuentas por cobrar',
          },
          {
            type: 'text',
            text: ' y unas ',
          },
          {
            type: 'bold',
            text: 'ventas a crédito de $450,000 en un trimestre (90 días)',
          },
          {
            type: 'text',
            text: '.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'El cálculo sería:',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'DSO = (150,000 / 450,000) x 90',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'DSO = 0.33 x 90 = ',
          },
          {
            type: 'bold',
            text: '30 días',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Esto significa que, en promedio, tardas un mes en recuperar el dinero de tus facturas.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Un DSO bajo indica que tu proceso de cobranza es eficiente. En cambio, un DSO alto puede encender alarmas sobre atrasos en los pagos o una gestión desordenada.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'bold',
            text: '¿Por qué un DSO alto es un problema para las finanzas?',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Un DSO elevado no solo refleja clientes que pagan tarde, también genera un efecto dominó en la salud financiera:',
          },
        ],
      },
      {
        type: 'list',
        items: [
          [
            {
              type: 'bold',
              text: 'Falta de liquidez inmediata',
            },
            {
              type: 'text',
              text: ': tus recursos están atrapados en cuentas por cobrar.',
            },
          ],
          [
            {
              type: 'bold',
              text: 'Mayor dependencia del crédito externo',
            },
            {
              type: 'text',
              text: ': necesitas préstamos o líneas de crédito para cubrir gastos.',
            },
          ],
          [
            {
              type: 'bold',
              text: 'Menor capacidad de inversión',
            },
            {
              type: 'text',
              text: ': sin flujo de caja, es difícil reinvertir en expansión o innovación.',
            },
          ],
          [
            {
              type: 'bold',
              text: 'Relaciones tensas con proveedores',
            },
            {
              type: 'text',
              text: ': si no puedes pagarles a tiempo, tu reputación empresarial puede verse afectada.',
            },
          ],
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'En resumen, un DSO alto es una señal de que tu empresa financia a sus clientes más de lo que debería, poniendo en riesgo su estabilidad.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'bold',
            text: 'Estrategias efectivas para reducir el DSO',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'bold',
            text: '1. Automatiza recordatorios de pago',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Enviar correos o mensajes manuales suele ser ineficiente. Al automatizar recordatorios previos y posteriores al vencimiento, tus clientes reciben avisos oportunos sin que tu equipo pierda tiempo.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'bold',
            text: '2. Implementa políticas de crédito claras',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'No todos los clientes deberían recibir los mismos plazos de pago. Define políticas diferenciadas según historial, tamaño de cliente y riesgo. Esto previene retrasos y reduce la exposición a morosidad.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'bold',
            text: '3. Ofrece incentivos por pronto pago',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Un pequeño descuento o beneficio adicional puede motivar a tus clientes a pagar antes. Aunque pierdas un margen mínimo, ganas liquidez y estabilidad.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'bold',
            text: '4. Segmenta a tus clientes',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'No todos los clientes son iguales. Prioriza la gestión sobre quienes acumulan más deuda o tienen mayor riesgo de atraso. Una segmentación inteligente ayuda a concentrar esfuerzos en donde más importa.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'bold',
            text: '5. Centraliza la información de cobranzas',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Muchas empresas aún dependen de Excel, correos dispersos o WhatsApp. Esto genera errores y pérdida de trazabilidad. Un sistema centralizado permite ordenar, controlar y reducir los tiempos de cobro.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'bold',
            text: '6. Apóyate en la tecnología',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Plataformas como ',
          },
          {
            type: 'bold',
            text: 'Sena',
          },
          {
            type: 'text',
            text: ' ofrecen dashboards en tiempo real con métricas de cobranza, permiten automatizar campañas de recordatorios y segmentar clientes por riesgo. El efecto sobre el DSO depende de tu cartera y de cuánto seguimiento hacías antes.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'bold',
            text: 'El rol de la tecnología en la gestión del DSO',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'La digitalización ha transformado la manera en que las empresas gestionan sus cuentas por cobrar. Hoy en día, ya no basta con emitir facturas y esperar. Se requiere visibilidad total y procesos proactivos.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Con Sena, por ejemplo, las pymes pueden:',
          },
        ],
      },
      {
        type: 'list',
        items: [
          'Sincronizar automáticamente facturas desde el ERP.',
          'Configurar flujos de cobranza inteligentes que envían notificaciones según reglas de negocio.',
          'Tener un registro detallado de cada interacción con clientes.',
          'Acceder a reportes de DSO, antigüedad de cartera y top morosos en tiempo real.',
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Esto no solo ayuda a reducir el DSO, sino que convierte la cobranza en una ventaja competitiva: una empresa con liquidez puede negociar mejor con proveedores, invertir en nuevos proyectos y crecer con menos fricciones.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'bold',
            text: 'Buenas prácticas complementarias',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Además de las estrategias anteriores, conviene adoptar ciertas prácticas que refuercen el control del DSO:',
          },
        ],
      },
      {
        type: 'list',
        items: [
          [
            {
              type: 'bold',
              text: 'Capacitar al equipo financiero',
            },
            {
              type: 'text',
              text: ' en métricas clave de cobranza.',
            },
          ],
          [
            {
              type: 'bold',
              text: 'Revisar periódicamente el DSO',
            },
            {
              type: 'text',
              text: ' para detectar tendencias.',
            },
          ],
          [
            {
              type: 'bold',
              text: 'Evitar concentrar ventas a crédito',
            },
            {
              type: 'text',
              text: ' en pocos clientes, diversificar reduce riesgos.',
            },
          ],
          [
            {
              type: 'bold',
              text: 'Comparar tu DSO con el promedio de tu industria',
            },
            {
              type: 'text',
              text: ': esto te da un benchmark realista.',
            },
          ],
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'El ',
          },
          {
            type: 'bold',
            text: 'DSO',
          },
          {
            type: 'text',
            text: ' es mucho más que un número: es el reflejo de qué tan eficiente es tu empresa para transformar ventas en liquidez real. Reducirlo no solo significa cobrar más rápido, también implica fortalecer tu flujo de caja, generar confianza y abrir oportunidades de crecimiento.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Las empresas que ignoran este indicador corren el riesgo de quedarse sin capital para operar, mientras que aquellas que lo gestionan de forma inteligente ganan estabilidad y competitividad.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: '¿Quieres medir y reducir tu DSO sin complicaciones? ',
          },
          {
            type: 'link',
            text: 'Descubre cómo Sena puede ayudarte a optimizar tu cobranza',
            href: 'https://meetings.hubspot.com/francisco502',
          },
          {
            type: 'text',
            text: '.',
          },
        ],
      },
    ],
  },
  {
    id: 27,
    slug: slug(
      'Conoce las diferencias entre CRM cobranza, ERP cobranza y SaaS financiero, y descubre que sistema de gestion es mejor para tu empresa'
    ),
    title: '¿Cuál es la diferencia entre CRM, ERP y SaaS para cobranza?',
    intro:
      'La gestión de cuentas por cobrar es uno de los grandes retos de cualquier pyme en crecimiento. Mientras algunas empresas confían en un CRM de cobranza, otras dependen de su ERP de cobranza, y muchas ya evalúan migrar hacia un SaaS financiero especializado. Pero, ¿cuál es la mejor opción para asegurar liquidez, automatización y control? En este artículo te mostraremos las diferencias más importantes y cómo elegir el sistema de gestión adecuado.',
    date: '20 de marzo 2026',
    tags: ['Blog', 'Producto', 'Servicio'],
    image: AssetImageBlog.blog_27_main.src,
    content: [
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'La gestión de cuentas por cobrar es uno de los grandes retos de cualquier pyme en crecimiento. Mientras algunas empresas confían en un ',
          },
          {
            type: 'bold',
            text: 'CRM de cobranza',
          },
          {
            type: 'text',
            text: ', otras dependen de su ',
          },
          {
            type: 'bold',
            text: 'ERP de cobranza',
          },
          {
            type: 'text',
            text: ', y muchas ya evalúan migrar hacia un ',
          },
          {
            type: 'bold',
            text: 'SaaS financiero',
          },
          {
            type: 'text',
            text: ' especializado. Pero, ¿cuál es la mejor opción para asegurar liquidez, automatización y control? En este artículo te mostraremos las diferencias más importantes y cómo elegir el sistema de gestión adecuado.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'bold',
            text: '¿Qué es un CRM de cobranza y qué ofrece?',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Un ',
          },
          {
            type: 'bold',
            text: 'CRM cobranza',
          },
          {
            type: 'text',
            text: ' está pensado para administrar la relación con los clientes, incluyendo recordatorios, seguimientos y comunicación. Su principal ventaja es que organiza interacciones y ayuda a no perder de vista las facturas pendientes.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Sin embargo, el alcance de un CRM cobranza suele ser limitado cuando la empresa busca métricas avanzadas como DSO, aging de cartera o proyecciones de flujo de caja. Por ello, aunque es útil como primer paso, puede quedarse corto en empresas que buscan mayor control financiero.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'bold',
            text: 'El rol del ERP en la gestión de cobranza',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'El ',
          },
          {
            type: 'bold',
            text: 'ERP cobranza',
          },
          {
            type: 'text',
            text: ' centraliza procesos administrativos y financieros en un mismo sistema. Muchos ERPs incluyen módulos para cuentas por cobrar, lo que facilita la integración con facturación, inventario y contabilidad.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Aun así, el ERP no siempre está diseñado con un enfoque especializado en cobranza. Suele carecer de funciones como segmentación de clientes morosos, reportes específicos de recuperación o flujos de recordatorios automatizados. Esto genera que las empresas terminen dependiendo de Excel para tareas críticas, reduciendo la eficiencia de la gestión.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'bold',
            text: 'SaaS financiero: especialización y automatización',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'El ',
          },
          {
            type: 'bold',
            text: 'SaaS financiero',
          },
          {
            type: 'text',
            text: ' surge como la respuesta moderna a los límites de un CRM o ERP. Estas plataformas, como Sena, están diseñadas específicamente para digitalizar la cobranza y ofrecer ',
          },
          {
            type: 'bold',
            text: 'automatización financiera',
          },
          {
            type: 'text',
            text: ' de extremo a extremo.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Algunas de sus ventajas son:',
          },
        ],
      },
      {
        type: 'list',
        items: [
          [
            {
              type: 'bold',
              text: 'Automatización de recordatorios',
            },
            {
              type: 'text',
              text: ' multicanal (email, SMS, WhatsApp).',
            },
          ],
          [
            {
              type: 'bold',
              text: 'Dashboards en tiempo real',
            },
            {
              type: 'text',
              text: ' con indicadores clave.',
            },
          ],
          [
            {
              type: 'bold',
              text: 'Proyecciones de flujo de caja',
            },
            {
              type: 'text',
              text: ' basadas en comportamiento de pago.',
            },
          ],
          [
            {
              type: 'bold',
              text: 'Segmentación inteligente',
            },
            {
              type: 'text',
              text: ' de clientes y top morosos.',
            },
          ],
          [
            {
              type: 'bold',
              text: 'Reportes exportables',
            },
            {
              type: 'text',
              text: ' listos para auditorías y presentaciones gerenciales.',
            },
          ],
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'El SaaS convierte a la cobranza en una ventaja competitiva al reducir el DSO, mejorar la tasa de recuperación y liberar al equipo de tareas manuales.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'bold',
            text: 'Diferencias clave entre CRM, ERP y SaaS',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Para simplificar la comparación, podemos resumir las ',
          },
          {
            type: 'bold',
            text: 'diferencias CRM ERP SaaS',
          },
          {
            type: 'text',
            text: ' en tres puntos:',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: '1. ',
          },
          {
            type: 'bold',
            text: 'Enfoque:',
          },
        ],
      },
      {
        type: 'list',
        items: [
          'CRM: relación con clientes.',
          'ERP: procesos administrativos globales.',
          [
            {
              type: 'text',
              text: 'SaaS: especialización en ',
            },
            {
              type: 'bold',
              text: 'sistema de gestión de cobranza',
            },
            {
              type: 'text',
              text: '.',
            },
          ],
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: '1. ',
          },
          {
            type: 'bold',
            text: 'Nivel de automatización:',
          },
        ],
      },
      {
        type: 'list',
        items: [
          'CRM: básico.',
          'ERP: limitado.',
          'SaaS: avanzado, con automatización financiera y flujos inteligentes.',
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: '1. ',
          },
          {
            type: 'bold',
            text: 'Visibilidad y métricas:',
          },
        ],
      },
      {
        type: 'list',
        items: [
          'CRM: seguimiento de interacciones.',
          'ERP: integración contable.',
          'SaaS: métricas financieras en tiempo real (DSO, aging, tasa de recuperación).',
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'bold',
            text: 'Cómo elegir el sistema de gestión adecuado',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Al evaluar opciones, considera:',
          },
        ],
      },
      {
        type: 'list',
        items: [
          'Tamaño y complejidad de tu pyme.',
          'Recursos disponibles para inversión.',
          'Necesidad de liquidez inmediata.',
          'Capacidad de tu equipo para manejar software especializado.',
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'En muchos casos, comenzar con un ',
          },
          {
            type: 'bold',
            text: 'software de cobranza para pymes',
          },
          {
            type: 'text',
            text: ' especializado puede marcar la diferencia frente a depender solo de CRM o ERP. Una ',
          },
          {
            type: 'bold',
            text: 'plataforma de cobranza',
          },
          {
            type: 'text',
            text: ' SaaS no solo organiza datos, también transforma la operación en resultados financieros visibles.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'bold',
            text: 'Sena: el SaaS que combina automatización y resultados',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Sena se posiciona como un ',
          },
          {
            type: 'bold',
            text: 'software de cobranza',
          },
          {
            type: 'text',
            text: ' diseñado para pymes que buscan ir más allá de Excel o de módulos limitados en su ERP. Al centralizar gestiones y automatizar flujos, ofrece:',
          },
        ],
      },
      {
        type: 'list',
        items: [
          [
            {
              type: 'bold',
              text: 'Menos días entre la factura emitida y el pago conciliado',
            },
            {
              type: 'text',
              text: ', porque el seguimiento deja de depender de que alguien se acuerde.',
            },
          ],
          [
            {
              type: 'bold',
              text: 'Flujo de caja más estable',
            },
            {
              type: 'text',
              text: '.',
            },
          ],
          [
            {
              type: 'bold',
              text: 'KPIs claros en dashboards',
            },
            {
              type: 'text',
              text: ' en tiempo real.',
            },
          ],
          [
            {
              type: 'bold',
              text: 'Bitácora completa de gestiones',
            },
            {
              type: 'text',
              text: ' para trazabilidad.',
            },
          ],
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'En comparación con un CRM cobranza o un ERP cobranza, Sena integra lo mejor de ambos mundos, con la fuerza de un ',
          },
          {
            type: 'bold',
            text: 'SaaS financiero',
          },
          {
            type: 'text',
            text: ' especializado.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Elegir entre un CRM, un ERP o un SaaS puede parecer complejo, pero todo depende de la prioridad de la empresa. Si buscas un sistema de relación, el CRM es un primer paso; si prefieres integración administrativa, el ERP puede servir. Pero si lo que necesitas es control, liquidez y eficiencia, el camino está en un ',
          },
          {
            type: 'bold',
            text: 'SaaS financiero especializado en cobranzas',
          },
          {
            type: 'text',
            text: '.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: '¿Quieres llevar tu cobranza a otro nivel con un software pensado para resultados? ',
          },
          {
            type: 'link',
            text: 'Descubre Sena y su plataforma de cobranza',
            href: 'https://meetings.hubspot.com/francisco502',
          },
          {
            type: 'text',
            text: '.',
          },
        ],
      },
    ],
  },
  {
    id: 28,
    slug: slug(
      'Descubre las limitaciones de un ERP de cobranza y cuando conviene migrar a una plataforma especializada para mejorar tu liquidez'
    ),
    title: '¿Tu ERP de cobranza se queda corto? 7 señales de que necesitas una plataforma dedicada',
    intro:
      'Un ERP de cobranza puede centralizar procesos básicos de facturación y cuentas por cobrar, pero ¿realmente es suficiente para una pyme en crecimiento? Cuando el sistema no ofrece indicadores financieros claros ni herramientas de automatización, es probable que se esté quedando corto. En este blog te compartimos 7 señales para detectar esas limitaciones y cómo una plataforma especializada como Sena puede marcar la diferencia.',
    date: '24 de marzo 2026',
    tags: ['Blog'],
    image: AssetImageBlog.blog_28_main.src,
    content: [
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Un ',
          },
          {
            type: 'bold',
            text: 'ERP de cobranza',
          },
          {
            type: 'text',
            text: ' puede centralizar procesos básicos de facturación y cuentas por cobrar, pero ¿realmente es suficiente para una pyme en crecimiento? Cuando el sistema no ofrece indicadores financieros claros ni herramientas de automatización, es probable que se esté quedando corto. En este blog te compartimos 7 señales para detectar esas limitaciones y cómo una plataforma especializada como Sena puede marcar la diferencia.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'bold',
            text: '¿Qué es un ERP de cobranza y cómo funciona?',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'El ',
          },
          {
            type: 'bold',
            text: 'ERP',
          },
          {
            type: 'text',
            text: ' (Enterprise Resource Planning) es un ',
          },
          {
            type: 'bold',
            text: 'sistema de gestión empresarial',
          },
          {
            type: 'text',
            text: ' que centraliza procesos como contabilidad, inventario, compras y ventas. Cuando hablamos de ',
          },
          {
            type: 'bold',
            text: 'ERP cobranza',
          },
          {
            type: 'text',
            text: ', nos referimos al módulo que gestiona las cuentas por cobrar: registra facturas, actualiza pagos y genera reportes administrativos básicos.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'En teoría, un ',
          },
          {
            type: 'bold',
            text: 'software ERP',
          },
          {
            type: 'text',
            text: ' permite integrar todas las áreas de la empresa en una sola plataforma. Sin embargo, al tratarse de una solución generalista, su módulo de cobranzas suele quedarse corto. Un ',
          },
          {
            type: 'bold',
            text: 'ERP qué es',
          },
          {
            type: 'text',
            text: ' y lo que promete no siempre coincide con lo que una empresa realmente necesita para asegurar liquidez, especialmente cuando enfrenta morosidad o falta de automatización financiera.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'bold',
            text: '7 señales de que tu ERP de cobranza no es suficiente',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'bold',
            text: '1. Dependencia de Excel para dar seguimiento',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Si tu equipo necesita exportar datos a hojas de cálculo para controlar atrasos, es una clara señal de que el ',
          },
          {
            type: 'bold',
            text: 'sistema ERP',
          },
          {
            type: 'text',
            text: ' no está resolviendo la gestión de cobranzas.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'bold',
            text: '2. Falta de indicadores clave',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Un ERP suele mostrar balances generales, pero rara vez ofrece KPIs como ',
          },
          {
            type: 'bold',
            text: 'DSO',
          },
          {
            type: 'text',
            text: ', aging de cartera o tasa de recuperación. Sin esas métricas, se vuelve difícil medir la eficiencia real.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'bold',
            text: '3. Más tiempo en tareas manuales que en análisis',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Un módulo de ',
          },
          {
            type: 'bold',
            text: 'ERP cobranza',
          },
          {
            type: 'text',
            text: ' no siempre automatiza recordatorios ni gestiona interacciones con clientes. Esto obliga al equipo a invertir horas en enviar correos o llamadas, reduciendo su eficiencia.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'bold',
            text: '4. No permite segmentar clientes morosos',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Un ',
          },
          {
            type: 'bold',
            text: 'software ERP',
          },
          {
            type: 'text',
            text: ' trata a todos los clientes de la misma manera, sin segmentar por riesgo o antigüedad de deuda. Esta carencia retrasa las estrategias de cobranza.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'bold',
            text: '5. Carece de recordatorios multicanal',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Las plataformas modernas permiten enviar recordatorios por email, SMS o WhatsApp. El ',
          },
          {
            type: 'bold',
            text: 'ERP de cobranza',
          },
          {
            type: 'text',
            text: ' tradicional no incluye estas funciones, dejando la gestión en manos del equipo.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'bold',
            text: '6. No proyecta el flujo de caja',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Un ERP puede mostrar cuánto tienes en cuentas por cobrar, pero no proyecta escenarios futuros ni analiza cómo los atrasos afectan la liquidez.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'bold',
            text: '7. Reportes limitados y poco prácticos',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Los informes del ',
          },
          {
            type: 'bold',
            text: 'software ERP',
          },
          {
            type: 'text',
            text: ' suelen ser rígidos y poco visuales. En cambio, un sistema especializado entrega dashboards en tiempo real y reportes exportables para gerencia o auditorías.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'bold',
            text: 'Limitaciones comunes del ERP en cobranzas',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'La principal limitación es que un ',
          },
          {
            type: 'bold',
            text: 'ERP financiero',
          },
          {
            type: 'text',
            text: ' fue diseñado como herramienta administrativa global, no como un sistema de cobranza especializado. Esto genera:',
          },
        ],
      },
      {
        type: 'list',
        items: [
          'Procesos poco ágiles.',
          'Escasa automatización financiera.',
          'Reportes genéricos que no responden a necesidades estratégicas.',
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Por eso, aunque el ',
          },
          {
            type: 'bold',
            text: 'ERP de cobranza',
          },
          {
            type: 'text',
            text: ' cumple con funciones básicas, no basta para empresas que buscan eficiencia y liquidez.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'bold',
            text: 'Cuándo dar el salto a un software especializado',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Si notas que tu ',
          },
          {
            type: 'bold',
            text: 'ERP',
          },
          {
            type: 'text',
            text: ' no responde a las demandas de crecimiento, es momento de considerar una ',
          },
          {
            type: 'bold',
            text: 'plataforma de cobranza',
          },
          {
            type: 'text',
            text: ' dedicada.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Las soluciones ',
          },
          {
            type: 'bold',
            text: 'SaaS de cobranza',
          },
          {
            type: 'text',
            text: ' están diseñadas específicamente para este fin. A diferencia de un ',
          },
          {
            type: 'bold',
            text: 'sistema ERP',
          },
          {
            type: 'text',
            text: ' tradicional, incluyen:',
          },
        ],
      },
      {
        type: 'list',
        items: [
          'Dashboards en tiempo real.',
          'KPIs estratégicos como DSO, aging y tasa de recuperación.',
          'Flujos automáticos de recordatorios multicanal.',
          'Segmentación de clientes según riesgo.',
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'En otras palabras, un ',
          },
          {
            type: 'bold',
            text: 'software de cobranza para pymes',
          },
          {
            type: 'text',
            text: ' especializado convierte datos dispersos en decisiones financieras inteligentes.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'bold',
            text: 'Sena: más allá del ERP de cobranza',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Sena no reemplaza tu ',
          },
          {
            type: 'bold',
            text: 'ERP',
          },
          {
            type: 'text',
            text: ', sino que lo complementa y lo supera en todo lo relacionado con cobranzas. Como ',
          },
          {
            type: 'bold',
            text: 'SaaS financiero',
          },
          {
            type: 'text',
            text: ', ofrece:',
          },
        ],
      },
      {
        type: 'list',
        items: [
          [
            {
              type: 'bold',
              text: 'Automatización financiera',
            },
            {
              type: 'text',
              text: ' completa con flujos de recordatorios.',
            },
          ],
          [
            {
              type: 'bold',
              text: 'KPIs de cobranza',
            },
            {
              type: 'text',
              text: ' visibles en dashboards en tiempo real.',
            },
          ],
          [
            {
              type: 'bold',
              text: 'Bitácora de gestiones',
            },
            {
              type: 'text',
              text: ' que aporta trazabilidad.',
            },
          ],
          [
            {
              type: 'bold',
              text: 'Proyecciones de flujo de caja',
            },
            {
              type: 'text',
              text: ' para anticipar decisiones.',
            },
          ],
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Así, lo que antes era un módulo limitado dentro del ',
          },
          {
            type: 'bold',
            text: 'software ERP',
          },
          {
            type: 'text',
            text: ', ahora se convierte en una herramienta estratégica que impacta directamente en la liquidez de la empresa.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'El ',
          },
          {
            type: 'bold',
            text: 'ERP de cobranza',
          },
          {
            type: 'text',
            text: ' puede ser útil para registrar datos, pero no es suficiente para asegurar liquidez ni para gestionar clientes morosos de manera eficiente. Si tu empresa depende demasiado de Excel, carece de métricas financieras claras o tu equipo gasta más tiempo en tareas manuales que en análisis, es hora de dar el salto.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: '¿Quieres complementar tu ERP con una solución especializada en cobranzas? ',
          },
          {
            type: 'link',
            text: 'Conoce Sena, la plataforma de cobranza SaaS diseñada para pymes en crecimiento',
            href: 'https://meetings.hubspot.com/francisco502',
          },
          {
            type: 'text',
            text: '.',
          },
        ],
      },
    ],
  },
  {
    id: 29,
    slug: slug(
      'Aprende como manejar facturas vencidas, recuperar pagos y mantener buenas relaciones con tus clientes mediante tecnicas de cobranza efectivas'
    ),
    title: '¿Cómo puedo recuperar una factura vencida sin perder al cliente?',
    intro:
      'Las facturas vencidas son uno de los mayores dolores de cabeza para las pymes. No solo afectan la liquidez, también ponen en riesgo la relación con los clientes. Sin embargo, con un enfoque profesional y herramientas adecuadas, es posible recuperar una factura vencida sin dañar la confianza comercial. En este artículo veremos estrategias prácticas para el cobro de facturas vencidas, cuándo actuar y cómo una plataforma como Sena puede ayudarte a mantener el control.',
    date: '27 de marzo 2026',
    tags: ['Producto', 'Servicio'],
    image: AssetImageBlog.blog_29_main.src,
    content: [
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Las facturas vencidas son uno de los mayores dolores de cabeza para las pymes. No solo afectan la liquidez, también ponen en riesgo la relación con los clientes. Sin embargo, con un enfoque profesional y herramientas adecuadas, es posible recuperar una factura vencida sin dañar la confianza comercial. En este artículo veremos estrategias prácticas para el cobro de facturas vencidas, cuándo actuar y cómo una plataforma como Sena puede ayudarte a mantener el control.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'bold',
            text: '¿Por qué las facturas vencidas son un problema tan común?',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'En el mundo empresarial, la morosidad es casi inevitable. Una pyme puede ofrecer excelentes productos o servicios, pero si los clientes no cumplen a tiempo con el pago de facturas vencidas, la empresa se enfrenta a:',
          },
        ],
      },
      {
        type: 'list',
        items: [
          'Problemas de flujo de caja.',
          'Dificultades para cubrir gastos fijos como nómina y proveedores.',
          'Aumento del DSO (días de venta pendientes de cobro).',
          'Tensión en la relación con los clientes.',
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'La clave no está en evitar el riesgo al 100%, sino en implementar procesos de cobranza de facturas vencidas claros, ordenados y empáticos.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'bold',
            text: 'Estrategias para recuperar una factura vencida',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'bold',
            text: '1. Comunicación proactiva y empática',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Un recordatorio amable antes del vencimiento puede evitar retrasos. Si ya pasó la fecha, es mejor mantener un tono cordial para no dañar la relación.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'bold',
            text: '2. Formaliza un plan de pagos',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'En muchos casos, el cliente no paga por falta de liquidez. Proponer cuotas o renegociar plazos puede ser más efectivo que insistir en un único cobro inmediato.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'bold',
            text: '3. Usa la tecnología a tu favor',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Las plataformas modernas permiten cobrar facturas vencidas de forma más eficiente mediante:',
          },
        ],
      },
      {
        type: 'list',
        items: [
          'Recordatorios automáticos multicanal.',
          'Segmentación de clientes según riesgo.',
          'Dashboards con métricas como aging de cartera.',
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'bold',
            text: '4. Establece políticas claras desde el inicio',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Cuando los contratos especifican consecuencias por atraso, la gestión se simplifica. Además, la transparencia genera confianza y reduce conflictos.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'bold',
            text: '5. Evalúa cuándo escalar el caso',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Si el cliente no responde después de varios intentos, puede ser necesario acudir a servicios externos. La decisión debe basarse en un análisis costo-beneficio.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'bold',
            text: 'Cómo cobrar una factura vencida sin perder al cliente',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Uno de los mayores retos es recuperar una factura sin perder al cliente. Para lograrlo:',
          },
        ],
      },
      {
        type: 'list',
        items: [
          'Evita un tono agresivo o amenazante.',
          'Personaliza los mensajes de recordatorio.',
          'Ofrece soluciones antes que sanciones.',
          'Registra todas las interacciones para mantener coherencia en la comunicación.',
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Con estas prácticas, el pago de facturas vencidas deja de ser un conflicto y se convierte en una oportunidad para reforzar la confianza.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'bold',
            text: 'Recuperar facturas vencidas con una plataforma especializada',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Las herramientas digitales hacen la diferencia entre un proceso caótico y una gestión profesional. Con Sena puedes:',
          },
        ],
      },
      {
        type: 'list',
        items: [
          'Automatizar campañas de cobranza.',
          'Acceder a reportes de cobranza de facturas vencidas en tiempo real.',
          'Clasificar clientes por antigüedad de deuda.',
          'Proyectar flujo de caja para anticipar problemas de liquidez.',
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'De esta manera, el seguimiento de facturas vencidas se convierte en un proceso ordenado, estratégico y menos desgastante para el equipo.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Las facturas vencidas no tienen por qué convertirse en una amenaza para la estabilidad de tu empresa. Con procesos claros, comunicación empática y herramientas adecuadas, es posible cobrar facturas vencidas sin deteriorar la relación con tus clientes.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: '¿Quieres dejar atrás la incertidumbre y optimizar tu cobranza? ',
          },
          {
            type: 'link',
            text: 'Conoce Sena y su solución para la gestión de facturas vencidas',
            href: 'https://meetings.hubspot.com/francisco502',
          },
          {
            type: 'text',
            text: '.',
          },
        ],
      },
    ],
  },
  {
    id: 30,
    slug: slug(
      'Descubre los riesgos de no cobrar una deuda a tiempo y como afectan el flujo de caja, la rentabilidad y las relaciones comerciales de tu empresa'
    ),
    title: '¿Qué pasa si no cobro una deuda a tiempo? Riesgos ocultos para tu pyme?',
    intro:
      'Retrasar la cobranza puede parecer un detalle menor, pero los riesgos de no cobrar una deuda se acumulan y terminan poniendo en jaque la estabilidad financiera de cualquier pyme. Con frecuencia, los dueños de negocio piensan que esperar un poco más no traerá consecuencias; sin embargo, lo que realmente ocurre es que el flujo de caja se deteriora, las pérdidas aumentan y las relaciones con los clientes se tensan.',
    date: '31 de marzo 2026',
    tags: ['Blog'],
    image: AssetImageBlog.blog_30_main.src,
    content: [
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Retrasar la cobranza puede parecer un detalle menor, pero los ',
          },
          {
            type: 'bold',
            text: 'riesgos de no cobrar una deuda',
          },
          {
            type: 'text',
            text: ' se acumulan y terminan poniendo en jaque la estabilidad financiera de cualquier pyme. Con frecuencia, los dueños de negocio piensan que esperar un poco más no traerá consecuencias; sin embargo, lo que realmente ocurre es que el flujo de caja se deteriora, las pérdidas aumentan y las relaciones con los clientes se tensan.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'En este artículo se explicará en detalle qué sucede cuando una factura queda pendiente por mucho tiempo, cuáles son los efectos invisibles que se generan y cómo prevenirlos con una gestión más estratégica.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'bold',
            text: 'Riesgos de no cobrar una deuda: un problema más común de lo que parece',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'En la mayoría de las pymes, la prioridad diaria se centra en vender más y atender clientes, pero no siempre en ',
          },
          {
            type: 'bold',
            text: 'cobrar deudas a tiempo',
          },
          {
            type: 'text',
            text: '. Cuando se deja pasar una factura vencida, se instala un efecto dominó: la liquidez se reduce, las obligaciones internas se complican y la empresa comienza a depender de créditos externos.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'El riesgo mayor no está en una sola factura sin pagar, sino en la acumulación de atrasos. Las estadísticas muestran que mientras más tiempo transcurre, menor es la probabilidad de recuperación. Por lo tanto, lo que al inicio parece un simple retraso, termina convirtiéndose en un ',
          },
          {
            type: 'bold',
            text: 'problema estructural de flujo de caja afectado',
          },
          {
            type: 'text',
            text: '.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'bold',
            text: '¿Qué pasa si no cobro una deuda en mi pyme?',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Para comprender la magnitud del problema, conviene observar tres escenarios habituales que enfrentan las pequeñas y medianas empresas:',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: '1. ',
          },
          {
            type: 'bold',
            text: 'Pérdidas financieras inevitables',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Cuando un pago no se recupera a tiempo, el dinero deja de estar disponible para el negocio. Aunque se insista en cobrar, la experiencia demuestra que mientras más antigua es la deuda, menor es la tasa de recuperación. En consecuencia, los ingresos proyectados nunca se concretan y las pérdidas se consolidan.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: '2. ',
          },
          {
            type: 'bold',
            text: 'Deterioro del flujo de caja',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'El retraso en el ingreso de efectivo afecta directamente la capacidad de la empresa para cubrir gastos fijos como salarios, impuestos o proveedores. Se produce, por lo tanto, un círculo vicioso: la falta de liquidez obliga a buscar financiamiento externo y este financiamiento incrementa los costos operativos.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: '3. ',
          },
          {
            type: 'bold',
            text: 'Relaciones comerciales desgastadas',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'La presión por el pago genera tensión entre empresa y cliente. Si la cobranza se maneja tarde y de forma improvisada, la confianza se erosiona. Lo que pudo resolverse con una comunicación proactiva se convierte en un conflicto difícil de gestionar.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'bold',
            text: 'Consecuencias de no cobrar una deuda: señales de alerta',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Quienes se preguntan ',
          },
          {
            type: 'bold',
            text: 'qué pasa si no cobro una deuda',
          },
          {
            type: 'text',
            text: ' deben identificar las señales tempranas que revelan una gestión de cobros deficiente:',
          },
        ],
      },
      {
        type: 'list',
        items: [
          'Facturas vencidas que superan los 30 o 60 días sin seguimiento.',
          'Dependencia excesiva de Excel para registrar cuentas por cobrar.',
          'Ausencia de métricas clave como aging de cartera o DSO.',
          'Clientes que repiten patrones de atraso sin recibir una estrategia diferenciada.',
          'Equipo financiero saturado con tareas manuales y poco análisis estratégico.',
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Estas señales no deben ser ignoradas. Cada día que pasa, el costo oculto de la morosidad se acumula, afectando no solo el dinero disponible, sino también la capacidad de tomar decisiones estratégicas.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'bold',
            text: 'Riesgos financieros y operativos de la morosidad',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'El impacto de las ',
          },
          {
            type: 'bold',
            text: 'deudas no cobradas a tiempo',
          },
          {
            type: 'text',
            text: ' se manifiesta en distintos niveles:',
          },
        ],
      },
      {
        type: 'list',
        items: [
          [
            {
              type: 'bold',
              text: 'Liquidez reducida:',
            },
            {
              type: 'text',
              text: ' los recursos que deberían estar en caja permanecen retenidos en cuentas incobrables.',
            },
          ],
          [
            {
              type: 'bold',
              text: 'Mayor riesgo de impago definitivo:',
            },
            {
              type: 'text',
              text: ' después de 90 días, las probabilidades de recuperar una deuda caen de forma significativa.',
            },
          ],
          [
            {
              type: 'bold',
              text: 'Incremento de costos administrativos:',
            },
            {
              type: 'text',
              text: ' más tiempo y esfuerzo se destinan a tareas de persecución de pagos.',
            },
          ],
          [
            {
              type: 'bold',
              text: 'Desconfianza del mercado:',
            },
            {
              type: 'text',
              text: ' proveedores y entidades financieras perciben mayor riesgo en una empresa con altos niveles de morosidad.',
            },
          ],
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'En otras palabras, las ',
          },
          {
            type: 'bold',
            text: 'consecuencias de no cobrar una deuda',
          },
          {
            type: 'text',
            text: ' no se limitan al corto plazo; también afectan la reputación y la competitividad de la empresa en el mercado.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'bold',
            text: 'Cómo evitar los riesgos de no cobrar una deuda',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Aunque la morosidad nunca se elimina por completo, sí puede controlarse con prácticas adecuadas:',
          },
        ],
      },
      {
        type: 'list',
        items: [
          [
            {
              type: 'bold',
              text: 'Políticas de crédito claras:',
            },
            {
              type: 'text',
              text: ' establecer plazos, penalidades y condiciones desde el inicio reduce la ambigüedad.',
            },
          ],
          [
            {
              type: 'bold',
              text: 'Recordatorios preventivos:',
            },
            {
              type: 'text',
              text: ' no esperar a que la factura venza para comunicarse con el cliente.',
            },
          ],
          [
            {
              type: 'bold',
              text: 'Planes de pago flexibles:',
            },
            {
              type: 'text',
              text: ' en lugar de perder al cliente, puede proponerse un esquema escalonado.',
            },
          ],
          [
            {
              type: 'bold',
              text: 'Uso de indicadores financieros:',
            },
            {
              type: 'text',
              text: ' medir el aging de cartera, el DSO y la tasa de recuperación facilita la toma de decisiones.',
            },
          ],
          [
            {
              type: 'bold',
              text: 'Automatización del proceso:',
            },
            {
              type: 'text',
              text: ' la tecnología permite enviar recordatorios automáticos, segmentar clientes y proyectar escenarios de liquidez.',
            },
          ],
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Sin estas prácticas, los ',
          },
          {
            type: 'bold',
            text: 'riesgos de no cobrar una deuda',
          },
          {
            type: 'text',
            text: ' aumentan considerablemente, comprometiendo la salud de la empresa.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'bold',
            text: 'Sena: una solución frente a los riesgos de morosidad',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Para una pyme, depender únicamente de planillas o de un ERP genérico puede resultar insuficiente. Sena surge como un ',
          },
          {
            type: 'bold',
            text: 'SaaS especializado en cobranza',
          },
          {
            type: 'text',
            text: ', diseñado para reducir la morosidad y evitar que las ',
          },
          {
            type: 'bold',
            text: 'deudas no cobradas a tiempo',
          },
          {
            type: 'text',
            text: ' afecten la estabilidad financiera.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Entre sus principales ventajas se destacan:',
          },
        ],
      },
      {
        type: 'list',
        items: [
          [
            {
              type: 'bold',
              text: 'Automatización completa de la cobranza',
            },
            {
              type: 'text',
              text: ' con recordatorios multicanal.',
            },
          ],
          [
            {
              type: 'bold',
              text: 'Dashboards en tiempo real',
            },
            {
              type: 'text',
              text: ' con KPIs estratégicos como DSO y aging de cartera.',
            },
          ],
          [
            {
              type: 'bold',
              text: 'Segmentación de clientes morosos',
            },
            {
              type: 'text',
              text: ' según riesgo y antigüedad.',
            },
          ],
          [
            {
              type: 'bold',
              text: 'Proyecciones claras de flujo de caja',
            },
            {
              type: 'text',
              text: ' que anticipan escenarios futuros.',
            },
          ],
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Gracias a estas funciones, el seguimiento de cuentas por cobrar se transforma en un proceso estratégico y no reactivo. En lugar de descubrir demasiado tarde los efectos negativos, la empresa actúa de forma anticipada.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'bold',
            text: 'Ejemplo práctico: dos pymes, dos realidades',
          },
        ],
      },
      {
        type: 'list',
        items: [
          [
            {
              type: 'bold',
              text: 'Pyme A:',
            },
            {
              type: 'text',
              text: ' deja pasar las facturas vencidas más de 60 días sin estrategia. Resultado: su flujo de caja se colapsa y debe recurrir a créditos externos costosos.',
            },
          ],
          [
            {
              type: 'bold',
              text: 'Pyme B:',
            },
            {
              type: 'text',
              text: ' implementa Sena, automatiza la cobranza y segmenta clientes por riesgo. Resultado: reduce su DSO en 30%, recupera liquidez y logra invertir en crecimiento.',
            },
          ],
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Este ejemplo muestra cómo las decisiones de cobranza marcan la diferencia entre sobrevivir con deudas acumuladas o crecer con estabilidad.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Los ',
          },
          {
            type: 'bold',
            text: 'riesgos de no cobrar una deuda',
          },
          {
            type: 'text',
            text: ' son reales y profundos: pérdida de liquidez, desgaste en las relaciones comerciales, aumento de costos y daño a la reputación. Lo que comienza como un simple atraso se convierte en una amenaza para la continuidad del negocio si no se actúa con rapidez.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'La gestión de cuentas por cobrar no debe verse como un trámite administrativo, sino como una estrategia central para garantizar el futuro de la empresa.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: '¿Quieres evitar que las facturas vencidas se conviertan en un problema para tu pyme? ',
          },
          {
            type: 'link',
            text: 'Conoce Sena y transforma tu cobranza en un proceso automatizado y estratégico',
            href: 'https://meetings.hubspot.com/francisco502',
          },
          {
            type: 'text',
            text: '.',
          },
        ],
      },
    ],
  },
  {
    id: 31,
    slug: slug('Cobrar no deberia ser lo mas dificil de tu negocio'),
    title: 'Cobrar no debería ser lo más difícil de tu negocio',
    intro:
      'Hay plata que ya ganaste pero que todavía no está en tu cuenta. Entregaste el servicio, cumpliste con lo prometido, y aun así estás esperando.',
    date: '10 de abril 2026',
    tags: ['Sena', 'Blog'],
    image: AssetImageBlog.blog_29_main.src,
    content: [
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Hay plata que ya ganaste pero que todavía no está en tu cuenta. Entregaste el servicio, cumpliste con lo prometido, y aun así estás esperando. Ese es el momento en que la cobranza deja de ser un tema de otras industrias y se convierte en tu problema.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'La cobranza existe porque el dinero no siempre llega cuando debería. Mecanismos de pago ineficientes, ventas a crédito sin seguimiento, contrapartes que simplemente no priorizan pagar: todo eso acumula deuda en la calle y presión en tu caja.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Y no es un problema nuevo. Sale en la biblia, aparece en los titulares de hoy.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: '¿Suena familiar? No es casualidad: la cobranza apareció hasta en el caso CAE, en la SUCC (sistema único de cobranza de cotizaciones), en la Ley de prefijos telefónicos, en el debate sobre el pago a 30 días y en la figura del Abogado González. Es un tema que cruza emprendedores, pymes y política económica por igual.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'En el mundo de los negocios, la deuda que no se gestiona mata empresas. Pero hacerlo mal también. Una cobranza hostil o ineficiente puede costarte el cliente que más trabajo te costó conseguir.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Eso es exactamente lo que queremos cambiar con Sena. No se trata solo de lograr que las facturas ingresen a una cuenta bancaria. Se trata de que tu negocio siga creciendo, con tu flujo de caja ordenado y tus relaciones comerciales intactas. Cobrar bien es una especialidad. Y esa es la nuestra.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: '¿Quieres ver cómo funciona Sena en tu operación? ',
          },
          {
            type: 'link',
            text: 'Agenda una demo aquí',
            href: 'https://meetings.hubspot.com/francisco502',
          },
          {
            type: 'text',
            text: '.',
          },
        ],
      },
    ],
  },
  {
    id: 32,
    slug: slug('Cuando ya vendiste pero el dinero todavia no llega'),
    title: 'Cuando ya vendiste, pero el dinero todavía no llega',
    intro:
      'El vibecoding abrió una puerta que antes era impensable. Pero esa misma agilidad choca con una realidad que la tecnología todavía no resuelve: cobrar.',
    date: '14 de abril 2026',
    tags: ['Sena', 'Educación Financiera'],
    image: AssetImageBlog.blog_30_main.src,
    content: [
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'El vibecoding —la práctica de crear software con ayuda de inteligencia artificial, sin necesitar un equipo técnico completo— ha abierto una puerta que antes era impensable: emprendedores que, prácticamente solos, construyen soluciones digitales y las venden a grandes empresas. Conocemos a varios.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Pero esa misma agilidad choca con una realidad que la tecnología todavía no resuelve: cobrar.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Hay una historia en particular que nos hizo entender la magnitud del problema. Sofi es emprendedora de tecnología, lleva dos años trabajando con el mismo cliente corporativo, con contratos bien establecidos. La deuda acumulada por facturas impagas superaba los $8 millones de pesos, con más de 60 días de atraso. Mientras esperaba ese pago, siguió operando, pagando arriendo, sueldos y proveedores con sus propios recursos. Hasta que llegó la gota que rebalsó el vaso: un empleado la demandó por no pago de cotizaciones. La multa fue de casi $20 millones de pesos. Para una empresa de su tamaño, eso no es solo un problema financiero. Es una crisis existencial.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Abogados, negociaciones, estrés, conflictos laborales, multas, quiebra. Más o menos así termina la historia.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Su historia no es la excepción. Acorde a la última encuesta de Propyme, más del 60% de las mipymes cerró el primer trimestre de 2026 con inyección de recursos personales. Cerca del 27% solicitó un crédito bancario. El 22% no pudo pagar sus obligaciones laborales.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'El impacto del no pago no se queda en el balance: se traslada a los equipos, a los proveedores, a los clientes finales. Cuando una gran empresa o el Estado retrasan sus pagos, asfixian cadenas completas de valor que generan empleo y productividad.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'La cobranza es mucho más que enviar recordatorios. Consiste en anticiparse, en llegar a la persona adecuada, en mostrar procesos que transmiten seriedad. Y sobre todo, en proteger las relaciones comerciales que costó construir.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'En Sena trabajamos con emprendedoras como Sofi todos los días. Les ayudamos a dejar de perseguir pagos y volver al trabajo que realmente importa. Si estás en una situación similar, ',
          },
          {
            type: 'link',
            text: 'agenda una demo y cuéntanos qué está pasando en tu cartera',
            href: 'https://meetings.hubspot.com/francisco502',
          },
          {
            type: 'text',
            text: '.',
          },
        ],
      },
    ],
  },
  {
    id: 34,
    slug: 'cuanto-cuesta-externalizar-la-cobranza-en-chile',
    title: '¿Cuánto cuesta externalizar la cobranza en Chile?',
    intro:
      'En Chile puedes externalizar la cobranza con tres modelos de precio: comisión por éxito, cuota mensual o híbrido. Aquí están los números, lo que debe incluir el servicio, y lo que cobra Sena.',
    date: '07 de octubre 2026',
    tags: ['Blog', 'Cobranza', 'Externalización'],
    image: AssetImageBlog.blog_31_main.src,
    lector: 'micro-empresa-sin-equipo',
    faq: [
      {
        question: '¿Cuánto cobra Sena por externalizar la cobranza?',
        answer:
          'Depende del servicio. Ópera parte desde US$50 al mes para carteras con menos de 10 relaciones (clientes activos). Para equipos que gestionan más de 50 relaciones, el precio de configuración estándar parte en US$300 al mes. Recupera no tiene cuota mensual: cobra el 15% sobre el monto que se recupera efectivamente.',
      },
      {
        question: '¿Hay costo si no recuperan nada?',
        answer:
          'No. Recupera opera con modelo de comisión por éxito: solo pagas el 15% si logramos recuperar. Si no hay recuperación, no hay cobro.',
      },
      {
        question: '¿El 15% de Recupera aplica sobre el total de la factura o sobre lo que se recupera?',
        answer:
          'Sobre lo recuperado efectivamente. Si una factura de $5 millones se recupera en su totalidad, la comisión es $750.000.',
      },
      {
        question: '¿El precio de Ópera varía según el tamaño de mi cartera?',
        answer:
          'Sí. El precio escala con la cantidad de relaciones que necesitas gestionar. Carteras de menos de 10 relaciones parten en US$50 al mes; carteras de más de 50 relaciones parten en US$300 con configuración estándar. Para requerimientos específicos, el precio se define caso a caso.',
      },
      {
        question: '¿Qué diferencia hay entre Ópera y Recupera?',
        answer:
          'Ópera es un servicio mensual para complementar o reemplazar la capacidad de cobranza de tu equipo: gestiona facturas activas y vencidas de forma continua. Recupera está pensado para carteras con antigüedad —en general, más de 90 días de vencimiento— y no tiene cuota fija: solo pagas si se recupera.',
      },
    ],
    content: [
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'En Chile, puedes encontrar tres modelos de precio por externalizar la cobranza: comisión por éxito (6-19% sobre lo recuperado), cuota mensual fija y un modelo híbrido. En Sena, nuestro servicio de externalización inteligente llamado ',
          },
          { type: 'link', text: 'Ópera', href: '/opera' },
          {
            type: 'text',
            text: ' parte desde los US$50 al mes para carteras pequeñas y sube de acuerdo a la cantidad de relaciones que gestionas (relaciones = clientes); ',
          },
          { type: 'link', text: 'Recupera', href: '/recupera' },
          {
            type: 'text',
            text: ' funciona en base a una comisión del 15% sobre lo recuperado, sin costo fijo. Sigue leyendo para más detalles respecto a los diferentes modelos y las prestaciones que debieran tener.',
          },
        ],
      },
      {
        type: 'title',
        text: '¿Qué modelos de precio existen para externalizar la cobranza en Chile?',
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Después de abrir varias páginas que ofrecen el servicio de cobranza, es probable que aún no tengas claro cuánto sale externalizar y sobre todo automatizar la cobranza dentro de tu área. La mayoría de los servicios requieren hacer un análisis de tu cartera para definir un precio, donde revisarán: tamaño de la cartera, vencimientos, contrapartes y también puede incluir análisis de riesgo.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [{ type: 'text', text: 'Existen tres modelos de precios para la cobranza en Chile:' }],
      },
      {
        type: 'list',
        items: [
          [
            { type: 'bold', text: 'Comisión por éxito: ' },
            {
              type: 'text',
              text: 'Este servicio está enfocado en recuperar facturas vencidas, que tienen más de 90 días de antigüedad. La comisión varía entre 6-19% (tarifas de mercado disponibles públicamente) dependiendo de la antigüedad, monto y contraparte. Algunos servicios cobran un fee mínimo, pero por lo general, se cobra solo la comisión de éxito. Es recomendable cuando son facturas específicas y/o casos puntuales de cobranza.',
            },
          ],
          [
            { type: 'bold', text: 'Cuota mensual fija: ' },
            {
              type: 'text',
              text: 'El servicio se cobra como una mensualidad y está pensado para aquellas áreas que requieren un servicio que complemente su capacidad de cobranza. Por lo general, son equipos que tienen repartida su información en diferentes SaaS o planillas excel y buscan un lugar donde se centralice toda la cobranza.',
            },
          ],
          [
            { type: 'bold', text: 'Híbrido: ' },
            {
              type: 'text',
              text: 'Es una mezcla entre una cuota mensual y una comisión por éxito. Esto es especialmente relevante cuando se tienen carteras dinámicas, períodos de alta demanda y por lo tanto, consumos variables dentro del servicio de cobranza.',
            },
          ],
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Tanto la modalidad de cuota mensual como híbrido son útiles cuando se está evaluando aumentar la capacidad de cobranza de la empresa y quieres tener algo disponible y accesible, o bien aumentar las capacidades técnicas a través de herramientas, dejando la toma de decisiones dentro de tu equipo de cobranza.',
          },
        ],
      },
      {
        type: 'title',
        text: '¿Qué incluye el precio y qué preguntar antes de contratar?',
      },
      {
        type: 'paragraph',
        fragments: [
          { type: 'text', text: 'Un buen servicio de cobranza externo debiese contar con al menos:' },
        ],
      },
      {
        type: 'list',
        items: [
          [
            { type: 'bold', text: 'Canales de contacto: ' },
            { type: 'text', text: 'WhatsApp, email, llamadas.' },
          ],
          [
            { type: 'bold', text: 'Reportería del proceso: ' },
            {
              type: 'text',
              text: 'Un dashboard o panel de control que permita visualizar todas las gestiones y salud de la cartera.',
            },
          ],
          [
            { type: 'bold', text: 'Frecuencia de gestión: ' },
            {
              type: 'text',
              text: 'Debe estar alineado con las políticas de la empresa y además con las diversas regulaciones relacionadas con la cobranza.',
            },
          ],
          [
            { type: 'bold', text: 'Conciliación: ' },
            { type: 'text', text: 'Identificar pagos y asociarlos a facturas pendientes.' },
          ],
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Los servicios de cobranza más modernos incorporan inteligencia artificial para aumentar la capacidad de su solución, hacerlos más eficientes o escalables. Es ideal que estos servicios incorporen la mirada de compliance dentro del producto.',
          },
        ],
      },
      {
        type: 'title',
        text: '¿Cuánto cuesta externalizar la cobranza en Sena?',
      },
      {
        type: 'paragraph',
        fragments: [
          { type: 'text', text: 'En Sena, el servicio de externalización de cobranza se llama ' },
          { type: 'link', text: 'Ópera', href: '/opera' },
          {
            type: 'text',
            text: ': un sistema automatizado e inteligente que analiza tu cartera buscando aumentar tu capacidad de cobranza y gestión de caja.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Ópera parte desde los US$50 para empresas con menos de 10 relaciones, donde las relaciones son la cantidad de clientes de la cartera.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Lo que debes considerar para evaluar si es un servicio conveniente para ti: en promedio, un ejecutivo de cobranza tiene un costo de entre $850.000 y $1.000.000 al mes (Trabajando.com, septiembre 2026). Por otro lado, un ejecutivo es capaz de gestionar alrededor de 50 relaciones al mes, según la operación de Sena.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Con Ópera, gestionar más de 50 relaciones parte en los US$300 al mes, con la configuración estándar. Para configuraciones específicas, el precio puede variar dependiendo de los requerimientos.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [{ type: 'text', text: 'Si lo que buscas es:' }],
      },
      {
        type: 'list',
        items: [
          'Hacer más eficiente la cobranza dentro de tu equipo',
          'Disminuir las facturas vencidas y con problemas de recaudación',
          'O aumentar la capacidad de tu equipo por crecimiento o por peaks de demanda',
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Entonces definitivamente te conviene evaluar un servicio de externalización de cobranza. ',
          },
          {
            type: 'link',
            text: 'Agenda un demo con nuestro equipo comercial',
            href: 'https://meetings.hubspot.com/francisco502',
          },
          {
            type: 'text',
            text: ' para evaluar tu negocio y ver si te podemos apoyar en tu cobranza.',
          },
        ],
      },
    ],
  },
  {
    id: 33,
    slug: slug('Tu equipo vende pero quien cobra'),
    title: 'Tu equipo vende, pero ¿quién cobra?',
    intro:
      'En muchas empresas existe un conflicto silencioso y permanente entre el equipo comercial y el equipo financiero. Ninguno está equivocado. Pero tampoco se ponen de acuerdo.',
    date: '17 de abril 2026',
    tags: ['Sena', 'Cobranza', 'Blog'],
    image: AssetImageBlog.blog_28_main.src,
    content: [
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'En muchas empresas existe un conflicto silencioso y permanente entre dos áreas que deberían trabajar juntas: el equipo comercial y el equipo financiero. Los primeros quieren vender más, abrir nuevos clientes, extender crédito. Los segundos quieren ver los ingresos en la caja, restringir la cartera morosa y cuidar el inventario. Ninguno está equivocado. Pero tampoco se ponen de acuerdo.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Este conflicto es especialmente intenso en empresas con venta en terreno: distribuidoras de alimentos, bebidas, ropa, insumos, cualquier industria donde un equipo de vendedores recorre el país entregando productos a crédito. Equipos numerosos, cobertura regional, ciclos de pago largos. Un modelo que genera crecimiento rápido, pero que sin gestión activa de cobranza puede convertirse en un problema de flujo de caja mayor.',
          },
        ],
      },
      {
        type: 'subtitle',
        text: '¿Cómo cobrar sin perder clientes ni frenar las ventas?',
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'La respuesta es profesionalizar la cobranza. Eso significa tecnología y equipo trabajando en paralelo, no compitiendo.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Empresas con equipo interno de cobranza pero sin herramientas: ya tienen la cultura, les falta la plataforma. Sena les entrega un sistema de gestión robusto más agentes especializados que se adaptan al tamaño y complejidad de su cartera.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Empresas más pequeñas que necesitan externalizar todo: no quieren gestionar cobranza internamente en ninguna etapa. Lo que buscan es un equipo externo de alta confianza que entienda su modelo de negocio, sus términos de crédito y sus ciclos de venta, y que actúe como una extensión de su operación.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Vale la pena agregar que hay algo que la inteligencia artificial todavía no reemplaza: las relaciones humanas. En el mundo B2B, cobrar bien requiere entender el contexto del cliente, saber cuándo insistir y cuándo esperar, hablar con la persona indicada. Eso no se automatiza del todo, y por eso el equipo sigue siendo central en cualquier estrategia de cobranza.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Cuando esto se hace bien, todos ganan: el equipo comercial puede seguir vendiendo, el equipo financiero ve la caja ordenada y el cliente siente que lo tratan con respeto.',
          },
        ],
      },
      {
        type: 'paragraph',
        fragments: [
          {
            type: 'text',
            text: 'Eso es exactamente lo que construimos en Sena: que el arte de cobrar sea nuestro sello, para que el tuyo sea crecer. ¿Quieres saber cómo lo hacemos? ',
          },
          {
            type: 'link',
            text: 'Conversemos',
            href: 'https://meetings.hubspot.com/francisco502',
          },
          {
            type: 'text',
            text: '.',
          },
        ],
      },
    ],
  },
]

export const getBlogPostsSorted = () => {
  return [...blogPosts].sort((a, b) => {
    const dateA = parseSpanishDate(a.date)
    const dateB = parseSpanishDate(b.date)
    return dateB.getTime() - dateA.getTime()
  })
}

export const getFeaturedPost = () => {
  return blogPosts.find((post) => post.id === featuredPostId) || blogPosts[0]
}

export const getOtherPosts = () => {
  return blogPosts.filter((post) => post.id !== featuredPostId)
}
