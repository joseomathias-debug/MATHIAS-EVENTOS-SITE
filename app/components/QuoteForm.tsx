"use client";

import { useState } from "react";
import { quoteServiceOptions } from "../content";
import { trackConversion } from "../lib/analytics";
import { whatsappHref } from "../lib/quote";
import { WhatsAppIcon } from "./WhatsAppIcon";

type FormState = { name: string; whatsapp: string; service: string; model: string; quantity: string; date: string; city: string; location: string; notes: string };
type InitialQuote = Partial<Pick<FormState, "service" | "model" | "quantity" | "date" | "city" | "notes">>;
type Errors = Partial<Record<"name" | "whatsapp" | "service" | "city" | "consent", string>>;

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits.length ? `(${digits}` : "";
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

export function QuoteForm({ initial = {} }: { initial?: InitialQuote }) {
  const initialService = initial.service || "";
  const options: string[] = [...quoteServiceOptions];
  if (initialService && !options.includes(initialService)) options.unshift(initialService);

  const [form, setForm] = useState<FormState>({
    name: "", whatsapp: "", service: initialService, model: initial.model || "", quantity: initial.quantity || "",
    date: initial.date || "", city: initial.city || "", location: "", notes: initial.notes || "",
  });
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);

  function update(name: keyof FormState, value: string) {
    setForm((current) => ({ ...current, [name]: name === "whatsapp" ? formatPhone(value) : value }));
    if (errors[name as keyof Errors]) setErrors((current) => ({ ...current, [name]: undefined }));
  }

  function validate(): Errors {
    const next: Errors = {};
    if (form.name.trim().length < 2) next.name = "Informe seu nome.";
    if (form.whatsapp.replace(/\D/g, "").length < 10) next.whatsapp = "Informe um WhatsApp com DDD.";
    if (!form.service) next.service = "Escolha o serviço principal.";
    if (form.city.trim().length < 2) next.city = "Informe a cidade do evento.";
    if (!consent) next.consent = "É preciso concordar para enviar.";
    return next;
  }

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const found = validate();
    setErrors(found);
    const firstError = Object.keys(found)[0];
    if (firstError) {
      document.getElementById(`quote-${firstError}`)?.focus();
      return;
    }
    setSubmitted(true);
    trackConversion("quote_form_submit", { service: form.service });
    window.open(whatsappHref(form), "_blank", "noopener,noreferrer");
  }

  const field = (key: keyof Errors) => ({
    id: `quote-${key}`,
    "aria-invalid": errors[key] ? true : undefined,
    "aria-describedby": errors[key] ? `quote-${key}-error` : undefined,
  });
  const error = (key: keyof Errors) => errors[key] && <span className="fieldError" id={`quote-${key}-error`}>{errors[key]}</span>;

  return (
    <form className="quoteForm" onSubmit={submit} noValidate>
      <div className="formIntro"><span>Pedido de orçamento</span><strong>Leva cerca de 1 minuto</strong></div>
      {initial.notes && <div className="quoteContextNotice"><span className="contextCheck" aria-hidden="true">✓</span> <span><strong>Informações preservadas</strong>As respostas da orientação do site já aparecem abaixo.</span></div>}
      <div className="formGrid">
        <label><span>Nome <b aria-hidden="true">*</b></span><input {...field("name")} name="name" autoComplete="name" required value={form.name} onChange={(event) => update("name", event.target.value)} placeholder="Como podemos chamar você?" />{error("name")}</label>
        <label><span>WhatsApp <b aria-hidden="true">*</b></span><input {...field("whatsapp")} name="whatsapp" type="tel" inputMode="tel" autoComplete="tel" required value={form.whatsapp} onChange={(event) => update("whatsapp", event.target.value)} placeholder="(19) 99999-9999" />{error("whatsapp")}</label>
        <label><span>Serviço <b aria-hidden="true">*</b></span><select {...field("service")} name="service" required value={form.service} onChange={(event) => update("service", event.target.value)}><option value="">Selecione</option>{options.map((service) => <option value={service} key={service}>{service}</option>)}</select>{error("service")}</label>
        <label><span>Modelo ou tamanho</span><input name="model" value={form.model} onChange={(event) => update("model", event.target.value)} placeholder="Ex.: Super Luxo ou tenda 5×5" /></label>
        <label><span>Quantidade ou público</span><input name="quantity" inputMode="numeric" value={form.quantity} onChange={(event) => update("quantity", event.target.value)} placeholder="Ex.: 120 pessoas" /></label>
        <label><span>Data do evento</span><input name="date" type="date" value={form.date} onChange={(event) => update("date", event.target.value)} /></label>
        <label><span>Cidade <b aria-hidden="true">*</b></span><input {...field("city")} name="city" autoComplete="address-level2" required value={form.city} onChange={(event) => update("city", event.target.value)} placeholder="Cidade do evento" />{error("city")}</label>
        <label><span>Local do evento</span><input name="location" value={form.location} onChange={(event) => update("location", event.target.value)} placeholder="Chácara, empresa, salão…" /></label>
        <label className="formWide"><span>Detalhes do evento</span><textarea name="notes" rows={5} value={form.notes} onChange={(event) => update("notes", event.target.value)} placeholder="Tipo de evento, outros serviços que precisa, dúvidas…" /></label>
      </div>
      <div className="formConsent">
        <input {...field("consent")} type="checkbox" checked={consent} onChange={(event) => { setConsent(event.target.checked); if (errors.consent) setErrors((current) => ({ ...current, consent: undefined })); }} />
        <label htmlFor="quote-consent">Concordo em enviar estes dados para receber atendimento, conforme a <a href="/politica-de-privacidade" target="_blank">Política de Privacidade</a>.</label>
        {error("consent")}
      </div>
      <button className="button buttonWhatsapp buttonLarge formSubmit" type="submit"><WhatsAppIcon /> Enviar pelo WhatsApp</button>
      <p className="formFootnote">O WhatsApp abre com o pedido organizado para a Mathias Eventos. Nenhum dado fica salvo neste site.</p>
      {submitted && <p className="formSuccess" role="status">Pedido preparado! Se o WhatsApp não abriu, toque em “Enviar pelo WhatsApp” novamente.</p>}
    </form>
  );
}
