'use client'

import { Button } from '@/ui/shared/Button'
import { Input } from '@/ui/shared/Input'
import { useModalStore } from '@/lib/store/modalStore'
import { useEffect, useRef, useState } from 'react'
import { getAttributionPayload, landingPageUrl, newEventId } from '@/lib/lead/clientAttribution'
import {
  BUCKET_COLORS,
  BUCKET_LABELS,
  CalcResult,
  calcular,
  fmtCLP,
  getDynamicCopy,
  parseCLP,
  RATES,
} from './calculations'

type Step = 1 | 2 | 3 | 4 | 5 | 6 | 7

interface AnalyzerState {
  facturacion: string | null
  industria: string | null
  montos: number[]
  result: CalcResult | null
}

const TOTAL_STEPS = 7

const LOADING_MESSAGES = [
  'Aplicando modelos de recuperación por antigüedad...',
  'Comparando con benchmarks del sector...',
  'Calculando pérdida por inacción...',
  'Generando tu reporte personalizado...',
]

const FACTURACION_OPTIONS = ['Menos de CLP 5M', 'CLP 5M – 20M', 'CLP 20M – 100M', 'Más de CLP 100M']
const INDUSTRIA_OPTIONS = ['Distribución / Retail', 'Manufactura', 'Servicios B2B', 'Otra industria']

export function PortfolioAnalyzerModal() {
  const { hideModal } = useModalStore()
  const [step, setStep] = useState<Step>(1)
  const [state, setState] = useState<AnalyzerState>({
    facturacion: null,
    industria: null,
    montos: [],
    result: null,
  })

  // Bucket inputs (strings para controlar formato)
  const [bucketInputs, setBucketInputs] = useState<string[]>(['', '', '', '', '', ''])

  // Lead form
  const [nombre, setNombre] = useState('')
  const [empresa, setEmpresa] = useState('')
  const [email, setEmail] = useState('')
  const [telefono, setTelefono] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  // Loading animation
  const [loadingMsg, setLoadingMsg] = useState(LOADING_MESSAGES[0])
  const loadingRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const progressPct = Math.round((step / TOTAL_STEPS) * 100)

  function goTo(n: Step) {
    setStep(n)
  }

  function canProceedStep2() {
    return state.facturacion !== null && state.industria !== null
  }

  function canProceedStep3() {
    return bucketInputs.some((v) => parseCLP(v) > 0)
  }

  function canSubmitLead() {
    return nombre.trim() !== '' && empresa.trim() !== '' && email.trim() !== ''
  }

  function runCalc() {
    const montos = bucketInputs.map(parseCLP)
    const result = calcular(montos)
    setState((s) => ({ ...s, montos, result }))
    goTo(4)

    // Animación de carga
    let mi = 0
    loadingRef.current = setInterval(() => {
      mi++
      if (mi < LOADING_MESSAGES.length) setLoadingMsg(LOADING_MESSAGES[mi])
    }, 420)

    setTimeout(() => {
      if (loadingRef.current) clearInterval(loadingRef.current)
      setLoadingMsg(LOADING_MESSAGES[0])
      goTo(5)
    }, 1900)
  }

  useEffect(() => {
    return () => {
      if (loadingRef.current) clearInterval(loadingRef.current)
    }
  }, [])

  async function submitLead() {
    if (!state.result || !state.facturacion || !state.industria) return
    setSubmitting(true)
    setSubmitError('')

    try {
      await fetch('/api/lead-analyzer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: nombre.trim(),
          empresa: empresa.trim(),
          email: email.trim(),
          telefono: telefono.trim() || undefined,
          cartera_total_riesgo_clp: state.result.totalRiesgo,
          cartera_recuperable_clp: state.result.recuperable,
          cartera_bucket_critico: state.result.criticalBucket,
          facturacion_mensual_rango: state.facturacion,
          industria: state.industria,
          ...getAttributionPayload(),
          landingPage: landingPageUrl(),
          eventId: newEventId(),
        }),
      })
    } catch {
      // fire-and-forget — siempre avanzamos a confirmación
    } finally {
      setSubmitting(false)
      goTo(7)
    }
  }

  const result = state.result

  return (
    <div className="flex flex-col h-full">
      {/* Progress bar */}
      <div className="h-[3px] bg-[#EDEDED] rounded-full mx-6 mt-6 mb-5 overflow-hidden">
        <div
          className="h-full bg-brand-secondary rounded-full transition-all duration-300"
          style={{ width: `${progressPct}%` }}
        />
      </div>

      <div className="flex-1 overflow-y-auto px-6 pb-6">
        {/* STEP 1: Activación */}
        {step === 1 && (
          <div>
            <span className="inline-block text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full bg-brand-secondary/10 border border-brand-secondary/20 text-brand-secondary mb-3">
              Análisis gratuito
            </span>
            <div className="w-8 h-[3px] rounded-full bg-brand-secondary mb-4" />
            <h2 className="font-canaro font-extrabold text-2xl text-brand-primary-dark leading-tight mb-2">
              ¿Cuánto dinero estás perdiendo ahora mismo
              <span className="text-brand-secondary font-caslon">.</span>
            </h2>
            <p className="text-sm text-text-secondary leading-relaxed mb-6">
              Cada día que pasa, tus facturas vencidas valen menos. En 2 minutos te mostramos cuánto puedes
              recuperar todavía — y cuánto perderás si no actúas hoy.
            </p>
            <Button
              text="Analiza tu cartera ahora y deja de perder dinero →"
              variant="secondaryFilled"
              size="lg"
              fullWidth
              onClick={() => goTo(2)}
            />
            <p className="text-[11px] text-text-secondary text-center mt-3">
              Sin compromisos. Sin tarjeta de crédito.
            </p>
          </div>
        )}

        {/* STEP 2: Contexto */}
        {step === 2 && (
          <div>
            <button
              onClick={() => goTo(1)}
              className="text-xs text-text-secondary hover:text-brand-primary mb-4 flex items-center gap-1"
            >
              ← Volver
            </button>
            <span className="inline-block text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary mb-3">
              Tu perfil
            </span>
            <div className="w-8 h-[3px] rounded-full bg-brand-primary mb-4" />
            <h2 className="font-canaro font-extrabold text-xl text-brand-primary-dark leading-tight mb-1">
              Cuéntanos sobre tu empresa<span className="text-brand-secondary font-caslon">.</span>
            </h2>
            <p className="text-sm text-text-secondary mb-5">Dos preguntas para personalizar tu análisis.</p>

            <div className="border border-[#EDEDED] rounded-2xl p-4 mb-4">
              <p className="text-sm font-semibold text-brand-primary-dark mb-3">
                ¿Cuánto facturas en crédito al mes?
              </p>
              <div className="grid grid-cols-2 gap-2">
                {FACTURACION_OPTIONS.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setState((s) => ({ ...s, facturacion: opt }))}
                    className={`text-sm px-3 py-2 rounded-lg border text-left transition-all ${
                      state.facturacion === opt
                        ? 'border-brand-primary bg-surface-blue-soft text-brand-primary font-semibold'
                        : 'border-[#EDEDED] text-brand-primary-dark hover:border-brand-primary hover:bg-surface-blue-soft'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <div className="border border-[#EDEDED] rounded-2xl p-4 mb-5">
              <p className="text-sm font-semibold text-brand-primary-dark mb-3">
                ¿En qué industria opera tu empresa?
              </p>
              <div className="grid grid-cols-2 gap-2">
                {INDUSTRIA_OPTIONS.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setState((s) => ({ ...s, industria: opt }))}
                    className={`text-sm px-3 py-2 rounded-lg border text-left transition-all ${
                      state.industria === opt
                        ? 'border-brand-primary bg-surface-blue-soft text-brand-primary font-semibold'
                        : 'border-[#EDEDED] text-brand-primary-dark hover:border-brand-primary hover:bg-surface-blue-soft'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <Button
              text="Continuar →"
              variant="secondaryFilled"
              size="lg"
              fullWidth
              disabled={!canProceedStep2()}
              onClick={() => goTo(3)}
            />
          </div>
        )}

        {/* STEP 3: Datos */}
        {step === 3 && (
          <div>
            <button
              onClick={() => goTo(2)}
              className="text-xs text-text-secondary hover:text-brand-primary mb-4 flex items-center gap-1"
            >
              ← Volver
            </button>
            <span className="inline-block text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full bg-[#DC2626]/10 border border-[#DC2626]/20 text-[#DC2626] mb-3">
              Tu cartera vencida
            </span>
            <div className="w-8 h-[3px] rounded-full bg-[#DC2626] mb-4" />
            <h2 className="font-canaro font-extrabold text-xl text-brand-primary-dark leading-tight mb-1">
              ¿Cuánto tienes vencido por tramo<span className="text-brand-secondary font-caslon">.</span>
            </h2>
            <p className="text-sm text-text-secondary mb-5">
              Ingresa los montos en CLP. Con al menos un tramo es suficiente.
            </p>

            <div className="border border-[#EDEDED] rounded-2xl overflow-hidden mb-5">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#EDEDED]">
                    <th className="text-left px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-text-secondary">
                      Antigüedad
                    </th>
                    <th className="text-left px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-text-secondary">
                      Recuperación
                    </th>
                    <th className="text-left px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-text-secondary">
                      Monto (CLP)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {BUCKET_LABELS.map((label, i) => {
                    const ratePct = `${(RATES[i] * 100).toFixed(1)}%`
                    const rateColor =
                      i <= 1 ? '#16A34A' : i <= 3 ? '#d97706' : i === 4 ? '#DC2626' : '#7f1d1d'
                    return (
                      <tr
                        key={label}
                        className={i < BUCKET_LABELS.length - 1 ? 'border-b border-[#EDEDED]' : ''}
                      >
                        <td className="px-3 py-2">
                          <div className="flex items-center gap-2">
                            <span
                              className="w-2 h-2 rounded-full flex-shrink-0"
                              style={{ background: BUCKET_COLORS[i] }}
                            />
                            <span className="text-brand-primary-dark">{label}</span>
                          </div>
                        </td>
                        <td className="px-3 py-2 font-semibold" style={{ color: rateColor }}>
                          {ratePct}
                        </td>
                        <td className="px-3 py-2">
                          <input
                            type="text"
                            placeholder={i === 0 ? 'ej: 5.000.000' : '0'}
                            value={bucketInputs[i]}
                            onChange={(e) => {
                              const next = [...bucketInputs]
                              next[i] = e.target.value
                              setBucketInputs(next)
                            }}
                            className="w-full bg-[#F9F9F9] border border-[#EDEDED] rounded-lg px-3 py-1.5 text-sm text-brand-primary-dark focus:outline-none focus:border-brand-primary focus:bg-white"
                          />
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            <Button
              text="Calcular mi recuperación →"
              variant="secondaryFilled"
              size="lg"
              fullWidth
              disabled={!canProceedStep3()}
              onClick={runCalc}
            />
          </div>
        )}

        {/* STEP 4: Loading */}
        {step === 4 && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="text-4xl mb-4">📊</div>
            <h2 className="font-canaro font-extrabold text-xl text-brand-primary-dark mb-5">
              Analizando tu cartera<span className="text-brand-secondary font-caslon">.</span>
            </h2>
            <div className="w-full bg-[#EDEDED] rounded-full h-1 overflow-hidden mb-3">
              <div
                className="h-full bg-brand-secondary rounded-full animate-[loading_1.6s_ease-out_forwards]"
                style={{ width: '100%', transition: 'width 1.6s ease-out' }}
              />
            </div>
            <p className="text-sm text-text-secondary min-h-5">{loadingMsg}</p>
          </div>
        )}

        {/* STEP 5: Resultado */}
        {step === 5 && result && (
          <div>
            <button
              onClick={() => goTo(3)}
              className="text-xs text-text-secondary hover:text-brand-primary mb-4 flex items-center gap-1"
            >
              ← Modificar datos
            </button>
            <span className="inline-block text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full bg-[#16A34A]/10 border border-[#16A34A]/20 text-[#16A34A] mb-3">
              Tu análisis
            </span>
            <div className="w-8 h-[3px] rounded-full bg-brand-primary mb-4" />
            <h2 className="font-canaro font-extrabold text-xl text-brand-primary-dark leading-tight mb-1">
              Tu cartera en riesgo<span className="text-brand-secondary font-caslon">.</span>
            </h2>
            <p className="text-xs text-text-secondary mb-4">
              Benchmarks de recuperación B2B (CLLA + MSB). Tasa estimada con Sena: {result.recovPct}%.
            </p>

            {/* Métricas */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              <div className="bg-[#F9F9F9] rounded-xl p-3">
                <p className="text-[10px] font-bold uppercase tracking-wider text-text-secondary mb-1">
                  Total en riesgo
                </p>
                <p className="font-canaro font-extrabold text-base text-brand-primary-dark leading-tight">
                  {fmtCLP(result.totalRiesgo)}
                </p>
              </div>
              <div className="bg-[#F9F9F9] rounded-xl p-3">
                <p className="text-[10px] font-bold uppercase tracking-wider text-text-secondary mb-1">
                  Recuperable con Sena
                </p>
                <p className="font-canaro font-extrabold text-base text-[#16A34A] leading-tight">
                  {fmtCLP(result.recuperable)}
                </p>
              </div>
              <div className="bg-[#F9F9F9] rounded-xl p-3">
                <p className="text-[10px] font-bold uppercase tracking-wider text-text-secondary mb-1">
                  Pierdes si esperas 60d
                </p>
                <p className="font-canaro font-extrabold text-base text-[#DC2626] leading-tight">
                  {fmtCLP(result.urgency)}
                </p>
              </div>
            </div>

            {/* Gráfico de barras */}
            <div className="mb-4">
              {state.montos.map((m, i) => {
                if (m === 0) return null
                const maxMonto = Math.max(...state.montos)
                const widthPct = maxMonto > 0 ? Math.max(8, Math.round((m / maxMonto) * 90)) : 0
                return (
                  <div key={i} className="flex items-center gap-2 mb-2">
                    <span className="text-[11px] text-text-secondary w-20 text-right flex-shrink-0">
                      {BUCKET_LABELS[i]}
                    </span>
                    <div className="flex-1 bg-[#EDEDED] rounded h-5 overflow-hidden">
                      <div
                        className="h-full rounded flex items-center justify-end pr-2 text-[10px] font-bold text-white whitespace-nowrap"
                        style={{ width: `${widthPct}%`, background: BUCKET_COLORS[i], minWidth: '60px' }}
                      >
                        {fmtCLP(m)}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Copy dinámico */}
            <div
              className="bg-surface-blue-soft border-l-4 border-brand-primary rounded-r-xl p-4 mb-4 text-sm text-brand-primary-dark leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: getDynamicCopy(result.criticalBucket, result.recuperable, result.urgency),
              }}
            />

            <Button
              text={`Quiero recuperar ${fmtCLP(result.recuperable)} →`}
              variant="primaryFilled"
              size="lg"
              fullWidth
              onClick={() => goTo(6)}
            />
            <p className="text-[11px] text-text-secondary text-center mt-2">
              Sin compromisos. Te contactamos en menos de 24 horas.
            </p>
          </div>
        )}

        {/* STEP 6: Lead capture */}
        {step === 6 && result && (
          <div>
            <button
              onClick={() => goTo(5)}
              className="text-xs text-text-secondary hover:text-brand-primary mb-4 flex items-center gap-1"
            >
              ← Ver mi análisis
            </button>
            <span className="inline-block text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full bg-brand-secondary/10 border border-brand-secondary/20 text-brand-secondary mb-3">
              Un paso más
            </span>
            <div className="w-8 h-[3px] rounded-full bg-brand-secondary mb-4" />
            <h2 className="font-canaro font-extrabold text-xl text-brand-primary-dark leading-tight mb-1">
              Recupera {fmtCLP(result.recuperable)} con Sena
              <span className="text-brand-secondary font-caslon">.</span>
            </h2>
            <p className="text-sm text-text-secondary mb-5">
              Un especialista de Sena te contactará en menos de 24 horas con una propuesta personalizada.
            </p>

            <div className="border border-[#EDEDED] rounded-2xl p-4 flex flex-col gap-3">
              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="Tu nombre"
                  required
                  placeholder="Jazmin"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
                <Input
                  label="Empresa"
                  required
                  placeholder="Sena"
                  value={empresa}
                  onChange={(e) => setEmpresa(e.target.value)}
                />
              </div>
              <Input
                label="Email de trabajo"
                type="email"
                required
                placeholder="jazmin@empresa.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                label="Teléfono (opcional)"
                type="tel"
                placeholder="+56 9 0000 0000"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
              />
              {submitError && <p className="text-[#DC2626] text-xs">{submitError}</p>}
              <Button
                text="Enviar y recibir mi análisis →"
                variant="primaryFilled"
                size="lg"
                fullWidth
                disabled={!canSubmitLead()}
                loading={submitting}
                onClick={submitLead}
              />
              <p className="text-[11px] text-text-secondary text-center">
                Al enviar, aceptas que Sena use estos datos para contactarte. Sin spam.
              </p>
            </div>
          </div>
        )}

        {/* STEP 7: Confirmación */}
        {step === 7 && result && (
          <div className="text-center py-4">
            <div className="w-14 h-14 rounded-full bg-[#16A34A]/10 flex items-center justify-center text-2xl mx-auto mb-4">
              ✓
            </div>
            <span className="inline-block text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full bg-[#16A34A]/10 border border-[#16A34A]/20 text-[#16A34A] mb-3">
              ¡Listo!
            </span>
            <div className="w-8 h-[3px] rounded-full bg-brand-primary mx-auto mb-4" />
            <h2 className="font-canaro font-extrabold text-xl text-brand-primary-dark mb-2">
              Tu análisis está en camino<span className="text-brand-secondary font-caslon">.</span>
            </h2>
            <p className="text-sm text-text-secondary mb-6">
              Hola {nombre}, un especialista de Sena te contactará en menos de 24 horas con una propuesta
              personalizada.
            </p>

            <div className="border border-[#EDEDED] rounded-2xl p-4 text-left mb-4">
              <p className="text-[11px] font-bold uppercase tracking-wider text-text-secondary mb-3">
                Resumen de tu análisis
              </p>
              <div className="flex flex-col gap-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-text-secondary">Cartera total en riesgo</span>
                  <strong className="text-brand-primary-dark">{fmtCLP(result.totalRiesgo)}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Recuperable con Sena</span>
                  <strong className="text-[#16A34A]">{fmtCLP(result.recuperable)}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Pérdida adicional si esperas 60 días</span>
                  <strong className="text-[#DC2626]">{fmtCLP(result.urgency)}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Tasa de recuperación estimada</span>
                  <strong className="text-brand-primary-dark">{result.recovPct}%</strong>
                </div>
              </div>
            </div>

            <Button text="Cerrar" variant="ghost" size="md" onClick={hideModal} />
          </div>
        )}
      </div>
    </div>
  )
}
