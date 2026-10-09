import type { CSSProperties } from "react";
import type { IconName, MediaTone, SiteImage } from "../content";
import { ServiceIcon } from "./ServiceIcon";

export function ServiceMedia({
  image,
  label,
  tone,
  icon,
  slotCode,
  priority = false,
  className = "",
  sizes = "(max-width: 700px) 92vw, (max-width: 1100px) 46vw, 25vw",
  aspectRatio,
  objectFit = "cover",
}: {
  image?: SiteImage;
  label: string;
  tone: MediaTone;
  icon: IconName;
  slotCode?: string;
  priority?: boolean;
  className?: string;
  sizes?: string;
  aspectRatio?: string;
  objectFit?: "cover" | "contain";
}) {
  const variants = image?.variants ?? [];
  const srcSet = (format: "avif" | "webp" | "fallback") => variants.map((variant) => `${variant[format]} ${variant.width}w`).join(", ");
  const mediaStyle = {
    "--media-placeholder": image?.placeholder ? `url(${image.placeholder})` : undefined,
    "--media-aspect": aspectRatio,
    "--media-fit": objectFit,
  } as CSSProperties;

  return (
    <span className={`serviceMedia mediaTone-${tone} ${className}`.trim()} style={mediaStyle} data-photo-slot={slotCode}>
      {image?.src ? (
        <picture>
          {variants.length > 0 && <source type="image/avif" srcSet={srcSet("avif")} sizes={sizes} />}
          {variants.length > 0 && <source type="image/webp" srcSet={srcSet("webp")} sizes={sizes} />}
          <img src={image.src} srcSet={variants.length > 0 ? srcSet("fallback") : undefined} alt={image.alt} width={image.width ?? 960} height={image.height ?? 640} loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : "auto"} decoding="async" sizes={sizes} style={{ objectPosition: image.position ?? "center" }} />
        </picture>
      ) : (
        <span className="mediaFallback" role="img" aria-label={`${label} — consulte disponibilidade`}>
          <span className="mediaFallbackGrid" aria-hidden="true" />
          <ServiceIcon name={icon} size={56} />
          <span>{label}</span>
          <small>Consulte disponibilidade</small>
        </span>
      )}
    </span>
  );
}
