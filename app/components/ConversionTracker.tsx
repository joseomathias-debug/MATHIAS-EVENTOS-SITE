"use client";

import { useEffect } from "react";
import { trackConversion } from "../lib/analytics";

/** Um único listener delegado mede cliques de WhatsApp e de orçamento em todo o site. */
export function ConversionTracker() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const link = event.target instanceof Element ? event.target.closest("a") : null;
      if (!link) return;
      const href = link.getAttribute("href") || "";
      const page = window.location.pathname;
      if (href.startsWith("https://wa.me/")) {
        const number = href.slice("https://wa.me/".length).split("?")[0];
        trackConversion("whatsapp_click", { page, number });
      } else if (href.startsWith("/orcamento")) {
        trackConversion("quote_link_click", { page, target: href });
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}
