import type { MetadataRoute } from "next";
import { bathroomModels } from "./content";
import { siteOrigin } from "./lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/banheiros-quimicos",
    "/tendas",
    "/backdrop",
    "/touro-mecanico",
    "/mesas-e-cadeiras",
    "/duvidas",
    "/orcamento",
    "/contato",
    "/politica-de-privacidade",
    ...bathroomModels.map((model) => "/banheiros-quimicos/" + model.slug),
  ];

  return routes.map((route) => ({
    url: siteOrigin + route,
    lastModified: new Date("2026-10-08"),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route.includes("politica") ? 0.3 : 0.8,
  }));
}
