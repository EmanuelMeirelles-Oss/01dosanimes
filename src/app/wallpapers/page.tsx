import type { Metadata } from 'next'
import { animes, personagens } from '@/data/personagens'
import { CapaPersonagem } from '@/components/CapaPersonagem'

export const metadata: Metadata = {
  title: 'Wallpapers de frases de anime',
  description:
    'Wallpapers com frases de Dragon Ball, Naruto, One Piece, Attack on Titan e mais. Escolha o personagem e baixe para celular ou PC.',
}

export default function Page() {
  return (
    <div className="mx-auto max-w-[1280px] px-4 pt-12 sm:px-6">
      <h1 className="font-display text-4xl leading-[1.05] sm:text-6xl">Escolha o personagem</h1>
      <p className="mt-4 max-w-[52ch] text-tinta/75">
        Cada um tem as frases mais marcantes e três estilos. Você monta, baixa e coloca na tela de bloqueio.
      </p>

      <div className="mt-12 space-y-14">
        {animes.map((anime) => (
          <section key={anime} aria-labelledby={`anime-${anime}`}>
            <h2 id={`anime-${anime}`} className="mb-5 border-b-2 border-tinta pb-2 font-display text-2xl">
              {anime}
            </h2>
            <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
              {personagens
                .filter((p) => p.anime === anime)
                .map((p) => (
                  <CapaPersonagem key={p.slug} personagem={p} />
                ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
