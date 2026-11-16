import { useParams } from "react-router";
import { collectionBySlug } from "@/lib/collections";
import { usePageMeta } from "@/lib/usePageMeta";
import CollectionClient from "@/components/CollectionClient";
import NotFound from "./NotFound";

export default function CollectionPage() {
  const { slug = "" } = useParams();
  const c = collectionBySlug(slug);
  usePageMeta(c && `Coleção ${c.nome} | Femme Beach Wear`, c?.desc);
  if (!c) return <NotFound />;
  return <CollectionClient c={c} />;
}
