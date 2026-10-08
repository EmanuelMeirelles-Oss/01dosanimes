import Link from 'next/link'
import { Instagram } from 'lucide-react'
import { personagens } from '@/data/personagens'
import { produtos, type Categoria } from '@/data/produtos'
import type { Estilo } from '@/lib/wallpaper'
import { CapaPersonagem } from '@/components/CapaPersonagem'
import { HeroWallpaper } from '@/components/HeroWallpaper'
import { PrateleiraPresentes } from '@/components/PrateleiraPresentes'

const estilosCapa: Estilo[] = ['noite', 'tinta', 'cor']

const contar = (c: Categoria) => produtos.filter((p) => p.categoria === c).length

// Quadros de mangá: cada categoria com um tratamento diferente, tamanhos diferentes.
const quadros: { categoria: Categoria; rotulo: string; classe: string; fundo: string; extra?: string }[] = [
  { categoria: 'Luminária', rotulo: 'Luminárias', classe: 'col-span-2 md:col-span-4 md:row-span-2 min-h-[240px] md:min-h-0', fundo: 'bg-tinta text-papel', extra: 'reticula-clara' },
  { categoria: 'Figure', rotulo: 'Figures', classe: 'md:col-span-2', fundo: 'bg-carimbo text-tinta' },
  { categoria: 'Pôster', rotulo: 'Pôsteres', classe: 'md:col-span-2', fundo: 'bg-papel-fundo text-tinta', extra: 'reticula opacity-[0.08]' },
  { categoria: 'Roupa', rotulo: 'Roupas', classe: 'md:col-span-3', fundo: 'bg-[#C8102E] text-papel' },
  { categoria: 'Mangá', rotulo: 'Mangás', classe: 'md:col-span-3', fundo: 'bg-papel text-tinta' },
]

export default function Home() {
  return (
    <>
      <section className="mx-auto grid max-w-[1280px] items-center gap-12 px-4 pb-16 pt-10 sm:px-6 md:min-h-[calc(100dvh-4rem)] md:grid-cols-[1.15fr_0.85fr] md:py-12">
        <div>
          <h1 className="font-display text-[2.6rem] leading-[1.02] sm:text-5xl lg:text-[4.2rem]">
            Frase de anime na sua tela de bloqueio.
          </h1>
          <p className="mt-6 max-w-[40ch] text-lg leading-relaxed text-tinta/80">
            Escolha o personagem e a frase. Baixe em alta resolução, de graça.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-6">
            <Link
              href="/wallpapers"
              className="bg-tinta px-7 py-4 text-base font-semibold text-papel transition-transform active:translate-y-px"
            >
              Criar wallpaper
            </Link>
            <Link href="/achados" className="font-semibold underline underline-offset-4">
              Ver achados
            </Link>
          </div>
        </div>
        <div className="mx-auto w-full max-w-[320px]">
          <HeroWallpaper />
        </div>
      </section>

      <section aria-labelledby="personagens" className="border-y-2 border-tinta bg-papel-fundo py-14">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
          <div className="mb-8 flex items-end justify-between gap-6">
            <h2 id="personagens" className="font-display text-3xl leading-tight sm:text-4xl">
              {personagens.length} personagens, 3 estilos
            </h2>
            <Link href="/wallpapers" className="shrink-0 font-semibold underline underline-offset-4">
              Ver todos
            </Link>
          </div>
          <div className="hide-scrollbar -mx-4 flex snap-x gap-4 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:px-6">
            {personagens.map((p, i) => (
              <div key={p.slug} className="w-[150px] shrink-0 snap-start sm:w-[170px]">
                <CapaPersonagem personagem={p} estilo={estilosCapa[i % 3]} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="presentes" className="mx-auto max-w-[1280px] px-4 pt-20 sm:px-6">
        <h2 id="presentes" className="mb-6 font-display text-3xl leading-tight sm:text-4xl">
          Presente pra quem ama anime
        </h2>
        <PrateleiraPresentes />
      </section>

      <section aria-labelledby="quarto" className="mx-auto max-w-[1280px] px-4 pt-20 sm:px-6">
        <h2 id="quarto" className="mb-6 font-display text-3xl leading-tight sm:text-4xl">
          Pra montar o quarto
        </h2>
        <div className="grid grid-cols-2 gap-[6px] border-[6px] border-tinta bg-tinta md:auto-rows-[170px] md:grid-cols-6">
          {quadros.map((q) => (
            <Link
              key={q.categoria}
              href={`/achados?categoria=${encodeURIComponent(q.categoria)}`}
              className={`group relative flex min-h-[150px] flex-col justify-between overflow-hidden p-5 ${q.fundo} ${q.classe}`}
            >
              {q.extra && <div className={`absolute inset-0 ${q.extra}`} />}
              {q.categoria === 'Mangá' && (
                <span
                  aria-hidden
                  className="pointer-events-none absolute -bottom-6 right-2 font-display text-[6rem] leading-none text-tinta/[0.07] md:text-[9rem]"
                >
                  漫画
                </span>
              )}
              <span className="relative text-sm font-semibold opacity-80">
                {contar(q.categoria) === 1 ? '1 achado' : `${contar(q.categoria)} achados`}
              </span>
              <span
                className={`relative font-display leading-none transition-transform duration-200 group-hover:translate-x-1 ${
                  q.categoria === 'Luminária' ? 'text-5xl md:text-7xl' : 'text-3xl md:text-4xl'
                }`}
              >
                {q.rotulo}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-4 pt-20 sm:px-6">
        <div className="relative flex flex-col gap-6 overflow-hidden bg-tinta p-8 text-papel sm:p-12 md:flex-row md:items-center md:justify-between">
          <div className="reticula-clara absolute inset-y-0 right-0 w-1/2" />
          <p className="relative max-w-[22ch] font-display text-3xl leading-tight sm:text-4xl">
            Mais frases e achados no Instagram.
          </p>
          <a
            href="https://instagram.com/01dosanimes"
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-flex shrink-0 items-center gap-3 self-start whitespace-nowrap bg-carimbo px-6 py-3.5 font-semibold text-tinta transition-transform active:translate-y-px md:self-auto"
          >
            <Instagram className="h-5 w-5" strokeWidth={2} />
            Seguir @01dosanimes
          </a>
        </div>
      </section>
    </>
  )
}
