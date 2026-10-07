# Redesign da identidade visual + loja de afiliados (Fase 1)

**Data:** 2026-10-06
**Modo:** Redesign - Preserve (evolução da identidade atual, não substituição)

## Contexto

O site [01dosAnimes](https://01dosanimes-portal.vercel.app/) (Next.js 14 App Router, Tailwind, Supabase) traz tráfego do Instagram
[@01dosanimes](https://instagram.com/01dosanimes) através de conteúdo (notícias, frases/wallpapers, "hoje na história", treinos
inspirados em personagens). A página `/loja` existe só como placeholder "em construção" e nem está no menu. O dono quer
transformar a loja numa vitrine real de produtos afiliados (Shopee e outras plataformas), mantendo o conteúdo como atração
principal — os produtos devem aparecer de forma integrada e visualmente atraente, não como um banner isolado. Ele também avaliou
que o visual atual tem "cara de IA" e quer refiná-lo.

## Objetivo

1. Refinar a identidade visual atual (preto + laranja) removendo os tells genéricos (preto puro, laranja padrão do Tailwind,
   Inter, zero textura, cards genéricos), sem mudar a essência da marca nem a estrutura de navegação.
2. Criar um sistema de produto de afiliados reutilizável (dado + componente), populado com produtos de exemplo realistas,
   fácil de substituir pelos links reais depois.
3. Integrar esse sistema na home (destaque do dia + prateleira) e reconstruir `/loja` como catálogo real com filtro.

## Fora de escopo (Fase 1)

- Injetar cards de produto dentro de `/noticias`, `/frases`, `/treino` (o componente nasce pronto pra isso, a integração em
  si fica pra uma leva seguinte).
- Trocar a biblioteca de ícones (Lucide → Phosphor/outra). Fica registrado como polimento futuro, não nesta leva.
- Backend/Supabase para produtos. Fase 1 usa dado local estático (ver "Modelo de dados").
- Deploy em produção. O trabalho é verificado localmente (dev server) e via preview deploy numa branch separada; produção em
  `01dosanimes-portal.vercel.app` só muda com aprovação explícita do dono.

## Identidade visual

| Token | Antes | Depois | Por quê |
|---|---|---|---|
| `--background` | `#000000` | `#0a0a0a` | Preto puro é um tell comum de design genérico; já é a cor usada nos cards (`--card`), unifica o tom. |
| `--primary` (laranja) | `#f97316` (Tailwind `orange-500` padrão) | `#e8622c` | Mesma família de cor, mas deixa de ser literalmente o valor de fábrica do Tailwind. |
| `--primary-dark` | `#ea580c` | ajustar proporcionalmente ao novo `--primary` | Mantém a relação clara/escura já usada em hovers/gradientes. |
| Fonte | Google Fonts Inter (`next/font/google`) | Geist local (`src/app/fonts/GeistVF.woff` + `GeistMonoVF.woff`, já existentes no repo e sem uso, via `next/font/local`) | Ganho visual grande, risco baixo, zero chamada externa nova. |
| Textura | Nenhuma | Camada fixa de grain/ruído (`pointer-events-none`, opacidade baixa) sobre o body | Tira a chapação "design plano" do fundo. |
| Ícones | Lucide | Lucide (mantido) | Fora de escopo nesta leva. |
| Raridade de produto | N/A | `comum` = contorno zinc neutro · `raro` = o próprio `--primary` · `lendario` = dourado dessaturado (`#c9a24a`) | Cor como dado semântico (raridade), não como segunda cor de marca — a trava de "um acento só" continua valendo pro resto do site. |

Raio de borda (consistência, documentado): botões/badges = pill (`rounded-full`), cards = `rounded-3xl`, filtros/inputs =
`rounded-lg`. Os componentes novos de produto seguem essa regra já existente no site, não criam uma quarta escala.

Sombras (`box-glow`, `text-glow`) continuam tingidas na cor de acento, só atualizando o hex pro novo `--primary`.

## Modelo de dados

Mesmo padrão já usado em `historia.json` / `historia.ts` (dado local lido pelo client, sem backend):

- `src/data/produtos.json` — ~10-12 produtos de exemplo (nomes, categorias e preços realistas de produtos de anime que
  existem de fato na Shopee: figures, camisetas, mangás, pôsteres, acessórios — nunca "Produto 1").
- `src/lib/produtos.ts` — tipos e helpers (`getProdutos()`, `getProdutoDoDia()` — seleção determinística pela data, mesmo
  mecanismo de `getEventosHoje()`).

```ts
interface Produto {
  id: string
  nome: string
  anime: string          // "Dragon Ball", "One Piece", "Naruto"...
  categoria: string       // "Figure", "Camiseta", "Mangá", "Acessório", "Pôster"
  raridade: 'comum' | 'raro' | 'lendario'
  preco: number
  precoOriginal?: number   // presente quando há desconto
  imagem: string
  linkAfiliado: string
  plataforma: 'shopee' | 'amazon' | 'outro'
}
```

Troca pelos links reais depois = editar o JSON. Sem painel admin nesta fase (não existe ainda necessidade real de um; YAGNI).

## Componentes

- **`ProdutoCard`** (`src/components/ProdutoCard.tsx`) — reutilizável entre grid (loja) e prateleira (home). Imagem, badge de
  anime, borda/glow de raridade, preço (com `precoOriginal` riscado quando houver desconto), CTA que abre o link afiliado em
  nova aba com `rel="sponsored noopener"` e `target="_blank"` (exigência de link de afiliado).
- **`AcheiDoDia`** (`src/components/AcheiDoDia.tsx`) — destaque de produto na home, escolhido deterministicamente pela data
  (mesmo padrão de "Hoje na História").

## Páginas afetadas

- **`src/app/layout.tsx`**: adicionar `/loja` ao menu (header e footer) — hoje a rota existe mas não está linkada.
- **`src/app/page.tsx`**: nova seção entre "Hoje na História" e "Frases & Wallpapers": `AcheiDoDia` + prateleira horizontal
  (scroll) de `ProdutoCard`, reaproveitando a linguagem visual já usada no grid de wallpapers (hover, glow, reveal).
- **`src/app/loja/page.tsx`**: reescrita completa. Catálogo com filtro por anime/categoria (botões, não dropdown) + grid de
  `ProdutoCard`. Deixa de ser "em construção".
- **`src/app/globals.css`**: tokens de cor atualizados, camada de grain, fonte Geist.

## Verificação

Sem backend/API novos nesta fase — risco é majoritariamente visual/manual:

1. `npm run dev` local e checagem visual (desktop + mobile) de home e `/loja` via navegador.
2. Conferir que os links de afiliado abrem em nova aba com os atributos corretos.
3. Conferir contraste dos badges de raridade (especialmente o dourado "lendário" sobre o fundo escuro).
4. Build de produção (`npm run build`) sem erros antes de qualquer push.
5. Push numa branch separada para gerar preview deploy na Vercel; produção só muda com aprovação explícita.
