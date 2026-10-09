import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { company, services } from "../content";
import { whatsappHref } from "../lib/quote";
import { Brand } from "./Brand";
import { WhatsAppIcon } from "./WhatsAppIcon";

export function SiteFooter() {
  const rep = company.representative;
  return (
    <footer className="siteFooter">
      <div className="shell footerGrid">
        <div className="footerIntro">
          <Brand inverse />
          <p className="footerTagline">{company.tagline}</p>
          <p>Locação e montagem de tendas, banheiros químicos e estruturas para eventos, empresas, obras e ações públicas.</p>
          <Link className="footerQuote" href="/orcamento">Solicitar orçamento <ArrowRight aria-hidden="true" /></Link>
        </div>

        <div className="footerCol footerContacts">
          <h2>Atendimento</h2>
          <a className="footerContact footerContactMain" href={whatsappHref()} target="_blank" rel="noreferrer">
            <WhatsAppIcon size={22} />
            <span><small>WhatsApp · atendimento principal</small><strong>{company.whatsappDisplay}</strong></span>
          </a>
          <a className="footerContact" href={whatsappHref({}, rep.whatsappNumber)} target="_blank" rel="noreferrer">
            <WhatsAppIcon size={18} />
            <span><small>{rep.label}</small><strong>{rep.whatsappDisplay}</strong></span>
          </a>
          {company.instagramUrl && <a className="footerSocial" href={company.instagramUrl} target="_blank" rel="noreferrer">Instagram</a>}
        </div>

        <nav className="footerCol" aria-label="Serviços">
          <h2>Serviços</h2>
          <ul>
            {services.map((service) => <li key={service.id}><Link href={service.href}>{service.title}</Link></li>)}
            <li><Link href="/tendas#fechamentos">Fechamentos laterais</Link></li>
            <li><Link href="/tendas#sistema-de-calhas">Calhas para tendas</Link></li>
          </ul>
        </nav>

        <nav className="footerCol" aria-label="Institucional">
          <h2>Navegação</h2>
          <ul>
            <li><Link href="/">Início</Link></li>
            <li><Link href="/#portfolio">Portfólio</Link></li>
            <li><Link href="/duvidas">Dúvidas frequentes</Link></li>
            <li><Link href="/orcamento">Solicitar orçamento</Link></li>
            <li><Link href="/contato">Contato</Link></li>
            <li><Link href="/politica-de-privacidade">Política de privacidade</Link></li>
          </ul>
        </nav>

        <div className="footerCol footerRegion">
          <h2>Onde atendemos</h2>
          <p className="footerBase"><MapPin aria-hidden="true" /> Base em {company.baseCity}/SP</p>
          <p className="footerCities">{company.coverage.slice(1).join(" · ")}</p>
          <small>{company.coverageNote}</small>
        </div>
      </div>
      <div className="shell footerBottom">
        <span>© {new Date().getFullYear()} {company.name}. Todos os direitos reservados.</span>
        <span>Valores, disponibilidade e especificações são confirmados no orçamento.</span>
      </div>
    </footer>
  );
}
