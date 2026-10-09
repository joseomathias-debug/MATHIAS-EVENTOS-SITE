import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { FaqList } from "../components/FaqList";
import { QuoteCta } from "../components/QuoteCta";
import { ServiceHero } from "../components/ServiceHero";
import { ServiceSchema } from "../components/ServiceSchema";
import { photos } from "../content";
import { pageMetadata } from "../lib/seo";
import { quoteHref } from "../lib/quote";

export const metadata: Metadata = pageMetadata(
  "Aluguel de mesas e cadeiras para eventos",
  "Aluguel de mesas e cadeiras para festas e eventos, planejadas junto com as tendas, em Santo Antônio de Posse, Campinas, Holambra, Jaguariúna e região.",
  "/mesas-e-cadeiras",
  "/images/services/mesas-cadeiras-mathias-eventos/mesas-cadeiras-mathias-eventos-1122.jpg",
);

const faqs = [
  { question: "Posso contratar mesas e cadeiras junto com tendas?", answer: "Sim. Os serviços podem ser combinados no mesmo pedido, o que ajuda a planejar a organização do espaço e a logística." },
  { question: "Quantas mesas e cadeiras cabem em uma tenda?", answer: "Depende do tamanho, do formato das mesas, da circulação e das demais estruturas. A página de tendas mostra configurações ilustradas por tamanho." },
  { question: "Quais modelos estão disponíveis?", answer: "Os modelos e quantidades são confirmados diretamente pela equipe conforme a data da contratação." },
];

export default function TablesPage() {
  return (
    <main>
      <ServiceSchema name="Aluguel de mesas e cadeiras" description="Locação de mesas e cadeiras para eventos, planejadas junto com as tendas." path="/mesas-e-cadeiras" />
      <ServiceHero
        eyebrow="Mobiliário para eventos"
        title="Mesas e cadeiras para organizar os seus convidados."
        description="Complete a estrutura do evento e planeje a disposição do mobiliário junto com as tendas, a circulação e o buffet."
        service="Mesas e cadeiras"
        image={photos.tables}
        icon="armchair"
        tone="amber"
        breadcrumbs={[{ label: "Mesas e cadeiras" }]}
        highlights={["Combina com as tendas", "Orçamento junto com as tendas", "Quantidade sob consulta"]}
        detailsLabel="Ver como planejar"
      />

      <section className="section furnitureSection" id="detalhes" aria-labelledby="furniture-title">
        <div className="shell splitGrid">
          <div>
            <p className="eyebrow">Planejamento de espaço</p>
            <h2 id="furniture-title">Mobiliário e cobertura precisam conversar.</h2>
            <p>Quando mesas, cadeiras e tendas são planejadas juntas, fica mais fácil garantir circulação e conforto para os convidados.</p>
            <ul className="checkList">
              <li><CheckCircle2 aria-hidden="true" /> Informe a quantidade de convidados</li>
              <li><CheckCircle2 aria-hidden="true" /> Conte se haverá buffet, palco ou pista</li>
              <li><CheckCircle2 aria-hidden="true" /> Envie as medidas do local, se souber</li>
            </ul>
            <div className="heroActions">
              <Link className="button buttonPrimary" href={quoteHref("Mesas e cadeiras")}>Solicitar orçamento <ArrowRight aria-hidden="true" /></Link>
              <Link className="button buttonOutline" href="/tendas#capacidades-ilustradas">Ver o que cabe em cada tenda</Link>
            </div>
          </div>
          <div className="layoutPreview" role="img" aria-label="Diagrama ilustrativo de mesas e cadeiras vistas de cima, sem indicação de capacidade">
            {Array.from({ length: 6 }, (_, group) => <span key={group}><i /><i /><b /><i /><i /></span>)}
            <small>Diagrama ilustrativo — capacidade sob consulta</small>
          </div>
        </div>
      </section>

      <section className="section faqSection" aria-labelledby="furniture-faq-title">
        <div className="shell faqGrid">
          <div className="faqIntro"><p className="eyebrow">Dúvidas sobre mobiliário</p><h2 id="furniture-faq-title">Organize sem estimativas arriscadas.</h2><p>A disposição é avaliada com os dados reais do evento.</p></div>
          <FaqList items={faqs} schema />
        </div>
      </section>
      <QuoteCta service="Mesas e cadeiras" title="Vamos organizar o mobiliário do evento?" description="Informe convidados, data e cidade — e se já tem tenda definida." />
    </main>
  );
}
