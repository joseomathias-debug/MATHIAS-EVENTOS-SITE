import { company } from "../content";
import { absoluteUrl, siteOrigin } from "../lib/seo";
import { StructuredData } from "./StructuredData";

/** JSON-LD de Service ligado à empresa. Sem preços, notas ou avaliações. */
export function ServiceSchema({ name, description, path }: { name: string; description: string; path: string }) {
  return (
    <StructuredData data={{
      "@context": "https://schema.org",
      "@type": "Service",
      name,
      description,
      url: absoluteUrl(path),
      provider: { "@id": siteOrigin + "/#empresa" },
      areaServed: company.coverage.map((city) => ({ "@type": "City", name: city })),
    }} />
  );
}
