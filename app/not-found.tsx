import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Página não encontrada", robots: { index: false, follow: true } };

export default function NotFound() {
  return (
    <main className="notFound">
      <div className="shell">
        <span className="notFoundCode">404</span>
        <h1>Esta página não foi encontrada.</h1>
        <p>O endereço pode ter mudado. Volte ao início, veja nossos serviços ou peça seu orçamento.</p>
        <div className="heroActions">
          <Link className="button buttonPrimary" href="/">Voltar ao início</Link>
          <Link className="button buttonGhostLight" href="/orcamento">Solicitar orçamento</Link>
        </div>
      </div>
    </main>
  );
}
