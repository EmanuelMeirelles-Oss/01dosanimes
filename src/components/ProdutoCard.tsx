/* eslint-disable @next/next/no-img-element */
import { corDoAnime } from '@/data/personagens'
import { textoSobre } from '@/lib/cor'
import { formatarPreco, nomeLoja, type Produto } from '@/data/produtos'

// Card inteiro é o link de afiliado. rel="sponsored" é o atributo correto para link pago.
export function ProdutoCard({ produto, compacto = false }: { produto: Produto; compacto?: boolean }) {
  const cor = corDoAnime(produto.anime)
  const texto = textoSobre(cor)

  return (
    <a
      href={produto.link}
      target="_blank"
      rel="sponsored nofollow noopener"
      className="group flex flex-col border-2 border-tinta bg-papel transition-transform duration-150 hover:-translate-y-1 active:translate-y-0"
    >
      <div className={`relative overflow-hidden border-b-2 border-tinta aspect-square`}>
        {produto.imagem ? (
          <img
            src={produto.imagem}
            alt={produto.nome}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          // Sem foto ainda: papel com retícula, tarja na cor do anime e a categoria em destaque.
          <div className="flex h-full w-full flex-col justify-between bg-papel-fundo p-4">
            <div className="reticula absolute inset-0 opacity-[0.07]" />
            <span
              className="relative self-start px-2 py-1 text-xs font-semibold"
              style={{ backgroundColor: cor, color: texto }}
            >
              {produto.anime}
            </span>
            <span className={`relative font-display leading-[0.95] ${compacto ? 'text-xl' : 'text-2xl lg:text-3xl'}`}>
              {produto.categoria}
            </span>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-3 sm:p-4">
        <p className="text-[15px] font-semibold leading-snug">{produto.nome}</p>
        <div className="mt-auto flex items-end justify-between gap-2">
          <p className="leading-none">
            <span className="block text-xs text-tinta/65">a partir de</span>
            <span className="font-display text-xl tabular-nums">{formatarPreco(produto.preco)}</span>
          </p>
          <span className="shrink-0 bg-carimbo px-2 py-1 text-xs font-semibold text-tinta group-hover:bg-tinta group-hover:text-papel">
            Ver na {nomeLoja[produto.loja]}
          </span>
        </div>
      </div>
    </a>
  )
}
