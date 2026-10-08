// Cada personagem tem a paleta usada nos wallpapers e na página dele.
// `escuro` = fundo do estilo Noite, `cor` = cor principal, `apoio` = segunda cor do figurino.
// `jp` = nome como aparece no original japonês (katakana/kanji), desenhado grande no wallpaper.

export interface Personagem {
  slug: string
  nome: string
  anime: string
  jp: string
  cor: string
  apoio: string
  escuro: string
  frases: string[]
}

export const personagens: Personagem[] = [
  {
    slug: 'goku',
    nome: 'Goku',
    anime: 'Dragon Ball',
    jp: '悟空',
    cor: '#E8622C',
    apoio: '#1F3A93',
    escuro: '#14213F',
    frases: [
      'Oi, eu sou o Goku!',
      'Eu preferiria ser um macaco sem cérebro do que um monstro sem coração.',
    ],
  },
  {
    slug: 'vegeta',
    nome: 'Vegeta',
    anime: 'Dragon Ball',
    jp: 'ベジータ',
    cor: '#2F5BD3',
    apoio: '#E9E2CC',
    escuro: '#101A33',
    frases: ['Eu sou o príncipe dos Saiyajins!', 'Kakarotto, você é o número um.'],
  },
  {
    slug: 'piccolo',
    nome: 'Piccolo',
    anime: 'Dragon Ball',
    jp: 'ピッコロ',
    cor: '#3F8A4E',
    apoio: '#6B4E9B',
    escuro: '#14261B',
    frases: [
      'Não importa quantas boas ações você faça, seus pecados anteriores não podem ser apagados.',
    ],
  },
  {
    slug: 'naruto',
    nome: 'Naruto',
    anime: 'Naruto',
    jp: 'ナルト',
    cor: '#F08A24',
    apoio: '#1E2C4A',
    escuro: '#1B1712',
    frases: [
      'Eu nunca volto atrás na minha palavra. Esse é o meu jeito ninja!',
      'Não é o rosto que faz de alguém um monstro, são as escolhas que ele faz.',
    ],
  },
  {
    slug: 'itachi',
    nome: 'Itachi',
    anime: 'Naruto',
    jp: 'イタチ',
    cor: '#B3261E',
    apoio: '#E7E5DF',
    escuro: '#121111',
    frases: [
      'Aqueles que perdoam a si mesmos e aceitam a própria natureza, esses são os mais fortes.',
      'Perdoe-me, Sasuke. Esta é a última vez.',
    ],
  },
  {
    slug: 'rock-lee',
    nome: 'Rock Lee',
    anime: 'Naruto',
    jp: 'ロック・リー',
    cor: '#3E8E41',
    apoio: '#E56B2F',
    escuro: '#13240F',
    frases: ['O trabalho duro supera o dom natural.'],
  },
  {
    slug: 'luffy',
    nome: 'Luffy',
    anime: 'One Piece',
    jp: 'ルフィ',
    cor: '#C8102E',
    apoio: '#E8C547',
    escuro: '#2A0C10',
    frases: [
      'Eu vou ser o Rei dos Piratas!',
      'Não quero conquistar nada. Só quero ser o homem mais livre do mundo.',
    ],
  },
  {
    slug: 'levi',
    nome: 'Levi',
    anime: 'Attack on Titan',
    jp: 'リヴァイ',
    cor: '#3D6B52',
    apoio: '#E7E5DF',
    escuro: '#141C17',
    frases: [
      'A única coisa que podemos fazer é acreditar que não vamos nos arrepender da escolha que fizemos.',
    ],
  },
  {
    slug: 'eren',
    nome: 'Eren',
    anime: 'Attack on Titan',
    jp: 'エレン',
    cor: '#4F7A63',
    apoio: '#8C5A3C',
    escuro: '#181512',
    frases: [
      'Se você ganhar, você vive. Se você perder, você morre. Se não lutar, não pode ganhar.',
    ],
  },
  {
    slug: 'edward',
    nome: 'Edward',
    anime: 'Fullmetal Alchemist',
    jp: 'エドワード',
    cor: '#A4161A',
    apoio: '#D4A017',
    escuro: '#220B0C',
    frases: ['Não existe lição sem dor. Não se ganha algo sem sacrificar algo em troca.'],
  },
  {
    slug: 'mustang',
    nome: 'Roy Mustang',
    anime: 'Fullmetal Alchemist',
    jp: 'マスタング',
    cor: '#E2571E',
    apoio: '#1C2541',
    escuro: '#0F1424',
    frases: [
      'O poder de um homem não deve ser julgado pelas amizades, mas por aqueles que ele considera inimigos.',
    ],
  },
  {
    slug: 'saitama',
    nome: 'Saitama',
    anime: 'One Punch Man',
    jp: 'サイタマ',
    cor: '#E9B824',
    apoio: '#C1121F',
    escuro: '#211B0A',
    frases: ['Sou só um cara que é herói por diversão.', 'OK.'],
  },
]

export function getPersonagem(slug: string) {
  return personagens.find((p) => p.slug === slug)
}

// Cor de referência de cada anime (usada no placeholder dos produtos sem foto).
export function corDoAnime(anime: string) {
  return personagens.find((p) => p.anime === anime)?.cor ?? '#8E8B84'
}

export const animes = Array.from(new Set(personagens.map((p) => p.anime)))
