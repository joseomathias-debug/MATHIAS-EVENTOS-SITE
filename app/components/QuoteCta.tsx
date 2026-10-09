import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { quoteHref, whatsappHref } from "../lib/quote";
import type { SiteImage } from "../content";
import { ServiceMedia } from "./ServiceMedia";
import { WhatsAppIcon } from "./WhatsAppIcon";

export function QuoteCta({
  service,
  model,
  image,
  title = "Vamos organizar a estrutura do seu evento?",
  description = "Envie data, cidade e o que você precisa. A equipe confirma disponibilidade, configuração e prepara o orçamento.",
}: { service?: string; model?: string; image?: SiteImage; title?: string; description?: string }) {
  return (
    <section className={"quoteCta" + (image ? " quoteCtaWithImage" : "")}>
      {image && <div className="quoteCtaBackground" aria-hidden="true"><ServiceMedia image={{ ...image, alt: "" }} label="" tone="sand" icon="tent" sizes="100vw" /></div>}
      <div className="shell quoteCtaInner">
        <div className="quoteCtaCopy">
          <p className="eyebrow">Orçamento sem compromisso</p>
          <h2>{title}</h2>
          <p>{description}</p>
          <ul className="quoteCtaPoints">
            <li><Check aria-hidden="true" /> Resposta pelo WhatsApp</li>
            <li><Check aria-hidden="true" /> Sem cadastro</li>
            <li><Check aria-hidden="true" /> Vários serviços no mesmo pedido</li>
          </ul>
        </div>
        <div className="quoteCtaActions">
          <Link className="button buttonPrimary buttonLarge" href={quoteHref(service, model)}>Solicitar orçamento <ArrowRight aria-hidden="true" /></Link>
          <a className="button buttonWhatsapp buttonLarge" href={whatsappHref({ service, model })} target="_blank" rel="noreferrer"><WhatsAppIcon /> Falar com a Mathias Eventos</a>
        </div>
      </div>
    </section>
  );
}
