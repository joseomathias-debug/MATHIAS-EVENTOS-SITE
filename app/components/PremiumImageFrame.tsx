import type { IconName, MediaTone, SiteImage } from "../content";
import { ServiceMedia } from "./ServiceMedia";

export function PremiumImageFrame({
  image,
  label,
  tone,
  icon,
  priority = false,
  className = "",
  slotCode,
  sizes,
  aspectRatio = "4 / 3",
  objectFit = "cover",
}: {
  image?: SiteImage;
  label: string;
  tone: MediaTone;
  icon: IconName;
  priority?: boolean;
  className?: string;
  slotCode?: string;
  sizes?: string;
  aspectRatio?: string;
  objectFit?: "cover" | "contain";
}) {
  return (
    <ServiceMedia
      image={image}
      label={label}
      tone={tone}
      icon={icon}
      priority={priority}
      className={`premiumImageFrame ${className}`.trim()}
      slotCode={slotCode}
      sizes={sizes}
      aspectRatio={aspectRatio}
      objectFit={objectFit}
    />
  );
}
