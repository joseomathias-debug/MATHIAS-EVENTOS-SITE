/** Navegação interna fixa da página (âncoras), com rolagem horizontal no mobile. */
export function PageNav({ items }: { items: Array<{ href: string; label: string }> }) {
  return (
    <nav className="pageNav" aria-label="Nesta página">
      <div className="shell">
        <ul>
          {items.map((item) => <li key={item.href}><a href={item.href}>{item.label}</a></li>)}
        </ul>
      </div>
    </nav>
  );
}
