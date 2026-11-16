import { Product, TAMANHOS } from "./products";

// Coleções do carrossel da home: peças avulsas + conjunto completo com preço fechado
export type Piece = Product & {
  // Recorte da foto da coleção que destaca a peça (classes Tailwind de zoom/origem)
  crop: string;
};

export type Collection = {
  slug: string;
  nome: string;
  eyebrow: string;
  desc: string;
  pecas: readonly Piece[];
  conjunto: Piece;
};

type PieceInput = Pick<Piece, "slug" | "nome" | "preco" | "desc" | "crop" | "sub">;
type PhotoBase = Pick<Piece, "cat" | "img" | "alt" | "cores">;

// Todas as peças de uma coleção saem da mesma foto e cor; só muda o recorte
const pieceOf = (base: PhotoBase) => (p: PieceInput): Piece => ({ ...p, ...base, tamanhos: TAMANHOS });

const verao = pieceOf({ cat: "praia", img: "img02", alt: "Mulher com conjunto de praia roxo de top assimétrico e saia envelope, em Maceió", cores: [{ nome: "Roxo", hex: "#6B4A8A" }] });
const porDoSol = pieceOf({ cat: "praia", img: "img03", alt: "Mulher com biquíni triângulo laranja com detalhes em pedras, em Maceió", cores: [{ nome: "Laranja", hex: "#E0702C" }] });
const movimento = pieceOf({ cat: "fitness", img: "img05", alt: "Mulher em pé com conjunto fitness verde de regata com zíper e short, em Maceió", cores: [{ nome: "Verde", hex: "#3f6b4f" }] });
const terra = pieceOf({ cat: "fitness", img: "img04", alt: "Mulher loira em pé com conjunto fitness terracota de top e legging, em Maceió", cores: [{ nome: "Terracota", hex: "#9A4F31" }] });

// TODO: preços de Verão 2026, Pôr do sol e Movimento são provisórios (só Terra foi confirmado pela loja)
export const collections: readonly Collection[] = [
  {
    slug: "verao-2026",
    nome: "Verão 2026",
    eyebrow: "moda praia",
    desc: "Top assimétrico e saia envelope em roxo vibrante. Leve as peças avulsas ou o conjunto completo com desconto.",
    pecas: [
      verao({ slug: "biquini", nome: "Biquíni top assimétrico roxo", preco: 129.9, sub: "biquinis", crop: "scale-[1.8] origin-[50%_45%]", desc: "Top assimétrico de um ombro só, com argola frontal e tecido com brilho suave." }),
      verao({ slug: "saia", nome: "Saia envelope roxa", preco: 79.9, sub: "saias-de-praia", crop: "scale-[1.6] origin-[50%_85%]", desc: "Saia envelope com nó frontal e fenda, para sair da areia direto para o pôr do sol." }),
    ],
    conjunto: verao({ slug: "conjunto", nome: "Conjunto completo roxo (biquíni + saia)", preco: 169.9, sub: "conjunto", crop: "", desc: "Biquíni e saia roxos juntos, com preço especial de conjunto." }),
  },
  {
    slug: "por-do-sol",
    nome: "Pôr do sol",
    eyebrow: "moda praia",
    desc: "Biquíni triângulo laranja com detalhes em pedras. Leve as peças avulsas ou o conjunto completo com desconto.",
    pecas: [
      porDoSol({ slug: "biquini", nome: "Top de biquíni triângulo laranja", preco: 79.9, sub: "biquinis", crop: "scale-[1.8] origin-[45%_50%]", desc: "Top triângulo com detalhes em pedras e amarração ajustável no pescoço." }),
      porDoSol({ slug: "calcinha", nome: "Calcinha de biquíni laranja", preco: 69.9, sub: "biquinis", crop: "scale-[1.8] origin-[45%_85%]", desc: "Calcinha de cintura média com caimento confortável." }),
    ],
    conjunto: porDoSol({ slug: "conjunto", nome: "Conjunto completo laranja (top + calcinha)", preco: 129.9, sub: "conjunto", crop: "", desc: "Top e calcinha laranja juntos, com preço especial de conjunto." }),
  },
  {
    slug: "movimento",
    nome: "Movimento",
    eyebrow: "moda fitness",
    desc: "Regata com zíper e short em verde estampado. Leve as peças avulsas ou o conjunto completo com desconto.",
    pecas: [
      movimento({ slug: "top", nome: "Top regata com zíper verde", preco: 109.9, sub: "top", crop: "scale-[1.9] origin-[50%_30%]", desc: "Regata cropped com zíper frontal e tecido texturizado." }),
      movimento({ slug: "short", nome: "Short fitness verde", preco: 99.9, sub: "shorts-e-bermudas", crop: "scale-[1.9] origin-[50%_58%]", desc: "Short de cintura alta com bolso lateral e tecido que não marca." }),
    ],
    conjunto: movimento({ slug: "conjunto", nome: "Conjunto completo verde (top + short)", preco: 189.9, sub: "conjunto", crop: "", desc: "Top e short verdes juntos, com preço especial de conjunto." }),
  },
  {
    slug: "terra",
    nome: "Terra",
    eyebrow: "moda fitness",
    desc: "Top e legging em tom terracota, com tecido que acompanha o movimento. Leve as peças avulsas ou o conjunto completo com desconto.",
    pecas: [
      terra({ slug: "legging", nome: "Calça legging terracota", preco: 89.9, sub: "legging", crop: "scale-[1.7] origin-[55%_72%]", desc: "Legging de cintura alta com recortes que modelam e tecido que acompanha o movimento." }),
      terra({ slug: "top", nome: "Top terracota", preco: 59.9, sub: "top", crop: "scale-[2] origin-[55%_28%]", desc: "Top de alças largas com sustentação média, ideal para treino e para o dia a dia." }),
    ],
    conjunto: terra({ slug: "conjunto", nome: "Conjunto completo terracota (top + legging)", preco: 119.9, sub: "conjunto", crop: "", desc: "Top e legging terracota juntos, com preço especial de conjunto." }),
  },
];

export const collectionBySlug = (slug: string) => collections.find((c) => c.slug === slug);

export const collectionPieces = (c: Collection): readonly Piece[] => [...c.pecas, c.conjunto];

export const pieceBySlug = (c: Collection, slug: string) => collectionPieces(c).find((p) => p.slug === slug);

export const conjuntoSavings = (c: Collection) => c.pecas.reduce((sum, p) => sum + p.preco, 0) - c.conjunto.preco;
