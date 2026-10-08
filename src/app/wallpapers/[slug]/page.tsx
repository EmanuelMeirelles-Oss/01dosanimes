import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPersonagem, personagens } from '@/data/personagens'
import { WallpaperStudio } from '@/components/WallpaperStudio'

export function generateStaticParams() {
  return personagens.map((p) => ({ slug: p.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = getPersonagem(params.slug)
  if (!p) return {}
  return {
    title: `Wallpaper ${p.nome} com frase (${p.anime})`,
    description: `Wallpaper do ${p.nome} com frase de ${p.anime}, para celular e PC. Escolha a frase e o estilo e baixe em alta resolução.`,
  }
}

export default function Page({ params }: { params: { slug: string } }) {
  const personagem = getPersonagem(params.slug)
  if (!personagem) notFound()
  // key: trocar de personagem reinicia frase e estilo escolhidos.
  return <WallpaperStudio key={personagem.slug} personagem={personagem} />
}
