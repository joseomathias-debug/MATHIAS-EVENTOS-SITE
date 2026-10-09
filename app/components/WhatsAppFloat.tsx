"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { bathroomModels, services } from "../content";
import { quoteHref, whatsappHref } from "../lib/quote";
import { WhatsAppIcon } from "./WhatsAppIcon";

// A mensagem acompanha a página: quem está em Tendas já chega falando de tendas.
function contextFor(pathname: string) {
  const model = bathroomModels.find((item) => pathname === `/banheiros-quimicos/${item.slug}`);
  if (model) return { service: "Banheiro químico", model: model.shortName };
  const service = services.find((item) => pathname === item.href || pathname.startsWith(item.href + "/"));
  return service ? { service: service.quoteService } : {};
}

/**
 * Desktop: botão redondo de WhatsApp sempre visível.
 * Mobile: barra fixa com WhatsApp + orçamento, exibida depois do hero (o hero já tem os CTAs).
 * O body recebe espaço inferior equivalente para a barra nunca cobrir conteúdo.
 */
export function WhatsAppFloat() {
  const pathname = usePathname() || "/";
  const context = contextFor(pathname);
  const onQuotePage = pathname === "/orcamento";
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 280);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <>
      <a className="whatsappFloat isVisible" href={whatsappHref(context)} target="_blank" rel="noreferrer" aria-label="Solicitar orçamento pelo WhatsApp">
        <WhatsAppIcon size={28} />
        <span className="whatsappFloatLabel">Orçamento pelo WhatsApp</span>
      </a>
      <div className={`mobileActionBar${scrolled ? " isVisible" : ""}`} aria-hidden={!scrolled} inert={!scrolled ? true : undefined}>
        <a className="mobileActionWhatsapp" href={whatsappHref(context)} target="_blank" rel="noreferrer"><WhatsAppIcon size={20} /> WhatsApp</a>
        {!onQuotePage && <Link className="mobileActionQuote" href={quoteHref(context.service, context.model)}>Pedir orçamento <ArrowRight aria-hidden="true" /></Link>}
      </div>
    </>
  );
}
