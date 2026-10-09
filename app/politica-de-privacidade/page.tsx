import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { company } from "../content";
import { pageMetadata } from "../lib/seo";

export const metadata: Metadata = pageMetadata(
  "Política de privacidade",
  "Saiba como as informações enviadas para solicitar atendimento são tratadas pela Mathias Eventos.",
  "/politica-de-privacidade",
);

export default function PrivacyPage() {
  return (
    <main>
      <section className="legalHero"><div className="shell"><Breadcrumbs items={[{ label: "Política de privacidade" }]} /><p className="eyebrow">Privacidade e LGPD</p><h1>Política de privacidade</h1><p className="heroLead">Esta página explica, em linguagem direta, como os dados enviados para atendimento são utilizados.</p></div></section>
      <article className="shell legalContent">
        <h2>1. Quais dados podem ser informados</h2><p>Ao solicitar um orçamento, você pode enviar nome, telefone, serviço de interesse, quantidade, data, cidade, local do evento e observações.</p>
        <h2>2. Para que os dados são usados</h2><p>As informações servem para responder ao pedido, avaliar a contratação, confirmar disponibilidade e dar continuidade ao atendimento solicitado.</p>
        <h2>3. Como o formulário funciona</h2><p>O formulário organiza os dados no seu navegador e abre uma conversa no WhatsApp. O site não mantém um banco de dados próprio com essas informações.</p>
        <h2>4. Compartilhamento</h2><p>Os dados não são vendidos. Eles podem ser processados pelos serviços necessários à comunicação escolhida pelo usuário, como o WhatsApp, conforme as políticas dessas plataformas.</p>
        <h2>5. Cookies e marketing</h2><p>O site não carrega cookies nem identificadores de marketing de terceiros. Cliques em botões de WhatsApp e de orçamento geram apenas eventos internos no navegador, que não são enviados a nenhuma ferramenta enquanto as respectivas configurações e o mecanismo de consentimento aplicável não estiverem definidos.</p>
        <h2>6. Segurança e minimização</h2><p>Solicitamos somente informações úteis para o atendimento. Evite enviar documentos, dados financeiros ou outras informações sensíveis nas observações.</p>
        <h2>7. Direitos do titular</h2><p>Você pode solicitar esclarecimentos, correção ou exclusão de dados mantidos durante o atendimento entrando em contato pelo WhatsApp da {company.name}: {company.whatsappDisplay} (atendimento principal) ou {company.representative.whatsappDisplay} ({company.representative.label.toLowerCase()}).</p>
        <h2>8. Atualizações</h2><p>Esta política poderá ser atualizada quando novos canais, formulários ou ferramentas de análise forem implementados.</p>
        <p className="legalUpdate">Última atualização: 8 de outubro de 2026.</p>
        <Link className="button buttonPrimary" href="/contato">Entrar em contato</Link>
      </article>
    </main>
  );
}
