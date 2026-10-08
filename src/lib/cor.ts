export const PAPEL = '#E7E5DF'
export const TINTA = '#151413'

export function luminancia(hex: string) {
  const n = parseInt(hex.slice(1), 16)
  const c = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => {
    const s = v / 255
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4)
  })
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]
}

// Tinta ou papel, o que tiver mais contraste com o fundo.
export function textoSobre(fundo: string) {
  return luminancia(fundo) > 0.22 ? TINTA : PAPEL
}
