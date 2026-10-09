export type IconName =
  | "toilet"
  | "tent"
  | "armchair"
  | "backdrop"
  | "party"
  | "layers"
  | "map-pin"
  | "shield-check"
  | "sparkles"
  | "calendar"
  | "message"
  | "truck"
  | "stage"
  | "speaker"
  | "ferris"
  | "panel"
  | "droplets"
  | "clock"
  | "wrench"
  | "badge"
  | "users"
  | "building"
  | "hardhat"
  | "landmark"
  | "accessibility"
  | "ruler"
  | "heart";

export type MediaTone = "blue" | "sand" | "amber" | "violet" | "slate" | "green";

export type SiteImage = {
  src: string | null;
  alt: string;
  position?: string;
  width?: number;
  height?: number;
  placeholder?: string;
  variants?: Array<{
    width: number;
    avif: string;
    webp: string;
    fallback: string;
  }>;
};

function responsivePhoto({
  slug,
  width,
  height,
  widths,
  alt,
  position = "center",
}: {
  slug: string;
  width: number;
  height: number;
  widths: number[];
  alt: string;
  position?: string;
}): SiteImage {
  const variants = widths.map((variantWidth) => ({
    width: variantWidth,
    avif: `/images/services/${slug}/${slug}-${variantWidth}.avif`,
    webp: `/images/services/${slug}/${slug}-${variantWidth}.webp`,
    fallback: `/images/services/${slug}/${slug}-${variantWidth}.jpg`,
  }));

  return {
    src: variants.at(-1)!.fallback,
    alt,
    position,
    width,
    height,
    placeholder: `/images/services/${slug}/${slug}-placeholder.webp`,
    variants,
  };
}

const configuredWhatsApp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "");

export const company = {
  name: "Mathias Eventos",
  legalName: "Mathias Eventos",
  whatsappNumber: configuredWhatsApp || "5519997101208",
  whatsappDisplay: process.env.NEXT_PUBLIC_WHATSAPP_DISPLAY || "(19) 99710-1208",
  /** Contato secundário: sempre identificado como “Representante”. */
  representative: {
    label: "Representante",
    whatsappNumber: "5519974087238",
    whatsappDisplay: "(19) 97408-7238",
  },
  instagramUrl: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "",
  baseCity: "Santo Antônio de Posse",
  coverage: [
    "Santo Antônio de Posse",
    "Jaguariúna",
    "Holambra",
    "Campinas",
    "Cosmópolis",
    "Pedreira",
    "Amparo",
    "Artur Nogueira",
    "Mogi Mirim",
    "Mogi Guaçu",
  ],
  coverageNote: "Outras cidades próximas são avaliadas conforme a data e a estrutura solicitada.",
  /** Cidades citadas nos textos principais e no SEO local. */
  focusCities: ["Santo Antônio de Posse", "Campinas", "Holambra", "Jaguariúna"],
  tagline: "Estrutura certa. Eventos sem improviso.",
} as const;

export const coverageSentence = "Atendimento em Santo Antônio de Posse, Campinas, Holambra, Jaguariúna e região.";

export const photos = {
  homeHero: responsivePhoto({
    slug: "home-hero-estrutura-01",
    width: 1600,
    height: 900,
    widths: [480, 800, 1600],
    alt: "Estruturas de tendas montadas pela Mathias Eventos em área de evento",
  }),
  bathrooms: responsivePhoto({
    slug: "banheiros-familia-std-pcd-super-luxo-01",
    width: 1448,
    height: 1086,
    widths: [480, 800, 1448],
    alt: "Família de banheiros químicos STD, PCD e Super Luxo da Mathias Eventos",
  }),
  tents: responsivePhoto({
    slug: "tenda-montagem-geral-01",
    width: 1537,
    height: 1023,
    widths: [480, 800, 1537],
    alt: "Montagem geral de tendas brancas da Mathias Eventos",
  }),
  tentPair: responsivePhoto({
    slug: "tendas-duplas-lado-a-lado-01",
    width: 1600,
    height: 900,
    widths: [480, 800, 1600],
    alt: "Duas tendas da Mathias Eventos montadas lado a lado",
  }),
  backdrop: responsivePhoto({
    slug: "backdrop-hero-01",
    width: 1600,
    height: 900,
    widths: [480, 800, 1600],
    alt: "Backdrop finalizado em evento atendido pela Mathias Eventos",
  }),
  tables: responsivePhoto({
    slug: "mesas-cadeiras-mathias-eventos",
    width: 1122,
    height: 1402,
    widths: [480, 800, 1122],
    alt: "Mesas e cadeiras brancas organizadas para evento",
    position: "center 54%",
  }),
  sound: responsivePhoto({
    slug: "sonorizacao-mathias-eventos",
    width: 1122,
    height: 1402,
    widths: [480, 800, 1122],
    alt: "Estrutura de sonorização montada para evento",
    position: "center 48%",
  }),
  std: responsivePhoto({
    slug: "banheiro-std-frontal-01",
    width: 1536,
    height: 1024,
    widths: [480, 800, 1536],
    alt: "Banheiro químico STD da Mathias Eventos visto de frente",
  }),
  pcd: responsivePhoto({
    slug: "banheiro-pcd-frontal-01",
    width: 1448,
    height: 1086,
    widths: [480, 800, 1448],
    alt: "Banheiro químico acessível PCD da Mathias Eventos visto de frente",
  }),
  superLuxo: responsivePhoto({
    slug: "banheiro-super-luxo-frontal-01",
    width: 1600,
    height: 900,
    widths: [480, 800, 1600],
    alt: "Banheiro Super Luxo da Mathias Eventos visto de frente",
  }),
  superLuxoInterior: responsivePhoto({
    slug: "banheiro-super-luxo-interno-lavatorio-01",
    width: 1600,
    height: 900,
    widths: [480, 800, 1600],
    alt: "Interior do banheiro Super Luxo com lavatório e acessórios",
  }),
  superLuxoPumps: responsivePhoto({
    slug: "banheiro-super-luxo-piso-bombas-01",
    width: 1600,
    height: 900,
    widths: [480, 800, 1600],
    alt: "Piso e acionadores internos do banheiro Super Luxo",
  }),
  superLuxoUrinal: responsivePhoto({
    slug: "banheiro-super-luxo-mictorio-01",
    width: 1600,
    height: 900,
    widths: [480, 800, 1600],
    alt: "Mictório e vaso sanitário do banheiro Super Luxo",
  }),
  superLuxoToilet: responsivePhoto({
    slug: "banheiro-super-luxo-vaso-descarga-01",
    width: 1600,
    height: 900,
    widths: [480, 800, 1600],
    alt: "Vaso sanitário com descarga do banheiro Super Luxo",
  }),
  tent3x3: responsivePhoto({ slug: "tenda-3x3-mathias-eventos", width: 1254, height: 1254, widths: [480, 800, 1254], alt: "Tenda 3 por 3 da Mathias Eventos" }),
  tent4x4: responsivePhoto({ slug: "tenda-4x4-mathias-eventos", width: 1254, height: 1254, widths: [480, 800, 1254], alt: "Tenda 4 por 4 da Mathias Eventos" }),
  tent5x5: responsivePhoto({ slug: "tenda-5x5-mathias-eventos", width: 1254, height: 1254, widths: [480, 800, 1254], alt: "Tenda 5 por 5 da Mathias Eventos" }),
  tent6x6: responsivePhoto({ slug: "tenda-6x6-mathias-eventos", width: 1254, height: 1254, widths: [480, 800, 1254], alt: "Tenda 6 por 6 da Mathias Eventos" }),
  tent7x7: responsivePhoto({ slug: "tenda-7x7-mathias-eventos", width: 1254, height: 1254, widths: [480, 800, 1254], alt: "Tenda 7 por 7 da Mathias Eventos" }),
  tent8x8: responsivePhoto({ slug: "tenda-8x8-mathias-eventos", width: 1254, height: 1254, widths: [480, 800, 1254], alt: "Tenda 8 por 8 da Mathias Eventos" }),
  tent10x10: responsivePhoto({ slug: "tenda-10x10-mathias-eventos", width: 1254, height: 1254, widths: [480, 800, 1254], alt: "Tenda 10 por 10 da Mathias Eventos" }),
  tentCustom: responsivePhoto({ slug: "tenda-personalizada-mathias-eventos", width: 1254, height: 1254, widths: [480, 800, 1254], alt: "Tenda personalizada para ação de marca" }),
  tentWhiteClosure: responsivePhoto({ slug: "tenda-fechamento-branco-mathias-eventos", width: 1672, height: 941, widths: [480, 800, 1672], alt: "Tenda com fechamento lateral em lona branca" }),
  tentCrystalClosure: responsivePhoto({ slug: "tenda-fechamento-cristal-mathias-eventos", width: 1601, height: 982, widths: [480, 800, 1601], alt: "Tenda com fechamento lateral cristal" }),
  tentLShape: responsivePhoto({ slug: "tenda-formato-l-mathias-eventos", width: 1609, height: 977, widths: [480, 800, 1609], alt: "Montagem de tendas em formato de L" }),
  tentSequence6x18: responsivePhoto({ slug: "tenda-sequencia-6x18-mathias-eventos", width: 1672, height: 941, widths: [480, 800, 1672], alt: "Montagem de tendas em sequência 6 por 18" }),
  clientSabo: responsivePhoto({
    slug: "cliente-sabo-trabalho-01",
    width: 1600,
    height: 900,
    widths: [480, 800, 1600],
    alt: "Registro de serviço realizado pela Mathias Eventos para a Sabó",
  }),
  clientYpe: responsivePhoto({
    slug: "cliente-ype-trabalho-01",
    width: 1448,
    height: 1086,
    widths: [480, 800, 1448],
    alt: "Registro de serviço realizado pela Mathias Eventos para a Ypê",
  }),
} as const;

export const clientCompanies = [
  // Versões com fundo transparente geradas a partir dos arquivos originais da mesma pasta.
  { name: "Sabó", logo: "/brand/clients/transparente/logo-cliente-sabo.png" },
  { name: "Ypê", logo: "/brand/clients/transparente/logo-cliente-ype.png" },
  { name: "Grimaldi", logo: "/brand/clients/transparente/logo-cliente-grimaldi.png" },
  { name: "JBS", logo: "/brand/clients/transparente/logo-cliente-jbs.png" },
  { name: "MSP", logo: "/brand/clients/transparente/logo-cliente-msp.png" },
] as const;


export type Service = {
  id: string;
  title: string;
  /** Nome usado no formulário de orçamento e na mensagem do WhatsApp. */
  quoteService: string;
  shortDescription: string;
  description: string;
  highlights: string[];
  href: string;
  icon: IconName;
  tone: MediaTone;
  image?: SiteImage;
  photoSlot?: string;
  primary: boolean;
};

export const services: Service[] = [
  {
    id: "tendas",
    title: "Tendas",
    quoteService: "Tenda",
    shortDescription: "Tendas piramidais de 3×3 a 10×10, conjugadas, em L e com calhas.",
    description: "Cobertura para festas, eventos corporativos, feiras, obras e ações públicas, com fechamentos laterais branco ou cristal.",
    highlights: ["3×3 a 10×10", "Conjugadas e em L", "Fechamento branco e cristal", "Sistema de calhas"],
    href: "/tendas",
    icon: "tent",
    tone: "sand",
    image: photos.tents,
    photoSlot: "TENDA-01",
    primary: true,
  },
  {
    id: "banheiros-quimicos",
    title: "Banheiros químicos",
    quoteService: "Banheiro químico",
    shortDescription: "Modelos STD, PCD/PNE e Super Luxo para eventos, obras e empresas.",
    description: "Três modelos com funções diferentes, entregues higienizados e dimensionados conforme público e duração.",
    highlights: ["STD", "PCD/PNE acessível", "Super Luxo com lavatório", "Entregues higienizados"],
    href: "/banheiros-quimicos",
    icon: "toilet",
    tone: "blue",
    image: photos.bathrooms,
    photoSlot: "BQ-01",
    primary: true,
  },
  {
    id: "backdrop",
    title: "Backdrop e treliça",
    quoteService: "Backdrop",
    shortDescription: "Estrutura em treliça com apoio na arte e na impressão.",
    description: "Painel para fotos, marcas e patrocinadores, montado em treliça conforme a medida do seu espaço.",
    highlights: ["Estrutura em treliça", "Apoio com a arte", "Impressão organizada"],
    href: "/backdrop",
    icon: "backdrop",
    tone: "slate",
    image: photos.backdrop,
    photoSlot: "BACK-01",
    primary: true,
  },
  {
    id: "touro-mecanico",
    title: "Touro mecânico",
    quoteService: "Touro mecânico",
    shortDescription: "Atração que movimenta festas, confraternizações e eventos de empresa.",
    description: "Uma atração marcante, com espaço, energia e regras de uso alinhados antes do evento.",
    highlights: ["Festas e confraternizações", "Requisitos alinhados antes"],
    href: "/touro-mecanico",
    icon: "party",
    tone: "violet",
    primary: true,
  },
  {
    id: "mesas-e-cadeiras",
    title: "Mesas e cadeiras",
    quoteService: "Mesas e cadeiras",
    shortDescription: "Mobiliário para organizar convidados sob a tenda ou ao ar livre.",
    description: "Complete a estrutura e planeje a disposição junto com as tendas.",
    highlights: ["Combina com as tendas", "Quantidade sob consulta"],
    href: "/mesas-e-cadeiras",
    icon: "armchair",
    tone: "amber",
    image: photos.tables,
    primary: false,
  },
];

/** Serviços complementares citados pela empresa, sem página própria. */
export const extraServices: Array<{ title: string; description: string; icon: IconName; href?: string; quoteService: string }> = [
  { title: "Fechamentos laterais", description: "Lona branca para privacidade ou cristal para manter a visibilidade.", icon: "panel", href: "/tendas#fechamentos", quoteService: "Tenda" },
  { title: "Calhas para tendas", description: "Captação da água na união entre tendas conjugadas.", icon: "droplets", href: "/tendas#sistema-de-calhas", quoteService: "Tenda" },
  { title: "Palcos", description: "Estrutura de palco para apresentações, cerimônias e eventos.", icon: "stage", quoteService: "Palco" },
  { title: "Som e iluminação", description: "Sonorização e iluminação para complementar o evento.", icon: "speaker", quoteService: "Som e iluminação" },
  { title: "Brinquedos", description: "Atrações para o público infantil e familiar.", icon: "ferris", quoteService: "Brinquedos" },
  { title: "Frete, montagem e desmontagem", description: "Levamos, montamos e retiramos a estrutura contratada.", icon: "truck", quoteService: "Frete e montagem" },
];

/** Opções do formulário de orçamento. Os seis primeiros vêm dos links das páginas. */
export const quoteServiceOptions = [
  "Tenda",
  "Banheiro químico",
  "Backdrop",
  "Touro mecânico",
  "Mesas e cadeiras",
  "Palco",
  "Som e iluminação",
  "Brinquedos",
  "Frete e montagem",
  "Mais de um serviço",
] as const;

export const differentials: Array<{ title: string; description: string; icon: IconName }> = [
  { title: "Atendimento regional", description: "Base em Santo Antônio de Posse e atendimento rápido em Campinas, Holambra, Jaguariúna e região.", icon: "map-pin" },
  { title: "Montagem profissional", description: "Da entrega à desmontagem, a estrutura fica por conta da nossa equipe.", icon: "wrench" },
  { title: "Segurança na estrutura", description: "Montagem planejada conforme o espaço, o terreno e a circulação do local.", icon: "shield-check" },
  { title: "Estrutura revisada", description: "Equipamentos conferidos e preparados antes de cada locação.", icon: "badge" },
  { title: "Pontualidade", description: "Horários de entrega e montagem combinados com antecedência, para a estrutura estar pronta antes do evento.", icon: "clock" },
];

export const useCases: Array<{ title: string; description: string; icon: IconName; interest: string }> = [
  { title: "Festas", description: "Aniversários, formaturas e confraternizações com cobertura, mesas e banheiros.", icon: "party", interest: "Estrutura para festa" },
  { title: "Casamentos", description: "Tendas com fechamento cristal ou branco, backdrop e banheiro Super Luxo.", icon: "heart", interest: "Estrutura para casamento" },
  { title: "Empresas", description: "Eventos internos, SIPAT, feiras, áreas de apoio e operações temporárias.", icon: "building", interest: "Estrutura para evento de empresa" },
  { title: "Obras", description: "Banheiros químicos e cobertura para equipes em campo.", icon: "hardhat", interest: "Estrutura para obra" },
  { title: "Eventos públicos", description: "Festas da cidade, campanhas e ações abertas ao público.", icon: "landmark", interest: "Estrutura para evento público" },
];

export type BathroomModel = {
  slug: "std" | "pcd" | "super-luxo";
  shortName: string;
  name: string;
  indication: string;
  bestFor: string;
  description: string;
  features: string[];
  notIncluded?: string[];
  included: string[];
  image?: SiteImage;
  gallery?: Array<{ image: SiteImage; label: string; icon: IconName; slotCode: string }>;
  photoSlot?: string;
  tone: MediaTone;
  seoTitle: string;
  seoDescription: string;
};

export const bathroomModels: BathroomModel[] = [
  {
    slug: "std",
    shortName: "STD",
    name: "Banheiro químico STD",
    indication: "O modelo mais contratado",
    bestFor: "Uso geral em eventos, obras e empresas",
    description: "Modelo padrão para necessidades sanitárias em eventos, obras e empresas. Prático, resistente e de fácil posicionamento.",
    features: ["Modelo químico padrão", "Entregue higienizado", "Indicado para grande volume de uso"],
    notIncluded: ["Sem lavatório interno", "Sem sistema de descarga"],
    included: ["Papel higiênico", "Equipamento higienizado na entrega"],
    image: photos.std,
    tone: "blue",
    seoTitle: "Banheiro químico STD para eventos e obras",
    seoDescription: "Aluguel de banheiro químico STD para eventos, obras e empresas em Santo Antônio de Posse, Campinas, Holambra, Jaguariúna e região. Entregue higienizado.",
  },
  {
    slug: "pcd",
    shortName: "PCD/PNE",
    name: "Banheiro químico acessível PCD/PNE",
    indication: "Acessibilidade",
    bestFor: "Pessoas com deficiência ou mobilidade reduzida",
    description: "Estrutura com dimensões maiores, preparada para facilitar o uso por pessoas com deficiência ou mobilidade reduzida.",
    features: ["Espaço interno ampliado", "Uso sanitário semelhante ao STD", "Entregue higienizado"],
    notIncluded: ["Sem lavatório interno"],
    included: ["Estrutura acessível", "Equipamento higienizado na entrega"],
    image: photos.pcd,
    tone: "green",
    seoTitle: "Banheiro químico PCD/PNE acessível",
    seoDescription: "Aluguel de banheiro químico acessível PCD/PNE, com espaço interno ampliado, para eventos e obras em Santo Antônio de Posse, Campinas e região.",
  },
  {
    slug: "super-luxo",
    shortName: "Super Luxo",
    name: "Banheiro Super Luxo",
    indication: "Mais conforto",
    bestFor: "Eventos que pedem lavatório e descarga",
    description: "Modelo com lavatório, acessórios de apoio e sistema de descarga para uma experiência interna mais completa.",
    features: ["Lavatório interno", "Sabonete líquido", "Suporte para papel", "Compartimento porta-trecos", "Sistema de descarga", "Mictório para uso em pé"],
    included: ["Papel higiênico", "Sabonete líquido", "Equipamento higienizado e preparado para uso"],
    image: photos.superLuxo,
    gallery: [
      { image: photos.superLuxoInterior, label: "Interior e lavatório", icon: "toilet", slotCode: "BQ-07" },
      { image: photos.superLuxoPumps, label: "Piso e acionadores", icon: "sparkles", slotCode: "BQ-09" },
      { image: photos.superLuxoUrinal, label: "Mictório", icon: "toilet", slotCode: "BQ-11" },
      { image: photos.superLuxoToilet, label: "Vaso com descarga", icon: "toilet", slotCode: "BQ-09" },
    ],
    tone: "violet",
    seoTitle: "Banheiro Super Luxo com lavatório e descarga",
    seoDescription: "Aluguel de banheiro químico Super Luxo com lavatório, sabonete líquido, descarga e mictório para eventos em Santo Antônio de Posse, Campinas e região.",
  },
];

export const tentSizes = [
  { size: "3×3", width: 3, length: 3, area: 9, image: photos.tent3x3, note: "Ideal para espaços compactos, recepção e apoio." },
  { size: "4×4", width: 4, length: 4, area: 16, image: photos.tent4x4, note: "Cobertura versátil para áreas menores." },
  { size: "5×5", width: 5, length: 5, area: 25, image: photos.tent5x5, note: "Equilíbrio entre cobertura e circulação." },
  { size: "6×6", width: 6, length: 6, area: 36, image: photos.tent6x6, note: "Mais área útil para diferentes usos." },
  { size: "7×7", width: 7, length: 7, area: 49, image: photos.tent7x7, note: "Estrutura ampla para eventos e empresas." },
  { size: "8×8", width: 8, length: 8, area: 64, image: photos.tent8x8, note: "Boa cobertura para composições maiores." },
  { size: "10×10", width: 10, length: 10, area: 100, image: photos.tent10x10, note: "Excelente para grandes áreas cobertas." },
] as const;

export const homeFaqs = [
  {
    question: "Como escolho a estrutura certa para o meu evento?",
    answer: "Conte o tipo de evento, a cidade, a data e a quantidade estimada de pessoas. Com isso, indicamos o tamanho de tenda, o modelo de banheiro e os itens que fazem sentido para o seu espaço.",
  },
  {
    question: "Posso pedir mais de um serviço no mesmo orçamento?",
    answer: "Sim. Tendas, fechamentos, banheiros, mesas, cadeiras, backdrop e outros itens podem ser orçados juntos — o que também facilita a logística de entrega e montagem.",
  },
  {
    question: "A montagem e a desmontagem estão incluídas?",
    answer: "A Mathias Eventos cuida do frete, da montagem e da desmontagem das estruturas contratadas. As condições de cada serviço são detalhadas no orçamento.",
  },
  {
    question: "Quais cidades vocês atendem?",
    answer: "A base fica em Santo Antônio de Posse e atendemos Campinas, Holambra, Jaguariúna, Pedreira, Amparo, Cosmópolis, Artur Nogueira, Mogi Mirim, Mogi Guaçu e outras cidades próximas, conforme data e estrutura.",
  },
  {
    question: "Como peço o orçamento?",
    answer: "Pelo WhatsApp ou pelo formulário do site. O formulário organiza as informações e abre uma mensagem pronta no WhatsApp, sem cadastro.",
  },
] as const;

export const bathroomFaqs = [
  {
    question: "Qual a diferença entre STD, PCD/PNE e Super Luxo?",
    answer: "O STD é o modelo químico padrão, sem lavatório interno. O PCD/PNE tem espaço interno ampliado para acessibilidade, com uso sanitário semelhante ao STD. O Super Luxo inclui lavatório, sabonete líquido, sistema de descarga e mictório para uso em pé.",
  },
  {
    question: "O banheiro PCD/PNE possui lavatório interno?",
    answer: "Não. O modelo acessível possui dimensões maiores para facilitar o uso, mas seu funcionamento sanitário é semelhante ao STD.",
  },
  {
    question: "Os banheiros são entregues higienizados?",
    answer: "Sim. Os equipamentos são preparados e higienizados para a entrega.",
  },
  {
    question: "Como saber a quantidade necessária?",
    answer: "A quantidade depende do público, da duração e das características do evento ou da obra. Envie essas informações e a equipe indica a quantidade e a combinação de modelos.",
  },
  {
    question: "Vocês atendem obras e empresas?",
    answer: "Sim. Os modelos atendem eventos, obras e empresas. Período de locação, entrega e retirada são combinados no orçamento.",
  },
] as const;

export const tentFaqs = [
  {
    question: "Qual tamanho de tenda preciso?",
    answer: "A escolha depende do número de pessoas, do mobiliário, da circulação e do espaço disponível. As configurações desta página ajudam a comparar os tamanhos e nossa equipe também orienta a escolha.",
  },
  {
    question: "Posso juntar duas ou mais tendas?",
    answer: "Sim. As tendas podem ser conjugadas lado a lado, em sequência ou em formato de L para ampliar a área coberta.",
  },
  {
    question: "As tendas possuem calhas?",
    answer: "Sim. Em montagens conjugadas, as calhas ajudam a captar e direcionar a água na união entre as coberturas.",
  },
  {
    question: "Para que serve a calha?",
    answer: "Ela reduz a queda de água entre as tendas e direciona o fluxo para uma descida junto à estrutura.",
  },
  {
    question: "Quais fechamentos laterais estão disponíveis?",
    answer: "Fechamento em lona branca, para mais privacidade e proteção, e fechamento cristal, que protege sem perder a visibilidade externa.",
  },
  {
    question: "Vocês fazem visita técnica?",
    answer: "Quando necessário, a equipe pode avaliar o local para ajudar na definição do tamanho, da configuração e das condições de montagem.",
  },
  {
    question: "Quanto espaço preciso deixar para montagem?",
    answer: "Recomendamos aproximadamente 1 metro livre em cada lado da estrutura para facilitar a montagem.",
  },
  {
    question: "Quantas pessoas cabem em uma tenda?",
    answer: "A capacidade depende da configuração utilizada. Cadeiras, mesas, circulação e características do local alteram a ocupação — veja as configurações ilustradas nesta página.",
  },
] as const;

export const knowledgeItems = [
  { title: "Qual banheiro químico escolher?", description: "Compare STD, PCD/PNE e Super Luxo e veja quando usar cada um.", href: "/banheiros-quimicos#comparativo", tag: "Banheiros" },
  { title: "Qual tamanho de tenda escolher?", description: "Medidas, áreas e o que cabe em cada tenda de 3×3 a 10×10.", href: "/tendas#tamanhos", tag: "Tendas" },
  { title: "É possível unir tendas?", description: "Montagens lado a lado, em sequência 6×18 e em formato de L.", href: "/tendas#combinacoes", tag: "Tendas" },
  { title: "Como funciona um backdrop?", description: "Da estrutura em treliça à arte e à impressão.", href: "/backdrop#processo", tag: "Backdrop" },
] as const;
