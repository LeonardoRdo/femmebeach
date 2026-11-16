import { useParams } from "react-router";
import { collectionBySlug, pieceBySlug } from "@/lib/collections";
import { usePageMeta } from "@/lib/usePageMeta";
import ProductClient from "@/components/ProductClient";
import NotFound from "./NotFound";

const lookup = (slug: string, peca: string) => {
  const c = collectionBySlug(slug);
  const p = c && pieceBySlug(c, peca);
  return c && p ? { c, p } : undefined;
};

export default function CollectionPiecePage() {
  const { slug = "", peca = "" } = useParams();
  const found = lookup(slug, peca);
  usePageMeta(found && `${found.p.nome} | Coleção ${found.c.nome} – Femme Beach Wear`, found?.p.desc);
  if (!found) return <NotFound />;
  const { c, p } = found;
  return <ProductClient p={p} imgClass={p.crop} parent={{ label: `Coleção ${c.nome}`, href: `/colecao/${c.slug}` }} />;
}
