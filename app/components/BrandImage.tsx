import type { CSSProperties } from "react";
import { brandAssets } from "../brand";

/** Renderiza os SVGs oficiais sem alteração. `inverse` = fundo escuro. */
export function BrandImage({ inverse = false, variant = "logo", className, style, lazy = true }: {
  inverse?: boolean;
  variant?: "logo" | "symbol" | "mono";
  className?: string;
  style?: CSSProperties;
  lazy?: boolean;
}) {
  const logo = brandAssets.officialLogo;
  const symbol = brandAssets.officialSymbol;
  const asset = variant === "symbol"
    ? { src: symbol.src, alt: symbol.alt, width: symbol.width, height: symbol.height }
    : { src: variant === "mono" ? logo.mono : inverse ? logo.light : logo.dark, alt: logo.alt, width: logo.width, height: logo.height };
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={asset.src} alt={asset.alt} width={asset.width} height={asset.height} className={className} style={style} loading={lazy ? "lazy" : "eager"} decoding="async" />
  );
}
