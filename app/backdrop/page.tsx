import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarDays, CheckCircle2, ImageIcon, Ruler } from "lucide-react";
import { FaqList } from "../components/FaqList";
import { UseCaseGrid } from "../components/FeatureBlocks";
import { QuoteCta } from "../components/QuoteCta";
import { SectionHeading } from "../components/SectionHeading";
import { ServiceHero } from "../components/ServiceHero";
import { ServiceMedia } from "../components/ServiceMedia";
import { ServiceSchema } from "../components/ServiceSchema";
import { photos, type IconName } from "../content";
import { pageMetadata } from "../lib/seo";
import { quoteHref } from "../lib/quote";

export const metadata: Metadata = pageMetadata(
  "Backdrop e estrutura em treliça para eventos",
  "Locação de backdrop com estrutura em treliça, apoio na arte, impressão e montagem para eventos em Santo Antônio de Posse, Campinas, Holambra e região.",
  "/backdrop",
  "/images/services/backdrop-hero-01/backdrop-hero-01-1600.jpg",
);

const faqs = [
  { question: "Posso contratar somente a estrutura?", answer: "Sim. O orçamento pode considerar apenas a estrutura em treliça ou incluir apoio com arte e impressão, conforme a necessidade." },
  { question: "A Mathias Eventos pode preparar a arte?", answer: "A criação ou adequação da arte pode ser incluída no orçamento após o alinhamento das informações e da identidade do evento." },
  { question: "A impressão está incluída?", answer: "A impressão pode ser organizada dentro do projeto. O valor depende de tamanho, arte, material e demais características da contratação." },
  { question: "Quais são as dimensões e o modelo da treliça?", answer: "A equipe avalia o projeto e informa no orçamento as dimensões e a estrutura aplicáveis ao local." },
];

const uses: Array<{ title: string; description: string; icon: IconName; interest: string }> = [
  { title: "Eventos corporativos", description: "Painel de marcas, patrocinadores e lançamentos.", icon: "building", interest: "Backdrop para evento corporativo" },
  { title: "Festas e casamentos", description: "Espaço de fotos com a identidade do evento.", icon: "heart", interest: "Backdrop para festa" },
  { title: "Feiras e inaugurações", description: "Fundo de palco, estande e área de imprensa.", icon: "landmark", interest: "Backdrop para feira ou inauguração" },
];

const steps = [
  ["Estrutura", "Definição da treliça e da medida para o espaço."],
  ["Informações", "Envio de identidade visual, textos e referências."],
  ["Arte", "Criação ou adequação, conforme a contratação."],
  ["Impressão", "Organização da impressão dentro do orçamento."],
  ["Montagem", "Instalação no local, pronta para o evento."],
] as const;

export default function BackdropPage() {
  return (
    <main>
      <ServiceSchema name="Backdrop e estrutura em treliça" description="Locação de backdrop com estrutura em treliça, apoio na arte e na impressão para eventos." path="/backdrop" />
      <ServiceHero
        eyebrow="Backdrop e treliça"
        title="Backdrop em treliça para a sua marca aparecer."
        description="Estrutura em treliça, apoio com a arte e organização da impressão em um só pedido — montado no local, pronto para as fotos."
        service="Backdrop"
        image={photos.backdrop}
        icon="backdrop"
        tone="slate"
        slotCode="BACK-01"
        breadcrumbs={[{ label: "Backdrop" }]}
        highlights={["Estrutura em treliça", "Apoio com a arte", "Impressão organizada", "Montagem no local"]}
        detailsLabel="Ver como funciona"
      />

      <section className="section backdropProcess" id="detalhes" aria-labelledby="backdrop-process-title">
        <div className="shell">
          <SectionHeading id="backdrop-process-title" eyebrow="Processo completo" title="Cinco etapas até o backdrop pronto." description="Você escolhe quais etapas incluir: só a estrutura ou o projeto completo." />
          <ol className="processTimeline" id="processo">
            {steps.map(([title, text], index) => (
              <li key={title}><span className="stepNumber">{String(index + 1).padStart(2, "0")}</span><div><h3>{title}</h3><p>{text}</p></div></li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section projectScope sectionDark" aria-labelledby="scope-title">
        <div className="shell splitGrid">
          <ServiceMedia image={photos.backdrop} label="Backdrop finalizado em evento" tone="slate" icon="backdrop" className="roundedMedia" slotCode="BACK-01" sizes="(max-width: 900px) 92vw, 50vw" aspectRatio="16 / 10" />
          <div>
            <p className="eyebrow">Orçamento sob medida</p>
            <h2 id="scope-title">O valor acompanha o projeto.</h2>
            <p>Não existe preço fixo sem conhecer o backdrop. O orçamento considera:</p>
            <ul className="checkList checkListLight">
              {["Projeto e tamanho", "Criação ou adequação da arte", "Impressão", "Estrutura em treliça", "Data e local do evento"].map((item) => <li key={item}><CheckCircle2 aria-hidden="true" /> {item}</li>)}
            </ul>
            <Link className="button buttonPrimary" href={quoteHref("Backdrop")}>Contar sobre o projeto <ArrowRight aria-hidden="true" /></Link>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="backdrop-start-title">
        <div className="shell">
          <SectionHeading id="backdrop-start-title" eyebrow="Para começar" title="Três informações agilizam o orçamento." description="Mesmo sem tudo definido, estes dados ajudam a equipe a orientar o próximo passo." />
          <ul className="infoCards">
            <li><CalendarDays aria-hidden="true" /><h3>Data e local</h3><p>Quando será o evento, a cidade e as características do espaço.</p></li>
            <li><Ruler aria-hidden="true" /><h3>Medida aproximada</h3><p>Largura e altura desejadas ou uma referência do espaço disponível.</p></li>
            <li><ImageIcon aria-hidden="true" /><h3>Identidade visual</h3><p>Logotipos, textos e referências, se já estiverem disponíveis.</p></li>
          </ul>
        </div>
      </section>

      <section className="section useCaseSection" aria-labelledby="backdrop-uses-title">
        <div className="shell">
          <SectionHeading id="backdrop-uses-title" eyebrow="Aplicações" title="Onde o backdrop faz diferença." />
          <UseCaseGrid items={uses} />
        </div>
      </section>

      <section className="section faqSection" aria-labelledby="backdrop-faq-title">
        <div className="shell faqGrid">
          <div className="faqIntro"><p className="eyebrow">Dúvidas sobre backdrop</p><h2 id="backdrop-faq-title">Alinhe o escopo antes de produzir.</h2><p>A equipe confirma dados técnicos e etapas após conhecer o projeto.</p></div>
          <FaqList items={faqs} schema />
        </div>
      </section>
      <QuoteCta service="Backdrop" title="Vamos montar o seu backdrop?" description="Envie data, cidade, ideia de tamanho e o que já tem de arte." />
    </main>
  );
}
