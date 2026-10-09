"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Expand, X } from "lucide-react";
import { projects, projectCategories, type ProjectCategory } from "../data/projects";
import { ServiceMedia } from "./ServiceMedia";
import styles from "./PortfolioSection.module.css";

// Mostra a vitrine principal primeiro; o restante abre sob demanda (página mais curta no celular).
const INITIAL_COUNT = 7;

export function PortfolioSection() {
  const [active, setActive] = useState<"Todos" | ProjectCategory>("Todos");
  const [expanded, setExpanded] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const filters = ["Todos" as const, ...projectCategories.filter(category => projects.some(project => project.category === category || project.categories?.includes(category)))];
  const visible = active === "Todos" ? projects : projects.filter(project => project.category === active || project.categories?.includes(active));
  const selectedIndex = visible.findIndex(project => project.id === selectedId);
  const selected = visible[selectedIndex];
  useEffect(() => {
    if (!selectedId) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, [selectedId]);
  const move = (offset: number) => setSelectedId(visible[(selectedIndex + offset + visible.length) % visible.length].id);
  const open = (id: string) => { setSelectedId(id); dialog.current?.showModal(); };

  return (
    <section className={"section portfolioSection " + styles.section} aria-labelledby="portfolio-title" id="portfolio">
      <div className="shell">
        <div className="sectionHeading sectionHeading-split">
          <div><p className="eyebrow">Portfólio</p><h2 id="portfolio-title">Estruturas reais, montadas pela nossa equipe.</h2></div>
          <p>Fotos dos nossos equipamentos e de atendimentos realizados. Filtre por tipo e toque na imagem para ampliar.</p>
        </div>
        <div className="portfolioFilters" role="group" aria-label="Filtrar portfólio">
          {filters.map(filter => <button key={filter} type="button" aria-pressed={active === filter} onClick={() => { setActive(filter); setExpanded(false); }}>{filter}</button>)}
        </div>
        <p className="srOnly" role="status">{visible.length} imagens no portfólio.</p>
        <div className="portfolioGrid">
          {(expanded ? visible : visible.slice(0, INITIAL_COUNT)).map(project => (
            <article className={"portfolioCard" + (project.featured && active === "Todos" ? " portfolioCardFeatured" : "")} key={project.id}>
              <button type="button" className={styles.openPhoto} onClick={() => open(project.id)} aria-label={"Ampliar: " + project.title} aria-haspopup="dialog">
                <ServiceMedia image={project.image} label={project.title} tone={project.tone} icon={project.icon} className="portfolioMedia" sizes={project.featured ? "(max-width: 700px) 92vw, 65vw" : "(max-width: 700px) 92vw, (max-width: 1100px) 45vw, 31vw"} aspectRatio="4 / 3" />
                <span className={styles.expand}><Expand size={18} aria-hidden="true" /><span>Ampliar</span></span>
              </button>
              <div className="portfolioCardBody"><span>{project.category}</span><h3>{project.title}</h3>{project.client && <p>Atendimento para a {project.client}</p>}</div>
            </article>
          ))}
        </div>
        {!expanded && visible.length > INITIAL_COUNT && (
          <div className={styles.more}>
            <button type="button" className="button buttonOutline" onClick={() => setExpanded(true)}>Ver mais fotos ({visible.length - INITIAL_COUNT})</button>
          </div>
        )}
      </div>
      <dialog ref={dialog} className={styles.dialog} aria-labelledby="portfolio-photo-title" onClose={() => setSelectedId(null)}
        onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }}
        onKeyDown={event => {
          if (event.key === "ArrowRight") { event.preventDefault(); move(1); }
          if (event.key === "ArrowLeft") { event.preventDefault(); move(-1); }
        }}>
        {selected && <div className={styles.modal}>
          <div className={styles.toolbar}><p aria-live="polite">{selectedIndex + 1} / {visible.length}<span>{selected.category}</span></p><button type="button" aria-label="Fechar fotografia" onClick={() => dialog.current?.close()} autoFocus><X aria-hidden="true" /></button></div>
          <figure className={styles.figure}
            onTouchStart={event => { const touch = event.touches[0]; touchStart.current = { x: touch.clientX, y: touch.clientY }; }}
            onTouchEnd={event => {
              if (!touchStart.current) return;
              const touch = event.changedTouches[0];
              const dx = touch.clientX - touchStart.current.x, dy = touch.clientY - touchStart.current.y;
              if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) move(dx < 0 ? 1 : -1);
              touchStart.current = null;
            }}
            onTouchCancel={() => { touchStart.current = null; }}>
            <ServiceMedia image={selected.image} label={selected.title} tone={selected.tone} icon={selected.icon} objectFit="contain" sizes="(max-width: 760px) 96vw, 90vw" className={styles.modalPhoto} />
            <figcaption><div><h3 id="portfolio-photo-title">{selected.title}</h3><p>{selected.description}</p></div>{selected.equipment && <span>{selected.equipment}</span>}</figcaption>
          </figure>
          <div className={styles.controls}>
            <button type="button" onClick={() => move(-1)} aria-label="Fotografia anterior"><ArrowLeft aria-hidden="true" /><span>Anterior</span></button>
            <span className={styles.hint}>Deslize ou use as setas</span>
            <button type="button" onClick={() => move(1)} aria-label="Próxima fotografia"><span>Próxima</span><ArrowRight aria-hidden="true" /></button>
          </div>
        </div>}
      </dialog>
    </section>
  );
}
