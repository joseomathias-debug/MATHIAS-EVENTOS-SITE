import type { Metadata, Viewport } from "next";
import { ConversionTracker } from "./components/ConversionTracker";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import { StructuredData } from "./components/StructuredData";
import { WhatsAppFloat } from "./components/WhatsAppFloat";
import { company, extraServices, services } from "./content";
import { defaultSocialImage, siteOrigin } from "./lib/seo";
import { brandAssets } from "./brand";
import "./globals.css";

const description = "Locação e montagem de tendas, banheiros químicos e estruturas para eventos, empresas e obras em Santo Antônio de Posse, Campinas, Holambra, Jaguariúna e região.";

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin),
  title: { default: "Mathias Eventos | Tendas e banheiros químicos para eventos", template: "%s | Mathias Eventos" },
  description,
  applicationName: "Mathias Eventos",
  keywords: ["aluguel de tendas", "locação de tendas", "banheiro químico", "aluguel de banheiro químico", "tenda para eventos", "backdrop", "touro mecânico", "mesas e cadeiras", "Santo Antônio de Posse", "Campinas", "Holambra", "Jaguariúna"],
  category: "eventos",
  icons: { ...brandAssets.icons, icon: [...brandAssets.icons.icon] },
  manifest: "/site.webmanifest",
  formatDetection: { telephone: false },
  openGraph: { siteName: "Mathias Eventos", locale: "pt_BR", type: "website", title: "Mathias Eventos | Estrutura certa. Eventos sem improviso.", description, images: [{ ...defaultSocialImage, alt: "Mathias Eventos — tendas, banheiros químicos e estruturas para eventos" }] },
  twitter: { card: "summary_large_image", title: "Mathias Eventos | Estrutura certa. Eventos sem improviso.", description, images: [defaultSocialImage.url] },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#10110E" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": siteOrigin + "/#empresa",
    name: company.name,
    legalName: company.legalName,
    description,
    slogan: company.tagline,
    url: siteOrigin,
    logo: siteOrigin + brandAssets.officialLogo.dark,
    image: siteOrigin + defaultSocialImage.url,
    telephone: "+" + company.whatsappNumber,
    address: {
      "@type": "PostalAddress",
      addressLocality: company.baseCity,
      addressRegion: "SP",
      addressCountry: "BR",
    },
    areaServed: company.coverage.map((name) => ({ "@type": "City", name })),
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        telephone: "+" + company.whatsappNumber,
        availableLanguage: "Portuguese",
        areaServed: "BR",
      },
      {
        "@type": "ContactPoint",
        contactType: "sales",
        name: company.representative.label,
        telephone: "+" + company.representative.whatsappNumber,
        availableLanguage: "Portuguese",
        areaServed: "BR",
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Locação de estruturas para eventos",
      itemListElement: [
        ...services.map((service) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: service.title, url: siteOrigin + service.href } })),
        ...extraServices.filter((item) => !item.href).map((item) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: item.title } })),
      ],
    },
    ...(company.instagramUrl ? { sameAs: [company.instagramUrl] } : {}),
  };
  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: company.name,
    url: siteOrigin,
    inLanguage: "pt-BR",
    publisher: { "@id": siteOrigin + "/#empresa" },
  };

  return (
    <html lang="pt-BR">
      <head>
        <link rel="preload" href="/fonts/manrope/manrope-latin-variable.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </head>
      <body>
        <a className="skipLink" href="#conteudo">Pular para o conteúdo</a>
        <StructuredData data={[localBusiness, website]} />
        <SiteHeader />
        <div id="conteudo">{children}</div>
        <SiteFooter />
        <WhatsAppFloat />
        <ConversionTracker />
      </body>
    </html>
  );
}
