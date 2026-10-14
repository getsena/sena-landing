# CLAUDE.md — sena-landing

Guía para Claude Code en este repositorio. Debe funcionar sin el CLAUDE.md del workspace.

## Qué es

Sitio público de Sena (**somossena.com**): home, `/plataforma`, `/recupera`, `/opera`, industrias, `/nosotros`, páginas legales y el **blog** (`src/lib/data/blogPosts.ts`). Captura leads en `POST /api/lead` y `POST /api/lead-analyzer`, y los crea en HubSpot (contacto + negocio) y en Meta CAPI.

- Repo **público**: no commitees secretos, nombres de cuentas ni precios sin publicar.
- Otras landings de la org: `recupera-landing` (recupera.somossena.com) y `agent-project-landing` (**opera.somossena.com**, el nombre del repo no refleja el producto).
- Fuente de verdad de marca, ICP, precios y términos permitidos: repo `sena-brain` (`06_Comunicacion/`, `07_Decisiones/`). Si este repo y el vault se contradicen, manda el vault.
- No llama a `sena-api-core` ni a los satélites: solo a HubSpot y Meta.

## Build & Run

Next.js 16 + React 19 + Tailwind 4 + TypeScript. Node según `.nvmrc` (24). Gestor: **yarn**.

```bash
yarn install            # el lockfile es formato Berry; el pin de yarn con corepack está pendiente (#72)
yarn dev              # http://localhost:3000
yarn build && yarn start
yarn lint             # eslint
yarn tsc              # chequeo de tipos
yarn blog:gate        # puerta de publicación del blog (ver sección Blog)
yarn test:e2e         # ver Gotchas: apunta a producción
```

Variables de entorno (en Vercel; no existe `.env` de ejemplo ni se commitean): `HUBSPOT_ACCESS_TOKEN`, `META_CAPI_TOKEN`, `META_PIXEL_ID`, `NINO_API_KEY`. Despliegue: Vercel, con preview en cada PR (`output: 'standalone'`). Existe `docker-compose.production.yml`; no está verificado si se usa en producción.

## Arquitectura

```
src/app/          rutas App Router (api/lead, api/lead-analyzer, blog/[slug], sitemap.xml, llms.txt)
src/ui/<página>/  componentes por página (home, plataforma, recupera, opera, nosotros, blog, ...)
src/lib/          data (blogPosts), lead (hubspot, atribución), services, store, types, utils
scripts/          blog-gate.mjs
tests/e2e/        specs de Playwright
```

- La lógica de leads vive en `src/lib/lead/` (módulo HubSpot compartido). Los handlers de `src/app/api/` son delgados.
- Los textos de cada página están en su carpeta `src/ui/`; los posts, en `blogPosts.ts`.

## Estilo de código

- TypeScript estricto. Nunca `any` (usa `unknown` y acota). No uses enums: `as const` o uniones.
- Imports absolutos con `@/*` → `src/*`; sin `require`.
- Colores con los tokens `--color-brand-*` de `src/app/globals.css`, no hex sueltos.
- Código y comentarios en español, identificadores en inglés. Copy del sitio: español neutro, tuteo, sin voseo.
- No refactorices lo existente salvo que el work-item lo pida.

## Testing

- Playwright en `tests/e2e/`. Simulan HubSpot y no usan red: `attribution-classify`, `client-attribution`, `ads-conversion-labels`, `ga4-*`, `hubspot-module`, `hubspot-upsert`, `lead-handlers`, `lead-validate`.
- **Sí usan red:** `plataforma.spec.ts` (navega producción), `lead-smoke.spec.ts` (crea y borra un contacto real) y `hubspot-contract.spec.ts` (requiere `HUBSPOT_CONTRACT_TOKEN`).
- Cambio en `src/lib/lead/` o `src/app/api/` → agrega o ajusta su spec. Mutaciones: caso feliz + al menos un error.
- Confirma que un test nuevo FALLA sin tu cambio y PASA con él.
- `yarn tsc` y `yarn lint` deben quedar limpios antes de abrir el PR.

## Gotchas

- **`yarn test:e2e` apunta a producción** (`baseURL: https://somossena.com`). Los specs de página navegan el sitio real. `tests/e2e/lead-smoke.spec.ts` crea y borra un contacto en HubSpot real: ejecútalo solo con aprobación y después de un deploy (`SMOKE_BASE_URL` + `HUBSPOT_SMOKE_TOKEN`).
- El workflow `hubspot-contract` corre solo a mano (`workflow_dispatch`); su cron está apagado hasta que exista `HUBSPOT_CONTRACT_TOKEN`.
- **Subir `next` u otras dependencias es un PR aparte, decidido por un owner.** Prueba `yarn build` y el preview de Vercel antes de proponerlo: `next@16.3.1` rompió el build standalone en Vercel (#92). Revisa los avisos de seguridad vigentes antes de elegir versión.
- El hook `pre-push` de husky ejecuta `npm run build`, pero el repo usa yarn (pendiente de alinear). Si se cuelga, no uses `--no-verify`: repórtalo.
- Claims de marca: no publiques cifras de escala, antigüedad ni resultados (por ejemplo, % de reducción de DSO) sin fuente. Antes de escribir copy, revisa los términos permitidos y prohibidos en `sena-brain`.

## Publicar en el blog

```bash
npm run blog:gate
```

Cuatro checks deterministas sobre `src/lib/data/blogPosts.ts`. Corren solos en
cada PR (`.github/workflows/blog-gate.yml`) y en `pre-push`. **No opinan: dicen
si algo se rompió.**

Existen porque el problema nunca fue detectar. Las dos veces que una imagen no
correspondía al post, el agente lo detectó y lo escribió —`1d52578` y `d3b7e5b`
dicen textualmente _"PENDIENTE: … hay que reemplazarla antes del merge"_— y las
dos veces se mergeó igual, con corrección 10 minutos y 3 horas después. Un aviso
en el cuerpo de un commit no detiene un merge. Una salida distinta de cero sí.

| Check                   | Qué exige                                                                                                           |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `lector-declarado`      | Todo post que la rama toque declara `lector`, y el valor es uno de los cinco ICP. Los históricos quedan como aviso. |
| `sin-bloqueos-abiertos` | Ningún post tiene `bloqueos` sin resolver.                                                                          |
| `pendiente-sin-cerrar`  | Ningún commit de la rama declara `PENDIENTE:` sin su `PENDIENTE-CERRADO:`.                                          |
| `imagen-usable`         | El hero existe, es webp de verdad, pesa ≤250 KB y es horizontal (ratio ≥1.1).                                       |

### Reglas al escribir un post

- **Declarar `lector` antes que el cuerpo.** Los cinco valores están en
  `src/lib/types/blog.ts`, y **los cinco son acreedores**: quien cobra su
  cartera, o quien cobra la de sus mandantes. No hay valor para el deudor porque
  Sena no le escribe al deudor — y ya salieron dos posts escritos para él
  (`5f48a5f`). Si ninguno de los cinco calza, el problema es el post.
- **Lo que impide publicar va en `bloqueos`, no en el commit.** Si detectas que
  algo no corresponde —una imagen que contradice el texto, un dato sin
  confirmar—, escríbelo ahí. El post no se publica hasta que el campo quede
  vacío. Es el mismo aviso que ya escribías; la diferencia es que ahora frena.
- **La imagen se procesa antes de instalarla.** webp de verdad (no un PNG
  renombrado), horizontal, bajo 250 KB. El hero usa `object-cover` en un
  contenedor de 380px: un retrato se recorta a una franja y corta las caras.
- **Los hechos de Sena no se inventan acá.** ICP, precios, planes y casos tienen
  fuente en `sena-brain`. Este repo es **público**: no escribir nombres de
  cuentas ni pricing que no esté ya publicado.
- **El `id` del post es único.** Antes de crear uno, revisa el mayor `id` en `blogPosts.ts` y en las ramas y PRs abiertos: ya hubo dos posts con `id: 34` en paralelo.

## Flujo de trabajo (obligatorio)

Ramas: `main` es producción y `dev` es integración. No existe `staging`.

1. Antes de tocar nada: `git fetch && git branch --show-current`. Nunca trabajes en `main` ni en `dev`.
2. Crea la rama desde `dev`: `git checkout -b feat/issue-{N}-descripcion` (también `fix/`, `chore/`; `hotfix/` sale de `main`).
3. Un work-item = una rama = un PR. No mezcles temas en un PR (blog, copy, SEO y dependencias van por separado).
4. Commits conventional: `tipo(scope): descripción #N`. El subject va en minúscula (commitlint rechaza la mayúscula inicial); header ≤100 caracteres, líneas del cuerpo ≤100. Tipos: feat, fix, hotfix, refactor, docs, test, chore, perf, ci, build, style, revert.
5. Abre el PR contra `dev` con el template (`Closes #N`). El check **Commit Lint** debe quedar verde.
6. **Revisión y merge.** `dev` y `main` exigen 1 aprobación de un code owner (`@nicoariffo`, `@sagajardo`, `@RenildoChavezFlujolink`; CODEOWNERS los asigna solos). Solo ellos mergean: squash a `dev`, merge commit en `dev → main`. Quien no es owner abre el PR y espera; no mergees, aunque tengas permiso de escritura.
7. Confirma que el PR es visible: `gh pr view --json reviewRequests` debe listar a los owners. Si está vacío, avisa.
8. **Nunca `--no-verify`.** Si un hook se cuelga o falla, detente y repórtalo en el PR. El mismo chequeo corre en CI.
9. Contexto: sin memoria local ni archivos de progreso. El estado vive en el issue y el PR; un aprendizaje que debe persistir va a este `CLAUDE.md` en el mismo PR. Preferencias personales: `CLAUDE.local.md` (ignorado por git).

Skills: `/session-start` al empezar y `/progress-tracker` al cerrar (en `.claude/skills/`).
