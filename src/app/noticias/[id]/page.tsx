"use client"

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Clock, Share2, Facebook, Twitter, Link as LinkIcon, Flame, ShoppingCart } from 'lucide-react'
import { motion } from 'framer-motion'

// Mock de dados para a página de notícia (no futuro, vira fetch do DB)
const getNoticiaDetails = (id: string) => {
  return {
    id,
    titulo: 'Sparking Zero rompe barreiras: Nova engine traz lutas destrutivas',
    resumo: 'A tão aguardada sequência da série Budokai Tenkaichi revela mecânicas de destruição de cenário sem precedentes e um elenco massivo de personagens.',
    conteudo_html: `
      <p>Os fãs de Dragon Ball têm motivos de sobra para comemorar. A Bandai Namco finalmente revelou mais detalhes sobre <strong>Dragon Ball: Sparking Zero</strong>, o sucessor espiritual da lendária série Budokai Tenkaichi.</p>
      <h2>Destruição em Escala Global</h2>
      <p>Uma das maiores novidades é a engine de destruição. Montanhas não apenas quebram, mas se desfazem em tempo real dependendo do impacto do golpe ou da rajada de ki. O clima também muda drasticamente durante o combate.</p>
      <blockquote>"Queríamos trazer a verdadeira sensação de ser um guerreiro Z", disse o produtor principal.</blockquote>
      <p>Além disso, o jogo contará com o maior elenco da história da franquia, incluindo personagens de Dragon Ball Super, GT e clássico.</p>
    `,
    imagem: 'https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?q=80&w=1920&auto=format&fit=crop',
    fonte: 'Equipe 01zanimes',
    autor: 'Emanuel',
    categoria: 'Games',
    tempo_leitura: '3 min',
    criado_em: new Date().toISOString()
  }
}

export default function NoticiaPage() {
  const params = useParams()
  const noticia = getNoticiaDetails(params.id as string)

  return (
    <div className="min-h-screen pb-20">
      {/* Imagem de Capa com Parallax Effect */}
      <div className="relative w-full h-[50vh] md:h-[60vh] bg-[#050505]">
        {noticia.imagem ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img 
            src={noticia.imagem} 
            alt={noticia.titulo}
            className="w-full h-full object-cover opacity-60"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Flame className="w-20 h-20 text-primary/30" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-[#000000]/60 to-transparent" />
        
        {/* Navbar de Retorno */}
        <div className="absolute top-0 left-0 w-full p-6 z-20">
          <Link href="/noticias" className="inline-flex items-center gap-2 text-zinc-300 hover:text-primary transition-colors bg-black/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 font-bold text-sm uppercase tracking-wider">
            <ArrowLeft className="w-4 h-4" /> Voltar
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 -mt-32 relative z-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          {/* Cabeçalho da Notícia */}
          <div className="mb-10 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
              <span className="px-3 py-1 bg-primary text-black text-xs font-black uppercase tracking-widest rounded">
                {noticia.categoria}
              </span>
              <span className="text-zinc-400 text-xs font-bold uppercase tracking-widest flex items-center gap-1">
                <Clock className="w-3 h-3" /> {noticia.tempo_leitura} de leitura
              </span>
            </div>
            
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
              {noticia.titulo}
            </h1>
            
            <p className="text-lg md:text-xl text-zinc-400 font-medium mb-8 leading-relaxed">
              {noticia.resumo}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-between border-y border-[#1f1f1f] py-4 gap-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
                  <span className="font-black text-primary text-lg">{noticia.autor[0]}</span>
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-white uppercase tracking-wider">{noticia.autor}</p>
                  <p className="text-xs text-zinc-500 uppercase font-bold tracking-widest">{new Date(noticia.criado_em).toLocaleDateString('pt-BR')}</p>
                </div>
              </div>

              {/* Botões de Compartilhar */}
              <div className="flex gap-2">
                <button className="p-2 rounded-full bg-[#0a0a0a] border border-[#1f1f1f] text-zinc-400 hover:text-blue-500 hover:border-blue-500 transition-colors">
                  <Facebook className="w-4 h-4" />
                </button>
                <button className="p-2 rounded-full bg-[#0a0a0a] border border-[#1f1f1f] text-zinc-400 hover:text-sky-400 hover:border-sky-400 transition-colors">
                  <Twitter className="w-4 h-4" />
                </button>
                <button className="p-2 rounded-full bg-[#0a0a0a] border border-[#1f1f1f] text-zinc-400 hover:text-white hover:border-white transition-colors">
                  <LinkIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Conteúdo HTML */}
          <div className="prose prose-invert prose-orange max-w-none prose-lg md:prose-xl prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tighter prose-p:text-zinc-300 prose-p:leading-relaxed prose-a:text-primary prose-blockquote:border-primary prose-blockquote:bg-primary/5 prose-blockquote:p-4 prose-blockquote:rounded-r-lg">
            <div dangerouslySetInnerHTML={{ __html: noticia.conteudo_html }} />
          </div>

          {/* Afiliado Contextual */}
          <div className="mt-16 p-8 rounded-3xl bg-gradient-to-br from-[#141414] to-[#0a0a0a] border border-primary/20 relative overflow-hidden group shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] group-hover:bg-primary/20 transition-colors pointer-events-none" />
            <div className="relative z-10 flex flex-col sm:flex-row items-center gap-8">
              <div className="w-40 h-40 flex-shrink-0 bg-black rounded-xl border border-[#2a2a2a] overflow-hidden shadow-2xl group-hover:scale-105 transition-transform">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/wal_goku.png" alt="Produto Recomendado" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <span className="text-primary text-xs font-black uppercase tracking-widest mb-2 block text-glow">Patrocinado · Recomendação 01</span>
                <h3 className="text-2xl md:text-3xl font-black text-white mb-3">Setup Otaku / Colecionáveis</h3>
                <p className="text-zinc-400 text-sm md:text-base mb-6 max-w-lg">
                  Aproveite a empolgação da notícia e garanta itens exclusivos do seu anime favorito com desconto na Amazon.
                </p>
                <a href="#" className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-black font-black uppercase tracking-widest rounded-full hover:bg-white hover:scale-105 transition-all shadow-[0_0_20px_rgba(249,115,22,0.3)] text-sm">
                  <ShoppingCart className="w-5 h-5" /> Ver Ofertas na Amazon
                </a>
              </div>
            </div>
          </div>

        </motion.div>
      </div>
    </div>
  )
}
