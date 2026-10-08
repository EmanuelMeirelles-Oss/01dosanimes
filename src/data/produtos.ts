// PRODUTOS DE EXEMPLO.
// Enquanto as contas de afiliado não estão aprovadas, `link` aponta para a busca da loja
// (funciona, mas não gera comissão). Quando aprovar: troque `link` pelo link de afiliado,
// preencha `imagem` com a foto do produto e ajuste `preco`.

export type Loja = 'shopee' | 'amazon' | 'mercadolivre'

export type Categoria =
  | 'Luminária'
  | 'Pôster'
  | 'Figure'
  | 'Roupa'
  | 'Mangá'
  | 'Mousepad'
  | 'Caneca'
  | 'Chaveiro'

export interface Produto {
  id: string
  nome: string
  anime: string
  categoria: Categoria
  preco: number // "a partir de", em reais
  loja: Loja
  link: string
  imagem?: string
}

const shopee = (busca: string) =>
  `https://shopee.com.br/search?keyword=${encodeURIComponent(busca)}`
const amazon = (busca: string) => `https://www.amazon.com.br/s?k=${encodeURIComponent(busca)}`

export const produtos: Produto[] = [
  { id: 'led-naruto', nome: 'Luminária LED 3D Naruto', anime: 'Naruto', categoria: 'Luminária', preco: 49, loja: 'shopee', link: shopee('luminaria led 3d naruto') },
  { id: 'led-goku', nome: 'Luminária LED 3D Goku', anime: 'Dragon Ball', categoria: 'Luminária', preco: 49, loja: 'shopee', link: shopee('luminaria led 3d goku') },
  { id: 'led-luffy', nome: 'Luminária LED Luffy Gear 5', anime: 'One Piece', categoria: 'Luminária', preco: 55, loja: 'shopee', link: shopee('luminaria led luffy gear 5') },
  { id: 'figure-vegeta', nome: 'Figure Vegeta Super Saiyajin', anime: 'Dragon Ball', categoria: 'Figure', preco: 89, loja: 'shopee', link: shopee('figure vegeta super saiyajin') },
  { id: 'figure-itachi', nome: 'Figure Itachi Uchiha Akatsuki', anime: 'Naruto', categoria: 'Figure', preco: 79, loja: 'shopee', link: shopee('figure itachi uchiha') },
  { id: 'figure-levi', nome: 'Figure Levi Ackerman', anime: 'Attack on Titan', categoria: 'Figure', preco: 95, loja: 'shopee', link: shopee('figure levi ackerman') },
  { id: 'figure-saitama', nome: 'Figure Saitama', anime: 'One Punch Man', categoria: 'Figure', preco: 69, loja: 'shopee', link: shopee('figure saitama one punch man') },
  { id: 'banpresto-goku', nome: 'Figure Banpresto Goku (original)', anime: 'Dragon Ball', categoria: 'Figure', preco: 189, loja: 'amazon', link: amazon('banpresto goku') },
  { id: 'figuarts-vegeta', nome: 'S.H.Figuarts Vegeta articulado (original)', anime: 'Dragon Ball', categoria: 'Figure', preco: 399, loja: 'amazon', link: amazon('sh figuarts vegeta') },
  { id: 'grandista-luffy', nome: 'Figure Grandista Luffy (original)', anime: 'One Piece', categoria: 'Figure', preco: 229, loja: 'amazon', link: amazon('grandista luffy') },
  { id: 'moletom-akatsuki', nome: 'Moletom Akatsuki com capuz', anime: 'Naruto', categoria: 'Roupa', preco: 119, loja: 'shopee', link: shopee('moletom akatsuki') },
  { id: 'poster-akatsuki', nome: 'Pôster Akatsuki A3', anime: 'Naruto', categoria: 'Pôster', preco: 19, loja: 'shopee', link: shopee('poster akatsuki a3') },
  { id: 'poster-dbz', nome: 'Kit 6 pôsteres Dragon Ball Z', anime: 'Dragon Ball', categoria: 'Pôster', preco: 29, loja: 'shopee', link: shopee('kit poster dragon ball z') },
  { id: 'poster-fma', nome: 'Pôster Fullmetal Alchemist A3', anime: 'Fullmetal Alchemist', categoria: 'Pôster', preco: 19, loja: 'shopee', link: shopee('poster fullmetal alchemist') },
  { id: 'camiseta-tropa', nome: 'Camiseta Tropa de Exploração', anime: 'Attack on Titan', categoria: 'Roupa', preco: 45, loja: 'shopee', link: shopee('camiseta tropa de exploração attack on titan') },
  { id: 'camiseta-onepiece', nome: 'Camiseta Chapéu de Palha', anime: 'One Piece', categoria: 'Roupa', preco: 45, loja: 'shopee', link: shopee('camiseta one piece chapeu de palha') },
  { id: 'camiseta-saitama', nome: 'Camiseta OK Saitama', anime: 'One Punch Man', categoria: 'Roupa', preco: 42, loja: 'shopee', link: shopee('camiseta saitama ok') },
  { id: 'manga-onepiece', nome: 'One Piece 3 em 1, volume 1', anime: 'One Piece', categoria: 'Mangá', preco: 59, loja: 'amazon', link: amazon('one piece 3 em 1 volume 1') },
  { id: 'manga-fma', nome: 'Fullmetal Alchemist Especial, volume 1', anime: 'Fullmetal Alchemist', categoria: 'Mangá', preco: 39, loja: 'amazon', link: amazon('fullmetal alchemist especial volume 1') },
  { id: 'manga-dbsuper', nome: 'Dragon Ball Super, volume 1', anime: 'Dragon Ball', categoria: 'Mangá', preco: 34, loja: 'amazon', link: amazon('dragon ball super manga volume 1') },
  { id: 'mousepad-naruto', nome: 'Mousepad gamer grande Naruto', anime: 'Naruto', categoria: 'Mousepad', preco: 39, loja: 'shopee', link: shopee('mousepad gamer grande naruto') },
  { id: 'mousepad-dbz', nome: 'Mousepad gamer grande Dragon Ball', anime: 'Dragon Ball', categoria: 'Mousepad', preco: 39, loja: 'shopee', link: shopee('mousepad gamer grande dragon ball') },
  { id: 'caneca-luffy', nome: 'Caneca Luffy 325 ml', anime: 'One Piece', categoria: 'Caneca', preco: 32, loja: 'shopee', link: shopee('caneca luffy one piece') },
  { id: 'chaveiro-scouter', nome: 'Chaveiro esferas do dragão', anime: 'Dragon Ball', categoria: 'Chaveiro', preco: 15, loja: 'shopee', link: shopee('chaveiro esfera do dragão') },
  { id: 'chaveiro-fma', nome: 'Chaveiro relógio de alquimista', anime: 'Fullmetal Alchemist', categoria: 'Chaveiro', preco: 25, loja: 'shopee', link: shopee('chaveiro relogio alquimista fullmetal') },
]

export const faixas = [
  { id: 'ate-50', rotulo: 'Até R$ 50', teste: (p: Produto) => p.preco <= 50 },
  { id: '50-a-100', rotulo: 'R$ 50 a 100', teste: (p: Produto) => p.preco > 50 && p.preco <= 100 },
  { id: 'presentao', rotulo: 'Presentão', teste: (p: Produto) => p.preco > 100 },
] as const

export const nomeLoja: Record<Loja, string> = {
  shopee: 'Shopee',
  amazon: 'Amazon',
  mercadolivre: 'Mercado Livre',
}

// Produtos do anime, com os que citam o personagem primeiro (Itachi → figure do Itachi).
export function produtosDoAnime(anime: string, limite = 3, personagem?: string) {
  const doAnime = produtos.filter((p) => p.anime === anime)
  if (!personagem) return doAnime.slice(0, limite)
  const cita = (p: Produto) => p.nome.toLowerCase().includes(personagem.toLowerCase())
  return [...doAnime.filter(cita), ...doAnime.filter((p) => !cita(p))].slice(0, limite)
}

export const categorias = Array.from(new Set(produtos.map((p) => p.categoria)))

export function formatarPreco(valor: number) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(valor)
}
