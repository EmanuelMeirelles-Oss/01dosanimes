import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import { Instagram } from 'lucide-react'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '01dosAnimes',
  description: 'O site oficial do perfil @01dosanimes. Notícias, frases e loja de animes.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} bg-background text-foreground min-h-screen flex flex-col selection:bg-primary selection:text-black`}>
        <header className="w-full bg-[#050505]/80 border-b border-[#1f1f1f] backdrop-blur-xl sticky top-0 z-50">
          <div className="container mx-auto px-4 h-20 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-4 group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <div className="relative">
                <div className="absolute inset-0 bg-primary rounded-full blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
                <img 
                  src="/logo.jpg" 
                  alt="01dosAnimes Logo" 
                  className="relative w-12 h-12 rounded-full border-2 border-primary/50 object-cover group-hover:border-primary transition-colors duration-500 shadow-xl" 
                />
              </div>
              <span className="text-2xl font-black text-white tracking-tighter uppercase uppercase group-hover:text-primary transition-colors duration-300">
                01dos<span className="text-primary group-hover:text-white transition-colors duration-300">Animes</span>
              </span>
            </Link>
            <a 
              href="https://instagram.com/01dosanimes" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#111111] border border-[#222222] text-sm font-bold text-zinc-300 hover:text-black hover:bg-primary hover:border-primary transition-all duration-300 shadow-lg"
            >
              <Instagram className="w-4 h-4" />
              <span className="hidden sm:inline">SEGUIR</span>
            </a>
          </div>
        </header>

        <main className="flex-1 relative">
          {children}
        </main>

        <footer className="w-full border-t border-[#1f1f1f] bg-[#050505] py-8 mt-auto z-10 relative">
          <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.jpg" alt="Logo" className="w-8 h-8 rounded-full border border-primary/30" />
              <p className="text-zinc-500 text-sm font-medium">
                © {new Date().getFullYear()} 01dosAnimes. Todos os direitos reservados.
              </p>
            </div>
            <div className="flex items-center gap-6 text-sm font-bold text-zinc-600 uppercase tracking-widest">
              <Link href="/noticias" className="hover:text-primary transition-colors">Notícias</Link>
              <Link href="/frases" className="hover:text-primary transition-colors">Frases</Link>
              <Link href="/loja" className="hover:text-primary transition-colors">Loja</Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
