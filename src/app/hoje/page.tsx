"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Download, Sparkles, ArrowLeft, Loader2, Check } from 'lucide-react'
import Link from 'next/link'
import { EventoHistoria } from '@/lib/historia'

export default function HojePage() {
  const [eventosHoje, setEventosHoje] = useState<EventoHistoria[]>([])
  const [proximos, setProximos] = useState<EventoHistoria[]>([])
  const [dataAtual, setDataAtual] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [generatingId, setGeneratingId] = useState<string | null>(null)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  useEffect(() => {
    import('@/lib/historia').then(({ getEventosHoje, getEventosProximosDias }) => {
      setEventosHoje(getEventosHoje())
      setProximos(getEventosProximosDias(7))
      
      const formatador = new Intl.DateTimeFormat('pt-BR', { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
      })
      setDataAtual(formatador.format(new Date()))
      setIsLoading(false)
    })
  }, [])

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 4000)
  }

  // Função para desenhar e baixar o card no Canvas estilo Cyber-Manga Blueprint
  const handleGenerateStoryCard = async (evento: EventoHistoria) => {
    setGeneratingId(evento.id)
    try {
      const canvas = document.createElement('canvas')
      canvas.width = 1080
      canvas.height = 1920
      const ctx = canvas.getContext('2d')
      if (!ctx) throw new Error('Não foi possível obter o contexto 2D')

      // Carregar imagem
      let bgImage: HTMLImageElement | null = null
      try {
        bgImage = await new Promise<HTMLImageElement>((resolve, reject) => {
          const img = new Image()
          img.crossOrigin = 'anonymous'
          img.src = evento.imagem
          img.onload = () => resolve(img)
          img.onerror = () => reject()
        })
      } catch {
        console.warn('Erro ao carregar imagem, usando fallback.')
      }

      // Fundo Sólido (Deep cyber ink)
      ctx.fillStyle = '#030305'
      ctx.fillRect(0, 0, 1080, 1920)

      // Desenhar malha de grade cybernetic em background
      ctx.strokeStyle = 'rgba(255, 69, 0, 0.03)'
      ctx.lineWidth = 2
      const gridSpacing = 40
      for (let x = 0; x < 1080; x += gridSpacing) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, 1920)
        ctx.stroke()
      }
      for (let y = 0; y < 1920; y += gridSpacing) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(1080, y)
        ctx.stroke()
      }

      // Imagem com opacidade e recorte
      if (bgImage) {
        const imgRatio = bgImage.width / bgImage.height
        const canvasRatio = 1080 / 1920
        let drawWidth = 1080
        let drawHeight = 1920
        let drawX = 0
        let drawY = 0

        if (imgRatio > canvasRatio) {
          drawWidth = 1920 * imgRatio
          drawX = (1080 - drawWidth) / 2
        } else {
          drawHeight = 1080 / imgRatio
          drawY = (1920 - drawHeight) / 2
        }

        ctx.save()
        ctx.globalAlpha = 0.28
        ctx.drawImage(bgImage, drawX, drawY, drawWidth, drawHeight)
        ctx.restore()

        // Gradientes para escurecer o centro/texto
        const radGrad = ctx.createRadialGradient(540, 960, 150, 540, 960, 950)
        radGrad.addColorStop(0, 'rgba(3,3,5,0.4)')
        radGrad.addColorStop(0.7, 'rgba(3,3,5,0.85)')
        radGrad.addColorStop(1, 'rgba(3,3,5,0.98)')
        ctx.fillStyle = radGrad
        ctx.fillRect(0, 0, 1080, 1920)
      }

      // Moldura Brutalista
      ctx.save()
      ctx.strokeStyle = '#ff4500' // primary
      ctx.lineWidth = 8
      ctx.strokeRect(50, 50, 980, 1820)
      
      ctx.strokeStyle = '#ffb703' // accent
      ctx.lineWidth = 2
      ctx.strokeRect(65, 65, 950, 1790)
      ctx.restore()

      // Elementos decorativos (Cruzes de mira nos cantos)
      const drawReticle = (rx: number, ry: number) => {
        ctx.strokeStyle = 'rgba(255, 183, 3, 0.4)'
        ctx.lineWidth = 3
        ctx.beginPath()
        ctx.moveTo(rx - 25, ry)
        ctx.lineTo(rx + 25, ry)
        ctx.moveTo(rx, ry - 25)
        ctx.lineTo(rx, ry + 25)
        ctx.stroke()
      }
      drawReticle(95, 95)
      drawReticle(985, 95)
      drawReticle(95, 1825)
      drawReticle(985, 1825)

      // 6. Cabeçalho
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      
      // Logo (Texto Pesado)
      ctx.fillStyle = '#ffffff'
      ctx.font = '900 48px Impact, sans-serif'
      ctx.fillText('01dos', 540 - 75, 150)
      ctx.fillStyle = '#ff4500'
      ctx.fillText('Animes', 540 + 55, 150)

      // Categoria pill
      const catText = `// CATEGORIA: ${evento.categoria.toUpperCase()} //`
      ctx.font = '900 24px Courier New, monospace'
      ctx.fillStyle = '#ffb703'
      ctx.fillText(catText, 540, 220)

      ctx.fillStyle = 'rgba(255, 69, 0, 0.3)'
      ctx.fillRect(340, 260, 400, 3)

      // Aconteceu Em
      ctx.fillStyle = '#ffffff'
      ctx.font = '900 26px Courier New, monospace'
      ctx.fillText('⚡ A C O N T E C E U   E M ⚡', 540, 390)

      // 7. Grande Ano Brutalista
      ctx.save()
      ctx.shadowColor = 'rgba(255, 69, 0, 0.5)'
      ctx.shadowBlur = 30
      ctx.fillStyle = '#ffffff'
      ctx.font = '900 240px Impact, sans-serif'
      ctx.fillText(evento.ano.toString(), 540, 540)
      ctx.restore()

      // Linha separadora do ano
      ctx.fillStyle = 'rgba(255, 255, 255, 0.1)'
      ctx.fillRect(200, 680, 680, 2)

      // 8. Título do Evento
      ctx.fillStyle = '#ffffff'
      ctx.font = '900 52px Impact, sans-serif'
      const titleY = 770
      const wrapWidth = 820
      const titleHeight = 65
      
      const wrappedTitle = wrapText(ctx, evento.titulo.toUpperCase(), wrapWidth)
      let currentY = titleY
      wrappedTitle.forEach((line) => {
        ctx.fillText(line, 540, currentY)
        currentY += titleHeight
      })

      currentY += 45

      // 9. Descrição do Evento
      ctx.fillStyle = '#d4d4d8'
      ctx.font = 'bold 32px Courier New, monospace'
      const descHeight = 48
      const wrappedDesc = wrapText(ctx, evento.descricao, wrapWidth)
      
      wrappedDesc.forEach((line) => {
        ctx.fillText(line, 540, currentY)
        currentY += descHeight
      })

      // Rodapé
      ctx.fillStyle = 'rgba(255, 255, 255, 0.25)'
      ctx.font = '900 22px Courier New, monospace'
      ctx.fillText('DISPATCH TERMINAL // CLIQUE NO LINK DO PERFIL', 540, 1690)

      ctx.fillStyle = '#ff4500'
      ctx.font = '900 36px Impact, sans-serif'
      ctx.fillText('01dosanimes.com', 540, 1745)

      // Baixar imagem gerada
      const dataUrl = canvas.toDataURL('image/png')
      const link = document.createElement('a')
      link.download = `01dosanimes-story-${evento.ano}-${evento.id}.png`
      link.href = dataUrl
      link.click()

      showToast('Poster Story exportado com sucesso! Compartilhe no Instagram. 🌟')
    } catch (err) {
      console.error(err)
      showToast('Ocorreu um erro ao renderizar o canvas.')
    } finally {
      setGeneratingId(null)
    }
  }

  // Função auxiliar para quebrar texto no Canvas
  const wrapText = (ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] => {
    const words = text.split(' ')
    const lines: string[] = []
    let currentLine = words[0] || ''

    for (let i = 1; i < words.length; i++) {
      const word = words[i]
      const width = ctx.measureText(currentLine + ' ' + word).width
      if (width < maxWidth) {
        currentLine += ' ' + word
      } else {
        lines.push(currentLine)
        currentLine = word
      }
    }
    if (currentLine) {
      lines.push(currentLine)
    }
    return lines
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background">
        <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-4" />
        <p className="text-zinc-500 font-bold uppercase tracking-widest text-xs">Acessando arquivos históricos...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden pb-24 pt-8">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none cyber-grid -z-10" />
      <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="container mx-auto px-4 lg:px-8">
        
        {/* Botão de Retorno Rápido */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-all bg-[#09090b]/80 px-4 py-2.5 rounded-xl border-2 border-zinc-800 hover:border-primary font-black text-[10px] uppercase tracking-widest hover:-translate-y-0.5">
            <ArrowLeft className="w-4 h-4 text-primary" /> Início
          </Link>
        </div>

        {/* Header */}
        <div className="mb-16 border-b border-[#18181b] pb-8 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-6 relative">
          <div>
            <span className="text-primary font-black uppercase tracking-widest text-xs mb-2 block flex items-center gap-2 justify-center md:justify-start">
              <Sparkles className="w-4 h-4 animate-pulse text-accent" /> {dataAtual}
            </span>
            <h1 className="text-4xl md:text-6xl font-display font-black uppercase text-white tracking-tighter leading-none">
              HOJE NA <span className="text-primary text-glow">HISTÓRIA</span>
            </h1>
            <span className="text-[9px] font-black text-zinc-500 tracking-[0.25em] uppercase leading-none block mt-2">
              「歴史アーカイブ」
            </span>
          </div>
        </div>

        {/* Timeline dos Eventos de Hoje */}
        {eventosHoje.length > 0 ? (
          <div className="relative border-l-2 border-zinc-800 ml-4 md:ml-8 pl-8 md:pl-12 space-y-16">
            {eventosHoje.map((evento, idx) => (
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                key={evento.id} 
                className="relative group"
              >
                {/* Indicador na Timeline */}
                <div className="absolute -left-[42px] md:-left-[58px] top-2.5 w-6 h-6 rounded-full bg-[#030305] border-2 border-primary flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-[0_0_10px_var(--primary-glow)]">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                </div>

                {/* Card de Evento */}
                <div className="flex flex-col lg:flex-row gap-8 bg-card border-2 border-zinc-800 hover:border-primary/30 rounded-3xl overflow-hidden shadow-2xl transition-all duration-300">
                  
                  {/* Lateral Esquerda: Imagem */}
                  <div className="lg:w-2/5 relative min-h-[250px] lg:min-h-full bg-black overflow-hidden border-b-2 lg:border-b-0 lg:border-r-2 border-zinc-800">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={evento.imagem} 
                      alt={evento.titulo} 
                      className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-103 transition-transform duration-1000 group-hover:opacity-75" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-card via-card/50 to-transparent" />
                    
                    {/* Ano em destaque */}
                    <div className="absolute bottom-6 left-6 lg:bottom-auto lg:top-6 lg:left-6">
                      <span className="text-6xl md:text-8xl font-black text-white drop-shadow-2xl opacity-90 tracking-tighter font-display select-none block">
                        {evento.ano}
                      </span>
                    </div>
                  </div>
                  
                  {/* Lateral Direita: Informações */}
                  <div className="lg:w-3/5 p-6 md:p-10 flex flex-col justify-center">
                    <div className="mb-4">
                      <span className="bg-[#141417] text-primary border border-zinc-800 px-3.5 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-wider">
                        {evento.categoria}
                      </span>
                    </div>
                    
                    <h2 className="text-2xl md:text-3xl font-display font-black text-white uppercase tracking-tight mb-4 leading-tight group-hover:text-primary transition-colors">
                      {evento.titulo}
                    </h2>
                    
                    <p className="text-zinc-400 text-sm md:text-base leading-relaxed mb-8 font-medium">
                      {evento.descricao}
                    </p>
                    
                    <div className="mt-auto flex flex-wrap gap-4 items-center pt-6 border-t border-zinc-850">
                      <button 
                        onClick={() => handleGenerateStoryCard(evento)}
                        disabled={generatingId !== null}
                        className="flex items-center gap-2 bg-primary hover:bg-white disabled:bg-zinc-800 disabled:text-zinc-500 text-black px-6 py-4 rounded-xl font-black uppercase tracking-widest text-[10px] transition-colors shadow-lg active:scale-95 duration-200"
                      >
                        {generatingId === evento.id ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin" /> Gerando Story...
                          </>
                        ) : (
                          <>
                            <Download className="w-3.5 h-3.5" /> Baixar Story Card
                          </>
                        )}
                      </button>
                      
                      <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">
                        Ideal para Instagram Stories (9:16)
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 bg-card border-2 border-zinc-800 rounded-3xl mb-12 shadow-2xl max-w-lg mx-auto"
          >
            <Calendar className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
            <h2 className="text-xl font-black uppercase text-white mb-2">Sem eventos cadastrados</h2>
            <p className="text-zinc-500 font-medium text-xs uppercase tracking-wider leading-relaxed">
              Nenhuma data histórica registrada para a data de hoje.
            </p>
          </motion.div>
        )}

        {/* Próximos Eventos */}
        {proximos.length > 0 && (
          <div className="mt-24">
            <div className="flex items-center gap-4 mb-8">
              <h3 className="text-lg md:text-xl font-display font-black uppercase tracking-tighter text-white">
                ARQUIVO DE <span className="text-primary text-glow">OUTROS DIAS</span>
              </h3>
              <div className="h-[2px] flex-1 bg-gradient-to-r from-zinc-800 to-transparent" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {proximos.map((evento, idx) => (
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  key={evento.id} 
                  className="bg-card border-2 border-zinc-800 p-6 rounded-2xl flex flex-col justify-between hover:border-primary/20 hover:shadow-xl transition-all duration-300 group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-primary font-black text-sm bg-[#141417] px-3 py-1 rounded-lg border border-zinc-850">
                        {evento.dia.toString().padStart(2, '0')}/{evento.mes.toString().padStart(2, '0')}
                      </span>
                      <span className="text-[9px] bg-zinc-900 px-2 py-1 rounded text-zinc-500 font-black uppercase tracking-widest border border-zinc-800">
                        {evento.categoria}
                      </span>
                    </div>
                    <h4 className="text-white font-black uppercase text-base mb-2 leading-tight group-hover:text-primary transition-colors">
                      {evento.titulo}
                    </h4>
                    <p className="text-zinc-500 text-xs line-clamp-3 leading-relaxed mb-6 font-medium">
                      {evento.descricao}
                    </p>
                  </div>
                  
                  <button
                    onClick={() => handleGenerateStoryCard(evento)}
                    disabled={generatingId !== null}
                    className="w-full flex items-center justify-center gap-2 bg-[#09090b] hover:bg-zinc-900 border-2 border-zinc-800 hover:border-primary text-zinc-400 hover:text-white py-2.5 rounded-xl font-black uppercase tracking-widest text-[9px] transition-all"
                  >
                    {generatingId === evento.id ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <>
                        <Download className="w-3.5 h-3.5 text-primary" /> Story Card
                      </>
                    )}
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-[#09090b] border-2 border-primary/30 text-white px-6 py-4 rounded-2xl flex items-center gap-3 shadow-2xl max-w-md w-[90%] justify-center"
          >
            <div className="bg-primary/10 p-2 rounded-full border border-primary/20 text-primary">
              <Check className="w-4 h-4" />
            </div>
            <p className="text-[10px] font-black uppercase tracking-widest text-center">{toastMessage}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
