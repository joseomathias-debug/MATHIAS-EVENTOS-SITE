"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2, MessageCircle, RotateCcw } from "lucide-react";
import { useMemo, useState } from "react";
import { trackQuizEvent } from "../lib/analytics";
import { whatsappHref } from "../lib/quote";

type ServiceKey = "Banheiro químico" | "Tenda" | "Backdrop";
type Answers = Record<string, string>;
type Step = { key: string; question: string; options?: string[]; type?: "text" | "number" | "date" };

const services: Array<{ key: ServiceKey; title: string; description: string }> = [
  { key: "Banheiro químico", title: "Banheiros químicos", description: "Preciso estruturar os sanitários do evento ou operação." },
  { key: "Tenda", title: "Tendas", description: "Preciso de cobertura ou área protegida." },
  { key: "Backdrop", title: "Backdrop / Treliça", description: "Preciso criar uma estrutura visual para minha marca ou evento." },
];

const flows: Record<ServiceKey, Step[]> = {
  "Banheiro químico": [
    { key: "necessidade", question: "Qual é o tipo de necessidade?", options: ["Evento", "Empresa", "Obra", "Outro"] },
    { key: "pessoas", question: "Aproximadamente quantas pessoas utilizarão o local?", type: "number" },
    { key: "acessibilidade", question: "Existe necessidade de acessibilidade?", options: ["Sim", "Não", "Ainda não sei"] },
    { key: "lavatorio", question: "Você procura uma opção com lavatório e descarga?", options: ["Sim", "Não", "Quero entender a diferença"] },
    { key: "cidade", question: "Em qual cidade será a locação?", type: "text" },
    { key: "data", question: "Qual é a data prevista?", type: "date" },
  ],
  Tenda: [
    { key: "uso", question: "Para que você precisa da tenda?", options: ["Convidados", "Alimentação", "Operação", "Exposição", "Cobertura", "Outro"] },
    { key: "pessoas", question: "Quantas pessoas aproximadamente?", type: "number" },
    { key: "mobiliario", question: "Você terá mesas e cadeiras?", options: ["Sim", "Não", "Ainda não sei"] },
    { key: "espaco", question: "Você sabe o espaço disponível?", options: ["Sim, vou informar no orçamento", "Não"] },
    { key: "combinacao", question: "Precisa combinar mais de uma tenda?", options: ["Sim", "Não", "Quero orientação"] },
    { key: "cidade", question: "Em qual cidade será a locação?", type: "text" },
    { key: "data", question: "Qual é a data prevista?", type: "date" },
  ],
  Backdrop: [
    { key: "uso", question: "Onde o backdrop será utilizado?", options: ["Evento corporativo", "Festa", "Feira", "Inauguração", "Fotografia", "Outro"] },
    { key: "medida", question: "Possui uma medida aproximada?", type: "text" },
    { key: "arte", question: "Já possui a arte?", options: ["Sim", "Não", "Preciso de ajuda"] },
    { key: "impressao", question: "Precisa da impressão?", options: ["Sim", "Não", "Ainda não sei"] },
    { key: "cidade", question: "Em qual cidade será a locação?", type: "text" },
    { key: "data", question: "Qual é a data prevista?", type: "date" },
  ],
};

const labels: Record<string, string> = {
  necessidade: "Tipo de necessidade", pessoas: "Pessoas estimadas", acessibilidade: "Acessibilidade",
  lavatorio: "Lavatório e descarga", uso: "Uso", mobiliario: "Mesas e cadeiras", espaco: "Espaço disponível",
  combinacao: "Combinação de tendas", medida: "Medida aproximada", arte: "Arte", impressao: "Impressão", cidade: "Cidade", data: "Data",
};

export function NeedQuiz() {
  const [service, setService] = useState<ServiceKey | null>(null);
  const [stepIndex, setStepIndex] = useState(-1);
  const [answers, setAnswers] = useState<Answers>({});
  const [draft, setDraft] = useState("");
  const flow = service ? flows[service] : [];
  const complete = service !== null && stepIndex >= flow.length;
  const current = stepIndex >= 0 ? flow[stepIndex] : null;
  const total = flow.length + 1;
  const currentNumber = stepIndex + 2;

  const summary = useMemo(() => service ? Object.entries(answers).map(([key, value]) => `${labels[key] || key}: ${value}`).join("\n") : "", [answers, service]);
  const query = useMemo(() => {
    if (!service) return "/orcamento";
    const search = new URLSearchParams({ servico: service, resumo: summary });
    if (answers.pessoas) search.set("quantidade", answers.pessoas);
    if (answers.cidade) search.set("cidade", answers.cidade);
    if (answers.data) search.set("data", answers.data);
    return `/orcamento?${search.toString()}`;
  }, [answers, service, summary]);

  function chooseService(next: ServiceKey) {
    setService(next);
    setStepIndex(0);
    setAnswers({});
    setDraft("");
    trackQuizEvent("quiz_started", { service: next });
    trackQuizEvent("quiz_service_selected", { service: next });
  }

  function answer(value: string) {
    if (!current || !value.trim()) return;
    setAnswers((currentAnswers) => ({ ...currentAnswers, [current.key]: value.trim() }));
    setDraft("");
    trackQuizEvent("quiz_step_completed", { service: service || "", step: current.key, step_number: currentNumber });
    const nextStep = stepIndex + 1;
    setStepIndex(nextStep);
    if (nextStep >= flow.length) trackQuizEvent("quiz_completed", { service: service || "", steps: total });
  }

  function goBack() {
    if (stepIndex === 0) return restart();
    const previous = flow[stepIndex - 1];
    setDraft(previous ? answers[previous.key] || "" : "");
    setStepIndex((value) => value - 1);
  }

  function restart() {
    setService(null);
    setStepIndex(-1);
    setAnswers({});
    setDraft("");
  }

  return (
    <section className="section quizSection" id="orientacao" aria-labelledby="quiz-title">
      <div className="shell quizShell">
        <div className="quizIntro">
          <p className="eyebrow">Orientação rápida</p>
          <h2 id="quiz-title">Não sabe exatamente o que pedir?</h2>
          <p>Responda algumas perguntas em menos de um minuto. As respostas seguem prontas para o orçamento ou para o WhatsApp — sem digitar tudo de novo.</p>
          <ul className="quizPerks">
            <li>Sem cadastro</li>
            <li>Leva menos de 1 minuto</li>
            <li>Respostas vão direto para o pedido</li>
          </ul>
        </div>
        <div className="quizCard" aria-live="polite">
          {!service && (
            <div className="quizStep">
              <div className="quizProgress"><span>O que você precisa resolver agora?</span><i style={{ width: "14%" }} /></div>
              <div className="quizOptions quizServiceOptions">
                {services.map((item) => (
                  <button type="button" key={item.key} onClick={() => chooseService(item.key)}>
                    <strong>{item.title}</strong><span>{item.description}</span><ArrowRight aria-hidden="true" />
                  </button>
                ))}
              </div>
            </div>
          )}
          {service && current && (
            <div className="quizStep" key={`${service}-${current.key}`}>
              <div className="quizProgress"><span>{currentNumber} de {total}</span><i style={{ width: `${(currentNumber / total) * 100}%` }} /></div>
              <span className="quizServiceLabel">{service}</span>
              <h3>{current.question}</h3>
              {current.options ? (
                <div className="quizOptions">{current.options.map((option) => <button type="button" key={option} onClick={() => answer(option)}>{option}<ArrowRight aria-hidden="true" /></button>)}</div>
              ) : (
                <form className="quizInputRow" onSubmit={(event) => { event.preventDefault(); answer(draft); }}>
                  <input type={current.type} min={current.type === "number" ? "1" : undefined} value={draft} onChange={(event) => setDraft(event.target.value)} aria-label={current.question} required />
                  <button className="button buttonPrimary" type="submit">Continuar <ArrowRight aria-hidden="true" /></button>
                </form>
              )}
              <button className="quizBack" type="button" onClick={goBack}><ArrowLeft aria-hidden="true" /> Voltar</button>
            </div>
          )}
          {complete && service && (
            <div className="quizComplete">
              <CheckCircle2 aria-hidden="true" />
              <span className="quizServiceLabel">Orientação pronta</span>
              <h3>{service === "Banheiro químico" ? "Com essas informações já conseguimos orientar melhor a configuração." : service === "Tenda" ? "A equipe pode avaliar o tamanho e a combinação mais adequados para seu espaço." : "Seu contexto já está organizado para montar o orçamento."}</h3>
              <div className="quizSummary"><strong>{service}</strong>{Object.entries(answers).map(([key, value]) => <span key={key}><b>{labels[key] || key}</b>{value}</span>)}</div>
              <div className="quizFinalActions">
                <Link className="button buttonPrimary" href={query} onClick={() => trackQuizEvent("quiz_quote_clicked", { service })}>Continuar com estes dados <ArrowRight aria-hidden="true" /></Link>
                <a className="button buttonSecondary" href={whatsappHref({ service, quantity: answers.pessoas, city: answers.cidade, date: answers.data, notes: summary })} target="_blank" rel="noreferrer" onClick={() => trackQuizEvent("quiz_whatsapp_clicked", { service })}><MessageCircle aria-hidden="true" /> WhatsApp</a>
              </div>
              <button className="quizBack" type="button" onClick={restart}><RotateCcw aria-hidden="true" /> Recomeçar</button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
