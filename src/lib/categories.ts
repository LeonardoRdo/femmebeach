import { Cat, Product, products } from "./products";

// Vitrine "Compre por categoria": cada categoria aponta para peças do catálogo (uma peça pode estar em mais de uma)
export type Category = {
  slug: string;
  nome: string;
  grupo: Cat;
  publico: Publico;
  // Foto do card; sem foto, o card mostra só o nome
  img?: string;
  // Enquadramento da foto no card (classe object-position), quando o padrão (centro) corta a peça
  imgPos?: string;
  produtos: readonly string[];
};

export type Publico = "feminino" | "masculino";

export const GRUPOS: Record<Cat, string> = { praia: "Moda praia", fitness: "Moda fitness" };
export const PUBLICOS: Record<Publico, string> = { feminino: "Feminino", masculino: "Masculino" };
const ORDEM_PUBLICOS: readonly Publico[] = ["feminino", "masculino"];

export const categories: readonly Category[] = [
  { slug: "maios", nome: "Maiôs", grupo: "praia", publico: "feminino", img: "img/img01.jpg", produtos: ["maio-preto"] },
  { slug: "biquinis", nome: "Biquínis", grupo: "praia", publico: "feminino", img: "img/img03.jpg", produtos: ["biquini-laranja", "conjunto-roxo"] },
  { slug: "saias-de-praia", nome: "Saias de praia", grupo: "praia", publico: "feminino", img: "img/img02.jpg", produtos: ["conjunto-roxo"] },
  { slug: "acessorios", nome: "Acessórios", grupo: "praia", publico: "feminino", produtos: [] },
  { slug: "leggings", nome: "Leggings", grupo: "fitness", publico: "feminino", img: "img/img04.jpg", produtos: ["legging-terracota", "legging-preto"] },
  { slug: "tops", nome: "Tops", grupo: "fitness", publico: "feminino", img: "img/img08.jpg", produtos: ["top-short-corrida", "legging-terracota", "legging-preto"] },
  { slug: "macacoes-e-macaquinhos", nome: "Macacões e macaquinhos", grupo: "fitness", publico: "feminino", img: "img/img09.jpg", produtos: ["macaquinho-marrom", "macacao-azul"] },
  { slug: "shorts-e-bermudas", nome: "Shorts e bermudas", grupo: "fitness", publico: "feminino", img: "img/img06.jpg", produtos: ["regata-verde", "top-short-corrida"] },
  { slug: "blusas-e-camisetas", nome: "Blusas e camisetas", grupo: "fitness", publico: "feminino", img: "img/img16.jpg", produtos: ["regata-verde"] },
  { slug: "casacos-e-coletes", nome: "Casacos e coletes", grupo: "fitness", publico: "feminino", produtos: [] },
  { slug: "camisetas-masculinas", nome: "Camisetas", grupo: "fitness", publico: "masculino", img: "img/homem-fitness.jpg", imgPos: "object-top", produtos: ["camiseta-masculina-marrom"] },
  { slug: "shorts-e-bermudas-masculinos", nome: "Shorts e bermudas", grupo: "fitness", publico: "masculino", img: "img/homem-fitness.jpg", imgPos: "object-bottom", produtos: ["short-masculino-marrom"] },
];

export const categoryBySlug = (slug: string) => categories.find((c) => c.slug === slug);

export const categoriesOf = (grupo: Cat, publico: Publico) => categories.filter((c) => c.grupo === grupo && c.publico === publico);

// Públicos com ao menos uma categoria no grupo (moda praia hoje só tem feminino)
export const publicosOf = (grupo: Cat) => ORDEM_PUBLICOS.filter((pub) => categoriesOf(grupo, pub).length > 0);

const PUBLICO_ADJ: Record<Publico, string> = { feminino: "feminina", masculino: "masculina" };

// Rótulo completo para títulos e migalhas: "Moda praia", "Moda fitness masculina"
export const categoryGroupLabel = (c: Category) =>
  publicosOf(c.grupo).length > 1 ? `${GRUPOS[c.grupo]} ${PUBLICO_ADJ[c.publico]}` : GRUPOS[c.grupo];

export const categoryProducts = (c: Category): readonly Product[] => products.filter((p) => c.produtos.includes(p.slug));
