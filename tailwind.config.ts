import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Hex direto (não var) para o Tailwind aceitar opacidade: text-tinta/75, bg-papel/95.
        // Mesmos valores de :root em globals.css.
        papel: "#e7e5df",
        "papel-fundo": "#dddad2",
        tinta: "#151413",
        reticula: "#8e8b84",
        carimbo: "#e8622c",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        sans: ["var(--font-geist)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
