'use client'

import Link from 'next/link'
import { useRef, useState } from 'react'
import { Check, Download } from 'lucide-react'
import { personagens, type Personagem } from '@/data/personagens'
import { produtosDoAnime } from '@/data/produtos'
import { estilos, formatos, fundoClaro, nomeArquivo, type Estilo, type Formato } from '@/lib/wallpaper'
import { Celular } from './Celular'
import { ProdutoCard } from './ProdutoCard'
import { WallpaperCanvas } from './WallpaperCanvas'

export function WallpaperStudio({ personagem }: { personagem: Personagem }) {
  const [fraseIdx, setFraseIdx] = useState(0)
  const [estilo, setEstilo] = useState<Estilo>('tinta')
  const [formato, setFormato] = useState<Formato>('celular')
  const [relogio, setRelogio] = useState(true)
  const [status, setStatus] = useState<'ocioso' | 'gerando' | 'salvo' | 'erro'>('ocioso')
  const canvas = useRef<HTMLCanvasElement | null>(null)

  const frase = personagem.frases[fraseIdx]
  const { w, h } = formatos[formato]
  const produtos = produtosDoAnime(personagem.anime, 3, personagem.nome)

  async function baixar() {
    const c = canvas.current
    if (!c) return
    setStatus('gerando')
    try {
      const blob = await new Promise<Blob | null>((r) => c.toBlob(r, 'image/png'))
      if (!blob) throw new Error('canvas vazio')
      const nome = nomeArquivo(personagem, formato)
      const arquivo = new File([blob], nome, { type: 'image/png' })
      const toque = window.matchMedia('(pointer: coarse)').matches
      // No celular, a folha de compartilhar tem "Salvar imagem", que vai direto pra galeria.
      if (toque && navigator.canShare?.({ files: [arquivo] })) {
        await navigator.share({ files: [arquivo] })
      } else {
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = nome
        a.click()
        setTimeout(() => URL.revokeObjectURL(url), 2000)
      }
      setStatus('salvo')
    } catch (e) {
      // Fechar a folha de compartilhar não é erro.
      setStatus(e instanceof DOMException && e.name === 'AbortError' ? 'ocioso' : 'erro')
    }
  }

  return (
    <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
      <nav aria-label="Personagens" className="hide-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 py-6 sm:mx-0 sm:px-0">
        {personagens.map((p) => {
          const ativo = p.slug === personagem.slug
          return (
            <Link
              key={p.slug}
              href={`/wallpapers/${p.slug}`}
              scroll={false}
              aria-current={ativo ? 'page' : undefined}
              className={`shrink-0 border-2 border-tinta px-3 py-1.5 text-sm font-semibold transition-colors ${
                ativo ? 'bg-tinta text-papel' : 'hover:bg-papel-fundo'
              }`}
            >
              {p.nome}
            </Link>
          )
        })}
      </nav>

      <div className="grid gap-10 md:grid-cols-[minmax(0,340px)_1fr] lg:grid-cols-[minmax(0,380px)_1fr] lg:gap-16">
        <div className="mx-auto w-full max-w-[220px] sm:max-w-[280px] md:sticky md:top-24 md:mx-0 md:max-w-none md:self-start">
          {formato === 'celular' ? (
            <Celular relogio={relogio} fundoClaro={fundoClaro(estilo, personagem)}>
              <WallpaperCanvas ref={canvas} personagem={personagem} frase={frase} estilo={estilo} largura={w} altura={h} />
            </Celular>
          ) : (
            <div className="border-[9px] border-tinta">
              <WallpaperCanvas ref={canvas} personagem={personagem} frase={frase} estilo={estilo} largura={w} altura={h} />
            </div>
          )}
          {formato === 'celular' && (
            <label className="mt-4 flex cursor-pointer items-center justify-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={relogio}
                onChange={(e) => setRelogio(e.target.checked)}
                className="h-4 w-4 accent-[#151413]"
              />
              Ver com o relógio
            </label>
          )}
        </div>

        <div className="space-y-9">
          <div className="space-y-3">
            <h1 className="font-display text-4xl leading-[1.05] sm:text-5xl">Wallpaper do {personagem.nome}</h1>
            <p className="max-w-[52ch] text-tinta/75">
              Escolha a frase e o estilo. O arquivo sai em {w} × {h} px, pronto pra {formato === 'celular' ? 'tela de bloqueio' : 'área de trabalho'}.
            </p>
          </div>

          <fieldset className="space-y-3">
            <legend className="mb-3 font-semibold">Frase</legend>
            {personagem.frases.map((f, i) => (
              <label
                key={f}
                className={`flex cursor-pointer gap-3 border-2 border-tinta p-4 transition-colors ${
                  i === fraseIdx ? 'bg-tinta text-papel' : 'hover:bg-papel-fundo'
                }`}
              >
                <input
                  type="radio"
                  name="frase"
                  className="sr-only"
                  checked={i === fraseIdx}
                  onChange={() => setFraseIdx(i)}
                />
                <span className="leading-snug">“{f}”</span>
              </label>
            ))}
          </fieldset>

          <div className="grid gap-8 sm:grid-cols-2">
            <fieldset>
              <legend className="mb-3 font-semibold">Estilo</legend>
              <div className="flex gap-2">
                {estilos.map((e) => {
                  const fundo = e.id === 'tinta' ? '#E7E5DF' : e.id === 'noite' ? personagem.escuro : personagem.cor
                  return (
                    <label key={e.id} className="cursor-pointer text-center text-sm">
                      <input
                        type="radio"
                        name="estilo"
                        className="peer sr-only"
                        checked={estilo === e.id}
                        onChange={() => setEstilo(e.id)}
                      />
                      <span
                        className="mb-1.5 block h-14 w-14 border-2 border-tinta outline-offset-2 peer-checked:outline peer-checked:outline-[3px] peer-checked:outline-tinta peer-focus-visible:outline-carimbo"
                        style={{ backgroundColor: fundo }}
                      />
                      {e.rotulo}
                    </label>
                  )
                })}
              </div>
            </fieldset>

            <fieldset>
              <legend className="mb-3 font-semibold">Formato</legend>
              <div className="inline-flex border-2 border-tinta">
                {(Object.keys(formatos) as Formato[]).map((f) => (
                  <label key={f} className="cursor-pointer">
                    <input
                      type="radio"
                      name="formato"
                      className="peer sr-only"
                      checked={formato === f}
                      onChange={() => setFormato(f)}
                    />
                    <span className="block px-4 py-2 text-sm font-semibold peer-checked:bg-tinta peer-checked:text-papel peer-focus-visible:outline peer-focus-visible:outline-carimbo">
                      {formatos[f].rotulo}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
          </div>

          <div className="space-y-3">
            <button
              type="button"
              onClick={baixar}
              disabled={status === 'gerando'}
              className="inline-flex items-center gap-3 bg-tinta px-7 py-4 text-base font-semibold text-papel transition-transform active:translate-y-px disabled:opacity-60"
            >
              <Download className="h-5 w-5" strokeWidth={2} />
              {status === 'gerando' ? 'Gerando arquivo' : 'Baixar wallpaper'}
            </button>
            {status === 'salvo' && (
              <p role="status" className="flex items-center gap-2 text-sm font-semibold">
                <Check className="h-4 w-4" strokeWidth={2.5} /> Wallpaper salvo. Marca o @01dosanimes quando usar.
              </p>
            )}
            {status === 'erro' && (
              <p role="alert" className="text-sm font-semibold text-[#9b1c1c]">
                O navegador não deixou salvar o arquivo. Tente de novo ou use outro navegador.
              </p>
            )}
          </div>

          {produtos.length > 0 && (
            <section aria-labelledby="pro-quarto" className="border-t-2 border-tinta pt-8">
              <h2 id="pro-quarto" className="mb-5 font-display text-2xl leading-tight">
                Pro quarto de quem curte {personagem.anime}
              </h2>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 [&>*:nth-child(3)]:hidden sm:[&>*:nth-child(3)]:flex">
                {produtos.map((p) => (
                  <ProdutoCard key={p.id} produto={p} compacto />
                ))}
              </div>
              <Link
                href={`/achados?anime=${encodeURIComponent(personagem.anime)}`}
                className="mt-5 inline-block font-semibold underline underline-offset-4"
              >
                Ver todos os achados de {personagem.anime}
              </Link>
            </section>
          )}
        </div>
      </div>
    </div>
  )
}
