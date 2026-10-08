'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { categorias, faixas, produtos } from '@/data/produtos'
import { ProdutoCard } from './ProdutoCard'

const animesComProduto = Array.from(new Set(produtos.map((p) => p.anime)))

function Filtro({
  titulo,
  chave,
  opcoes,
  valor,
  mudar,
}: {
  titulo: string
  chave: string
  opcoes: { valor: string; rotulo: string }[]
  valor: string | null
  mudar: (chave: string, valor: string | null) => void
}) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:gap-4">
      <p className="w-24 shrink-0 text-sm font-semibold">{titulo}</p>
      <div className="hide-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0">
        {[{ valor: '', rotulo: 'Todos' }, ...opcoes].map((o) => {
          const ativo = (valor ?? '') === o.valor
          return (
            <button
              key={o.valor || 'todos'}
              type="button"
              aria-pressed={ativo}
              onClick={() => mudar(chave, o.valor || null)}
              className={`shrink-0 border-2 border-tinta px-3 py-1 text-sm font-semibold transition-colors ${
                ativo ? 'bg-tinta text-papel' : 'hover:bg-papel-fundo'
              }`}
            >
              {o.rotulo}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export function Catalogo() {
  const params = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const anime = params.get('anime')
  const categoria = params.get('categoria')
  const faixa = params.get('preco')

  function mudar(chave: string, valor: string | null) {
    const novo = new URLSearchParams(params.toString())
    if (valor) novo.set(chave, valor)
    else novo.delete(chave)
    const q = novo.toString()
    router.replace(q ? `${pathname}?${q}` : pathname, { scroll: false })
  }

  const teste = faixas.find((f) => f.id === faixa)?.teste
  const lista = produtos.filter(
    (p) => (!anime || p.anime === anime) && (!categoria || p.categoria === categoria) && (!teste || teste(p)),
  )

  return (
    <div>
      <div className="space-y-4 border-y-2 border-tinta py-5">
        <Filtro
          titulo="Anime"
          chave="anime"
          valor={anime}
          mudar={mudar}
          opcoes={animesComProduto.map((a) => ({ valor: a, rotulo: a }))}
        />
        <Filtro
          titulo="O quê"
          chave="categoria"
          valor={categoria}
          mudar={mudar}
          opcoes={categorias.map((c) => ({ valor: c, rotulo: c }))}
        />
        <Filtro
          titulo="Preço"
          chave="preco"
          valor={faixa}
          mudar={mudar}
          opcoes={faixas.map((f) => ({ valor: f.id, rotulo: f.rotulo }))}
        />
      </div>

      <p className="mt-6 text-sm text-tinta/70" aria-live="polite">
        {lista.length === 1 ? '1 achado' : `${lista.length} achados`}
      </p>

      {lista.length > 0 ? (
        <div className="mt-4 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
          {lista.map((p) => (
            <ProdutoCard key={p.id} produto={p} />
          ))}
        </div>
      ) : (
        <div className="mt-4 border-2 border-dashed border-tinta p-10 text-center">
          <p className="font-display text-2xl">Nada com esses filtros</p>
          <p className="mt-2 text-tinta/75">Tire um dos filtros ou escolha outro anime.</p>
          <button
            type="button"
            onClick={() => router.replace(pathname, { scroll: false })}
            className="mt-5 bg-tinta px-5 py-2.5 font-semibold text-papel"
          >
            Limpar filtros
          </button>
        </div>
      )}
    </div>
  )
}
