# 01dosAnimes

O site oficial do perfil [@01dosanimes](https://instagram.com/01dosanimes) focado em Dragon Ball e animes em geral.

## Tecnologias Usadas
- Next.js 14 (App Router)
- Tailwind CSS
- Supabase
- Reddit API & NewsAPI

## Como rodar localmente

1. **Clone o repositório ou baixe os arquivos.**
2. **Instale as dependências:**
   ```bash
   npm install
   ```
3. **Configuração de Variáveis de Ambiente:**
   Copie o arquivo `.env.example` para `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
   E preencha as variáveis de ambiente:
   - `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Pegue no painel do Supabase.
   - `REDDIT_CLIENT_ID` / `REDDIT_CLIENT_SECRET`: Crie um app no Reddit Apps.
   - `NEWS_API_KEY`: Pegue sua chave em NewsAPI.org.
   - `CRON_SECRET`: Escolha uma senha segura (usada pelo cron da Vercel).

4. **Rode o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```
5. Acesse `http://localhost:3000` no seu navegador.

## Estrutura do Projeto
- `src/app/page.tsx`: Página inicial.
- `src/app/noticias/page.tsx`: Portal de Notícias.
- `src/app/frases/page.tsx`: Frases épicas e download de Wallpapers.
- `src/app/loja/page.tsx`: Produtos com links de afiliado.
- `src/app/api/cron/route.ts`: Endpoint da API responsável por popular as notícias (Protegido por Middleware).
- `vercel.json`: Define que o endpoint `/api/cron` rola a cada 6 horas no ambiente de produção.
