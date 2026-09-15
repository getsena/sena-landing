# CLAUDE.md

Guía para Claude Code en este repositorio.

## Qué es sena-landing

Plataforma de cobranza

**Repo:** `flujopay/sena-landing`
**Stack:** Next.js / React
**Puerto local:** N/A

## Stack y dependencias

Ver `package.json` / `pyproject.toml` / equivalente para la lista completa.

**Para levantar localmente:**

```bash
# Instalar dependencias
npm install   # o: pip install -r requirements.txt / poetry install

# Levantar servidor de desarrollo
npm run dev   # o el comando equivalente del stack
```

## Convenciones

### Commits

Formato conventional commits:

```
feat(scope): descripción #N
fix(scope): descripción #N
hotfix(scope): descripción #N
refactor(scope): descripción #N
docs(scope): descripción #N
chore(scope): descripción #N
```

Types válidos: `feat`, `fix`, `hotfix`, `refactor`, `docs`, `test`, `chore`, `perf`, `ci`, `build`, `style`, `revert`. Header máximo 100 chars.

### Branching

Modelo **3 branches protegidas**:

| Branch                        | Rol                                                        |
| ----------------------------- | ---------------------------------------------------------- |
| `main`                        | Producción. Solo recibe merges desde `staging` y hotfixes. |
| `staging`                     | Pre-producción / QA. Recibe merges desde `dev`.            |
| `dev`                         | Integración. Default para features y fixes.                |
| `feat/*`, `fix/*`, `hotfix/*` | Ramas de trabajo efímeras.                                 |

**Flujo estándar:**

1. Crea branch desde `dev`: `git checkout -b feat/issue-{N}-descripcion`
2. Commits conventional referenciando issue: `feat(scope): descripción #N`
3. Abre PR contra `dev`. Body incluye `Closes #N`.
4. Squash merge → `dev`.

### Tests

- Cada feature requiere: happy path + validation errors + auth errors.
- No escribir tests vacíos sin asserts.
- Correr el test con el código roto para confirmar que falla primero.

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
- **Lo que impide publicar va en `bloqueos`, no en el commit.** Si detectás que
  algo no corresponde —una imagen que contradice el texto, un dato sin
  confirmar—, escribilo ahí. El post no se publica hasta que el campo quede
  vacío. Es el mismo aviso que ya escribías; la diferencia es que ahora frena.
- **La imagen se procesa antes de instalarla.** webp de verdad (no un PNG
  renombrado), horizontal, bajo 250 KB. El hero usa `object-cover` en un
  contenedor de 380px: un retrato se recorta a una franja y corta las caras.
- **Los hechos de Sena no se inventan acá.** ICP, precios, planes y casos tienen
  fuente en `sena-brain`. Este repo es **público**: no escribir nombres de
  cuentas ni pricing que no esté ya publicado.

## Context policy

Todo contexto de proyecto vive en GitHub.

| Contexto                | Dónde                                     |
| ----------------------- | ----------------------------------------- |
| Estado de una feature   | Issue de GitHub (comments)                |
| Plan de un work-item    | Body del issue padre + sub-issues (tasks) |
| Progreso de sesión      | Comment en el issue activo                |
| Convenciones            | Este `CLAUDE.md` + `.claude/rules/`       |
| Preferencias personales | `CLAUDE.local.md` (no commitear)          |

## Flujo estándar de trabajo

```
Desarrollo:
  /init → /plan → /apply → /test → /build → /review

Deploy:
  /secure → /deploy

Soporte:
  /debug    — cuando /apply o /test fallan
  /audit    — revisión OWASP profunda antes de mergear cambios sensibles
  /pentest  — barrida completa de seguridad sobre todo el proyecto (periódico)
  /sync     — cuando hay drift entre código y GitHub
  /rollback — cuando un deploy rompe producción
  /design   — cuando hay trabajo de UI/UX
  /triage   — limpieza periódica de issues
```

**Reglas operativas para Claude:**

1. Al arrancar sesión: `/init`
2. Al cerrar sesión: `/build`
3. Antes de cada deploy: `/secure` es obligatorio.
4. Si el plan en GitHub no refleja el código: correr `/sync`.
5. Aprendizajes que deben persistir: commitear al `CLAUDE.md`.
