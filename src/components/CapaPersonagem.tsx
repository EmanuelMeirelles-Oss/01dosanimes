'use client'

import Link from 'next/link'
import type { Personagem } from '@/data/personagens'
import type { Estilo } from '@/lib/wallpaper'
import { WallpaperCanvas } from './WallpaperCanvas'

// Miniatura: o próprio wallpaper desenhado em escala pequena.
export function CapaPersonagem({ personagem, estilo = 'noite' }: { personagem: Personagem; estilo?: Estilo }) {
  return (
    <Link href={`/wallpapers/${personagem.slug}`} className="group block">
      <div className="overflow-hidden border-2 border-tinta transition-transform duration-150 group-hover:-translate-y-1">
        <WallpaperCanvas
          personagem={personagem}
          frase={personagem.frases[0]}
          estilo={estilo}
          largura={360}
          altura={780}
          rotulo={`Wallpaper do ${personagem.nome}`}
        />
      </div>
      <p className="mt-2 font-semibold leading-tight">{personagem.nome}</p>
      <p className="text-sm text-tinta/65">{personagem.anime}</p>
    </Link>
  )
}
