"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Download, Quote, X, Copy, Check, Heart, Search, Sparkles } from 'lucide-react'

const wallpapers = [
  {
    id: 1,
    texto: "Eu preferiria ser um macaco sem cérebro, do que um monstro sem coração.",
    personagem: "Goku",
    serie: "Dragon Ball Z",
    cor: "#f97316",
    imagem: "/wal_goku.png",
    categoria: "Dragon Ball"
  },
  {
    id: 2,
    texto: "Você é o número um!",
    personagem: "Vegeta",
    serie: "Dragon Ball Z",
    cor: "#ea580c",
    imagem: "/wal_vegeta.png",
    categoria: "Dragon Ball"
  },
  {
    id: 3,
    texto: "O trabalho duro supera o dom natural.",
    personagem: "Rock Lee",
    serie: "Naruto",
    cor: "#22c55e",
    imagem: "/wal_rocklee.png",
    categoria: "Outros animes"
  },
  {
    id: 4,
    texto: "Não é o rosto que faz de alguém um monstro, são as escolhas que ele faz com as vidas de outras pessoas.",
    personagem: "Naruto Uzumaki",
    serie: "Naruto Shippuden",
    cor: "#f97316",
    imagem: "/wal_naruto.png",
    categoria: "Outros animes"
  },
  {
    id: 5,
    texto: "Aqueles que perdoam a si mesmos e que são capazes de aceitar a sua própria natureza, esses são os mais fortes!",
    personagem: "Itachi Uchiha",
    serie: "Naruto",
    cor: "#ef4444",
    imagem: "/wal_itachi.png",
    categoria: "Outros animes"
  },
  {
    id: 6,
    texto: "Não importa quantas boas ações você faça, seus pecados anteriores não podem ser apagados.",
    personagem: "Piccolo",
    serie: "Dragon Ball Z",
    cor: "#10b981",
    imagem: "/wal_piccolo.png",
    categoria: "Dragon Ball"
  },
  {
    id: 7,
    texto: "Não quero conquistar nada, só quero ser o homem mais livre do mundo.",
    personagem: "Luffy",
    serie: "One Piece",
    cor: "#ef4444",
    imagem: "/wal_luffy.png",
    categoria: "Outros animes"
  },
  {
    id: 8,
    texto: "A única coisa que nos é permitido fazer é acreditar que não vamos nos arrepender da escolha que fizemos.",
    personagem: "Levi Ackerman",
    serie: "Attack on Titan",
    cor: "#10b981", 
    imagem: "/wal_levi.png",
    categoria: "Outros animes"
  },
  {
    id: 9,
    texto: "Se você ganhar, você vive. Se você perder, você morre. Se você não lutar, você não pode ganhar.",
    personagem: "Eren Yeager",
    serie: "Attack on Titan",
    cor: "#22c55e",
    imagem: "/wal_eren.png",
    categoria: "Outros animes"
  },
  {
    id: 10,
    texto: "Não existe lição sem dor. Pois não se pode ganhar algo sem sacrificar algo em troca.",
    personagem: "Edward Elric",
    serie: "Fullmetal Alchemist",
    cor: "#3b82f6",
    imagem: "/wal_edward.png",
    categoria: "Outros animes"
  },
  {
    id: 11,
    texto: "O poder de um homem não deve ser julgado pelas suas amizades, mas por aqueles que ele considera seus inimigos.",
    personagem: "Roy Mustang",
    serie: "Fullmetal Alchemist",
    cor: "#ef4444",
    imagem: "/wal_mustang.png",
    categoria: "Outros animes"
  },
  {
    id: 12,
    texto: "Eu sou apenas um cara que é um herói por diversão.",
    personagem: "Saitama",
    serie: "One Punch Man",
    cor: "#f59e0b",
    imagem: "/wal_saitama.png",
    categoria: "Outros animes"
  }
]

export default function FrasesWallpapers() {
  const [filter, setFilter] = useState("Todos")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedImage, setSelectedImage] = useState<typeof wallpapers[0] | null>(null)
  const [copied, setCopied] = useState(false)
  const [likedItems, setLikedItems] = useState<number[]>([])

  const items = wallpapers.filter(w => {
    const matchCat = filter === "Todos" || w.categoria === filter
    const matchSearch = w.texto.toLowerCase().includes(searchQuery.toLowerCase()) || w.personagem.toLowerCase().includes(searchQuery.toLowerCase()) || w.serie.toLowerCase().includes(searchQuery.toLowerCase())
    return matchCat && matchSearch
  })

  const toggleLike = (e: React.MouseEvent, id: number) => {
    e.stopPropagation()
    setLikedItems(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id])
  }

  const handleCopy = async (texto: string) => {
    try {
      await navigator.clipboard.writeText(`"${texto}"`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  }

  const handleGacha = () => {
    const randomIndex = Math.floor(Math.random() * wallpapers.length)
    setSelectedImage(wallpapers[randomIndex])
  }

  return (
    <div className="min-h-[calc(100vh-8rem)] relative pb-20">
      
      {/* Background Decorativo Suave */}
      <div className="absolute top-0 left-0 w-full h-[500px] overflow-hidden -z-20 opacity-20 pointer-events-none" style={{ maskImage: 'linear-gradient(to bottom, black, transparent)' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/collage.jpg" alt="Background" className="w-full h-full object-cover filter grayscale blur-sm" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 pt-16">
        
        {/* Header */}
        <div className="text-center mb-16 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
          <h1 className="text-4xl md:text-6xl font-black mb-4 uppercase tracking-tighter text-glow text-white">
            Frases & <span className="text-primary">Wallpapers</span>
          </h1>
          <p className="text-zinc-400 text-sm md:text-lg max-w-2xl mx-auto font-medium">
            Artes exclusivas combinadas com as frases mais marcantes dos animes. 
            Baixe e personalize seus dispositivos.
          </p>
        </div>

        {/* Filtros e Busca */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-12">
          
          {/* Categorias */}
          <div className="bg-[#0a0a0a] p-1.5 sm:p-2 rounded-full flex gap-1 sm:gap-2 border border-[#1f1f1f] shadow-lg">
            {['Todos', 'Dragon Ball', 'Outros animes'].map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2 sm:px-6 sm:py-2.5 rounded-full text-xs sm:text-sm font-black uppercase tracking-widest transition-all
                  ${filter === cat 
                    ? 'bg-primary text-black shadow-[0_0_15px_rgba(249,115,22,0.4)]' 
                    : 'text-zinc-500 hover:text-white'
                  }
                `}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Busca */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
            <input 
              type="text" 
              placeholder="Buscar personagem, anime ou frase..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0a0a0a] border border-[#1f1f1f] text-white rounded-full pl-12 pr-6 py-3.5 text-sm focus:outline-none focus:border-primary transition-colors shadow-lg placeholder:text-zinc-600"
            />
          </div>
        </div>

        {/* Galeria Grid Masonry-like */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence>
            {items.map((item, i) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                key={item.id}
                className="group relative rounded-2xl overflow-hidden bg-[#050505] border border-[#1f1f1f] cursor-pointer hover:border-primary/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(249,115,22,0.15)]"
                onClick={() => setSelectedImage(item)}
              >
                {/* Imagem (Proporção Retrato para Wallpapers) */}
                <div className="aspect-[9/16] relative overflow-hidden bg-[#0a0a0a]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={item.imagem} 
                    alt={`Wallpaper ${item.personagem}`} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                    loading="lazy"
                  />
                  
                  {/* Heart Button Overlay */}
                  <div className="absolute top-4 right-4 z-30">
                    <button 
                      onClick={(e) => toggleLike(e, item.id)}
                      className={`p-2 rounded-full backdrop-blur-md transition-all duration-300 ${likedItems.includes(item.id) ? 'bg-red-500/20' : 'bg-black/40 hover:bg-black/60'}`}
                    >
                      <Heart className={`w-5 h-5 ${likedItems.includes(item.id) ? 'fill-red-500 text-red-500' : 'text-white'}`} />
                    </button>
                  </div>
                  
                  {/* Overlay gradiente escuro na base para a citação */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                  {/* Botão de View hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                    <span className="bg-black/60 backdrop-blur-md px-6 py-2 rounded-full text-white text-sm font-black tracking-widest uppercase border border-white/10 shadow-xl">
                      Visualizar
                    </span>
                  </div>
                </div>

                {/* Conteúdo sobreposto na imagem */}
                <div className="absolute bottom-0 left-0 w-full p-6 z-10 pointer-events-none">
                  <Quote className="w-5 h-5 text-primary mb-2 opacity-70" />
                  <h3 className="text-sm font-bold text-white leading-relaxed mb-3 line-clamp-3 text-shadow-sm">
                    "{item.texto}"
                  </h3>
                  <div className="flex flex-col">
                    <span className="text-xs font-black uppercase tracking-widest text-primary">
                      {item.personagem}
                    </span>
                    <span className="text-[10px] font-bold text-white/50 uppercase tracking-widest">
                      {item.serie}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {items.length === 0 && (
          <div className="text-center py-20 text-zinc-500 font-medium">
            Nenhuma arte encontrada nesta categoria.
          </div>
        )}

      </div>

      {/* Modal de Visualização Imersiva */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/95 backdrop-blur-md"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-50 backdrop-blur-sm"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-6 h-6" />
            </button>

            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="flex flex-col md:flex-row bg-[#0a0a0a] border border-[#1f1f1f] rounded-3xl overflow-hidden max-w-6xl w-full max-h-[90vh] shadow-2xl"
            >
              {/* Lado Esquerdo: A Imagem em si */}
              <div className="w-full md:w-1/2 flex items-center justify-center bg-black/50 relative overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={selectedImage.imagem} 
                  alt={selectedImage.personagem}
                  className="max-h-[50vh] md:max-h-[90vh] w-auto object-contain drop-shadow-2xl"
                />
              </div>

              {/* Lado Direito: Ações e Citação Detalhada */}
              <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center relative overflow-y-auto custom-scrollbar">
                <Quote className="w-12 h-12 text-primary/20 mb-6" />
                
                <h2 className="text-2xl md:text-4xl font-black leading-tight text-white mb-8">
                  "{selectedImage.texto}"
                </h2>
                
                <div className="mb-10">
                  <p className="text-xl font-black uppercase tracking-widest text-primary mb-1">
                    {selectedImage.personagem}
                  </p>
                  <p className="text-sm font-bold uppercase tracking-widest text-zinc-500">
                    {selectedImage.serie}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                  <a 
                    href={selectedImage.imagem}
                    download={`wallpaper-${selectedImage.personagem.toLowerCase().replace(/\s+/g, '-')}.png`}
                    className="flex-1 flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-primary text-black font-black uppercase tracking-widest hover:brightness-110 transition-all hover:scale-[1.02] active:scale-95 shadow-[0_0_30px_rgba(249,115,22,0.3)]"
                  >
                    <Download className="w-5 h-5" />
                    Baixar Imagem
                  </a>
                  
                  <button 
                    onClick={() => handleCopy(selectedImage.texto)}
                    className="flex-1 flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#141414] text-white font-black uppercase tracking-widest hover:bg-[#1f1f1f] border border-[#2a2a2a] transition-all hover:scale-[1.02] active:scale-95"
                  >
                    {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                    {copied ? 'Copiado!' : 'Copiar Frase'}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Botão Gacha / Surpreenda-me */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleGacha}
        className="fixed bottom-8 right-8 z-40 bg-gradient-to-r from-orange-500 to-red-600 text-white p-4 rounded-full shadow-[0_0_30px_rgba(249,115,22,0.4)] hover:shadow-[0_0_50px_rgba(249,115,22,0.6)] transition-shadow border border-white/20 group flex items-center gap-3 overflow-hidden"
      >
        <Sparkles className="w-6 h-6 group-hover:rotate-12 transition-transform" />
        <span className="font-black uppercase tracking-widest text-sm hidden md:block">
          Giro Épico
        </span>
      </motion.button>
    </div>
  )
}
