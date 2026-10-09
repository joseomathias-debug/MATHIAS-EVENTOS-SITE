import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, MinusCircle } from "lucide-react";
import { notFound } from "next/navigation";
import { BathroomComparison } from "../../components/BathroomComparison";
import { FaqList } from "../../components/FaqList";
import { QuoteCta } from "../../components/QuoteCta";
import { SectionHeading } from "../../components/SectionHeading";
import { ServiceHero } from "../../components/ServiceHero";
import { ServiceMedia } from "../../components/ServiceMedia";
import { ServiceSchema } from "../../components/ServiceSchema";
import { SuperLuxoStory } from "../../components/SuperLuxoStory";
import { bathroomModels } from "../../content";
import { pageMetadata } from "../../lib/seo";
import { quoteHref } from "../../lib/quote";

export function generateStaticParams() {
  return bathroomModels.map((model) => ({ slug: model.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const model = bathroomModels.find((item) => item.slug === slug);
  if (!model) return {};
  return pageMetadata(model.seoTitle, model.seoDescription, `/banheiros-quimicos/${model.slug}`, model.image?.src || undefined);
}

const intro: Record<string, { title: string; text: string }> = {
  std: {
    title: "O banheiro químico para a maioria dos eventos e obras.",
    text: "O STD é o modelo padrão: prático, resistente e de fácil posicionamento. É a escolha mais comum para atender o público geral em eventos, canteiros de obra e operações de empresas.",
  },
  pcd: {
    title: "Acessibilidade para que todo o público seja atendido.",
    text: "O PCD/PNE tem dimensões maiores e espaço interno ampliado para facilitar o uso por pessoas com deficiência ou mobilidade reduzida. O funcionamento sanitário é semelhante ao do STD.",
  },
  "super-luxo": {
    title: "Mais conforto e recursos dentro do mesmo banheiro.",
    text: "O Super Luxo reúne lavatório para higienização das mãos, sabonete líquido, sistema de descarga, mictório e itens de apoio — uma experiência mais completa para eventos e empresas.",
  },
};

export default async function BathroomModelPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const model = bathroomModels.find((item) => item.slug === slug);
  if (!model) notFound();
  const isSuperLuxo = model.slug === "super-luxo";

  const modelFaqs = [
    {
      question: `Para quais situações o ${model.shortName} é indicado?`,
      answer: model.slug === "pcd" ? "É destinado à acessibilidade de pessoas com deficiência ou mobilidade reduzida e pode ser combinado com outros modelos no mesmo evento." : model.slug === "super-luxo" ? "É uma opção para contratações que precisam de lavatório, itens de higiene e sistema de descarga." : "É o modelo mais utilizado em eventos, obras e empresas para necessidades sanitárias.",
    },
    {
      question: "Quais são as medidas?",
      answer: "A equipe confirma as medidas e especificações do modelo antes da contratação, conforme a necessidade do local.",
    },
    {
      question: "Como definir a quantidade?",
      answer: "A quantidade depende do público, da duração e do tipo de evento. Envie esses dados no orçamento para uma avaliação.",
    },
    {
      question: "Posso combinar modelos diferentes?",
      answer: "Sim. STD, PCD/PNE e Super Luxo podem ser combinados no mesmo pedido. A equipe sugere a proporção conforme o público.",
    },
  ];

  return (
    <main>
      <ServiceSchema name={model.name} description={model.seoDescription} path={`/banheiros-quimicos/${model.slug}`} />
      <ServiceHero
        eyebrow={`Banheiro químico · ${model.indication}`}
        title={model.name}
        description={model.description}
        service="Banheiro químico"
        model={model.shortName}
        image={model.image}
        icon="toilet"
        tone={model.tone}
        breadcrumbs={[{ label: "Banheiros químicos", href: "/banheiros-quimicos" }, { label: model.shortName }]}
        highlights={[model.bestFor, ...model.features.slice(0, 2)]}
        detailsLabel="Ver características"
      />

      <section className="section detailSection" id="detalhes" aria-labelledby="detail-title">
        <div className="shell detailGrid">
          <div className="detailIntro">
            <p className="eyebrow">Sobre o modelo</p>
            <h2 id="detail-title">{intro[model.slug].title}</h2>
            <p>{intro[model.slug].text}</p>
            <p>Antes da contratação, a equipe confirma se este modelo atende ao contexto informado.</p>
            <Link className="button buttonPrimary" href={quoteHref("Banheiro químico", model.shortName)}>Orçar o {model.shortName} <ArrowRight aria-hidden="true" /></Link>
          </div>
          <div className="featurePanel">
            <h3>Características</h3>
            <ul>
              {model.features.map((feature) => <li key={feature}><CheckCircle2 aria-hidden="true" /> {feature}</li>)}
              {model.notIncluded?.map((item) => <li className="isMissing" key={item}><MinusCircle aria-hidden="true" /> {item}</li>)}
            </ul>
          </div>
          <div className="featurePanel featurePanelAccent">
            <h3>O que está incluso</h3>
            <ul>{model.included.map((item) => <li key={item}><CheckCircle2 aria-hidden="true" /> {item}</li>)}</ul>
          </div>
        </div>
      </section>

      {isSuperLuxo ? <SuperLuxoStory /> : (
        <section className="section detailGallery" aria-labelledby="detail-photo-title">
          <div className="shell">
            <SectionHeading id="detail-photo-title" eyebrow="Foto real" title={`Conheça o ${model.shortName}.`} description="A imagem preserva a proporção do equipamento para facilitar a comparação entre os modelos." />
            <ServiceMedia image={model.image} label={model.name} tone={model.tone} icon="toilet" className="detailMainPhoto" sizes="(max-width: 900px) 92vw, 70vw" aspectRatio="16 / 10" objectFit="contain" />
          </div>
        </section>
      )}

      <section className="section comparisonSection" aria-labelledby="model-compare-title">
        <div className="shell">
          <SectionHeading id="model-compare-title" eyebrow="Compare antes de decidir" title="Como ele se compara aos outros modelos." />
          <BathroomComparison />
          <ul className="relatedModelGrid">
            {bathroomModels.filter((item) => item.slug !== model.slug).map((item) => (
              <li key={item.slug}>
                <Link href={`/banheiros-quimicos/${item.slug}`} className="relatedModelCard">
                  <ServiceMedia image={item.image} label={item.name} tone={item.tone} icon="toilet" className="relatedModelMedia" sizes="(max-width: 760px) 40vw, 18vw" aspectRatio="1 / 1" />
                  <span><small>{item.indication}</small><strong>{item.name}</strong><span className="relatedMore">Ver modelo <ArrowRight aria-hidden="true" /></span></span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section faqSection" aria-labelledby="model-faq-title">
        <div className="shell faqGrid">
          <div className="faqIntro"><p className="eyebrow">Perguntas frequentes</p><h2 id="model-faq-title">Dúvidas sobre o {model.shortName}.</h2><p>Medidas, quantidade e disponibilidade são confirmadas conforme a necessidade do local.</p></div>
          <FaqList items={modelFaqs} schema />
        </div>
      </section>

      <QuoteCta service="Banheiro químico" model={model.shortName} title={`Solicite um orçamento para o ${model.shortName}.`} description="Informe público, data, cidade e duração. A equipe confirma disponibilidade e indica a quantidade." />
    </main>
  );
}
