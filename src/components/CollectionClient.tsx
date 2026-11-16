import Img from "./Img";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { Collection, Piece, conjuntoSavings } from "@/lib/collections";
import { brl, imgSrc } from "@/lib/products";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function CollectionClient({ c }: { c: Collection }) {
  return (
    <div className="px-page mx-auto max-w-[1280px] pb-[89px] pt-[clamp(89px,10vw,144px)]">
      <nav aria-label="Você está em" className="text-sm"><Link to="/" className="underline">Início</Link> / <span aria-current="page">Coleção {c.nome}</span></nav>

      <motion.header initial={{ opacity: 0, y: 34 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, ease: EASE }} className="mt-34 max-w-[42em]">
        <p className="eyebrow">{c.eyebrow}</p>
        <h1 className="font-serif text-fluid-xl font-medium">Coleção <em className="text-terra-500">{c.nome}</em></h1>
        <p className="mt-21 leading-[1.618]">{c.desc}</p>
      </motion.header>

      <div className="mt-55 grid gap-[clamp(21px,3vw,34px)] md:grid-cols-3">
        {c.pecas.map((p, i) => <PieceCard key={p.slug} href={`/colecao/${c.slug}/${p.slug}`} p={p} delay={i * 0.089} />)}
        <PieceCard href={`/colecao/${c.slug}/${c.conjunto.slug}`} p={c.conjunto} delay={c.pecas.length * 0.089} badge={`Economize ${brl(conjuntoSavings(c))}`} />
      </div>
    </div>
  );
}

type CardProps = { href: string; p: Piece; delay: number; badge?: string };

function PieceCard({ href, p, delay, badge }: CardProps) {
  const featured = Boolean(badge);
  return (
    <motion.article
      initial={{ opacity: 0, y: 55 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, delay, ease: EASE }}
      className={`group flex flex-col rounded-[21px] p-13 ${featured ? "bg-terra-900 text-areia-50" : "bg-areia-50"}`}
    >
      <Link to={href} aria-label={`Ver detalhes: ${p.nome}`} className="relative block aspect-card overflow-hidden rounded-[13px] bg-terra-500">
        <Img src={imgSrc(p.img)} alt={`${p.nome} – ${p.alt}`} fill className={`object-cover ${p.crop}`} />
        {badge && <span className="absolute left-13 top-13 rounded-full bg-areia-50 px-13 py-1 text-sm font-medium text-terra-900">{badge}</span>}
      </Link>
      <div className="flex flex-1 flex-col px-2 pb-2 pt-21">
        <h2 className="text-lg font-medium leading-snug">{p.nome}</h2>
        <p className={`mt-1 text-2xl ${featured ? "text-areia-100" : "text-terra-500"}`}>{brl(p.preco)}</p>
        <div className="mt-auto pt-21">
          <Link to={href} className={`btn w-full ${featured ? "!bg-areia-50 !text-terra-900 hover:!bg-areia-100" : "!text-white"}`}>Adicionar ao carrinho</Link>
        </div>
      </div>
    </motion.article>
  );
}
