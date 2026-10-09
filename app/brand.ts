// Logo oficial em SVG (pacote logo-svg aprovado). Arquivos usados sem alteração em public/brand/svg.
// Desenho aprovado: "logo horizontal" — escura em fundos claros/amarelos; amarela/branca (principal) em fundos escuros.
export const brandAssets = {
  officialLogo: {
    /** Fundo escuro: aplicação principal no site (header e rodapé). */
    light: "/brand/svg/mathias-eventos-logo-principal.svg",
    /** Fundo claro ou amarelo: logo aprovada (opção 2). */
    dark: "/brand/svg/mathias-eventos-logo-escura.svg",
    /** Monocromática branca: fotos escuras e vídeos. */
    mono: "/brand/svg/mathias-eventos-logo-branca.svg",
    alt: "Mathias Eventos",
    width: 808,
    height: 218,
  },
  officialSymbol: {
    src: "/brand/svg/mathias-eventos-simbolo.svg",
    alt: "Símbolo da Mathias Eventos",
    width: 282,
    height: 218,
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "48x48" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
} as const;
