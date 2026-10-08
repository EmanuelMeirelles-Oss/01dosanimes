'use client'

import Link from 'next/link'
import { useState } from 'react'
import { faixas, produtos } from '@/data/produtos'
import { ProdutoCard } from './ProdutoCard'

export function PrateleiraPresentes() {
  const [faixa, setFaixa] = useState<(typeof faixas)[number]['id']>('ate-50')
  const atual = faixas.find((f) => f.id === faixa)!
  const lista = produtos.filter(atual.teste).slice(0, 4)

  return (
    <div>
      <div role="tablist" aria-label="Faixa de preço" className="mb-6 inline-flex border-2 border-tinta">
        {faixas.map((f) => (
          <button
            key={f.id}
            role="tab"
            type="button"
            aria-selected={f.id === faixa}
            onClick={() => setFaixa(f.id)}
            className={`px-4 py-2 text-sm font-semibold sm:px-5 ${f.id === faixa ? 'bg-tinta text-papel' : 'hover:bg-papel-fundo'}`}
          >
            {f.rotulo}
          </button>
        ))}
      </div>
      <div role="tabpanel" className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
        {lista.map((p) => (
          <ProdutoCard key={p.id} produto={p} />
        ))}
      </div>
      <Link href={`/achados?preco=${faixa}`} className="mt-6 inline-block font-semibold underline underline-offset-4">
        Ver todos: {atual.rotulo}
      </Link>
    </div>
  )
}
