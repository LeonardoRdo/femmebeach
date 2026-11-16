import Img from "./Img";
import { Link } from "react-router";
import { Product, brl, discountPct, imgSrc } from "@/lib/products";

// De onde o cliente veio: a página do produto usa isso para manter o filtro da categoria à esquerda
export type ProductOrigin = { categoria: string; tam?: string };

const productHref = (slug: string, from?: ProductOrigin) => {
  if (!from) return `/produto/${slug}`;
  const query = new URLSearchParams({ categoria: from.categoria, ...(from.tam && { tam: from.tam }) });
  return `/produto/${slug}?${query}`;
};

// Selo de oferta: círculo "%" + desconto, em areia sobre terracota (destaque na foto)
export function SaleBadge({ p, className = "" }: { p: Product; className?: string }) {
  if (!p.precoAntigo) return null;
  return (
    <span className={`inline-flex items-center gap-[6px] rounded-full bg-areia-50/95 py-[5px] pl-[6px] pr-13 text-[12px] font-medium uppercase tracking-[.12em] text-terra-900 shadow-[0_6px_18px_-6px_rgba(74,42,27,.6)] ring-1 ring-terra-900/10 backdrop-blur ${className}`}>
      <i aria-hidden className="grid h-[18px] w-[18px] place-items-center rounded-full bg-terra-500 text-[11px] font-semibold not-italic tracking-normal text-areia-50">%</i>
      {discountPct(p)}% off
    </span>
  );
}

// Preço atual com o antigo riscado ao lado, quando é oferta
export function Price({ p, className = "" }: { p: Product; className?: string }) {
  return (
    <span className={`inline-flex flex-wrap items-baseline gap-x-2 ${className}`}>
      <span className="whitespace-nowrap text-terra-500">{brl(p.preco)}</span>
      {p.precoAntigo && <s className="whitespace-nowrap text-[0.8em] text-terra-900/55" aria-label={`de ${brl(p.precoAntigo)}`}>{brl(p.precoAntigo)}</s>}
    </span>
  );
}

export default function ProductCard({ p, from }: { p: Product; from?: ProductOrigin }) {
  const href = productHref(p.slug, from);
  return (
    <>
      <Link to={href} aria-label={`Ver detalhes: ${p.nome}`} className="group relative block aspect-card overflow-hidden rounded-[21px] bg-terra-500">
        <Img src={imgSrc(p.img)} alt={`${p.alt} – Femme Beach Wear Maceió`} fill className="object-cover transition-transform duration-[1400ms] ease-apple group-hover:scale-[1.06]" />
        <SaleBadge p={p} className="absolute left-13 top-13 z-[1]" />
      </Link>
      <div className="flex items-baseline justify-between gap-13 px-1 pt-13">
        <h3 className="text-base font-medium leading-snug"><Link to={href} className="!text-terra-900">{p.nome}</Link></h3>
        <Price p={p} className="justify-end text-right" />
      </div>
    </>
  );
}
