# Constituição do Projeto: 01zanimes (Protocolo V.L.A.E.G)

## 1. Visão Geral e Arquitetura
O objetivo é transformar o `01zanimes` no principal portal para fãs de animes, atraindo acessos diários através de alto valor agregado (Notícias em tempo real e Wallpapers épicos com frases). 

- **Frontend**: Next.js (App Router), Tailwind CSS, Framer Motion. 
- **Backend / Bot (Automação)**: Scripts modulares e determinísticos em Python (`tools/`) encarregados de buscar, raspar, formatar e salvar as notícias e novos wallpapers.
- **Fonte de Dados (DB)**: Precisamos de um banco de dados relacional ou NoSQL (como Supabase/PostgreSQL ou Firebase) para centralizar tudo. O bot escreve no banco; o Next.js lê do banco.

## 2. Invariantes Arquiteturais (A.N.T.)
- **Camada 1 (Arquitetura - `architecture/`)**: POPs técnicos. Toda regra nova sobre "Como raspar o site X" ou "Como exibir imagens Y" deve ser documentada aqui.
- **Camada 2 (Navegação)**: Decisão inteligente para roteamento de dados. 
- **Camada 3 (Ferramentas - `tools/`)**: Scripts Python atômicos, testáveis e confiáveis. Nenhuma IA no meio da coleta direta se não for estritamente necessário; usar lógicas determinísticas.

## 3. Esquemas de Dados (Schemas - JSON)

### 3.1 Schema de Notícias (`News`)
```json
{
  "id": "uuid",
  "titulo": "string",
  "resumo": "string",
  "conteudo_html": "string",
  "imagem_capa": "string (url)",
  "categoria": "string (ex: Lançamentos, Mangá, Jogos)",
  "fonte_original": "string",
  "link_original": "string",
  "data_publicacao": "datetime",
  "destaque": "boolean",
  "visualizacoes": "number"
}
```

### 3.2 Schema de Wallpapers (`Wallpapers`)
```json
{
  "id": "uuid",
  "anime": "string",
  "personagem": "string",
  "frase": "string (opcional)",
  "imagem_url_hd": "string (url)",
  "imagem_url_mobile": "string (url)",
  "downloads": "number",
  "tags": ["string"]
}
```

## 4. Regras Comportamentais
1. **UX/UI como Prioridade Absoluta**: O usuário deve sentir que está em um produto premium. Sem cores primárias secas, uso constante de *glow*, animações sutis, layouts organizados.
2. **Dados Primeiro**: Antes de escrever o código do bot ou do frontend real, o schema de banco de dados deve estar validado.
3. **Mantenha os Logs**: Atualize sempre `progress.md` com o que funcionou e o que quebrou, e `findings.md` com novas descobertas arquiteturais.
