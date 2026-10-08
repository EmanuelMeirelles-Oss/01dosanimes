import type { Metadata } from 'next'
import { Dela_Gothic_One } from 'next/font/google'
import localFont from 'next/font/local'
import Link from 'next/link'
import { Instagram } from 'lucide-react'
import './globals.css'

// Fonte de pôster japonesa: tem latim e katakana, então serve para títulos e para os nomes em japonês.
const display = Dela_Gothic_One({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const geist = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist',
  weight: '100 900',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: '01dosAnimes: wallpapers de frases de anime e achados',
    template: '%s | 01dosAnimes',
  },
  description:
    'Crie um wallpaper com a frase do seu personagem favorito e baixe em alta resolução. Mais achados de anime para montar o quarto.',
}

const nav = [
  { href: '/wallpapers', rotulo: 'Wallpapers' },
  { href: '/achados', rotulo: 'Achados' },
]

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${geist.variable}`}>
      <body className="min-h-[100dvh] flex flex-col font-sans text-tinta selection:bg-carimbo selection:text-tinta">
        <header className="sticky top-0 z-40 border-b-2 border-tinta bg-papel/95 backdrop-blur-sm">
          <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between gap-6 px-4 sm:px-6">
            <Link href="/" className="font-display text-xl leading-none tracking-tight">
              01dos<span className="text-carimbo">Animes</span>
            </Link>
            <nav className="flex items-center gap-5 text-[15px] font-semibold sm:gap-8">
              {nav.map((n) => (
                <Link key={n.href} href={n.href} className="underline-offset-4 hover:underline">
                  {n.rotulo}
                </Link>
              ))}
              <a
                href="https://instagram.com/01dosanimes"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram @01dosanimes"
                className="hidden items-center gap-2 sm:flex hover:underline underline-offset-4"
              >
                <Instagram className="h-4 w-4" strokeWidth={2} />
                @01dosanimes
              </a>
            </nav>
          </div>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="mt-24 border-t-2 border-tinta">
          <div className="mx-auto grid max-w-[1280px] gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1fr_auto]">
            <div className="max-w-[60ch] space-y-3">
              <p className="font-display text-lg">
                01dos<span className="text-carimbo">Animes</span>
              </p>
              <p className="text-sm leading-relaxed text-tinta/75">
                Alguns links deste site são de afiliado. Se você comprar por eles, o 01dosAnimes recebe uma
                comissão e você não paga nada a mais. Os preços mudam o tempo todo, confira na loja antes de
                comprar.
              </p>
            </div>
            <div className="flex gap-6 text-sm font-semibold md:flex-col md:gap-2 md:text-right">
              {nav.map((n) => (
                <Link key={n.href} href={n.href} className="hover:underline underline-offset-4">
                  {n.rotulo}
                </Link>
              ))}
              <a href="https://instagram.com/01dosanimes" target="_blank" rel="noopener noreferrer" className="hover:underline underline-offset-4">
                Instagram
              </a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
