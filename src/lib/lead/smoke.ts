// Los smoke tests post-deploy usan emails de prueba como smoke+1730000000@somossena.com
// (el usuario empieza con "smoke+" o lleva "+smoke"). Esos leads no se reportan a Meta CAPI,
// para no contaminar las conversiones con contactos de prueba.
export function isSmokeTest(email: string): boolean {
  return /^(?:smoke\+|[^@]*\+smoke)[^@]*@/i.test(email.trim())
}
