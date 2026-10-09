import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { absoluteUrl } from "../lib/seo";
import { StructuredData } from "./StructuredData";

export function Breadcrumbs({ items }: { items: Array<{ label: string; href?: string }> }) {
  const trail = [{ label: "Início", href: "/" }, ...items];
  return (
    <>
      <StructuredData data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: trail.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.label,
          ...(item.href ? { item: absoluteUrl(item.href) } : {}),
        })),
      }} />
      <nav className="breadcrumbs" aria-label="Você está em">
        <ol>
          <li><Link href="/">Início</Link></li>
          {items.map((item) => (
            <li key={item.label}>
              <ChevronRight aria-hidden="true" />
              {item.href ? <Link href={item.href}>{item.label}</Link> : <span aria-current="page">{item.label}</span>}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
