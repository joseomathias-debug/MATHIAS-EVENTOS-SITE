import Link from "next/link";
import { ArrowDown, ArrowRight, Check } from "lucide-react";
import type { IconName, MediaTone, SiteImage } from "../content";
import { quoteHref, whatsappHref } from "../lib/quote";
import { Breadcrumbs } from "./Breadcrumbs";
import { PremiumImageFrame } from "./PremiumImageFrame";
import { ServiceMedia } from "./ServiceMedia";
import { WhatsAppIcon } from "./WhatsAppIcon";

/** Atalho do hero: chip simples (tamanhos) ou cartão com foto (modelos). */
export type HeroQuickLink = { label: string; detail?: string; href: string; image?: SiteImage; tone?: MediaTone };

export function ServiceHero({
  eyebrow,
  title,
  description,
  service,
  model,
  image,
  icon,
  tone,
  breadcrumbs,
  note,
  slotCode,
  highlights,
  detailsLabel = "Ver opções disponíveis",
  imageFit = "cover",
  quickLinks,
  quickLinksLabel,
}: {
  eyebrow: string;
  title: string;
  description: string;
  service: string;
  model?: string;
  image?: SiteImage;
  icon: IconName;
  tone: MediaTone;
  breadcrumbs: Array<{ label: string; href?: string }>;
  note?: string;
  slotCode?: string;
  highlights?: string[];
  detailsLabel?: string;
  imageFit?: "cover" | "contain";
  quickLinks?: HeroQuickLink[];
  quickLinksLabel?: string;
}) {
  const withPhotos = quickLinks?.some((item) => item.image);
  return (
    <section className={"serviceHero" + (quickLinks ? " serviceHeroRich" : "")}>
      <div className="shell">
        <Breadcrumbs items={breadcrumbs} />
        <div className="serviceHeroGrid">
          <div className="serviceHeroCopy">
            <p className="eyebrow">{eyebrow}</p>
            <h1>{title}</h1>
            <p className="heroLead">{description}</p>
            {highlights && highlights.length > 0 && (
              <ul className="heroHighlights">
                {highlights.map((item) => <li key={item}><Check aria-hidden="true" /> {item}</li>)}
              </ul>
            )}
            <div className="heroActions">
              <Link className="button buttonPrimary buttonLarge" href={quoteHref(service, model)}>Solicitar orçamento <ArrowRight aria-hidden="true" /></Link>
              <a className="button buttonWhatsapp buttonLarge" href={whatsappHref({ service, model })} target="_blank" rel="noreferrer"><WhatsAppIcon /> Orçar pelo WhatsApp</a>
            </div>
            {!quickLinks && <a className="heroDetailsLink" href="#detalhes">{detailsLabel} <ArrowDown aria-hidden="true" /></a>}
            {note && <p className="heroNote">{note}</p>}
          </div>
          <div className="serviceHeroVisual">
            <PremiumImageFrame image={image} label={model || service} tone={tone} icon={icon} priority className={"serviceHeroMedia" + (imageFit === "contain" ? " serviceHeroMediaContain" : "")} slotCode={slotCode} sizes="(max-width: 900px) 92vw, 50vw" aspectRatio="4 / 3" objectFit={imageFit} />
          </div>
        </div>
        {quickLinks && (
          <nav className={"heroQuickLinks" + (withPhotos ? " heroQuickLinksPhotos" : "")} aria-label={quickLinksLabel || detailsLabel}>
            {quickLinksLabel && <p>{quickLinksLabel}</p>}
            <ul>
              {quickLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>
                    {item.image && <ServiceMedia image={item.image} label={item.label} tone={item.tone || tone} icon={icon} className="heroQuickMedia" sizes="96px" aspectRatio="1 / 1" />}
                    <span><strong>{item.label}</strong>{item.detail && <small>{item.detail}</small>}</span>
                    <ArrowRight className="heroQuickArrow" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </section>
  );
}
