# Aviso de leads y protección anti-bot

Work-item getsena/sena-agents#423. Aplica a `/api/lead` y `/api/lead-analyzer` (sena-landing) y a `/api/lead`
de recupera-landing y agent-project-landing.

## Qué hace cada pieza

| Pieza            | Dónde                                                      | Qué hace                                                                                                                                                                                     |
| ---------------- | ---------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Aviso por correo | `src/lib/lead/notify.ts`                                   | Envía un correo en texto plano a `NOTIFY_LEAD_TO` por SendGrid cuando entra un lead nuevo. Si HubSpot falla, el correo sale igual con asunto `FALLÓ HUBSPOT` y los datos completos del lead. |
| Turnstile        | `src/lib/lead/turnstile.ts`, `src/ui/shared/Turnstile.tsx` | Verifica en el servidor el token del widget de Cloudflare.                                                                                                                                   |
| Límite por IP    | Vercel Firewall (sin código)                               | 10 solicitudes por minuto por IP en `/api/lead*`; sobre el tope responde 403 el resto del minuto.                                                                                            |

## Reglas de seguridad del correo

Los datos del lead los escribe un anónimo y el correo sale desde `hola@somossena.com`:

- Solo texto plano. Cada valor va entre comillas, en una línea, sin `<>`, control, bidi ni ancho cero, y los
  enlaces del visitante quedan desactivados (`https[:]//`).
- El asunto lleva texto fijo y el producto; nunca nombre, empresa ni UTM.
- El link a HubSpot se arma con el ID numérico del contacto.
- Seguimiento de clics y aperturas de SendGrid desactivado.
- Los logs no llevan PII, el cuerpo de la respuesta de SendGrid ni la clave.
- Un lead `smoke+...@somossena.com` avisa solo a `hola@` con `[SMOKE]`, y no se salta Turnstile ni la validación.
- Solo se avisa si se creó un contacto o un negocio nuevo: reenviar el formulario de un lead abierto no repite el correo.

## Política de Turnstile (híbrida)

| Caso                                                               | Resultado                                                                                                                               |
| ------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| Token inválido, vencido, repetido, de otro sitio o de otra acción  | 403, no se toca HubSpot                                                                                                                 |
| Sin token (bloqueador, red corporativa) o Cloudflare sin respuesta | Se procesa igual; el aviso lleva `[SIN VERIFICAR]`, no se reporta a Meta CAPI y hay un tope de 3 por IP cada 10 minutos (por instancia) |
| Sin `TURNSTILE_SECRET_KEY`                                         | Verificación desactivada (permite desplegar antes de crear el widget)                                                                   |

La IP se lee de `x-real-ip`; `x-forwarded-for` no es confiable.

## Variables de entorno (por proyecto de Vercel)

| Variable                         | Tipo            | Nota                                                                                                                                                                          |
| -------------------------------- | --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `SENDGRID_API_KEY`               | sensitive       | Clave con solo el permiso Mail Send (no la de 208 permisos de Key Vault)                                                                                                      |
| `NOTIFY_LEAD_TO`                 | texto           | Destinatarios separados por coma                                                                                                                                              |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | texto           | Pública; se fija en el build, hay que redesplegar al cambiarla                                                                                                                |
| `TURNSTILE_SECRET_KEY`           | sensitive       | Nunca con prefijo `NEXT_PUBLIC_`                                                                                                                                              |
| `TURNSTILE_ALLOWED_HOSTNAMES`    | texto, opcional | Hostnames extra permitidos (preview, CI con claves de prueba). Por defecto se aceptan `www.somossena.com`, `somossena.com`, `recupera.somossena.com` y `agente.somossena.com` |

## Orden seguro de despliegue

1. Cargar `NEXT_PUBLIC_TURNSTILE_SITE_KEY` en los 3 proyectos y redesplegar (la clave pública se fija en el build).
2. Comprobar en el sitio que el widget entrega token (el campo oculto `cf-turnstile-response` tiene valor).
3. Recién entonces cargar `TURNSTILE_SECRET_KEY` y redesplegar.

Cargar el secreto sin la clave pública deja a todos los visitantes sin token: todos los leads quedan
`[SIN VERIFICAR]`, sin Meta CAPI y con tope de 3 por IP. Sin `SENDGRID_API_KEY`, sin `NOTIFY_LEAD_TO` o sin
`TURNSTILE_SECRET_KEY` el sitio se comporta como antes. El widget debe tener registrados en Cloudflare los 4 hostnames
de la tabla de variables.

## Límite por IP (Vercel Firewall)

Regla "Limite por IP en /api/lead" en los 3 proyectos: ruta que empieza con `/api/lead`, ventana fija de 60 s,
tope de 10 por IP, acción `deny`. Los `GET` y las páginas no se ven afectados. Se probó con una ráfaga de 13
solicitudes inválidas: las 10 primeras respondieron 400 y las siguientes 403.

Para revertir: Vercel → proyecto → Firewall → regla → Delete (o `rules.remove` en la API
`PATCH /v1/security/firewall/config`).

## Cómo probar

- Unitarias y de handler (sin navegador): `yarn playwright test tests/e2e/notify.spec.ts tests/e2e/turnstile.spec.ts
tests/e2e/lead-notify-handlers.spec.ts tests/e2e/lead-turnstile-handlers.spec.ts`
- Navegador real con la clave de prueba de Cloudflare (siempre pasa):
  `NEXT_PUBLIC_TURNSTILE_SITE_KEY=1x00000000000000000000AA yarn build && yarn start -p 39847`, luego
  `E2E_BASE_URL=http://localhost:39847 yarn playwright test tests/e2e/turnstile-form.spec.ts`.
  Antes de repetir, confirmar que no queda un servidor viejo en el puerto 39847.
- Lead real de prueba post-deploy: `tests/e2e/lead-smoke.spec.ts` (usa un email `smoke+...@somossena.com`).

## Limitaciones conocidas

- El tope de leads sin verificar es en memoria por instancia: frena ráfagas, no es un límite global.
- Un lead sin token que se reenvía con otro email no se agrega al tope de contactos nuevos más allá del WAF.
- En recupera-landing el formulario guarda también en el backend: si /api/lead responde 403 o 429 el visitante ve éxito y el lead llega solo al backend (sin HubSpot ni aviso).
- El WAF responde 403 (no 429) al superar el tope; el formulario muestra el mensaje genérico de reintento.
