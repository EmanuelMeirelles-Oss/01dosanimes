/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    // Páginas antigas: frases e loja viraram wallpapers e achados.
    // Hoje, treino, notícias e editoriais saíram do site; o código continua no repo.
    return [
      { source: '/frases', destination: '/wallpapers', permanent: false },
      { source: '/loja', destination: '/achados', permanent: false },
      { source: '/hoje', destination: '/', permanent: false },
      { source: '/treino', destination: '/', permanent: false },
      { source: '/noticias', destination: '/', permanent: false },
      { source: '/noticias/:id*', destination: '/', permanent: false },
      { source: '/editoriais/:slug*', destination: '/', permanent: false },
    ];
  },
};

export default nextConfig;
