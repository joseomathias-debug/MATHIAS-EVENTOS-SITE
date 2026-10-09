export function SectionHeading({ eyebrow, title, description, light = false, id, align = "split" }: {
  eyebrow: string;
  title: string;
  description?: string;
  light?: boolean;
  id?: string;
  align?: "split" | "center" | "stack";
}) {
  return (
    <div className={`sectionHeading sectionHeading-${align}${light ? " sectionHeadingLight" : ""}`}>
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2 id={id}>{title}</h2>
      </div>
      {description && <p>{description}</p>}
    </div>
  );
}
