import { Link } from "react-router";
import { Category } from "@/lib/categories";
import { TAMANHOS, sizeSlug } from "@/lib/products";

// Filtro por link (?tam=m): funciona sem JS e o endereço filtrado pode ser compartilhado
type Props = { c: Category; active?: string; scroll?: boolean };

export default function SizeFilter({ c, active, scroll = false }: Props) {
  const options = [{ label: "Todos", href: `/categoria/${c.slug}`, on: !active }, ...TAMANHOS.map((t) => ({ label: t, href: `/categoria/${c.slug}?tam=${sizeSlug(t)}`, on: t === active }))];
  return (
    <aside aria-labelledby="filtro-tamanho" className="rounded-[21px] bg-areia-50 p-21 md:sticky md:top-[89px]">
      <h2 id="filtro-tamanho" className="font-medium">Filtrar por tamanho</h2>
      <ul className="mt-13 grid grid-cols-2 gap-2">
        {options.map((o) => (
          <li key={o.label}>
            <Link to={o.href} preventScrollReset={!scroll} aria-current={o.on ? "true" : undefined} className={`grid min-h-[44px] w-full place-items-center rounded-full border border-terra-500 px-[14px] text-sm transition-colors ${o.on ? "bg-terra-500 !text-white" : "hover:bg-areia-100"}`}>{o.label}</Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
