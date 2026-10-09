"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { quoteHref } from "../lib/quote";
import styles from "./TentCapacityAccordion.module.css";

const capacityGroups = [
  { size: "3×3", area: "9 m²", configurations: [
    { asset: "3x3/tenda-3x3-auditorio-clean.png", title: "Auditório / cadeiras", quantity: "15 cadeiras", capacity: "15 pessoas", dimension: "fileiras organizadas", alt: "Tenda 3x3 com configuração de 15 cadeiras" },
    { asset: "3x3/tenda-3x3-mesas-quadradas-clean.png", title: "Mesas quadradas", quantity: "04 mesas", capacity: "16 pessoas", dimension: "0,70 m × 0,70 m", alt: "Tenda 3x3 com mesas quadradas e cadeiras" },
    { asset: "3x3/tenda-3x3-mesa-redonda-clean.png", title: "Mesas redondas", quantity: "01 mesa", capacity: "de 06 a 10 pessoas", dimension: "até Ø 1,80 m", alt: "Tenda 3x3 com mesa redonda e cadeiras" },
    { asset: "3x3/tenda-3x3-mesas-retangulares-clean.png", title: "Mesas retangulares", quantity: "02 mesas", capacity: "8 pessoas", dimension: "1,20 m × 0,70 m", alt: "Tenda 3x3 com mesas retangulares e cadeiras" },
  ]},
  { size: "4×4", area: "16 m²", configurations: [
    { asset: "4x4/tenda-4x4-auditorio-clean.png", title: "Auditório / cadeiras", quantity: "28 cadeiras", capacity: "28 pessoas", dimension: "fileiras organizadas", alt: "Tenda 4x4 com configuração de 28 cadeiras" },
    { asset: "4x4/tenda-4x4-mesas-quadradas-clean.png", title: "Mesas quadradas", quantity: "05 mesas", capacity: "20 pessoas", dimension: "0,70 m × 0,70 m", alt: "Tenda 4x4 com mesas quadradas e cadeiras" },
    { asset: "4x4/tenda-4x4-mesas-redondas-clean.png", title: "Mesas redondas", quantity: "02 mesas", capacity: "12 pessoas", dimension: "até Ø 1,40 m", alt: "Tenda 4x4 com mesas redondas e cadeiras" },
    { asset: "4x4/tenda-4x4-mesas-retangulares-clean.png", title: "Mesas retangulares", quantity: "06 mesas", capacity: "24 pessoas", dimension: "1,20 m × 0,70 m", alt: "Tenda 4x4 com mesas retangulares e cadeiras" },
  ]},
  { size: "5×5", area: "25 m²", configurations: [
    { asset: "5x5/tenda-5x5-auditorio-clean.png", title: "Auditório / cadeiras", quantity: "45 cadeiras", capacity: "45 pessoas", dimension: "fileiras organizadas", alt: "Tenda 5x5 com configuração de 45 cadeiras" },
    { asset: "5x5/tenda-5x5-mesas-quadradas-clean.png", title: "Mesas quadradas", quantity: "09 mesas", capacity: "36 pessoas", dimension: "0,70 m × 0,70 m", alt: "Tenda 5x5 com mesas quadradas e cadeiras" },
    { asset: "5x5/tenda-5x5-mesas-redondas-clean.png", title: "Mesas redondas", quantity: "04 mesas", capacity: "24 pessoas", dimension: "até Ø 1,40 m", alt: "Tenda 5x5 com mesas redondas e cadeiras" },
    { asset: "5x5/tenda-5x5-mesas-retangulares-clean.png", title: "Mesas retangulares", quantity: "08 mesas", capacity: "32 pessoas", dimension: "1,20 m × 0,70 m", alt: "Tenda 5x5 com mesas retangulares e cadeiras" },
  ]},
  { size: "6×6", area: "36 m²", configurations: [
    { asset: "6x6/tenda-6x6-auditorio-clean.png", title: "Auditório / cadeiras", quantity: "66 cadeiras", capacity: "66 pessoas", dimension: "fileiras organizadas", alt: "Tenda 6x6 com configuração de 66 cadeiras" },
    { asset: "6x6/tenda-6x6-mesas-quadradas-clean.png", title: "Mesas quadradas", quantity: "12 mesas", capacity: "48 pessoas", dimension: "0,70 m × 0,70 m", alt: "Tenda 6x6 com mesas quadradas e cadeiras" },
    { asset: "6x6/tenda-6x6-mesas-redondas-clean.png", title: "Mesas redondas", quantity: "04 mesas", capacity: "24 pessoas", dimension: "até Ø 1,40 m", alt: "Tenda 6x6 com mesas redondas e cadeiras" },
    { asset: "6x6/tenda-6x6-mesas-retangulares-clean.png", title: "Mesas retangulares", quantity: "12 mesas", capacity: "48 pessoas", dimension: "1,20 m × 0,70 m", alt: "Tenda 6x6 com mesas retangulares e cadeiras" },
  ]},
  { size: "7×7", area: "49 m²", configurations: [
    { asset: "7x7/tenda-7x7-auditorio-clean.png", title: "Auditório / cadeiras", quantity: "90 cadeiras", capacity: "90 pessoas", dimension: "fileiras organizadas", alt: "Tenda 7x7 com configuração de 90 cadeiras" },
    { asset: "7x7/tenda-7x7-mesas-quadradas-clean.png", title: "Mesas quadradas", quantity: "16 mesas", capacity: "64 pessoas", dimension: "0,70 m × 0,70 m", alt: "Tenda 7x7 com mesas quadradas e cadeiras" },
    { asset: "7x7/tenda-7x7-mesas-redondas-clean.png", title: "Mesas redondas", quantity: "06 mesas", capacity: "36 pessoas", dimension: "até Ø 1,40 m", alt: "Tenda 7x7 com mesas redondas e cadeiras" },
    { asset: "7x7/tenda-7x7-mesas-retangulares-clean.png", title: "Mesas retangulares", quantity: "16 mesas", capacity: "64 pessoas", dimension: "1,20 m × 0,70 m", alt: "Tenda 7x7 com mesas retangulares e cadeiras" },
  ]},
  { size: "8×8", area: "64 m²", configurations: [
    { asset: "8x8/tenda-8x8-auditorio-clean.png", title: "Auditório / cadeiras", quantity: "120 cadeiras", capacity: "120 pessoas", dimension: "fileiras organizadas", alt: "Tenda 8x8 com configuração de 120 cadeiras" },
    { asset: "8x8/tenda-8x8-mesas-quadradas-clean.png", title: "Mesas quadradas", quantity: "20 mesas", capacity: "80 pessoas", dimension: "0,70 m × 0,70 m", alt: "Tenda 8x8 com mesas quadradas e cadeiras" },
    { asset: "8x8/tenda-8x8-mesas-redondas-clean.png", title: "Mesas redondas", quantity: "09 mesas", capacity: "54 pessoas", dimension: "até Ø 1,40 m", alt: "Tenda 8x8 com mesas redondas e cadeiras" },
    { asset: "8x8/tenda-8x8-mesas-retangulares-clean.png", title: "Mesas retangulares", quantity: "20 mesas", capacity: "80 pessoas", dimension: "1,20 m × 0,70 m", alt: "Tenda 8x8 com mesas retangulares e cadeiras" },
  ]},
  { size: "10×10", area: "100 m²", configurations: [
    { asset: "10x10/tenda-10x10-auditorio-clean.png", title: "Auditório / cadeiras", quantity: "180 cadeiras", capacity: "180 pessoas", dimension: "fileiras organizadas", alt: "Tenda 10x10 com configuração de 180 cadeiras" },
    { asset: "10x10/tenda-10x10-mesas-quadradas-clean.png", title: "Mesas quadradas", quantity: "32 mesas", capacity: "128 pessoas", dimension: "0,70 m × 0,70 m", alt: "Tenda 10x10 com mesas quadradas e cadeiras" },
    { asset: "10x10/tenda-10x10-mesas-redondas-clean.png", title: "Mesas redondas", quantity: "14 mesas", capacity: "84 pessoas", dimension: "até Ø 1,40 m", alt: "Tenda 10x10 com mesas redondas e cadeiras" },
    { asset: "10x10/tenda-10x10-mesas-retangulares-clean.png", title: "Mesas retangulares", quantity: "32 mesas", capacity: "128 pessoas", dimension: "1,20 m × 0,70 m", alt: "Tenda 10x10 com mesas retangulares e cadeiras" },
  ]},
] as const;

const layoutLabels = ["Auditório", "Mesas quadradas", "Mesas redondas", "Mesas retangulares"] as const;

function CapacityThumb({ asset, alt }: { asset: string; alt: string }) {
  const pngSrc = `/assets/tendas/finais/${asset}`;
  return (
    <div className={styles.visual}>
      <picture>
        <source srcSet={pngSrc.replace(/\.png$/i, ".webp")} type="image/webp" />
        <img src={pngSrc} alt={alt} width={1448} height={1086} loading="lazy" decoding="async" />
      </picture>
    </div>
  );
}

/** Seletor de tamanho + quatro cartões compactos (um por disposição). Capacidades reais, sem cálculo próprio. */
export function TentCapacityAccordion() {
  const [sizeIndex, setSizeIndex] = useState(0);
  const group = capacityGroups[sizeIndex];

  return (
    <div className={styles.explorer}>
      <div className={styles.sizeBar} role="group" aria-label="Tamanho da tenda">
        {capacityGroups.map((tent, index) => (
          <button type="button" key={tent.size} aria-pressed={sizeIndex === index}
            aria-controls="tent-capacity-view" onClick={() => setSizeIndex(index)}>
            <strong>{tent.size}</strong><small>{tent.area}</small>
          </button>
        ))}
      </div>
      <section className={styles.panel} id="tent-capacity-view" aria-labelledby="tent-selected-size" aria-live="polite">
        <div className={styles.panelHeading}>
          <h3 id="tent-selected-size">Tenda {group.size} <span>· {group.area} de cobertura</span></h3>
          <Link className={styles.quote} href={quoteHref("Tenda", group.size)}>Orçar {group.size} <ArrowRight aria-hidden="true" /></Link>
        </div>
        <ul className={styles.cards} key={group.size}>
          {group.configurations.map((configuration, index) => (
            <li key={configuration.asset}>
              <CapacityThumb asset={configuration.asset} alt={configuration.alt} />
              <div className={styles.cardBody}>
                <span className={styles.layout}>{layoutLabels[index]}</span>
                <strong>{configuration.capacity}</strong>
                <small>{configuration.quantity}{index > 0 ? ` · ${configuration.dimension}` : ""}</small>
              </div>
            </li>
          ))}
        </ul>
        <p className={styles.note}>Capacidades aproximadas. Variam conforme mesas, cadeiras, circulação, tipo de evento e configuração do espaço.</p>
      </section>
    </div>
  );
}
