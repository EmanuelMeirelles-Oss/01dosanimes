import type { Personagem } from '@/data/personagens'
import { PAPEL, TINTA, textoSobre } from '@/lib/cor'

export type Estilo = 'tinta' | 'noite' | 'cor'
export type Formato = 'celular' | 'pc'

export const formatos: Record<Formato, { w: number; h: number; rotulo: string }> = {
  celular: { w: 1080, h: 2340, rotulo: 'Celular' },
  pc: { w: 2560, h: 1440, rotulo: 'PC' },
}

export const estilos: { id: Estilo; rotulo: string }[] = [
  { id: 'tinta', rotulo: 'Tinta' },
  { id: 'noite', rotulo: 'Noite' },
  { id: 'cor', rotulo: 'Cor' },
]

export interface Fontes {
  display: string
  sans: string
}

interface Opcoes {
  personagem: Personagem
  frase: string
  estilo: Estilo
  w: number
  h: number
  fontes: Fontes
}

function quebrarLinhas(ctx: CanvasRenderingContext2D, texto: string, larguraMax: number) {
  const palavras = texto.split(' ')
  const linhas: string[] = []
  let atual = ''
  for (const p of palavras) {
    const teste = atual ? `${atual} ${p}` : p
    if (ctx.measureText(teste).width > larguraMax && atual) {
      linhas.push(atual)
      atual = p
    } else {
      atual = teste
    }
  }
  if (atual) linhas.push(atual)
  return linhas
}

// Encolhe a fonte até a frase caber na caixa.
function ajustarFrase(
  ctx: CanvasRenderingContext2D,
  texto: string,
  familia: string,
  largura: number,
  alturaMax: number,
  tamanhoInicial: number,
) {
  let tamanho = tamanhoInicial
  let linhas: string[] = []
  while (tamanho > 18) {
    ctx.font = `400 ${tamanho}px ${familia}`
    linhas = quebrarLinhas(ctx, texto, largura)
    if (linhas.length * tamanho * 1.18 <= alturaMax) break
    tamanho -= 4
  }
  return { tamanho, linhas, entrelinha: tamanho * 1.18 }
}

// Retícula de mangá: pontos que crescem na direção indicada.
function reticula(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  cor: string,
  passo: number,
  direcao: 'desce' | 'sobe',
) {
  ctx.fillStyle = cor
  for (let py = y; py < y + h; py += passo) {
    const t = (py - y) / h
    const forca = direcao === 'desce' ? t : 1 - t
    const r = (passo / 2) * Math.min(1, forca * 1.1)
    if (r < 0.6) continue
    const deslocamento = Math.round((py - y) / passo) % 2 ? passo / 2 : 0
    for (let px = x + deslocamento; px < x + w; px += passo) {
      ctx.beginPath()
      ctx.arc(px, py, r, 0, Math.PI * 2)
      ctx.fill()
    }
  }
}

// Nome japonês em coluna vertical, como em capa de mangá.
function nomeVertical(
  ctx: CanvasRenderingContext2D,
  jp: string,
  cx: number,
  topo: number,
  alturaMax: number,
  larguraMax: number,
  familia: string,
  cor: string,
) {
  const chars = Array.from(jp)
  const tamanho = Math.min(alturaMax / chars.length / 1.02, larguraMax)
  ctx.fillStyle = cor
  ctx.font = `400 ${tamanho}px ${familia}`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  chars.forEach((ch, i) => {
    const cy = topo + tamanho * 1.02 * i + tamanho / 2
    if (ch === 'ー') {
      // Traço de vogal longa gira 90° na escrita vertical.
      ctx.save()
      ctx.translate(cx, cy)
      ctx.rotate(Math.PI / 2)
      ctx.fillText(ch, 0, 0)
      ctx.restore()
    } else {
      ctx.fillText(ch, cx, cy)
    }
  })
  return tamanho
}

function assinatura(ctx: CanvasRenderingContext2D, w: number, h: number, cor: string, familia: string) {
  const tamanho = Math.round(Math.min(w, h) * 0.022)
  ctx.font = `600 ${tamanho}px ${familia}`
  ctx.fillStyle = cor
  ctx.globalAlpha = 0.55
  ctx.textAlign = 'center'
  ctx.textBaseline = 'alphabetic'
  ctx.fillText('@01dosanimes', w / 2, h - tamanho * 2.2)
  ctx.globalAlpha = 1
}

export function desenharWallpaper(ctx: CanvasRenderingContext2D, o: Opcoes) {
  const { personagem: p, frase, estilo, w, h, fontes } = o
  const retrato = h > w
  const m = Math.min(w, h) // unidade base de medida

  ctx.clearRect(0, 0, w, h)
  ctx.textAlign = 'left'
  ctx.textBaseline = 'alphabetic'

  // Cores por estilo
  let fundo = PAPEL
  let texto = TINTA
  let nomeCor = TINTA
  let pontos = 'rgba(21,20,19,0.9)'
  if (estilo === 'noite') {
    fundo = p.escuro
    texto = PAPEL
    nomeCor = p.cor
    pontos = p.cor
  } else if (estilo === 'cor') {
    fundo = p.cor
    texto = textoSobre(p.cor)
    nomeCor = texto
    pontos = texto === TINTA ? 'rgba(21,20,19,0.18)' : 'rgba(231,229,223,0.18)'
  }

  ctx.fillStyle = fundo
  ctx.fillRect(0, 0, w, h)

  if (retrato) {
    // Topo (~38%) fica livre para o relógio da tela de bloqueio.
    if (estilo === 'tinta') {
      reticula(ctx, 0, h * 0.8, w * 0.7, h * 0.14, pontos, m * 0.03, 'desce')
      ctx.fillStyle = p.cor
      ctx.fillRect(w * 0.08, h * 0.44, m * 0.16, m * 0.022)
      nomeVertical(ctx, p.jp, w * 0.84, h * 0.3, h * 0.6, w * 0.22, fontes.display, nomeCor)
    } else if (estilo === 'noite') {
      reticula(ctx, w * 0.36, h * 0.74, w * 0.64, h * 0.18, pontos, m * 0.028, 'desce')
      nomeVertical(ctx, p.jp, w * 0.18, h * 0.3, h * 0.64, w * 0.26, fontes.display, nomeCor)
    } else {
      reticula(ctx, 0, h * 0.7, w, h * 0.3, pontos, m * 0.03, 'desce')
      // Carimbo (hanko) com o nome japonês
      const lado = m * 0.2
      const x = w * 0.08
      const y = h * 0.44 - lado
      ctx.fillStyle = texto
      ctx.fillRect(x, y, lado, lado)
      const chars = Array.from(p.jp)
      // Até 3 caracteres numa linha; mais que isso, duas linhas equilibradas.
      const porLinha = chars.length <= 3 ? chars.length : Math.ceil(chars.length / 2)
      const linhas = porLinha === chars.length ? [chars.join('')] : [chars.slice(0, porLinha).join(''), chars.slice(porLinha).join('')]
      const t = Math.min(lado * 0.8, (lado * 0.86) / porLinha, (lado * 0.86) / linhas.length)
      ctx.font = `400 ${t}px ${fontes.display}`
      ctx.fillStyle = fundo
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      linhas.forEach((l, i) => {
        ctx.fillText(l, x + lado / 2, y + lado / 2 + (i - (linhas.length - 1) / 2) * t * 1.05, lado * 0.86)
      })
    }

    // Frase
    const caixaX = estilo === 'noite' ? w * 0.4 : w * 0.08
    const caixaW = estilo === 'noite' ? w * 0.52 : estilo === 'tinta' ? w * 0.62 : w * 0.84
    const topo = h * 0.475
    const { tamanho, linhas, entrelinha } = ajustarFrase(ctx, frase, fontes.display, caixaW, h * 0.3, Math.round(m * 0.085))
    ctx.font = `400 ${tamanho}px ${fontes.display}`
    ctx.fillStyle = texto
    ctx.textAlign = 'left'
    ctx.textBaseline = 'top'
    linhas.forEach((l, i) => ctx.fillText(l, caixaX, topo + i * entrelinha))

    // Autoria
    const fimFrase = topo + linhas.length * entrelinha
    ctx.font = `600 ${Math.round(m * 0.03)}px ${fontes.sans}`
    ctx.globalAlpha = 0.75
    ctx.fillText(`${p.nome}, ${p.anime}`, caixaX, fimFrase + m * 0.035)
    ctx.globalAlpha = 1
  } else {
    // PC: nome japonês na horizontal, frase à direita.
    if (estilo === 'tinta') reticula(ctx, w * 0.55, 0, w * 0.45, h, pontos, m * 0.028, 'desce')
    if (estilo === 'noite') reticula(ctx, 0, h * 0.55, w, h * 0.45, pontos, m * 0.026, 'desce')
    if (estilo === 'cor') reticula(ctx, 0, h * 0.75, w, h * 0.25, pontos, m * 0.03, 'desce')

    const chars = Array.from(p.jp)
    const tamanhoNome = Math.min((w * 0.5) / chars.length, h * 0.42)
    ctx.font = `400 ${tamanhoNome}px ${fontes.display}`
    ctx.fillStyle = nomeCor
    ctx.textBaseline = 'alphabetic'
    ctx.textAlign = 'left'
    ctx.fillText(p.jp, w * 0.06, h * 0.86)

    ctx.fillStyle = p.cor
    if (estilo !== 'cor') ctx.fillRect(w * 0.06, h * 0.12, m * 0.12, m * 0.016)

    const caixaX = w * 0.06
    const { tamanho, linhas, entrelinha } = ajustarFrase(ctx, frase, fontes.display, w * 0.46, h * 0.36, Math.round(m * 0.075))
    ctx.font = `400 ${tamanho}px ${fontes.display}`
    ctx.fillStyle = texto
    ctx.textBaseline = 'top'
    linhas.forEach((l, i) => ctx.fillText(l, caixaX, h * 0.18 + i * entrelinha))
    ctx.font = `600 ${Math.round(m * 0.026)}px ${fontes.sans}`
    ctx.globalAlpha = 0.75
    ctx.fillText(`${p.nome}, ${p.anime}`, caixaX, h * 0.18 + linhas.length * entrelinha + m * 0.03)
    ctx.globalAlpha = 1
  }

  assinatura(ctx, w, h, texto, fontes.sans)
}

// Lê as famílias de fonte registradas pelo next/font (variáveis CSS no <html>).
export function lerFontes(): Fontes {
  const css = getComputedStyle(document.documentElement)
  return {
    display: css.getPropertyValue('--font-display').trim() || 'sans-serif',
    sans: css.getPropertyValue('--font-geist').trim() || 'sans-serif',
  }
}

// Garante que os glifos (inclusive katakana) estejam carregados antes de desenhar.
export async function carregarFontes(f: Fontes, amostra: string) {
  if (!('fonts' in document)) return
  await Promise.all([
    document.fonts.load(`400 64px ${f.display}`, amostra),
    document.fonts.load(`600 32px ${f.sans}`, 'Aa'),
  ])
}

// Fundo claro pede relógio escuro na tela de bloqueio (o celular faz isso sozinho).
export function fundoClaro(estilo: Estilo, p: Personagem) {
  if (estilo === 'tinta') return true
  if (estilo === 'noite') return false
  return textoSobre(p.cor) === TINTA
}

export function nomeArquivo(p: Personagem, formato: Formato) {
  return `wallpaper-${p.slug}-${formato}-01dosanimes.png`
}
