"use client"

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Download, ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import html2canvas from 'html2canvas'

const frases = [
  {
    id: 1,
    texto: "Eu preferiria ser um macaco sem cérebro, do que um monstro sem coração.",
    personagem: "Goku",
    serie: "Dragon Ball Z",
    cor: "#f97316", // primary orange
    imagemBackground: "/wal_goku.png",
    categoria: "Dragon Ball"
  },
  {
    id: 2,
    texto: "Você é o número um!",
    personagem: "Vegeta",
    serie: "Dragon Ball Z",
    cor: "#f97316", // padronizar tudo pra identidade da marca ajudaria, mas vou manter as cores base per personagem se quiser, ou focar no laranja.
    imagemBackground: "/wal_vegeta.png",
    categoria: "Dragon Ball"
  },
  {
    id: 3,
    texto: "O trabalho duro supera o dom natural.",
    personagem: "Rock Lee",
    serie: "Naruto",
    cor: "#22c55e",
    imagemBackground: "/wal_rocklee.png",
    categoria: "Outros animes"
  },
  {
    id: 4,
    texto: "Não é o rosto que faz de alguém um monstro, são as escolhas que ele faz com as vidas de outras pessoas.",
    personagem: "Naruto Uzumaki",
    serie: "Naruto Shippuden",
    cor: "#f97316",
    imagemBackground: "/wal_naruto.png",
    categoria: "Outros animes"
  },
  {
    id: 5,
    texto: "Aqueles que perdoam a si mesmos e que são capazes de aceitar a sua própria natureza, esses são os mais fortes!",
    personagem: "Itachi Uchiha",
    serie: "Naruto",
    cor: "#ef4444",
    imagemBackground: "/wal_itachi.png",
    categoria: "Outros animes"
  },
  {
    id: 6,
    texto: "Não importa quantas boas ações você faça, seus pecados anteriores não podem ser apagados.",
    personagem: "Piccolo",
    serie: "Dragon Ball Z",
    cor: "#10b981",
    imagemBackground: "/wal_piccolo.png",
    categoria: "Dragon Ball"
  },
  {
    id: 7,
    texto: "Não quero conquistar nada, só quero ser o homem mais livre do mundo.",
    personagem: "Luffy",
    serie: "One Piece",
    cor: "#ef4444",
    imagemBackground: "/wal_luffy.png",
    categoria: "Outros animes"
  }
]

export default function Frases() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [filter, setFilter] = useState("Todos")
  const cardRef = useRef<HTMLDivElement>(null)

  const frasesFiltradas = filter === "Todos" 
    ? frases 
    : frases.filter(f => f.categoria === filter)

  if (currentIndex >= frasesFiltradas.length && frasesFiltradas.length > 0) {
    setCurrentIndex(0)
  }

  const currentFrase = frasesFiltradas[currentIndex]

  const nextFrase = () => {
    setCurrentIndex((prev) => (prev + 1) % frasesFiltradas.length)
  }

  const prevFrase = () => {
    setCurrentIndex((prev) => (prev - 1 + frasesFiltradas.length) % frasesFiltradas.length)
  }

  const downloadImage = async () => {
    if (!cardRef.current) return
    try {
      const canvas = await html2canvas(cardRef.current, {
        useCORS: true,
        scale: 2,
        backgroundColor: '#000000'
      })
      const url = canvas.toDataURL('image/png')
      const link = document.createElement('a')
      link.download = `frase-${currentFrase.personagem.toLowerCase().replace(/\s+/g, '-')}.png`
      link.href = url
      link.click()
    } catch (err) {
      console.error('Failed to generate image', err)
    }
  }

  if (!currentFrase) {
    return <div className="h-screen flex items-center justify-center text-primary font-black tracking-widest text-2xl uppercase">Nenhuma frase encontrada.</div>
  }

  return (
    <div className="min-h-[calc(100vh-8rem)] relative flex flex-col pt-12 overflow-hidden">
      {/* Background Image of the entire page with blur */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={currentFrase.id + "-bg"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 -z-20 bg-cover bg-center blur-lg"
          style={{ backgroundImage: `url(${currentFrase.imagemBackground})` }}
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-transparent -z-10" />

      <div className="container mx-auto px-4 flex flex-col items-center z-10 flex-1">
        <div className="text-center mb-8 relative">
          <h1 className="text-4xl md:text-5xl font-black mb-4 uppercase tracking-tighter text-glow text-primary">
            FRASES <span className="text-white">LENDÁRIAS</span>
          </h1>
        </div>

        {/* Filtros */}
        <div className="flex justify-center mb-10">
          <div className="bg-[#0a0a0a] p-2 rounded-full flex gap-2 border border-primary/20 shadow-[0_0_15px_rgba(249,115,22,0.1)] relative">
            {['Todos', 'Dragon Ball', 'Outros animes'].map(cat => (
              <button
                key={cat}
                onClick={() => { setFilter(cat); setCurrentIndex(0); }}
                className={`relative z-10 px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-colors
                  ${filter === cat ? 'bg-primary text-white' : 'text-primary/40 hover:text-primary'}
                `}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Card Canvas - Separated Layout */}
        <div className="relative group w-full max-w-xl">
          <motion.div 
            key={currentFrase.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            ref={cardRef}
            className="w-full flex flex-col rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(249,115,22,0.15)] border border-[#1f1f1f] group-hover:border-primary/50 transition-colors duration-500 bg-[#000000]"
          >
            {/* Top Area: Clean Wallpaper Image (No text over image) */}
            <div className="w-full h-[400px] relative bg-[#050505] border-b border-[#1f1f1f]">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url(${currentFrase.imagemBackground})` }}
              />
            </div>
            
            {/* Bottom Area: Text and Branding */}
            <div className="w-full p-8 md:p-10 flex flex-col items-center text-center bg-[#0a0a0a] relative">
              <Quote className="absolute top-6 left-6 w-8 h-8 opacity-20" style={{ color: currentFrase.cor }} />
              <Quote className="absolute bottom-6 right-6 w-8 h-8 opacity-20 rotate-180" style={{ color: currentFrase.cor }} />
              
              <h2 
                className="text-xl sm:text-2xl font-black leading-relaxed mb-6 text-white z-10 px-4"
              >
                &ldquo;{currentFrase.texto}&rdquo;
              </h2>
              
              <div className="flex flex-col items-center z-10">
                <span className="text-lg font-black uppercase tracking-widest" style={{ color: currentFrase.cor }}>
                  {currentFrase.personagem}
                </span>
                <span className="text-xs font-bold text-primary/60 uppercase tracking-widest mt-1">
                  {currentFrase.serie}
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4 mt-12 mb-12">
          <button 
            onClick={prevFrase}
            className="p-4 rounded-full bg-[#111] hover:bg-primary text-primary/60 hover:text-black border border-primary/20 hover:border-primary transition-all duration-300 shadow-xl"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-6 h-6 -ml-1" />
          </button>
          
          <button 
            onClick={downloadImage}
            className="flex items-center gap-3 px-8 py-4 rounded-full bg-primary text-black font-black uppercase tracking-widest hover:brightness-110 transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(249,115,22,0.4)]"
          >
            <Download className="w-5 h-5" />
            BAIXAR AQUI
          </button>

          <button 
            onClick={nextFrase}
            className="p-4 rounded-full bg-[#111] hover:bg-primary text-primary/60 hover:text-black border border-primary/20 hover:border-primary transition-all duration-300 shadow-xl"
            aria-label="Próxima"
          >
            <ChevronRight className="w-6 h-6 -mr-1" />
          </button>
        </div>
      </div>
    </div>
  )
}
