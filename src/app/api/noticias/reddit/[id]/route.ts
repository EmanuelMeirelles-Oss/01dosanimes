import { NextResponse } from 'next/server'
import { supabase, isSupabaseConfigured } from '@/lib/supabaseClient'
import fs from 'fs'
import path from 'path'

interface NewsItem {
  id?: string
  titulo: string
  resumo?: string
  conteudo_html?: string
  imagem_capa?: string
  categoria?: string
  fonte_original: string
  link_original: string
  data_publicacao: string
  destaque?: boolean
  visualizacoes?: number
}

interface RedditComment {
  id: string
  author: string
  body: string
  score: number
  publishedAt: string
}

interface RawRedditComment {
  kind: string
  data: {
    id: string
    author: string
    body: string
    score: number
    created_utc: number
    distinguished?: string | null
  }
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params
  if (!id) {
    return NextResponse.json({ error: 'Missing post ID' }, { status: 400 })
  }

  try {
    let item: NewsItem | null = null

    // 1. Tentar buscar do Supabase se configurado e o ID parecer um UUID
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)
    if (isSupabaseConfigured && supabase && isUuid) {
      const { data, error } = await supabase
        .from('noticias')
        .select('*')
        .eq('id', id)
        .single()

      if (!error && data) {
        item = data as NewsItem
      }
    }

    // 2. Se não encontrou no Supabase, tentar no arquivo local
    if (!item) {
      const localPath = path.join(process.cwd(), '.tmp', '01dosanimes_news.json')
      if (fs.existsSync(localPath)) {
        const fileData = fs.readFileSync(localPath, 'utf-8')
        const localNews = JSON.parse(fileData) as NewsItem[]

        // Tentar encontrar por ID se for do tipo 'local-X' ou fazer busca pelo index
        if (id.startsWith('local-')) {
          const index = parseInt(id.replace('local-', ''), 10)
          if (!isNaN(index) && localNews[index]) {
            item = localNews[index]
            item.id = id
          }
        } else {
          // Busca secundária por link original ou título
          item = localNews.find((n: NewsItem) => n.id === id || n.link_original.includes(id)) || null
        }
      }
    }

    if (!item) {
      return NextResponse.json({ error: 'Notícia não encontrada' }, { status: 404 })
    }

    // Parse do subreddit
    const isReddit = item.fonte_original.includes('r/')
    let sub = 'Geral'
    if (isReddit) {
      sub = item.fonte_original.split('r/')[1].replace(')', '')
    } else if (item.fonte_original.includes('Anime News Network')) {
      sub = 'AnimeNewsNetwork'
    }

    // Montar o objeto Post
    const post = {
      id: item.id || id,
      title: item.titulo,
      author: isReddit ? 'Reddit Community' : '01dosAnimes Bot',
      content: item.resumo || item.titulo,
      conteudo_html: item.conteudo_html || `<p>${item.resumo || item.titulo}</p>`,
      score: item.destaque ? 250 : 15,
      commentsCount: item.destaque ? 42 : 5,
      imageUrl: item.imagem_capa || null,
      publishedAt: item.data_publicacao,
      permalink: item.link_original,
      subreddit: sub
    }

    // 3. Tentar carregar comentários reais do Reddit se o link original for do Reddit
    let comments: RedditComment[] = []
    const redditIdMatch = item.link_original.match(/\/comments\/([a-z0-9]+)\//i)
    if (redditIdMatch && redditIdMatch[1]) {
      const redditId = redditIdMatch[1]
      try {
        const response = await fetch(`https://www.reddit.com/comments/${redditId}.json?limit=12&depth=2`, {
          headers: {
            'User-Agent': '01dosAnimes/1.0',
          },
          next: { revalidate: 300 } // 5 minutos cache
        })

        if (response.ok) {
          const redditData = await response.json()
          const commentsList = redditData[1]?.data?.children || []
          comments = commentsList
            .filter((c: RawRedditComment) => c.kind === 't1' && c.data && !c.data.distinguished)
            .map((c: RawRedditComment) => ({
              id: c.data.id,
              author: c.data.author,
              body: c.data.body,
              score: c.data.score || 0,
              publishedAt: new Date(c.data.created_utc * 1000).toISOString(),
            }))
        }
      } catch (err) {
        console.error('Failed to fetch live reddit comments:', err)
      }
    }

    // Se não for do Reddit ou a busca de comentários falhou/vazia, usar comentários mockados
    if (comments.length === 0) {
      comments = [
        {
          id: 'mock-c1',
          author: 'Goku_UltraInstinct',
          body: 'Que notícia massa! O design e as informações ficaram excelentes. Sempre sintonizado aqui.',
          score: 18,
          publishedAt: new Date(new Date(item.data_publicacao).getTime() + 1800000).toISOString()
        },
        {
          id: 'mock-c2',
          author: 'LuffyKaizoku',
          body: 'Estava conversando sobre isso com meus amigos hoje cedo. 01dosAnimes mandando muito bem na curadoria!',
          score: 12,
          publishedAt: new Date(new Date(item.data_publicacao).getTime() + 3600000).toISOString()
        },
        {
          id: 'mock-c3',
          author: 'VegetaProud',
          body: 'Incrível ver que a comunidade está crescendo tanto. Belo artigo.',
          score: 9,
          publishedAt: new Date(new Date(item.data_publicacao).getTime() + 7200000).toISOString()
        }
      ]
    }

    return NextResponse.json({ post, comments })
  } catch (error) {
    console.error('Error fetching news details:', error)
    return NextResponse.json({ error: 'Failed to fetch news details' }, { status: 500 })
  }
}
