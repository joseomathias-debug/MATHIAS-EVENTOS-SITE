import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { FaqList } from "../components/FaqList";
import { PageNav } from "../components/PageNav";
import { QuoteCta } from "../components/QuoteCta";
import { StructuredData } from "../components/StructuredData";
import { bathroomFaqs, homeFaqs, knowledgeItems, tentFaqs } from "../content";
import { pageMetadata } from "../lib/seo";

export const metadata: Metadata = pageMetadata(
  "Dúvidas sobre aluguel de tendas e banheiros químicos",
  "Respostas sobre tamanhos de tenda, calhas, fechamentos, modelos de banheiro químico, montagem e orçamento em Santo Antônio de Posse, Campinas e região.",
  "/duvidas",
);

const allFaqs = [...homeFaqs, ...tentFaqs, ...bathroomFaqs];

export default function QuestionsPage() {
  return (
    <main>
      <StructuredData data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: allFaqs.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })),
      }} />
      <section className="knowledgeHero">
        <div className="shell">
          <Breadcrumbs items={[{ label: "Dúvidas" }]} />
          <p className="eyebrow">Central de dúvidas</p>
          <h1>Tudo o que você precisa saber antes de contratar.</h1>
          <p className="heroLead">Tamanhos de tenda, modelos de banheiro, montagem e orçamento — respostas diretas para decidir com segurança.</p>
        </div>
      </section>

      <PageNav items={[
        { href: "#guias", label: "Guias rápidos" },
        { href: "#atendimento", label: "Atendimento" },
        { href: "#tendas", label: "Tendas" },
        { href: "#banheiros", label: "Banheiros" },
      ]} />

      <section className="section knowledgeLibrary" id="guias" aria-label="Guias rápidos">
        <div className="shell">
          <ul className="knowledgeGrid">
            {knowledgeItems.map((item) => (
              <li key={item.title}>
                <Link href={item.href}>
                  <span className="knowledgeTag">{item.tag}</span>
                  <h2>{item.title}</h2>
                  <p>{item.description}</p>
                  <span className="knowledgeMore">Ver orientação <ArrowRight aria-hidden="true" /></span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section faqCategory" id="atendimento" aria-labelledby="faq-service-title">
        <div className="shell faqGrid"><div className="faqIntro"><p className="eyebrow">Atendimento</p><h2 id="faq-service-title">Orçamento, montagem e região.</h2></div><FaqList items={homeFaqs} /></div>
      </section>
      <section className="section faqCategory faqCategoryAlt" id="tendas" aria-labelledby="faq-tents-title">
        <div className="shell faqGrid"><div className="faqIntro"><p className="eyebrow">Tendas</p><h2 id="faq-tents-title">Tamanhos, calhas e fechamentos.</h2><Link className="textLink textLinkStrong" href="/tendas">Ver página de tendas <ArrowRight aria-hidden="true" /></Link></div><FaqList items={tentFaqs} /></div>
      </section>
      <section className="section faqCategory" id="banheiros" aria-labelledby="faq-bath-title">
        <div className="shell faqGrid"><div className="faqIntro"><p className="eyebrow">Banheiros químicos</p><h2 id="faq-bath-title">Modelos, recursos e quantidade.</h2><Link className="textLink textLinkStrong" href="/banheiros-quimicos">Ver página de banheiros <ArrowRight aria-hidden="true" /></Link></div><FaqList items={bathroomFaqs} /></div>
      </section>
      <QuoteCta title="Não encontrou sua dúvida?" description="Mande sua pergunta pelo WhatsApp. A equipe responde e já ajuda a montar o orçamento." />
    </main>
  );
}
