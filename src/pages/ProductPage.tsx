import { useParams, useSearchParams } from "react-router";
import { bySlug, sizeBySlug } from "@/lib/products";
import { categoryBySlug, categoryGroupLabel } from "@/lib/categories";
import { usePageMeta } from "@/lib/usePageMeta";
import ProductClient from "@/components/ProductClient";
import SizeFilter from "@/components/SizeFilter";
import NotFound from "./NotFound";

export default function ProductPage() {
  const { slug = "" } = useParams();
  const [query] = useSearchParams();
  const p = bySlug(slug);
  usePageMeta(p && `${p.nome} | Femme Beach Wear`, p?.desc);
  if (!p) return <NotFound />;
  const categoria = query.get("categoria");
  const c = categoria ? categoryBySlug(categoria) : undefined;
  if (!c) return <ProductClient p={p} />;
  const tamParam = query.get("tam");
  const tam = tamParam ? sizeBySlug(tamParam) : undefined;
  return (
    <ProductClient
      p={p}
      parent={{ label: `${categoryGroupLabel(c)} · ${c.nome}`, href: `/categoria/${c.slug}` }}
      aside={<SizeFilter c={c} active={tam} scroll />}
    />
  );
}
