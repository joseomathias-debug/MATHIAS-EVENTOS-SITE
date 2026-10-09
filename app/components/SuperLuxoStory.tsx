import { Check } from "lucide-react";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { photos } from "../content";
import { whatsappHref } from "../lib/quote";
import { ServiceMedia } from "./ServiceMedia";

const story = [
  {
    eyebrow: "Visão geral",
    title: "Tudo começa por um interior mais completo.",
    text: "O Super Luxo reúne os principais recursos internos em um único equipamento, incluindo área para higienização das mãos e sistema de descarga.",
    highlights: ["Lavatório interno", "Sistema de descarga", "Itens de apoio"],
    image: photos.superLuxo,
    label: "Visão geral do banheiro Super Luxo",
  },
  {
    eyebrow: "Higienização",
    title: "Higienização das mãos dentro do próprio banheiro.",
    text: "O lavatório interno permite a higienização das mãos sem depender de uma estrutura externa. O conjunto também possui sabonete líquido, suporte para papel e compartimento de apoio.",
    highlights: ["Lavatório", "Sabonete líquido", "Espaços de apoio"],
    image: photos.superLuxoInterior,
    label: "Lavatório e acessórios internos do Super Luxo",
  },
  {
    eyebrow: "Uso prático",
    title: "Acionamento pensado para uso prático.",
    text: "Os sistemas confirmados contam com acionamento por pedal. A foto mostra os acionadores instalados para a descarga e para o lavatório.",
    highlights: ["Acionador da descarga", "Acionador do lavatório"],
    image: photos.superLuxoPumps,
    label: "Acionadores de pé do banheiro Super Luxo",
  },
  {
    eyebrow: "Interior",
    title: "Duas opções de uso no interior.",
    text: "O interior inclui vaso sanitário e mictório para uso em pé, aproveitando melhor a estrutura interna.",
    highlights: ["Vaso sanitário", "Mictório para uso em pé"],
    image: photos.superLuxoUrinal,
    label: "Vaso sanitário e mictório do banheiro Super Luxo",
  },
  {
    eyebrow: "Descarga",
    title: "Sistema de descarga em funcionamento.",
    text: "Na descarga, o sistema realiza a limpeza do vaso conforme o acionamento instalado no equipamento.",
    highlights: ["Sistema integrado", "Acionamento instalado"],
    image: photos.superLuxoToilet,
    label: "Vaso sanitário e sistema de descarga do Super Luxo",
  },
];

export function SuperLuxoStory() {
  return (
    <section className="productStory" aria-labelledby="product-story-title">
      <div className="shell productStoryIntro">
        <p className="eyebrow">Conheça por dentro</p>
        <h2 id="product-story-title">Uma história visual dos recursos do Super Luxo.</h2>
        <p>Fotos reais do equipamento, apresentadas em uma sequência simples para você entender o que muda na experiência.</p>
      </div>
      <div className="productStoryList">
        {story.map((block, index) => (
          <article className={`productStoryBlock${index % 2 ? " productStoryBlockReverse" : ""}`} key={block.title}>
            <div className="shell productStoryGrid">
              <ServiceMedia image={block.image} label={block.label} tone="violet" icon="toilet" className="productStoryMedia" sizes="(max-width: 860px) 92vw, 48vw" aspectRatio="16 / 10" />
              <div className="productStoryCopy">
                <span>{String(index + 1).padStart(2, "0")} · {block.eyebrow}</span>
                <h3>{block.title}</h3>
                <p>{block.text}</p>
                <ul>{block.highlights.map((highlight) => <li key={highlight}><Check aria-hidden="true" /> {highlight}</li>)}</ul>
              </div>
            </div>
          </article>
        ))}
      </div>
      <div className="shell superLuxoConversion">
        <div><p className="eyebrow">Orçamento direto</p><h2>Quer esse modelo no seu evento?</h2><p>Envie a cidade, a data e o contexto. A equipe confirma disponibilidade e orienta a quantidade.</p></div>
        <a className="button buttonWhatsapp buttonLarge" href={whatsappHref({ service: "Banheiro químico", model: "Super Luxo" })} target="_blank" rel="noreferrer"><WhatsAppIcon /> Orçar o Super Luxo</a>
      </div>
    </section>
  );
}
