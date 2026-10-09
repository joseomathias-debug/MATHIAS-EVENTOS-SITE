"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import { company, services } from "../content";
import { whatsappHref } from "../lib/quote";
import { Brand } from "./Brand";
import { ServiceIcon } from "./ServiceIcon";
import { WhatsAppIcon } from "./WhatsAppIcon";

const mainLinks = [
  { href: "/tendas", label: "Tendas" },
  { href: "/banheiros-quimicos", label: "Banheiros químicos" },
  { href: "/#portfolio", label: "Portfólio" },
  { href: "/duvidas", label: "Dúvidas" },
  { href: "/contato", label: "Contato" },
];

function isActive(pathname: string, href: string) {
  if (href.startsWith("/#")) return false;
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");
}

export function SiteHeader() {
  const header = useRef<HTMLElement>(null);
  const pathname = usePathname() || "/";

  const closeAll = () => header.current?.querySelectorAll("details[open]").forEach((node) => node.removeAttribute("open"));

  useEffect(() => {
    const closeOutside = (event: PointerEvent) => {
      if (event.target instanceof Node && !header.current?.contains(event.target)) closeAll();
    };
    document.addEventListener("pointerdown", closeOutside);
    return () => document.removeEventListener("pointerdown", closeOutside);
  }, []);

  useEffect(() => { closeAll(); }, [pathname]);

  const servicesActive = !mainLinks.some((link) => isActive(pathname, link.href)) && services.some((service) => isActive(pathname, service.href));

  return (
    <header className="siteHeader" ref={header} onClick={(event) => {
      if (event.target instanceof Element && event.target.closest("a")) closeAll();
    }} onKeyDown={(event) => {
      if (event.key === "Escape") {
        const open = header.current?.querySelector<HTMLDetailsElement>("details[open]");
        open?.removeAttribute("open");
        open?.querySelector("summary")?.focus();
      }
    }}>
      <div className="shell headerBar">
        <Brand inverse />

        <nav className="headerNav" aria-label="Navegação principal">
          <Link href="/" aria-current={pathname === "/" ? "page" : undefined}>Início</Link>
          <details className="navServices">
            <summary className={servicesActive ? "isActive" : undefined}>Serviços <ChevronDown aria-hidden="true" /></summary>
            <div className="navMega">
              <ul className="navMegaGrid">
                {services.map((service) => (
                  <li key={service.id}>
                    <Link href={service.href} aria-current={isActive(pathname, service.href) ? "page" : undefined}>
                      <span className="navMegaIcon"><ServiceIcon name={service.icon} size={22} /></span>
                      <span><strong>{service.title}</strong><small>{service.shortDescription}</small></span>
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="navMegaFooter">
                <span>Também: fechamentos laterais, calhas, palcos, som, iluminação, brinquedos, frete e montagem.</span>
                <Link href="/orcamento">Montar orçamento <ArrowRight aria-hidden="true" /></Link>
              </div>
            </div>
          </details>
          {mainLinks.map((link) => (
            <Link href={link.href} key={link.href} aria-current={isActive(pathname, link.href) ? "page" : undefined}>{link.label}</Link>
          ))}
        </nav>

        <div className="headerActions">
          <a className="headerWhatsapp" href={whatsappHref()} target="_blank" rel="noreferrer" aria-label={`Falar no WhatsApp ${company.whatsappDisplay}`}>
            <WhatsAppIcon size={20} />
            <span className="headerWhatsappNumber" aria-hidden="true">{company.whatsappDisplay}</span>
          </a>
          <Link className="button buttonPrimary headerQuote" href="/orcamento" aria-label="Solicitar orçamento"><span className="labelLong" aria-hidden="true">Solicitar orçamento</span><span className="labelShort" aria-hidden="true">Orçamento</span></Link>
          <details className="mobileMenu">
            <summary aria-label="Abrir menu"><Menu className="iconOpen" aria-hidden="true" /><X className="iconClose" aria-hidden="true" /></summary>
            <div className="mobilePanel">
              <nav aria-label="Navegação móvel">
                <ul className="mobileLinks">
                  <li><Link href="/" aria-current={pathname === "/" ? "page" : undefined}>Início</Link></li>
                  {mainLinks.map((link) => (
                    <li key={link.href}><Link href={link.href} aria-current={isActive(pathname, link.href) ? "page" : undefined}>{link.label}</Link></li>
                  ))}
                </ul>
                <p className="mobileLabel">Serviços</p>
                <ul className="mobileServices">
                  {services.map((service) => (
                    <li key={service.id}>
                      <Link href={service.href} aria-current={isActive(pathname, service.href) ? "page" : undefined}>
                        <ServiceIcon name={service.icon} size={20} />
                        <span>{service.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="mobileActions">
                <Link className="button buttonPrimary" href="/orcamento">Solicitar orçamento</Link>
                <a className="button buttonWhatsapp" href={whatsappHref()} target="_blank" rel="noreferrer"><WhatsAppIcon /> WhatsApp {company.whatsappDisplay}</a>
                <a className="mobileRep" href={whatsappHref({}, company.representative.whatsappNumber)} target="_blank" rel="noreferrer">{company.representative.label}: {company.representative.whatsappDisplay}</a>
              </div>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}
