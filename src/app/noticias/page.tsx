"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Clock, Flame } from 'lucide-react'

const mockNoticias = [
  // Dragon Ball
  { id: '1', titulo: 'Sparking Zero rompe barreiras: Nova engine traz lutas destrutivas', url: '#', imagem: 'https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?q=80&w=1920&auto=format&fit=crop', fonte: 'AnimeNews', categoria: 'dragonball', criado_em: new Date().toISOString() },
  { id: '2', titulo: 'Mangá de Dragon Ball Super revela nova transformação de Gohan', url: '#', imagem: 'https://images.unsplash.com/photo-1542204165-65bf26472b9b?q=80&w=1920&auto=format&fit=crop', fonte: 'Reddit', categoria: 'dragonball', criado_em: new Date().toISOString() },
  { id: '3', titulo: 'O legado de Akira Toriyama: Entrevista inédita', url: '#', imagem: null, fonte: 'NewsAPI', categoria: 'dragonball', criado_em: new Date().toISOString() },
  { id: '7', titulo: 'Possível teaser da nova saga ganha data oficial', url: '#', imagem: 'https://placehold.co/600x400/1a1a1a/f59e0b?text=Nova+Saga', fonte: 'Reddit', categoria: 'dragonball', criado_em: new Date().toISOString() },
  { id: '8', titulo: 'Comunidade reage a novo jogo Mobile da franquia', url: '#', imagem: null, fonte: 'AnimeNews', categoria: 'dragonball', criado_em: new Date().toISOString() },
  { id: '9', titulo: 'Retorno do anime é discutido fortemente por ex-diretor', url: '#', imagem: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1920&auto=format&fit=crop', fonte: 'NewsAPI', categoria: 'dragonball', criado_em: new Date().toISOString() },
  
  // Animes
  { id: '4', titulo: 'Solo Leveling: Episódio final da 1ª temporada quebra a internet', url: '#', imagem: 'https://images.unsplash.com/photo-1578632616212-32b0f4d36efd?q=80&w=1920&auto=format&fit=crop', fonte: 'IGN', categoria: 'animes', criado_em: new Date().toISOString() },
  { id: '5', titulo: 'Demon Slayer: Treinamento Hashira chegará aos cinemas na próxima semana', url: '#', imagem: null, fonte: 'Reddit', categoria: 'animes', criado_em: new Date().toISOString() },
  { id: '6', titulo: 'Jujutsu Kaisen entra no seu arco final no Mangá', url: '#', imagem: 'https://images.unsplash.com/photo-1613376023733-0a73315d9b06?q=80&w=1920&auto=format&fit=crop', fonte: 'NewsAPI', categoria: 'animes', criado_em: new Date().toISOString() },
  { id: '10', titulo: 'Attack on Titan finaliza como a série mais bem avaliada do ano', url: '#', imagem: 'https://placehold.co/600x400/1a1a1a/ef4444?text=AOT', fonte: 'AnimeNews', categoria: 'animes', criado_em: new Date().toISOString() },
  { id: '11', titulo: 'O retorno de Bleach agita fãs de todo o mundo', url: '#', imagem: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1920&auto=format&fit=crop', fonte: 'Reddit', categoria: 'animes', criado_em: new Date().toISOString() },
  { id: '12', titulo: 'Hunter x Hunter pode ganhar novos capítulos ainda esse semestre', url: '#', imagem: null, fonte: 'NewsAPI', categoria: 'animes', criado_em: new Date().toISOString() },
]

export default function Noticias() {
  const [activeTab, setActiveTab] = useState<'dragonball' | 'animes'>('dragonball')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => setIsLoading(false), 800)
    return () => clearTimeout(timer)
  }, [activeTab])

  const filteredNoticias = mockNoticias.filter(n => n.categoria === activeTab)

  return (
    <div className="container mx-auto px-4 py-16 min-h-[calc(100vh-8rem)]">
      <div className="text-center mb-16 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-primary blur-[100px] -z-10 rounded-full" />
        <h1 className="text-5xl md:text-7xl font-black mb-6 uppercase tracking-tighter">
          CENTRAL DE <span className="text-primary text-glow">NOTÍCIAS</span>
        </h1>
        <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto font-medium">
          Notícias, vazamentos e atualizações em tempo real das suas obras favoritas.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center mb-16">
        <div className="bg-[#0a0a0a] p-2 rounded-full flex gap-2 border border-primary/20 shadow-2xl relative">
          <div 
            className={`absolute inset-y-2 w-[calc(50%-0.5rem)] bg-primary rounded-full transition-transform duration-500 ease-out z-0
              ${activeTab === 'animes' ? 'translate-x-full ml-2' : 'translate-x-0'}
            `} 
          />
          <button
            onClick={() => setActiveTab('dragonball')}
            className={`relative z-10 px-8 py-4 rounded-full text-sm font-black uppercase tracking-widest transition-colors w-48
              ${activeTab === 'dragonball' ? 'text-black' : 'text-primary hover:text-orange-400'}`
            }
          >
            Dragon Ball
          </button>
          <button
            onClick={() => setActiveTab('animes')}
            className={`relative z-10 px-8 py-4 rounded-full text-sm font-black uppercase tracking-widest transition-colors w-48
              ${activeTab === 'animes' ? 'text-black' : 'text-primary hover:text-orange-400'}`
            }
          >
            Geral
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <motion.div 
                key={`skeleton-${i}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-[#0a0a0a] border border-[#1f1f1f] rounded-3xl h-[420px] overflow-hidden"
              >
                <div className="h-56 bg-[#141414] animate-pulse w-full" />
                <div className="p-6 flex flex-col gap-4">
                  <div className="h-4 bg-[#1f1f1f] rounded-md w-1/4 animate-pulse" />
                  <div className="h-8 bg-[#1f1f1f] rounded-md w-full animate-pulse" />
                  <div className="h-8 bg-[#1f1f1f] rounded-md w-3/4 animate-pulse" />
                </div>
              </motion.div>
            ))
          ) : (
            filteredNoticias.map((noticia, i) => (
              <motion.a 
                href={noticia.url}
                target="_blank"
                rel="noopener noreferrer"
                key={noticia.id} 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5, ease: "easeOut" }}
                className="group flex flex-col bg-[#0a0a0a] border border-[#1f1f1f] rounded-3xl overflow-hidden hover:border-primary transition-all duration-500 hover:shadow-[0_0_40px_rgba(249,115,22,0.15)] relative h-[420px]"
              >
                {/* Imagem */}
                <div className="relative h-56 bg-[#050505] overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent z-10" />
                  {noticia.imagem ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img 
                      src={noticia.imagem} 
                      alt={noticia.titulo}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center opacity-30 group-hover:opacity-100 transition-opacity">
                      <Flame className="w-12 h-12 text-primary mb-2" />
                      <span className="text-zinc-600 font-black text-2xl uppercase tracking-widest">{noticia.fonte}</span>
                    </div>
                  )}
                  
                  <div className="absolute top-4 left-4 z-20">
                    <span className="px-3 py-1.5 text-xs font-black rounded-lg bg-primary text-black shadow-lg">
                      {noticia.fonte}
                    </span>
                  </div>
                </div>
                
                {/* Conteúdo */}
                <div className="p-6 flex flex-col flex-1 relative z-20 -mt-6">
                  <h3 className="font-black text-xl md:text-2xl mb-4 line-clamp-3 leading-snug group-hover:text-primary transition-colors">
                    {noticia.titulo}
                  </h3>
                  
                  <div className="mt-auto flex items-center justify-between pt-5 border-t border-[#1f1f1f]">
                    <div className="flex items-center text-zinc-500 font-medium text-xs gap-2 uppercase tracking-wider">
                      <Clock className="w-4 h-4 text-primary" />
                      {new Date(noticia.criado_em).toLocaleDateString('pt-BR')}
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm font-bold text-white group-hover:text-primary transition-colors">
                      <ExternalLink className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </motion.a>
            ))
          )}
        </AnimatePresence>
      </div>

      {filteredNoticias.length === 0 && !isLoading && (
        <motion.div initial={{opacity: 0}} animate={{opacity: 1}} className="text-center py-20 text-zinc-500 font-medium">
          Nenhuma atividade detectada nos radares no momento.
        </motion.div>
      )}
    </div>
  )
}
