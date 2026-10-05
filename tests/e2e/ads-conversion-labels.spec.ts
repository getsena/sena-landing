import { readdirSync, readFileSync, statSync } from 'fs'
import { join } from 'path'

import { test, expect } from '@playwright/test'

// Cada producto debe disparar SOLO la conversión de Google Ads de su producto. Las acciones
// "Sena/Recupera/Opera - Formulario enviado" son principales (una por clic): si una landing de Recupera u
// Opera dispara además la genérica de Sena, cada lead cuenta dos conversiones.
const LABEL = {
  sena: 'JNP9CMq42ZgcELWNtfVC',
  recupera: 'sCCeCNfunKccELWNtfVC',
  opera: 'TyATCOr4nKccELWNtfVC',
}

function sources(dir: string): { path: string; text: string }[] {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name)
    return statSync(p).isDirectory() ? sources(p) : /\.(ts|tsx)$/.test(name) ? [{ path: p, text: readFileSync(p, 'utf8') }] : []
  })
}

const cases = [
  { producto: 'recupera', dir: 'src/ui/recupera', usa: LABEL.recupera, no: [LABEL.sena, LABEL.opera] },
  { producto: 'opera', dir: 'src/ui/opera', usa: LABEL.opera, no: [LABEL.sena, LABEL.recupera] },
  { producto: 'plataforma', dir: 'src/ui/plataforma', usa: LABEL.sena, no: [LABEL.recupera, LABEL.opera] },
]

test.describe('etiquetas de conversión de Google Ads por producto', () => {
  for (const c of cases) {
    test(`${c.producto}: dispara solo su etiqueta`, () => {
      const files = sources(c.dir)
      const conTrack = files.filter((f) => f.text.includes("'conversion'"))
      expect(conTrack.length, `debe haber disparos de conversión en ${c.dir}`).toBeGreaterThanOrEqual(2)
      for (const f of conTrack) {
        expect(f.text, `${f.path} debe usar la etiqueta de ${c.producto}`).toContain(c.usa)
        for (const otra of c.no) expect(f.text, `${f.path} no debe usar otra etiqueta`).not.toContain(otra)
      }
    })
  }
})
