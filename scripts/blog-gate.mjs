#!/usr/bin/env node
/**
 * Puerta de publicación del blog.
 *
 * Esto NO es un agente y no debería serlo. El error que este archivo existe
 * para detener ya fue detectado por un agente las dos veces que ocurrió — y las
 * dos veces se publicó igual, porque quedó escrito como "PENDIENTE" en el
 * cuerpo de un commit y nadie lee eso antes de mergear:
 *
 *   1d52578 — "PENDIENTE: la imagen sigue siendo blog_20_main.webp, que muestra
 *              a una persona pagando con tarjeta. Es consumidor final y B2C: no
 *              corresponde al post. Hay que reemplazar el archivo antes del merge."
 *              → se mergeó igual; corregido 10 minutos después en 352a8e4.
 *
 *   d3b7e5b — "PENDIENTE: la imagen del post 21 es un semáforo de score... el
 *              artículo argumenta justamente que un score no es un semáforo, así
 *              que la imagen contradice la tesis."
 *              → se mergeó igual; corregido 3 horas después en 5a91fe1.
 *
 * Detectar no era el problema. Detener sí. Los checks de acá convierten esa
 * observación en una salida distinta de cero, que es lo único que un merge
 * respeta.
 *
 * Corre sobre el fuente, no sobre el build: no necesita servidor ni red.
 *
 *   npm run blog:gate
 *
 * Salida 1 si algo falla.
 */

import { readFileSync, existsSync, statSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { join } from 'node:path'

const DATA = 'src/lib/data/blogPosts.ts'
const IMG_DIR = 'public/images/Blog'

// Umbrales calibrados contra las 28 imágenes que ya existen: la más pesada son
// 194 KB y la de ratio más bajo es 2048x1714 (1,19). Los límites pasan todo lo
// actual y atrapan el caso real: un PNG vertical de 928x1152 y 1,6 MB.
const PESO_MAX_KB = 250
const RATIO_MIN = 1.1

/*
  Contra qué rama se compara para saber qué trae esta rama. En local es `dev`;
  en CI es la rama base del PR, que la pasa el workflow. Sin esto el gate se
  saltaría los checks de "lo tocado" en cualquier PR contra staging o main.
*/
const BASE = process.env.GATE_BASE || 'origin/dev'

/*
  Los lectores válidos son los cinco ICP de Sena. Los cinco son acreedores:
  quien cobra su propia cartera, o quien cobra la de sus mandantes. La fuente
  canónica de los perfiles es sena-brain (03_Clientes/ICP_principal.md) — acá
  van solo las etiquetas, sin nombres de cuentas ni precios, porque este repo
  es público.

  Que la lista NO tenga "deudor" ni "consumidor-final" es el punto: es lo que
  convierte el error de audiencia en una falla y no en una opinión.
*/
const LECTORES = [
  'pyme-que-cobra', //             PYME en expansión, gestiona su propia cartera
  'micro-empresa-sin-equipo', //   founder que vende y entrega, nadie dedicado a cobrar
  'distribuidora-con-fuerza-de-venta', // cobranza repartida y sin dueño
  'enterprise-con-erp', //         corporativo con ERP global, Sena como capa
  'empresa-de-cobranza', //        cobra la cartera de sus mandantes (B2B2B)
]

// ── Infraestructura mínima de aserciones ─────────────────────────────────────

const errores = []
const avisos = []
let checksCorridos = 0

function check(nombre, fn) {
  checksCorridos++
  try {
    const problemas = fn() || []
    const fallas = problemas.filter((p) => !p.aviso)
    const warns = problemas.filter((p) => p.aviso)
    for (const p of fallas) errores.push({ nombre, msg: p.msg })
    for (const p of warns) avisos.push({ nombre, msg: p.msg })
    const marca = fallas.length ? '✗' : warns.length ? '!' : '✓'
    console.log(`  ${marca} ${nombre}`)
  } catch (e) {
    errores.push({ nombre, msg: `el check lanzó: ${e.message}` })
    console.log(`  ✗ ${nombre}  (error interno)`)
  }
}

const falla = (msg) => ({ msg, aviso: false })
const avisa = (msg) => ({ msg, aviso: true })

// ── Parseo de los posts ──────────────────────────────────────────────────────

/*
  blogPosts.ts es TypeScript y sus imports resuelven con alias `@/public/...`,
  así que no se puede importar desde node plano. Se lee como texto.

  El archivo tiene posts vivos y posts comentados con `//`. Solo cuentan los
  vivos: un post comentado no se publica y no tiene por qué declarar nada.
*/
function leerPosts() {
  const lineas = readFileSync(DATA, 'utf8').split(/\r?\n/)
  const posts = []
  let actual = null
  let profundidad = 0

  for (let i = 0; i < lineas.length; i++) {
    const linea = lineas[i]
    if (/^\s*\/\//.test(linea)) continue // comentada: el post no está vivo

    if (actual === null) {
      // Un post arranca en una línea que es solo `{` con indentación 2.
      if (/^ {2}\{\s*$/.test(linea)) {
        actual = { desde: i + 1, texto: [], campos: {} }
        profundidad = 1
      }
      continue
    }

    // Dentro de un post: contamos llaves para saber dónde termina.
    for (const c of linea) {
      if (c === '{') profundidad++
      else if (c === '}') profundidad--
    }
    actual.texto.push(linea)

    /*
      Los campos se declaran a indentación 4. Varios se escriben en más de una
      línea (`slug(\n  'texto',\n)`), así que el valor se acumula hasta que
      aparece el campo siguiente. Sin esto los slugs multilínea se leían como
      "slug(" y los mensajes de error no nombraban el post.
    */
    const campo = linea.match(/^\s{4}([A-Za-z_][A-Za-z0-9_]*):\s*(.*)$/)
    if (campo) {
      actual.campoAbierto = campo[1]
      actual.campos[campo[1]] = campo[2].trim()
    } else if (actual.campoAbierto && /^\s{6}\S/.test(linea)) {
      actual.campos[actual.campoAbierto] += ' ' + linea.trim()
    }

    if (/^\s{4}bloqueos:/.test(linea)) actual.campos.bloqueos = true

    if (profundidad === 0) {
      actual.cuerpo = actual.texto.join('\n')
      posts.push(actual)
      actual = null
    }
  }
  return posts
}

const posts = leerPosts()

const limpiar = (v) =>
  (v || '')
    .replace(/,$/, '')
    .replace(/^slug\(\s*/, '')
    .replace(/\s*\)$/, '')
    .replace(/^['"]|['"]$/g, '')
    .trim()

const idDe = (p) => limpiar(p.campos.id) || `línea ${p.desde}`
const nombreDe = (p) => {
  const etiqueta = limpiar(p.campos.slug) || limpiar(p.campos.title) || '?'
  return `post ${idDe(p)} (${etiqueta.slice(0, 60)})`
}

/*
  Qué posts cambiaron en esta rama. Un check que exigiera `lector` a los 24
  posts históricos fallaría de entrada y se desactivaría en una semana; uno que
  solo exige lo que se toca acompaña el trabajo real.

  Mira el working tree además de la historia: es la lección de un check hermano
  en el sitio personal, que comparaba solo contra git y por eso pasaba en verde
  en local hasta el momento del commit.
*/
function bloqueDePostsTocados() {
  const rangos = new Set()
  let diff = ''
  try {
    const base = execFileSync('git', ['merge-base', 'HEAD', BASE], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim()
    diff = execFileSync('git', ['diff', '-U0', base, '--', DATA], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    })
    diff += execFileSync('git', ['diff', '-U0', 'HEAD', '--', DATA], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    })
  } catch {
    // Sin git, sin origin/dev, o archivo sin historia: el check no opina.
    return null
  }
  for (const m of diff.matchAll(/^@@ -\d+(?:,\d+)? \+(\d+)(?:,(\d+))?/gm)) {
    const desde = Number(m[1])
    const largo = m[2] === undefined ? 1 : Number(m[2])
    for (let l = desde; l < desde + largo; l++) rangos.add(l)
  }
  return rangos
}

const tocadas = bloqueDePostsTocados()
const fueTocado = (p) => {
  if (tocadas === null) return false
  const hasta = p.desde + p.texto.length
  for (let l = p.desde; l <= hasta; l++) if (tocadas.has(l)) return true
  return false
}

// ── Checks ───────────────────────────────────────────────────────────────────

console.log(`\nPuerta de publicación del blog — ${posts.length} posts vivos\n`)

check('lector-declarado', () => {
  const p = []
  for (const post of posts) {
    const valor = limpiar(post.campos.lector)
    const tocado = fueTocado(post)
    if (!valor) {
      const msg = tocado
        ? `${nombreDe(post)} no declara \`lector\`. Valores: ${LECTORES.join(', ')}`
        : `${nombreDe(post)} sin \`lector\` (histórico)`
      p.push(tocado ? falla(msg) : avisa(msg))
      continue
    }
    if (!LECTORES.includes(valor)) {
      p.push(
        falla(
          `${nombreDe(post)} declara lector '${valor}', que no es un ICP de Sena. ` +
            `Los cinco válidos son acreedores: ${LECTORES.join(', ')}`
        )
      )
    }
  }
  return p
})

check('sin-bloqueos-abiertos', () => {
  const p = []
  for (const post of posts) {
    if (post.campos.bloqueos) {
      const detalle = (post.cuerpo.match(/bloqueos:\s*\[([\s\S]*?)\]/) || [])[1] || ''
      const items = detalle
        .split('\n')
        .map((l) => l.trim().replace(/^'|',?$/g, ''))
        .filter(Boolean)
      if (items.length) {
        p.push(
          falla(
            `${nombreDe(post)} tiene bloqueos sin resolver:\n` +
              items.map((i) => `        · ${i}`).join('\n') +
              `\n        Resolvelos y borrá el campo \`bloqueos\`, o el post no se publica.`
          )
        )
      }
    }
  }
  return p
})

check('pendiente-sin-cerrar', () => {
  /*
    Red de seguridad para el patrón que el agente ya usa hoy sin que nadie se lo
    pida: escribir "PENDIENTE:" en el cuerpo del commit. Antes eso no detenía
    nada. Ahora, si la rama trae un PENDIENTE, hay que resolverlo y decirlo con
    un commit que lo cierre (`PENDIENTE-CERRADO: ...`) antes de mergear.
  */
  const p = []
  let mensajes = ''
  try {
    const base = execFileSync('git', ['merge-base', 'HEAD', BASE], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim()
    mensajes = execFileSync('git', ['log', '--format=%H%n%B%n---FIN---', `${base}..HEAD`], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    })
  } catch {
    return [] // sin git o sin origin/dev, el check no opina
  }
  const abiertos = []
  const cerrados = []
  for (const bloque of mensajes.split('---FIN---')) {
    /*
      El marcador va al inicio de línea y sin indentar: así se declara, y así se
      distingue de mencionarlo. Con `^\s*` el check se disparó con su propio
      commit de creación, que describe la convención en prosa indentada — y se
      dispararía con cualquier commit que documente el gate. Un check que falla
      cuando se habla de él es un check que alguien termina desactivando.
    */
    for (const m of bloque.matchAll(/^PENDIENTE(-CERRADO)?:[ \t]*(.+)$/gm)) {
      ;(m[1] ? cerrados : abiertos).push(m[2].trim())
    }
  }
  for (const a of abiertos) {
    const resuelto = cerrados.some((c) => c.slice(0, 25).toLowerCase() === a.slice(0, 25).toLowerCase())
    if (!resuelto) {
      p.push(
        falla(
          `un commit de esta rama declara un PENDIENTE sin cerrar:\n        · ${a}\n` +
            `        Resolvelo, y cerralo con un commit que diga "PENDIENTE-CERRADO: <mismo texto>".`
        )
      )
    }
  }
  return p
})

check('imagen-usable', () => {
  const p = []
  for (const post of posts) {
    const ref = post.campos.image || ''
    const m = ref.match(/AssetImageBlog\.([A-Za-z0-9_]+)\.src/)
    if (!m) {
      if (ref.includes('http')) {
        p.push(falla(`${nombreDe(post)} usa una imagen remota. El hero se sirve desde public/.`))
      }
      continue
    }
    const archivo = join(IMG_DIR, `${m[1]}.webp`)
    if (!existsSync(archivo)) {
      p.push(falla(`${nombreDe(post)} apunta a ${archivo}, que no existe.`))
      continue
    }

    const buf = readFileSync(archivo)
    if (buf.slice(0, 4).toString('ascii') !== 'RIFF' || buf.slice(8, 12).toString('ascii') !== 'WEBP') {
      p.push(
        falla(
          `${archivo} no es webp de verdad (cabecera RIFF/WEBP ausente). ` +
            `Ya pasó: un PNG renombrado a .webp.png.`
        )
      )
      continue
    }

    const kb = Math.round(statSync(archivo).size / 1024)
    if (kb > PESO_MAX_KB) {
      p.push(falla(`${archivo} pesa ${kb} KB (máximo ${PESO_MAX_KB} KB). Convertir antes de instalar.`))
    }

    const dim = dimensionesWebp(buf)
    if (dim) {
      const ratio = dim.ancho / dim.alto
      if (ratio < RATIO_MIN) {
        p.push(
          falla(
            `${archivo} es ${dim.ancho}x${dim.alto} (ratio ${ratio.toFixed(2)}, mínimo ${RATIO_MIN}). ` +
              `El hero renderiza con object-cover: un retrato se recorta a una franja y corta las caras.`
          )
        )
      }
    }
  }
  return p
})

/**
 * Ancho y alto de un webp, para los tres subformatos. Devuelve null si el
 * subformato no se reconoce — un check que adivina es peor que uno que calla.
 */
function dimensionesWebp(buf) {
  const tipo = buf.slice(12, 16).toString('ascii')

  if (tipo === 'VP8X') {
    return {
      ancho: (buf[24] | (buf[25] << 8) | (buf[26] << 16)) + 1,
      alto: (buf[27] | (buf[28] << 8) | (buf[29] << 16)) + 1,
    }
  }

  if (tipo === 'VP8 ') {
    const i = buf.indexOf(Buffer.from([0x9d, 0x01, 0x2a]))
    if (i < 0) return null
    return {
      ancho: buf.readUInt16LE(i + 3) & 0x3fff,
      alto: buf.readUInt16LE(i + 5) & 0x3fff,
    }
  }

  if (tipo === 'VP8L') {
    if (buf[20] !== 0x2f) return null
    const bits = buf.readUInt32LE(21)
    return {
      ancho: (bits & 0x3fff) + 1,
      alto: ((bits >> 14) & 0x3fff) + 1,
    }
  }

  return null
}

// ── Salida ───────────────────────────────────────────────────────────────────

console.log()
if (avisos.length) {
  /*
    Los avisos se resumen a propósito. Un check que escupe 24 líneas idénticas
    en cada corrida enseña a saltearse la salida entera, y ahí deja de servir
    también para lo que sí bloquea.
  */
  const porCheck = new Map()
  for (const a of avisos) porCheck.set(a.nombre, [...(porCheck.get(a.nombre) || []), a.msg])
  console.log(`${avisos.length} aviso(s) — no bloquean:`)
  for (const [nombre, msgs] of porCheck) {
    console.log(`  ! ${nombre} — ${msgs.length}:`)
    for (const m of msgs.slice(0, 3)) console.log(`        · ${m}`)
    if (msgs.length > 3) console.log(`        · … y ${msgs.length - 3} más`)
  }
  console.log()
}

if (errores.length) {
  console.log(`✗ ${errores.length} problema(s) en ${checksCorridos} checks:\n`)
  for (const e of errores) console.log(`  ${e.nombre}\n        ${e.msg}\n`)
  process.exit(1)
}

console.log(`✓ ${checksCorridos} checks en verde.`)
