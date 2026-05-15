# Descobertas e Pesquisas (Findings)

Este arquivo documenta decisões de arquitetura, restrições encontradas e resultados de pesquisas úteis durante o projeto.

### Descoberta 1: Arquitetura Next.js App Router
- **Status**: Ativa.
- **Detalhe**: O projeto já está utilizando Next.js 14+ com App Router. Isso é excelente para SEO.
- **Implicação**: Ao implementar a integração com banco de dados, devemos criar *Server Components* sempre que possível para que as páginas de Notícias e Wallpapers já cheguem renderizadas (bom para indexadores do Google), enquanto os componentes interativos ficam marcados com `"use client"`.

### Descoberta 2: Automação de Notícias
- **Status**: Em planejamento.
- **Detalhe**: Para popular as notícias sem esforço manual, será necessário criar scripts Python (Camada 3) que operem de forma desacoplada do Next.js, injetando dados num banco de dados global.
