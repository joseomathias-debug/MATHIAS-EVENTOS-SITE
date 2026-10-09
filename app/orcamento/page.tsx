import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { QuoteForm } from "../components/QuoteForm";
import { WhatsAppIcon } from "../components/WhatsAppIcon";
import { company } from "../content";
import { pageMetadata } from "../lib/seo";
import { whatsappHref } from "../lib/quote";

export const metadata: Metadata = pageMetadata(
  "Solicitar orçamento de tendas e banheiros químicos",
  "Peça orçamento de tendas, banheiros químicos, backdrop, palco, mesas e cadeiras em Santo Antônio de Posse, Campinas, Holambra, Jaguariúna e região. Resposta pelo WhatsApp.",
  "/orcamento",
);

function first(value: string | string[] | undefined) { return Array.isArray(value) ? value[0] : value || ""; }

export default async function QuotePage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const initial = { service: first(query.servico), model: first(query.modelo), quantity: first(query.quantidade), date: first(query.data), city: first(query.cidade), notes: first(query.resumo) };
  const rep = company.representative;
  return (
    <main>
      <section className="quotePageHero">
        <div className="shell">
          <Breadcrumbs items={[{ label: "Orçamento" }]} />
          <div className="quotePageGrid">
            <div className="quotePageCopy">
              <p className="eyebrow">Pedido de orçamento</p>
              <h1>Conte o essencial. A gente cuida da estrutura.</h1>
              <p className="heroLead">Preencha o que já souber. O pedido chega organizado no WhatsApp da Mathias Eventos e a equipe responde com a configuração e o orçamento.</p>
              <ul className="quoteBenefits">
                <li><CheckCircle2 aria-hidden="true" /><span><strong>Sem cadastro</strong><small>Nada de criar conta ou senha.</small></span></li>
                <li><CheckCircle2 aria-hidden="true" /><span><strong>Vários serviços no mesmo pedido</strong><small>Tendas, banheiros, mobiliário e mais.</small></span></li>
                <li><CheckCircle2 aria-hidden="true" /><span><strong>Orçamento personalizado</strong><small>Valores conforme data, local e estrutura.</small></span></li>
              </ul>
              <div className="directContacts">
                <p>Prefere chamar direto?</p>
                <a className="directContact directContactMain" href={whatsappHref()} target="_blank" rel="noreferrer"><WhatsAppIcon size={22} /><span><small>Atendimento principal</small><strong>{company.whatsappDisplay}</strong></span></a>
                <a className="directContact" href={whatsappHref({}, rep.whatsappNumber)} target="_blank" rel="noreferrer"><WhatsAppIcon size={18} /><span><small>{rep.label}</small><strong>{rep.whatsappDisplay}</strong></span></a>
              </div>
            </div>
            <QuoteForm initial={initial} />
          </div>
        </div>
      </section>
    </main>
  );
}
