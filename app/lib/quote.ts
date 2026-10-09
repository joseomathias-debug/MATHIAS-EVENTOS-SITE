import { company } from "../content";

export type QuoteContext = {
  service?: string;
  model?: string;
  quantity?: string;
  date?: string;
  city?: string;
  name?: string;
  location?: string;
  notes?: string;
};

export function quoteHref(service?: string, model?: string) {
  const search = new URLSearchParams();
  if (service) search.set("servico", service);
  if (model) search.set("modelo", model);
  return `/orcamento${search.size ? `?${search.toString()}` : ""}`;
}

// Mensagens curtas por serviço, no tom de quem está pedindo orçamento.
const interestPhrases: Record<string, string> = {
  "Tenda": "Gostaria de solicitar um orçamento para tendas.",
  "Banheiro químico": "Gostaria de orçamento para banheiro químico.",
  "Backdrop": "Gostaria de orçamento para backdrop e estrutura em treliça.",
  "Touro mecânico": "Gostaria de orçamento para o touro mecânico.",
  "Mesas e cadeiras": "Gostaria de orçamento para mesas e cadeiras.",
  "Palco": "Gostaria de orçamento para palco.",
  "Som e iluminação": "Gostaria de orçamento para som e iluminação.",
  "Brinquedos": "Gostaria de orçamento para brinquedos.",
  "Frete e montagem": "Gostaria de saber sobre frete, montagem e desmontagem das estruturas.",
};

function interestLine(service?: string, model?: string) {
  if (!service) return "Vi o site da Mathias Eventos e gostaria de saber mais sobre estruturas para meu evento.";
  if (model) return `Vi o site da Mathias Eventos e gostaria de orçamento para ${service.toLowerCase()} — ${model}.`;
  return interestPhrases[service] ?? `Vi o site da Mathias Eventos e gostaria de saber mais sobre: ${service}.`;
}

/** Link do WhatsApp com mensagem pronta. `number` permite usar o contato do representante. */
export function whatsappHref(context: QuoteContext = {}, number: string = company.whatsappNumber) {
  const details = [
    context.service && `Serviço: ${context.service}`,
    context.model && `Modelo: ${context.model}`,
    context.quantity && `Quantidade: ${context.quantity}`,
    context.date && `Data: ${context.date}`,
    context.city && `Cidade: ${context.city}`,
    context.location && `Local: ${context.location}`,
    context.notes && `Observações: ${context.notes}`,
  ].filter(Boolean);

  // Links rápidos levam só o interesse; o formulário e a orientação levam o pedido completo.
  const hasFormData = Boolean(context.name || context.quantity || context.date || context.city || context.location || context.notes);
  const greeting = context.name ? `Olá, meu nome é ${context.name}.` : "Olá!";
  const message = hasFormData
    ? [greeting, "Vim pelo site da Mathias Eventos e gostaria de solicitar um orçamento.", "", ...details].join("\n")
    : `${greeting} ${interestLine(context.service, context.model)}`;

  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
