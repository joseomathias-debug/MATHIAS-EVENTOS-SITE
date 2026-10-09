import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ClipboardList, MapPin } from "lucide-react";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { WhatsAppIcon } from "../components/WhatsAppIcon";
import { company, coverageSentence } from "../content";
import { pageMetadata } from "../lib/seo";
import { whatsappHref } from "../lib/quote";

export const metadata: Metadata = pageMetadata(
  "Contato e WhatsApp — Santo Antônio de Posse e região",
  "Fale com a Mathias Eventos pelo WhatsApp (19) 99710-1208 e peça orçamento de tendas, banheiros químicos e estruturas em Campinas, Holambra, Jaguariúna e região.",
  "/contato",
);

export default function ContactPage() {
  const rep = company.representative;
  return (
    <main>
      <section className="simplePageHero">
        <div className="shell">
          <Breadcrumbs items={[{ label: "Contato" }]} />
          <div className="simpleHeroGrid">
            <div>
              <p className="eyebrow">Contato</p>
              <h1>Fale com a Mathias Eventos.</h1>
              <p className="heroLead">Informe o serviço, a cidade e a data. Respondemos pelo WhatsApp para confirmar disponibilidade, detalhes e orçamento.</p>
            </div>
            <div className="contactCards">
              <a className="contactCard contactCardMain" href={whatsappHref()} target="_blank" rel="noreferrer">
                <WhatsAppIcon size={30} />
                <span className="contactCardLabel">WhatsApp · atendimento principal</span>
                <strong>{company.whatsappDisplay}</strong>
                <span className="contactCardAction">Conversar agora <ArrowRight aria-hidden="true" /></span>
              </a>
              <a className="contactCard" href={whatsappHref({}, rep.whatsappNumber)} target="_blank" rel="noreferrer">
                <WhatsAppIcon size={24} />
                <span className="contactCardLabel">{rep.label}</span>
                <strong>{rep.whatsappDisplay}</strong>
                <span className="contactCardAction">Falar com o representante <ArrowRight aria-hidden="true" /></span>
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className="section contactDetails">
        <div className="shell contactDetailsGrid">
          <article>
            <MapPin aria-hidden="true" />
            <h2>Atendimento regional</h2>
            <p>Base em {company.baseCity}/SP. {coverageSentence}</p>
            <p className="contactCities">{company.coverage.join(" · ")}</p>
            <small>{company.coverageNote}</small>
          </article>
          <article>
            <ClipboardList aria-hidden="true" />
            <h2>Envie um pedido completo</h2>
            <p>O formulário reúne serviço, modelo, quantidade, data e cidade em uma única mensagem — e agiliza a resposta.</p>
            <Link className="button buttonPrimary" href="/orcamento">Preencher pedido de orçamento <ArrowRight aria-hidden="true" /></Link>
          </article>
        </div>
      </section>
    </main>
  );
}
