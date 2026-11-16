import { Link } from "react-router";
import { useCallback, useState } from "react";
import { useCart } from "./CartProvider";
import MobileMenu from "./MobileMenu";
import StoreStatus from "./StoreStatus";
import { CONTACT_URL } from "@/lib/whatsapp";
import { Cat } from "@/lib/products";
import { GRUPOS, PUBLICOS, categoriesOf, publicosOf } from "@/lib/categories";

const MENUS: readonly Cat[] = ["praia", "fitness"];
const links = [["/#categorias", "Categorias"], ["/#colecao", "Coleção"], ["/#sobre", "Sobre"], ["/#contato", "Onde estamos"]] as const;

export default function Header() {
  const { count, setOpen } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  return (
    <>
    <header className="fixed inset-x-0 top-0 z-40 flex items-center justify-between border-b border-terra-900/10 bg-areia-100/70 px-[clamp(21px,5vw,55px)] py-13 backdrop-blur-xl backdrop-saturate-150">
      <button aria-label="Abrir menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(true)} className="grid h-11 w-11 place-items-center rounded-full hover:bg-areia-200 md:hidden">
        <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden><path d="M4 7h16M4 12h16M4 17h16" /></svg>
      </button>
      {/* No celular o logo fica centralizado entre o menu e o carrinho, com o status compacto logo abaixo */}
      <div className="absolute left-1/2 flex -translate-x-1/2 flex-col items-center leading-none md:static md:translate-x-0 md:flex-row md:items-center md:gap-21">
        <Link to="/" aria-label="Femme Beach Wear – início" className="flex items-baseline gap-[13px] leading-none !text-terra-900">
          <span className="font-serif text-[clamp(2.618rem,3.4vw,3.2rem)] font-medium italic tracking-tight">femme</span>
          <span className="hidden text-[clamp(11px,0.9vw,13px)] font-medium tracking-[.34em] text-terra-500 min-[420px]:inline">BEACH WEAR</span>
        </Link>
        <StoreStatus compact className="-mt-1 md:hidden" />
        <StoreStatus className="hidden md:inline-flex" />
      </div>
      <nav aria-label="Principal" className="flex items-center gap-[clamp(13px,2.618vw,34px)] text-sm">
        {MENUS.map((grupo) => <CategoryMenu key={grupo} grupo={grupo} />)}
        {links.map(([h, l]) => <Link key={h} to={h} className="hidden !text-terra-900 hover:!text-terra-500 md:block">{l}</Link>)}
        <a href={CONTACT_URL} target="_blank" rel="noopener noreferrer" className="btn !hidden !min-h-[34px] !px-21 !py-2 !text-white md:!inline-flex">Fale conosco</a>
        <button aria-label={`Abrir carrinho, ${count} itens`} onClick={() => setOpen(true)} className="relative grid h-11 w-11 place-items-center rounded-full hover:bg-areia-200">
          <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M2 3h3l2.4 11.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 1.9-1.4L21 7H6" /><circle cx="10" cy="20" r="1.4" /><circle cx="18" cy="20" r="1.4" /></svg>
          {count > 0 && <span className="absolute right-0.5 top-0.5 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-terra-500 px-1 text-[11px] font-semibold text-white">{count}</span>}
        </button>
      </nav>
    </header>
    <MobileMenu open={menuOpen} onClose={closeMenu} links={links} />
    </>
  );
}

// Abre no hover e no foco por teclado (:focus-visible); clique com mouse não deixa o menu preso aberto
function CategoryMenu({ grupo }: { grupo: Cat }) {
  return (
    <div className="group relative hidden md:block">
      <Link to="/#categorias" className="flex items-center gap-1 !text-terra-900 hover:!text-terra-500">
        {GRUPOS[grupo]}
        <svg aria-hidden viewBox="0 0 24 24" className="h-3 w-3 transition-transform duration-500 ease-apple group-hover:rotate-180 group-has-[:focus-visible]:rotate-180" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M6 9l6 6 6-6" /></svg>
      </Link>
      <div className="invisible absolute left-1/2 top-full -translate-x-1/2 translate-y-2 pt-13 opacity-0 transition-all duration-500 ease-apple group-has-[:focus-visible]:visible group-has-[:focus-visible]:translate-y-0 group-has-[:focus-visible]:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
        <div className="flex gap-2 rounded-[21px] border border-terra-900/10 bg-areia-50 p-2 shadow-xl">
          {publicosOf(grupo).map((publico, _, publicos) => (
            <div key={publico} className="min-w-[233px]">
              {publicos.length > 1 && <p className="px-13 pb-1 pt-13 text-xs uppercase tracking-[.2em] text-terra-500">{PUBLICOS[publico]}</p>}
              <ul aria-label={publicos.length > 1 ? `${GRUPOS[grupo]} ${PUBLICOS[publico].toLowerCase()}` : GRUPOS[grupo]}>
                {categoriesOf(grupo, publico).map((c) => (
                  <li key={c.slug}>
                    <Link to={`/categoria/${c.slug}`} className="flex min-h-[44px] items-center rounded-[13px] px-13 !text-terra-900 transition-colors hover:bg-areia-100 hover:!text-terra-500">{c.nome}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
