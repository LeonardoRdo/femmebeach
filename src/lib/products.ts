export type Cat = "praia" | "fitness";
export type Product = {
  slug: string; nome: string; preco: number; cat: Cat; sub: string;
  // Preço antes da oferta: quando existe, o card mostra o selo "%" e o preço antigo riscado
  precoAntigo?: number;
  img: string; hero?: string; alt: string; desc: string; cores: { nome: string; hex: string }[]; tamanhos: string[];
};

export const TAMANHOS = ["P", "M", "G", "GG", "XG"];

export const products: Product[] = [
  { slug: "conjunto-roxo", nome: "Conjunto top assimétrico e saia roxo", preco: 169.9, cat: "praia", sub: "biquinis", img: "img11", hero: "img02", alt: "Conjunto de praia roxo com top assimétrico e saia envelope", desc: "Top assimétrico com saia envelope. Para sair da areia direto para o pôr do sol.", cores: [{ nome: "Roxo", hex: "#6B4A8A" }], tamanhos: TAMANHOS },
  { slug: "biquini-laranja", nome: "Biquíni triângulo laranja", preco: 129.9, precoAntigo: 159.9, cat: "praia", sub: "biquinis", img: "img12", hero: "img03", alt: "Biquíni laranja com detalhes em pedras", desc: "Biquíni triângulo com detalhes em pedras e amarração ajustável.", cores: [{ nome: "Laranja", hex: "#E0702C" }], tamanhos: TAMANHOS },
  { slug: "maio-preto", nome: "Maiô preto com recorte frontal", preco: 149.9, cat: "praia", sub: "maios", img: "img13", hero: "img01", alt: "Maiô preto com recorte frontal e gola alta", desc: "Maiô de gola alta e recorte frontal. Modelagem que valoriza a cintura.", cores: [{ nome: "Preto", hex: "#1c1c1c" }], tamanhos: TAMANHOS },
  { slug: "vestido-marrom", nome: "Vestido midi marrom franzido", preco: 229.9, cat: "praia", sub: "outros", img: "img14", hero: "img10", alt: "Vestido midi marrom franzido com bolsa de franjas", desc: "Vestido midi franzido, leve e fluido.", cores: [{ nome: "Marrom", hex: "#6a4630" }], tamanhos: TAMANHOS },
  { slug: "legging-terracota", nome: "Conjunto top e legging terracota", preco: 199.9, precoAntigo: 239.9, cat: "fitness", sub: "legging", img: "img15", hero: "img04", alt: "Conjunto fitness terracota com top e legging", desc: "Top e legging em tecido que acompanha o movimento.", cores: [{ nome: "Terracota", hex: "#9A4F31" }], tamanhos: TAMANHOS },
  { slug: "regata-verde", nome: "Conjunto regata com zíper e short verde", preco: 189.9, cat: "fitness", sub: "regata-fem", img: "img16", hero: "img05", alt: "Conjunto fitness verde com regata de zíper e short", desc: "Regata com zíper frontal e short.", cores: [{ nome: "Verde", hex: "#3f6b4f" }], tamanhos: TAMANHOS },
  { slug: "top-short-corrida", nome: "Conjunto top e short de corrida", preco: 169.9, cat: "fitness", sub: "regata-fem", img: "img17", hero: "img06", alt: "Top amarelo e short azul-marinho de corrida", desc: "Top e short de corrida, secagem rápida.", cores: [{ nome: "Amarelo", hex: "#e3b93a" }], tamanhos: TAMANHOS },
  { slug: "macacao-azul", nome: "Macacão fitness azul", preco: 189.9, cat: "fitness", sub: "outros", img: "img18", hero: "img07", alt: "Macacão fitness azul para treino", desc: "Macacão para treino com alta sustentação.", cores: [{ nome: "Azul", hex: "#2f5f9e" }], tamanhos: TAMANHOS },
  { slug: "legging-preto", nome: "Conjunto top e legging preto", preco: 179.9, cat: "fitness", sub: "legging", img: "img19", hero: "img08", alt: "Conjunto fitness preto com detalhes brancos", desc: "Top e legging pretos com detalhes brancos.", cores: [{ nome: "Preto", hex: "#1c1c1c" }], tamanhos: TAMANHOS },
  { slug: "macaquinho-marrom", nome: "Macaquinho fitness marrom", preco: 159.9, precoAntigo: 189.9, cat: "fitness", sub: "outros", img: "img20", hero: "img09", alt: "Macaquinho fitness marrom com alças finas", desc: "Macaquinho com alças finas.", cores: [{ nome: "Marrom", hex: "#6a4630" }], tamanhos: TAMANHOS },
  // TODO: preços provisórios da linha masculina — confirmar com a loja
  { slug: "camiseta-masculina-marrom", nome: "Camiseta fitness masculina marrom", preco: 89.9, cat: "fitness", sub: "camisetas-masculinas", img: "homem-fitness", alt: "Homem com camiseta fitness marrom de tecido furadinho segurando anilha na academia", desc: "Camiseta de treino em tecido leve e respirável, com secagem rápida.", cores: [{ nome: "Marrom", hex: "#9A6A55" }], tamanhos: TAMANHOS },
  { slug: "short-masculino-marrom", nome: "Short fitness masculino marrom", preco: 79.9, cat: "fitness", sub: "shorts-masculinos", img: "homem-fitness", alt: "Homem com short fitness marrom e camiseta combinando na academia", desc: "Short de treino leve, com cós confortável e liberdade de movimento.", cores: [{ nome: "Marrom", hex: "#9A6A55" }], tamanhos: TAMANHOS },
];

export const brl = (v: number) => "R$ " + v.toFixed(2).replace(".", ",");
export const imgSrc = (n: string) => `img/${n}.jpg`;
// Busca por texto, ignorando acentos e maiúsculas (nome, descrição, cor, subcategoria)
export const norm = (s: string) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
export const searchProducts = (term: string, lista: Product[] = products) => {
  const t = norm(term);
  if (!t) return lista;
  return lista.filter((p) => norm([p.nome, p.desc, p.sub, p.cat === "praia" ? "moda praia" : "moda fitness", ...p.cores.map((c) => c.nome)].join(" ")).includes(t));
};
export const discountPct = (p: Product) => (p.precoAntigo ? Math.round((1 - p.preco / p.precoAntigo) * 100) : 0);
export const bySlug = (s: string) => products.find((p) => p.slug === s);
export const sizeSlug = (t: string) => t.toLowerCase();
export const sizeBySlug = (s: string) => TAMANHOS.find((t) => sizeSlug(t) === s);
export const bySize = (t: string) => products.filter((p) => p.tamanhos.includes(t));
