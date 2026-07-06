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

export async function GET() {
  try {
    // 1. Tentar carregar do Supabase se configurado
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('noticias')
        .select('*')
        .order('data_publicacao', { ascending: false })
        .limit(40)

      if (!error && data && data.length > 0) {
        const posts = data.map((item) => {
          const isReddit = item.fonte_original.includes('r/')
          let sub = 'Geral'
          if (isReddit) {
            sub = item.fonte_original.split('r/')[1].replace(')', '')
          } else if (item.fonte_original.includes('Anime News Network')) {
            sub = 'AnimeNewsNetwork'
          }

          return {
            id: item.id,
            title: item.titulo,
            excerpt: item.resumo || '',
            imageUrl: item.imagem_capa || null,
            permalink: item.link_original,
            publishedAt: item.data_publicacao,
            score: item.destaque ? 250 : 15,
            commentsCount: item.destaque ? 42 : 5,
            subreddit: sub,
            fonte: item.fonte_original
          }
        })
        return NextResponse.json(posts)
      }
    }

    // 2. Fallback para arquivo local (.tmp/01dosanimes_news.json)
    const localPath = path.join(process.cwd(), '.tmp', '01dosanimes_news.json')
    if (fs.existsSync(localPath)) {
      const fileData = fs.readFileSync(localPath, 'utf-8')
      const localNews = JSON.parse(fileData) as NewsItem[]

      const posts = localNews.slice(0, 40).map((item: NewsItem, index: number) => {
        const isReddit = item.fonte_original.includes('r/')
        let sub = 'Geral'
        if (isReddit) {
          sub = item.fonte_original.split('r/')[1].replace(')', '')
        } else if (item.fonte_original.includes('Anime News Network')) {
          sub = 'AnimeNewsNetwork'
        }

        return {
          id: item.id || `local-${index}`,
          title: item.titulo,
          excerpt: item.resumo || '',
          imageUrl: item.imagem_capa || null,
          permalink: item.link_original,
          publishedAt: item.data_publicacao,
          score: item.destaque ? 250 : 15,
          commentsCount: item.destaque ? 42 : 5,
          subreddit: sub,
          fonte: item.fonte_original
        }
      })
      return NextResponse.json(posts)
    }

    return NextResponse.json({ error: 'Nenhuma notícia disponível' }, { status: 404 })
  } catch (error) {
    console.error('Error fetching news:', error)
    return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 })
  }
}
