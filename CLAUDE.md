# Femme Beach Wear — site (Vite SPA)

Loja de moda praia/fitness feminina em Maceió. SPA em Vite + React 18 + React Router 7 (HashRouter) + TypeScript + Tailwind 3 + Framer Motion. Idioma: pt-BR.

## Comandos
```
npm install
npm run dev     # http://localhost:5173
npm run build   # gera dist/ (index.html com JS/CSS embutidos + img/)
```

## Build estático (abrir sem servidor)
- `dist/` abre com duplo clique no `index.html` (file://). Para isso: `HashRouter` (rotas `#/produto/x`), `base: "./"`, `vite-plugin-singlefile` (navegador bloqueia `<script type=module src>` em file://) e caminhos de imagem relativos (`img/...`, nunca `/img/...`).
- Título/descrição por rota via `usePageMeta` (`src/lib/usePageMeta.ts`); SEO/JSON-LD fixos em `index.html`.

## Princípios de design (não quebrar)
- **Proporção áurea (φ = 1.618)**: escala tipográfica 1 / 1.618 / 2.618 / 4.236 / 6.854rem; espaçamentos Fibonacci (8, 13, 21, 34, 55, 89, 144px); colunas 1.618fr : 1fr; cards 1 : 1.382; hero 1 : 1.618.
- **Fluido**: tipografia e margens com `clamp()`. Nunca larguras fixas em px para layout.
- **Movimento estilo Apple**: easing `cubic-bezier(.16,1,.3,1)`, durações 1–1.4s, header com vidro fosco (`backdrop-blur`), carrossel de coleções no hero (crossfade, autoplay pausa no hover/foco e com reduced-motion), entradas `Reveal`.
- Respeitar `prefers-reduced-motion` (hoje só o scroll suave está tratado — ver TODO).
- Cores: areia `#E4DAC4/#F3ECDD`, terra `#9A4F31` (ação) e `#4A2A1B` (texto/rodapé). Fontes: Cormorant Garamond (títulos, itálico para ênfase) + Jost (texto).
- Acessibilidade: alvos de toque ≥ 44px, contraste ≥ 4.5:1, `alt` descritivo em pt-BR com termos locais (Maceió).

## Estrutura
- `src/lib/products.ts` — catálogo (fonte única); `precoAntigo` opcional marca oferta (selo "%" + preço riscado, `SaleBadge`/`Price` em `ProductCard`); `searchProducts` é a busca do catálogo (sem acentos/maiúsculas). `src/lib/whatsapp.ts` — número em `VITE_WHATSAPP` (.env) (somente dígitos, DDI+DDD).
- `src/lib/hours.ts` — horário da loja (`SCHEDULE`, fuso America/Maceio) e `useStoreStatus` (aberto/fechado + relógio regressivo, 1 s); usado em `StoreStatus` (cabeçalho) e no rodapé (dia de hoje em destaque). Manter igual ao `openingHours` do `index.html`.
- `src/lib/shipping.ts` — frete: `FREE_AT` (mínimo para frete grátis), `BAIRROS` com taxa, consulta ViaCEP. `ShippingBox` (dentro do `CartDrawer`) tem a barra de progresso e o endereço; o endereço fica em `entrega` no `CartProvider` (localStorage `femme-entrega`) e entra na mensagem do WhatsApp. CEP fora de Maceió = frete a combinar.
- `src/components/Confetti.tsx` — canvas de confete disparado por `celebrate` (muda a cada `add` no carrinho); respeita reduced-motion.
- `src/components/` — Header, Hero, ShopByCategory ("Compre por categoria", dados em `src/lib/categories.ts`, página `src/pages/CategoryPage`), Collection (filtros animados), Instagram, Footer, CartProvider/CartDrawer (checkout via WhatsApp), ProductClient.
- `src/components/SizeFinder` + `src/pages/SizePage` — atalho "Encontre seu ajuste perfeito" abaixo do hero e listagem por tamanho (`bySize`).
- Rotas em `src/App.tsx`; páginas em `src/pages/`. `ProductPage` — página de produto (cor, tamanho, medidas, quantidade).
- `src/lib/collections.ts` + `src/pages/CollectionPage` — página de coleção do carrossel da home (peças avulsas + conjunto completo com desconto); `CollectionPiecePage` reusa o `ProductClient` (cor, tamanho, medidas).
- `public/img/` — fotos (img01–10 = fotos grandes (hero/categorias); img11–20 = cards).

## TODO
1. Trocar placeholders: WhatsApp, telefone, CNPJ, horários, domínio e imagem OG (`index.html`).
2. Substituir fotos por versões otimizadas (WebP/AVIF) e adicionar fotos de acessórios e regatas masculinas (hoje sem foto).
3. Tratar `prefers-reduced-motion` nos componentes Framer (`useReducedMotion`).
4. Submenus por subcategoria (biquínis, maiôs, regatas, legging) usando `sub` do produto.
5. Testar Lighthouse (performance/SEO/a11y) e ajustar.
6. Confirmar preços das peças avulsas/conjuntos das coleções Verão 2026, Pôr do sol e Movimento (`src/lib/collections.ts`) — hoje provisórios.
7. Confirmar preços da linha masculina (camiseta e short marrom em `src/lib/products.ts`) — hoje provisórios.
8. Confirmar com a loja: mínimo para frete grátis (`FREE_AT`), bairros atendidos e taxas (`src/lib/shipping.ts`) e quais peças são ofertas (`precoAntigo`, hoje 3 fictícias).
