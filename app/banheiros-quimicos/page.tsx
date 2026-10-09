import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, Minus } from "lucide-react";
import { BathroomComparison } from "../components/BathroomComparison";
import { FaqList } from "../components/FaqList";
import { BenefitGrid, UseCaseGrid } from "../components/FeatureBlocks";
import { QuoteCta } from "../components/QuoteCta";
import { RentalProcess } from "../components/RentalProcess";
import { SectionHeading } from "../components/SectionHeading";
import { ServiceHero } from "../components/ServiceHero";
import { ServiceMedia } from "../components/ServiceMedia";
import { ServiceSchema } from "../components/ServiceSchema";
import { bathroomFaqs, bathroomModels, photos, type IconName } from "../content";
import { pageMetadata } from "../lib/seo";
import { quoteHref } from "../lib/quote";

export const metadata: Metadata = pageMetadata(
  "Banheiros químicos STD, PCD/PNE e Super Luxo",
  "Aluguel de banheiros químicos STD, PCD/PNE e Super Luxo para eventos, obras e empresas em Santo Antônio de Posse, Campinas, Holambra, Jaguariúna e região.",
  "/banheiros-quimicos",
  "/images/services/banheiros-familia-std-pcd-super-luxo-01/banheiros-familia-std-pcd-super-luxo-01-1448.jpg",
);

const benefits: Array<{ title: string; description: string; icon: IconName }> = [
  { title: "Entregues higienizados", description: "Os equipamentos chegam preparados e higienizados para uso.", icon: "sparkles" },
  { title: "Quantidade orientada", description: "Indicamos quantidade e modelos conforme público, duração e tipo de evento.", icon: "users" },
  { title: "Entrega e retirada", description: "Data, horário e local de entrega e retirada combinados no orçamento.", icon: "truck" },
  { title: "Acessibilidade no plano", description: "O modelo PCD/PNE entra no planejamento para atender todo o público.", icon: "accessibility" },
];

const applications: Array<{ title: string; description: string; icon: IconName; interest: string }> = [
  { title: "Eventos e festas", description: "Festas, casamentos, shows e confraternizações.", icon: "party", interest: "Banheiro químico para evento" },
  { title: "Obras", description: "Canteiros e equipes em campo, com período combinado no orçamento.", icon: "hardhat", interest: "Banheiro químico para obra" },
  { title: "Empresas", description: "Operações temporárias, eventos internos e áreas de apoio.", icon: "building", interest: "Banheiro químico para empresa" },
  { title: "Eventos públicos", description: "Festas da cidade, feiras e ações abertas ao público.", icon: "landmark", interest: "Banheiro químico para evento público" },
];

export default function BathroomsPage() {
  return (
    <main>
      <ServiceSchema name="Aluguel de banheiros químicos" description="Locação de banheiros químicos STD, PCD/PNE e Super Luxo para eventos, obras e empresas." path="/banheiros-quimicos" />
      <ServiceHero
        eyebrow="Banheiros químicos"
        title="Banheiros químicos para eventos, obras e empresas."
        description="Três modelos com funções diferentes — STD, PCD/PNE e Super Luxo —, entregues higienizados e dimensionados para o seu público."
        service="Banheiro químico"
        image={photos.bathrooms}
        icon="toilet"
        tone="blue"
        slotCode="BQ-01"
        breadcrumbs={[{ label: "Banheiros químicos" }]}
        highlights={["Entregues higienizados", "Quantidade orientada", "Entrega e retirada", "Eventos, obras e empresas"]}
        detailsLabel="Ver os três modelos"
        quickLinksLabel="Escolha o modelo"
        quickLinks={bathroomModels.map((model) => ({ label: model.shortName, detail: model.indication, href: `/banheiros-quimicos/${model.slug}`, image: model.image, tone: model.tone }))}
      />

      <section className="section modelsSection" id="detalhes" aria-labelledby="models-title">
        <div className="shell">
          <SectionHeading id="models-title" eyebrow="Modelos disponíveis" title="STD, PCD/PNE ou Super Luxo?" />
          <ul className="bathroomModelGrid">
            {bathroomModels.map((model) => (
              <li className={`bathroomModelCard bathroomModel-${model.slug}`} key={model.slug}>
                <ServiceMedia image={model.image} label={model.shortName} tone={model.tone} icon="toilet" slotCode={model.slug === "std" ? "BQ-02" : model.slug === "pcd" ? "BQ-04" : "BQ-06"} sizes="(max-width: 760px) 92vw, 31vw" aspectRatio="4 / 3" />
                <div className="bathroomModelBody">
                  <span className="modelTag">{model.indication}</span>
                  <h3>{model.name}</h3>
                  <p className="modelBestFor">{model.bestFor}</p>
                  <ul className="modelFeatures">
                    {model.features.slice(0, 4).map((feature) => <li key={feature}><Check aria-hidden="true" /> {feature}</li>)}
                    {model.notIncluded?.map((item) => <li className="isMissing" key={item}><Minus aria-hidden="true" /> {item}</li>)}
                  </ul>
                  <div className="modelCardActions">
                    <Link className="button buttonPrimary" href={quoteHref("Banheiro químico", model.shortName)}>Orçar {model.shortName}</Link>
                    <Link className="textLink textLinkStrong" href={`/banheiros-quimicos/${model.slug}`}>Ver detalhes <ArrowRight aria-hidden="true" /></Link>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section comparisonSection" id="comparativo" aria-labelledby="compare-title">
        <div className="shell">
          <SectionHeading id="compare-title" eyebrow="Comparativo" title="As diferenças, lado a lado." description="Recursos confirmados de cada modelo. Medidas e especificações são validadas pela equipe conforme o local." />
          <BathroomComparison />
        </div>
      </section>

      <section className="section benefitsSection sectionDark" aria-labelledby="bath-benefits-title">
        <div className="shell">
          <SectionHeading id="bath-benefits-title" light eyebrow="Atendimento completo" title="Do dimensionamento à retirada." />
          <BenefitGrid items={benefits} dark columns={4} />
        </div>
      </section>

      <section className="section useCaseSection" aria-labelledby="bath-uses-title">
        <div className="shell">
          <SectionHeading id="bath-uses-title" eyebrow="Aplicações" title="Onde nossos banheiros atendem." />
          <UseCaseGrid items={applications} />
        </div>
      </section>

      <section className="section gallerySection" aria-labelledby="bath-gallery-title">
        <div className="shell">
          <SectionHeading id="bath-gallery-title" eyebrow="Fotos reais" title="Equipamentos da Mathias Eventos." />
          <div className="photoMosaic">
            <ServiceMedia image={photos.bathrooms} label="Conjunto de banheiros" tone="blue" icon="toilet" className="mosaicWide" sizes="(max-width: 760px) 92vw, 50vw" aspectRatio="16 / 9" />
            <ServiceMedia image={photos.superLuxoInterior} label="Interior do Super Luxo" tone="violet" icon="toilet" sizes="(max-width: 760px) 46vw, 25vw" aspectRatio="4 / 3" />
            <ServiceMedia image={photos.superLuxoUrinal} label="Mictório do Super Luxo" tone="violet" icon="toilet" sizes="(max-width: 760px) 46vw, 25vw" aspectRatio="4 / 3" />
            <ServiceMedia image={photos.std} label="Banheiro STD" tone="blue" icon="toilet" sizes="(max-width: 760px) 46vw, 25vw" aspectRatio="4 / 3" />
            <ServiceMedia image={photos.pcd} label="Banheiro PCD/PNE" tone="green" icon="toilet" sizes="(max-width: 760px) 46vw, 25vw" aspectRatio="4 / 3" />
          </div>
        </div>
      </section>

      <RentalProcess />

      <section className="section faqSection" id="duvidas" aria-labelledby="bath-faq-title">
        <div className="shell faqGrid">
          <div className="faqIntro"><p className="eyebrow">Dúvidas sobre banheiros</p><h2 id="bath-faq-title">O essencial antes de contratar.</h2><p>Para quantidades, medidas e logística, envie os dados do evento ou da obra.</p></div>
          <FaqList items={bathroomFaqs} schema />
        </div>
      </section>

      <QuoteCta service="Banheiro químico" image={photos.tents} title="Quantos banheiros o seu evento precisa?" description="Informe público, duração, data e cidade. A equipe indica modelos e quantidade e prepara o orçamento." />
    </main>
  );
}
