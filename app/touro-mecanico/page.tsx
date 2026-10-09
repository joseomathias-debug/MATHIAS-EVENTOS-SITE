import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarDays, MapPin, PartyPopper, Zap } from "lucide-react";
import { FaqList } from "../components/FaqList";
import { QuoteCta } from "../components/QuoteCta";
import { SectionHeading } from "../components/SectionHeading";
import { ServiceHero } from "../components/ServiceHero";
import { ServiceSchema } from "../components/ServiceSchema";
import { pageMetadata } from "../lib/seo";
import { quoteHref } from "../lib/quote";

export const metadata: Metadata = pageMetadata(
  "Aluguel de touro mecânico para festas e eventos",
  "Locação de touro mecânico para festas, confraternizações e eventos em Santo Antônio de Posse, Campinas, Holambra e região. Consulte disponibilidade e requisitos.",
  "/touro-mecanico",
);

const faqs = [
  { question: "Para quais tipos de evento o touro mecânico é indicado?", answer: "A atração pode fazer parte de festas e eventos de diferentes formatos. A equipe avalia o contexto, o público e o local antes de confirmar." },
  { question: "Quais são os requisitos elétricos e de espaço?", answer: "Informe o local para a equipe avaliar os requisitos elétricos, a área disponível e a configuração adequada." },
  { question: "Existe idade mínima?", answer: "A faixa etária e as regras de uso são definidas conforme o equipamento e a operação contratada. Confirme essas condições com a equipe antes do evento." },
  { question: "A operação está incluída?", answer: "A equipe informa no orçamento como será a operação e quais itens fazem parte da contratação para o seu evento." },
];

export default function BullPage() {
  return (
    <main>
      <ServiceSchema name="Aluguel de touro mecânico" description="Locação de touro mecânico para festas e eventos." path="/touro-mecanico" />
      <ServiceHero
        eyebrow="Atração para festas e eventos"
        title="Touro mecânico: a atração que movimenta o evento."
        description="Leve o touro mecânico para a sua festa ou evento de empresa. Espaço, energia, operação e regras de uso são alinhados com a equipe antes do evento."
        service="Touro mecânico"
        icon="party"
        tone="violet"
        breadcrumbs={[{ label: "Touro mecânico" }]}
        highlights={["Festas e confraternizações", "Eventos de empresa", "Requisitos alinhados antes"]}
        detailsLabel="Ver o que precisamos saber"
      />

      <section className="section" id="detalhes" aria-labelledby="bull-info-title">
        <div className="shell">
          <SectionHeading id="bull-info-title" eyebrow="Planejamento da atração" title="Diversão com planejamento." description="Com estas informações a equipe confirma disponibilidade e prepara um orçamento preciso." />
          <ul className="infoCards infoCards-4">
            <li><PartyPopper aria-hidden="true" /><h3>Formato do evento</h3><p>Perfil da festa e público esperado.</p></li>
            <li><MapPin aria-hidden="true" /><h3>Local</h3><p>Cidade e características do espaço disponível.</p></li>
            <li><Zap aria-hidden="true" /><h3>Energia</h3><p>Ponto de energia disponível no local.</p></li>
            <li><CalendarDays aria-hidden="true" /><h3>Data e duração</h3><p>Para confirmar disponibilidade e operação.</p></li>
          </ul>
          <div className="centerActions">
            <Link className="button buttonPrimary" href={quoteHref("Touro mecânico")}>Consultar disponibilidade <ArrowRight aria-hidden="true" /></Link>
          </div>
        </div>
      </section>

      <section className="section faqSection" aria-labelledby="bull-faq-title">
        <div className="shell faqGrid">
          <div className="faqIntro"><p className="eyebrow">Dúvidas sobre a atração</p><h2 id="bull-faq-title">Confirme o que o evento precisa.</h2><p>Requisitos técnicos e regras de uso são alinhados antes da contratação.</p></div>
          <FaqList items={faqs} schema />
        </div>
      </section>
      <QuoteCta service="Touro mecânico" title="Quer o touro mecânico no seu evento?" description="Informe data, cidade, local e perfil do evento para receber uma avaliação." />
    </main>
  );
}
