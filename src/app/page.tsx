"use client"

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Download, Calendar, Sparkles } from 'lucide-react'
import { useState, useEffect } from 'react'
import { EventoHistoria } from '@/lib/historia'

export default function Home() {
  const [eventoHoje, setEventoHoje] = useState<EventoHistoria | null>(null)
  const [dataFormatada, setDataFormatada] = useState('')

  useEffect(() => {
    import('@/lib/historia').then(({ getEventosHoje }) => {
      const eventos = getEventosHoje()
      setEventoHoje(eventos[0] ?? null)
    })
    setDataFormatada(
      new Intl.DateTimeFormat('pt-BR', { day: 'numeric', month: 'long' }).format(new Date())
    )
  }, [])

  return (
    <div className="relative">

      {/* Hero */}
      <section className="container mx-auto px-4 flex flex-col items-center justify-center min-h-[calc(100vh-5rem)] relative text-center">
        <div
          className="absolute top-0 left-0 w-full h-full overflow-hidden -z-20 pointer-events-none opacity-20 select-none"
          style={{
            maskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/collage.jpg"
            alt=""
            className="w-full h-full object-cover object-top mix-blend-lighten filter grayscale contrast-125"
          />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-600/10 blur-[130px] rounded-full pointer-events-none -z-10" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6 max-w-4xl"
        >
          <h1 className="text-5xl sm:text-7xl md:text-[7rem] font-black tracking-tighter uppercase leading-none drop-shadow-2xl">
            01 DOS <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-primary to-red-600 text-glow">
              ANIMES
            </span>
          </h1>
          <p className="text-lg md:text-2xl font-black uppercase tracking-widest text-zinc-300">
            Treine como um guerreiro. Evolua como um Sayajin.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link
              href="/hoje"
              className="px-8 py-4 bg-primary text-black font-black uppercase tracking-widest rounded-full hover:brightness-110 transition-all shadow-[0_0_30px_rgba(249,115,22,0.3)] text-sm"
            >
              Hoje na História
            </Link>
            <Link
              href="/frases"
              className="px-8 py-4 bg-[#111] border border-[#222] text-zinc-300 font-black uppercase tracking-widest rounded-full hover:border-primary hover:text-white transition-all text-sm"
            >
              Frases & Wallpapers
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Hoje na História — Destaque */}
      <section className="container mx-auto px-4 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              {dataFormatada && (
                <span className="text-primary font-black uppercase tracking-widest text-xs flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4" /> {dataFormatada}
                </span>
              )}
              <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tighter text-white">
                Hoje na <span className="text-primary text-glow">História</span>
              </h2>
            </div>
            <Link
              href="/hoje"
              className="hidden sm:flex items-center gap-2 text-sm font-black uppercase tracking-widest text-primary hover:text-white transition-colors"
            >
              Ver tudo <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {eventoHoje ? (
            <Link href="/hoje" className="group block">
              <div className="flex flex-col md:flex-row bg-[#0a0a0a] border border-[#1f1f1f] hover:border-primary/40 rounded-3xl overflow-hidden transition-colors shadow-2xl">
                <div className="md:w-2/5 relative min-h-[220px] md:min-h-full bg-black overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={eventoHoje.imagem}
                    alt={eventoHoje.titulo}
                    className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-105 group-hover:opacity-70 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent" />
                  <div className="absolute bottom-6 left-6">
                    <span className="text-7xl md:text-8xl font-black text-white tracking-tighter opacity-90 drop-shadow-2xl select-none">
                      {eventoHoje.ano}
                    </span>
                  </div>
                </div>
                <div className="md:w-3/5 p-8 md:p-12 flex flex-col justify-center">
                  <span className="text-[10px] font-black uppercase tracking-widest text-primary bg-primary/10 border border-primary/20 px-3 py-1.5 rounded-lg w-fit mb-4">
                    {eventoHoje.categoria}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white mb-4 group-hover:text-primary transition-colors leading-tight">
                    {eventoHoje.titulo}
                  </h3>
                  <p className="text-zinc-400 text-sm md:text-base leading-relaxed mb-8 line-clamp-3">
                    {eventoHoje.descricao}
                  </p>
                  <div className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-primary">
                    <Calendar className="w-4 h-4" />
                    Ver evento completo
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          ) : (
            <Link
              href="/hoje"
              className="group flex flex-col items-center justify-center py-16 bg-[#0a0a0a] border border-[#1f1f1f] hover:border-primary/30 rounded-3xl transition-colors"
            >
              <Calendar className="w-12 h-12 text-zinc-700 mb-4" />
              <p className="text-zinc-500 font-black uppercase tracking-widest text-xs">
                Acessar arquivo histórico
              </p>
            </Link>
          )}

          <Link
            href="/hoje"
            className="sm:hidden flex items-center justify-center gap-2 text-sm font-black uppercase tracking-widest text-primary mt-6"
          >
            Ver tudo <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </section>

      {/* Frases & Wallpapers */}
      <section className="container mx-auto px-4 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tighter text-white">
                Frases & <span className="text-primary text-glow">Wallpapers</span>
              </h2>
              <p className="text-zinc-400 font-medium mt-2">Baixe e use no celular.</p>
            </div>
            <Link
              href="/frases"
              className="hidden sm:flex items-center gap-2 text-sm font-black uppercase tracking-widest text-primary hover:text-white transition-colors"
            >
              Ver galeria <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {['/wal_goku.png', '/wal_luffy.png', '/wal_naruto.png', '/wal_levi.png'].map((imgSrc, i) => (
              <Link
                href="/frases"
                key={i}
                className="group relative aspect-[9/16] rounded-2xl overflow-hidden bg-[#0a0a0a] border border-[#1f1f1f] hover:border-primary/50 transition-colors block shadow-2xl"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imgSrc}
                  alt="Wallpaper"
                  className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                  <span className="bg-primary text-black text-xs font-black uppercase tracking-widest px-5 py-2.5 rounded-full shadow-[0_0_20px_rgba(249,115,22,0.4)] inline-flex items-center gap-2">
                    <Download className="w-3 h-3" /> Baixar
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <Link
            href="/frases"
            className="sm:hidden flex items-center justify-center gap-2 text-sm font-black uppercase tracking-widest text-primary hover:text-white transition-colors mt-8 bg-[#0a0a0a] py-4 rounded-xl border border-[#1f1f1f]"
          >
            Ver galeria completa <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </section>

    </div>
  )
}
