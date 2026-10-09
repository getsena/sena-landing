export const FamilySocialProof = () => {
  const clientTypes = [
    'Family Offices',
    'Holdings familiares',
    'Administradoras patrimoniales',
    'Inmobiliarias de inversión',
    'Empresas agrícolas y productivas',
    'Sociedades de inversión',
    'Vehículos de renta y leasing',
  ]
  // Las dos primeras métricas eran resultados sin fuente ("40% reducción de atrasos",
  // "30 días de mejora en el DSO"). Sena no los ha medido: Ópera tiene un piloto que
  // todavía no produce resultado. Retiradas el 2026-10-09, misma regla que el claim del
  // 33% de DSO. Lo que queda describe capacidades verificables del producto.
  const metrics = [
    { value: 'Una vista', label: 'Cartera consolidada de todas las empresas del grupo' },
    { value: '3 canales', label: 'WhatsApp, email y SMS, con historial por contacto' },
    { value: '100%', label: 'Trazabilidad de gestión por empresa y responsable' },
  ]

  return (
    <section className="bg-[#F9F9F9] py-16 md:py-24">
      <div className="max-w-[1280px] mx-auto px-4 md:px-10">
        <div className="text-left mb-12">
          <p className="text-brand-primary-dark text-2xl sm:text-4xl font-extrabold leading-tight">
            Family Offices que recuperan
            <br />
            <span className="text-brand-primary">orden y liquidez</span>
          </p>
        </div>
        <div className="flex flex-wrap gap-2 md:gap-3 mb-12">
          {clientTypes.map((t) => (
            <span
              key={t}
              className="bg-white text-brand-primary-dark text-xs md:text-sm font-semibold px-4 py-2 rounded-full border border-brand-primary/10"
            >
              {t}
            </span>
          ))}
        </div>
        <div className="bg-white rounded-2xl p-6 md:p-10 mb-12 border border-slate-100">
          <div className="flex items-start gap-4">
            <svg
              className="shrink-0 text-brand-secondary mt-1"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011C3 9.511 5.457 6.37 9.03 4.95L9.923 6.404C6.588 8.005 5.936 10.17 5.679 11.535C6.196 11.283 6.864 11.198 7.518 11.258C9.2 11.413 10.516 12.837 10.516 14.5C10.516 15.381 10.166 16.225 9.543 16.849C8.919 17.472 8.075 17.821 7.194 17.821C6.2 17.821 5.252 17.397 4.583 17.321ZM14.583 17.321C13.553 16.227 13 15 13 13.011C13 9.511 15.457 6.37 19.03 4.95L19.923 6.404C16.588 8.005 15.936 10.17 15.679 11.535C16.196 11.283 16.864 11.198 17.518 11.258C19.2 11.413 20.516 12.837 20.516 14.5C20.516 15.381 20.166 16.225 19.543 16.849C18.919 17.472 18.075 17.821 17.194 17.821C16.2 17.821 15.252 17.397 14.583 17.321Z" />
            </svg>
            <div>
              <p className="text-slate-700 text-base md:text-lg leading-relaxed italic">
                Teníamos cuentas por cobrar distribuidas en distintas empresas del grupo, cada una con su
                forma de cobrar. Con Sena centralizamos la cartera, mejoramos el control del flujo y
                recuperamos deudas críticas sin tensionar relaciones estratégicas.
              </p>
              <div className="mt-4">
                <p className="text-brand-primary-dark font-bold text-sm">CFO</p>
                <p className="text-slate-500 text-sm">Holding Familiar</p>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {metrics.map((m) => (
            <div
              key={m.label}
              className="bg-white rounded-2xl p-6 md:p-8 text-center border border-slate-100"
            >
              <p className="text-brand-primary font-extrabold text-4xl md:text-5xl mb-2">{m.value}</p>
              <p className="text-slate-600 text-sm md:text-base leading-snug">{m.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
