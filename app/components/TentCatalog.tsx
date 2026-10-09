import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { photos, tentSizes } from "../content";
import { quoteHref, whatsappHref } from "../lib/quote";
import { SectionHeading } from "./SectionHeading";
import { ServiceMedia } from "./ServiceMedia";
import { TentCapacityAccordion } from "./TentCapacityAccordion";
import { WhatsAppIcon } from "./WhatsAppIcon";

const maxArea = tentSizes.at(-1)!.area;

export function TentCatalog() {
  return (
    <section className="section tentCatalogSection" id="detalhes" aria-labelledby="tent-sizes-title">
      <div className="shell" id="tamanhos">
        <SectionHeading id="tent-sizes-title" eyebrow="Tamanhos disponíveis" title="Sete tamanhos, de 3×3 a 10×10." />
        <ul className="tentSizeGrid">
          {tentSizes.map((tent) => (
            <li className="tentSizeCard" id={`tenda-${tent.width}x${tent.length}`} key={tent.size}>
              <ServiceMedia image={tent.image} label={`Tenda ${tent.size}`} tone="sand" icon="tent" className="tentSizeMedia" sizes="(max-width: 560px) 46vw, (max-width: 1100px) 31vw, 23vw" aspectRatio="1 / 1" />
              <div className="tentSizeBody">
                <h3>Tenda {tent.size}</h3>
                <p className="tentSizeArea"><strong>{tent.area} m²</strong> de cobertura</p>
                <span className="areaBar" aria-hidden="true"><i style={{ width: `${Math.max(8, (tent.area / maxArea) * 100)}%` }} /></span>
                <p className="tentSizeNote">{tent.note}</p>
                <Link className="tentSizeQuote" href={quoteHref("Tenda", tent.size)}>Orçar {tent.size} <ArrowRight aria-hidden="true" /></Link>
              </div>
            </li>
          ))}
          <li className="tentSizeCard tentSizeCardCta">
            <div className="tentSizeBody">
              <h3>Precisa de mais área?</h3>
              <p className="tentSizeNote">Conjugamos tendas lado a lado, em sequência ou em L para cobrir áreas maiores.</p>
              <a className="tentSizeQuote" href="#combinacoes">Ver tendas conjugadas <ArrowRight aria-hidden="true" /></a>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}

const applications = [
  { range: "3×3 e 4×4", title: "Apoio e recepção", text: "Recepção, caixa, ponto de distribuição, ações de marca e áreas técnicas." },
  { range: "5×5 e 6×6", title: "Festas e confraternizações", text: "Área de convidados, buffet e apoio em eventos sociais e corporativos." },
  { range: "7×7 e 8×8", title: "Eventos maiores", text: "Casamentos, eventos de empresa e áreas com mesas, circulação e palco." },
  { range: "10×10 e conjugadas", title: "Grandes áreas cobertas", text: "Feiras, eventos públicos, festas da cidade e operações com grande público." },
];

export function TentApplications() {
  return (
    <section className="section tentApplications" id="aplicacoes" aria-labelledby="tent-apps-title">
      <div className="shell">
        <SectionHeading id="tent-apps-title" eyebrow="Aplicações" title="Qual tenda combina com o seu evento?" />
        <ol className="applicationList">
          {applications.map((item) => (
            <li key={item.range}>
              <span className="applicationRange">{item.range}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function TentCapacities() {
  return (
    <section className="section tentCapacitySection" id="capacidades-ilustradas" aria-labelledby="tent-capacity-title">
      <div className="shell">
        <div className="sectionHeading sectionHeading-stack tentCapacityIntro">
          <div>
            <p className="eyebrow">O que cabe em cada tenda</p>
            <h2 id="tent-capacity-title">Escolha o tamanho e veja as opções.</h2>
          </div>
        </div>
        <TentCapacityAccordion />
      </div>
    </section>
  );
}

const specialFormats = [
  {
    title: "Lado a lado",
    description: "Duas ou mais tendas iguais unidas pela lateral, com calha na união para conduzir a água.",
    image: photos.tentPair,
    model: "Tendas conjugadas lado a lado",
  },
  {
    title: "Em sequência — ex.: 6×18",
    description: "Tendas em linha para coberturas longas e projetos que exigem mais área útil.",
    image: photos.tentSequence6x18,
    model: "Sequência 6×18",
  },
  {
    title: "Formato em L",
    description: "Composição em L para aproveitar melhor terrenos e espaços com geometria diferente.",
    image: photos.tentLShape,
    model: "Formato em L",
  },
];

export function TentSpecialConfigurations() {
  return (
    <>
      <section className="section tentFormatsSection" id="combinacoes" aria-labelledby="tent-formats-title">
        <div className="shell">
          <SectionHeading id="tent-formats-title" eyebrow="Tendas conjugadas" title="Formatos especiais de montagem" />
          <ul className="tentFormatsGrid">
            {specialFormats.map((format) => (
              <li className="tentFormatCard" key={format.title}>
                <ServiceMedia image={format.image} label={format.title} tone="sand" icon="tent" className="tentFormatMedia" sizes="(max-width: 760px) 92vw, 31vw" aspectRatio="16 / 10" />
                <div className="tentFormatBody">
                  <h3>{format.title}</h3>
                  <p>{format.description}</p>
                  <Link className="textLink textLinkStrong" href={quoteHref("Tenda", format.model)}>Solicitar orçamento <ArrowRight aria-hidden="true" /></Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section tentCustomSection sectionDark" aria-labelledby="tent-custom-title">
        <div className="shell tentCustomGrid">
          <div className="tentCustomCopy">
            <p className="eyebrow">Sua marca em evidência</p>
            <h2 id="tent-custom-title">Escolha o tamanho e personalize sua tenda</h2>
            <p>Além dos tamanhos 3×3, 4×4, 5×5, 6×6, 7×7, 8×8 e 10×10, trabalhamos com opções personalizadas para fortalecer a identidade visual da sua marca, evento ou ação promocional.</p>
            <div className="heroActions">
              <Link className="button buttonPrimary" href={quoteHref("Tenda", "Personalizada")}>Solicitar orçamento <ArrowRight aria-hidden="true" /></Link>
              <a className="button buttonGhostLight" href={whatsappHref({ service: "Tenda", model: "Personalizada" })} target="_blank" rel="noreferrer"><WhatsAppIcon size={18} /> WhatsApp</a>
            </div>
          </div>
          <ServiceMedia image={photos.tentCustom} label="Tenda personalizada" tone="sand" icon="tent" className="tentCustomMedia" sizes="(max-width: 860px) 92vw, 44vw" aspectRatio="1 / 1" />
        </div>
      </section>
    </>
  );
}

const closures = [
  {
    title: "Fechamento em lona branca",
    description: "Proteção, privacidade e cobertura lateral para deixar o ambiente mais reservado e funcional.",
    benefits: ["Proteção lateral contra vento e sol", "Mais privacidade", "Ambiente reservado"],
    image: photos.tentWhiteClosure,
  },
  {
    title: "Fechamento cristal",
    description: "Opção elegante que protege o ambiente sem perder a visibilidade externa — ótima escolha para casamentos e eventos sociais.",
    benefits: ["Visibilidade externa", "Proteção lateral", "Acabamento elegante"],
    image: photos.tentCrystalClosure,
  },
];

export function TentClosures() {
  return (
    <section className="section tentClosuresSection" id="fechamentos" aria-labelledby="tent-closures-title">
      <div className="shell">
        <SectionHeading id="tent-closures-title" eyebrow="Fechamentos laterais" title="Opções de fechamento para sua estrutura" />
        <ul className="closureGrid">
          {closures.map((closure) => (
            <li className="closureCard" key={closure.title}>
              <ServiceMedia image={closure.image} label={closure.title} tone="sand" icon="tent" className="closureMedia" sizes="(max-width: 860px) 92vw, 46vw" aspectRatio="16 / 10" />
              <div className="closureBody">
                <h3>{closure.title}</h3>
                <p>{closure.description}</p>
                <ul className="checkList">{closure.benefits.map((benefit) => <li key={benefit}><Check aria-hidden="true" /> {benefit}</li>)}</ul>
                <Link className="textLink textLinkStrong" href={quoteHref("Tenda", closure.title)}>Consultar esta opção <ArrowRight aria-hidden="true" /></Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
