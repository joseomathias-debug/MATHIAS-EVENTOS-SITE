import type { CSSProperties } from "react";
import { MapPin } from "lucide-react";
import { company, coverageSentence } from "../content";
import { whatsappHref } from "../lib/quote";
import { WhatsAppIcon } from "./WhatsAppIcon";

const locations = [
  { name: "Santo Antônio de Posse", x: 50, y: 50, central: true },
  { name: "Jaguariúna", x: 32, y: 66 },
  { name: "Holambra", x: 29, y: 38 },
  { name: "Campinas", x: 19, y: 84 },
  { name: "Cosmópolis", x: 14, y: 24 },
  { name: "Pedreira", x: 48, y: 78 },
  { name: "Amparo", x: 72, y: 70 },
  { name: "Artur Nogueira", x: 34, y: 14 },
  { name: "Mogi Mirim", x: 72, y: 32 },
  { name: "Mogi Guaçu", x: 84, y: 16 },
];

export function RegionalMap() {
  return (
    <section className="section regionalSection sectionDark" aria-labelledby="regional-title" id="atendimento">
      <div className="shell regionalGrid">
        <div className="regionalCopy">
          <p className="eyebrow">Atendimento regional</p>
          <h2 id="regional-title">Perto de você, do pedido à montagem.</h2>
          <p className="regionalLead">{coverageSentence} Estar na região significa resposta rápida, logística mais simples e uma equipe que conhece a região.</p>
          <ul className="cityTags">
            {company.coverage.map((city) => <li key={city} className={company.focusCities.includes(city as never) ? "isFocus" : undefined}>{city}</li>)}
          </ul>
          <small>{company.coverageNote}</small>
          <a className="button buttonWhatsapp" href={whatsappHref({ service: "Consulta de atendimento na minha cidade" })} target="_blank" rel="noreferrer"><WhatsAppIcon /> Consultar minha cidade</a>
        </div>
        <div className="regionalMap" role="img" aria-label={`Mapa ilustrativo: base em ${company.baseCity} e cidades atendidas ao redor`}>
          <span className="mapOrbit mapOrbitOne" aria-hidden="true" />
          <span className="mapOrbit mapOrbitTwo" aria-hidden="true" />
          <span className="mapOrbit mapOrbitThree" aria-hidden="true" />
          {locations.map((location) => (
            <span aria-hidden="true" className={`mapLocation${location.central ? " mapLocationCentral" : ""}`} style={{ "--map-x": `${location.x}%`, "--map-y": `${location.y}%` } as CSSProperties} key={location.name}>
              {location.central ? <MapPin /> : <i />}<b>{location.name}</b>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
