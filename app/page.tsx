import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FaqList } from "./components/FaqList";
import { BenefitGrid, ClientLogos, UseCaseGrid } from "./components/FeatureBlocks";
import { NeedQuiz } from "./components/NeedQuiz";
import { PortfolioSection } from "./components/PortfolioSection";
import { QuoteCta } from "./components/QuoteCta";
import { RegionalMap } from "./components/RegionalMap";
import { RentalProcess } from "./components/RentalProcess";
import { SectionHeading } from "./components/SectionHeading";
import { ServiceIcon } from "./components/ServiceIcon";
import { ServiceMedia } from "./components/ServiceMedia";
import { WhatsAppIcon } from "./components/WhatsAppIcon";
import { bathroomModels, company, coverageSentence, differentials, homeFaqs, photos, tentSizes, useCases } from "./content";
import { pageMetadata } from "./lib/seo";
import { whatsappHref } from "./lib/quote";

export const metadata: Metadata = pageMetadata(
  "Mathias Eventos | Tendas e banheiros químicos para eventos",
  "Locação e montagem de tendas, banheiros químicos e estruturas para eventos, empresas e obras em Santo Antônio de Posse, Campinas, Holambra, Jaguariúna e região.",
  "/",
  undefined,
  { absoluteTitle: true },
);

const heroShortcuts = [
  { title: "Tendas", detail: "3×3 a 10×10, conjugadas e em L", href: "/tendas", icon: "tent" },
  { title: "Banheiros químicos", detail: "STD, PCD/PNE e Super Luxo", href: "/banheiros-quimicos", icon: "toilet" },
  { title: "Estruturas", detail: "Backdrop, treliça, palcos e mais", href: "/backdrop", icon: "backdrop" },
  { title: "Montagem profissional", detail: "Frete, montagem e desmontagem", href: "/#como-funciona", icon: "wrench" },
] as const;

const quickProof = [
  { icon: "wrench", text: "Montagem e desmontagem pela nossa equipe" },
  { icon: "badge", text: "Estrutura revisada antes de cada locação" },
  { icon: "clock", text: "Pontualidade na entrega e na montagem" },
  { icon: "map-pin", text: "Base em Santo Antônio de Posse" },
] as const;

export default function Home() {
  return (
    <main className="home">
      {/* 1. Hero: o que faz, para quem, por que confiar e como pedir */}
      <section className="homeHero" aria-labelledby="home-title">
        <div className="homeHeroBg">
          <ServiceMedia image={photos.homeHero} label="Equipe da Mathias Eventos montando tendas" tone="sand" icon="tent" priority sizes="100vw" />
        </div>
        <div className="homeHeroShade" aria-hidden="true" />
        <div className="shell homeHeroInner">
          <div className="homeHeroCopy">
            <p className="eyebrow">Locação e montagem de estruturas para eventos</p>
            <h1 id="home-title">Estrutura certa. <span>Eventos sem improviso.</span></h1>
            <p className="heroLead">Tendas, banheiros químicos, palcos e estruturas para festas, casamentos, empresas, obras e eventos públicos. Da montagem à desmontagem, cuidamos da estrutura para você focar no seu evento.</p>
            <div className="heroActions">
              <Link className="button buttonPrimary buttonLarge" href="/orcamento">Solicitar orçamento <ArrowRight aria-hidden="true" /></Link>
              <a className="button buttonWhatsapp buttonLarge" href={whatsappHref()} target="_blank" rel="noreferrer"><WhatsAppIcon /> {company.whatsappDisplay}</a>
            </div>
            <p className="heroRegion">{coverageSentence}</p>
          </div>
        </div>
        <nav className="shell homeShortcuts" aria-label="Atalhos para os serviços">
          {heroShortcuts.map((item) => (
            <Link href={item.href} key={item.title}>
              <span className="shortcutIcon"><ServiceIcon name={item.icon} size={22} /></span>
              <span><strong>{item.title}</strong><small>{item.detail}</small></span>
              <ArrowRight className="shortcutArrow" aria-hidden="true" />
            </Link>
          ))}
        </nav>
      </section>

      {/* 2. Prova rápida */}
      <section className="proofBar" aria-label="Por que contratar a Mathias Eventos">
        <ul className="shell proofList">
          {quickProof.map((item) => <li key={item.text}><ServiceIcon name={item.icon} size={20} /> {item.text}</li>)}
        </ul>
      </section>
      <ClientLogos />

      {/* 4. Como funciona */}
      <div id="como-funciona"><RentalProcess compact /></div>

      {/* 5. Aplicações */}
      <section className="section useCaseSection" aria-labelledby="usecases-title">
        <div className="shell">
          <SectionHeading id="usecases-title" eyebrow="Para cada tipo de evento" title="Estrutura pensada para o seu tipo de evento." />
          <UseCaseGrid items={useCases} />
        </div>
      </section>

      {/* 6. Destaque: tendas */}
      <section className="section spotlight spotlightTents sectionDark" aria-labelledby="spot-tents-title">
        <div className="shell spotlightGrid">
          <div className="spotlightMedia mediaZoom">
            <ServiceMedia image={photos.tentLShape} label="Tendas conjugadas em formato de L" tone="sand" icon="tent" sizes="(max-width: 900px) 92vw, 52vw" aspectRatio="4 / 3" />
          </div>
          <div className="spotlightCopy">
            <p className="eyebrow">Coberturas</p>
            <h2 id="spot-tents-title">Tendas para qualquer tamanho de evento.</h2>
            <p>Sete tamanhos, conjugadas lado a lado ou em L, com calhas e fechamento branco ou cristal.</p>
            <ul className="sizeChips" aria-label="Tamanhos disponíveis">
              {tentSizes.map((tent) => <li key={tent.size}><Link href={`/tendas#tenda-${tent.width}x${tent.length}`}><strong>{tent.size}</strong><small>{tent.area} m²</small></Link></li>)}
            </ul>
            <div className="heroActions">
              <Link className="button buttonPrimary" href="/tendas">Ver tamanhos e opções <ArrowRight aria-hidden="true" /></Link>
              <a className="button buttonGhostLight" href={whatsappHref({ service: "Tenda" })} target="_blank" rel="noreferrer"><WhatsAppIcon size={18} /> Orçar tendas</a>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Destaque: banheiros */}
      <section className="section spotlight spotlightBathrooms" aria-labelledby="spot-bath-title">
        <div className="shell">
          <SectionHeading id="spot-bath-title" eyebrow="Banheiros químicos" title="Três modelos. Cada um com uma função clara." />
          <ul className="modelStrip">
            {bathroomModels.map((model) => (
              <li key={model.slug}>
                <Link href={`/banheiros-quimicos/${model.slug}`} className="modelStripCard">
                  <ServiceMedia image={model.image} label={model.name} tone={model.tone} icon="toilet" sizes="(max-width: 760px) 92vw, 31vw" aspectRatio="4 / 3" objectFit="cover" />
                  <span className="modelStripBody">
                    <span className="modelTag">{model.indication}</span>
                    <strong>{model.shortName}</strong>
                    <small>{model.bestFor}</small>
                    <span className="modelStripMore">Ver modelo <ArrowRight aria-hidden="true" /></span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="centerActions">
            <Link className="button buttonDark" href="/banheiros-quimicos#comparativo">Comparar os modelos <ArrowRight aria-hidden="true" /></Link>
            <a className="textLink textLinkWhatsapp" href={whatsappHref({ service: "Banheiro químico" })} target="_blank" rel="noreferrer"><WhatsAppIcon size={18} /> Orçar banheiros</a>
          </div>
        </div>
      </section>

      <NeedQuiz />

      {/* 9. Portfólio */}
      <PortfolioSection />

      {/* 10. Diferenciais */}
      <section className="section differentialsSection" id="diferenciais" aria-labelledby="diff-title">
        <div className="shell">
          <SectionHeading id="diff-title" eyebrow="Por que a Mathias Eventos" title="Estrutura profissional, do pedido à desmontagem." />
          <BenefitGrid items={differentials} columns={5} />
          <dl className="factRow">
            <div><dt>Tamanhos de tenda</dt><dd>7<small>de 3×3 a 10×10</small></dd></div>
            <div><dt>Modelos de banheiro</dt><dd>3<small>STD, PCD/PNE e Super Luxo</small></dd></div>
            <div><dt>Cidades na região</dt><dd>{company.coverage.length}<small>e outras sob consulta</small></dd></div>
          </dl>
        </div>
      </section>

      {/* 11. Região */}
      <RegionalMap />

      {/* 12. FAQ */}
      <section className="section faqSection" aria-labelledby="faq-title">
        <div className="shell faqGrid">
          <div className="faqIntro">
            <p className="eyebrow">Perguntas frequentes</p>
            <h2 id="faq-title">Respostas rápidas antes do orçamento.</h2>
            <p>Valores, disponibilidade e configuração final são confirmados no orçamento.</p>
            <Link className="textLink textLinkStrong" href="/duvidas">Ver todas as dúvidas <ArrowRight aria-hidden="true" /></Link>
          </div>
          <FaqList items={homeFaqs} schema />
        </div>
      </section>

      {/* 13. CTA final */}
      <QuoteCta image={photos.clientYpe} title="Vamos montar a estrutura do seu evento?" description="Conte o que você precisa, a cidade e a data. A equipe indica a configuração e prepara o orçamento." />
    </main>
  );
}
