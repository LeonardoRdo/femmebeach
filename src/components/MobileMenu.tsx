import { Link } from "react-router";
import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Cat } from "@/lib/products";
import { GRUPOS, PUBLICOS, categoriesOf, publicosOf } from "@/lib/categories";
import { CONTACT_URL } from "@/lib/whatsapp";

const EASE = [0.16, 1, 0.3, 1] as const;
const GRUPOS_MENU: readonly Cat[] = ["praia", "fitness"];

type Props = { open: boolean; onClose: () => void; links: readonly (readonly [string, string])[] };

export default function MobileMenu({ open, onClose, links }: Props) {
  const closeButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    closeButton.current?.focus();
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div role="dialog" aria-modal="true" aria-label="Menu" className="fixed inset-0 z-[60] md:hidden">
          <motion.div className="absolute inset-0 bg-terra-900/40" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />
          <motion.nav
            aria-label="Menu principal"
            className="absolute left-0 top-0 flex h-full w-[min(86%,377px)] flex-col overflow-y-auto bg-areia-50 p-21 shadow-2xl"
            initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }} transition={{ duration: 0.7, ease: EASE }}
          >
            <div className="flex items-center justify-between">
              <span className="font-serif text-3xl italic">Menu</span>
              <button ref={closeButton} aria-label="Fechar menu" className="h-11 w-11 rounded-full hover:bg-areia-100" onClick={onClose}>✕</button>
            </div>

            {GRUPOS_MENU.map((grupo) => (
              <section key={grupo} className="mt-21 border-t border-areia-200 pt-21">
                <h2 className="font-serif text-2xl italic">{GRUPOS[grupo]}</h2>
                {publicosOf(grupo).map((publico, _, publicos) => (
                  <div key={publico} className="mt-2">
                    {publicos.length > 1 && <p className="mt-13 text-xs uppercase tracking-[.2em] text-terra-500">{PUBLICOS[publico]}</p>}
                    <ul>
                      {categoriesOf(grupo, publico).map((c) => (
                        <li key={c.slug}>
                          <Link to={`/categoria/${c.slug}`} onClick={onClose} className="flex min-h-[44px] items-center !text-terra-900">{c.nome}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </section>
            ))}

            <ul className="mt-21 border-t border-areia-200 pt-13">
              {links.map(([href, label]) => (
                <li key={href}>
                  <Link to={href} onClick={onClose} className="flex min-h-[44px] items-center font-medium !text-terra-900">{label}</Link>
                </li>
              ))}
            </ul>

            <a href={CONTACT_URL} target="_blank" rel="noopener noreferrer" className="btn mt-21 w-full !text-white">Fale conosco</a>
          </motion.nav>
        </div>
      )}
    </AnimatePresence>
  );
}
