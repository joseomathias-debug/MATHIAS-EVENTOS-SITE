import { photos, type IconName, type MediaTone, type SiteImage } from "../content";

// Categorias sem registros ficam ocultas no filtro automaticamente.
export const projectCategories = ["Tendas", "Fechamentos", "Banheiros", "Backdrop", "Montagens", "Atendimentos"] as const;
export type ProjectCategory = (typeof projectCategories)[number];

export type Project = {
  id: string;
  title: string;
  category: ProjectCategory;
  categories?: ProjectCategory[];
  location?: string;
  eventType?: string;
  description: string;
  image: SiteImage;
  icon: IconName;
  tone: MediaTone;
  equipment?: string;
  client?: string;
  tags: string[];
  featured?: boolean;
};

export const projects: Project[] = [
  {
    id: "montagem-sequencia-evento",
    title: "Tendas conjugadas para área de convivência",
    category: "Tendas",
    categories: ["Tendas", "Montagens"],
    description: "Tendas brancas em sequência cobrindo mesas e área de convivência.",
    image: photos.tentSequence6x18,
    icon: "tent",
    tone: "sand",
    equipment: "Tendas conjugadas",
    tags: ["conjugada", "evento"],
    featured: true,
  },
  {
    id: "tendas-modulares",
    title: "Tendas conjugadas com banheiros químicos",
    category: "Tendas",
    description: "Sequência de tendas brancas montada em área gramada, com banheiros químicos posicionados ao lado da estrutura.",
    image: photos.tents,
    icon: "tent",
    tone: "sand",
    equipment: "Tendas + banheiros químicos",
    tags: ["montagem", "cobertura", "estrutura"],
  },
  {
    id: "montagem-equipe",
    title: "Equipe em montagem de tendas",
    category: "Montagens",
    categories: ["Montagens", "Tendas"],
    description: "Montagem feita pela equipe da Mathias Eventos, com o caminhão de apoio no local.",
    image: photos.homeHero,
    icon: "wrench",
    tone: "sand",
    equipment: "Tendas piramidais",
    tags: ["montagem", "equipe"],
  },
  {
    id: "tenda-formato-l",
    title: "Tendas em formato de L",
    category: "Tendas",
    categories: ["Tendas", "Montagens"],
    description: "Composição em L para aproveitar melhor o espaço disponível.",
    image: photos.tentLShape,
    icon: "tent",
    tone: "sand",
    equipment: "Montagem em L",
    tags: ["conjugada", "formato especial"],
  },
  {
    id: "tendas-lado-a-lado",
    title: "Duas tendas lado a lado",
    category: "Tendas",
    description: "Tendas iguais unidas pela lateral para ampliar a área coberta.",
    image: photos.tentPair,
    icon: "tent",
    tone: "sand",
    equipment: "Tendas conjugadas",
    tags: ["conjugada"],
  },
  {
    id: "fechamento-cristal",
    title: "Fechamento lateral cristal",
    category: "Fechamentos",
    categories: ["Fechamentos", "Tendas"],
    description: "Proteção lateral transparente, que mantém a visibilidade externa.",
    image: photos.tentCrystalClosure,
    icon: "panel",
    tone: "sand",
    equipment: "Fechamento cristal",
    tags: ["fechamento", "cristal"],
  },
  {
    id: "fechamento-branco",
    title: "Fechamento lateral em lona branca",
    category: "Fechamentos",
    categories: ["Fechamentos", "Tendas"],
    description: "Lona branca nas laterais para mais privacidade e proteção.",
    image: photos.tentWhiteClosure,
    icon: "panel",
    tone: "sand",
    equipment: "Fechamento branco",
    tags: ["fechamento", "lona"],
  },
  {
    id: "banheiros-familia",
    title: "Banheiros STD, PCD/PNE e Super Luxo",
    category: "Banheiros",
    description: "Os três modelos de banheiro químico disponíveis para eventos, obras e empresas.",
    image: photos.bathrooms,
    icon: "toilet",
    tone: "blue",
    equipment: "STD, PCD/PNE e Super Luxo",
    tags: ["eventos", "obras", "empresas"],
  },
  {
    id: "super-luxo-interior",
    title: "Interior do banheiro Super Luxo",
    category: "Banheiros",
    description: "Lavatório, sabonete líquido e acessórios de apoio dentro do próprio banheiro.",
    image: photos.superLuxoInterior,
    icon: "toilet",
    tone: "violet",
    equipment: "Super Luxo",
    tags: ["super luxo", "lavatório"],
  },
  {
    id: "backdrop-evento",
    title: "Backdrop em treliça para evento",
    category: "Backdrop",
    description: "Estrutura de backdrop instalada para compor a ambientação e os registros do evento.",
    image: photos.backdrop,
    icon: "backdrop",
    tone: "slate",
    equipment: "Backdrop em treliça",
    tags: ["ambientação", "eventos", "estrutura"],
  },
  {
    id: "atendimento-sabo",
    title: "Serviço realizado para a Sabó",
    category: "Atendimentos",
    description: "Registro real de um atendimento realizado pela equipe da Mathias Eventos.",
    image: photos.clientSabo,
    icon: "shield-check",
    tone: "sand",
    client: "Sabó",
    tags: ["cliente", "atendimento"],
  },
  {
    id: "atendimento-ype",
    title: "Serviço realizado para a Ypê",
    category: "Atendimentos",
    description: "Registro real de um atendimento realizado pela equipe da Mathias Eventos.",
    image: photos.clientYpe,
    icon: "shield-check",
    tone: "sand",
    client: "Ypê",
    tags: ["cliente", "atendimento"],
  },
];
