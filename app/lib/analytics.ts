export type QuizAnalyticsEvent =
  | "quiz_started"
  | "quiz_service_selected"
  | "quiz_step_completed"
  | "quiz_completed"
  | "quiz_quote_clicked"
  | "quiz_whatsapp_clicked";

export type ConversionEvent = "whatsapp_click" | "quote_form_submit" | "quote_link_click";

export function trackQuizEvent(event: QuizAnalyticsEvent, detail: Record<string, string | number> = {}) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("mathias:quiz", { detail: { event, ...detail } }));
}

/**
 * Eventos de conversão. Nenhuma ferramenta de terceiros é carregada aqui: o evento fica
 * disponível em `window` (CustomEvent "mathias:conversion" e `dataLayer`, se existir) para
 * ser ligado ao GA/GTM/Pixel quando os IDs e o consentimento forem definidos.
 */
export function trackConversion(event: ConversionEvent, detail: Record<string, string> = {}) {
  if (typeof window === "undefined") return;
  const payload = { event, ...detail };
  window.dispatchEvent(new CustomEvent("mathias:conversion", { detail: payload }));
  const layer = (window as unknown as { dataLayer?: unknown[] }).dataLayer;
  if (Array.isArray(layer)) layer.push(payload);
}
