import type { Metadata } from 'next'
import { Suspense } from 'react'
import { Catalogo } from '@/components/Catalogo'

export const metadata: Metadata = {
  title: 'Achados de anime: presentes, decoração e colecionáveis',
  description:
    'Luminárias, pôsteres, figures, camisetas e mangás de Dragon Ball, Naruto, One Piece e mais. Filtre por anime e por faixa de preço.',
}

export default function Page() {
  return (
    <div className="mx-auto max-w-[1280px] px-4 pt-12 sm:px-6">
      <h1 className="font-display text-4xl leading-[1.05] sm:text-6xl">Achados</h1>
      <p className="mt-4 mb-10 max-w-[56ch] text-tinta/75">
        O que vale a pena pra decorar o quarto, completar a coleção ou dar de presente. Filtre por anime, tipo
        e quanto quer gastar.
      </p>
      <Suspense fallback={<div className="h-40 border-y-2 border-tinta" />}>
        <Catalogo />
      </Suspense>
    </div>
  )
}
