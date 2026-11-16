import { Link, useParams, useSearchParams } from "react-router";
import { categoryGroupLabel, categoryBySlug, categoryProducts } from "@/lib/categories";
import { sizeBySlug, sizeSlug } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import SizeFilter from "@/components/SizeFilter";
import { usePageMeta } from "@/lib/usePageMeta";
import NotFound from "./NotFound";

export default function CategoryPage() {
  const { slug = "" } = useParams();
  const [query] = useSearchParams();
  const c = categoryBySlug(slug);
  usePageMeta(
    c && `${c.nome} | ${categoryGroupLabel(c)} – Femme Beach Wear`,
    c && `${c.nome} – ${categoryGroupLabel(c).toLowerCase()} na Femme Beach Wear, em Maceió.`,
  );
  if (!c) return <NotFound />;
  const tamParam = query.get("tam");
  const tam = tamParam ? sizeBySlug(tamParam) : undefined;
  const lista = categoryProducts(c).filter((p) => !tam || p.tamanhos.includes(tam));
  return (
    <div className="px-page mx-auto max-w-[1680px] pb-[89px] pt-[clamp(89px,10vw,144px)]">
      <nav aria-label="Você está em" className="text-sm"><Link to="/" className="underline">Início</Link> / <Link to="/#categorias" className="underline">{categoryGroupLabel(c)}</Link> / <span aria-current="page">{c.nome}</span></nav>
      <Reveal y={34} className="mt-34">
        <p className="eyebrow">{categoryGroupLabel(c)}</p>
        <h1 className="font-serif text-fluid-xl font-medium">{c.nome}</h1>
      </Reveal>
      <div className="mt-[clamp(34px,5vw,55px)] grid items-start gap-[clamp(21px,3vw,55px)] md:grid-cols-[minmax(144px,233px)_1fr]">
        <SizeFilter c={c} active={tam} />
        {lista.length === 0 ? (
          <p className="max-w-[34em] leading-[1.618]">Novidades chegando em breve. Enquanto isso, <Link to="/#colecao" className="underline">veja a coleção completa</Link>.</p>
        ) : (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(clamp(210px,20vw,300px),1fr))] gap-x-[clamp(13px,2vw,34px)] gap-y-[clamp(21px,2.618vw,34px)]">
            {lista.map((p) => <article key={p.slug}><ProductCard p={p} from={{ categoria: c.slug, tam: tam && sizeSlug(tam) }} /></article>)}
          </div>
        )}
      </div>
    </div>
  );
}
