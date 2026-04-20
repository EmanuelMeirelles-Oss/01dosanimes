"use client"

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Newspaper, Quote, ShoppingBag, ArrowRight } from 'lucide-react'

export default function Home() {
  const menus = [
    {
      title: 'Portal de Notícias',
      description: 'As últimas novidades e atualizações sobre suas obras favoritas, em tempo real.',
      href: '/noticias',
      icon: Newspaper,
      color: 'from-orange-500/20 to-orange-900/20',
      border: 'hover:border-orange-500',
      disabled: false
    },
    {
      title: 'Frases & Wallpapers',
      description: 'Citações épicas com artes exclusivas para o seu Wallpaper.',
      href: '/frases',
      icon: Quote,
      color: 'from-zinc-500/20 to-zinc-900/20',
      border: 'hover:border-zinc-400',
      disabled: false
    },
    {
      title: 'Loja Oficial',
      description: 'Desativada pelo momento.',
      href: '#',
      icon: ShoppingBag,
      color: 'from-orange-600/10 to-red-900/10',
      border: 'hover:border-red-900',
      disabled: true
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 100, damping: 15 } }
  }

  return (
    <div className="container mx-auto px-4 py-20 flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] relative">
      {/* Decorative Hero Background */ }
      <div className="absolute top-0 left-0 w-full h-[70vh] overflow-hidden -z-20 pointer-events-none opacity-30 select-none" style={{ maskImage: 'linear-gradient(to bottom, black 30%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 30%, transparent 100%)' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/collage.jpg" alt="Hero Collage" className="w-full h-full object-cover object-top mix-blend-lighten filter grayscale contrast-125" />
      </div>

      {/* Decorative center glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-600/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center mb-24 space-y-6 relative pt-10"
      >
        <h1 className="text-5xl md:text-7xl lg:text-[7rem] font-black tracking-tighter uppercase leading-none drop-shadow-2xl">
          01 DOS <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-primary to-red-600 text-glow">
            ANIMES
          </span>
        </h1>
        <p className="text-lg md:text-xl text-zinc-300 max-w-2xl mx-auto font-medium shadow-black drop-shadow-xl p-2 rounded-lg bg-black/20 backdrop-blur-sm border border-white/5">
          Portal prático e direto com notícias atualizadas em tempo real, download de wallpapers épicos e frases marcantes.
        </p>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full max-w-6xl z-10"
      >
        {menus.map((menu) => (
          <Link key={menu.href} href={menu.href} className={`block w-full h-full ${menu.disabled ? 'pointer-events-none opacity-50 grayscale' : ''}`}>
            <motion.div 
              variants={itemVariants}
              whileHover={!menu.disabled ? { scale: 1.02, y: -5 } : {}}
              whileTap={!menu.disabled ? { scale: 0.98 } : {}}
              className={`group flex flex-col h-full items-start text-left p-8 rounded-3xl bg-[#0a0a0a] border border-[#1f1f1f] ${!menu.disabled ? menu.border : ''} transition-colors duration-500 overflow-hidden relative shadow-2xl`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${menu.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
              
              <div className="p-4 rounded-2xl bg-[#141414] border border-[#2a2a2a] mb-6 group-hover:border-orange-500/30 transition-colors z-10">
                <menu.icon className="w-8 h-8 text-orange-500 group-hover:text-orange-400 transition-colors" />
              </div>
              
              <h2 className="text-2xl font-bold mb-4 uppercase tracking-tighter text-white z-10 group-hover:text-orange-500 transition-colors">
                {menu.title}
              </h2>
              
              <p className="text-zinc-400 leading-relaxed z-10 mb-8 flex-1">
                {menu.description}
              </p>

              <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-zinc-500 group-hover:text-orange-500 transition-colors z-10 mt-auto">
                Explorar <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
              </div>
            </motion.div>
          </Link>
        ))}
      </motion.div>
    </div>
  )
}
