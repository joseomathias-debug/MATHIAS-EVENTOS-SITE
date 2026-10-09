import {
  Accessibility,
  Armchair,
  BadgeCheck,
  Building2,
  CalendarDays,
  Clock3,
  Droplets,
  FerrisWheel,
  Frame,
  HardHat,
  Heart,
  Landmark,
  Layers3,
  MapPin,
  MessageCircle,
  PanelsTopLeft,
  PartyPopper,
  Ruler,
  ShieldCheck,
  Sparkles,
  Speaker,
  Theater,
  Truck,
  Users,
  Wrench,
} from "lucide-react";
import type { IconName } from "../content";

type IconProps = { size?: number; strokeWidth?: number; "aria-hidden"?: boolean | "true" | "false"; focusable?: boolean | "true" | "false" };

/** Tenda piramidal quadrada em 3/4, como as da Mathias: duas faces da cobertura, 4 pés nos cantos, sem poste central. */
function TentIcon({ size, strokeWidth }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" className="serviceIconCustom">
      <path d="M12 3.5 15 11H2Z" fill="currentColor" fillOpacity=".22" stroke="none" />
      <path d="M12 3.5 2 11h20Z" />
      <path d="M12 3.5 15 11" />
      <path d="M8.5 11v7" opacity=".45" />
      <path d="M3 11v9M15 11v9M21 11v7.5" />
      <path d="M2 20h2M14 20h2M20.25 18.5h1.5" />
    </svg>
  );
}

/** Banheiro químico portátil: cabine de teto arredondado, porta, respiro e base. */
function PortableToiletIcon({ size, strokeWidth }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" className="serviceIconCustom">
      <path d="M6 20.5V7c0-2.2 2.7-3.5 6-3.5s6 1.3 6 3.5v13.5" />
      <path d="M5.5 7.5h13" />
      <path d="M8.5 10.5h7v10h-7Z" />
      <path d="M13.5 15v1.5" />
      <path d="M10.5 5.5h3" opacity=".7" />
      <path d="M4.5 20.5h15" />
    </svg>
  );
}

const icons = {
  toilet: PortableToiletIcon,
  tent: TentIcon,
  armchair: Armchair,
  backdrop: Frame,
  party: PartyPopper,
  layers: Layers3,
  "map-pin": MapPin,
  "shield-check": ShieldCheck,
  sparkles: Sparkles,
  calendar: CalendarDays,
  message: MessageCircle,
  truck: Truck,
  stage: Theater,
  speaker: Speaker,
  ferris: FerrisWheel,
  panel: PanelsTopLeft,
  droplets: Droplets,
  clock: Clock3,
  wrench: Wrench,
  badge: BadgeCheck,
  users: Users,
  building: Building2,
  hardhat: HardHat,
  landmark: Landmark,
  accessibility: Accessibility,
  ruler: Ruler,
  heart: Heart,
};

/** Traço único para todos os ícones de serviço (Lucide e próprios). */
export function ServiceIcon({ name, size = 24 }: { name: IconName; size?: number }) {
  const Icon = icons[name];
  return <Icon size={size} strokeWidth={1.75} aria-hidden="true" focusable="false" />;
}
