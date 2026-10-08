'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'
import { getPersonagem } from '@/data/personagens'
import { fundoClaro, type Estilo } from '@/lib/wallpaper'
import { Celular } from './Celular'
import { WallpaperCanvas } from './WallpaperCanvas'

const vitrine: { slug: string; estilo: Estilo }[] = [
  { slug: 'vegeta', estilo: 'noite' },
  { slug: 'itachi', estilo: 'tinta' },
  { slug: 'luffy', estilo: 'cor' },
  { slug: 'goku', estilo: 'noite' },
]

export function HeroWallpaper() {
  const [idx, setIdx] = useState(0)
  const reduzir = useReducedMotion()
  const atual = vitrine[idx]
  const p = getPersonagem(atual.slug)!

  return (
    <motion.div
      initial={reduzir ? false : { opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="w-full"
    >
      <Celular fundoClaro={fundoClaro(atual.estilo, p)}>
        <WallpaperCanvas personagem={p} frase={p.frases[0]} estilo={atual.estilo} largura={1080} altura={2340} />
      </Celular>
      <div className="mt-5 flex justify-center gap-2" role="group" aria-label="Trocar personagem do exemplo">
        {vitrine.map((v, i) => {
          const pv = getPersonagem(v.slug)!
          return (
            <button
              key={v.slug}
              type="button"
              onClick={() => setIdx(i)}
              aria-pressed={i === idx}
              className={`border-2 border-tinta px-3 py-1 text-sm font-semibold transition-colors ${
                i === idx ? 'bg-tinta text-papel' : 'hover:bg-papel-fundo'
              }`}
            >
              {pv.nome}
            </button>
          )
        })}
      </div>
    </motion.div>
  )
}
