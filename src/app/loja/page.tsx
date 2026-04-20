"use client"

import { Construction } from 'lucide-react'
import Link from 'next/link'

export default function Loja() {
  return (
    <div className="container mx-auto px-4 py-20 min-h-[calc(100vh-8rem)] flex flex-col items-center justify-center text-center">
      <Construction className="w-24 h-24 text-primary mb-6 animate-pulse" />
      <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4 text-glow">
        LOJA EM <span className="text-white">CONSTRUÇÃO</span>
      </h1>
      <p className="text-zinc-500 max-w-lg mx-auto font-medium mb-8">
        Nossa loja oficial está temporariamente desativada. Estamos forjando novos itens lendários para você.
      </p>
      
      <Link href="/" className="px-8 py-3 rounded-full bg-[#111] border border-[#222] font-bold text-zinc-300 hover:text-black hover:bg-primary hover:border-primary transition-all duration-300 shadow-lg">
        VOLTAR PARA O INÍCIO
      </Link>
    </div>
  )
}
