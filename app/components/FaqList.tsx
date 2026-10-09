import { Plus } from "lucide-react";
import { StructuredData } from "./StructuredData";

export function FaqList({ items, schema = false }: { items: ReadonlyArray<{ question: string; answer: string }>; schema?: boolean }) {
  return (
    <div className="faqList">
      {schema && (
        <StructuredData data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: items.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })),
        }} />
      )}
      {items.map((item, index) => (
        <details className="faqItem" key={item.question} open={index === 0}>
          <summary>{item.question}<span aria-hidden="true"><Plus /></span></summary>
          <div><p>{item.answer}</p></div>
        </details>
      ))}
    </div>
  );
}
