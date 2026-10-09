import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${pathname}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(
    new Request(`http://localhost${pathname}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

async function html(pathname) {
  const response = await render(pathname);
  assert.equal(response.status, 200, pathname);
  return response.text();
}

const routes = [
  "/", "/tendas", "/banheiros-quimicos", "/banheiros-quimicos/std", "/banheiros-quimicos/pcd", "/banheiros-quimicos/super-luxo",
  "/backdrop", "/touro-mecanico", "/mesas-e-cadeiras", "/duvidas", "/orcamento", "/contato", "/politica-de-privacidade",
];

test("Home comunica oferta, confiança e orçamento logo no início", async () => {
  const page = await html("/");
  for (const text of ["Banheiros químicos", "Tendas", "Backdrop", "Touro mecânico", "Mesas e cadeiras", "Fechamentos laterais"]) {
    assert.match(page, new RegExp(text));
  }
  assert.match(page, /Estrutura certa\./);
  assert.match(page, /Eventos sem improviso\./);
  assert.doesNotMatch(page, /Tudo o que a estrutura do seu evento precisa|Você pode combinar vários itens no mesmo pedido/);
  assert.match(page, /Algumas empresas que já receberam nossos serviços/);
  for (const client of ["Sabó", "Ypê", "Grimaldi", "JBS", "MSP"]) assert.match(page, new RegExp(client));
  for (const useCase of ["Festas", "Casamentos", "Empresas", "Obras", "Eventos públicos"]) assert.match(page, new RegExp(useCase));
  assert.match(page, /Não sabe exatamente o que pedir\?/);
  assert.match(page, /Solicitar orçamento/);
  assert.match(page, /Solicitar orçamento pelo WhatsApp/);
  assert.doesNotMatch(page, /Mais de [0-9]+ clientes/i);
  assert.doesNotMatch(page, /R\$\s?\d/);
});

test("Logo oficial em SVG no header, rodapé, favicon e schema, sem nenhuma marca anterior", async () => {
  for (const route of routes) {
    const page = await html(route);
    assert.match(page, /class="brandLogo"[^>]*src="\/brand\/svg\/mathias-eventos-logo-branca\.svg"|src="\/brand\/svg\/mathias-eventos-logo-branca\.svg"[^>]*class="brandLogo"/, route);
    assert.doesNotMatch(page, /mathias-symbol-|logo-mathias-horizontal|logo-mathias-eventos-(clara|escura|branca|preta)\.|simbolo-mathias-eventos-|\/brand\/logo-mathias-eventos\.png/, route);
  }
  const page = await html("/");
  assert.match(page, /"logo":"[^"]*\/brand\/svg\/mathias-eventos-logo-escura\.svg"/);
  assert.match(page, /rel="icon" href="[^"]*\/favicon\.svg" type="image\/svg\+xml"/);
  assert.match(page, /rel="manifest" href="[^"]*\/site\.webmanifest"/);
  assert.match(page, /\/apple-touch-icon\.png/);
  assert.match(page, /og\.jpg/);
  for (const file of ["principal", "escura", "branca"]) {
    const svg = await readFile(new URL(`../public/brand/svg/mathias-eventos-logo-${file}.svg`, import.meta.url), "utf8");
    assert.match(svg, /viewBox="-1 0 808 218"/);
  }
  const manifest = JSON.parse(await readFile(new URL("../public/site.webmanifest", import.meta.url), "utf8"));
  assert.ok(manifest.icons.some((icon) => icon.src === "/favicon.svg"));
});

test("Contato principal tem prioridade e o representante aparece identificado", async () => {
  const page = await html("/");
  assert.match(page, /wa\.me\/5519997101208/);
  assert.match(page, /\(19\) 99710-1208/);
  assert.match(page, /wa\.me\/5519974087238/);
  assert.match(page, /Representante/);
  assert.match(page, /\(19\) 97408-7238/);
  assert.doesNotMatch(page, /5512974087238|\(12\) 97408/);
  const contact = await html("/contato");
  assert.match(contact, /atendimento principal/);
  assert.match(contact, /Representante/);
});

test("WhatsApp abre com mensagem contextual por serviço", async () => {
  const tents = await html("/tendas");
  assert.match(tents, new RegExp(encodeURIComponent("Gostaria de solicitar um orçamento para tendas.").replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  const bathrooms = await html("/banheiros-quimicos");
  assert.match(bathrooms, new RegExp(encodeURIComponent("Gostaria de orçamento para banheiro químico.").replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  const home = await html("/");
  assert.match(home, new RegExp(encodeURIComponent("gostaria de saber mais sobre estruturas para meu evento").replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
});

test("Cada rota tem um único H1, title e description próprios e canonical", async () => {
  const titles = new Set();
  const descriptions = new Set();
  for (const route of routes) {
    const page = await html(route);
    assert.equal((page.match(/<h1[\s>]/g) ?? []).length, 1, `H1 em ${route}`);
    const title = page.match(/<title>([^<]+)<\/title>/)?.[1];
    const description = page.match(/<meta name="description" content="([^"]+)"/)?.[1];
    assert.ok(title && description, route);
    assert.ok(title.length <= 70, `title longo em ${route}: ${title}`);
    assert.ok(description.length >= 90 && description.length <= 175, `description em ${route}: ${description.length}`);
    assert.ok(!titles.has(title), `title repetido: ${title}`);
    assert.ok(!descriptions.has(description), `description repetida em ${route}`);
    titles.add(title);
    descriptions.add(description);
    assert.match(page, /<link rel="canonical"/, route);
  }
});

test("Dados estruturados: LocalBusiness com dois contatos, breadcrumbs e FAQ, sem avaliações", async () => {
  const page = await html("/tendas");
  assert.match(page, /"@type":"LocalBusiness"/);
  assert.match(page, /"telephone":"\+5519997101208"/);
  assert.match(page, /"telephone":"\+5519974087238"/);
  assert.match(page, /"@type":"BreadcrumbList"/);
  assert.match(page, /"@type":"FAQPage"/);
  assert.match(page, /"@type":"Service"/);
  assert.doesNotMatch(page, /aggregateRating|"@type":"Review"/);
});

test("Fluxo de banheiros inclui três modelos confirmados e orçamento contextual", async () => {
  const page = await html("/banheiros-quimicos");
  for (const model of ["STD", "PCD/PNE", "Super Luxo"]) assert.match(page, new RegExp(model));
  assert.doesNotMatch(page, />Container</);
  assert.match(page, /Comparação dos modelos/);
  assert.match(page, /Sem lavatório interno/);

  const detailHtml = await html("/banheiros-quimicos/super-luxo");
  assert.match(detailHtml, /Lavatório interno/);
  assert.match(detailHtml, /modelo=Super\+Luxo/);
});

test("Fluxo de tenda 5x5 chega ao orçamento com contexto", async () => {
  const page = await html("/tendas");
  assert.match(page, /5×5/);
  assert.match(page, /25(?:<!-- -->)? m²/);
  assert.match(page, /modelo=5%C3%975/);
  assert.match(page, /modelo=Sequ%C3%AAncia\+6%C3%9718/);
  assert.match(page, /modelo=Formato\+em\+L/);
});

test("Catálogo de tendas publica todos os tamanhos, fechamentos, formatos e aplicações", async () => {
  const page = await html("/tendas");
  for (const slug of [
    "tenda-3x3-mathias-eventos", "tenda-4x4-mathias-eventos", "tenda-5x5-mathias-eventos", "tenda-6x6-mathias-eventos",
    "tenda-7x7-mathias-eventos", "tenda-8x8-mathias-eventos", "tenda-10x10-mathias-eventos", "tenda-personalizada-mathias-eventos",
    "tenda-fechamento-branco-mathias-eventos", "tenda-fechamento-cristal-mathias-eventos", "tenda-formato-l-mathias-eventos",
    "tenda-sequencia-6x18-mathias-eventos",
  ]) assert.match(page, new RegExp(slug));
  assert.match(page, /Escolha o tamanho e personalize sua tenda/);
  assert.match(page, /Opções de fechamento para sua estrutura/);
  assert.match(page, /Formatos especiais de montagem/);
  assert.match(page, /Qual tenda combina com o seu evento\?/);
});

test("Capacidades de tendas usam os PNGs finais intactos e seletores acessíveis", async () => {
  const page = await html("/tendas");
  const manifest = JSON.parse((await readFile(new URL("../public/assets/tendas/finais/manifest.json", import.meta.url), "utf8")).replace(/^﻿/, ""));
  const source = await readFile(new URL("../app/components/TentCapacityAccordion.tsx", import.meta.url), "utf8");
  assert.equal(manifest.length, 32);
  const layouts = manifest.filter((asset) => asset.path.endsWith("-clean.png"));
  assert.equal(layouts.length, 28);
  for (const asset of manifest) {
    const bytes = await readFile(new URL(`../public${asset.path}`, import.meta.url));
    assert.equal(createHash("sha256").update(bytes).digest("hex"), asset.sha256, asset.path);
    assert.equal(bytes.readUInt32BE(16), asset.width);
    assert.equal(bytes.readUInt32BE(20), asset.height);
  }
  for (const asset of layouts) assert.ok(source.includes(asset.path.replace("/assets/tendas/finais/", "")), asset.path);
  for (const size of ["3×3", "4×4", "5×5", "6×6", "7×7", "8×8", "10×10"]) assert.ok(page.includes(size));
  for (const label of ["Auditório", "Mesas quadradas", "Mesas redondas", "Mesas retangulares"]) assert.ok(page.includes(label));
  const capacityHtml = page.slice(page.indexOf('id="capacidades-ilustradas"'), page.indexOf('id="sistema-de-calhas"'));
  assert.equal((capacityHtml.match(/aria-pressed="(?:true|false)"/g) ?? []).length, 7);
  assert.equal((capacityHtml.match(/aria-pressed="true"/g) ?? []).length, 1);
  assert.match(capacityHtml, /Variam conforme mesas, cadeiras, circulação, tipo de evento e configuração/);
  assert.equal((page.match(/id="tent-capacity-view"/g) ?? []).length, 1);
  assert.doesNotMatch(page, /type="radio"/);
  assert.match(page, /\/assets\/tendas\/finais\/3x3\/tenda-3x3-auditorio-clean\.png/);
  assert.doesNotMatch(page, /\/assets\/tendas\/finais\/4x4\/tenda-/);
  assert.match(page, /Sistema de calhas/);
  assert.match(page, /Visita técnica e planejamento/);
  assert.match(page, /1 metro livre em cada lado/);
});

test("Calhas usam a ilustração vetorial própria e a ordem da página de tendas é coerente", async () => {
  const page = await html("/tendas");
  const gutters = page.slice(page.indexOf('id="sistema-de-calhas"'), page.indexOf('id="planejamento"'));
  assert.match(gutters, /<svg[^>]*viewBox="24 24 572 424"/);
  assert.match(gutters, /Duas tendas piramidais conjugadas com calha na união/);
  for (const text of ["Calha na união", "Descida junto ao poste", "Corredor livre", "Sem poste ou barra no meio da passagem"]) assert.ok(gutters.includes(text), text);
  assert.doesNotMatch(gutters, /<img|\.png/);
  assert.match(page, /modelo=Sistema\+de\+calhas/);
  const order = ['id="tamanhos"', 'id="combinacoes"', 'id="fechamentos"', 'id="capacidades-ilustradas"', 'id="sistema-de-calhas"', 'id="planejamento"', 'tentsFaqSection', 'class="quoteCta'].map((marker) => page.indexOf(marker));
  for (const index of order) assert.ok(index > 0);
  for (let i = 1; i < order.length; i++) assert.ok(order[i - 1] < order[i], `ordem ${i}`);
});

test("Orçamento contextual preenche serviço e modelo no HTML", async () => {
  const page = await html("/orcamento?servico=Tenda&modelo=5%C3%975");
  assert.match(page, /option value="Tenda" selected/);
  assert.match(page, /value="5×5"/);
  assert.match(page, /Enviar pelo WhatsApp/);
  for (const option of ["Palco", "Som e iluminação", "Brinquedos"]) assert.match(page, new RegExp(`option value="${option}"`));
});

test("Orçamento preserva informações da etapa anterior no HTML", async () => {
  const page = await html("/orcamento?servico=Tenda&quantidade=120&cidade=Jaguari%C3%BAna&data=2026-09-20&resumo=Uso%3A%20Corporativo");
  assert.match(page, /Informações preservadas/);
  assert.match(page, /value="120"/);
  assert.match(page, /value="Jaguariúna"/);
  assert.match(page, /value="2026-09-20"/);
  assert.match(page, /Uso: Corporativo/);
});

test("Todas as fotografias responsivas publicadas continuam disponíveis", async () => {
  const manifest = JSON.parse(await readFile(new URL("../public/images/services/manifest.json", import.meta.url), "utf8"));
  assert.equal(Object.keys(manifest).length, 6);
  for (const asset of Object.values(manifest)) {
    assert.equal(asset.variants.length, 3);
    await access(new URL(`../public${asset.placeholder}`, import.meta.url));
    for (const variant of asset.variants) {
      await Promise.all([
        access(new URL(`../public${variant.avif}`, import.meta.url)),
        access(new URL(`../public${variant.webp}`, import.meta.url)),
        access(new URL(`../public${variant.fallback}`, import.meta.url)),
      ]);
    }
  }

  const lote = JSON.parse(await readFile(new URL("../public/images/services/lote-01-manifest.json", import.meta.url), "utf8"));
  assert.equal(lote.length, 14);
  for (const asset of lote) {
    await access(new URL(`../public/images/services/${asset.slug}/${asset.slug}-placeholder.webp`, import.meta.url));
    for (const width of asset.widths) {
      await Promise.all(["avif", "webp", "jpg"].map((extension) =>
        access(new URL(`../public/images/services/${asset.slug}/${asset.slug}-${width}.${extension}`, import.meta.url)),
      ));
    }
  }

  const lote02 = JSON.parse(await readFile(new URL("../public/images/services/lote-02-manifest.json", import.meta.url), "utf8"));
  assert.equal(lote02.length, 12);
  for (const asset of lote02) {
    await access(new URL(`../assets/originals/lote-02/segunda-remessa-tendas/${asset.source}`, import.meta.url));
    await access(new URL(`../public/images/services/${asset.slug}/${asset.slug}-placeholder.webp`, import.meta.url));
    for (const width of asset.widths) {
      await Promise.all(asset.formats.map((extension) =>
        access(new URL(`../public/images/services/${asset.slug}/${asset.slug}-${width}.${extension}`, import.meta.url)),
      ));
    }
  }

  for (const file of ["brand/svg/mathias-eventos-logo-principal.svg", "brand/svg/mathias-eventos-logo-escura.svg", "brand/svg/mathias-eventos-simbolo.svg", "favicon.svg", "og.jpg", "og.png", "favicon.ico", "android-chrome-512x512.png"]) {
    await access(new URL(`../public/${file}`, import.meta.url));
  }
});

test("Design system: mobile, movimento reduzido, sem rolagem horizontal e CTA fixo", async () => {
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  assert.match(css, /html, body \{ max-width: 100%; overflow-x: clip; \}/);
  assert.match(css, /prefers-reduced-motion: reduce/);
  assert.match(css, /@media \(max-width: 760px\)/);
  assert.match(css, /\.quizInputRow \{ grid-template-columns:1fr; \}/);
  assert.match(css, /\.mobileActionBar\.isVisible/);
  assert.match(css, /\.whatsappFloat\.isVisible/);
  assert.match(css, /env\(safe-area-inset-bottom\)/);
  assert.match(css, /--yellow: #F4C900/);
  assert.match(css, /--ink: #10110E/);
  // srOnly absoluto dentro da tabela não pode escapar do contêiner rolável (alargava o layout no celular).
  assert.match(css, /\.comparisonScroll \{ position: relative; overflow-x: auto;/);
  assert.match(css, /\.footerTagline \{[^}]*color: var\(--yellow\)/);
  const capacity = await readFile(new URL("../app/components/TentCapacityAccordion.module.css", import.meta.url), "utf8");
  assert.match(capacity, /\.visual img \{[^}]*object-fit: contain;/);
  const gutters = await readFile(new URL("../app/components/TentGutters.module.css", import.meta.url), "utf8");
  assert.match(gutters, /grid-template-areas: "copy visual"/);
  assert.match(gutters, /prefers-reduced-motion: reduce/);
});

test("Sitemap e robots continuam publicados", async () => {
  const sitemap = await html("/sitemap.xml");
  for (const route of routes.filter((route) => route !== "/")) assert.ok(sitemap.includes(route), route);
  const robots = await html("/robots.txt");
  assert.match(robots, /Sitemap:/i);
});
