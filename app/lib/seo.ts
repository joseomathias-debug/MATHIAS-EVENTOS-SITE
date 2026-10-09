import type { Metadata } from "next";

export const siteOrigin = process.env.NEXT_PUBLIC_SITE_URL || "https://mathias-eventos.joseomathias.chatgpt.site";

export const defaultSocialImage = { url: "/og.jpg", width: 1200, height: 630 } as const;

export function absoluteUrl(path: string) {
  return siteOrigin + (path === "/" ? "" : path);
}

export function pageMetadata(title: string, description: string, path: string, image?: string, options: { absoluteTitle?: boolean } = {}): Metadata {
  const socialImage = image || defaultSocialImage.url;
  const socialTitle = options.absoluteTitle ? title : title + " | Mathias Eventos";

  return {
    title: options.absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    robots: { index: true, follow: true },
    openGraph: {
      title: socialTitle,
      description,
      url: path,
      type: "website",
      siteName: "Mathias Eventos",
      locale: "pt_BR",
      images: [image ? { url: socialImage, alt: title + " — Mathias Eventos" } : { ...defaultSocialImage, alt: "Mathias Eventos — tendas, banheiros químicos e estruturas para eventos" }],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [socialImage],
    },
  };
}
