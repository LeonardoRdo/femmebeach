import { Link, useParams, useSearchParams } from "react-router";
import { Cat, TAMANHOS, bySize, sizeBySlug, sizeSlug } from "@/lib/products";
import { Category, GRUPOS, PUBLICOS, categoriesOf, categoryBySlug, categoryProducts, publicosOf } from "@/lib/categories";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import { usePageMeta } from "@/lib/usePageMeta";
import NotFound from "./NotFound";

const GRUPOS_FILTRO: readonly Cat[] = ["praia", "fitness"];

const sizeHref = (t: string, c?: Category) => `/tamanho/${sizeSlug(t)}${c ? `?categoria=${c.slug}` : ""}`;

export default function SizePage() {
  const { tam = "" } = useParams();
  const [query] = useSearchParams();
  const t = sizeBySlug(tam);
  usePageMeta(t && `Tamanho ${t} | Femme Beach Wear`, t && `Biquínis, maiôs e moda fitness no tamanho ${t}, em Maceió.`);
  if (!t) return <NotFound />;
  const categoria = query.get("categoria");
  const c = categoria ? categoryBySlug(categoria) : undefined;
  const lista = c ? categoryProducts(c).filter((p) => p.tamanhos.includes(t)) : bySize(t);
  return (
    <div className="px-page mx-auto max-w-[1680px] pb-[89px] pt-[clamp(89px,10vw,144px)]">
      <nav aria-label="Você está em" className="text-sm"><Link to="/" className="underline">Início</Link> / <span aria-current="page">Tamanho {t}</span></nav>
      <Reveal y={34} className="mt-34">
        <p className="eyebrow">{lista.length} peças disponíveis</p>
        <h1 className="font-serif text-fluid-xl font-medium">Tamanho <em className="text-terra-500">{t}</em>{c && <span className="text-[.5em]"> · {c.nome}</span>}</h1>
      </Reveal>
      <nav aria-label="Trocar tamanho" className="mt-21 flex flex-wrap gap-2">
        {TAMANHOS.map((o) => (
          <Link key={o} to={sizeHref(o, c)} aria-current={o === t ? "page" : undefined} className={`grid min-h-[44px] min-w-[48px] place-items-center rounded-full border border-terra-500 px-[14px] ${o === t ? "bg-terra-500 !text-white" : ""}`}>{o}</Link>
        ))}
      </nav>
      <div className="mt-[clamp(34px,5vw,55px)] grid items-start gap-[clamp(21px,3vw,55px)] md:grid-cols-[minmax(144px,233px)_1fr]">
        <CategoryFilter tam={t} active={c} />
        <div className="grid grid-cols-[repeat(auto-fill,minmax(clamp(210px,20vw,300px),1fr))] gap-x-[clamp(13px,2vw,34px)] gap-y-[clamp(21px,2.618vw,34px)]">
          {lista.map((p) => (
            <article key={p.slug}><ProductCard p={p} from={c && { categoria: c.slug, tam: sizeSlug(t) }} /></article>
          ))}
        </div>
      </div>
    </div>
  );
}

// Só lista categorias com peças no tamanho escolhido, para nenhum filtro levar a uma página vazia
function CategoryFilter({ tam, active }: { tam: string; active?: Category }) {
  const hasSize = (c: Category) => categoryProducts(c).some((p) => p.tamanhos.includes(tam));
  const pill = (on: boolean) => `flex min-h-[44px] items-center rounded-full px-13 text-sm transition-colors ${on ? "bg-terra-500 !text-white" : "!text-terra-900 hover:bg-areia-100"}`;
  return (
    <aside aria-labelledby="filtro-categoria" className="rounded-[21px] bg-areia-50 p-21 md:sticky md:top-[89px]">
      <h2 id="filtro-categoria" className="font-medium">Filtrar por peça</h2>
      <Link to={sizeHref(tam)} preventScrollReset aria-current={!active ? "true" : undefined} className={`mt-13 ${pill(!active)}`}>Todas</Link>
      {GRUPOS_FILTRO.flatMap((grupo) =>
        publicosOf(grupo).map((publico, _, publicos) => {
          const cats = categoriesOf(grupo, publico).filter(hasSize);
          if (cats.length === 0) return null;
          return (
            <div key={`${grupo}-${publico}`} className="mt-13">
              <p className="px-13 text-xs uppercase tracking-[.2em] text-terra-500">{GRUPOS[grupo]}{publicos.length > 1 && ` · ${PUBLICOS[publico]}`}</p>
              <ul className="mt-1">
                {cats.map((cat) => (
                  <li key={cat.slug}>
                    <Link to={sizeHref(tam, cat)} preventScrollReset aria-current={cat.slug === active?.slug ? "true" : undefined} className={pill(cat.slug === active?.slug)}>{cat.nome}</Link>
                  </li>
                ))}
              </ul>
            </div>
          );
        }),
      )}
    </aside>
  );
}
