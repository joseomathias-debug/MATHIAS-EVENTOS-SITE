import type { Metadata } from "next";
import { ClipboardCheck, Ruler, Route, Armchair, Mountain, Truck } from "lucide-react";
import { FaqList } from "../components/FaqList";
import { PageNav } from "../components/PageNav";
import { QuoteCta } from "../components/QuoteCta";
import { SectionHeading } from "../components/SectionHeading";
import { ServiceHero } from "../components/ServiceHero";
import { ServiceMedia } from "../components/ServiceMedia";
import { TentApplications, TentCapacities, TentCatalog, TentClosures, TentSpecialConfigurations } from "../components/TentCatalog";
import { TentGutters } from "../components/TentGutters";
import { photos, tentFaqs, tentSizes } from "../content";
import { pageMetadata } from "../lib/seo";
import { ServiceSchema } from "../components/ServiceSchema";

export const metadata: Metadata = pageMetadata(
  "Aluguel de tendas para eventos — 3×3 a 10×10",
  "Aluguel de tendas piramidais de 3×3 a 10×10, conjugadas, em L, com calhas e fechamento branco ou cristal. Montagem em Santo Antônio de Posse, Campinas e região.",
  "/tendas",
  "/images/services/tenda-montagem-geral-01/tenda-montagem-geral-01-1537.jpg",
);

const planningFactors = [
  { icon: Ruler, label: "Espaço disponível" },
  { icon: Route, label: "Acessos e circulação" },
  { icon: Armchair, label: "Mobiliário e palco" },
  { icon: Mountain, label: "Tipo de terreno" },
  { icon: Truck, label: "Entrada do caminhão" },
  { icon: ClipboardCheck, label: "Configuração das tendas" },
];

export default function TentsPage() {
  return (
    <main className="tentsPage">
      <ServiceSchema name="Aluguel de tendas para eventos" description="Locação e montagem de tendas piramidais de 3×3 a 10×10, conjugadas, em L, com calhas e fechamentos laterais." path="/tendas" />
      <ServiceHero
        eyebrow="Tendas para eventos"
        title="Tendas para eventos, montadas do jeito certo."
        description="Tendas piramidais de 3×3 a 10×10, conjugadas lado a lado, em sequência ou em L — com calhas e fechamentos laterais. A montagem e a desmontagem ficam com a nossa equipe."
        service="Tenda"
        image={photos.tents}
        icon="tent"
        tone="sand"
        slotCode="TENDA-01"
        breadcrumbs={[{ label: "Tendas" }]}
        highlights={["Conjugadas e em L", "Sistema de calhas", "Fechamento branco ou cristal", "Montagem pela nossa equipe"]}
        detailsLabel="Ver tamanhos disponíveis"
        quickLinksLabel="Tamanhos disponíveis"
        quickLinks={tentSizes.map((tent) => ({ label: tent.size, detail: `${tent.area} m²`, href: `#tenda-${tent.width}x${tent.length}` }))}
      />

      <PageNav items={[
        { href: "#tamanhos", label: "Tamanhos" },
        { href: "#aplicacoes", label: "Aplicações" },
        { href: "#combinacoes", label: "Conjugadas" },
        { href: "#fechamentos", label: "Fechamentos" },
        { href: "#capacidades-ilustradas", label: "O que cabe" },
        { href: "#sistema-de-calhas", label: "Calhas" },
        { href: "#planejamento", label: "Planejamento" },
        { href: "#duvidas", label: "Dúvidas" },
      ]} />

      <TentCatalog />
      <TentApplications />
      <TentSpecialConfigurations />
      <TentClosures />
      <TentCapacities />
      <TentGutters />

      <section className="section tentPlanningSection" id="planejamento" aria-labelledby="planning-title">
        <div className="shell tentPlanningGrid">
          <div className="tentPlanningIntro">
            <p className="eyebrow">Visita técnica e planejamento</p>
            <h2 id="planning-title">Planejamento claro, antes da montagem.</h2>
            <p>Quando o projeto pede, nossa equipe avalia o local para definir o tamanho, a configuração e as condições de montagem.</p>
            <ul className="planningFactors" aria-label="Pontos avaliados no planejamento">
              {planningFactors.map(({ icon: Icon, label }) => <li key={label}><Icon aria-hidden="true" /> {label}</li>)}
            </ul>
            <p className="tentPlanningNotice"><strong>Espaço para montagem:</strong> recomendamos aproximadamente 1 metro livre em cada lado da estrutura.</p>
          </div>
          <ol className="tentPlanningSteps">
            <li><span className="stepNumber">01</span><div><h3>Você explica a necessidade</h3><p>Como o espaço será usado, o público, a cidade e a data.</p></div></li>
            <li><span className="stepNumber">02</span><div><h3>Avaliamos espaço e configuração</h3><p>Quando necessário, verificamos as condições do local.</p></div></li>
            <li><span className="stepNumber">03</span><div><h3>Definimos a solução e a montagem</h3><p>Tamanho, composição, fechamentos, calhas e acesso alinhados.</p></div></li>
          </ol>
        </div>
      </section>

      <section className="section gallerySection" aria-labelledby="tent-gallery-title">
        <div className="shell">
          <SectionHeading id="tent-gallery-title" eyebrow="Fotos reais" title="Tendas montadas pela Mathias Eventos." />
          <div className="photoMosaic">
            <ServiceMedia image={photos.homeHero} label="Equipe montando tendas" tone="sand" icon="tent" className="mosaicWide" sizes="(max-width: 760px) 92vw, 50vw" aspectRatio="16 / 9" />
            <ServiceMedia image={photos.tentPair} label="Tendas lado a lado" tone="sand" icon="tent" sizes="(max-width: 760px) 46vw, 25vw" aspectRatio="4 / 3" />
            <ServiceMedia image={photos.tentSequence6x18} label="Tendas em sequência" tone="sand" icon="tent" sizes="(max-width: 760px) 46vw, 25vw" aspectRatio="4 / 3" />
            <ServiceMedia image={photos.clientSabo} label="Tenda em atendimento para a Sabó" tone="sand" icon="tent" sizes="(max-width: 760px) 46vw, 25vw" aspectRatio="4 / 3" />
            <ServiceMedia image={photos.clientYpe} label="Tenda em atendimento para a Ypê" tone="sand" icon="tent" sizes="(max-width: 760px) 46vw, 25vw" aspectRatio="4 / 3" />
          </div>
        </div>
      </section>

      <section className="section faqSection tentsFaqSection" id="duvidas" aria-labelledby="tent-faq-title">
        <div className="shell faqGrid">
          <div className="faqIntro"><p className="eyebrow">Dúvidas sobre tendas</p><h2 id="tent-faq-title">Planeje com mais segurança.</h2><p>Respostas diretas para escolher, combinar e preparar a montagem.</p></div>
          <FaqList items={tentFaqs} schema />
        </div>
      </section>

      <QuoteCta service="Tenda" image={photos.tentPair} title="Qual tenda o seu evento precisa?" description="Informe a data, a cidade, o público e o espaço disponível. A equipe indica tamanho, formato, fechamento e calhas." />
    </main>
  );
}
