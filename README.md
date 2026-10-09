# Site oficial da Mathias Eventos

Site comercial da Mathias Eventos — locação e montagem de tendas, banheiros químicos e estruturas para eventos em Santo Antônio de Posse, Campinas, Holambra, Jaguariúna e região. O objetivo do site é transformar visitas em pedidos de orçamento pelo WhatsApp.

> **Estrutura certa. Eventos sem improviso.**

## Stack

- Next.js 16 (App Router) + React 19 + TypeScript
- Vinext/Vite com build para Cloudflare Workers (hospedagem via `.openai/hosting.json`)
- CSS próprio em um único design system (`app/globals.css`) + CSS Modules em 3 componentes interativos
- Lucide React para ícones; nenhuma outra dependência de interface
- HTML renderizado no servidor (SEO) e JavaScript de cliente só onde há interação

## Comandos

Requer Node.js 22.13 ou superior.

```bash
npm install
npm run dev            # versão local com recarga
npm run lint           # padrões de código
npm run typecheck      # tipagem
npm test               # gera o build e roda os testes de HTML renderizado
npm run build          # pacote de produção em dist/
npm run preview:local  # serve o build de produção em http://127.0.0.1:3000
```

Com a prévia rodando, `node --test tests/preview-assets.test.mjs` confere os arquivos servidos.

## Onde editar

| O quê | Arquivo |
| --- | --- |
| Empresa, WhatsApp principal, representante, cidades | `app/content.ts` → `company` |
| Serviços, serviços complementares, diferenciais, aplicações | `app/content.ts` → `services`, `extraServices`, `differentials`, `useCases` |
| Modelos de banheiro e textos de SEO de cada modelo | `app/content.ts` → `bathroomModels` |
| Tamanhos de tenda | `app/content.ts` → `tentSizes` |
| Perguntas frequentes | `app/content.ts` → `homeFaqs`, `tentFaqs`, `bathroomFaqs` |
| Fotos do portfólio | `app/data/projects.ts` |
| Capacidades ilustradas das tendas | `app/components/TentCapacityAccordion.tsx` |
| Logo e favicons | `app/brand.ts` e `public/brand/` |
| Cores, tipografia, espaçamentos | início de `app/globals.css` (tokens `--yellow`, `--ink`, `--paper`…) |
| Mensagens prontas do WhatsApp | `app/lib/quote.ts` |
| Eventos de clique (WhatsApp/orçamento) | `app/lib/analytics.ts` e `app/components/ConversionTracker.tsx` |

O WhatsApp principal também pode ser definido por variável de ambiente (`.env.example`).

## Marca

A logo oficial está em SVG, sem alterações, em `public/brand/svg/`:

| Arquivo | Uso |
| --- | --- |
| `mathias-eventos-logo-escura.svg` | **Logo aprovada** (fundos claros/amarelos): Open Graph e schema `LocalBusiness` |
| `mathias-eventos-logo-principal.svg` | Mesma logo em amarelo/branco para fundo escuro: vídeos, posts e peças escuras |
| `mathias-eventos-logo-branca.svg` | Monocromática branca: **header (desktop e mobile) e rodapé do site**, fotos escuras e vídeos |
| `mathias-eventos-simbolo.svg` | Símbolo: base do `favicon.svg`, ícones de celular e manifest |
| `mathias-eventos-logo-perfil.svg` | Avatar quadrado para redes sociais |

`public/favicon.svg` é o símbolo original sobre o carvão da marca. As versões PNG (`favicon-*.png`, `favicon.ico`, `apple-touch-icon.png`, `android-chrome-*.png`) e o `og.jpg` foram gerados a partir desses SVGs, porque iOS e Android antigos não aceitam ícone SVG. Logos anteriores ficam arquivadas em `assets/originals/marca-anterior/`.

## Fotografias

As fotos ficam em `public/images/services/<slug>/`, cada uma em AVIF, WebP e JPG, em três larguras, com placeholder de baixa resolução e dimensões declaradas (sem mudança de layout). Os originais ficam em `assets/originals/`. Para cadastrar uma nova foto, gere as variantes equivalentes e registre-a em `photos`, em `app/content.ts`. Guia de produção: `docs/PHOTO_SHOT_LIST.md` e `docs/IMAGE_UPLOAD_GUIDE.md`.

Nunca use imagem de banco ou gerada por IA como se fosse um trabalho real da empresa.

## Orçamento e WhatsApp

- `quoteHref("Tenda", "5×5")` leva ao formulário já preenchido com serviço e modelo.
- `whatsappHref({ service: "Tenda" })` abre o WhatsApp com mensagem contextual ("Gostaria de solicitar um orçamento para tendas.").
- O formulário valida nome, WhatsApp, serviço, cidade e consentimento, e abre o WhatsApp com o pedido organizado. Nenhum dado é salvo no site.
- No celular, uma barra fixa (WhatsApp + Pedir orçamento) aparece depois do topo da página; no desktop, um botão flutuante de WhatsApp.

## Medição

Cliques em links de WhatsApp e de orçamento e envios do formulário disparam o evento `mathias:conversion` no navegador (e entram no `dataLayer`, se ele existir). Nenhuma ferramenta de terceiros é carregada. Para ligar GA4/GTM/Meta Pixel, defina os IDs e o mecanismo de consentimento (LGPD) antes.

## SEO

- `title`, `description` e `canonical` próprios em todas as rotas (validados nos testes)
- Open Graph/Twitter com `public/og.jpg`
- `sitemap.xml` e `robots.txt`
- JSON-LD: `LocalBusiness` (contato principal e representante, área atendida, serviços), `WebSite`, `BreadcrumbList`, `Service` e `FAQPage` — sem avaliações ou preços inventados
- Um único `<h1>` por página

Configure `NEXT_PUBLIC_SITE_URL` com o domínio final.

## Documentação

- `docs/PHOTO_SHOT_LIST.md` — como fotografar cada serviço
- `docs/IMAGE_UPLOAD_GUIDE.md` — como entregar e publicar novas fotos
