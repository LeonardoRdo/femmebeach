# Femme Beach Wear — Site catálogo

Site de catálogo da **Femme Beach Wear** (moda praia e fitness feminina, Ponta Verde, Maceió/AL). O cliente monta o carrinho e finaliza o pedido pelo **WhatsApp**.

> O `index.html` é um **build único** (Vite + React + Tailwind): código, estilos e as 30 imagens (base64) estão dentro do próprio arquivo, em ~7,5 MB. Não precisa de servidor nem de instalação.

## Como usar

1. Baixe o `index.html`.
2. Dê dois cliques para abrir no navegador (ou publique em qualquer hospedagem estática: Netlify, Vercel, GitHub Pages, etc.).

A navegação usa rotas com `#` (ex.: `index.html#/produto/biquini-laranja`), por isso funciona até abrindo o arquivo direto do computador.

## O que o site tem

- **Catálogo com 47 peças**, organizado em categorias: Moda praia (biquínis, maiôs, acessórios), Moda fitness (legging, casacos, outros) e Moda dia a dia (vestidos).
- **Coleções**: Verão 2026, Pôr do Sol, Terra e Movimento.
- **Página de produto** com cores, tamanhos (P, M, G, GG, XG ou Único), descrição e preço (com "preço antigo" nas promoções).
- **Carrinho** (1 a 10 unidades por item), salvo no navegador (`localStorage`: `femme-cart` e `femme-entrega`).
- **Cálculo de frete por CEP** (consulta a API ViaCEP):
  - Maceió: taxa por bairro, de R$ 8 a R$ 15.
  - **Frete grátis** em Maceió a partir de **R$ 299**, com barra de progresso.
  - Outras cidades: frete a combinar pelo WhatsApp.
- **Finalização pelo WhatsApp**: monta a mensagem com itens, cor, tamanho, endereço, frete e total.
- **Guia de medidas** (imagens de busto e corpo).
- **Status da loja em tempo real** ("abre/fecha em…"), com horário de seg–sex 9h–19h e sáb 9h–17h.
- **Rodapé** com mapa do Google, Instagram (@femmebeachwear_) e Linktree.
- **SEO local**: título, meta description, Open Graph e dados estruturados (`ClothingStore`, JSON-LD).

## Rotas

| Rota | Página |
|---|---|
| `#/` | Início |
| `#/categoria/:slug` | Produtos de uma categoria |
| `#/produto/:slug` | Detalhe do produto |
| `#/tamanho/:tam` | Produtos por tamanho |
| `#/colecao/:slug` | Coleção |
| `#/colecao/:slug/:peca` | Peça dentro de uma coleção |

## Pendências antes de publicar

- [ ] **Número do WhatsApp**: hoje é um placeholder (`5582900000000`). Sem trocar, os pedidos vão para um número inexistente.
- [ ] **Telefone** no JSON-LD (`+55-82-90000-0000`), também placeholder.
- [ ] **Domínio real**: URL em `og:image` e `url` do JSON-LD aponta para `femmebeachwear.com.br` (marcado com `TODO`).
- [ ] Conferir preços, fotos, horários e taxas de frete com a dona da loja.

## Tecnologias

React, React Router (rotas por hash), Tailwind CSS, Framer Motion, fontes Google (Cormorant Garamond e Jost) e API ViaCEP. Internet é necessária apenas para as fontes, o mapa e a consulta de CEP.

## Observação sobre edição

Como o arquivo é um **build já compilado**, editar textos e preços direto no HTML é trabalhoso (o código está minificado). Para mudanças frequentes, o ideal é alterar o projeto-fonte e gerar o build de novo.
