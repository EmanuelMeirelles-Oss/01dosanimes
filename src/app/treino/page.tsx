"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Dumbbell, Flame, CheckCircle2, ChevronRight } from 'lucide-react'
import Link from 'next/link'

const mockTreinos = [
  {
    id: 1,
    personagem: "Goku",
    anime: "Dragon Ball Z",
    titulo: "Treino de Gravidade 100x",
    foco: "Força e Explosão",
    imagem: "/wal_goku.png", // Usando o wallpaper como capa por enquanto
    dificuldade: "Avançado",
    exercicios: [
      { nome: "Flexões com peso", reps: "4x 15" },
      { nome: "Agachamento Livre", reps: "4x 12" },
      { nome: "Corrida com colete", reps: "5km" },
      { nome: "Burpees", reps: "4x 20" }
    ]
  },
  {
    id: 2,
    personagem: "Saitama",
    anime: "One Punch Man",
    titulo: "O Treino Invencível",
    foco: "Resistência",
    imagem: "/wal_saitama.png",
    dificuldade: "Intermediário",
    exercicios: [
      { nome: "Flexões", reps: "100" },
      { nome: "Abdominais", reps: "100" },
      { nome: "Agachamentos", reps: "100" },
      { nome: "Corrida", reps: "10km" }
    ]
  },
  {
    id: 3,
    personagem: "Rock Lee",
    anime: "Naruto",
    titulo: "Abertura dos Portões Internos",
    foco: "Agilidade e Cardio",
    imagem: "/wal_rocklee.png",
    dificuldade: "Extremo",
    exercicios: [
      { nome: "Polichinelos rápidos", reps: "5x 50" },
      { nome: "Chutes na sacola/sombra", reps: "5x 2 min" },
      { nome: "Pulo de corda", reps: "15 min" },
      { nome: "Flexão de ponta de dedo", reps: "3x 10" }
    ]
  }
]

export default function TreinoPage() {
  const [selectedTreino, setSelectedTreino] = useState<number | null>(null)

  return (
    <div className="min-h-screen pb-20 pt-16">
      <div className="container mx-auto px-4 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-green-500/10 blur-[120px] rounded-full pointer-events-none" />
          <div className="flex justify-center mb-6">
            <div className="p-4 rounded-full bg-green-500/10 border border-green-500/20">
              <Dumbbell className="w-10 h-10 text-green-500" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-4 uppercase tracking-tighter text-white">
            Treino & <span className="text-green-500">Motivação</span>
          </h1>
          <p className="text-zinc-400 text-sm md:text-lg max-w-2xl mx-auto font-medium">
            Desperte o seu poder oculto. Rotinas de treino inspiradas nos guerreiros mais fortes dos animes. 
            Chegou a hora de superar seus limites.
          </p>
        </div>

        {/* Grid de Treinos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockTreinos.map((treino) => (
            <motion.div 
              key={treino.id}
              whileHover={{ y: -5 }}
              className={`bg-[#0a0a0a] border ${selectedTreino === treino.id ? 'border-green-500' : 'border-[#1f1f1f] hover:border-green-500/50'} rounded-3xl overflow-hidden transition-colors cursor-pointer group`}
              onClick={() => setSelectedTreino(selectedTreino === treino.id ? null : treino.id)}
            >
              <div className="h-48 relative bg-black overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={treino.imagem} 
                  alt={treino.personagem} 
                  className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700 group-hover:opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className={`px-3 py-1 rounded text-xs font-black uppercase tracking-wider ${
                    treino.dificuldade === 'Extremo' ? 'bg-red-500 text-black' :
                    treino.dificuldade === 'Avançado' ? 'bg-orange-500 text-black' :
                    'bg-green-500 text-black'
                  }`}>
                    {treino.dificuldade}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2 text-green-500 text-xs font-bold uppercase tracking-widest">
                  <Flame className="w-4 h-4" />
                  Foco: {treino.foco}
                </div>
                <h2 className="text-2xl font-black text-white uppercase tracking-tighter mb-1 group-hover:text-green-500 transition-colors">
                  {treino.titulo}
                </h2>
                <p className="text-zinc-500 text-sm font-bold uppercase tracking-widest mb-6">
                  Inspirado em: {treino.personagem} ({treino.anime})
                </p>

                {/* Lista de Exercícios (Expande ao Clicar) */}
                <div className={`overflow-hidden transition-all duration-500 ${selectedTreino === treino.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="border-t border-[#1f1f1f] pt-4 mb-4">
                    <h3 className="text-white font-bold mb-3 uppercase tracking-wider text-sm flex items-center gap-2">
                      A Rotina <ChevronRight className="w-4 h-4 text-green-500" />
                    </h3>
                    <ul className="space-y-3">
                      {treino.exercicios.map((ex, i) => (
                        <li key={i} className="flex justify-between items-center bg-[#141414] p-3 rounded-xl border border-[#1f1f1f]">
                          <div className="flex items-center gap-3">
                            <CheckCircle2 className="w-5 h-5 text-zinc-600" />
                            <span className="text-zinc-300 text-sm font-medium">{ex.nome}</span>
                          </div>
                          <span className="text-green-500 font-bold text-sm bg-green-500/10 px-2 py-1 rounded">
                            {ex.reps}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <button className="w-full py-3 rounded-xl bg-green-500 hover:bg-green-400 text-black font-black uppercase tracking-widest transition-colors mt-2">
                    Iniciar Treino
                  </button>
                </div>

                {selectedTreino !== treino.id && (
                  <div className="flex items-center justify-between text-sm font-bold text-zinc-400 group-hover:text-white transition-colors">
                    Ver rotina de exercícios <ChevronRight className="w-4 h-4 group-hover:text-green-500 transition-colors" />
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  )
}
