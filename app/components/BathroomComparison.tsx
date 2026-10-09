import Link from "next/link";
import { Check, Minus } from "lucide-react";
import { quoteHref } from "../lib/quote";

type Value = boolean | string;

const rows: Array<{ label: string; values: [Value, Value, Value] }> = [
  { label: "Indicação", values: ["Uso geral", "Acessibilidade", "Mais conforto"] },
  { label: "Espaço interno ampliado", values: [false, true, false] },
  { label: "Lavatório interno", values: [false, false, true] },
  { label: "Sabonete líquido", values: [false, false, true] },
  { label: "Sistema de descarga", values: [false, false, true] },
  { label: "Mictório para uso em pé", values: [false, false, true] },
  { label: "Entregue higienizado", values: [true, true, true] },
];

const models = [
  { name: "STD", slug: "std", quote: "STD" },
  { name: "PCD/PNE", slug: "pcd", quote: "PCD/PNE" },
  { name: "Super Luxo", slug: "super-luxo", quote: "Super Luxo" },
] as const;

export function BathroomComparison() {
  return (
    <div className="comparisonWrap">
      <div className="comparisonScroll" tabIndex={0} role="region" aria-label="Tabela comparativa dos modelos">
        <table className="comparisonTable">
          <caption className="srOnly">Comparação dos modelos de banheiro químico</caption>
          <thead>
            <tr>
              <th scope="col">Recurso</th>
              {models.map((model) => <th scope="col" key={model.slug}><Link href={`/banheiros-quimicos/${model.slug}`}>{model.name}</Link></th>)}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label}>
                <th scope="row">{row.label}</th>
                {row.values.map((value, index) => (
                  <td key={models[index].slug}>
                    {typeof value === "string"
                      ? <span className="comparisonText">{value}</span>
                      : value
                        ? <span className="comparisonYes"><Check aria-hidden="true" /><span className="srOnly">Sim</span></span>
                        : <span className="comparisonNo"><Minus aria-hidden="true" /><span className="srOnly">Não</span></span>}
                  </td>
                ))}
              </tr>
            ))}
            <tr>
              <th scope="row">Medidas</th>
              <td colSpan={3}>Confirmadas no orçamento, conforme o local</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="comparisonActions">
        {models.map((model) => <Link className="button buttonOutline" href={quoteHref("Banheiro químico", model.quote)} key={model.slug}>Orçar {model.name}</Link>)}
      </div>
    </div>
  );
}
