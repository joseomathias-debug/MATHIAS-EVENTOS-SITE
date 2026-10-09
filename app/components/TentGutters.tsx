import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { quoteHref, whatsappHref } from "../lib/quote";
import { WhatsAppIcon } from "./WhatsAppIcon";
import styles from "./TentGutters.module.css";

const legend = [
  { title: "Calha na união", text: "Capta a água entre as duas coberturas." },
  { title: "Descida junto ao poste", text: "A água desce rente à estrutura até o chão." },
  { title: "Corredor livre", text: "Sem poste ou barra no meio da passagem." },
];

/*
 * Duas tendas piramidais quadradas conjugadas, em perspectiva oblíqua (x + .32z, −h − .42z), beiral a 150 e cumeeira a 225.
 * Pés quadrados só nos cantos; a calha (perfil U) fica na linha de união, na altura do beiral;
 * a descida corre ao lado do poste frontal da união. Nada atravessa o corredor sob a calha.
 */
function GutterIllustration() {
  return (
    <svg className={styles.art} viewBox="24 24 572 424" role="img" aria-labelledby="gutter-art-title" focusable="false">
      <title id="gutter-art-title">Duas tendas piramidais conjugadas com calha na união, descida de água ao lado do poste e corredor central livre</title>
      <defs>
        <marker id="gutter-arrow" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
          <path d="M0 0 10 5 0 10Z" fill="#5DA9DD" />
        </marker>
        <marker id="gutter-arrow-dark" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
          <path d="M0 0 10 5 0 10Z" fill="#10110E" />
        </marker>
      </defs>

      {/* Piso */}
      <path d="M40 440H440L504 356H104Z" fill="#E6E8E0" />

      {/* Estrutura ao fundo */}
      <g fill="#8A8D86">
        <rect x="100.5" y="210" width="7" height="146" />
        <rect x="300.5" y="210" width="7" height="146" />
        <rect x="500.5" y="210" width="7" height="146" />
        <rect x="95" y="353" width="18" height="5" rx="1" />
        <rect x="295" y="353" width="18" height="5" rx="1" />
        <rect x="495" y="353" width="18" height="5" rx="1" />
      </g>
      <path d="M104 206H504" stroke="#8A8D86" strokeWidth="5" />

      {/* Corredor central livre */}
      <path d="M271 419 312 365" stroke="#10110E" strokeWidth="2" strokeDasharray="6 6" fill="none" markerStart="url(#gutter-arrow-dark)" markerEnd="url(#gutter-arrow-dark)" />

      {/* Coberturas */}
      <g stroke="#C2C5BB" strokeWidth="1.2" strokeLinejoin="round">
        <path d="M40 290 104 206 172 173Z" fill="#E1E3DB" />
        <path d="M240 290 304 206 172 173Z" fill="#ECEEE7" />
        <path d="M40 290H240L172 173Z" fill="#FFFFFF" />
        <path d="M240 290 304 206 372 173Z" fill="#E1E3DB" />
        <path d="M440 290 504 206 372 173Z" fill="#ECEEE7" />
        <path d="M240 290H440L372 173Z" fill="#FFFFFF" />
        {/* Saia (bandô) */}
        <path d="M40 290 104 206V216L40 300Z" fill="#E9EBE4" />
        <path d="M440 290 504 206V216L440 300Z" fill="#F2F3EE" />
        <path d="M40 290H440V300H40Z" fill="#FFFFFF" />
      </g>

      {/* Calha na união (perfil U) */}
      <path d="M240 292 304 206" stroke="#5F635C" strokeWidth="9" strokeLinecap="round" />
      <path d="M241 289 302 208" stroke="#9CCBEB" strokeWidth="3" strokeLinecap="round" />

      {/* Chuva escorrendo para a calha */}
      <g className={styles.rain} stroke="#5DA9DD" strokeWidth="2.2" strokeLinecap="round" markerEnd="url(#gutter-arrow)">
        <path d="M196 194 220 214" />
        <path d="M212 230 234 248" />
        <path d="M332 194 309 214" />
      </g>

      {/* Pés frontais (quadrados) */}
      <g fill="#7D8079">
        <rect x="36" y="300" width="8" height="140" />
        <rect x="236" y="300" width="8" height="140" />
        <rect x="436" y="300" width="8" height="140" />
        <rect x="30" y="437" width="20" height="6" rx="1" />
        <rect x="230" y="437" width="20" height="6" rx="1" />
        <rect x="430" y="437" width="20" height="6" rx="1" />
      </g>

      {/* Descida de água ao lado do poste da união */}
      <path d="M243 293 252 299V428L262 434" stroke="#5F635C" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path className={styles.flow} d="M214 218 272 248 243 287 252 299V428L263 434" stroke="#5DA9DD" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <g fill="#5DA9DD" className={styles.splash}>
        <circle cx="272" cy="437" r="2.4" />
        <circle cx="280" cy="434" r="1.8" />
        <circle cx="277" cy="441" r="1.6" />
      </g>
      {/* Detalhe: perfil U da calha */}
      <g>
        <circle cx="530" cy="92" r="58" fill="#FFFFFF" stroke="#C2C5BB" strokeWidth="1.5" />
        <path d="M486 62 511 86M574 62 549 86" stroke="#C2C5BB" strokeWidth="5" strokeLinecap="round" />
        <rect x="514" y="99" width="32" height="12" rx="4" fill="#9CCBEB" />
        <path d="M510 82V104Q510 115 521 115H539Q550 115 550 104V82" stroke="#5F635C" strokeWidth="5" fill="none" strokeLinecap="round" />
        <path className={styles.rain} d="M500 70 514 84M560 70 546 84" stroke="#5DA9DD" strokeWidth="2" strokeLinecap="round" markerEnd="url(#gutter-arrow)" />
        <text x="530" y="168" textAnchor="middle" fill="#5A5D55" fontSize="13" fontWeight="700">Perfil U</text>
      </g>

      {/* Marcadores */}
      <g fontSize="13" fontWeight="800" textAnchor="middle">
        <path d="M277 242H318M256 350H278M293 393H333" stroke="#10110E" strokeWidth="1.2" />
        <circle cx="330" cy="242" r="12" fill="#F4C900" />
        <text x="330" y="246.5" fill="#10110E">1</text>
        <circle cx="290" cy="350" r="12" fill="#F4C900" />
        <text x="290" y="354.5" fill="#10110E">2</text>
        <circle cx="345" cy="393" r="12" fill="#F4C900" />
        <text x="345" y="397.5" fill="#10110E">3</text>
        <circle cx="478" cy="46" r="12" fill="#F4C900" />
        <text x="478" y="50.5" fill="#10110E">1</text>
      </g>
    </svg>
  );
}

export function TentGutters() {
  return (
    <section className={`section ${styles.section}`} id="sistema-de-calhas" aria-labelledby="gutter-title">
      <div className={`shell ${styles.grid}`}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>Sistema de calhas</p>
          <h2 id="gutter-title">Chuva conduzida, corredor livre.</h2>
          <p className={styles.description}>As calhas unem as tendas e conduzem a água da chuva até o chão. Mais conforto e proteção para quem está embaixo.</p>
          <ol className={styles.legend}>
            {legend.map((item, index) => (
              <li key={item.title}><span aria-hidden="true">{index + 1}</span><div><strong>{item.title}</strong><small>{item.text}</small></div></li>
            ))}
          </ol>
          <div className={styles.actions}>
            <Link className="button buttonPrimary" href={quoteHref("Tenda", "Sistema de calhas")}>Orçar com calhas <ArrowRight aria-hidden="true" /></Link>
            <a className="button buttonGhostLight" href={whatsappHref({ service: "Tenda", model: "Sistema de calhas" })} target="_blank" rel="noreferrer"><WhatsAppIcon size={18} /> WhatsApp</a>
          </div>
        </div>
        <figure className={styles.figure}>
          <GutterIllustration />
        </figure>
      </div>
    </section>
  );
}
