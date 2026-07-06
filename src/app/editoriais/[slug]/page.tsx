import Link from 'next/link'
import { ArrowLeft, Flame } from 'lucide-react'

interface Article {
  titulo: string
  categoria: string
  tempoLeitura: string
  data: string
  imagem: string
  conteudo: string[]
}

const mockArticles: Record<string, Article> = {
  'gohan-evoluir': {
    titulo: 'POR QUE GOHAN PAROU DE EVOLUIR?',
    categoria: 'Matéria da Semana',
    tempoLeitura: '8 MIN',
    data: '19 MAI 2026',
    imagem: '/collage.jpg',
    conteudo: [
      'Gohan sempre foi um dos personagens mais complexos de Dragon Ball. Desde sua primeira aparição, fomos apresentados a um garoto com um poder latente absurdo, mas com uma aversão natural à violência.',
      'Diferente de Goku, que luta pelo prazer do combate e superação, Gohan luta por necessidade. A pressão colocada sobre os ombros de uma criança, especialmente durante a saga de Cell, foi astronômica.',
      'A verdadeira razão pela qual Gohan "parou de evoluir" marcialmente não é uma falha de roteiro, mas uma conclusão lógica do arco de personagem de alguém que sempre sonhou em ser um acadêmico, um estudioso, um pai de família presente.',
      'No entanto, a ferocidade de seu sangue Saiyajin nunca desaparece por completo, surgindo em momentos de extrema necessidade, como vimos recentemente com a transformação Gohan Beast. Gohan não parou de evoluir; ele evoluiu em suas próprias condições.'
    ]
  },
  'vegeta-venceu-goku': {
    titulo: 'VEGETA VENCEU GOKU HÁ MUITO TEMPO — E NINGUÉM PERCEBEU',
    categoria: 'Análise',
    tempoLeitura: '5 MIN',
    data: '15 MAI 2026',
    imagem: '/vegeta_family_warrior.png',
    conteudo: [
      'A rivalidade entre Goku e Vegeta é o pilar de Dragon Ball Z e Super. Durante décadas, os fãs debatem quem é o mais forte.',
      'Mas se olharmos para o desenvolvimento pessoal, Vegeta teve uma vitória absoluta. Ele superou seu orgulho tóxico, tornou-se um marido devoto para Bulma e um pai exemplar para Trunks e Bra.',
      'Enquanto Goku permanece um eterno amante das artes marciais, muitas vezes negligenciando sua família pelo próximo desafio, Vegeta encontrou o equilíbrio perfeito entre ser um guerreiro formidável e um homem de família. Essa é a verdadeira vitória do Príncipe dos Saiyajins.'
    ]
  },
  'ano-de-ouro-dbz': {
    titulo: '1992 FOI O ANO DE OURO DE DRAGON BALL',
    categoria: 'História',
    tempoLeitura: '12 MIN',
    data: '10 MAI 2026',
    imagem: '/dbz_1992_era.png',
    conteudo: [
      'O ano de 1992 marcou o ápice cultural de Dragon Ball Z. A Saga dos Androides e o início dos Jogos do Cell capturaram a imaginação de milhões ao redor do mundo.',
      'A animação atingiu novos níveis, a tensão narrativa era palpável a cada episódio. A introdução de Trunks do Futuro e a misteriosa doença cardíaca de Goku criaram um senso de urgência que a série nunca havia visto.',
      'Além disso, a trilha sonora icônica de Shunsuke Kikuchi estava em seu auge, criando a atmosfera perfeita para o desespero e a esperança que definiam essa era de ouro.'
    ]
  },
  'trunks-bem-escrito': {
    titulo: 'TRUNKS FUTURO É O PERSONAGEM MAIS BEM ESCRITO',
    categoria: 'Personagens',
    tempoLeitura: '8 MIN',
    data: '08 MAI 2026',
    imagem: '/future_trunks_ruins.png',
    conteudo: [
      'Trunks do Futuro carrega um peso que nenhum outro personagem de Dragon Ball carrega. Ele não luta por orgulho ou para testar seus limites; ele luta por sobrevivência e para evitar a aniquilação completa.',
      'Seu pragmatismo no combate – destruindo os inimigos rapidamente sem brincar, como visto contra Freeza e Rei Cold – é um reflexo direto do trauma de viver em um mundo destruído.',
      'Essa abordagem realista e desesperada o torna único entre os Saiyajins e, argumentavelmente, o personagem mais humano e bem escrito da obra de Akira Toriyama.'
    ]
  }
}

export default function EditorialPage({ params }: { params: { slug: string } }) {
  const article = mockArticles[params.slug];

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-6 bg-background">
        <Flame className="w-16 h-16 text-primary/20 mb-6" />
        <h1 className="text-3xl font-display font-black text-white uppercase tracking-tighter mb-4">Artigo não encontrado</h1>
        <p className="text-zinc-500 text-xs font-medium uppercase tracking-wider mb-8">Não conseguimos encontrar o arquivo solicitado.</p>
        <Link href="/" className="inline-flex items-center gap-2 bg-[#09090b] border-2 border-zinc-800 hover:border-primary px-6 py-3.5 rounded-xl text-white font-black uppercase text-xs tracking-widest transition-all">
          <ArrowLeft className="w-4 h-4 text-primary" /> Voltar ao Início
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden pb-24">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none cyber-grid -z-10" />

      {/* Hero Header */}
      <div className="relative w-full h-[55vh] md:h-[65vh] flex flex-col justify-end border-b-2 border-zinc-800/80">
        <div className="absolute inset-0 w-full h-full -z-20 bg-black">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={article.imagem} 
            alt={article.titulo} 
            className="w-full h-full object-cover object-top opacity-30 blur-[0.5px]" 
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent -z-10" />

        <div className="container mx-auto px-4 pb-12 z-10 max-w-4xl w-full">
          <Link href="/" className="inline-flex items-center gap-2 text-zinc-300 hover:text-white transition-all bg-[#09090b]/80 px-4 py-2.5 rounded-xl border-2 border-zinc-800 hover:border-primary font-black text-[10px] uppercase tracking-widest shadow-xl mb-10 hover:-translate-y-0.5">
            <ArrowLeft className="w-4 h-4 text-primary" /> Painel Geral
          </Link>
          
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="bg-primary text-black text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded shadow-[0_0_10px_var(--primary-glow)]">
              {article.categoria}
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-black tracking-tight uppercase leading-none text-white drop-shadow-2xl mb-6">
            {article.titulo}
          </h1>

          <div className="text-zinc-500 font-black text-[10px] uppercase tracking-widest flex flex-wrap items-center gap-4 py-4 border-t border-zinc-850">
            <span>AUTOR // 01dosAnimes</span>
            <span className="text-primary">•</span>
            <span>PUBLICADO // {article.data}</span>
            <span className="text-primary">•</span>
            <span className="text-accent">{article.tempoLeitura} LEITURA</span>
          </div>
        </div>
      </div>

      {/* Conteúdo do Artigo */}
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <article className="prose prose-invert max-w-none text-zinc-300 font-medium text-sm md:text-base leading-relaxed mb-16">
          {article.conteudo.map((paragrafo: string, index: number) => {
            if (index === 0) {
              // Estilo Capitular Brutalista para o primeiro parágrafo
              return (
                <p key={index} className="mb-8 first-letter:float-left first-letter:text-5xl first-letter:font-display first-letter:font-black first-letter:text-primary first-letter:mr-3 first-letter:bg-primary/10 first-letter:px-3 first-letter:py-1 first-letter:border-2 first-letter:border-primary first-letter:rounded-xl">
                  {paragrafo}
                </p>
              )
            }
            return (
              <p key={index} className="mb-8">
                {paragrafo}
              </p>
            )
          })}
        </article>

        {/* Divisor */}
        <div className="w-full h-[2px] bg-gradient-to-r from-zinc-800 to-transparent my-12" />

        {/* Call to Action - Compartilhar/Comentar (Brutalist Manga box) */}
        <div className="manga-card manga-card-orange rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between shadow-2xl relative">
          <div className="text-center md:text-left">
            <span className="text-primary text-[9px] font-black uppercase tracking-widest mb-1 block">COMUNIDADE ATIVA</span>
            <h3 className="text-xl md:text-2xl font-display font-black text-white uppercase tracking-tight mb-2">Quer debater esta análise?</h3>
            <p className="text-zinc-500 text-xs font-medium max-w-sm uppercase tracking-wide">Entre no nosso Discord e debata diretamente com os editores e outros guerreiros.</p>
          </div>
          
          <a 
            href="https://discord.gg/01dosanimes" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="mt-6 md:mt-0 bg-primary hover:bg-white text-black font-black uppercase tracking-widest px-8 py-4 rounded-xl transition-all shadow-[0_0_20px_var(--primary-glow)] hover:-translate-y-0.5 text-[10px]"
          >
            Acessar Servidor Discord
          </a>
        </div>
      </div>
    </div>
  )
}
