import Link from "next/link";
import { BrandImage } from "./BrandImage";

/** `inverse` = fundo escuro (header e rodapé): usa a logo branca oficial. */
export function Brand({ inverse = false, className = "" }: { inverse?: boolean; className?: string }) {
  return (
    <Link className={`brand${inverse ? " brandInverse" : ""} ${className}`.trim()} href="/" aria-label="Mathias Eventos — página inicial">
      <BrandImage className="brandLogo" variant={inverse ? "mono" : "logo"} lazy={false} />
    </Link>
  );
}
