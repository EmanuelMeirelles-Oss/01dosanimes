'use client'

import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import type { Personagem } from '@/data/personagens'
import { carregarFontes, desenharWallpaper, lerFontes, type Estilo } from '@/lib/wallpaper'

interface Props {
  personagem: Personagem
  frase: string
  estilo: Estilo
  largura: number
  altura: number
  className?: string
  rotulo?: string
}

// O mesmo canvas é o preview e o arquivo baixado: o que a pessoa vê é o que ela leva.
export const WallpaperCanvas = forwardRef<HTMLCanvasElement | null, Props>(function WallpaperCanvas(
  { personagem, frase, estilo, largura, altura, className, rotulo },
  ref,
) {
  const canvas = useRef<HTMLCanvasElement>(null)
  const [pronto, setPronto] = useState(false)
  useImperativeHandle(ref, () => canvas.current as HTMLCanvasElement)

  useEffect(() => {
    let cancelado = false
    const fontes = lerFontes()
    carregarFontes(fontes, personagem.jp + frase).then(() => {
      const ctx = canvas.current?.getContext('2d')
      if (!ctx || cancelado) return
      desenharWallpaper(ctx, { personagem, frase, estilo, w: largura, h: altura, fontes })
      setPronto(true)
    })
    return () => {
      cancelado = true
    }
  }, [personagem, frase, estilo, largura, altura])

  return (
    <canvas
      ref={canvas}
      width={largura}
      height={altura}
      role="img"
      aria-label={rotulo ?? `Wallpaper de ${personagem.nome}: ${frase}`}
      className={`block w-full h-auto transition-opacity duration-300 ${pronto ? 'opacity-100' : 'opacity-0'} ${className ?? ''}`}
      style={{ backgroundColor: estilo === 'tinta' ? '#E7E5DF' : estilo === 'noite' ? personagem.escuro : personagem.cor }}
    />
  )
})
