const steps = [
  ["Você conta o que precisa", "Serviço, cidade, data, público e o que já sabe sobre o local."],
  ["Indicamos a estrutura", "Tamanho, modelo e quantidade avaliados para o seu uso."],
  ["Você recebe o orçamento", "Proposta clara, com o que está incluso em cada item."],
  ["Confirmamos a logística", "Data, horário de entrega, acesso e montagem alinhados."],
  ["Montamos e retiramos", "Nossa equipe entrega, monta e desmonta a estrutura contratada."],
] as const;

export function RentalProcess({ compact = false, dark = false }: { compact?: boolean; dark?: boolean }) {
  return (
    <section className={"section rentalProcess" + (compact ? " rentalProcessCompact" : "") + (dark ? " sectionDark" : "")} aria-labelledby="rental-process-title">
      <div className="shell">
        <div className="sectionHeading sectionHeading-split">
          <div>
            <p className="eyebrow">Como funciona</p>
            <h2 id="rental-process-title">Do primeiro contato à desmontagem.</h2>
          </div>
        </div>
        <ol className="rentalProcessGrid">
          {steps.map(([title, description], index) => (
            <li key={title}>
              <span className="stepNumber">{String(index + 1).padStart(2, "0")}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
