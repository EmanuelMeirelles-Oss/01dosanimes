# Novo conceito: wallpapers de frase + achados de afiliado

**Data:** 2026-10-07
**Substitui:** `2026-10-06-loja-produtos-redesign-design.md` (aprovada, nunca implementada). O dono pediu troca de conceito, não evolução.

## Problema
Site genérico e sem foco (hero "treine como um guerreiro", hoje na história, treino, notícias). Os "wallpapers" eram 12 imagens
640×640 quadradas geradas por IA: não servem como wallpaper de celular. Sem Higgsfield nem acervo próprio de arte.

## Conceito
- **Isca:** gerador de wallpaper tipográfico. Personagem + frase + estilo (Tinta, Noite, Cor), desenhado em canvas no navegador
  em 1080×2340 (celular) ou 2560×1440 (PC). Nome do personagem em japonês como elemento gráfico. Topo livre para o relógio.
  Não depende de arte de terceiros e escala só adicionando dados.
- **Receita:** produtos de afiliado do mesmo anime ao lado do wallpaper e no catálogo `/achados` (filtro por anime, tipo,
  faixa de preço). Home com prateleira "presente por faixa de preço" e quadros por categoria.
- **Saem:** hoje, treino, notícias, editoriais (redirect para home; código mantido). `/frases` → `/wallpapers`, `/loja` → `/achados`.

## Identidade
Mangá impresso, tema claro único. Papel `#E7E5DF`, tinta `#151413`, retícula, laranja da marca `#E8622C` como carimbo.
Dela Gothic One (títulos e katakana) + Geist (texto). Cantos retos; única exceção: moldura do celular.

## Dados
- `src/data/personagens.ts`: 12 personagens, paleta, nome japonês, frases.
- `src/data/produtos.ts`: 25 produtos de EXEMPLO. Links apontam para a busca da loja até as contas de afiliado serem aprovadas.
  Trocar `link`, `imagem` e `preco` quando aprovar.

## Pendências
- Contas Shopee Afiliados e Amazon Associados (dono vai criar).
- Fotos reais dos produtos (vêm junto com os links de afiliado).
- Cron de notícias (`vercel.json`) continua rodando sem página que use os dados: decidir se desliga.
- Deploy: só preview por branch, produção com aprovação.
