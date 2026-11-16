import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "./Reveal";
import ProductCard from "./ProductCard";
import { products, searchProducts } from "@/lib/products";
import { CONTACT_URL } from "@/lib/whatsapp";

const filtros = [["todos", "Todos"], ["praia", "Moda praia"], ["fitness", "Moda fitness"], ["ofertas", "Ofertas"]] as const;

export default function Collection() {
  const [cat, setCat] = useState<string>("todos");
  const [busca, setBusca] = useState("");
  const porCategoria = products.filter((p) => cat === "todos" || (cat === "ofertas" ? !!p.precoAntigo : p.cat === cat));
  const lista = searchProducts(busca, porCategoria);
  const termo = busca.trim();
  return (
    <section id="colecao" className="px-page mx-auto max-w-[1680px] py-[clamp(89px,10vw,144px)]">
      <Reveal y={34} className="flex flex-wrap items-end justify-between gap-34">
        <div className="min-w-[300px] flex-[1.618_1_340px]">
          <p className="eyebrow">Coleção verão 2026</p>
          <h2 className="font-serif text-fluid-xl font-medium tracking-tight">Escolha o <em className="text-terra-500">seu momento.</em></h2>
        </div>
        <div className="flex flex-[1_1_233px] flex-col gap-13">
          <SearchBox value={busca} onChange={setBusca} />
          <div role="group" aria-label="Filtrar por categoria" className="flex flex-wrap gap-2">
            {filtros.map(([k, l]) => (
              <button key={k} aria-pressed={cat === k} onClick={() => setCat(k)} className={`min-h-[44px] rounded-full border border-terra-500 px-21 text-sm font-medium transition-colors ${cat === k ? "bg-terra-500 text-white" : "text-terra-500"}`}>{l}</button>
            ))}
          </div>
        </div>
      </Reveal>
      <p className="sr-only" aria-live="polite">{termo ? `${lista.length} ${lista.length === 1 ? "peça encontrada" : "peças encontradas"} para ${termo}` : ""}</p>
      {lista.length === 0 ? (
        <div className="mt-[clamp(34px,5vw,89px)] rounded-[21px] border border-dashed border-terra-900/20 bg-areia-50 p-34 text-center">
          <p className="font-serif text-2xl italic">Nada encontrado para “{termo}”</p>
          <p className="mt-13 leading-[1.618]">Tente outro nome ou <a href={CONTACT_URL} target="_blank" rel="noopener noreferrer" className="underline">pergunte no WhatsApp</a>, que a gente confere se tem na loja.</p>
          <button onClick={() => { setBusca(""); setCat("todos"); }} className="btn-line mt-21">Limpar busca</button>
        </div>
      ) : (
        <motion.div layout className="mt-[clamp(34px,5vw,89px)] grid grid-cols-[repeat(auto-fill,minmax(clamp(210px,22vw,320px),1fr))] gap-x-[clamp(13px,2vw,34px)] gap-y-[clamp(21px,2.618vw,34px)]">
          <AnimatePresence mode="popLayout">
            {lista.map((p, i) => (
              <motion.article layout key={p.slug} initial={{ opacity: 0, y: 55 }} whileInView={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} viewport={{ once: true, margin: "0px 0px -8% 0px" }} transition={{ duration: 1.1, delay: (i % 4) * 0.089, ease: [0.16, 1, 0.3, 1] }}>
                <ProductCard p={p} />
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </section>
  );
}

// Campo de busca: filtra a grade a cada tecla
function SearchBox({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="relative">
      <label htmlFor="busca-catalogo" className="sr-only">Buscar peça</label>
      <svg aria-hidden viewBox="0 0 24 24" className="pointer-events-none absolute left-[14px] top-1/2 h-5 w-5 -translate-y-1/2 text-terra-500" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="M20 20l-4-4" /></svg>
      <input
        id="busca-catalogo"
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Buscar peça: biquíni, legging, preto…"
        autoComplete="off"
        className="min-h-[44px] w-full rounded-full border border-terra-900/15 bg-areia-50 pl-[42px] pr-[42px] text-[15px] text-terra-900 placeholder:text-terra-900/45 focus:border-terra-500 focus:outline-none focus:ring-2 focus:ring-terra-500/30"
      />
      {value && (
        <button type="button" aria-label="Limpar busca" onClick={() => onChange("")} className="absolute right-1 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full text-terra-900/60 hover:bg-areia-100 hover:text-terra-900">✕</button>
      )}
    </div>
  );
}
