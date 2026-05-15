# Plano de Ação - 01zanimes

## Fase 0: Inicialização do Protocolo (CONCLUÍDO)
- [x] Criar `gemini.md` com a Constituição do Projeto e Schemas.
- [x] Criar `task_plan.md` (este arquivo).
- [x] Criar `findings.md` para armazenar pesquisas e restrições.
- [x] Criar `progress.md` para diário de bordo e erros.

## Fase 1: Refinamento de UX/UI (Ações Imediatas no Frontend)
- [ ] **Notícias (`/noticias`)**: Melhorar a usabilidade geral, tornar os cards ainda mais atrativos, organizar categorias e possibilitar fluxo de clique para ler a notícia inteira de maneira realista.
- [ ] **Wallpapers (`/frases`)**: Adicionar filtros (por anime, formato PC/Mobile), otimizar o grid e aplicar micro-interações que incentivem o download.
- [ ] **Código**: Revisar o código React para organizar os componentes e garantir escalabilidade.

## Fase 2: Arquitetura de Dados e Bot (Backend)
- [ ] **Setup do Banco de Dados**: Definir qual DB usar (ex: Supabase, MongoDB, Firebase) e provisionar as tabelas baseadas nos schemas do `gemini.md`.
- [ ] **Estruturação do Bot**: Criar a pasta `tools/` e os scripts Python determinísticos para coletar notícias de fontes de animes.
- [ ] **Teste do Bot**: Garantir que o bot salva os dados corretamente e formata os payloads.

## Fase 3: Conexão (Link)
- [ ] Substituir os `mockNoticias` e `mockWallpapers` no Next.js por chamadas de API reais pro Banco de Dados.
- [ ] Criar rotas SSR/SSG ou Client-side do Next.js para puxar dados frescos de forma rápida.

## Fase 4: Gatilho e Produção
- [ ] Implantar o site Next.js (Vercel).
- [ ] Criar Cron Jobs (Gatilho) pro Bot rodar de N em N horas e popular o DB de forma automática.
