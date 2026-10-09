import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { clientCompanies, extraServices, type IconName } from "../content";
import { whatsappHref } from "../lib/quote";
import { ServiceIcon } from "./ServiceIcon";
import { WhatsAppIcon } from "./WhatsAppIcon";

type Item = { title: string; description: string; icon: IconName };

/** Lista de benefícios ou diferenciais com ícone discreto. */
export function BenefitGrid({ items, dark = false, columns = 3 }: { items: Item[]; dark?: boolean; columns?: 2 | 3 | 4 | 5 }) {
  return (
    <ul className={`benefitGrid benefitGrid-${columns}${dark ? " benefitGridDark" : ""}`}>
      {items.map((item) => (
        <li key={item.title}>
          <span className="benefitIcon"><ServiceIcon name={item.icon} size={22} /></span>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </li>
      ))}
    </ul>
  );
}

/** Onde o serviço costuma ser aplicado. */
export function UseCaseGrid({ items }: { items: Array<Item & { interest?: string }> }) {
  return (
    <ul className="useCaseGrid">
      {items.map((item) => {
        const body = (
          <>
            <span className="useCaseIcon"><ServiceIcon name={item.icon} size={24} /></span>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            {item.interest && <span className="useCaseMore"><WhatsAppIcon size={16} /> Pedir orçamento</span>}
          </>
        );
        return (
          <li key={item.title}>
            {item.interest
              ? <a className="useCaseCard" href={whatsappHref({ service: item.interest })} target="_blank" rel="noreferrer">{body}</a>
              : <div className="useCaseCard">{body}</div>}
          </li>
        );
      })}
    </ul>
  );
}

/** Serviços complementares: com página, leva à seção; sem página, abre o WhatsApp já contextualizado. */
export function ExtraServices() {
  return (
    <ul className="extraServices">
      {extraServices.map((item) => {
        const content = (
          <>
            <span className="extraIcon"><ServiceIcon name={item.icon} size={22} /></span>
            <span className="extraCopy"><strong>{item.title}</strong><small>{item.description}</small></span>
            <ArrowRight className="extraArrow" aria-hidden="true" />
          </>
        );
        return (
          <li key={item.title}>
            {item.href
              ? <Link href={item.href}>{content}</Link>
              : <a href={whatsappHref({ service: item.quoteService })} target="_blank" rel="noreferrer" aria-label={`${item.title}: consultar pelo WhatsApp`}>{content}</a>}
          </li>
        );
      })}
    </ul>
  );
}

export function ClientLogos() {
  return (
    <section className="clientStrip" aria-labelledby="clients-title">
      <div className="shell clientStripInner">
        <p id="clients-title" className="clientStripTitle">Algumas empresas que já receberam nossos serviços</p>
        <ul className="clientLogos">
          {clientCompanies.map((client) => (
            <li key={client.name}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={client.logo} alt={client.name} width="300" height="120" loading="lazy" decoding="async" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
