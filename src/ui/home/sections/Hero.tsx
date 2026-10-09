'use client'

import { AssetImage } from '@/lib/utils/assets/image'
import Button from '@/ui/shared/Button'
import { useCallback, useEffect, useState } from 'react'

const rotatingWords = ['bien', 'con criterio', 'a tiempo', 'con cuidado']

export const Hero = () => {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  const typeSpeed = 100
  const deleteSpeed = 50
  const pauseTime = 2000

  const tick = useCallback(() => {
    const currentWord = rotatingWords[currentIndex]

    if (!isDeleting) {
      setDisplayText(currentWord.substring(0, displayText.length + 1))

      if (displayText === currentWord) {
        setTimeout(() => setIsDeleting(true), pauseTime)
        return
      }
    } else {
      setDisplayText(currentWord.substring(0, displayText.length - 1))

      if (displayText === '') {
        setIsDeleting(false)
        setCurrentIndex((prev) => (prev + 1) % rotatingWords.length)
        return
      }
    }
  }, [currentIndex, displayText, isDeleting])

  useEffect(() => {
    const speed = isDeleting ? deleteSpeed : typeSpeed
    const timer = setTimeout(tick, speed)
    return () => clearTimeout(timer)
  }, [tick, isDeleting])

  const onRedirectHubspot = () => {
    window.open('https://meetings.hubspot.com/francisco502', '_blank')
  }

  return (
    <div className="flex flex-col mx-auto max-w-[1280px] px-4 md:px-10 py-10">
      {/* Desktop Layout */}
      <div className="hidden md:flex flex-row items-center">
        <div className="w-[60%] flex flex-col gap-4">
          <h1 className="text-brand-primary-dark font-canaro text-7xl font-extrabold">
            El arte de <br /> cobrar{' '}
            <span className="text-brand-primary font-semibold font-caslon">
              {displayText}
              <span className="animate-pulse">|</span>
              <span className="text-brand-secondary">.</span>
            </span>
          </h1>
          <p className="font-adobe text-black text-xl max-w-[90%]">
            Sena cubre <span className="font-bold">todo el ciclo de cobranza</span>, de la factura emitida al
            pago conciliado. Opéralo tú en nuestra plataforma o{' '}
            <span className="font-bold">delégalo completo</span> a nuestro equipo: IA para lo temprano,
            especialistas humanos para lo difícil, sin romper la relación con tus clientes.
          </p>
        </div>
        <div className="w-[40%] flex justify-end">
          <img src={AssetImage.home4.src} alt="home" className="w-full max-h-[340px] object-contain" />
        </div>
      </div>

      <div className="md:flex hidden flex-row items-start gap-2 mt-4">
        <Button text="Agenda una demo" size="md" className="text-xl" onClick={onRedirectHubspot} />
        <Button
          text="Ver las 3 opciones"
          variant="primaryDarkOutlined"
          size="md"
          className="text-xl"
          onClick={() => {
            const element = document.getElementById('productos')
            if (element) {
              element.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }
          }}
        />
      </div>

      {/* Mobile Layout */}
      <div className="flex md:hidden flex-col gap-4">
        {/* Título arriba */}
        <div className="flex ">
          <div className="flex flex-col gap-4">
            <h1 className="text-brand-primary-dark font-canaro text-3xl font-extrabold">
              El arte de <br /> cobrar{' '}
              <span className="text-brand-primary font-semibold font-caslon">
                {displayText}
                <span className="animate-pulse">|</span>
                <span className="text-brand-secondary">.</span>
              </span>
            </h1>

            {/* Descripción + Imagen en fila */}
            <div className="flex flex-row gap-2">
              <p className="font-adobe text-black text-md xs:text-xs flex-1">
                Sena cubre <span className="font-bold">todo el ciclo de cobranza</span>, de la factura emitida
                al pago conciliado. Opéralo tú en nuestra plataforma o{' '}
                <span className="font-bold">delégalo completo</span> a nuestro equipo: IA para lo temprano,
                especialistas humanos para lo difícil.
              </p>
            </div>
          </div>

          <img
            src={AssetImage.home4.src}
            alt="home"
            className="flex-1 my-auto max-h-[200px] object-contain"
          />
        </div>

        {/* Botones abajo */}
        <div className="flex flex-row items-start gap-2">
          <Button text="Agenda una demo" size="sm" className="text-xs" onClick={onRedirectHubspot} />
          <Button
            text="Ver las 3 opciones"
            variant="primaryDarkOutlined"
            size="sm"
            className="text-xs"
            onClick={() => {
              const element = document.getElementById('productos')
              if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }
            }}
          />
        </div>
      </div>
    </div>
  )
}
