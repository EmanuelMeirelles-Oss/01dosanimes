'use client'

import { useEffect, useState } from 'react'

// Moldura de celular com a tela de bloqueio por cima, para a pessoa ver
// como o wallpaper fica com o relógio (por isso o topo do wallpaper fica livre).
export function Celular({
  children,
  relogio = true,
  fundoClaro = false,
}: {
  children: React.ReactNode
  relogio?: boolean
  fundoClaro?: boolean
}) {
  const [agora, setAgora] = useState<Date | null>(null)

  useEffect(() => {
    setAgora(new Date())
    const id = setInterval(() => setAgora(new Date()), 30_000)
    return () => clearInterval(id)
  }, [])

  const hora = agora
    ? agora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    : ''
  const data = agora
    ? agora.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })
    : ''

  return (
    <div className="relative mx-auto w-full max-w-[300px] rounded-[2.6rem] bg-tinta p-[9px] shadow-[0_30px_60px_-30px_rgba(21,20,19,0.55)]">
      <div className="relative overflow-hidden rounded-[2.1rem]">
        {children}
        {relogio && (
          <div className={`pointer-events-none absolute inset-x-0 top-[7%] text-center ${
              fundoClaro ? 'text-tinta' : 'text-white [text-shadow:0_1px_12px_rgba(0,0,0,0.35)]'
            }`}>
            <p className="text-[13px] font-medium opacity-90">{data}</p>
            <p className="font-sans text-[64px] font-semibold leading-none tracking-tight tabular-nums">{hora}</p>
          </div>
        )}
        <div className="pointer-events-none absolute left-1/2 top-[10px] h-[22px] w-[84px] -translate-x-1/2 rounded-full bg-tinta" />
      </div>
    </div>
  )
}
