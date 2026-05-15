"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Clock, TrendingUp, ChevronRight, Flame, Search } from 'lucide-react'
import Link from 'next/link'

const mockNoticias = [
  // Destaque Principal
  { id: '1', titulo: 'Sparking Zero rompe barreiras: Nova engine traz lutas destrutivas', resumo: 'A tão aguardada sequência da série Budokai Tenkaichi revela mecânicas de destruição de cenário sem precedentes e um elenco massivo de personagens.', url: '/noticias/1', imagem: 'https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?q=80&w=1920&auto=format&fit=crop', fonte: 'IGN Brasil', categoria: 'Games', destaque: true, criado_em: new Date().toISOString() },
  
  // Lista
  { id: '4', titulo: 'Solo Leveling: Episódio final da 1ª temporada quebra a internet', resumo: 'A adaptação animada do famoso manhwa encerrou sua primeira temporada com uma qualidade de animação de cair o queixo, gerando comoção global.', url: '/noticias/4', imagem: 'https://images.unsplash.com/photo-1578632616212-32b0f4d36efd?q=80&w=1920&auto=format&fit=crop', fonte: 'Crunchyroll', categoria: 'Anime', destaque: false, criado_em: new Date(Date.now() - 3600000).toISOString() },
  { id: '2', titulo: 'Mangá de Dragon Ball Super revela nova transformação de Gohan', resumo: 'O mais recente capítulo trouxe de volta Gohan aos holofotes com uma nova forma impressionante.', url: '/noticias/2', imagem: 'https://images.unsplash.com/photo-1542204165-65bf26472b9b?q=80&w=1920&auto=format&fit=crop', fonte: 'Manga Plus', categoria: 'Mangá', destaque: false, criado_em: new Date(Date.now() - 7200000).toISOString() },
  { id: '6', titulo: 'Jujutsu Kaisen entra no seu arco final no Mangá', resumo: 'Gege Akutami confirmou que a obra está se encaminhando para sua conclusão ainda este ano.', url: '/noticias/6', imagem: 'https://images.unsplash.com/photo-1613376023733-0a73315d9b06?q=80&w=1920&auto=format&fit=crop', fonte: 'Shonen Jump', categoria: 'Mangá', destaque: false, criado_em: new Date(Date.now() - 86400000).toISOString() },
  { id: '5', titulo: 'Demon Slayer: Treinamento Hashira chegará aos cinemas na próxima semana', resumo: 'O novo arco da jornada de Tanjiro terá sua estreia nas telonas de todo o mundo antes de chegar à TV.', url: '/noticias/5', imagem: null, fonte: 'Aniplex', categoria: 'Anime', destaque: false, criado_em: new Date(Date.now() - 172800000).toISOString() },
  { id: '11', titulo: 'O retorno de Bleach agita fãs com nova parte de "Thousand-Year Blood War"', resumo: 'A animação deslumbrante do estúdio Pierrot continua a adaptar o arco final do mangá com cenas inéditas.', url: '/noticias/11', imagem: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1920&auto=format&fit=crop', fonte: 'Viz Media', categoria: 'Anime', destaque: false, criado_em: new Date(Date.now() - 259200000).toISOString() },
  { id: '9', titulo: 'Retorno do anime de Dragon Ball Super é discutido por ex-diretor', resumo: 'Rumores apontam que a série animada pode voltar após um longo hiato focado nos filmes.', url: '/noticias/9', imagem: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1920&auto=format&fit=crop', fonte: 'Toei Animation', categoria: 'Anime', destaque: false, criado_em: new Date(Date.now() - 345600000).toISOString() },
]

export default function Noticias() {
  const [activeCategory, setActiveCategory] = useState<string>('Todas')
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  const categorias = ['Todas', 'Anime', 'Mangá', 'Games']

  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => setIsLoading(false), 500)
    return () => clearTimeout(timer)
  }, [activeCategory, searchQuery])

  const filteredNoticias = mockNoticias.filter(n => {
    const matchCategory = activeCategory === 'Todas' || n.categoria === activeCategory
    const matchSearch = n.titulo.toLowerCase().includes(searchQuery.toLowerCase()) || n.resumo.toLowerCase().includes(searchQuery.toLowerCase())
    return matchCategory && matchSearch
  })

  const destaque = mockNoticias.find(n => n.destaque)
  const lista = filteredNoticias.filter(n => !n.destaque)

  return (
    <div className="container mx-auto px-4 lg:px-8 py-12 min-h-[calc(100vh-8rem)]">
      {/* Header do Portal */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-[#1f1f1f] pb-6 gap-6">
        <div className="flex-1">
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white">
            Portal de <span className="text-primary">Notícias</span>
          </h1>
          <p className="text-zinc-400 mt-2 text-sm md:text-base max-w-xl">
            Sua fonte definitiva para as últimas novidades do mundo otaku.
          </p>
        </div>

        {/* Busca e Categorias */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input 
              type="text" 
              placeholder="Buscar notícia..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0a0a0a] border border-[#1f1f1f] text-white text-sm rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:border-primary transition-colors placeholder:text-zinc-600"
            />
          </div>
        </div>
      </div>
      
      {/* Categorias Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-8 hide-scrollbar">
          {categorias.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap
                ${activeCategory === cat 
                  ? 'bg-primary text-black shadow-[0_0_15px_rgba(249,115,22,0.3)]' 
                  : 'bg-[#0a0a0a] text-zinc-400 hover:text-white border border-[#1f1f1f] hover:border-primary/50'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div 
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full flex justify-center py-20"
          >
            <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
          </motion.div>
        ) : (
          <motion.div 
            key="content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Grid Principal: Destaque + Trending */}
            {(activeCategory === 'Todas' && destaque) && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
                
                {/* Manchete Principal */}
                <div className="lg:col-span-2 relative group rounded-2xl overflow-hidden bg-[#050505] border border-[#1f1f1f] block h-[400px] md:h-[500px]">
                  <Link href={destaque.url} className="absolute inset-0 z-20" aria-label={destaque.titulo}></Link>
                  {destaque.imagem && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img 
                      src={destaque.imagem} 
                      alt={destaque.titulo}
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none" />
                  
                  <div className="absolute bottom-0 left-0 w-full p-6 md:p-10 z-10 pointer-events-none">
                    <span className="inline-block px-3 py-1 bg-primary text-black text-xs font-black uppercase tracking-wider rounded mb-4">
                      Destaque • {destaque.categoria}
                    </span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight mb-3 group-hover:text-primary transition-colors">
                      {destaque.titulo}
                    </h2>
                    <p className="text-zinc-300 text-sm md:text-base max-w-3xl line-clamp-2 md:line-clamp-none mb-4">
                      {destaque.resumo}
                    </p>
                    <div className="flex items-center gap-4 text-xs font-bold text-zinc-400 uppercase tracking-wider">
                      <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-primary" /> {new Date(destaque.criado_em).toLocaleDateString('pt-BR')}</span>
                      <span>Fonte: {destaque.fonte}</span>
                    </div>
                  </div>
                </div>

                {/* Trending Sidebar */}
                <div className="flex flex-col bg-[#050505] border border-[#1f1f1f] rounded-2xl p-6 relative h-[400px] md:h-[500px]">
                  <div className="flex items-center gap-2 mb-6 border-b border-[#1f1f1f] pb-4">
                    <TrendingUp className="text-primary w-5 h-5" />
                    <h3 className="text-lg font-black uppercase tracking-widest text-white">Em Alta</h3>
                  </div>
                  
                  <div className="flex flex-col gap-6 overflow-y-auto pr-2 custom-scrollbar">
                    {lista.slice(0, 4).map((noticia, idx) => (
                      <Link key={noticia.id} href={noticia.url} className="group flex gap-4 items-start">
                        <span className="text-3xl font-black text-[#1f1f1f] group-hover:text-primary/30 transition-colors">0{idx + 1}</span>
                        <div>
                          <h4 className="text-sm font-bold text-zinc-200 group-hover:text-primary transition-colors leading-snug line-clamp-2 mb-1">
                            {noticia.titulo}
                          </h4>
                          <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">
                            {noticia.categoria} • {new Date(noticia.criado_em).toLocaleDateString('pt-BR')}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Lista de Notícias */}
            <div className="mb-8 border-b border-[#1f1f1f] pb-4">
              <h3 className="text-2xl font-black uppercase tracking-tighter flex items-center gap-3">
                {activeCategory === 'Todas' ? 'Últimas Notícias' : `Notícias de ${activeCategory}`}
                <ChevronRight className="w-5 h-5 text-primary" />
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {lista.map((noticia) => (
                <Link 
                  href={noticia.url}
                  key={noticia.id}
                  className="group flex flex-col bg-[#050505] border border-[#1f1f1f] rounded-xl overflow-hidden hover:border-primary/50 transition-colors duration-300 relative"
                >
                  <div className="h-48 relative overflow-hidden bg-[#0a0a0a]">
                    {noticia.imagem ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img 
                        src={noticia.imagem} 
                        alt={noticia.titulo}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Flame className="w-10 h-10 text-primary/30" />
                      </div>
                    )}
                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-1 bg-black/80 backdrop-blur text-primary text-[10px] font-black uppercase tracking-wider rounded border border-primary/20">
                        {noticia.categoria}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-5 flex flex-col flex-1">
                    <h4 className="text-base font-bold text-zinc-200 group-hover:text-white line-clamp-2 leading-snug mb-3">
                      {noticia.titulo}
                    </h4>
                    
                    <div className="mt-auto flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-zinc-500">
                      <span>{noticia.fonte}</span>
                      <span className="flex items-center gap-1">
                        {new Date(noticia.criado_em).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}
                        <ExternalLink className="w-3 h-3 ml-1 group-hover:text-primary transition-colors" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {filteredNoticias.length === 0 && (
              <div className="text-center py-20 text-zinc-500 font-medium">
                Nenhuma notícia encontrada nesta categoria.
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

